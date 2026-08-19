# Current Notion OS Architecture

**Type:** Integration audit — current state only. No changes made, no code written.
**Scope:** The live Notion → portfolio data path as encoded in this repository.
**Date:** 2026-08-18

> **Red-team note.** This is an audit + gap-fill against existing systems, not a new strategy document. It adds no new framework, no new taxonomy, and no new commitments. It documents what is already built.

---

## 0 — Verification boundary (read first)

I could **not** query the live Notion workspace during this audit:

- There is no `.env.local` (or any `.env*`) in the repository — `.gitignore` line: `.env*`
- `NOTION_API_KEY` is not present in the shell environment

Everything in this document is derived from the code that **constitutes the integration contract** — `lib/notion-os.ts`, `scripts/introspect-notion-os.mjs`, `scripts/verify-notion-os.mts`, and the consuming page. That contract is authoritative about *what the portfolio reads*, and it is exact about database IDs, property names, filters, sorts, and types.

It is **not** authoritative about what else exists in the Notion workspace. Specifically: I cannot confirm or deny the existence of databases that the integration does not reference. Where this document says a database is "absent," it means **absent from the integration** — not proven absent from Notion.

To lift that boundary, restore `.env.local` with `NOTION_API_KEY` and run:

```bash
node --env-file=.env.local scripts/introspect-notion-os.mjs
```

That prints every property and every select/multi-select/status option for the five wired databases. It does **not** discover unwired databases — see §4 for what to add.

---

## 1 — The integration at a glance

```
NOTION WORKSPACE (source of truth)
  5 databases, hard-coded IDs
        │
        │  @notionhq/client v2.2.15, pinned notionVersion '2022-06-28'
        │  read-only · no writes · no webhooks
        ▼
lib/notion-os.ts
  5 exported async functions
  per-database: filter → project to narrow interface → sort in JS
  every function try/catch → returns [] on failure
        │
        │  BUILD TIME ONLY (async Server Component)
        │  next.config: output: 'export' — no ISR, no revalidate
        ▼
app/projects/environmental-systems-design-os/page.tsx
  Promise.all of all 5 fetches
        │
        ▼
components/LiveSections.tsx
  live rows  ──or──  curated STATIC_* fallback when live returns []
        │
        ▼
Static HTML, baked at deploy. API key never reaches the browser.
```

**Single consumer.** Exactly one route reads Notion: `/projects/environmental-systems-design-os`. Confirmed by import trace — the only importers of `@/lib/notion-os` are that page, its `LiveSections.tsx`, and the verify script.

**Refresh cadence:** deploy-to-refresh. Because the site is `output: 'export'`, content changes in Notion do not appear until the next Vercel build. This is a deliberate, documented choice in the file header, not an oversight.

---

## 2 — Database inventory (the 5 that are wired)

| # | Database | ID | Read by | Source filter |
|---|---|---|---|---|
| 1 | Organizations | `3d58ea50-5593-4fac-a3f6-2b1cb0d882eb` | `getStudiedOrganizations()` | `Status` (select) = `Actively Studying` |
| 2 | System Artifacts | `f4ebb36a-5d2f-4586-a511-370156d1d9b8` | `getSystemArtifacts()` | none — full table |
| 3 | Experience Patterns | `a17d85b2-7afd-41ff-8902-6256fe94f385` | `getExperiencePatterns()` | `Strategic Relevance` ∈ {4,5} AND `Maturity` ≠ `Archived` |
| 4 | **Projects & Concepts** | `15850fbe-b755-4cf7-9f58-2a4dd38b9e44` | `getProjects()` | `Status` (status) ∈ {`Active`, `Completed`, `Published (Portfolio)`} |
| 5 | Portfolio Assets | `b1fc6b8d-6080-4a83-8c43-fffc923de4db` | `getPortfolioAssets()` | `Portfolio Ready` (checkbox) = true |

All five are paginated correctly (`queryAll`, `page_size: 100`, cursor loop).

