import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const faqCategories = [
    { id: 'all', name: 'All Topics', icon: '📚' },
    { id: 'getting-started', name: 'Getting Started', icon: '🚀' },
    { id: 'plans', name: 'AI Plans', icon: '🤖' },
    { id: 'billing', name: 'Billing', icon: '💳' },
    { id: 'account', name: 'Account', icon: '👤' },
    { id: 'technical', name: 'Technical', icon: '⚙️' }
  ]

  const faqs = [
    {
      category: 'getting-started',
      question: 'How do I get started with NeuroDesk?',
      answer: 'Simply sign up for a free account and you\'ll get 5 free AI-generated plans to try out. Choose a category or describe your goal, and our AI will create a detailed step-by-step plan for you.'
    },
    {
      category: 'getting-started',
      question: 'What types of plans can NeuroDesk create?',
      answer: 'NeuroDesk can create plans for Business Strategy, Learning & Development, Health & Fitness, Travel Planning, Creative Projects, and Personal Goals. Each category uses specialized templates and best practices.'
    },
    {
      category: 'plans',
      question: 'How accurate are the AI-generated plans?',
      answer: 'Our AI uses advanced algorithms and industry best practices to create comprehensive, actionable plans. While the plans are highly detailed and well-structured, we recommend reviewing and customizing them based on your specific situation.'
    },
    {
      category: 'plans',
      question: 'Can I edit or customize the generated plans?',
      answer: 'Yes! You can copy the generated plans and edit them in any text editor. Pro users can also save and organize their plans within the platform for easy access and modification.'
    },
    {
      category: 'billing',
      question: 'What\'s included in the free plan?',
      answer: 'The free plan includes 5 AI-generated plans, access to all planning categories, basic templates, and the ability to copy and download your plans. Perfect for trying out NeuroDesk!'
    },
    {
      category: 'billing',
      question: 'How does the Pro subscription work?',
      answer: 'NeuroDesk Pro costs $9.99/month and includes unlimited AI plans, advanced AI models, plan saving and organization, team sharing, priority support, and export to multiple formats.'
    },
    {
      category: 'billing',
      question: 'Do you offer any discounts or coupons?',
      answer: 'Yes! We regularly offer promotional codes. Try codes like SANCHIT2024, NEURODESK, or BETA for special discounts. Some codes may give you 100% off your first month!'
    },
    {
      category: 'account',
      question: 'How do I upgrade to Pro?',
      answer: 'You can upgrade to Pro anytime by clicking the "Upgrade to Pro" button in the paywall or pricing section. We accept all major credit cards and offer promotional codes for discounts.'
    },
    {
      category: 'account',
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your Pro subscription at any time. You\'ll continue to have Pro access until the end of your current billing period, then you\'ll return to the free plan.'
    },
    {
      category: 'technical',
      question: 'Is my data secure?',
      answer: 'Absolutely! We use industry-standard encryption to protect your data. Your plans and personal information are stored securely and never shared with third parties.'
    },
    {
      category: 'technical',
      question: 'Can I use NeuroDesk on mobile devices?',
      answer: 'Yes! NeuroDesk is fully responsive and works great on all devices - desktop, tablet, and mobile. You can access your plans anywhere, anytime.'
    },
    {
      category: 'technical',
      question: 'What browsers are supported?',
      answer: 'NeuroDesk works on all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of your preferred browser.'
    }
  ]

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

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
            Help Center
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Find answers to common questions and get the most out of NeuroDesk
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles..."
              className="w-full px-6 py-4 pl-12 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent text-lg"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {faqCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                selectedCategory === category.id
                  ? 'bg-slate-600 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </motion.div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="metallic-card p-6"
            >
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                {faq.question}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {faq.answer}
              </p>
              <div className="mt-4 flex items-center text-sm text-slate-500">
                <span className="mr-2">
                  {faqCategories.find(cat => cat.id === faq.category)?.icon}
                </span>
                <span>
                  {faqCategories.find(cat => cat.id === faq.category)?.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="metallic-card p-8 text-center"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            Still need help?
          </h2>
          <p className="text-slate-600 mb-6">
            Can't find what you're looking for? Our support team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="metallic-button">
              Contact Support
            </button>
            <button className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 font-medium px-6 py-3 rounded-lg transition-colors">
              Join Community
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Help
