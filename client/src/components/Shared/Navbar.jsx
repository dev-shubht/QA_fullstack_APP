import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const { user, logout, isManager } = useAuth()

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-gray-800">Team Q&A</h1>
            <div className="flex space-x-4">
              <a href="/dashboard" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md">
                Dashboard
              </a>
              <a href="/questions" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md">
                Questions
              </a>
              {isManager() && (
                <a href="/insights" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md">
                  Insights
                </a>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-700">
                  Welcome, {user.name} ({user.role})
                </span>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-x-2">
                <a href="/login" className="text-gray-600 hover:text-blue-600 px-3 py-2">
                  Login
                </a>
                <a href="/register" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                  Register
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar