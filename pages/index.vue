<template>
  <!-- Hero Section -->
    <HeroSection
      :selected-file="selectedFile"
      :uploading="uploading"
      :progress="progress"
      :audio-preview-url="audioPreviewUrl"
      :is-preview-playing="isPreviewPlaying"
      @file-selected="handleFileSelect"
      @file-cleared="clearFile"
      @analyze="uploadAndAnalyze"
      @toggle-preview="toggleFilePlayback"
    />

  <!-- Features Section -->
  <FeaturesSection />

  <audio
      v-if="audioPreviewUrl"
      ref="uploadedAudio"
      :src="audioPreviewUrl"
      @ended="handleAudioEnded"
      @pause="handleAudioPause"
      @play="handleAudioPlay"
      preload="metadata"
      hidden
    ></audio>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

import { useAnalyzer } from '~/composables/useAnalyzer'

const { analyzeAudio } = useAnalyzer()

const selectedFile = ref(null)
const uploading = ref(false)
const progress = ref(0)
const uploadedAudio = ref(null)
const audioPreviewUrl = ref(null)
const isPreviewPlaying = ref(false)

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

const updateSelectedFile = (file) => {
  if (file) {
    revokePreviewUrl()
    selectedFile.value = file
    if (
      typeof window !== 'undefined' &&
      window.URL &&
      typeof window.URL.createObjectURL === 'function'
    ) {
      audioPreviewUrl.value = window.URL.createObjectURL(file)
    }
  } else {
    selectedFile.value = null
    revokePreviewUrl()
  }

  if (uploadedAudio.value) {
    uploadedAudio.value.pause()
    uploadedAudio.value.currentTime = 0
  }
  isPreviewPlaying.value = false
}

const handleFileSelect = (file) => {
    updateSelectedFile(file)
}

const clearFile = () => {
  updateSelectedFile(null)
}

const uploadAndAnalyze = async () => {
  if (!selectedFile.value) return

  uploading.value = true
  progress.value = 10

  try {
    progress.value = 30
    const result = await analyzeAudio(selectedFile.value, (p) => {
      progress.value = 30 + (p * 0.7)
    })
    
    progress.value = 100
    
    // Store analysis data in state for the analyze page
    const analysisState = useState('analysisData', () => null)
    analysisState.value = {
      analysis: result.analysis,
      audioPreviewUrl: audioPreviewUrl.value,
      selectedFile: selectedFile.value
    }
    
    // Navigate to analyze page
    await navigateTo('/analyze')
  } catch (error) {
    console.error('Analysis error:', error)
    alert('Failed to analyze song. Please try again.')
  } finally {
    uploading.value = false
    progress.value = 0
  }
}

const toggleFilePlayback = async () => {
  if (!uploadedAudio.value) return

  if (isPreviewPlaying.value) {
    uploadedAudio.value.pause()
  } else {
    try {
      await uploadedAudio.value.play()
    } catch (error) {
      console.error('Audio preview failed to play:', error)
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

onBeforeUnmount(() => {
  revokePreviewUrl()
})
</script>
