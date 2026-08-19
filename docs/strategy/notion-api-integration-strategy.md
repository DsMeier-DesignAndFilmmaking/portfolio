# Notion API Integration — Audit & Strategy

**Phase:** 3.0 companion — architecture only. No implementation code, no repository source modified.
**Date:** 2026-08-18
**Preserves:** Gate §6 (static export) and §9 (webhook) decisions — approved and not re-litigated below.

> **This deliverable does not advance the Phase 3 exit gate.** It is verification-independent: it audits the repository, which is fully inspectable. Exit-gate items 1–10 remain ⛔. Nothing here authorizes implementation.

---

## 1 — Audit findings

### 1.1 Dependencies

| Package | Version | Role | Status |
|---|---|---|---|
| `@notionhq/client` | ^2.2.15 | Notion SDK | ✅ **in use** — 1 file (`lib/notion-os.ts`) |
| `next` | ^16.1.6 | framework | ✅ static export mode |
| `react` / `react-dom` | ^18.2.0 | — | ✅ |
| `framer-motion` | ^12.35.2 | animation | ✅ 67 files |
| `lucide-react` | ^0.562.0 | icons | ✅ 72 files |
| `react-icons` | ^5.5.0 | icons | ✅ 17 files |
| `three` + `@react-three/*` | — | 3D | ✅ 10 / 2 files |
| `sharp` | ^0.34.3 | image scripts | ✅ 5 files |
| `animejs` | ^3.2.2 | animation | ✅ 2 files |
| `react-simple-maps` | ^3.0.0 | maps | ✅ 1 file |
| `@formspree/react` | ^3.0.0 | contact form | ✅ 1 file |
| `recharts` | ^3.6.0 | charts | ⚠️ **6 files — all in the orphaned subsystem (§1.4)** |
| `node-cron` | ^3.0.3 | scheduler | ⚠️ 1 script only (`schedule-cursor-refresh.cjs`) |
| `tar` | ^7.5.11 | — | ⚠️ **no source consumer found** |
| `gsap` | ^3.13.0 | animation | ❌ **zero references repo-wide** |

**No new dependency is required for this integration.** `@notionhq/client` is present, working, and pinned to API version `2022-06-28` in `lib/notion-os.ts`. Nothing needs installing.

### 1.2 API routes

| Route | Handler | Declared | Reachable? |
|---|---|---|---|
| `app/api/openai/route.js` | POST → OpenAI | `dynamic = "force-static"` | ❌ inert under `output: 'export'` |
| `app/api/strava/route.js` | GET → Strava | `dynamic = "force-static"` | ❌ inert |
| `app/api/update-cursor-analytics/route.js` | POST → **`execSync`** | `dynamic = "force-static"` | ❌ inert — **and the highest-risk file in the repo** |

No route is called by any client component. Separately, `hooks/usePerformanceMonitor.ts:107` fetches **`/api/health`**, which does not exist — a dead fetch to a nonexistent endpoint.

### 1.3 CMS architecture

**None.** No `contentful`, `sanity`, `strapi`, `prismic`, `payload`, `keystone`, `ghost`, `mdx`, `contentlayer`, `gray-matter`, or `remark` in `package.json`. There is no markdown pipeline and no headless CMS. Notion is the only external content system the repository has ever integrated.

### 1.4 Content loading patterns — four coexisting, and one of them is a warning

This is the most consequential audit finding.

**Pattern A — Static TypeScript modules** · *dominant, correct*
Every project route imports typed constants compiled into the bundle. 8 routes import from `data/projects.ts`. Rock Creek's 1,203 lines of content modules are this pattern.

**Pattern B — Build-time server fetch** · *correct, 2 routes*
`app/projects/environmental-systems-design-os/page.tsx` and `app/projects/travel-and-ai/projects/[projectId]/page.tsx` are the only `async` page components. The former is the proven Notion pattern: async RSC → `Promise.all` of five queries → baked into static HTML, key never client-side.

**Pattern C — Client-side runtime fetch** · ⚠️ **built, then abandoned**
An entire subsystem exists and is **unreachable from `app/`**:

