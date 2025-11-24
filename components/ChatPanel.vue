<template>
  <div class="chat-panel">
    <div class="chat-header">
      <h3 class="chat-title">Ask About This Song</h3>
      <p class="chat-subtitle">Get insights about harmony, structure, and theory</p>
    </div>
    
    <div class="chat-messages-wrapper">
      <div
        v-for="(message, idx) in messages"
        :key="idx"
        class="chat-bubble"
        :class="message.role"
      >
        <div class="bubble-content">
          <div class="bubble-label">{{ message.role === 'user' ? 'You' : 'AuralAI' }}</div>
          <div v-if="message.role === 'assistant'" class="bubble-text">
            <MarkdownRenderer :content="getAnimatedContent(message, idx)" />
          </div>
          <p v-else class="bubble-text">{{ message.content }}</p>
        </div>
      </div>
      
      <!-- Loading indicator -->
      <div v-if="sending" class="chat-bubble assistant loading">
        <div class="bubble-content">
          <div class="bubble-label">AuralAI Assistant</div>
          <div class="thinking-indicator">
            <div class="thinking-dot"></div>
            <div class="thinking-dot"></div>
            <div class="thinking-dot"></div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="chat-input-area">
      <input
        v-model="input"
        @keyup.enter="handleSend"
        type="text"
        placeholder="Ask anything about this song..."
        class="chat-input-field"
        :disabled="sending"
      />
      <button
        @click="handleSend"
        class="btn-send"
        :disabled="!input || sending"
      >
        <svg v-if="!sending" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
        <div v-else class="btn-spinner"></div>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  messages: {
    type: Array,
    default: () => []
  },
  sending: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['send-message'])

const input = ref('')
const animatedContents = ref({})
const animationTimers = ref({})

// Typewriter animation for assistant messages
const getAnimatedContent = (message, idx) => {
  if (message.role !== 'assistant') {
    return message.content
  }

  // Return cached animated content if available
  if (animatedContents.value[idx] !== undefined) {
    return animatedContents.value[idx]
  }

  // Start animation for new message
  if (message.content && !animatedContents.value[idx]) {
    nextTick(() => {
      animateMessage(message.content, idx)
    })
  }

  return animatedContents.value[idx] || ''
}

const animateMessage = (fullContent, idx) => {
  // Clear any existing timer for this index
  if (animationTimers.value[idx]) {
    clearTimeout(animationTimers.value[idx])
  }

  const speed = 10 // milliseconds per character
  let currentIndex = 0
  animatedContents.value[idx] = ''

  const animate = () => {
    if (currentIndex < fullContent.length) {
      animatedContents.value[idx] = fullContent.substring(0, currentIndex + 1)
      currentIndex++
      animationTimers.value[idx] = setTimeout(animate, speed)
    } else {
      // Animation complete
      delete animationTimers.value[idx]
    }
  }

  animate()
}

// Watch for new messages to trigger animation
watch(() => props.messages, (newMessages, oldMessages) => {
  newMessages.forEach((message, idx) => {
    if (message.role === 'assistant') {
      // Check if this is a new message (not in old messages or content changed)
      const isNewMessage = !oldMessages || 
                          !oldMessages[idx] || 
                          oldMessages[idx].content !== message.content
      
      if (isNewMessage && message.content) {
        // Reset animation for this message
        animatedContents.value[idx] = undefined
        nextTick(() => {
          animateMessage(message.content, idx)
        })
      }
    }
  })
}, { deep: true, immediate: true })

// Cleanup timers on unmount
onBeforeUnmount(() => {
  Object.values(animationTimers.value).forEach(timer => {
    if (timer) clearTimeout(timer)
  })
})

const handleSend = () => {
  if (!input.value.trim() || props.sending) return
  emit('send-message', input.value)
  input.value = ''
}
</script>

<style scoped>
.bubble-text {
  color: var(--text-light);
  line-height: 1.7;
}

.thinking-indicator {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem 0;
}

.thinking-dot {
  width: 8px;
  height: 8px;
  background: var(--text-muted);
  border-radius: 50%;
  animation: thinking-pulse 1.4s ease-in-out infinite;
}

.thinking-dot:nth-child(1) {
  animation-delay: 0s;
}

.thinking-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.thinking-dot:nth-child(3) {
  animation-delay: 0.4s;
}

.chat-bubble.loading {
  opacity: 0.8;
}

@keyframes thinking-pulse {
  0%, 60%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  30% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>

