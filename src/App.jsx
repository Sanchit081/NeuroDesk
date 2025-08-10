import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageLoader from './components/PageLoader'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import Payment from './pages/Payment'
import Help from './pages/Help'
import Contact from './pages/Contact'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = sessionStorage.getItem('neurodesk_visited')
    if (!hasVisited) {
      sessionStorage.setItem('neurodesk_visited', 'true')
      // Show loader for first-time visitors
      setTimeout(() => setIsLoading(false), 3500)
    } else {
      // Skip loader for returning visitors in the same session
      setIsLoading(false)
    }
  }, [])

  if (isLoading) {
    return <PageLoader onComplete={() => setIsLoading(false)} />
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Navbar />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="pt-16"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/help" element={<Help />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </motion.main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
