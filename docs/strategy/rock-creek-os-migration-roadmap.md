# Incremental Migration Roadmap — Rock Creek OS

**Master suite:** Phase 8. Plan only — no code, no repository source modified.
**Date:** 2026-08-18
**Predecessors:** Phase 6 Typed Domain Models · Phase 7 Component Mapping — both approved.

---

## 0 — Sequence correction, recorded

The prompt's sequence is **A** Dashboard KPI Cards → **B** System Tension Cards → **C** Scenario Modules → **D** Systems Explorer → **E** Systems Architecture. Two approved decisions change it. Nothing is dropped; original labels are carried throughout.

| Original | Becomes | Why |
|---|---|---|
| **A** Dashboard KPI Cards | **M5 — DEFERRED** | KPI Telemetry was deferred in Phase 2; `DashboardMetrics` was dropped in Phase 6 under option (b). **It has no source of record.** It also depends on decomposing a 559-line monolith — the project's highest-risk refactor. Worst possible first step |
| **B** System Tension Cards | **M1 — first** | Fully backed by approved schema, two components, simplest data shape. Correct place to prove the pattern |
| **C** Scenario Modules | **M4** | Requires decomposing `StewardshipConsole` (Phase 7 R2, medium-high risk). Belongs last among live migrations |
| **D** Systems Explorer | **M2** | Signals + claims; read-only display; low blast radius |
| **E** Systems Architecture | **M3** | Needs a **new** `RecursiveLoopDiagram` component (Phase 7 R3) |

**And one stage is added before all of them.** Phase 7 established that R1 (props-in), R4 (dedupe), and R5 (extract inline) require **no Notion connection**. They are pure decoupling against existing local content — executable today, while the verification gate is still blocked.

---

## 1 — The two techniques that make this low-risk

### 1.1 Decouple before connecting

After Stage 0, every component takes props. Switching a route from local content to Notion then becomes **a change to what fills the props** — one file — not a component rewrite.

```
BEFORE   component ──imports──▶ content module          (rewrite to migrate)
AFTER    page ──props──▶ component                      (swap the source)
             ▲
             └── local adapter  OR  notion adapter      ← the only thing that changes
```

Rollback for every migration collapses to *revert one `*-notion.ts` file to the local adapter*. No component is touched, no markup moves.

### 1.2 Seed-and-mirror: the first render must produce zero diff

**Populate each Notion database with exactly the content already in the TypeScript modules — verbatim — before migrating.** Then the migration should produce a **byte-identical rendered page**.

This converts an untestable question ("did the migration work?") into a mechanical one: *diff `out/` before and after.* Any difference is a defect, not a judgment call. Editing content in Notion begins only after parity is proven for that surface.

This is the single most effective risk control available here, and it costs one careful data-entry pass per migration.

---

## 2 — Stage 0 · Foundation — **no Notion required**

**Executable now.** Not blocked by the verification gate.

| Step | Work | Files |
|---|---|---|
| **0.1** | Implementation Stage I1 prerequisite corrections | `page.tsx` (Atlas card, ~L253–259) · `explorer-data.ts:28` · `evidence.ts:6` · `data/projects.ts:183` · `rock-creek-os-foundation.md` §0 · **new** `.env.local.example` |
| **0.2** | Deduplicate; build the four-tier badge | delete `EvidenceTierBadge` from `PrimaryChallenge.tsx:29`; canonicalize in `systems-primitives.tsx:19`; consolidate `cn()` (`viz-primitives.tsx:10` → `diagram-primitives.tsx:25`) |
| **0.3** | **Props-in refactor — all 10 section components** | `PrimaryChallenge` · `SupportingSystems` · `SystemOverlayDiagram` · `SignalToExperience` · `SystemArchitectureStack` · `PrimaryLifecycle` · `FeedbackLoop` · `WildfireExtensibility` · `LogisticsResponseLayer` · `StewardshipConsole` |
| **0.4** | Extract the four inline render blocks | `systems/page.tsx:139` (artifacts) · `systems/page.tsx:171` + `explorer/page.tsx:264` (boundaries) · `page.tsx` hero |
| **0.5** | New Tier B primitive: `SourceCitation` | **new** — nothing renders citations today |

**Dependencies:** none. **Risks:** low — mechanical, no data change. 0.1's four-tier change requires a fourth badge treatment (a design decision, not code). 0.3 touches ten files but each is independent.

