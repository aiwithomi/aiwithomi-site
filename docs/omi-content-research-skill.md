# Starter skill: AIwithOmi content research on top of Agent-Reach

Copy this file to `~/.claude/skills/omi-content-research/SKILL.md` on the machine
where Agent-Reach is installed. It layers the AIwithOmi editorial workflow on top
of Agent-Reach's raw platform access. Adjust the output format to taste.

---

```markdown
---
name: omi-content-research
description: >
  Use when Omi asks to research a viral AI claim, fact-check a tool, gather
  source material for a reel/post, or scan for AI content trends. Builds on
  agent-reach (must be installed — verify with `agent-reach doctor --json`).
---

# AIwithOmi Content Research

## Before starting
Run `agent-reach doctor --json` once per session. Only use platforms whose
`active_backend` is set; note unavailable ones in the final report.

## Workflow A — Fact-check a viral AI tool claim
Input: tool name + the claim (e.g. "X tool automates your whole business").
1. GitHub reality check: `gh repo view <owner>/<repo>` + `gh api repos/<owner>/<repo> --jq '.stargazers_count, .pushed_at, .open_issues_count'` — real stars? maintained? Look at issues for user pain.
2. Semantic search: `mcporter call exa.web_search_exa query="<tool> review problems" numResults=5` — independent reviews, not launch posts.
3. X sentiment (if configured): `twitter search "<tool>" -n 20` — separate maker hype from user experience.
4. YouTube deep dive: find a real demo/review, pull the transcript:
   `yt-dlp --write-auto-sub --skip-download -o "/tmp/%(id)s" "<url>"` and read the .vtt.
5. Verdict format: **Claim / Reality / Evidence / Reel angle** — one line each,
   then supporting detail. Always include links to primary sources.

## Workflow B — Source material for a post/reel
1. Read the primary source: `curl -s "https://r.jina.ai/<url>"` → save cleaned
   markdown to the Obsidian inbox folder if available.
2. Pull 2-3 corroborating sources via Exa.
3. Output: hook options (3), key facts with sources, suggested visual moments.

## Workflow C — Weekly trend scan
1. `gh search repos --sort stars --created ">$(date -d '7 days ago' +%Y-%m-%d)" "ai agent" --limit 15`
2. Exa: `mcporter call exa.web_search_exa query="new AI agent tool launched this week" numResults=10`
3. RSS: parse configured feeds with feedparser (Python one-liner).
4. Output: table of candidates — name, one-line what-it-is, star velocity,
   content angle, hype-risk flag.

## Rules
- Never present maker-marketing as verification; require at least one
  independent source before calling a claim "confirmed".
- Transcripts and article dumps go to /tmp, never the repo workspace.
- If a platform fails, follow agent-reach's SKILL.md retry chain; if still
  down, say so in the report rather than silently narrowing the research.
```
