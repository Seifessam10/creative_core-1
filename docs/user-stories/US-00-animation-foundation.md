# US-00 — Animation Foundation
**Status**: [x] Done — files pre-built, copy into repo
**Phase**: 0 (before all other stories) | **Priority**: P0

---

## What Was Built
Pre-built animation foundation. Copy these files into the repo before starting any other user story.

```
lib/motion.ts                        ← all Framer Motion variants + transitions
components/ui/AnimatedSection.tsx    ← scroll-triggered section wrapper + SplitText + RevealImage
components/ui/CustomCursor.tsx       ← Phase 2 magnetic cursor
styles/globals.css                   ← CSS animations (marquee, magnetic, base resets)
```

---

## How to Use in Every Component

### 1. Animate a section on scroll (most common)
```tsx
import { AnimatedSection } from '@/components/ui/AnimatedSection'

// Default — fade up when scrolled into view
<AnimatedSection>
  <p>This content fades up</p>
</AnimatedSection>

// With delay
<AnimatedSection delay={0.2}>
  <p>Delayed by 200ms</p>
</AnimatedSection>

// Clip-path wipe for headings
<AnimatedSection variant="clipWipe">
  <h2 className="font-bebas text-6xl">SERVICES</h2>
</AnimatedSection>
```

### 2. Stagger a list or grid
```tsx
import { AnimatedSection, AnimatedItem } from '@/components/ui/AnimatedSection'

// Grid cards — each fades up 80ms apart
<AnimatedSection variant="staggerFast" as="ul" className="grid grid-cols-3 gap-2">
  {projects.map(project => (
    <AnimatedItem as="li" key={project._id}>
      <ProjectCard project={project} />
    </AnimatedItem>
  ))}
</AnimatedSection>

// Services list — slower stagger (120ms apart)
<AnimatedSection variant="staggerSlow" as="ul">
  {services.map((service, i) => (
    <AnimatedItem as="li" key={service._id}>
      <ServiceCard service={service} />
    </AnimatedItem>
  ))}
</AnimatedSection>
```

### 3. Character-by-character text reveal
```tsx
import { SplitText } from '@/components/ui/AnimatedSection'

// Hero heading — two lines with slight delay on second
<h1>
  <SplitText
    text="WHERE DESIGN"
    className="font-bebas text-7xl block"
    delay={0}
  />
  <SplitText
    text="BECOMES IDENTITY"
    className="font-bebas text-7xl block"
    delay={0.15}
  />
</h1>
```

### 4. Image curtain reveal
```tsx
import { RevealImage } from '@/components/ui/AnimatedSection'
import Image from 'next/image'

// Portfolio card image
<RevealImage className="relative aspect-[3/4]">
  <Image
    src={urlFor(project.coverImage).url()}
    alt={project.title}
    fill
    className="object-cover"
  />
</RevealImage>

// With delay (staggered in a grid)
<RevealImage delay={index * 0.1} className="relative h-64">
  <Image src={src} alt={alt} fill className="object-cover" />
</RevealImage>
```

### 5. Custom variants directly (advanced)
```tsx
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

// Full manual control
<motion.div variants={staggerContainer} initial="hidden" animate="visible">
  <motion.h2 variants={fadeUp}>Heading</motion.h2>
  <motion.p variants={fadeUp}>Paragraph</motion.p>
</motion.div>
```

### 6. Magnetic cursor on buttons (Phase 2)
```tsx
// Add CustomCursor to layout.tsx (once, top level)
import { CustomCursor } from '@/components/ui/CustomCursor'
<CustomCursor />

// Add data-magnetic to any button/link you want magnetic
<button data-magnetic className="...">Start a Project</button>
<a data-magnetic href="/work">View All Work</a>
```

### 7. Marquee (CSS-only)
```tsx
// Wrap two copies of items to create seamless loop
<div className="marquee-wrapper overflow-hidden">
  <div className="marquee-track marquee-track--left">
    {items.concat(items).map((item, i) => (
      <div key={i} className="w-[150px] flex-shrink-0">
        {/* item content */}
      </div>
    ))}
  </div>
</div>
```

---

## Rules Claude Code Must Follow

1. Always import from `@/lib/motion` — never define variants inline
2. Never animate `color`, `background-color`, `width`, `height` — only `opacity` + transform properties
3. All `AnimatedSection` uses `once: true` — animations never replay on scroll-up
4. `will-change: transform` is already set in globals.css on `.marquee-track` — don't add it elsewhere
5. `CustomCursor` is Phase 2 only — don't add to layout.tsx in Phase 1
6. Add `data-magnetic` to all primary CTA buttons when cursor is added
7. `SplitText` adds `aria-label` automatically — no extra a11y needed
8. `RevealImage` parent must have `position: relative` and defined height/aspect ratio

---

## Page-Level Animation Load Order
When a user arrives on a page, animations should play in this sequence:

```
0ms    Nav fades in (pageFade variant)
0ms    Hero logo scaleReveal
400ms  Hero tagline SplitText (line 1)
550ms  Hero tagline SplitText (line 2)
800ms  Hero sub-tagline fadeIn
900ms  Hero CTA buttons fadeUp
1000ms Scroll indicator scrollLine (loops)

On scroll:
       Each section triggers AnimatedSection as it enters viewport
       Images trigger RevealImage curtain wipe
       Grid items trigger stagger sequence
```