**Rollback:** per-component `git revert`. No data involved.

**Validation:**
- `tsc --noEmit` clean
- `next build` succeeds
- **`out/` HTML byte-identical to pre-Stage-0**, except the four intentional 0.1 content corrections
- Every component signature accepts data as props; zero `../content/*` imports remain in `components/`

**Exit criteria:** all ten components prop-driven · `EvidenceTierBadge` and `cn` single-sourced · four-tier vocabulary live · `SourceCitation` exists · rendered output unchanged apart from the deliberate corrections.

> **0.5 is a hard dependency for M1.** `SystemTension extends Evidenced`, so every tension carries `sources`. A tension cannot be migrated until something can render a citation.

---

## 3 — Stage 1 · Infrastructure — **gate-blocked**

| Step | Work |
|---|---|
| **1.1** | Verification pass — exit-gate items 1–8 |
| **1.2** | I2 — create 5 databases + 2 extensions + 30 views |
| **1.3** | **Seed** each database verbatim from existing TS content |
| **1.4** | I3 — extract `lib/notion/*` (9 modules) + `domains/*` (8 modules) |
| **1.5** | Refactor `lib/notion-os.ts` onto the shared layer — **zero behavior change** |

**Dependencies:** exit gate items 1–10. **Risk:** medium — 1.5 touches the one route already in production.

**Rollback:** 1.4–1.5 are code, revertable. 1.2–1.3 are Notion-side and additive — creating databases breaks nothing.

**Validation:** ESD OS page renders **byte-identically** through the new access layer. That is the whole point of 1.5 — the existing consumer is the regression test for the new infrastructure, before any new consumer depends on it.

---

## 4 — Migration M1 · System Tension Cards *(original Phase B)* — **first**

### Affected files

| File | Change |
|---|---|
| `explorer/content/explorer-notion.ts` | **new** — `SystemsExplorerModel.notion.tensions` |
| `content/overview-notion.ts` | **new** — `CaseStudyOverviewModel.notion.tensions` |
| `explorer/page.tsx` | → `async`, fetch, pass props |
| `page.tsx` | → `async`, fetch, pass props |
| `explorer/content/explorer-data.ts` | remove `supportingSystems`, `primaryChallenge`, `SupportingSystem` |
| `PrimaryChallenge.tsx` · `SupportingSystems.tsx` | **no change** — already prop-driven from 0.3 |

### Dependencies
Stage 0 complete (esp. 0.5 `SourceCitation`) · Stage 1 complete · Tensions seeded verbatim.

### Risks

| Risk | Severity | Mitigation |
|---|---|---|
| Tensions render on **two routes** — wider blast radius than a single surface | Medium | Migrate both together. Splitting creates a temporary dual-source-of-truth, which is worse than the wider radius |
| G1 assertion fails (≠1 primary tension) | Low | Governance view `GOVERN — Primary Tension Count` checked before migrating |
| `whyNotSeparate` lost on a supporting tension | Medium | Phase 6 makes it **structurally required** — won't typecheck |

### Rollback
Revert `explorer-notion.ts` and `overview-notion.ts` to local adapters; restore the two removed exports. Components untouched. **< 10 minutes.**

### Validation
1. `out/projects/rock-creek-os/index.html` and `/explorer/index.html` **byte-identical** to pre-migration
2. Exactly one primary tension renders with primary treatment; both supporting tensions show `whyNotSeparate`
3. Every tier badge and citation matches the previous render
4. Build fails correctly when `NOTION_API_KEY` is removed *(proves S6)*

---

## 5 — Migration M2 · Systems Explorer *(original Phase D)*

### Affected files

| File | Change |
|---|---|
| `explorer/content/explorer-notion.ts` | extend — `premiseSignals`, `claims` |
| `explorer/content/explorer-data.ts` | remove `premiseConditions`, `evidenceBoundary`; **keep** `overlayNodes`, `signalToExperience`, `explorerHero`, `explorerSections` |
| `SignalToExperience.tsx` · `SystemOverlayDiagram.tsx` | **no change** — class C, stay local |
| `EvidenceBoundary` *(from 0.4)* | receives `EvidenceClaim[]` |

### Dependencies
M1 complete · Signals, Claims, Sources seeded · Phase 4 amendment **A1** (`Boundary Role`) applied — the boundary module cannot be sourced without it.