### Property contract, per database

**1. Organizations** → `StudiedOrganization`
| Property (exact) | Notion type | Mapped field |
|---|---|---|
| `Organization` | title | `name` |
| `Organization Type` | select | `orgType` |
| `Systems Layers` | multi_select | `systemsLayers[]` |
| `Strategic Relevance` | select *(numeric string)* | `strategicRelevance` (parsed int) |
| `Status` | select | `status` |

**2. System Artifacts** → `SystemArtifact`
| Property (exact) | Notion type | Mapped field |
|---|---|---|
| `Artifact` | title | `name` |
| `Artifact Type` | select | `artifactType` |
| `Status` | **status** | `status` |
| `Maturity` | select | `maturity` |
| `Evidence Confidence` | select | `evidenceConfidence` |
| `Version` | rich_text | `version` |
| `Project` | **relation** | `project` (first related page title only) |

**3. Experience Patterns** → `ExperiencePattern`
| Property (exact) | Notion type | Mapped field |
|---|---|---|
| `Experience Pattern` | title | `name` |
| `Value Focus / Structural Intent` | rich_text | `valueIntent` (truncated to 120 chars) |
| `Systems Layers` | multi_select | `systemsLayers[]` |
| `Strategic Relevance` | select *(numeric string)* | `strategicRelevance` |
| `Maturity` | select | `maturity` |

**4. Projects & Concepts** → `OsProject`
| Property (exact) | Notion type | Mapped field |
|---|---|---|
| `Project / Concept` | title | `name` |
| `One-Line Pitch` | rich_text | `pitch` |
| `Work Type` | select | `workType` |
| `Maturity Stage` | select | `maturityStage` |
| `Systems Layers` | multi_select | `systemsLayers[]` |
| `Portfolio Priority` | select | `portfolioPriority` |
| `External Link` | url | `externalLink` |
| `Status` | **status** | `status` |
| `Strategic Relevance (1–5)` | select | *sort key only — not surfaced* |

⚠️ `Strategic Relevance (1–5)` uses an **en-dash (–), not a hyphen**. This is already flagged in-code as an exact-match requirement. Renaming that property in Notion silently breaks the sort — it will not error, it will just sort by nothing.

**5. Portfolio Assets** → `PortfolioAsset`
| Property (exact) | Notion type | Mapped field |
|---|---|---|
| `Title` | title | `name` |
| `Asset Type` | select | `assetType` |
| `Portfolio Section` | select | `portfolioSection` |
| `Evidence Role` | select | `evidenceRole` |
| `Status` | select | `status` |
| `Portfolio Ready` | checkbox | `portfolioReady` |
| `Strategic Relevance` | **number** | `strategicRelevance` |

---

## 3 — Relations: one edge, traversed shallowly

The OS has exactly **one relation the portfolio reads**:

```
System Artifacts ──[ Project ]──▶ Projects & Concepts
```

Implementation characteristics, all of which matter for scaling:

- **First-only.** `firstRelationTitle()` takes `ids[0]` and discards the rest. An artifact used by three projects renders as belonging to one.
- **Title-only.** It resolves to a display string. No ID, no href, no round-trip — so the portfolio *cannot* currently link an artifact to its project page.
- **N+1 fetch.** Each unique relation target costs one `pages.retrieve()` call. Cached per build via `relationTitleCache`, so cost is O(unique targets), not O(rows) — but it is still a serial-ish fan-out at build time.

**Everything else in the OS is joined by convention, not by relation.** `Systems Layers` (multi_select) is the de facto cross-database spine — it appears in Organizations, Experience Patterns, and Projects & Concepts. It does **not** appear in System Artifacts or Portfolio Assets. That means the documented evidence path:

> Research or Field Note → Signal / Audit / Pattern → Opportunity / Scenario → Project → Artifact → Portfolio Asset
> *(`content.ts`, `evidencePathTrace`)*

