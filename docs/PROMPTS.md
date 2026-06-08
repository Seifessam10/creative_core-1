# PROMPTS.md — Creative Core Claude Code Prompts

> Copy-paste these exactly. One prompt per session. Never combine two stories.

---

## How Every Session Works

```bash
# Open terminal in project root
claude

# Paste the prompt below. Claude Code reads CLAUDE.md automatically.
# When done — always commit:
git add . && git commit -m "feat: US-XX description"
```

---

## SESSION 0 — Project Bootstrap

```
Create a new Next.js 14 app with: TypeScript yes, Tailwind yes,
App Router yes, src/ directory no, import alias @/*.

Install: framer-motion @sanity/client @sanity/image-url next-sanity
sanity zustand resend react-hook-form zod @portabletext/react
@hookform/resolvers lucide-react

Create folders: app/(site)/ app/(studio)/studio/[[...index]]/
components/layout/ components/home/ components/work/
components/contact/ components/ui/ lib/sanity/ lib/resend/
sanity/schemas/ styles/ public/images/

Add font variables to app/layout.tsx using next/font/google:
- Bebas_Neue weight 400, variable --font-bebas
- Space_Mono weights 400+700, variable --font-mono
- DM_Sans subsets latin, variable --font-sans

Add to tailwind.config.ts fontFamily:
  bebas: ['var(--font-bebas)', 'sans-serif']
  mono:  ['var(--font-mono)', 'monospace']
  sans:  ['var(--font-sans)', 'sans-serif']

Create .env.local with empty keys:
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
RESEND_API_KEY=

Run npm run dev — confirm it starts with no errors.
```

---

## SESSION 1 — Sanity CMS (US-08)

> Do this before any page. Everything else depends on it.

```
Read CLAUDE.md and docs/user-stories/US-08-sanity-cms.md.

Build the complete Sanity CMS foundation. Create these files exactly:

1. sanity/schemas/project.ts
   Fields: title (string, required), slug (slug, source:title, required),
   client (string), category (string, options: Apparel/Branding/Identity/Accessories),
   coverImage (image, hotspot:true), gallery (array of images, hotspot:true),
   description (array of blocks — Portable Text), tags (array of strings),
   featured (boolean, default false), publishedAt (datetime)

2. sanity/schemas/service.ts
   Fields: name (string, required), tagline (string), description (text),
   startingPrice (string), turnaround (string), visible (boolean, default true)

3. sanity/schemas/settings.ts — singleton
   Fields: displayName, tagline, bio (text), profilePhoto (image, hotspot),
   instagram, behance (url), email, inquiryEmail,
   acceptingInquiries (boolean, default true)
   Add: __experimental_actions: ['update', 'publish']

4. sanity/schemas/inquiry.ts
   Fields: name, email, projectType, budgetRange, timeline,
   brief (text), source, status (options: new/seen/replied, default: new)

5. sanity/sanity.config.ts — import all 4 schemas

6. app/(studio)/studio/[[...index]]/page.tsx — Studio route
   Add: export const dynamic = 'force-dynamic'

7. lib/sanity/client.ts — two exports:
   client (useCdn: true) and writeClient (token: SANITY_API_TOKEN)

8. lib/sanity/image.ts — urlFor helper

9. lib/sanity/queries.ts — all GROQ queries:
   getAllProjectsQuery, getFeaturedProjectsQuery, getProjectBySlugQuery,
   getRelatedProjectsQuery, getServicesQuery, getSettingsQuery,
   getContactSettingsQuery

10. .env.example — all env vars with comments

Run: npx tsc --noEmit — fix all TypeScript errors.
List every file created.
```

---

## SESSION 2 — Navigation (US-01)