```
components/dashboard/   8 components      components/charts/   3 components
hooks/useGitHubActivity · useStravaData · useOpenAIAnalytics
     · useCursorAnalytics · useDashboardSync
types/dashboard.ts      lib/api/{strava,github,figma,notion}.js
```

These hooks fetch third-party APIs **directly from the browser** — `api.github.com`, `www.strava.com/api/v3/*`. `lib/api/notion.js` is a fabricated mock with **zero importers**, sharing a name with the real integration.

**This is the pattern the project already tried for external content and walked away from. It left a client-exposed credential behind (§5.1).** The audit turns the Gate's build-time decision from a preference into a conclusion supported by the repository's own history.

**Pattern D — Pre-generated JSON in `public/`** · *precedent for the cached-JSON option*
`scripts/parse-cursor-usage.cjs` writes `public/cursor-usage.json`; `useCursorAnalytics` fetches it at runtime. A real cached-JSON layer already exists here — with two flaws any Notion version must avoid: the cache is **runtime-fetched** rather than build-time imported, and it lives in **`public/`**, where it is world-readable (§5.4).

---

## 2 — Integration Strategy

### Recommendation

| Option | Verdict | Rationale |
|---|---|---|
| **Direct Notion API** | ✅ **YES** | `@notionhq/client`, pinned `2022-06-28`. Already proven in production on one route |
| **Server-side fetch** | ✅ **YES — build-time only** | Async RSC during `next build`. Not a runtime server |
| **Static generation** | ✅ **YES — the mode** | `output: 'export'`. Data baked into HTML |
| **ISR** | ❌ **NO** | Incompatible with static export; would activate three dead routes |
| **Webhooks** | ❌ **NO** | Gate §9. Requires a live endpoint → removing static export → activating the `execSync` handler |
| **Cached JSON layer** | 🔶 **DEFERRED** | Documented evolution path with a named trigger (§2.2) |

**Strategy: direct Notion API, called from async Server Components at build time, output as static HTML.** Unchanged from the approved Gate; the audit strengthens it on three independent grounds — the pattern is already proven here, the alternative pattern was tried and abandoned in this same repo, and every runtime option requires a rendering-mode change that reactivates a shell-execution endpoint.

### 2.1 Why not the alternatives, concretely

**ISR** cannot coexist with `output: 'export'`; adopting it means deleting the export mode, which changes the deploy contract for `vercel.json`, the GitHub Actions artifact upload, `basePath` switching, `trailingSlash`, 16 redirects, and image handling — to gain freshness on content that changes in authoring bursts.

**Webhooks** need a live HTTP endpoint. The portfolio has no server. Adding one to receive Notion events means the same rendering-mode change, plus signature verification, replay protection, and an endpoint to monitor — for a personal practice portfolio whose content changes when its author is already committing code.

**Client-side fetch** would put `NOTION_API_KEY` in the browser. Non-viable, and the repo already demonstrates how this goes wrong (§5.1).

### 2.2 The cached-JSON layer — deferred, with a trigger

Fetch in CI, write typed JSON to a **non-served** directory, commit it, build from the committed file. Benefits: reproducible builds, offline development, no API dependency at build, and a reviewable diff of every content change.

**Revisit when either is true:** Notion fetching exceeds ~30 s of build time, or a build fails from API rate limiting (§4.4). Not now — it adds a sync step and a second place content can be stale, for no current benefit.

---

## 3 — File Structure

