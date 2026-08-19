# Rock Creek OS — Data Architecture

**Phase:** 2 — Data Architecture. Design only; no databases created, no code written, no repository file modified.
**Date:** 2026-08-18
**Authoritative predecessor:** [`rock-creek-os-architecture-gate-decision.md`](rock-creek-os-architecture-gate-decision.md) — all approved decisions preserved.
**Companions:** [`notion-os-current-architecture.md`](notion-os-current-architecture.md) · [`rock-creek-os-repository-architecture-audit.md`](rock-creek-os-repository-architecture-audit.md)

**Verification boundary, restated.** The live Notion workspace still cannot be queried. Every claim about existing structure derives from `lib/notion-os.ts`. Items marked **⚠ VERIFY** must be checked against the real workspace before anything is built.

**On "reuse the existing Environmental Signals database if appropriate":** there is no Environmental Signals database in the integration. It may exist unwired — that is exactly what ⚠ VERIFY means below. This design assumes it must be created and specifies the reconciliation step if it turns out to exist.

---

## 1 — Challenge: Scenario Metadata

**Verdict: drop it. It should not be a database.** My Gate recommendation was wrong on this one; `Scenario Shocks` is the correct entity and it is not a rename.

### The distinction

`scenarios.ts` contains three scenarios — `normal`, `heat`, `compound`. The `heat` premise reads *"Mid-August. Four consecutive days above 90°F air temperature. The creek has been warming since dawn."* `compound` layers smoke onto that.

**A scenario is a composition. A shock is a component.** Heat-event = one shock. Compound = two shocks co-occurring. `normal` is the absence of shocks — it has no shock records at all, which alone shows scenarios and shocks are different entities.

### Applying the Gate's own test

| Test | Scenario composition | Scenario shock |
|---|---|---|
| Cross-project reuse | ❌ `normal/heat/compound` is one console's narrative | ✅ Road closure, utility failure, smoke ingress recur everywhere |
| Structured querying | ❌ nothing to query across | ✅ "every shock triggered by air quality" |
| Relational value | ❌ relates only to itself | ✅ signals, loop nodes, sources, case studies |
| Evidence traceability | ⚠️ inherited from components | ✅ each shock carries threshold, rationale, source, tier |
| Would Notion improve it? | ❌ **it would degrade it** | ✅ yes |

`scenarioOrder` is narrative sequencing — the three scenarios are ordered to build an argument. The staff-decision gate, the four console zones, and the deliberate unresolved state are interaction design. Per the Gate's class-C rule, all of that is repository-owned. A Scenario Metadata table would hold a name, a premise string, and a case-study relation — a row that adds a synchronization obligation and buys nothing.

**Resolution:** scenarios stay in `scenarios.ts` as local compositions that reference shock records by ID. Notion owns the shock library; the repository owns which shocks a scenario composes and what the console does with them.

---

## 2 — Rock Creek's three-role identity

The requirement is that Rock Creek exist as Case Study, Project & Concept, and ESD artifact. **This must not become three records.** Three records for one project is precisely the duplication this phase exists to prevent.

```
   Projects & Concepts  ──▶  ONE canonical record: "Rock Creek OS"
   (existing DB)             the identity. Everything else relates to it.
          │
          ├── ROLE 1  Project & Concept ....... the record itself
          │             Work Type · Maturity Stage · Portfolio Priority
          │
          ├── ROLE 2  Case Study ............... same record, extended properties
          │             +Case Study · +Frame · +Property Referenced
          │             +Disclaimer · +Evidence Boundary Published
          │
          └── ROLE 3  ESD artifacts ............ System Artifacts rows relating IN
                        many artifacts → one case study
```

**Why extension rather than a Case Studies database.** A 1:1 relation between `Projects & Concepts` and `Case Studies` is an anti-pattern unless the child carries substantially more structure than the parent. Here it carries five properties. Extension costs five mostly-null columns on non-case-study rows; a separate table costs a join, a sync obligation, and two places to ask "what is Rock Creek."

**Tripwire:** if case-study-specific properties exceed **eight**, revisit the split. At five, extension is correct.

---

## 3 — Entity Relationship Diagram

