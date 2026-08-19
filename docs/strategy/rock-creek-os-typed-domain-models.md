# Typed Domain Models — Rock Creek OS

**Master suite:** Phase 6. Design only — interfaces are specified here, not written as `.ts` files. No repository source modified.
**Date:** 2026-08-18
**Predecessors:** Phase 1.5 Gate · Phase 2 Data Architecture · Phase 3 SSOT · Phase 4 Views · Phase 5 API Integration — all approved.

---

## 0 — Scope decisions carried into this phase

### 0.1 Option (b) — `DashboardMetrics` is dropped

Approved: drop `DashboardMetrics` from the interface set, and reorder the Phase 8 migration to begin with **System Tension Cards** rather than Dashboard KPI Cards.

**Rationale.** `DashboardMetrics` would model KPI telemetry, and the Phase 2 architecture deferred that database — the case study states *"modeled values, not Ranch measurements"*, and a telemetry table implies measurement that does not exist. A domain interface with no source of record is a type looking for data.

**What replaces it.** The console's numbers do not disappear; they are reclassified. `scenarios.ts` already carries per-scenario readings (`river.temperature: '58°F'`, `fire.risk: 'Low'`). Those are **modeled illustrations authored for a scenario**, not measurements — so they stay repository-owned as `ScenarioSignalReading` (§2.5), referencing a `SignalId` whose *definition* (unit, typical range, sensing method) comes from Notion. Notion owns what a signal **is**; the repository owns what a scenario **shows**.

This is the ownership matrix applied consistently, not an exception to it.

### 0.2 Naming correction — implementation stages renamed

My earlier "Phase 3.1 / 3.3 / 3.8" labels collided with the master suite's Phase 3/4/5. From here they are **Implementation Stages I1–I8**, executed after Phase 8 produces the migration roadmap:

| Stage | Was | Purpose |
|---|---|---|
| **I1** | 3.1 | Repository prerequisite corrections |
| **I2** | 3.2 | Notion schema creation |
| **I3** | 3.3 | Access-layer extraction (`lib/notion/*`) |
| **I4–I7** | 3.4–3.7 | Route migration, then second-case-study proof |
| **I8** | 3.8 | Cleanup |

### 0.3 Verification dependency

Per the Phase 5 analysis, this phase splits: **§1, §2, §4, §5 are verification-independent** and final. **§3 Transformation Rules is verification-dependent** — every Notion property name is marked **⚠** until the introspection pass confirms it. The rules are structurally complete; the string literals are provisional.

---

## 1 — Domain Model Diagram

```
╔══════════════════════════════════════════════════════════════════════════════╗
║  RAW LAYER — lib/notion/ INTERNAL ONLY. Never crosses this line.             ║
║  PageObjectResponse · PropertyItem · RichTextItem   (@notionhq/client types) ║
╚══════════════════════════════════════════════════════════════════════════════╝
                    │  parse (throws on malformed input — §4)
                    ▼
╔══════════════════════════════════════════════════════════════════════════════╗
║  DOMAIN ENTITIES — lib/notion/domains/*    Notion-derived, case-agnostic     ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║   CaseStudy ◀────────────┬──────────┬──────────┬──────────┐                 ║
║       ▲                  │          │          │          │                 ║
║       │          EnvironmentalSignal│   SystemTension  EvidenceClaim         ║
║       │                  │          │          │          │                 ║
║       │                  └──▶ ScenarioShock ◀──┘          │                 ║
║       │                             │                     │                 ║
║       │                             ▼                     ▼                 ║
║       │                    RecursiveLoopNode           Source                ║
║       │                             ▲                     ▲                 ║
║       └── SystemArtifact ───────────┘─────────────────────┘                 ║
║                                                                              ║
║   Shared facets:  Evidenced (tier + sources)  ·  Identified (branded id)     ║
╚══════════════════════════════════════════════════════════════════════════════╝
                    │  project (narrowing — per route, §2.6)
                    ▼
╔══════════════════════════════════════════════════════════════════════════════╗
║  PAGE MODELS — app/projects/rock-creek-os/*/content/*-notion.ts              ║
║  Each is a COMPOSITE with the ownership boundary visible in its shape:       ║
║                                                                              ║
║      { notion: <derived, may fail>, local: <authored, always present> }      ║
║                                                                              ║
║   CaseStudyOverviewModel · SystemsExplorerModel                              ║
║   SystemsArchitectureModel · DashboardModel                                  ║
╚══════════════════════════════════════════════════════════════════════════════╝
                    │
                    ▼
              React components — receive page models only
```

