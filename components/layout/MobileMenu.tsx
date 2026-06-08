'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  links: { label: string; href: string }[]
  pathname: string
}

export default function MobileMenu({ isOpen, onClose, links, pathname }: MobileMenuProps) {
  // Listen for the ESC key and close the menu when pressed.
  // This is standard accessibility behaviour for modal-style overlays.
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  return (
    /*
      AnimatePresence watches its children and plays the `exit` animation
      before actually removing them from the DOM. Without this wrapper,
      React would remove the component immediately and you'd never see
      the closing animation.
    */
    <AnimatePresence>
      {isOpen && (
        <motion.div
          /*
            The overlay covers the full viewport (inset-0 = top/right/bottom/left: 0).
            z-[100] puts it above the nav (z-50) so it covers everything.
          */
          className="fixed inset-0 z-[100] bg-cc-bg flex flex-col"
          /*
            Entry: starts invisible and shifted up, animates to fully visible
            at its natural position. This creates a "drop down" feel.
          */
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* ── Close button ───────────────────────────────────────── */}
          {/*
            Positioned top-right to mirror where the hamburger was.
            Uses Lucide's X icon (a clean × symbol).
          */}
          <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 h-16 flex items-center justify-between">
            <Link href="/" onClick={onClose}>
              <Image
                src="/images/cc-logo.webp"
                alt="Creative Core"
                width={48}
                height={48}
                className="object-contain mix-blend-lighten"
              />
            </Link>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="text-cc-text p-1"
            >
              <X size={20} />
            </button>
          </div>

          {/* ── Nav links ──────────────────────────────────────────── */}
          {/*
            Centered vertically and horizontally. Each link is large
            Bebas Neue — the editorial, display typeface of the design system.
            Links stagger in one by one using Framer Motion's variants system.
          */}
          <nav className="flex-1 flex flex-col items-center justify-center gap-2">
            {links.map(({ label, href }, i) => {
              const isActive = pathname.startsWith(href)
              return (
                /*
                  Each link is a motion.div so it can animate independently.
                  The `custom` prop passes the index to the variant function,
                  which uses it to calculate a staggered delay (i * 0.06s).
                */
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: 'easeOut' }}
                >
                  <Link
                    href={href}
                    onClick={onClose}
                    className={`
                      font-bebas text-6xl md:text-8xl tracking-[0.08em] uppercase
                      block transition-colors duration-200
                      ${isActive ? 'text-cc-text' : 'text-cc-muted hover:text-cc-text'}
                    `}
                  >
                    {label}
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          {/* ── Bottom contact line ─────────────────────────────────── */}
          {/*
            A small social/contact cue at the bottom of the overlay.
            Gives the menu a finished, editorial feel rather than just links.
          */}
          <motion.div
            className="px-6 pb-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-cc-subtle">
              Creative Core Studio · creativecore.pro
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
