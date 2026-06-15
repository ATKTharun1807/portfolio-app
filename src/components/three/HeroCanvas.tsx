import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { Suspense, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ParticleField from './ParticleField'
import introVideo from '../../assets/my-intro.mp4'

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
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isBright, setIsBright] = useState(true)

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
        videoRef.current.play().catch(() => { })
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

  // Scroll-aware play/pause via IntersectionObserver
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Play from first frame and make bright automatically when it comes into view
          video.currentTime = 0
          video.play().catch(() => { })
          setIsBright(true)
        } else {
          // Pause and dim when it scrolls out of view
          video.pause()
          setIsBright(false)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const handleMouseEnter = () => {
    // Replay from beginning on hover if it was paused or ended
    if (videoRef.current && (videoRef.current.paused || videoRef.current.ended)) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => { })
      setIsBright(true)
    }
  }

  const handleMouseLeave = () => {
    // Pause and dim on mouse leave
    if (videoRef.current) {
      videoRef.current.pause()
      setIsBright(false)
    }
  }

  const handleVideoEnded = () => {
    setIsBright(false)
  }

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
        <FloatOrb x="47%" y="7%" size={13} delay={0.2} />
        <FloatOrb x="88%" y="13%" size={15} delay={0.9} />
        <FloatOrb x="44%" y="54%" size={11} delay={1.4} />
        <FloatOrb x="92%" y="48%" size={17} delay={0.5} />

        {/* ── Video background (right half) ── */}
        <div 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            position: 'absolute', top: 0, bottom: 0, left: '42%', right: 0,
            display: 'flex', alignItems: 'stretch',
            overflow: 'hidden',
            pointerEvents: 'all',
          }}
        >
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
            background: isBright ? 'rgba(5,5,20,0)' : 'rgba(5,5,20,0.3)',
            transition: 'background 0.5s ease-in-out',
            pointerEvents: 'none',
          }} />

          {/* The actual video */}
          <video
            ref={videoRef}
            src={introVideo}
            muted={isMuted}
            playsInline
            autoPlay
            onEnded={handleVideoEnded}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              display: 'block',
              filter: isBright ? 'brightness(1.2) contrast(1.05)' : 'brightness(0.85) contrast(0.98)',
              transition: 'filter 0.5s ease-in-out',
            }}
          />
        </div>
      </div>
    </div>
  )
}
