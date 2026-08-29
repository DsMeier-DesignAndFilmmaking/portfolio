# Whitetail Architecture Page — Content Audit & Operational Rewrite

> Scope: `/projects/whitetail-club/architecture` (tab 2 of 4).
> Objective: transform content framed as abstract design theory into operational stewardship
> architecture, grounded in luxury-resort landscape operations.
> Constraints: preserve all existing project facts; no rewrite from scratch; maintain premium
> portfolio tone; reduce speculative language; increase operational credibility.
> Status: **implemented** — see `app/projects/whitetail-club/{content.ts, architecture/page.tsx}`
> and the new `components/SystemsStack.tsx`.
> Date: 2026-08-29

---

## Executive Summary

The page was not wrong. It was **inverted**. It led with epistemology and left the operation to be
inferred — so a reader met *"a place becomes a condition, a condition informs a decision"* before
they met a single fungicide window, blowout deadline, or crew-hour shortfall. The result read as
speculative in exactly the places where the underlying work is most specific.

The fix is not new material. Nearly every operational fact needed to ground this page **already
existed in the case study** — sitting one tab away in `contextPoints`, or buried inside the research
corpus and never surfaced. The rewrite promotes that material to the front and lets the epistemic
argument arrive as its consequence rather than its premise.

**Three structural changes:**

1. **Five named systems become the page's spine** — Experience, Stewardship, Operations,
   Infrastructure, Intelligence. Each is anchored to a real operating domain in the operator's own
   vocabulary, not in design vocabulary.
2. **The existing three sections fold in beneath them.** "Epistemic Architecture" becomes
   *Intelligence Systems*; "Interaction Architecture" becomes *Experience Systems*. Section ids,
   numbering, diagrams, tables, and every fact are unchanged — only the framing moved.
3. **A stated scope boundary was added.** Four operating domains a resort-grounds reader will
   expect are named as deliberately absent, each with its reason. This is the single largest
   credibility gain on the page.

**One finding drove the whole shape of the work** and is documented in full below: of the nine
operational domains used as grounding, **five are attested, one is split, and three are not
attested at all.** Writing the unattested three as property facts would have violated the project's
own governance and, more importantly, would have reproduced the exact failure the case study is
about.

---

## Part 1 — Content Audit

### 1.1 Block-by-block classification

| # | Block | Classification | Disposition |
|---|---|---|---|
| 1 | `03 //` eyebrow: "System Architecture" | Abstract label | **Renamed** → "Stewardship Architecture" |
| 2 | Heading: "One loop, and three annotations that carry it." | Abstract theory — describes the diagram, not the operation | **Replaced** → "Five systems share one landscape, one crew, and one season." |
| 3 | Standfirst: *"A place becomes a condition, a condition informs a decision, a decision issues work…"* | **Abstract theory.** A closed grammatical loop with no operational referent. Reads as a diagram caption promoted to a thesis. | **Replaced** with two paragraphs: the five kinds of judgment, then the loop as their connective tissue |
| 4 | `LoopDiagram` component + `loopNodes` + `loopAnnotations` | **Fact to preserve** — the defining model | **Untouched.** Re-seated below the systems stack |
| 5 | Figure 01 image, dimensions, alt text | **Fact to preserve** | **Untouched** |
| 6 | Figure 01 caption | Mixed — operationally real ("built as working code rather than a picture") but opens abstractly (*"only an argument until something records into it"*) | **One clause reframed**; all four factual claims preserved verbatim |
| 7 | `04 //` eyebrow: "Epistemic Architecture" | Abstract label — the only section title on the site using a philosophy term | **Renamed** → "Intelligence Systems" |
| 8 | Heading: "Confidence appears as a reason, never as a score." | **Operational, and strong.** Survives as-is | **Kept verbatim** |
| 9 | Standfirst: *"A number invites comparison and hides its derivation. A sentence does neither."* | **Abstract theory.** True, well-written, and unearned — the claim arrives before any reader knows who is holding the number or why | **Demoted to second paragraph**; a named operating moment now precedes it |
| 10 | `confidenceBands` table (5 rows) | **Fact to preserve** — load-bearing, and each string is a tested artifact | **Untouched, verbatim** |
| 11 | Table trailing paragraph ("sort by time-to-close — a real magnitude") | Operational but unanchored — "time-to-close" is asserted as real without an example | **One clause added** naming what closes: blowout, spray window |
| 12 | `05 //` eyebrow: "Interaction Architecture" | Abstract label | **Renamed** → "Experience Systems" |
| 13 | Heading: "Four surfaces, and the answers that had to stay peers." | Operational | **Kept verbatim** |
| 14 | Standfirst: *"A completion question makes absence a sub-case of failure"* | Abstract theory — states the principle without the artifact it is about | **Expanded**: the principle now arrives after two concrete field cases |
| 15 | `LayerMap` + `answerValueMap` + trailing paragraph | **Fact to preserve** — the four/five distinction cost three project phases | **Untouched** |

