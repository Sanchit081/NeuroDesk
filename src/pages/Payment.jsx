import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'

const Payment = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [user, setUser] = useState(null)

  const basePrice = 9.99
  const finalPrice = couponApplied ? 0 : basePrice

  const validCoupons = {
    'SANCHIT2024': { discount: 100, description: 'SanchitVerse Special - 100% OFF' },
    'WELCOME50': { discount: 50, description: '50% OFF Welcome Discount' },
    'NEURODESK': { discount: 100, description: 'NeuroDesk Launch - FREE' },
    'BETA': { discount: 100, description: 'Beta User - Completely FREE' }
  }

  const [paymentData, setPaymentData] = useState({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    }
  })

  useEffect(() => {
    // Get user data
    const userData = localStorage.getItem('neurodesk_user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setPaymentData(prev => ({ ...prev, email: parsedUser.email }))
    } else {
      // Redirect to auth if not logged in
      navigate('/auth')
    }
  }, [navigate])

  const applyCoupon = () => {
    const coupon = validCoupons[couponCode.toUpperCase()]
    if (coupon) {
      setCouponApplied(true)
      setDiscount(coupon.discount)
      setError('')
    } else {
      setError('Invalid coupon code')
      setCouponApplied(false)
      setDiscount(0)
    }
  }

  const removeCoupon = () => {
    setCouponApplied(false)
    setDiscount(0)
    setCouponCode('')
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Basic validation
    if (!paymentData.email || (!couponApplied && (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv))) {
      setError('Please fill in all required fields')
      setIsLoading(false)
      return
    }

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000))

      // Update user to Pro status
      const updatedUser = {
        ...user,
        isPro: true,
        subscriptionDate: new Date().toISOString(),
        subscriptionType: 'pro',
        paymentMethod: couponApplied ? 'coupon' : 'card',
        couponUsed: couponApplied ? couponCode.toUpperCase() : null
      }

      localStorage.setItem('neurodesk_user', JSON.stringify(updatedUser))
      
      // Reset prompt count for Pro users (unlimited)
      localStorage.setItem('neurodesk_prompt_count', '0')
      localStorage.setItem('neurodesk_is_pro', 'true')

      setSuccess(true)
      
      // Redirect to dashboard after success
      setTimeout(() => {
        navigate('/dashboard', { state: { upgraded: true } })
      }, 2000)

    } catch (err) {
      setError('Payment failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen pt-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full mx-4"
        >
          <div className="metallic-card p-8 text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-display font-bold text-slate-800 mb-4">
              Welcome to NeuroDesk Pro!
            </h2>
            <p className="text-lg text-slate-600 mb-6">
              Your payment was successful. You now have unlimited access to AI-powered planning.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-700 font-medium">Unlimited AI plans activated</span>
              </div>
            </div>
            <p className="text-sm text-slate-500">
              Redirecting to dashboard...
            </p>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-16 sm:pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-800 mb-3 sm:mb-4 px-2">
            Upgrade to NeuroDesk Pro
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto px-4">
            Unlock unlimited AI-powered planning and take your productivity to the next level
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="metallic-card p-6">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6">Order Summary</h2>
              
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold">NeuroDesk Pro</h3>
                    <p className="text-sm text-slate-500">Monthly subscription</p>
                  </div>
                  <span className="font-semibold text-slate-800">${basePrice}</span>
                </div>

                {/* Coupon Section */}
                <div className="border border-slate-200 rounded-lg p-4">
                  <h4 className="font-medium text-slate-700 mb-3">Promo Code</h4>
                  {!couponApplied ? (
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 sm:space-x-0">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="flex-1 px-3 sm:px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm sm:text-base"
                      />
                      <button
                        onClick={applyCoupon}
                        className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm"
                      >
                        Apply
                      </button>
                    </div>
                  ) : (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-green-700 font-medium">{couponCode.toUpperCase()}</span>
                          <p className="text-xs text-green-600">{validCoupons[couponCode.toUpperCase()]?.description}</p>
                        </div>
                        <button
                          onClick={removeCoupon}
                          className="text-green-600 hover:text-green-800 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {couponApplied && (
                  <div className="flex justify-between items-center py-2 text-green-600">
                    <span>Discount ({discount}%)</span>
                    <span>-${(basePrice * discount / 100).toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center py-3 border-t border-slate-200 text-lg font-semibold">
                  <span>Total</span>
                  <span className={finalPrice === 0 ? 'text-green-600' : 'text-slate-800'}>
                    <div className="text-2xl sm:text-3xl font-bold">
                      ${finalPrice.toFixed(2)}
                      <span className="text-base sm:text-lg font-normal">/month</span>
                    </div>
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="font-medium text-slate-700 mb-2">What's included:</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                  <li>✓ Unlimited AI-generated plans</li>
                  <li>✓ Advanced AI models</li>
                  <li>✓ Save & organize plans</li>
                  <li>✓ Share with team members</li>
                  <li>✓ Priority support</li>
                  <li>✓ Export to multiple formats</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="metallic-card p-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-4 sm:mb-6">
                Choose Your Plan
              </h2>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handlePayment} className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={paymentData.email}
                    onChange={(e) => setPaymentData({ ...paymentData, email: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm sm:text-base"
                    required
                    disabled={isLoading}
                  />
                </div>

                {finalPrice > 0 && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={paymentData.cardNumber}
                        onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm sm:text-base"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={paymentData.expiryDate}
                          onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                          placeholder="MM/YY"
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm sm:text-base"
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={paymentData.cvv}
                          onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                          placeholder="123"
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm sm:text-base"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={paymentData.cardName}
                        onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm sm:text-base"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full metallic-button py-3 sm:py-4 text-base sm:text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    finalPrice === 0 ? 'Activate Free Pro Account' : `Pay $${finalPrice.toFixed(2)}`
                  )}
                </button>

                <p className="text-xs text-slate-500 text-center">
                  By completing this purchase, you agree to our Terms of Service and Privacy Policy.
                  {finalPrice === 0 && ' This is a promotional offer and no payment will be charged.'}
                </p>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Suggested Coupons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <div className="metallic-card p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">💡 Try these coupon codes:</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(validCoupons).map(([code, details]) => (
                <div
                  key={code}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20"
                  onClick={() => {
                    setCouponCode(code)
                    applyCoupon()
                  }}
                >
                  <div className="font-mono text-sm font-bold text-slate-700">{code}</div>
                  <div className="text-xs text-slate-500 mt-1">{details.description}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Payment
