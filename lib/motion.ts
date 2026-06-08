/**
 * lib/motion.ts — Creative Core Animation System
 *
 * Single source of truth for every animation on the site.
 * Import from here — never define variants inline in components.
 *
 * Philosophy: gravity, not bounce. Slow, weighted, cinematic.
 * Max duration: 600ms. Easing: easeOut only. No springs.
 */

import type { Variants, Transition } from 'framer-motion'

// ─────────────────────────────────────────────
// SHARED TRANSITIONS
// ─────────────────────────────────────────────

export const ease = {
  out:      [0.16, 1, 0.3, 1]   as const,  // snappy ease-out (most used)
  inOut:    [0.77, 0, 0.175, 1] as const,  // cinematic — for curtain wipes
  gentle:   [0.25, 0.46, 0.45, 0.94] as const, // subtle — for image scale
} as const

export const duration = {
  fast:   0.3,
  base:   0.5,
  slow:   0.7,
  xslow:  0.9,
} as const

// ─────────────────────────────────────────────
// FADE VARIANTS
// ─────────────────────────────────────────────

/** Standard fade-up — use for most sections scrolling into view */
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: ease.out },
  },
}

/** Pure opacity fade — use for overlays, nav bg, subtle elements */
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.fast, ease: ease.out },
  },
}

/** Scale + fade — use for logo reveal on hero */
export const scaleReveal: Variants = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.slow, ease: ease.out },
  },
}

// ─────────────────────────────────────────────
// STAGGER CONTAINERS
// ─────────────────────────────────────────────

/**
 * Wrap a list/grid with this, then give each child the `fadeUp` variant.
 * The container orchestrates the stagger — children just declare their shape.
 *
 * Usage:
 *   <motion.ul variants={staggerContainer} initial="hidden" animate="visible">
 *     {items.map(i => <motion.li variants={fadeUp} key={i.id} />)}
 *   </motion.ul>
 */
export const staggerContainer: Variants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren:  0.08,
      delayChildren:    0.05,
    },
  },
}

/** Tighter stagger for dense grids (portfolio cards) */
export const staggerFast: Variants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren:   0,
    },
  },
}

/** Slower stagger for editorial lists (services, process steps) */
export const staggerSlow: Variants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren:   0.1,
    },
  },
}

// ─────────────────────────────────────────────
// TEXT ANIMATIONS
// ─────────────────────────────────────────────

/**
 * Character-by-character text reveal.
 * Apply to the CONTAINER — each character span gets `charReveal`.
 *
 * Usage: see components/ui/SplitText.tsx
 */
export const charContainer: Variants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.028, delayChildren: 0 },
  },
}

/** Single character animation — pair with charContainer */
export const charReveal: Variants = {
  hidden:  { y: '105%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.55, ease: ease.out },
  },
}

/**
 * Clip-path wipe — text or element sweeps in from left.
 * Feels mechanical and intentional. Use for section headings.
 */
export const clipWipe: Variants = {
  hidden:  { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: duration.slow, ease: ease.inOut },
  },
}

// ─────────────────────────────────────────────
// IMAGE ANIMATIONS
// ─────────────────────────────────────────────

/**
 * Image curtain reveal — a solid overlay slides up while the image
 * scales from 1.08 → 1. Creates the "grows into frame" effect.
 *
 * Usage: see components/ui/RevealImage.tsx
 */
export const imageCurtain: Variants = {
  hidden:  { scaleY: 1 },
  visible: {
    scaleY: 0,
    transition: { duration: duration.slow, ease: ease.inOut },
  },
}

export const imageScale: Variants = {
  hidden:  { scale: 1.08 },
  visible: {
    scale: 1,
    transition: { duration: duration.xslow, ease: ease.gentle },
  },
}

// ─────────────────────────────────────────────
// PAGE TRANSITIONS
// ─────────────────────────────────────────────

/**
 * Curtain wipe between pages — white curtain sweeps in, then black
 * curtain follows and wipes away as the new page appears.
 *
 * Usage: see app/(site)/layout.tsx with AnimatePresence
 */
export const pageCurtainWhite: Variants = {
  initial: { scaleX: 0, originX: 0 },
  enter:   { scaleX: 1, transition: { duration: 0.45, ease: ease.inOut } },
  exit:    { scaleX: 0, originX: 1, transition: { duration: 0.45, ease: ease.inOut, delay: 0.1 } },
}

export const pageCurtainBlack: Variants = {
  initial: { scaleX: 0, originX: 0 },
  enter:   { scaleX: 1, transition: { duration: 0.45, ease: ease.inOut, delay: 0.15 } },
  exit:    { scaleX: 0, originX: 1, transition: { duration: 0.45, ease: ease.inOut } },
}

/** Simple page fade — use before curtain transitions are added (Phase 1) */
export const pageFade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3, ease: ease.out } },
  exit:    { opacity: 0, transition: { duration: 0.2, ease: ease.out } },
}

// ─────────────────────────────────────────────
// HOVER STATES
// ─────────────────────────────────────────────

/**
 * Portfolio card hover — overlay fades in, text slides up.
 * Use whileHover="hover" on the parent card.
 */
export const cardHoverParent: Variants = {
  rest:  {},
  hover: {},
}

export const cardOverlay: Variants = {
  rest:  { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.25, ease: ease.out } },
}

export const cardTextSlide: Variants = {
  rest:  { y: 10, opacity: 0 },
  hover: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.22, ease: ease.out },
  },
}

export const cardCatSlide: Variants = {
  rest:  { y: 10, opacity: 0 },
  hover: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.22, ease: ease.out, delay: 0.04 },
  },
}

// ─────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────

/** Mobile menu full-screen overlay */
export const mobileMenu: Variants = {
  closed: { opacity: 0, y: -8, pointerEvents: 'none' },
  open:   {
    opacity: 1,
    y: 0,
    pointerEvents: 'auto',
    transition: { duration: 0.35, ease: ease.out },
  },
}

/** Each nav link in mobile overlay — use with stagger */
export const mobileNavLink: Variants = {
  closed: { opacity: 0, x: -16 },
  open:   { opacity: 1, x: 0, transition: { duration: 0.4, ease: ease.out } },
}

// ─────────────────────────────────────────────
// SCROLL INDICATOR
// ─────────────────────────────────────────────

/** Animated scroll line — loops forever on hero */
export const scrollLine: Variants = {
  hidden:  { scaleY: 0, originY: 0 },
  visible: {
    scaleY: [0, 1, 1, 0],
    originY: [0, 0, 1, 1],
    transition: {
      duration: 2,
      ease: 'linear',
      repeat: Infinity,
      repeatDelay: 0.4,
    },
  },
}

// ─────────────────────────────────────────────
// UTILITY: inView trigger helper
// ─────────────────────────────────────────────

/**
 * Standard inView config — pass to useInView().
 * `once: true` means it plays once and stays — never re-triggers on scroll up.
 * `margin: '-80px'` fires 80px before the element hits the viewport bottom.
 */
export const inViewConfig = {
  once:   true,
  margin: '-80px 0px',
} as const

/**
 * For elements near the top of the page (hero sub-elements) — smaller margin
 * so they trigger earlier without waiting for 80px offset.
 */
export const inViewConfigEarly = {
  once:   true,
  margin: '-20px 0px',
} as const
