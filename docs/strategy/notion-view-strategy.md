# Notion View Strategy

**Phase:** 3.0 companion — Notion architecture only. No code, no views created, no schema changes.
**Date:** 2026-08-18
**Depends on:** [`rock-creek-os-data-architecture.md`](rock-creek-os-data-architecture.md) (Phase 2, approved) · [`portfolio-single-source-of-truth-architecture.md`](portfolio-single-source-of-truth-architecture.md) (Phase 3.0)

**Status.** Specified against the **designed** Phase 2 schema, which is **not yet verified**. Any amendment arising from the Phase 3 exit-gate verification cascades into these specs. Build views only after gate items 1–8 are satisfied.

---

## 1 — The constraint that shapes everything below

**The Notion API cannot query by view.** Verified directly against the installed SDK (`@notionhq/client` v2.2.15):

```
queryDatabase
  queryParams : ["filter_properties"]
  bodyParams  : ["sorts", "filter", "start_cursor", "page_size", "archived", "in_trash"]
```

There is no `view_id` parameter, and the string `view` does not appear anywhere in the endpoint surface. Views are a Notion UI construct; the API sees only databases, filters, and sorts supplied by the caller.

**Three consequences that define this strategy:**

1. **A view cannot feed the portfolio.** The site's filters live in code, in the operational layer. Every filter specified below must be re-expressed as a `filter` object in a query.
2. **Views are therefore dual-purpose artifacts** — the human's working surface in Notion, *and* the canonical specification the code mirrors. The view definition is the spec; the code is the implementation.
3. **View↔code drift is a real failure mode** and needs a governance rule (§10). If someone changes a Notion view's filter expecting the site to follow, nothing happens — silently.

One useful adjacency: `filter_properties` (a query param taking property IDs) is the code-side analogue of "hidden properties." It reduces response payload but is an optimization, not a contract — the projection interface remains the boundary.

---

## 2 — View taxonomy

Three kinds, never mixed. Conflating them is how a workspace becomes unusable.

| Kind | Purpose | Read by the site? | Naming |
|---|---|---|---|
| **SURFACE** | Defines exactly what one portfolio page shows. Mirrored by a code query | No — mirrored, not read | `SURFACE — <Case Study> · <Page> · <Set>` |
| **AUTHOR** | The practitioner's working surface for creating and organizing records | No | `AUTHOR — <purpose>` |
| **GOVERN** | Surfaces rule violations. A passing governance view shows **zero rows** | No | `GOVERN — <rule> (<id>)` |

The prefix convention sorts the three groups apart in Notion's view bar and makes the question "is this view load-bearing for the site?" answerable at a glance.

**Notion has no cross-database views.** Each governance rule that applies to several databases needs one view per database. G2 (unsourced `Established`) therefore appears four times. This is a platform limitation, not redundancy.

---

## 3 — View Inventory