### 1.2 What the page was missing entirely

Absent before the rewrite, and each present in the underlying research:

- **Any named operating domain.** The word "irrigation" appeared nowhere on the Architecture page
  despite being one of the property's two highest-stakes systems.
- **Any account of why five different kinds of judgment need one record.** The page asserted a
  single loop without establishing the plurality that makes a single loop non-trivial.
- **A scope boundary.** The Overview tab carries a boundary for *evidence*; the Architecture tab
  had none for *operational coverage*. A reader from the industry would immediately ask about snow
  clearing and lighting and find nothing — not even a refusal.

### 1.3 Speculative-language inventory

| Pattern | Count before | Treatment |
|---|---|---|
| Abstract subject + transformation verb ("a place *becomes* a condition") | 4 | Replaced with an actor and an action |
| Assertions about design in general rather than this design ("a number *invites* comparison") | 3 | Kept where load-bearing, but demoted below a concrete instance |
| Modal hedges ("would," "could," "may") outside the evidence boundary | 2 | Removed |
| Bare principle with no artifact ("makes absence a sub-case of failure") | 2 | Grounded in a valve and an inlet |

Hedging was **retained deliberately** in the evidence boundary and in the new scope boundary, where
uncertainty is the content rather than a weakness in it.

---

## Part 2 — Rewrite Recommendations

### 2.1 The evidence map — nine domains, three tiers

This is the governing constraint on every sentence added. `docs/whitetail/00-project-governance.md`
is the frozen source of record; it assigns each claim an evidence tier, and **G2 forbids converting
a design hypothesis into current operational fact.**

| Domain | Corpus status | Where it lands |
|---|---|---|
| Landscape maintenance / turf agronomy | **Attested `[SRC]`** — ~48-hour fall snow-mold window; "erosion compounds, mowing does not" | Stewardship Systems |
| Irrigation | **Attested `[SRC]`** — blowout "point of no return"; handheld moisture readings | Infrastructure Systems |
| Drainage | **Attested `[SRC]`** — "The Great Melt"; historic ditches poorly documented; buried utilities with incomplete as-builts; manual ice and debris clearing | Infrastructure Systems |
| Crew coordination | **Attested `[SRC]`** — seasonal turnover resets undocumented knowledge to zero; more work than crew-hours is the normal shoulder season; golf/parks/janitorial under one hierarchy; bilingual SOP requirement | Operations Systems |
| Equipment logistics | **Attested `[SRC]` but out of product scope** — enters the model only as crew capacity | Operations Systems, as a capacity ceiling only |
| Snow | **Split** — snow-storage easements and the winterization sequence are attested; **snow removal and plow routing appear nowhere in the corpus** | Winterization → Infrastructure; clearing → **boundary** |
| Pathway / trail management | **Not attested.** A trail network was claimed in an earlier draft and *removed as untraceable*; `TRAIL` was dropped as an entity type | **Boundary** |
| Exterior lighting | **Not attested at any tier** — zero occurrences across the entire corpus | **Boundary** |
| Member property maintenance | **Not attested**; guest-facing scope is on the project's rejection list | **Boundary** |

**Recommendation adopted:** the three unattested domains and snow-clearing appear on the page **as a
stated boundary, never as claims.** This costs nothing in credibility and gains a great deal — the
case study's existing argument is that refusal is a design act, and a boundary section is that
argument applied to itself.

### 2.2 Three publication rules observed

1. **No diversion or acreage figures.** A legal cap is not a measurement (G6), and the governance's
   own anti-drift rule states that any artifact *leading* with a legal or hydrological fact has
   drifted. Verified absent.
2. **No fleet financials.** The lease structure is commercially sensitive — the instruction is to
   use the structural insight, not the numbers. The page says *"a leased fleet under contractual
   usage ceilings,"* never the hour figure or lease terms.
3. **No internal band vocabulary.** The five internal confidence-band names must never appear as
   interface or page strings; the project already caught one near-miss where a phrase echoed a
   band name through a synonym. Re-verified by grep after the rewrite — zero new occurrences.

### 2.3 The five-system mapping