**Three rules the diagram encodes.** Raw Notion types never leave the top box. Entities know nothing about pages, routes, or components. Page models make the Notion/local split *structural*, so a reader can see at a glance what would be missing if Notion were unreachable.

---

## 2 — Interface Definitions

### 2.1 Primitives

Domain values are **kebab-case identifiers**, never Notion's display strings. Notion may rename `"Portfolio Candidate"` to `"Publish Ready"` without touching a single component — the mapping lives in one transform table (§3).

```ts
type EvidenceTier   = 'established' | 'inferred' | 'proposed' | 'future';
type RecordStatus   = 'draft' | 'active' | 'archived';

type SignalDomain   = 'hydrology' | 'fire' | 'air' | 'wildlife'
                    | 'forest' | 'infrastructure' | 'access' | 'weather';
type SignalKind     = 'continuous-measurement' | 'categorical-state'
                    | 'discrete-event' | 'derived-index';
type SensingMethod  = 'direct-measurement' | 'public-feed' | 'field-observation'
                    | 'modeled' | 'not-yet-sensed';

type ShockKind      = 'environmental' | 'regulatory' | 'infrastructure'
                    | 'access' | 'compound';
type OnsetSpeed     = 'immediate' | 'hours' | 'days' | 'seasonal';
type Reversibility  = 'self-resolving' | 'managed-recovery' | 'persistent';

type TensionArchetype = 'ecology-vs-programming' | 'remoteness-vs-standard'
                      | 'stewardship-vs-demand' | 'autonomy-vs-reliability'
                      | 'privacy-vs-service';

type ClaimKind    = 'condition' | 'mechanism' | 'outcome' | 'constraint' | 'capability';
type BoundaryRole = 'establishes' | 'not-claimed';
type PageSurface  = 'landing' | 'explorer' | 'systems' | 'dashboard' | 'unpublished';

/** Closed set of six. Governance G6 — changing it is an architecture decision. */
type LoopNodeId = 'environmental-signals' | 'stewardship-intelligence'
                | 'operational-decisions' | 'staff-actions'
                | 'guest-experience'      | 'operational-learning';
```

`EvidenceTier` is the **four-tier** vocabulary. The repository currently ships three (`documented | inferred | proposed`) in `explorer-data.ts:28` and `evidence.ts:6`; reconciling those is Implementation Stage **I1** and is a precondition, not part of this phase.

### 2.2 Branded identifiers

```ts
declare const brand: unique symbol;
type Id<T extends string> = string & { readonly [brand]: T };

type CaseStudyId = Id<'CaseStudy'>;   type SignalId   = Id<'Signal'>;
type TensionId   = Id<'Tension'>;     type ShockId    = Id<'Shock'>;
type ClaimId     = Id<'Claim'>;       type SourceId   = Id<'Source'>;
type ArtifactId  = Id<'Artifact'>;
```

Zero runtime cost. Passing a `ShockId` where a `SignalId` is expected becomes a compile error — which matters because every one of these is an opaque 36-character UUID that is otherwise indistinguishable.

### 2.3 The `Evidenced` facet — governance G2 as a compile-time guarantee

```ts
interface SourceRef { readonly id: SourceId; readonly sourceKey: string; readonly label: string; }

type Evidenced =
  | { readonly tier: 'established';
      readonly sources: readonly [SourceRef, ...SourceRef[]] }   // ← non-empty REQUIRED
  | { readonly tier: 'inferred' | 'proposed' | 'future';
      readonly sources: readonly SourceRef[] };
```

**Governance rule G2 — "no `Established` record without a source" — becomes unrepresentable rather than merely discouraged.** An established record with an empty `sources` array will not typecheck. This is the single highest-leverage maintainability decision in this phase: the rule cannot rot, because violating it stops the build.

Consumers narrow naturally:

```ts
if (signal.tier === 'established') signal.sources[0];  // provably present
```

### 2.4 Entities

