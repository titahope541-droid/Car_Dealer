import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const API_URL = 'https://car-dealer-mc48.onrender.com/api'

export default function Favorites() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [carsData, setCarsData] = useState({})

  useEffect(() => {
    loadFavorites()
    fetchAllCars()
  }, [])

  const fetchAllCars = async () => {
    try {
      const response = await fetch(`${API_URL}/cars`)
      const data = await response.json()
      const carsMap = {}
      data.forEach(car => {
        carsMap[car.id] = car
      })
      setCarsData(carsMap)
    } catch (err) {
      console.error('Error fetching cars:', err)
    }
  }

  const loadFavorites = () => {
    try {
      setLoading(true)
      const saved = localStorage.getItem('favoritesCars')
      if (saved) {
        setFavorites(JSON.parse(saved))
      } else {
        setFavorites([])
      }
    } catch (err) {
      console.error('Error loading favorites:', err)
    } finally {
      setLoading(false)
    }
  }

  const removeFavorite = (carId) => {
    const updated = favorites.filter(id => id !== carId)
    setFavorites(updated)
    localStorage.setItem('favoritesCars', JSON.stringify(updated))
  }

  const toggleFavorite = (carId) => {
    if (favorites.includes(carId)) {
      removeFavorite(carId)
    } else {
      const updated = [...favorites, carId]
      setFavorites(updated)
      localStorage.setItem('favoritesCars', JSON.stringify(updated))
    }
  }

  // Expose to window for other components
  useEffect(() => {
    window.toggleFavorite = toggleFavorite
    window.isFavorited = (carId) => favorites.includes(carId)
  }, [favorites])

  const favoritesCars = favorites
    .map(id => carsData[id])
    .filter(car => car !== undefined)

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-xl text-gray-600">Loading favorites...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2 text-gray-900">Saved Cars</h1>
      <p className="text-gray-600 mb-8">Your favorite vehicles in one place</p>

      {favoritesCars.length === 0 ? (
        <div className="max-w-md mx-auto text-center card">
          <div className="text-6xl mb-4">💔</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Saved Cars</h2>
          <p className="text-gray-600 mb-6">
            You haven't saved any cars yet. Browse our inventory and click the heart icon to save your favorites!
          </p>
          <Link to="/inventory" className="btn btn-primary w-full">
            Browse Inventory
          </Link>
        </div>
      ) : (
        <div>
          {/* Favorites Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="card bg-red-50">
              <p className="text-gray-600">Saved Cars</p>
              <p className="text-3xl font-bold text-red-600">❤️ {favoritesCars.length}</p>
            </div>
            <div className="card bg-green-50">
              <p className="text-gray-600">Average Price</p>
              <p className="text-3xl font-bold text-green-600">
                ${favoritesCars.length > 0 
                  ? (favoritesCars.reduce((sum, car) => sum + car.price, 0) / favoritesCars.length / 1000).toFixed(1)
                  : 0}K
              </p>
            </div>
            <div className="card bg-blue-50">
              <p className="text-gray-600">Price Range</p>
              <p className="text-sm text-blue-600 font-bold">
                ${favoritesCars.length > 0 
                  ? `${(Math.min(...favoritesCars.map(car => car.price)) / 1000).toFixed(0)}K - ${(Math.max(...favoritesCars.map(car => car.price)) / 1000).toFixed(0)}K`
                  : '$0K'}
              </p>
            </div>
          </div>

          {/* Favorites Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoritesCars.map((car) => (
              <div
                key={car.id}
                className="card hover:shadow-lg transition-shadow relative"
              >
                {/* Remove Favorite Button */}
                <button
                  onClick={() => removeFavorite(car.id)}
                  className="absolute top-4 right-4 text-red-500 text-2xl hover:text-red-700 transition z-10"
                  title="Remove from favorites"
                >
                  ❤️
                </button>

                <Link to={`/car/${car.id}`} className="block">
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
                </Link>

                <p className="text-2xl font-bold text-blue-600 mb-2">${car.price.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mb-4">
                  Saved {new Date(car.createdAt).toLocaleDateString()}
                </p>

                <div className="flex gap-2">
                  <Link to={`/car/${car.id}`} className="btn btn-primary flex-1">
                    View Details
                  </Link>
                  <button
                    onClick={() => removeFavorite(car.id)}
                    className="btn btn-secondary"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action Section */}
          <div className="mt-12 card bg-gradient-to-r from-blue-50 to-purple-50">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Ready to Buy?</h3>
            <p className="text-gray-700 mb-4">
              Compare your saved cars and find the perfect one for you. Click on any car to see pricing options and make a purchase!
            </p>
            <Link to="/" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
