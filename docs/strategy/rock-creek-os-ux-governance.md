# Narrative & UX Integrity — Rock Creek OS

**Master suite:** Phase 9. Governance framework only — no code, no repository source modified.
**Date:** 2026-08-18
**Audits:** the shipped Rock Creek UX, against every Notion integration decision in Phases 1.5–8.

---

## 0 — What the audit found

The existing UX is **not** a set of pages that happen to look nice. It is an argument delivered through visual grammar, with the reasoning recorded in the source. Three examples, verbatim from the codebase:

> *"Visual weight carries the argument before the copy does: the primary problem is the only section with a filled accent kicker, 6xl heading, design-question pull quote, and an interactive chain."* — `explorer/page.tsx`

> *"Interactivity is deliberately scarce… Explorer is where a visitor investigates; this page is where they read a map."* — `systems/page.tsx`

> *"THE HUMAN DECISION is the point of the whole interaction. Zone 03 holds a recommendation in an explicit 'awaiting staff decision' state and will not advance on its own."* — `StewardshipConsole.tsx`

And on the root page, the card grammar *"encodes primacy rather than sequence."* The console's disclosure line is annotated *"Never softened. This is the fact/speculation boundary, kept always-visible."*

**This matters for governance because the risk is not that someone will make the site ugly.** It is that these decisions are invisible to anyone reading a data model. A migration that preserves every field and loses the primacy grammar would pass every technical test in Phase 8 and destroy the case study.

Supporting evidence of design maturity: **122 accessibility references** across the Rock Creek tree, `useReducedMotion` honored in the animated components, and a four-state semantic palette (`optimal` / `nominal` / `elevated` / `critical`) with per-state dot, text, glow, border, and background tokens.

---

## 1 — UX Governance Framework

### 1.1 The four questions are not symmetric

Questions 1–3 ask whether something **improves**. Question 4 asks whether something is **preserved**. That is a different kind of test, and treating them as four equal scores is the mistake that lets bad decisions through.

> **Q4 is a veto, not a criterion.**
>
> **PASS requires: Q4 = YES, *and* at least one of Q1–Q3 = a clear YES.**
>
> A decision that preserves design intent but improves nothing is **overhead**. A decision that improves something but violates design intent is **damage**, and no amount of Q1–Q3 gain compensates.

**The tell for a bad decision:** its strongest justification is a fifth question nobody asked — *"does it make authoring easier?"* Authoring convenience is a real benefit, but it is not on this list, and it has never justified a change to what a visitor sees.

### 1.2 The test applied — every integration decision to date

| # | Decision | Q1 Story | Q2 Systems | Q3 Quality | Q4 Intent | Verdict |
|---|---|---|---|---|---|---|
| 1 | Tension hierarchy (primary/supporting) in Notion | ✅ | ✅ | ✅ | ✅ | **PASS** — strongest |
| 2 | Environmental Signals registry | ➖ | ✅ | ✅ | ✅ | **PASS** |
| 3 | Evidence Claims + Sources | ➖ | ➖ | ✅ | ✅ | **PASS** |
| 4 | Scenario Shock library + thresholds | ➖ | ✅ | ✅ | ✅ | **PASS** |
| 5 | Loop Nodes as closed vocabulary | ➖ | ✅ | ➖ | ✅ | **PASS** |
| 6 | Four-tier evidence vocabulary | ✅ | ➖ | ✅ | ✅ | **PASS** |
| 7 | `Boundary Role` (amendment A1) | ➖ | ➖ | ✅ | ✅ | **PASS** |
| 8 | Narrative prose → Notion | ❌ | ➖ | ➖ | ❌ | **VETO** |
| 9 | `scenarioOrder` → Notion | ❌ | ❌ | ➖ | ❌ | **VETO** — order *is* the argument |
| 10 | Architecture / lifecycle / feedback graphs → Notion | ➖ | ❌ | ➖ | ❌ | **VETO** — degrades the model |
| 11 | KPI Telemetry database | ➖ | ➖ | ❌ | ❌ | **VETO** — invented precision |
| 12 | "View in Notion" link per record | ❌ | ➖ | ❌ | ❌ | **VETO** |
| 13 | Section order from a Notion property | ❌ | ❌ | ➖ | ❌ | **VETO** |
| 14 | Record counts shown to visitors ("12 signals") | ❌ | ➖ | ❌ | ❌ | **VETO** |
| 15 | Visitor-facing filter / sort / search | ❌ | ➖ | ❌ | ❌ | **VETO** |

**Seven pass, eight veto.** A framework where everything passes is decoration; this one has teeth. Decisions 12–15 are the ones nobody has proposed yet — they are how the drift actually begins, one reasonable-sounding convenience at a time.

### 1.3 Failure-mode detection — ten symptoms of a database viewer

Check before every merge. Any yes is a defect.

