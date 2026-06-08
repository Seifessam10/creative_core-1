/*
  /work — Portfolio Grid page.

  Server component: fetches all projects, reads the ?category param from the URL,
  then passes both down to ProjectGrid (client component).

  Reading searchParams on the server means:
  - The page renders with the correct filter on first load (no flash)
  - Search engines see the filtered content (good for SEO)
*/

import { Suspense } from 'react'
import { sanityFetch } from '@/lib/sanity/client'
import { getAllProjectsQuery } from '@/lib/sanity/queries'
import ProjectGrid from '@/components/work/ProjectGrid'
import type { ProjectCardData } from '@/components/work/ProjectCard'

export const revalidate = 60

export const metadata = {
  title: 'Work — Creative Core',
  description: 'Portfolio of apparel, branding, identity, and creative direction projects.',
}

interface WorkPageProps {
  searchParams: { category?: string }
}

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const projects = await sanityFetch<ProjectCardData[]>(getAllProjectsQuery) ?? []
  const activeCategory = searchParams.category ?? 'All'

  return (
    <div className="min-h-screen bg-cc-bg">
      {/* Page heading */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-6">
        <h1 className="font-bebas text-6xl md:text-8xl tracking-[0.08em] text-cc-text">Work</h1>
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-cc-muted mt-2">
          {projects.length} Projects
        </p>
      </div>

      {/*
        Suspense wraps ProjectGrid because it contains CategoryFilter which uses
        useSearchParams() — a client hook that needs Suspense in Next.js 14
        to avoid hydration mismatches.
      */}
      <Suspense fallback={null}>
        <ProjectGrid projects={projects} activeCategory={activeCategory} />
      </Suspense>
    </div>
  )
}
