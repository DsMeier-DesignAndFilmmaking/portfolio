# Component Mapping Architecture — Rock Creek OS

**Master suite:** Phase 7. Architecture only — no code, no repository source modified.
**Date:** 2026-08-18
**Predecessor:** Phase 6 Typed Domain Models (approved, option (b))

---

## 0 — Headline finding

**Ten of the eleven section components accept zero data props.** Each imports its content module at module scope:

```ts
// PrimaryChallenge.tsx
import { primaryChallenge } from '../content/explorer-data';
export function PrimaryChallenge() { … }        // ← no props at all
```

Notion data arrives asynchronously at the page level and must flow **down**. Nothing currently accepts it. This single coupling is the entire Phase 7 refactor.

Two facts make it tractable:

1. **The ~29 primitives are already correct.** `TensionAxis({ top, bottom })`, `StatusDot({ status })`, `ConditionCard({ … })` are all prop-driven and content-agnostic. They need **no change whatsoever**.
2. **The target pattern already exists in this repository.** `environmental-systems-design-os/components/LiveSections.tsx` ships `OrganizationsSection({ orgs })`, `ArtifactsSection({ artifacts })` — prop-driven, Notion-fed, in production. The refactor is *"make Rock Creek's sections look like LiveSections,"* not an invention.

**The prompt's example component names do not exist in this repository.** `TensionCard`, `KPICard`, `ScenarioSimulation`, and `SystemsLoopDiagram` are hypothetical. The matrix below maps to real components and names the three genuine gaps.

---

## 1 — Component Inventory

19 Rock Creek files + 4 repo-shared. Two tiers with a clean split.

### Tier 1 — Primitives · prop-driven, content-agnostic · **NO REFACTOR**

| File | Exports | Env |
|---|---|---|
| `components/diagram-primitives.tsx` (350) | `cn` · `toneStyles` · `FrameworkShell` · `ToneChip` · `MetaChip` · `RelationBadge` · `DegreeMeter` · `HealthBadge` · `PolarityBadge` + types `SystemTone`, `RelationType`, `InfluenceStrength` | server |
| `explorer/components/explorer-primitives.tsx` (353) | `useExplorerMotion` · `SystemExplorerSection` · **`TensionAxis`** · `SystemStepReveal` · `SystemTradeoff` · `SystemLayerToggle<T>` · `LayerLegend` · `ConceptDisclaimer` | client |
| `systems/components/systems-primitives.tsx` (82) | **`EvidenceTierBadge`** · `AtlasSectionHeader` · `StepArrow` · `EvidenceNote` | server |
| `dashboard/components/viz-primitives.tsx` (185) | `cn` · `statusColors` · `StatusDot` · `SparkLine` · `TrendBadge` · `PanelFrame` · `ScanLine` | client |

### Tier 2 — Section components · **ALL REQUIRE REFACTOR**

| Component | Lines | Env | Props today | Content imported |
|---|---|---|---|---|
| `PrimaryChallenge` | 193 | client | **none** | `primaryChallenge`, `evidenceTierLabels` |
| `SupportingSystems` | 91 | server | `{ className? }` only | `supportingSystems` |
| `SystemOverlayDiagram` | 171 | client | **none** | `overlayNodes` |
| `SignalToExperience` | 106 | server | **none** | `signalToExperience` |
| `SystemArchitectureStack` | 175 | client | **none** | `architectureLayers`, `architectureCopy` |
| `PrimaryLifecycle` | 160 | server | **none** | `hydrologyLifecycle`, `lifecycleFlows` |
| `FeedbackLoop` | 115 | server | **none** | `feedbackNodes`, `feedbackEdges` |
| `WildfireExtensibility` | 82 | server | **none** | `extensibilityColumns` |
| `LogisticsResponseLayer` | 72 | server | **none** | `logisticsChain` |
| `StewardshipConsole` | 559 | client | **none** | `scenarios`, `loopStages`, `consoleMeta` |

Also exported from `PrimaryChallenge.tsx`: a second `EvidenceTierBadge` — see §4.1.

### Tier 2b — Rendered inline in pages, no component at all

| Content | Location | Domain model it will carry |
|---|---|---|
| `futureArtifacts` | `systems/page.tsx:139` | `SystemArtifact` |
| `systemsEvidenceBoundary` | `systems/page.tsx:171` | `EvidenceClaim` |
| `evidenceBoundary` | `explorer/page.tsx:264-274` | `EvidenceClaim` |
| Case-study hero + destination cards | `page.tsx` (inline JSX) | `CaseStudy` |

### Non-data components

