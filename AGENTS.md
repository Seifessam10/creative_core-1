# AGENTS.md — Creative Core (OpenAI Codex)
> Codex reads this file. Instructions optimised for agentic code generation.

## Project Summary
Portfolio website for Creative Core design studio. Next.js 14 App Router + Tailwind + Sanity CMS + Framer Motion. Dark aesthetic. All content from Sanity. Deploy target: Vercel.

## Agent Behaviour Rules

### Always do before writing code
1. Read the relevant user story in `docs/user-stories/`
2. Read `CLAUDE.md` for design system, folder structure, tech stack
3. Check if the component already exists — never duplicate
4. Check `lib/sanity/queries.ts` before writing new GROQ queries — reuse existing ones

### Code style
- TypeScript strict — no `any`, no `as unknown`
- Tailwind only — no inline styles, no CSS modules unless in `globals.css`
- Named exports for components, default export at file bottom
- All props typed with an interface above the component
- `'use client'` directive only when component uses hooks or browser APIs
- Server Components by default

### File creation rules
- Components → `components/[section]/ComponentName.tsx`
- API routes → `app/api/[route]/route.ts`
- GROQ queries → add to `lib/sanity/queries.ts`, import from there
- Never create files outside the defined folder structure in CLAUDE.md

### Prohibited
- No `console.log` left in production code
- No hardcoded strings that should come from Sanity
- No `useState` for data that should be server-fetched
- No `fetch` calls inside client components — use server components or route handlers
- No installing packages not in the approved stack without flagging it in a comment

---

## Task Format for Codex
When assigning a task, use this format:

```
Implement [component name] as described in docs/user-stories/[US-XX].md.
Follow CLAUDE.md for design system and folder structure.
Output: [list of files to create/modify]
```

---

## Approved Package List
These are already in `package.json`. Do not install others without human approval.

```json
{
  "next": "14.x",
  "react": "18.x",
  "typescript": "5.x",
  "tailwindcss": "3.x",
  "framer-motion": "11.x",
  "@sanity/client": "6.x",
  "@sanity/image-url": "1.x",
  "next-sanity": "7.x",
  "sanity": "3.x",
  "zustand": "4.x",
  "resend": "3.x",
  "react-hook-form": "7.x",
  "zod": "3.x"
}
```

---

## Agent Workflow Per Story

```
1. Read user story → understand AC (acceptance criteria)
2. Identify files to create/modify
3. Write Sanity GROQ query if data needed
4. Build component (server or client as appropriate)
5. Wire to page
6. Self-check against AC — all criteria met?
7. Output summary: files created, files modified, AC status
```

---

## Error Recovery
If a build error occurs:
- Check TypeScript errors first (`tsc --noEmit`)
- Check for missing env variables
- Never delete files to fix errors — trace the import chain
- If Sanity query returns null — add a null check and render empty state, not a crash