| # | View | Database | Kind |
|---|---|---|---|
| 1 | `SURFACE — Rock Creek · Overview · Identity` | Projects & Concepts | SURFACE |
| 2 | `SURFACE — Rock Creek · Overview · Tension Set` | System Tensions | SURFACE |
| 3 | `SURFACE — Rock Creek · Overview · Evidence Boundary` | Evidence Claims | SURFACE |
| 4 | `SURFACE — Rock Creek · Explorer · Premise Signals` | Environmental Signals | SURFACE |
| 5 | `SURFACE — Rock Creek · Explorer · Tensions` | System Tensions | SURFACE |
| 6 | `SURFACE — Rock Creek · Explorer · Claims` | Evidence Claims | SURFACE |
| 7 | `SURFACE — Rock Creek · Systems · Loop` | Loop Nodes | SURFACE |
| 8 | `SURFACE — Rock Creek · Systems · Extensibility` | Environmental Signals | SURFACE |
| 9 | `SURFACE — Rock Creek · Systems · Future Artifacts` | System Artifacts | SURFACE |
| 10 | `SURFACE — Rock Creek · Dashboard · Shock Library` | Scenario Shocks | SURFACE |
| 11 | `SURFACE — Rock Creek · Dashboard · Console Signals` | Environmental Signals | SURFACE |
| 12 | `AUTHOR — Signal Library by Domain` | Environmental Signals | AUTHOR |
| 13 | `AUTHOR — Sensing Reality Check` | Environmental Signals | AUTHOR |
| 14 | `AUTHOR — Tension Hierarchy` | System Tensions | AUTHOR |
| 15 | `AUTHOR — Archetype Cross-Project` | System Tensions | AUTHOR |
| 16 | `AUTHOR — Shock Library by Type` | Scenario Shocks | AUTHOR |
| 17 | `AUTHOR — Onset × Reversibility` | Scenario Shocks | AUTHOR |
| 18 | `AUTHOR — The Loop` | Loop Nodes | AUTHOR |
| 19 | `GOVERN — Primary Tension Count (G1)` | System Tensions | GOVERN |
| 20 | `GOVERN — Missing Why-Not-Separate (G1)` | System Tensions | GOVERN |
| 21 | `GOVERN — Unsourced Established (G2)` | System Tensions | GOVERN |
| 22 | `GOVERN — Unsourced Established (G2)` | Environmental Signals | GOVERN |
| 23 | `GOVERN — Unsourced Established (G2)` | Scenario Shocks | GOVERN |
| 24 | `GOVERN — Unsourced Established (G2)` | Evidence Claims | GOVERN |
| 25 | `GOVERN — Signal Reuse Audit (G4/S7)` | Environmental Signals | GOVERN |
| 26 | `GOVERN — Orphan Signals` | Environmental Signals | GOVERN |
| 27 | `GOVERN — Missing Threshold Rationale (G7)` | Scenario Shocks | GOVERN |
| 28 | `GOVERN — Orphan Shocks (G7)` | Scenario Shocks | GOVERN |
| 29 | `GOVERN — Load Distribution` | Loop Nodes | GOVERN |
| 30 | `GOVERN — Publish Readiness (G5)` | Projects & Concepts | GOVERN |

**11 surface · 7 authoring · 12 governance.** Scaling: a second case study adds **11 surface views and zero others** — governance and authoring views are portfolio-wide by construction.

---

## 4 — Surface view specifications

Every surface view carries two implicit filters, omitted from each table below to avoid repetition: **`Status` is `Active`** and **`Case Study`/`Case Studies` matches the page's case study.** Draft records never render.

### 4.1 Overview — `/projects/rock-creek-os`

**① Identity** · Projects & Concepts · *Table*

| | |
|---|---|
| **Filter** | `Case Study` is checked · `Project / Concept` is `Rock Creek OS` |
| **Sort** | — (single record) |
| **Group** | none |
| **Visible** | Project / Concept · One-Line Pitch · Frame · Property Referenced · Disclaimer · Evidence Boundary Published · Status |
| **Hidden** | Work Type · Maturity Stage · Portfolio Priority · Systems Layers · External Link · Strategic Relevance (1–5) |

**② Tension Set** · System Tensions · *Board*

| | |
|---|---|
| **Filter** | `Hierarchy` is not `Background` |
| **Sort** | `Hierarchy` (Primary → Supporting–Environmental → Supporting–Operational) → `Tension` A→Z |
| **Group** | **`Hierarchy`** — the grouping *is* the argument: primacy must be visible before the copy says it |
| **Visible** | Tension · Hierarchy · Pole A · Pole B · Description · Why Not Separate · Evidence Tier |
| **Hidden** | Tension Archetype · Spans Loop Nodes · Related Signals · Related Shocks · Sources |

**③ Evidence Boundary** · Evidence Claims · *Table*

| | |
|---|---|
| **Filter** | `Surface` is `Landing` · `Boundary Role` is not empty |
| **Sort** | `Boundary Role` (Establishes → Not Claimed) → `Evidence Tier` (Established → Future) |
| **Group** | **`Boundary Role`** — produces the ✓/✗ module directly |
| **Visible** | Claim · Boundary Role · Evidence Tier · Sources |
| **Hidden** | Claim Type · Related Signals · Related Tensions · Related Shocks |

> **⚠ Phase 2 amendment A1 — discovered by doing this design.** The evidence-boundary module has two halves: what the work *establishes* and what it explicitly *does not claim*. A "not claimed" item is not a claim with a tier; it is a stated exclusion. Phase 2's `Evidence Claims` schema has no way to express it. **Add `Boundary Role` (select): `Establishes` · `Not Claimed` · *(empty)*.** Orthogonal to `Claim Type`, so a record can be both a Condition and an Establishes item. Record this against exit-gate item 8.

