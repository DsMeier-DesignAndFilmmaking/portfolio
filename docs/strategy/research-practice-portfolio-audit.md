# Portfolio Strategic-Alignment Audit

**Role:** Creative Director / Practice Director review
**Benchmark:** `research-practice-operating-manual.md`
**Red-team corrections applied:** `research-practice-redteam-audit.md`
**Grounded in:** live codebase (`data/projects.ts` + actual file structure)
**Date:** 2026-06-25

---

## Two findings that frame everything

**1. Build investment is inversely correlated with strategic value.**

The actual file structure proves it:

- **The Architecture of Confidence — the flagship, the #1 revenue asset (composite score 4.8) — is a stub.** Just `layout.tsx` + `page.tsx`. No content module, no components.
- **HADE (`travel-and-ai`) — a speculative experimental build the strategy says to *park* — is the most elaborately built page in the entire practice:** `SystemOrchestrator`, `SessionTimeline`, `SpontaneityHero`, a `constants.ts`, and sub-routes.
- The **beachhead concept (Adaptive Ranch) — the one project the strategy says to fund to a real pilot — is also a stub.**

Effort has gone to the unvalidated and speculative while the assets that actually sell and position the practice are thin or unbuilt. This is the red-team's "polishing concepts instead of getting clients," made literal in the directory tree.

**2. Seven client-work projects ship with copy-paste placeholder summaries.**

McDonald's Kiosk, Nodalytics, Newdea, AdviseStream, Sphere Software, Havas, and Rich Products all carry the identical line: *"A digital platform designed to connect healthcare professionals and resources across developing nations."* A McDonald's kiosk is not a healthcare platform. This is a live factual-integrity defect on the site.

---

## Complete Project Inventory + Scorecard

Scores 1–5 (5 = strongest). Scoring the **page as it currently exists**, benchmarked against the Operating Manual and held honest by the red-team (concepts are capped — none has been piloted).

### Track 1 — The Practice (Independent Research)

| # | Project | Current type | Built? | Align | Narr | Biz | Career | Rev | Verdict |
|---|---|---|:--:|:--:|:--:|:--:|:--:|:--:|---|
| 1 | **Architecture of Confidence** | Framework | **Stub** | 5 | 2¹ | 5 | 4 | 5 | **ELEVATE + BUILD** |
| 2 | **Environmental Systems Design OS** | Research OS | Rich | 5 | 3 | 3 | 4 | 3 | **ELEVATE → method home** |
| 3 | **Field Notes** | Exp. Build | Thin | 5 | 2² | 4 | 4 | 3 | **RE-FILE → Research** |
| 4 | **Adaptive Outdoor Hospitality Companion** | Concept | **Stub** | 5 | 4 | 4 | 3 | 4 | **FUND → pilot** |
| 5 | **Responsive Ecologies** | Concept (Flagship) | Rich | 5 | 3 | 4 | 4 | 4 | **SPLIT → extract framework** |
| 6 | **Wayfinding Matrix** | Concept | Rich | 4 | 2³ | 2 | 3 | 3 | **EVOLVE + demote** |
| 7 | **Intention Engine** | Concept | Rich | 3 | 1³ | 3 | 2 | 3 | **EVOLVE → de-risk** |
| 8 | **HADE** (`travel-and-ai`) | Exp. Build | **Over-built** | 3 | 3 | 2 | 3 | 2 | **PARK / DEMOTE** |
| 9 | **Digital Executor** | Exp. Build | Thin | 3 | 3 | 3 | 2 | 3 | **MERGE → Recovery** |

¹ *AOC's summary is the best-written on the site, but the page is a stub so the story isn't actually delivered. The score reflects the page, not the potential.*
² *Field Notes is framed as "a place-aware product" — product framing that buries the fact that this is the 41-country corpus, the practice's most defensible asset.*
³ *Narrative penalized for live, unsupported jargon and unvalidated claims (see dispositions below).*

### Track 2 — Client Work (13 projects, scored as a group)

| Group | Align | Narr | Biz | Career | Rev | Verdict |
|---|:--:|:--:|:--:|:--:|:--:|---|
| **All prior client work** | 2 | 2⁴ | 2 | **5** | 1 | **CURATE to 4–6 + fix copy** |

⁴ *Dragged down by the seven identical placeholder summaries. Career value is genuinely high — a decade of shipped product work — but the track is almost entirely digital UX, which is the exact positioning the practice is trying to transcend. It supports the career path strongly and the practice narrative weakly.*

---

## Per-Project Dispositions

