# DS-01 — Design System Reference
> The single source of truth for all visual decisions. Claude Code reads this before building any UI.

---

## Brand Identity
Creative Core is an underground luxury design studio. The visual language is:
- **Dark** — near-black backgrounds, silver as the only accent
- **Editorial** — large Bebas Neue type, sparse layouts
- **Raw** — no rounded corners, no drop shadows, no gradients
- **Confident** — big typography, generous negative space

---

## Color Tokens
```css
/* globals.css — root variables */
:root {
  --cc-bg:       #080808;   /* page background */
  --cc-surface:  #0f0f0f;   /* cards, form inputs, panels */
  --cc-border:   #1e1e1e;   /* all borders */
  --cc-text:     #e8e8e8;   /* primary text */
  --cc-muted:    #666666;   /* secondary / body text */
  --cc-subtle:   #333333;   /* disabled states, hints */
  --cc-chrome:   #c8c8c8;   /* silver accent — prices, highlights */
}
```

---

## Typography

### Font Loading (app/layout.tsx)
```ts
import { Bebas_Neue, Space_Mono, DM_Sans } from 'next/font/google'

const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas' })
const spaceMono = Space_Mono({ weight: ['400','700'], subsets: ['latin'], variable: '--font-mono' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' })
```

### Usage
| Use Case | Font | Size | Weight | Letter Spacing | Color |
|----------|------|------|--------|----------------|-------|
| Page titles (H1) | Bebas Neue | 80–120px | 400 | 0.06em | `--cc-text` |
| Section headings (H2) | Bebas Neue | 48–72px | 400 | 0.06em | `--cc-text` |
| Project names on cards | Bebas Neue | 20–28px | 400 | 0.06em | white |
| UI labels / metadata | Space Mono | 10–12px | 400 | 0.12em | `--cc-muted` |
| Body copy | DM Sans | 15–16px | 300–400 | 0 | `--cc-muted` |
| Prices / highlights | Space Mono | 12px | 700 | 0.08em | `--cc-chrome` |
| CTA buttons | Space Mono | 10–11px | 700 | 0.15em | `--cc-text` |

### Tailwind Config
```ts
// tailwind.config.ts
fontFamily: {
  bebas: ['var(--font-bebas)', 'sans-serif'],
  mono:  ['var(--font-mono)', 'monospace'],
  sans:  ['var(--font-sans)', 'sans-serif'],
}
```

---

## Spacing
```
Section vertical padding:    py-24 (96px) desktop, py-16 (64px) mobile
Page container:              max-w-[1400px] mx-auto px-6 md:px-12
Grid gap (tight):            gap-2 (8px) — portfolio images
Grid gap (content):          gap-6 (24px) — service cards
Content max width (prose):   max-w-2xl
```

---

## Borders & Shape
```
All borders:     border border-[var(--cc-border)]  ≡  1px solid #1e1e1e
Border radius:   rounded-none (default) — editorial feel
                 rounded-sm (4px) — only for tags / pills
No shadows:      never use box-shadow or drop-shadow
No gradients:    never — solid fills only
```

---

## Buttons
```
Primary CTA:
  border: 1px solid var(--cc-border)
  color: var(--cc-text)
  font: Space Mono, 11px, uppercase, ls 0.15em
  padding: px-6 py-3
  hover: border-color: var(--cc-muted), bg: var(--cc-surface)
  transition: all 200ms ease

Ghost / Subtle:
  border: 1px solid var(--cc-subtle)
  color: var(--cc-muted)
  Same hover behavior
```

---

## Form Inputs
```
background:   var(--cc-surface)
border:       1px solid var(--cc-border)
color:        var(--cc-text)
padding:      px-4 py-3
font:         DM Sans, 14px
placeholder:  var(--cc-subtle)
focus:        border-color: var(--cc-muted), outline: none
```

---

## Animation Standards
```ts
// Standard reveal (scroll-triggered)
initial:    { opacity: 0, y: 20 }
animate:    { opacity: 1, y: 0 }
transition: { duration: 0.5, ease: 'easeOut' }

// Stagger (list of items)
// Apply to parent with staggerChildren: 0.08

// Hover scale (project cards)
whileHover: { scale: 1.01 }
transition: { duration: 0.3 }

// Page transition
initial:    { opacity: 0 }
animate:    { opacity: 1 }
exit:       { opacity: 0 }
transition: { duration: 0.3 }
```
**Rules:**
- Never animate `width`, `height`, or `color` — only `opacity`, `transform`
- Use `will-change: transform` on marquee only
- All Framer Motion animations wrapped in `useInView` for scroll-trigger

---

## Responsive Breakpoints (Tailwind defaults)
```
sm:   640px
md:   768px  ← mobile/desktop split for nav
lg:   1024px ← 3-col grid activates
xl:   1280px
2xl:  1536px
```

---

## Image Handling
```tsx
// Always use next/image
// Portfolio covers (variable aspect ratio)
<Image
  src={urlFor(image).url()}
  alt={title}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 50vw, 33vw"
/>

// Profile photo
<Image
  src={urlFor(photo).width(600).url()}
  alt="Creative Core"
  width={600}
  height={800}
  className="object-cover"
/>
```
