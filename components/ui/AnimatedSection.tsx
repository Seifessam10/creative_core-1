'use client'

/**
 * components/ui/AnimatedSection.tsx
 *
 * Drop-in wrapper that animates any section into view on scroll.
 * Wraps children in a motion.div that plays once when the element
 * enters the viewport — never replays on scroll-up.
 *
 * Usage:
 *   <AnimatedSection>
 *     <p>This will fade up when scrolled into view</p>
 *   </AnimatedSection>
 *
 *   <AnimatedSection variant="clipWipe" delay={0.2}>
 *     <h2 className="font-bebas text-6xl">SERVICES</h2>
 *   </AnimatedSection>
 *
 *   <AnimatedSection variant="stagger" as="ul">
 *     {items.map(item => (
 *       <AnimatedItem key={item.id}>
 *         <li>{item.name}</li>
 *       </AnimatedItem>
 *     ))}
 *   </AnimatedSection>
 */

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import {
  fadeUp,
  fadeIn,
  clipWipe,
  scaleReveal,
  staggerContainer,
  staggerFast,
  staggerSlow,
  inViewConfig,
  inViewConfigEarly,
} from '@/lib/motion'
import type { Variants, HTMLMotionProps } from 'framer-motion'
import type { ElementType, ReactNode } from 'react'

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type AnimationVariant =
  | 'fadeUp'      // default — opacity+y reveal
  | 'fadeIn'      // pure opacity — for overlays
  | 'clipWipe'    // horizontal clip-path sweep — for headings
  | 'scaleReveal' // scale+opacity — for logo
  | 'stagger'     // stagger container — children animate individually
  | 'staggerFast' // tighter stagger — portfolio grid
  | 'staggerSlow' // editorial stagger — services list

interface AnimatedSectionProps {
  children:    ReactNode
  variant?:    AnimationVariant
  delay?:      number          // additional delay in seconds
  duration?:   number          // override default duration
  className?:  string
  as?:         ElementType     // render as div, section, ul, etc.
  earlyTrigger?: boolean       // trigger 20px before viewport instead of 80px
}

// ─────────────────────────────────────────────
// Variant map
// ─────────────────────────────────────────────

const variantMap: Record<AnimationVariant, Variants> = {
  fadeUp:      fadeUp,
  fadeIn:      fadeIn,
  clipWipe:    clipWipe,
  scaleReveal: scaleReveal,
  stagger:     staggerContainer,
  staggerFast: staggerFast,
  staggerSlow: staggerSlow,
}

// ─────────────────────────────────────────────
// AnimatedSection
// ─────────────────────────────────────────────

export function AnimatedSection({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration: durationOverride,
  className,
  as: Tag = 'div',
  earlyTrigger = false,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const isInView = useInView(
    ref,
    earlyTrigger ? inViewConfigEarly : inViewConfig,
  )

  const variants = variantMap[variant]

  // Respect system preference — no animation if user prefers reduced motion
  if (prefersReducedMotion) {
    const MotionTag = motion[Tag as keyof typeof motion] as any
    return (
      <MotionTag ref={ref} className={className}>
        {children}
      </MotionTag>
    )
  }

  // Build transition override if delay or duration provided
  const transitionOverride = delay > 0 || durationOverride
    ? {
        transition: {
          delay,
          ...(durationOverride ? { duration: durationOverride } : {}),
        },
      }
    : {}

  const MotionTag = motion[Tag as keyof typeof motion] as any

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      {...transitionOverride}
    >
      {children}
    </MotionTag>
  )
}

// ─────────────────────────────────────────────
// AnimatedItem — child of a stagger AnimatedSection
// ─────────────────────────────────────────────

/**
 * Wrap individual items inside an AnimatedSection with variant="stagger*".
 * The parent handles timing — this just declares the shape.
 *
 * Usage:
 *   <AnimatedSection variant="stagger" as="ul">
 *     <AnimatedItem as="li">First item</AnimatedItem>
 *     <AnimatedItem as="li">Second item</AnimatedItem>
 *   </AnimatedSection>
 */

