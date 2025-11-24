<template>
  <!-- Analysis Results -->
    <section class="results">
      <div class="container">
        <div class="results-nav">
          <h2 class="results-title">Analysis Complete</h2>
          <button @click="resetAnalysis" class="btn-reset">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="1 4 1 10 7 10"></polyline>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
            </svg>
            <span>New Analysis</span>
          </button>
        </div>

        <!-- Key Overview -->
        <KeyOverview
          v-if="analysis"
          :key-prop="analysis.key"
          :explanation="analysis.explanation"
          :audio-preview-url="audioPreviewUrl"
          :is-preview-playing="isPreviewPlaying"
          :file-name="selectedFile?.name"
          @toggle-preview="toggleFilePlayback"
        />

        <!-- Chord Sections -->
        <div v-if="analysis?.sections && Object.keys(analysis.sections).length > 0" class="sections">
          <h3 class="sections-header">Chord Progressions</h3>
          <div class="sections-list">
            <ChordSection
              v-for="(chords, sectionName) in analysis.sections"
              :key="sectionName"
              :section-name="sectionName"
              :chords="chords"
              :is-playing="isPlaying"
              :current-section="currentSection"
              :current-chord="currentChord"
              @play-section="playSection"
              @play-chord="playChord"
            />
          </div>
        </div>

        <!-- Chat Interface -->
        <ChatPanel
          :messages="chatMessages"
          :sending="sendingMessage"
          @send-message="sendMessage"
        />
      </div>
    </section>
    
    <audio
      v-if="audioPreviewUrl"
      ref="uploadedAudio"
      :src="audioPreviewUrl"
      @ended="handleAudioEnded"
      @pause="handleAudioPause"
      @play="handleAudioPlay"
      @loadeddata="handleAudioLoaded"
      @error="handleAudioError"
      preload="auto"
      hidden
    ></audio>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

import { useAudioPlayer } from '~/composables/useAudioPlayer'
import { useAnalyzer } from '~/composables/useAnalyzer'

const analysis = ref(null)
const chatMessages = ref([])
const sendingMessage = ref(false)
const uploadedAudio = ref(null)
const audioPreviewUrl = ref(null)
const isPreviewPlaying = ref(false)
const selectedFile = ref(null)

const { playChord, playSection, isPlaying, currentChord, currentSection, stop } = useAudioPlayer()
const { askQuestion } = useAnalyzer()

// Load analysis data from state
onMounted(() => {
  const analysisState = useState('analysisData', () => null)
  
  if (analysisState.value) {
    analysis.value = analysisState.value.analysis
    selectedFile.value = analysisState.value.selectedFile
    
    // Recreate blob URL if we have the file, otherwise use the stored URL
    if (selectedFile.value && typeof window !== 'undefined' && window.URL && window.URL.createObjectURL) {
      audioPreviewUrl.value = window.URL.createObjectURL(selectedFile.value)
    } else if (analysisState.value.audioPreviewUrl) {
      audioPreviewUrl.value = analysisState.value.audioPreviewUrl
    }
    
    chatMessages.value = [{
      role: 'assistant',
      content: `I've analyzed your song in ${analysis.value.key}. Feel free to ask me any questions about the chord progression, music theory, or how to play it!`
    }]
    
    // Clear the state after using it
    analysisState.value = null
    
    // Ensure audio element is ready after next tick
    nextTick(() => {
      if (uploadedAudio.value && audioPreviewUrl.value) {
        uploadedAudio.value.load()
      }
    })
  } else {
    // If no analysis data, redirect to home
    navigateTo('/')
  }
})

const revokePreviewUrl = () => {
  if (
    audioPreviewUrl.value &&
    typeof window !== 'undefined' &&
    window.URL &&
    typeof window.URL.revokeObjectURL === 'function'
  ) {
    window.URL.revokeObjectURL(audioPreviewUrl.value)
  }
  audioPreviewUrl.value = null
}

const toggleFilePlayback = async () => {
  if (!uploadedAudio.value || !audioPreviewUrl.value) {
    console.warn('Audio element or URL not available')
    return
  }

  try {
    if (isPreviewPlaying.value) {
      uploadedAudio.value.pause()
    } else {
      // Ensure audio is loaded
      if (uploadedAudio.value.readyState === 0) {
        uploadedAudio.value.load()
      }
      
      // Wait for audio to be ready
      await uploadedAudio.value.play()
    }
  } catch (error) {
    console.error('Audio playback error:', error)
    // Try to handle autoplay restrictions
    if (error.name === 'NotAllowedError') {
      alert('Please interact with the page first to enable audio playback.')
    } else {
      alert('Failed to play audio. Please try again.')
    }
  }
}

const handleAudioPlay = () => {
  isPreviewPlaying.value = true
}

const handleAudioPause = () => {
  isPreviewPlaying.value = false
}

const handleAudioEnded = () => {
  isPreviewPlaying.value = false
  if (uploadedAudio.value) {
    uploadedAudio.value.currentTime = 0
  }
}

const handleAudioLoaded = () => {
  console.log('Audio loaded successfully')
}

const handleAudioError = (error) => {
  console.error('Audio loading error:', error)
  alert('Failed to load audio file. Please try uploading again.')
}

const sendMessage = async (question) => {
  if (!question.trim() || !analysis.value) return

  chatMessages.value.push({
    role: 'user',
    content: question
  })
  sendingMessage.value = true

  try {
    const answer = await askQuestion(question, analysis.value)
    chatMessages.value.push({
      role: 'assistant',
      content: answer
    })
  } catch (error) {
    console.error('Chat error:', error)
    chatMessages.value.push({
      role: 'assistant',
      content: 'Sorry, I encountered an error. Please try again.'
    })
  } finally {
    sendingMessage.value = false
  }
}

const resetAnalysis = () => {
  stop()
  revokePreviewUrl()
  navigateTo('/')
}

onBeforeUnmount(() => {
  revokePreviewUrl()
  stop()
})
</script>

