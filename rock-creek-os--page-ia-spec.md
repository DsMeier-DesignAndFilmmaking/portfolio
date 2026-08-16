# Infrastructure Sovereignty OS — Page IA & Content Framework

**Route:** `/projects/rock-creek-os` · **Track:** `independent-research-practice` · **Type:** `Concept`
**Built to:** [Independent Practice Studio Playbook](independent-practice-studio-playbook.md) · **Gated by:** [Portfolio Audit Rubric](portfolio-audit-rubric.md)
**Benchmark page:** `app/projects/environmental-systems-design-os/`

> This is a **build spec**, not the page. It defines the information architecture, content hierarchy, content inventory, and component list. Copy blocks below are written to house voice and are drop-in ready for `content.ts`.

---

## 0 — Two positioning decisions to make before build

### 0.1 The named-property question

"Rock Creek" names a real, operating Montana guest ranch. An unsolicited, independently authored case study that names a live business, diagnoses its infrastructure vulnerabilities (`Rustic-Reliability Gap`, `Fishery Friction`), and publishes them under a portfolio brand reads as unsanctioned consulting on a third party — to the exact audience the page is aimed at (resort executives, design directors).

**Recommendation — archetype framing, named research provenance:**

| Element | Value |
|---|---|
| `<h1>` | Infrastructure Sovereignty OS |
| Deck | A five-layer operating model for remote, high-consequence hospitality landscapes. |
| Site reference | "a 2,500-hectare Northern Rockies guest ranch" (archetype, in body copy) |
| Provenance | Named sources cited in `08 // Evidence Boundary`, where the disclosure lives |
| Disclosure line | "Independent analysis. No client relationship, no engagement, no proprietary or non-public data. Built from public sources and comparable-property research." |

This costs nothing narratively — the thinking transfers *better* as an archetype, which is also what makes it sellable to the next property — and removes the liability. Keep the site named only if you want it as a deliberate calling card, in which case the disclosure line above becomes mandatory, not optional.

### 0.2 The slug/title mismatch

Requested route is `/projects/rock-creek-os`; requested title is `Infrastructure Sovereignty OS`. Those should agree, and the slug is the thing that ends up in search results next to a real business's name.

**Recommendation:** ship at `/projects/infrastructure-sovereignty-os`. `ProjectRecord` in [data/projects.ts](data/projects.ts) already carries `canonicalHref` and `redirectFrom?: string[]`, so `rock-creek-os` can be preserved as a redirect if it has already been shared.

**The IA below is route-agnostic.** Everything in §1–§5 is unchanged either way; only the `id`/`href` in §5.1 and the disclosure copy in §3.9 move.

### 0.3 Adjacency check (red-team)

Three portfolio pages now touch the same ranch. They must not restate each other. This page's boundary is explicit and belongs in `10 // Explore` as nav cards, not as prose:

| Page | Its altitude | Boundary |
|---|---|---|
| **Adaptive Outdoor Hospitality Companion** | The guest's decision, when conditions change | Owns *guest confidence & recovery*. This page hands off to it at intervention 06. |
| **Responsive Ecologies** | Multi-agent land stewardship, sensing → authority | Owns *ecological decision-making*. This page treats it as the Ecological OS's engine, not a competitor. |
| **Infrastructure Sovereignty OS** *(this page)* | The whole property as one operating system | Owns *the stack itself* — how five layers constrain and reinforce each other. |

One sentence, used verbatim in `01 //` intro, keeps the lanes clean:
> "The Companion decides for the guest. Responsive Ecologies decides for the land. This asks what has to be true of the property for either decision to be trustworthy."

Per the practice's own red-team rule, this is publishable output, not another internal strategy doc — it moves toward market contact rather than away from it.

---

## 1 — Page IA (complete section spine)

Single-scroll static narrative. One `<main>`, one accent, one `<h1>`. Hero + 10 numbered bands + dark cross-project footer = **13 bands, ~10 screens**. Matches playbook §2 and §12.

