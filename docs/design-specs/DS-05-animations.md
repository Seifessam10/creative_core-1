# DS-05 — Animation & Motion Spec

## Philosophy
Gravity, not bounce. Everything feels weighted. Animations reveal — they don't perform.

## Global Defaults
```ts
// Use these constants everywhere — import from lib/motion.ts
export const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4, ease: 'easeOut' }
}

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } }
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: 'easeOut' }
}
```

## Scroll-Triggered Reveals
```tsx
// Wrap any section that should animate on scroll
import { useInView } from 'framer-motion'
import { useRef } from 'react'

function AnimatedSection({ children }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
```

## Page Transitions
```tsx
// app/(site)/layout.tsx — wrap page content
<AnimatePresence mode="wait">
  <motion.main
    key={pathname}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
  >
    {children}
  </motion.main>
</AnimatePresence>
```

## Marquee (Project Strip)
```css
/* globals.css */
@keyframes marquee-left {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes marquee-right {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}

.marquee-track {
  display: flex;
  width: max-content;
  will-change: transform;
}
.marquee-track--left  { animation: marquee-left  40s linear infinite; }
.marquee-track--right { animation: marquee-right 48s linear infinite; }

.marquee-wrapper:hover .marquee-track { animation-play-state: paused; }
```

## Card Hover (Portfolio Grid)
```tsx
// ProjectCard.tsx
<motion.div
  className="relative overflow-hidden cursor-pointer"
  whileHover="hover"
>
  <Image ... />
  <motion.div
    className="absolute inset-0 bg-black/65 flex flex-col justify-end p-4"
    variants={{
      hover: { opacity: 1 },
    }}
    initial={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
  >
    <motion.p
      className="font-bebas text-xl text-white"
      variants={{ hover: { y: 0, opacity: 1 } }}
      initial={{ y: 8, opacity: 0 }}
      transition={{ duration: 0.2, delay: 0.05 }}
    >
      {title}
    </motion.p>
  </motion.div>
</motion.div>
```

## Rules — Never Break These
- Never animate `color`, `background-color`, `width`, `height` — only `opacity` + `transform`
- `will-change: transform` on marquee tracks only
- All scroll-triggered animations use `once: true` — play once, don't replay on scroll up
- No animation on reduced-motion: wrap everything in `useReducedMotion()` check
  ```ts
  const prefersReducedMotion = useReducedMotion()
  const animate = prefersReducedMotion ? {} : { opacity: 1, y: 0 }
  ```
- Duration ceiling: 600ms. Nothing slower.
- No spring physics — use `ease: 'easeOut'` always
