import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ResultDeclaration from '../components/ResultDeclaration'

export default function Dashboard() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button 
              onClick={() => navigate('/announcements')}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Manage Announcements
            </button>
          </div>
        </div>
        <ResultDeclaration />
      </div>
    </div>
  )
}