# 00 — Project Governance

## Whitetail Club & Shore Lodge — Stewardship Intelligence System

**Status:** **Binding.** This document governs every subsequent design decision in this project.
**Precedence:** Where this document conflicts with any other project artifact — including [`research-to-design-handoff-v3.md`](research-to-design-handoff-v3.md), [`01-system-planning.md`](01-system-planning.md), or [`source-register.md`](source-register.md) — **this document wins**, and the conflicting artifact is corrected. Conflicts identified at adoption are listed in [§12](#12--conflicts-resolved-at-adoption).
**Numbered `00` deliberately:** it precedes the planning document because it constrains it.

---

## 1 — Central design thesis *(LOCKED)*

> ### How can digital product design make a complex, changing physical landscape more legible, actionable, and knowable to the people responsible for stewarding it?

**This is not a water-rights case study.** It is not a compliance case study, a hydrology case study, a regulatory case study, or an environmental-impact case study. It is a **product design case study about landscape legibility and institutional knowledge.**

### Core design territory *(in scope as subject)*

Spatial legibility · changing landscape conditions · seasonal transitions · stewardship decision-making · institutional knowledge · field observation · human-centered operational systems.

### Supporting context *(in scope as evidence, never as subject)*

Water rights · hydrology · utilities · climate data · regulatory frameworks · municipal records · legal entity structure.

These make the environment credible. **They do not make the product.**

### The Gravity Test

Strong external evidence exerts gravity. A well-documented legal constraint is more *citable* than a crew member's undocumented mental map of which green thaws last — and a project that follows citability instead of thesis will quietly become a case study about the thing that was easiest to source.

Before any fact, constraint, or dataset enters the design, apply:

> **Does this help someone responsible for this landscape understand it, decide about it, act on it, or remember it?**
>
> - **Yes** → it may enter the design as a condition or context the system helps a person reason about.
> - **No, but it makes the environment more credible** → it is background. It may appear in narrative. **It may not generate a capability, a workflow, or a screen.**

**Worked example — the one that matters.** The 1.78 CFS diversion limit and 89-acre irrigation cap are real, well-attested, and genuinely interesting. Under the Gravity Test:

| Framing | Verdict |
|---|---|
| *"The system helps a superintendent understand how much water this zone has actually received and decide where to target the next application."* | **In scope.** A stewardship decision, made legible. |
| *"The system tracks diversion against the legal ceiling and reports compliance."* | **Out of scope as subject.** That is a compliance product. It may exist as *context* on a decision surface — never as the reason the product exists. |

The water right is a **condition the landscape operates under**, on the same footing as snowpack, frost windows, and fire season. It is not the case study's spine.

### Anti-drift rule

**No single external document may become the project's organizing constraint.** If a future artifact's problem statement, primary design principle, or headline instruction leads with a legal, regulatory, or hydrological fact, it has drifted, and it is corrected against §1.

---

## 2 — Design-phase research boundary

> **The project has sufficient evidence to begin systems modeling.**

This is a finding, not a permission slip. Phase 01 established a system model, a role model, eight decisions, an information model, four experiences, and three workflows — all from evidence already held. **The conceptual system is constructible today.**

The failure mode this boundary exists to prevent is not ignorance. It is **research as productive-feeling avoidance of design** — the pattern where each new fact reveals two more gaps and the modeling never starts. The project has a rich corpus and an unbounded external record available to it. Without a stop rule, it will keep reading.

### Three classifications

Every information need is classified into exactly one:

| Class | Definition | Effect on Phase 02 |
|---|---|---|
| **REQUIRED FOR DESIGN** | Necessary to construct a defensible conceptual system. Without it, the model cannot be built or would be built wrongly. | **Blocking.** Stop and resolve. |
| **USEFUL FOR STRENGTHENING** | Would improve environmental or operational richness, but the system model stands without it. | **Non-blocking.** Pursue opportunistically or never. |
| **REQUIRED FOR PUBLICATION** | Needed to substantiate a specific claim intended for a public surface. | **Blocking for that claim only** — not for design. Unsubstantiated claims are cut or demoted, not researched into existence. |

### Current classifications

| Item | Class | Note |
|---|---|---|
| Water Right No. 78-12476 | **Useful for Strengthening** / *potentially Required for Publication of specific claims* | **Explicitly NOT Required for Phase 02 Design.** Needed only if a published claim quotes the diversion figure or the county-line discrepancy. |
| City of McCall planning records | **Useful for Strengthening** / *potentially Required for Publication of specific claims* | Same. Would firm up spatial figures if a published claim depends on one. |
| Audubon ACSP certification status (Q-E) | **Required for Publication** | Only if the case study asserts the property is certified. Otherwise drop the claim. |
| Adams/Valley county-line discrepancy (Q-D) | **Required for Publication** | Do not publish either way unread. Design does not depend on it. |
| Shore Lodge operational detail | **Useful for Strengthening** | A known gap. Handled by scoping honesty ([§8](#8--property-model)), not by new research. |
| Relationship provenance (Q-A) | **Required for Publication** | See [§7](#7--relationship-to-the-property). Design proceeds. |
| Anonymization decision (Q-F) | **Resolved** — permanent constraint | See [§6](#6--privacy--anonymization). No longer open. |
| Recovery of `[U:2]` / `[U:5]` (Q-C) | **Useful for Strengthening** | Would restore removed claims. Nothing depends on it. |

**Nothing is currently classified Required for Design.** That is the finding that authorizes Phase 02.

---

## 3 — Research stop rule

> **Additional research is introduced only when it would materially change one of four things.**

1. **The system model** — a node, a relationship, or the shape of the loop.
2. **A core user need** — what a role must know, decide, or do.
3. **A design constraint** — something the system must accommodate or must not do.
4. **A claim intended for publication** — substantiating a specific public assertion.

**"Material" means the design changes.** If a fact would be interesting to know but nothing downstream moves, it fails the test.

### Prohibited research patterns

- Research to accumulate facts.
- Research to feel more confident about a decision already defensible.
- Research to resolve an ambiguity that has already been handled by scoping honestly.
- Research that begins with a source and looks for a use *(this is how §1 drift starts)*.
- Research substituting for a design decision the evidence already supports.

### Procedure

Before opening a new source, write one sentence: **"This is needed because it would change ____."** If the blank cannot be filled with a specific model element, user need, constraint, or named publication claim — **stop.**

If research is undertaken and returns nothing material, that is a valid and closing result. **Record it and do not revisit.**

---

## 4 — Evidence taxonomy

Six claim tiers. **Every claim on every surface — internal or public — carries exactly one.**

| Tag | Tier | Definition | Test |
|---|---|---|---|
| **`[VF]`** | **Verified Fact** | Directly supported by a primary document held and read. | *Can I point to the document and quote it?* |
| **`[SRC]`** | **Source-Reported Condition** | Reported by a secondary source; the source is identified but the primary has not been verified. | *I know who says this; I have not checked it myself.* |
| **`[ODC]`** | **Observed / Documented Condition** | Directly observed or captured in a contemporaneous record. | *Someone saw this.* **Provenance may be withheld publicly — see [§7](#7--relationship-to-the-property).** |
| **`[RSI]`** | **Reasonable Systems Inference** | Follows from evidence by systems reasoning; not itself sourced. | *I reasoned to this. It is not reported anywhere.* |
| **`[DH]`** | **Design Hypothesis** | A proposed design response or assumed condition the design is built to accommodate. | *This is what I propose or assume, not what exists.* |
| **`[SC]`** | **Speculative Concept** | A future capability dependent on infrastructure, data, or access not established to exist. | *This does not exist and may never.* |

**Supersedes** the Established / Inferred / Proposed / Future scale used in `01-system-planning.md`. Crosswalk: Established → `[VF]` or `[SRC]` *(split by whether the primary was read)* · Inferred → `[RSI]` · Proposed → `[DH]` · Future → `[SC]`. `[ODC]` is new and has no predecessor.

### Source tiers still apply, and they cap claim tiers

The source register's `[P]` / `[S]` / `[O]` / `[U]` tiers describe **where evidence came from**. The six tiers above describe **how strongly a claim may be stated**. They are orthogonal, and they interlock through one governing rule:

> **A claim may never exceed the ceiling set by its strongest source.**

| Strongest source | Maximum claim tier |
|---|---|
| `[P]` primary, **held and read** | `[VF]` |
| `[P]` primary, cited but **not held** | `[SRC]` |
| `[S]` secondary synthesis | `[SRC]` |
| `[O]` observation | `[ODC]` |
| `[U]` unresolved | **`[DH]` at most — never a statement of current fact** |
| No source | `[RSI]`, `[DH]`, or `[SC]` only |

This is the mechanism that makes the taxonomy enforceable rather than decorative. **Every `[P]` source in the register is currently unheld** — so no claim in this project is `[VF]` today. That is the honest current state.

---

## 5 — Evidence governance rules

**Eight prohibitions. Permanent. No exceptions.**

| # | Rule | The failure it prevents |
|---|---|---|
| **G1** | **Never convert `[RSI]` into `[VF]`.** An inference does not become a fact through repetition, confidence, or restatement in a later document. | Laundering reasoning into evidence across document generations. |
| **G2** | **Never convert `[DH]` into current operational fact.** A design hypothesis describes what is proposed, never what exists. | "The system does X" when nothing does X. |
| **G3** | **Never imply technology exists unless evidence establishes it.** | Fabricated capability. |
| **G4** | **Never use speculative telemetry as current infrastructure.** Sensors, IoT, automated irrigation, and predictive analytics are `[SC]` unless evidenced. | The project's most likely and most damaging error. |
| **G5** | **Never claim environmental damage without supporting evidence.** Erosion, runoff, degradation, and habitat harm are `[SC]`/`[RSI]` absent documentation. | Alleging harm by a real, named business. |
| **G6** | **Never imply measured resource consumption without measurements.** A legal limit is not a measurement. A cap is not a reading. | Presenting a ceiling as a meter. |
| **G7** | **Never imply regulatory violations without documentation.** A discrepancy in records is not a violation. Proximity to a limit is not exceedance. | Accusing a real entity of non-compliance. |
| **G8** | **Never imply organizational behavior without evidence.** Do not assert what management prioritizes, neglects, or believes. | Characterizing real people's conduct. |

### Specific standing applications

- **The Adams/Valley county-line discrepancy** is `[SRC]` — a discrepancy *reported in secondary sources*. Under **G7** it is **not** a violation, a risk of forfeiture, or evidence of negligence. Unread, it may not be published at all.
- **The 89-acre cap vs. expanding footprint** is `[SRC]` as a documented tension. Under **G6** and **G7** it is **not** evidence that the property irrigates more than 89 acres. Nobody has measured.
- **Handheld moisture metering and flow measurement** appear in the corpus `[SRC]`. Under **G4** these are **manual instruments**, not a telemetry network. The distinction is preserved in both directions: do not inflate them into IoT, and do not deny they exist.
- **Field-condition constraints** — sunlight, gloves, connectivity, multilingual crews — are `[DH]`. Well-founded, unobserved.

### Enforcement

Any claim on a public surface lacking a tier tag is **treated as `[SC]`** until tagged. The burden is on the claim, not the reader.

---

## 6 — Privacy & anonymization

> **Permanent project constraint. Not contingent on any open question.**

All employees and operational personnel are **anonymized by functional role** in every artifact — internal and public — unless explicit written permission is established.

**Approved role titles:** VP, Property Maintenance & Development · Grounds Director · Golf Course Superintendent · Assistant Superintendent · Seasonal Groundskeeper · Operations Manager · Equipment Technician · Crew Member.

**Never expose:** personal names · personal contact information · personally attributable behavioral observations · private employment details · unnecessary identifying characteristics.

### Anonymization is not just name removal

A role can identify a person as surely as a name. In a small organization, "the superintendent with 25 years' tenure" is one individual. Therefore:

- **Strip identifying specifics** that survive name removal — exact tenures, unique career details, distinguishing personal circumstances. *"A long-tenured superintendent"* carries the systems point; the precise number identifies a person and adds nothing.
- **Never attribute a limitation, failure, or judgment error to a role** in a way that reads as an assessment of the individual holding it. The case study's subject is a **system that loses knowledge**, never a person who failed to transfer it.
- **Aggregate where possible.** "Supervisors rely on individual memory" is a systems observation. "The superintendent relies on his memory" is a performance review.

**Current status: compliant.** No individual name appears in any document under `docs/whitetail/`. This was verified at adoption and must be re-verified before any publication.

---

## 7 — Relationship to the property

> ## STATUS: PRIVATE / UNRESOLVED FOR PUBLICATION

**The design phase proceeds. This blocks publication only.**

### Rule

**Do not infer, characterize, document, or publish any conclusion about the project author's relationship to Whitetail Club or Shore Lodge** — and specifically not from résumés, job applications, employment documents, internal-seeming corpus material, or documents assigning named roles. **These materials are not evidence of a relationship for any project purpose.** They are out of scope as sources, permanently.

### Prohibited phrasings

Until a relationship is explicitly established for publication, no artifact may state or imply: *"I worked with Whitetail…"* · *"I was hired by…"* · *"I conducted field research…"* · *"As an employee…"* · *"As a consultant…"* — or any equivalent construction.

### Firsthand observation

Where firsthand observation appears in project materials, **its evidentiary distinction is preserved internally as `[ODC]`** — observation is real evidence and the model should use it — **while its provenance is not automatically exposed publicly.** Internally: *"observed condition."* Publicly: nothing about who observed, when, or in what capacity, absent an explicit decision to disclose.

**These are separable.** A claim can be internally understood as observed and publicly carried as an unattributed condition. Nothing about the system model depends on the reader knowing where the observation came from.

### The disclaimer

The standing line — *"Independent research and systems-design exploration; no client relationship; interventions are conceptual"* — is **held in abeyance pending resolution.** It is not asserted as accurate, and it is not withdrawn. **Publishing it while the underlying relationship is unresolved would itself be an unverified claim.** Resolve before any public surface carries it.

---

## 8 — Property model *(LOCKED)*

> ## One case study · Two distinct operational / experience domains · One shared stewardship system

Whitetail Club and Shore Lodge are **not** described as one undifferentiated property. Documentation does not prove that relationship, and asserting it would violate **G8**.

| | **WHITETAIL CLUB** | **SHORE LODGE** |
|---|---|---|
| **Domain** | Recreation · golf · trails · landscape · infrastructure · mountain terrain | Hospitality · shoreline · guest experience · lodging · waterfront amenities · landscape |
| **Evidence depth** | Deep — the corpus's overwhelming focus | **Thin** — named as a data gap |

Both exist within the same broader environmental and geographic context. **The digital system operates across these domains where stewardship information overlaps** — shared landscape, shared conditions, shared seasons, shared knowledge problem.

### Constraints

- **Do not manufacture organizational relationships.** Shared crews, shared hierarchy, shared budgets, and shared reporting lines may be described **only** where documented, and tagged `[SRC]` at most. Corporate structure is **not** the basis of the shared system — **shared landscape and shared stewardship information** are.
- **Do not present Shore Lodge operational depth as evidenced.** The system is scoped across both domains; the demonstration goes deep only where evidence goes deep. **Say which is which.** A stated boundary reads as rigor.
- **Two domains, not two products.** The four core experiences are organized by posture — field vs. management — not by property. Two domains must never become two product surfaces.
- **Naming:** use **"Whitetail Club & Shore Lodge."** *"Whitetail Shore Lodge"* appears in no source and is retired.

---

## 9 — External research policy

**Status: OPTIONAL / NON-BLOCKING.**

External research — public records, municipal filings, regulatory databases, climate datasets, industry material — is permitted but never required for Phase 02.

| Rule | |
|---|---|
| **E1** | External research is **pursued only under [§3](#3--research-stop-rule)** — it must materially change one of the four things. |
| **E2** | **No external source may become the project's organizing constraint** ([§1](#1--central-design-thesis-locked) anti-drift). |
| **E3** | **External research never blocks design.** If a claim cannot be substantiated, the claim is cut or demoted — the design does not wait. |
| **E4** | **Public record ≠ verified.** A document is `[VF]` only once held and read. Cited-but-unheld remains `[SRC]`. |
| **E5** | **Retrieval does not confer centrality.** Effort spent obtaining a source is not an argument for its prominence. **The most-worked-for fact is the most likely to distort the thesis.** |
| **E6** | **Nothing about individuals.** No research into named personnel, employment histories, or organizational rosters. Ever. |
| **E7** | **No adversarial research.** Do not seek evidence of violations, penalties, complaints, or litigation involving the property. The project is a design exploration, not an investigation. |

**E7 is a hard boundary.** The property is a real, named business with no relationship to this project. Assembling a compliance-failure record would be indefensible regardless of what it found.

---

## 10 — Portfolio credibility principle

> ### The credibility of the case study is itself part of the design problem.

A stewardship system exists because an organization cannot reliably distinguish what it knows from what it assumes. **A case study about that problem that cannot itself make the distinction has refuted its own thesis.** Evidence discipline here is not process hygiene — it is the argument.

The case study must visibly distinguish four things:

| | | |
|---|---|---|
| **WHAT IS KNOWN** | verified, sourced | `[VF]` `[SRC]` |
| **WHAT IS OBSERVED** | seen and recorded | `[ODC]` |
| **WHAT IS INFERRED** | reasoned, not sourced | `[RSI]` |
| **WHAT IS PROPOSED** | designed, not existing | `[DH]` `[SC]` |

### Two consequences

**In the narrative.** The distinction becomes a visible module, not a footnote. Under-claiming is the trust mechanism: telling a reader what they *don't* have to accept lowers their defensive load and makes the remaining claims land harder.

**Potentially in the product.** The same four-way distinction is a live candidate for the information architecture — a stewardship system arguably *should* show whether a condition was measured, observed, inferred, or assumed. **Flagged as a design opportunity for Phase 02 to evaluate, not a decision made here.** If it holds, the case study's evidence discipline and the product's information model become the same idea expressed twice, which is the strongest available demonstration of the thesis.

---

## 11 — Phase 02 authorization criteria

Phase 02 (Systems Modeling) is authorized when **all** are true:

| # | Criterion | Status |
|---|---|---|
| 1 | Central design thesis locked and unambiguous | ✅ [§1](#1--central-design-thesis-locked) |
| 2 | Research boundary established; nothing classified *Required for Design* | ✅ [§2](#2--design-phase-research-boundary) |
| 3 | Research stop rule in force | ✅ [§3](#3--research-stop-rule) |
| 4 | Evidence taxonomy defined with enforceable source-to-claim ceilings | ✅ [§4](#4--evidence-taxonomy) |
| 5 | Evidence governance rules binding | ✅ [§5](#5--evidence-governance-rules) |
| 6 | Privacy constraint permanent; no names present | ✅ [§6](#6--privacy--anonymization) |
| 7 | Relationship question quarantined from design | ✅ [§7](#7--relationship-to-the-property) |
| 8 | Property model locked | ✅ [§8](#8--property-model-locked) |
| 9 | External research non-blocking | ✅ [§9](#9--external-research-policy) |
| 10 | Credibility principle adopted | ✅ [§10](#10--portfolio-credibility-principle) |
| 11 | Evidence basis is handoff **v3** + source register; v2 superseded | ✅ |

### Phase 02 operating constraints

1. Every claim carries a tier tag. Untagged claims are `[SC]`.
2. No claim exceeds its source ceiling ([§4](#4--evidence-taxonomy)).
3. Role titles only — never names.
4. No assertion about the author's relationship to the property.
5. Model across both domains; depth only where evidence is deep.
6. No new research absent the stop-rule test.
7. Any artifact leading with a legal, regulatory, or hydrological fact has drifted and is corrected against §1.

---

## 12 — Conflicts resolved at adoption

Two existing artifacts violated this governance and were corrected on adoption.

| Artifact | Violation | Correction |
|---|---|---|
| `research-to-design-handoff-v3.md` | **§1 breach.** The water right had become the Central Systemic Problem, Design Principle 4, and Instruction 5 — making the project a water-rights case study by structure. | Water right demoted to environmental context in all three locations. Thesis spine restored to spatial knowledge, legibility, and institutional memory. |
| `source-register.md`, `02-evidence-and-framing-resolution.md` | **§7 breach.** Both characterized the author's relationship to the property and cited résumés and role-assignment documents as evidence of it. | Provenance detail removed. The evidentiary distinction (`[ODC]` exists, unresolved for publication) is preserved without characterizing the relationship or naming its supposed sources. |

**How this happened is worth recording.** The v3 breach came directly from good evidence work: the water right was the strongest-sourced fact discovered, so it was promoted to the center. **That is exactly the drift §1's Gravity Test and §9's E5 exist to prevent** — and it happened once already, which is why both rules are written as hard constraints rather than guidance.

---

# PHASE 02 STATUS

## Design: **GO**

Evidence base sufficient. System model constructible. Nothing classified *Required for Design*. Proceed to systems modeling under the §11 operating constraints.

## Publication: **NO-GO**

Blocked until provenance and relationship questions are resolved ([§7](#7--relationship-to-the-property)). Anonymization ([§6](#6--privacy--anonymization)) is permanent and already satisfied. Individual claims additionally require their own substantiation under [§4](#4--evidence-taxonomy).

## External research: **OPTIONAL / NON-BLOCKING**

Water Right 78-12476 and City of McCall planning records are **Useful for Strengthening / potentially Required for Publication of specific claims** — **not Required for Phase 02 Design.** Pursue only under the stop rule ([§3](#3--research-stop-rule)), never at the cost of the thesis ([§1](#1--central-design-thesis-locked)).
