// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:3001'
    }
  },
  build: {
    transpile: ['tone']
  },
  vite: {
    optimizeDeps: {
      include: ['tone', '@tonaljs/tonal']
    }
  },
  ssr: {
    noExternal: []
  }
})