`ExperienceNav` (672, client, navigation only) · `ProjectHeader` · `ProjectBreadcrumb` · `PageNavIndicator` · `HeroDraftingPlate`. **Out of scope** — none carries Notion data.

### `StewardshipConsole` internals — unexported, already prop-driven

`TrendGlyph({ trend })` · `Zone({ number, label, question })` · `ZoneLink()` · **`ConditionCard({ … })`**

`ConditionCard` is the repository's real equivalent of the prompt's `KPICard`. It exists, it is correct, and it is trapped inside a 559-line file.

---

## 2 — Data Mapping Matrix

**Notion Entity → API Layer → Domain Model → React Component**

| Notion Entity | API Layer | Domain Model | React Component (actual) | Status |
|---|---|---|---|---|
| **System Tensions** | `lib/notion/domains/tensions.ts` | `SystemTension` | `PrimaryChallenge` · `SupportingSystems` · `TensionAxis` ᴾ | 🟡 refactor to props |
| **Environmental Signals** | `lib/notion/domains/signals.ts` | `EnvironmentalSignal` | `ConditionCard` ⚠ *unexported* · `WildfireExtensibility` · `SystemOverlayDiagram` | 🟡 extract + refactor |
| **Scenario Shocks** | `lib/notion/domains/shocks.ts` | `ScenarioShock` | `StewardshipConsole` ⚠ *559-line monolith* | 🔴 decompose |
| **Loop Nodes** | `lib/notion/domains/loop-nodes.ts` | `RecursiveLoopNode` | **⛔ NONE EXISTS** | 🔴 **new component** |
| **Evidence Claims** | `lib/notion/domains/claims.ts` | `EvidenceClaim` | `EvidenceTierBadge` ᴾ ⚠ ×2 · `EvidenceNote` ᴾ · inline boundary blocks | 🔴 dedupe + extract |
| **Sources** | `lib/notion/domains/sources.ts` | `Source` | **⛔ NONE** — citations are prose in an `evidence: string` field | 🔴 new component |
| **Case Study** | `lib/notion/domains/case-studies.ts` | `CaseStudy` | **⛔ NONE** — hero is inline JSX in `page.tsx` | 🟡 extract |
| **System Artifacts** | `lib/notion/domains/artifacts.ts` | `SystemArtifact` | **⛔ NONE** — inline at `systems/page.tsx:139` | 🟡 extract |

ᴾ = Tier 1 primitive, already correct.

### Page-model wiring

| Route | Page Model (Phase 6) | Notion-fed components | Local-only components |
|---|---|---|---|
| `/rock-creek-os` | `CaseStudyOverviewModel` | *(new)* `CaseStudyHero`, `TensionSummary`, `EvidenceBoundary` | `ExperienceNav`, destination cards |
| `/explorer` | `SystemsExplorerModel` | `PrimaryChallenge`, `SupportingSystems` | `SystemOverlayDiagram` ᴳ, `SignalToExperience` |
| `/systems` | `SystemsArchitectureModel` | *(new)* `RecursiveLoopDiagram`, `WildfireExtensibility`, *(new)* `FutureArtifacts` | `SystemArchitectureStack`, `PrimaryLifecycle`, `FeedbackLoop`, `LogisticsResponseLayer` |
| `/dashboard` | `DashboardModel` | *(new)* `ConditionCard` extracted | `StewardshipConsole` shell, `Zone`, decision gate |

ᴳ = `SystemOverlayDiagram` carries **visual geometry** (class C) but its node *labels* reference signals. It receives resolved names, never coordinates, from Notion.

---

## 3 — Refactor Requirements

### R1 — Props-in refactor · **10 components** · foundational

Every Tier 2 component drops its `../content/*` import and accepts data as props. Nothing else changes — no markup, no styling, no interaction.

```
BEFORE  export function PrimaryChallenge()
AFTER   export function PrimaryChallenge({ tension, claims }: {
          tension: SystemTension & { hierarchy: 'primary' };
          claims: readonly EvidenceClaim[];
        })
```

**Risk: low.** Mechanical, one component at a time, each independently revertable. **Precondition:** none — this can be done entirely against existing local content, *before* Notion is connected. It is the highest-value decoupling available and the natural first implementation stage.

### R2 — Decompose `StewardshipConsole` · **559 → ~5 files** · highest risk

| Extract | Carries | Owner |
|---|---|---|
| `ConditionCard` | signal reading + status + trend | Notion definition + local reading |
| `Zone` | zone chrome | local |
| `InterpretationZone` | summary + affected activities | local |
| `ResponseZone` | **the staff-decision gate** | **local, permanently** |
| `ExperienceZone` | current vs adapted | local |
| `StewardshipConsole` | shell, scenario state, composition | local |