```
Read CLAUDE.md and docs/user-stories/US-01-nav.md.

Build navigation. Create these files:

1. components/layout/Nav.tsx — 'use client'
   Fixed header, z-50, h-[64px], full width.
   Transparent bg at top → bg-[#080808] + border-bottom 1px solid #1e1e1e on scroll.
   Left: "CREATIVE CORE" font-bebas text-[1.3rem] tracking-[0.12em],
   chrome gradient text (linear-gradient 135deg, #e8e8e8, #888, #e8e8e8,
   -webkit-background-clip:text, -webkit-text-fill-color:transparent).
   Right: links Work/Services/About + CTA button.
   Links: font-mono text-[10px] uppercase tracking-[0.14em] color #444.
   Active (usePathname): color #e8e8e8. Hover: color #888.
   CTA "Start a Project" → /contact:
   border 1px solid #2a2a2a, font-mono text-[10px] uppercase px-4 py-2.
   Mobile: hide links, show Lucide Menu icon (20px color #555) → opens MobileMenu.

2. components/layout/MobileMenu.tsx — 'use client'
   Full-screen overlay, bg-[#080808].
   AnimatePresence + motion.div: opacity 0→1, y -8→0, 350ms ease-out.
   Links centered: font-bebas text-[48px] color #333, hover #e8e8e8.
   ESC key closes, body scroll locked when open.
   Close button: Lucide X top-right, color #333.
   Stagger links using AnimatedItem from components/ui/AnimatedSection.tsx.

3. Stub Footer in app/(site)/layout.tsx:
   "CREATIVE CORE © 2025" font-mono text-[10px] color #222,
   centered, border-top 1px solid #111, py-8.

4. app/(site)/layout.tsx:
   Add Nav + Footer. Wrap children in <main>.

Run npm run build — fix errors.
Test: nav renders, active state works, mobile menu opens/closes/ESC works.
```

---

## SESSION 3 — Hero Section (US-02)

```
Read CLAUDE.md, docs/user-stories/US-02-hero.md, docs/design-specs/DS-02-hero.md.

Build the homepage.

1. app/(site)/page.tsx — server component:
   Fetch getFeaturedProjectsQuery from Sanity (fallback: empty array).
   export const revalidate = 60.
   Render <Hero /> and <ProjectMarquee projects={projects} />.

2. components/home/Hero.tsx — 'use client':
   Section: h-screen bg-[#080808] flex flex-col items-center justify-center relative overflow-hidden.

   a. Logo mark — SVG 160px desktop / 110px mobile, centered.
      Draw a 4-point star using <path>. Points at top/bottom/left/right.
      Inner diamond shape. Color #c8c8c8. Below it: "CC" font-bebas text-[22px] tracking-[3px].
      Wrap in motion.div: opacity 0→1, scale 0.92→1, 800ms cubic-bezier(0.16,1,0.3,1).

   b. Tagline: font-bebas clamp(56px,8vw,80px) text-center tracking-[0.06em] color #e8e8e8 mt-7.
      Two lines each in an overflow-hidden wrapper.
      Inner span: translateY(100%)→0, 650ms cubic-bezier(0.16,1,0.3,1).
      Line 1 delay: 300ms. Line 2 delay: 420ms.
      Line 1: "WHERE DESIGN". Line 2: "BECOMES IDENTITY".

   c. Sub-tagline: "Apparel · Branding · Identity · Creative Direction"
      font-mono text-[10px] uppercase tracking-[0.18em] color #333 mt-5.
      opacity 0→1, delay 800ms, 400ms.

   d. Buttons row — flex gap-3 mt-9, opacity 0→1, delay 1000ms:
      "View Work" → /work: border 1px solid #2a2a2a font-mono text-[10px] uppercase px-7 py-3.
      "Start a Project" → /contact: same, color #444.

   e. Scroll indicator — absolute bottom-6 flex flex-col items-center gap-2:
      "scroll" font-mono text-[9px] tracking-[0.2em] color #1e1e1e.
      1px wide line h-6 bg-[#111], with animated inner line (CSS keyframes,
      slides top to bottom, 2s loop infinite, delay 1.2s).
      opacity 0→1, delay 1100ms.

3. components/home/ProjectMarquee.tsx — 'use client':
   Props: { projects: SanityProject[] }
   Two rows — row 1 scrolls left (40s), row 2 scrolls right (48s).
   CSS classes marquee-track marquee-track--left/right (from globals.css).
   Wrapper className="marquee-wrapper" (hover pauses both).
   Row 1 cards: w-[150px] h-[190px]. Row 2 cards: w-[150px] h-[160px].
   Images: next/image fill object-cover, urlFor from lib/sanity/image.ts.
   Hover: dark overlay bg-black/65, project name + category fade up.
   Left+right fade edges: absolute 60px wide, z-10, pointer-events-none,
   gradient #080808→transparent (and reverse).
   Render items twice (concat) for seamless loop.
   If no projects: 8 placeholder divs bg-[#111].
   Strip below: "16+ PROJECTS DELIVERED" left (font-bebas text-[36px] color #1e1e1e),
   "View All Work →" right linking /work (font-mono text-[10px] color #333).
   Border-top + border-bottom 1px solid #111.

Run npm run dev — verify hero animates on load, marquee scrolls, pauses on hover.
Check 390px mobile width.
```

