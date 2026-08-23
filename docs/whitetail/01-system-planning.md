# Whitetail Shore Lodge — System Planning

## Designing a Digital Stewardship Intelligence System for a Complex Mountain Landscape

**Phase:** 01 — System Planning (strategic; pre-design, pre-build)
**Property referenced:** Whitetail Club & Shore Lodge, McCall, Idaho — named, real, no client relationship
**Source of record:** `whitetail-research-to-design-handoff-v2.md` (v2, 2026-08-20)
**Disclaimer (carry verbatim into every published surface):** *Independent research and systems-design exploration; no client relationship; interventions are conceptual.*

**What this document is.** A principal-level interpretation of the research handoff and a conceptual product architecture built on it. It contains no code, no schemas, no screens, and no component specifications by design. It exists to settle *what the system is and why* before anything is drawn or built.

**What this document is not.** It is not a summary of the handoff. Where the handoff is strong, this document compresses it and moves on. Where it is loose, speculative, or internally inconsistent, this document says so and proposes a correction. Every such correction is marked **⚠ Refinement** and collected in [§14](#14--summary--where-this-plan-departs-from-the-handoff).

---

## 0 — Evidence boundary (read before anything else)

The handoff is the evidence boundary. Nothing in this document may promote a hypothesis into a Whitetail fact. Four tiers, applied per claim — the same discipline used in `rock-creek-os-foundation.md`, and for the same reason: a planning document has to argue in gradations of confidence that a published page later compresses into a binary.

| Tier | Meaning | Example in this document |
|---|---|---|
| **[Established]** | Directly supported by a cited claim in the handoff. | 1,300-acre footprint [5]; 10 mi bike trails → 20 km Nordic [5]; 102°F summer peak [4]; flat-rate paycheck-deducted housing utilities [2]. |
| **[Inferred]** | Systems reasoning from Established evidence; not itself sourced. | That supervisors are the property's de facto memory store; that crew cognitive load peaks in week one. |
| **[Proposed]** | A design concept this document actively puts forward as near-term plausible. | The four-capability architecture; the eight decisions; the four core experiences. |
| **[Future]** | Speculative capability dependent on infrastructure or data access with no evidence of existing today. | Soil-moisture telemetry; automated irrigation; predictive analytics; any real-time sensor feed. |

**Three standing prohibitions for every later phase.**

1. **No fabricated telemetry.** Whitetail is not established to have sensors, IoT, automated irrigation, predictive models, or AI. Every design that implies them is **[Future]** and must be labeled as such on the surface where it appears — not only in a footnote.
2. **No autonomous stewardship.** The system recommends and records; a person decides. This is a design commitment, not a limitation to apologize for.
3. **Field-condition constraints are hypotheses.** Sunlight legibility, glove operation, low connectivity, multilingual crews, and low-attention interaction are all **[Inferred]** design considerations. They are well-founded — the handoff establishes outdoor mountain work across 1,300 acres with transient crews [2, 5] — but no research observed a crew member using a device in the field. Treat them as a design brief, never as a validated finding.

**An evidence-integrity note the handoff should address.** The handoff cites bracketed sources `[1]`–`[8]` plus fine-grained refs (`[13]`, `[14]`, `[26]`–`[28]`, `[67]`, `[69]`, `[72]`, `[73]`, `[141]`, `[144]`) but **ships without the source list itself**. Every citation in this document is therefore inherited on trust and cannot be independently verified here. Before publication, the source register must be attached and each Established claim re-checked against it. This is the single highest-priority open item in [§11](#11--open-questions). It is flagged now because an unverifiable citation is worse than an honest **[Inferred]** tag — it looks like rigor without being rigor.

---

## 1 — Executive system interpretation

Whitetail's operating problem is not landscape maintenance. It is that **the property knows things its people do not, and the people who know them leave.**

A 1,300-acre mountain property [5] accumulates an enormous body of place-specific operational knowledge: which valve controls which zone, which trail segment washes out first in a fast thaw, which fairway corner burns before the rest, where the shoreline erodes. Almost none of this knowledge is written down. It lives in the heads of a small number of long-tenured people [6] and is transmitted verbally to a workforce that turns over seasonally [2, 13] and arrives through a geographic bottleneck that compresses onboarding into a very narrow window [2, 26–28].

That produces a self-reinforcing loop, and it is the core insight the case study has to land:

```
   seasonal turnover  ──▶  knowledge decays  ──▶  crews cannot act independently
          ▲                                                    │
          │                                                    ▼
   crew frustration                                   supervisor becomes the
   & training cost   ◀──  operations stay reactive ◀──  single point of dispatch
```

Every specific failure the handoff catalogues — uncalibrated calendar-based watering [5], missed trail-grading windows [41], unmapped drainage, reactive repair — is a **symptom of this loop**, not an independent problem. This matters enormously for product scope: a system that fixes irrigation and a system that fixes trail transitions are two products. A system that makes place-based knowledge persist is one product that improves both.

**Therefore the role of digital product design here is translation and persistence — not intelligence.** The product's job is to convert tacit, verbal, geographically-distributed knowledge into a shared, durable, spatially-anchored representation that (a) a stranger can read on day one, (b) a supervisor can reason from instead of relying on memory, and (c) grows richer as a byproduct of ordinary work rather than as a reporting chore layered on top of it.

This framing is deliberately unglamorous. It is also the only framing that survives the evidence boundary: it requires no sensors, no AI, and no automation to be valuable — which means the concept is *credible* at Phase 1 and can absorb **[Future]** telemetry later without being rebuilt.

---

## 2 — Systemic problem definition

### 2.1 The problem, stated in one causal spine

> **Institutional memory of a complex physical landscape does not survive the property's seasonal-workforce model, so stewardship defaults to reactive, individual-memory-dependent maintenance instead of proactive, evidence-guided care — and a compressed, volatile climate makes each lapse expensive.**

**⚠ Refinement 1 — the handoff's problem statement is overloaded.** §1 of the handoff stacks seven co-equal clauses into a single sentence: luxury aesthetic, water demand, ecological sensitivity, seasonal turnover, unmonitored flat-rate billing, asset lifecycle, climate-stressed failure. All seven are real. But a problem statement with seven subjects has no subject. The version above names one root cause (memory does not survive the workforce model) and demotes the rest to consequences or amplifiers. Everything the handoff wants is still present — it is just ordered.

### 2.2 The three problem domains, and the relationship the handoff leaves implicit

The handoff's three domains are genuinely non-redundant, and they map cleanly onto **place**, **time**, and **judgment**. They are retained as-is. What is added here is their causal structure, which the handoff presents as a flat list of three parallel bullets.

| | Domain | Handoff framing | What it actually is |
|---|---|---|---|
| **A** | Spatial Knowledge Transfer Bottleneck | Loss of place-based, subsurface, and asset-layout memory to crew turnover [2, 5, 6] | **The root cause.** |
| **B** | Temporal Transition Chokepoint | Volatile climate compresses summer↔winter conversion windows [4, 5, 73] | **The amplifier.** |
| **C** | Stewardship Decision-Making Under Changing Conditions | Contextual resource decisions made on intuition without consolidated memory [4, 5, 56–58] | **The consequence.** |

**The relationship, stated plainly:**

```
        A ─────────────────────────▶ C
   (you cannot decide well about        (so decisions fall back
    a place you cannot locate            on individual intuition)
    or remember)
        │                                     │
        └──────────────▼──────────────────────┘
                       B
        (compressed, volatile windows convert
         an imperfect decision from inconvenient
         into expensive — fast)
```

- **A causes C.** A supervisor cannot make a calibrated call about Fairway #4 or a trail culvert if the property has no durable record of where it is, what was done to it last, or what happened the last three times conditions looked like this. Fixing C without fixing A produces a decision-support tool with nothing underneath it.
- **B is not a third problem — it is the multiplier on the first two.** Under a generous calendar, weak spatial memory is a training cost. Under a rapid thaw or a 102°F stretch [4], the same weakness becomes soil erosion, trail washout, turf loss, and liability. B is what makes A and C urgent rather than merely annoying.

**This is the systems insight the portfolio needs** (and it is the beat the handoff's own narrative outline calls for at §7.4). A flat list of three problem domains does not earn that beat; a named causal loop with a root, an amplifier, and a consequence does.

### 2.3 What information exists today

**[Inferred]** from the handoff, since no information audit was conducted:

| Exists, but | Form |
|---|---|
| Spatial/asset knowledge | Tacit; in long-tenured heads [6]; possibly partial paper or CAD irrigation plans; not mobile-accessible [31] |
| Maintenance history | Fragmented; probably per-supervisor, per-season, possibly verbal |
| Weather/climate | Available publicly, but **decoupled** from any physical trail or turf state [44] |
| Turf/agronomic practice | Standard cool-season regimes for Bentgrass/Pencross [5]; calendar-driven, not condition-driven |
| Housing utility consumption | Billed flat-rate, paycheck-deducted [2, 14] — i.e. **consumption is not measured at all** |
| Field observations | Made constantly by crews; **almost entirely uncaptured** |

### 2.4 What is missing or fragmented

1. **A canonical registry of place.** No single addressable list of zones, assets, and their locations — especially subsurface [31, 33].
2. **A link between condition and place.** Weather exists; trail state exists; nothing joins them [44].
3. **Decision history.** No record of what was decided, why, or what happened after [58]. This is the most consequential absence: without it, the property cannot learn, only repeat.
4. **Observation capture.** The richest real-time data source on the property is a crew member's eyes, and it is discarded daily.
5. **A resource-consumption baseline.** Neither turf irrigation volume nor staff-housing utility use is metered against place [2, 55]. **⚠ Note:** this is a real gap, but see Refinement 3 — it is context, not a workflow.

### 2.5 Who decides, who executes

| | Decides | Executes | Holds the memory today |
|---|---|---|---|
| **Leadership** | Seasonal strategy, resource policy, capital | — | Partially, in aggregate |
| **Supervisor / Grounds Manager** | **Nearly everything operational** | Dispatch | **Yes — this is the bottleneck** |
| **Field crew** | Very little, by design and by lack of information [32] | **All of it** | Briefly, then leaves |

The asymmetry is the design problem in miniature: **the people with the most current information about the landscape (crew, in the field, daily) have the least authority and the shortest tenure; the person with the authority and the memory (supervisor) is not in the field and cannot scale across 1,300 acres.** Every capability in [§4](#4--product-architecture) exists to narrow that gap.

### 2.6 What knowledge is lost, preserved, or transformed

- **Lost today:** location of distributed and subsurface assets; micro-zone behavior ("this corner always burns first"); the reasoning behind past decisions; outcome of past interventions.
- **Preserved today:** only what a long-tenured individual personally retains [6] — which makes the property's operational memory a **single point of failure attached to one person's employment.**
- **Transformed by the proposed system:** an individual's observation becomes an organizational record; a supervisor's intuition becomes a documented, reviewable rationale; a season's experience becomes a queryable precedent for the next crew.

---

## 3 — Refined system model

### 3.1 Verdict on the starting hypothesis

The handoff proposes:

```
PLACE → CONDITION → CONTEXT → DECISION → ACTION → OBSERVATION → KNOWLEDGE
   ▲                                                                │
   └────────────────────── feeds forward ───────────────────────────┘
```

**Keep it.** Two alternatives were considered and rejected:

- *A pure sense-interpret-act control loop* (the conventional environmental-systems framing) — rejected because it makes the landscape a data source rather than the subject, which is precisely the failure mode this case study is positioned against.
- *A knowledge-lifecycle model* (capture → curate → transfer → apply) — rejected because it is workforce-centric and loses the physical landscape entirely.

The handoff's model is stronger than both for one specific reason: **it is the only one that makes PLACE the first-class entity.** For a case study sitting at the intersection of landscape architecture and product design, the model itself must assert that everything is anchored to ground. It does.

One structural correction: the model must be drawn as a **closed loop**, not a chain. KNOWLEDGE is not a terminus — it re-enters as CONTEXT for the next decision. The handoff's ASCII diagram implies this but its prose does not state it, and the distinction is the entire value proposition. A chain that ends in a database is a logging tool. A loop that returns to context is an institution learning.

### 3.2 Refined node definitions

| Node | Definition (tightened) | Why it exists |
|---|---|---|
| **PLACE** | A specific, named, geolocatable physical entity or zone — Fairway #4 [5], a shoreline segment [8], a trail culvert, an irrigation valve. | The addressable unit. Everything else in the model is an attribute of, or an event at, a PLACE. |
| **CONDITION** | The current observed state of a PLACE — sourced from inspection, weather report, historical record, or qualitative note. **Never assumed telemetry.** | Separates "what is true right now" from "where it is," so condition can change without the place changing. |
| **CONTEXT** | The seasonal, climatic, and systemic frame that gives a CONDITION meaning — a dry cycle, a compressed shoulder-season window, a crew's first week, a **shock** (see below). | The same condition means different things in different frames. Dry turf in May is a note; dry turf in a 102°F August stretch [4] is a decision. |
| **DECISION** | The operational or administrative choice a person makes, informed by CONDITION + CONTEXT, **with its rationale recorded.** | The rationale is the part that has never been captured, and the part that makes the loop compound. |
| **ACTION** | Field execution by a crew member. | The point where the digital system touches the physical landscape. |
| **OBSERVATION** | The ground-level record of what was found and what resulted — photo, note, manual measurement. | The property's richest and most-wasted data source. |
| **KNOWLEDGE** | OBSERVATION and DECISION persisted as organizational memory that outlives the person who created it, and that re-enters the loop as CONTEXT. | The output of the system and the answer to the root problem in [§2.1](#21-the-problem-stated-in-one-causal-spine). |

**A note on CONTEXT and shocks.** The handoff's model has no node for compound or extreme events — a rapid thaw, a heat stretch coinciding with a dry cycle, an early snow loading onto un-transitioned trails [1, 4, 5]. Rather than add an eighth top-level node, **shock is treated as a sub-concept of CONTEXT**: a shock is a context that arrives suddenly and closes a window. This keeps the model at seven nodes while giving the transition workflows the vocabulary they need.

### 3.3 Crosswalk to the practice's shared chain

The practice's platform work (`docs/strategy/environmental-systems-design-platform.md` §5) proposes a shared cross-project chain — `SIGNAL → THRESHOLD → SHOCK → INTERPRETATION → DECISION → ACTION → EXPERIENCE`, closed by a `LEARNING` loop node — and explicitly names this property as the strongest candidate to test whether that shared layer transfers.

Whitetail keeps its own PLACE-centric vocabulary as its case-study language. The crosswalk below is what keeps that from becoming a private dialect:

| Whitetail (case-study language) | Practice shared chain | Notes |
|---|---|---|
| **PLACE** | *(no direct equivalent — implied)* | Surfaced explicitly here because a landscape-architecture case study needs it foregrounded; the shared chain treats location as an attribute of a signal, not a first-class node. **The one deliberate divergence worth keeping.** |
| **CONDITION** | **SIGNAL** | A CONDITION *is* a signal reading — qualitative or manual, never assumed telemetry. Same evidence discipline applies to both. |
| **CONTEXT** | **THRESHOLD** (partial) | CONTEXT is broader (a threshold is one crossable value *inside* a context), but they occupy the same layer. |
| *(compound events)* | **SHOCK** | Borrowed as a sub-concept under CONTEXT rather than added as a top-level node — see §3.2. |
| *(implicit)* | **INTERPRETATION** | Folded into DECISION for Whitetail; a separate node would add ceremony without adding clarity at this scale. |
| **DECISION** | **DECISION** | Identical. |
| **ACTION** | **ACTION** | Identical. |
| **OBSERVATION** | **EXPERIENCE** (partial) | OBSERVATION is the crew's field record; EXPERIENCE in the shared chain is broader and includes guest-facing outcomes. OBSERVATION is the tighter, more honest term for an operations-focused system. |
| **KNOWLEDGE** | **LEARNING** | Same layer, different word. KNOWLEDGE retained to match the handoff and Design Principle 5. |

Six of seven nodes map cleanly or partially. The two real divergences are named on purpose, not left as gaps. **This is what makes Whitetail a credible future instance of the shared registry without requiring the registry to exist first** — an important sequencing property, since that registry is not built anywhere today.

---

## 4 — Product architecture

### Whitetail Stewardship Intelligence System

**One system, one representation layer, four capabilities.** The handoff is right to insist PLACE / CHANGE / DECISION / KNOWLEDGE are not four products, but it does not say what actually binds them. It is this:

> **All four capabilities read and write the same spatial record.** PLACE creates it; CHANGE annotates it over time; DECISION reasons over it; KNOWLEDGE is what accumulates in it. Remove any one and the others degrade — a place registry with no change history is a static map; change tracking with no decision layer is a logbook; decisions with no captured outcomes cannot compound; knowledge with no place to attach to is a wiki nobody opens.

```
                    ┌─────────────────────────────────────────┐
                    │      THE SPATIAL RECORD (shared)        │
                    │   places · zones · assets · history     │
                    └────┬───────┬──────────┬──────────┬──────┘
                         │       │          │          │
                   ┌─────▼──┐ ┌──▼─────┐ ┌──▼──────┐ ┌─▼─────────┐
                   │ PLACE  │ │ CHANGE │ │DECISION │ │ KNOWLEDGE │
                   │ what & │ │ how it │ │ what to │ │ what we   │
                   │ where  │ │ shifts │ │ do now  │ │ learned   │
                   └────────┘ └────────┘ └─────────┘ └───────────┘
                     locate     observe     reason      persist
                        └──────────┴───────────┴───────────┘
                              one loop, one record
```

| Capability | What it does | Primary node(s) | Justification |
|---|---|---|---|
| **PLACE** — Spatial Legibility | A mobile-first, geolocated registry of zones, assets, and subsurface infrastructure (valves, culverts, drainage, shoreline markers) [33, 148]. Answers *"what is here, where exactly, and what do I need to know about it?"* | PLACE | **[Established]** need — 1,300 acres [5] + transient crews [2] + no mobile asset directory [31]. Strongest-justified capability in the handoff and the foundation the other three stand on. |
| **CHANGE** — Condition & Transition | Records and visualizes how a place shifts across seasons, weather, use, and maintenance cycles; surfaces transition windows by joining local climate context to observed trail/turf state [46, 87]. | CONDITION, CONTEXT | **[Established]** need — 10 mi bike → 20 km Nordic conversion [5, 73] under volatile windows [4]. This is where the amplifier (Domain B) is addressed. |
| **DECISION** — Stewardship Support | Presents the assembled picture (place + condition + context + precedent) at the moment of a call, and **captures the rationale alongside the choice.** Recommends; never executes. | DECISION | **[Proposed]** — addresses Domain C. Its value depends entirely on PLACE and CHANGE existing first. |
| **KNOWLEDGE** — Institutional Memory | Captures observations, photos, and outcomes as a byproduct of field work, attaches them to place, and returns them as context to the next person. | ACTION, OBSERVATION, KNOWLEDGE | **[Established]** need — turnover [2, 6, 13] is the root cause. This capability *is* the answer to §2.1. |

**⚠ Refinement 2 — "Temporal Transition Orchestrator" must be reframed.** The handoff's Design Opportunity for Domain B proposes "cross-referencing microclimate weather data with trail statuses **to automate labor routing**" [46]. That language contradicts the handoff's own Product Boundary §5.4 (not an autonomous environmental manager), Design Principle 6 (support human judgment, do not automate it), and Instruction 9. It is retained here as **transition *guidance*** — the system proposes candidate windows and flags closing ones; a supervisor approves, adjusts, or overrides, and the override is recorded as knowledge. Same capability, boundary-consistent, and strictly better for the portfolio narrative: an overridden recommendation that the system *learns from* is a more sophisticated demonstration than an automated dispatch.

**⚠ Refinement 3 — staff-housing utilities are context, not a capability.** The flat-rate, paycheck-deducted housing utility model [2, 14] is well-evidenced and genuinely interesting: it is the clearest illustration of the property's actual pattern — **consumption is decoupled from place everywhere, in the turf and in the dorms alike.** But building it into a first-class stewardship workflow pulls the product toward a staff-cost dashboard, which sits one step from the HR-monitoring boundary the handoff explicitly forbids (§5.2) and dilutes a landscape-stewardship case study into a facilities-billing one. It is therefore retained as **narrative and design-principle context** (Resource Transparency), not as a fifth capability or a dedicated screen. The handoff's Instruction 5 asks for it to be "integrated as a critical operational cost parameter" — this document integrates it as a *parameter and an argument*, not as a workflow.

**No fifth capability is proposed.** The four are minimal and complete against the three problem domains. Adding a fifth would violate the brief's own complexity constraint and weaken the demonstration.

---

## 5 — User / role model

Three roles. Not an enterprise org chart — the smallest set that makes the system legible, and each one earns its place by occupying a different position in the loop.

### 5.1 Field Crew Member (seasonal)

| | |
|---|---|
| **Goal** | Complete assigned work correctly in an unfamiliar landscape, without waiting on a supervisor to locate things. |
| **Responsibilities** | ACTION and OBSERVATION. Executes maintenance; sees more of the property, more often, than anyone else. |
| **Information needs** | *Where is it? What is it? What did the last person find here? What am I looking for?* — in that order. |
| **Decisions** | Deliberately narrow: proceed vs. escalate; what to record; what looks wrong. **[Inferred]** the current model gives them almost no decision latitude because they have almost no information [32]. |
| **Field constraints** **[Inferred]** | Gloves, direct sun, cold, motion, noise, dirty screens, one-handed use, low attention, intermittent connectivity across 1,300 acres, and plausibly non-English-first crews. All hypotheses; all design-relevant. |
| **System interaction** | Short, frequent, map-and-photo-led. **Reading is the primary act; writing must cost almost nothing.** If capture takes longer than the task, it will not happen — and the whole KNOWLEDGE capability fails at exactly this point. |

### 5.2 Supervisor / Grounds Manager

| | |
|---|---|
| **Goal** | Allocate a limited, inexperienced crew across a large landscape under volatile conditions, without being the only person who knows anything. |
| **Responsibilities** | DECISION and dispatch. Today, also the property's memory — which is the bottleneck. |
| **Information needs** | Current condition across zones; what changed since yesterday; what was done last time and what happened; where the crew is competent vs. needs direction; which windows are closing. |
| **Decisions** | The eight in [§6](#6--decision-model). Nearly all operational authority sits here. |
| **Field constraints** | Mixed — part desk, part truck, part field. Needs the same information at two very different levels of detail. |
| **System interaction** | The system's primary reasoning surface. Wants *assembled context*, not raw data. **The design test:** does it reduce what this person must personally hold in memory? If not, it has failed. |

### 5.3 Stewardship / Operations Leadership

| | |
|---|---|
| **Goal** | Protect the landscape's long-term health and the property's asset lifecycle, and reduce dependence on individual tenure. |
| **Responsibilities** | Sets CONTEXT-level policy — seasonal plans, resource principles, standards, capital. |
| **Information needs** | Patterns, not incidents. Where is effort concentrated? What recurs? What is the property learning? Is knowledge accumulating or leaking? |
| **Decisions** | Policy, sequencing, investment — quarterly and seasonal, not daily. |
| **Field constraints** | None material. |
| **System interaction** | **Read-mostly, low-frequency, aggregate.** This role justifies the system's existence but must not drive its interface design — designing the whole product for the executive view is the single most common way systems like this fail their field users. |

### 5.4 The distinction the brief asks for: field work vs. system management

This is the axis the product is really organized around, and it deserves to be stated as a design law rather than a persona note:

| | **Field work** | **System / operational management** |
|---|---|---|
| Position in loop | ACTION → OBSERVATION | CONDITION → CONTEXT → DECISION |
| Time horizon | Minutes | Days to seasons |
| Cognitive mode | Low attention, high physical load | Deliberate, comparative |
| Primary verb | **Do and record** | **Understand and decide** |
| Interface consequence | Map-led, few taps, capture-by-default, offline-tolerant | Comparative, historical, context-assembling |
| Tenure | Weeks to months | Years |

**They are not two products.** They are two postures onto one record. The field posture writes what the management posture reads; the management posture sets what the field posture is asked to look at. Designing them as separate systems would recreate the exact information gap the product exists to close — which is why [§8](#8--core-product-experiences) resolves them into four experiences across one system rather than two apps.

---

## 6 — Decision model

This is the section the product is derived from. **The workflows in [§9](#9--key-workflows) are discovered from these decisions — not the other way around.** Eight decisions, chosen to span all three problem domains, all three roles, and all four capabilities. Each is traced through the full loop.

Each decision is tagged with the domain it serves (**A** spatial · **B** temporal · **C** judgment) and its decision-maker.

---

### D1 — How much to water a turf zone, and where **[Domain C · Supervisor]**

| | |
|---|---|
| **Trigger** | A heat stretch; visible stress on part of a zone; a scheduled watering cycle coming due. |
| **Place** | A named turf zone or fairway — e.g. Fairway #4 [5]. |
| **Condition** | Visual stress observed by crew; manual soil-moisture check **[Established as manual, per handoff §3]**; last irrigation date; recent rainfall. |
| **Context** | Season; a dry cycle; forecast peak temperature — up to 102°F [4]; cool-season Bentgrass/Pencross tolerances [5]; the property's resource-transparency posture. |
| **Decision** | Water uniformly on schedule, target only the stressed sub-zone, or defer. **Rationale recorded.** |
| **Action** | Crew adjusts or runs irrigation manually at the specified valve — located via PLACE. |
| **Observation** | Post-application photo; follow-up visual check at 24–48h; note on response. |
| **Result** | Turf recovers, or does not. |
| **Knowledge captured** | *This zone's north corner stresses ~3 days before the rest under sustained heat.* Micro-zone behavior — the exact class of knowledge currently lost to turnover. |

**Why it matters:** it converts calendar-based watering [5, 55] into condition-based watering **without requiring a single sensor.** It is the cleanest proof that the system's value is not telemetry.

---

### D2 — Whether to close, reroute, or repair a trail segment **[Domain B/C · Supervisor]**

| | |
|---|---|
| **Trigger** | Crew reports rutting or standing water; a rapid thaw; heavy rain; pre-season inspection. |
| **Place** | A trail segment and its associated drainage/culvert assets. |
| **Condition** | Observed erosion, saturation, washout; drainage functioning or blocked. |
| **Context** | Freeze-thaw cycle; guest season; vegetative recovery window; the segment's own repair history. |
| **Decision** | Close, reroute, repair now, or monitor. Recorded with rationale and expected reopen criteria. |
| **Action** | Signage, closure, drainage clearing, or grading. |
| **Observation** | Geo-tagged before/after photos; drainage state; date. |
| **Result** | Segment holds or fails again. |
| **Knowledge captured** | *This segment fails on the third consecutive thaw day; the culvert 40m uphill is the actual cause.* Ties a recurring symptom to a physical asset — a diagnosis that currently exists only in one person's head. |

---

### D3 — When to begin the bike → Nordic transition on a given segment **[Domain B · Supervisor + Leadership]**

| | |
|---|---|
| **Trigger** | Approaching seasonal window; forecast snow; first sustained freeze. |
| **Place** | Individual trail segments within the 10 mi bike / 20 km Nordic network [5, 73]. |
| **Condition** | Ground state (frozen, soft, saturated); vegetative recovery status; segment prep completion. |
| **Context** | **Shock-prone.** Early snow loading onto unprepared ground [1, 5]; equipment fleet availability; crew capacity in a shoulder season. |
| **Decision** | Begin transition on this segment now, hold, or sequence it later. **Recommended by the system, approved by a person.** |
| **Action** | Grading, signage swap, obstacle removal, grooming prep. |
| **Observation** | Segment-level completion state; conditions found; time taken. |
| **Result** | Transition completed inside the window, or caught by weather. |
| **Knowledge captured** | *Segment-level sequencing that worked, and how long each actually took* — replacing a whole-network calendar date [45] with a per-segment, condition-triggered sequence. |

**This is the flagship workflow for Domain B**, and the one where **⚠ Refinement 2** bites: the system proposes the sequence; the supervisor commits it; overrides are captured as knowledge.

---

### D4 — Where to route a new seasonal hire on day one **[Domain A · Supervisor]**

| | |
|---|---|
| **Trigger** | A new crew member arrives — inside a tight weekday check-in window, after a long regional transit [2, 26–28]. |
| **Place** | The zones they will be responsible for. |
| **Condition** | Current state of those zones; open work. |
| **Context** | **The compressed-onboarding constraint** [2, 118]. Zero site familiarity; possibly a language barrier **[Inferred]**; peak-season urgency. |
| **Decision** | Which zone, which tasks, how much supervision, what to hand them first. |
| **Action** | Assignment; the crew member self-orients using PLACE rather than being walked around. |
| **Observation** | Where they got stuck; what they could not find; what they asked. |
| **Result** | Time-to-independent-competence. |
| **Knowledge captured** | *Which zones and assets are hardest for a newcomer to find* — which tells the system where its own spatial record is weakest. **A self-improving loop, and the most quietly sophisticated idea in the product.** |

---

### D5 — When a shoreline segment needs intervention **[Domain C · Supervisor + Leadership]**

| | |
|---|---|
| **Trigger** | Observed bank erosion, vegetation loss, or use damage on the Payette Lake frontage [8, 141]. |
| **Place** | A named shoreline segment. |
| **Condition** | Erosion extent; vegetation condition; visible use impact. |
| **Context** | Lake level; season; guest use intensity; **[Inferred]** regulatory sensitivity of a lake basin — *not established by the handoff and must not be asserted as fact.* |
| **Decision** | Stabilize, replant, restrict access, or monitor — and whether it requires outside expertise. |
| **Action** | Field intervention or escalation. |
| **Observation** | Photo series against a fixed reference point; extent measured manually. |
| **Result** | Erosion arrested or progressing. |
| **Knowledge captured** | **A longitudinal photographic record of shoreline change** — the highest-value long-horizon asset in the system, and something no individual's memory can substitute for. |

---

### D6 — Whether to escalate a field observation or handle it locally **[Domain A · Field Crew]**

| | |
|---|---|
| **Trigger** | A crew member finds something unexpected — a leak, a broken valve, a hazard, an unfamiliar plant condition. |
| **Place** | Wherever they are standing. |
| **Condition** | The anomaly itself. |
| **Context** | Their own experience level; what the record already says about this place; whether it is known and expected. |
| **Decision** | Fix it, flag it, or escalate. **The only decision in this model owned by the field role — deliberately.** |
| **Action** | Local fix or flagged escalation. |
| **Observation** | Photo + short note, captured in seconds. |
| **Result** | Faster response; fewer supervisor interrupts. |
| **Knowledge captured** | *Anomaly frequency and clustering by place* — plus the escalation itself becomes precedent for the next person who finds the same thing. |

**Why this decision is in the model:** it is the one that moves authority toward the field. Giving crew enough context to *correctly* decide "this is normal here" vs. "this needs a supervisor" is how the dispatch bottleneck in §2.5 actually loosens.

---

### D7 — Whether to act ahead of a forecast event or hold to schedule **[Domain B/C · Supervisor]**

| | |
|---|---|
| **Trigger** | A forecast shock — extended heat, heavy rain, first hard freeze, early snow [1, 4]. |
| **Place** | Multiple zones simultaneously — this is a cross-place decision. |
| **Condition** | Current vulnerability of each zone. |
| **Context** | Forecast confidence; crew capacity; what happened last time conditions looked like this. |
| **Decision** | Pre-position (clear drains, adjust irrigation, close preemptively) or hold. |
| **Action** | Preparatory work across zones. |
| **Observation** | What the event actually did, per zone. |
| **Result** | Damage avoided or incurred; effort well or poorly spent. |
| **Knowledge captured** | *Which preparations paid off for which event type* — precedent that makes the next forecast easier to read. **The clearest single expression of "reactive → proactive"** [20] in the whole system. |

---

### D8 — How to prioritize competing work under crew-capacity limits **[Domain B · Supervisor]**

| | |
|---|---|
| **Trigger** | More needed work than available crew-hours — the normal state of a shoulder season [43]. |
| **Place** | The whole property. |
| **Condition** | Aggregate condition across zones. |
| **Context** | Closing windows; guest-visible vs. back-of-house; irreversibility (erosion compounds; mowing does not); crew skill mix. |
| **Decision** | Sequence and defer. |
| **Action** | Assignment. |
| **Observation** | What was deferred, and what deferral cost. |
| **Result** | Cumulative condition trajectory. |
| **Knowledge captured** | *The real cost of deferral, by work type* — the argument leadership needs, and currently cannot make with evidence. |

---

### 6.1 What the decision set reveals about the product

Reading the eight decisions together produces four architectural findings that would not be visible from a feature list:

1. **Every single decision requires history, and history is what the property does not have.** Seven of eight explicitly depend on "what happened last time." This confirms KNOWLEDGE is not a nice-to-have module — it is a **precondition for the DECISION capability functioning at all**, which is why they merge into one experience in §8.
2. **Rationale is the missing artifact.** The decisions themselves are being made today. What is never recorded is *why* — so the property re-derives the same reasoning every season with a new crew. Capturing rationale is cheap and is the highest-leverage single design move available.
3. **Only one decision belongs to the field role (D6).** That is an accurate reflection of today's authority structure — and D6 is deliberately positioned as the crack in it.
4. **Two decisions (D7, D8) are cross-place.** They cannot be served by a place-detail view alone and are the sole justification for any property-wide overview surface. Named here so that overview is built for *these two decisions* rather than becoming a generic executive dashboard — the exact drift the handoff warns against [94].

---

## 7 — Conceptual information model

Conceptual only. No tables, no SQL, no APIs, no field types — those belong to a later phase and would harden decisions that are not yet earned.

### 7.1 Entities

| Entity | Means | Why it exists | Persists |
|---|---|---|---|
| **PLACE** | A geolocatable point or area on the property. The root entity. | Everything anchors to ground; this is the model's central assertion. | Permanently. Places change state, not identity. |
| **ZONE** | A managed area with a stewardship regime — turf zone, trail segment, shoreline segment, native area. A *kind* of PLACE. | Zones are what people are assigned to and reason about; individual assets are too granular for planning. | Permanently; boundaries revised rarely. |
| **ASSET** | A discrete physical object at a PLACE — irrigation valve, culvert, drain, sign, equipment. Often **subsurface and invisible** [148]. | The specific thing crews cannot find today. Domain A lives here. | Permanently, including after decommissioning — a removed valve is still an answer to "what's under here?" |
| **CONDITION** | An assessed state of a ZONE or ASSET at a point in time. | Separates changeable state from stable identity. | As a **time series** — the point is the trend, not the latest value. |
| **OBSERVATION** | A human-made record — note, photo, manual measurement — at a place and time, by a person. | The atomic unit of field truth and the source of most CONDITION values. | **Permanently and immutably.** An observation is testimony; it is never edited, only superseded. |
| **TASK** | A unit of assigned work at a place. | Connects DECISION to ACTION and gives observation capture a natural moment to attach to. | Through completion, then as history. |
| **DECISION** | A recorded choice, **with rationale, alternatives considered, and expected outcome.** | The system's most novel entity. Nothing at the property records this today. | Permanently. Its value is entirely retrospective. |
| **ACTION** | What was actually done, by whom, when. | Intent and execution diverge; the gap is informative. | Permanently. |
| **SEASON / TRANSITION WINDOW** | A bounded period with its own regime and closing constraints. | Makes CONTEXT addressable — you can attach precedent to "last October's transition." | Permanently, as comparable cycles. |
| **WEATHER / CLIMATE CONTEXT** | External environmental conditions over time. | The property does not control it, but it explains most condition change. **Sourced externally — never presented as property telemetry.** | Retained so past conditions remain interpretable. |
| **PERSON / ROLE** | Who observed, decided, acted. | Attribution and expertise-routing. **Bounded deliberately — see below.** | Role-level permanently; individual identity minimally. |
| **KNOWLEDGE RECORD** | A synthesized, durable insight attached to a PLACE — derived from repeated observation and decision outcomes. | The system's output. What a new supervisor reads instead of asking someone who left. | Permanently; revised as understanding improves. |

### 7.2 The relationships that carry the model

- **PLACE ◀── everything.** Every other entity ultimately resolves to a place. If something cannot be located, it does not belong in this system.
- **ZONE contains ASSETs; ASSET belongs to exactly one PLACE.** The hierarchy that makes 1,300 acres navigable [5].
- **CONDITION and OBSERVATION are time-indexed against PLACE.** This is what turns a map into a record — a place viewed *at a date* rather than only now.
- **DECISION references CONDITION + CONTEXT and produces TASK → ACTION → OBSERVATION → outcome.** The loop, expressed as data.
- **OBSERVATION → KNOWLEDGE RECORD is the compounding edge.** Many observations at one place, over seasons, become an insight. **This single edge is the difference between a logging tool and an institutional memory** — and it is the relationship the portfolio should visualize most carefully.
- **SEASON groups everything for comparison.** "Show me this zone last August" is the query that makes the whole model worth building.

### 7.3 Deliberate boundaries in the model

- **PERSON is minimally modeled.** Attribution serves knowledge provenance ("who saw this, so I can ask them") and expertise routing — **never productivity measurement.** Task-completion timing per individual is explicitly out of scope. The handoff's prohibition on HR monitoring [108] has to be enforced at the information-model layer, not just in the UI, or it will leak back in.
- **Housing utility consumption is not an entity.** Per **⚠ Refinement 3**, it is narrative context. Modeling it invites the facilities-billing drift.
- **No sensor or telemetry entity.** **[Future]** only. If added later it would enter as an additional *source* of CONDITION — which is exactly why CONDITION was defined as source-agnostic in §3.2. **The model is already sensor-ready without claiming sensors exist.** That is the payoff of the evidence discipline, and it is worth saying out loud in the case study.

---

## 8 — Core product experiences

Four, not five. Each maps to a distinct posture in the loop and is justified by named decisions from §6.

### E1 — Understand a place *(PLACE)*
**Posture:** field, oriented. **Serves:** D4, D6, and the front half of every other decision.
A crew member stands somewhere and asks *what is here, what's underneath, what do I need to know.* Map-led, geolocated, offline-tolerant. Surfaces zone, assets — including subsurface [148] — recent conditions, recent observations, and standing knowledge records for that place.
**Design test:** can a person who arrived yesterday find an irrigation valve without calling anyone? [32]

### E2 — Investigate a changing condition *(CHANGE)*
**Posture:** management, comparative. **Serves:** D1, D2, D3, D5, D7.
A supervisor asks *what is happening here, how did it get this way, is it normal for this time of year.* Time-series and precedent-led: this place now, versus its own history, in the frame of the current season and forecast. Surfaces closing transition windows.
**Design test:** does it answer "has this happened before?" — the question that currently has no answer anywhere on the property.

### E3 — Make and record a stewardship decision *(DECISION + KNOWLEDGE)*
**Posture:** management, deliberate. **Serves:** all eight, structurally.
The assembled picture at the moment of the call — place, condition, context, precedent, options — and the capture of the choice **with its rationale** in the same motion.

> **⚠ Refinement 4 — deliberate deviation from the brief's suggested experience list.** The brief proposes "make a stewardship decision" and "record what was learned" as two separate experiences. They are merged here, on purpose. **The separation of deciding from recording is the exact discontinuity the entire system exists to repair.** If recording the rationale is a subsequent, optional step, it will not happen — under time pressure, documentation that is downstream of the work is the first thing dropped. Merged, the rationale is a byproduct of deciding, which is the only version that survives a shoulder-season scramble. Making this one experience is a stronger systems-design argument than making it two.

**Design test:** is capturing *why* faster than not capturing it?

### E4 — Execute field work and capture what was found *(ACTION + OBSERVATION)*
**Posture:** field, in motion. **Serves:** D1, D2, D5, D6 — the execution half of the loop.
A crew member receives work in place-context, does it, and records what they found in seconds — photo-first, voice- or tap-led, working offline and syncing later. Capture is *the completion gesture*, not a separate reporting task.
**Design test:** does capturing an observation cost less than 15 seconds and zero navigation? If not, KNOWLEDGE fails here — and the system fails with it.

### 8.1 How the four cohere

```
   E1 understand a place ──▶ E4 execute & capture ──▶ E2 investigate change
        ▲                          (field)                     │ (management)
        │                                                      ▼
        └──────────────── E3 decide & record ◀─────────────────┘
```

E1 and E4 are the **field posture**; E2 and E3 are the **management posture** (§5.4). The record written by E4 is what E2 reads. The decision made in E3 is what E4 receives. **Neither posture is a separate product; they are two ends of one loop** — and the loop closing is the demonstration.

### 8.2 The property-wide overview, deliberately constrained
D7 and D8 are cross-place and cannot be served by place-detail views. They justify **one** overview surface — and it exists to answer *"what is closing, what is at risk, what should be sequenced next"* for a supervisor with a crew to assign. It is not an executive dashboard, not a KPI wall, and not a metrics summary. Scoping it to two named decisions is the guard against the drift the handoff warns about [94, 109].

---

## 9 — Key workflows

Three workflows, derived from the decisions in §6 rather than invented from screens. Together they exercise all four capabilities, all three roles, and both postures. **These three are what the case study should actually walk through** — a fourth would add length without adding argument.

### W1 — Heat stress on a turf zone *(D1 · Domains C · both postures)*

```
crew notices stress ──▶ captures observation in place (E4, ~15s)
        │
        ▼
supervisor sees change against this zone's own history + forecast (E2)
        │                    ┌─ precedent: "this corner stressed first in Aug '25"
        ▼                    │
decides targeted watering, not uniform — records rationale (E3)
        │
        ▼
crew locates the specific valve via the spatial record (E1) ──▶ acts ──▶ captures result (E4)
        │
        ▼
outcome attaches to the zone ──▶ becomes precedent for next season
```

**What it demonstrates:** calendar-based → condition-based stewardship [55] with **zero sensors**. The most important workflow in the set, because it proves the thesis on the strictest evidence budget.

### W2 — Seasonal transition sequencing *(D3, D7, D8 · Domain B · management-led)*

```
season window approaches ──▶ system surfaces segment-level readiness + closing windows (E2, E8.2)
        │
        ▼
supervisor sequences segments — accepts, reorders, or overrides the proposal (E3)
        │                          ⚠ the override is captured, not discarded
        ▼
crews receive place-contextual work; each segment's actual state + duration captured (E1, E4)
        │
        ▼
shock arrives early? ──▶ re-sequence against captured actuals, not a calendar
        │
        ▼
completed sequence + real durations become next year's starting proposal
```

**What it demonstrates:** the amplifier (Domain B) handled by guidance under human authority — **⚠ Refinement 2** made concrete. The captured override is the sophisticated detail: the system learns from being wrong.

### W3 — Day-one onboarding *(D4, D6 · Domain A · field-led)*

```
new hire arrives through a compressed check-in window [2, 26-28]
        │
        ▼
assigned zones; self-orients on the spatial record instead of a walk-around (E1)
        │
        ▼
finds an anomaly ──▶ reads standing knowledge for that place ──▶ decides: known, or escalate (D6)
        │
        ▼
captures observation (E4) ──▶ where they got stuck is itself recorded
        │
        ▼
gaps in the spatial record surface ──▶ the record improves where newcomers actually struggle
```

**What it demonstrates:** the root cause (Domain A) addressed directly, **and the system improving itself from use.** This workflow is where the reinforcing loop from §1 is visibly broken.

---

## 10 — Portfolio narrative implications

The handoff's eight-beat arc (§7) is sound and maps closely onto the practice's canonical narrative pattern. Three structural notes for the eventual case study:

1. **Beat 4 (Systems Insight) must be the causal loop from §1 and §2.2 — not a restatement of three problem domains.** A design director reading a list of three problems sees research. Reading *root → amplifier → consequence*, with a reinforcing loop drawn, they see systems thinking. This is the beat the whole case study is judged on.
2. **Lead with PLACE, physically.** Beat 1 should be the landscape itself — 1,300 acres [5], the lake [8], the terrain — before a single interface appears. If the case study opens on a UI, it becomes a SaaS redesign in the reader's mind and never recovers.
3. **The Evidence Boundary is a feature of the narrative, not a disclaimer at the end.** Stating plainly that no sensors exist, that the model is sensor-*ready* without claiming sensors, and that the concept delivers value on manual observation alone is a stronger argument than any speculative telemetry visualization. Under-claiming is the credibility mechanism.

**One narrative risk specific to this portfolio.** Two adjacent case studies already exist or are planned in the same territory — Rock Creek OS (adaptive stewardship at a remote ranch) and the Adaptive Ranch Experience Companion (guest-facing decision support at a ranch). Whitetail must be visibly **not** a third variation. Its distinct claim is available and defensible: **Rock Creek is about environmental shocks; the Companion is about guest experience; Whitetail is about institutional memory and workforce discontinuity.** Whitetail is the only one of the three whose central subject is *the people who leave*. That distinction should be explicit in the first screen, and the eventual page should link across rather than pretend the others do not exist.

---

## 11 — Open questions

| # | Question | Why it matters | Owner |
|---|---|---|---|
| **Q1** | **The handoff's source register `[1]`–`[8]` and its fine-grained refs are not attached.** Can it be supplied? | **Highest priority.** Every **[Established]** tag in this document is inherited on trust. An unverifiable citation looks like rigor without being rigor — a worse position than an honest **[Inferred]**. Must be resolved before publication. | Research |
| **Q2** | Are Whitetail Club and Shore Lodge one case study or two? | The handoff treats them as one combined property. Other practice roadmap documents list them as two separate future case studies sharing a geography. This document follows the handoff (one), but the discrepancy is unresolved and affects scope, naming, and whether this property becomes the shared-registry test. | Portfolio direction |
| **Q3** | Does any spatial record exist today — irrigation as-builts, CAD, paper maps? | Determines whether PLACE is *digitizing* an existing record or *creating* one from scratch. Materially changes the plausibility story. Currently unknown. | Research |
| **Q4** | Is connectivity actually intermittent across the 1,300 acres? | Offline-first is currently an **[Inferred]** hypothesis driving significant architecture. Reasonable, but unverified. | Research **[Inferred]** |
| **Q5** | Are crews multilingual in practice? | Drives whether visual-first is a preference or a requirement. Treated as a hypothesis throughout. | Research **[Inferred]** |
| **Q6** | Who owns landscape decisions — golf course superintendent, grounds manager, or split? | §5 collapses these into one Supervisor role. Defensible for a demonstration, possibly wrong in reality. | Research |
| **Q7** | Is the ROI framing in the handoff's beat 8 (2035 water savings, liability reduction) supportable? | It is currently **[Proposed]** at best. Publishing quantified savings without a basis would breach the evidence boundary more visibly than anything else in the project. | Portfolio direction |

---

## 12 — Design risks

| Risk | Description | Mitigation |
|---|---|---|
| **R1 — Capture never happens** | The KNOWLEDGE capability depends entirely on field crews recording observations. If capture costs more than a few seconds, it stops — and the system silently degrades into a static map. **This is the single highest-probability failure mode.** | Capture-as-completion-gesture (E4); photo-first; sub-15-second target treated as a hard design constraint, not an aspiration. |
| **R2 — Telemetry drift** | The visual language of environmental dashboards pulls hard toward gauges, live readings, and sensor aesthetics. Rendering a soil-moisture dial would fabricate a capability that does not exist. | Every **[Future]** element labeled on the surface it appears on; qualitative and manual sources given first-class visual treatment rather than being styled as degraded telemetry. |
| **R3 — Surveillance drift** | Attribution ("who observed this") is one design decision away from monitoring ("who is slowest"). Prohibited by the handoff [108] and corrosive to the field trust the system depends on. | Enforced at the information-model layer (§7.3), not just the interface: no per-individual productivity metrics modeled at all. |
| **R4 — Enterprise sprawl** | Four capabilities and eight decisions can quietly become twenty screens. | Four experiences, three workflows, one constrained overview scoped to two named decisions (§8.2). |
| **R5 — The landscape becomes wallpaper** | The physical place recedes into a background image behind conventional product UI, and the case study becomes a SaaS redesign. | PLACE is the root entity of the information model, the first narrative beat, and the anchor of every experience — structurally, not decoratively. |
| **R6 — Portfolio adjacency collapse** | Reads as a third ranch-stewardship project. | The institutional-memory / workforce-discontinuity claim (§10) stated in the first screen. |
| **R7 — Solving the workforce problem with software** | The root cause is a labor and housing model. Software mitigates its *knowledge* consequences; it does not fix turnover. Overclaiming here is the intellectually weakest position the project could take. | State the boundary explicitly in the case study. **The system makes turnover survivable, not solved** — that is the honest and more interesting claim. |

---

## 13 — Recommended next phase

**Phase 02 — Model and Scenario Definition.** Not UI. Not schemas.

1. **Resolve Q1 and Q2** before any further authoring. Q1 is a publication blocker.
2. **Author the spatial taxonomy** — a concrete, named worked example of zones and assets for one representative area (proposed: one golf zone + one trail segment + one shoreline segment). Sufficient for a real demonstration; far short of modeling 1,300 acres.
3. **Write W1 in full narrative detail** — every step, every screen's *purpose* (not its layout), every piece of information required at each moment. W1 is the thesis workflow; if it does not hold up in prose, no interface will save it.
4. **Define the evidence-tier visual convention** — how **[Established]** / **[Inferred]** / **[Proposed]** / **[Future]** will actually appear on a published surface. Deciding this before design starts is what keeps the boundary from becoming a footnote.
5. **Then** — and only then — Phase 03: information architecture and interface concepts.

---

## What we should NOT build

- **A ticketing / work-order system.** "Jira for landscapers" [107]. Tasks exist here only to connect decisions to actions and to give observation capture a moment to attach to. If task management becomes the center, the landscape has become metadata.
- **A GIS platform** [109]. Not competing with ArcGIS. Spatial legibility for people in the field on a phone, not a spatial analysis environment.
- **An autonomous landscape manager** [110]. No automated irrigation, no AI-driven closures, no self-regulating anything. Including — per **⚠ Refinement 2** — no automated labor routing.
- **A fabricated sensor platform** [111]. No telemetry presented as existing. Ever.
- **An HR or productivity monitoring tool** [108]. Enforced in the information model, not just the UI.
- **A staff-housing utility cost dashboard.** Real evidence [2, 14], wrong product. Context and principle, not a workflow (**⚠ Refinement 3**).
- **A generic executive dashboard.** One overview surface, scoped to D7 and D8 only (§8.2).
- **A fifth capability, a fifth experience, or a fourth workflow.** The set is minimal and complete. Additions dilute.
- **Quantified ROI claims** (water savings, liability reduction) without a supportable basis — see Q7.
- **A private vocabulary.** The crosswalk in §3.3 exists so this system reads as an instance of a transferable method, not a one-off dialect.

## What the portfolio absolutely needs to demonstrate

1. **The physical landscape is the subject.** 1,300 acres of real mountain terrain [5], a real lake [8] — established before any interface appears, and structurally central to the information model, not decoratively present.
2. **The causal loop, not a problem list.** Root (spatial memory loss) → amplifier (compressed volatile windows) → consequence (intuition-driven decisions) → back to root. Drawn, named, and argued. **This is the beat that separates systems thinking from research summary.**
3. **One system, four capabilities — and why they cannot be separated.** The shared spatial record is the binding mechanism (§4). Four products would be a portfolio of features; one loop is an argument.
4. **Decisions before screens.** The case study should show that the workflows were *derived* from eight real decisions — this is the methodological claim, and it is more valuable than any individual screen.
5. **A held evidence boundary.** No invented telemetry; four honest tiers; and the elegant consequence — **the model is sensor-ready without claiming sensors exist.**
6. **Human judgment designed for, never replaced.** Including the captured override (W2), where the system learns from being told it was wrong.
7. **Knowledge compounding, made visible.** The OBSERVATION → KNOWLEDGE edge (§7.2) is the whole product. If a reader does not see a single field photo become organizational memory that a future stranger reads, the case study has not landed.
8. **Transferability.** Seasonal-workforce knowledge discontinuity is not a Whitetail problem — it is the structural condition of nearly every large managed landscape: resorts, parks, campuses, municipalities. The method should read as portable; only the property is specific.

---

## 14 — Summary — where this plan departs from the handoff

**Recommended direction.** Build the **Whitetail Stewardship Intelligence System** as *one* spatial record with four capabilities (PLACE, CHANGE, DECISION, KNOWLEDGE), expressed through *four* experiences and demonstrated through *three* workflows, derived from *eight* named decisions. Its thesis is institutional memory, not automation: it makes a complex landscape legible to people who have not been there long, preserves the reasoning behind stewardship choices, and turns field observation into organizational memory — **using nothing the property does not already have.** Sensors, telemetry, and prediction remain **[Future]**, and the architecture accommodates them precisely because it never depended on them.

**Where this document deliberately diverges from the research handoff:**

| # | Departure | Reason |
|---|---|---|
| **1** | **Problem statement compressed to one causal spine.** The handoff's seven co-equal clauses become one root cause with consequences and an amplifier. | A problem statement with seven subjects has no subject. The causal hierarchy is what makes the systems insight legible. |
| **2** | **"Automate labor routing" reframed as transition *guidance*.** | The handoff's own Boundary §5.4, Principle 6, and Instruction 9 prohibit autonomous management. This resolves an internal contradiction in the source — and the captured human override is a stronger demonstration than automation. |
| **3** | **Staff-housing utility billing demoted from capability to context.** | Real evidence [2, 14], but building it as a workflow drifts toward the facilities/HR territory the handoff explicitly forbids [108] and dilutes a landscape-stewardship case study. Retained as principle and narrative. |
| **4** | **"Decide" and "record what was learned" merged into one experience.** | Their separation *is* the discontinuity the system exists to repair. Documentation downstream of the work does not survive a shoulder-season scramble. |
| **5** | **Three problem domains given an explicit causal structure** (A root → C consequence, B amplifier) rather than presented as parallel. | The relationship is the insight; the list is only the input. |
| **6** | **Shock added as a sub-concept of CONTEXT** rather than a new node. | The handoff's model has no vocabulary for compound events, which its own transition workflows require. Borrowed from the practice's shared chain without inflating the model to eight nodes. |
| **7** | **Crosswalk to the practice's shared chain added** (§3.3). | Keeps Whitetail's PLACE-centric language while preventing it from becoming a private dialect — and preserves the option of this property serving as the shared-registry test. |
| **8** | **Missing source register flagged as a publication blocker** (Q1). | The handoff cites sources it does not include. Inherited citations cannot be presented as verified evidence in a project whose central credibility mechanism is its evidence boundary. |
| **9** | **ROI framing (2035 water savings, liability) held at [Proposed] and challenged** (Q7). | Quantified benefit claims without basis would breach the evidence boundary in the most visible way available. |
| **10** | **The limit of the software stated explicitly** (R7). | The root cause is a labor and housing model. The system makes turnover *survivable*, not solved. Claiming more would be the project's weakest position; claiming exactly this is its most credible one. |

---

*Phase 01 complete. No code, schemas, interfaces, or application changes were produced — by design. Next: Phase 02, Model and Scenario Definition (§13).*
