/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { useApi } from '../../hooks/useApi'
import { API_ENDPOINTS } from '../../utils/constants'
import QuestionCard from './QuestionCard'
import SearchBar from '../Shared/SearchBar'

const QuestionList = () => {
  const [questions, setQuestions] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const { request, loading, error } = useApi()

  const fetchQuestions = async (query = '') => {
    try {
      const params = new URLSearchParams()
      if (query) {
        params.append('q', query)
      }
      
      const endpoint = params.toString() 
        ? `${API_ENDPOINTS.QUESTIONS}?${params.toString()}`
        : API_ENDPOINTS.QUESTIONS
        
      const data = await request(endpoint)
      setQuestions(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Error fetching questions:', err)
      setQuestions([])
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  const handleSearch = (query) => {
    setSearchQuery(query)
    fetchQuestions(query)
  }

  const handleQuestionAdded = (newQuestion) => {
    setQuestions(prev => [newQuestion, ...prev])
  }

  if (loading && questions.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search questions by title or tags..."
        />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {questions.map(question => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>

      {questions.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No questions found.</p>
          {searchQuery && (
            <p className="text-gray-400 mt-2">Try adjusting your search terms.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default QuestionList