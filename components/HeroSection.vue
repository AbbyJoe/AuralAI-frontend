<template>
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          <span>AI-Powered Music Analysis</span>
        </div>
        
        <h1 class="hero-title">
          Decode Any Song's<br />
          <span class="title-highlight">Chord Progression</span>
        </h1>
        
        <p class="hero-subtitle">
          Upload your favorite track and unlock its musical DNA with advanced AI analysis, 
          complete with theory breakdowns and interactive playback.
        </p>
        
        <div class="upload-section">
          <AudioUpload
            :selected-file="selectedFile"
            :uploading="uploading"
            :progress="progress"
            :audio-preview-url="audioPreviewUrl"
            :is-preview-playing="isPreviewPlaying"
            @file-selected="$emit('file-selected', $event)"
            @file-cleared="$emit('file-cleared')"
            @analyze="$emit('analyze')"
            @toggle-preview="$emit('toggle-preview')"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  selectedFile: {
    type: File,
    default: null
  },
  uploading: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number,
    default: 0
  },
  audioPreviewUrl: {
    type: String,
    default: null
  },
  isPreviewPlaying: {
    type: Boolean,
    default: false
  }
})

defineEmits(['file-selected', 'file-cleared', 'analyze', 'toggle-preview'])
</script>