```
                         ┌──────────────────────────────┐
                         │   PROJECTS & CONCEPTS        │  ★ EXISTING — extend
                         │   (case-study hub)           │
                         │   "Rock Creek OS"            │
                         │   "Shore Lodge"              │
                         │   "Whitetail Club"           │
                         │   "Yellowstone …"            │
                         └──────────────┬───────────────┘
                                        │  every entity below
       ┌────────────┬───────────┬───────┴────┬────────────┬─────────────┐
       │            │           │            │            │             │
       ▼            ▼           ▼            ▼            ▼             ▼
┌────────────┐┌───────────┐┌──────────┐┌──────────┐┌───────────┐┌──────────────┐
│ENVIRONMENT-││  SYSTEM   ││ SCENARIO ││ EVIDENCE ││  SYSTEM   ││   SOURCES    │
│AL SIGNALS  ││ TENSIONS  ││  SHOCKS  ││  CLAIMS  ││ ARTIFACTS ││              │
│  ◇ NEW     ││  ◇ NEW    ││  ◇ NEW   ││  ◇ NEW   ││ ★ EXISTING││   ◇ NEW      │
└─────┬──────┘└─────┬─────┘└────┬─────┘└────┬─────┘└───────────┘└──────┬───────┘
      │             │           │           │                          │
      │  triggers   │           │           │      cites               │
      ├─────────────┼──────────▶│           ├──────────────────────────┤
      │             │           │           │                          │
      │  relates to │◀──────────┤           │                          │
      │             │           │           │                          │
      │  ┌──────────┴───────────┴───────────┴──────────────────────┐   │
      │  │  claims may attach to signals, tensions, or shocks       │   │
      │  └──────────────────────────────────────────────────────────┘  │
      │             │           │                                      │
      └─────────────┴───────────┴──────────┬───────────────────────────┘
                                            │  all carry a loop position
                                            ▼
                              ┌──────────────────────────┐
                              │      LOOP NODES          │  ⚠ VERIFY —
                              │  1 Environmental Signals │  may already exist as
                              │  2 Stewardship Intellig. │  the `Systems Layers`
                              │  3 Operational Decisions │  multi_select
                              │  4 Staff Actions         │
                              │  5 Guest Experience      │
                              │  6 Operational Learning ─┼──┐
                              └──────────────────────────┘  │
                                            ▲               │ closes the loop
                                            └───────────────┘

  ═══════════════════ REPOSITORY BOUNDARY ═══════════════════════════════
  NOT in Notion — stays in TypeScript per the approved Gate classification:
    architectureLayers · lifecycleFlows (typed edges) · feedbackEdges
    overlayNodes (visual geometry) · scenario composition + decision gate
    scenarioOrder (argument sequencing) · all hero / section / narrative copy
```

### Cardinality

| Relation | Cardinality | Note |
|---|---|---|
| Case Study → Environmental Signals | **many-to-many** | the reuse payoff: one signal, many properties |
| Case Study → System Tensions | **one-to-many** | tension framing is case-study-specific (§4.2) |
| Case Study → Scenario Shocks | **many-to-many** | road closure recurs across properties |
| Case Study → Evidence Claims | **one-to-many** | a claim belongs to one case study |
| Case Study → System Artifacts | **many-to-many** | an artifact can serve several case studies |
| Signal → Scenario Shock | **many-to-many** | compound shocks have multiple triggers |
| Source → Evidence Claim | **many-to-many** | |
| Loop Node → everything | **many-to-many** | |

---

## 4 — Database schemas

### 4.1 Environmental Signals ◇ NEW ⚠ VERIFY

The registry the portfolio already claims and does not have. Highest-value database in this design.

| Property | Type | Options / notes |
|---|---|---|
| `Signal` | title | "Stream Temperature", "Air Quality" |
| `Domain` | select | Hydrology · Fire · Air · Wildlife · Forest · **Infrastructure** · Access · Weather |
| `Signal Type` | select | Continuous Measurement · Categorical State · Discrete Event · Derived Index |
| `Unit` | rich_text | `°F`, `cfs`, `AQI`, `—` |
| `Typical Range` | rich_text | plain-language, not a modeled figure |
| `Sensing Method` | select | Direct Measurement · Public Feed · Field Observation · Modeled · **Not Yet Sensed** |
| `Loop Entry Node` | relation → Loop Nodes | where the signal enters the system |
| `Case Studies` | relation → Projects & Concepts *(multi)* | **the reuse mechanism** |
| `Evidence Tier` | select | Established · Inferred · Proposed · Future |
| `Sources` | relation → Sources | |
| `Status` | status | Draft · Active · Archived |