```ts
interface CaseStudy {
  readonly id: CaseStudyId;
  readonly name: string;
  readonly pitch: string;
  readonly frame: string;              // "Adaptive Stewardship Intelligence"
  readonly propertyReferenced: string;
  readonly disclaimer: string;         // required verbatim
  readonly evidenceBoundaryPublished: boolean;
  readonly workType: string;
  readonly maturityStage: string;
  readonly externalUrl: string | null;
  readonly status: RecordStatus;
}

interface EnvironmentalSignal extends Evidenced {
  readonly id: SignalId;
  readonly name: string;
  readonly domain: SignalDomain;
  readonly kind: SignalKind;
  readonly unit: string | null;         // null for categorical signals
  readonly typicalRange: string | null;
  readonly sensingMethod: SensingMethod;
  readonly loopEntryNode: LoopNodeId;
  readonly caseStudyIds: readonly CaseStudyId[];   // many-to-many = the reuse mechanism
  readonly status: RecordStatus;
}

type SystemTension = Evidenced & {
  readonly id: TensionId;
  readonly name: string;
  readonly poleA: string;
  readonly poleB: string;
  readonly archetype: TensionArchetype;
  readonly description: string;
  readonly spansLoopNodes: readonly LoopNodeId[];
  readonly relatedSignalIds: readonly SignalId[];
  readonly relatedShockIds: readonly ShockId[];
  readonly caseStudyId: CaseStudyId;    // single — hierarchy is case-study specific
  readonly status: RecordStatus;
} & (
  | { readonly hierarchy: 'primary' }
  | { readonly hierarchy: 'supporting-environmental' | 'supporting-operational';
      readonly whyNotSeparate: string }                        // ← REQUIRED for supporting
  | { readonly hierarchy: 'background' }
);

interface ScenarioShock extends Evidenced {
  readonly id: ShockId;
  readonly name: string;
  readonly kind: ShockKind;
  readonly triggeringSignalIds: readonly [SignalId, ...SignalId[]];  // ← ≥1 required (G7)
  readonly threshold: string;
  readonly thresholdRationale: string;   // ← non-empty enforced at parse (G7)
  readonly consequence: string;
  readonly onsetSpeed: OnsetSpeed;
  readonly reversibility: Reversibility;
  readonly affectedLoopNodes: readonly LoopNodeId[];
  readonly caseStudyIds: readonly CaseStudyId[];
  readonly status: RecordStatus;
}

interface RecursiveLoopNode {
  readonly id: LoopNodeId;
  readonly name: string;
  readonly sequence: 1 | 2 | 3 | 4 | 5 | 6;   // ← literal union, not number
  readonly kind: 'input' | 'interpretation' | 'decision' | 'action' | 'output' | 'learning';
  readonly role: string;
  readonly load: { readonly signals: number; readonly tensions: number; readonly shocks: number };
}

interface EvidenceClaim extends Evidenced {
  readonly id: ClaimId;
  readonly claim: string;
  readonly kind: ClaimKind;
  readonly boundaryRole: BoundaryRole | null;   // Phase 4 amendment A1
  readonly surface: PageSurface;
  readonly caseStudyId: CaseStudyId;
  readonly relatedSignalIds: readonly SignalId[];
  readonly relatedTensionIds: readonly TensionId[];
  readonly relatedShockIds: readonly ShockId[];
  readonly status: RecordStatus;
}

interface Source {
  readonly id: SourceId;
  readonly sourceKey: string;            // "S1".."S5" — continuity with the markdown corpus
  readonly name: string;
  readonly kind: 'government' | 'academic' | 'industry' | 'press'
              | 'property-published' | 'field-observation';
  readonly url: string | null;
  readonly publishedAt: string | null;   // ISO-8601
  readonly reliability: 'high' | 'moderate' | 'low';
}

interface SystemArtifact {
  readonly id: ArtifactId;
  readonly name: string;
  readonly artifactType: string;
  readonly maturity: string;
  readonly evidenceConfidence: string;
  readonly version: string | null;
  readonly caseStudyIds: readonly CaseStudyId[];
}
```

**Two type-level guarantees worth naming.** `SystemTension`'s discriminated union makes `whyNotSeparate` **structurally required** on supporting tensions — G1's anti-fragmentation rule, enforced by the compiler. `ScenarioShock.triggeringSignalIds` is a non-empty tuple type, so a shock with no trigger is unrepresentable (G7).

`sequence` as `1|2|3|4|5|6` rather than `number` means an exhaustive `switch` over loop positions is checkable.

### 2.5 Repository-owned types (class C — never from Notion)

