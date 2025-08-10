import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Newsletter from '../components/Newsletter'
import PageLoader from '../components/PageLoader'

const Home = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [showLightning, setShowLightning] = useState(false)
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    // Lightning effect every 3 seconds
    const lightningInterval = setInterval(() => {
      setShowLightning(true)
      setTimeout(() => setShowLightning(false), 200)
    }, 3000)

    // Clear the interval on component unmount
    return () => clearInterval(lightningInterval)
  }, [])

  const categories = [
    { name: 'Business Strategy', icon: '📊', color: 'from-blue-500 to-blue-600' },
    { name: 'Creative Projects', icon: '🎨', color: 'from-purple-500 to-purple-600' },
    { name: 'Learning Plan', icon: '📚', color: 'from-green-500 to-green-600' },
    { name: 'Health & Fitness', icon: '💪', color: 'from-red-500 to-red-600' },
    { name: 'Travel Planning', icon: '✈️', color: 'from-indigo-500 to-indigo-600' },
    { name: 'Personal Goals', icon: '🎯', color: 'from-orange-500 to-orange-600' },
  ]

  return (
    <>
      {/* PageLoader overlay */}
      {showLoader && <PageLoader onComplete={() => setShowLoader(false)} />}

      {/* Main content, fades in after the loader is complete */}
      <div
        className={`min-h-screen transition-opacity duration-1000 ${
          showLoader ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
        }`}
      >
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                {/* Lightning Effect */}
                <AnimatePresence>
                  {showLightning && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.12 }}
                      className="absolute inset-0 pointer-events-none"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/30 to-transparent blur-xl"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/20 to-transparent blur-lg"></div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.h1
                  className={`text-5xl md:text-7xl font-display font-bold mb-6 relative z-10 ${
                    showLightning
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 drop-shadow-[0_0_30px_rgba(59,130,246,0.8)]'
                      : 'text-transparent bg-clip-text bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800'
                  }`}
                  animate={{
                    textShadow: showLightning
                      ? [
                          '0 0 20px rgba(59,130,246,0.8), 0 0 40px rgba(139,92,246,0.6), 0 0 60px rgba(59,130,246,0.4)',
                          '0 0 30px rgba(59,130,246,1), 0 0 60px rgba(139,92,246,0.8), 0 0 90px rgba(59,130,246,0.6)',
                          '0 0 20px rgba(59,130,246,0.8), 0 0 40px rgba(139,92,246,0.6), 0 0 60px rgba(59,130,246,0.4)',
                        ]
                      : '0 0 0px rgba(59,130,246,0)',
                    filter: showLightning
                      ? [
                          'brightness(1) saturate(1)',
                          'brightness(1.3) saturate(1.5)',
                          'brightness(1) saturate(1)',
                        ]
                      : 'brightness(1) saturate(1)',
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  style={{
                    filter: showLightning
                      ? 'drop-shadow(0 0 20px rgba(59,130,246,0.5))'
                      : 'none',
                  }}
                >
                  NeuroDesk-AI
                </motion.h1>
                <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
                  Your AI-powered workspace for generating step-by-step plans and guidance.
                  Transform ideas into actionable strategies with intelligent planning.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              >
                <Link
                  to="/dashboard"
                  className="metallic-button text-lg px-8 py-4"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Start Planning Now
                  <motion.span
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="inline-block ml-2"
                  >
                    →
                  </motion.span>
                </Link>
                <div className="text-sm text-slate-500">
                  <span className="font-semibold text-slate-700">5 free prompts</span> to get started
                </div>
              </motion.div>

              {/* Feature Cards */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
              >
                <div className="metallic-card p-6">
                  <div className="text-3xl mb-4">🧠</div>
                  <h3 className="text-xl font-semibold mb-2">AI-Powered Planning</h3>
                  <p className="text-slate-600">
                    Advanced AI creates detailed, step-by-step plans tailored to your specific goals and requirements.
                  </p>
                </div>
                <div className="metallic-card p-6">
                  <div className="text-3xl mb-4">⚡</div>
                  <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
                  <p className="text-slate-600">
                    Get comprehensive plans in seconds. No more hours of brainstorming and organizing.
                  </p>
                </div>
                <div className="metallic-card p-6">
                  <div className="text-3xl mb-4">📱</div>
                  <h3 className="text-xl font-semibold mb-2">Save & Share</h3>
                  <p className="text-slate-600">
                    Save your plans, share with team members, and access them anywhere, anytime.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-800 mb-4">
                Quick Start Categories
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Choose from popular planning categories or create your own custom plan
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="metallic-card p-6 cursor-pointer group"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center text-white text-xl`}>
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-slate-500">Click to start planning</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-6">
                Powerful Features
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Everything you need to transform ideas into actionable plans
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: '🤖',
                  title: 'Advanced AI Planning',
                  description: 'State-of-the-art AI generates comprehensive, personalized plans tailored to your specific goals and requirements.',
                  features: ['Custom plan generation', 'Context-aware suggestions', 'Multi-step breakdowns'],
                },
                {
                  icon: '⚡',
                  title: 'Lightning Fast Results',
                  description: 'Get detailed, actionable plans in seconds. No more hours spent brainstorming and organizing your thoughts.',
                  features: ['Instant generation', 'Real-time processing', 'Quick iterations'],
                },
                {
                  icon: '🎯',
                  title: 'Smart Categories',
                  description: 'Pre-built templates for business, learning, health, travel, creative projects, and personal development.',
                  features: ['6+ specialized categories', 'Industry best practices', 'Proven frameworks'],
                },
                {
                  icon: '💾',
                  title: 'Save & Organize',
                  description: 'Keep all your plans organized in one place. Access your planning history anytime, anywhere.',
                  features: ['Cloud storage', 'Plan history', 'Easy organization'],
                },
                {
                  icon: '🔗',
                  title: 'Share & Collaborate',
                  description: 'Share your plans with team members, friends, or mentors. Collaborate on achieving your goals together.',
                  features: ['One-click sharing', 'Team collaboration', 'Export options'],
                },
                {
                  icon: '📱',
                  title: 'Mobile Optimized',
                  description: 'Access NeuroDesk from any device. Beautiful, responsive design that works perfectly on mobile.',
                  features: ['Responsive design', 'Mobile-first', 'Cross-platform'],
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="metallic-card p-6 h-full"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">{feature.description}</p>
                  <ul className="space-y-1">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-center text-sm text-slate-500">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-800 mb-6">
                How It Works
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                From idea to action in three simple steps
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  step: '01',
                  title: 'Describe Your Goal',
                  description: 'Simply tell NeuroDesk what you want to achieve. Be as specific or as general as you like.',
                  icon: '✍️',
                },
                {
                  step: '02',
                  title: 'AI Generates Plan',
                  description: 'Our advanced AI analyzes your goal and creates a comprehensive, step-by-step action plan.',
                  icon: '🧠',
                },
                {
                  step: '03',
                  title: 'Take Action',
                  description: 'Follow your personalized plan, track progress, and achieve your goals faster than ever.',
                  icon: '🚀',
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center relative"
                >
                  {index < 2 && (
                    <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-slate-300 to-transparent transform -translate-y-1/2 z-0"></div>
                  )}
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl">
                      {step.icon}
                    </div>
                    <div className="text-sm font-bold text-slate-400 mb-2">STEP {step.step}</div>
                    <h3 className="text-2xl font-semibold text-slate-800 mb-4">{step.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-gradient-to-br from-slate-100 to-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-6">
                Simple Pricing
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Start free, upgrade when you're ready for unlimited planning
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Plan */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="metallic-card p-8 relative"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Free Starter</h3>
                  <div className="text-4xl font-bold text-slate-700 mb-2">$0</div>
                  <p className="text-slate-500">Perfect for trying out NeuroDesk</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    '5 AI-generated plans',
                    'All planning categories',
                    'Basic plan templates',
                    'Copy & download plans',
                    'Mobile responsive',
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center text-slate-600">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/auth" className="w-full block text-center py-3 px-6 border-2 border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                  Get Started Free
                </Link>
              </motion.div>

              {/* Pro Plan */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="metallic-card p-8 relative border-2 border-slate-400 shadow-xl"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-slate-600 to-slate-700 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">NeuroDesk Pro</h3>
                  <div className="text-4xl font-bold text-slate-700 mb-2">$9.99<span className="text-lg text-slate-500">/month</span></div>
                  <p className="text-slate-500">Unlimited planning power</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    'Unlimited AI-generated plans',
                    'Advanced AI models',
                    'Save & organize plans',
                    'Share with team members',
                    'Priority support',
                    'Export to multiple formats',
                    'Custom plan templates',
                    'Analytics & insights',
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center text-slate-600">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full metallic-button">
                  Upgrade to Pro
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-800 mb-6">
                What Our Users Say
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Join thousands of satisfied users who've transformed their planning process
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Sarah Johnson',
                  role: 'Startup Founder',
                  avatar: '👩‍💼',
                  quote: 'NeuroDesk helped me create a comprehensive business plan in minutes. The AI suggestions were incredibly detailed and actionable.',
                },
                {
                  name: 'Mike Chen',
                  role: 'Software Developer',
                  avatar: '👨‍💻',
                  quote: 'As someone who struggles with planning, NeuroDesk has been a game-changer. The learning plans are structured perfectly for my goals.',
                },
                {
                  name: 'Emma Davis',
                  role: 'Fitness Coach',
                  avatar: '👩‍🏫',
                  quote: 'I use NeuroDesk to create personalized fitness plans for my clients. The health & fitness category is incredibly comprehensive.',
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="metallic-card p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center text-white text-xl mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">{testimonial.name}</div>
                      <div className="text-sm text-slate-500">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-slate-600 italic leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex text-yellow-400 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* App Coming Soon Section */}
        <section className="py-20 bg-gradient-to-br from-slate-100 via-white to-slate-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full px-6 py-2 mb-6">
                <span className="text-blue-600 font-medium text-sm">📱 COMING SOON</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-800 mb-6">
                NeuroDesk Mobile App
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
                Take your AI-powered planning on the go. Create, edit, and access your plans anywhere, anytime.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* App Preview */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative mx-auto max-w-sm">
                  {/* Phone Frame */}
                  <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-[3rem] p-2 shadow-2xl">
                    <div className="bg-white rounded-[2.5rem] overflow-hidden">
                      {/* Status Bar */}
                      <div className="bg-slate-50 px-6 py-2 flex justify-between items-center text-xs font-medium text-slate-600">
                        <span>9:41</span>
                        <div className="flex space-x-1">
                          <div className="w-4 h-2 bg-slate-300 rounded-sm"></div>
                          <div className="w-4 h-2 bg-slate-300 rounded-sm"></div>
                          <div className="w-4 h-2 bg-green-400 rounded-sm"></div>
                        </div>
                      </div>

                      {/* App Content */}
                      <div className="p-6 h-96 bg-gradient-to-br from-slate-50 to-white">
                        <div className="text-center mb-6">
                          <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl mx-auto mb-3 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">N</span>
                          </div>
                          <h3 className="font-bold text-slate-800 text-lg">NeuroDesk</h3>
                        </div>

                        <div className="space-y-3">
                          <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-100">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-blue-600 text-sm">📊</span>
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-slate-800 text-sm">Business Plan</div>
                                <div className="text-xs text-slate-500">2 hours ago</div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-100">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <span className="text-green-600 text-sm">💪</span>
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-slate-800 text-sm">Fitness Routine</div>
                                <div className="text-xs text-slate-500">1 day ago</div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-100">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                <span className="text-purple-600 text-sm">📚</span>
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-slate-800 text-sm">Learning Plan</div>
                                <div className="text-xs text-slate-500">3 days ago</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6">
                          <div className="bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg p-3 text-center">
                            <span className="text-white font-medium text-sm">+ Create New Plan</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-4 -right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg"
                  >
                    📱
                  </motion.div>

                  <motion.div
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -bottom-4 -left-4 bg-green-500 text-white p-3 rounded-full shadow-lg"
                  >
                    ⚡
                  </motion.div>
                </div>
              </motion.div>

              {/* App Features */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-slate-800 mb-4">Coming to iOS & Android</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    Experience the full power of NeuroDesk AI planning in a beautifully designed mobile app.
                    Create plans on the go, sync across devices, and never miss a step in your journey to success.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: '🔄', title: 'Real-time Sync', desc: 'Access your plans across all devices instantly' },
                    { icon: '📴', title: 'Offline Mode', desc: 'View and edit plans without internet connection' },
                    { icon: '🔔', title: 'Smart Notifications', desc: 'Get reminders for important milestones' },
                    { icon: '🎯', title: 'Quick Actions', desc: 'Create plans with voice commands and shortcuts' },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-4"
                    >
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">{feature.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-1">{feature.title}</h4>
                        <p className="text-slate-600 text-sm">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-4">
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-lg p-6">
                    <h4 className="font-semibold text-slate-800 mb-2">Be the first to know!</h4>
                    <p className="text-slate-600 text-sm mb-4">
                      Join our waitlist to get early access and exclusive beta testing opportunities.
                    </p>
                    <div className="flex space-x-3">
                      <div className="flex-1 bg-white border border-slate-300 rounded-lg px-4 py-2">
                        <span className="text-slate-400 text-sm">your@email.com</span>
                      </div>
                      <button className="bg-slate-600 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium">
                        Join Waitlist
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <Newsletter />

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-800/90 to-slate-900/90"></div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Ready to Transform Your Planning?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Join thousands of users who have streamlined their planning process with NeuroDesk. Start your journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/dashboard" className="bg-white text-slate-800 hover:bg-slate-100 font-semibold px-8 py-4 rounded-lg transition-colors text-lg">
                  Start Planning Free
                </Link>
                <Link to="/auth" className="border-2 border-white text-white hover:bg-white hover:text-slate-800 font-semibold px-8 py-4 rounded-lg transition-colors text-lg">
                  Create Account
                </Link>
              </div>
              <p className="text-sm text-slate-400 mt-4">
                No credit card required • 5 free plans • Upgrade anytime
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home