### 4.2 Explorer — `/projects/rock-creek-os/explorer`

**④ Premise Signals** · Environmental Signals · *Board*

| | |
|---|---|
| **Filter** | — (case study + active only) |
| **Sort** | `Domain` → `Signal` A→Z |
| **Group** | **`Domain`** — shows the landscape as multi-domain before the primary problem narrows it |
| **Visible** | Signal · Domain · Unit · Typical Range · Sensing Method · Evidence Tier |
| **Hidden** | Signal Type · Loop Entry Node · Sources · Case Studies |

**⑤ Tensions** · System Tensions · *Board*

| | |
|---|---|
| **Filter** | `Hierarchy` is not `Background` |
| **Sort** | `Hierarchy` → `Tension` |
| **Group** | **`Hierarchy`** |
| **Visible** | Tension · Hierarchy · Pole A · Pole B · Description · **Why Not Separate** · Related Signals · Related Shocks · Evidence Tier · Sources |
| **Hidden** | Tension Archetype · Spans Loop Nodes |

The widest tension view — Explorer is where the full argument is made. `Why Not Separate` is mandatory here; it is the field that stops three tensions reading as three case studies.

**⑥ Claims** · Evidence Claims · *Table*

| | |
|---|---|
| **Filter** | `Surface` is `Explorer` |
| **Sort** | `Evidence Tier` (Established → Inferred → Proposed → Future) → `Claim` |
| **Group** | **`Related Tensions`** — attaches evidence to the argument it supports |
| **Visible** | Claim · Evidence Tier · Claim Type · Sources · Related Signals |
| **Hidden** | Boundary Role · Related Shocks · Surface |

### 4.3 Systems — `/projects/rock-creek-os/systems`

**⑦ Loop** · Loop Nodes · *Table*

| | |
|---|---|
| **Filter** | `Status` is `Active` *(portfolio-wide — the loop is not case-study specific)* |
| **Sort** | **`Sequence` ascending** |
| **Group** | **none — deliberately.** Sequence is the argument; grouping would destroy it |
| **Visible** | Loop Node · Sequence · Node Type · Role · Signals Entering · Tensions Spanning · Shocks Affecting |
| **Hidden** | Status |

**⑧ Extensibility** · Environmental Signals · *Board*

| | |
|---|---|
| **Filter** | `Domain` is any of `Hydrology`, `Fire`, `Infrastructure` |
| **Sort** | `Domain` (Hydrology → Fire → Infrastructure) → `Signal` |
| **Group** | **`Domain`** |
| **Visible** | Signal · Domain · Unit · Sensing Method · Loop Entry Node · Evidence Tier |
| **Hidden** | Typical Range · Signal Type · Case Studies · Sources |

**This view is the frame merge made visible.** Three domain columns, one architecture — the Gate §1 decision rendered as a board. `Infrastructure` appearing as a peer column beside Hydrology and Fire is the whole argument that infrastructure returned as a signal domain rather than a rival frame.

**⑨ Future Artifacts** · System Artifacts · *Board*

| | |
|---|---|
| **Filter** | `Maturity` is `Concept` · `Status` is not `Archived` |
| **Sort** | `Artifact Type` → `Artifact` A→Z |
| **Group** | **`Artifact Type`** |
| **Visible** | Artifact · Artifact Type · Maturity · Evidence Confidence · Version |
| **Hidden** | Project · Status · Case Studies |

Per Phase 2, the `layerIds` binding stays in the repository — no loop-node relation is surfaced here.

### 4.4 Dashboard — `/projects/rock-creek-os/dashboard`

**⑩ Shock Library** · Scenario Shocks · *Table*

| | |
|---|---|
| **Filter** | — (case study + active only) |
| **Sort** | `Shock Type` → `Onset Speed` (Immediate → Seasonal) → `Shock` |
| **Group** | **`Shock Type`** |
| **Visible** | Shock · Shock Type · Triggering Signals · **Threshold** · **Threshold Rationale** · Consequence · Onset Speed · Reversibility · Affected Loop Nodes · Evidence Tier · Sources |
| **Hidden** | Case Studies |

The widest surface view in the system — the console consumes nearly every property. `Threshold Rationale` is visible rather than hidden precisely because this is the surface where invented precision would do the most damage.