**`Infrastructure` in the domain list is where the Gate's frame merge lands in data.** Energy load, water storage, and connectivity become signals alongside hydrology and fire — the third proof of the "same architecture, different signal" argument, with no new frame and no sixth layer.

**`Not Yet Sensed`** is deliberate. Most Rock Creek signals are not measured today. Making that a first-class sensing method keeps the evidence boundary honest at the record level instead of only in prose.

**⚠ If an Environmental Signals database already exists:** compare its properties to this table, adopt the existing title and property names wherever they are serviceable, and add only what is missing. Do not create a parallel database.

### 4.2 System Tensions ◇ NEW

Not an invention — a promotion. `explorer-data.ts` already ships `SupportingSystem` with `role`, `affects`, `evidence`, `tier`, and a required `whyNotSeparate` field. This schema is that structure made shared and queryable.

| Property | Type | Options / notes |
|---|---|---|
| `Tension` | title | "Hydrological Flow vs Guest Programming" |
| `Pole A` | rich_text | "Hydrological flow" |
| `Pole B` | rich_text | "Guest programming" |
| `Hierarchy` | select | **Primary · Supporting — Environmental · Supporting — Operational · Background** |
| `Tension Archetype` | select | Ecology vs Programming · Remoteness vs Standard · Stewardship vs Demand · Autonomy vs Reliability · Privacy vs Service |
| `Description` | rich_text | |
| `Why Not Separate` | rich_text | **required for every Supporting row** |
| `Spans Loop Nodes` | relation → Loop Nodes *(multi)* | |
| `Related Signals` | relation → Environmental Signals | |
| `Related Shocks` | relation → Scenario Shocks | |
| `Case Study` | relation → Projects & Concepts *(single)* | |
| `Evidence Tier` | select | four tiers |
| `Sources` | relation → Sources | |
| `Status` | status | Draft · Active · Archived |

**`Hierarchy` makes the foundation doc's central discipline enforceable.** *"One primary problem, two supporting systems"* stops being a rule in prose and becomes a queryable constraint — see governance rule G1.

**Why `Case Study` is single while `Tension Archetype` is a select.** A tension's *hierarchy* is case-study-specific: hydrology-vs-programming is primary at Rock Creek and might be background at Whitetail. Sharing one row across case studies would force a junction table to carry per-case-study hierarchy. `Tension Archetype` delivers the cross-project pattern-matching — "show every case study with a Stewardship vs Demand tension" — at a fraction of the complexity.

### 4.3 Scenario Shocks ◇ NEW — absorbs thresholds

| Property | Type | Options / notes |
|---|---|---|
| `Shock` | title | "Mid-August Hoot Owl Restriction" |
| `Shock Type` | select | Environmental · Regulatory · Infrastructure · Access · Compound |
| `Triggering Signals` | relation → Environmental Signals *(multi)* | |
| `Threshold` | rich_text | "73°F sustained across 3 consecutive days" |
| `Threshold Rationale` | rich_text | **why that number** — the anti-invented-figure field |
| `Consequence` | rich_text | what the crossing forces |
| `Onset Speed` | select | Immediate · Hours · Days · Seasonal |
| `Reversibility` | select | Self-Resolving · Managed Recovery · Persistent |
| `Affected Loop Nodes` | relation → Loop Nodes *(multi)* | |
| `Case Studies` | relation → Projects & Concepts *(multi)* | |
| `Evidence Tier` | select | four tiers |
| `Sources` | relation → Sources | |
| `Status` | status | Draft · Active · Archived |

**Thresholds live here, not on the signal — and this is load-bearing.** If `Threshold` were a signal property, "Stream Temperature" could carry only one property's threshold, and Shore Lodge would need its own duplicate signal row. That destroys the cross-project reuse the signal registry exists for. Putting the threshold on the shock keeps signals genuinely shared while letting each property define its own crossings.

It is also semantically right: a threshold is uninteresting until crossing it does something, and the thing it does *is* the shock. **This consolidation removes a database** — the Gate's draft implied a separate Signal Thresholds junction; folding it here makes it unnecessary.

*Split condition:* if multi-tier thresholds per signal are ever needed that do **not** map to named shocks (advisory → watch → restriction), extract Signal Thresholds then. Not before.

