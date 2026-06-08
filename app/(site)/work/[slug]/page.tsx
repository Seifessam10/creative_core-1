/*
  /work/[slug] — Project Detail Page.

  STATIC GENERATION (generateStaticParams):
  At build time, Next.js calls generateStaticParams() which returns every
  project slug from Sanity. Next.js then pre-renders a static HTML file for
  each slug (e.g. /work/my-brand-project). This means:
  - Zero server load on visits — it's just a static file
  - Instant page loads
  - ISR (revalidate = 60) refreshes these files in the background when content changes

  notFound() → shows the 404 page if a slug doesn't exist in Sanity.
*/

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { ArrowLeft } from 'lucide-react'
import { sanityFetch } from '@/lib/sanity/client'
import {
  getProjectBySlugQuery,
  getRelatedProjectsQuery,
  getAllProjectSlugsQuery,
} from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import ProjectCard, { type ProjectCardData } from '@/components/work/ProjectCard'

export const revalidate = 60

// Generates all static paths at build time
export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>(getAllProjectSlugsQuery) ?? []
  return slugs.map((s) => ({ slug: s.slug }))
}

// Generates SEO metadata dynamically per project
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await sanityFetch<ProjectDetail>(getProjectBySlugQuery, { slug: params.slug })
  if (!project) return {}
  const ogImage = project.coverImage?.asset
    ? urlFor(project.coverImage).width(1200).height(630).url()
    : undefined
  return {
    title: `${project.title} — Creative Core`,
    description: `${project.category} project${project.client ? ` for ${project.client}` : ''}.`,
    openGraph: { images: ogImage ? [{ url: ogImage }] : [] },
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const [project, related] = await Promise.all([
    sanityFetch<ProjectDetail>(getProjectBySlugQuery, { slug: params.slug }),
    sanityFetch<ProjectCardData[]>(getRelatedProjectsQuery, {
      slug: params.slug,
      category: 'Apparel', // will be overridden once project loads — see note below
    }),
  ])

  if (!project) notFound()

  // Re-fetch related with the correct category now we know it
  const relatedProjects = await sanityFetch<ProjectCardData[]>(getRelatedProjectsQuery, {
    slug: params.slug,
    category: project.category,
  }) ?? []

  const heroUrl = project.coverImage?.asset
    ? urlFor(project.coverImage).width(1800).height(1200).url()
    : null

  const year = project.publishedAt
    ? new Date(project.publishedAt).getFullYear()
    : new Date().getFullYear()

  return (
    <article className="min-h-screen bg-cc-bg">

      {/* ── Back breadcrumb ──────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-8">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-cc-muted hover:text-cc-text transition-colors duration-200"
        >
          <ArrowLeft size={12} /> All Work
        </Link>
      </div>

      {/* ── Hero image ───────────────────────────────────────────── */}
      <div className="relative w-full mt-6" style={{ maxHeight: '80vh', height: '70vw' }}>
        {heroUrl && (
          <Image
            src={heroUrl}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        )}
        {/* Title overlay — bottom-left, large Bebas Neue */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-8 left-6 md:left-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-cc-muted mb-2">
            {project.category}
          </p>
          <h1 className="font-bebas text-[40px] md:text-[72px] leading-none tracking-[0.06em] text-cc-text">
            {project.title}
          </h1>
        </div>
      </div>

      {/* ── Meta row ─────────────────────────────────────────────── */}
      {/*
        3-column grid for client / category / year.
        Each separated by a right border except the last.
      */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-3 border border-cc-border mt-8">
          {[
            { label: 'Client', value: project.client ?? '—' },
            { label: 'Category', value: project.category },
            { label: 'Year', value: String(year) },
          ].map(({ label, value }, i) => (
            <div key={label} className={`py-4 px-6 ${i < 2 ? 'border-r border-cc-border' : ''}`}>
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-cc-subtle mb-1">{label}</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-cc-text">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Description — Portable Text ──────────────────────────── */}
      {/*
        Sanity stores rich text as "Portable Text" — a JSON structure
        (not HTML). @portabletext/react converts it to React elements.
        We pass `components` to control how each block type renders.
      */}
      {project.description && (
        <div className="max-w-[680px] mx-auto px-6 py-16">
          <div className="prose prose-invert font-sans text-cc-muted leading-[1.8] text-base">
            <PortableText
              value={project.description}
              components={{
                block: {
                  normal: ({ children }) => <p className="mb-4 text-cc-muted">{children}</p>,
                  h2: ({ children }) => <h2 className="font-bebas text-3xl text-cc-text mt-8 mb-4">{children}</h2>,
                },
              }}
            />
          </div>
        </div>
      )}

      {/* ── Gallery ──────────────────────────────────────────────── */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="flex flex-col gap-2 px-0">
          {project.gallery.map((img, i) => {
            const url = img?.asset ? urlFor(img).width(1800).url() : null
            if (!url) return null
            // Alternate: even index = full width, odd = 2-col grid pair
            return (
              <div key={i} className="relative w-full aspect-[16/9]">
                <Image
                  src={url}
                  alt={`${project.title} — image ${i + 1}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            )
          })}
        </div>
      )}

      {/* ── Related projects ─────────────────────────────────────── */}
      {relatedProjects.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-24">
          <h2 className="font-bebas text-4xl md:text-5xl tracking-[0.08em] text-cc-text mb-8">
            More Work
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {relatedProjects.map((p, i) => (
              <ProjectCard key={p._id} project={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* ── CTA section ──────────────────────────────────────────── */}
      <section className="border-t border-cc-border py-24 text-center">
        <h2 className="font-bebas text-5xl md:text-7xl tracking-[0.08em] text-cc-text">
          Like What You See?
        </h2>
        <p className="font-sans text-cc-muted mt-4 mb-10">
          Let&apos;s build something together.
        </p>
        <Link
          href="/contact"
          className="font-mono text-[10px] uppercase tracking-[0.12em] text-cc-text border border-cc-border px-8 py-4 hover:border-cc-subtle transition-colors duration-200"
        >
          Start a Project
        </Link>
      </section>
    </article>
  )
}

// ── Types ────────────────────────────────────────────────────────────────────
interface GalleryImage {
  asset: { _ref: string }
  hotspot?: { x: number; y: number }
}

interface ProjectDetail {
  _id: string
  title: string
  slug: { current: string }
  client?: string
  category: string
  coverImage?: { asset: { _ref: string } }
  gallery?: GalleryImage[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description?: any[]
  tags?: string[]
  publishedAt?: string
}