```
lib/notion/                        ◀ NEW — shared infrastructure
  client.ts        configured Client; notionVersion pinned; single instantiation
  registry.ts      ★ database IDs — THE single source (today they are duplicated
                     across lib/notion-os.ts and scripts/introspect-notion-os.mjs)
  query.ts         queryAll(): cursor pagination, page_size 100
  properties.ts    titleText · richText · selectName · statusName · multiNames
                   numberVal · urlVal · checkboxVal · relationIds  (extracted as-is)
  relations.ts     ID-returning resolution + map-building (replaces N+1 retrieve)
  assert.ts        build-time non-empty assertions  ← the S6 mechanism
  sort.ts          rankOf() categorical ranking
  errors.ts        redacting error formatter (§5.5)
  index.ts         barrel

lib/notion/domains/                ◀ NEW — one module per database
  case-studies.ts  signals.ts  tensions.ts  shocks.ts
  claims.ts        sources.ts   loop-nodes.ts  artifacts.ts
      each exports a typed record shape + fetch fn scoped by case study

app/projects/rock-creek-os/
  explorer/content/
    explorer-data.ts      ★ UNCHANGED — class C, local
    explorer-notion.ts    ◀ NEW — projection interfaces + fetch calls for this route
  systems/content/
    systems-data.ts       ★ UNCHANGED
    evidence.ts           ★ UNCHANGED (four-tier fix is Phase 3.1, not this work)
    systems-notion.ts     ◀ NEW
  dashboard/content/
    scenarios.ts          ★ composition stays; facts come from shocks-notion
    dashboard-notion.ts   ◀ NEW

lib/notion-os.ts                   ◀ REFACTORED onto lib/notion/*, behavior identical
scripts/introspect-notion-os.mjs   ◀ consumes registry.ts instead of its own IDs
scripts/verify-notion-os.mts       ◀ extended; asserts non-empty

DELETE:  lib/api/notion.js · app/api/{openai,strava,update-cursor-analytics}/
```

**The `-data.ts` / `-notion.ts` pairing is the file-level expression of the ownership boundary.** Local content and Notion-derived content sit side by side in each route's `content/` directory, and which is which is legible from the filename. No shared "content" file mixes both.

**Two layers, deliberately.** `lib/notion/domains/*` returns a shared typed record per database. Each route's `*-notion.ts` projects that into the narrow shape that route renders. The second layer is thin and is the editorial boundary — SSOT §S3. Centralizing it would collapse the projection boundary and is the specific mechanism by which portfolios become database viewers.

---

## 4 — API Layer Design

### 4.1 Pipeline

```
  registry.ts ─▶ client.ts ─▶ query.ts ─▶ relations.ts ─▶ [domain fetcher]
                                                                │
                                              assert.ts ◀───────┤
                                                                ▼
                                                    route *-notion.ts
                                                     (projection)
                                                                ▼
                                                    async Server Component
                                                                ▼
                                                    merged with *-data.ts
                                                                ▼
                                                          static HTML
```

### 4.2 Module contracts

| Module | Responsibility | Must not |
|---|---|---|
| `registry.ts` | Map logical name → database ID. Exhaustive | contain filters or query logic |
| `client.ts` | One `Client`, key from env, version pinned | be imported outside `lib/notion/` |
| `query.ts` | Paginate fully; return raw pages | interpret properties |
| `properties.ts` | Pure readers, total functions, safe defaults | throw |
| `relations.ts` | Resolve IDs → records via **map-building**, not N retrieves | return titles only |
| `assert.ts` | Throw a build-failing error with a remediation hint | be optional in production builds |
| `domains/*` | Filter, project to a shared record type, sort | reference a page or component |
| `*-notion.ts` | Narrow to what one route renders | be shared between routes |

### 4.3 Error semantics — the S6 change

Today every function catches and returns `[]`, and `[]` renders as curated static content. A revoked key produces a page that looks entirely current.

| Condition | Today | Designed |
|---|---|---|
| Missing `NOTION_API_KEY` | `[]` → static fallback, build succeeds | **Build fails** with a named remediation |
| Renamed property | `[]` or silent empty fields | **Build fails**, names the property |
| Database unshared | `[]` → fallback | **Build fails**, names the database |
| Query returns 0 rows legitimately | `[]` → fallback | Allowed **only** where declared optional |
| Network blip | `[]` → fallback | Retry, then fail |

The distinction that makes this work: **"required" vs "declared-optional" queries.** A route declares which fetches may legitimately be empty (Shore Lodge with no shocks, per Portfolio Data Requirements §9). Everything else must return rows or the build stops.

### 4.4 Relation resolution — a required rework

