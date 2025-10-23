import { useState, useEffect } from 'react'
import { useApi } from '../../hooks/useApi'
import { API_ENDPOINTS } from '../../utils/constants'

const AnswerList = ({ questionId }) => {
  const [answers, setAnswers] = useState([])
  const { request, loading } = useApi()

  const fetchAnswers = async () => {
    try {
      const data = await request(`${API_ENDPOINTS.ANSWERS}/${questionId}`)
      setAnswers(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Error fetching answers:', err)
      setAnswers([])
    }
  }

  useEffect(() => {
    if (questionId) {
      fetchAnswers()
    }
  }, [questionId])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCreatorName = (answer) => {
    if (answer.creator && typeof answer.creator === 'object') {
      return answer.creator.name || 'Unknown'
    }
    return 'Unknown'
  }

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {answers.map(answer => (
        <div key={answer._id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-gray-700 mb-2">{answer.content}</p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>By: {getCreatorName(answer)}</span>
            <span>{formatDate(answer.createdAt)}</span>
          </div>
        </div>
      ))}
      
      {answers.length === 0 && (
        <p className="text-gray-500 text-center py-4">No answers yet. Be the first to answer!</p>
      )}
    </div>
  )
}

export default AnswerList