**⑪ Console Signals** · Environmental Signals · *Table*

| | |
|---|---|
| **Filter** | `Signal Type` is any of `Continuous Measurement`, `Categorical State` |
| **Sort** | `Domain` → `Signal` |
| **Group** | **`Domain`** |
| **Visible** | Signal · Domain · Unit · Typical Range · Sensing Method · Evidence Tier |
| **Hidden** | Signal Type · Loop Entry Node · Sources · Case Studies |

The `Signal Type` filter is functional: the console renders readings. A `Discrete Event` or `Derived Index` signal has no gauge representation and would arrive as an empty tile.

---

## 5 — Authoring and governance view specifications

### System Tensions

| View | Filter | Sort / Group | Notes |
|---|---|---|---|
| `AUTHOR — Tension Hierarchy` | none | Group **Hierarchy**, sort Case Study | Every tension, every case study |
| `AUTHOR — Archetype Cross-Project` | none | Group **Tension Archetype** | The cross-project pattern surface — "which properties share a Stewardship vs Demand tension" |
| `GOVERN — Primary Tension Count (G1)` | `Hierarchy` is `Primary` | Group **Case Study** | **Any group with ≠1 row is a violation.** The foundation doc's central rule, made checkable |
| `GOVERN — Missing Why-Not-Separate (G1)` | `Hierarchy` contains `Supporting` AND `Why Not Separate` is empty | — | Zero rows = pass |
| `GOVERN — Unsourced Established (G2)` | `Evidence Tier` is `Established` AND `Sources` is empty | Group Case Study | Publish blocker |

### Environmental Signals

| View | Filter | Sort / Group | Notes |
|---|---|---|---|
| `AUTHOR — Signal Library by Domain` | none | Group **Domain** | Primary authoring surface |
| `AUTHOR — Sensing Reality Check` | none | Group **Sensing Method** | Makes the `Not Yet Sensed` column visible at a glance — the honesty check on the sensing model |
| `GOVERN — Signal Reuse Audit (G4/S7)` | none | Sort **Case Study Count** ascending | Signals with count 1 are either genuinely specific or an unnoticed duplicate. **This view measures whether the shared registry paid off** |
| `GOVERN — Orphan Signals` | `Shock Count` = 0 AND `Case Study Count` = 0 | — | A signal nothing uses |
| `GOVERN — Unsourced Established (G2)` | `Evidence Tier` is `Established` AND `Sources` is empty | Group Domain | |

### Scenario Shocks

| View | Filter | Sort / Group | Notes |
|---|---|---|---|
| `AUTHOR — Shock Library by Type` | none | Group **Shock Type** | |
| `AUTHOR — Onset × Reversibility` | none | Group **Onset Speed**, visible Reversibility | The response-planning matrix — fast + persistent shocks are the design problem |
| `GOVERN — Missing Threshold Rationale (G7)` | `Threshold Rationale` is empty | — | **The specific guard against reintroducing unsourced precision** |
| `GOVERN — Orphan Shocks (G7)` | `Triggering Signals` is empty | — | A shock with no trigger is a narrative event, not a system behavior |
| `GOVERN — Unsourced Established (G2)` | as above | Group Shock Type | |

### Loop Nodes

| View | Filter | Sort / Group | Notes |
|---|---|---|---|
| `AUTHOR — The Loop` | none | Sort **Sequence** asc, no grouping | Six rows. The canonical order |
| `GOVERN — Load Distribution` | none | Sort **Signals Entering** desc, all rollups visible | Where system load concentrates — a genuine systems finding |
| `GOVERN — Empty Nodes` | all three rollups = 0 | — | A node nothing touches is underdeveloped or not a real node |

### Projects & Concepts

| View | Filter | Sort / Group | Notes |
|---|---|---|---|
| `GOVERN — Publish Readiness (G5)` | `Case Study` is checked | Group **Status** | Visible: Claims–Established · Claims–Future · Unsourced Established · Primary Tension Count · Signal Count · Shock Count · Evidence Boundary Published. **The single publish dashboard** |

---

## 6 — Filtering Logic

Five principles. The third is the one most likely to be violated under pressure.

**F1 — Every surface view filters by case study and by `Status = Active`.** Draft records never reach a page. This is what makes it safe to author in the open.

