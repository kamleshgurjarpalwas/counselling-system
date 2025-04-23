import { useState } from 'react'

export default function AnnouncementForm({ onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:4000/update/pushUpdate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if (response.ok) {
        onAdd(data)
        setFormData({ title: '', content: '' })
      }
    } catch (error) {
      console.error('Error adding announcement:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create New Announcement</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Content</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
          rows="4"
          required
        ></textarea>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Publish Announcement
      </button>
    </form>
  )
}