| # | Symptom |
|---|---|
| 1 | A section renders as a list of uniform rows |
| 2 | Card treatment is identical regardless of the record's importance |
| 3 | A Notion property name is visible as a UI label |
| 4 | Section order is determined by data order |
| 5 | An empty state reads *"No records found"* |
| 6 | A record count is displayed to a visitor |
| 7 | Filter, sort, or search controls are exposed to a visitor |
| 8 | Every record links out to Notion |
| 9 | **Adding a Notion row changes a page with no repository change** |
| 10 | **Nobody can explain why one element is larger than another** |

**#9 is the structural test.** If content can appear without a deliberate repository change, the projection boundary has failed — regardless of how the page looks.

**#10 is the human one.** In today's codebase every size difference has a recorded reason. The day that stops being true, the argument has been replaced by a layout.

---

## 2 — Content-to-Experience Rules

| # | Rule |
|---|---|
| **E1** | **A record never renders itself.** A component decides how a record appears. There is no generic `<NotionRecord>` and there never will be |
| **E2** | **Prominence is authored, never derived.** `Hierarchy: Primary` tells the page *which* tension leads; the 5xl heading, filled kicker, pull quote, and interactive chain are local decisions keyed off it. Notion supplies the fact, the repository supplies the emphasis |
| **E3** | **Evidence tier changes the badge, never the placement.** A `Future` claim sits exactly where it belongs in the argument, labeled. Sorting or demoting by tier is evidence laundering *(Phase 4 F3)* |
| **E4** | **Empty is a designed state.** `normal` has zero shocks and must render as a composed, confident page — not a gap. Never *"no records."* |
| **E5** | **Notion vocabulary never reaches the DOM.** Domain values are kebab-case; display strings are authored in the component. A Notion rename must be invisible to a visitor |
| **E6** | **Field count is not section count.** Adding a property adds nothing to a page until someone designs where it goes |
| **E7** | **Sequence is authored.** `scenarioOrder`, loop-node order, and section order are arguments. Only `Sequence` on Loop Nodes is Notion-held, and it is a closed 1–6 set |
| **E8** | **Relations are not navigation.** A relation existing in Notion does not imply a link in the UI. Cross-references are editorial |

---

## 3 — Storytelling Preservation Guidelines

### 3.1 The five load-bearing narrative devices

These carry the argument. Each is a **protected invariant** — changing one requires an explicit design decision, never a migration side effect.

| # | Device | Where | Protects |
|---|---|---|---|
| **S1** | **Primacy grammar** — one primary tension gets the filled kicker, largest heading, pull quote, and the only interactive chain; supporting systems get lighter, muted, dashed treatment | `/` and `/explorer` | "One system, one problem, two supporting" — the doc's core discipline |
| **S2** | **`whyNotSeparate`** rendered on every supporting system | `/explorer` | Stops the page reading as three small case studies |
| **S3** | **The decision gate** — Zone 03 holds in "awaiting staff decision"; zones 03-logistics and 04-adapted resolve only after a person acts | `/dashboard` | Decision *support* vs automation — the case study's thesis |
| **S4** | **The disclosure line** — *"Conceptual prototype · modeled values, not Ranch measurements"* | `/dashboard` | The fact/speculation boundary. Annotated "never softened" |
| **S5** | **Evidence boundary modules** — what is established, what is not claimed | all four routes | The publish-blocker named in the portfolio audit |

**S3 and S4 are permanently repository-owned.** No schema change, no migration, no convenience can move them.

### 3.2 Narrative sequencing is not data

The four routes form one argument: `/` says *why it matters* → `/explorer` says *what the problem is* → `/systems` says *how it would work* → `/dashboard` shows *what it feels like*. Within `/explorer`, sections run premise → primary → supporting → overlay → signal-to-experience → future → boundary.

**None of that ordering is derivable from any Notion property.** It was authored. It stays authored.

### 3.3 The migration test for storytelling

After every migration in Phase 8, one question decides it:

> **Read the page aloud. Is the argument still there, in the same order, with the same emphasis?**

