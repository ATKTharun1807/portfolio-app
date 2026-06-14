import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Box, Cylinder, Torus, Float, MeshDistortMaterial, Environment } from '@react-three/drei'
import * as THREE from 'three'

/* ─────────────────────────────────────────────────────────────
   FLOATING TECH ICON LABELS
───────────────────────────────────────────────────────────── */
function TechBadge({
  position,
  label,
  color,
  delay = 0,
}: {
  position: [number, number, number]
  label: string
  color: string
  delay?: number
}) {
  const ref = useRef<THREE.Group>(null)
  const t = useRef(delay)

  useFrame((_, delta) => {
    if (!ref.current) return
    t.current += delta
    ref.current.position.y = position[1] + Math.sin(t.current * 0.9) * 0.18
    ref.current.rotation.y = Math.sin(t.current * 0.4) * 0.15
  })

  return (
    <group ref={ref} position={position}>
      {/* Badge background */}
      <mesh>
        <planeGeometry args={[0.7, 0.28]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Badge border glow */}
      <mesh>
        <planeGeometry args={[0.72, 0.30]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.08}
          wireframe
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Glow sphere */}
      <mesh scale={0.06}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.9} />
      </mesh>
    </group>
  )
}

/* ─────────────────────────────────────────────────────────────
   ORBITING RING PARTICLES
───────────────────────────────────────────────────────────── */
function OrbitRing({
  radius,
  speed,
  color,
  count,
  tilt,
}: {
  radius: number
  speed: number
  color: string
  count: number
  tilt: number
}) {
  const ref = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * speed
  })

  const dots = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2
      return {
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
      }
    })
  }, [count, radius])

  return (
    <group ref={ref} rotation={[tilt, 0, 0]}>
      {dots.map((d, i) => (
        <mesh key={i} position={[d.x, 0, d.z]}>
          <sphereGeometry args={[0.022, 6, 6]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  )
}

/* ─────────────────────────────────────────────────────────────
   PIXAR-STYLE 3D AVATAR
───────────────────────────────────────────────────────────── */
export default function PremiumAvatar({ mouseX = 0, mouseY = 0 }: { mouseX?: number; mouseY?: number }) {
  const rootRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)
  const bodyRef = useRef<THREE.Group>(null)
  const leftHandRef = useRef<THREE.Group>(null)
  const rightHandRef = useRef<THREE.Group>(null)
  const leftEyeRef = useRef<THREE.Mesh>(null)
  const rightEyeRef = useRef<THREE.Mesh>(null)

  const t = useRef(0)
  const blinkTimer = useRef(0)
  const nextBlink = useRef(3.0)

  // Skin, clothes colors
  const skinColor = '#F5C5A3'
  const skinDark = '#E8A882'
  const hairColor = '#1A1008'
  const shirtColor = '#1e2a4a' // deep navy hoodie
  const jacketColor = '#2d3561' // slightly lighter
  const jeansColor = '#233358'
  const shoeColor = '#ffffff'
  const watchColor = '#34d399'
  const eyeWhite = '#ffffff'
  const eyePupil = '#1a0a00'
  const irisColor = '#4a7cdc' // blue eyes

  useFrame((state, delta) => {
    t.current += delta
    const elapsed = t.current

    // Mouse follow for head
    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        mouseX * 0.35,
        0.05
      )
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        mouseY * -0.2 + Math.sin(elapsed * 0.8) * 0.04,
        0.05
      )
    }

    // Idle breathing — body
    if (bodyRef.current) {
      const breathe = Math.sin(elapsed * 1.4) * 0.012
      bodyRef.current.scale.y = 1 + breathe
      bodyRef.current.position.y = breathe * 0.5
    }

    // Gentle idle sway
    if (rootRef.current) {
      rootRef.current.rotation.z = Math.sin(elapsed * 0.5) * 0.012
    }

    // Hand gestures
    if (leftHandRef.current) {
      leftHandRef.current.rotation.z = Math.sin(elapsed * 1.2) * 0.08 + 0.1
    }
    if (rightHandRef.current) {
      rightHandRef.current.rotation.z = Math.sin(elapsed * 1.2 + 1) * 0.08 - 0.1
    }

    // Blink
    blinkTimer.current += delta
    if (blinkTimer.current > nextBlink.current) {
      const blinkProgress = (blinkTimer.current - nextBlink.current) / 0.12
      const scaleY = blinkProgress < 0.5
        ? THREE.MathUtils.lerp(1, 0.08, blinkProgress * 2)
        : THREE.MathUtils.lerp(0.08, 1, (blinkProgress - 0.5) * 2)

      if (leftEyeRef.current) leftEyeRef.current.scale.y = Math.max(0.08, Math.min(1, scaleY))
      if (rightEyeRef.current) rightEyeRef.current.scale.y = Math.max(0.08, Math.min(1, scaleY))

      if (blinkProgress >= 1) {
        blinkTimer.current = 0
        nextBlink.current = 2.5 + Math.random() * 3.5
        if (leftEyeRef.current) leftEyeRef.current.scale.y = 1
        if (rightEyeRef.current) rightEyeRef.current.scale.y = 1
      }
    }
  })

  return (
    <group ref={rootRef} position={[0, -1.6, 0]}>

      {/* ── ENVIRONMENT LIGHTING ── */}
      <Environment preset="studio" />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 3]} intensity={1.2} color="#ffffff" castShadow />
      <directionalLight position={[-3, 3, -1]} intensity={0.4} color="#b56aff" />
      <pointLight position={[0, 4, 2]} intensity={0.8} color="#6ee7f7" />
      <pointLight position={[2, 0, 2]} intensity={0.5} color="#b56aff" />

      {/* ── LEGS ── */}
      {/* Left leg */}
      <group position={[-0.18, 0.62, 0]}>
        {/* Upper leg */}
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.13, 0.115, 0.56, 14]} />
          <meshStandardMaterial color={jeansColor} roughness={0.7} />
        </mesh>
        {/* Knee detail */}
        <mesh position={[0, 0.02, 0.02]}>
          <sphereGeometry args={[0.14, 10, 10]} />
          <meshStandardMaterial color={jeansColor} roughness={0.8} />
        </mesh>
        {/* Lower leg */}
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.115, 0.1, 0.56, 14]} />
          <meshStandardMaterial color={jeansColor} roughness={0.7} />
        </mesh>
        {/* Shoe */}
        <group position={[0, -0.62, 0.06]}>
          <mesh>
            <boxGeometry args={[0.21, 0.1, 0.36]} />
            <meshStandardMaterial color={shoeColor} roughness={0.3} metalness={0.1} />
          </mesh>
          <mesh position={[0, -0.03, -0.06]}>
            <boxGeometry args={[0.22, 0.05, 0.12]} />
            <meshStandardMaterial color="#e8e8e8" roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* Right leg */}
      <group position={[0.18, 0.62, 0]}>
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.13, 0.115, 0.56, 14]} />
          <meshStandardMaterial color={jeansColor} roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.02, 0.02]}>
          <sphereGeometry args={[0.14, 10, 10]} />
          <meshStandardMaterial color={jeansColor} roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.115, 0.1, 0.56, 14]} />
          <meshStandardMaterial color={jeansColor} roughness={0.7} />
        </mesh>
        <group position={[0, -0.62, 0.06]}>
          <mesh>
            <boxGeometry args={[0.21, 0.1, 0.36]} />
            <meshStandardMaterial color={shoeColor} roughness={0.3} metalness={0.1} />
          </mesh>
          <mesh position={[0, -0.03, -0.06]}>
            <boxGeometry args={[0.22, 0.05, 0.12]} />
            <meshStandardMaterial color="#e8e8e8" roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* ── BODY GROUP ── */}
      <group ref={bodyRef} position={[0, 1.38, 0]}>
        {/* Torso */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.32, 0.28, 0.85, 16]} />
          <meshStandardMaterial color={shirtColor} roughness={0.7} />
        </mesh>

        {/* Jacket / hoodie overlay */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.33, 0.295, 0.75, 16]} />
          <meshStandardMaterial color={jacketColor} roughness={0.65} transparent opacity={0.6} />
        </mesh>

        {/* Jacket zipper line */}
        <mesh position={[0, 0.05, 0.33]}>
          <boxGeometry args={[0.025, 0.7, 0.01]} />
          <meshStandardMaterial color="#6ee7f7" emissive="#6ee7f7" emissiveIntensity={0.5} />
        </mesh>

        {/* Hoodie kangaroo pocket */}
        <mesh position={[0, -0.3, 0.3]}>
          <boxGeometry args={[0.32, 0.18, 0.04]} />
          <meshStandardMaterial color="#232f56" roughness={0.8} />
        </mesh>

        {/* Collar / neck */}
        <mesh position={[0, 0.46, 0]}>
          <cylinderGeometry args={[0.145, 0.175, 0.12, 14]} />
          <meshStandardMaterial color={skinDark} roughness={0.5} />
        </mesh>

        {/* ── SHOULDERS ── */}
        {/* Left shoulder */}
        <mesh position={[-0.36, 0.3, 0]}>
          <sphereGeometry args={[0.15, 12, 12]} />
          <meshStandardMaterial color={jacketColor} roughness={0.65} />
        </mesh>
        {/* Right shoulder */}
        <mesh position={[0.36, 0.3, 0]}>
          <sphereGeometry args={[0.15, 12, 12]} />
          <meshStandardMaterial color={jacketColor} roughness={0.65} />
        </mesh>

        {/* ── ARMS ── */}
        {/* Left arm */}
        <group ref={leftHandRef} position={[-0.36, 0.06, 0]}>
          <mesh position={[0, -0.22, 0]}>
            <cylinderGeometry args={[0.1, 0.085, 0.44, 12]} />
            <meshStandardMaterial color={jacketColor} roughness={0.65} />
          </mesh>
          {/* Elbow */}
          <mesh position={[-0.05, -0.45, 0.04]}>
            <sphereGeometry args={[0.09, 10, 10]} />
            <meshStandardMaterial color={jacketColor} roughness={0.7} />
          </mesh>
          {/* Forearm */}
          <mesh position={[-0.06, -0.65, 0.05]} rotation={[0.3, 0, -0.3]}>
            <cylinderGeometry args={[0.085, 0.075, 0.38, 12]} />
            <meshStandardMaterial color={jacketColor} roughness={0.65} />
          </mesh>
          {/* Wrist / watch */}
          <mesh position={[-0.1, -0.88, 0.07]}>
            <torusGeometry args={[0.07, 0.025, 8, 16]} />
            <meshStandardMaterial color={watchColor} emissive={watchColor} emissiveIntensity={0.6} metalness={0.6} roughness={0.2} />
          </mesh>
          {/* Hand */}
          <mesh position={[-0.1, -1.0, 0.08]}>
            <sphereGeometry args={[0.075, 12, 12]} />
            <meshStandardMaterial color={skinColor} roughness={0.5} />
          </mesh>
        </group>

        {/* Right arm */}
        <group ref={rightHandRef} position={[0.36, 0.06, 0]}>
          <mesh position={[0, -0.22, 0]}>
            <cylinderGeometry args={[0.1, 0.085, 0.44, 12]} />
            <meshStandardMaterial color={jacketColor} roughness={0.65} />
          </mesh>
          <mesh position={[0.05, -0.45, 0.04]}>
            <sphereGeometry args={[0.09, 10, 10]} />
            <meshStandardMaterial color={jacketColor} roughness={0.7} />
          </mesh>
          <mesh position={[0.06, -0.65, 0.05]} rotation={[0.3, 0, 0.3]}>
            <cylinderGeometry args={[0.085, 0.075, 0.38, 12]} />
            <meshStandardMaterial color={jacketColor} roughness={0.65} />
          </mesh>
          <mesh position={[0.1, -0.88, 0.07]}>
            <sphereGeometry args={[0.075, 12, 12]} />
            <meshStandardMaterial color={skinColor} roughness={0.5} />
          </mesh>
        </group>
      </group>

      {/* ── HEAD ── */}
      <group ref={headRef} position={[0, 2.42, 0]}>
        {/* Main skull — slightly squarish Pixar shape */}
        <mesh>
          <sphereGeometry args={[0.34, 20, 20]} />
          <meshStandardMaterial color={skinColor} roughness={0.45} metalness={0.0} />
        </mesh>
        {/* Cheek widening */}
        <mesh position={[0, -0.06, 0]} scale={[1.08, 0.94, 1.0]}>
          <sphereGeometry args={[0.33, 18, 18]} />
          <meshStandardMaterial color={skinColor} roughness={0.45} transparent opacity={0.5} />
        </mesh>

        {/* ── HAIR ── */}
        {/* Hair base cap */}
        <mesh position={[0, 0.16, 0]} scale={[1.0, 0.68, 1.0]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial color={hairColor} roughness={0.85} />
        </mesh>
        {/* Fringe / front hair */}
        <mesh position={[0.0, 0.28, 0.26]}>
          <sphereGeometry args={[0.13, 12, 12]} />
          <meshStandardMaterial color={hairColor} roughness={0.85} />
        </mesh>
        <mesh position={[-0.1, 0.26, 0.24]}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial color={hairColor} roughness={0.85} />
        </mesh>
        <mesh position={[0.1, 0.27, 0.24]}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial color={hairColor} roughness={0.85} />
        </mesh>
        {/* Side swoop left */}
        <mesh position={[-0.27, 0.22, 0.12]} scale={[0.7, 0.5, 0.8]}>
          <sphereGeometry args={[0.18, 10, 10]} />
          <meshStandardMaterial color={hairColor} roughness={0.85} />
        </mesh>
        {/* Side swoop right */}
        <mesh position={[0.27, 0.22, 0.12]} scale={[0.7, 0.5, 0.8]}>
          <sphereGeometry args={[0.18, 10, 10]} />
          <meshStandardMaterial color={hairColor} roughness={0.85} />
        </mesh>

        {/* ── EYEBROWS ── */}
        <mesh position={[-0.12, 0.12, 0.3]} rotation={[0, 0, 0.08]}>
          <boxGeometry args={[0.12, 0.022, 0.015]} />
          <meshStandardMaterial color="#2a1800" roughness={0.9} />
        </mesh>
        <mesh position={[0.12, 0.12, 0.3]} rotation={[0, 0, -0.08]}>
          <boxGeometry args={[0.12, 0.022, 0.015]} />
          <meshStandardMaterial color="#2a1800" roughness={0.9} />
        </mesh>

        {/* ── EYES ── */}
        {/* Left eye socket */}
        <group position={[-0.12, 0.03, 0.3]}>
          {/* White sclera */}
          <mesh>
            <sphereGeometry args={[0.065, 14, 14]} />
            <meshStandardMaterial color={eyeWhite} roughness={0.1} />
          </mesh>
          {/* Iris */}
          <mesh position={[0, 0, 0.042]}>
            <circleGeometry args={[0.038, 16]} />
            <meshStandardMaterial color={irisColor} roughness={0.2} />
          </mesh>
          {/* Pupil */}
          <mesh ref={leftEyeRef} position={[0, 0, 0.058]}>
            <circleGeometry args={[0.022, 12]} />
            <meshStandardMaterial color={eyePupil} roughness={0.1} />
          </mesh>
          {/* Eye shine */}
          <mesh position={[0.015, 0.015, 0.065]}>
            <circleGeometry args={[0.008, 8]} />
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={2} />
          </mesh>
          {/* Eyelid */}
          <mesh position={[0, 0.04, 0.05]} scale={[1.1, 0.35, 1]}>
            <sphereGeometry args={[0.065, 12, 12]} />
            <meshStandardMaterial color={skinColor} roughness={0.5} />
          </mesh>
        </group>

        {/* Right eye socket */}
        <group position={[0.12, 0.03, 0.3]}>
          <mesh>
            <sphereGeometry args={[0.065, 14, 14]} />
            <meshStandardMaterial color={eyeWhite} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0, 0.042]}>
            <circleGeometry args={[0.038, 16]} />
            <meshStandardMaterial color={irisColor} roughness={0.2} />
          </mesh>
          <mesh ref={rightEyeRef} position={[0, 0, 0.058]}>
            <circleGeometry args={[0.022, 12]} />
            <meshStandardMaterial color={eyePupil} roughness={0.1} />
          </mesh>
          <mesh position={[0.015, 0.015, 0.065]}>
            <circleGeometry args={[0.008, 8]} />
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={2} />
          </mesh>
          <mesh position={[0, 0.04, 0.05]} scale={[1.1, 0.35, 1]}>
            <sphereGeometry args={[0.065, 12, 12]} />
            <meshStandardMaterial color={skinColor} roughness={0.5} />
          </mesh>
        </group>

        {/* ── NOSE ── */}
        <mesh position={[0, -0.04, 0.335]}>
          <sphereGeometry args={[0.035, 10, 10]} />
          <meshStandardMaterial color={skinDark} roughness={0.6} />
        </mesh>
        <mesh position={[-0.032, -0.07, 0.32]}>
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshStandardMaterial color={skinDark} roughness={0.6} />
        </mesh>
        <mesh position={[0.032, -0.07, 0.32]}>
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshStandardMaterial color={skinDark} roughness={0.6} />
        </mesh>

        {/* ── MOUTH / SMILE ── */}
        <mesh position={[0, -0.155, 0.305]} rotation={[0.1, 0, 0]}>
          <torusGeometry args={[0.06, 0.018, 8, 12, Math.PI * 0.6]} />
          <meshStandardMaterial color="#c2624a" roughness={0.6} />
        </mesh>
        {/* Upper lip */}
        <mesh position={[0, -0.125, 0.32]}>
          <boxGeometry args={[0.1, 0.018, 0.01]} />
          <meshStandardMaterial color="#c86a54" roughness={0.6} />
        </mesh>

        {/* ── EARS ── */}
        <mesh position={[-0.335, -0.02, 0]} scale={[0.5, 0.7, 0.5]}>
          <sphereGeometry args={[0.085, 10, 10]} />
          <meshStandardMaterial color={skinDark} roughness={0.5} />
        </mesh>
        <mesh position={[0.335, -0.02, 0]} scale={[0.5, 0.7, 0.5]}>
          <sphereGeometry args={[0.085, 10, 10]} />
          <meshStandardMaterial color={skinDark} roughness={0.5} />
        </mesh>
      </group>

      {/* ── ORBIT RINGS ── */}
      <OrbitRing radius={1.8} speed={0.35} color="#6ee7f7" count={24} tilt={0.4} />
      <OrbitRing radius={2.1} speed={-0.22} color="#b56aff" count={18} tilt={-0.6} />
      <OrbitRing radius={1.5} speed={0.18} color="#4ade80" count={14} tilt={1.1} />

      {/* ── FLOATING TECH BADGES ── */}
      <TechBadge position={[-2.2, 2.0, -0.5]} label="React" color="#61DAFB" delay={0} />
      <TechBadge position={[2.0, 2.4, -0.2]} label="Python" color="#4B8BBE" delay={1.2} />
      <TechBadge position={[-2.0, 0.8, 0.3]} label="Java" color="#F89820" delay={0.6} />
      <TechBadge position={[2.2, 1.0, 0.4]} label="AWS" color="#FF9900" delay={1.8} />
      <TechBadge position={[-1.8, -0.2, -0.3]} label="Docker" color="#2496ED" delay={0.9} />
      <TechBadge position={[1.9, -0.4, 0.1]} label="AI/ML" color="#A855F7" delay={1.5} />

      {/* ── GROUND SHADOW / PLATFORM ── */}
      <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.2, 48]} />
        <meshStandardMaterial color="#6ee7f7" transparent opacity={0.06} />
      </mesh>
      <mesh position={[0, -0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.0, 1.2, 48]} />
        <meshStandardMaterial color="#6ee7f7" transparent opacity={0.12} emissive="#6ee7f7" emissiveIntensity={0.3} />
      </mesh>

    </group>
  )
}