For every project: Does it reinforce the practice? Dilute positioning? Belong in its current category? What should it become?

---

### 1 · Architecture of Confidence
**Verdict: ELEVATE + BUILD (immediate)**

Reinforces ✓✓ — it *is* the practice's spine and the #1 commercial asset. The page dilutes only by being empty. A first-time visitor arrives at the practice's most important IP and finds nothing substantial.

- **Belongs in category?** Yes — Framework is correct.
- **Should it evolve?** Into the flagship. This should be the most complete, most polished page in the entire practice.
- **Should it become a consulting asset?** It already is — the Confidence Audit offer lives here. The page needs to reflect that.
- **Should it become a product?** The workshop, toolkit, and course all anchor here.
- **Recommended improvement:** Build it out with the full framework architecture — the principles, the decision model, the five dimensions, the evidence boundary, and a clear consulting offer. The AOC pillar essay lives here, not in a separate blog post.

---

### 2 · Environmental Systems Design OS
**Verdict: ELEVATE → become the method home**

Reinforces ✓✓ — this is the evidence layer and the operating instrument. Well-built (the richest content architecture in the practice). Currently reads as a "project" when it is the practice's operating system.

- **Belongs in category?** Research OS is correct but "OS" positions it as a tool, not a foundation.
- **Should it evolve?** Into the home of the Ground Truth methodology — the Methodology page the manual says is missing. Reframe from "this is how I organize my work" to "this is the method the entire practice runs on."
- **Recommended improvement:** Add the Ground Truth loop diagram and the 9 × 5 discipline grid; make it the entry point for understanding how the practice works, not one project among nine.

---

### 3 · Field Notes
**Verdict: RE-FILE → Research**