| System | Operating domain | Grounded in | Carried by |
|---|---|---|---|
| **Experience Systems** | The field encounter | Gloved hand, flat light, bilingual crew, minutes between jobs | Place · Capture |
| **Stewardship Systems** | Turf, forest buffer, shoreline | ~48-hour snow-mold window; erosion compounds while mowing does not; handheld readings and a walk | Condition · Observation |
| **Operations Systems** | Crew hours, turnover, equipment availability | One grounds hierarchy over golf/parks/janitorial; compressed 4–5 month window; work exceeds crew-hours; reactive repair load | Decision · Task — **capacity only; no individual is modeled** |
| **Infrastructure Systems** | Irrigation, drainage, snow storage, winterization | Blowout point past which mainlines crack; runoff through undocumented ditches and buried utilities; hand clearing; access designated before the ground closes | Place, by regime — **no sensors, no telemetry, no network model** |
| **Intelligence Systems** | What the operation knows, and how well | Turnover resets undocumented knowledge on a schedule; decision reasoning is the artifact that does not exist today | Knowledge record · Decision reasoning |

Two `holds` lines carry an explicit negation (`no individual is modeled`, `no sensors, no telemetry`).
These are not disclaimers bolted on — they are the load-bearing refusals, stated where a reader is
most likely to assume otherwise.

### 2.4 Before → after, in register

| Before | After |
|---|---|
| "A place becomes a condition, a condition informs a decision, a decision issues work…" | "Turf agronomy, crew sequencing, irrigation and drainage, the field encounter itself, and the memory that has to outlast the season are five different kinds of judgment — and they all resolve on the same ground, inside the same four-to-five-month window." |
| "A number invites comparison and hides its derivation. A sentence does neither." *(as the opening claim)* | "A superintendent holding a forty-eight-hour fungicide window before dawn does not need a number attached to the moisture reading. They need to know who last stood there, when, and whether anything since then disagrees." *(the abstract claim now follows)* |
| "Place, Capture, Decision, Attention." *(bare enumeration)* | "Four surfaces, no fifth, because a crew member standing at a valve box in flat light is running one errand, not navigating a product." |
| "A completion question makes absence a sub-case of failure." | "A valve that isn't where the old drawing puts it, an inlet nobody can locate under spring debris: a completion question files all of it under failure." |
| *(nothing)* | "A resort grounds operation is larger than the five systems above. Four domains a reader will reasonably expect are absent, and each is absent for a stated reason rather than an unstated one." |

### 2.5 What was deliberately not changed

- Visual design. Per `docs/whitetail/16-tw12-resolution.md` §7.1 it remains unauthorized; the new
  component reuses existing radii, borders, type, and the amber accent already in `LoopDiagram`.
- Section numbering (`03/04/05`) — the site runs one continuous `01…11` sequence across four tabs.
- Section ids (`wt-system`, `wt-epistemic`, `wt-interaction`) — inbound anchors and the scrollspy
  contract survive. Only the rail labels changed: `System/Epistemic/Answers` → `Systems/Intelligence/Experience`.
- Every diagram, table, and figure, and every string inside them.

---

## Part 3 — Revised Copy

### 03 // Stewardship Architecture

**Five systems share one landscape, one crew, and one season.**

> A property like this is not one operation. Turf agronomy, crew sequencing, irrigation and
> drainage, the field encounter itself, and the memory that has to outlast the season are five
> different kinds of judgment — and they all resolve on the same ground, inside the same
> four-to-five-month window.
>
> What connects them is not a dashboard. It is a single record of place: a condition is observed, a
> decision is made and its reasoning kept, work is issued, and what the crew found comes back as the
> context on the next decision at that same place. Strip the reasoning out and this is a work-order
> system.

**01 · The field encounter — Experience Systems**
> What a person meets while standing on the place, in the minutes they have before the next job.
> Designed for a gloved hand, flat morning light, and a crew that is bilingual by requirement — so
> the surface answers "what is here and what has already been tried," and asks one question back.
> *Place · Capture*

**02 · Turf, forest buffer, shoreline — Stewardship Systems**
> The agronomic judgment that has to be right the first time. A fall snow-mold application has
> roughly forty-eight hours; erosion compounds while mowing does not. These calls are made on
> handheld readings and a walk, which is why every condition carries how it came to be known.
> *Condition · Observation*

**03 · Crew hours, turnover, equipment availability — Operations Systems**
> Golf, parks, and janitorial work under one grounds hierarchy across a compressed four-to-five-month
> window. More necessary work than available crew-hours is the normal state of a shoulder season, and
> a leased fleet under contractual usage ceilings with a mechanic absorbed by reactive repair sets
> the real ceiling on what a day can hold.
> *Decision · Task — capacity only; no individual is modeled*

**04 · Irrigation, drainage, snow storage, winterization — Infrastructure Systems**
> The continuous physical systems underneath the landscape. Irrigation blowout has a point past which
> mainlines crack. Spring runoff moves through historic ditches whose paths are poorly documented and
> past buried utilities with incomplete as-builts, and it is cleared of ice and debris by hand. Snow
> storage and emergency access are designated before the ground closes.
> *Place, by regime — no sensors, no telemetry, no network model*

