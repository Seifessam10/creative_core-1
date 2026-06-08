# WORKFLOW.md — Creative Core: Design → Code → Ship
> The complete playbook. Read this once. Follow it every session.

---

## The Two-Tool Split

| Tool | Role | When |
|------|------|------|
| **Claude.ai (chat)** | Design decisions, mockups, visual iteration, spec writing | Before any code is written |
| **Claude Code / Codex** | Implementation — builds the real Next.js components | After design is approved |

**Rule**: Never try to design and build in the same step. Design first, build second.

---

## Phase 0 — Project Setup (Do Once)
> Before any design or code work

### Steps
1. Create GitHub repo: `creative-core`
2. Run `npx create-next-app@latest creative-core --typescript --tailwind --app`
3. Copy `CLAUDE.md`, `AGENTS.md`, `docs/` folder into repo root
4. Install packages:
   ```bash
   npm install framer-motion @sanity/client @sanity/image-url next-sanity sanity zustand resend react-hook-form zod
   ```
5. Create `.env.local` from `.env.example`
6. Connect Sanity project (sanity.io → new project → get project ID)
7. Push to GitHub, connect to Vercel

**Done when**: `npm run dev` runs, app loads at localhost:3000, no errors.

---

## Phase 1 — Build Sequence (Weeks 1–6)
> Follow this order. Each story depends on the one before.

```
US-08  →  US-01  →  US-02  →  US-03  →  US-04  →  US-05  →  US-06  →  US-07  →  US-09
Sanity    Nav       Hero      Grid      Detail    Services  About     Contact   Deploy
```

### Why This Order
- **US-08 first** — Sanity schemas and client must exist before any page fetches data
- **US-01 second** — Nav is the layout shell everything else renders inside
- **US-02 → US-03** — Hero and grid are the two highest-impact pages, do them while energy is high
- **US-04 → US-05 → US-06** — Detail, services, about are lower complexity
- **US-07** — Contact form last because it needs Sanity write token + Resend configured
- **US-09** — Deploy after everything else passes locally

---

## Per-Story Workflow

### Step 1: Design (Claude.ai — this chat)
```
Prompt: "Show me a mockup of [section name] for Creative Core"

Iterate until:
  ✓ Layout is correct
  ✓ Typography feels right
  ✓ Hover states are defined
  ✓ Mobile layout decided
  ✓ Edge cases covered (empty states, loading, errors)
```

### Step 2: Spec is in the user story file
Every user story in `docs/user-stories/` already contains the full spec.
Read it. If something is missing from the design, update the story file first.

### Step 3: Build (Claude Code)
Open terminal in project root. Start session:
```bash
claude  # opens Claude Code
```

Then give this prompt:
```
Read CLAUDE.md and docs/design-specs/DS-01-design-system.md.
Then implement docs/user-stories/[US-XX-filename].md.
Tell me which files you'll create before starting.
```

Claude Code will:
1. Read the context files
2. List files to create/modify
3. Build the component
4. Self-check against acceptance criteria

### Step 4: Review
```bash
npm run dev          # check it works
npm run build        # check no TypeScript errors
```

Open the page. Check:
- [ ] Matches the design mockup
- [ ] Works on mobile (browser devtools, 390px width)
- [ ] No console errors
- [ ] All acceptance criteria in the user story are met

### Step 5: Mark done + commit
In the user story file, change:
```
**Status**: [ ] Todo
```
to:
```
**Status**: [x] Done — [date]
```

Commit:
```bash
git add .
git commit -m "feat: implement US-XX [component name]"
git push
```

Vercel auto-deploys preview URL. Share with your friend for feedback.

---

## Handling Feedback

### Design feedback (visual things)
→ Come back to Claude.ai
→ Describe what needs to change
→ Claude renders updated mockup
→ Update the design spec if it changed significantly
→ Tell Claude Code: "Update [component] — [specific change]. See updated DS-XX."

### Code bugs
→ Stay in Claude Code
→ Share the error + the file
→ "Fix this error in [file]: [paste error]"

---

## Codex vs Claude Code — When to Use Which

| Task | Use |
|------|-----|
| Build a new component from a user story | Claude Code (interactive, can ask questions) |
| Large batch of files (full Sanity schema setup) | Codex (better for multi-file autonomous tasks) |
| Fix a specific bug in one file | Claude Code |
| Refactor multiple components at once | Codex |
| Wire up API routes | Either |

### Codex Task Format
```
Implement [task] as described in docs/user-stories/[US-XX].md.
Follow CLAUDE.md for design system and folder structure.
Output files: [list expected files]
Do not install packages not already in package.json.
```

---

## Quality Gates Before Ship

### Local Gates (before every commit)
- [ ] `npm run build` — zero errors
- [ ] `npm run lint` — zero warnings
- [ ] Mobile layout correct at 390px (iPhone 14)
- [ ] All console errors cleared

### Pre-launch Gate (before US-09 deploy)
- [ ] All 8 user stories marked [x] Done
- [ ] Lighthouse mobile score ≥ 85
- [ ] Test inquiry form end-to-end
- [ ] Test Sanity: add project → verify it appears on site
- [ ] Test on real iPhone (Safari) + Android (Chrome)
- [ ] OG preview correct (opengraph.xyz)

---

## When You're Stuck

| Problem | Solution |
|---------|---------|
| Claude Code built wrong component | Paste the user story AC into Claude Code: "This doesn't meet AC #3. Fix it." |
| TypeScript error you don't understand | Paste full error into Claude.ai chat: "Explain this TS error and how to fix it in context of Creative Core" |
| Sanity not returning data | Check CORS settings, check env var, run `groq` query in Sanity Vision (sanity.io/manage → Vision) |
| Vercel build fails but local works | Check if you're using browser APIs in a server component. Add 'use client'. |
| Design doesn't match mockup | Come back here, share a screenshot, say "this doesn't match — adjust" |

---

## Final Checklist to Go Live

```
□ US-08 Sanity CMS setup complete
□ US-01 Nav working — all links, mobile menu, scroll behavior
□ US-02 Hero + marquee — animations, Sanity images loading
□ US-03 Portfolio grid — all projects, filter working
□ US-04 Project detail — correct slug routing, SEO
□ US-05 Services — from Sanity, process steps
□ US-06 About — bio + photo from Sanity
□ US-07 Contact form — saves to Sanity, sends 2 emails
□ Content added: 16 projects, 5 services, settings doc
□ US-09 Deploy — domain live, SSL, webhook
□ Share creativecore.pro with the world
```
