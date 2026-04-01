import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

export default function SellCar() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    image: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title || !formData.price || !formData.image) {
      setError('All fields are required')
      return
    }

    if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      setError('Price must be a valid number greater than 0')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await axios.post(`${API_URL}/cars`, {
        title: formData.title,
        price: parseFloat(formData.price),
        image: formData.image,
      })

      setSuccess(true)
      setFormData({ title: '', price: '', image: '' })

      setTimeout(() => {
        navigate(`/car/${response.data.id}`)
      }, 1500)
    } catch (err) {
      console.error('Error listing car:', err)
      setError(err.response?.data?.error || 'Failed to list car')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Add A Car</h1>

        <div className="card">
          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              ✓ Car listed successfully! Redirecting...
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              ✗ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Car Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., 2020 Toyota Camry"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">
                Include year, make, and model
              </p>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Price (USD) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 25000"
                min="1"
                step="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter the asking price without commas
              </p>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/car.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">
                Provide a direct link to a car image
              </p>
              {formData.image && (
                <div className="mt-4 h-48 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Invalid+Image'
                    }}
                  />
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary flex-1 text-lg py-3"
              >
                {loading ? 'Listing car...' : 'List Car'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                disabled={loading}
                className="btn btn-secondary flex-1 text-lg py-3"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Tips */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-bold text-gray-900 mb-3">💡 Tips for selling:</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• Use clear, descriptive titles with year and model</li>
            <li>• Price competitively based on market conditions</li>
            <li>• Use high-quality car images for better results</li>
            <li>• Be prepared for inquiries about your vehicle</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
