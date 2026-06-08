'use client'

import { AnimatePresence, motion } from 'framer-motion'
import ProjectCard, { type ProjectCardData } from './ProjectCard'
import CategoryFilter from './CategoryFilter'

interface ProjectGridProps {
  projects: ProjectCardData[]
  activeCategory: string
}

export default function ProjectGrid({ projects, activeCategory }: ProjectGridProps) {
  // Compute per-category counts for the filter bar badges
  const counts: Record<string, number> = {}
  for (const p of projects) {
    counts[p.category] = (counts[p.category] ?? 0) + 1
  }

  // Filter the list based on the active category
  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <div>
      <CategoryFilter counts={counts} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8">
        {filtered.length === 0 ? (
          // Empty state when no projects match the selected category
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center"
          >
            <p className="font-bebas text-4xl text-cc-muted uppercase tracking-[0.08em]">
              No {activeCategory} Work Yet
            </p>
          </motion.div>
        ) : (
          /*
            `layout` on the grid container lets Framer Motion animate its height
            smoothly when the number of items changes (e.g. from 12 to 4 cards).
          */
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project._id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  )
}
