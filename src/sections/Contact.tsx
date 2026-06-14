import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, Terminal, Mail, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/ui/BrandIcons'
import { personal } from '../data/portfolio'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    // Mailto fallback — opens email client
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`)
    const body = encodeURIComponent(`From: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`
    setTimeout(() => {
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    }, 1000)
  }

  const lines = [
    { prefix: '> ', text: 'initiate_contact.sh', color: 'var(--neon)' },
    { prefix: '', text: 'Connecting to Tharun Kumar S...', color: 'var(--muted)' },
    { prefix: '', text: '✓ Connection established', color: '#4ade80' },
    { prefix: '', text: 'Ready to receive your message.', color: 'var(--muted)' },
  ]

  return (
    <section id="contact" className="py-28 px-6 lg:px-12 max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-16">
          <p className="text-xs font-['JetBrains_Mono'] text-[var(--neon)] tracking-[4px] uppercase mb-3">05. Contact</p>
          <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk']">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-[var(--muted)] mt-4 max-w-lg">
            I'm always open to new opportunities, collaborations, or just a friendly tech conversation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — Info + Terminal animation */}
          <div className="space-y-8">
            {/* Terminal UI */}
            <div className="glass rounded-2xl overflow-hidden">
              {/* Terminal top bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-400/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                <div className="w-3 h-3 rounded-full bg-green-400/70" />
                <span className="ml-3 text-xs font-['JetBrains_Mono'] text-[var(--muted)]">terminal — bash</span>
              </div>
              <div className="p-5 font-['JetBrains_Mono'] text-xs space-y-2">
                {lines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.3 + 0.2 }}
                    className="flex gap-2"
                  >
                    <span style={{ color: 'var(--neon)' }}>{line.prefix}</span>
                    <span style={{ color: line.color }}>{line.text}</span>
                  </motion.div>
                ))}
                <div className="flex gap-2">
                  <span style={{ color: 'var(--neon)' }}>{'> '}</span>
                  <span className="blink text-[var(--neon)]">█</span>
                </div>
              </div>
            </div>

            {/* Contact info */}
            <div className="space-y-4">
              {[
                { icon: <Mail size={16} />, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
                { icon: <GithubIcon size={16} />, label: 'GitHub', value: 'ATKTharun1807', href: personal.github },
                { icon: <LinkedinIcon size={16} />, label: 'LinkedIn', value: 'Tharun Kumar S', href: personal.linkedin },
                { icon: <MapPin size={16} />, label: 'Location', value: personal.location, href: null },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-9 h-9 glass rounded-xl flex items-center justify-center text-[var(--neon)]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-[var(--muted)]">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer"
                        className="text-sm text-[var(--text)] hover:text-[var(--neon)] transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-[var(--text)]">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Contact form */}
          <div className="glass rounded-3xl p-8 space-y-5">
            <div>
              <label className="block text-xs font-['JetBrains_Mono'] text-[var(--muted)] mb-2 tracking-wider">
                {'> '}YOUR NAME
              </label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="John Doe"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[var(--text)] text-sm placeholder:text-white/20 focus:outline-none focus:border-[var(--neon)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-['JetBrains_Mono'] text-[var(--muted)] mb-2 tracking-wider">
                {'> '}EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="john@company.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[var(--text)] text-sm placeholder:text-white/20 focus:outline-none focus:border-[var(--neon)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-['JetBrains_Mono'] text-[var(--muted)] mb-2 tracking-wider">
                {'> '}MESSAGE
              </label>
              <textarea
                rows={5}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder="Tell me about your project or opportunity..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[var(--text)] text-sm placeholder:text-white/20 focus:outline-none focus:border-[var(--neon)] transition-colors resize-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={status === 'sending'}
              className="w-full py-3.5 rounded-xl font-semibold text-[#050510] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #6ee7f7, #b56aff)' }}
            >
              {status === 'sending' ? (
                <span className="animate-pulse">Connecting...</span>
              ) : status === 'sent' ? (
                '✓ Message Sent!'
              ) : (
                <>
                  Send Message <Send size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
