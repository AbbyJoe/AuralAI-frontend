<template>
  <div class="section-block">
    <div class="section-top">
      <h4 class="section-name">{{ sectionName.charAt(0).toUpperCase() + sectionName.slice(1) }}</h4>
      <button
        @click="$emit('play-section', sectionName, chords)"
        class="btn-play"
        :disabled="isPlaying && currentSection !== sectionName"
        :class="{ 'is-active': isPlaying && currentSection === sectionName }"
      >
        <svg v-if="!(isPlaying && currentSection === sectionName)" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
        <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16"></rect>
          <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
        <span>{{ isPlaying && currentSection === sectionName ? 'Pause' : 'Play' }}</span>
      </button>
    </div>
    <div class="chords-grid">
      <button
        v-for="(chord, idx) in (Array.isArray(chords) ? chords : [])"
        :key="idx"
        @click="$emit('play-chord', chord.chord || chord, sectionName, idx)"
        class="chord-item"
        :class="{ 'is-playing': currentChord === `${sectionName}:${idx}:${chord.chord || chord}` }"
      >
        {{ chord.chord || chord }}
      </button>
      <p v-if="!Array.isArray(chords) || chords.length === 0" class="no-chords-message">
        No chords detected in this section
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  sectionName: {
    type: String,
    required: true
  },
  chords: {
    type: Array,
    required: true
  },
  isPlaying: {
    type: Boolean,
    default: false
  },
  currentSection: {
    type: String,
    default: null
  },
  currentChord: {
    type: String,
    default: null
  }
})

defineEmits(['play-section', 'play-chord'])
</script>

