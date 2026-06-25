# Practice Coherence Review — Research → Frameworks → Concepts → Implementation

**Goal:** Evaluate whether every project supports one coherent practice, across the pipeline Research → Frameworks → Concepts → Implementation (currently "Experimental Builds").
**Sources reviewed:** Homepage (`app/page.tsx`, `components/DesignWork.tsx`), Research Practice page (`app/projects/research-practice/page.tsx`, `PipelineSection.tsx`), categorization (`data/projects.ts`), navigation (`utils/projectNavigation.ts`), and all project content/cross-references.
**Date:** 2026-06-24

---

## Verdict

**The projects support one coherent practice *intellectually* — but the *architecture* (categorization, navigation, funnel shape) does not yet express that coherence, and three categorization errors actively contradict it.**

There is a genuine shared spine: the confidence/recovery/authority models, the environmental-systems lens, and the ESD method run through nearly every project. The pieces belong together. But the structure that presents them is flat where it should be layered, lumpy where it should be a funnel, and in three places it files projects in the wrong stage. **Coherent practice, incoherent scaffolding** — fixable by recategorizing and *showing the lineage that already exists in the data*, not by adding or cutting much.

The current funnel is **1 → 1 → 4 → 3** (Research → Frameworks → Concepts → Builds). That is not a funnel; it's a thin top, a one-item framework layer, a bulge of concepts, and a near-equal builds layer. A practice should taper.

---

## Findings

### Categorization errors (the core problem)

1. **Field Notes is mis-filed as an Implementation/Build.** It is the **41-country field-research corpus** — the *input* to the entire pipeline, not an output. Filing the practice's primary research as a downstream build is a direct narrative contradiction. → **Move to Research.**
2. **Responsive Ecologies is under-elevated as a peer "Concept."** It is explicitly the **flagship synthesis** that fuses Architecture of Confidence + Adaptive Hospitality + ESD research. The data even tags it `navStatus: 'Flagship Synthesis'` — the practice already *knows* it's special, but the taxonomy still files it as 1 of 4 equal concepts. → **Elevate to its own capstone tier.**
3. **The Frameworks layer looks empty (1 item) when it's actually rich.** Framework-grade IP is buried inside "concepts": the **Signal Matrix** (Wayfinding), the **Transformation Blueprint + ethics framework** (Intention Engine), the **Confidence Model / Decision Hierarchy / Domain Atlas** (Responsive Ecologies). The practice looks like *one idea + many speculative applications* when it's actually *a body of frameworks.* → **Surface these as named frameworks.**

> Internal contradiction confirming this: ESD OS's own copy (`whatTheOsIs`) calls "the Architecture of Confidence, the Wayfinding Matrix, Responsive Ecologies" **frameworks** — but `data/projects.ts` types two of them as **Concepts.** The practice can't decide what's a framework vs. a concept.

### Missing projects (gaps in the pipeline)

- **Research layer is hollow.** Only ESD OS (a *method/tool*, not readable findings). There is **no published research output** — no written audit, study, or field report a visitor can actually read. The 41-country corpus exists but is mis-filed and unsurfaced.
- **The Framework→Implementation line is broken.** The keystone framework (Architecture of Confidence) has **no build that directly implements it.** HADE and Digital Executor are travel/decision artifacts, not AOC demonstrations. A small **"Confidence Audit" tool** would close the loop and prove the framework runs.
- **No "what didn't survive."** The page claims "concepts that survive become builds," but the practice only ever *accretes* — nothing is shown as pruned or parked. A practice that never kills anything reads as a project collection.

### Redundant projects (consolidation candidates)

- **Digital Executor ≈ HADE ≈ Field Notes** share the identical `Situation → Local Insight → Suggested Moves → Why This Works` pattern. Digital Executor is the weakest standalone (lowest IP-inventory score) → **fold into HADE as a recovery use-case, or into AOC as the recovery-architecture demo.**
- **Adaptive Hospitality is a *component of* Responsive Ecologies**, not a peer — RE's own content lists it as a source it synthesizes. Position it as the hospitality vertical *that feeds* the flagship, not a sibling.
- **Intention Engine ≈ Adaptive Hospitality** both occupy outdoor-hospitality/experience design with overlapping intention+recovery methods → unify under one **Experience Design** framework with two applications.
- Net: the 4 concepts collapse into **two concept families** — *Experience* (Intention Engine, Adaptive Hospitality) and *Navigation/Stewardship* (Wayfinding, → Responsive Ecologies).

### Narrative gaps

