import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { Suspense, useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import ParticleField from './ParticleField'
import introVideo from '../../assets/my-intro.mp4'

/* ─────────────────────────────────────────────
   INLINE SVG ICONS
───────────────────────────────────────────── */
const PythonIcon = () => (
  <svg viewBox="0 0 40 40" width="22" height="22">
    <path d="M20 4c-4 0-8 1-8 5v4h8v2H8c-3 0-6 2-6 8s3 8 6 8h3v-5c0-3 2-5 5-5h8c3 0 5-2 5-5V9c0-3-3-5-9-5z" fill="#4B8BBE"/>
    <path d="M20 36c4 0 8-1 8-5v-4h-8v-2h12c3 0 6-2 6-8s-3-8-6-8h-3v5c0 3-2 5-5 5h-8c-3 0-5 2-5 5v8c0 3 3 5 9 5z" fill="#FFE873"/>
    <circle cx="15" cy="11" r="2" fill="#fff"/>
    <circle cx="25" cy="29" r="2" fill="#fff"/>
  </svg>
)
const EditorIcon = () => (
  <svg viewBox="0 0 40 40" width="22" height="22" fill="none">
    <rect x="4" y="8" width="32" height="24" rx="3" stroke="#b56aff" strokeWidth="2"/>
    <line x1="10" y1="16" x2="22" y2="16" stroke="#6ee7f7" strokeWidth="2" strokeLinecap="round"/>
    <line x1="10" y1="21" x2="28" y2="21" stroke="#b56aff" strokeWidth="2" strokeLinecap="round"/>
    <line x1="10" y1="26" x2="18" y2="26" stroke="#6ee7f7" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)
const DatabaseIcon = () => (
  <svg viewBox="0 0 40 40" width="22" height="22" fill="none">
    <ellipse cx="20" cy="12" rx="13" ry="5" stroke="#6ee7f7" strokeWidth="2"/>
    <path d="M7 12v8c0 2.8 5.8 5 13 5s13-2.2 13-5v-8" stroke="#6ee7f7" strokeWidth="2"/>
    <path d="M7 20v8c0 2.8 5.8 5 13 5s13-2.2 13-5v-8" stroke="#6ee7f7" strokeWidth="2"/>
  </svg>
)

/* ─────────────────────────────────────────────
   FLOAT ORB
───────────────────────────────────────────── */
function FloatOrb({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  return (
    <motion.div
      animate={{ y: [0, -14, 0], opacity: [0.35, 0.6, 0.35] }}
      transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{
        position: 'absolute', left: x, top: y,
        width: size, height: size, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(110,231,247,0.18) 0%, rgba(181,106,255,0.12) 60%, transparent 100%)',
        border: '1px solid rgba(110,231,247,0.15)',
        filter: 'blur(1px)',
        pointerEvents: 'none',
      }}
    />
  )
}

/* ─────────────────────────────────────────────
   TECH BADGE
───────────────────────────────────────────── */
function TechBadge({
  icon, label, x, y, delay, floatY,
}: {
  icon: React.ReactNode; label?: string; x: string; y: string; delay: number; floatY: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1, y: [0, -floatY, 0] }}
      transition={{
        opacity: { delay, duration: 0.5 },
        scale: { delay, duration: 0.5 },
        y: { delay, duration: 3.5 + delay * 0.3, repeat: Infinity, ease: 'easeInOut' },
      }}
      style={{
        position: 'absolute', left: x, top: y,
        background: 'rgba(10,10,30,0.82)',
        border: '1px solid rgba(110,231,247,0.2)',
        borderRadius: '14px',
        padding: label ? '8px 12px' : '10px',
        display: 'flex', alignItems: 'center', gap: 8,
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        pointerEvents: 'none',
      }}
    >
      {icon}
      {label && (
        <span style={{
          fontSize: 12, fontWeight: 700, color: '#e2e8f0',
          fontFamily: 'JetBrains Mono, monospace',
        }}>
          {label}
        </span>
      )}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   CYCLING SPEECH BUBBLE
───────────────────────────────────────────── */
const speechPhrases = [
  "Hi, I'm Tharun Kumar! 👋",
  "Full Stack Developer 💻",
  "I build modern web apps 🌐",
  "Responsive & user-friendly ✨",
  "Passionate about great UX 🎨",
  "Let's build something amazing! 🚀",
]

function CyclingSpeechBubble() {
  return (
    <>
      {speechPhrases.map((phrase, i) => (
        <motion.div
          key={phrase}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.9], y: [10, 0, 0, -6] }}
          transition={{
            duration: 2.4,
            delay: i * 3.6,
            repeat: Infinity,
            repeatDelay: 6 * 3.6 - 2.4,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute', bottom: '62%', left: '50%', transform: 'translateX(-45%)',
            background: 'rgba(8,8,24,0.92)',
            border: '1.5px solid rgba(110,231,247,0.45)',
            borderRadius: '18px 18px 18px 4px', padding: '9px 16px',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 24px rgba(110,231,247,0.15)',
            zIndex: 7, pointerEvents: 'none', whiteSpace: 'nowrap',
            color: '#e2e8f0', fontSize: '13px', fontWeight: 600,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {phrase}
          <div style={{
            position: 'absolute', bottom: -8, left: 18,
            width: 0, height: 0,
            borderLeft: '8px solid transparent', borderRight: '8px solid transparent',
            borderTop: '8px solid rgba(110,231,247,0.45)',
          }} />
        </motion.div>
      ))}
    </>
  )
}