### Risks

| Risk | Severity | Mitigation |
|---|---|---|
| `Boundary Role` absent → boundary module cannot split ✓/✗ | **High** | Verify A1 exists in the schema before starting |
| `SystemOverlayDiagram` node labels reference signals | Medium | It receives resolved **names only**, never geometry. Geometry stays local |
| Signal reuse audit shows count=1 everywhere | Low | Not a blocker for M2; it is the measurement of whether sharing pays off |

### Rollback
Revert `explorer-notion.ts` to the M1 state — tensions stay migrated, signals revert. **Partial rollback is possible** because the page model separates fields.

### Validation
1. `/explorer` HTML byte-identical
2. Evidence boundary renders both halves with correct counts
3. Every premise signal shows its domain, unit, and sensing method — including `Not Yet Sensed` where applicable
4. `SourceCitation` renders every `[S1]`–`[S5]` correctly

---

## 6 — Migration M3 · Systems Architecture *(original Phase E)*

### Affected files

| File | Change |
|---|---|
| `systems/content/systems-notion.ts` | **new** — `loopNodes`, `extensibilitySignals`, `futureArtifacts`, `claims` |
| `systems/components/RecursiveLoopDiagram.tsx` | **NEW COMPONENT** — Phase 7 R3 |
| `systems/page.tsx` | → `async`; render the new diagram |
| `systems/content/systems-data.ts` | remove `extensibilityColumns`, `futureArtifacts`, `systemsEvidenceBoundary`; **keep** `architectureLayers`, `hydrologyLifecycle`, `lifecycleFlows`, `logisticsChain`, `feedbackNodes`, `feedbackEdges` |
| `WildfireExtensibility.tsx` | receives `EnvironmentalSignal[]` grouped by domain |
| `SystemArchitectureStack` · `PrimaryLifecycle` · `FeedbackLoop` · `LogisticsResponseLayer` | **no change** — class C |

### Dependencies
M2 complete · Loop Nodes seeded (exactly 6) · **frame decision recorded** — `infrastructure` must exist as a signal domain, or the extensibility argument has only two columns.

### Risks

| Risk | Severity | Mitigation |
|---|---|---|
| **New component** — only migration introducing net-new UI | **High** | Build and review `RecursiveLoopDiagram` in isolation *before* wiring Notion |
| Four node vocabularies coexist (5-layer, 4-feedback, 4-zone, 6-loop) | **High** | The new diagram is **additive**. Do **not** retrofit `FeedbackLoop` — different diagram, different argument |
| Extensibility board shows 2 domains instead of 3 | Medium | Confirm infrastructure signals are seeded before migrating |

### Rollback
Two independent levers: revert `systems-notion.ts` to local; and remove the `RecursiveLoopDiagram` render call while keeping the component in the tree. **The new component can ship dark.**

### Validation
1. `/systems` HTML identical **except** the intentionally-added loop diagram
2. Loop diagram renders exactly 6 nodes, sequence 1–6, closing 6→1
3. Extensibility board shows **three** domain columns including `infrastructure`
4. `FeedbackLoop` unchanged — its 4 typed edges with polarity still render

---

## 7 — Migration M4 · Scenario Modules *(original Phase C)* — **highest risk**

### Affected files

| File | Change |
|---|---|
| `StewardshipConsole.tsx` (559) | **decompose → ~5 files** (Phase 7 R2) |
| `dashboard/components/ConditionCard.tsx` | **extract** — currently unexported internal |
| `dashboard/components/{Interpretation,Response,Experience}Zone.tsx` | **extract** |
| `dashboard/content/dashboard-notion.ts` | **new** — `shocks`, `consoleSignals` |
| `dashboard/content/scenarios.ts` | keep composition; add `shockIds`; keep `ScenarioSignalReading` **local** |

### Dependencies
M3 complete · Shocks seeded with thresholds and rationale · **R2 decomposition completed and verified as a separate step, before any Notion wiring.**

### Risks

| Risk | Severity | Mitigation |
|---|---|---|
| **The staff-decision gate breaks** — the case study's core argument | **Critical** | Decompose with **zero behavior change** first; verify the gate manually; only then wire data. `ResponseZone` stays local permanently |
| Most interactive surface — scenario switching, async resolution | **High** | Two separate PRs: decomposition, then data |
| `normal` scenario has **zero** shocks | Medium | Empty `shockIds` must render. Explicit test case |
| Modeled readings mistaken for measurements | **High** | `ScenarioSignalReading` stays local; `consoleMeta.disclosure` never softened |