…is **asserted in prose but not traversable in data.** Only the Artifact→Project hop exists as a real edge. This is the single most consequential structural finding in this audit.

---

## 4 — The three databases you asked me to inspect

| Database | Status in integration | Evidence |
|---|---|---|
| **Projects & Concepts** | ✅ **Wired and live** | DB #4 above |
| **Case Studies** | ❌ **Not referenced anywhere in the integration** | No DB ID, no query, no type |
| **Environmental Signals** | ❌ **Not referenced anywhere in the integration** | No DB ID, no query, no type |

Per §0, this means absent *from the code* — they may exist in Notion, unwired.

**Where "Case Study" actually lives today.** It is a **taxonomy value, not a database**:
- `docs/strategy/practice-taxonomy-audit.md:39` — `projectType` option: `Case Study`
- Same file `:89` — `stage` option: `Shipped Case Study`
- Twelve legacy client projects are classified this way (Purdue, TimberTech, Intel, Nodalytics, …), all pointing at hard-coded routes under `/projects/previous/`
- In Notion, the nearest equivalent record type is a **Portfolio Assets** row with `Asset Type` = case study

**Where "Environmental Signals" actually lives today.** It is **hard-coded content in three separate places**, with no shared source:
- `LiveSections.tsx:20` — `STATIC_ARTIFACTS[0]` = `{ name: 'Environmental Signal Taxonomy', artifactType: 'Taxonomy' }` — a *fallback literal*, shown only when Notion returns zero artifacts
- `content.ts` — `architectureLayers.artifacts[0]` = `'Environmental Signal Taxonomy'` — a *label in a diagram*
- Local TS content in `rock-creek-os/`, `responsive-ecologies/`, `wayfinding-matrix/`, `field-notes/`

So the portfolio makes a signal-taxonomy claim in four places and **no database backs it.** If a reviewer asked "show me the signal taxonomy," there is prose and a diagram label, but no registry.

---

## 5 — Taxonomies as currently encoded

These are the option sets the code depends on. Values are exact; ordering is the render precedence.

| Taxonomy | Values (in sort order) | Where |
|---|---|---|
| Artifact Maturity | `Portfolio Candidate` → `Validated` → `Tested` → `Structured` → `Concept` | System Artifacts |
| Pattern Maturity | `Validated` → `Evidence Building` → `Drafted` → `Candidate` | Experience Patterns |
| Portfolio Priority | `High` → `Medium` → `Low` | Projects & Concepts |
| Asset Status | `Published` → `Ready for Portfolio` → `Review` → `In Progress` → `Draft` → `Archived` | Portfolio Assets |
| Project Status | `Active`, `Completed`, `Published (Portfolio)` *(filter allow-list)* | Projects & Concepts |
| Org Status | `Actively Studying` *(filter)* | Organizations |
| Strategic Relevance | `1`–`5` | Four databases — **inconsistently typed** |
| Systems Layers | *(open multi_select — options not readable without live access)* | Orgs, Patterns, Projects |

### Two taxonomy inconsistencies worth naming

1. **`Strategic Relevance` is a `select` of numeric strings in Organizations / Experience Patterns / Projects & Concepts, but a real `number` in Portfolio Assets.** The code compensates with a `toInt()` parse on one side and `numberVal()` on the other. It works, but it means the field cannot be filtered or rolled up uniformly across the OS, and a Notion-side formula or rollup spanning all four is impossible without a migration.

2. **`Status` is a `select` in Organizations and Portfolio Assets, but a `status` type in System Artifacts and Projects & Concepts.** These are different Notion primitives with different filter syntax (`select: { equals }` vs `status: { equals }`). Any future generic query helper has to branch on this.

Neither is broken today. Both are friction that compounds with each new database.

---

## 6 — Narrative control: what is already working

This is the part of the architecture that is genuinely well-built, and it directly serves the "don't become a generic Notion viewer" goal. Four mechanisms, all already in place:

