<template>
  <!-- About Section -->
    <section class="about-section">
      <div class="container">
        <div class="about-header">
          <h1 class="about-title">About AuralAI</h1>
          <p class="about-subtitle">Decoding the language of music through artificial intelligence</p>
          <NuxtLink to="/" class="btn-analyze">
            <span>Start Analyzing</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </NuxtLink>
        </div>

        <div class="about-content">
          <div class="about-card">
            <div class="feature-icon-wrapper">
              <div class="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M16 4L4 10l12 6 12-6-12-6z"></path>
                  <path d="M4 22l12 6 12-6"></path>
                  <path d="M4 16l12 6 12-6"></path>
                </svg>
              </div>
            </div>
            <h2 class="card-title">Our Mission</h2>
            <p class="card-text">
              AuralAI is designed to make music theory accessible to everyone. Whether you're a musician 
              learning new songs, a producer analyzing chord progressions, or simply curious about the 
              structure of your favorite tracks, we provide powerful AI-driven analysis tools to help you 
              understand the musical DNA of any song.
            </p>
          </div>

          <div class="about-card">
            <div class="feature-icon-wrapper">
              <div class="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M16 4v6"></path>
                  <path d="M16 22v6"></path>
                  <path d="M4 16h6"></path>
                  <path d="M22 16h6"></path>
                  <path d="M8 8l4.5 4.5"></path>
                  <path d="M19.5 19.5L24 24"></path>
                  <path d="M24 8l-4.5 4.5"></path>
                  <path d="M12.5 19.5L8 24"></path>
                </svg>
              </div>
            </div>
            <h2 class="card-title">Our Vision</h2>
            <p class="card-text">
              We envision a future where music theory is no longer a barrier to musical creativity and understanding. 
              AuralAI aims to democratize access to advanced music analysis, making it possible for musicians of all 
              levels to deepen their understanding of harmony, composition, and musical structure. By combining the 
              power of artificial intelligence with intuitive interfaces, we're building tools that inspire and 
              empower the next generation of musicians and music enthusiasts.
            </p>
          </div>

          <div class="about-card">
            <div class="feature-icon-wrapper">
              <div class="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="16" cy="16" r="12"></circle>
                  <polyline points="16 8 16 16 20 18"></polyline>
                </svg>
              </div>
            </div>
            <h2 class="card-title">How It Works</h2>
            <p class="card-text">
              Our advanced AI algorithms analyze audio files using state-of-the-art music information 
              retrieval techniques. We combine signal processing, machine learning, and music theory to 
              identify chord progressions, detect song sections, and provide detailed harmonic analysis. 
              The system processes your audio in real-time and delivers comprehensive insights about the 
              musical structure.
            </p>
          </div>

          <div class="about-card">
            <div class="feature-icon-wrapper">
              <div class="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 26v-2a4 4 0 0 0-4-4H10a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="10" r="4"></circle>
                  <path d="M28 26v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M20 4.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
            </div>
            <h2 class="card-title">Technology</h2>
            <p class="card-text">
              Built with cutting-edge technologies including Essentia for audio analysis, OpenAI for 
              intelligent music theory explanations, and Tone.js for interactive audio playback. Our 
              platform combines the power of machine learning with traditional music theory to provide 
              accurate and insightful chord detection and harmonic analysis.
            </p>
          </div>

        </div>
      </div>
    </section>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

// Set page metadata
useHead({
  title: 'About - AuralAI',
  meta: [
    { name: 'description', content: 'Learn about AuralAI and how we use AI to analyze music and decode chord progressions.' }
  ]
})
</script>

<style scoped>
.about-section {
  padding: 6rem 0 8rem;
  position: relative;
  min-height: 100vh;
}

.about-header {
  text-align: center;
  margin-bottom: 4rem;
  animation: fade-up 0.6s ease-out;
}

.about-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--text-light) 0%, var(--text) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.about-subtitle {
  font-size: clamp(1.1rem, 2vw, 1.25rem);
  color: var(--text-muted);
  max-width: 600px;
  margin: 0 auto 2rem;
}

.btn-analyze {
  width: auto;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s;
  text-decoration: none;
}

.btn-analyze:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
}

.btn-analyze:active {
  transform: translateY(0);
}

.about-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.about-card {
  background: rgba(17, 24, 39, 0.6);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  animation: fade-up 0.6s ease-out;
}

.about-card:nth-child(1) { animation-delay: 0.1s; }
.about-card:nth-child(2) { animation-delay: 0.2s; }
.about-card:nth-child(3) { animation-delay: 0.3s; }
.about-card:nth-child(4) { animation-delay: 0.4s; }

.about-card:hover {
  transform: translateY(-4px);
  border-color: rgba(59, 130, 246, 0.3);
  background: rgba(17, 24, 39, 0.8);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* Use the same icon styling as landing page features */
.feature-icon-wrapper {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  margin-bottom: 1.5rem;
}

.feature-icon {
  font-size: 0;
  color: var(--text-light);
}

.feature-icon svg {
  width: 2.25rem;
  height: 2.25rem;
  display: block;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text);
}

.card-text {
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 968px) {
  .about-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .about-section {
    padding: 4rem 0 6rem;
  }
  
  .about-content {
    gap: 1.5rem;
  }
  
  .about-card {
    padding: 1.5rem;
  }
}
</style>