- **The funnel is invisible.** The lineage *exists in the data* (ESD OS `architectureLayers.outputs`, AOC's Synthesis Engine, RE's `artifactOrigins` + `evidenceLineage`, `crossProjectCards`) — but it appears nowhere in navigation or categorization. The pipeline is asserted, never shown.
- **Navigation abandons the pipeline.** `topLevelProjectNavGroups` renders a **flat list** within each track — no stages, no order, no flagship marker. The site *teaches* the 4-stage pipeline on the Research Practice page, then drops it everywhere else.
- **The two tracks are severed.** Positioning says research "makes the client work not a guess," yet **zero links** connect any research artifact to any client project.
- **Four names for one thing:** route `/research-practice` · nav group "Independent Research Practice" · page/homepage "Systems Design Practice" · hero "Multidisciplinary Designer."

---

## Deliverable 1 — Practice Architecture Diagram (recommended end-state)

```
                 THE PRACTICE — "Systems Design Practice"
            Understand systems before improving them.

  ┌───────────────────────────────────────────────────────────────────┐
  │ CROSS-CUTTING EVIDENCE BASE                                         │
  │ + Field Notes — 41-country field-research corpus + capture method   │
  │   (MOVED up from "Builds": this is an input, not an output)         │
  └───────────────────────────────┬───────────────────────────────────┘
                                   │ feeds
                                   v
  (1) FIELD RESEARCH ───────────────────────────────────────────────────
     Environmental Systems Design OS   · method · tool · evidence engine
     audits -> signals -> typed artifacts -> evidence lineage
        + GAP: add one *readable* published study/audit
                                   │ produces artifacts
                                   v
  (2) FRAMEWORKS ───────────────────────────────────────────────────────
     * The Architecture of Confidence            (KEYSTONE)
       confidence model · context loop · recovery · authority routing
     + surface the framework-grade IP hidden in concepts:
        · Ambient Wayfinding (the Signal Matrix)
        · Experience Blueprinting (Transformation Blueprint + ethics)
                                   │ instantiated as
                                   v
  (3) CONCEPTS  (applied system architectures, in 2 families) ───────────
     EXPERIENCE                         NAVIGATION / STEWARDSHIP
       Intention Engine  (ecotourism)     Wayfinding Matrix (recreation)
       Adaptive Hospitality (ops) ──┐
                                     │ both feed v
                                  v  v
  (4) FLAGSHIP SYNTHESIS ────────────────────────────────────────────────
     * Responsive Ecologies   (ELEVATED out of Concepts)
       fuses  AOC + Adaptive Hospitality + ESD OS  ->  proves the thesis
                                   │ implemented / delivered by
                                   v
  (5) IMPLEMENTATION ────────────────────────────────────────────────────
     HADE — Human Adaptive Decision Engine   (runtime for the concepts)
       CATDS · Relational Heuristics · ZK Social Graph · Semantic Translation
     > Digital Executor -> fold in as the AOC recovery demo
        + GAP: a "Confidence Audit" tool that implements the keystone

  ──────────────────────────────────────────────────────────────────────
  RESEARCH PRACTICE  ──── de-risks ───>  CLIENT WORK
  (currently severed — add evidence links from artifacts to client projects)
```

`*` = lead asset · `+` = add/move · `>` = consolidate. This keeps the 4-stage spine but adds a **Flagship Synthesis** tier (because Responsive Ecologies genuinely operates above the concepts) and relocates the evidence base to the top.

---

## Deliverable 2 — Updated Taxonomy

| Project | Current type | Recommended tier | Change | Why |
|---|---|---|---|---|
| **Field Notes** | Experimental Build | **Field Research** (evidence base) | Move up | The 41-country *input* corpus, not an output |
| **Environmental Systems Design OS** | Research OS | **Field Research** (method/tool) | Keep | The research engine |
| **Architecture of Confidence** | Framework | **Framework** (keystone) | Keep | The shared spine |
| **Wayfinding Matrix** | Concept | **Concept** + surface *Signal Matrix* as framework | Dual-label | Framework-grade artifact inside |
| **Intention Engine** | Concept | **Concept** + surface *Transformation Blueprint* as framework | Dual-label | Framework-grade artifact inside |
| **Adaptive Outdoor Hospitality** | Concept | **Concept** (feeds flagship) | Re-relate | A *source of* Responsive Ecologies, not a peer |
| **Responsive Ecologies** | Concept | **Flagship Synthesis** | Elevate | Already flagged `Flagship Synthesis`; it's a capstone |
| **HADE** | Experimental Build | **Implementation** | Keep (rename stage) | The one true build/runtime |
| **Digital Executor** | Experimental Build | merge -> HADE / AOC-recovery | Consolidate | Redundant pattern, weakest standalone |