### 4.4 Evidence Claims ◇ NEW

Makes evidence discipline auditable across case studies instead of re-typed per project.

| Property | Type | Options / notes |
|---|---|---|
| `Claim` | title | the assertion, one sentence |
| `Evidence Tier` | select | Established · Inferred · Proposed · Future |
| `Claim Type` | select | Condition · Mechanism · Outcome · Constraint · Capability |
| `Sources` | relation → Sources *(multi)* | |
| `Case Study` | relation → Projects & Concepts *(single)* | |
| `Related Signals` | relation → Environmental Signals | |
| `Related Tensions` | relation → System Tensions | |
| `Related Shocks` | relation → Scenario Shocks | |
| `Surface` | select | Landing · Explorer · Systems · Dashboard · **Not Yet Published** | 
| `Status` | status | Draft · Review · Active · Retired |

Notion has no polymorphic relation, so subject attachment is three optional relations rather than one. `Surface` is what makes an evidence boundary auditable — you can ask which published surface carries unsourced `Established` claims.

### 4.5 Sources ◇ NEW — thin

| Property | Type | Options / notes |
|---|---|---|
| `Source` | title | "Montana FWP — Hoot Owl restrictions" |
| `Source ID` | rich_text | `S1`…`S5` — preserves existing markdown citation keys |
| `Source Type` | select | Government / Regulatory · Academic · Industry · Press · Property-Published · Field Observation |
| `URL` | url | |
| `Publication Date` | date | |
| `Reliability` | select | High · Moderate · Low |
| `Case Studies` | relation → Projects & Concepts *(multi)* | |
| `Status` | status | Active · Superseded |

Five rows today. It earns a table because citation integrity is the entire premise of the evidence discipline, sources are many-to-many with claims, and `Source ID` keeps continuity with the `[S1]`–`[S5]` tags already used throughout `rock-creek-os-foundation.md`.

### 4.6 Loop Nodes ⚠ VERIFY BEFORE CREATING

| Property | Type | Options / notes |
|---|---|---|
| `Loop Node` | title | the six below |
| `Sequence` | number | 1–6 |
| `Node Type` | select | Input · Interpretation · Decision · Action · Output · Learning |
| `Role` | rich_text | one line |
| `Status` | status | Active · Deprecated |

**Canonical vocabulary — closed set:**

| # | Node | Type |
|---|---|---|
| 1 | Environmental Signals | Input |
| 2 | Stewardship Intelligence | Interpretation |
| 3 | Operational Decisions | Decision |
| 4 | Staff Actions | Action |
| 5 | Guest Experience | Output |
| 6 | **Operational Learning** | Learning — *returns to 1* |

**This six-node model unifies two vocabularies that are currently separate in the code.** `systems-data.ts` ships `architectureLayers` (5: Environment → Stewardship Intelligence → Operational Decisions → Staff & Logistics → Guest Experience) *and* `feedbackNodes` (4: Decision → Action → Observed Outcome → New Information) as unrelated structures. Adding **Operational Learning** as node 6 closes the loop the feedback graph describes separately — the architecture becomes genuinely recursive rather than a linear stack with a loop diagram bolted alongside. This is an improvement on both, and the repository's layer names should be aligned to it.

**⚠ THE CRITICAL REUSE CHECK.** `Systems Layers` is an existing `multi_select` on **three** databases — Organizations, Experience Patterns, Projects & Concepts (`lib/notion-os.ts:189, 261, 300`). Its options are not readable without live access. Before creating anything:

1. Run `scripts/introspect-notion-os.mjs` and read the `Systems Layers` options.
2. **If they substantially match these six** → do not create a parallel taxonomy. Upgrade `Systems Layers` from `multi_select` to a **relation** pointing at a new Loop Nodes table, and migrate the three existing consumers. A relation is required regardless because multi-selects cannot be rollup sources (§5).
3. **If they are a different axis entirely** (e.g. Digital / Physical / Ecological) → both exist and serve different purposes. Create Loop Nodes and leave `Systems Layers` alone.
4. **If they partially overlap** → the more likely outcome. Reconcile deliberately and record the decision; do not let two near-identical taxonomies drift.

### 4.7 Projects & Concepts ★ EXISTING — extend

