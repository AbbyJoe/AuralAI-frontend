<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <!-- Brand Section -->
        <div class="footer-brand">
          <NuxtLink to="/" class="footer-logo">
            <div class="brand-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"></path>
              </svg>
            </div>
            <span class="brand-name">AuralAI</span>
          </NuxtLink>
          <p class="footer-description">
            Decoding the language of music through artificial intelligence. 
            Analyze chord progressions, understand music theory, and explore the structure of your favorite songs.
          </p>
        </div>

        <!-- Links Sections -->
        <div class="footer-links">
          <div class="footer-column">
            <h3 class="footer-column-title">Product</h3>
            <ul class="footer-link-list">
              <li>
                <NuxtLink to="/" class="footer-link">Home</NuxtLink>
              </li>
              <li>
                <a href="/#features" class="footer-link" @click.prevent="scrollToFeatures">Features</a>
              </li>
              <li>
                <NuxtLink to="/about" class="footer-link">About</NuxtLink>
              </li>
            </ul>
          </div>

          <div class="footer-column">
            <h3 class="footer-column-title">Resources</h3>
            <ul class="footer-link-list">
              <li>
                <a href="#" class="footer-link" @click.prevent>Documentation</a>
              </li>
              <li>
                <a href="#" class="footer-link" @click.prevent>API Reference</a>
              </li>
              <li>
                <a href="#" class="footer-link" @click.prevent>Support</a>
              </li>
            </ul>
          </div>

          <div class="footer-column">
            <h3 class="footer-column-title">Legal</h3>
            <ul class="footer-link-list">
              <li>
                <a href="#" class="footer-link" @click.prevent>Privacy Policy</a>
              </li>
              <li>
                <a href="#" class="footer-link" @click.prevent>Terms of Service</a>
              </li>
              <li>
                <a href="#" class="footer-link" @click.prevent>Cookie Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <p class="footer-copyright">
          &copy; {{ currentYear }} AuralAI. All rights reserved.
        </p>
        <div class="footer-social">
          <a href="#" class="social-link" aria-label="GitHub" @click.prevent>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
          <a href="#" class="social-link" aria-label="Twitter" @click.prevent>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </a>
          <a href="#" class="social-link" aria-label="LinkedIn" @click.prevent>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const route = useRoute()

const currentYear = new Date().getFullYear()

// Scroll to features section
const scrollToFeatures = () => {
  if (route.path === '/') {
    const featuresSection = document.querySelector('#features')
    if (featuresSection) {
      const navbarHeight = 72
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
.footer {
  background: rgba(17, 24, 39, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid var(--border);
  margin-top: auto;
  position: relative;
  z-index: 1;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem 2rem;
}

.footer-content {
  display: flex;
  flex-direction: row;
  gap: 4rem;
  margin-bottom: 3rem;
  align-items: flex-start;
  flex-wrap: wrap;
}

.footer-brand {
  flex: 0 0 auto;
  min-width: 280px;
  max-width: 320px;
}

.footer-links {
  display: flex;
  flex-direction: row;
  gap: 3rem;
  flex: 1 1 auto;
  flex-wrap: wrap;
}

.footer-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--text);
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
}

.footer-logo:hover {
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

.footer-description {
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-top: 1rem;
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 0 0 auto;
  min-width: 120px;
}

.footer-column-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}

.footer-link-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: start;
}

.footer-link {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  display: inline-block;
  white-space: nowrap;
}

.footer-link:hover {
  color: var(--text);
  transform: translateY(-2px);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
  flex-wrap: wrap;
  gap: 1.5rem;
}

.footer-copyright {
  color: var(--text-muted);
  font-size: 0.875rem;
}

.footer-social {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: var(--text-muted);
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.05);
}

.social-link:hover {
  color: var(--text);
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

@media (max-width: 968px) {
  .footer-content {
    flex-direction: column;
    gap: 2rem;
  }
  
  .footer-brand {
    max-width: 100%;
  }
  
  .footer-links {
    width: 100%;
    gap: 2rem;
  }
}

@media (max-width: 640px) {
  .footer-container {
    padding: 3rem 1.5rem 1.5rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer-link-list {
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
  
  .footer-social {
    justify-content: center;
  }
}
</style>