**Stage label changes:**
- `Research OS` -> keep as a *type*, but the stage reads **"Field Research."**
- `Experimental Builds` -> **"Implementation"** (preferred name). Caveat: "Implementation" implies production; keep each card's **maturity status honest** (the evidence-boundary discipline already in use — carry it onto the cards so the rename doesn't overclaim).
- Add tier **"Flagship Synthesis"** between Concepts and Implementation.

Result: the funnel becomes **2 → 1(+2 surfaced) → 3 → 1 → 1**, which finally *tapers* like a real research-to-build pipeline.

---

## Deliverable 3 — Recommended Project Relationships (the lineage graph)

Make these edges explicit on each page (they exist in the data today, just unsurfaced):

```
Field Notes ──feeds──> ESD OS ──produces artifacts──> Architecture of Confidence
                                                              │
                       ┌──────────────────────────────────────┼───────────────────┐
                       v                    v                  v                    │
                Wayfinding Matrix    Intention Engine   Adaptive Hospitality        │
                       │                    │                  │                    │
                       └──────────┬─────────┴──────────────────┘                    │
                                  v                                                  │
                         Responsive Ecologies  <──── also synthesizes ──────────────┘
                                  │
                                  v
                      HADE (runtime)  <── Wayfinding / Intention / RE all "hand off" delivery to HADE
                                  ^
                  Digital Executor ┘  (recovery use-case of AOC, delivered via HADE)

  ESD OS evidence artifacts ──> inform ──> CLIENT WORK projects   (NEW cross-track link)
```

Per-page treatment: each project shows **Upstream** ("draws on…") and **Downstream** ("instantiated in… / delivered by…") links to its pipeline neighbors. Responsive Ecologies already has the richest set (`artifactOrigins`, `relatedProjects`) — mirror that pattern everywhere.

---

## Deliverable 4 — Navigation Recommendations

1. **Make nav mirror the pipeline.** Replace the flat per-track list with **stage-grouped** items: `Field Research · Frameworks · Concepts · Flagship · Implementation`. The nav should *re-teach* the same spine the page teaches. (One change in `utils/projectNavigation.ts`: group by `type`/tier, not just `track`.)
2. **Resolve the name — pick one.** Use **"Systems Design Practice"** for the route, nav group, page H1, and homepage card. Retire "Independent Research Practice" / "Research Practice" / "Multidisciplinary Designer" as the primary label.
3. **Surface the flagship in nav.** Responsive Ecologies already carries `navStatus: 'Flagship Synthesis'` — render that badge in the dropdown so the capstone reads as a capstone.
4. **Order by pipeline, not insertion order.** Within each group, sequence Research → … → Implementation so scanning the nav traces the funnel.
5. **Add cross-track links.** Where a research artifact informed a client project, link them both ways — this is the only thing that substantiates "research makes the client work not a guess."

---

## Deliverable 5 — Content Hierarchy

Three levels, applied consistently across homepage, practice page, and nav:

```
PRACTICE  (Systems Design Practice — one name, one thesis)
  └─ STAGE        Field Research · Frameworks · Concepts · Flagship · Implementation
       └─ PROJECT        the named system (e.g., Architecture of Confidence)
            └─ ARTIFACT        the sub-models / marquee IP (e.g., Confidence Model)
```

- **Homepage:** keep the two co-equal tracks, but (a) rename consistently, and (b) have the practice card **preview the pipeline** (the 5 stages) instead of a generic blurb — so the homepage promises the structure the practice page delivers.
- **Research Practice page:** lead with the pipeline **as a connected funnel that shows lineage** (not 4 sealed accordions). Put **Field Research first** (with the 41-country corpus visible), show a **populated Frameworks tier**, render **Responsive Ecologies as the flagship band**, and end on **Implementation**. Surface 1–2 **marquee artifacts per project** so the depth (the real IP) is visible without a click.
- **Project pages:** every page carries a **pipeline mini-map** showing where it sits + its upstream/downstream neighbors. Keep the **evidence-boundary** ("supports / does not claim") block — it's the practice's most credible, most differentiating habit; make it a standard component on all nine.

---

## Bottom Line

You don't need more projects or fewer projects — you need to **move Field Notes up, elevate Responsive Ecologies, surface the frameworks hiding inside the concepts, consolidate Digital Executor, and make the existing lineage visible in categorization and navigation.** Do that and the funnel tapers, the frameworks layer fills, the flagship leads, and the same nine projects finally read as one practice instead of nine interesting things.

---

## Companion documents
- `research-practice-positioning-audit.md` — strategic positioning ("interesting projects" vs. "operating practice")
- `research-practice-ip-inventory.md` — IP matrix, priority ranking, IP roadmap
- `research-practice-architecture-review.md` — this document (pipeline coherence + taxonomy + navigation)
