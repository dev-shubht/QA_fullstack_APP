import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Shared/Navbar'
import ProtectedRoute from './components/Shared/ProtectedRoute'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Dashboard from './pages/Dashboard'
import QuestionsPage from './pages/QuestionsPage'
import InsightsPage from './pages/InsightsPage'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/questions" element={
              <ProtectedRoute>
                <QuestionsPage />
              </ProtectedRoute>
            } />
            
            <Route path="/insights" element={
              <ProtectedRoute requireManager={true}>
                <InsightsPage />
              </ProtectedRoute>
            } />
            
            
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App