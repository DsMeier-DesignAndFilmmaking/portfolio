# Research Practice — Evidence & Research-Maturity Audit

**Goal:** Evaluate every research project like a professional research publication, across evidence quality, research methodology, source credibility, observation quality, systems thinking, transferability, and framework extraction.
**Sources reviewed:** All 9 `independent-research-practice` projects (`data/projects.ts`) and their page/content files; sourcing/citation probe across `app/projects/**`.
**Date:** 2026-06-24

---

## Evidence-base probe (what the content actually contains)

- **Zero external/academic citations** anywhere in the nine projects (no DOIs, journals, named studies, or literature).
- **Sourcing is self-referential / circular** — the evidence-lineage `source` fields point to *other projects in the same practice* (Architecture of Confidence, ESD OS, Adaptive Ranch, System Artifacts registry).
- The only **external sources are Reddit threads** (r/travel, r/solotravel, r/travelhacks).
- **No empirical data** — the only quantitative claim in the entire practice is "40–41 countries"; every other number is a CSS/styling value (opacity, widths), not a research statistic.
- The one real external credential (the OhioLink Master's thesis) is on the homepage but is **never cited as evidence** inside the research.

---

## Headline Finding

**The practice operates at the level of rigorously-structured design *reasoning*, not validated *research*. It has exceptional epistemic hygiene and a thin epistemic foundation.**

This is a genuinely unusual split. Most design portfolios overclaim; this practice has built the *filing cabinet* for evidence — honest evidence boundaries ("supports / does not claim"), confidence labels, stated limitations, traceability references — which is rarer and better than most professional design work and even some academic writing. But the cabinet is mostly filled with **reasoned hypotheses, not gathered evidence**: self-referential sourcing, no external literature, no primary data, and an undocumented primary-observation method.

> **The defining metric of research maturity is the gap between two sub-scores:**
> **Synthesis strength ≈ 3.6 / 5** (systems thinking, framework extraction, transferability — genuinely strong)
> **Evidentiary strength ≈ 2.4 / 5** (evidence quality, source credibility, observation quality, methodology-in-practice — weak)
>
> **Practice-wide Research Maturity: RML 2.8 / 5 — between "Framed" and "Structured."** Strong as design synthesis; immature as evidenced research.

---

## The Research Maturity Scale (RML) used here

| Level | Name | Definition |
|---|---|---|
| RML 1 | Speculative | Idea/concept; no method, no evidence |
| RML 2 | **Framed** | Problem articulated, reasoned argument, evidence *boundaries* stated — but evidence is self-generated/theoretical |
| RML 3 | **Structured** | Explicit method, typed artifacts, traceable internal logic, honest limitations — but not externally validated |
| RML 4 | Evidenced | Backed by primary data with documented methodology; some external corroboration |
| RML 5 | Validated | Field-tested or peer-reviewed with measured, replicable outcomes |

Nothing in the practice reaches RML 4. The ceiling today is RML 3.

---

## Deliverable 1 — Research Maturity Score (per project)

Each dimension scored 1–5. **Ev**=Evidence quality · **Sr**=Source credibility · **Ob**=Observation quality · **Me**=Methodology · **Sy**=Systems thinking · **Fx**=Framework extraction · **Tr**=Transferability.

| Project | Ev | Sr | Ob | Me | Sy | Fx | Tr | Evidentiary | Synthesis | **RML** |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| **Architecture of Confidence** | 3 | 3 | 3 | 4 | 5 | 5 | 5 | 3.3 | 5.0 | **3 (top)** |
| **Environmental Systems Design OS** | 3 | 2 | 3 | 4 | 5 | 4 | 4 | 3.0 | 4.3 | **3** |
| **Responsive Ecologies** | 3 | 2 | 2 | 4 | 5 | 5 | 3 | 2.75 | 4.3 | **3** |
| **Wayfinding Matrix** | 2 | 2 | 2 | 3 | 4 | 4 | 3 | 2.25 | 3.7 | **2–3** |
| **Field Notes** *(the corpus)* | 3 | 3 | 3 | 2 | 3 | 2 | 3 | 2.75 | 2.7 | **2–3** |
| **Intention Engine** | 2 | 1 | 2 | 3 | 4 | 4 | 3 | 2.0 | 3.7 | **2** |
| **Adaptive Outdoor Hospitality** | 2 | 2 | 2 | 3 | 4 | 3 | 3 | 2.25 | 3.3 | **2** |
| **HADE** | 2 | 2 | 2 | 3 | 4 | 3 | 3 | 2.25 | 3.3 | **2** |
| **Digital Executor** | 2 | 1 | 1 | 2 | 3 | 2 | 2 | 1.5 | 2.3 | **1–2** |

**Reading:** every project shows the same shape — the right side of the table (synthesis) outscores the left (evidence) by ~1.2 points. **Architecture of Confidence** is the most research-mature (it studies *real, named* systems and extracts a transferable framework). **Field Notes** has the highest *evidentiary ceiling* (real primary observation) but the lowest methodology score (no protocol) — the practice's biggest unrealized asset. **Digital Executor** is the weakest on every axis.

---

## Deliverable 2 — Evidence Gaps (the seven dimensions)

1. **Source credibility — the most serious gap.** Sourcing is *circular*: Responsive Ecologies cites Architecture of Confidence, Adaptive Ranch, and ESD OS as its evidence — all authored by the same practice. Internal consistency is presented as external validation. Outside that loop, the only cited sources are **Reddit threads**. There is **no academic, industry, or third-party literature anywhere.** The one real external credential (the OhioLink Master's thesis) is on the homepage but never cited as evidence in the research itself.
2. **Evidence quality.** Claims are *designed*, not *demonstrated*. By the practice's own evidence boundaries: "modeled, not deployed," "concept architecture," "research-backed hypothesis," "not claimed: measured outcomes." Honest — but it means almost no claim is backed by outcome data.
3. **Observation quality.** The 41-country corpus is real, first-hand, longitudinal, cross-cultural primary observation — potentially the strongest evidence asset in the practice — but it is **undocumented as research**: no sampling logic, no field protocol, no coding, no analysis method. "Captured through my lens" is provenance, not methodology.
4. **Research methodology.** The *method to produce frameworks* is strong and explicit (ESD OS operating principles; AOC's Synthesis Engine). The *method to gather evidence* is absent — no data-collection or validation protocol is documented or executed. Methods like Wayfinding's 4-phase roadmap and Intention Engine's "guest-language studies" are **planned, never run**.
5. **Systems thinking — a genuine strength (avg ~4.4).** Multi-layer, multi-horizon, authority-aware models (Responsive Ecologies, AOC, Wayfinding). This is the practice's research signature.
6. **Transferability — strong where proven (avg ~3.2).** AOC's confidence mechanisms demonstrably transfer (reused in 5 projects). Most others *assert* transferability without testing it across domains.
7. **Framework extraction — strong (avg ~3.6).** Clean, named, reusable frameworks (Confidence Model, Signal Matrix, Transformation Blueprint, Domain Atlas). The extraction is excellent; what's missing is the *evidence the extracted frameworks are correct*.

**Special risk flag — Intention Engine** (lowest source score, 1): it makes **psychological claims** (burnout/transition/reflection states, "compression → restoration") with zero supporting literature. Psychology-adjacent claims without citations are the highest-liability gap in the practice; its own ethics framework ("does not diagnose," "limits of inference") is a mitigation but not evidence.

---

## Deliverable 3 — The Three Determinations

### Where evidence is weakest (fix first)
- **Digital Executor** (RML 1–2) — no observation, no method, duplicate framework. Weakest; consolidation candidate (per architecture review).
- **Intention Engine** — psychological claims with no sources.
- **All "concepts" and "builds"** on the evidentiary axis — Wayfinding, Adaptive Hospitality, HADE all sit at ~2.25; strong models, no data.
- **The circular-sourcing problem** weakens *every* synthesis project simultaneously, because they all draw on the same internal well.

### Where additional field research is needed (gather data)
- **Outdoor hospitality / stewardship** (Adaptive Hospitality, Responsive Ecologies): one **real-property study** — interviews + observation with operators, guides, and field crews — would lift three projects at once. RE's own `nextValidationSteps` already names this; it just hasn't been done.
- **Wayfinding**: the **comprehension study** and **opt-out/autonomy study** already specified in its roadmap — run Phase 1–2.
- **Intention Engine**: the **guest-language studies** already specified — do they describe desired change without adopting system vocabulary?
- **HADE**: usability + the ZK social-graph **feasibility/benchmark** test.

### Where stronger documentation is required (formalize what exists)
- **Field Notes corpus — top priority.** Convert 41 countries of observation into **documented research**: a stated capture protocol, a coding scheme, and a sample frame. This single act raises the evidentiary floor under the *entire* practice, because every framework ultimately claims to derive from these observations.
- **AOC's comparative study**: document the **selection criteria and analysis protocol** for the systems studied (Aspen One, Google Maps, Rick Steves) — turn an implicit comparison into a stated method.
- **A real bibliography**: even 10–20 external sources (environmental psychology, wayfinding/legibility research, decision-support and HCI literature, service-design canon) would move source credibility from 2 to 4 and break the circular loop.

---

## Deliverable 4 — Recommendations

1. **Break the circular citation loop.** Add a genuine literature base. Wayfinding → Lynch's legibility/imageability and environmental-psychology work; AOC → decision-support/HCI and trust-calibration literature; Intention Engine → restorative-environments research (it's directly relevant and would de-risk the psychology claims); stewardship → adaptive-management literature. Cite externally, then show how your frameworks extend or diverge.
2. **Document the corpus, then re-file it.** Give Field Notes a one-page research protocol (what's observed, how, where, limits) and move it to the Research tier (per the architecture review). It becomes the practice's evidentiary spine.
3. **Run one field study end-to-end.** Pick the highest-leverage validation already specified (RE's real-property review *or* Wayfinding's comprehension study) and execute it fully — protocol, data, findings, limitations. One completed study at RML 4 changes the practice's whole credibility profile more than ten new concepts.
4. **Adopt a standard evidence apparatus on every project page.** You already have the components (evidence boundary, confidence labels). Standardize them and add two fields each project currently lacks: **Method** (how the claim was reached) and **Sources** (external references). Make the strong habit universal.
5. **Separate "designed" from "evidenced" claims explicitly.** Your evidence-boundary blocks already gesture at this; make it a visible per-claim distinction (hypothesis vs. observed vs. validated). This converts the honesty you already practice into a credibility *asset*.
6. **Down-rank or consolidate the weakest research.** Digital Executor adds evidentiary risk without adding distinct evidence; fold it in (per architecture review).

---

## Deliverable 5 — Future Research Roadmap

**Phase 1 (0–6 mo) — Raise the evidentiary floor (documentation + literature; low cost).**
- Write the **Field Notes research protocol** + code a first tranche of the corpus.
- Build the **external bibliography** (15–25 sources) and retro-cite the three top projects (AOC, ESD OS, Responsive Ecologies).
- Document **AOC's comparative-analysis method**.
- Add **Method + Sources** fields to all nine project pages.
- *Target:* source credibility 2 → 3.5 across the practice; AOC and ESD OS reach solid RML 3.

**Phase 2 (6–18 mo) — Gather first primary data (one or two real studies).**
- Execute **one field study to completion** (recommended: Responsive Ecologies real-property review — it validates the flagship and, by lineage, AOC + Adaptive Hospitality together).
- Run **Wayfinding Phase 1–2** (landscape model + cue-comprehension study) and **Intention Engine guest-language study**.
- Publish each as a short, honest research write-up (method, data, findings, limits).
- *Target:* first projects reach **RML 4 (Evidenced)**; practice-wide RML 2.8 → ~3.3.

**Phase 3 (18–36 mo) — Validate and externalize.**
- Field-test a framework with **measured outcomes** (e.g., a bounded Wayfinding pilot, or a Confidence-Audit applied to a real client product with before/after measures).
- Seek **external corroboration**: a collaborator, an operator partner, a conference/journal submission, or an open dataset.
- *Target:* at least one asset at **RML 5 (Validated)**; the practice can credibly call itself research-backed, not concept-driven.

---

## Bottom Line

The synthesis is already publication-grade; the *evidence* is not. The fastest, cheapest credibility gains are **documentation and citation** (Phase 1) — they require no new fieldwork and immediately break the circular-sourcing problem. The single highest-leverage move overall is to **treat the 41-country corpus as real research**: document it, code it, cite it. It is the only primary evidence the practice owns, and right now it's both mis-filed and unwritten.

---

## Companion documents
- `research-practice-positioning-audit.md` — strategic positioning ("interesting projects" vs. "operating practice")
- `research-practice-ip-inventory.md` — IP matrix, priority ranking, IP roadmap
- `research-practice-architecture-review.md` — pipeline coherence, taxonomy, navigation
- `research-practice-evidence-audit.md` — this document (research maturity + evidence gaps)
