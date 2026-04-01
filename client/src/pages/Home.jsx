import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

export default function Home() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/cars`)
      setCars(response.data)
      setError(null)
    } catch (err) {
      console.error('Error fetching cars:', err)
      setError('Failed to load cars')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto">
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">Loading cars...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto">
        <div className="text-center py-12">
          <p className="text-xl text-red-600">{error}</p>
          <button
            onClick={fetchCars}
            className="btn btn-primary mt-4"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Featured Cars</h1>

      {cars.length === 0 ? (
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <p className="text-lg text-gray-600 mb-4">No cars available yet.</p>
          
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <Link
              key={car.id}
              to={`/car/${car.id}`}
              className="card hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="mb-4 h-48 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={car.image}
                  alt={car.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Car'
                  }}
                />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{car.title}</h2>
              <p className="text-2xl font-bold text-blue-600">${car.price.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-2">
                Listed {new Date(car.createdAt).toLocaleDateString()}
              </p>
              <button className="btn btn-primary w-full mt-4">View Details</button>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
