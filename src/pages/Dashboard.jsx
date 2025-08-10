import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import realAiService from '../utils/realAiService'

const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [planResponse, setPlanResponse] = useState('')
  const [codeResponse, setCodeResponse] = useState('')
  const [promptCount, setPromptCount] = useState(0)
  const [showPaywall, setShowPaywall] = useState(false)
  const [user, setUser] = useState(null)
  const [showUpgradeSuccess, setShowUpgradeSuccess] = useState(false)
  
  const [mode, setMode] = useState('planner');

  useEffect(() => {
    const count = localStorage.getItem('neurodesk_prompt_count') || '0'
    setPromptCount(parseInt(count))
    
    const userData = localStorage.getItem('neurodesk_user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
    
    if (location.state?.upgraded) {
      setShowUpgradeSuccess(true)
      setTimeout(() => setShowUpgradeSuccess(false), 5000)
    }
  }, [location.state])

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setPrompt('');
    setPlanResponse('');
    setCodeResponse('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const isPro = user?.isPro || localStorage.getItem('neurodesk_is_pro') === 'true'
    
    if (!isPro && promptCount >= 5) {
      setShowPaywall(true)
      return
    }

    if (!prompt.trim()) return

    setIsLoading(true)
    
    try {
      const aiResponse = await realAiService.generatePlan(prompt, mode === 'planner' ? getCurrentCategory() : null)
      if (mode === 'planner') {
        setPlanResponse(aiResponse);
        setCodeResponse('');
      } else {
        setCodeResponse(aiResponse);
        setPlanResponse('');
      }
      
      const newCount = promptCount + 1
      setPromptCount(newCount)
      localStorage.setItem('neurodesk_prompt_count', newCount.toString())
    } catch (error) {
      console.error('Error generating plan/code:', error)
      if (mode === 'planner') {
        setPlanResponse(`Sorry, I encountered an error generating your plan. Please try again.`);
      } else {
        setCodeResponse(`Sorry, I encountered an error generating your code. Please try again.`);
      }
    } finally {
      setIsLoading(false)
    }
  }

  const [selectedCategory, setSelectedCategory] = useState(null)
  
  const categories = [
    { name: 'Business Strategy', prompt: 'Create a business strategy for launching a new product', icon: '📊', color: 'from-blue-500 to-blue-600' },
    { name: 'Learning Plan', prompt: 'Design a 30-day learning plan for web development', icon: '📚', color: 'from-green-500 to-green-600' },
    { name: 'Health & Fitness', prompt: 'Create a beginner-friendly fitness routine for weight loss', icon: '💪', color: 'from-red-500 to-red-600' },
    { name: 'Travel Planning', prompt: 'Plan a 7-day budget trip to Europe', icon: '✈️', color: 'from-indigo-500 to-indigo-600' },
    { name: 'Creative Project', prompt: 'Plan a creative writing project for a short story collection', icon: '🎨', color: 'from-purple-500 to-purple-600' },
    { name: 'Personal Goals', prompt: 'Create a plan to improve work-life balance', icon: '🎯', color: 'from-orange-500 to-orange-600' },
  ]
  
  const getCurrentCategory = () => {
    if (selectedCategory) return selectedCategory
    
    const lowerPrompt = prompt.toLowerCase()
    for (const category of categories) {
      if (lowerPrompt.includes(category.name.toLowerCase().split(' ')[0])) {
        return category.name
      }
    }
    return null
  }

  const response = mode === 'planner' ? planResponse : codeResponse;

  if (showPaywall) {
    return (
      <div className="min-h-screen pt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="metallic-card p-8 text-center"
          >
            <div className="text-6xl mb-6">🚀</div>
            <h2 className="text-3xl font-display font-bold text-slate-800 mb-4">
              Unlock Unlimited Planning
            </h2>
            <p className="text-lg text-slate-600 mb-6">
              You've used all 5 free prompts! Upgrade to Pro for unlimited AI-powered planning.
            </p>
            <div className="bg-gradient-to-r from-slate-600 to-slate-700 text-white p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold mb-2">NeuroDesk Pro</h3>
              <div className="text-3xl font-bold mb-2">$9.99/month</div>
              <ul className="text-left space-y-2">
                <li>✓ Unlimited AI prompts</li>
                <li>✓ Save and organize plans</li>
                <li>✓ Share with team members</li>
                <li>✓ Advanced AI models</li>
                <li>✓ Priority support</li>
              </ul>
            </div>
            <button 
              onClick={() => navigate('/payment')}
              className="metallic-button text-lg px-8 py-4 mb-4"
            >
              Upgrade to Pro
            </button>
            <div className="text-sm text-slate-500">
              <button 
                onClick={() => setShowPaywall(false)}
                className="text-slate-600 hover:text-slate-800 underline"
              >
                Go back to dashboard
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    // The main container now uses h-screen and flex to control the overall layout height
    <div className="flex flex-col min-h-screen pt-16 sm:pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 w-full flex-1 flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-gradient mb-4 px-2">
              AI Planning Dashboard
            </h1>
            
            {showUpgradeSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-green-50 border border-green-200 text-green-700 px-6 py-3 rounded-lg mb-4 max-w-md mx-auto"
              >
                🎉 Welcome to NeuroDesk Pro! You now have unlimited AI plans.
              </motion.div>
            )}
            
            <div className="flex justify-center items-center space-x-4 mb-6 px-4">
              {user?.isPro || localStorage.getItem('neurodesk_is_pro') === 'true' ? (
                <div className="bg-gradient-to-r from-green-50 to-green-100 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-green-200">
                  <span className="text-xs sm:text-sm text-green-700 font-semibold">
                    ✨ NeuroDesk Pro - Unlimited Plans
                  </span>
                </div>
              ) : (
                <div className="bg-white/80 px-3 sm:px-4 py-2 rounded-full border border-slate-200">
                  <span className="text-xs sm:text-sm text-slate-600">
                    Free prompts remaining: <span className="font-semibold text-slate-800">{5 - promptCount}</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Mode Selector */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="flex metallic-card p-1 rounded-full">
            <button
              onClick={() => handleModeChange('planner')}
              className={`px-6 py-2 rounded-full transition-colors font-medium text-sm sm:text-base ${
                mode === 'planner'
                  ? 'bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              AI Planner
            </button>
            <button
              onClick={() => handleModeChange('code_generator')}
              className={`px-6 py-2 rounded-full transition-colors font-medium text-sm sm:text-base ${
                mode === 'code_generator'
                  ? 'bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Code Generator
            </button>
          </div>
        </div>

        {/* Content grid - The h-[60vh] class constrains the height of the grid container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 flex-1">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            {/* The metallic-card now has flex-1 to fill the available vertical space */}
            <div className="metallic-card p-4 sm:p-6 flex flex-col flex-1">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-3 sm:mb-4">
                {mode === 'planner' ? 'Describe Your Goal' : 'Describe Your Code Request'}
              </h2>
              
              {/* Quick Categories for Planner mode only */}
              {mode === 'planner' && (
                <div className="mb-4 sm:mb-6 overflow-y-auto">
                  <h3 className="text-xs sm:text-sm font-medium text-slate-600 mb-2 sm:mb-3">Quick Start Categories:</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {categories.map((category, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setPrompt(category.prompt)
                          setSelectedCategory(category.name)
                        }}
                        className={`text-left p-3 rounded-lg border transition-all text-sm flex items-center space-x-3 ${
                          selectedCategory === category.name
                            ? 'bg-slate-100 border-slate-300 shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center text-white text-sm`}>
                          {category.icon}
                        </div>
                        <div>
                          <div className="font-medium text-slate-800">{category.name}</div>
                          <div className="text-xs text-slate-500 mt-1">Click to auto-fill prompt</div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col flex-1">
                {/* The textarea now has flex-1 to occupy the remaining space above the button */}
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={mode === 'planner' ? "Describe what you want to plan or achieve. Be as specific as possible for better results..." : "Describe the code you need. For example: 'Give me a simple Java program to print all numbers from 1 to 10.'"}
                  className="w-full flex-1 p-3 sm:p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none text-sm sm:text-base min-h-[100px]"
                  disabled={isLoading}
                />
                
                <button
                  type="submit"
                  disabled={isLoading || !prompt.trim()}
                  className="w-full mt-3 sm:mt-4 metallic-button disabled:opacity-50 disabled:cursor-not-allowed py-3 sm:py-4 text-sm sm:text-base"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating {mode === 'planner' ? 'Plan' : 'Code'}...</span>
                    </div>
                  ) : (
                    `Generate ${mode === 'planner' ? 'Step-by-Step Plan' : 'Code'}`
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Output Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col"
          >
            {/* This metallic-card now has flex-1, making it take up the rest of the height */}
            <div className="metallic-card p-4 sm:p-6 flex flex-col flex-1">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-3 sm:mb-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">
                  Your {mode === 'planner' ? 'Plan' : 'Code'}
                </h2>
                {response && (
                  <div className="flex space-x-2">
                    <button 
                      // Using the old, more compatible method for clipboard functionality
                      onClick={() => {
                        const tempTextarea = document.createElement('textarea');
                        tempTextarea.value = response;
                        document.body.appendChild(tempTextarea);
                        tempTextarea.select();
                        document.execCommand('copy');
                        document.body.removeChild(tempTextarea);
                      }}
                      className="text-sm text-slate-600 hover:text-slate-800 flex items-center space-x-1 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>Copy</span>
                    </button>
                    <button 
                      onClick={() => {
                        const blob = new Blob([response], { type: 'text/markdown' })
                        const url = URL.createObjectURL(blob)
                        const a = document.createElement('a')
                        a.href = url
                        a.download = `neurodesk-${mode === 'planner' ? 'plan' : 'code'}.md`
                        a.click()
                        URL.revokeObjectURL(url)
                      }}
                      className="text-sm text-slate-600 hover:text-slate-800 flex items-center space-x-1 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Download</span>
                    </button>
                  </div>
                )}
              </div>
              
              {/* This div is now set to flex-1 and has overflow-y-auto to manage scrolling */}
              <div className="bg-slate-50 rounded-lg p-4 flex-1 overflow-y-auto">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-4">
                    <div className="w-8 h-8 border-4 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
                    <p className="text-slate-600">AI is crafting your personalized {mode === 'planner' ? 'plan' : 'code'}...</p>
                  </div>
                ) : response ? (
                  <div className="prose prose-slate max-w-none">
                    {mode === 'planner' ? (
                      <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-700">
                        {response}
                      </div>
                    ) : (
                      <pre className="p-4 bg-slate-800 text-white rounded-lg overflow-x-auto font-mono text-sm leading-relaxed">
                        <code>{response}</code>
                      </pre>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-500">
                    <div className="text-4xl mb-4">{mode === 'planner' ? '🧠' : '👨‍💻'}</div>
                    <p>Your AI-generated {mode === 'planner' ? 'plan' : 'code'} will appear here</p>
                    <p className="text-sm mt-2">Enter your {mode === 'planner' ? 'goal' : 'code request'} and click generate to get started</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
