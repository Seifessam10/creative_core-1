'use client'

/*
  ProjectMarquee.tsx — infinite two-row scrolling strip of project images.

  HOW THE INFINITE LOOP WORKS:
  We render the items array TWICE side by side inside a single flex row.
  The CSS animation moves the whole row left by exactly 50% of its width
  (which equals one full copy of the items). When it reaches that point,
  it snaps back to 0 — but because the second copy is identical to the first,
  the snap is invisible. This creates a seamless infinite loop.

  TWO ROWS, OPPOSITE DIRECTIONS:
  Row 1 uses `marquee-track--left` (→ scrolls left)
  Row 2 uses `marquee-track--right` (→ scrolls right, slightly slower)
  This depth effect makes the strip feel alive rather than flat.

  PAUSE ON HOVER:
  The `.marquee-wrapper:hover .marquee-track` CSS rule in globals.css
  sets animation-play-state: paused whenever the mouse is over the wrapper.
*/

import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/image'

// The shape of a project object coming from Sanity
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

interface ProjectMarqueeProps {
  projects: Project[]
}

export default function ProjectMarquee({ projects }: ProjectMarqueeProps) {
  // Need at least 3 items to look good. Pad with repeats if Sanity returns fewer.
  const items = projects.length >= 3
    ? projects
    : [...projects, ...projects, ...projects].slice(0, 8)

  // Split into two rows — odd-indexed items go to row 2
  const row1 = items.filter((_, i) => i % 2 === 0)
  const row2 = items.filter((_, i) => i % 2 !== 0)

  // If only one row worth of items, use all for both rows (still looks fine)
  const track1 = row1.length > 0 ? row1 : items
  const track2 = row2.length > 0 ? row2 : items

  return (
    <section className="bg-cc-bg overflow-hidden py-2">

      {/* ── Row 1 — scrolls left ─────────────────────────────────── */}
      <div className="marquee-wrapper mb-2">
        {/*
          The track contains the items TWICE (spread twice with [...arr, ...arr]).
          CSS animation shifts it left by 50% — exactly one copy's worth.
          When it snaps back to 0, the second copy fills in seamlessly.
        */}
        <div className="marquee-track marquee-track--left">
          {[...track1, ...track1].map((project, i) => (
            <MarqueeItem key={`r1-${project._id}-${i}`} project={project} />
          ))}
        </div>
      </div>

      {/* ── Row 2 — scrolls right (opposite direction, slower) ───── */}
      <div className="marquee-wrapper">
        <div className="marquee-track marquee-track--right">
          {[...track2, ...track2].map((project, i) => (
            <MarqueeItem key={`r2-${project._id}-${i}`} project={project} />
          ))}
        </div>
      </div>

      {/* ── Stats + CTA below the marquee ────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-bebas text-4xl md:text-5xl tracking-[0.08em] text-cc-muted">
          16+ Projects Delivered
        </p>
        <Link
          href="/work"
          className="font-mono text-[11px] uppercase tracking-[0.12em] text-cc-muted hover:text-cc-text transition-colors duration-200"
        >
          View All Work →
        </Link>
      </div>
    </section>
  )
}

// ── Individual marquee card ──────────────────────────────────────────────────
/*
  Each card is 200px wide × 260px tall. On hover:
  - The image scales up slightly (via CSS group-hover on the Image)
  - An overlay fades in showing the project name and category

  `group` on the outer div + `group-hover:` on children is a Tailwind pattern
  for "when this parent is hovered, apply styles to these children".
*/
function MarqueeItem({ project }: { project: Project }) {
  const imageUrl = project.coverImage?.asset
    ? urlFor(project.coverImage).width(400).height(520).url()
    : null

  return (
    <Link
      href={`/work/${project.slug.current}`}
      className="group relative flex-shrink-0 w-[200px] h-[260px] overflow-hidden mx-1"
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          sizes="200px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        // Empty state: show a dark placeholder if no image in Sanity yet
        <div className="w-full h-full bg-cc-surface" />
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
        <p className="font-bebas text-lg leading-none text-cc-text">{project.title}</p>
        <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-cc-muted mt-1">
          {project.category}
        </p>
      </div>
    </Link>
  )
}
