import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_URL = 'https://car-dealer-mc48.onrender.com/api'

export default function Admin() {
  const navigate = useNavigate()
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    image: '',
  })

  // Fetch all cars on mount
  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/cars`)
      setCars(response.data)
    } catch (err) {
      console.error('Error fetching cars:', err)
      setError('Failed to load cars')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddCar = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.title.trim() || !formData.price.trim() || !formData.image.trim()) {
      setError('All fields are required')
      return
    }

    if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      setError('Price must be a positive number')
      return
    }

    try {
      setError(null)
      setSuccess(null)
      setLoading(true)

      const response = await axios.post(`${API_URL}/cars`, {
        title: formData.title.trim(),
        price: parseFloat(formData.price),
        image: formData.image.trim(),
      })

      // Add new car to list
      setCars([...cars, response.data])
      
      // Reset form
      setFormData({ title: '', price: '', image: '' })
      
      setSuccess(`✓ Car "${response.data.title}" added successfully!`)
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      console.error('Error adding car:', err)
      setError(err.response?.data?.error || 'Failed to add car')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCar = async (carId, carTitle) => {
    if (!window.confirm(`Delete "${carTitle}"?`)) {
      return
    }

    try {
      setError(null)
      await axios.delete(`${API_URL}/cars/${carId}`)

      // Remove car from list instantly
      setCars(cars.filter((car) => car.id !== carId))
      
      setSuccess(`✓ Car deleted successfully!`)
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      console.error('Error deleting car:', err)
      setError(err.response?.data?.error || 'Failed to delete car')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">🛠️ Admin Panel</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            ← Back
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            ✗ {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        {/* Add Car Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">➕ Add New Car</h2>

          <form onSubmit={handleAddCar} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Car Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., 2023 BMW X5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                disabled={loading}
              />
            </div>

            {/* Price Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Price (USD) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="e.g., 35000"
                min="1"
                step="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                disabled={loading}
              />
            </div>

            {/* Image URL Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-bold transition"
              >
                {loading ? 'Adding...' : '✓ Add Car'}
              </button>
            </div>
          </form>

          {/* Image Preview */}
          {formData.image && (
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-700 mb-2">Image Preview:</p>
              <div className="h-32 w-48 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Invalid+Image'
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cars List */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">📋 All Cars ({cars.length})</h2>
            <button
              onClick={fetchCars}
              disabled={loading}
              className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              🔄 Refresh
            </button>
          </div>

          {loading && cars.length === 0 ? (
            <p className="text-center text-gray-500 py-12">Loading cars...</p>
          ) : cars.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No cars in inventory yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <div
                  key={car.id}
                  className="border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition"
                >
                  {/* Car Image */}
                  <div className="h-40 bg-gray-200 overflow-hidden">
                    <img
                      src={car.image}
                      alt={car.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Car+Image'
                      }}
                    />
                  </div>

                  {/* Car Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 truncate">
                      {car.title}
                    </h3>
                    <p className="text-2xl font-bold text-blue-600 mb-4">
                      ${car.price.toLocaleString()}
                    </p>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteCar(car.id, car.title)}
                      disabled={loading}
                      className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-bold transition"
                    >
                      🗑️ Delete
                    </button>
                  </div>

                  {/* Car ID */}
                  <div className="px-4 pb-3 text-xs text-gray-500">
                    ID: {car.id}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