`lib/notion-os.ts:154-170` resolves relations with one `pages.retrieve()` per unique target, cached per build. With five databases and hundreds of relations this becomes the build's dominant cost and a rate-limit risk — Notion averages ~3 requests/second and returns `429` above it.

**Design: query the target database once, build an `id → record` map, resolve locally.** One query per target database instead of N retrieves. This also delivers what the current implementation cannot — the record **ID**, so the portfolio can link an artifact to its project page (companion audit F10), and **all** relations rather than only the first.

---

## 5 — Security Considerations

### 5.1 The precedent to not repeat

`hooks/useStravaData.ts:146` reads `process.env.NEXT_PUBLIC_STRAVA_ACCESS_TOKEN`. **Any `NEXT_PUBLIC_*` variable is inlined into the client bundle at build time and is readable by anyone who views source.** It is an API access token in a public variable.

The subsystem is orphaned, so nothing renders it today — but the file is in the tree, and if that token was ever set in a production build, **it should be treated as disclosed and rotated at Strava.** Verify against the Vercel project's environment variables before assuming otherwise.

| Rule for Notion | |
|---|---|
| **N1** | `NOTION_API_KEY` — never `NEXT_PUBLIC_`, never client-side, never in a client component |
| **N2** | Only `lib/notion/client.ts` reads the key. One place to audit |
| **N3** | No Notion fetch from a `'use client'` component, ever |

### 5.2 Attack surface

Build-time-only integration means **no runtime attack surface**: the deployed artifact is static HTML with no server, no endpoints, no secrets. This is a genuine security advantage of the chosen strategy and a further argument against ISR or webhooks, both of which create one.

### 5.3 Dead routes — delete, do not leave

`app/api/update-cursor-analytics/route.js` is a `POST` handler that runs `execSync` on a path derived from `process.cwd()`. Inert under `output: 'export'`. **It becomes unauthenticated remote command execution the moment anyone removes static export** — precisely the change a Notion integration tempts. Delete all three routes as Phase 3.8; it is independent of every other decision.

### 5.4 Draft-content leakage

If the cached-JSON layer (§2.2) is ever adopted, **the cache must not live in `public/`.** Everything in `public/` is served. A Notion cache there would publish every Draft record, every unpublished claim, and every internal note to anyone who guesses the filename. `public/cursor-usage.json` is the existing example of this pattern — acceptable for anonymized usage counts, unacceptable for the content database. Cache to a non-served directory and `import` it at build time.

### 5.5 Error redaction

`lib/notion-os.ts` currently does `console.error('…failed:', err)`. Notion SDK errors can carry request context. Build logs are visible in Vercel's dashboard and in GitHub Actions logs — which are **public on a public repository**. `errors.ts` should format a redacted message: operation, database name, property name, status code. Never the raw error object, never headers.

### 5.6 Integration scope

Share the Notion integration with **only** the databases it must read. Notion integrations have workspace-level tokens scoped by explicit page sharing; a broadly shared integration means one leaked key exposes everything. Review scope each time a database is added.

### 5.7 Content as untrusted input

Notion content is authored by the user, so injection risk is low — but if Notion **blocks** are ever rendered (rather than plain-text property values), treat block content as untrusted: never `dangerouslySetInnerHTML` from Notion rich text without sanitization. The current design reads only property values, which are plain text. Keep it that way.

---

## 6 — Vercel Deployment Implications

| Area | Implication |
|---|---|
| **Build config** | Unchanged. `framework: null`, `buildCommand: npm run build`, `outputDirectory: out` |
| **Serverless functions** | **None created.** Static export produces no functions → no runtime cost, no cold starts |
| **Env vars** | `NOTION_API_KEY` must be added to the Vercel project for **Production _and_ Preview**. Preview builds run the same code and will fail without it |
| **Build failure is now a real state** | Under S6, a missing key **fails the build** instead of silently degrading. This is the intended behavior and a change from today — a broken deploy is correct where a stale-looking-current page is not |
| **Build duration** | Increases with query count. Vercel's limit is generous; §4.4's map-based resolution is what keeps this bounded |
| **Rate limiting** | Concurrent Production + Preview builds share the integration's rate budget. A `429` becomes a failed deploy — another reason for §4.4 |
| **Content refresh** | Deploy-to-refresh. For push-button freshness use a **Vercel Deploy Hook** — a URL callable from a Notion button. No app endpoint, no webhook, no rendering-mode change |
| **Rollback** | Vercel keeps prior deployments. A bad content change is revertable by promoting the previous deployment — no Notion rollback needed |

