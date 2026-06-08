'use client'

/*
  Hero.tsx — full-viewport homepage hero.

  WHY 'use client':
  This component uses Framer Motion animations which require the browser.
  The parent page.tsx (server component) fetches data, then passes it here.
  This is the standard Next.js pattern: server fetches, client animates.
*/

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  // Hide the scroll indicator once the user has scrolled past 100px
  const [showScroll, setShowScroll] = useState(true)

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY < 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    /*
      min-h-screen ensures the hero is at least 100vh.
      The negative margin-top (-mt-16) pulls it up behind the fixed nav
      so the hero truly fills the viewport from top to bottom.
      pt-16 compensates so content doesn't hide under the nav.
    */
    <section className="relative -mt-16 min-h-screen bg-cc-bg flex flex-col items-center justify-center text-center overflow-hidden">

      {/* ── Logo ─────────────────────────────────────────────────────── */}
      {/*
        Animates: starts at opacity 0 + scale 0.95, ends at opacity 1 + scale 1.
        Scale 0.95→1 gives a subtle "settle in" feeling, not just a flat fade.
        duration 0.8s is slow enough to feel deliberate.
      */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Image
          src="/images/cc-logo.webp"
          alt="Creative Core"
          width={180}
          height={180}
          priority
          className="object-contain mix-blend-lighten w-[120px] h-[120px] md:w-[180px] md:h-[180px]"
        />
      </motion.div>

      {/* ── Tagline ───────────────────────────────────────────────────── */}
      {/*
        Each word is its own motion.span so they animate individually.
        The stagger is created with delay: 0.4 + index * 0.08.
        Words: ["WHERE", "DESIGN", "BECOMES", "IDENTITY"] → 4 staggered reveals.
      */}
      <div className="mt-8 flex flex-col items-center gap-1">
        {/* Line 1 */}
        <div className="overflow-hidden">
          <motion.h1
            className="font-bebas text-[48px] md:text-[80px] leading-none tracking-[0.06em] text-cc-text"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          >
            WHERE DESIGN
          </motion.h1>
        </div>

        {/* Line 2 — slightly later delay for cascade feel */}
        <div className="overflow-hidden">
          <motion.h1
            className="font-bebas text-[48px] md:text-[80px] leading-none tracking-[0.06em] text-cc-text"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55, ease: 'easeOut' }}
          >
            BECOMES IDENTITY
          </motion.h1>
        </div>
      </div>

      {/* ── Sub-tagline ───────────────────────────────────────────────── */}
      <motion.p
        className="mt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-cc-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        Apparel · Branding · Identity · Creative Direction
      </motion.p>

      {/* ── CTA buttons ───────────────────────────────────────────────── */}
      <motion.div
        className="mt-10 flex items-center gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <Link
          href="/work"
          className="font-mono text-[10px] uppercase tracking-[0.12em] text-cc-text border border-cc-border px-6 py-3 hover:border-cc-subtle transition-colors duration-200"
        >
          View Work
        </Link>
        <Link
          href="/contact"
          className="font-mono text-[10px] uppercase tracking-[0.12em] text-cc-muted hover:text-cc-text transition-colors duration-200"
        >
          Start a Project →
        </Link>
      </motion.div>

      {/* ── Scroll indicator ─────────────────────────────────────────── */}
      {/*
        AnimatePresence lets it fade out smoothly when showScroll becomes false.
        The bounce animation is a CSS keyframe applied via Tailwind `animate-bounce`.
      */}
      <AnimatePresence>
        {showScroll && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 1.5 }}
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-cc-subtle">scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown size={12} className="text-cc-subtle" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
