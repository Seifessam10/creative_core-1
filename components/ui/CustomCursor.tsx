'use client'

/**
 * components/ui/CustomCursor.tsx
 *
 * Phase 2 — magnetic cursor with a dot + lagging ring.
 * Desktop only — hidden on touch devices.
 * Buttons with data-magnetic expand the ring and pull slightly toward cursor.
 *
 * Usage:
 *   // In app/(site)/layout.tsx — once, at the top level
 *   <CustomCursor />
 *
 *   // On any button/element you want magnetic behaviour:
 *   <button data-magnetic>Start a Project</button>
 */

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isVisible, setIsVisible]   = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isMagnetic, setIsMagnetic] = useState(false)

  const dotX   = useMotionValue(-100)
  const dotY   = useMotionValue(-100)

  // Ring lags behind dot — spring creates the trailing effect
  const ringX  = useSpring(dotX, { stiffness: 120, damping: 20, mass: 0.4 })
  const ringY  = useSpring(dotY, { stiffness: 120, damping: 20, mass: 0.4 })

  const magnetEl = useRef<Element | null>(null)

  useEffect(() => {
    // Don't show on touch devices
    const isTouch = window.matchMedia('(hover: none)').matches
    if (isTouch) return

    const onMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true)

      const target = e.target as Element
      const magnetic = target.closest('[data-magnetic]')

      if (magnetic) {
        magnetEl.current = magnetic
        setIsMagnetic(true)
        const rect = magnetic.getBoundingClientRect()
        const cx   = rect.left + rect.width  / 2
        const cy   = rect.top  + rect.height / 2
        const dx   = e.clientX - cx
        const dy   = e.clientY - cy

        // Move the element toward cursor (subtle pull — 0.35 factor)
        ;(magnetic as HTMLElement).style.transform =
          `translate(${dx * 0.35}px, ${dy * 0.35}px)`

        dotX.set(e.clientX)
        dotY.set(e.clientY)
      } else {
        // Reset previously magnetic element
        if (magnetEl.current) {
          ;(magnetEl.current as HTMLElement).style.transform = 'translate(0,0)'
          magnetEl.current = null
          setIsMagnetic(false)
        }
        dotX.set(e.clientX)
        dotY.set(e.clientY)
      }

      // Check for hoverable elements to expand ring
      const hoverable = target.closest('a, button, [data-hover], [data-magnetic]')
      setIsHovering(!!hoverable)
    }

    const onLeave = () => setIsVisible(false)
    const onEnter = () => setIsVisible(true)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [dotX, dotY, isVisible])

  // Don't render at all on SSR
  if (typeof window === 'undefined') return null

  return (
    <>
      {/* Dot — snaps directly to cursor */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          position: 'fixed',
          top:    0,
          left:   0,
          zIndex: 9999,
          pointerEvents: 'none',
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          width:   isMagnetic ? 0 : isHovering ? 6 : 8,
          height:  isMagnetic ? 0 : isHovering ? 6 : 8,
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          style={{
            width:        '100%',
            height:       '100%',
            borderRadius: '50%',
            background:   '#e8e8e8',
          }}
        />
      </motion.div>

      {/* Ring — springs behind dot */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          position: 'fixed',
          top:    0,
          left:   0,
          zIndex: 9998,
          pointerEvents: 'none',
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          border: '1px solid #333',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          width:   isMagnetic ? 56 : isHovering ? 48 : 32,
          height:  isMagnetic ? 56 : isHovering ? 48 : 32,
          borderColor: isHovering ? '#555' : '#222',
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
