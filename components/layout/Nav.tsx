'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { motion } from 'framer-motion'
import MobileMenu from './MobileMenu'

// The four pages visitors can navigate to
const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Nav() {
  // Track whether the user has scrolled at all
  const [scrolled, setScrolled] = useState(false)
  // Track whether the mobile fullscreen menu is open
  const [menuOpen, setMenuOpen] = useState(false)
  // The current URL path — e.g. "/work" or "/about"
  const pathname = usePathname()

  // Attach a scroll listener when the component mounts, clean it up on unmount.
  // This is a useEffect because scroll events only exist in the browser, not on
  // the server. Next.js runs components on the server first (SSR), so anything
  // browser-specific must live inside useEffect.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when the mobile menu is open so the page doesn't scroll
  // behind the overlay. Restore it when the menu closes.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close the mobile menu whenever the user navigates to a new page
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      {/*
        The <header> is fixed (stays at top as you scroll), spans full width,
        and sits above all page content with z-50.

        The background transitions:
          - At the top of the page: fully transparent so the hero shows through
          - After scrolling 10px: cc-bg (#080808) + a subtle bottom border

        `transition-all duration-300` makes this change animate smoothly
        instead of snapping instantly.
      */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${scrolled
            ? 'bg-cc-bg border-b border-cc-border'
            : 'bg-transparent border-b border-transparent'
          }
        `}
      >
        {/*
          The inner container constrains the width to 1400px and adds
          horizontal padding. The nav itself is a flex row with the logo
          on the left and links on the right.
        */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

          {/* ── Logo ─────────────────────────────────────────────── */}
          {/*
            next/image automatically:
            - Serves the image in the best format the browser supports (WebP, AVIF)
            - Resizes it to exactly the displayed size (no oversized downloads)
            - Lazy loads it unless we set priority={true}
            We set priority here because the logo is above the fold on every page.
          */}
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src="/images/cc-logo.webp"
              alt="Creative Core"
              width={48}
              height={48}
              priority
              className="object-contain mix-blend-lighten"
            />
          </Link>

          {/* ── Desktop nav links (hidden on mobile) ─────────────── */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => {
              // A link is "active" if the current URL starts with its href.
              // startsWith instead of === handles sub-routes like /work/my-project
              const isActive = pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                    font-mono text-[10px] uppercase tracking-[0.12em]
                    transition-colors duration-200
                    ${isActive ? 'text-cc-text' : 'text-cc-muted hover:text-cc-text'}
                  `}
                >
                  {label}
                </Link>
              )
            })}

            {/* ── CTA button ─────────────────────────────────────── */}
            {/*
              Outlined button — no fill, just a border.
              On hover the border lightens from cc-border to cc-subtle.
              `data-magnetic` will activate the magnetic cursor effect in Phase 2.
            */}
            <Link
              href="/contact"
              data-magnetic
              className="
                font-mono text-[10px] uppercase tracking-[0.12em] text-cc-text
                border border-cc-border px-4 py-2
                hover:border-cc-subtle transition-colors duration-200
              "
            >
              Start a Project
            </Link>
          </nav>

          {/* ── Mobile hamburger (visible only on mobile) ─────────── */}
          {/*
            Lucide's <Menu> icon is a clean three-line hamburger SVG.
            Clicking it toggles the fullscreen mobile menu open/closed.
          */}
          <button
            className="md:hidden text-cc-text p-1"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* The fullscreen mobile menu lives outside the header so it can cover
          the entire viewport. It's controlled by menuOpen state. */}
      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={NAV_LINKS}
        pathname={pathname}
      />
    </>
  )
}
