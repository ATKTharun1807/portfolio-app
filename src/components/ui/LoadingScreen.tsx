import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const steps = [0, 15, 35, 55, 72, 88, 96, 100]
    let i = 0
    const tick = () => {
      if (i < steps.length) {
        setProgress(steps[i])
        i++
        setTimeout(tick, i === steps.length - 1 ? 300 : 220)
      } else {
        setTimeout(() => {
          setDone(true)
          setTimeout(onDone, 500)
        }, 400)
      }
    }
    setTimeout(tick, 200)
  }, [onDone])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: 'var(--bg)' }}
        >
          {/* Animated logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="text-6xl font-bold font-['Space_Grotesk'] gradient-text">TK.</div>
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #6ee7f7, #b56aff)' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.2 }}
            />
          </div>

          <span className="font-['JetBrains_Mono'] text-xs text-[var(--muted)]">
            {progress.toString().padStart(3, '0')}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
