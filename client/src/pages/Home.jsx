import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_URL = 'https://car-dealer-mc48.onrender.com/api'

export default function Home() {
  const navigate = useNavigate()
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            🚗 Find Your Perfect Car Today
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Browse quality vehicles & buy with confidence
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/inventory')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold text-lg transition"
            >
              🔍 Browse All Cars
            </button>
            <button
              onClick={() => navigate('/support')}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg transition"
            >
              💬 Need Help?
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stat 1 */}
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">
                {cars.length}+
              </div>
              <p className="text-xl text-gray-600">Cars Available</p>
              <p className="text-sm text-gray-500 mt-1">Fresh inventory daily</p>
            </div>

            {/* Stat 2 */}
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">
                100%
              </div>
              <p className="text-xl text-gray-600">Verified Listings</p>
              <p className="text-sm text-gray-500 mt-1">All vehicles inspected</p>
            </div>

            {/* Stat 3 */}
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">
                Fast
              </div>
              <p className="text-xl text-gray-600">24/7 Support</p>
              <p className="text-sm text-gray-500 mt-1">Always here to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Why Choose AutoStore?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Flexible Payment</h3>
              <p className="text-gray-600">Pay full price or start with a deposit as low as 1%. Your choice.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Secure Checkout</h3>
              <p className="text-gray-600">All payments processed through Stripe. Your data is 100% secure.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">🏎️</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Wide Selection</h3>
              <p className="text-gray-600">Browse hundreds of quality cars handpicked & inspected for you.</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Quality Assured</h3>
              <p className="text-gray-600">Every car is inspected and certified. Peace of mind guaranteed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">
              🏆 Featured Cars
            </h2>
            <Link
              to="/inventory"
              className="text-blue-600 hover:text-blue-800 font-bold text-lg"
            >
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Loading cars...</p>
              <div className="mt-4 flex justify-center">
                <div className="animate-spin text-4xl">⚙️</div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-red-50 rounded-lg border border-red-200">
              <p className="text-xl text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchCars}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold"
              >
                🔄 Retry
              </button>
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center py-12 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-lg text-blue-600 mb-4">No cars available yet.</p>
              <p className="text-gray-600 mb-6">Check back soon for amazing deals!</p>
              <button
                onClick={() => navigate('/sell')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold"
              >
                📝 List Your Car Today
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.slice(0, 6).map((car) => (
                <Link
                  key={car.id}
                  to={`/car/${car.id}`}
                  className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-400"
                >
                  {/* Car Image */}
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={car.image}
                      alt={car.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Car+Image'
                      }}
                    />
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Available
                    </div>
                  </div>

                  {/* Car Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                      {car.title}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold text-blue-600">
                        ${car.price.toLocaleString()}
                      </span>
                    </div>

                    {/* Features */}
                    <div className="flex gap-4 mb-4 text-sm text-gray-600">
                      <span>✅ Inspected</span>
                      <span>✅ Certified</span>
                    </div>

                    {/* Date */}
                    <p className="text-xs text-gray-400 mb-4">
                      ID: {car.id} | Listed {car.createdAt ? new Date(car.createdAt).toLocaleDateString() : 'Recently'}
                    </p>

                    {/* CTA Button */}
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition transformed group-hover:scale-105">
                      View & Make Offer →
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Navigation Section */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Explore More</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Browse */}
            <Link
              to="/inventory"
              className="bg-blue-600 hover:bg-blue-700 p-8 rounded-lg text-center transition transform hover:scale-105"
            >
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">Browse Cars</h3>
              <p className="text-blue-100">Filter & sort by price, features & more</p>
            </Link>

            {/* Favorites */}
            <Link
              to="/favorites"
              className="bg-purple-600 hover:bg-purple-700 p-8 rounded-lg text-center transition transform hover:scale-105"
            >
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-xl font-bold mb-2">Saved Cars</h3>
              <p className="text-purple-100">Your favorite vehicles in one place</p>
            </Link>

            {/* Support */}
            <Link
              to="/support"
              className="bg-orange-600 hover:bg-orange-700 p-8 rounded-lg text-center transition transform hover:scale-105"
            >
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-2">Support</h3>
              <p className="text-orange-100">FAQs, contact & customer support</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Drive Home Your Dream Car?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Browse our inventory now. Transparent pricing, flexible payment options, secure checkout.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/inventory')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold text-lg transition"
            >
              Start Browsing
            </button>
            <button
              onClick={() => navigate('/support')}
              className="bg-transparent hover:bg-white hover:text-blue-600 border-2 border-white text-white px-8 py-3 rounded-lg font-bold text-lg transition"
            >
              Contact Support
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4">🚗 AutoStore</h4>
              <p className="text-sm">Your trusted platform for buying quality cars online.</p>
            </div>

            {/* Browse */}
            <div>
              <h4 className="text-white font-bold mb-4">Browse</h4>
              <ul className="text-sm space-y-2">
                <li><Link to="/" className="hover:text-white">Home</Link></li>
                <li><Link to="/inventory" className="hover:text-white">All Cars</Link></li>
                <li><Link to="/favorites" className="hover:text-white">Saved</Link></li>
              </ul>
            </div>

            {/* Account */}
            <div>
              <h4 className="text-white font-bold mb-4">Account</h4>
              <ul className="text-sm space-y-2">
                <li><Link to="/orders" className="hover:text-white">My Orders</Link></li>
                <li><Link to="/favorites" className="hover:text-white">Favorites</Link></li>
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4 className="text-white font-bold mb-4">Help & Info</h4>
              <ul className="text-sm space-y-2">
                <li><Link to="/support" className="hover:text-white">Support</Link></li>
              </ul>
            </div>
          </div>

          <hr className="border-gray-800 mb-8" />

          {/* Copyright */}
          <div className="text-center text-sm">
            <p>&copy; 2026 AutoStore. All rights reserved. | Buy with confidence.</p>
            <Link to="/admin" className="text-gray-500 hover:text-gray-300 text-xs mt-4 inline-block transition">
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