---

## SESSION 4 — Portfolio Grid (US-03)

```
Read CLAUDE.md, docs/user-stories/US-03-portfolio-grid.md, docs/design-specs/DS-03-portfolio-grid.md.

Build /work page.

1. app/(site)/work/page.tsx — server component:
   Fetch getAllProjectsQuery. export const revalidate = 60.
   Metadata title "Work — Creative Core".
   Render <ProjectGrid projects={projects} />.

2. components/work/CategoryFilter.tsx — 'use client':
   Props: { active: string, onChange: (cat: string) => void, counts: Record<string,number> }
   Sticky top-[64px] z-40. bg-[#080808] border-bottom 1px solid #111 h-[44px].
   Tabs: All · Apparel · Branding · Identity · Accessories.
   Font-mono text-[9px] uppercase tracking-[0.14em].
   Default color #2e2e2e → hover #555 → active: #c8c8c8 + 2px border-bottom #c8c8c8.
   Count in parentheses: color #1e1e1e (active: #444).

3. components/work/ProjectCard.tsx — 'use client':
   Props: { project: SanityProject, index: number }
   motion.div, whileHover="hover", initial="rest", variants={cardHoverParent} from lib/motion.ts.
   RevealImage wrapper (from AnimatedSection): delay={index * 0.05}.
   Image: next/image fill object-cover, sizes="(max-width:768px) 50vw, 33vw".
   Hover overlay: motion.div variants={cardOverlay} (opacity 0→1).
   Title: motion.p font-bebas text-[18px] white, variants={cardTextSlide}.
   Category: motion.span font-mono text-[9px] #aaa, variants={cardCatSlide}.
   Arrow: Lucide ArrowUpRight 14px white top-right, appears with overlay.
   onClick: router.push('/work/' + project.slug.current).

4. components/work/ProjectGrid.tsx — 'use client':
   Props: { projects: SanityProject[] }
   Filter state: useState default 'all'. Sync with ?category= URL param.
   On change: router.replace with new param (shallow).
   Page header: flex justify-between items-end px-8 py-9.
   Left: category label font-bebas text-[56px]. Right: "{n} projects" font-mono text-[9px] #222.
   Grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[3px].
   AnimatePresence on grid. Items use AnimatedItem.
   Empty state: "NO {CATEGORY} WORK YET" font-bebas text-[32px] color #141414 col-span-3 py-32.
   Counts: compute from projects array, pass to CategoryFilter.

Run npm run build.
Test filter tabs, URL sync, mobile layout, image loading.
```

---

## SESSION 5 — Animations Layer (US-00)

```
Read CLAUDE.md and docs/user-stories/US-00-animation-foundation.md.

The files lib/motion.ts, components/ui/AnimatedSection.tsx,
components/ui/CustomCursor.tsx, styles/globals.css already exist.
Wire them into existing components — do not rewrite the components,
only add animation imports and wrappers.

Changes to make:

1. components/home/Hero.tsx:
   Replace CSS logo animation with motion.div using scaleReveal from lib/motion.ts.
   Replace CSS line animations with SplitText component (from AnimatedSection.tsx):
     Line 1: <SplitText text="WHERE DESIGN" delay={0.3} className="font-bebas ..." />
     Line 2: <SplitText text="BECOMES IDENTITY" delay={0.45} className="font-bebas ..." />
   Wrap sub-tagline in AnimatedSection variant="fadeIn" delay={0.8}.
   Wrap buttons in AnimatedSection variant="fadeUp" delay={1}.

2. components/work/ProjectCard.tsx:
   Confirm it uses cardHoverParent, cardOverlay, cardTextSlide, cardCatSlide from lib/motion.ts.
   Ensure RevealImage wraps the image with delay={index * 0.05}.

3. components/work/ProjectGrid.tsx:
   Wrap grid container in motion.div with staggerFast variant, initial="hidden" animate="visible".
   Ensure each card is wrapped in AnimatedItem.

4. app/(site)/layout.tsx:
   Add page transition — wrap {children} with AnimatePresence mode="wait".
   Wrap with motion.main using pageFade variant, key={pathname} (usePathname).
   DO NOT add CustomCursor yet — that is Phase 2.

Run npm run dev.
Test: hero SplitText reveals on load, grid stagger on /work, images curtain wipe on scroll.
Test prefers-reduced-motion: DevTools → Rendering → Emulate CSS prefers-reduced-motion: reduce.
Confirm nothing animates in reduced motion mode.
Run npm run build — zero errors.
```

