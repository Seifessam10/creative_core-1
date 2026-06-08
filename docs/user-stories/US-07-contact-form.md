# US-07 — Contact / Inquiry Form
**Status**: [ ] Todo | **Phase**: 1 | **Priority**: P1

---

## Story
> As a potential client, I can fill out a structured inquiry form that captures
> my project details, so Creative Core receives everything they need to respond
> with a relevant proposal — and I get a confirmation email.

---

## Design Spec

### Page Layout
- Left (60%): form
- Right (40%): contact info + social links (sticky on desktop)
- Mobile: stacked, contact info below form

### Right Panel Content
- Heading: Bebas Neue "LET'S TALK"
- Email: `hello@creativecore.pro` (from Sanity settings)
- Instagram: `@creativecore` with link
- Response time note: Space Mono, muted — "Typical response: 24–48 hours"
- Toggle note: if `acceptingInquiries == false` in Sanity → show "Currently at capacity — check back soon" and disable form

### Form Fields
All styled with dark input aesthetic: `bg: var(--cc-surface)`, `border: 1px solid var(--cc-border)`, text `var(--cc-text)`

| Field | Type | Required | Options |
|-------|------|----------|---------|
| Full Name | text | Yes | — |
| Email | email | Yes | — |
| Project Type | select | Yes | Apparel Mockup · Brand Identity · Logo Design · Campaign Visuals · Other |
| Budget Range | select | Yes | Under $200 · $200–$500 · $500–$1,000 · $1,000–$2,500 · $2,500+ |
| Timeline | select | No | ASAP · 1–2 weeks · 2–4 weeks · 1–3 months · Flexible |
| Project Brief | textarea | Yes | placeholder: "Tell us about your project..." min 3 rows |
| How did you find us? | select | No | Instagram · Referral · Google · Other |

### Submit Button
- Full width, Bebas Neue 18px: "SEND INQUIRY"
- Default: `border: 1px solid var(--cc-border)`, `color: var(--cc-text)`
- Hover: border lightens, subtle bg
- Loading state: "SENDING..." with spinner
- Success state: check icon + "Inquiry sent. We'll be in touch within 48 hours."
- Error state: "Something went wrong. Email us directly at hello@creativecore.pro"

### Validation (react-hook-form + zod)
```ts
const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  projectType: z.string().min(1),
  budgetRange: z.string().min(1),
  timeline: z.string().optional(),
  brief: z.string().min(20, "Please describe your project in at least 20 characters"),
  source: z.string().optional(),
})
```

## API Route: `/api/inquiry`
POST handler that:
1. Validates body with zod schema
2. Creates Sanity document (`_type: "inquiry"`) via write token
3. Sends email via Resend to `hello@creativecore.pro`
4. Sends confirmation email to submitter
5. Returns `{ success: true }` or `{ error: message }`

## Acceptance Criteria
- [ ] All form fields render with correct types and options
- [ ] Validation runs on submit — inline errors per field
- [ ] Submit POSTs to `/api/inquiry`
- [ ] Inquiry saved to Sanity on success
- [ ] Notification email sent to designer
- [ ] Confirmation email sent to client
- [ ] Success state shows after submit
- [ ] Form is disabled if `acceptingInquiries == false` in Sanity
- [ ] Right panel shows contact info from Sanity settings
- [ ] Fully responsive

## Files to Create/Modify
```
app/(site)/contact/page.tsx           ← create (server — fetch settings)
components/contact/InquiryForm.tsx    ← create ('use client')
app/api/inquiry/route.ts              ← create (API route handler)
lib/resend/sendInquiry.ts             ← create (email templates)
lib/sanity/queries.ts                 ← add getContactSettingsQuery
```

## Claude Code Prompt
```
Read CLAUDE.md, then implement US-07 (docs/user-stories/US-07-contact-form.md).
Build contact page + InquiryForm component using react-hook-form + zod.
API route at /api/inquiry: save to Sanity (write token) + send 2 emails via Resend.
Dark form styling matching design system. Loading/success/error states required.
```

## Email Templates

### To Designer
```
Subject: New Inquiry — {projectType} from {name}
Body: Name, email, project type, budget, timeline, brief, source
```

### To Client
```
Subject: We got your message — Creative Core
Body: "Thanks {name}, we received your inquiry about {projectType}.
We'll review your brief and get back to you within 24–48 hours.
— Creative Core"
```
