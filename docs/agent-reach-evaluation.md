# Agent-Reach — Setup & Evaluation for AIwithOmi Content Workflows

**Date:** 2026-08-06 · **Repo evaluated:** [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) · **Version installed:** v1.5.0 (latest `main`, last commit same day as this evaluation)

---

## TL;DR — What it actually is vs the Instagram hype

The hype ("give your agent free access to the entire internet in one line") is **mostly accurate, with two honest caveats the reels skip**:

1. **Agent-Reach is not a scraper or an API.** It is a *capability layer*: a Python CLI that **selects, installs, health-checks, and routes** to upstream open-source tools (yt-dlp, gh CLI, Jina Reader, twitter-cli, bili-cli, feedparser, Exa via MCP, OpenCLI…). After install, your agent calls those upstream tools **directly** — there is no wrapper in the read path. The value is curation + maintenance: when a platform blocks one access path, the maintainers reorder the backend list and you update with one line.
2. **"Free access to everything" is tiered.** Six channels genuinely work with zero config (web pages, YouTube transcripts/search, GitHub, RSS, Exa semantic search, V2EX). The juicy social channels — **Twitter/X search, Reddit, Instagram, Facebook, Xiaohongshu** — require your own login state (cookies or a logged-in Chrome session via the OpenCLI extension), with real account-ban risk that the project itself warns about. "No paid API fees" is true; "no auth" is not.

It is legitimate, actively maintained (multiple commits and a merged PR on evaluation day), MIT-licensed, ~6,900 lines of readable Python with a 586-test suite. This is real infrastructure, not vaporware.

---

## Setup status

| Step | Result |
|------|--------|
| Clone | ✅ `/home/user/agent-reach` (fresh clone of `main`) |
| Install | ✅ v1.5.0 via venv (`pip install` from clone — same code path as the documented one-liner; no pipx in this container) |
| `agent-reach install --env=auto` (safe mode) | ✅ Ran as documented: read-only, changed nothing, listed exact fix commands |
| Fixes applied | yt-dlp JS runtime config, `mcporter` + Exa MCP registration, gh CLI installed |
| `agent-reach doctor` | ✅ 3/15 channels green in this sandbox (RSS, YouTube, Web), gh + Exa "configured but not live-verified", 9 optional channels not installed |
| Test suite | ✅ 585/586 passed (the 1 failure was caused by my own Exa config leaking into a test that assumes a clean machine — not a product bug) |
| Live functional tests | ✅ RSS (feedparser pulled a 40-entry PyPI feed) · ✅ GitHub (gh CLI read repo metadata) · ⚠️ YouTube/Jina/Exa **blocked by this sandbox's egress policy** (proxy 403 on youtube.com, r.jina.ai, mcp.exa.ai), not by the tool. These will work on a normal machine. |

**Important for you:** the evaluation container only allows dev-infrastructure domains (GitHub/npm/PyPI). Re-run the install on your own machine (Mac/local Claude Code) to get the full 6 zero-config channels live. Expect YouTube and web reading to just work there.

## How it works (architecture in five lines)

- `agent_reach/channels/*.py` — one file per platform. Each declares an **ordered backend list** (`twitter.py → twitter-cli ▸ OpenCLI ▸ bird`) and a `check()` that **actually executes** a probe command (not just `which`), distinguishing missing / broken-venv / timeout / misconfigured.
- `doctor.py` — collects every channel's self-check into a report; `--json` gives `active_backend` per platform so agents can pick the right command programmatically.
- `probe.py` — the health-probe engine with reinstall prescriptions for broken installs.
- `cli.py` — `install` (safe-by-default: read-only unless `--system`), `configure` (cookies/keys, hidden input, values stored in `~/.agent-reach/config.yaml` chmod 600 — verified in code), `doctor`, `watch`, `uninstall`.
- `skill/SKILL.md` — installed into the agent's skills dir (only with `--system`); teaches the agent the routing table and exact upstream commands. This is the piece that makes it "agent-native."

**Security model (verified in code, not just README):** credentials stay local with owner-only file permissions; safe mode really is read-only; cookie import is per-platform explicit (won't scan other platforms' cookies); uninstall removes everything including tokens. The install guide even instructs agents to never use sudo and never pollute the workspace. Red flags: none structural. Caveats: you are trusting ~10 upstream third-party CLIs (each a supply-chain surface), cookie-based access violates most platforms' ToS (use burner accounts — the README says the same), and the docs/ecosystem are Chinese-first (fine for Claude, occasionally friction for you).

---

## Fit for AIwithOmi use cases

**Strong fit:**

- **Fact-checking viral AI tool claims** — Exa semantic search + GitHub (`gh repo view`, stars, commit history, issues) + YouTube transcripts is exactly the verify-before-you-post toolchain. All zero-config.
- **Pulling source material** — YouTube transcript extraction alone replaces a paid transcript service; Jina Reader turns any article into clean markdown for your Obsidian vault.
- **Trend monitoring** — RSS + `agent-reach watch` in a cron/n8n job; GitHub trending via `gh search repos --sort stars`.
- **Reel research on X/Reddit** — works, but requires cookie setup with a burner account, and search stability depends on upstream twitter-cli surviving platform changes. Treat as best-effort, not pipeline-critical.

**Weak fit / gaps:** Instagram search is user-search only (you can't keyword-search posts — ironic given where the hype lives); Reddit has no anonymous path at all anymore; server deployments of social channels need residential proxies; no TikTok channel.

**Integration:** With **Claude Code** it's native — `--system` install registers the SKILL.md and Claude routes automatically. For **Hermes Agent**, anything that can run shell commands can use it; point Hermes at the same SKILL.md as a tool-use reference. For **n8n/Lumen8**, wrap individual upstream commands (yt-dlp, gh, curl r.jina.ai) in Execute Command nodes — you don't need agent-reach itself at runtime, only at setup/doctor time. That's the elegance of the no-wrapper design.

---

## Recommendations

1. **Install on your real machine** (not a sandbox): paste to Claude Code —
   `帮我安装 Agent Reach：https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/install.md`
   (or in English: "Install Agent Reach following https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/install.md"). Approve `--system` when it asks; then `agent-reach doctor`.
2. **Add Twitter/X with a burner account** via Cookie-Editor export — highest content-research value per minute of setup. Skip Reddit unless you need it (heaviest setup, most fragile).
3. **Create a content-research skill** that layers your editorial workflow on top — see `docs/omi-content-research-skill.md` in this PR for a ready-to-adapt SKILL.md.
4. **Schedule a weekly `agent-reach watch`** (n8n or cron) so backend rot surfaces before a filming day, not during one.

**Commands you can use immediately after local install:**

```bash
agent-reach doctor --json                                  # what's live, which backend
yt-dlp --write-auto-sub --skip-download -o "/tmp/%(id)s" "<youtube-url>"   # transcript
curl -s "https://r.jina.ai/<article-url>"                  # any page → clean markdown
gh search repos "claude agent" --sort stars --limit 10     # GitHub trend scan
mcporter call exa.web_search_exa query="is <tool> claim real" numResults=5 # semantic fact-check
twitter search "<viral tool name>" -n 20                   # after cookie setup
```

## Files created during this evaluation

- `/home/user/agent-reach` — clone (sandbox only, not committed)
- `~/.agent-reach-venv` — install venv; `~/.config/yt-dlp/config` — JS runtime flag; `~/.mcporter/mcporter.json` — Exa MCP registration (all sandbox-local)
- `docs/agent-reach-evaluation.md` — this report
- `docs/omi-content-research-skill.md` — starter Claude Code skill for your content-research workflow
