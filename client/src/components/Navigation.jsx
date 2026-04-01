import { Link, useNavigate } from 'react-router-dom'

export default function Navigation() {
  const navigate = useNavigate()

  return (
    <nav className="fixed top-0 left-0 right-0 bg-transparent text-grey-300 px-6 py-4 flex justify-between items-center shadow-lg z-50">

      {/* Logo */}
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-bold cursor-pointer hover:text-blue-400 transition"
      >
        🚗 AutoStore
      </h1>

      {/* Main Links */}
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-blue-300 transition font-semibold">
          Browse Cars
        </Link>
        <Link to="/inventory" className="hover:text-blue-300 transition hover:scale-105 font-semibold">
          Inventory
        </Link>
        <Link to="/support" className="hover:text-blue-300 transition hover:scale-105 font-semibold">
          Support
        </Link>
      </div>

      <div className="flex gap-6 items-center">
        <Link to="/favorites" className="hover:text-blue-300 transition hover:scale-105 items-center font-semibold flex flex-col">
          <i className="fas fa-heart text-grey-100"></i> Saved
        </Link>
        <Link to="/orders" className="hover:text-blue-300 transition hover:scale-105 font-semibold flex flex-col items-center">
          <i className="fas fa-shopping-cart text-grey-100"></i> My Orders
        </Link>
      </div>

    </nav>
  )
}
