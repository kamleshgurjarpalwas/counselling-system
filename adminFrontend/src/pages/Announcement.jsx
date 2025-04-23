import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AnnouncementForm from '../components/AnnouncementForm'
import AnnouncementList from '../components/AnnouncementList'

export default function Announcements() {
  const navigate = useNavigate()
  const [announcements, setAnnouncements] = useState([])

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      navigate('/login')
    }
  }, [navigate])

  const handleAddAnnouncement = (newAnnouncement) => {
    setAnnouncements([newAnnouncement, ...announcements])
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Announcements Management</h1>
      <AnnouncementForm onAdd={handleAddAnnouncement} />
      <AnnouncementList />
    </div>
  )
}