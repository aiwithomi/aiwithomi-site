# Deploy runbook — aiwithomi-site

Updated: 2026-07-07. Status: deploy is working (secrets added, Node 22 fix).

## Why every deploy run fails

The workflow `.github/workflows/deploy.yml` deploys `dist/` to Cloudflare Pages on every
push to `main`. Every run fails at the deploy step with
`Input required and not supplied: apiToken` (run 28784961419 and all prior runs).
The build itself is green; only the secrets are missing.

## The one remaining step (NEEDS_OMI, about 5 minutes)

Add two repository secrets at
https://github.com/AIwithOmi/aiwithomi-site/settings/secrets/actions

| Secret name (exact) | Where to get it |
| :-- | :-- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare dashboard, My Profile, API Tokens, Create Token, template "Edit Cloudflare Workers" or a custom token with `Account.Cloudflare Pages: Edit` permission |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard, any zone overview page, right sidebar, or Workers and Pages overview URL |

Then either push any commit or open the latest failed run and click "Re-run all jobs".
The Pages project name is `aiwithomi-site` (already set in the workflow). If the Pages
project does not exist yet, the action creates it on first successful run.

## Known pitfall (fixed 2026-07-07)

`cloudflare/pages-action@v1` ships wrangler v2, which needs Node.js >= 22. The original
workflow pinned `setup-node` to `'20'`, causing deploy to crash with
`Wrangler requires at least Node.js v22.0.0`. Fix: bump to `node-version: '22'` in
`.github/workflows/deploy.yml`. Now on every push to `main`.

## Verified working (2026-07-07)

- `npm ci && npm run build` passes clean (vite, 1.1s).
- `npm run typecheck` passes clean.
- Smoke test on the built output (`vite preview`): `/`, `/privacy`, `/terms` all return 200.
- Legal pages exist and are linked from the footer (TikTok review requirement).

## Email capture: provider decision

**Decision: Substack (aiwithomi.substack.com), which already exists and has a live
subscribe form.** The site's newsletter form previously used a stub that silently
dropped every email. It now hands off to Substack with the address prefilled
(`/subscribe?email=`); the subscriber confirms there, which doubles as double-opt-in.

Why Substack over the alternatives considered:

- **Substack (chosen):** account already exists, list is exportable (owned asset per
  strategy), zero backend, zero secrets, free. Trade-off: subscriber completes signup on
  substack.com rather than inline.
- Buttondown / ConvertKit: inline capture via API, but needs a new account, an API key,
  and a Pages Function. More moving parts for the same list.
- Cloudflare Pages Function + KV: fully owned, but then the list lives in KV with no
  sending capability. Rebuilding what Substack already does.

Upgrade path if inline capture matters later: a Pages Function that POSTs to the
provider API. Not worth it before there is traffic.

## Local commands

```bash
npm run dev        # dev server
npm run build      # production build to dist/
npm run serve      # preview the built output
npm run typecheck  # tsc, no emit
```
