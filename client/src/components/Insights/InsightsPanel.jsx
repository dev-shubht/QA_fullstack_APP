import { useState, useEffect } from 'react'
import { useApi } from '../../hooks/useApi'
import { API_ENDPOINTS } from '../../utils/constants'

const InsightsPanel = () => {
  const [questions, setQuestions] = useState([])
  const [selectedQuestion, setSelectedQuestion] = useState('')
  const [summary, setSummary] = useState('')
  const [insights, setInsights] = useState([])
  const { request, loading, error } = useApi()

  const fetchQuestions = async () => {
    try {
      const data = await request(API_ENDPOINTS.QUESTIONS)
      setQuestions(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Error fetching questions:', err)
    }
  }

  const fetchAllInsights = async () => {
    try {
      
      const allInsights = []
      
      for (const question of questions) {
        try {
          const questionInsights = await request(`${API_ENDPOINTS.INSIGHTS}/${question._id}`)
          if (Array.isArray(questionInsights)) {
            
            const insightsWithQuestion = questionInsights.map(insight => ({
              ...insight,
              questionTitle: question.title,
              questionId: question._id
            }))
            allInsights.push(...insightsWithQuestion)
          }
        } catch (err) {
          console.log(`No insights for question ${question._id}`)
        }
      }
      
      
      allInsights.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setInsights(allInsights)
    } catch (err) {
      console.error('Error fetching insights:', err)
      setInsights([])
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  
  useEffect(() => {
    if (questions.length > 0) {
      fetchAllInsights()
    }
  }, [questions])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await request(API_ENDPOINTS.INSIGHTS, {
        method: 'POST',
        body: {
          questionId: selectedQuestion,
          summary
        }
      })
      
      setSummary('')
      setSelectedQuestion('')
      
      
      await fetchAllInsights()
      
     
      alert('Insight created successfully!')
    } catch (err) {
      console.error('Error creating insight:', err)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCreatorName = (insight) => {
    if (insight.creator && typeof insight.creator === 'object') {
      return insight.creator.name || 'Unknown'
    }
    return 'Unknown'
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Create Insight</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
              Select Question
            </label>
            <select
              id="question"
              value={selectedQuestion}
              onChange={(e) => setSelectedQuestion(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Choose a question</option>
              {questions.map(question => (
                <option key={question._id} value={question._id}>
                  {question.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
              Insight Summary
            </label>
            <textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Provide a comprehensive insight summary for this question..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-md transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Insight'}
          </button>
        </form>
      </div>

     
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Insights</h2>
          <button
            onClick={fetchAllInsights}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded text-sm transition duration-200 disabled:opacity-50"
          >
            Refresh
          </button>
        </div>
        
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>
          ) : insights.length > 0 ? (
            insights.map(insight => (
              <div key={insight._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800 text-sm bg-purple-100 px-2 py-1 rounded">
                    {insight.questionTitle || 'Unknown Question'}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {formatDate(insight.createdAt)}
                  </span>
                </div>
                
                <p className="text-gray-700 text-sm mb-3 whitespace-pre-wrap">
                  {insight.summary}
                </p>
                
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>By: {getCreatorName(insight)}</span>
                  {insight.creator?.role === 'manager' && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      Manager
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <p className="text-gray-500">No insights created yet.</p>
              <p className="text-gray-400 text-sm mt-1">Create your first insight using the form.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InsightsPanel