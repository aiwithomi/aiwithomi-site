# aiwithomi-site — Context

Global context is in ~/.codex/AGENTS.md and ~/AGENTS.md — read those first.

---

## What This Is

The public-facing website for the AIwithOmi brand (Omi's AI content and education brand).

- **GitHub**: omi-tsc/aiwithomi-site
- **Deployment**: Cloudflare Pages (GitHub Actions workflow)
- **Stack**: React + TypeScript (Vite/Next.js)
- **Domain**: aiwithomi.com

---

## Branch

Main branch: `main` — deploys to Cloudflare Pages on push.

---

## Related Systems

- **Brand templates**: `~/AIwithOmi/` — HTML card templates for Lumen8 image pipeline (Playwright)
- **Lumen8**: The content pipeline that generates posts, cards, and videos for AIwithOmi
- **n8n**: Workflow at https://n8n.aiwithomi.com orchestrates Lumen8

---

## Notes

- The aiwithomi-site repo is for the website only — not the content pipeline
- Brand assets (logos, colours, fonts) are in `~/AIwithOmi/AIwithOmi Design System/`
- LegalPage.tsx is an untracked file that may need to be added
- App.tsx has uncommitted changes — check `git status` before working
