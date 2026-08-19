# Rock Creek OS — Repository Architecture Audit

**Type:** Audit and documentation only. No code written, no files modified.
**Scope:** `/projects/rock-creek-os/` and its three sub-routes, plus the repository's content, environment, and data layers.
**Date:** 2026-08-18
**Companion:** [`notion-os-current-architecture.md`](notion-os-current-architecture.md) — the Notion-side audit.

---

## Executive summary

Rock Creek OS is **four statically-generated Next.js routes rendering 1,203 lines of hand-authored TypeScript content modules.** There is no CMS, no Notion connection, no data loader, no runtime fetching, and no webhook infrastructure anywhere in the project. Content is compiled into the bundle at build time.

The build quality is **high** — strong typing, disciplined evidence tiering, thorough architectural commentary, and a deliberate separation between content modules and presentation components. This is not a codebase that needs rescuing. It is a codebase that has **outgrown its content substrate**.

Three findings are load-bearing:

1. **The landing page advertises content that no longer exists.** `/projects/rock-creek-os` promises five named frameworks; `/systems` was rewritten and now delivers a different five. This is live, user-visible drift.
2. **The code implements three evidence tiers; the source-of-truth document specifies four** — and the missing tier (`Future`) is the one that document calls the single most important line in its evidence boundary.
3. **Two deploy pipelines exist and only one can carry a Notion key.** The GitHub Actions workflow has no secrets block at all.

---

## 1 — Current Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ROUTE GROUP:  app/projects/rock-creek-os/                               │
│ Rendering:    Static Site Generation (next.config → output: 'export')   │
│ Runtime data: NONE                                                       │
└─────────────────────────────────────────────────────────────────────────┘

  layout.tsx (11 ln)
      │
      ├── page.tsx ..................... 290 ln  [SERVER]  Overview / landing
      │     └── ExperienceNav ......... 672 ln  [CLIENT]  ← largest file in project
      │     └── HeroDraftingPlate ................ shared, plate id from data/heroPlates.ts
      │     └── content: INLINE JSX (no content module)          ⚠ only route without one
      │
      ├── explorer/page.tsx ............ 331 ln  [SERVER]  Systems Explorer
      │     ├── PrimaryChallenge ...... 193 ln  [CLIENT]
      │     ├── SystemOverlayDiagram .. 171 ln  [CLIENT]
      │     ├── SignalToExperience .... 106 ln  [SERVER]
      │     ├── SupportingSystems ......  91 ln  [SERVER]
      │     ├── explorer-primitives ... 353 ln  [CLIENT]
      │     └── content/explorer-data.ts ....... 392 ln  ◀── CONTENT SOURCE
      │
      ├── systems/page.tsx ............. 238 ln  [SERVER]  Systems Atlas
      │     ├── SystemArchitectureStack 175 ln  [CLIENT]  ← only client cmp here, deliberate
      │     ├── PrimaryLifecycle ...... 160 ln  [SERVER]
      │     ├── FeedbackLoop .......... 115 ln  [SERVER]
      │     ├── WildfireExtensibility ..  82 ln  [SERVER]
      │     ├── LogisticsResponseLayer .  72 ln  [SERVER]
      │     ├── systems-primitives .....  82 ln  [SERVER]
      │     ├── content/systems-data.ts ........ 522 ln  ◀── CONTENT SOURCE
      │     └── content/evidence.ts .............  12 ln  ◀── CONTENT SOURCE
      │
      └── dashboard/page.tsx ............ 12 ln  [SERVER]  Stewardship Console
            └── StewardshipConsole ..... 559 ln  [CLIENT]  useState/useEffect, no fetch
                  ├── viz-primitives ... 185 ln  [CLIENT]
                  └── content/scenarios.ts ..... 277 ln  ◀── CONTENT SOURCE

  SHARED (repo-level, imported by Rock Creek):
    components/ProjectHeader · ProjectBreadcrumb · PageNavIndicator · HeroDraftingPlate
    data/projects.ts (registry) · data/heroPlates.ts

  TOTAL: 29 files · 5,527 lines · 7 client components · 1,203 lines of content modules