### Rollback
Two independent levers. Data: revert `dashboard-notion.ts`. Structure: the decomposition is a separate commit and revertable on its own. **Never combine them in one commit.**

### Validation
1. **Manual interaction test before any data change:** switch all three scenarios; confirm Zone 03 holds in "awaiting staff decision"; confirm zones 03-logistics and 04-adapted resolve **only** after the button
2. `/dashboard` HTML identical after decomposition, before data wiring
3. `normal` renders correctly with no shocks
4. Every threshold displays its rationale
5. Disclosure line present and unmodified

---

## 8 — Migration M5 · Dashboard KPI Cards *(original Phase A)* — **DEFERRED**

**Not scheduled. No data source exists.**

Phase 2 deferred KPI Telemetry; Phase 6 dropped `DashboardMetrics` under option (b). The console's numbers are **modeled illustrations authored per scenario** — they migrated as local `ScenarioSignalReading` in M4, which is where they belong.

**What would un-defer this:** obtaining real measurement access — a stream gauge feed, an AQI feed, property telemetry. At that point KPI Telemetry becomes a genuine database with `Sensing Method = Direct Measurement` or `Public Feed`, and `DashboardMetrics` becomes a real domain model.

**Until then, building it would manufacture the exact failure the evidence discipline exists to prevent** — a measurement-shaped structure holding invented numbers, on the one project already flagged for unsourced precision.

---

## 9 — Roadmap at a glance

```
STAGE 0 — Foundation ........................ NO NOTION · start now
    0.1 prerequisite corrections
    0.2 dedupe + four-tier badge
    0.3 props-in ×10                    ← the decoupling that de-risks everything
    0.4 extract inline blocks
    0.5 SourceCitation
                    │  exit: prop-driven, output unchanged
                    ▼
STAGE 1 — Infrastructure .................... GATE-BLOCKED
    1.1 verification (exit gate 1–8)
    1.2 schema + views
    1.3 SEED VERBATIM                   ← makes zero-diff validation possible
    1.4 lib/notion/* extraction
    1.5 notion-os.ts refactor, no behavior change
                    │  exit: ESD OS page byte-identical
                    ▼
M1  System Tensions .......... LOW ....... 2 routes, 2 components, no new UI
                    ▼
M2  Explorer Signals ......... LOW-MED ... needs amendment A1
                    ▼
M3  Systems Architecture ..... MED ....... new RecursiveLoopDiagram
                    ▼
M4  Scenario Modules ......... HIGH ...... decompose console FIRST, separately
                    ▼
M5  Dashboard KPI ............ DEFERRED .. no source of record
```

### Risk profile

| | Stage 0 | Stage 1 | M1 | M2 | M3 | M4 |
|---|---|---|---|---|---|---|
| Notion required | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| New UI | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Interactive surface | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Routes touched | 4 | 1 | 2 | 1 | 1 | 1 |
| Rollback | revert | revert | 1 file | 1 file | 2 levers | 2 levers |
| **Risk** | **Low** | **Med** | **Low** | **Low-Med** | **Med** | **High** |

---

## 10 — Rules that apply to every migration

| # | Rule |
|---|---|
| **1** | **Seed verbatim first.** The first render after migration must be byte-identical. Edit content in Notion only after parity is proven |
| **2** | **One migration per PR.** Never combine a structural refactor with a data-source change |
| **3** | **Remove the local export only after parity passes** — never in the same commit that adds the Notion path |
| **4** | **Class C never migrates.** Graphs, geometry, sequencing, narrative, and the decision gate stay local permanently |
| **5** | **Prove S6 once per migration** — remove the key, confirm the build fails rather than silently falling back |
| **6** | **Governance views green before starting.** G1, G2, G5 must show zero violations |
| **7** | **Stop on a diff you cannot explain.** An unexplained rendering difference is a defect until proven otherwise |

### Definition of done — the whole migration

Every class A/B field sourced from Notion · every class C field still local · all four routes render identically to their seeded state · build fails loudly on missing data · governance views green · **and Shore Lodge can be added with zero new databases and zero new access-layer code.**

That last clause is the real test. If it fails, the architecture — not the migration — needs revisiting.