### The dual-pipeline problem — resolve before implementing

`.github/workflows/nextjs.yml` builds on every push to `main` and deploys to GitHub Pages with **no `env:` or `secrets:` block.** Once S6 lands, that pipeline **will fail every build** — it cannot supply the key.

Two options, and one must be chosen before Phase 3.3:
1. **Add `NOTION_API_KEY` to GitHub Actions secrets** and wire it into the build step, or
2. **Retire the workflow** if Vercel is the canonical deploy target.

Option 2 is likely correct — `.vercel/project.json` names `dan-meier-portfolio`, and `next.config.js` treats the GitHub Pages `/portfolio` basePath as the non-Vercel fallback. Leaving both active means two deploy targets with divergent content.

---

## 7 — Environment Variable Requirements

### Required

| Variable | Scope | Value | Notes |
|---|---|---|---|
| `NOTION_API_KEY` | **Build-time, server-only** | Internal integration secret | **Never** `NEXT_PUBLIC_`. Read only by `lib/notion/client.ts` |

That is the complete requirement. No other variable is needed for this integration.

### `.env.local.example` — must be created (exit-gate item 9)

The repository has **no** `.env.local.example` and no documented environment contract. The file should list every variable the repo references, with required/optional status and a clear statement that `NOTION_API_KEY` is build-time and server-only. Values must be placeholders, never real secrets.

### Full inventory of variables the repo references

| Variable | Consumer | Status |
|---|---|---|
| `NOTION_API_KEY` | `lib/notion-os.ts`, introspect script | ✅ **required** — undocumented today |
| `NEXT_PUBLIC_BASE_PATH` | 88 references, asset paths | ✅ derived in `next.config.js` |
| `VERCEL` / `VERCEL_URL` / `VERCEL_ENV` | basePath switching | ✅ platform-provided |
| `NODE_ENV` | build branching | ✅ standard |
| `OPENAI_API_KEY` | dead API route | ❌ remove with the route |
| `STRAVA_CLIENT_ID` / `_SECRET` / `_ACCESS_TOKEN` / `_REFRESH_TOKEN` | dead API route + `lib/api/strava.js` | ❌ remove with the subsystem |
| **`NEXT_PUBLIC_STRAVA_ACCESS_TOKEN`** | `hooks/useStravaData.ts` | 🔴 **client-exposed token — remove; rotate at Strava if ever set in production** |
| `NEXT_PUBLIC_CURSORLENS_URL` | `useCursorAnalytics` | ⚠️ orphaned subsystem |
| `FIGMA_PUBLIC_URL` | `lib/api/figma.js` | ⚠️ zero importers |

**Only one variable in this table is needed going forward.** Six belong to dead or orphaned code, and one is a client-exposed credential.

---

## 8 — What this does not change

| Preserved | Source |
|---|---|
| `output: 'export'` stays | Gate §6 |
| No ISR, no webhooks, no runtime infrastructure | Gate §6, §9 |
| Build-time fetch in async Server Components | Gate §6 |
| Notion read-only, never written to | SSOT §S8 |
| Per-consumer projection interfaces | SSOT §S3 |
| ~65% of Rock Creek content stays local | Gate §3 |
| Phase 2 schema | Phase 2 — still unverified |

### Ordering against the exit gate

This design is implemented in **Phase 3.3** (access-layer extraction), which requires gate items 1–10 plus Phase 3.1 and 3.2. Two items here are exceptions that may proceed independently, because neither depends on Notion at all:

- **§5.3 dead-route deletion** — Phase 3.8, safe at any time
- **§7 `.env.local.example`** — Phase 3.1, and is itself gate item 9

Everything else waits.
