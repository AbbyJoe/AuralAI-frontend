<template>
  <nav class="navbar">
    <div class="navbar-container">
      <NuxtLink to="/" class="navbar-brand" @click="closeMobileMenu">
        <div class="brand-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"></path>
          </svg>
        </div>
        <span class="brand-name">AuralAI</span>
      </NuxtLink>
      
      <div class="navbar-links">
        <NuxtLink to="/" class="nav-link" :class="{ active: isHome }" @click="closeMobileMenu">
          <span>Home</span>
        </NuxtLink>
        <a href="/#features" class="nav-link" @click.prevent="handleFeaturesClick">
          <span>Features</span>
        </a>
        <NuxtLink to="/about" class="nav-link" :class="{ active: isAbout }" @click="closeMobileMenu">
          <span>About</span>
        </NuxtLink>
        <NuxtLink v-if="showAnalyzeLink" to="/analyze" class="nav-link" :class="{ active: isAnalyze }" @click="closeMobileMenu">
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

      <button 
        class="hamburger" 
        @click="toggleMobileMenu"
        :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="isMobileMenuOpen"
      >
        <span class="hamburger-line" :class="{ 'active': isMobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ 'active': isMobileMenuOpen }"></span>
        <span class="hamburger-line" :class="{ 'active': isMobileMenuOpen }"></span>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition name="mobile-menu">
      <div v-if="isMobileMenuOpen" class="mobile-menu-overlay" @click="closeMobileMenu">
        <div class="mobile-menu" @click.stop>
          <div class="mobile-menu-links">
            <NuxtLink to="/" class="mobile-nav-link" :class="{ active: isHome }" @click="closeMobileMenu">
              <span>Home</span>
            </NuxtLink>
            <a href="/#features" class="mobile-nav-link" @click.prevent="handleFeaturesClick">
              <span>Features</span>
            </a>
            <NuxtLink to="/about" class="mobile-nav-link" :class="{ active: isAbout }" @click="closeMobileMenu">
              <span>About</span>
            </NuxtLink>
            <NuxtLink v-if="showAnalyzeLink" to="/analyze" class="mobile-nav-link" :class="{ active: isAnalyze }" @click="closeMobileMenu">
              <span>Analysis</span>
            </NuxtLink>
            <button @click="handleThemeToggle" class="mobile-theme-toggle">
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
              <span>{{ isDark ? 'Light Mode' : 'Dark Mode' }}</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
const route = useRoute()
const { isDark, toggleTheme } = useTheme()

const isMobileMenuOpen = ref(false)

const isHome = computed(() => route.path === '/')
const isAnalyze = computed(() => route.path === '/analyze')
const isAbout = computed(() => route.path === '/about')

// Show analyze link if we're on the analyze page or if there's analysis data
const showAnalyzeLink = computed(() => {
  const analysisState = useState('analysisData', () => null)
  return isAnalyze.value || analysisState.value !== null
})

// Toggle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  // Prevent body scroll when menu is open
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

// Close mobile menu
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

// Handle theme toggle with menu close
const handleThemeToggle = () => {
  toggleTheme()
  closeMobileMenu()
}

// Scroll to features section on home page
const scrollToFeatures = () => {
  closeMobileMenu()
  if (route.path === '/') {
    // Small delay to ensure menu closes first
    setTimeout(() => {
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
    }, 100)
  } else {
    navigateTo('/#features')
  }
}

// Handle features click
const handleFeaturesClick = () => {
  scrollToFeatures()
}

// Close menu on route change
watch(() => route.path, () => {
  closeMobileMenu()
})

// Cleanup on unmount
onUnmounted(() => {
  document.body.style.overflow = ''
})
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

:root.light-mode .mobile-menu {
  background: rgba(255, 255, 255, 0.95);
  border-left-color: rgba(0, 0, 0, 0.1);
}

:root.light-mode .mobile-menu-overlay {
  background: rgba(0, 0, 0, 0.3);
}

:root.light-mode .mobile-menu-close {
  background: rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.1);
}

:root.light-mode .mobile-menu-close:hover {
  background: rgba(0, 0, 0, 0.1);
}

:root.light-mode .mobile-nav-link:hover {
  background: rgba(0, 0, 0, 0.05);
}

:root.light-mode .mobile-nav-link.active {
  background: rgba(59, 130, 246, 0.15);
}

:root.light-mode .mobile-theme-toggle {
  background: rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.1);
}

:root.light-mode .mobile-theme-toggle:hover {
  background: rgba(0, 0, 0, 0.1);
}

/* Hamburger Menu */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  border-radius: 12px;
  cursor: pointer;
  padding: 10px;
  z-index: 101;
  gap: 5px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.hamburger::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.hamburger:hover::before {
  left: 100%;
}

.hamburger:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.hamburger:active {
  transform: translateY(0);
}

.hamburger-line {
  width: 20px;
  height: 1px;
  background: var(--text);
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
  position: relative;
}

.hamburger-line.active:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
  width: 20px;
}

.hamburger-line.active:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger-line.active:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
  width: 20px;
}

:root.light-mode .hamburger {
  background: rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.1);
}

:root.light-mode .hamburger:hover {
  background: rgba(0, 0, 0, 0.1);
  border-color: rgba(0, 0, 0, 0.15);
}

/* Mobile Menu */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px); */
  z-index: 99;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding-top: 72px;
}

.mobile-menu {
  width: 100%;
  max-width: 320px;
  height: calc(100vh - 72px);
  background: var(--surface);
  border-left: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
}

.mobile-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border);
}

.mobile-menu-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text);
}

.mobile-menu-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  cursor: pointer;
  transition: all 0.2s ease;
}

.mobile-menu-close:hover {
  background: rgba(255, 255, 255, 0.1);
}

.mobile-menu-links {
  display: flex;
  flex-direction: column;
  /* padding: 1rem 0; */
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  text-decoration: none;
  color: var(--text-muted);
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.mobile-nav-link:hover {
  color: var(--text);
  background: rgba(255, 255, 255, 0.05);
  border-left-color: var(--highlight);
}

.mobile-nav-link.active {
  color: var(--text);
  background: rgba(59, 130, 246, 0.1);
  border-left-color: var(--highlight);
}

.mobile-theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  margin: 0.5rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.mobile-theme-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Mobile Menu Transitions */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease;
}

.mobile-menu-enter-active .mobile-menu,
.mobile-menu-leave-active .mobile-menu {
  transition: transform 0.3s ease;
}

.mobile-menu-enter-from {
  opacity: 0;
}

.mobile-menu-enter-from .mobile-menu {
  transform: translateX(100%);
}

.mobile-menu-leave-to {
  opacity: 0;
}

.mobile-menu-leave-to .mobile-menu {
  transform: translateX(100%);
}

/* Responsive Styles */
@media (max-width: 768px) {
  .navbar-container {
    padding: 1rem 1.5rem;
  }
  
  .brand-name {
    font-size: 1.1rem;
  }
  
  .navbar-links {
    display: none;
  }

  .hamburger {
    display: flex;
  }
}

@media (max-width: 640px) {
  .navbar-container {
    padding: 1rem 1.25rem;
  }
  
  .brand-name {
    font-size: 1rem;
  }
  
  .brand-icon {
    width: 32px;
    height: 32px;
  }

  .mobile-menu {
    max-width: 100%;
  }
}
</style>