Byte-identical HTML (Phase 8's seed-and-mirror technique) answers this mechanically for M1–M3. **M4 is the exception** — decomposing the console changes structure, so S3 must be verified by hand: switch all three scenarios, confirm the recommendation does not self-execute.

---

## 4 — Dashboard Design Principles

| # | Principle | Source |
|---|---|---|
| **D1** | **Demonstrate, don't explain.** Almost no expository prose — the other three routes carry it | `StewardshipConsole.tsx` |
| **D2** | **Four zones, one control.** Conditions → Interpretation → Response → Experience, driven by a single scenario selector. Adding a second control requires a design decision, not a data need | shipped IA |
| **D3** | **The human decides.** ⚠️ **Protected (S3).** Zone 03 never self-advances | `StewardshipConsole.tsx` |
| **D4** | **Hydrology dominant, fire subordinate — always.** The primary/supporting hierarchy is spatial, not just editorial. Wildfire never gets an equal column | shipped layout |
| **D5** | **The resting state is honest.** `normal` reads *"this is what the console looks like the overwhelming majority of the time."* A dashboard that is only ever interesting is lying about the system | `scenarios.ts` |
| **D6** | **Four semantic states, no more.** `optimal · nominal · elevated · critical`, each with a full token set. Notion status values map into these; they never extend them | `viz-primitives.tsx` |
| **D7** | **Disclosure is permanent.** ⚠️ **Protected (S4)** | `consoleMeta` |
| **D8** | **Modeled values are labeled as modeled.** `ScenarioSignalReading` stays local precisely so no reader mistakes it for telemetry | Phase 6 §0.1 |

**Migration guard for M4:** the console is the only surface where the interaction *is* the argument. Decomposition and data wiring must be separate commits, with D3 manually verified between them.

---

## 5 — Explorer Design Principles

| # | Principle | Source |
|---|---|---|
| **X1** | **Visual weight carries the argument before the copy does.** A visitor should know what matters most before reading a sentence | `explorer/page.tsx` |
| **X2** | **Primary treatment is singular.** Exactly one section gets the filled accent kicker, largest heading, `border-l-4` pull quote, and interactive chain. ⚠️ **Protected (S1)** | shipped |
| **X3** | **Supporting treatment is visibly lighter** — muted backgrounds, dashed borders, smaller headings, neutral kickers. The subordination is the point | shipped |
| **X4** | **Every supporting system says why it is not separate.** ⚠️ **Protected (S2)** | `SupportingSystem.whyNotSeparate` — *"Required"* |
| **X5** | **Interactivity is for investigation.** This is where a visitor explores; scarcity elsewhere makes it meaningful here | `systems/page.tsx` contrast |
| **X6** | **Motion is optional.** `useReducedMotion` is honored. Any new animated component inherits this | `explorer-primitives.tsx` |
| **X7** | **Signals establish a multi-domain landscape before the argument narrows.** Premise conditions show breadth so the primary problem reads as a choice, not the only option | `premiseConditions` |

**Migration guard for M1/M2:** M1 moves the tension *records*; X2 and X3 are page-level treatments applied by the page, keyed off `Hierarchy`. If a diff shows supporting and primary rendering alike, the visual grammar was lost even though the data is correct.

---

## 6 — Systems Architecture Design Principles

| # | Principle | Source |
|---|---|---|
| **A1** | **This page is read, not operated.** Interactivity is deliberately scarce — one client component | `systems/page.tsx` |
| **A2** | **Diagrams show mechanism, not decoration.** Typed edges carry polarity and named mechanisms. A diagram that shows *that* things connect without showing *how* has failed | `feedbackEdges` |
| **A3** | **Sequence is never grouped.** Ordered structures render in order. Grouping a sequence destroys the argument | Phase 4 §7 |
| **A4** | **New diagrams are additive.** `RecursiveLoopDiagram` joins `FeedbackLoop`; it does not replace it. Different diagrams make different arguments | Phase 7 R3 |
| **A5** | **Extensibility is shown, not asserted.** *"Same architecture, different signal"* is proved by rendering hydrology, fire, and **infrastructure** side by side — three columns, one architecture | `WildfireExtensibility` + Gate §1 |
| **A6** | **The layer stack stays local.** Five layers with per-layer signal lists are a designed model, not rows | Gate §3 class C |
| **A7** | **One loop vocabulary, visible once.** The six-node model appears in exactly one diagram. Three partial vocabularies currently coexist; adding a fourth rendering of the same idea would be worse than the problem it solves | Phase 7 G1 |

**Migration guard for M3:** this is the only migration introducing net-new UI. Build `RecursiveLoopDiagram` in isolation, review it against A2 and A4, and confirm it can ship dark before wiring data.

---

## 7 — Governance in practice

### 7.1 Merge checklist

```
□ Q4 (design intent) = YES                     ← veto gate
□ ≥1 of Q1–Q3 = clear YES
□ Ten failure symptoms (§1.3) — all NO
□ Protected invariants S1–S5 intact
□ Surface principles satisfied (D / X / A)
□ Phase 8 validation passed (byte-identical, or explained)
□ For M4 only: decision gate manually verified
```

### 7.2 When a Notion capability and the UX conflict

**The UX wins, and the Notion property becomes internal.** A property nothing renders is not waste — governance rollups, authoring views, and evidence audits are legitimate consumers. Not every field needs a visitor.

The inverse — a UX element with no record behind it — is also fine, and describes ~65% of Rock Creek by design.

### 7.3 Review cadence

| Trigger | Review |
|---|---|
| Any Phase 8 migration | Full checklist |
| New component rendering Notion data | §1.3 symptoms + surface principles |
| New database or property | §1.2 four-question test |
| New case study *(Shore Lodge, etc.)* | S1–S5 — do the devices transfer, or is the new subject being forced into Rock Creek's argument? |

**That last one is the real long-term risk.** The devices here were derived from *this* property's problem. Shore Lodge may not have one primary tension and two supporting systems. Applying S1's primacy grammar to a subject whose structure differs would be the same failure as becoming a database viewer, arriving from the opposite direction — a template imposed on content rather than content flattened into a template.

**Phase 10 should treat that as a first-class constraint**, not an afterthought.
