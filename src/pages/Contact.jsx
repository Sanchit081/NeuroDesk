import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const contactTypes = [
    { value: 'general', label: 'General Inquiry', icon: '💬' },
    { value: 'support', label: 'Technical Support', icon: '🛠️' },
    { value: 'billing', label: 'Billing Question', icon: '💳' },
    { value: 'feature', label: 'Feature Request', icon: '✨' },
    { value: 'bug', label: 'Bug Report', icon: '🐛' },
    { value: 'partnership', label: 'Partnership', icon: '🤝' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSuccess(true)
    setIsLoading(false)
    
    // Reset form after success
    setTimeout(() => {
      setSuccess(false)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'general'
      })
    }, 3000)
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
            <div className="text-6xl mb-6">📧</div>
            <h2 className="text-3xl font-display font-bold text-slate-800 mb-4">
              Message Sent!
            </h2>
            <p className="text-lg text-slate-600 mb-6">
              Thank you for contacting us. We'll get back to you within 24 hours.
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L8.5 10.5a11 11 0 0013 13l1.013-1.724a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V26a2 2 0 01-2 2h-1C13.106 28 2 16.894 2 3V2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Phone</h3>
                  <p className="text-slate-600">+91 9465465606</p>
                </div>
              </div>
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-700 font-medium">We've received your message</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Have a question, suggestion, or need help? We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="metallic-card p-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6">Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Inquiry Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    disabled={isLoading}
                  >
                    {contactTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.icon} {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none"
                    placeholder="Tell us how we can help you..."
                    required
                    disabled={isLoading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full metallic-button disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Methods */}
            <div className="metallic-card p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Email</h3>
                    <p className="text-slate-600">sainisanchit01@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center text-white">
                    💬
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">Live Chat</div>
                    <div className="text-slate-600">Available 24/7</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center text-white">
                    🐦
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">Twitter</div>
                    <div className="text-slate-600">@NeuroDesk</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Times */}
            <div className="metallic-card p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Response Times</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">General Inquiries</span>
                  <span className="font-medium text-slate-800">24 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Technical Support</span>
                  <span className="font-medium text-slate-800">12 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Billing Questions</span>
                  <span className="font-medium text-slate-800">6 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Pro Users</span>
                  <span className="font-medium text-green-600">Priority</span>
                </div>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="metallic-card p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Quick Help</h3>
              <p className="text-slate-600 mb-4">
                Looking for immediate answers? Check out our comprehensive help center.
              </p>
              <a
                href="/help"
                className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-800 font-medium transition-colors"
              >
                <span>Visit Help Center</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Office Info */}
            <div className="metallic-card p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">SanchitVerse HQ</h3>
              <div className="text-slate-600 space-y-2">
                <div>🏢 Silicon Valley, California</div>
                <div>🌍 Serving users worldwide</div>
                <div>⏰ Available 24/7 online</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contact