---

## SESSION 6 — Project Detail (US-04)

```
Read CLAUDE.md and docs/user-stories/US-04-project-detail.md.

Build /work/[slug] page. One file: app/(site)/work/[slug]/page.tsx (server component).

generateStaticParams: fetch all slugs (*[_type=="project"]{"slug":slug.current}).
Fetch project by slug using getProjectBySlugQuery. Call notFound() if null.
Fetch related projects using getRelatedProjectsQuery.
export const revalidate = 60.
Metadata: title = project.title + " — Creative Core", OG image = coverImage.

Page sections (in order):

1. Back link: "← All Work" → /work. Font-mono text-[9px] uppercase color #333. px-8 pt-6.

2. Hero image: relative overflow-hidden max-h-[80vh].
   RevealImage wrapper. next/image fill object-cover.
   Overlay bottom-left p-8 md:p-16:
     Category tag: font-mono text-[10px] uppercase color #555 mb-2.
     Title: font-bebas clamp(40px,6vw,80px) color white.

3. Meta row: grid-cols-3 border-top border-bottom 1px solid #111 py-6 px-8.
   Client | Category | Year. Font-mono text-[10px] uppercase color #444.

4. Description: max-w-2xl mx-auto px-8 py-16.
   PortableText from @portabletext/react. Font-sans text-[15px] color #666 leading-relaxed.

5. Gallery: flex flex-col gap-[3px]. Each image in RevealImage wrapper.
   Use aspect-[3/4] for portrait images.

6. Related projects: px-8 py-16.
   AnimatedSection variant="clipWipe": "MORE WORK" font-bebas text-[48px] color #1e1e1e mb-8.
   Grid grid-cols-1 md:grid-cols-3 gap-[3px]. Reuse ProjectCard component.

7. CTA: text-center py-24 px-8 border-top 1px solid #111.
   "LIKE WHAT YOU SEE?" font-bebas text-[64px] color #1e1e1e.
   "Let's build something together." font-sans text-[15px] color #555.
   Link /contact: "Start a Project →" font-mono text-[11px] uppercase border 1px solid #2a2a2a px-8 py-3.

Run npm run build. Test with a real project slug from Sanity.
```

---

## SESSION 7 — Services Page (US-05)

```
Read CLAUDE.md and docs/user-stories/US-05-services.md.

Build /services page in app/(site)/services/page.tsx (server component).
Fetch getServicesQuery. export const revalidate = 60.

Sections:

1. Header px-8 pt-16 pb-12:
   "WHAT WE DO" font-mono text-[9px] uppercase color #222 mb-3.
   AnimatedSection variant="clipWipe": "SERVICES" font-bebas clamp(56px,8vw,96px).

2. Services grid px-8 pb-16, grid-cols-1 md:grid-cols-2, gap-px bg-[#111]:
   AnimatedSection variant="staggerSlow" wraps all cards.
   Each card (AnimatedItem), bg-[#080808] p-8:
     Name: font-bebas text-[32px] color #888 mb-2.
     Tagline: font-sans text-[14px] color #444 mb-6.
     hr 1px solid #111 mb-6.
     Description: font-sans text-[14px] color #555 leading-relaxed mb-8.
     Bottom flex justify-between:
       Left: "From [price]" font-mono text-[12px] color #c8c8c8.
             "Turnaround: [x]" font-mono text-[10px] color #222 mt-1.
       Right: "Inquire →" link /contact font-mono text-[9px] color #333 hover #888.

3. Process section bg-[#0a0a0a] border-top 1px solid #111 px-8 py-16:
   AnimatedSection variant="clipWipe": "HOW IT WORKS" font-bebas text-[48px] color #1e1e1e mb-12.
   4 steps grid-cols-1 md:grid-cols-4 gap-8 (hardcoded — no CMS):
   AnimatedSection variant="staggerSlow":
     Each (AnimatedItem): step number font-bebas text-[80px] color #111 mb-2,
     name font-mono text-[10px] uppercase color #444 mb-3,
     description font-sans text-[13px] color #333 leading-relaxed.
   Steps: 01/BRIEF/Fill the inquiry form. 02/CONCEPT/Align on direction.
          03/DESIGN/Produce and iterate. 04/DELIVERY/Final files handed over.

4. CTA strip px-8 py-12 flex justify-between border-top 1px solid #111:
   "READY TO START?" font-bebas text-[40px] color #1e1e1e.
   "Start a Project →" link /contact font-mono text-[10px] color #333.

Run npm run build.
```

