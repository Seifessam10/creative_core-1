# US-08 — Sanity CMS Setup
**Status**: [ ] Todo | **Phase**: 1 | **Priority**: P0 (blocks data for all other stories)

---

## Story
> As the Creative Core designer, I have a working Sanity Studio at
> studio.creativecore.pro where I can manage all site content without
> touching code.

---

## What to Build
All four schemas + Sanity config + Studio route in Next.js app.

### Schema: Project
```ts
// sanity/schemas/project.ts
{
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', type: 'slug', options: { source: 'title' }, validation: Rule => Rule.required() },
    { name: 'client', type: 'string' },
    { name: 'category', type: 'string', options: { list: ['Apparel','Branding','Identity','Accessories'] } },
    { name: 'coverImage', type: 'image', options: { hotspot: true } },
    { name: 'gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] },
    { name: 'description', type: 'array', of: [{ type: 'block' }] },
    { name: 'tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'featured', type: 'boolean', initialValue: false },
    { name: 'publishedAt', type: 'datetime' },
  ]
}
```

### Schema: Service
```ts
{
  name: 'service', title: 'Service', type: 'document',
  fields: [
    { name: 'name', type: 'string', validation: Rule => Rule.required() },
    { name: 'tagline', type: 'string' },
    { name: 'description', type: 'text' },
    { name: 'startingPrice', type: 'string' },
    { name: 'turnaround', type: 'string' },
    { name: 'visible', type: 'boolean', initialValue: true },
  ]
}
```

### Schema: Settings (singleton)
```ts
{
  name: 'settings', title: 'Site Settings', type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    { name: 'displayName', type: 'string' },
    { name: 'tagline', type: 'string' },
    { name: 'bio', type: 'text' },
    { name: 'profilePhoto', type: 'image', options: { hotspot: true } },
    { name: 'instagram', type: 'string' },
    { name: 'behance', type: 'url' },
    { name: 'email', type: 'string' },
    { name: 'inquiryEmail', type: 'string' },
    { name: 'acceptingInquiries', type: 'boolean', initialValue: true },
  ]
}
```

### Schema: Inquiry
```ts
{
  name: 'inquiry', title: 'Inquiry', type: 'document',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'projectType', type: 'string' },
    { name: 'budgetRange', type: 'string' },
    { name: 'timeline', type: 'string' },
    { name: 'brief', type: 'text' },
    { name: 'source', type: 'string' },
    { name: 'status', type: 'string', options: { list: ['new','seen','replied'] }, initialValue: 'new' },
  ]
}
```

## Acceptance Criteria
- [ ] All 4 schemas defined in `/sanity/schemas/`
- [ ] `sanity.config.ts` imports all schemas
- [ ] Studio accessible at `/studio` route in Next.js app
- [ ] Sanity client configured in `lib/sanity/client.ts`
- [ ] `urlFor` image helper in `lib/sanity/image.ts`
- [ ] All GROQ queries defined in `lib/sanity/queries.ts`
- [ ] Env variables documented in `.env.example`

## Files to Create
```
sanity/schemas/project.ts
sanity/schemas/service.ts
sanity/schemas/settings.ts
sanity/schemas/inquiry.ts
sanity/sanity.config.ts
app/(studio)/studio/[[...index]]/page.tsx
lib/sanity/client.ts
lib/sanity/queries.ts
lib/sanity/image.ts
.env.example
```

## Claude Code Prompt
```
Read CLAUDE.md, then implement US-08 (docs/user-stories/US-08-sanity-cms.md).
Set up all 4 Sanity schemas, studio route, client, image helper, and all GROQ queries.
This is the data foundation — do it before any page components.
```
