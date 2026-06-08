# CLAUDE.md — Creative Core Website

> Read this file at the start of every session. Never skip it.

## Project Identity

- **Product**: creativecore.pro — portfolio + client platform for Creative Core design studio
- **Domain**: www.creativecore.pro (already owned)
- **Studio CMS**: studio.creativecore.pro (Sanity Studio)
- **Repo**: github.com/[username]/creative-core
- **Deploy**: Vercel (auto-deploy on push to `main`)

## What We're Building

A dark, editorial-grade portfolio website for a graphic designer / streetwear design studio.
Two goals: (1) showcase projects beautifully, (2) convert visitors into paying clients via a structured inquiry form.

---

## Tech Stack — Non-Negotiable

| Layer     | Tool                           | Notes                                                                               |
| --------- | ------------------------------ | ----------------------------------------------------------------------------------- |
| Framework | Next.js 14 (App Router)        | SSG + ISR. No Pages Router.                                                         |
| Styling   | Tailwind CSS v3                | Config in `tailwind.config.ts`. No inline style tags unless absolutely necessary. |
| Animation | Framer Motion                  | For page transitions, scroll reveals, marquee, cursor                               |
| CMS       | Sanity v3                      | Schemas in `/sanity/schemas/`. GROQ queries in `/lib/sanity/queries.ts`         |
| Email     | Resend                         | For inquiry form notifications                                                      |
| Hosting   | Vercel                         | `vercel.json` in root                                                             |
| Language  | TypeScript                     | Strict mode. No `any`.                                                            |
| State     | Zustand                        | Only for UI state (filter active, modal open). No server state in Zustand.          |
| Fonts     | Google Fonts via `next/font` | Bebas Neue, Space Mono, DM Sans                                                     |

---

## Design System — Always Follow These

### Colors (CSS variables in `globals.css`)

```css
--cc-bg:        #080808;   /* page background */
--cc-surface:   #0f0f0f;   /* cards, panels */
--cc-border:    #1e1e1e;   /* all borders */
--cc-text:      #e8e8e8;   /* primary text */
--cc-muted:     #666666;   /* secondary text */
--cc-subtle:    #333333;   /* disabled / hints */
--cc-chrome:    #c8c8c8;   /* silver/chrome accent — logo color */
```

### Typography

```
Display / H1-H2:  Bebas Neue — letter-spacing: 0.08em, always uppercase
Labels / Meta:    Space Mono — letter-spacing: 0.1em, uppercase, 10-12px
Body / Prose:     DM Sans — weight 300/400, line-height 1.7
```

### Spacing Scale

- Section padding: `py-24 md:py-32`
- Container: `max-w-[1400px] mx-auto px-6 md:px-12`
- Card gap: `gap-2` (8px) for grid, `gap-6` for content

### Border / Radius

- All borders: `1px solid var(--cc-border)`
- Border radius: `rounded-none` for most things (editorial feel), `rounded-sm` (4px) max

### Motion Defaults

```ts
// Standard fade-up reveal
initial: { opacity: 0, y: 20 }
animate: { opacity: 1, y: 0 }
transition: { duration: 0.5, ease: 'easeOut' }
// Stagger children: 0.08s apart
```

---

## Folder Structure

```
creative-core/
├── app/
│   ├── (site)/                   # public-facing routes
│   │   ├── layout.tsx            # root layout — nav + footer
│   │   ├── page.tsx              # Home / Hero
│   │   ├── work/
│   │   │   ├── page.tsx          # Portfolio grid
│   │   │   └── [slug]/page.tsx   # Project detail
│   │   ├── services/page.tsx
│   │   ├── about/page.tsx
│   │   └── contact/page.tsx
│   └── (studio)/                 # Sanity Studio route
│       └── studio/[[...index]]/page.tsx
├── components/
│   ├── layout/
│   │   ├── Nav.tsx
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   └── ProjectMarquee.tsx
│   ├── work/
│   │   ├── ProjectGrid.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectModal.tsx
│   │   └── CategoryFilter.tsx
│   ├── contact/
│   │   └── InquiryForm.tsx
│   └── ui/
│       ├── SectionHeading.tsx
│       └── CustomCursor.tsx
├── lib/
│   ├── sanity/
│   │   ├── client.ts             # Sanity client config
│   │   ├── queries.ts            # All GROQ queries
│   │   └── image.ts              # urlFor helper
│   └── resend/
│       └── sendInquiry.ts
├── sanity/
│   ├── schemas/
│   │   ├── project.ts
│   │   ├── service.ts
│   │   ├── settings.ts
│   │   └── inquiry.ts
│   └── sanity.config.ts
├── public/
│   ├── fonts/                    # fallback only — use next/font
│   └── images/
│       └── cc-logo.png
├── styles/
│   └── globals.css               # CSS variables + base styles
├── CLAUDE.md                     # ← this file
├── AGENTS.md                     # ← Codex agent instructions
└── docs/
    ├── PRD.md
    ├── user-stories/
    │   ├── US-01-nav.md
    │   ├── US-02-hero.md
    │   ├── US-03-portfolio-grid.md
    │   ├── US-04-project-detail.md
    │   ├── US-05-services.md
    │   ├── US-06-about.md
    │   ├── US-07-contact-form.md
    │   ├── US-08-sanity-cms.md
    │   └── US-09-deploy.md
    └── design-specs/
        ├── DS-01-design-system.md
        ├── DS-02-hero.md
        ├── DS-03-portfolio-grid.md
        ├── DS-04-contact-form.md
        └── DS-05-animations.md
```

---

## Sanity Content Types (Summary)

Full schemas in `/sanity/schemas/`. Quick reference:

**Project**: `title`, `slug`, `client`, `category` (Apparel|Branding|Identity|Accessories), `coverImage`, `gallery[]`, `description`, `tags[]`, `featured` (bool), `publishedAt`, `_createdAt`

**Service**: `name`, `tagline`, `description`, `startingPrice`, `turnaround`, `visible`

**Settings** (singleton): `displayName`, `tagline`, `bio`, `profilePhoto`, `instagram`, `behance`, `email`, `inquiryEmail`, `acceptingInquiries`

**Inquiry**: `name`, `email`, `projectType`, `budgetRange`, `timeline`, `brief`, `status` (new|seen|replied), `_createdAt`

---

## Key Rules for Claude Code Sessions

1. **Never hardcode content** — all text, images, prices come from Sanity via GROQ
2. **Mobile-first** — write Tailwind mobile styles first, then `md:` and `lg:` breakpoints
3. **No placeholder images** — use Sanity image CDN or leave an empty state component
4. **One component per file** — no 500-line files
5. **ISR revalidation** — every `fetch()` from Sanity must have `{ next: { revalidate: 60 } }`
6. **Form submissions** — POST to `/api/inquiry` route handler, which saves to Sanity AND sends email via Resend
7. **Framer Motion** — wrap animated sections in `<motion.div>`, use `useInView` for scroll triggers
8. **Never use `<img>`** — always `next/image` with `fill` or explicit `width/height`

---

## Environment Variables Required

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=           # write token for form submissions
RESEND_API_KEY=
```

---

## How Sessions Work

Each session should target **one user story** from `docs/user-stories/`.
Start every session with:

```
"Read CLAUDE.md, then implement [US-XX filename]"
```

Claude Code will read the user story, understand the acceptance criteria, and build the component. When done, mark the story status as `[x] Done` in the story file.
