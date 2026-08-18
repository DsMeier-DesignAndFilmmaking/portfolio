# Rock Creek Adaptive Stewardship OS — Foundation Reference

**Status:** Source-of-truth research synthesis. Not yet reconciled with the live `/projects/rock-creek-os` build — see [§0 Alignment Note](#0--alignment-note-read-first) before generating subpage copy from this file.

**Role of this document:** Master reference for generating content across `/explorer`, `/systems`, and `/dashboard`. Every claim below carries a source tag (`[S1]`–`[S5]`, keyed in [§13](#13--sources)) or an explicit tier tag — **Established**, **Inferred**, **Proposed**, or **Future** (defined in [§12](#12--research-limitations--evidence-boundary)). Do not lift a number or claim into subpage copy without carrying its tag — this is the mechanism that satisfies the practice's Evidence Boundary requirement (see §0).

**One-line hierarchy check, before anything else:** this is **one system**, addressing **one primary problem**, through **two supporting systems**, in service of **one larger design question**. If a future edit adds a third "tension" with equal weight to Hydrological Activity Orchestration, or promotes Fire Resilience or Invisible Logistics to primary-problem status, it has broken the narrative this document exists to protect. See §3.

---

## 0 — Alignment note (read first)

This research was authored under the working title **Rock Creek Adaptive Stewardship OS**, built around a hydrological/ecological systems frame: watershed stress, "Hoot Owl" fishing closures, wildfire-linked defensible space, and invisible logistics re-routing.

The **currently live** `/projects/rock-creek-os` build ships under a different title and a different systems frame — **Infrastructure Sovereignty OS** — organized around Ecosystem / Resource Autonomy / Human Experience / Stewardship / Operations, with energy and mobility (not water/fire) as the primary systemic tension (see `rock-creek-os--page-ia-spec.md`, `app/projects/rock-creek-os/content/frameworks.ts`, `app/projects/rock-creek-os/dashboard/content/datasets.ts`).

These are not the same project. Before this file drives new subpage copy, one of three calls needs to be made:

1. **Supersede** — retire the Infrastructure Sovereignty frame and rebuild `/explorer`, `/systems`, `/dashboard` around this hydrological-stewardship frame.
2. **Fork** — ship this as a second, separate case study rather than overwriting the existing one.
3. **Merge** — treat hydrological stress as an additional tension layered onto the existing Infrastructure Sovereignty model, alongside energy/mobility.

This document does not make that call. It is written to be usable under any of the three.

Separately: `rock-creek-os--portfolio-audit.md` (2026-08-15) scored the live build against the practice's own publish rubric and named the **absence of an Evidence Boundary module** as a publish-blocking gap on this exact project — "the one with the most invented numbers and the only one naming a real business... has none." The disclaimer and per-claim citation discipline in this document exist to close that gap from the start, not repeat it.

---

## 1 — Project identity & scope

| Field | Value |
|---|---|
| **Title** | Rock Creek Adaptive Stewardship OS |
| **Core philosophy** | "Complex environmental problems are rarely isolated problems. They are system relationships." |
| **Property referenced** | The Ranch at Rock Creek (Philipsburg, MT) — named, real, no client relationship |
| **Disclaimer (required, verbatim)** | *Independent research and systems-design exploration; no client relationship; interventions are conceptual.* |
| **Status** | Speculative systems-design research. The Adaptive Stewardship OS and its predictive algorithms are theoretical interventions — not implemented property features. |
| **Narrative shape** | One system → one primary problem → two supporting systems → one design question. Not three parallel case studies. See §3. |

**Evidence Boundary — carry this into every subpage that uses this research.** Four tiers, not three — the fourth split matters specifically because this project proposes both near-term design concepts and further-out speculative capabilities, and collapsing them into one "Speculative" bucket understates how differently sure we are about each:

- **Established** — existing conditions directly supported by cited research: spatial layout, published sustainability initiatives (e.g., 50k single-use plastic bottles eliminated `[S2]`), historical/regional forest condition data `[S3]`, current documented "Hoot Owl" closure impacts `[S1]`.
- **Inferred** — reasonable systems-level reasoning from adjacent Established evidence, not directly sourced itself: operational stress on staff during activity re-routing; the technical ceiling of remote Wi-Fi/PMS systems.
- **Proposed** — design concepts this document is actively putting forward as a near-term-plausible intervention: the Sense → Interpret → Adapt → Experience model (§8), the dashboard KPI set (§9), the two System Shock simulations (§9).
- **Future** — further-out speculative capabilities, dependent on infrastructure or data access this research has no evidence exists today: automated predictive triggers, a real-time Watershed Health Index feed, any claim of an already-unified cross-domain system (see §3.5 — this is the single most important line in the boundary).

---

## 2 — Executive summary

The central problem facing ultra-luxury wilderness destinations is the fragility of a "virtually flawless" service promise in a volatile ecological landscape. For a property like The Ranch at Rock Creek, brand value is inextricably tied to natural assets — most visibly its Blue Ribbon trout stream — that are increasingly subject to climate-induced hard limits, such as mandatory fishing closures. **[Proposed framing, built on Established evidence in §4.]**

This research explores a conceptual **Adaptive Stewardship OS**: a connective system that would let environmental intelligence, stewardship decisions, operational coordination, and guest experience respond to one another instead of each reacting independently. The deeper problem it addresses is not water, or fire, or transportation in isolation — it is **adaptive coordination** across all four. §3 lays out that hierarchy in full; §4 and §5 develop the primary problem and its two supporting systems; §6–§9 carry it into a systems architecture, a coordination loop, and a signal-to-experience design model. **[Proposed]**

---

## 3 — The unified system: one problem, two supporting systems

### 3.1 The larger design question

Everything downstream of this section — the primary problem, both supporting systems, the coordination loop, the four-stage design model, the future case-study architecture — exists to answer one question:

> **How can a luxury destination operating within a dynamic natural landscape adapt its operations and guest experiences as environmental conditions change?**

Hydrology, wildfire, and logistics are not three separate answers to three separate questions. They are three places where *one* answer becomes visible.

### 3.2 The hierarchy, stated plainly

```
ONE SYSTEM              →  Adaptive Stewardship OS
ONE PRIMARY PROBLEM     →  Predictive Hydrological Activity Orchestration
TWO SUPPORTING SYSTEMS  →  Fire-Resilient Defensible Space Design  (environmental)
                           Invisible Logistics Mobility System     (operational)
ONE LARGER QUESTION     →  How can a luxury destination adapt to environmental
                           uncertainty while preserving exceptional guest experience?
```

This is a hierarchy, not a list. Hydrological Activity Orchestration is the primary problem because it is where the property's core promise (all-inclusive fly fishing on a Blue Ribbon stream) meets its hardest, most time-pressured environmental limit — a same-day closure with days, not weeks, of warning `[S1]`. Fire and logistics are *supporting* systems because each one exists, in this document, specifically in service of that primary problem: fire resilience protects the watershed the primary problem depends on; logistics is the mechanism that actually executes a pivot once the primary problem forces one. Neither is being argued here as an equally-weighted, independent case study.

### 3.3 What each domain represents

| Domain | Role in the system |
|---|---|
| **Hydrology** | The changing environmental condition that creates the primary adaptive challenge — the trigger, not one option among several. |
| **Wildfire** | A second environmental/resilience condition. It does not compete with hydrology for primacy — it *protects the primary problem's own precondition*, since post-fire erosion and siltation are what would degrade the trout stream `[S3][S5]`. It also independently affects landscape management, infrastructure, access, and guest experience in its own right. |
| **Logistics** | Not an environmental condition at all — it is the **operational mechanism** through which the Ranch would actually execute an adaptive response once hydrology or wildfire forces one. It is how a decision becomes a guest-facing reality. |
| **Adaptive Stewardship OS** | The connective system that would coordinate the three domains above, which are otherwise fragmented — a stream-temperature reading, a fuel-moisture reading, and a shuttle schedule do not, on their own, know about each other. |

### 3.4 Systems relationship diagram

```
                       DYNAMIC LANDSCAPE
                              │
                ┌─────────────┴─────────────┐
                │                           │
            HYDROLOGY                    WILDFIRE
     (Primary Problem)          (Supporting Environmental System)
    Environmental condition        Landscape & watershed
   creating the core adaptive         resilience condition
          challenge                 protecting that challenge
                │                           │
                └─────────────┬─────────────┘
                              │
                    STEWARDSHIP INTELLIGENCE
                  (Adaptive Stewardship OS — the
                   connective layer; see §3.5: this
                   layer is PROPOSED, not existing)
                              │
                              ▼
                    OPERATIONAL DECISIONS
                              │
                              ▼
              INVISIBLE LOGISTICS / MOBILITY
             (Supporting Operational System —
              the mechanism that executes the
                   decision above)
                              │
                              ▼
                     GUEST EXPERIENCE
           (adaptive, but not felt as disrupted —
                     see §11, principle 7)
```

Refined from a generic four-box version to name each stage with this document's own vocabulary (Stewardship Intelligence, Operational Decisions, Guest Experience) rather than placeholders, so it reads as one continuous mechanism rather than four unrelated labels stacked on top of each other.

### 3.5 Important systems-design distinction — read before designing anything from this file

**This document does not claim that The Ranch at Rock Creek currently operates a unified system connecting environmental sensing, stewardship decisions, operations, and guest experience.** No source in §13 documents such a system, and none of the sensors, software, dashboards, or cross-department workflows implied anywhere in this file are asserted to exist. Where a claim risks reading as a fact about the property's actual technology, it is tagged **Future** or **Proposed** per the tiers in §1 — not Established.

The design opportunity is framed as a question, not a claim:

> **What if environmental intelligence, stewardship decisions, operational coordination, and guest experience were connected through a unified adaptive system?**

Everything from §6 onward is this question's answer space — a systems architecture, a coordination loop, a four-stage design model, and a future case-study structure for exploring what that unified system could look like. None of it retroactively becomes a description of the present.

---

## 4 — The primary problem, in depth: Predictive Hydrological Activity Orchestration

- **Problem:** Rising stream temperatures and fluctuating flow rates trigger "Hoot Owl" restrictions — mandatory 2:00 PM fishing closures — compromising the marquee all-inclusive fly fishing experience.
- **Evidence:** Rock Creek water temperatures frequently reach the 70°F trout-stress threshold; the marquee salmonfly hatch has shifted 2–3 weeks earlier than historical norms. `[S1]` **[Established]**
- **Implication:** A property built around all-inclusive fly fishing has no institutional buffer for a closure that arrives with days, not weeks, of warning — undetected shifts risk last-minute cancellations, guest disappointment, and a perceived value drop on a $1,000+/night stay. **[Inferred, from Established evidence above.]**
- **Opportunity:** A data-driven orchestration layer forecasting "Hoot Owl" triggers days in advance, so Ranch Ambassadors could proactively pivot itineraries to high-altitude land activities before the closure lands. **[Proposed]**

This is the problem the rest of the document exists to solve. Fire resilience (§5.1) and logistics (§5.2) are read against this problem, not alongside it as peers.

---

## 5 — Two supporting systems

### 5.1 Supporting Environmental System — Fire-Resilient Defensible Space Design

Supports the primary problem by protecting the watershed it depends on. A century of fire suppression has left Montana forests over-stocked and fire-prone `[S3]`; high-severity wildfire can sterilize soil and drive erosion/siltation that would degrade the stream's Blue Ribbon habitat — the exact asset the primary problem is trying to protect access to. Thinning 6,600 acres into a biodiversity mosaic `[S3][S5]` protects infrastructure while buffering the stream from post-fire collapse. **[Established data — forest condition, acreage, and fire-suppression history; Inferred — the specific stream-protection causal link, reasoned from the same evidence.]**

Wildfire also has effects that extend beyond the primary problem — landscape management, infrastructure exposure, guest access to trails and roads — which matters for §8's Sense stage (fire conditions are sensed as their own signal category, not folded silently into hydrology) even though its *narrative* role here is protective of the primary problem.

### 5.2 Supporting Operational System — Invisible Logistics Mobility System

Manages the geographic friction of a 10-square-mile property designed to stay free of unnecessary vehicle use. **[Proposed framing.]** When the primary problem forces a pivot — a Hoot Owl closure, a smoke-affected trail — the burden shifts to logistics: moving gear and people to alternative nodes (Silver Dollar Saloon, remote sapphire mines) without breaking the property's sense of wilderness isolation. **[Proposed]**

Logistics is deliberately positioned as *operational mechanism*, not environmental condition (see §3.3). It is how the system in §3.4's diagram turns a stewardship decision into something a guest actually experiences.

### 5.3 Secondary operational pressures within the same system

Two additional pressures surfaced in early research and are preserved here — but demoted from earlier drafts of this document, which mistakenly presented them as a third and fourth coequal "tension" alongside hydrology. Neither is a standalone problem; both are pressures that show up *inside* the Operational Decisions and Staff Actions stages of the coordination loop (§7) whenever the primary problem forces a response.

**Energy load.** Forbes Travel Guide's 800 objective standards `[S4]` assume a level of amenity provision — heated pools, spa infrastructure, HVAC — that a remote, off-grid property has to treat as a real load, not an assumed given. *(Earlier drafts cited a specific "25,000-gallon heated pool" figure attached to `[S4]`; that specific volume is not supported by any source in §13 and has been removed as an unconfirmed specification for this property. The category — amenity load competing with off-grid capacity — is what's carried forward, not the number.)* **[Inferred, from S4 + general off-grid-property constraints; specific figures removed as unsourced.]** In the loop (§7), this shows up as: an Operational Decision to throttle non-essential load in favor of, say, air filtration during a wildfire-smoke event (§9, Simulation 1).

**Workforce.** Meeting Forbes' 800 objective standards `[S4]` requires specialized, trained staff who live on or near a remote property, which makes on-site "campus" logistics — staff housing, and reportedly childcare — an operational precondition rather than an amenity. *(The specific childcare program referenced in early research as "The Nest" does not currently carry a citation in §13 — flag for sourcing before this detail is published anywhere.)* **[Inferred / Established pending citation — see flag above.]** In the loop, this shows up in Staff Actions: cross-training guides across activity types ahead of a forecast shoulder-season compression (§9, Simulation 2) is a workforce response to an environmental signal, not an environmental problem in its own right.

---

## 6 — Systems architecture: the multi-scalar lens

A second, complementary way to read the same one-problem/two-supporting-system hierarchy above — by spatial scale rather than by domain. Same content as §4/§5, organized so a systems map or spatial diagram (see §14) has a nesting order to draw from.

| Scale | Contains | Relationship to §3's hierarchy |
|---|---|---|
| **Layer 1 — Ecology** | Watershed health, forest thinning/defensible space, wildlife-corridor preservation | Holds both the **primary problem** (hydrology, §4) and the **supporting environmental system** (fire, §5.1) — they are the same layer at this scale, which is itself evidence they're one connected problem rather than two. |
| **Layer 2 — Infrastructure** | Closed-loop waste (glass-to-sand crushing), elimination of 50,000 single-use plastic bottles `[S2]`, off-grid utility load management | The physical substrate the **energy-load pressure** (§5.3) operates inside. Not a third primary system — it's where §5.3's energy pressure is physically located. |
| **Layer 3 — Experience** | Ranch Ambassadors, Invisible Logistics (bike wrangler/shuttle system), predictive activity re-routing | Holds the **supporting operational system** (logistics, §5.2) and the guest-facing output of the whole loop (§7). |

---

## 7 — The adaptive coordination loop

```
Environmental Conditions  →  Stewardship Intelligence  →  Operational Decisions
  (Stream CFS, water temp,      (Predictive data              (Re-allocate guides;
   fuel moisture,                 synthesis layer —              throttle micro-grid
   particulates)                  PROPOSED, see §3.5)            loads — e.g. heated
      ↑                                                          pools vs. HVAC
      │                                                          filtration)
      │                                                              │
      └──────── Guest Experience  ←  Staff Actions / Logistics ──────┘
                  (Seamless pivot to     (Invisible execution
                   "Alternative           by Wranglers &
                   Discovery              Ambassadors — the
                   Charters")             Supporting Operational
                                          System from §5.2)
```

Five stages, closed loop:

1. **Environmental Conditions** — real-time signals: stream CFS, water temp, fuel moisture, particulates. Fed by the primary problem (hydrology) and the supporting environmental system (fire) from §3–§5.
2. **Stewardship Intelligence** — a data-synthesis layer predicting resource availability. This is the "Adaptive Stewardship OS" itself, named in §3.3 as the connective layer. **[Proposed/Future — see §3.5; this is the layer most at risk of being misread as an existing capability.]**
3. **Operational Decisions** — leadership re-allocates guides, throttles micro-grid loads. Where §5.3's energy pressure surfaces.
4. **Staff Actions / Logistics** — invisible execution by Wranglers and Ambassadors. This *is* the Supporting Operational System from §5.2, not a separate stage bolted on beside it.
5. **Guest Experience** — seamless transition to Alternative Discovery Charters, closing the loop back to guest-generated demand signals.

Entirely **Proposed** — this loop is the project's own systems-design invention, describing how the pieces in §3–§5 *would* relate if connected, not a documented property process.

---

## 8 — From signal to experience: the Sense → Interpret → Adapt → Experience model

Where §7 shows the loop as a cycle, this model unpacks it as a design process — the shape future research, diagrams, and product concepts (§14) can build directly on. **All four stages are Proposed**, describing a design opportunity, not a built system.

**01 — Sense**
Environmental and operational signals the system would need to ingest:
- Stream temperature
- Streamflow
- Weather
- Fire conditions
- Landscape conditions
- Activity availability
- Resource constraints

↓

**02 — Interpret**
What those conditions would need to mean for each downstream domain:
- Stewardship
- Safety
- Activities
- Staffing
- Logistics
- Guest experience

↓

**03 — Adapt**
Potential operational responses — this is where §5.1 and §5.2's supporting systems actually do their work:
- Modify activities
- Redirect guests
- Activate alternative experiences
- Adjust staff assignments
- Move equipment/resources
- Protect sensitive areas
- Alter mobility patterns

↓

**04 — Experience**
Maintain a high-quality guest experience despite environmental variability.

### The key design principle this model exists to protect

> **Make the system adaptive without making the experience feel disrupted.**

Every stage above is instrumental to this one outcome. A Sense/Interpret/Adapt pipeline that produces a visibly scrambled, apologetic guest experience has failed regardless of how sophisticated its environmental intelligence is — see Design Principle 7 in §11, and the "presented as a curated experience, not an apology" framing in both §9 simulations.

---

## 9 — Operational dashboard schema

One concrete instantiation of the Adapt/Experience stages in §8 — what an internal-facing tool built on this model might surface. **[Proposed, throughout.]**

### KPIs

| KPI | What it measures | Tier |
|---|---|---|
| **Watershed Health Index** | Composite of stream temp, CFS flow, and turbidity against Blue Ribbon thresholds | **Future** — no public real-time feed exists for this property |
| **Closed-Loop Resource Efficiency** | Share of waste/water/energy retained in closed-loop systems (glass-to-sand, bottle elimination, greywater) | **Proposed**, built on an **Established** foundation — the 50k-bottle initiative `[S2]` is real; the composite index is new |
| **Guest Experience Resilience Score** | How fully a guest's itinerary value is preserved when a primary asset (fishing, trails) is restricted | **Future** |

### System Shock simulations

**Simulation 1 — Mid-August Hoot Owl + Wildfire Smoke (compound event)**
- **Trigger:** Stream temp crosses 70°F threshold `[S1]` the same week regional fuel-moisture data flags elevated wildfire risk `[S3]` — the primary problem and the supporting environmental system activating together.
- **Proposed response:** Stewardship Intelligence layer pre-emptively reserves high-altitude, smoke-buffered land-activity slots before the Hoot Owl closure is confirmed. Ambassadors are notified 48–72 hours ahead of guest-facing communication. Micro-grid load is shifted toward HVAC/air filtration and away from non-essential heated-amenity draw for the exposure window (§5.3).
- **Guest-facing outcome:** Pivot to Alternative Discovery Charters (sapphire mines, high-elevation trail systems) presented as a curated experience, not an apology — the §8 principle in practice.

**Simulation 2 — Early Snowmelt + Shoulder-Season Staffing Compression**
- **Trigger:** Snowpack data indicates an earlier-than-forecast spring melt `[S1]`, compressing the shoulder season during which the property would normally cross-train staff between winter and summer activity rosters.
- **Proposed response:** System flags the compression window a full season ahead, triggering earlier cross-training (e.g., fishing guides certified as archery/land instructors — the workforce pressure from §5.3 in action) so the property enters the shortened shoulder season already staffed for both activity sets rather than reactively scrambling.
- **Guest-facing outcome:** No visible service gap during the transition window; the compression is absorbed entirely inside staff scheduling.

Both simulations are **Proposed** — illustrative of how the loop in §7 and the model in §8 would behave, not documented incidents.

---

## 10 — Future outlook (2027–2035)

- **Hydrological stress:** Projections suggest western Montana could lose 5–30% of trout habitat over the next century; "Hoot Owl" restrictions are likely to become a standard summer protocol rather than an exceptional one. `[S1]` **[Established projection.]**
- **Snowpack economy:** Drier summers and earlier spring snowmelt will shorten the traditional winter-to-spring activity transition window. `[S1]` **[Established projection.]**
- **Workforce fragility:** Rising regional housing costs will make on-site "campus" logistics (staff housing, and reportedly childcare — see the sourcing flag in §5.3) a mandatory operational requirement rather than a differentiator. **[Inferred extrapolation — no direct regional housing-cost source provided; do not treat as Established.]**

This outlook is what makes the primary problem a *design* problem rather than a one-time event: each trend compounds, meaning the system in §3 would need to keep adapting rather than solving for a single closure event.

---

## 11 — Design principles

1. **Invisible Infrastructure** — logistics solve geographic friction without disrupting wilderness immersion.
2. **Adaptive Saturation** — maintain "choice-saturated" environments even when primary assets are restricted.
3. **Ecological Priority** — management decisions prioritize long-term land health (Blue Ribbon status) over short-term amenity load.
4. **Standard-Driven Agility** — activity pivots must still meet the 800 objective Forbes standards. `[S4]`
5. **Predictive Respite** — operations solve environmental challenges before they reach guest comfort.
6. **Narrative Stewardship** — invisible stewardship wins justify premium ultra-luxury pricing.
7. **Adaptive, Not Disrupted** — make the system adaptive without making the experience feel disrupted. Every other principle above serves this one; it is the test any future design artifact (§14) should be checked against before it ships.

---

## 12 — Research limitations & Evidence Boundary

Restated in full here as the canonical version — §1 references this section rather than duplicating it.

- **Existing conditions supported by research (Established):** Spatial layout; current sustainability initiatives (e.g., 50k bottles eliminated `[S2]`); historical/regional forest data `[S3]`; current documented "Hoot Owl" closure impacts `[S1]`; long-range hydrological and snowpack projections `[S1]`.
- **Reasonable systems-level inferences (Inferred):** Operational stress on staff during activity re-routing; the technical ceiling of remote Wi-Fi/PMS systems; the causal link between fire-driven erosion and stream-habitat degradation; regional housing-cost pressure on workforce logistics.
- **Proposed design concepts (Proposed):** The Adaptive Stewardship OS as a named system; the coordination loop (§7); the Sense → Interpret → Adapt → Experience model (§8); the dashboard KPI set and both System Shock simulations (§9).
- **Future/speculative capabilities (Future):** Any claim of a currently-unified cross-domain system at this property (explicitly disclaimed in §3.5); a real-time Watershed Health Index feed; automated predictive triggering without a named data source.

Two open sourcing flags carried over from §5.3, repeated here so they aren't lost in a future edit: the specific "25,000-gallon heated pool" figure has been removed as unsourced (category retained, number dropped); "The Nest" childcare program reference needs a citation added to §13 before it can be treated as Established rather than merely repeated from early research notes.

---

## 13 — Sources

| Tag | Source |
|---|---|
| `[S1]` | *Low Flows, Hot Trout: Climate Change in the Clark Fork Watershed* — National Wildlife Federation |
| `[S2]` | *22 Active Sustainability Initiatives in 2022* — The Ranch at Rock Creek |
| `[S3]` | *Overseeing the Forest for the Trees* — Montana Forest Consultants |
| `[S4]` | Forbes Travel Guide Five-Star Standards & Careers |
| `[S5]` | Granite County Community Wildfire Protection Plan (CWPP) |

---

## 14 — Future case study architecture

Not part of the source research — the structural spine the eventual portfolio case study can move through, whichever of §0's three paths (Supersede/Fork/Merge) gets chosen. Each level maps to one part of the hierarchy established in §3–§9, so building the case study in this order keeps the one-problem/two-supporting-system narrative intact by construction rather than by discipline.

| # | Level | Question it answers | Draws from |
|---|---|---|---|
| 01 | **Landscape** | What is happening in the physical environment? | §4, §5.1, §6 |
| 02 | **Environmental Intelligence** | What signals indicate changing conditions? | §8, Sense stage |
| 03 | **System Decisions** | What does the Ranch need to understand or decide? | §7 (Stewardship Intelligence → Operational Decisions); §8, Interpret stage |
| 04 | **Operational Response** | How do staff and systems adapt? | §5.2, §5.3, §7 (Staff Actions/Logistics); §8, Adapt stage |
| 05 | **Experience Orchestration** | How does the guest journey adapt? | §7 (Guest Experience); §8, Experience stage; Principle 7 in §11 |
| 06 | **Digital/Product Layer** | What tools, interfaces, workflows, or decision-support systems could enable this? | §9 dashboard schema, as one example instantiation |

**Future design artifacts this architecture sets up** (none exist yet — this is a work plan, not an inventory):
- Systems maps
- Stakeholder maps
- Environmental intelligence models
- Decision trees
- Service blueprints
- Operational workflows
- Guest journey maps
- Spatial diagrams
- Digital product concepts
- Experience orchestration interfaces

Every artifact in that list should be checkable against §3's hierarchy: does it read as part of *one* adaptive system, or does it accidentally re-introduce hydrology/fire/logistics as three parallel projects? If the latter, it needs to be re-anchored to the primary problem before it ships.

---

## 15 — Subpage routing guide (for whoever builds from this file)

Practical map from section → likely destination, pending the §0 decision. Superseded in spirit by §14's six-level architecture for anyone building the case study fresh; kept here as the mapping onto the *current* three-route IA (`/explorer`, `/systems`, `/dashboard`) if the Merge or Supersede path is chosen without a full IA rebuild.

- **`/explorer`** (problems, felt) → §3 (the unified hierarchy), §4 (primary problem), §5 (two supporting systems)
- **`/systems`** (frameworks, modeled) → §6 (multi-scalar architecture), §7 (coordination loop), §8 (Sense/Interpret/Adapt/Experience), §11 (design principles)
- **`/dashboard`** (operating picture) → §9 (KPIs + System Shock simulations), §14 level 06 (Digital/Product Layer)
- **All routes** → §1's Disclaimer and Evidence Boundary must appear verbatim per `portfolio-audit-rubric.md`'s Required-module gate; do not paraphrase it down to something softer. §3.5's "not claiming this exists today" distinction is equally non-negotiable — it is the load-bearing sentence that keeps this entire document honest.
