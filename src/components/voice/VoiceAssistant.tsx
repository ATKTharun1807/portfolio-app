import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, RotateCcw, X } from 'lucide-react'
import { personal } from '../../data/portfolio'
import { useSpeaking } from '../../context/SpeakingContext'

export default function VoiceAssistant() {
  const [active, setActive] = useState(false)
  const [muted, setMuted] = useState(false)
  const [speaking, setSpeakingLocal] = useState(false)
  const [currentLine, setCurrentLine] = useState(0)
  const [dismissed, setDismissed] = useState(false)
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null)
  const hasSpoken = useRef(false)
  const { setSpeaking, setCurrentLine: setCtxLine } = useSpeaking()

  // Keep context in sync
  const setSpeaking2 = (v: boolean) => { setSpeakingLocal(v); setSpeaking(v) }

  const speak = () => {
    if (!('speechSynthesis' in window) || muted) return
    window.speechSynthesis.cancel()

    const script = personal.voiceScript.join(' ')
    const utter = new SpeechSynthesisUtterance(script)
    utterRef.current = utter

    // Find a good male voice
    const voices = window.speechSynthesis.getVoices()
    const preferred = voices.find(v =>
      v.name.includes('Google UK English Male') ||
      v.name.includes('Microsoft David') ||
      v.name.includes('Alex') ||
      v.name.includes('Daniel')
    ) || voices.find(v => v.lang === 'en-US' || v.lang === 'en-GB')
    if (preferred) utter.voice = preferred

    utter.rate = 0.9
    utter.pitch = 1.0
    utter.volume = 0.9

    let lineIdx = 0
    utter.onstart = () => { setSpeaking2(true); setCurrentLine(0); setCtxLine(0) }
    utter.onend = () => { setSpeaking2(false); setCurrentLine(0); setCtxLine(0) }
    utter.onerror = () => setSpeaking2(false)
    utter.onboundary = (e) => {
      if (e.name === 'sentence') {
        lineIdx = Math.min(lineIdx + 1, personal.voiceScript.length - 1)
        setCurrentLine(lineIdx)
        setCtxLine(lineIdx)
      }
    }

    window.speechSynthesis.speak(utter)
  }

  const stop = () => {
    window.speechSynthesis.cancel()
    setSpeaking2(false)
  }

  // Auto-start after 2s on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasSpoken.current && !dismissed) {
        hasSpoken.current = true
        setActive(true)
        // Voices might not be loaded yet
        if (window.speechSynthesis.getVoices().length === 0) {
          window.speechSynthesis.addEventListener('voiceschanged', () => {
            speak()
          }, { once: true })
        } else {
          speak()
        }
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    return () => window.speechSynthesis.cancel()
  }, [])

  if (dismissed) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Subtitle box */}
      <AnimatePresence>
        {active && speaking && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="max-w-xs glass rounded-2xl p-4 text-sm text-[var(--text)] leading-relaxed"
            style={{ boxShadow: '0 0 30px rgba(110,231,247,0.15)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              {/* Waveform animation */}
              <div className="flex items-center gap-0.5 h-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 rounded-full"
                    style={{ background: 'var(--neon)' }}
                    animate={speaking ? { height: ['4px', `${8 + i * 3}px`, '4px'] } : { height: '4px' }}
                    transition={{ repeat: Infinity, duration: 0.5 + i * 0.08, ease: 'easeInOut' }}
                  />
                ))}
              </div>
              <span className="text-xs text-[var(--neon)] font-['JetBrains_Mono']">AI Assistant</span>
            </div>
            <p className="text-xs text-[var(--muted)]">
              "{personal.voiceScript[currentLine]}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control widget */}
      <div className="glass rounded-2xl p-3 flex items-center gap-2">
        {/* Waveform orb */}
        <button
          onClick={() => {
            if (speaking) { stop() } else { speak() }
          }}
          className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
          style={{ background: speaking ? 'linear-gradient(135deg, #6ee7f7, #b56aff)' : 'rgba(255,255,255,0.05)' }}
          title={speaking ? 'Pause voice' : 'Play voice intro'}
        >
          {speaking ? (
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-0.5 bg-[#050510] rounded-full"
                  animate={{ height: ['3px', `${6 + i * 2}px`, '3px'] }}
                  transition={{ repeat: Infinity, duration: 0.4 + i * 0.1, ease: 'easeInOut' }}
                />
              ))}
            </div>
          ) : (
            <Volume2 size={16} className="text-[var(--neon)]" />
          )}
        </button>

        {/* Mute */}
        <button
          onClick={() => { setMuted(m => !m); if (speaking) stop() }}
          className="w-8 h-8 rounded-xl glass flex items-center justify-center text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          title={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>

        {/* Replay */}
        <button
          onClick={() => { stop(); setTimeout(speak, 100) }}
          className="w-8 h-8 rounded-xl glass flex items-center justify-center text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          title="Replay"
        >
          <RotateCcw size={14} />
        </button>

        {/* Dismiss */}
        <button
          onClick={() => { stop(); setDismissed(true) }}
          className="w-8 h-8 rounded-xl glass flex items-center justify-center text-[var(--muted)] hover:text-red-400 transition-colors"
          title="Dismiss"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
