import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Success() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    loadLatestOrder()
  }, [])

  const loadLatestOrder = () => {
    try {
      const saved = localStorage.getItem('carOrders')
      if (saved) {
        const ordersList = JSON.parse(saved)
        if (ordersList.length > 0) {
          setOrders([ordersList[0]]) // Get the most recent order
        }
      }
    } catch (err) {
      console.error('Error loading order:', err)
    }
  }

  const latestOrder = orders.length > 0 ? orders[0] : null

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center card mb-8">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-4xl font-bold text-green-600 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your transaction has been processed securely.
          </p>
        </div>

        {/* Order Details */}
        {latestOrder && (
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 Order Details</h2>
            
            <div className="space-y-4 mb-6 pb-6 border-b">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-bold text-gray-900">#{latestOrder.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Car:</span>
                <span className="font-bold text-gray-900">{latestOrder.carTitle}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-bold text-blue-600 text-lg">
                  ${(latestOrder.amount / 100).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Payment Type:</span>
                <span className="font-bold text-gray-900">
                  {latestOrder.paymentType === 'deposit' ? '🏷️ Deposit' : '✅ Full Purchase'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Date & Time:</span>
                <span className="font-bold text-gray-900">
                  {latestOrder.date} {latestOrder.time}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status:</span>
                <span className="font-bold text-green-600">✓ {latestOrder.status}</span>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold text-green-900 mb-2">📧 What's Next?</h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>✓ Check your email for payment confirmation</li>
                <li>✓ We'll contact you within 24 hours to confirm details</li>
                <li>✓ Arrange pickup or delivery on our support page</li>
              </ul>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link to="/orders" className="btn btn-primary text-lg py-3 text-center">
            📦 View My Orders
          </Link>
          <Link to="/inventory" className="btn btn-secondary text-lg py-3 text-center">
            🚗 Continue Shopping
          </Link>
        </div>

        {/* Additional Links */}
        <div className="card">
          <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Link to="/" className="btn btn-secondary text-sm text-center">
              Home
            </Link>
            <Link to="/favorites" className="btn btn-secondary text-sm text-center">
              Saved Cars
            </Link>
            <Link to="/support" className="btn btn-secondary text-sm text-center">
              Support
            </Link>
            <Link to="/inventory" className="btn btn-secondary text-sm text-center">
              Inventory
            </Link>
          </div>
        </div>

        {/* Support Info */}
        <div className="mt-8 text-center card bg-blue-50">
          <h3 className="font-bold text-gray-900 mb-2">📞 Need Help?</h3>
          <p className="text-gray-700 text-sm mb-4">
            Have questions about your order? Contact our support team anytime.
          </p>
          <Link to="/support" className="btn btn-primary">
            Get Support
          </Link>
        </div>
      </div>
    </div>
  )
}
