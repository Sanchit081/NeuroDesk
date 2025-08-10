import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const createConfetti = () => {
    const confettiContainer = document.createElement('div')
    confettiContainer.style.position = 'fixed'
    confettiContainer.style.top = '0'
    confettiContainer.style.left = '0'
    confettiContainer.style.width = '100%'
    confettiContainer.style.height = '100%'
    confettiContainer.style.pointerEvents = 'none'
    confettiContainer.style.zIndex = '9999'
    document.body.appendChild(confettiContainer)

    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff']
    
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div')
      confetti.style.position = 'absolute'
      confetti.style.width = '10px'
      confetti.style.height = '10px'
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.left = Math.random() * 100 + '%'
      confetti.style.top = '-10px'
      confetti.style.borderRadius = '50%'
      confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear forwards`
      confettiContainer.appendChild(confetti)
    }

    // Add CSS animation
    const style = document.createElement('style')
    style.textContent = `
      @keyframes confetti-fall {
        0% {
          transform: translateY(-100vh) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
    `
    document.head.appendChild(style)

    // Clean up after animation
    setTimeout(() => {
      document.body.removeChild(confettiContainer)
      document.head.removeChild(style)
    }, 5000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsLoading(true)
    
    // Simulate newsletter signup
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    setShowSuccess(true)
    setShowConfetti(true)
    createConfetti()
    
    // Reset form
    setEmail('')
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false)
      setShowConfetti(false)
    }, 3000)
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 sm:p-6"
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl mx-4"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
                Welcome to the NeuroDesk Family!
              </h3>
              <p className="text-sm sm:text-base text-slate-600 mb-4">
                You're now subscribed to our newsletter. Get ready for exclusive updates, tips, and early access to new features!
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-center text-green-700">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">Successfully subscribed!</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowSuccess(false)
                  setShowConfetti(false)
                }}
                className="metallic-button w-full"
              >
                Awesome! 🚀
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white py-16 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-12"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4">
              Stay Ahead of the Planning Game
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Get exclusive tips, new features, and productivity insights delivered to your inbox. 
              Join 10,000+ smart planners who never miss an update!
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-lg mx-auto mb-6"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-lg text-slate-800 placeholder-slate-500 focus:ring-2 focus:ring-white focus:outline-none text-sm sm:text-base"
              required
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !email.trim()}
              className="bg-white text-slate-800 hover:bg-slate-100 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-sm sm:text-base"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-slate-800 border-t-transparent rounded-full animate-spin"></div>
                  <span>Subscribing...</span>
                </div>
              ) : (
                'Subscribe Free 📧'
              )}
            </button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-sm text-slate-400"
          >
            No spam, ever. Unsubscribe anytime with one click. 
            <span className="text-slate-300 font-medium"> We respect your privacy.</span>
          </motion.p>

          {/* Newsletter Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12"
          >
            {[
              { icon: '🚀', title: 'Early Access', desc: 'Be first to try new features' },
              { icon: '💡', title: 'Pro Tips', desc: 'Weekly planning strategies' },
              { icon: '🎁', title: 'Exclusive Offers', desc: 'Special discounts & freebies' }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl mb-2">{benefit.icon}</div>
                <h3 className="text-sm sm:text-base font-semibold text-white mb-1">{benefit.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300">{benefit.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default Newsletter
