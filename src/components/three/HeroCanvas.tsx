import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense, useState, useEffect } from 'react'
import PremiumAvatar from './PremiumAvatar'
import ParticleField from './ParticleField'

function HeroScene({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.5, 5.5]} fov={50} />
      <fog attach="fog" args={['#050510', 8, 22]} />
      <ParticleField count={1000} />
      <Suspense fallback={null}>
        <PremiumAvatar mouseX={mouseX} mouseY={mouseY} />
      </Suspense>
    </>
  )
}

interface HeroCanvasProps {
  className?: string
}

export default function HeroCanvas({ className }: HeroCanvasProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <Canvas
      className={className}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      shadows
    >
      <HeroScene mouseX={mouse.x} mouseY={mouse.y} />
    </Canvas>
  )
}