```ts
/** Modeled illustration authored for a scenario. NOT a measurement. */
interface ScenarioSignalReading {
  readonly signalId: SignalId;          // definition resolved from Notion
  readonly display: string;             // "58°F" — authored, modeled
  readonly status: ConditionStatus;
  readonly trend: TrendDirection;
  readonly condition: string;
  readonly thresholdNote: string;
}

/** A scenario is a COMPOSITION. It references shocks; it never restates their facts. */
interface ScenarioComposition {
  readonly id: string;
  readonly label: string;
  readonly premise: string;
  readonly shockIds: readonly ShockId[];      // empty for `normal` — must render
  readonly readings: readonly ScenarioSignalReading[];
  readonly interpretation: { summary: string; affected: readonly ActivityImpact[] };
  readonly response: {
    readonly recommendation: string | null;    // null = nothing to decide
    readonly rationale: string;
    readonly actionLabel: string;
    readonly logistics: readonly LogisticsAction[];
  };
  readonly guest: { current: string; adapted: string; status: string };
  readonly outcome: string;
}
```

`ScenarioComposition.response` **stays local permanently.** The gap between a recommendation and its execution is the case study's argument, not a data field.

### 2.6 Page models — the ownership boundary made structural

```ts
interface PageModel<N, L> {
  readonly notion: N;     // derived; absence is a build failure or a declared-optional
  readonly local: L;      // authored; always present, cannot fail
}
```

```ts
type CaseStudyOverviewModel = PageModel<
  { caseStudy: CaseStudy;
    primaryTension: SystemTension & { hierarchy: 'primary' };
    supportingTensions: readonly SystemTension[];
    boundary: { establishes: readonly EvidenceClaim[]; notClaimed: readonly EvidenceClaim[] } },
  { hero: HeroContent; destinationCards: readonly DestinationCard[]; sectionNav: readonly SectionNavItem[] }
>;

type SystemsExplorerModel = PageModel<
  { premiseSignals: readonly EnvironmentalSignal[];
    primaryTension: SystemTension & { hierarchy: 'primary' };
    supportingTensions: readonly SystemTension[];
    claims: readonly EvidenceClaim[] },
  { hero: ExplorerHero; premiseConditions: readonly PremiseCondition[];
    chainSteps: readonly ChainStep[]; overlayNodes: readonly OverlayNode[];
    signalToExperience: SignalToExperience; sectionNav: readonly SectionNavItem[] }
>;

type SystemsArchitectureModel = PageModel<
  { loopNodes: readonly RecursiveLoopNode[];          // exactly 6, sequence-ordered
    extensibilitySignals: readonly EnvironmentalSignal[];   // hydrology | fire | infrastructure
    futureArtifacts: readonly SystemArtifact[];
    claims: readonly EvidenceClaim[] },
  { hero: SystemsHero; architectureLayers: readonly ArchitectureLayer[];
    hydrologyLifecycle: readonly LifecycleStage[]; lifecycleFlows: readonly LifecycleFlow[];
    logisticsChain: readonly LogisticsStep[];
    feedbackNodes: readonly FeedbackNode[]; feedbackEdges: readonly FeedbackEdge[];
    copy: SystemsCopy; sectionNav: readonly SectionNavItem[] }
>;

type DashboardModel = PageModel<
  { shocks: readonly ScenarioShock[];
    consoleSignals: readonly EnvironmentalSignal[] },
  { scenarios: readonly ScenarioComposition[];
    scenarioOrder: readonly string[];        // narrative argument order
    loopStages: readonly LoopStage[];
    consoleMeta: ConsoleMeta }               // includes the never-softened disclosure
>;
```

**Why `PageModel<N, L>` rather than a flat shape.** It makes the Phase 1.5 ownership matrix legible at the type level and reviewable in a diff. It localizes failure: `local` is always present, so a Notion outage degrades a page rather than erasing it. And it prevents the slow drift where a Notion field quietly becomes load-bearing for layout — the compiler shows you which side of the line you are on.

`SystemsArchitectureModel.local` is by far the largest — correctly. `/systems` is ~85% repository-owned, exactly as the Gate classified it.

---

## 3 — Transformation Rules

**⚠ Every Notion property name below is provisional until the introspection pass confirms it.** Structure is final; string literals are not.

### 3.1 Shape

```
  raw PageObjectResponse
        │  reader (properties.ts — total, never throws)
        ▼  raw value | null
        │  coerce   (map Notion display string → domain literal)
        ▼  domain value | undefined
        │  require  (throw SchemaError if undefined and non-nullable)
        ▼
     domain entity — or an exception. Never a partially-built object.
```

### 3.2 Enum mappings