**Risk: medium-high.** It is the most interactive surface, and the decision gate is the case study's argument. Extract **without behavior change**, verify, and only then wire Notion.

### R3 — Build `RecursiveLoopDiagram` · **new component** · blocking gap

`RecursiveLoopNode` has no consumer, and the repository currently renders **three different, partial node vocabularies**:

| Component | Vocabulary | Count |
|---|---|---|
| `SystemArchitectureStack` | `architectureLayers` — Environment → Guest Experience | **5** |
| `FeedbackLoop` | `feedbackNodes` — Decision → Action → Outcome → Information | **4** |
| `StewardshipConsole` | `loopStages` — Conditions → Interpretation → Response → Experience | **4** |
| *(approved domain model)* | `RecursiveLoopNode` | **6** |

None renders the approved six-node recursive loop. Phase 6 established that the six-node model **unifies** the 5-layer stack and the 4-node feedback graph by adding `operational-learning` to close the loop. A new component is required. **Do not retrofit `FeedbackLoop`** — it renders typed directed edges with polarity, which is a different diagram with a different argument.

### R4 — Deduplicate `EvidenceTierBadge` and `cn`

`EvidenceTierBadge` is implemented twice — `explorer/components/PrimaryChallenge.tsx:29` and `systems/components/systems-primitives.tsx:19`. `cn()` is implemented twice — `components/diagram-primitives.tsx:25` and `dashboard/components/viz-primitives.tsx:10`.

This matters beyond tidiness: **both `EvidenceTier` copies drifted from the source doc identically and simultaneously** (three tiers instead of four). Duplication without a shared reference is what produced that. The four-tier migration is the moment to consolidate — fixing one copy and missing the other is the predictable failure.

### R5 — Extract the four inline render blocks

`futureArtifacts`, `systemsEvidenceBoundary`, `evidenceBoundary`, and the case-study hero are rendered inline in page files. Each becomes a component so it can receive a domain model. This also removes the structural reason the landing page drifted unnoticed — **content rendered inline in a page is not reviewed as content.**

### R6 — Server/client boundary

Five Tier 2 components are `'use client'`. Notion data is fetched in async **Server** Components. Data must be resolved server-side and passed down — no client component may fetch. `SystemArchitectureStack` and `SystemOverlayDiagram` are client-side for interaction only and will receive fully-resolved props.

### Refactor sequencing

```
R1 (props-in)  →  R4 (dedupe)  →  R5 (extract inline)  →  R2 (decompose console)  →  R3 (new loop diagram)
     ↑                                                                                        ↑
  no Notion required — pure decoupling, do first                          requires Notion schema
```

**R1, R4, and R5 need no Notion connection at all.** They are pure decoupling against existing local content and can proceed while the verification gate is still blocked.

---

## 4 — Reusability Opportunities

### 4.1 Consolidate the duplicated primitives · *immediate*

`EvidenceTierBadge` and `cn` → single implementations. `EvidenceTierBadge` becomes the canonical renderer of the four-tier vocabulary, with the fourth badge treatment designed once.

### 4.2 `ConditionCard` is the reusable signal renderer · *high value*

Currently trapped in the console. Extracted, it becomes **the** component that renders any `EnvironmentalSignal` with a reading — usable in the console, in `/explorer`'s premise section, and in every future case study's dashboard.

### 4.3 `TensionAxis` generalizes to any tension · *already correct*

`TensionAxis({ top, bottom })` maps directly onto `SystemTension.poleA` / `poleB`. **This is the repository's real `TensionCard`** — it needs no change, only a caller that passes domain data.

### 4.4 `diagram-primitives` is already a design system · *underused*

`FrameworkShell`, `ToneChip`, `RelationBadge`, `DegreeMeter`, `HealthBadge`, `PolarityBadge` plus `SystemTone`/`RelationType`/`InfluenceStrength` — a coherent visual vocabulary for systems diagrams, currently used by Rock Creek only. It is the strongest candidate to become the shared cross-case-study layer.

### 4.5 Signal-domain tone mapping · *new, small*

`toneStyles` already keys on `SystemTone` (`experience | operations | infrastructure | ecological | landscape`). Phase 6's `SignalDomain` has eight values. A single mapping — `SignalDomain → SystemTone` — makes every signal render in a consistent color across all four routes and all future case studies. **One map, applied everywhere.** Note that `infrastructure` already exists in both vocabularies, which is a small confirmation that the frame merge lands cleanly in the visual system too.

---

## 5 — Shared Component Strategy

### Three tiers, promotion-gated

