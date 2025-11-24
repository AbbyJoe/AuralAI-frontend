<template>
  <div class="key-overview">
    <div class="key-overview-wrapper">
      <div class="key-display">
        <span class="key-label">Detected Key</span>
        <span class="key-value">{{ keyProp }}</span>
      </div>
      <div
        v-if="audioPreviewUrl"
        class="playback-controls"
      >
        <button
          @click="$emit('toggle-preview')"
          class="btn-playback"
          :class="{ 'is-playing': isPreviewPlaying }"
          :aria-label="isPreviewPlaying ? 'Pause uploaded song' : 'Play uploaded song'"
        >
          <span class="playback-icon">
            <svg
              v-if="!isPreviewPlaying"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <svg
              v-else
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          </span>
          <span>{{ isPreviewPlaying ? 'Pause Song' : 'Play Song' }}</span>
        </button>
        <span class="playback-filename">
          {{ fileName || 'Uploaded Track' }}
        </span>
      </div>
    </div>
    <div class="theory-explanation">
      <h3 class="explanation-title">Music Theory</h3>
      <p class="explanation-text">{{ explanation }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  keyProp: {
    type: String,
    required: true
  },
  explanation: {
    type: String,
    required: true
  },
  audioPreviewUrl: {
    type: String,
    default: null
  },
  isPreviewPlaying: {
    type: Boolean,
    default: false
  },
  fileName: {
    type: String,
    default: null
  }
})

defineEmits(['toggle-preview'])
</script>

