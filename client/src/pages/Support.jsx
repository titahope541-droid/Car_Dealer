import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Support() {
  const [activeTab, setActiveTab] = useState('faq')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.subject && formData.message) {
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  const faqs = [
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express) through our secure Stripe payment gateway. You can choose to pay a deposit or the full amount.'
    },
    {
      question: 'What is a deposit payment?',
      answer: 'A deposit payment allows you to reserve a car by paying a percentage of the total price. Deposit amounts vary based on car price: under $10K (7.5%), $10K-$100K (5%), and over $100K (1%).'
    },
    {
      question: 'How long does delivery take?',
      answer: 'Delivery times vary based on location and availability. Once your payment is confirmed, our team will contact you within 24 hours to arrange delivery.'
    },
    {
      question: 'Can I cancel my order?',
      answer: 'Orders can be cancelled within 24 hours of purchase for a full refund. After 24 hours, a cancellation fee may apply. Contact our support team for assistance.'
    },
    {
      question: 'Is there a warranty on the cars?',
      answer: 'All vehicles come with a 30-day inspection period. Extended warranty options are available during checkout.'
    },
    {
      question: 'How do I track my order?',
      answer: 'You can track your order status anytime by visiting the "My Orders" page. You\'ll receive email updates at each stage of your purchase.'
    },
    {
      question: 'What if I have an issue with my car?',
      answer: 'If you experience any issues, please contact our support team immediately. We offer a 7-day return policy for major defects.'
    },
    {
      question: 'How do I save my favorite cars?',
      answer: 'Click the heart icon on any car listing to save it to your "Saved" section. You can view all your saved cars from the navigation menu.'
    }
  ]

  const contactMethods = [
    {
      icon: '📞',
      method: 'Phone',
      details: '1-800-AUTO-BUY',
      description: 'Monday-Friday, 8AM-8PM EST'
    },
    {
      icon: '📧',
      method: 'Email',
      details: 'support@autostore.com',
      description: 'Response within 24 hours'
    },
    {
      icon: '💬',
      method: 'Live Chat',
      details: 'Available on website',
      description: 'Monday-Friday, 9AM-6PM EST'
    },
    {
      icon: '🏢',
      method: 'Visit Us',
      details: '123 Auto Lane, Car City, CC 12345',
      description: 'By appointment only'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2 text-gray-900">Help & Support</h1>
      <p className="text-gray-600 mb-8">We're here to help! Find answers or contact our team.</p>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('faq')}
          className={`px-6 py-3 font-semibold transition ${
            activeTab === 'faq'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          📖 FAQ
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          className={`px-6 py-3 font-semibold transition ${
            activeTab === 'contact'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          📞 Contact Us
        </button>
        <button
          onClick={() => setActiveTab('form')}
          className={`px-6 py-3 font-semibold transition ${
            activeTab === 'form'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          ✉️ Send Message
        </button>
      </div>

      {/* FAQ Tab */}
      {activeTab === 'faq' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <div key={index} className="card">
              <h3 className="font-bold text-lg text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      )}

      {/* Contact Tab */}
      {activeTab === 'contact' && (
        <div>
          <h2 className="text-2xl font-bold mb-8 text-gray-900">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactMethods.map((contact, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">{contact.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{contact.method}</h3>
                <p className="text-lg font-semibold text-blue-600 mb-2">{contact.details}</p>
                <p className="text-sm text-gray-600">{contact.description}</p>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="mt-8 card bg-blue-50">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Link to="/" className="btn btn-primary">
                Browse Cars
              </Link>
              <Link to="/inventory" className="btn btn-primary">
                View Inventory
              </Link>
              <Link to="/orders" className="btn btn-primary">
                My Orders
              </Link>
              <Link to="/favorites" className="btn btn-primary">
                Saved Cars
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Form Tab */}
      {activeTab === 'form' && (
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Send us a Message</h2>
          
          {submitted && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              ✓ Thank you for your message! We'll get back to you soon.
            </div>
          )}

          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="billing">Billing Issue</option>
                  <option value="delivery">Delivery Question</option>
                  <option value="car-issue">Car Issue</option>
                  <option value="complaint">Complaint</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please describe your issue or question..."
                  rows="6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-full text-lg py-3"
              >
                Send Message
              </button>
            </form>
          </div>

          <p className="text-center text-gray-600 mt-6">
            We typically respond within 24 business hours.
          </p>
        </div>
      )}
    </div>
  )
}