---

## SESSION 8 — About Page (US-06)

```
Read CLAUDE.md and docs/user-stories/US-06-about.md.

Build /about page in app/(site)/about/page.tsx (server component).
Fetch getSettingsQuery. export const revalidate = 60.

Sections:

1. Label px-8 pt-16: "ABOUT THE STUDIO" font-mono text-[9px] uppercase color #222.

2. Split layout grid-cols-1 md:grid-cols-2 gap-px px-8 py-12 bg-[#111]:

   Left col bg-[#080808] pr-8 md:pr-16 py-8:
     AnimatedSection variant="clipWipe":
       settings.displayName font-bebas clamp(48px,6vw,80px) color #e8e8e8 mb-8.
     Bio: font-sans text-[15px] color #666 leading-relaxed mb-8. (plain text field)
     Social links flex gap-6 mb-8:
       Each: Lucide icon 14px color #333 + text font-mono text-[10px] color #444.
       Instagram, Email, Behance (if exists). Open _blank.
     "Work With Us →" link /contact:
       font-mono text-[10px] uppercase border 1px solid #1e1e1e px-6 py-3.

   Right col bg-[#080808] py-8:
     RevealImage className="relative aspect-[3/4]":
       next/image from urlFor(settings.profilePhoto).width(800).url().
       fill object-cover object-top.
     If no photo: placeholder div bg-[#0f0f0f] with "CC" centered.

3. Philosophy bg-[#0a0a0a] border-top 1px solid #111 px-8 py-16:
   AnimatedSection variant="clipWipe": "THE APPROACH" font-bebas text-[48px] color #1e1e1e mb-12.
   3 pillars grid-cols-1 md:grid-cols-3 gap-8:
   AnimatedSection variant="staggerSlow":
     Each (AnimatedItem): number font-mono text-[9px] color #222 mb-3,
     title font-mono text-[10px] uppercase tracking-[0.12em] color #444 mb-3,
     description font-sans text-[13px] color #333 leading-relaxed.
   Pillars (hardcoded):
     01 / "DESIGN THAT MEANS SOMETHING" / Not decoration. Every element earns its place.
     02 / "UNDERGROUND, NOT UNDERGROUND" / Professional quality with an edge. No compromise.
     03 / "YOUR IDENTITY, OUR CRAFT" / The work serves your vision, not our portfolio.

Run npm run build.
```

---

## SESSION 9 — Contact Form (US-07)

