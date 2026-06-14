import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { GithubIcon } from '../components/ui/BrandIcons'
import { projects } from '../data/portfolio'

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative glass rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        boxShadow: hovered
          ? `0 24px 60px ${project.color}22, 0 0 0 1px ${project.color}44`
          : '0 4px 20px rgba(0,0,0,0.3)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
    >
      {/* Colored header strip */}
      <div
        className={`h-1.5 w-full bg-gradient-to-r ${project.gradient.replace('/20', '')}`}
        style={{ background: `linear-gradient(90deg, ${project.color}cc, transparent)` }}
      />

      <div className="p-7">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{project.emoji}</span>
            <div>
              <h3 className="text-lg font-bold font-['Space_Grotesk'] text-[var(--text)]">{project.title}</h3>
              <p className="text-xs text-[var(--muted)] mt-0.5">{project.period}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href={project.github}
              className="p-2 glass rounded-full text-[var(--muted)] hover:text-[var(--text)] transition-colors"
              onClick={e => e.stopPropagation()}
            >
              <GithubIcon size={15} />
            </a>
            <a
              href={project.demo}
              className="p-2 glass rounded-full text-[var(--muted)] hover:text-[var(--neon)] transition-colors"
              onClick={e => e.stopPropagation()}
            >
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-sm font-medium mb-3" style={{ color: project.color }}>
          {project.tagline}
        </p>

        {/* Description */}
        <p className="text-[var(--muted)] text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Features */}
        <ul className="space-y-1.5 mb-6">
          {project.features.map(f => (
            <li key={f} className="flex items-start gap-2 text-xs text-[var(--muted)]">
              <ArrowRight size={12} className="mt-0.5 shrink-0" style={{ color: project.color }} />
              {f}
            </li>
          ))}
        </ul>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map(t => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 rounded-full border font-['JetBrains_Mono']"
              style={{
                borderColor: `${project.color}44`,
                color: project.color,
                background: `${project.color}10`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="py-28 px-6 lg:px-12 max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-16">
          <p className="text-xs font-['JetBrains_Mono'] text-[var(--neon)] tracking-[4px] uppercase mb-3">03. Projects</p>
          <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk']">
            What I've <span className="gradient-text">Built</span>
          </h2>
          <p className="text-[var(--muted)] mt-4 max-w-lg">
            A selection of projects that highlight my technical breadth and passion for solving real-world problems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
