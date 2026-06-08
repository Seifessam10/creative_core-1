# US-03 — Portfolio Grid + Category Filter
**Status**: [ ] Todo | **Phase**: 1 | **Priority**: P1

---

## Story
> As a potential client visiting /work, I can browse all Creative Core projects in a
> visual grid, filter by category, and click any project to see more detail,
> so I can quickly find work relevant to what I need.

---

## Design Spec

### Filter Bar
- Position: sticky top (below nav), `bg: var(--cc-bg)`, `border-b: var(--cc-border)`
- Filter tabs: All · Apparel · Branding · Identity · Accessories
- Font: Space Mono, 10px, uppercase, letter-spacing 0.12em
- Active tab: `color: var(--cc-text)`, underline `2px solid var(--cc-text)`
- Inactive: `color: var(--cc-muted)`, no underline
- Tab click: filters grid with animation (Framer Motion layout animation)

### Project Grid
- Layout: CSS grid, `columns: 2` on mobile, `columns: 3` on desktop (`lg:`)
- Gap: `gap-2` (8px) — tight grid, images breathe against black
- Each cell: project cover image (aspect ratio varies — portrait 3:4 or landscape 4:3)
- No card borders, no rounded corners — raw image on black
- Item count: all published projects from Sanity

### Project Card (each grid item)
- Default: full image, no overlay
- Hover state:
  - Slight scale: `scale(1.01)`, transition 300ms ease
  - Dark overlay: `bg-black/60`
  - Project name: Bebas Neue, 20px, white
  - Category tag: Space Mono, 9px, `var(--cc-muted)`
  - Arrow icon bottom-right
- Click: opens Project Modal (US-04) OR navigates to `/work/[slug]`

### Empty State
- If no projects in a category: "NO [CATEGORY] WORK YET" in Bebas Neue, centered, muted

## Acceptance Criteria
- [ ] Page loads all published projects from Sanity
- [ ] Filter tabs render for all categories with counts
- [ ] Clicking a filter shows only matching projects with smooth layout animation
- [ ] "All" tab shows every project
- [ ] Each project card shows cover image
- [ ] Hover state shows name + category overlay
- [ ] Clicking a card opens the project detail (modal or page — see US-04)
- [ ] Grid is responsive: 1 col mobile, 2 col tablet, 3 col desktop
- [ ] Empty state renders if no results
- [ ] Filter selection persists on back-navigation (URL query param `?category=apparel`)

## Files to Create/Modify
```
app/(site)/work/page.tsx              ← create (server component, fetches all projects)
components/work/ProjectGrid.tsx       ← create (client — handles filter state)
components/work/ProjectCard.tsx       ← create (client — hover animation)
components/work/CategoryFilter.tsx    ← create (client — tab state)
lib/sanity/queries.ts                 ← add getAllProjectsQuery
```

## Sanity Query
```ts
export const getAllProjectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) {
    _id, title, slug, client, category, coverImage, tags
  }
`
```

## Claude Code Prompt
```
Read CLAUDE.md, then implement US-03 (docs/user-stories/US-03-portfolio-grid.md).
Build the work page with ProjectGrid, ProjectCard, and CategoryFilter components.
Use Framer Motion `layoutId` for filter animation. Category filter should update URL params.
Grid: 3 columns desktop, 2 tablet, 1 mobile. No card borders.
```

## Notes
- Use `useSearchParams` + `useRouter` to sync filter with URL
- Framer Motion `<AnimatePresence>` + `layout` prop for grid reflow animation
- `next/image` with `fill` and `object-cover` for all project images
- Image sizes: `sizes="(max-width: 768px) 50vw, 33vw"`