```

### Route-by-route function

| Route | Role | Interactivity | Content module |
|---|---|---|---|
| `/rock-creek-os` | Narrative entry; problem statement + evidence boundary + 3 destination cards | Nav only | **none — inline JSX** |
| `/rock-creek-os/explorer` | *What* the problem is: 1 primary + 2 supporting systems | Chain steps, overlay diagram | `explorer-data.ts` |
| `/rock-creek-os/systems` | *How* it works: 5-layer architecture, lifecycle, extensibility, feedback | 1 component only (deliberate) | `systems-data.ts` + `evidence.ts` |
| `/rock-creek-os/dashboard` | *What it feels like*: scenario-driven decision console | Full — scenario switching, staff-decision gate | `scenarios.ts` |

---

## 2 — Data Flow Diagram

```
  BUILD TIME                                        │  RUNTIME (browser)
  ═══════════════════════════════════════════════   │  ═══════════════════════
                                                    │
  rock-creek-os-foundation.md   (376 ln, root)      │
  rock-creek-os--page-ia-spec.md (35 KB)            │
  rock-creek-os--portfolio-audit.md (20 KB)         │
          │                                         │
          │  ⚠ MANUAL TRANSCRIPTION — human only    │
          │    no script, no parser, no validation  │
          ▼                                         │
  ┌───────────────────────────────────────┐         │
  │  TypeScript content modules            │        │
  │  explorer-data.ts    392 ln            │        │
  │  systems-data.ts     522 ln            │        │
  │  scenarios.ts        277 ln            │        │
  │  evidence.ts          12 ln            │        │
  └───────────────────────────────────────┘         │
          │  static ES import                       │
          ▼                                         │
  Server Components (RSC render)                    │
          │                                         │
          ▼                                         │
  next build → output:'export'                      │
          │                                         │
          ▼                                         │
  out/projects/rock-creek-os/**/index.html  ────────┼──▶  HTML delivered
    dashboard/index.html = 40,020 bytes             │          │
          │                                         │          ▼
          └── JS bundle (content re-embedded) ──────┼──▶  hydration
                                                    │          │
                                                    │          ▼
                                                    │    useState only
                                                    │    ZERO network calls
                                                    │    ZERO fetch()
```

**Verified:** `grep -rn "fetch(|useSWR|axios|useQuery|getServerSideProps|revalidate" app/projects/rock-creek-os/` returns **no matches**. Scenario switching in the console is pure client state over compiled-in constants.

### Contrast — the one route in the repo that *does* pull live data

```
  Notion API ──▶ lib/notion-os.ts ──▶ /projects/environmental-systems-design-os
                 (build time, 5 DBs)   (the ONLY Notion-connected route)
