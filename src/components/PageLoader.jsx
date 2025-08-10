import React, { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PageLoader = ({ onComplete = () => {} }) => {
  const [progress, setProgress] = useState(0)
  const [currentText, setCurrentText] = useState('Welcome to NeuroDesk')
  const [showSubtext, setShowSubtext] = useState(false)

  const progressRef = useRef(null)
  const changeTextTimeoutRef = useRef(null)
  const completeTimeoutRef = useRef(null)

  // Generate sparkle positions once so they don't reposition every render
  const sparkles = useMemo(
    () =>
      Array.from({ length: 20 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 2,
        size: `${Math.random() * 2 + 1}px`
      })),
    []
  )

  useEffect(() => {
    // change subtitle text after 1.5s
    changeTextTimeoutRef.current = setTimeout(() => {
      setShowSubtext(true)
      setCurrentText('A tech by SanchitVerse')
    }, 1500)

    // progress loop
    progressRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressRef.current)
          // keep a short delay so exit animation can run before parent unmounts us
          completeTimeoutRef.current = setTimeout(() => {
            try { onComplete() } catch (e) { /* noop */ }
          }, 500)
          return 100
        }
        return prev + 2
      })
    }, 60)

    return () => {
      clearTimeout(changeTextTimeoutRef.current)
      clearTimeout(completeTimeoutRef.current)
      clearInterval(progressRef.current)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {progress < 100 && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          aria-hidden="true"
        >
          <div className="relative text-center px-8 max-w-2xl mx-auto">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="mb-8"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-white font-bold text-3xl">N</span>
              </div>
            </motion.div>

            <motion.h1
              key={currentText}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.55 }}
              className="text-4xl md:text-5xl font-display font-bold text-white mb-4"
            >
              {currentText}
            </motion.h1>

            <AnimatePresence>
              {showSubtext && (
                <motion.p
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 8, opacity: 0 }}
                  transition={{ duration: 0.45, delay: 0.05 }}
                  className="text-xl text-slate-300 mb-12"
                >
                  Tech is loading...
                </motion.p>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="w-full max-w-md mx-auto"
            >
              <div className="bg-slate-700 rounded-full h-3 overflow-hidden shadow-inner">
                <motion.div
                  className="h-full rounded-full shadow-lg"
                  style={{
                    background:
                      'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)',
                    backgroundSize: '200% 100%'
                  }}
                  animate={{
                    width: `${progress}%`,
                    backgroundPosition: ['0% 0%', '200% 0%']
                  }}
                  transition={{
                    width: { duration: 0.12 },
                    backgroundPosition: { duration: 2, repeat: Infinity, ease: 'linear' }
                  }}
                />
              </div>

              <motion.div
                className="flex justify-between items-center mt-4 text-sm text-slate-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <span>Loading NeuroDesk...</span>
                <span>{progress}%</span>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-8 flex justify-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9 }}
            >
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-blue-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.18 }}
                />
              ))}
            </motion.div>

            {/* Sparkles */}
            <div className="absolute inset-0 pointer-events-none">
              {sparkles.map((s, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-white rounded-full"
                  style={{
                    left: s.left,
                    top: s.top,
                    width: s.size,
                    height: s.size,
                    opacity: 0.9
                  }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: s.delay }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PageLoader
