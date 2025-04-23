import { useState, useEffect } from 'react'

export default function AnnouncementList() {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('http://localhost:4000/update/getAll', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        })
        const data = await response.json()
        if (response.ok) {
          setAnnouncements(data)
        }
      } catch (error) {
        console.error('Error fetching announcements:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAnnouncements()
  }, [])

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/update/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      })
      if (response.ok) {
        setAnnouncements(announcements.filter(ann => ann._id !== id))
      }
    } catch (error) {
      console.error('Error deleting announcement:', error)
    }
  }

  if (loading) return <div className="text-center py-8">Loading...</div>

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Current Announcements</h2>
      {announcements.length === 0 ? (
        <p className="text-gray-500">No announcements yet.</p>
      ) : (
        <div className="space-y-4">
          {announcements.map(ann => (
            <div key={ann._id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg">{ann.title}</h3>
                <button
                  onClick={() => handleDelete(ann._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
              <p className="mt-2 text-gray-700">{ann.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(ann.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}