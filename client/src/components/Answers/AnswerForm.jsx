import { useState } from 'react'
import { useApi } from '../../hooks/useApi'
import { API_ENDPOINTS } from '../../utils/constants'

const AnswerForm = ({ questionId, onAnswerAdded }) => {
  const [content, setContent] = useState('')
  const { request, loading, error } = useApi()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await request(API_ENDPOINTS.ANSWERS, {
        method: 'POST',
        body: {
          questionId,
          content
        }
      })

      onAnswerAdded()
      setContent('')
    } catch (err) {
      console.error('Error creating answer:', err)
    }
  }

  return (
    <div className="mb-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-3">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Write your answer..."
        />
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Posting...' : 'Post Answer'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AnswerForm