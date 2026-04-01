import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Orders() {
  // For MVP, we'll use localStorage to store orders
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = () => {
    // Simulate fetching orders from localStorage
    try {
      setLoading(true)
      const storedOrders = localStorage.getItem('carOrders')
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders))
      } else {
        setOrders([])
      }
    } catch (err) {
      console.error('Error loading orders:', err)
    } finally {
      setLoading(false)
    }
  }

  const saveOrder = (carId, carTitle, amount, paymentType) => {
    const newOrder = {
      id: Date.now(),
      carId,
      carTitle,
      amount,
      paymentType,
      status: 'Completed',
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    }
    
    const updatedOrders = [newOrder, ...orders]
    localStorage.setItem('carOrders', JSON.stringify(updatedOrders))
    setOrders(updatedOrders)
  }

  // Store the saveOrder function globally so other pages can use it
  useEffect(() => {
    window.saveCarOrder = saveOrder
  }, [orders])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-xl text-gray-600">Loading orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2 text-gray-900">My Orders</h1>
      <p className="text-gray-600 mb-8">View all your car purchases and reservations</p>

      {orders.length === 0 ? (
        <div className="max-w-md mx-auto text-center card">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Orders Yet</h2>
          <p className="text-gray-600 mb-6">You haven't purchased any cars yet. Start browsing our inventory!</p>
          <Link to="/" className="btn btn-primary w-full">
            Browse Cars
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Order Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="card bg-blue-50">
              <p className="text-gray-600">Total Orders</p>
              <p className="text-3xl font-bold text-blue-600">{orders.length}</p>
            </div>
            <div className="card bg-green-50">
              <p className="text-gray-600">Total Spent</p>
              <p className="text-3xl font-bold text-green-600">
                ${(orders.reduce((sum, order) => sum + order.amount, 0) / 100).toLocaleString()}
              </p>
            </div>
            <div className="card bg-purple-50">
              <p className="text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-purple-600">
                {orders.filter(o => o.status === 'Completed').length}
              </p>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{order.carTitle}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Order ID: #{order.id}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      ${(order.amount / 100).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {order.paymentType === 'deposit' ? '🏷️ Deposit' : '✅ Full Payment'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Date</p>
                    <p className="font-semibold text-gray-900">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Time</p>
                    <p className="font-semibold text-gray-900">{order.time}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Type</p>
                    <p className="font-semibold text-gray-900">
                      {order.paymentType === 'deposit' ? 'Deposit' : 'Full Purchase'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Status</p>
                    <p className="font-semibold text-green-600">✓ {order.status}</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <Link to={`/car/${order.carId}`} className="btn btn-primary flex-1">
                    View Car
                  </Link>
                  <button className="btn btn-secondary flex-1">
                    Download Receipt
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="mt-12 card bg-blue-50">
        <h3 className="text-lg font-bold text-gray-900 mb-3">📞 Need Help?</h3>
        <p className="text-gray-700 mb-4">
          Have questions about your orders? Contact our support team or visit the Support page for more information.
        </p>
        <Link to="/support" className="btn btn-primary">
          Get Support
        </Link>
      </div>
    </div>
  )
}
