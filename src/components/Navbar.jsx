import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import UserProfile from './UserProfile'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Check for user data in localStorage
    const userData = localStorage.getItem('neurodesk_user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('neurodesk_user')
    localStorage.removeItem('neurodesk_token')
    setUser(null)
    navigate('/')
  }

  return (
    <div>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-slate-200/20' 
            : 'bg-white/5 backdrop-blur-md border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-display font-bold text-gradient">
                NeuroDesk
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`font-medium transition-all duration-200 hover:scale-105 ${
                  location.pathname === '/' 
                    ? 'text-slate-800 font-semibold' 
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className={`font-medium transition-all duration-200 hover:scale-105 ${
                  location.pathname === '/dashboard' 
                    ? 'text-slate-800 font-semibold' 
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/help"
                className={`font-medium transition-all duration-200 hover:scale-105 ${
                  location.pathname === '/help' 
                    ? 'text-slate-800 font-semibold' 
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Help
              </Link>
              <Link
                to="/contact"
                className={`font-medium transition-all duration-200 hover:scale-105 ${
                  location.pathname === '/contact' 
                    ? 'text-slate-800 font-semibold' 
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Contact
              </Link>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowProfile(true)}
                    className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span className="text-slate-700 text-sm font-medium hidden sm:block">
                      {user.name || user.email?.split('@')[0]}
                    </span>
                    <svg className="w-4 h-4 text-slate-500 group-hover:text-slate-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-600 hover:text-slate-700 p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden bg-white/10 backdrop-blur-xl border-t border-white/20"
              >
                <div className="px-4 py-4 space-y-4">
                  <Link
                    to="/"
                    className="block font-medium text-slate-700 hover:text-slate-900 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block font-medium text-slate-700 hover:text-slate-900 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/help"
                    className="block font-medium text-slate-700 hover:text-slate-900 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Help
                  </Link>
                  <Link
                    to="/contact"
                    className="block font-medium text-slate-700 hover:text-slate-900 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                  {user ? (
                    <div className="px-4 py-2 border-t border-slate-200">
                      <button
                        onClick={() => {
                          setShowProfile(true)
                          setIsMobileMenuOpen(false)
                        }}
                        className="flex items-center space-x-3 w-full bg-slate-100 hover:bg-slate-200 px-4 py-3 rounded-lg transition-colors"
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div className="text-left">
                          <div className="text-slate-800 font-medium">{user.name || 'NeuroDesk User'}</div>
                          <div className="text-slate-600 text-sm">{user.email}</div>
                        </div>
                      </button>
                    </div>
                  ) : (
                    <div className="px-4 py-2 border-t border-slate-200">
                      <Link
                        to="/auth"
                        className="block bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors font-medium text-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
      
      {/* User Profile Modal */}
      {showProfile && (
        <UserProfile 
          user={user} 
          onClose={() => setShowProfile(false)} 
        />
      )}
    </div>
  )
}

export default Navbar