| # | `id` | Eyebrow | Beat | Band | Payload | Req |
|---|---|---|---|---|---|---|
| — | `rcos-hero` | — | **Claim** | white | H1 + deck + lede + 5-chip layer rail | ● |
| — | `rcos-brief` | — | Claim | white (card on `neutral-50`) | Scope · Role · Context · Design question | ● |
| 1 | `rcos-signals` | `01 // Research Signals` | **Evidence** | `neutral-50` | 5 signal cards | ● |
| 2 | `rcos-problem` | `02 // The Problem Set` | **Definition** | white | 4 tension cards | ● |
| 3 | `rcos-map` | `03 // Systems Map` | **Mechanism** | `neutral-50` | Hero diagram + dark restatement strip | ● |
| 4 | `rcos-loops` | `04 // Reinforcing Loops` | Mechanism | white | 4 loop diagrams + leverage points | ● |
| 5 | `rcos-framework` | `05 // Infrastructure Sovereignty Framework` | **Governance** | `neutral-950` | 5-layer stack + responsibility registry | ● |
| 6 | `rcos-interventions` | `06 // Concept Interventions` | **Output** | white | 6 intervention cards | ● |
| 7 | `rcos-outcomes` | `07 // Expected Outcomes` | Output | `neutral-50` | Outcome matrix, 5 layers × 3 cols | ● |
| 8 | `rcos-evidence` | `08 // Evidence Boundary` | **Honesty** | white | ✓ Established / ✗ Not claimed + disclosure | ● |
| 9 | `rcos-reflection` | `09 // Reflection` | Honesty | `neutral-50` | 5 numbered lessons | ● |
| 10 | `rcos-explore` | `10 // Explore` | **Invitation** | white | CTA panel | ● |
| — | — | — | Invitation | `neutral-950` | Cross-project footer, 4 nav cards | ● |

**Ordering rationale (deviations from the benchmark, deliberate):**

- **Evidence before Definition** (`01` signals → `02` problem). The benchmark opens with Definition because an OS needs defining; a *case study* has to earn its problem framing. This also enacts the practice's own Operating Principle 01 — "evidence before synthesis." Adaptive Ranch sets the precedent for flexing the numbered arc into case-study order.
- **Framework occupies the dark authority band** (`05`), replacing the benchmark's `08 // Operating Principles`. Playbook §7 is explicit: the governing framework goes on `neutral-950`. Here the framework *is* the governance object, so a separate principles band would be redundant weight. Do not add one.
- **Mechanism splits across two bands** (`03` structure, `04` behavior). The design question claims the layers "continuously reinforce one another." A static map cannot prove that; the loops band is where the claim is discharged. Playbook §6.7 forbids stacking two heavy diagrams — `04`'s loops are deliberately lighter, single-cycle objects.
- **Reflection after Evidence Boundary.** Outcomes → what isn't claimed → what was learned → what's next reads as descending confidence, which is the honest sequence.

**Dot nav** (`sectionNavigation`, single-word labels per playbook §1):
`Overview · Signals · Problems · Map · Loops · Framework · Concepts · Outcomes · Evidence · Reflection · Explore`

---

## 2 — Visual system

### 2.1 Accent

**Primary recommendation: `teal`** — `teal-700` on light, `teal-300` on dark, `focus-visible:ring-teal-600`, `selection:bg-teal-200/50`.

Unclaimed across the practice (amber = Research OS, emerald = Adaptive Ranch, cyan = Responsive Ecologies) and semantically apt for water/creek/infrastructure. **Fallback if teal/emerald adjacency reads muddy in build: `stone-600`** — reads as engineering document, which suits the subject.

### 2.2 Layer palette — fixed, non-negotiable

The five OS layers map 1:1 onto the practice's fixed semantic palette (playbook §5). This is a genuine asset: the page teaches the portfolio's shared color language exactly once, using all five slots.

| Layer | Semantic slot | Color | Chip |
|---|---|---|---|
| Experience OS | Human | `rose` | `bg-rose-50 border-rose-200 text-rose-700` |
| Operations OS | Operational | `amber` | `bg-amber-50 border-amber-200 text-amber-700` |
| Infrastructure OS | Digital / engineered | `violet` | `bg-violet-50 border-violet-200 text-violet-700` |
| Ecological OS | Ecological | `emerald` | `bg-emerald-50 border-emerald-200 text-emerald-700` |
| Landscape OS | Spatial | `sky` | `bg-sky-50 border-sky-200 text-sky-700` |

