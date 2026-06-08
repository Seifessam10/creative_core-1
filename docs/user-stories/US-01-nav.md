# US-01 — Navigation Bar + Mobile Menu
**Status**: [x] Done | **Phase**: 1 | **Priority**: P0 (blocks everything)

---

## Story
> As a visitor, I can navigate between all pages of the site from a fixed header,
> and access a full-screen menu on mobile, so I can find what I need on any device.

---

## Design Spec
- Fixed header, full width, `z-50`
- Background: `var(--cc-bg)` with `border-b: 1px solid var(--cc-border)` on scroll (transparent when at top)
- Left: CC logo (SVG or `next/image`) — links to `/`
- Right: nav links + CTA button
- Nav links: Work · Services · About · Contact
- CTA button: "Start a Project" → `/contact` — styled as outlined button (border `var(--cc-border)`, hover: border lightens)
- Font: Space Mono, 10px, uppercase, letter-spacing 0.12em
- Mobile (< 768px): hamburger icon (Lucide `Menu`) replaces links → full-screen black overlay with links centered, large Bebas Neue

## Acceptance Criteria
- [ ] Header is fixed and visible on all pages
- [ ] Logo links to `/`
- [ ] All 4 nav links work and show active state (lighter color) on current page
- [ ] "Start a Project" button links to `/contact`
- [ ] On mobile, hamburger opens full-screen overlay menu
- [ ] Mobile menu closes on link click or ESC key
- [ ] Header background transitions: transparent at top → `var(--cc-bg)` on scroll
- [ ] No layout shift when menu opens (body scroll locked)

## Files to Create/Modify
```
components/layout/Nav.tsx          ← create
components/layout/MobileMenu.tsx   ← create
app/(site)/layout.tsx              ← modify (add Nav + Footer)
```

## Claude Code Prompt
```
Read CLAUDE.md, then implement US-01 (docs/user-stories/US-01-nav.md).
Build Nav.tsx and MobileMenu.tsx. Wire into app/(site)/layout.tsx.
Follow the design system exactly — Space Mono labels, Bebas Neue mobile menu, chrome border CTA.
```

## Notes
- Use `usePathname()` for active link detection
- Scroll detection via `useScroll` from Framer Motion or simple `useEffect` + `window.scrollY`
- Mobile menu should animate in from top or fade (Framer Motion `AnimatePresence`)
