<template>
  <nav class="navbar">
    <div class="navbar-container">
      <NuxtLink to="/" class="navbar-brand">
        <div class="brand-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"></path>
          </svg>
        </div>
        <span class="brand-name">AuralAI</span>
      </NuxtLink>
      
      <div class="navbar-links">
        <NuxtLink to="/" class="nav-link" :class="{ active: isHome }">
          <span>Home</span>
        </NuxtLink>
        <a href="/#features" class="nav-link" @click.prevent="scrollToFeatures">
          <span>Features</span>
        </a>
        <NuxtLink to="/about" class="nav-link" :class="{ active: isAbout }">
          <span>About</span>
        </NuxtLink>
        <NuxtLink v-if="showAnalyzeLink" to="/analyze" class="nav-link" :class="{ active: isAnalyze }">
          <span>Analysis</span>
        </NuxtLink>
        <button @click="toggleTheme" class="theme-toggle" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
          <svg v-if="isDark" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
const route = useRoute()
const { isDark, toggleTheme } = useTheme()

const isHome = computed(() => route.path === '/')
const isAnalyze = computed(() => route.path === '/analyze')
const isAbout = computed(() => route.path === '/about')

// Show analyze link if we're on the analyze page or if there's analysis data
const showAnalyzeLink = computed(() => {
  const analysisState = useState('analysisData', () => null)
  return isAnalyze.value || analysisState.value !== null
})

// Scroll to features section on home page
const scrollToFeatures = () => {
  if (route.path === '/') {
    const featuresSection = document.querySelector('#features')
    if (featuresSection) {
      const navbarHeight = 72 // Match the padding-top in main.css
      const elementPosition = featuresSection.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  } else {
    navigateTo('/#features')
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(17, 24, 39, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  transition: all 0.3s ease;
}

:root.light-mode .navbar {
  background: rgba(255, 255, 255, 0.9);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--text);
  font-weight: 600;
  font-size: 1.25rem;
  transition: all 0.2s ease;
}

.navbar-brand:hover {
  color: var(--text-light);
  transform: translateY(-1px);
}

.brand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, var(--highlight) 0%, var(--accent) 100%);
  border-radius: 8px;
  padding: 6px;
  color: white;
}

.brand-name {
  background: linear-gradient(135deg, var(--text-light) 0%, var(--text) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  position: relative;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: var(--text-muted);
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border-radius: 6px;
}

.nav-link:hover {
  color: var(--text);
  background: rgba(255, 255, 255, 0.05);
}

.nav-link.active {
  color: var(--text);
  background: rgba(59, 130, 246, 0.1);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background: var(--highlight);
  border-radius: 50%;
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: 0.5rem;
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text);
  transform: translateY(-1px);
}

:root.light-mode .theme-toggle {
  background: rgba(0, 0, 0, 0.05);
}

:root.light-mode .theme-toggle:hover {
  background: rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .navbar-container {
    padding: 1rem 1.5rem;
  }
  
  .brand-name {
    font-size: 1.1rem;
  }
  
  .navbar-links {
    gap: 0.75rem;
  }
  
  .nav-link {
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 640px) {
  .navbar-links {
    gap: 0.5rem;
  }
  
  .nav-link {
    padding: 0.5rem 0.5rem;
    font-size: 0.8rem;
  }
  
  .brand-name {
    font-size: 1rem;
  }
  
  .brand-icon {
    width: 32px;
    height: 32px;
  }
}
</style>