Every chip carries its layer name as text. Color is never the only signal (playbook §10).

### 2.3 Tokens

Use Appendix A of the playbook verbatim. No new tokens. Quick reference: bounds `container mx-auto px-6 md:px-8` · rhythm `py-16 md:py-28` · header gap `mb-10 md:mb-14` · card `rounded-2xl p-6 md:p-8` · hero/diagram/CTA `rounded-[2rem]` · chip `rounded-xl px-3 py-2.5`.

---

## 3 — Content inventory (copy-ready)

Counts are binding. Word budgets from playbook §4: section intro ≤60 words / ≤3 sentences; card body ≤40 words.

### 3.0 Hero + Brief

**Badges:** `Independent Research` (teal) · `● Concept` (neutral)

**H1:** Infrastructure Sovereignty OS

**Deck (serif italic):** A remote ranch is not a resort with a long driveway. It is an operating system.

**Lede (≤max-w-2xl):** A five-layer operating model for a 2,500-hectare Northern Rockies guest ranch, where power, water, road access, staff capacity, fishery health, and guest experience are a single interdependent system — and where any one of them can end the stay.

**Glance rail — 5 chips, the layer stack in reading order:**
`Experience → Operations → Infrastructure → Ecological → Landscape`
Sub-label under the rail: *Authority runs down. Constraint runs up.*