**F2 — Filters at the source are the editorial decision.** The portfolio never renders a whole table. Which records qualify *is* the curation — the mechanism that keeps this a case study rather than a database viewer.

**F3 — Surface views must NEVER filter by `Evidence Tier`.** Filtering out `Future` or `Proposed` records to make a page look more certain is evidence laundering. Tier controls how a record is *labeled*, never whether it *appears*. The one exception is view ③, where `Boundary Role` — not tier — selects the boundary module's contents.

**F4 — Governance views filter for violations, not compliance.** A passing governance view shows **zero rows**. This inverts the usual instinct and makes "is anything wrong?" answerable without reading.

**F5 — Filter by structural property, never by title.** `Domain is Hydrology`, not `Signal contains "stream"`. Title-matching filters break silently on rename — the same class of failure as the en-dash property trap already documented in the existing OS.

### Filter inventory by property

| Property | Used in | Purpose |
|---|---|---|
| `Status` | every surface view | draft suppression |
| `Case Study` / `Case Studies` | every surface view | project scoping |
| `Hierarchy` | ②, ⑤, G1 views | primacy; background exclusion |
| `Domain` | ⑧ | the extensibility argument |
| `Signal Type` | ⑪ | renderability in the console |
| `Surface` | ③, ⑥ | which page a claim belongs to |
| `Maturity` | ⑨ | future-artifact selection |
| `Boundary Role` | ③ | evidence-boundary halves *(amendment A1)* |
| `Evidence Tier` | **governance only** | never for surface selection — see F3 |

---

## 7 — Grouping Logic

**The grouping axis is the argument.** Choosing a grouping is an editorial act, not an organizational convenience — pick the axis a visitor should conclude something from.

| View | Group by | The argument it makes |
|---|---|---|
| ② ⑤ Tensions | `Hierarchy` | One problem is primary. Two support it. They are not peers |
| ④ Premise Signals | `Domain` | The landscape is multi-domain before the primary problem narrows it |
| ⑧ Extensibility | `Domain` | Same architecture, three domains — **including infrastructure** |
| ⑩ Shock Library | `Shock Type` | Shocks arrive from distinct sources needing distinct responses |
| ⑪ Console Signals | `Domain` | Hydrology is primary; fire is subordinate |
| ③ Evidence Boundary | `Boundary Role` | What is established vs what is not claimed |
| ⑥ Claims | `Related Tensions` | Evidence attaches to the argument it supports |
| ⑨ Future Artifacts | `Artifact Type` | The roadmap has kinds, not just a list |
| ⑦ **Loop** | **none** | **Sequence is the argument. Grouping would destroy it** |
| G1 Primary Count | `Case Study` | Accountability unit — one primary per project |
| Publish Readiness | `Status` | Pipeline position |

**Two rules.** Never group by `Evidence Tier` in a surface view — it segregates speculative content into its own visual block, which either buries it or overstates it; tier belongs on the record as a badge. And never group a sequence — ⑦ is the standing example.

---

## 8 — Dashboard Data Requirements

The Stewardship Console is the most data-hungry surface. It composes shocks into scenarios **locally**; Notion supplies the facts.

### Required from Notion

| Requirement | Source | Property | Console use |
|---|---|---|---|
| Signal identity + unit | Signals ⑪ | Signal, Unit | condition tile label |
| Plausible range | Signals ⑪ | Typical Range | tile value framing |
| Sensing honesty | Signals ⑪ | Sensing Method | `Not Yet Sensed` must be disclosable |
| Domain primacy | Signals ⑪ | Domain | hydrology dominant, fire subordinate |
| Shock identity | Shocks ⑩ | Shock, Shock Type | scenario premise |
| **Threshold value** | Shocks ⑩ | Threshold | the crossing that drives interpretation |
| **Threshold rationale** | Shocks ⑩ | Threshold Rationale | why that number — the anti-invention field |
| Consequence | Shocks ⑩ | Consequence | interpretation zone copy |
| Trigger binding | Shocks ⑩ | Triggering Signals | which reading causes which shock |
| Timing | Shocks ⑩ | Onset Speed, Reversibility | urgency and recovery framing |
| Loop propagation | Shocks ⑩ | Affected Loop Nodes | which console zones light up |
| Tier + sources | both | Evidence Tier, Sources | badge and citation |

