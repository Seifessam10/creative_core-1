# US-05 — Services Page
**Status**: [ ] Todo | **Phase**: 1 | **Priority**: P1

---

## Story
> As a potential client, I can read what Creative Core offers, understand pricing,
> and see the process, so I know what to expect before reaching out.

---

## Design Spec

### Page Header
- Bebas Neue, 96px: "WHAT WE DO"
- Space Mono, 11px muted: "Services offered by Creative Core"

### Services Grid
- Data from Sanity `service` documents (only `visible: true`)
- 2-column grid on desktop, 1-column mobile
- Each service card:
  - Top: service name — Bebas Neue, 32px
  - Tagline: DM Sans, 14px, muted
  - Separator line
  - Description: DM Sans, 14px, line-height 1.7
  - "From [price]" — Space Mono, 12px, `var(--cc-chrome)` color
  - "Turnaround: [X days]" — Space Mono, 11px, muted
  - "Inquire →" link to /contact

### Process Section
- Heading: "HOW IT WORKS" — Bebas Neue
- 4 steps in a horizontal row (desktop) / vertical stack (mobile):
  1. Brief — You fill the inquiry form with your vision
  2. Concept — We align on direction and scope
  3. Design — We produce and iterate
  4. Delivery — Final files, ready to use
- Step number: large Bebas Neue, very muted (decorative)

## Acceptance Criteria
- [ ] Services load from Sanity (visible only)
- [ ] Each service card shows name, tagline, description, price, turnaround
- [ ] Process steps render correctly in 4-step layout
- [ ] "Inquire →" links to /contact
- [ ] Empty state if no services published

## Files to Create/Modify
```
app/(site)/services/page.tsx   ← create
lib/sanity/queries.ts          ← add getServicesQuery
```

## Sanity Query
```ts
export const getServicesQuery = groq`
  *[_type == "service" && visible == true] | order(_createdAt asc) {
    _id, name, tagline, description, startingPrice, turnaround
  }
`
```

## Claude Code Prompt
```
Read CLAUDE.md, then implement US-05 (docs/user-stories/US-05-services.md).
Build services/page.tsx. Services from Sanity. Include process steps section (hardcoded — no CMS needed).
2-col grid desktop, 1-col mobile. Chrome color for price.
```