**Brief card** (`rounded-[2rem]` on `neutral-50`, mirrors the benchmark's "Evidence path" band) — four labeled blocks:

| Label | Content |
|---|---|
| **Context** | 2,500 hectares, ~90 minutes from the nearest hospital, on a private road, above a blue-ribbon trout stream. Self-supplied power, water, wastewater, and connectivity. No municipal backstop for any of it. |
| **Design question** | How might a remote luxury ranch become a resilient operating system where guest experience, infrastructure performance, operational excellence, and ecological stewardship continuously reinforce one another? |
| **Scope** | Systems architecture, service model, and stewardship logic for the whole property. Not architecture, not landscape construction documents, not an app. |
| **My role** | Environmental Experience Systems Designer · Information Architect · Systems Strategist · Service Designer · Landscape Systems Thinker |

---

### 3.1 `01 // Research Signals` — 5 cards

**Title:** The research keeps returning to the same fact: nothing here is delivered by someone else.

**Intro:** Five signal domains framed what a resilient version of this property would have to do.

| # | Signal | Body (≤40 words) | Confidence |
|---|---|---|---|
| 01 | **Infrastructure Sovereignty** | Power, water, wastewater, connectivity, and road access are owned assets with no utility backstop. Sovereignty is not independence for its own sake — it is absorbing a failure before a guest can learn one occurred. | Research-supported |
| 02 | **Climate Resilience** | Shifting snowpack, longer fire seasons, thermal stress on cold-water fisheries, and freeze–thaw road damage move faster than capital planning cycles. The asset isn't a hardened building. It's a property that can change posture in hours. | Research-supported |
| 03 | **Luxury Hospitality** | At this tier the product is not service volume — it is the absence of friction. Every visible piece of operational machinery is a small breach of the promise. | Research-supported |
| 04 | **Regenerative Stewardship** | Riparian condition, grazing rotation, fuel load, and fishery vitality are simultaneously ecological obligations, guest experiences, and marketing assets. Which makes them operating constraints. | Research-supported |
| 05 | **Remote Work Migration** | Longer stays and multi-generational bookings turn a four-night destination into a three-week residence. Bandwidth, quiet, workspace, and daily-life logistics become part of the hospitality product. | Hypothesis |

Card anatomy: mono `0N` (accent) → serif title → sans body → confidence badge. Each card carries its dominant layer chip.

---

### 3.2 `02 // The Problem Set` — 4 cards

**Title:** Four tensions, each of which improves one system by degrading another.

**Intro:** These are not complaints about the property. They are structural trade-offs with no local optimum — which is why they need a systems answer rather than a departmental one.

Card anatomy is **three-part and identical across all four** — this repetition is what makes them read as analysis rather than opinion: `The tension` → `Why it persists` → `Failure mode`.

| Name | Tension | Why it persists | Failure mode |
|---|---|---|---|
| **The Rustic-Reliability Gap** | The aesthetic promises simplicity. The operation requires industrial redundancy. | The more off-grid the experience reads, the more concealed infrastructure sustains it — and concealed infrastructure is judged against an aesthetic that must hide it. | Reliability is chronically underfunded because it is invisible when it works, and its failures land directly on the guest. |
| **The Glazing Paradox** | The view is the asset. Glass delivers it, and glass costs. | Glass is simultaneously the thermal weak point, the wildlife-strike surface, the light-pollution source, and the privacy liability. | Five separate decisions get made by five parties; optimizing any one degrades the other four, and no one owns the envelope. |
| **Fishery Friction** | A blue-ribbon stream is a marquee amenity and a temperature-sensitive ecosystem. | Guest demand peaks in exactly the low-flow, high-temperature window when the fishery can least absorb pressure. | The revenue calendar and the ecological calendar are inversely correlated, and the trade-off has no owner — so it defaults to revenue. |
| **The Privacy–Service Delta** | Anticipatory service requires knowing where guests are. The privacy premium requires not appearing to know. | The gap is closed informally — staff carry the awareness in their heads and in unlogged radio traffic. | The service magic and the ungoverned data practice are the same practice. It cannot be scaled, audited, or handed to a new hire. |

---

### 3.3 `03 // Systems Map` — hero diagram

**Title:** Five systems, one property, and the dependencies nobody drew.

**Intro:** Each layer has its own vocabulary, its own manager, and its own calendar. The map exists to show where they touch.

**Diagram spec** — the page's single most important visual object. Five horizontal swim-lanes, top to bottom, each in its layer color, each node a labeled card with real content (playbook §6.2 — never abstract shapes):

| Lane | Nodes |
|---|---|
| **Experience** (rose) | Arrival · Stay rhythm · Activity guidance · Recovery · Departure |
| **Operations** (amber) | Staffing & shift · Housekeeping · F&B · Guiding · Maintenance · Dispatch |
| **Infrastructure** (violet) | Generation & storage · Water & wastewater · Connectivity · Road & access · Fire suppression · Building envelope |
| **Ecological** (emerald) | Fishery · Riparian corridor · Wildlife movement · Fuel load · Soil & grazing · Water rights |
| **Landscape** (sky) | Terrain & elevation · Access corridors · Viewsheds · Siting · Seasonality · Dark sky |

**Cross-lane dependency edges — draw these five, label each:**

1. Landscape → Infrastructure — *terrain and corridors decide what can be built, buried, and plowed*
2. Ecological → Operations — *fishery and fuel-load thresholds set what staff may schedule*
3. Infrastructure → Experience — *generation, water, and bandwidth headroom cap simultaneous guest activity*
4. Operations → Experience — *the service promise is bounded by shift capacity, not intent*
5. Experience → Ecological — *guest demand is the primary pressure on the fishery and the corridor*

Edge 5 closing back to the bottom lane is what makes this a system rather than a stack. Draw it as the return arc.

**Dark restatement strip below the diagram (playbook §6.4), one sentence:**
> Landscape decides what infrastructure is possible; infrastructure decides what operations can promise; operations decides what the guest experiences — and the guest decides how hard the land gets used.

**Mobile:** lanes stack vertically; cross-lane edges collapse to a labeled `↓ constrains` breadcrumb between lanes; the return arc becomes a final full-width `↑ Experience pressures Ecological` bar.

---

### 3.4 `04 // Reinforcing Loops` — 4 loop cards

**Title:** The layers are already reinforcing each other. Two of the loops are working against the property.

**Intro:** A dependency map shows structure. Loops show behavior over time — and behavior is what the design has to change.

Each card: loop name → `Reinforcing ↻` / `Balancing ⊖` badge → 5–6 step cycle diagram → one **leverage point** line in accent. The leverage point is the design deliverable; without it this section is systems-theory decoration.

| Loop | Type | Cycle | Leverage point |
|---|---|---|---|
| **Reliability → Trust** | Reinforcing (virtuous) | Infrastructure headroom → fewer visible failures → staff freed from firefighting → more anticipatory service → guest confidence → repeat and longer stays → capital for headroom | Fund headroom from the guest-retention line, not the maintenance line. The loop only closes if the two budgets can see each other. |
| **Load → Degradation** | Reinforcing (vicious) | Peak occupancy → peak draw on water, power, roads, and fishery → mechanical and ecological degradation → remediation closures → compressed inventory → higher rates → tighter peak concentration | Break it at inventory: price and allocate against system headroom rather than calendar demand. |
| **Stewardship → Product** | Reinforcing (virtuous) | Ecological investment → visible land health → programmable guest moments → guests accept constraint as exclusivity → easier to close a reach or rotate a pasture → ecological investment | Make the constraint legible to the guest. An unexplained closure is a service failure; a narrated one is the product. |
| **Sensing → Sovereignty** | Balancing | Condition sensing → earlier posture change → pre-positioned fuel, water, staff → smaller failure amplitude → less emergency spend → sustained sensing investment | The balancing loop is the only one that shortens the others' delays. It is the first thing to build. |

**Closing line for the band:** Three of these loops already run. The design work is not to invent them — it is to change which one dominates the season.

---

### 3.5 `05 // Infrastructure Sovereignty Framework` — dark authority band

**Title (white on `neutral-950`):** Authority runs down the stack. Constraint runs up it.

**Intro (`text-neutral-400`):** Five operating layers, each with its own decisions, signals, thresholds, and owner. The framework's claim is directional: intent flows from Experience downward, and every layer beneath can veto it.

**Stack diagram** — five stacked bands, Experience at the top (what the guest touches) to Landscape at the bottom (what the land is), with a downward `intent` arrow on the left and an upward `constraint` arrow on the right.

**Responsibility registry — one row per layer** (mono headers, playbook §5 "tables for registries"):

| Layer | Owns | Responsibilities | Primary signals | Decision it holds | Fails as |
|---|---|---|---|---|---|
| **Experience OS** (rose) | The guest's sense that nothing is difficult | Arrival & orientation · stay rhythm · activity fit · service recovery · departure | Guest intent, party composition, stay length, satisfaction & recovery events | What the property promises a guest today | Promises the operation cannot fund |
| **Operations OS** (amber) | Whether the promise can actually be delivered | Staffing & shift design · maintenance scheduling · guiding & dispatch · handoffs · continuity choreography | Shift capacity, equipment readiness, work order backlog, staff local knowledge | What can be scheduled and by whom | Heroics — undocumented saves that vanish with the person |
| **Infrastructure OS** (violet) | Continuity of the invisible | Generation & storage · water & wastewater · connectivity · road & access · fire suppression · building envelope | Headroom, load, redundancy state, failure and near-miss history | When posture must change | Silent single points of failure |
| **Ecological OS** (emerald) | The land's capacity to absorb use | Fishery thermal & flow budget · riparian condition · wildlife corridors · fuel load · soil & grazing rotation · water rights | Stream temperature, flow, fuel moisture, wildlife presence, range condition | The ceilings nothing above may exceed | A compliance appendix instead of a constraint |
| **Landscape OS** (sky) | What is possible at all | Terrain & siting · access corridors · viewsheds · seasonality · dark sky · long-horizon land use | Topography, snowpack, sun & wind, sightlines, seasonal access windows | The permanent boundary conditions | Treated as scenery rather than structure |

**Restatement strip:** Every layer can say no to the one above it. A property is resilient when those refusals arrive early enough to be designed around instead of apologized for.

---

### 3.6 `06 // Concept Interventions` — 6 cards

**Title:** Six interventions, none of which begin as an app.

**Intro:** Each addresses a named tension or loop, and each is a service, policy, or allocation instrument before it is ever a screen.

| # | Intervention | What it is | Addresses |
|---|---|---|---|
| 01 | **Property Posture States** | A small named set — Normal · Fire Watch · Low Flow · Storm · Isolation — that switches infrastructure, staffing, guest programming, and ecological rules together, rather than each department reacting alone. | Sensing → Sovereignty loop; Climate Resilience |
| 02 | **The Sovereignty Ledger** | Per-system headroom expressed in *guest-days remaining* instead of engineering units: days of water, hours of generation, road-open probability, bandwidth ceiling. Hospitality leadership can finally read infrastructure. | Rustic-Reliability Gap; Reliability → Trust loop |
| 03 | **Fishery Load Calendar** | Rod-days allocated against a thermal and flow budget rather than against demand, and published to guests as scarcity rather than restriction. | Fishery Friction; Load → Degradation loop |
| 04 | **Quiet Instrumentation Standard** | A stated boundary on what the property senses: environment and assets are instrumented, guests are not. Converts an informal practice into a declared policy — and into a marketable one. | Privacy–Service Delta |
| 05 | **Glazing Performance Envelope** | A per-building score reconciling view, thermal load, bird strike, dark sky, and sightline privacy as one envelope instead of five unowned decisions. | Glazing Paradox |
| 06 | **Continuity Choreography** | The service blueprint for absorbing a failure: detection → posture change → staff script → guest-facing substitution that preserves intent → after-action. | Rustic-Reliability Gap; hands off to the Companion |

Card 06 carries a nav link to `/projects/adaptive-ranch-experience-companion/`; card 03 links to `/projects/responsive-ecologies/`. This is where the portfolio's connective tissue is load-bearing rather than decorative.

---

### 3.7 `07 // Expected Outcomes`

**Title:** What the model predicts, stated as prediction.

**Intro:** These are modeled expectations from the loop structure, not measured results. The distinction is the point of the next section.

Matrix, one row per layer — three columns: `Expected shift` / `Leading indicator` / `Confidence`.

| Layer | Expected shift | Leading indicator | Confidence |
|---|---|---|---|
| Experience | Failures become substitutions that preserve intent, not apologies | Recovery events resolved without guest-visible escalation | Hypothesis |
| Operations | Undocumented heroics convert into repeatable posture procedures | Share of incidents handled by a named posture rather than improvisation | Hypothesis |
| Infrastructure | Reactive maintenance shifts toward pre-positioned response | Ratio of scheduled to emergency work orders | Research-supported |
| Ecological | Fishery pressure decouples from peak-demand weeks | Rod-days inside vs. outside the thermal budget | Research-supported |
| Landscape | Siting and access decisions carry long-horizon constraints explicitly | Capital projects with a documented Landscape OS veto | Hypothesis |

---

### 3.8 `08 // Evidence Boundary` — required trust module

**Title:** What this establishes, and what it does not.

Two columns, ✓ emerald and ✗ neutral, each pairing color with text (playbook §10).

**✓ Established**
- A five-layer operating model for remote high-consequence hospitality properties
- Four named, structurally-explained tensions with failure modes
- A dependency map and four loops with identified leverage points
- Six interventions specified as services and policies, each traceable to a named tension
- A vocabulary that lets infrastructure, operations, ecology, and hospitality argue in the same terms

**✗ Not claimed**
- Any measured or validated outcome — no intervention has been deployed
- Site-specific engineering, hydrological, or structural findings
- Access to non-public operating data, financials, or staff interviews
- A substitute for licensed engineering, ecological, or land-management review
- Completeness — a fifth and sixth tension almost certainly exist

**Disclosure block** (below the columns, `text-neutral-500`):
> Independent analysis. No client relationship, no engagement, and no proprietary or non-public data. Built from public sources, comparable-property research, and the [Environmental Systems Design OS](/projects/environmental-systems-design-os/).

---

### 3.9 `09 // Reflection` — 5 numbered lessons

**Title:** What the project taught me about environmental and experience systems design.

| # | Lesson |
|---|---|
| 01 | **Luxury is a reliability product wearing an aesthetic.** The design work lives in the concealment layer, which is exactly where it is hardest to get funded. |
| 02 | **Ecological constraint belongs at the same altitude as brand.** Treated as a compliance appendix, it becomes an emergency; treated as a design input, it becomes the product. |
| 03 | **A property is not a set of buildings. It is a posture that changes hourly.** Designing the postures turned out to be more useful than designing any single system. |
| 04 | **The hardest interfaces in environmental systems design are between departments, not between a person and a screen.** Every tension here was a translation failure before it was a technical one. |
| 05 | **Naming the trade-off is the deliverable.** No one can design against a tension that has no name — which is why the Glazing Paradox and Fishery Friction earned proper nouns. |

---

### 3.10 `10 // Explore` — CTA + cross-project footer

**CTA panel** (`rounded-[2rem]`, centered): *This model was built to transfer. The next test is a property that isn't this one.* → contact link.

**Cross-project footer** (dark, 4 nav cards — relationship eyebrow → serif title → arrow):

| Card | Relationship |
|---|---|
| Environmental Systems Design OS | Method origin |
| Adaptive Outdoor Hospitality Companion | Guest-facing layer |
| Responsive Ecologies | Ecological engine |
| The Architecture of Confidence | Framework lineage |

---

## 4 — Content hierarchy

```
H1   Infrastructure Sovereignty OS                          (hero — the only h1)
 │
 ├── Deck        · serif italic, the reframe
 ├── Lede        · ≤max-w-2xl, the situation
 ├── Glance rail · 5 layer chips + "Authority down / Constraint up"
 └── Brief       · Context · Design question · Scope · Role
       │
       H2  01 // The research keeps returning…      →  H3 ×5   signal cards
       H2  02 // Four tensions…                     →  H3 ×4   tension cards (3-part body)
       H2  03 // Five systems, one property…        →  diagram (5 lanes) + dark strip
       H2  04 // The layers are already reinforcing… →  H3 ×4   loop cards + leverage lines
       H2  05 // Authority runs down the stack.     →  stack diagram + registry ×5   [DARK]
       H2  06 // Six interventions…                 →  H3 ×6   intervention cards
       H2  07 // What the model predicts…           →  matrix 5×3
       H2  08 // What this establishes…             →  2 cols + disclosure
       H2  09 // What the project taught me…        →  H3 ×5   lessons
       H2  10 // Explore                            →  CTA panel
       —   Cross-project footer                     →  H3 ×4   nav cards          [DARK]
```

**Progressive disclosure ladder** (playbook §11) — the five-layer stack is taught four times at widening resolution:
1. **Glance** — hero rail, 5 chips
2. **Sentence** — brief card's design question names all four domains
3. **System** — `03` map explodes the stack into lanes and dependencies
4. **Populated** — `05` registry fills every layer with owners, signals, decisions, failure modes

Same object, four zoom levels. Never introduced twice at the same depth.

---

## 5 — Component list

### 5.1 Registration (do this first — nothing renders without it)

Add to `PROJECTS` in [data/projects.ts](data/projects.ts), in the independent-research block after `responsive-ecologies`:

```ts
{
  id: 'infrastructure-sovereignty-os',
  title: 'Infrastructure Sovereignty OS',
  href: '/projects/infrastructure-sovereignty-os',
  track: 'independent-research-practice',
  type: 'Concept',
  canonicalHref: '/projects/infrastructure-sovereignty-os',
  redirectFrom: ['/projects/rock-creek-os'],
  visibility: 'public',
  osCategory: ['concepts', 'consulting', 'strategy'],
  practiceTrack: ['environmental-systems', 'outdoor-hospitality', 'operations', 'stewardship'],
  projectType: 'concept',
  maturity: 'developing',
  evidenceLevel: 'conceptual',
  status: 'published',
  navTitle: 'Infrastructure Sovereignty OS',
  summary:
    'A five-layer operating model for remote high-consequence hospitality landscapes, where experience, operations, infrastructure, ecology, and landscape constrain and reinforce one another.',
  tags: ['Infrastructure', 'Resilience', 'Stewardship'],
}
```

`ProjectBreadcrumb` and `ProjectPracticeNavDropdown` read from this array, so both light up automatically.

### 5.2 Reuse without modification

| Component | Path | Use |
|---|---|---|
| `PageNavIndicator` | [components/PageNavIndicator.tsx](components/PageNavIndicator.tsx) | Right-rail dot nav, fed by `sectionNavigation` |
| `ProjectHeader` | [components/ProjectHeader.tsx](components/ProjectHeader.tsx) | Sticky header — pass `focusRingClassName="focus-visible:ring-teal-600"` |
| `ProjectBreadcrumb` | [components/ProjectBreadcrumb.tsx](components/ProjectBreadcrumb.tsx) | Hero breadcrumb, `projectId` prop |
| `ProjectPracticeNavDropdown` | [components/ProjectPracticeNavDropdown.tsx](components/ProjectPracticeNavDropdown.tsx) | Consumed by `ProjectHeader` |

`ProjectHeader` is the correct choice over Adaptive Ranch's inline nav — the benchmark page uses it and the inline version duplicates ~80 lines of scroll logic.

### 5.3 Port from the benchmark (copy + retheme teal)

| Component | Source | Change |
|---|---|---|
| `SectionKicker` | `environmental-systems-design-os/components/SectionKicker.tsx` | Add `dark` prop for band `05` (Adaptive Ranch's version already has it — take that one) |
| `primitives.tsx` | `environmental-systems-design-os/components/primitives.tsx` | `Tag`, `LayerTags`, `ConfidenceBadge` used as-is; `LayerTags` needs the 5 layer colors from §2.2 |
| `EvidenceBoundarySection` | `environmental-systems-design-os/components/StaticSections.tsx` | Content swap + disclosure block |
| `ExploreCtaSection` | same | Content swap |
| `CrossProjectFooter` | same | 4 cards from §3.10 |

### 5.4 New — build these

| Component | Section | Notes |
|---|---|---|
| `LayerGlanceRail` | Hero | 5 chips + directional sub-label. Small; keep in `page.tsx` or `content.ts`-driven. |
| `ProjectBriefCard` | Brief | 4 labeled blocks, `rounded-[2rem]` on `neutral-50` |
| `SignalCards` | `01` | 5-up grid → `md:grid-cols-3` + 2. Numbered-callout anatomy + confidence badge |
| `TensionCards` | `02` | 4-up, `md:grid-cols-2`. Three-part body — the repeated structure is the argument |
| **`PropertySystemsMap`** | `03` | **The hero diagram.** 5 lanes, 5 labeled cross-lane edges, return arc, dark restatement strip. Highest build effort — budget accordingly |
| `ReinforcingLoopCard` | `04` | One reusable card ×4. Cycle steps + type badge + accent leverage line |
| **`SovereigntyStack`** | `05` | Dark. 5 stacked bands + down/up arrows. Second-heaviest object; keep visually lighter than `03` per playbook §6.6 |
| `LayerResponsibilityRegistry` | `05` | Mono-header table on dark; collapses to stacked label/value rows on mobile |
| `InterventionCards` | `06` | 6-up, `md:grid-cols-2 lg:grid-cols-3`. Cards 03 and 06 get `hover:-translate-y-1` (they link) — the others must not |
| `OutcomeMatrix` | `07` | 5×3 table, layer chip in column 1, confidence badge in column 3 |
| `ReflectionCards` | `09` | 5 numbered cards, `md:grid-cols-2` + 1 |

### 5.5 File scaffold

```
app/projects/infrastructure-sovereignty-os/
  page.tsx          // thin composer, ~150 lines — no copy in here
  layout.tsx        // metadata
  content.ts        // ALL copy from §3 + sectionNavigation[] + typed arrays
  components/
    SectionKicker.tsx
    primitives.tsx
    PropertySystemsMap.tsx
    SovereigntyStack.tsx
    ReinforcingLoopCard.tsx
    StaticSections.tsx      // Evidence Boundary · Explore CTA · Cross-project footer
```

`page.tsx` stays a Server Component with no `'use client'` — this page has no live data and no client state, unlike Adaptive Ranch. Skip Framer Motion entirely; it buys nothing here and costs the static-export simplicity the benchmark has.

---

## 6 — Pre-publish gate

Run [portfolio-audit-rubric.md](portfolio-audit-rubric.md) before shipping: every category ≥ 7/10, Accessibility ≥ 8, total ≥ 100/130.

Categories at risk on this page specifically:

| Category | Risk | Mitigation |
|---|---|---|
| **5 — Diagram quality** | `03` and `05` are both structural diagrams; the second can read as a restatement of the first | `03` is behavioral/relational (lanes + edges), `05` is hierarchical (stack + registry). Keep `05` visually lighter; band `04` separates them |
| **13 — Portfolio differentiation** | Third ranch-adjacent page in the practice | §0.3's one-sentence boundary in `01`, plus the four footer cards, must both ship |
| **8 — Research communication** | Signals are secondary research, not field study | Every signal card carries a confidence badge; the `08` disclosure states sourcing plainly. Under-claim deliberately |
| **11 — Accessibility** | 5 semantic colors + accent is the most color this practice has used on one page | Every layer chip carries its name as text; diagram edges carry labels, not just direction; `aria-hidden` on all arrows and dots |
