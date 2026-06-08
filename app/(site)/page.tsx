/*
  app/(site)/page.tsx — Homepage

  WHY THIS IS A SERVER COMPONENT (no 'use client'):
  Server components run on the server during the request. They can:
  - Fetch data directly (no useEffect, no loading states)
  - Never ship their code to the browser (smaller bundle)
  - Pre-render HTML for fast first paint + good SEO

  The pattern here is: server component fetches → passes data as props
  to client components (Hero, ProjectMarquee) that need browser APIs.

  ISR (Incremental Static Regeneration):
  `revalidate = 60` means Next.js caches this page and rebuilds it
  every 60 seconds when new traffic hits. Content changes in Sanity
  go live within a minute without a full redeploy.
*/

import { sanityFetch } from '@/lib/sanity/client'
import { getFeaturedProjectsQuery, getAllProjectsQuery } from '@/lib/sanity/queries'
import Hero from '@/components/home/Hero'
import ProjectMarquee from '@/components/home/ProjectMarquee'

export const revalidate = 60

export default async function HomePage() {
  // Try featured projects first, fall back to latest 8 if none are marked featured
  let projects = await sanityFetch<Project[]>(getFeaturedProjectsQuery)

  if (!projects || projects.length === 0) {
    const all = await sanityFetch<Project[]>(getAllProjectsQuery)
    projects = (all ?? []).slice(0, 8)
  }

  return (
    <>
      <Hero />
      <ProjectMarquee projects={projects ?? []} />
    </>
  )
}

// Type defined locally — shared types will move to /types in a later refactor
interface Project {
  _id: string
  title: string
  slug: { current: string }
  category: string
  coverImage: {
    asset: { _ref: string }
    hotspot?: { x: number; y: number }
  }
}
