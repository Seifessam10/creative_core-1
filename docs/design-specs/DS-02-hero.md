# DS-02 — Hero Section Design Spec
> Detailed visual spec for the homepage hero. Claude Code reads this alongside US-02.

## Layout Dimensions
- Height: `100vh` — exactly fills viewport
- Background: `#080808`
- Content centered: `flex items-center justify-center flex-col`
- Text alignment: center

## Logo
- File: `/public/images/cc-logo.png` (the chrome CC + star mark)
- Size: 180px × 180px desktop, 120px × 120px mobile
- No border, no background
- Animation: fade in, scale 0.95 → 1, duration 0.8s, ease-out

## Tagline
```
Line 1: "WHERE DESIGN"
Line 2: "BECOMES IDENTITY"
Font: Bebas Neue
Size: 80px desktop, 48px mobile
Color: #e8e8e8
Letter spacing: 0.06em
Margin top: 2rem from logo
Animation: each word fades up individually, stagger 0.08s, starts 0.4s after logo
```

## Sub-tagline
```
Text: "Apparel · Branding · Identity · Creative Direction"
Font: Space Mono
Size: 11px
Color: #666666
Letter spacing: 0.15em
Margin top: 1rem
Animation: fade in, delay 1s
```

## Scroll Indicator
```
Bottom of viewport, centered
Text: "scroll" OR down arrow icon (Lucide ArrowDown)
Font: Space Mono, 9px, color #333
Animation: slow bounce (up-down), infinite, 2s duration
Disappears after scrolling 100px
```

## Marquee Strip (immediately below hero)
```
Height: 280px
Background: #080808
Padding: 0
Overflow: hidden
Two tracks: 
  Track 1 scrolls left → speed 40s
  Track 2 scrolls right ← speed 48s (slightly slower for depth)
Item size: width 200px, height 260px, object-cover
Gap between items: 8px
Hover: animation-play-state: paused on track 1 and 2
```
