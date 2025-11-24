# Frontend - AI Music Chord Analyzer

Nuxt 3 frontend application for the AI Music Chord Analyzer. Provides a modern, responsive interface for uploading audio files, viewing analysis results, and interacting with AI-powered music theory explanations.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Backend server running (see [Backend README](../backend/README.md))

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Start development server:
```bash
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## ✨ Features

### User Interface
- **Modern, Responsive Design**: Beautiful UI with dark/light theme support
- **Drag-and-Drop Upload**: Easy file upload interface
- **Real-time Progress**: Visual feedback during analysis
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile

### Audio Features
- **Interactive Chord Playback**: Click any chord to hear it synthesized using Tone.js
- **Section Playback**: Play entire chord progressions section by section
- **Audio Preview**: Preview uploaded files before and after analysis
- **Visual Audio Controls**: Intuitive play/pause controls

### Analysis Display
- **Key Overview**: Visual display of detected key with detailed explanations
- **Chord Progressions**: Organized by song sections (intro, verse, chorus, bridge, outro)
- **Color-coded Sections**: Easy visual navigation
- **Interactive Elements**: Hover effects and clickable chords

### AI Integration
- **Music Theory Explanations**: Detailed AI-powered explanations of chord progressions
- **Interactive Chat**: Ask questions about analyzed songs
- **Contextual Responses**: AI understands the musical context
- **Markdown Rendering**: Rich text formatting in AI responses

## 🛠️ Tech Stack

### Core Framework
- **Nuxt 3** - Vue.js framework with SSR support
- **Vue 3 Composition API** - Modern reactive framework

### Audio & Music
- **Tone.js** - Web Audio API for audio synthesis and playback
- **Tonal.js** - Music theory library for chord and key analysis

### HTTP & Data
- **Axios** - HTTP client for API communication

### Styling
- **Custom CSS** - Modern, responsive styling with CSS variables
- **Theme Support** - Dark/light mode with system preference detection

## 📁 Project Structure

```
frontend/
├── components/          # Vue components
│   ├── AudioUpload.vue      # File upload component
│   ├── ChatPanel.vue        # AI chat interface
│   ├── ChordSection.vue      # Chord progression display
│   ├── FeaturesSection.vue  # Features showcase
│   ├── HeroSection.vue      # Hero/landing section
│   ├── KeyOverview.vue      # Key signature display
│   ├── MarkdownRenderer.vue # Markdown content renderer
│   └── Navbar.vue          # Navigation bar
│
├── composables/         # Vue composables (reusable logic)
│   ├── useAnalyzer.js       # Analysis API integration
│   ├── useAudioPlayer.js    # Audio playback logic
│   └── useTheme.js          # Theme management
│
├── pages/               # Nuxt pages (routes)
│   ├── index.vue           # Home/upload page
│   ├── analyze.vue         # Analysis results page
│   └── about.vue           # About page
│
├── plugins/             # Nuxt plugins
│   ├── theme.client.js     # Theme initialization
│   └── tone.client.js      # Tone.js initialization
│
├── assets/              # Static assets
│   └── css/
│       └── main.css         # Main stylesheet
│
├── layouts/             # Layout templates
│   └── default.vue         # Default layout
│
└── nuxt.config.ts       # Nuxt configuration
```

## 🔧 Configuration

### API Base URL

Configure the backend API URL in `nuxt.config.ts`:

```typescript
runtimeConfig: {
  public: {
    apiBase: process.env.API_BASE_URL || 'http://localhost:3001'
  }
}
```

Or set via environment variable:
```bash
API_BASE_URL=http://localhost:3001 npm run dev
```

### Build Configuration

The Nuxt config includes optimizations for Tone.js and Tonal.js:
- Transpilation for Tone.js
- Optimized dependencies for Vite
- SSR configuration

## 🎨 Theming

The application supports dark and light themes with automatic system preference detection. Theme state is managed via the `useTheme` composable and persisted in localStorage.

### Theme Toggle

Users can toggle themes via the theme switcher in the navigation bar.

## 📱 Pages

### Home (`/`)
- File upload interface
- Features showcase
- Hero section with call-to-action

### Analyze (`/analyze`)
- Analysis results display
- Key overview
- Chord progressions by section
- Interactive chat interface

### About (`/about`)
- Project information
- Feature descriptions

## 🔌 API Integration

The frontend communicates with the backend via the following endpoints:

- `POST /api/analyze` - Upload and analyze audio file
- `POST /api/chat` - Send chat messages about analyzed songs

See [Backend README](../backend/README.md) for detailed API documentation.

## 🎵 Audio Playback

### Chord Playback
Uses Tone.js to synthesize and play individual chords when clicked.

### Section Playback
Plays entire chord progressions section by section with automatic timing.

### Audio Preview
Uses HTML5 Audio API for previewing uploaded files.

## 🐛 Troubleshooting

### Audio Playback Issues
- Check browser console for errors
- Verify Tone.js is properly initialized
- Ensure browser supports Web Audio API
- Check that audio context is not suspended

### API Connection Issues
- Verify backend is running on the configured port
- Check `API_BASE` configuration in `nuxt.config.ts`
- Look for CORS errors in browser console

### Build Issues
- Clear `.nuxt` directory and rebuild
- Ensure all dependencies are installed
- Check Node.js version (18+ required)

## 📦 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build
- `npm run postinstall` - Prepare Nuxt (auto-runs after install)

## 🔮 Future Enhancements

- [ ] Progressive Web App (PWA) support
- [ ] Offline mode
- [ ] Advanced visualizations (waveform, spectrogram)
- [ ] Export analysis results
- [ ] Keyboard shortcuts
- [ ] Accessibility improvements

## 📄 License

MIT License

