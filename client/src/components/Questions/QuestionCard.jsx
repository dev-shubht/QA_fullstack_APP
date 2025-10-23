/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import AnswerForm from '../Answers/AnswerForm'
import AnswerList from '../Answers/AnswerList'

const QuestionCard = ({ question }) => {
  const [showAnswerForm, setShowAnswerForm] = useState(false)
  const { user } = useAuth()

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

 
  const getCreatorName = () => {
    if (question.creator && typeof question.creator === 'object') {
      return question.creator.name || 'Unknown'
    }
    return 'Unknown'
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{question.title}</h3>
        <span className="text-sm text-gray-500">{formatDate(question.createdAt)}</span>
      </div>
      
      <p className="text-gray-600 mb-4">{question.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {question.tags && question.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
          >
            {typeof tag === 'object' ? tag.name : tag}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>Asked by: {getCreatorName()}</span>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-medium text-gray-700">Answers</h4>
          <button
            onClick={() => setShowAnswerForm(!showAnswerForm)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md text-sm transition duration-200"
          >
            {showAnswerForm ? 'Cancel' : 'Add Answer'}
          </button>
        </div>

        {showAnswerForm && (
          <AnswerForm
            questionId={question._id}
            onAnswerAdded={() => {
              setShowAnswerForm(false)
              // Refresh answers
              window.location.reload()
            }}
          />
        )}

        <AnswerList questionId={question._id} />
      </div>
    </div>
  )
}

export default QuestionCard