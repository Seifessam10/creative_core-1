'use client'

/*
  SmoothScroll.tsx — wraps the entire app with Lenis smooth scrolling.

  WHAT LENIS DOES:
  Native browser scroll is instant and jerky. Lenis intercepts scroll events
  and replaces them with a physics-based animation — the page "glides" to its
  destination with momentum, like a high-end design portfolio.

  HOW IT INTEGRATES WITH FRAMER MOTION:
  Lenis needs to update on every animation frame. We hook it into Framer Motion's
  `useAnimationFrame` so both systems share the same RAF loop — no double
  rendering, no performance cost.

  This component renders no visible UI — it just enables the behaviour globally.
*/

import { useEffect } from 'react'
import Lenis from 'lenis'
import { useAnimationFrame } from 'framer-motion'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,        // how long momentum lasts (seconds)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
      smoothWheel: true,
    })

    // Store on window so other components can access it (e.g. to scroll to top)
    ;(window as unknown as { lenis: Lenis }).lenis = lenis

    return () => {
      lenis.destroy()
    }
  }, [])

  // Sync Lenis RAF with Framer Motion's loop
  useAnimationFrame((time) => {
    const lenis = (window as unknown as { lenis?: Lenis }).lenis
    lenis?.raf(time)
  })

  return <>{children}</>
}
