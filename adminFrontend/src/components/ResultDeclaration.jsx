import { useState } from 'react'

export default function ResultDeclaration() {
  const [resultData, setResultData] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:4000/data/algo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ data: resultData })
      })
      const data = await response.json()
      if (response.ok) {
        setMessage('Results declared successfully!')
        setResultData('')
      }
    } catch (error) {
      console.error('Error declaring results:', error)
      setMessage('Failed to declare results')
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Declare Results</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Result Data</label>
          <textarea
            value={resultData}
            onChange={(e) => setResultData(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Declare Results
        </button>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </form>
    </div>
  )
}