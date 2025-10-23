import QuestionList from '../components/Questions/QuestionList'

const QuestionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Team Questions
          </h1>
          <p className="text-gray-600">
            Browse all questions from your team members
          </p>
        </div>
        
        <QuestionList />
      </div>
    </div>
  )
}

export default QuestionsPage