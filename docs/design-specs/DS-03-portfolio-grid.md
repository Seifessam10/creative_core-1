# DS-03 — Portfolio Grid Design Spec

## Filter Bar
```
Position: sticky, top: 64px (nav height), z-index: 40
Background: #080808
Border bottom: 1px solid #1e1e1e
Padding: 0 48px (matches page container)
Height: 48px
Display: flex, align-items: center, gap: 32px

Tab styles:
  Font: Space Mono, 10px, uppercase, letter-spacing 0.12em
  Default: color #444, no border
  Hover: color #888
  Active: color #e8e8e8, border-bottom: 2px solid #e8e8e8
  Transition: all 200ms
  
Count badge (next to label): 
  Font: Space Mono, 9px
  Color: #333
  e.g. "APPAREL (6)"
```

## Grid Layout
```
Display: CSS columns (masonry-like) OR CSS grid
Preferred: CSS grid with auto rows

Desktop (lg): grid-cols-3, gap-2
Tablet (md):  grid-cols-2, gap-2
Mobile:       grid-cols-1, gap-2

Image aspect ratios — vary per project:
  Portrait:  aspect-[3/4]  ← most apparel mockups
  Landscape: aspect-[4/3]  ← some bag/accessory shots
  Square:    aspect-square ← occasional

No padding on images — they sit edge to edge on black
```

## Card Hover State
```
Transition duration: 300ms ease

Default:
  image at 100% brightness

On hover:
  overlay: absolute inset-0, bg-black/65
  scale: 1.01 (very subtle — don't zoom aggressively)
  
  Text reveal (fade up from y:8 to y:0):
    Project name: Bebas Neue, 22px, white, absolute bottom-left, p-4
    Category: Space Mono, 9px, #aaa, below project name
    Arrow: Lucide ArrowUpRight, 16px, white, absolute top-right, p-3

Cursor on card: pointer
```

## Empty State
```
Text: "NO {CATEGORY} WORK YET"
Font: Bebas Neue, 32px
Color: #1e1e1e (very muted — part of the aesthetic)
Position: centered in grid area
Padding: py-32
```

## Animation
```
On category filter change:
  Exiting items: opacity 0, scale 0.98, duration 200ms
  Entering items: opacity 0 → 1, y 10 → 0, duration 300ms, stagger 30ms
  Use Framer Motion AnimatePresence + layout
```
