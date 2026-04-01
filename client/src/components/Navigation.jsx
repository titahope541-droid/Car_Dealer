import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="top-0 left-0 right-0 bg-transparent text-grey-300 px-6 py-4 flex justify-between items-center ">

      <div className="flex justify-between items-center">

        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold cursor-pointer hover:text-blue-400 transition"
        >
          🚗 AutoStore
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center">
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

        <div className="hidden md:flex gap-6 items-center">
          <Link to="/favorites" className="hover:text-blue-300 transition hover:scale-105 items-center font-semibold flex flex-col">
            <i className="fas fa-heart text-grey-100"></i> Saved
          </Link>
          <Link to="/orders" className="hover:text-blue-300 transition hover:scale-105 font-semibold flex flex-col items-center">
            <i className="fas fa-shopping-cart text-grey-100"></i> My Orders
          </Link>
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {
        menuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4 bg-gray-800 p-4 rounded-lg">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Browse Cars
            </Link>
            <Link to="/inventory" onClick={() => setMenuOpen(false)}>
              Inventory
            </Link>
            <Link to="/support" onClick={() => setMenuOpen(false)}>
              Support
            </Link>
            <Link to="/favorites" onClick={() => setMenuOpen(false)}>
              Saved
            </Link>
            <Link to="/orders" onClick={() => setMenuOpen(false)}>
              My Orders
            </Link>
          </div>
        )
      }


    </nav >
  )
}
