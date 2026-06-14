import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { education, certifications } from '../data/portfolio'

export default function Education() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="education" className="py-28 px-6 lg:px-12 max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-16">
          <p className="text-xs font-['JetBrains_Mono'] text-[var(--neon)] tracking-[4px] uppercase mb-3">04. Education</p>
          <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk']">
            My <span className="gradient-text">Journey</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Education Timeline */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--muted)] mb-8 uppercase tracking-wider text-sm">Academics</h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-3.5 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--neon)] via-[var(--purple)] to-transparent opacity-30" />

              <div className="space-y-8">
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.2 + 0.2 }}
                    className="relative pl-10"
                  >
                    {/* Dot */}
                    <div
                      className="absolute left-0 top-1.5 w-7 h-7 rounded-full flex items-center justify-center"
                      style={{
                        background: edu.status === 'current'
                          ? 'linear-gradient(135deg, #6ee7f7, #b56aff)'
                          : 'rgba(255,255,255,0.05)',
                        border: edu.status === 'current' ? 'none' : '1px solid rgba(110,231,247,0.2)',
                      }}
                    >
                      <div className={`w-2 h-2 rounded-full ${edu.status === 'current' ? 'bg-[#050510]' : 'bg-[var(--muted)]'}`} />
                    </div>

                    <div className="glass rounded-2xl p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-semibold text-[var(--text)] text-sm leading-snug">{edu.degree}</h4>
                        {edu.status === 'current' && (
                          <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full text-green-400 border border-green-400/30 bg-green-400/10">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[var(--neon)] mb-1">{edu.institution}</p>
                      <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
                        <span>{edu.period}</span>
                        <span>•</span>
                        <span className="font-['JetBrains_Mono']">{edu.grade}</span>
                      </div>
                      {edu.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {edu.tags.map(tag => (
                            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--purple)]/10 text-[var(--purple)] border border-[var(--purple)]/20">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--muted)] mb-8 uppercase tracking-wider">Certifications</h3>
            <div className="space-y-4">
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="glass rounded-2xl p-4 flex items-center gap-4 group hover:border-[var(--neon)]/40 transition-all"
                >
                  <div className="text-2xl w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    {cert.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text)]">{cert.name}</p>
                    <p className="text-xs text-[var(--muted)] mt-0.5">{cert.issuer}</p>
                  </div>
                  <div
                    className="ml-auto w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'var(--neon)' }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