### Explicitly NOT from Notion

Scenario composition (which shocks make `heat` vs `compound`) · `scenarioOrder` · the four zone structure · **the staff-decision gate** · status→color mapping · `ConditionStatus` / `TrendDirection` vocabularies · all narrative and outcome copy.

**The decision gate is the case study's argument** — a recommendation sitting unexecuted until a person acts. It is interaction design and stays in the repository permanently.

### Composition contract

```
Notion : shock facts, thresholds, signal definitions, sources, tiers
Repo   : scenario = [shock ids] + zone layout + gate + narrative
         a scenario references shocks; it never restates their facts
```

`normal` references **zero** shocks — the absence case must render correctly with an empty shock set.

---

## 9 — Portfolio Data Requirements

What any case study needs to render, so future projects inherit the contract rather than reinventing it.

### Minimum viable case study

| # | Requirement | Source | Gate |
|---|---|---|---|
| 1 | One `Projects & Concepts` record, `Case Study` checked | Identity | required |
| 2 | `Frame`, `Property Referenced`, `Disclaimer` populated | Identity | required |
| 3 | Exactly **one** `Primary` tension | Tensions | **G1** |
| 4 | Every Supporting tension has `Why Not Separate` | Tensions | **G1** |
| 5 | ≥1 signal related to the case study | Signals | required |
| 6 | Every `Established` record has ≥1 source | all | **G2** |
| 7 | Evidence boundary claims with `Boundary Role` on both halves | Claims | **G5** |
| 8 | `Evidence Boundary Published` checked | Identity | **G5** |

Items 1–8 are the publish contract. A case study missing any of them is not publishable regardless of how finished the pages look.

### Per-surface requirements

| Surface | Needs | Degrades to |
|---|---|---|
| Overview | identity + tension set + boundary | cannot degrade — 1, 3, 7 are hard requirements |
| Explorer | signals + tensions + claims | renders with tensions alone; signals enrich |
| Systems | loop nodes + domain signals + artifacts | loop nodes are portfolio-wide, always present |
| Dashboard | shocks + console signals | **cannot render without ≥1 shock** — optional surface for a new case study |

Dashboard is the only optional surface. Shore Lodge could publish Overview, Explorer, and Systems with no shocks defined and add the console later.

### Cross-case-study requirements

| Requirement | Enforced by |
|---|---|
| Signals shared, not duplicated | G4 · `GOVERN — Signal Reuse Audit` |
| Loop node vocabulary identical everywhere | G6 · closed set of six |
| Evidence tiers identical everywhere | Phase 2 §6 · same four options, verbatim |
| No case-study-specific databases | G9 |
| Adding a case study adds **11 surface views, zero databases, zero code** | §3 · this is the architecture's success test |

---

## 10 — View↔code parity governance

Because views cannot be consumed by the API (§1), a Notion view and its code query are two expressions of one specification that can silently diverge.

| # | Rule |
|---|---|
| **V1** | Every `SURFACE —` view has exactly one code query counterpart, named identically in a comment at the query site |
| **V2** | **The view definition is the specification; code is the implementation.** Changing a surface filter starts in the view, then the code is updated to match |
| **V3** | Changing a Notion view alone changes nothing on the site. Anyone editing a `SURFACE —` view must know this — put it in the view description |
| **V4** | `AUTHOR —` and `GOVERN —` views are free to change at any time. They have no code counterpart by definition |
| **V5** | Surface view specs are recorded in this document and reviewed whenever a Phase 2 schema property changes |
| **V6** | The committed schema snapshot (exit-gate item 2) is extended to include surface-view filter definitions, so drift is visible in a diff |

---

## 11 — Amendments raised by this design

| # | Amendment | Target | Reason |
|---|---|---|---|
| **A1** | Add `Boundary Role` (select: `Establishes` · `Not Claimed`) to **Evidence Claims** | Phase 2 §4.4 | The evidence-boundary module has two halves; a "not claimed" item is a stated exclusion, not a tiered claim. No existing property expresses it |

Record against Phase 3 exit-gate item 8. **A1 is a genuine schema gap, not a view-layer workaround** — without it the ✓/✗ trust module named as a publish-blocker in `rock-creek-os--portfolio-audit.md` cannot be sourced from Notion at all.