Notion display strings are Title Case; domain values are kebab-case. Every map is **total and closed** — an unrecognized value is an error, never a silent fallthrough. This is what makes a Notion option rename a build failure instead of a blank badge.

| Domain type | Notion → domain |
|---|---|
| `EvidenceTier` | `Established`→`established` · `Inferred`→`inferred` · `Proposed`→`proposed` · `Future`→`future` |
| `SignalDomain` | `Hydrology`→`hydrology` … `Infrastructure`→`infrastructure` *(8 values)* |
| `SensingMethod` | `Not Yet Sensed`→`not-yet-sensed` *(5 values)* |
| `TensionHierarchy` | `Supporting — Environmental`→`supporting-environmental` **⚠ em-dash in the Notion label — the exact character must be confirmed** |
| `LoopNodeId` | `Stewardship Intelligence`→`stewardship-intelligence` *(6, closed)* |
| `RecordStatus` | `Draft`/`Active`/`Archived` → lowercase |

### 3.3 Per-entity rules (abridged — `EnvironmentalSignal` shown in full)

| Domain field | ⚠ Notion property | Type | Missing → |
|---|---|---|---|
| `id` | *page id* | — | impossible |
| `name` | `Signal` | title | **SchemaError** |
| `domain` | `Domain` | select | **SchemaError** |
| `kind` | `Signal Type` | select | **SchemaError** |
| `unit` | `Unit` | rich_text | `null` |
| `typicalRange` | `Typical Range` | rich_text | `null` |
| `sensingMethod` | `Sensing Method` | select | **SchemaError** |
| `loopEntryNode` | `Loop Entry Node` | relation → Loop Nodes | **SchemaError** |
| `caseStudyIds` | `Case Studies` | relation *(multi)* | `[]` |
| `tier` | `Evidence Tier` | select | **SchemaError** |
| `sources` | `Sources` | relation *(multi)* | `[]`, then **DataError** if `tier === 'established'` |
| `status` | `Status` | status | defaults `active` |

The same table shape applies to the other six entities; the discriminating rules are: `SystemTension.whyNotSeparate` is required when hierarchy starts with `supporting`; `ScenarioShock` requires ≥1 triggering signal and a non-empty `thresholdRationale`.

### 3.4 Relation resolution

Per Phase 5 §4.4: **query the target database once, build an `id → entity` map, resolve locally.** Never `pages.retrieve()` per relation. This eliminates the N+1 rate-limit risk and yields IDs rather than titles, which is what makes `SignalId`/`ShockId` branding possible at all.

Resolution order is topological: `Source` → `LoopNode` → `CaseStudy` → `Signal` → `Shock` → `Tension` → `Claim`. Each layer resolves only against already-materialized maps, so there is no cycle and no lazy fetching.

### 3.5 Invariants the transform will not do

It never invents defaults for required narrative fields, never coerces an unknown select to a fallback, never returns a partially-built entity, and never maps a Notion property into anything a component uses for layout.

---

## 4 — Validation Strategy

### 4.1 Parse, don't validate

There is no `isValidSignal(x): boolean`. **The transform *is* the validator**: it returns a fully-typed entity or throws. Once a value has type `EnvironmentalSignal`, every invariant expressible in the type system already holds — no component re-checks, and no `if (signal.tier === 'established' && !signal.sources.length)` guards appear downstream.

### 4.2 Four validation tiers

| Tier | Enforced by | Example | On violation |
|---|---|---|---|
| **T1 — Structural** | TypeScript, at compile time | `established` without sources; supporting tension without `whyNotSeparate` | won't compile |
| **T2 — Parse** | transform functions, per record | missing title; unknown select value | **SchemaError** → build fails |
| **T3 — Referential** | resolver, after all maps built | tension references a nonexistent signal id | **DataError** → build fails |
| **T4 — Governance** | collection-level assertions | ≠1 primary tension per case study (G1); unpublished evidence boundary (G5) | **DataError** → build fails |

T1 is the goal state: **every rule that can be moved up a tier should be.** T4 exists only for rules that are inherently about sets rather than records.

### 4.3 T4 governance assertions

| Rule | Assertion |
|---|---|
| G1 | exactly one `hierarchy === 'primary'` per `caseStudyId` |
| G2 | covered by T1 for entities; asserted for claims |
| G5 | if `caseStudy.status === 'published'` then `evidenceBoundaryPublished === true` |
| G6 | resolved loop nodes number exactly 6, sequences 1–6 distinct |
| G7 | covered by T1 (non-empty tuple) + T2 (rationale non-empty) |

