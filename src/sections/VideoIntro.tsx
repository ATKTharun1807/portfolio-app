import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react'

// ─────────────────────────────────────────────
// 👇 REPLACE THIS with your actual video file name
//    after copying it to: src/assets/
//    Example: import introVideo from '../assets/my-intro.mp4'
// ─────────────────────────────────────────────
import introVideo from '../assets/my-intro.mp4'
const VIDEO_PLACEHOLDER = introVideo // set to your imported video

export default function VideoIntro() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setPlaying(p => !p)
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !muted
    setMuted(m => !m)
  }

  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    setCurrentTime(videoRef.current.currentTime)
    setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100)
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration)
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    videoRef.current.currentTime = ratio * videoRef.current.duration
  }

  const handleFullscreen = () => {
    videoRef.current?.requestFullscreen()
  }

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60).toString().padStart(2, '0')
    const s = Math.floor(t % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  return (
    <section id="video-intro" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        {/* Section header */}
        <div className="mb-12">
          <p className="text-xs font-['JetBrains_Mono'] text-[var(--neon)] tracking-[4px] uppercase mb-3">
            00. Intro
          </p>
          <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk']">
            Meet <span className="gradient-text">Tharun</span>
          </h2>
          <p className="text-[var(--muted)] mt-3 text-base max-w-xl">
            A quick animated introduction — who I am, what I build, and what drives me.
          </p>
        </div>

        {/* Video player card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(110,231,247,0.08)',
            maxWidth: '860px',
            margin: '0 auto',
          }}
        >
          {/* Video / placeholder */}
          <div
            className="relative"
            style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg, #050510 0%, #0d0d2b 100%)' }}
          >
            {VIDEO_PLACEHOLDER ? (
              <video
                ref={videoRef}
                src={VIDEO_PLACEHOLDER}
                className="w-full h-full object-cover"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setPlaying(false)}
                playsInline
              />
            ) : (
              /* Placeholder — shows until you add your video */
              <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                {/* Animated placeholder visual */}
                <motion.div
                  animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    width: 80, height: 80, borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(110,231,247,0.25), rgba(181,106,255,0.25))',
                    border: '2px solid rgba(110,231,247,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 40px rgba(110,231,247,0.2)',
                  }}
                >
                  <Play size={32} color="#6ee7f7" fill="#6ee7f7" style={{ marginLeft: 4 }} />
                </motion.div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{
                    color: 'rgba(255,255,255,0.5)', fontSize: 14,
                    fontFamily: 'JetBrains Mono, monospace',
                  }}>
                    📁 Add your video to:
                  </p>
                  <p style={{
                    color: '#6ee7f7', fontSize: 13, marginTop: 4,
                    fontFamily: 'JetBrains Mono, monospace',
                  }}>
                    src/assets/my-intro.mp4
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 8 }}>
                    Then update VideoIntro.tsx with the import
                  </p>
                </div>
              </div>
            )}

            {/* Big play overlay (click to play) */}
            {VIDEO_PLACEHOLDER && !playing && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={togglePlay}
                style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(0,0,0,0.35)',
                  border: 'none', cursor: 'pointer',
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: 72, height: 72, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6ee7f7, #b56aff)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 40px rgba(110,231,247,0.4)',
                  }}
                >
                  <Play size={28} color="#050510" fill="#050510" style={{ marginLeft: 4 }} />
                </motion.div>
              </motion.button>
            )}

            {/* Top-right label */}
            <div style={{
              position: 'absolute', top: 14, left: 16,
              background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
              borderRadius: 8, padding: '4px 10px',
              border: '1px solid rgba(110,231,247,0.25)',
            }}>
              <span style={{
                fontSize: 11, fontFamily: 'JetBrains Mono, monospace',
                color: '#6ee7f7', letterSpacing: 1,
              }}>
                🎬 INTRO VIDEO
              </span>
            </div>
          </div>

          {/* Controls bar */}
          {VIDEO_PLACEHOLDER && (
            <div style={{
              padding: '14px 20px',
              background: 'rgba(5,5,20,0.9)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}>
              {/* Progress bar */}
              <div
                onClick={handleSeek}
                style={{
                  height: 4, borderRadius: 2,
                  background: 'rgba(255,255,255,0.1)',
                  cursor: 'pointer', marginBottom: 12, position: 'relative',
                }}
              >
                <div style={{
                  position: 'absolute', top: 0, left: 0, height: '100%',
                  width: `${progress}%`, borderRadius: 2,
                  background: 'linear-gradient(90deg, #6ee7f7, #b56aff)',
                  transition: 'width 0.1s linear',
                }} />
              </div>

              {/* Buttons row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button
                  onClick={togglePlay}
                  style={{
                    width: 36, height: 36, borderRadius: '50%', border: 'none',
                    background: 'linear-gradient(135deg, #6ee7f7, #b56aff)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {playing
                    ? <Pause size={14} color="#050510" fill="#050510" />
                    : <Play size={14} color="#050510" fill="#050510" style={{ marginLeft: 2 }} />
                  }
                </button>

                <button
                  onClick={toggleMute}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'rgba(255,255,255,0.5)',
                    display: 'flex', alignItems: 'center',
                  }}
                >
                  {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>

                <span style={{
                  fontSize: 12, color: 'rgba(255,255,255,0.4)',
                  fontFamily: 'JetBrains Mono, monospace', marginLeft: 4,
                }}>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>

                <button
                  onClick={handleFullscreen}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'rgba(255,255,255,0.4)', marginLeft: 'auto',
                    display: 'flex', alignItems: 'center',
                  }}
                >
                  <Maximize2 size={15} />
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          style={{
            textAlign: 'center', marginTop: 20,
            color: 'rgba(255,255,255,0.3)', fontSize: 13,
            fontFamily: 'JetBrains Mono, monospace',
          }}
        >
          ✨ 3D animated intro — built with passion
        </motion.p>
      </motion.div>
    </section>
  )
}