| Property | Type | Notes |
|---|---|---|
| `Case Study` | checkbox | the role discriminator (§2) |
| `Frame` | rich_text | "Adaptive Stewardship Intelligence" — the Gate §1 decision, recorded as data |
| `Property Referenced` | rich_text | "The Ranch at Rock Creek (Philipsburg, MT)" |
| `Disclaimer` | rich_text | the required verbatim line |
| `Evidence Boundary Published` | checkbox | publish gate — see G5 |

**Do not touch** `Project / Concept`, `One-Line Pitch`, `Work Type`, `Maturity Stage`, `Systems Layers`, `Portfolio Priority`, `External Link`, `Status`, or `Strategic Relevance (1–5)`. Each is read by `lib/notion-os.ts` at exact string match, and `Strategic Relevance (1–5)` contains an **en-dash** — renaming it breaks the sort silently.

### 4.8 System Artifacts ★ EXISTING — extend

| Property | Type | Notes |
|---|---|---|
| `Case Studies` | relation → Projects & Concepts *(multi)* | role 3 of §2 |

`Maturity = Concept` already expresses "future artifact." **No Future Artifacts database** — the Gate decision holds.

---

## 5 — Rollups

Only where a rollup answers a real governance question. Each requires a relation, which is why Loop Nodes must be a relation and not a multi-select.

### On Projects & Concepts — the publish dashboard

| Rollup | Source | Function | Question answered |
|---|---|---|---|
| `Claims — Established` | Evidence Claims | count filtered | how much is actually verified |
| `Claims — Future` | Evidence Claims | count filtered | how much is speculative |
| `Unsourced Established` | Evidence Claims | count where tier=Established, Sources empty | **publish blocker** |
| `Signal Count` | Environmental Signals | count | breadth of sensing model |
| `Primary Tension Count` | System Tensions | count where Hierarchy=Primary | **must equal 1** (G1) |
| `Shock Count` | Scenario Shocks | count | |
| `Unsourced Tensions` | System Tensions | count where Sources empty | |

The first three together are the credibility ratio — the honest, at-a-glance answer to "how speculative is this case study," computed rather than asserted.

### On Environmental Signals

| Rollup | Source | Function | Question |
|---|---|---|---|
| `Case Study Count` | Projects & Concepts | count | **is this signal actually reused?** |
| `Shock Count` | Scenario Shocks | count | how many crossings depend on it |

`Case Study Count = 1` across most signals means the registry is not earning its keep. This rollup is the measurement of whether the central architectural bet paid off.

### On Loop Nodes

| Rollup | Source | Function | Question |
|---|---|---|---|
| `Signals Entering` | Environmental Signals | count | |
| `Tensions Spanning` | System Tensions | count | |
| `Shocks Affecting` | Scenario Shocks | count | |

Together these show where system load concentrates — a genuine systems-design finding, not a vanity metric. A node with zero of all three is either underdeveloped or not a real node.

### On Sources

| Rollup | Source | Function | Question |
|---|---|---|---|
| `Claims Citing` | Evidence Claims | count | over-reliance on a single source |

---

## 6 — Naming conventions

Derived from the existing workspace, with two corrections where the existing pattern is inconsistent.

**Databases** — plural, title case, no project prefix: `Environmental Signals`, `System Tensions`, `Scenario Shocks`, `Evidence Claims`, `Sources`, `Loop Nodes`. **Never** `Rock Creek Signals` — a project-prefixed database is a one-off by construction.

**Title property** — singular form of the database name: `Signal`, `Tension`, `Shock`, `Claim`, `Source`, `Loop Node`. This follows `Organization`, `Artifact`, `Experience Pattern`, `Project / Concept`. It deliberately **does not** follow `Portfolio Assets.Title`, which is the odd one out; do not propagate it.

**Property names** — Title Case, spaces, no abbreviations. **Hard rule: ASCII only.** The existing `Strategic Relevance (1–5)` contains an en-dash and is already a documented rename trap. No new property may contain an en-dash, em-dash, or smart quote.

**Type consistency** — the existing OS has two inconsistencies (companion audit §5) that must not propagate:
- `Status` → always the **`status`** type, never `select`
- `Strategic Relevance` → always **`number`**, never a numeric-string select
- `Evidence Tier` → always **`select`** with the identical four options everywhere

**Relation property names** — name the target, plural when multi: `Case Studies`, `Triggering Signals`, `Related Tensions`, `Sources`. Singular only when genuinely single: `Case Study`, `Loop Entry Node`.

