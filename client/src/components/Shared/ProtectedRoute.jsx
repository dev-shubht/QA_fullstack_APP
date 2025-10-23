import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

const ProtectedRoute = ({ children, requireManager = false }) => {
  const { user, loading, isManager } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please log in to access this page.</p>
          <Link to="/login" className="bg-blue-500 text-white px-6 py-2 rounded-md">
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  if (requireManager && !isManager()) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600">Manager role required to access this page.</p>
        </div>
      </div>
    )
  }

  return children
}

export default ProtectedRoute