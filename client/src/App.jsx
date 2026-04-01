import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import CarDetails from './pages/CarDetails'
import SellCar from './pages/SellCar'
import Success from './pages/Success'
import Inventory from './pages/Inventory'
import Orders from './pages/Orders'
import Favorites from './pages/Favorites'
import Support from './pages/Support'

function AppContent() {
  const location = useLocation()
  const hiddenNavPages = ['/sell']
  const showNav = !hiddenNavPages.includes(location.pathname)

  return (
    <>
      {showNav && <Navigation />}
      <div className={showNav ? "pt-20 pb-12" : "pb-12"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/sell" element={<SellCar />} />
          <Route path="/success" element={<Success />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </div>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