```

Rock Creek and the OS page share **zero** data infrastructure.

---

## 3 — Investigation findings

### 3.1 Content sources

| Question | Answer | Evidence |
|---|---|---|
| Are pages hardcoded? | **Yes — entirely** | 1,203 ln of TS content modules + inline JSX on the landing page |
| Are pages CMS-driven? | **No** | No CMS dependency in `package.json`; no CMS client anywhere |
| Is Notion already connected? | **No** | Zero imports of `@/lib/notion-os` under `app/projects/rock-creek-os/` |
| Is there an API layer? | **Effectively no** | 3 routes exist under `app/api/` — all inert, see below |
| Is there webhook infrastructure? | **No** | No handlers, no signature verification, no revalidation endpoints |
| Is there static JSON? | **No** | Content is `.ts` modules. Only JSON in repo: `public/cursor-usage.json` (unrelated), build manifests |
| Is there mock data? | **Yes, but not here** | `lib/api/notion.js` is a fabricated mock — **imported by nothing** |

**On the API layer.** `app/api/openai/route.js`, `app/api/strava/route.js`, and `app/api/update-cursor-analytics/route.js` all declare `export const dynamic = "force-static"`. Under `output: 'export'` this compiles them to static responses at build time — a `POST` handler cannot receive a POST, and `update-cursor-analytics` calls `execSync` to spawn a Node script, which cannot execute on a static host. **These three routes are dead code.** None of them touch Rock Creek.

**On "mock" vs "modeled".** Rock Creek's `scenarios.ts` contains figures like `58°F` and `70°F trout-stress threshold`. These are **modeled, deliberately labeled** values, not mock data — the metadata on `/dashboard` states "modeled values, not Ranch measurements," and the content modules carry an explicit in-file prohibition against reintroducing unsourced precision. This is a discipline worth preserving through any migration.

### 3.2 Environment configuration

| File | Status | Notes |
|---|---|---|
| `package.json` | ✅ | `@notionhq/client ^2.2.15` already a dependency |
| `.env.local.example` | ❌ **does not exist** | No documented env contract anywhere in the repo |
| `.env.local` | ❌ **does not exist** | `.gitignore` line: `.env*` |
| `next.config.js` | ✅ | `output: 'export'`, `trailingSlash: true`, conditional `basePath` |
| `vercel.json` | ✅ | `framework: null`, `outputDirectory: "out"`, 16 redirects, cache headers |
| `.github/workflows/nextjs.yml` | ⚠️ | GitHub Pages deploy — **no `env:` or `secrets:` block** |
| `.vercel/project.json` | ✅ | `dan-meier-portfolio` |

**Environment variables referenced repo-wide** (by count of references):

| Variable | Refs | Consumer | Documented? |
|---|---|---|---|
| `NEXT_PUBLIC_BASE_PATH` | 88 | asset paths sitewide | via `next.config.js` |
| `NODE_ENV` | 34 | build/dev branching | standard |
| `VERCEL` / `VERCEL_URL` / `VERCEL_ENV` | 6 | basePath switch | `next.config.js` comment |
| **`NOTION_API_KEY`** | **2** | `lib/notion-os.ts`, introspect script | ❌ **nowhere** |
| `OPENAI_API_KEY` | 1 | dead API route | `OPENAI_SETUP.md` |
| `STRAVA_*` (4 vars) | 4 | dead API route | ❌ |
| `FIGMA_PUBLIC_URL` | 2 | `lib/api/figma.js` | ❌ |

**Two deploy pipelines, one key.** Vercel builds from `vercel.json` (`npm run build` → `out/`). GitHub Actions builds on every push to `main` and deploys to Pages with **no secrets configured** — so on that pipeline `NOTION_API_KEY` is undefined, every Notion query fails, `lib/notion-os.ts` returns `[]`, and the OS page silently renders curated static fallback. Rock Creek is unaffected today (it reads nothing), but **any Notion integration inherits this split immediately.**

**No Notion credentials, CMS integrations, or API dependencies exist for Rock Creek.** The Notion dependency is installed and used by exactly one unrelated route.

### 3.3 Existing data architecture

**Content modules — the four datasets**

| Dataset | Lines | Exported types | Purpose |
|---|---|---|---|
| `explorer/content/explorer-data.ts` | 392 | `EvidenceTier`, `ChainStep`, `SupportingSystem`, `OverlayNode` | Premise, primary challenge, 2 supporting systems, overlay graph, signal→experience, evidence boundary |
| `systems/content/systems-data.ts` | 522 | `ArchitectureLayer`, `LifecycleStage`, `LifecycleFlow`, `ExtensibilityColumn`, `FeedbackNode`, `FeedbackEdge`, `FutureArtifact` | 5-layer architecture, hydrology lifecycle, extensibility, logistics, feedback graph, future artifacts |
| `dashboard/content/scenarios.ts` | 277 | `ConditionStatus`, `TrendDirection`, `ScenarioId`, `ActivityImpact`, `LogisticsAction`, `Scenario` | 3 full scenarios (normal / heat / compound), loop stages, console metadata |
| `systems/content/evidence.ts` | 12 | `EvidenceTier` | Tier vocabulary for the Atlas |

**Shared content models: there are none.** Every type above is declared locally in its own route. `EvidenceTier` and `evidenceTierLabels` are **defined twice** — identically — in `explorer-data.ts` and `evidence.ts`.

This duplication is **deliberate and documented**, not an oversight. `evidence.ts` states the rationale: *"Systems and Explorer are siblings, not a dependency of one on the other, and each route owns its own content module."* Treat it as an intentional coupling trade-off. Note only that it currently costs a synchronization obligation with no mechanism enforcing it.

**Data loaders: none.** No loader, no adapter, no fetch layer, no transform step. Components import constants directly.

**Repo-level shared models:**
- `data/projects.ts` (23 KB) — the project registry. Types: `ProjectTrack`, `ProjectType`, `ProjectVisibility`, `PracticeOSCategory`, `PracticeDomainTrack`, `PracticeAssetType`, `ProjectMaturity`, `EvidenceLevel`
- `data/heroPlates.ts` — hero-plate assignment map
- `types/dashboard.ts` — belongs to an unrelated dashboard feature; **not used by Rock Creek**

**Convention divergence:** Rock Creek is the only project in the repo using a `content/` **directory** per route. Four others (`environmental-systems-design-os`, `intention-engine`, `responsive-ecologies`, `wayfinding-matrix`) use a single `content.ts`. Rock Creek's split is the correct response to its scale — but it means the repo now carries two content conventions with no documented rule for which applies when.

---

## 4 — Notion Integration Assessment

**Current state: not integrated. Not partially integrated. Zero connection.**

| Dimension | Assessment |
|---|---|
| Connection | ❌ None — no import of `lib/notion-os` in any Rock Creek file |
| SDK availability | ✅ `@notionhq/client ^2.2.15` installed, working pattern proven on the OS page |
| Credentials | ❌ No `NOTION_API_KEY` locally; undocumented; absent from GH Actions |
| Target databases | ❌ No `Case Studies` DB; no `Environmental Signals` DB (see companion audit §4) |
| Relational spine | ❌ One relation edge exists OS-wide (Artifact→Project) |
| Refresh model | ⚠️ Static export → deploy-to-refresh only; no ISR possible |
| Reference implementation | ✅ `lib/notion-os.ts` is a clean, correct, reusable pattern |

### What would have to be true for Rock Creek to be Notion-driven

Rock Creek's content is **not tabular**. `systems-data.ts` holds a five-layer architecture with per-layer signal lists, a lifecycle with typed flow edges, an extensibility comparison, and a directed feedback graph with typed edges. `scenarios.ts` holds three deeply-nested scenario objects with river state, fire state, interpretation, staged response, guest experience, and outcome.

Notion databases model **rows with flat properties**. Representing a typed directed graph or a five-level nested scenario in Notion means either heavy relation modeling across many databases, or storing structured blobs in rich-text fields — which discards every advantage of using a database.

**The honest assessment: not all of Rock Creek should move to Notion, and forcing it would degrade the work.** The realistic split:

| Content class | Notion-suitable? | Why |
|---|---|---|
| Evidence claims + source citations + tier | ✅ **Strong fit** | Naturally tabular; needs cross-project reuse; needs auditability |
| Environmental signals (temp, flow, fire, thresholds) | ✅ **Strong fit** | Genuinely a registry; needed by Rock Creek, ASC, Shore Lodge, Whitetail, Yellowstone |
| Case-study metadata (title, status, disclaimer, frame) | ✅ **Strong fit** | Already half-modeled in `data/projects.ts` |
| Future artifacts / roadmap | ✅ **Good fit** | Flat, list-shaped |
| Scenarios | ⚠️ **Partial** | Top-level rows workable; nested state better kept local |
| Architecture layers / lifecycle / feedback graph | ❌ **Poor fit** | Typed graph structures; keep in TypeScript |
| Narrative prose, section framing, headings | ❌ **Keep local** | This is the narrative control the strategy explicitly protects |

---

## 5 — Technical Debt Assessment

Ordered by severity. Severity reflects user-visible impact and blocking effect on the six-project scale goal.

### D1 — Landing page advertises content that no longer exists · **Critical · user-visible**

[`app/projects/rock-creek-os/page.tsx:255-258`](app/projects/rock-creek-os/page.tsx:255) describes the Systems Atlas as:

> "Five frameworks … the environmental experience ecosystem, the rustic-reliability gap, the decision architecture, the five-layer sovereignty model, and the stewardship feedback loop."

`/systems` was rewritten to the Adaptive Stewardship frame and now delivers: Architecture Stack, Primary Lifecycle, Wildfire Extensibility, Logistics Response Layer, Feedback Loop. **Three of the five named frameworks no longer exist on the page this card links to.** A visitor clicking "Explore the Atlas" is promised content that was removed.

The page's own header comment acknowledges the two frames are unreconciled — but that comment predates the `/explorer` and `/systems` rewrites, which have since moved. This is now stale in a way the comment does not cover.

### D2 — Evidence tier vocabulary diverges from the source of truth · **Critical · credibility**

`rock-creek-os-foundation.md` §1 specifies **four tiers**, and is emphatic about why:

> "Four tiers, not three — the fourth split matters specifically because this project proposes both near-term design concepts and further-out speculative capabilities."

Tiers: `Established` · `Inferred` · `Proposed` · `Future`. Of `Future` it says: *"§3.5 — this is the single most important line in the boundary."*

The code implements **three**: `EvidenceTier = 'documented' | 'inferred' | 'proposed'` (both `explorer-data.ts:28` and `evidence.ts:6`).

So: `Established` was renamed to `Documented`, and **`Future` was dropped entirely.** Speculative capabilities that the foundation doc insists must be separated from near-term proposals are currently rendered under the same `Proposed` badge. On the project the portfolio audit already flagged for unsourced precision, this is the highest-credibility-risk item in the codebase.

### D3 — Frame conflict unresolved · **High · blocks all modeling**

`rock-creek-os-foundation.md` §0 documents a live conflict — the research is *Rock Creek Adaptive Stewardship OS* (hydrological), the original build was *Infrastructure Sovereignty OS* (energy/mobility) — and names three unresolved options: **Supersede, Fork, Merge.**

Current state is an unlabeled partial supersede: `/explorer`, `/systems`, `/dashboard` have moved to the Stewardship frame; `/` and `data/projects.ts` still describe Sovereignty. Nothing records that this migration happened or that it is incomplete.

### D4 — `data/projects.ts` registry entry is stale · **High · user-visible**

The registry summary for `rock-creek-os` reads *"A five-layer operating model and systems atlas…"* — the superseded frame. It also sets `type: 'Concept'` / `projectType: 'concept'` while the page title is literally *"Case Study: The Ranch at Rock Creek"*. This entry feeds project cards and navigation sitewide.

### D5 — Foundation doc references files that do not exist · **Medium**

`rock-creek-os-foundation.md` §0 cites `app/projects/rock-creek-os/content/frameworks.ts` and `dashboard/content/datasets.ts`. Neither exists. Actual files: `explorer-data.ts`, `systems-data.ts`, `scenarios.ts`, `evidence.ts`. The source-of-truth document cannot be navigated from its own file references.

### D6 — No documented environment contract · **Medium · onboarding + deploy**

No `.env.local.example` anywhere. `NOTION_API_KEY` is required for a correct build and is documented in no file. A fresh clone produces a silently degraded OS page with no signal that anything is wrong.

### D7 — GitHub Actions pipeline cannot carry secrets · **Medium**

`.github/workflows/nextjs.yml` runs `next build` with no `env:` block. Any Notion-dependent route built by this pipeline silently degrades. Two active deploy targets with divergent capability, and no documentation of which is canonical.

### D8 — Three dead API routes · **Medium · security surface**

All three `app/api/*` routes are `force-static` under `output: 'export'` and cannot function. `update-cursor-analytics/route.js` calls `execSync` on a path built from `process.cwd()` — inert today, but a live shell-execution handler that would become real if `output: 'export'` were ever removed to enable ISR. **That is exactly the change a Notion integration would tempt you to make.**

### D9 — Dead Notion mock · **Low**

`lib/api/notion.js` returns fabricated project data and is imported by nothing. It shares a name with the real integration — a live trap for anyone grepping "notion" while wiring Rock Creek.

### D10 — Duplicated evidence vocabulary with no sync mechanism · **Low · deliberate**

`EvidenceTier` defined twice, identically, by documented choice. Acceptable — but D2 shows both copies drifted from the source doc **in the same way at the same time**, which is what duplication without a shared reference produces.

### D11 — Untracked Figma Make export at repo root · **Low · housekeeping**

`Environmental Experience OS Dashboard/` + a 45 KB `.zip` — a standalone Vite/React app, unreferenced by the build, sharing a name with the `/dashboard` route. Confusing to anyone navigating the repo.

### D12 — Landing page is the only route without a content module · **Low · consistency**

`page.tsx` holds its copy inline in JSX while all three siblings use content modules. This is why D1 could drift unnoticed: its content is not in a file anyone reviews as content.

---

## 6 — Recommended Integration Strategy

**Sequencing principle: fix truth before adding plumbing.** D1–D5 are content-integrity defects that exist independent of Notion. Migrating them into a database first would encode current errors into a system of record and make them harder to correct.

### Phase 0 — Correct what is already wrong *(no Notion, no new infrastructure)*

Resolve D1, D2, D4, D5. Specifically: reconcile the landing-page Atlas card with what `/systems` ships; restore the four-tier evidence vocabulary including `Future`; update the `data/projects.ts` registry entry; correct the foundation doc's file references. Add `.env.local.example` documenting `NOTION_API_KEY` (D6).

**Gate:** Phase 1 should not begin while a page is advertising removed content.

### Phase 1 — Decide the frame *(decision, not implementation)*

Resolve D3 — Supersede, Fork, or Merge — and record the decision in the foundation doc. **This determines whether Rock Creek is one case-study record or two**, which every subsequent modeling choice depends on. This is a judgment call about the work, not a technical question.

### Phase 2 — Establish the two databases that scale *(narrow, high-value)*

Per the companion audit, the missing pieces are `Case Studies` and `Environmental Signals`. Introduce them for **cross-project reuse**, not to relocate Rock Creek's prose:

- **Environmental Signals** — the registry the portfolio already claims exists and does not have. Signal, type, unit, threshold, source citation, evidence tier. Rock Creek's hydrology and fire signals become its first rows; ASC, Shore Lodge, Whitetail, and Yellowstone reuse them. This turns a currently-unbacked portfolio claim into a real asset.
- **Case Studies** — evaluate first whether `Projects & Concepts` already serves this role. It carries `Work Type`, `Maturity Stage`, `Portfolio Priority`, `External Link`. Reuse before creating; a discriminator plus richer relations may be sufficient.

Also model **evidence claims** — claim text, tier, source ID, project relation. This is what makes evidence discipline auditable across projects instead of re-typed per project.

### Phase 3 — Generalize the data layer

`lib/notion-os.ts` is single-page-shaped: hard-coded IDs, one function per database, return types built for one page. Before a second consumer, it needs a database-ID registry in one place, per-project scoping, and relation resolution that returns IDs (not just titles) so the portfolio can link records to pages.

### Phase 4 — Hybrid content model for Rock Creek

The target is **not** "Rock Creek reads from Notion." It is:

```
Notion  ──▶  signals · evidence claims · case-study metadata · future artifacts
Local   ──▶  architecture graphs · lifecycle · feedback edges · narrative prose
             section framing · headings · scenario nesting
```

Preserve the four narrative-control mechanisms already working on the OS page: source-side filtering, narrow projected interfaces, repo-owned section copy, curated fallback. Add the one that is missing — a **build-time assertion that live data was actually retrieved**, so a missing key fails loudly instead of rendering stale content as current.

### Explicitly not recommended

- **Do not remove `output: 'export'` to enable ISR.** It would activate three dead API routes, one of which executes shell commands (D8).
- **Do not migrate narrative prose to Notion.** It is the stated strategic goal to avoid becoming a database viewer.
- **Do not add webhooks yet.** Deploy-to-refresh is adequate for a portfolio case study; webhooks add real infrastructure for no reader-facing benefit at this stage.

---

## 7 — Risk Analysis

| # | Risk | Likelihood | Impact | Notes / mitigation |
|---|---|---|---|---|
| R1 | Visitor clicks "Explore the Atlas," finds different content than promised | **Certain — live now** | High | D1. Fix in Phase 0 |
| R2 | Speculative capability read as near-term proposal | **High** | High | D2. Missing `Future` tier on the project already flagged for unsourced precision |
| R3 | Notion migration encodes current content errors into the system of record | High if Phase 0 skipped | High | Sequencing gate above |
| R4 | Silent degradation: missing key renders stale content as current | **Certain on GH Actions** | High | D7 + fallback design. Needs build-time assertion |
| R5 | Modeling Rock Creek before the frame decision produces schema needing rework | High | Medium | D3. Phase 1 gates Phase 2 |
| R6 | Forcing graph-shaped content into Notion degrades the work | Medium | High | Hybrid model, §6 Phase 4 |
| R7 | Removing `output: 'export'` for ISR activates `execSync` route | Low, **rising with integration work** | **Critical** | D8. Delete dead routes before any rendering-mode change |
| R8 | Editorial voice flattens into database rendering | Medium | High | The explicit strategic failure mode. Preserve the four mechanisms |
| R9 | Duplicated `EvidenceTier` copies drift apart | **Already happened** | Medium | D10 + D2 |
| R10 | Two deploy targets diverge in content | Medium | Medium | D7. Decide canonical target |
| R11 | Notion becomes a runtime dependency for a portfolio that must always render | Low today | High | Current fallback design is correct — keep it, add the assertion |
| R12 | Content module rewrites lose git-recoverable components | Low | Medium | Already mitigated — `components/index.ts` files record recovery commands |

---

## 8 — Files Requiring Modification

Grouped by phase. **No changes made in this audit.**

### Phase 0 — Content integrity *(4 files + 1 new)*

| File | Change | Debt |
|---|---|---|
| [`app/projects/rock-creek-os/page.tsx`](app/projects/rock-creek-os/page.tsx:255) | Rewrite Systems Atlas card (lines ~253–259) to match shipped `/systems`; update stale header comment | D1, D12 |
| [`app/projects/rock-creek-os/explorer/content/explorer-data.ts`](app/projects/rock-creek-os/explorer/content/explorer-data.ts:28) | Restore 4-tier vocabulary; add `Future`; rename `documented`→`established`; re-tier affected claims | D2 |
| [`app/projects/rock-creek-os/systems/content/evidence.ts`](app/projects/rock-creek-os/systems/content/evidence.ts:6) | Same change, kept in sync | D2, D10 |
| [`data/projects.ts`](data/projects.ts:169) | Update `rock-creek-os` summary to current frame; reconsider `type: 'Concept'` vs case study | D4 |
| `.env.local.example` | **New file** — document `NOTION_API_KEY`, note which builds require it | D6 |

*Consumers of the tier change (badge rendering may need a fourth variant):* `explorer/components/explorer-primitives.tsx`, `explorer/components/PrimaryChallenge.tsx`, `systems/components/systems-primitives.tsx`, `explorer/page.tsx`, `systems/page.tsx`.

### Phase 0b — Documentation

| File | Change |
|---|---|
| `rock-creek-os-foundation.md` | Fix §0 file references (D5); record the partial-supersede state |
| `rock-creek-os--page-ia-spec.md` | Reconcile with shipped IA |

### Phase 1 — Frame decision

| File | Change |
|---|---|
| `rock-creek-os-foundation.md` §0 | Record Supersede / Fork / Merge decision and date |
| `data/projects.ts` | If **Fork** — add a second registry entry and route |

### Phase 2–3 — Notion integration

| File | Change |
|---|---|
| `lib/notion-os.ts` | Extract DB-ID registry; generalize per-project; return relation IDs not just titles |
| `scripts/introspect-notion-os.mjs` | Consume shared registry (currently duplicates IDs) |
| `scripts/verify-notion-os.mts` | Extend to new databases; add non-empty assertion |
| **New** `lib/os-registry.ts` *(name TBD)* | Single source for database IDs |
| `.github/workflows/nextjs.yml` | Add secrets, or retire the pipeline (D7) |

### Phase 4 — Rock Creek consumption

| File | Change |
|---|---|
| `explorer/content/explorer-data.ts` | Signals + evidence claims sourced from Notion; graph structures stay local |
| `systems/content/systems-data.ts` | `futureArtifacts` from Notion; architecture/lifecycle/feedback stay local |
| `dashboard/content/scenarios.ts` | Signal definitions + thresholds from Notion; nested scenario state stays local |
| `explorer/page.tsx` · `systems/page.tsx` · `dashboard/page.tsx` | Become `async` server components |
| `dashboard/components/StewardshipConsole.tsx` | Accept scenario data as props (currently imports directly) |

### Cleanup — any time, independent

| File | Change | Debt |
|---|---|---|
| `lib/api/notion.js` | **Delete** — dead mock, name collision | D9 |
| `app/api/openai/route.js` | **Delete or document as inert** | D8 |
| `app/api/strava/route.js` | **Delete or document as inert** | D8 |
| `app/api/update-cursor-analytics/route.js` | **Delete** — inert `execSync` handler, highest-risk of the three | D8, R7 |
| `Environmental Experience OS Dashboard/` + `.zip` | Move out of repo root or gitignore | D11 |

---

## Appendix — Audit method

Every claim above is derived from static inspection of the working tree at `main` (`ed514fad`). Verification commands used: file enumeration and line counts across `app/projects/rock-creek-os/`; import-graph tracing for `@/lib/notion-os` and `lib/api/notion`; a negative grep for `fetch(`, `useSWR`, `axios`, `useQuery`, `getServerSideProps`, `revalidate` across the Rock Creek tree; an enumeration of `process.env.*` references repo-wide; and reads of `next.config.js`, `vercel.json`, `.github/workflows/nextjs.yml`, `.vercel/project.json`.

**Not verified:** the live Notion workspace (no `NOTION_API_KEY` available — see companion audit §0), and runtime behavior of the deployed site. The `out/` directory was inspected as a build artifact only.
