# US-09 — Deploy to creativecore.pro
**Status**: [ ] Todo | **Phase**: 1 | **Priority**: P1 (final step)

---

## Story
> As the Creative Core team, we ship the live website to creativecore.pro with
> correct DNS, all environment variables set, and Sanity webhooks configured
> so content updates go live automatically.

---

## Steps (human-executed, not Claude Code)

### 1. Vercel Setup
```bash
# Install Vercel CLI
npm i -g vercel

# In project root
vercel

# Follow prompts:
# - Link to existing project or create new
# - Framework: Next.js (auto-detected)
# - Root dir: ./
```

### 2. Environment Variables in Vercel
Add all from `.env.example`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID    = [from sanity.io/manage]
NEXT_PUBLIC_SANITY_DATASET       = production
SANITY_API_TOKEN                 = [write token from sanity.io/manage → API → Tokens]
RESEND_API_KEY                   = [from resend.com dashboard]
```

### 3. Domain Setup
```
In Vercel project → Settings → Domains:
Add: creativecore.pro
Add: www.creativecore.pro (redirect to apex)

At domain registrar (where creativecore.pro is registered):
A record:    @ → 76.76.21.21
CNAME:       www → cname.vercel-dns.com
```

### 4. Sanity Studio Subdomain
```
Option A: Deploy studio as separate Vercel project at studio.creativecore.pro
  - sanity deploy (in /sanity folder) → hosted by Sanity
  - Add CNAME: studio → [sanity-provided URL]

Option B: Studio served from /studio route in main Next.js app (simpler)
  - No extra config needed — already in app/(studio)/studio/
  - Access at creativecore.pro/studio
```

### 5. Sanity Webhook (auto-rebuild on content change)
```
In sanity.io/manage → API → Webhooks → Add webhook:
  Name: Vercel Deploy
  URL: https://api.vercel.com/v1/integrations/deploy/[deploy-hook-id]
  Trigger on: create, update, delete
  Filter: _type == "project" || _type == "service" || _type == "settings"

Get deploy hook URL from:
  Vercel project → Settings → Git → Deploy Hooks → Create hook (branch: main)
```

### 6. Sanity CORS
```
In sanity.io/manage → API → CORS Origins:
Add: https://creativecore.pro
Add: https://www.creativecore.pro
Add: http://localhost:3000 (for development)
```

### 7. Pre-launch Checklist
- [ ] All env variables set in Vercel production
- [ ] `npm run build` passes locally with no errors
- [ ] DNS records propagated (check with dnschecker.org)
- [ ] creativecore.pro loads with SSL
- [ ] Sanity Studio accessible
- [ ] Test inquiry form end-to-end: submit → Sanity + email
- [ ] Mobile test on real device (iOS Safari + Android Chrome)
- [ ] Lighthouse run: performance > 85, accessibility > 90
- [ ] OG tags correct (use opengraph.xyz to preview)
- [ ] 404 page renders for invalid routes
- [ ] Sanity webhook fires on content change → site rebuilds

### 8. Post-launch: Add first content in Sanity
```
Order to add:
1. Settings (bio, photo, socials) — needed for About + Contact
2. Services (5 services) — needed for Services page
3. Projects (all 16 from the portfolio images) — needed for Work + Hero
   - Upload cover images + gallery images per project
   - Set featured: true for best 6 (appear in hero marquee)
   - Set category for each
```

## Acceptance Criteria
- [ ] creativecore.pro resolves to the live Next.js app
- [ ] SSL certificate active (green lock)
- [ ] All pages load without errors in production
- [ ] Sanity Studio accessible and logged in
- [ ] Inquiry form works end-to-end in production
- [ ] Content change in Sanity triggers rebuild within 2 minutes
- [ ] Lighthouse mobile score ≥ 85