1. **Curation at the source.** Every query filters. The portfolio never renders a whole table — it renders `Actively Studying` orgs, relevance-4+ patterns, `Portfolio Ready` assets. The Notion view *is* the editorial decision.

2. **Field projection.** Each database maps to a narrow hand-written TypeScript interface (5–9 fields). Adding a property in Notion does **not** leak it to the site. The interface is the contract.

3. **Editorial framing owned by the repo.** Every section's eyebrow and headline is hand-written in the component, not pulled from Notion — `"03 // Organizations Being Studied"` / `"Real systems under active research."` Notion supplies rows; the portfolio supplies meaning.

4. **Graceful degradation with curated fallback.** `ArtifactsSection`, `PatternsSection`, and `ProjectsSection` fall back to `STATIC_*` constants when Notion returns `[]`, and render a `CuratedNote` linking to the working OS. `OrganizationsSection` and `PortfolioAssetsSection` instead render a `SectionPlaceholder`.

**Keep all four when scaling.** They are the reason this reads as a case study rather than an embed.

### One risk inside mechanism 4

`lib/notion-os.ts` catches every error and returns `[]`. `LiveSections` treats `[]` as "not exported yet" and shows curated static content. These compose into a **silent failure mode**: a revoked API key, a renamed property, or an un-shared database produces a page that looks entirely healthy and current, but is showing hard-coded 2026-06 content. The only signal is a `console.error` in the build log and the small "Curated selection" note. There is no build-time assertion that live data was actually retrieved.

---

## 7 — The scaling gap: Rock Creek OS is 100% local

`/projects/rock-creek-os` is the largest project route in the repo — 4 pages, 29 files — and reads **zero** Notion data:

```
app/projects/rock-creek-os/
├── page.tsx
├── explorer/   content/explorer-data.ts     ← local TS
├── dashboard/  content/scenarios.ts         ← local TS
└── systems/    content/systems-data.ts      ← local TS
             └ content/evidence.ts           ← local TS
```

Its evidence discipline lives in **markdown at the repo root**, not in Notion:
- `rock-creek-os-foundation.md` (376 lines) — source-tagged research, `[S1]`–`[S5]`, four-tier evidence boundary (Established / Inferred / Proposed / Future)
- `rock-creek-os--page-ia-spec.md`
- `rock-creek-os--portfolio-audit.md` — which already flags the **missing Evidence Boundary module** as publish-blocking on this exact project

So the practice currently runs **two parallel, unreconnected evidence systems**: Notion (structured, live, one page) and markdown (rich, source-tagged, everything else). Rock Creek — the project with the most invented numbers and the only one naming a real business — sits entirely in the unstructured one.

**Also unresolved:** `rock-creek-os-foundation.md` §0 documents a live title/frame conflict — the doc is *Rock Creek Adaptive Stewardship OS* (hydrological frame) while the shipped build is *Infrastructure Sovereignty OS* (energy/mobility frame). The doc explicitly declines to resolve it and names three options: Supersede, Fork, or Merge. **That decision is upstream of any Notion modeling** — you cannot model a case study in a database until you know whether it is one case study or two. It also references `content/frameworks.ts` and `dashboard/content/datasets.ts`, neither of which exists; the actual files are `explorer-data.ts`, `scenarios.ts`, `systems-data.ts`, `evidence.ts`. The doc is stale against the build.

---

## 8 — Findings register

