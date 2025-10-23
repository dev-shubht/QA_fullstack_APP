import InsightsPanel from '../components/Insights/InsightsPanel'

const InsightsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Manager Insights
          </h1>
          <p className="text-gray-600">
            Create and view insights for team questions
          </p>
        </div>
        
        <InsightsPanel />
      </div>
    </div>
  )
}

export default InsightsPage