### 4.4 Required vs declared-optional

Each page model declares which `notion` fields may legitimately be empty. `DashboardModel.notion.shocks` is **required** for Rock Creek and **optional** for a case study without a console — per Phase 4 §9, Dashboard is the one optional surface. Everything undeclared is required, and empty means failure.

This is the mechanism behind SSOT rule **S6**: absence fails the build rather than rendering stale content as current.

---

## 5 — Error Handling Strategy

### 5.1 Taxonomy

```ts
type NotionIntegrationError =
  | ConfigError      // NOTION_API_KEY absent/invalid
  | AccessError      // database not shared with the integration
  | SchemaError      // property missing, renamed, or wrong type
  | DataError        // parsed fine, violates a governance invariant
  | TransportError   // network failure
  | RateLimitError;  // HTTP 429
```

Every error carries `{ operation, database, property?, recordId?, remediation }`. **`remediation` is a required field, not a nicety** — the error's job is to tell a future maintainer what to do, and a message that only says what broke has done half its work.

### 5.2 Build-time behavior

| Error | Retry | Outcome | Message names |
|---|---|---|---|
| `ConfigError` | no | **fail** | the missing variable and where to set it |
| `AccessError` | no | **fail** | the database, and the sharing step |
| `SchemaError` | no | **fail** | database, property, expected type, likely rename |
| `DataError` | no | **fail** | the governance rule id (G1/G5/G6) and the offending record |
| `TransportError` | 3×, exponential backoff | fail after | the operation |
| `RateLimitError` | honor `Retry-After`, 5× | fail after | request count — a signal to revisit the §2.2 JSON cache |

**No error path returns `[]`.** That behavior is the current integration's most dangerous property: `lib/notion-os.ts` catches everything and returns an empty array, which the component layer renders as curated static content — so a revoked key produces a page that looks entirely current. Replacing it is the point.

### 5.3 Redaction

Per Phase 5 §5.5: never log the raw SDK error. Build logs are visible in Vercel and **public on a public GitHub repository**. Emit only operation, database name, property name, and status code — never headers, request bodies, or the key.

### 5.4 Fallback, narrowly

Curated static fallback survives in exactly one case: a **declared-optional** field returning empty. It renders with a visible label (the existing `CuratedNote` pattern). It is never reached by an error path — a failure fails the build; only a legitimate empty degrades.

---

## 6 — Maintainability

| Decision | Payoff |
|---|---|
| Branded IDs | opaque UUID mix-ups become compile errors |
| `Evidenced` discriminated union | G2 unrepresentable rather than merely policed |
| `SystemTension` hierarchy union | G1's `whyNotSeparate` structurally required |
| Non-empty tuple for shock triggers | G7 unrepresentable |
| Kebab-case domain values | Notion label renames touch one map, zero components |
| Total, closed enum maps | an unmapped option fails the build instead of rendering blank |
| `PageModel<N, L>` | ownership boundary visible in every diff |
| Parse-don't-validate | no defensive re-checking anywhere downstream |
| `remediation` on every error | errors teach the next maintainer |

### Enforcing "never expose raw Notion responses"

Convention is insufficient. Three mechanisms:

1. **Module boundary** — `@notionhq/client` types are imported only inside `lib/notion/`, and the barrel exports domain entities only.
2. **Lint rule** — `no-restricted-imports` banning `@notionhq/client` outside `lib/notion/**`. This is the only mechanical guarantee; TypeScript alone cannot enforce it.
3. **Naming** — raw shapes carry a `Notion` prefix (`NotionPageRow`); domain entities never do. A `Notion*` type appearing in a component diff is visible on sight.

---

## 7 — What this phase does not do

No `.ts` files were created; these are specifications. No property name is confirmed. No transform is implemented. `DashboardMetrics` is intentionally absent (§0.1). The three-tier→four-tier reconciliation in the existing content modules is Implementation Stage **I1**, not Phase 6.

### Open items carried forward

| # | Item | Resolve at |
|---|---|---|
| 1 | All ⚠ property names in §3 | verification pass |
| 2 | Exact character in `Supporting — Environmental` (em-dash vs hyphen) | verification pass |
| 3 | Does `Experience Patterns` already hold systems-model definitions? | verification pass |
| 4 | Phase 8 migration reordered to begin with System Tension Cards | Phase 8 |
