import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem('adminToken')

  const handleLogout = () => {
    fetch('http://localhost:4000/admin/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      }
    })
    localStorage.removeItem('adminToken')
    navigate('/login')
  }

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Admin Dashboard</Link>
        <div className="flex space-x-4">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="hover:bg-blue-700 px-3 py-2 rounded">Dashboard</Link>
              <Link to="/announcements" className="hover:bg-blue-700 px-3 py-2 rounded">Announcements</Link>
              <button onClick={handleLogout} className="hover:bg-blue-700 px-3 py-2 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:bg-blue-700 px-3 py-2 rounded">Login</Link>
              <Link to="/register" className="hover:bg-blue-700 px-3 py-2 rounded">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}