```
Read CLAUDE.md, docs/user-stories/US-07-contact-form.md, docs/design-specs/DS-04-contact-form.md.

Build the complete contact + inquiry pipeline. Most functional story — be precise.

1. app/api/inquiry/route.ts — POST handler:
   Validate with zod: name (min 2), email (email), projectType (min 1),
   budgetRange (min 1), timeline (optional), brief (min 20), source (optional).
   On success:
     a. writeClient.create({ _type:'inquiry', status:'new', ...data })
     b. Resend: notify designer (to: inquiryEmail, subject: "New Inquiry — {type} from {name}")
     c. Resend: confirm submitter (to: data.email, subject: "We got your message — Creative Core")
   Return 200 { success:true } or 400/500 with { error }.

2. lib/resend/sendInquiry.ts:
   sendNotification(data, recipientEmail) and sendConfirmation(data) functions.
   Plain text emails.

3. components/contact/InquiryForm.tsx — 'use client':
   useForm + zodResolver. Fields:
   Full Name (text), Email (email), Project Type (select: Apparel Mockup/Brand Identity/
   Logo Design/Campaign Visuals/Other), Budget Range (select: Under $200/$200–$500/
   $500–$1k/$1k–$2.5k/$2.5k+), Timeline (select optional: ASAP/1–2 weeks/2–4 weeks/
   1–3 months/Flexible), Project Brief (textarea min 20 chars), Source (select optional).

   Input styles: bg-[#0f0f0f] border border-[#1e1e1e] text-[#e8e8e8] px-4 py-3
   font-sans text-[14px] placeholder-[#333] rounded-none w-full focus:border-[#444] outline-none.
   Error: border-[#663333]. Error message: font-mono text-[10px] color #cc4444 mt-1.
   Field label: font-mono text-[10px] uppercase tracking-[0.12em] color #444 mb-2.
   Field gap: mb-6.

   Submit button full-width h-[52px] font-bebas text-[18px] tracking-[0.1em]:
   Default: bg-transparent border border-[#1e1e1e] text-[#e8e8e8].
   Loading: opacity-60 cursor-not-allowed text "SENDING...".
   Success: bg-[#0f140f] border-[#1e2e1e] text-[#639922] text "✓ INQUIRY SENT".
   Error: bg-[#140f0f] border-[#2e1e1e] text-[#cc4444] text "FAILED — EMAIL US DIRECTLY".

4. app/(site)/contact/page.tsx — server component:
   Fetch getContactSettingsQuery (acceptingInquiries, instagram, email, inquiryEmail).
   export const revalidate = 60.
   Grid grid-cols-1 md:grid-cols-[1fr_380px]:

   Left px-8 pt-16 pb-16:
     "NEW PROJECT" label. AnimatedSection clipWipe: "START A PROJECT" font-bebas clamp(48px,6vw,80px).
     Sub: font-sans text-[14px] color #555 mb-12.
     If !acceptingInquiries: show "CURRENTLY AT CAPACITY" message instead of form.
     Else: <InquiryForm />.

   Right sticky top-[64px] px-8 pt-16 border-left 1px solid #111 (hidden mobile):
     "CONTACT" label. "LET'S TALK" font-bebas text-[40px] color #333 mb-8.
     Email row + Instagram row (Lucide icons + text font-mono text-[11px] color #555).
     Divider. "Typical response: 24–48 hours" font-mono text-[9px] color #222.

Run npm run build — zero errors.
If Resend not configured: wrap email calls in try/catch, log error, don't fail the request.
Test form validation — all required fields show errors when empty.
```

---

## SESSION 10 — Deploy (US-09)

```
Read CLAUDE.md and docs/user-stories/US-09-deploy.md.

Prepare for production. Do not deploy — just make the codebase production-ready.

1. npm run build — fix every error.
2. npx tsc --noEmit — fix every TypeScript error.
3. npm run lint — fix every warning.

4. next.config.ts — add Sanity image domain:
   images: { remotePatterns: [{ protocol:'https', hostname:'cdn.sanity.io' }] }

5. Every page.tsx must have:
   export const revalidate = 60.
   export const metadata (or generateMetadata) with title + description.

6. Every next/image must have: alt text + (fill with parent relative+height, or explicit w+h) + sizes.

7. app/(studio)/studio/[[...index]]/page.tsx:
   export const dynamic = 'force-dynamic' — confirm it's there.

8. All API routes: check SANITY_API_TOKEN and RESEND_API_KEY exist,
   return 500 with clear message if missing.

9. Create public/robots.txt:
   User-agent: *
   Allow: /
   Sitemap: https://creativecore.pro/sitemap.xml

10. Final npm run build — must pass with zero errors and zero warnings.

List every issue found and fixed.
Confirm: zero errors, zero warnings.
```

---

## BONUS — Bug Fix

```
Bug in [filename].

Error: [paste full error]

Relevant code:
[paste the relevant section]

Expected behaviour: [describe it]

Fix only this issue. Show me the diff before applying.
```

---

## BONUS — Design Tweak

```
[ComponentName] needs these changes:
1. [Specific change — e.g. "project title font size: 22px not 18px"]
2. [Change 2]

Do not touch anything else. Show diff before applying.
```

---

## The Golden Rules

1. One session = one story. Never combine.
2. Always read CLAUDE.md at session start.
3. npm run build after every session — fix before committing.
4. Commit after every session.
5. Design decisions → come back to Claude.ai (here).
6. Bugs and code → stay in Claude Code.
