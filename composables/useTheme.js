export const useTheme = () => {
  const isDark = ref(true)

  const applyTheme = (dark) => {
    if (typeof window === 'undefined') return
    
    const html = document.documentElement
    if (dark) {
      html.classList.remove('light-mode')
      html.classList.add('dark-mode')
    } else {
      html.classList.remove('dark-mode')
      html.classList.add('light-mode')
    }
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
      applyTheme(isDark.value)
    }
  }

  // Initialize theme from localStorage or DOM (set by plugin)
  onMounted(() => {
    if (typeof window === 'undefined') return

    // Check current state from DOM (set by plugin)
    const html = document.documentElement
    const isCurrentlyDark = html.classList.contains('dark-mode') || !html.classList.contains('light-mode')
    
    // Sync with localStorage
    const stored = localStorage.getItem('theme')
    if (stored) {
      isDark.value = stored === 'dark'
      // Ensure DOM matches localStorage
      if (isDark.value !== isCurrentlyDark) {
        applyTheme(isDark.value)
      }
    } else {
      // Use current DOM state (set by plugin from system preference)
      isDark.value = isCurrentlyDark
    }

    // Watch for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)')
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        isDark.value = !e.matches
        applyTheme(isDark.value)
      }
    }
    mediaQuery.addEventListener('change', handleChange)

    // Cleanup
    onBeforeUnmount(() => {
      mediaQuery.removeEventListener('change', handleChange)
    })
  })

  return {
    isDark: readonly(isDark),
    toggleTheme
  }
}

