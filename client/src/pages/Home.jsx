import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const API_URL = 'https://car-dealer-mc48.onrender.com/api'

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
        <section class="py-32 relative"
            style="background-image: url('data:image/jpeg;base64,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'); background-repeat: no-repeat; background-position: center; background-size: cover;">

            
            <div class="absolute inset-0 bg-black/60 "></div>

            <div class="relative max-w-6xl mx-auto px-6 text-center z-10">
                <h1 class="text-4xl md:text-5xl font-extrabold text-accent leading-tight">
                    Preserving the Legacy, Empowering the Future
                </h1>

                <p class="mt-6 max-w-3xl mx-auto text-lg text-muted">
                    Join us in our mission to preserve the rich heritage of classic cars while empowering the next generation of automotive enthusiasts. Through education, restoration, and community engagement, we strive to keep the spirit of classic cars alive for years to come.
                </p>

                <div class="mt-10 flex flex-wrap justify-center gap-4">
                    <link to="/inventory"
                        class="px-7 py-3 rounded-4xl bg-transparent border-2 border-primary text-accent font-medium hover:bg-primary hover:text-white transition">
                        Check Our Inventory
                    </link>

                    
                </div>
            </div>
        </section>
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
