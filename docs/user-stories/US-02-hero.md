# US-02 — Homepage Hero + Project Marquee
**Status**: [ ] Todo | **Phase**: 1 | **Priority**: P1

---

## Story
> As a visitor landing on creativecore.pro for the first time, I see a full-viewport
> dark hero that immediately communicates Creative Core's identity and quality,
> so I'm compelled to scroll down and explore the work.

---

## Design Spec

### Hero Section (100vh)
- Background: `var(--cc-bg)` — pure black
- Center: CC logo (large, 200–280px wide) — the chrome/silver version
- Below logo: tagline in Bebas Neue, ~64px, color `var(--cc-text)`
  - Line 1: "WHERE DESIGN"
  - Line 2: "BECOMES IDENTITY"
- Sub-tagline: Space Mono, 11px, `var(--cc-muted)`, "Apparel · Branding · Identity · Creative Direction"
- Bottom: scroll indicator — animated downward arrow or "scroll" text, Space Mono 10px
- Entry animation: logo fades in (0.8s) → tagline reveals word by word (stagger 0.1s) → sub-tagline fades (delay 0.8s)

### Project Marquee Strip (below hero, before portfolio section)
- Infinite horizontal scroll — projects scroll left automatically
- Each item: project cover image (aspect ratio 3:4), ~200px wide, `object-fit: cover`
- On hover: slight scale up (1.02), project name + category revealed as overlay text
- Speed: ~40s for full loop, pauses on hover
- Images from Sanity: query all `featured: true` projects, fallback to latest 8
- Two rows option (optional): one scrolls left, one scrolls right

### Section Below Marquee
- Single line: Bebas Neue, large, `var(--cc-muted)` color: "16+ PROJECTS DELIVERED"
- CTA: "View All Work →" link to `/work`, Space Mono 11px

## Acceptance Criteria
- [ ] Hero fills 100vh exactly, no overflow
- [ ] CC logo renders correctly (SVG preferred, PNG fallback)
- [ ] Tagline and sub-tagline display in correct fonts
- [ ] Entry animation sequence plays on first load (not on back-navigation)
- [ ] Marquee scrolls infinitely without gap or jump
- [ ] Marquee pauses on hover
- [ ] Marquee images load from Sanity (featured projects)
- [ ] Marquee renders ≥ 6 items on desktop, ≥ 3 on mobile
- [ ] Scroll indicator visible at bottom of hero
- [ ] Mobile: logo scales down, font sizes reduce gracefully

## Files to Create/Modify
```
components/home/Hero.tsx            ← create
components/home/ProjectMarquee.tsx  ← create
app/(site)/page.tsx                 ← modify (add Hero + Marquee)
lib/sanity/queries.ts               ← add getFeaturedProjects query
```

## Sanity Query
```ts
// lib/sanity/queries.ts
export const getFeaturedProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(_createdAt desc) {
    _id, title, slug, client, category, coverImage
  }
`
```

## Claude Code Prompt
```
Read CLAUDE.md, then implement US-02 (docs/user-stories/US-02-hero.md).
Build Hero.tsx with entry animation and ProjectMarquee.tsx with infinite scroll.
Fetch featured projects from Sanity using getFeaturedProjectsQuery.
Use Framer Motion for all animations.
```

## Notes
- Marquee technique: CSS `animation: marquee linear infinite` OR Framer Motion `useAnimationFrame` with `x` transform
- Duplicate marquee items to create seamless loop (render array twice)
- `'use client'` required for Hero (uses animation) — fetch data in parent server component and pass as props
