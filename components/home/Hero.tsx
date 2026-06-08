'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { SplitText } from '@/components/ui/AnimatedSection'

export default function Hero() {
  const [showScroll, setShowScroll] = useState(true)

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY < 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative -mt-16 min-h-screen bg-cc-bg flex flex-col items-center justify-center text-center overflow-hidden">

      {/* ── Logo — scale reveal ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
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

      {/* ── Tagline — SplitText character reveal ─────────────────── */}
      {/*
        SplitText splits each word into individual characters and reveals
        them one-by-one. Line 1 starts at 400ms, line 2 at 550ms.
        This creates the cascade feel from the design spec.
      */}
      <div className="mt-8 flex flex-col items-center gap-0">
        <SplitText
          text="WHERE DESIGN"
          delay={0.4}
          className="font-bebas text-[48px] md:text-[80px] leading-none tracking-[0.06em] text-cc-text block"
        />
        <SplitText
          text="BECOMES IDENTITY"
          delay={0.55}
          className="font-bebas text-[48px] md:text-[80px] leading-none tracking-[0.06em] text-cc-text block"
        />
      </div>

      {/* ── Sub-tagline ───────────────────────────────────────────── */}
      <motion.p
        className="mt-5 font-mono text-[11px] uppercase tracking-[0.15em] text-cc-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        Apparel · Branding · Identity · Creative Direction
      </motion.p>

      {/* ── CTA buttons — data-magnetic activates cursor effect ───── */}
      <motion.div
        className="mt-10 flex items-center gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.3 }}
      >
        <Link
          href="/work"
          data-magnetic
          className="font-mono text-[10px] uppercase tracking-[0.12em] text-cc-text border border-cc-border px-6 py-3 hover:border-cc-subtle transition-colors duration-200"
        >
          View Work
        </Link>
        <Link
          href="/contact"
          data-magnetic
          className="font-mono text-[10px] uppercase tracking-[0.12em] text-cc-muted hover:text-cc-text transition-colors duration-200"
        >
          Start a Project →
        </Link>
      </motion.div>

      {/* ── Scroll indicator ─────────────────────────────────────── */}
      <AnimatePresence>
        {showScroll && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 1.6 }}
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
