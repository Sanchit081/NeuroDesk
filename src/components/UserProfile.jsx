import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const UserProfile = ({ user, onClose }) => {
  const navigate = useNavigate()
  const [promptCount, setPromptCount] = useState(0)
  const [isPro, setIsPro] = useState(false)

  useEffect(() => {
    const count = localStorage.getItem('neurodesk_prompt_count') || '0'
    setPromptCount(parseInt(count))
    setIsPro(localStorage.getItem('neurodesk_is_pro') === 'true')
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('neurodesk_user')
    localStorage.removeItem('neurodesk_token')
    localStorage.removeItem('neurodesk_is_pro')
    localStorage.removeItem('neurodesk_prompt_count')
    onClose()
    navigate('/')
    window.location.reload()
  }

  const handleUpgrade = () => {
    onClose()
    navigate('/payment')
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Profile</h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* User Info */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">
                {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-1">
              {user?.name || 'NeuroDesk User'}
            </h3>
            <p className="text-slate-600">{user?.email}</p>
          </div>

          {/* Subscription Status */}
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-700">Subscription</span>
              {isPro ? (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                  ✨ Pro
                </span>
              ) : (
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold">
                  Free
                </span>
              )}
            </div>
            
            {isPro ? (
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">∞</div>
                <div className="text-sm text-slate-600">Unlimited Plans</div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-600">Plans Used</span>
                  <span className="text-sm font-semibold text-slate-800">{promptCount}/5</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-slate-500 to-slate-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(promptCount / 5) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-slate-500 mt-2 text-center">
                  {5 - promptCount} plans remaining
                </div>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">{promptCount}</div>
              <div className="text-xs text-slate-600">Total Plans</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">
                {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </div>
              <div className="text-xs text-slate-600">Member Since</div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {!isPro && (
              <button
                onClick={handleUpgrade}
                className="w-full bg-gradient-to-r from-slate-600 to-slate-700 text-white py-3 rounded-lg font-semibold hover:from-slate-700 hover:to-slate-800 transition-all duration-200 transform hover:scale-105"
              >
                🚀 Upgrade to Pro
              </button>
            )}
            
            <button
              onClick={() => {
                onClose()
                navigate('/dashboard')
              }}
              className="w-full bg-slate-100 text-slate-700 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
            >
              📊 Go to Dashboard
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full bg-red-50 text-red-600 py-3 rounded-lg font-semibold hover:bg-red-100 transition-colors"
            >
              🚪 Sign Out
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-slate-200 text-center">
            <p className="text-xs text-slate-500">
              Need help? <span className="text-slate-600 font-medium cursor-pointer hover:text-slate-800" onClick={() => { onClose(); navigate('/help'); }}>Contact Support</span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default UserProfile
