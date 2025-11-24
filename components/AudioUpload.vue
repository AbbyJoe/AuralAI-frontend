<template>
  <div class="upload-wrapper">
    <input
      ref="fileInput"
      type="file"
      accept="audio/*"
      @change="handleFileSelect"
      class="file-input"
      :disabled="uploading"
    />
    <div
      class="upload-zone"
      :class="{ 'is-dragover': isDragging, 'is-uploading': uploading }"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      @click="fileInput?.click()"
    >
      <div v-if="!uploading" class="upload-inner">
        <div class="upload-icon">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        </div>
        <h3 class="upload-title">Drop your audio file here</h3>
        <p class="upload-text">or click to browse</p>
        <div class="upload-formats">
          <span class="format-tag">MP3</span>
          <span class="format-tag">WAV</span>
          <span class="format-tag">M4A</span>
          <span class="format-tag">FLAC</span>
        </div>
        <p class="upload-limit">Maximum file size: 50MB</p>
      </div>
      
      <div v-else class="upload-loading">
        <div class="loading-spinner"></div>
        <p class="loading-text">Analyzing your song...</p>
        <div v-if="progress > 0" class="progress-track">
          <div class="progress-bar" :style="{ width: progress + '%' }"></div>
        </div>
        <p class="loading-subtext">This may take a moment</p>
      </div>
    </div>
    
    <div v-if="selectedFile && !uploading" class="file-selected">
      <div class="file-info">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"></path>
        </svg>
        <span class="file-name">{{ selectedFile.name }}</span>
      </div>
      <div class="file-actions">
        <button
          v-if="audioPreviewUrl"
          @click.stop="$emit('toggle-preview')"
          class="btn-audio"
          :class="{ 'is-playing': isPreviewPlaying }"
          :aria-label="isPreviewPlaying ? 'Pause audio preview' : 'Play audio preview'"
        >
          <svg v-if="!isPreviewPlaying" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        </button>
        <button @click.stop="clearFile" class="btn-clear" aria-label="Clear selected file">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>

    <button
      v-if="selectedFile && !uploading"
      @click="$emit('analyze')"
      class="btn-analyze"
    >
      <span>Analyze Song</span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
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

const emit = defineEmits(['file-selected', 'file-cleared', 'analyze', 'toggle-preview'])

const fileInput = ref(null)
const isDragging = ref(false)

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    emit('file-selected', file)
  }
}

const handleDrop = (event) => {
  isDragging.value = false
  const file = event.dataTransfer.files[0]
  if (file && file.type.startsWith('audio/')) {
    emit('file-selected', file)
  }
}

const clearFile = () => {
  emit('file-cleared')
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>

