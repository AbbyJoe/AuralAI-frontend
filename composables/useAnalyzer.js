import axios from 'axios'

export const useAnalyzer = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase || 'hhttps://auralai-backend.onrender.com'

  const analyzeAudio = async (file, onProgress) => {
    const formData = new FormData()
    formData.append('audio', file)

    try {
      const response = await axios.post(`${apiBase}/api/analyze`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            )
            onProgress(percentCompleted)
          }
        },
      })

      return response.data
    } catch (error) {
      console.error('Analysis error:', error)
      throw new Error(error.response?.data?.error || 'Failed to analyze audio')
    }
  }

  const askQuestion = async (question, analysisData) => {
    try {
      const response = await axios.post(`${apiBase}/api/chat`, {
        question,
        analysisData,
      })

      return response.data.answer
    } catch (error) {
      console.error('Chat error:', error)
      throw new Error(error.response?.data?.error || 'Failed to get answer')
    }
  }

  return {
    analyzeAudio,
    askQuestion,
  }
}

