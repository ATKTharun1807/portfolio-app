import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Download, ChevronDown, ExternalLink } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/ui/BrandIcons'
import { personal } from '../data/portfolio'
import HeroCanvas from '../components/three/HeroCanvas'

function useTypingEffect(texts: string[]) {
  const [state, setState] = useState({ idx: 0, text: '', deleting: false })

  useEffect(() => {
    const current = texts[state.idx]
    let timeout: ReturnType<typeof setTimeout>

    if (!state.deleting && state.text.length < current.length) {
      timeout = setTimeout(() => {
        setState(s => ({ ...s, text: current.slice(0, s.text.length + 1) }))
      }, 70)
    } else if (!state.deleting && state.text.length === current.length) {
      timeout = setTimeout(() => setState(s => ({ ...s, deleting: true })), 2400)
    } else if (state.deleting && state.text.length > 0) {
      timeout = setTimeout(() => {
        setState(s => ({ ...s, text: s.text.slice(0, -1) }))
      }, 38)
    } else if (state.deleting && state.text.length === 0) {
      setState(s => ({ ...s, deleting: false, idx: (s.idx + 1) % texts.length }))
    }

    return () => clearTimeout(timeout)
  }, [state, texts])

  return state.text
}

export default function Hero() {
  const typedText = useTypingEffect(personal.typingTexts)

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 60%, var(--bg) 100%)' }}
    >
      {/* 3D Canvas background */}
      <div className="absolute inset-0">
        <HeroCanvas className="w-full h-full" />
      </div>

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 65% 90% at 28% 50%, rgba(5,5,16,0) 0%, var(--bg-radial) 100%)',
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="max-w-xl">

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
            </span>
            <span className="text-sm text-green-400 font-medium tracking-wide">
              Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            className="text-5xl md:text-7xl font-bold leading-none mb-4 tracking-tight"
          >
            <span style={{ color: 'var(--text)' }}>Tharun</span>
            <br />
            <span className="gradient-text">Kumar S</span>
          </motion.h1>

          {/* Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl md:text-2xl font-medium mb-3"
            style={{ color: 'var(--muted)' }}
          >
            Full Stack Developer &{' '}
            <span style={{ color: 'var(--text)' }}>Software Engineer</span>
          </motion.div>

          {/* Typing text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex items-center gap-2 text-lg mb-8 h-8"
          >
            <span style={{ color: 'var(--neon)', fontFamily: "'JetBrains Mono', monospace" }}>&gt;</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-sm md:text-base" id="typing-text">
              {typedText}
            </span>
            <span className="blink font-bold" style={{ color: 'var(--neon)' }}>|</span>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="text-base leading-relaxed mb-10 max-w-lg"
            style={{ color: 'var(--muted)' }}
          >
            Building scalable web solutions and exploring the intersection of software engineering,
            cyber security, and artificial intelligence at Sri Shakthi Institute of Engineering.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <button
              id="btn-projects"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #6ee7f7, #b56aff)', color: '#050510' }}
            >
              View Projects
              <ExternalLink size={16} />
            </button>

            <a
              id="btn-contact"
              href={`mailto:${personal.email}`}
              className="glass inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              style={{ color: 'var(--text)' }}
            >
              <Mail size={16} />
              Contact Me
            </a>

            <a
              id="btn-resume"
              href="#"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm transition-all duration-200"
              style={{ color: 'var(--muted)' }}
            >
              <Download size={15} />
              Resume
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.15, duration: 0.6 }}
            className="flex items-center gap-5"
          >
            <a href={personal.github} target="_blank" rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--neon)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
              aria-label="GitHub">
              <GithubIcon size={22} />
            </a>
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--purple)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
              aria-label="LinkedIn">
              <LinkedinIcon size={22} />
            </a>
            <a href={`mailto:${personal.email}`}
              className="transition-colors duration-200"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--neon)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
              aria-label="Email">
              <Mail size={22} />
            </a>
            <span className="w-px h-5" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <span className="text-xs" style={{ color: 'var(--muted)', fontFamily: "'JetBrains Mono', monospace" }}>
              SSIET, Coimbatore
            </span>
          </motion.div>
        </div>
      </div>


      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        onClick={scrollToAbout}
        id="scroll-down-btn"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-colors duration-200 cursor-pointer border-none bg-transparent"
        style={{ color: 'var(--muted)' }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  )
}
