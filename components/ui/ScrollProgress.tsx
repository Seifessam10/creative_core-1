'use client'

/*
  ScrollProgress.tsx — thin line at the top of the viewport showing how far
  the user has scrolled through the page.

  HOW IT WORKS:
  `useScroll` from Framer Motion gives us `scrollYProgress` — a MotionValue
  that goes from 0 (top) to 1 (bottom). We pass it directly to `scaleX` on
  the bar so the update happens on the compositor thread without React re-renders.
  This is called "direct DOM mutation" and it's what makes it silky at 60fps.
*/

import { useScroll, motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        transformOrigin: 'left',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'var(--cc-chrome)',
        zIndex: 200,
      }}
    />
  )
}