| # | Finding | Severity |
|---|---|---|
| F1 | Evidence path is asserted in prose but only one relation edge (Artifact→Project) exists in data | **High** — blocks traceability claims |
| F2 | No `Environmental Signals` database; the signal-taxonomy claim is backed by a fallback literal and a diagram label | **High** — unbacked portfolio claim |
| F3 | No `Case Studies` database; "case study" is a taxonomy value spread across `projectType`, `stage`, and Portfolio Assets | **High** — blocks the 6-project scale goal |
| F4 | Rock Creek OS (the flagship) is entirely local TS + root markdown, disconnected from the OS | **High** — the OS does not yet serve the work |
| F5 | Rock Creek title/frame conflict (Stewardship vs Infrastructure Sovereignty) unresolved | **High** — blocks modeling |
| F6 | Silent-failure mode: API failure renders as healthy curated content, no build assertion | **Medium** |
| F7 | Database IDs hard-coded in two files (`lib/notion-os.ts`, `introspect-notion-os.mjs`), already drifting from a single registry | **Medium** |
| F8 | `Strategic Relevance` typed inconsistently (select-string vs number) across 4 databases | **Medium** |
| F9 | `Status` typed inconsistently (`select` vs `status`) across 4 databases | **Medium** |
| F10 | Relation resolution is first-only, title-only, N+1 — cannot link artifact → project page | **Medium** |
| F11 | Property names are magic strings; the en-dash in `Strategic Relevance (1–5)` is a live rename trap | **Medium** |
| F12 | `lib/api/notion.js` is a dead mock — imported by nothing, returns fabricated project data | **Low** — delete candidate |
| F13 | `Environmental Experience OS Dashboard/` + `.zip` — a Figma Make Vite export sitting untracked at repo root, unreferenced by the build | **Low** — housekeeping |
| F14 | No `.env.local` present; live introspection is currently impossible locally | **Blocker for verification** |

---

## 9 — Readiness for the six-project target

Target: Rock Creek OS · Adaptive Stewardship Companion · Shore Lodge · Whitetail Club · Yellowstone Ecosystem · future case studies.

| Capability the target needs | Today |
|---|---|
| A canonical case-study record type | ❌ taxonomy value only (F3) |
| A signals registry feeding multiple projects | ❌ hard-coded per project (F2) |
| Project → Signal / Artifact / Asset traversal | ❌ one edge only (F1, F10) |
| Per-project pages driven by shared structure | ❌ 1 of 15 routes reads Notion (F4) |
| Evidence tier + source citation as data | ❌ markdown-only, per-project (F4) |
| Reusable multi-project data layer | ❌ `notion-os.ts` is single-page-shaped |
| Editorial/narrative control | ✅ **strong — four working mechanisms (§6)** |
| Build-time safety, key never exposed | ✅ correct for static export |
| Pagination, error isolation, caching | ✅ correct |

**Assessment.** The *plumbing* is sound and the *editorial discipline is genuinely good* — §6 is the hard part of this problem and it is already solved. What does not yet exist is the **relational spine**: the OS models the practice's meta-layer (orgs studied, artifacts made, assets published) but does not yet model the **case studies themselves or the signals that drive them**. That is why Rock Creek had to be built entirely outside it.

The gap is not integration quality. It is data modeling.

---

## 10 — Decisions required before an implementation plan

I am **not** proposing schema changes in this document — audit before modifying. Four decisions gate the plan, and three are yours alone:

1. **Rock Creek frame: Supersede, Fork, or Merge?** (`rock-creek-os-foundation.md` §0). Determines whether Rock Creek is one case-study record or two.
2. **Do `Case Studies` and `Environmental Signals` already exist in Notion, unwired?** Restore `.env.local` and run the introspect script; if they exist, this becomes a wiring job, not a modeling job. *(This one I can verify for you once the key is present.)*
3. **Should case studies be a new database, or is `Projects & Concepts` already that database under a different name?** Reuse before creating — `Projects & Concepts` already carries `Work Type`, `Maturity Stage`, `Portfolio Priority`, and `External Link`. It may only need a discriminator and richer relations.
4. **Does evidence tiering (Established / Inferred / Proposed / Future) move into Notion, or stay in markdown?** This is the real fork in the road: it decides whether Notion becomes the single source of truth for *claims*, or remains the source of truth for *inventory* while markdown owns claims.

Once 1–4 are answered, the next deliverable is a staged implementation plan: a database-ID registry, a generalized multi-project data layer, the relation spine, and a per-project page contract — sequenced so no existing page breaks.
