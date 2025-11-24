import { ref, readonly, onUnmounted } from 'vue'
import { Chord, Interval, Note } from '@tonaljs/tonal'

export const useAudioPlayer = () => {
  const isPlaying = ref(false)
  const currentChord = ref(null)
  const currentSection = ref(null)
  let synth = null
  let currentTimeout = null
  let Tone = null

  // Lazy load Tone.js (client-side only)
  const loadTone = async () => {
    if (typeof window === 'undefined') return null
    
    if (!Tone) {
      try {
        const toneModule = await import('tone')
        // Tone.js exports everything as named exports
        Tone = toneModule
      } catch (error) {
        console.error('Failed to load Tone.js:', error)
        return null
      }
    }
    return Tone
  }

  // Initialize synthesizer
  const initSynth = async () => {
    if (typeof window === 'undefined') return
    
    const ToneModule = await loadTone()
    if (!synth && ToneModule) {
      synth = new ToneModule.PolySynth(ToneModule.Synth).toDestination()
      synth.volume.value = -10 // Reduce volume
    }
  }

  // Map server chord suffixes to tonal-compatible data
  const QUALITY_DEFINITIONS = {
    '': { symbol: '', intervals: ['1P', '3M', '5P'] },
    maj: { symbol: '', intervals: ['1P', '3M', '5P'] },
    maj7: { symbol: 'maj7', intervals: ['1P', '3M', '5P', '7M'] },
    '7': { symbol: '7', intervals: ['1P', '3M', '5P', '7m'] },
    min: { symbol: 'm', intervals: ['1P', '3m', '5P'] },
    min7: { symbol: 'm7', intervals: ['1P', '3m', '5P', '7m'] },
    'min(maj7)': { symbol: 'mMaj7', intervals: ['1P', '3m', '5P', '7M'] },
    minmaj7: { symbol: 'mMaj7', intervals: ['1P', '3m', '5P', '7M'] },
    dim: { symbol: 'dim', intervals: ['1P', '3m', '5d'] },
    aug: { symbol: 'aug', intervals: ['1P', '3M', '5A'] },
    sus2: { symbol: 'sus2', intervals: ['1P', '2M', '5P'] },
    sus4: { symbol: 'sus4', intervals: ['1P', '4P', '5P'] },
  }

  const sanitizeQuality = (quality = '') => quality.replace(/[^a-z0-9#b]/gi, '')

  const parseChordLabel = (label) => {
    if (typeof label !== 'string') return null
    const trimmed = label.trim()
    if (!trimmed || trimmed.toLowerCase() === 'unknown') return null

    const [rawRoot, rawQuality = ''] = trimmed.split(':')
    const rootMatch = rawRoot.match(/^[A-G][#b]?/i)
    if (!rootMatch) return null

    const root = rootMatch[0].charAt(0).toUpperCase() + rootMatch[0].slice(1)
    const normalizedQuality = rawQuality.trim().toLowerCase()
    const strippedQuality = sanitizeQuality(normalizedQuality)
    const qualityDef =
      QUALITY_DEFINITIONS[normalizedQuality] ||
      QUALITY_DEFINITIONS[strippedQuality] ||
      QUALITY_DEFINITIONS['']

    const symbolSuffix =
      qualityDef.symbol !== undefined ? qualityDef.symbol : strippedQuality
    const symbol = symbolSuffix ? `${root}${symbolSuffix}` : root

    return {
      root,
      symbol,
      intervals: qualityDef.intervals || QUALITY_DEFINITIONS[''].intervals,
    }
  }

  const getBaseMidi = (root) => {
    if (!root) return null
    const targetRoot = root.replace(/[^A-G#b]/gi, '')
    if (!targetRoot) return null

    const candidateOctaves = [3, 4]
    for (const octave of candidateOctaves) {
      const midi = Note.midi(`${targetRoot}${octave}`)
      if (typeof midi === 'number') {
        return midi
      }
    }
    return null
  }

  const buildFrequenciesFromIntervals = (ToneModule, root, intervals = []) => {
    const baseMidi = getBaseMidi(root)
    if (baseMidi == null) return null

    let lastMidi = null
    const frequencies = []

    intervals.forEach((interval) => {
      const semitones = Interval.semitones(interval || '1P')
      if (!Number.isFinite(semitones)) return

      let midiValue = baseMidi + semitones
      if (lastMidi !== null && midiValue <= lastMidi) {
        const octavesToAdd = Math.ceil((lastMidi - midiValue + 1) / 12)
        midiValue += octavesToAdd * 12
      }
      lastMidi = midiValue

      try {
        const freq = ToneModule.Frequency(midiValue, 'midi').toFrequency()
        frequencies.push(freq)
      } catch (err) {
        console.warn('Failed to convert midi value to frequency', interval, err)
      }
    })

    return frequencies.length ? frequencies : null
  }

  // Convert chord name to playable frequencies
  const chordToNotes = async (chordName) => {
    if (typeof window === 'undefined') return [440]
    
    try {
      const ToneModule = await loadTone()
      if (!ToneModule) return [440]

      const parsed = parseChordLabel(chordName)
      if (!parsed) return [440]

      const chord = Chord.get(parsed.symbol)
      if (!chord.empty && chord.intervals?.length) {
        const resolved = buildFrequenciesFromIntervals(
          ToneModule,
          chord.tonic || parsed.root,
          chord.intervals
        )
        if (resolved?.length) {
          return resolved
        }
      }

      const fallback = buildFrequenciesFromIntervals(
        ToneModule,
        parsed.root,
        parsed.intervals
      )

      return fallback || [440]
    } catch (error) {
      console.error('Error parsing chord:', chordName, error)
      return [440] // Fallback frequency
    }
  }

  // Play a single chord
  const playChord = async (chordName, sectionName = null, chordIndex = null) => {
    if (typeof window === 'undefined') return

    const ToneModule = await loadTone()
    if (!ToneModule) return

    if (!ToneModule.context.state || ToneModule.context.state !== 'running') {
      await ToneModule.start()
    }

    await initSynth()
    stop()

    // Create a unique identifier for the chord in its section, including index if provided
    let chordId = chordName
    if (sectionName !== null) {
      chordId = chordIndex !== null 
        ? `${sectionName}:${chordIndex}:${chordName}`
        : `${sectionName}:${chordName}`
    }
    currentChord.value = chordId
    const notes = await chordToNotes(chordName)
    
    if (synth) {
      synth.triggerAttackRelease(notes, '2n')
    }
    
    // Clear chord highlight after 1 second
    setTimeout(() => {
      if (currentChord.value === chordId) {
        currentChord.value = null
      }
    }, 1000)
  }

  // Play a section (sequence of chords)
  const playSection = async (sectionName, chords) => {
    if (typeof window === 'undefined') return

    if (!Array.isArray(chords) || chords.length === 0) {
      return
    }

    if (isPlaying.value && currentSection.value === sectionName) {
      stop()
      return
    }

    const ToneModule = await loadTone()
    if (!ToneModule) return

    if (!ToneModule.context.state || ToneModule.context.state !== 'running') {
      await ToneModule.start()
    }

    await initSynth()
    stop()

    isPlaying.value = true
    currentSection.value = sectionName

    let currentIndex = 0

    const playNext = async () => {
      if (!isPlaying.value || currentSection.value !== sectionName) {
        return
      }

      if (currentIndex >= chords.length) {
        // Loop back to start
        currentIndex = 0
      }

      const chord = chords[currentIndex]
      const chordName = chord.chord || chord
      
      // Use section-specific identifier with index for highlighting
      currentChord.value = `${sectionName}:${currentIndex}:${chordName}`
      const notes = await chordToNotes(chordName)
      
      if (synth) {
        synth.triggerAttackRelease(notes, '2n')
      }

      currentIndex++
      
      // Schedule next chord (2 beats = 1 second at 120 BPM)
      currentTimeout = setTimeout(playNext, 1000)
    }

    playNext()
  }

  // Stop playback
  const stop = () => {
    isPlaying.value = false
    currentSection.value = null
    currentChord.value = null
    
    if (currentTimeout) {
      clearTimeout(currentTimeout)
      currentTimeout = null
    }
    
    if (synth) {
      synth.releaseAll()
    }
  }

  // Cleanup on unmount
  onUnmounted(() => {
    stop()
    if (synth) {
      synth.dispose()
    }
  })

  return {
    playChord,
    playSection,
    stop,
    isPlaying: readonly(isPlaying),
    currentChord: readonly(currentChord),
    currentSection: readonly(currentSection),
  }
}