Reinforces ✓✓ — this is the 41-country corpus, the practice's uncopyable moat. Mis-categorized and mislabeled in two ways: filed under "Experimental Build" (wrong — it's the research foundation, not a product experiment) and framed as "a place-aware product" (wrong — it's the field-research corpus).

- **Belongs in category?** No — should be Research, not Experimental Build.
- **Should it evolve?** Into the documented, citable corpus. The red-team audit is blunt: right now it's a travel history, not a research corpus. The re-filing is a signal of intent; the documentation is the actual work.
- **Recommended improvement:** Refile to Research; rewrite the summary to lead with the corpus framing ("41 countries of field observation, coded and documented") rather than the product framing.
- **Critical caveat:** Don't claim the corpus is a research moat until it's documented with a protocol. The re-filing and the copy change are correct; the documentation investment is what makes the claim true.

---

### 4 · Adaptive Outdoor Hospitality Companion
**Verdict: FUND → pilot (execution, not content)**

Reinforces ✓✓ — dead-center beachhead, honestly labeled "a concept, not a shipped product." This is the one project the execution plan says to push from concept to pilot.

- **Belongs in category?** Concept is correct today; the goal is to move it to Implementation.
- **Should it evolve?** Into the first case study — the practice's first completed, measurable Ground Truth loop.
- **Should it become a consulting asset?** It already is the beachhead engagement. The thin page is fine right now; the work is the pilot, not the page.
- **Recommended improvement:** Nothing on the page until there's a real pilot. Then publish the retrospective here. Don't invest build time on this page — invest it on the outreach the execution plan specifies.

---

### 5 · Responsive Ecologies
**Verdict: SPLIT → keep narrative / extract Bounded Authority**

Reinforces ✓✓ as the integrative flagship thesis — the most systems-complete thinking in the practice. The summary overclaims: *"autonomously generate adaptive trail maintenance schedules and wildlife-safe guiding corridors"* is a capability no unbuilt platform has demonstrated.

- **Belongs in category?** Concept, correct — but should be elevated above the other concepts as the flagship synthesis.
- **Should it become a framework?** Its components (confidence model, decision hierarchy, authority routing) already are frameworks — they're just trapped inside a concept that reads as a product pitch.
- **Should it merge with another project?** No — split, not merge.
- **Recommended improvement:** Keep RE as the narrative flagship and integrative thesis. Extract "Bounded Authority" — the confidence-gated, human-in-the-loop AI decision governance model — into its own Framework page. Revise the RE summary to remove the "autonomous" overclaim; reframe as "a proposed architecture, not a shipped platform."

---

### 6 · Wayfinding Matrix
**Verdict: EVOLVE + demote**

On-brand but dilutive in its current form. Three problems:
1. Jargon (*"Hushpitality," "Intentional Spontaneity"*) reads as invented marketing, not design research.
2. A promise to deliver *"safety nets"* for guests in remote wilderness without validating the biometric/hardware stack is a live liability and credibility risk.
3. The hardware and sensor-network dependencies make this undeliverable solo without capital and partners.

- **Belongs in category?** Concept is correct.
- **Should it evolve?** Into the **Signal Matrix framework** (a consulting/toolkit asset) + a bounded pilot proposal for one specific partner/operator.
- **Should it become a consulting asset?** The Signal Matrix — the framework that predicts what information guests need at what moment, for what context — is genuinely sellable as a wayfinding systems consulting engagement. The hardware is what isn't.
- **Recommended improvement:** Strip the jargon; rewrite the summary to separate the framework (sellable today) from the platform (a future, partner-funded option); demote from parity with the richer concepts.

---

### 7 · Intention Engine
**Verdict: EVOLVE → de-risk (most dilutive page on the site)**

The most credibility-damaging page in the practice as currently written. It claims to *"translate abstract human psychological states (burnout, transition)"* through a *"semantic discovery engine"* — an AI that infers internal psychological states from ambient signals without any validation study, psychiatric literature, or informed-consent framework. Wrapped in *"Whycations"* and *"Zero-Search Discovery."*

This is the highest-liability combination: psychological inference + automation + no evidence + jargon branding.

- **Belongs in category?** Concept, yes — but the copy frames it as a live product.
- **Should it evolve?** Remove the AI-infers-your-psychology claim entirely. Keep the **Transformation Blueprint** (the 9-dimension framework a designer or operator fills out manually) — that's immediately billable, safe, and validated-by-use. Make the validation a research study, not a product feature.
- **Should it become a consulting asset?** The Blueprint is already a consulting deliverable. Pitch that, not the engine.
- **Should it become research?** The psychological states taxonomy (Burnout/Transition/Curiosity/Reflection) needs validation before it is safe to publish as a mechanism. Run a guest-language study; publish the findings.
- **Recommended improvement:** Hard rewrite. Lead with the Transformation Blueprint as a design methodology. Relegate the AI engine concept to "a future direction contingent on validation." Cut all jargon.

---

### 8 · HADE (travel-and-ai)
**Verdict: PARK / DEMOTE**

Over-built and off-strategy. The `SystemOrchestrator`, `SessionTimeline`, and `SpontaneityHero` components represent real engineering investment in the *most speculative, least commercially validated project in the practice.* The summary ("adaptive decision-support engine that interprets live context signals") is generic enough to describe a dozen existing products — it doesn't differentiate.

- **Belongs in category?** Experimental Build, correct — but "experimental" should mean "validates a hypothesis," not "complex unvalidated architecture."
- **Should it merge?** Its decision-support mechanics could inform the Architecture of Confidence or HADE-as-component-of-AOC — but not as a standalone project.
- **Recommended improvement:** Stop investing build time here. Archive or quietly demote in the navigation. If HADE's ZK-graph reasoning is genuinely interesting, document it as a technical note under AOC.

---

### 9 · Digital Executor
**Verdict: MERGE → Recovery Architecture**

A thin but on-brand project. Its core mechanic (coordination and recovery when plans break, vendors hand off, and next steps become unclear) *is* the Recovery Architecture framework applied to a specific context. As a standalone project it's too narrow to carry its own page. As a worked example of Recovery Architecture it's perfect.

- **Belongs in category?** Experimental Build — marginally correct, but the recovery mechanism is the real content.
- **Should it merge?** Yes — into a proper **Recovery Architecture framework page** as its primary worked example.
- **Should it become a framework?** That page (Recovery Architecture) is what's missing; Digital Executor is its evidence.

---

## Client Work — Specific Dispositions

| Project | Keep / Curate / Remove | Why |
|---|---|---|
| **Purdue** | **Keep** — lead | Higher ed digital systems; on-brand for complexity; real shipped work |
| **TimberTech** | **Keep** | Commerce-scale redesign; shows production fidelity |
| **Intel** (sustainability tracker) | **Keep** | Environmental + enterprise intersection — strongest career/practice bridge in the client track |
| **McDonald's Kiosk** | **Curate** | Real product design credential; fix the placeholder copy |
| **Healthcare** | **Keep or curate** | Strongest humanitarian story; fix copy |
| **Nodalytics** | **Evaluate + curate** | Emerging tech — useful if the case study is strong; fix the placeholder copy |
| **DoubleGood** | **Curate** | Mobile commerce; low strategic alignment; keep only if case study is strong |
| **AdviseStream, Newdea, Sphere, Havas, Rich Products** | **Curate or archive** | All carry placeholder copy; low strategic alignment; pick the 1–2 with the strongest case study or archive the rest |

**The Intel sustainability tracker is the most under-leveraged client project.** It sits at the intersection of environment, enterprise, and systems design — exactly the positioning the practice is trying to establish — and it's barely distinguished from the others. Elevate it.

---

## Missing Projects (white space the portfolio lacks)

| Missing asset | Strategic priority | Cost |
|---|---|---|
| **Ground Truth / Methodology page** | **Highest** — the operating manual for the entire practice | Low (content exists; needs a page + diagram) |
| **Bounded Authority framework page** | **High** — highest-value packaging move | Low (extract from Responsive Ecologies) |
| **Recovery Architecture framework page** | **High** — top-3 commercial framework, currently fragmented | Low (merge Digital Executor + Recovery content from AOC) |
| **One Implementation / case study** | **High** — the structural credibility gap | High (requires a real pilot — gated on execution plan) |
| **A pure-digital, <90-day concept** | Med (later) | Med — not now; gated on validation |

The category map today: Frameworks holds **1 of the ~4 it should** (AOC; Bounded Authority, Recovery, and Evidence OS are all missing as pages). Research is **empty of its anchor** (Field Notes misfiled). Concepts is **full** (4, all at "architected," none piloted). Implementation **doesn't exist.**

---

## Redundant / Dilutive (explicit list)

- **Digital Executor ↔ Recovery Architecture** — redundant as a standalone; merge.
- **HADE** — over-built and off-thesis; demote.
- **7 client summaries with identical copy** — live factual-integrity defect; fix before any new build.
- **Enterprise client cluster** (AdviseStream, Newdea, Rich Products, Havas, Sphere Software) — thin, low-alignment in bulk; curate to the 1–2 with the strongest cases.
- **Orphan route:** `app/projects/timbertech/` exists separately from the canonical `app/projects/previous/timbertech/` — likely legacy; verify and remove.
- **Jargon layer:** Hushpitality · Whycations · Zero-Search Discovery · Soft Adventure · Predictive Agentic Modeling · Intentional Spontaneity — collectively signals invention over evidence; remove from a credibility-led practice.

---

## Prioritized Portfolio Evolution Roadmap

### Tier 0 — Corrections (days, near-zero cost, highest urgency)
1. **Fix the 7 duplicate client summaries** (factual integrity — must-do before any outreach or sharing)
2. **Re-file Field Notes → Research**; rename "Experimental Build" → "Implementation" in `data/projects.ts`
3. **Strip the jargon and delete the unsupported psychology claim** from Intention Engine and Wayfinding Matrix copy
4. **Remove "autonomously generate"** overclaim from Responsive Ecologies summary

### Tier 1 — Extraction & build (weeks, high-leverage, low cost)
5. **Build out Architecture of Confidence** into the real flagship page (it is currently a stub with the highest strategic priority in the practice)
6. **Extract Bounded Authority** into its own framework page
7. **Create Recovery Architecture page**; merge Digital Executor in as its worked example
8. **Add the Ground Truth / Methodology page**; reframe ESD OS as its home

### Tier 2 — Proof (the structural gap; gated on market validation)
9. Push **Adaptive Ranch** from concept → pilot → the first **Implementation case study** (gated by the execution plan — outreach and buyer validation precede this investment)

### Tier 3 — Curation & demotion
10. **Demote HADE** and the Responsive Ecologies *platform*; park Wayfinding's hardware
11. **Curate client work** to 4–6 strongest; lead with Intel (environment/systems bridge), Purdue, TimberTech; archive or consolidate the placeholder entries
12. **Verify and remove** the orphan `app/projects/timbertech/` directory

### Tier 4 — White space (later, gated)
13. Add one pure-digital, <90-day concept for proof of framework transfer and a quick portfolio win

---

## One-Sentence Verdict

The portfolio's *thinking* is well-aligned, but its *investment* is backwards — build effort has gone to speculative concepts while the flagship framework, the proof stage, and the method itself remain unbuilt; the highest-return moves are almost entirely cheap re-categorization, copy fixes, and extraction, not new construction.

---

## Companion documents
- `research-practice-operating-manual.md` — strategic benchmark for this audit
- `research-practice-redteam-audit.md` — red-team corrections applied throughout
- `research-practice-execution-plan.md` — the sequenced plan this audit feeds into
- `research-practice-framework-commercialization.md` — framework scoring and commercial potential
- `research-practice-concept-portfolio.md` — concept maturity and disposition (FUND/HARVEST/PARK/EXTRACT)
