import { useAuth } from '../context/AuthContext'
import QuestionForm from '../components/Questions/QuestionForm'
import QuestionList from '../components/Questions/QuestionList'

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            {user?.role === 'manager' 
              ? 'Manage team questions and provide insights.' 
              : 'Ask questions and help your teammates by answering theirs.'
            }
          </p>
        </div>

        <QuestionForm onQuestionAdded={() => window.location.reload()} />
        <QuestionList />
      </div>
    </div>
  )
}

export default Dashboard