**05 · What the operation knows, and how well — Intelligence Systems**
> The layer that survives the season. Seasonal turnover resets the undocumented knowledge of this
> landscape to zero on a schedule, and the reasoning behind a decision is the artifact that does not
> exist in this operation today. Every other system above deposits into this one or reads from it.
> *Knowledge record · Decision reasoning*

**Stack closer**
> Five systems, one landscape, one record. They are not five products — they are five kinds of
> judgment that have to survive the same crew change, and the loop below is what carries them.

**Figure 01 caption** *(opening clause revised; all factual claims preserved)*
> The loop above is only an argument until a crew member records into it, gloves on, between jobs.
> This is the surface that closes it — the Observation step, drawn. All four answers carry identical
> weight, and none is a default. There is no separate submit control — answering *is* completing.
> This is also the surface on which the project's hardest finding later surfaced, because it was
> built as working code rather than a picture.

**What this architecture does not cover** *(new)*
> A resort grounds operation is larger than the five systems above. Four domains a reader will
> reasonably expect are absent, and each is absent for a stated reason rather than an unstated one.

- **Snow clearing as scheduled labor** — Snow storage is modeled as a place and winterization as a
  window, because both are attested. Plow routes, clearing crews, and priority orders are not, so
  they are not designed.
- **Pathway and trail networks** — Paths and roads exist here only as located segments. A
  recreational trail network appeared in an earlier draft of this work and was removed as
  untraceable to any source — designing around one would have made the case study dishonest.
- **Exterior lighting** — Absent from the research at every tier. Adding it would be invention, and
  invention is the specific failure this project was built to resist.
- **Member property maintenance** — Residential landscape sits inside the same operation, but
  homeowner-facing service carries a different duty of care and a different product. Out of scope by
  decision, not by oversight.

### 04 // Intelligence Systems

**Confidence appears as a reason, never as a score.** *(heading unchanged)*

> A superintendent holding a forty-eight-hour fungicide window before dawn does not need a number
> attached to the moisture reading. They need to know who last stood there, when, and whether
> anything since then disagrees. That is a sentence, not a score.
>
> A number hides its derivation and invites comparison across places that were never measured the
> same way. Render a band name as a chip and it becomes a score by social convention — people start
> saying "it's an amber one," and the ranking returns through language with no number present.

*Confidence table — all five rows preserved verbatim.*

**Table closer** *(one clause added)*
> The internal vocabulary behind these sentences never reaches the interface. Lists sort by
> time-to-close — a real magnitude, and the one an irrigation blowout or a closing spray window
> actually runs on — never by confidence, because sorting five explanations converts them into a
> scale.

### 05 // Experience Systems

**Four surfaces, and the answers that had to stay peers.** *(heading unchanged)*

> Place, Capture, Decision, Attention. Four surfaces, no fifth, because a crew member standing at a
> valve box in flat light is running one errand, not navigating a product.
>
> The field question is "what did you find?" — never "did you complete this?" A valve that isn't
> where the old drawing puts it, an inlet nobody can locate under spring debris: a completion
> question files all of it under failure. A finding question makes it one of four answers — and
> absence is the answer this landscape most needs recorded.

*Layer map — four peer answers to five stored values, preserved unchanged.*

---

## Verification Performed

| Check | Result |
|---|---|
| `npm run build` | Passes; `/projects/whitetail-club/architecture` prerenders static |
| Fact preservation (`git diff content.ts`) | Only deletions in the file are the three scrollspy labels. `loopNodes`, `loopAnnotations`, `confidenceBands`, `answerValueMap`, `evidenceBoundary`, `reviewFindings`, `contextPoints`, `insufficientRows`, `practicePoints`, `HERO`, `THESIS`, `GUARDRAIL` untouched |
| Band-vocabulary grep (TW-1) | Zero new occurrences; all hits pre-date this change |
| Forbidden figures grep | No diversion/acreage figures, no fleet hour or lease terms |
| Rendered content | Five systems in order; boundary strip present; confidence table five rows verbatim; layer map four answers → five values with the branch on row four |
| Console errors | None |
| Mobile 375×812 | No horizontal overflow (`scrollWidth === innerWidth === 375`); systems stack collapses to one column |
| Scrollspy | Rail relabelled Systems / Intelligence / Experience; ids and document order unchanged |

## Open Items

1. **Visual design remains unauthorized** under the Phase 12/13 entry criteria. This change is copy
   and content structure only.
2. **Operational grounding is `[SRC]`, not `[VF]`.** No primary document is held for any operating
   detail on this page. If the tier system is ever surfaced publicly, these lines carry `[SRC]`.
3. The scope-boundary block is the natural place to add a fifth row if fleet or equipment lifecycle
   is ever raised by a reader — the material exists, and the reason for its exclusion is already
   documented in the research.
