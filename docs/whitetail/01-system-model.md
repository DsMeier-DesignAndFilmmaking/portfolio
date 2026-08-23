# 01 — System Model

## Whitetail Club & Shore Lodge — Stewardship Intelligence System · Phase 02

**Phase:** 02 — Systems Modeling. Conceptual only: no UI, no schemas, no code, no implementation planning.
**Governed by:** [`00-project-governance.md`](00-project-governance.md) — **binding, takes precedence over this document.**
**Evidence basis:** [`research-to-design-handoff-v3.md`](research-to-design-handoff-v3.md) (v3.1) + [`source-register.md`](source-register.md). v2 superseded.
**Relationship to `01-system-planning.md`:** that document is the Phase 01 *planning* artifact. This is the Phase 02 *model*. Where they differ, **this document supersedes it** — differences are itemized in [§17](#17--what-this-model-changes-from-phase-01).

**Evidence tags** per governance §4: `[VF]` verified · `[SRC]` source-reported · `[ODC]` observed/documented · `[RSI]` reasonable systems inference · `[DH]` design hypothesis · `[SC]` speculative concept.
**Standing note:** every primary source in the register is currently unheld, so **no claim in this document is `[VF]`.** Corpus-attested claims are `[SRC]`. This is the honest ceiling, not an oversight.

---

## 1 — Executive system interpretation

Phase 01 concluded that the property's problem is that *"it knows things its people do not, and the people who know them leave."* Phase 02 tested that and found it **one level too shallow.**

Run the counterfactual the framing invites: **suppose turnover stopped entirely.** A stable crew stays twenty years. Does the problem dissolve?

It does not. That crew still could not compare this August to last August with anything but recollection. They still could not say why a decision three seasons ago was made, or what it cost. They still could not tell a newcomer in year twenty-one where a valve sits. Their knowledge would remain **unaddressable, unverifiable, and uninheritable** — merely, for a while, present.

So turnover is not the root. It is what makes the root *visible and expensive.*

> **The root is that this landscape has no persistent, addressable representation of itself.** You cannot point at a place and ask what it is, what state it is in, how confidently that is known, what has been done here, or why. The information exists — in heads, in the ground, in the outcomes of past actions — but it has **no address**, so it cannot be queried, compared, inherited, or checked.

This reframing matters because it changes what the product is. A knowledge-transfer tool implies the problem is people leaving, and points toward onboarding portals and documentation duties. **A representation layer implies the problem is that the place itself is illegible** — and points toward making the landscape addressable, which is what governance §1 locked as the thesis. The second framing is both truer and squarely on-thesis.

**Two independent amplifiers** act on that root — and they are independent, which Phase 01 obscured by treating one as downstream of the other:

- **Workforce discontinuity** `[SRC]` — seasonal turnover means the undocumented layer is repeatedly reset to zero.
- **Compressed, irreversible seasonal windows** `[SRC]` — a ~48-hour snow mold application window, an irrigation blowout "point of no return," a dawn frost-delay call. When the cost of being wrong is bounded by hours and the mistake cannot be undone, reasoning from unaided memory stops being merely inefficient.

Either alone would be manageable. Together they produce the observed condition: **a landscape managed reactively, from individual recollection, against a clock.**

**What digital product design does here is therefore narrow and specific:** give the landscape an address, give its conditions a provenance, and give its decisions a memory. Not intelligence. Not automation. **Legibility that persists.**

---

## 2 — Root systemic problem

### 2.1 The statement

> **The physical landscape has no persistent, addressable representation of its own state, history, and reasoning — so stewardship depends on individual recollection, which cannot be queried, compared, verified, or inherited. Workforce discontinuity and compressed seasonal windows amplify this into reactive operation under irreversible deadlines.**

### 2.2 Root, amplifier, symptom

Sorting these correctly is the difference between designing a product and designing a feature list.

| Layer | Item | Why classified here |
|---|---|---|
| **ROOT** | Place-state-history is not addressable | Survives the no-turnover counterfactual. Everything else resolves to it. |
| **AMPLIFIER** | Seasonal workforce discontinuity `[SRC]` | Resets the undocumented layer repeatedly. Does not *create* illegibility — exposes it. |
| **AMPLIFIER** | Compressed, irreversible windows `[SRC]` | Converts imperfect knowledge from inefficient into consequential. Independent of turnover. |
| **SYMPTOM** | Calendar-driven rather than condition-driven maintenance | You default to the calendar when you cannot read the place. |
| **SYMPTOM** | Supervisor as single point of dispatch `[RSI]` | Centralization is a *workaround* for field illegibility, not a management failure. |
| **SYMPTOM** | High training cost, slow time-to-competence `[RSI]` | Onboarding is expensive because the landscape must be transmitted verbally. |
| **SYMPTOM** | Reactive rather than proactive maintenance `[SRC]` | You cannot anticipate what you cannot compare across time. |
| **SYMPTOM** | Incomplete buried-utility as-builts `[SRC]` | **The root problem in its most literal, physical form** — assets that exist but have no address. |
| **CONTEXT** | Water right, wildfire buffer role, watershed obligations, ACSP `[SRC]` | Real constraints the landscape operates under. **Not problems this product solves** (governance §1). |

**The most useful thing in this table** is that incomplete as-builts are not a documentation gap adjacent to the problem — they *are* the problem, rendered in buried pipe. A valve that exists and cannot be located is precisely an unaddressable place-fact. Design that solves the general case solves this one.

### 2.3 The root information problem

Four things are missing, in dependency order. Each is a precondition for the next.

1. **No canonical address for place.** No agreed way to name and locate the units people actually reason about.
2. **No time-indexed state.** Condition exists only as "now," in someone's head. There is no "this zone, last August."
3. **No provenance on state.** No distinction between *measured*, *seen*, *reported*, and *assumed* — so confidence cannot inform action. See [§9](#9--evidence-provenance-model).
4. **No decision record.** Choices are made and their reasoning discarded, so the organization repeats derivation instead of accumulating judgment. **The single most consequential absence.**

### 2.4 Persistence classes

Not all information should live forever. Getting this wrong produces either amnesia or an unusable archive.

| Class | Definition | Examples | Lifetime |
|---|---|---|---|
| **PERMANENT** | Identity and testimony. Never edited; only superseded. | Place identity, asset location and its provenance, observations, decisions and rationale, action records | Indefinite |
| **HISTORICAL** | Time-series that gains value by accumulating | Condition readings, seasonal states, weather context, outcomes | Indefinite, queried by period |
| **CONTEXTUAL** | Meaningful only within a frame | Active season, current transition window, forecast, crew capacity | Frame-bounded; archived as historical |
| **TRANSIENT** | Operationally useful now, worthless later | Task assignment state, dispatch status, in-progress flags | Discard on completion — **do not preserve** |

> **The design rule this yields:** *observations are permanent; conditions are historical; tasks are transient.* A system that preserves task churn drowns; a system that discards observations forgets. Phase 01 did not draw this line, and without it the knowledge model has no way to decide what survives.

---

## 3 — System model

### 3.1 Verdict: the seven nodes are right; the single-chain topology is wrong

The starting abstraction —

```
PLACE → CONDITION → CONTEXT → DECISION → ACTION → OBSERVATION → KNOWLEDGE
```

— is retained **at the node level.** Alternatives were tested and rejected: a sense-interpret-act control loop makes the landscape a data source rather than the subject; a knowledge-lifecycle model loses the physical landscape entirely. Only this vocabulary makes PLACE first-class, which a landscape-architecture case study requires and which governance §1 demands.

**But the topology is wrong, and this is Phase 02's central structural finding.**

The chain implies one sequence at one speed. The real system runs **two loops at different tempos through the same nodes**:

```
                          ┌───────────────────────────────────────┐
                          │            ▲ slow loop                │
                          │      (seasons ─ years)                │
                          ▼                                       │
   ┌─────────┐      ┌───────────┐      ┌───────────┐      ┌───────────┐
   │  PLACE  │─────▶│ CONDITION │─────▶│  CONTEXT  │      │ KNOWLEDGE │
   └─────────┘      └───────────┘      └─────┬─────┘      └───────────┘
        ▲                 ▲                  │                  ▲
        │                 │                  ▼                  │
        │           ┌───────────┐      ┌──────────┐             │
        │           │OBSERVATION│◀─────│ DECISION │             │
        │           └─────┬─────┘      └────┬─────┘             │
        │                 │                 │                   │
        │                 │  ┌──────────┐   │                   │
        └─────────────────┴──│  ACTION  │◀──┘                   │
                    fast loop└──────────┘                       │
                  (hours ─ days)                                │
                          │                                     │
                          └─────────────────────────────────────┘
                             observations accumulate into knowledge
```

| | **FAST LOOP** — operational | **SLOW LOOP** — institutional |
|---|---|---|
| **Path** | CONDITION → CONTEXT → DECISION → ACTION → OBSERVATION → CONDITION | OBSERVATION → KNOWLEDGE → CONTEXT |
| **Tempo** | Hours to days | Seasons to years |
| **Actors** | Field crew, supervisor | Supervisor, leadership |
| **Produces** | Work done | Judgment that outlives the person who formed it |
| **Question** | *"What does this place need today?"* | *"What does this place do, over time?"* |

### 3.2 Why this is the finding

**Most operational tools implement only the fast loop.** Work orders, dispatch, task management — work gets done, nothing accumulates. **Most knowledge tools implement only the slow loop.** Wikis, SOPs, handbooks — knowledge is written down where nobody standing in a field will read it, by people who must stop working to write it.

> **The coupling is the product.** Observations produced as a byproduct of the fast loop are the raw material of the slow loop; knowledge produced by the slow loop re-enters the fast loop as context on the next decision. Neither loop is novel. **Their coupling — in one representation, anchored to place — is.**

This also explains why the four capabilities cannot be separated into products: PLACE and CHANGE serve the fast loop, KNOWLEDGE serves the slow loop, and DECISION is the hinge where they meet.

### 3.3 Refined node definitions

Two definitions changed materially from Phase 01. Both changes are load-bearing.

| Node | Definition | Change |
|---|---|---|
| **PLACE** | A named, locatable physical entity or area — the addressable unit. **Its location itself carries provenance** (surveyed / confirmed-in-field / inferred-from-record). | **New.** Directly required by incomplete as-builts `[SRC]`. |
| **CONDITION** | A **derived, current, revisable interpretation** of a place's state, at a point in time, carrying provenance and recency. | **Sharpened** — now explicitly *derived*, not observed. |
| **CONTEXT** | The seasonal, climatic, regulatory, and operational frame that gives a condition meaning. Includes **shocks** (compound or sudden events) and **windows** (bounded periods that close). | Windows added. |
| **DECISION** | A recorded human choice — **with its rationale, the alternatives considered, and the provenance of the evidence it rested on.** | **Evidence-provenance-of-basis is new.** |
| **ACTION** | What was actually done, by which role, when. Intent and execution diverge; the gap is informative. | Unchanged. |
| **OBSERVATION** | A **human-made record of testimony** — note, photo, handheld measurement — at a place and time. **Immutable and attributed by role.** | **Sharpened** — now the atomic *evidence* unit. |
| **KNOWLEDGE** | A synthesized, durable, place-attached insight derived from repeated observations and decision outcomes, re-entering as CONTEXT. | Unchanged. |

**The CONDITION / OBSERVATION distinction is the one to hold onto.** Phase 01 let them blur. They are different in kind:

> **An observation is testimony — immutable, attributed, provenanced. A condition is an interpretation — current, revisable, derived from one or more observations.**

Three crew members may observe the same zone and produce three observations; the system derives one condition. When the condition proves wrong, the observations remain true. **This is what makes provenance ([§9](#9--evidence-provenance-model)) representable at all** — without the split, there is nowhere to put confidence.

---

## 4 — Physical world model

**The goal is not to recreate the resort in software.** It is the minimum vocabulary that lets a person reason about a stewardship decision. Every proposed entity was tested against: *does a decision in [§7](#7--decision-model) fail without it?* Five survived.

### 4.1 The five entities

| Entity | Definition | Why it exists | Evidence |
|---|---|---|---|
| **DOMAIN** | One of two operational contexts: Whitetail Club or Shore Lodge. | Governance §8 requires the distinction. Determines regime, failure modes, and decision types — not ownership or org structure. | `[SRC]` |
| **ZONE** | A managed area with a coherent stewardship regime — a turf zone, a forest buffer segment, a shoreline segment, a maintenance yard. | **The unit people actually reason and assign work about.** Assets are too granular for planning; a property is too coarse. | `[RSI]` from `[SRC]` |
| **FEATURE** | A discrete physical thing at a place — irrigation valve, culvert, drain, pump, green, sign, gate. **Often buried and invisible.** | Domain A in its literal form. The thing crews cannot find. | `[SRC]` |
| **SEGMENT** | A linear extent — a path, a shoreline run, a drainage line, an easement. | Linear things fail *at points along their length*. Modeling a shoreline as a zone loses "the erosion is at the north end." | `[SRC]` |
| **SURFACE** | A maintained ground plane with a biological or engineered regime — turf stand, native/dry-back area, hardscape, snow-storage area. | **Distinct from ZONE on purpose:** one zone may hold several surfaces with different tolerances and different failure modes. Greens, rough, and native areas fail differently. | `[SRC]` |

### 4.2 Deliberate exclusions

Each was considered and rejected, with the reason recorded so it is not silently re-added later.

| Excluded | Why |
|---|---|
| **BUILDING** as a first-class entity | Building *interiors* are out of scope — that is facilities management, not landscape stewardship. Buildings enter only as ZONE boundary conditions (roof-shed lines, drip zones, entry approaches) where they generate a landscape consequence `[SRC]`. |
| **EQUIPMENT / FLEET** | Attested `[SRC]` and operationally real, but it is an asset-management domain with its own logic. It enters the model only as *crew capacity* in [§7](#7--decision-model) D7. Modeling it invites the work-order drift governance §9 forbids. |
| **PARCEL / SUBDIVISION / PUD** | Legal and planning geometry. Real `[SRC]`, but no decision in §7 requires it. Context, not vocabulary. |
| **IRRIGATION SYSTEM** as a network object | Tempting, and rejected. What decisions need is *this valve, this zone, this application* — not full hydraulic topology. Network modeling is a `[SC]` extension. |
| **TRAIL** as a distinct type | **Weakly attested.** The corpus supports paths and roads; the specific recreational trail network claimed in handoff v2 was removed as untraceable. **SEGMENT covers what is evidenced without asserting what is not.** |

### 4.3 Structure and the one rule

```
DOMAIN ─┬─▶ ZONE ─┬─▶ SURFACE      (area — has a regime)
        │         ├─▶ FEATURE      (point — has a location + provenance)
        │         └─▶ SEGMENT      (line — fails at points along it)
        └─▶ (zones may adjoin across domains; the landscape is continuous)
```

> **Anything that cannot be located does not belong in this system.** If a thing has no place, it is either context (§12) or out of scope. This single rule is what keeps a stewardship system from becoming general-purpose operations software.

---

## 5 — Change model

### 5.1 What actually makes this landscape dynamic

Four drivers, distinguished by tempo — because tempo determines whether a person can respond at all.

| Driver | Tempo | Examples | Response |
|---|---|---|---|
| **Cyclical** | Annual, predictable | Snowpack Nov–Apr; fire/dry window Aug–early Oct; short growing season with late frosts; Oct 1 fiscal year `[SRC]` | Plan against |
| **Episodic** | Days, semi-predictable | Heat stretch, rain event, hard freeze, "The Great Melt" runoff `[SRC]` | Prepare for |
| **Sudden** | Hours, low warning | Dawn frost `[SRC]`, early snow onto unprepared ground `[SRC]`, equipment failure | React to |
| **Cumulative** | Seasons to years | Erosion progression, turf stand decline, fuel-load accumulation, weed encroachment in disturbed soil `[SRC]` | **Only visible through accumulated records — invisible to memory** |

> **Cumulative change is the category that justifies the slow loop.** Nobody notices erosion day to day. It is legible only in comparison across time, which is exactly what recollection cannot provide and a place-anchored record can. **A shoreline photographed from a fixed reference point across five seasons is knowledge no individual can hold.**

### 5.2 Seasonal state

Zones carry a **seasonal state** — a small, explicit lifecycle rather than a date. This is the mechanism that converts calendar-driven work into condition-driven work.

```
   ACTIVE ──▶ TRANSITIONING ──▶ WINTERIZED ──▶ WAKING ──▶ ACTIVE
      │            │                                │
      └── the transition is where irreversible ─────┘
          decisions live (§7 D3)
```

**A transition window is a first-class context object**: it has a trigger condition, a closing condition, and a consequence-of-missing. The ~48-hour snow mold window `[SRC]` is not a calendar date — it is a window whose opening depends on soil temperature and whose closing depends on permanent snowpack.

### 5.3 Available now vs. potentially future — the hard line

Governance G4 makes this the project's highest-risk boundary. Stated explicitly so it cannot blur.

| **AVAILABLE NOW** `[SRC]` | **POTENTIALLY FUTURE** `[SC]` |
|---|---|
| Human visual inspection | Fixed in-ground soil-moisture sensor networks |
| **Handheld/manual instruments** — moisture meters, soil thermometers | Continuous automated telemetry feeds |
| Photographs | Drone or aerial imagery capture |
| Public weather forecast and observation | Property-specific microclimate station networks |
| Manual counts, measurements, written notes | Automated flow metering integrated into a data platform |
| Institutional recollection *(the thing being replaced)* | Predictive models, automated irrigation, prescriptive analytics |

**Two rules follow:**

1. **CONDITION is source-agnostic by design.** A condition does not care whether it came from a glance, a handheld meter, or — someday — a sensor. **This is why the model is sensor-ready without claiming sensors exist**, and it is the payoff of the evidence discipline rather than a lucky accident.
2. **The distinction is preserved in both directions.** Handheld metering is attested `[SRC]` and must not be inflated into IoT — *and must not be denied either.* A person walking greens with a moisture meter is real, present-day, and is a **measurement**. See [§9](#9--evidence-provenance-model).

---

## 6 — Human role model

Three roles. The smallest set that makes the system legible, each occupying a distinct position in the loops. **Role titles only, per governance §6.**

| | **Seasonal Groundskeeper** | **Superintendent / Grounds Director** | **Operations Leadership** |
|---|---|---|---|
| **Loop position** | Fast loop: ACTION, OBSERVATION | Fast loop: DECISION · Slow loop: KNOWLEDGE | Slow loop: CONTEXT-setting |
| **Goal** | Do assigned work correctly in an unfamiliar landscape without waiting on someone | Allocate limited, inexperienced crew across a large landscape under closing windows | Protect landscape health and asset lifecycle; reduce dependence on individual tenure |
| **Needs to know** | *Where is it? What is it? What did the last person find here? What is normal for this place?* | Current condition across zones · what changed · what happened last time · which windows are closing · **how confidently each is known** | Patterns, not incidents. Is knowledge accumulating or leaking? |
| **Decides** | D6 only — *is this normal, or does it need attention?* | D1–D5, D7 — nearly all operational authority | Policy, sequencing, investment — seasonal, not daily |
| **Constraints** `[DH]` | Gloves, sun, cold, motion, dirty screens, one-handed, low attention, intermittent connectivity, plausibly non-English-first | Split between desk, truck, and field — needs the same information at two detail levels | None material |
| **Tenure** | Weeks to months `[SRC]` | Years `[SRC]` | Years |

### 6.1 The asymmetry that is the design problem

> **The people with the most current information about the landscape — crew, in the field, daily — have the least authority and the shortest tenure. The person with authority and memory is not in the field and cannot scale across the property.**

Every capability exists to narrow that gap. Two mechanisms do the narrowing, and they are the model's answer to the asymmetry:

- **E4/observation capture** moves field information *up* without requiring the crew member to interpret it.
- **Place-attached knowledge** moves institutional context *down* to where the person is standing — which is what makes **D6** possible at all. A crew member cannot judge "is this normal here?" without knowing what *here* normally does. **D6 is the crack in the dispatch bottleneck**, and it opens only if the slow loop is working.

### 6.2 Field posture vs. management posture

| | **Field** | **Management** |
|---|---|---|
| Loop | ACTION → OBSERVATION | CONDITION → CONTEXT → DECISION |
| Horizon | Minutes | Days to seasons |
| Verb | **Do and record** | **Understand and decide** |
| Consequence | Location-led, few taps, capture-by-default, offline-tolerant `[DH]` | Comparative, historical, provenance-aware |

**Not two products — two postures onto one record.** The field posture writes what the management posture reads. Designing them as separate systems would recreate the information gap the product exists to close.

---

## 7 — Decision model

**The product is derived from these.** Not from screens, and not from research findings. Seven decisions, selected to span both domains, both postures, all four change tempos, and all four capabilities. Each is traced through the full loop.

Phase 01's decision set was rebuilt here: **two of its eight decisions rested on claims the citation audit removed** (a recreational trail network and a bike-to-Nordic conversion). Their replacements — frost delay and winterization sequencing — are among the best-attested material in the entire corpus.

---

### D1 — How much to water, and where
**Domain:** Whitetail Club · **Decider:** Superintendent · **Tempo:** episodic · `[SRC]`

| | |
|---|---|
| **Trigger** | Heat stretch; visible stress on part of a surface; scheduled cycle due |
| **Place** | A turf SURFACE within a ZONE — often a sub-area, not the whole |
| **Condition** | Visible stress; handheld moisture reading `[SRC]`; days since last application; recent precipitation |
| **Context** | Season; dry cycle; forecast; cool-season stand tolerances `[SRC]`; known irrigation limits as a bound `[SRC]` |
| **Decision** | Uniform application, targeted sub-area application, or defer — **rationale recorded** |
| **Action** | Crew adjusts or hand-waters at the specific FEATURE (valve), located via the spatial record |
| **Observation** | Post-application photo; 24–48h follow-up; response note |
| **Outcome** | Surface recovers, or does not |
| **Knowledge captured** | *This surface's north edge stresses ~3 days before the rest under sustained heat.* **Micro-zone behavior — the exact class of knowledge lost at turnover.** |

**Why it matters:** converts calendar-driven watering into condition-driven watering **with no sensors whatsoever.** The cleanest proof the thesis holds on the strictest evidence budget.

---

### D2 — Frost delay: open, or hold
**Domain:** Whitetail Club · **Decider:** Superintendent · **Tempo:** sudden · `[SRC]`

| | |
|---|---|
| **Trigger** | Pre-dawn assessment on a cold morning |
| **Place** | Specific turf SURFACES — **shaded ones thaw slower** `[SRC]` |
| **Condition** | Surface/leaf temperature; frost presence; thaw progress by location |
| **Context** | Air temperature and sun angle; scheduled play; **historical thaw rates for these specific shaded surfaces** `[SRC]` |
| **Decision** | Open now, delay, or open partially — **a decision made in minutes, with real cost either way** |
| **Action** | Delay communicated; crew holds or proceeds |
| **Observation** | Actual thaw time by surface; whether the estimate held |
| **Outcome** | Turf protected, or damaged by traffic on frozen blades; revenue held or lost |
| **Knowledge captured** | *Thaw-rate profiles per surface, accumulating across seasons.* Currently held as one person's mental map. |

**Why it matters:** the **sharpest decision in the model.** Time-boxed to minutes, irreversible once wrong, high-stakes both ways, and dependent on exactly the place-specific historical pattern the slow loop produces. **If the system cannot help here, it is not a stewardship system.**

---

### D3 — Winterization sequencing: when to commit
**Domain:** Both · **Decider:** Superintendent + Leadership · **Tempo:** cyclical with sudden closure · `[SRC]`

| | |
|---|---|
| **Trigger** | Soil temperature trend; shortening daylight; forecast first permanent snowpack |
| **Place** | Irrigation FEATURES property-wide; turf SURFACES; snow-storage SEGMENTS |
| **Condition** | Ground state; system drainage status; per-zone prep completion |
| **Context** | **Two closing windows simultaneously** — the irrigation blowout "point of no return" before deep freeze, and the ~48-hour snow mold application window before permanent snow `[SRC]`; compressed 4–5 month work window `[SRC]`; crew and equipment availability |
| **Decision** | Commit the sequence now, hold, or re-order — **system proposes, person approves or overrides** |
| **Action** | Blowout executed; fungicide applied; snow-storage marked; access routes designated |
| **Observation** | Completion state and actual duration per zone; conditions found; **the override itself, if the proposal was rejected** |
| **Outcome** | Assets protected through freeze — or cracked mainlines and systemic turf loss under snowpack `[SRC]` |
| **Knowledge captured** | *Real sequence and real durations* — replacing an annual calendar date with a condition-triggered, per-zone sequence that improves each year |

**Why it matters:** the flagship for the **irreversible-window amplifier.** Also where the human/system boundary is demonstrated concretely: **a captured override is the system learning it was wrong**, which is a more sophisticated claim than automation.

---

### D4 — Drainage intervention during spring runoff
**Domain:** Both · **Decider:** Superintendent · **Tempo:** episodic · `[SRC]`

| | |
|---|---|
| **Trigger** | Spring thaw; high-volume surface water conveyance; crew reports standing water or blockage `[SRC]` |
| **Place** | Culvert FEATURES and drainage SEGMENTS — including **historic ditches whose paths are poorly documented** `[SRC]` |
| **Condition** | Ice or debris obstruction; flow behavior; ponding; erosion at outfalls |
| **Context** | Freeze-thaw cycling; snow-storage placement upstream; **buried utilities intersecting hydrological paths, with incomplete as-builts** `[SRC]` |
| **Decision** | Clear now, monitor, or re-route snow storage — and whether the location is safe to excavate |
| **Action** | Manual ice and debris clearing `[SRC]` |
| **Observation** | Geo-tagged before/after; blockage cause; **confirmed location of any feature actually found** |
| **Outcome** | Flooding averted, or localized flooding and erosion |
| **Knowledge captured** | *Which features block first, in what order, and why* — **plus a confirmed location for a previously inferred asset.** |

**Why it matters:** the only decision that **improves the spatial record as a byproduct of doing the work** — a crew clearing a culvert confirms where it is. This is the mechanism that closes the as-built gap incrementally, without a survey project. See [§9.5](#95-provenance-upgrade-as-a-byproduct-of-work).

---

### D5 — Shoreline intervention
**Domain:** Shore Lodge · **Decider:** Superintendent + Leadership · **Tempo:** cumulative · `[SRC]`

| | |
|---|---|
| **Trigger** | Observed bank erosion, vegetation loss, or use damage on lake frontage |
| **Place** | A shoreline SEGMENT — with position along its length |
| **Condition** | Erosion extent; vegetation condition; visible use impact |
| **Context** | Season; guest use intensity; **50-foot setback and stormwater BMP obligations** `[SRC]`; lake level |
| **Decision** | Stabilize, replant, restrict access, monitor — or escalate to outside expertise |
| **Action** | Field intervention or escalation |
| **Observation** | **Photo series from a fixed reference point**; extent measured manually |
| **Outcome** | Erosion arrested or progressing |
| **Knowledge captured** | **A longitudinal photographic record of shoreline change** — the highest-value long-horizon asset in the system |

**Why it matters:** the clearest **cumulative-change** case, and the strongest Shore Lodge-domain decision available. No individual's memory substitutes for a five-season photo series from a fixed point. **Governance G5 applies:** document observed condition; do not assert environmental damage or causation.

---

### D6 — Is this normal for this place?
**Domain:** Both · **Decider:** **Seasonal Groundskeeper** · **Tempo:** continuous · `[RSI]`

| | |
|---|---|
| **Trigger** | A crew member encounters something unexpected — a leak, a wet spot, a hazard, an unfamiliar condition |
| **Place** | Wherever they are standing |
| **Condition** | The anomaly itself |
| **Context** | **What the record says this place normally does**; their own experience level; whether it is known and expected |
| **Decision** | Proceed, handle locally, or escalate — **the only decision in the model owned by the field role, deliberately** |
| **Action** | Local resolution or flagged escalation |
| **Observation** | Photo and short note, captured in seconds |
| **Outcome** | Faster response; fewer interrupts; **fewer non-issues escalated** |
| **Knowledge captured** | Anomaly frequency and clustering by place; the escalation becomes precedent for the next person who finds the same thing |

**Why it matters:** the decision that **moves authority toward the field.** It is impossible without the slow loop — you cannot judge "normal for here" without a record of what here normally does. **This is the dispatch bottleneck loosening**, and it is the clearest demonstration that the two loops are coupled.

---

### D7 — What gets deferred when the window is closing
**Domain:** Both · **Decider:** Superintendent · **Tempo:** episodic · `[SRC]`

| | |
|---|---|
| **Trigger** | More necessary work than available crew-hours — **the normal state of a shoulder season** `[SRC]` |
| **Place** | Cross-place: the whole property |
| **Condition** | Aggregate condition and readiness across zones |
| **Context** | Which windows close first; irreversibility (erosion compounds, mowing does not); guest-visible vs. back-of-house; crew skill mix; **equipment availability constrained by reactive repair load** `[SRC]` |
| **Decision** | Sequence and defer — explicitly, with what was deferred recorded |
| **Action** | Assignment |
| **Observation** | What was deferred; what deferral cost when the season turned |
| **Outcome** | Cumulative condition trajectory across the property |
| **Knowledge captured** | **The real cost of deferral, by work type** — the argument leadership currently cannot make with evidence |

**Why it matters:** with **D3**, one of only two cross-place decisions. Together they are the *sole* justification for any property-wide overview surface — which must be scoped to exactly these two, not generalized into a dashboard.

---

### 7.1 What the decision set reveals

Four findings visible only when the seven are read together:

1. **Six of seven require history.** Every decision except D6's raw trigger depends on *"what happened last time here."* **KNOWLEDGE is therefore a precondition for DECISION functioning at all** — not a parallel module. This is the structural argument for coupling the loops.
2. **Rationale is the missing artifact, not the decision.** These calls are all being made today. What is never recorded is *why* — so reasoning is re-derived every season with a new crew. **Capturing rationale is cheap and the highest-leverage single move available.**
3. **Three decisions (D2, D3, D4) are time-boxed and irreversible.** They need *"this window is closing"* far more than they need analytics. **Urgency legibility, not intelligence.**
4. **Only D6 belongs to the field role.** An accurate reflection of current authority — and the deliberate crack in it.

---

## 8 — Knowledge model

### 8.1 The governing question

> **What should this organization know six months from now that it would otherwise forget?**

Not *"what should be documented"* — that produces a wiki nobody opens. The test is **what would be reconstructed at cost, or lost entirely,** if the person holding it left tomorrow.

### 8.2 Eight knowledge types

| Type | Content | Source | Persistence | Currently |
|---|---|---|---|---|
| **Spatial** | Where features are — especially buried ones — and how confidently | D4 confirmations; field discovery | Permanent | Partial records + memory `[SRC]` |
| **Micro-zone behavior** | *This surface stresses first; this one thaws last* | D1, D2 accumulated | Permanent | **Purely individual** `[SRC]` |
| **Maintenance history** | What was done here, when, by which role | Every ACTION | Permanent | Fragmented `[RSI]` |
| **Decision rationale** | Why a call was made, alternatives, expected outcome | Every DECISION | Permanent | **Not recorded at all** `[RSI]` |
| **Outcome** | What actually happened after | Follow-up OBSERVATION | Permanent | Not recorded `[RSI]` |
| **Seasonal pattern** | Real timings, durations, sequences that worked | D3, D7 across cycles | Permanent | Calendar + memory `[SRC]` |
| **Local condition** | Soils, exposure, drainage behavior, species response | Accumulated observation | Permanent | Individual + partial `[SRC]` |
| **Lessons learned** | What failed and why; overrides and their results | D3 overrides; failure follow-up | Permanent | Verbal, if at all `[RSI]` |

### 8.3 Three findings

**Knowledge must be a byproduct, never a task.** Documentation downstream of the work is the first thing dropped under pressure — and pressure is the normal condition here `[SRC]`. Every knowledge type above is generated by *doing the fast loop*, not by a separate writing activity. **If capture costs more than a few seconds, the knowledge model fails and takes the product with it.**

**Rationale and outcome are the two the organization does not have at all.** Spatial and maintenance knowledge exist somewhere, partially. Decision reasoning and what-happened-next exist nowhere. They are also the two that compound fastest: a decision plus its outcome is a *precedent*, and precedents are what let a newcomer act with acquired judgment.

**Knowledge attaches to place, never to a person or a document.** A knowledge record hangs on a ZONE, SURFACE, FEATURE, or SEGMENT. This is what makes it *findable at the moment of need* — a crew member standing somewhere sees what is known about where they are standing. It is also what makes it survive turnover: **the place remains when the person leaves.**

---

## 9 — Evidence provenance model

**Investigated as a systems question per governance §10 and the Phase 02 brief.** Conclusion: **yes — provenance belongs in the conceptual information model, and it is the strongest candidate for the system's signature characteristic.** The reasoning, and its limits, follow.

### 9.1 Why it matters

A stewardship decision's confidence should be a function of **how the system knows what it claims.** Consider one condition — *"this surface is dry"* — under three provenances:

| How it is known | Reasonable action |
|---|---|
| Handheld meter reading, 20 minutes ago | Act on it |
| A crew member's glance yesterday | Probably act; consider confirming |
| Inferred from six days without application plus a heat forecast | **Go look before acting** |

**Same stated condition. Three different correct responses.** A system that presents all three identically has destroyed information the decision-maker needs — and has done so invisibly, which is worse than not having it.

There is also a deeper argument, and it is the one that makes this more than a nicety: **the organization's root problem is that it cannot distinguish what it knows from what it assumes.** A system that reproduces that confusion in digital form has automated the disease. Provenance is the system declining to do that.

### 9.2 Five provenance classes

| Class | Definition | Example `[SRC]` unless noted |
|---|---|---|
| **MEASURED** | An instrument produced a value | Handheld moisture or soil-temperature reading |
| **OBSERVED** | A person directly saw it and recorded it | Crew photo of a blocked culvert |
| **REPORTED** | Received from a source not directly witnessed | Public weather forecast; a third-hand account |
| **INFERRED** | Derived by rule or reasoning from other data | "Likely dry" from elapsed time + conditions `[RSI]` |
| **HYPOTHESIZED** | Assumed for planning; no supporting evidence | Assumed valve position from an incomplete as-built `[DH]` |

**Note the ordering is not a quality ranking.** A measurement three weeks old may be worth less than an observation from this morning. **Confidence = provenance × recency**, and recency weight varies by what is being described: a buried valve's location does not decay; a turf surface's moisture decays in hours.

### 9.3 Which entities carry provenance — and which do not

Over-applying provenance would bloat the model into unusability. Tested per entity:

| Entity | Provenance? | Reasoning |
|---|---|---|
| **CONDITION** | **Yes — essential** | The primary case. This is where confidence lives. |
| **FEATURE location** | **Yes — essential** | **Directly required by incomplete as-builts** `[SRC]`. A valve *surveyed*, a valve *someone stood on last week*, and a valve *presumed here from a drawing* are three different operational facts. This may be the model's most concretely useful application. |
| **DECISION** | **Yes — of its basis** | Not the decision's own truth, but the provenance of evidence it rested on. *"This call was made on inferred data"* is exactly what makes a retrospective useful. |
| **KNOWLEDGE record** | **Yes — derived** | Inherits from the observations beneath it. A pattern from twelve observations differs from one from two. |
| **OBSERVATION** | **No — it *is* provenance** | An observation is the atomic evidence unit. Asking its provenance is circular. It carries *attribution* (role) and *time*, not provenance. |
| **ACTION** | **No** | It happened or it did not. |
| **PLACE identity** | **No** | A zone's existence is definitional. Its *geometry* may be uncertain — that rides on FEATURE/SEGMENT location. |

### 9.4 Provenance as a workflow mechanism

This is where provenance stops being metadata and becomes system behavior — **the finding that justifies calling it a signature characteristic.**

> **When a decision would rest on INFERRED or HYPOTHESIZED evidence and the stakes are irreversible, the system's correct output is not a recommendation. It is a verification task.**

**"Go look" becomes a first-class system output.** Not an alert, not a warning banner — a piece of dispatchable work, assigned to a person, that upgrades the provenance of a condition before a decision is made on it.

Consider D3, where a mistimed blowout cracks mainlines `[SRC]`. If per-zone drainage status is `HYPOTHESIZED` — assumed from last year's sequence rather than confirmed — the right system behavior is not to propose a sequence. It is to say **which zones need eyes on them first.** That is a genuinely different product than a dashboard, and it is derived from the model rather than imposed on it.

**Escalation rule, stated conceptually:**

```
   evidence provenance  ×  decision reversibility  ──▶  system response

   MEASURED/OBSERVED  ×  any                       ──▶  proceed
   REPORTED/INFERRED  ×  reversible                ──▶  proceed, flag confidence
   INFERRED/HYPOTH.   ×  irreversible              ──▶  verification task first
```

**Where users need to see it:** at the decision, not everywhere. Provenance surfaced on every element becomes noise and trains people to ignore it. It earns display when it would **change the action** — which is precisely the irreversible + low-provenance quadrant.

### 9.5 Provenance upgrade as a byproduct of work

The mechanism that makes this self-improving rather than a maintenance burden:

> **Field work upgrades provenance for free.** A crew member who clears a culvert (D4) confirms it exists and where — upgrading its location from HYPOTHESIZED to OBSERVED without any survey project, any data-entry task, or any awareness that they did so.

This is the answer to *"how does the spatial record ever get built?"* Not through a digitization initiative. **Incrementally, through people doing the work they were already doing** — with capture as the completion gesture. It also gives D6 real teeth: the record improves fastest exactly where crews actually go.

### 9.6 The reflexive property

The case study argues that a stewardship organization must distinguish what it knows from what it assumes. **The product does the same thing, in the same four-way structure, for the same reason.** Governance §10 flagged this as a candidate; the modeling supports it.

> **The evidence discipline of the case study and the information model of the product are the same idea expressed twice.** That is a rare thing to be able to demonstrate rather than assert — and it is the strongest available argument that this is systems design rather than interface decoration.

**One honest caution:** this is elegant, and elegance is seductive. Provenance must earn its place decision by decision (§9.4), not be applied uniformly because the symmetry is satisfying. **If it does not change an action, it does not need to be visible.**

---

## 10 — Human / system boundary

### 10.1 The division

| **The system does** | **The person does** |
|---|---|
| Remember — every observation, decision, and outcome, attached to place | **Judge** — what this condition means here, today |
| Locate — make distributed and buried things findable | **Decide** — commit to an action and own it |
| Compare — this place now against this place before | **Interpret** — read the landscape with senses the system does not have |
| Surface — what is closing, what is unknown, what happened last time | **Override** — reject the proposal when the ground says otherwise |
| Preserve provenance — how each thing is known | **Observe** — supply the ground truth the system cannot generate |
| Route — put the right question in front of the right role | **Escalate** — recognize when something exceeds the record |

### 10.2 The line, stated once

> **The system holds what is knowable. The person supplies what is only judgeable.**

The system never closes a loop by itself. Every loop closes through a human decision and a human action. **This is a design commitment, not a limitation to apologize for** — and it is the more defensible position: automation here would require confidence the evidence does not support, on decisions whose failures are irreversible.

### 10.3 Explicit prohibitions *(governance §5, restated as system properties)*

The system does **not**: autonomously manage the landscape · replace field judgment · claim predictive certainty without evidence · invent environmental measurements · fabricate telemetry · become HR or productivity software · become generic work-order software · assert environmental damage, regulatory violation, or organizational behavior without evidence.

**The override is the boundary made visible.** When a person rejects a proposed sequence (D3), the system records the override *and its outcome* — and learns. A system that can be told it was wrong, and keeps the record, is making a stronger claim about human judgment than any amount of automation could.

---

## 11 — Core stewardship loop

### 11.1 The smallest closed loop

Reduced to the minimum through which a physical place becomes knowledge that changes a future decision:

```
        ┌──────────────────────────────────────────────────────────────┐
        │                                                              │
        ▼                                                              │
   ┌─────────┐    ┌───────────┐    ┌──────────┐    ┌────────┐    ┌──────────┐
   │  PLACE  │───▶│ CONDITION │───▶│ DECISION │───▶│ ACTION │───▶│OBSERVATION│
   │         │    │  + how it │    │ + why it │    │        │    │+ what was │
   │ located │    │  is known │    │ was made │    │  done  │    │   found   │
   └─────────┘    └───────────┘    └──────────┘    └────────┘    └────┬─────┘
        ▲                                                             │
        │                    ┌───────────┐                            │
        └────────────────────│ KNOWLEDGE │◀───────────────────────────┘
           returns as            └───────────┘      accumulates
           context on         "what this place does"
           the next decision
```

**Five nodes and a return path.** CONTEXT is not dropped — it is what KNOWLEDGE *becomes* on re-entry, which is the point of drawing the loop closed rather than as a chain.

### 11.2 The three annotations that carry the whole thesis

Strip them and this is a work-order system. They are the difference:

| Annotation | On | Why it is load-bearing |
|---|---|---|
| **+ located** | PLACE | Addressability is the root problem (§2). Without it nothing else attaches. |
| **+ how it is known** | CONDITION | Provenance (§9). Without it, confidence is invisible and the system reproduces the organization's confusion. |
| **+ why it was made** | DECISION | Rationale (§8.3). Without it the loop cannot compound — only repeat. |

### 11.3 The loop as the case study's signature

**The modeling supports it.** The loop is defensible as the conceptual signature because it:

- **is complete** — a physical place genuinely becomes new knowledge that changes a future decision, with no gaps requiring imagination;
- **requires no technology that does not exist** — every node is achievable with a phone, a camera, and a person who was going there anyway;
- **is transferable** — it describes any managed landscape with turnover, not this property;
- **explains its own capabilities** — PLACE, CHANGE, DECISION, KNOWLEDGE are visible as regions of one loop rather than a feature list.

> **The demonstration to build a case study around: one field photograph becoming organizational memory that a stranger reads two seasons later and acts on.** If a reader does not see that happen concretely, the case study has not landed.

---

## 12 — System boundaries

### 12.1 Inside

Place identity and location with provenance · condition state, time-indexed, with provenance · observations (immutable, role-attributed) · decisions with rationale and evidence basis · actions · knowledge records attached to place · seasonal state and transition windows · verification tasks.

### 12.2 Outside

| Outside | Why |
|---|---|
| Payroll, scheduling, HR records | Governance §5 G8; boundary prohibition |
| Individual productivity metrics | **Enforced at the model layer, not the interface** — not modeled at all |
| Building interiors and facilities systems | Not landscape stewardship |
| Guest-facing experience and booking | Different product; different portfolio project |
| Financial systems, procurement, capital planning | Context at most |
| Equipment lifecycle management | Enters only as crew capacity (D7) |
| Regulatory filing and compliance submission | **Governance §1** — the system may surface obligations as context; it does not become a compliance product |
| Legal/parcel geometry | Context |

### 12.3 Interfaces — **none assumed to exist today**

| Interface | Direction | Status | Note |
|---|---|---|---|
| **People** | Both | **The only interface that exists** `[SRC]` | Observation in, understanding out. Everything else is optional. |
| **Weather / forecast services** | In | `[DH]` | Public data, plausibly available. **REPORTED provenance** — never presented as property measurement. |
| **GIS / spatial base data** | In | `[DH]` | Municipal parcel and shoreline layers exist `[SRC]`; **integration does not.** Import, not live link. |
| **Existing organizational records** | In | `[DH]` | Partial as-builts, past logs. **Import at HYPOTHESIZED provenance** until field-confirmed — see §9.5. |
| **Handheld instruments** | In | `[SRC]` present, manual `[DH]` for capture | Readings exist today; **entry is manual.** Not a telemetry integration. |
| **Fixed sensor networks** | In | **`[SC]`** | Does not exist. **The model accommodates it without depending on it** (§5.3). |
| **Aerial / drone imagery** | In | **`[SC]`** | Would strengthen cumulative-change tracking (D5). Not assumed. |

> **The system is designed to be useful with zero integrations.** Every interface above is an enhancement to a system that already works with a person, a phone, and a place. This is a deliberate architectural property: it is what makes the concept credible under the evidence boundary, and it is why future telemetry can arrive as an additional *source of CONDITION* without redesign.

### 12.4 The domain boundary — Whitetail Club and Shore Lodge

Per governance §8: two operational domains, one system. **The sharing is by landscape and information, never by asserted organizational structure** — no shared crews, budgets, or reporting lines are claimed here `[SRC]` limits what can be said.

| **Shared across domains** | **Domain-specific** |
|---|---|
| Environmental context — season, weather, snowpack, thaw, fire window `[SRC]` | Zone types and stewardship regimes |
| The system model, loop, and vocabulary | Decision types (D1/D2 are Whitetail-domain; D5 is Shore Lodge-domain) |
| Provenance conventions and confidence semantics | Failure modes — turf loss vs. guest-safety and shoreline condition |
| The knowledge model and its persistence classes | Seasonal state machines and their timings |
| Continuous physical systems — drainage, shoreline, forest buffer, watershed | Stakeholder-visible outcomes |
| Spatial vocabulary (§4) | Which surfaces and features exist |

**Workflows overlap** where the landscape is continuous: drainage crossing both (D4), shared seasonal transition (D3), cross-property prioritization (D7), and the knowledge model in full — a lesson learned in one domain is legible in the other because both are the same landscape under the same sky.

**Workflows stay distinct** where the stewardship regime differs: agronomic biological timing on the club side (D1, D2), shoreline and guest-facing condition on the lodge side (D5).

> **Evidence asymmetry, stated plainly:** the corpus is overwhelmingly about the Whitetail Club grounds; Shore Lodge operations are a named data gap. **The model spans both domains because the landscape and its conditions genuinely do. The demonstration goes deep only where evidence goes deep** — and the case study must say which is which. A stated boundary reads as rigor; an unstated one reads as a claim.

---

## 13 — Derived design principles

Eight principles, each derived from a specific finding above. **None is a generic UX principle** — each explains something about place, change, stewardship, knowledge, decision, or judgment.

### P1 — Everything has an address, or it is not in the system
*From §2.3, §4.3.* The root problem is unaddressable place-fact. Anything that cannot be located is context or out of scope. **This one rule is what keeps a stewardship system from becoming general operations software.**

### P2 — A condition is never presented without how it is known
*From §9.* Provenance and recency travel with state. Presenting a measured reading and an inference identically destroys the information the decision-maker needs — invisibly, which is worse than not having it.

### P3 — Capture is the completion gesture, never a separate task
*From §8.3.* Documentation downstream of work is dropped under pressure, and pressure is the normal condition. Observation must cost seconds and zero navigation, or the knowledge model fails and takes the product with it.

### P4 — Record the reasoning, not just the choice
*From §7.1, §8.3.* Decisions are already being made; the rationale is what is never kept. It is cheap to capture and the only thing that lets the organization accumulate judgment rather than re-derive it every season.

### P5 — Show what is closing before showing what is happening
*From §5.2, §7.1.* Three of seven decisions are time-boxed and irreversible. Urgency legibility outranks analysis: *"this window closes in 36 hours"* is worth more than any trend.

### P6 — When confidence is low and the choice is irreversible, ask for eyes — not for a decision
*From §9.4.* The system's correct output is sometimes a verification task, not a recommendation. **"Go look" is a first-class output.**

### P7 — Knowledge attaches to place, never to a person or a document
*From §8.3.* A knowledge record hangs on ground so it is findable at the moment of need — and so it survives the person. **The place remains when the person leaves.**

### P8 — Field work improves the record for free
*From §9.5.* Every visit confirms something. Provenance upgrades as a byproduct of work already happening, which is how the spatial record gets built without a digitization project. **The record improves fastest exactly where crews actually go.**

---

## 14 — Open questions

**Modeling questions**, distinct from the evidence questions carried in the register and governance §2 — those remain as recorded and are not restated here.

| # | Question | Bearing |
|---|---|---|
| **M1** | Does SURFACE earn its separation from ZONE, or should regime be an attribute of zone? | Vocabulary economy. §4 argues yes (greens/rough/native fail differently); worth re-testing when workflows are detailed. |
| **M2** | How does a condition's confidence decay, and does the decay rate belong to the condition type? | §9.2 asserts confidence = provenance × recency. Turf moisture decays in hours, a valve location not at all. Needs a coherent treatment before provenance can drive escalation. |
| **M3** | Should verification tasks (P6) be a distinct object, or a task with a purpose attribute? | Affects whether "go look" is structurally first-class or merely conventional. |
| **M4** | Can a knowledge record ever be wrong, and what supersedes it? | §8 says observations are immutable and knowledge is revisable — the revision mechanism is undefined. |
| **M5** | Does the model need an explicit SHOCK object, or is a compound context sufficient? | §3.3 folds shock into context. Untested against a real compound event. |
| **M6** | How does a zone's seasonal state interact with per-feature readiness in D3? | The one place where zone-level and feature-level state may genuinely diverge. |
| **M7** | Is D6 viable at the crew's actual experience level, or does it require more context than a newcomer can absorb? | **The load-bearing assumption behind the authority shift.** If D6 fails, the dispatch bottleneck stays. `[DH]` |

---

## 15 — System risks

| # | Risk | Severity | Mitigation |
|---|---|---|---|
| **R1** | **Capture never happens.** The knowledge model depends on field capture. If it costs more than seconds, it stops, and the system silently degrades into a static map. | **Highest probability** | P3 as a hard constraint, not an aspiration. Capture-as-completion-gesture. Treat sub-15-second capture as a design gate. |
| **R2** | **Provenance becomes decoration.** Applied uniformly for symmetry, it turns to noise and trains people to ignore it — destroying the signature property. | High | §9.4 — provenance earns display only where it changes an action. |
| **R3** | **Telemetry drift.** Environmental-dashboard visual language pulls toward gauges and live readings. Rendering a soil-moisture dial fabricates a capability. | High | §5.3 hard line. Qualitative and manual sources get first-class treatment, never styled as degraded telemetry. |
| **R4** | **Surveillance drift.** Role attribution is one decision away from productivity monitoring. | High | Enforced at the model layer (§12.2) — individual productivity is not modeled at all. |
| **R5** | **The landscape becomes wallpaper.** The place recedes to a background image behind conventional product UI; the case study becomes a SaaS redesign. | High | P1; PLACE as root entity and first narrative beat — structurally, not decoratively. |
| **R6** | **Two loops collapse into one.** Under scope pressure the slow loop is cut as "phase two," leaving a work-order tool. | **Underrated** | §3.2 — the coupling *is* the product. Cutting the slow loop is not a reduction; it is abandonment. |
| **R7** | **Evidence-base regression.** Removed claims (acreage, trail conversion, 102°F) creep back because they were vivid. | Medium | Governance §4 ceilings; `[U:*]` claims may not be stated as fact. |
| **R8** | **Solving a labor problem with software.** Turnover is a labor and housing model, not an information gap. Overclaiming here is the weakest available position. | Medium | State it plainly: **the system makes turnover survivable, not solved.** The honest claim is the more interesting one. |
| **R9** | **Shore Lodge depth promised but not evidenced.** | Medium | §12.4 constraint — scope across both, demonstrate where evidence is deep, say which is which. |

---

## 16 — Recommended next phase

**Phase 03 — Workflow & Interaction Modeling.** Still not UI.

1. **Detail D2 and D3 end to end** — every step, every information requirement at every moment, every provenance decision. They are the sharpest (D2) and the most irreversible (D3). If they do not hold in prose, no interface saves them.
2. **Resolve M2** — confidence decay. Provenance cannot drive escalation (P6) until decay is coherent.
3. **Model the verification task** (M3) — the mechanism most likely to be the product's distinctive behavior.
4. **Test D6 against a realistic newcomer** (M7) — the load-bearing assumption behind the authority shift.
5. **Define the minimum viable spatial record** — how little must exist for D1 and D4 to work on day one? This determines whether the concept is adoptable or requires a digitization project it cannot justify.
6. **Then** Phase 04: information architecture and interface concepts.

**Not now:** screens, schemas, component design, technology selection, or further research absent the governance §3 stop-rule test.

---

## 17 — What this model changes from Phase 01

| Phase 01 | Phase 02 | Why |
|---|---|---|
| Root = institutional memory doesn't survive turnover | **Root = the landscape has no addressable representation**; turnover is an amplifier | Survives the no-turnover counterfactual (§1) |
| Turnover is root; compressed windows amplify it | **Two independent amplifiers** | Irreversible windows bite regardless of turnover |
| Seven-node chain | **Same nodes, two coupled loops at different tempos** | §3.1 — the coupling is the product |
| CONDITION and OBSERVATION blurred | **Observation = immutable testimony; condition = revisable interpretation** | Makes provenance representable at all (§3.3) |
| Provenance not modeled | **Provenance as a system property with a workflow mechanism** | §9 — the signature characteristic |
| 8 decisions, 2 on removed evidence | **7 decisions, all attested**; frost delay and winterization replace trail-based ones | Citation audit removed the trail network |
| Entities listed | **Five physical entities, exclusions justified** | §4.2 — what is excluded matters as much |
| Persistence undifferentiated | **Four persistence classes** | §2.4 — observations permanent, tasks transient |

---

# RESEARCH → SYSTEM → PRODUCT TRACEABILITY

**This table is a gate, not a summary.** No product capability may exist in this project without a complete row leading to it. A finding that cannot cross every column stops where it fails — and several below do exactly that, which is how the gate demonstrates it works.

**Reading it:** each row runs *Research Finding → System Implication → Human Decision → Information Requirement → Potential Product Capability.* A row that terminates early is marked **⛔ STOPS** with the reason.

### Findings that cross the gate

| Research Finding | System Implication | Human Decision | Information Requirement | Potential Product Capability |
|---|---|---|---|---|
| Buried-utility as-builts explicitly incomplete `[SRC]` | Assets exist without addresses — the root problem in physical form | **D4**, **D6** — can I act here safely; where is the thing | Feature location **with provenance** (surveyed / confirmed / inferred) | **Located feature registry carrying location confidence** |
| Institutional continuity depends on individually-held knowledge `[SRC]` | Knowledge has no address, so it cannot be inherited | **D1, D2, D6** — what is normal for this place | Place-attached knowledge records derived from accumulated observation | **Place-anchored institutional memory** |
| Shaded surfaces thaw slower; thaw rates held as mental maps `[SRC]` | Micro-zone behavior is real, place-specific, and undocumented | **D2** — open or delay | Per-surface historical thaw pattern, accumulated across seasons | **Per-place historical pattern view** |
| ~48-hour snow mold window; blowout "point of no return" `[SRC]` | Irreversible decisions bounded by hours, triggered by condition not calendar | **D3** — commit the sequence or hold | Transition windows as objects with trigger, closing condition, consequence | **Closing-window surfacing + sequence proposal under human approval** |
| Manual culvert clearing during spring runoff `[SRC]` | Field work is where the spatial record can be repaired | **D4** — clear, monitor, or re-route | Confirmation capture at point of work | **Provenance upgrade as a byproduct of field work** |
| 50-ft setbacks; stormwater BMPs; shoreline sensitivity `[SRC]` | Cumulative change invisible to memory; obligations bound the response | **D5** — stabilize, replant, restrict, monitor | Fixed-reference photo series over seasons | **Longitudinal place comparison** |
| Seasonal turnover resets undocumented knowledge `[SRC]` | The organization repeatedly loses its own reasoning | **D6** and all — is this normal here | Immutable observations + decision rationale attached to place | **Rationale capture at the moment of decision** |
| Shoulder-season work exceeds crew capacity `[SRC]` | Deferral is constant, its cost unmeasured | **D7** — what gets deferred | Cross-place readiness + closing windows + deferral outcomes | **Cross-place sequencing view — scoped to D3/D7 only** |
| Handheld moisture/temperature instruments in use `[SRC]` | Measurement exists today without any telemetry network | **D1** — how much water, where | Manual reading entry at MEASURED provenance | **Manual measurement capture — explicitly not a sensor feed** |
| Two named domains, one continuous landscape `[SRC]` | Conditions cross a boundary that regimes do not | **D3, D4, D7** — cross-domain sequencing | Shared environmental context; domain-specific regimes | **One record, two domain contexts** |

### Findings that stop at context — **the gate working**

| Research Finding | System Implication | Verdict |
|---|---|---|
| **Water Right 78-12476 — 1.78 CFS / 89-acre cap** `[SRC]` | A real bound on irrigation decisions | ⛔ **STOPS at CONTEXT.** Passes *"help someone decide?"* only as a **bound displayed on D1** — never as a subject. A capability that tracks diversion against a ceiling is a **compliance product**, which governance §1 forbids. **The most-worked-for fact in the project, and the one most likely to distort it** (§9 E5). |
| **Adams/Valley county-line discrepancy** `[SRC]` | None — a records question | ⛔ **STOPS IMMEDIATELY.** Fails the Gravity Test outright: it helps no one understand, decide, act, or remember about the landscape. Governance G7 additionally bars framing it as a violation. **Narrative colour at most.** |
| **Audubon ACSP triennial cycle** `[SRC]` *(24 of 26 corpus docs)* | Documentation obligations already exist | ⛔ **STOPS at CONTEXT** pending Q-E. **Attestation density is not relevance** — the most-repeated fact in the corpus generates no capability. A compliance ledger is a different product. |
| **Wildfire buffer role; Firewise standards** `[SRC]` | Explains why forest zones are maintained | ⛔ **STOPS at CONTEXT.** Genuine environmental meaning; generates no decision in §7 that the model does not already serve through zone condition. |
| **Fleet leasing; 600-hr ceilings; reactive repair load** `[SRC]` | Constrains crew capacity | ⛔ **STOPS as an INPUT to D7.** Real and operationally significant, but modeling it invites the equipment-management drift §12.2 excludes. Enters as capacity, not as an entity. |
| **PUD subdivisions, parcel acreages** `[SRC]` | Legal geometry | ⛔ **STOPS at CONTEXT.** No decision in §7 requires parcel boundaries. |
| **"Wild Lands. Luxe Living." brand line** `[SRC]` | Explains the aesthetic standard behind stewardship intensity | ⛔ **STOPS at NARRATIVE.** Motivates the problem; generates nothing. |

> **Six of seventeen findings stop before becoming capabilities — including the best-sourced one in the project.** That ratio is the point. A research corpus this rich will always offer more interesting facts than a coherent system can absorb, and the discipline that matters is refusing the interesting ones.

---

# THE ONE-SENTENCE SYSTEM DEFINITION

> ## The Whitetail Stewardship Intelligence System is a shared, place-anchored record of two working landscapes — what is where, what condition it is in, how confidently that is known, and what was decided, done, and learned there — that turns the daily work of a transient crew into institutional memory, so that a person who arrived last week can act with judgment the organization took years to earn.

**Why each clause is load-bearing:**

| Clause | Carries |
|---|---|
| *shared, place-anchored record* | The root problem — addressability (§2) — and P1 |
| *two working landscapes* | Governance §8 property model, without asserting organizational structure |
| *what is where* | PLACE; the as-built gap in its literal form |
| *what condition it is in* | CHANGE; the fast loop |
| *how confidently that is known* | **Provenance — the signature property** (§9) |
| *decided, done, and learned* | DECISION with rationale, ACTION, KNOWLEDGE — the slow loop |
| *turns the daily work... into institutional memory* | **The coupling of the two loops — the product itself** (§3.2) |
| *a person who arrived last week* | The workforce amplifier, and the human test of success |
| *judgment the organization took years to earn* | What is actually being preserved — not data, judgment |

**What the sentence deliberately does not say:** it does not mention sensors, prediction, automation, optimization, compliance, or water. It describes a system that works with a person, a phone, and a place — and would still be true if telemetry arrived tomorrow.

---

*Phase 02 complete. No UI, schemas, code, or implementation planning was produced — by design. Next: Phase 03, Workflow & Interaction Modeling (§16).*
