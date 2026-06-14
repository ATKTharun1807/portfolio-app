import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [ring, setRing] = useState({ x: -100, y: -100 })
  const [clicking, setClicking] = useState(false)

  useEffect(() => {
    const dot = document.getElementById('custom-cursor')
    const ringEl = document.getElementById('cursor-ring')

    let ringX = -100, ringY = -100
    let animFrame: number

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })

      const lerp = (a: number, b: number, t: number) => a + (b - a) * t
      const update = () => {
        ringX = lerp(ringX, e.clientX, 0.12)
        ringY = lerp(ringY, e.clientY, 0.12)
        setRing({ x: ringX, y: ringY })
        animFrame = requestAnimationFrame(update)
      }
      cancelAnimationFrame(animFrame)
      animFrame = requestAnimationFrame(update)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', () => setClicking(true))
    window.addEventListener('mouseup', () => setClicking(false))

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(animFrame)
    }
  }, [])

  return (
    <>
      <div
        id="custom-cursor"
        style={{
          left: pos.x,
          top: pos.y,
          width: clicking ? '20px' : '12px',
          height: clicking ? '20px' : '12px',
          opacity: 1,
        }}
      />
      <div
        id="cursor-ring"
        style={{
          left: ring.x,
          top: ring.y,
          width: clicking ? '20px' : '36px',
          height: clicking ? '20px' : '36px',
        }}
      />
    </>
  )
}
