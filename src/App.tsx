import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/ui/Navbar'
import CustomCursor from './components/ui/CustomCursor'
import LoadingScreen from './components/ui/LoadingScreen'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Education from './sections/Education'
import Contact from './sections/Contact'

function Footer() {
  return (
    <footer className="border-t py-10 px-6 text-center" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
      <p className="text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--muted)' }}>
        © 2026{' '}
        <span className="gradient-text font-semibold">Tharun Kumar S</span>
        {' '}— Built with React, Three.js & ❤️
      </p>
    </footer>
  )
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 z-50 h-0.5 transition-all duration-100"
      style={{
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #6ee7f7, #b56aff)',
      }}
    />
  )
}

const Divider = () => (
  <div className="h-px mx-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />
)

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <LoadingScreen onDone={() => setLoaded(true)} />

      <AnimatePresence>
        {loaded && (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <CustomCursor />
            <ScrollProgress />
            <Navbar />
            <main>
              <Hero />
              <Divider />
              <About />
              <Divider />
              <Projects />
              <Divider />
              <Education />
              <Divider />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
