export default defineNuxtPlugin(() => {
  if (typeof window === 'undefined') return

  // Apply theme immediately to prevent flash
  const stored = localStorage.getItem('theme')
  const html = document.documentElement
  
  if (stored) {
    if (stored === 'dark') {
      html.classList.add('dark-mode')
      html.classList.remove('light-mode')
    } else {
      html.classList.add('light-mode')
      html.classList.remove('dark-mode')
    }
  } else {
    // Check system preference
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
    if (prefersLight) {
      html.classList.add('light-mode')
      html.classList.remove('dark-mode')
    } else {
      html.classList.add('dark-mode')
      html.classList.remove('light-mode')
    }
  }
})