/* ─────────────────────────────────────────────
   THREE.JS PARTICLE SCENE (background only)
───────────────────────────────────────────── */
function HeroScene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
      <fog attach="fog" args={['#050510', 10, 25]} />
      <ParticleField count={900} />
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={0.6} color="#6ee7f7" />
      <pointLight position={[-3, 2, 1]} intensity={0.4} color="#b56aff" />
    </>
  )
}

/* ─────────────────────────────────────────────
   MAIN HERO CANVAS
───────────────────────────────────────────── */
interface HeroCanvasProps { className?: string }

export default function HeroCanvas({ className }: HeroCanvasProps) {
  const rawX = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 50, damping: 15 })
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMuted, setIsMuted] = useState(false)

  // Sync mute state with video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
    }
  }, [isMuted])

  // Play video on first user interaction if blocked by autoplay policies
  useEffect(() => {
    const handleInteraction = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {})
      }
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
    }
    window.addEventListener('click', handleInteraction)
    window.addEventListener('touchstart', handleInteraction)
    return () => {
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
    }
  }, [])

  // Mouse parallax
  useEffect(() => {
    const handleMove = (e: MouseEvent) => rawX.set((e.clientX / window.innerWidth - 0.5) * 18)
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [rawX])

  // Scroll-aware play/pause via IntersectionObserver
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className={className} style={{ position: 'relative' }}>

      {/* ── Particle starfield canvas ── */}
      <Canvas
        style={{ position: 'absolute', inset: 0 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </Canvas>

      {/* ── HTML overlay ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>

        {/* Floating orbs */}
        <FloatOrb x="47%" y="7%"  size={13} delay={0.2} />
        <FloatOrb x="88%" y="13%" size={15} delay={0.9} />
        <FloatOrb x="44%" y="54%" size={11} delay={1.4} />
        <FloatOrb x="92%" y="48%" size={17} delay={0.5} />



        {/* ── Video background (right half) ── */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0, left: '42%', right: 0,
          display: 'flex', alignItems: 'stretch',
          overflow: 'hidden',
        }}>
          {/* Left fade gradient to blend into dark bg */}
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: '80px', zIndex: 5,
            background: 'linear-gradient(to right, var(--bg, #050510), transparent)',
            pointerEvents: 'none',
          }} />
          {/* Right fade */}
          <div style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: '40px', zIndex: 5,
            background: 'linear-gradient(to left, var(--bg, #050510), transparent)',
            pointerEvents: 'none',
          }} />
          {/* Top fade */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '80px', zIndex: 5,
            background: 'linear-gradient(to bottom, var(--bg, #050510), transparent)',
            pointerEvents: 'none',
          }} />
          {/* Bottom fade */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px', zIndex: 5,
            background: 'linear-gradient(to top, var(--bg, #050510), transparent)',
            pointerEvents: 'none',
          }} />

          {/* Dark overlay tint */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 2,
            background: 'rgba(5,5,20,0.35)',
          }} />

          {/* The actual video */}
          <video
            ref={videoRef}
            src={introVideo}
            muted={isMuted}
            loop
            playsInline
            autoPlay
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />

          {/* 🔊 Unmute button — browsers block audio autoplay, user must click */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.4 }}
            onClick={() => {
              setIsMuted(m => !m)
            }}
            title={isMuted ? 'Click to unmute' : 'Click to mute'}
            style={{
              position: 'absolute', bottom: '12%', right: '6%', zIndex: 10,
              display: 'flex', alignItems: 'center', gap: 8,
              background: isMuted ? 'rgba(10,10,28,0.85)' : 'linear-gradient(135deg, rgba(110,231,247,0.25), rgba(181,106,255,0.2))',
              border: isMuted ? '1.5px solid rgba(255,255,255,0.2)' : '1.5px solid rgba(110,231,247,0.6)',
              borderRadius: 30, padding: '9px 16px',
              cursor: 'pointer', backdropFilter: 'blur(12px)',
              boxShadow: isMuted ? '0 4px 20px rgba(0,0,0,0.5)' : '0 4px 24px rgba(110,231,247,0.3)',
              color: '#fff', fontSize: 13, fontWeight: 600,
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.3s ease',
              pointerEvents: 'all',
            }}
          >
            {/* Animated sound icon */}
            <motion.span
              animate={isMuted ? {} : { scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{ fontSize: 16, lineHeight: 1 }}
            >
              {isMuted ? '🔇' : '🔊'}
            </motion.span>
            <span style={{ color: isMuted ? 'rgba(255,255,255,0.7)' : '#6ee7f7' }}>
              {isMuted ? 'Tap to hear me' : 'Playing audio'}
            </span>
          </motion.button>

          {/* Tech badges on video side */}
          <motion.div style={{ position: 'absolute', inset: 0, zIndex: 6, x: springX }}>
            <TechBadge icon={<PythonIcon />}   x="72%" y="10%" delay={0.7} floatY={11} />
            <TechBadge icon={<EditorIcon />}   x="82%" y="35%" delay={1.0} floatY={10} />
            <TechBadge icon={<DatabaseIcon />} x="70%" y="60%" delay={0.5} floatY={13} />
          </motion.div>

          {/* Cycling speech bubble */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 7 }}>
            <CyclingSpeechBubble />
          </div>
        </div>
      </div>
    </div>
  )
}
