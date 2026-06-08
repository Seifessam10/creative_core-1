'use client'

/*
  CategoryFilter.tsx — sticky tab bar for filtering projects by category.

  URL SYNC — WHY WE USE SEARCH PARAMS:
  When the user clicks "Apparel", we push `?category=apparel` into the URL.
  This means:
  1. Sharing the URL sends someone directly to that filtered view
  2. Back/forward browser buttons restore the filter state
  3. The server can read the filter on first render (SSR-safe)
*/

import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'

const CATEGORIES = ['All', 'Apparel', 'Branding', 'Identity', 'Accessories']

interface CategoryFilterProps {
  counts: Record<string, number>
}

export default function CategoryFilter({ counts }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const active = searchParams.get('category') ?? 'All'

  function handleSelect(cat: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (cat === 'All') {
      params.delete('category')
    } else {
      params.set('category', cat)
    }
    // `scroll: false` prevents the page from jumping to the top on filter change
    router.push(`/work?${params.toString()}`, { scroll: false })
  }

  return (
    /*
      sticky top-16 keeps the filter bar fixed just below the nav (nav = 64px = top-16).
      z-40 keeps it below the nav (z-50) but above page content.
    */
    <div className="sticky top-16 z-40 bg-cc-bg border-b border-cc-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-none h-12">
          {CATEGORIES.map((cat) => {
            const isActive = cat === active
            const count = cat === 'All'
              ? Object.values(counts).reduce((a, b) => a + b, 0)
              : (counts[cat] ?? 0)

            return (
              <button
                key={cat}
                onClick={() => handleSelect(cat)}
                className={`
                  relative flex-shrink-0 font-mono text-[10px] uppercase tracking-[0.12em]
                  pb-0.5 transition-colors duration-200 whitespace-nowrap
                  ${isActive ? 'text-cc-text' : 'text-cc-muted hover:text-cc-text'}
                `}
              >
                {cat}
                {count > 0 && (
                  <span className="ml-1 text-cc-subtle">({count})</span>
                )}
                {/*
                  The active underline is a motion.div with `layoutId="filter-indicator"`.
                  When the active tab changes, Framer Motion smoothly slides this
                  underline from one tab to another — called a "shared layout animation".
                  This is much smoother than toggling a CSS border on/off.
                */}
                {isActive && (
                  <motion.div
                    layoutId="filter-indicator"
                    className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-cc-text"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
