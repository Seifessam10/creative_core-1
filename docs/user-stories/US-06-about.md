# US-06 — About Page
**Status**: [ ] Todo | **Phase**: 1 | **Priority**: P1

---

## Story
> As a visitor, I can read the story behind Creative Core and understand who is
> behind the work, so I feel confident reaching out to a real person with a vision.

---

## Design Spec

### Layout
Split layout desktop: Left column (text) | Right column (photo)
Single column mobile: photo first, text below

### Left Column
- Label: Space Mono, 10px, muted: "ABOUT THE STUDIO"
- Heading: Bebas Neue, 80px: "CREATIVE CORE" (or designer's name)
- Bio: DM Sans, 16px, `var(--cc-muted)`, line-height 1.8 — from Sanity Settings
- Social links row: Instagram icon + handle, Behance icon + link, Email icon + address
- "Work With Us →" button → `/contact`

### Right Column
- Profile photo from Sanity settings `profilePhoto` field
- Rendered as `next/image`, object-cover, aspect-ratio portrait
- Subtle border: `1px solid var(--cc-border)`

### Philosophy Section (below the split)
- Heading: Bebas Neue — "THE APPROACH"
- 3 philosophy pillars (hardcoded — no CMS needed):
  1. "Design that means something" — not just decoration
  2. "Underground, not underground" — professional quality with edge
  3. "Your identity, our craft" — the work serves the client's vision
- Each: Space Mono label + DM Sans description, 2-col grid

## Acceptance Criteria
- [ ] Bio + social links load from Sanity settings document
- [ ] Profile photo renders from Sanity image CDN
- [ ] Split layout correct on desktop, stacked on mobile
- [ ] All social links work (open in new tab)
- [ ] Philosophy pillars render correctly
- [ ] "Work With Us" links to /contact
- [ ] Page has SEO metadata

## Files to Create/Modify
```
app/(site)/about/page.tsx      ← create
lib/sanity/queries.ts          ← add getSettingsQuery
```

## Sanity Query
```ts
export const getSettingsQuery = groq`
  *[_type == "settings"][0] {
    displayName, tagline, bio, profilePhoto,
    instagram, behance, email
  }
`
```

## Claude Code Prompt
```
Read CLAUDE.md, then implement US-06 (docs/user-stories/US-06-about.md).
Build about/page.tsx. Settings data from Sanity. Split layout desktop.
Profile photo via next/image + Sanity image CDN. Social links open new tab.
Philosophy section hardcoded (3 pillars).
```
