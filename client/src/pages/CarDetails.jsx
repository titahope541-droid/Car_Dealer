import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

const API_URL = 'http://localhost:5000/api'

export default function CarDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  useEffect(() => {
    fetchCarDetails()
    checkIfFavorited()
  }, [id])

  const fetchCarDetails = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/cars/${id}`)
      setCar(response.data)
      setError(null)
    } catch (err) {
      console.error('Error fetching car:', err)
      setError('Car not found')
    } finally {
      setLoading(false)
    }
  }

  const checkIfFavorited = () => {
    const saved = localStorage.getItem('favoritesCars')
    if (saved) {
      const favorites = JSON.parse(saved)
      setIsFavorited(favorites.includes(parseInt(id)))
    }
  }

  const toggleFavorite = () => {
    const saved = localStorage.getItem('favoritesCars')
    let favorites = saved ? JSON.parse(saved) : []
    const carId = parseInt(id)

    if (favorites.includes(carId)) {
      favorites = favorites.filter(fav => fav !== carId)
      setIsFavorited(false)
    } else {
      favorites.push(carId)
      setIsFavorited(true)
    }

    localStorage.setItem('favoritesCars', JSON.stringify(favorites))
  }

  const handlePayment = async (paymentType) => {
    if (!car) return

    try {
      setPaymentProcessing(true)
      const response = await axios.post(`${API_URL}/pay`, {
        price: car.price,
        type: paymentType,
      })

      if (response.data.url) {
        // Save order to localStorage before redirecting
        const order = {
          id: Date.now(),
          carId: car.id,
          carTitle: car.title,
          amount: paymentType === 'deposit' 
            ? Math.round((car.price * (car.price < 10000 ? 0.075 : car.price < 100000 ? 0.05 : 0.01)) * 100)
            : Math.round(car.price * 100),
          paymentType,
          status: 'Pending',
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
        }
        
        const saved = localStorage.getItem('carOrders')
        const orders = saved ? JSON.parse(saved) : []
        orders.unshift(order)
        localStorage.setItem('carOrders', JSON.stringify(orders))

        // Redirect to Stripe
        window.location.href = response.data.url
      }
    } catch (err) {
      console.error('Payment error:', err)
      alert('Payment failed: ' + (err.response?.data?.error || err.message))
      setPaymentProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto">
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">Loading car details...</p>
        </div>
      </div>
    )
  }

  if (error || !car) {
    return (
      <div className="container mx-auto">
        <div className="text-center py-12">
          <p className="text-xl text-red-600">{error || 'Car not found'}</p>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary mt-4"
          >
            Back to Cars
          </button>
        </div>
      </div>
    )
  }

  const depositPercentage =
    car.price < 10000 ? 7.5 : car.price < 100000 ? 5 : 1
  const depositAmount = (car.price * depositPercentage) / 100

  return (
    <div className="container mx-auto px-4 py-12">
      <button
        onClick={() => navigate('/')}
        className="btn btn-secondary mb-6"
      >
        ← Back to Browse
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="card h-fit">
          <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden mb-4 relative">
            <img
              src={car.image}
              alt={car.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300?text=Car'
              }}
            />
            <button
              onClick={toggleFavorite}
              className="absolute top-4 right-4 text-3xl hover:scale-110 transition"
              title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorited ? '❤️' : '🤍'}
            </button>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-secondary flex-1">
              📸 Share
            </button>
            <button className="btn btn-secondary flex-1">
              🔍 Compare
            </button>
          </div>
        </div>

        {/* Details Section */}
        <div className="card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{car.title}</h1>
              <p className="text-gray-600">
                Listed on {new Date(car.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mb-8 pb-8 border-b">
            <p className="text-5xl font-bold text-blue-600">${car.price.toLocaleString()}</p>
          </div>

          {/* Payment Info */}
          <div className="mb-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">💳 Payment Options</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Full Payment:</span>
                <span className="font-bold">${car.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Deposit ({depositPercentage}%):</span>
                <span className="font-bold text-blue-600">${depositAmount.toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handlePayment('deposit')}
              disabled={paymentProcessing}
              className="btn btn-success w-full text-lg py-3"
            >
              {paymentProcessing ? 'Processing...' : `💰 Reserve with Deposit (${depositPercentage}%)`}
            </button>
            <button
              onClick={() => handlePayment('full')}
              disabled={paymentProcessing}
              className="btn btn-primary w-full text-lg py-3"
            >
              {paymentProcessing ? 'Processing...' : '🛒 Buy Now (Full Payment)'}
            </button>
          </div>

          {/* Quick Links */}
          <div className="flex gap-2">
            <Link to="/inventory" className="btn btn-secondary flex-1 text-sm">
              📋 View Inventory
            </Link>
            <Link to={isFavorited ? "/favorites" : "#"} className="btn btn-secondary flex-1 text-sm">
              ❤️ Saved Cars
            </Link>
          </div>

          <p className="text-xs text-gray-500 mt-6 text-center">
            🔒 Secure payment powered by Stripe
          </p>
        </div>
      </div>

      {/* Similar Cars Section */}
      <div className="mt-12 card">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">🚗 Explore More</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/inventory" className="btn btn-primary flex-1 text-center py-4">
            View All Inventory
          </Link>
          <Link to="/favorites" className="btn btn-secondary flex-1 text-center py-4">
            Your Saved Cars
          </Link>
          <Link to="/orders" className="btn btn-secondary flex-1 text-center py-4">
            My Orders
          </Link>
        </div>
      </div>
    </div>
  )
}