```
┌─────────────────────────────────────────────────────────────────┐
│  TIER A — PORTFOLIO SHARED       components/                    │
│  ProjectHeader · ProjectBreadcrumb · PageNavIndicator ·         │
│  HeroDraftingPlate                                              │
│  Rule: no domain knowledge. Used by ≥3 unrelated projects.      │
├─────────────────────────────────────────────────────────────────┤
│  TIER B — ESD SYSTEM SHARED      components/esd/   ◀ NEW        │
│  EvidenceTierBadge · SourceCitation · ConditionCard ·           │
│  TensionAxis · RecursiveLoopDiagram · diagram-primitives        │
│  Rule: knows the DOMAIN MODEL, knows no CASE STUDY.             │
│  This is the layer that makes Shore Lodge cost ~zero.           │
├─────────────────────────────────────────────────────────────────┤
│  TIER C — CASE-STUDY LOCAL       app/projects/<case-study>/     │
│  StewardshipConsole · SystemArchitectureStack ·                 │
│  SystemOverlayDiagram · PrimaryLifecycle · FeedbackLoop         │
│  Rule: carries THIS case study's narrative and geometry.        │
│  Expected to stay local forever.                                │
└─────────────────────────────────────────────────────────────────┘
```

### The promotion rule

> A component moves **C → B** when a second case study needs it *and* it carries no narrative specific to the first. A component moves **B → A** when it no longer references any domain type.
>
> **Promotion is triggered by a second real consumer, never by anticipation.** Speculative generalization is how a shared layer accumulates components with one caller and five configuration props.

### Tier B seed set — the six that earn promotion now

| Component | Why |
|---|---|
| `EvidenceTierBadge` | already duplicated — evidence of shared need |
| `SourceCitation` *(new)* | every entity carries `sources`; nothing renders them today |
| `ConditionCard` | any signal, any case study |
| `TensionAxis` | any tension, any case study |
| `RecursiveLoopDiagram` *(new)* | loop vocabulary is closed and portfolio-wide (G6) |
| `diagram-primitives` | already a coherent design system |

Six components. Each has either a demonstrated duplicate, a portfolio-wide domain type, or a closed vocabulary behind it — no speculation.

### What must NOT be promoted

`StewardshipConsole` and its decision gate · `SystemOverlayDiagram` geometry · `SystemArchitectureStack`'s five-layer model · `PrimaryLifecycle` · `FeedbackLoop`'s typed edges · all hero and section copy.

These carry Rock Creek's specific argument. Generalizing them is precisely how the portfolio would flatten into a template — the failure mode Phase 9 exists to prevent.

### Cross-case-study test

Adding Shore Lodge should require: a new `Tier C` directory with its own narrative components, **zero** Tier A changes, and **zero** Tier B changes. If Shore Lodge forces a change in Tier B, the abstraction was drawn too early.

---

## 6 — Gaps register

| # | Gap | Type | Resolve at |
|---|---|---|---|
| G1 | `RecursiveLoopNode` has no component; three partial vocabularies render instead | **blocking** | R3 |
| G2 | `Source` has no renderer — citations are prose inside an `evidence: string` field | **blocking** | new `SourceCitation` |
| G3 | `ConditionCard` unexported inside a 559-line file | structural | R2 |
| G4 | Four content blocks rendered inline in pages | structural | R5 |
| G5 | `EvidenceTierBadge` ×2, `cn` ×2 | duplication | R4 |
| G6 | Prompt's `TensionCard` / `KPICard` / `ScenarioSimulation` / `SystemsLoopDiagram` do not exist | naming | mapped in §2 to real equivalents |
| G7 | Four-tier badge needs a fourth visual treatment | design | Implementation Stage I1 |

**G2 deserves emphasis.** Phase 6 gives every evidenced entity a `sources: readonly SourceRef[]`, and Phase 2 created a Sources database — but no component renders a citation. Today sources are hand-written prose (`evidence: 'Sources: Overseeing the Forest for the Trees — Montana Forest Consultants; Granite County CWPP.'`). Without a `SourceCitation` component, the entire Sources database has nowhere to surface, and the evidence discipline stays as unverifiable prose.

---

## 7 — What this phase does not do

No code written. No component renamed, moved, or created. The refactor requirements are specifications for Phase 8 to sequence.

**Note for Phase 8:** R1, R4, and R5 are **Notion-independent** and can be executed while the verification gate remains blocked. That makes them the natural opening of the migration plan — and it strengthens the earlier decision to start the migration with System Tension Cards rather than Dashboard KPI Cards, since `StewardshipConsole` (R2) is the highest-risk refactor in the project and should not be first.
