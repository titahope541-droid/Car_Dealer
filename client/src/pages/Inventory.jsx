import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const API_URL = 'https://car-dealer-mc48.onrender.com/api'

export default function Inventory() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterPrice, setFilterPrice] = useState('all')

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
      console.error('Error fetching inventory:', err)
      setError('Failed to load inventory')
    } finally {
      setLoading(false)
    }
  }

  const filteredCars = cars.filter((car) => {
    if (filterPrice === 'all') return true
    if (filterPrice === 'under10') return car.price < 10000
    if (filterPrice === '10to30') return car.price >= 10000 && car.price < 30000
    if (filterPrice === '30to60') return car.price >= 30000 && car.price < 60000
    if (filterPrice === 'over60') return car.price >= 60000
    return true
  })

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-xl text-gray-600">Loading inventory...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Our Inventory</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
          <button onClick={fetchCars} className="btn btn-primary ml-4">
            Retry
          </button>
        </div>
      )}

      {/* Filter Section */}
      <div className="card mb-8">
        <h3 className="font-bold text-lg mb-4">Filter by Price</h3>
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => setFilterPrice('all')}
            className={`px-4 py-2 rounded ${
              filterPrice === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            All Prices
          </button>
          <button
            onClick={() => setFilterPrice('under10')}
            className={`px-4 py-2 rounded ${
              filterPrice === 'under10'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            Under $10K
          </button>
          <button
            onClick={() => setFilterPrice('10to30')}
            className={`px-4 py-2 rounded ${
              filterPrice === '10to30'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            $10K - $30K
          </button>
          <button
            onClick={() => setFilterPrice('30to60')}
            className={`px-4 py-2 rounded ${
              filterPrice === '30to60'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            $30K - $60K
          </button>
          <button
            onClick={() => setFilterPrice('over60')}
            className={`px-4 py-2 rounded ${
              filterPrice === 'over60'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            Over $60K
          </button>
        </div>
      </div>

      {/* Inventory Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card bg-blue-50">
          <p className="text-gray-600">Total Vehicles</p>
          <p className="text-3xl font-bold text-blue-600">{cars.length}</p>
        </div>
        <div className="card bg-green-50">
          <p className="text-gray-600">Filtered Results</p>
          <p className="text-3xl font-bold text-green-600">{filteredCars.length}</p>
        </div>
        <div className="card bg-purple-50">
          <p className="text-gray-600">Average Price</p>
          <p className="text-3xl font-bold text-purple-600">
            ${(cars.reduce((sum, car) => sum + car.price, 0) / cars.length / 1000).toFixed(1)}K
          </p>
        </div>
        <div className="card bg-orange-50">
          <p className="text-gray-600">Price Range</p>
          <p className="text-sm text-orange-600 font-bold">
            ${(Math.min(...cars.map(car => car.price)) / 1000).toFixed(0)}K - ${(Math.max(...cars.map(car => car.price)) / 1000).toFixed(0)}K
          </p>
        </div>
      </div>

      {/* Cars Grid */}
      {filteredCars.length === 0 ? (
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <p className="text-lg text-gray-600 mb-4">No cars found in this price range.</p>
          <button
            onClick={() => setFilterPrice('all')}
            className="btn btn-primary"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <Link
              key={car.id}
              to={`/car/${car.id}`}
              className="card hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="mb-4 h-48 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={car.image}
                  alt={car.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Car'
                  }}
                />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{car.title}</h2>
              <p className="text-2xl font-bold text-blue-600 mb-2">${car.price.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mb-4">
                Listed {new Date(car.createdAt).toLocaleDateString()}
              </p>
              <button className="btn btn-primary w-full">View Details</button>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
