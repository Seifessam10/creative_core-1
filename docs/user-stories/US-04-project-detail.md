# US-04 — Project Detail Page
**Status**: [ ] Todo | **Phase**: 1 | **Priority**: P1

---

## Story
> As a visitor who clicked on a project, I see a full-detail view of that project
> with all images, description, and client info, so I can evaluate the quality
> of the work and decide to inquire.

---

## Design Spec

### Route
`/work/[slug]` — statically generated at build time via `generateStaticParams()`

### Layout
- Full-width, no max-width container on images
- Black background throughout

### Hero Image
- First image (coverImage) — full viewport width, max height 80vh
- `object-fit: cover`, `object-position: center`
- Project title overlaid bottom-left: Bebas Neue, 72px desktop / 40px mobile
- Category tag: Space Mono, 10px, `var(--cc-muted)`

### Meta Row (below hero image)
- 3 columns: Client name | Category | Year
- Font: Space Mono, 11px, uppercase
- Separator: `1px solid var(--cc-border)`

### Description
- Max-width 680px, centered
- DM Sans, 16px, `var(--cc-muted)`, line-height 1.8
- Padding: `py-16`

### Gallery
- Remaining images (gallery array from Sanity)
- Full-width stack — each image full width, gap-2 between
- Alternating: some full-width, some 2-column grid (based on image count)

### Related Projects (bottom)
- Heading: Bebas Neue "MORE WORK"
- 3 project cards (same as US-03 ProjectCard component), same category preferred
- Sanity query: `*[_type == "project" && category == $category && slug.current != $slug][0..2]`

### CTA Section
- Bebas Neue: "LIKE WHAT YOU SEE?"
- Sub: DM Sans, muted: "Let's build something together."
- Button: "Start a Project" → `/contact`

## Acceptance Criteria
- [ ] Page generates static paths for all published projects at build time
- [ ] Hero image renders full-width with title overlay
- [ ] Meta row shows client, category, year
- [ ] Description renders from Sanity rich text (Portable Text)
- [ ] All gallery images render in sequence
- [ ] Related projects section shows ≤ 3 cards from same category
- [ ] CTA section at bottom with link to /contact
- [ ] Back button or breadcrumb to /work
- [ ] SEO: page title = project title + "Creative Core", OG image = cover image
- [ ] 404 if slug not found (`notFound()`)

## Files to Create/Modify
```
app/(site)/work/[slug]/page.tsx         ← create (server component)
lib/sanity/queries.ts                   ← add getProjectBySlugQuery, getRelatedProjectsQuery
```

## Sanity Queries
```ts
export const getProjectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id, title, slug, client, category, coverImage,
    gallery[], description, tags[], publishedAt
  }
`
export const getRelatedProjectsQuery = groq`
  *[_type == "project" && category == $category && slug.current != $slug] | order(_createdAt desc) [0..2] {
    _id, title, slug, client, category, coverImage
  }
`
```

## Claude Code Prompt
```
Read CLAUDE.md, then implement US-04 (docs/user-stories/US-04-project-detail.md).
Build /work/[slug]/page.tsx as a static server component with generateStaticParams.
Full-width hero image with title overlay. Portable Text for description.
Reuse ProjectCard from US-03 for related projects. Add SEO metadata.
```

## Notes
- Use `@portabletext/react` for rendering Sanity block content
- `generateStaticParams` fetches all slugs: `*[_type == "project"]{ "slug": slug.current }`
- ISR: `export const revalidate = 60` at page level
