import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { API_BASE_URL } from '../utils/constants'

export const useApi = () => {
  const { token } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = async (endpoint, options = {}) => {
    setLoading(true)
    setError(null)

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
        ...options,
      }

      if (config.body && typeof config.body === 'object') {
        config.body = JSON.stringify(config.body)
      }

      const url = `${API_BASE_URL}${endpoint}`
      console.log('Making request to:', url) 

      const response = await fetch(url, config)
      
     
      if (!response) {
        throw new Error('Network error: No response from server')
      }

      const text = await response.text()
      let data = {}
      
      try {
        data = text ? JSON.parse(text) : {}
      } catch (parseError) {
        console.error('JSON parse error:', parseError, 'Response text:', text)
        throw new Error('Invalid JSON response from server')
      }

      if (!response.ok) {
        throw new Error(data.message || data.error || `HTTP ${response.status}: ${response.statusText}`)
      }

      return data
    } catch (err) {
      const errorMessage = err.message || 'Network request failed'
      setError(errorMessage)
      console.error('API request failed:', errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    request,
    clearError: () => setError(null),
  }
}