interface AnimatedItemProps {
  children:   ReactNode
  className?: string
  as?:        ElementType
}

export function AnimatedItem({
  children,
  className,
  as: Tag = 'div',
}: AnimatedItemProps) {
  const prefersReducedMotion = useReducedMotion()
  const MotionTag = motion[Tag as keyof typeof motion] as any

  if (prefersReducedMotion) {
    return <MotionTag className={className}>{children}</MotionTag>
  }

  return (
    <MotionTag
      className={className}
      variants={fadeUp}
    >
      {children}
    </MotionTag>
  )
}

// ─────────────────────────────────────────────
// SplitText — character-by-character reveal
// ─────────────────────────────────────────────

/**
 * Splits a string into individual characters, each wrapped in a clipping
 * container. Characters reveal upward one-by-one on scroll.
 *
 * Usage:
 *   <SplitText text="WHERE DESIGN" className="font-bebas text-7xl" />
 *
 * For multi-line headings, render one SplitText per line:
 *   <SplitText text="WHERE DESIGN" delay={0} />
 *   <SplitText text="BECOMES IDENTITY" delay={0.15} />
 */

import { charContainer, charReveal } from '@/lib/motion'

interface SplitTextProps {
  text:       string
  className?: string
  delay?:     number   // stagger delay before first char
  as?:        ElementType
}

export function SplitText({
  text,
  className,
  delay = 0,
  as: Tag = 'span',
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isInView = useInView(ref, inViewConfig)

  const MotionTag = motion[Tag as keyof typeof motion] as any

  // Split into words, then chars — preserve spaces between words
  const words = text.split(' ')

  if (prefersReducedMotion) {
    return (
      <MotionTag ref={ref} className={className} aria-label={text}>
        {text}
      </MotionTag>
    )
  }

  return (
    <MotionTag
      ref={ref}
      className={className}
      aria-label={text}          // screen readers get the full string
      aria-hidden={false}
      variants={charContainer}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={delay > 0 ? { transition: `all 0s ${delay}s` } : undefined}
    >
      {words.map((word, wi) => (
        <span
          key={wi}
          style={{ display: 'inline-flex', overflow: 'hidden', marginRight: '0.2em' }}
          aria-hidden="true"
        >
          {word.split('').map((char, ci) => (
            <motion.span
              key={ci}
              variants={charReveal}
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </MotionTag>
  )
}

// ─────────────────────────────────────────────
// RevealImage — curtain wipe + scale on scroll
// ─────────────────────────────────────────────

/**
 * Wraps a Next.js Image (or any child) with a colour curtain that slides
 * upward on scroll, revealing the image which simultaneously scales
 * from 1.08 → 1 for the "grows into frame" effect.
 *
 * Usage:
 *   <RevealImage curtainColor="#080808">
 *     <Image src={src} alt={alt} fill className="object-cover" />
 *   </RevealImage>
 *
 * The parent must have position:relative and a defined height.
 */

import { imageCurtain, imageScale } from '@/lib/motion'

interface RevealImageProps {
  children:      ReactNode
  curtainColor?: string   // matches page bg — default CC black
  className?:    string   // applied to the outer wrapper
  delay?:        number
}

export function RevealImage({
  children,
  curtainColor = '#080808',
  className,
  delay = 0,
}: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isInView = useInView(ref, inViewConfig)

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className} style={{ position: 'relative', overflow: 'hidden' }}>
        {children}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Image scales as it reveals */}
      <motion.div
        style={{ width: '100%', height: '100%' }}
        variants={imageScale}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay }}
      >
        {children}
      </motion.div>

      {/* Curtain slides up, transform-origin: top */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: curtainColor,
          transformOrigin: 'top',
          zIndex: 2,
        }}
        variants={imageCurtain}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ delay }}
      />
    </div>
  )
}