**Evidence Tier options — verbatim, everywhere, no synonyms:** `Established` · `Inferred` · `Proposed` · `Future`. Not "Documented." The repository must align to this (Gate §2 migration map).

---

## 7 — Governance rules

Each rule is checkable by a Notion view or rollup. A rule that cannot be checked is a preference, not governance.

| # | Rule | Enforcement |
|---|---|---|
| **G1** | **Exactly one `Primary` tension per case study.** Supporting tensions require a non-empty `Why Not Separate`. | `Primary Tension Count` rollup ≠ 1 → flagged. This is the foundation doc's core discipline made structural |
| **G2** | Any claim, signal, tension, or shock tiered **`Established`** must have ≥1 related Source. | `Unsourced Established` rollup > 0 → publish blocker |
| **G3** | `Proposed` vs `Future` follows the foundation doc §12: `Future` means dependent on infrastructure or data access with no evidence it exists today. Automated triggers, real-time feeds, and any unified cross-domain claim are always `Future`. | Review at authoring; the tier distinction is meaningless if applied loosely |
| **G4** | **Reuse before create.** Before adding a signal, search existing rows. Same phenomenon → add a case-study relation, never a new row. | `Case Study Count` rollup makes violations visible as duplicate near-identical titles |
| **G5** | No case study reaches `Status = Published (Portfolio)` without `Evidence Boundary Published` checked and G2 satisfied. | Checkbox + rollup. Closes the gap `rock-creek-os--portfolio-audit.md` named as publish-blocking |
| **G6** | **Loop Node vocabulary is a closed set.** Adding or renaming a node is an architecture decision requiring a recorded rationale, not a data edit. | Six rows, `Status` field. Uncontrolled growth here would decompose the systems model |
| **G7** | Every shock relates to ≥1 signal and carries a non-empty `Threshold Rationale`. | A shock with no trigger is a narrative event, not a system behavior. The rationale field is the specific guard against reintroducing unsourced precision |
| **G8** | **Notion never determines presentation.** No property may control a heading, section order, color, component choice, or layout. | Gate §4 rule. Enforced at the projection boundary in code review, not in Notion |
| **G9** | Case-study-specific structures are prohibited. Every new database serves ≥2 potential case studies or it is not created. | Design review. `Tension.Case Study` is single-relation by deliberate exception, justified in §4.2 |
| **G10** | Signals are shared; thresholds are case-study-specific. Never move a threshold onto a signal. | §4.3. Violating this collapses the reuse model |

---

## 8 — Reuse and verification register

| Entity | Disposition | Action |
|---|---|---|
| Case Study Metadata | **REUSE** `Projects & Concepts` | extend, 5 properties |
| Future Artifacts | **REUSE** `System Artifacts` | extend, 1 relation |
| Environmental Signals | **NEW** ⚠ VERIFY | check for an existing unwired DB first |
| Loop Nodes | **⚠ VERIFY FIRST** | may be `Systems Layers` upgraded from multi_select to relation |
| System Tensions | **NEW** ⚠ VERIFY | check `Experience Patterns` semantics before creating |
| Scenario Shocks | **NEW** | absorbs thresholds — removes a database |
| Evidence Claims | **NEW** | |
| Sources | **NEW** | thin but justified |
| Scenario Metadata | **❌ DROPPED** | §1 — composition is repository-owned |
| Signal Thresholds | **❌ NOT CREATED** | folded into Scenario Shocks |
| KPI Telemetry | **❌ DEFERRED** | Gate decision holds — no real measurement exists |

**Net: 5 new databases, 1 pending verification, 2 extensions, 3 avoided.**

### Blocking prerequisites

1. `.env.local` restored; `scripts/introspect-notion-os.mjs` run — resolves every ⚠ VERIFY above. **Nothing should be created before this.**
2. Frame decision recorded in `rock-creek-os-foundation.md` §0 (Gate §1: Merge, Stewardship as host).
3. Landing-page drift fixed — `page.tsx:255-258` still promises frameworks `/systems` no longer contains.
4. Evidence vocabulary settled at four tiers, so `Evidence Tier` is created correctly the first time.

### Scaling check

Adding Shore Lodge to this model requires: one `Projects & Concepts` row, relating existing signals, new case-study-specific tensions and shocks, new claims. **Zero new databases, zero new code.** That is the test this architecture was designed to pass.
