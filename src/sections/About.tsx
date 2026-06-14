import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, GraduationCap, Code2, Shield, Cpu } from 'lucide-react'
import { personal, skills } from '../data/portfolio'

const SKILL_CATEGORIES = ['frontend', 'backend', 'database', 'tools'] as const
type Category = typeof SKILL_CATEGORIES[number]

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm text-[var(--text)] font-medium">{name}</span>
        <span className="text-xs font-['JetBrains_Mono'] text-[var(--neon)]">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : 0 }}
          transition={{ duration: 1.2, delay, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #6ee7f7, #b56aff)' }}
        />
      </div>
    </div>
  )
}

function StatCounter({ label, value, suffix, decimal }: { label: string; value: number; suffix: string; decimal?: boolean }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = Date.now()
    const duration = 1600
    const frame = () => {
      const progress = Math.min((Date.now() - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(decimal ? parseFloat((eased * value).toFixed(2)) : Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, [inView, value, decimal])

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold gradient-text font-['Space_Grotesk']">
        {decimal ? count.toFixed(2) : count}{suffix}
      </div>
      <div className="text-xs text-[var(--muted)] mt-1 uppercase tracking-wider">{label}</div>
    </div>
  )
}

export default function About() {
  const [activeTab, setActiveTab] = useState<Category>('frontend')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const categoryIcons: Record<Category, React.ReactNode> = {
    frontend: <Code2 size={14} />,
    backend: <Cpu size={14} />,
    database: <Shield size={14} />,
    tools: <GraduationCap size={14} />,
  }

  return (
    <section id="about" className="py-28 px-6 lg:px-12 max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        {/* Section header */}
        <div className="mb-16">
          <p className="text-xs font-['JetBrains_Mono'] text-[var(--neon)] tracking-[4px] uppercase mb-3">01. About</p>
          <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk']">
            Who I <span className="gradient-text">Am</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — Bio */}
          <div className="space-y-6">
            {personal.bio.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 * i + 0.2, duration: 0.6 }}
                className="text-[var(--muted)] leading-relaxed text-base"
              >
                {para}
              </motion.p>
            ))}

            {/* Location + Institution */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-3 mt-6"
            >
              <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                <MapPin size={15} className="text-[var(--neon)]" />
                <span>{personal.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                <GraduationCap size={15} className="text-[var(--purple)]" />
                <span>{personal.institution}</span>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="glass rounded-2xl p-6 mt-8 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {personal.stats.map(stat => (
                <StatCounter key={stat.label} {...stat} />
              ))}
            </motion.div>
          </div>

          {/* Right — Skills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {SKILL_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 capitalize ${
                    activeTab === cat
                      ? 'text-[#050510] scale-105'
                      : 'glass text-[var(--muted)] hover:text-[var(--text)]'
                  }`}
                  style={activeTab === cat ? { background: 'linear-gradient(135deg, #6ee7f7, #b56aff)' } : {}}
                >
                  {categoryIcons[cat]}
                  {cat}
                </button>
              ))}
            </div>

            {/* Skill bars */}
            <div className="space-y-5">
              {skills[activeTab].map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 0.08} />
              ))}
            </div>

            {/* Tech tag cloud */}
            <div className="mt-10 flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Python', 'Java', 'PostgreSQL', 'Docker', 'AWS', 'MongoDB', 'Git', 'Blockchain', 'Solidity', 'Node.js'].map(tag => (
                <span
                  key={tag}
                  className="glass text-xs px-3 py-1.5 rounded-full text-[var(--muted)] hover:text-[var(--neon)] hover:border-[var(--neon)] transition-all cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
