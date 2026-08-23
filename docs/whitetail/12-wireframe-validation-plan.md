# 12 — Wireframe Validation Plan

## Whitetail Club & Shore Lodge — Stewardship Intelligence System

**Governed by:** [`00-project-governance.md`](00-project-governance.md) — binding. **All seventeen prior artifacts frozen.**
**Stage:** annotated wireframes → **independent** A1–A12 adversarial review → wireframe validation.
**Scope:** no visual system, no palette, no typography, no iconography, no motion, no brand, no polished components.

> ### Governing principle, carried unchanged
> **Visual design is an implementation of the epistemic contract, not a new opportunity to interpret it.**

**This is the last planning artifact before production work.** What follows is wireframes and falsification — not more documents.

---

## §1 — Phase objective

### 1.1 What this phase must prove

> **Does the epistemic contract survive when the information architecture is actually placed into space?**

Eleven phases established *what* must be preserved. Phase 11 established *the constraints* under which it must be preserved. **Neither has yet placed a single element on a page.** Every invariant to date is satisfiable in principle; this phase is the first test of whether it is satisfiable in practice.

### 1.2 What this phase is not

**Not a demonstration that the design works.** The purpose is to give the design a serious opportunity to fail **before visual polish makes those failures harder to see.** A wireframe that passes because it was drawn by someone who knew what the tests were is worth nothing — which is why §8 separates authorship from falsification.

### 1.3 The three settled questions this phase does not reopen

| Settled | Where |
|---|---|
| Confidence · contest · attention · decision · completion semantics | Phases 04–08 |
| Observation attribution · evidence preservation | Phase 07 C8 · Phase 03 §4.1 |
| The seventeen invariants | Phase 11 §2 |

**The wireframe task is to determine whether those decisions survive spatial representation — not to revisit them.**

---

## §2 — Source-of-truth artifacts

### 2.1 Governing artifacts

| Artifact | Governs |
|---|---|
| [`04-architectural-proof.md`](04-architectural-proof.md) **(v1.1)** | Outcome enum · confidence bands · verification loop |
| [`08-interaction-architecture.md`](08-interaction-architecture.md) **(v1.1)** | The four surfaces · `LAST TIME` · §2.1.1 compression tests |
| [`09-epistemic-failure-path.md`](09-epistemic-failure-path.md) | Twelve tripwires · the corruption chains |
| [`10-resolution-pass.md`](10-resolution-pass.md) | TW-5 content requirement · TW-6 tests · returned-ground mapping |
| [`11-wireframe-constraints.md`](11-wireframe-constraints.md) | Viewport bindings · envelopes · A1–A12 · spatial risks |

**Consulted for role/device, decision definitions, evidence semantics:** [`01-system-model.md`](01-system-model.md) · [`02-information-architecture.md`](02-information-architecture.md) · [`05-decision-experience-model.md`](05-decision-experience-model.md) · [`07-product-specification.md`](07-product-specification.md).

### 2.2 Amendment verification — performed before planning

| Check | Result |
|---|---|
| Phase 04 §11 row 6 carries five values incl. `absent-at-described-location` | **Present** |
| Phase 08 §5.1 `LAST TIME` carries the weakest-ground line | **Present** |
| Phase 08 §2.1.1 compression tests | **Present** |
| Both v1.1 amendment notes | **Present** |

### 2.3 The two canonical content sources

**Wireframe text is drawn from these. It is not written fresh.**

**Live-condition phrasing — Phase 05 §7.1:**

| Band *(internal)* | Sounds like |
|---|---|
| CONFIRMED | *"Checked this morning."* |
| AGING | *"Last looked at nine days ago; drainage changes in about a week."* |
| ASSUMED | *"This is from the old drawing. Nobody's confirmed it."* |
| CONTESTED | *"Two of us disagreed on Tuesday. Too close together to be change."* |
| UNRESOLVED | *"Searched it in October. Didn't find it."* |

**Returned-ground phrasing — Phase 10 §4.5:**

| Prior grounds were | Returned phrase |
|---|---|
| Observed fact | *"checked that morning"* |
| Assumption | *"never checked here at the time"* |
| Contested observation | *"two observers disagreed"* |
| Unresolved absence | *"looked, no answer"* |
| Confirmed absence | *"confirmed not present"* |

> **Band names appear in the left columns because this is an internal document. They never appear in a wireframe.**

---

## §3 — Risk-first surface order

**Do not begin with the easiest surface.** No landing page, no dashboard, no visually simple state. The order is by demonstrated epistemic and spatial risk.

### Order: D3 → Contest → `LAST TIME` → Attention

| # | Surface | Why here | Risk already demonstrated |
|---|---|---|---|
| **1** | **D3 per-zone decision envelope** | **The only surface Phase 11 predicted would *fail*** — §4.2 states it does not fit at desk-class once zone count grows | Envelope pressure (Phase 09 T4 · Phase 11 §4.2). Also the A11 confidence-column risk, because per-zone data invites a table |
| **2** | **Contest** | Phase 11 §5.2 concluded **no neutral vertical order exists.** This surface must succeed where layout alone is known to be insufficient | Peer-authority collapse (A2) · the absent-affordance legibility problem |
| **3** | **`LAST TIME`** | Carries **TW-5**, the resolution of the project's strongest corruption chain, under the specific pressure that outcomes are more salient than grounds | Outcome bias (A6) · separable-unit weighting (A12) |
| **4** | **Attention** | Lowest spatial pressure but highest **emergent-semantics** risk — task meaning arrives without any task state existing | Backlog drift (A3) |

**S1 Place and S2 Capture follow after these four.** They are not lower-value; they are lower-risk, and Phase 11 §12 assessed both as fitting comfortably. **Starting with them would be starting with the easy case.**

---

## §4 — Annotated wireframe requirements

Each wireframe carries **four annotation layers.** The annotations are validation material — the review reads them as claims to be tested. **They are not decorative labels.**

### 4.1 Layer 1 — Information

Every element identified as one of: decision/question · observation/finding · evidence · reason · outcome · **returned ground** · supporting information.

### 4.2 Layer 2 — Behavior

| Annotate | Meaning |
|---|---|
| **Allowed actions** | Every action reachable from this surface |
| **Absent actions** | **Named explicitly** — *"no resolve control," "no count," "no dismiss"* — because an absence nobody documented is indistinguishable from an oversight |
| **Disclosure behavior** | What one action reveals, and that it reveals in place |
| **Navigation relationship** | Where this routes to and from |
| **Observation creation path** | How a person gets from here to recording something |

### 4.3 Layer 3 — Spatial constraints

Viewport binding *(from Phase 11 §4.1)* · no-scroll envelope · **PRESENT / DISCLOSED / SUPPORTING per element** · peer grouping · indivisible units · inline reason placement.

### 4.4 Layer 4 — Epistemic protections

**Explicitly mark where the wireframe guards against each of the six.** This is the layer that makes the wireframe falsifiable rather than merely drawn:

| Protection | The wireframe must show |
|---|---|
| **Confidence ranking** | Why no comparison axis exists (A1, A11) |
| **Outcome bias** | Why grounds cannot be de-emphasized relative to outcome (A6, A12) |
| **Contest resolution** | Why the absence of a resolve control reads as intentional (A2) |
| **Absence collapse** | Why the two absence phrases stay distinguishable (A9) |
| **Attention as task state** | Why no count, assignment, dismissal, or completion emerges (A3) |
| **Decision creation** | Why no route implies authorship (A5) |

---

## §5 — Real content requirements

**No lorem ipsum. No generic placeholder copy. No "Example observation."**

**A7, A9, A11, and A12 cannot be evaluated against placeholder text** — they test what happens to *actual phrases* under compression, truncation, and alignment.

### 5.1 Required conditions and their exact wording

| Condition | Wording | Source |
|---|---|---|
| Never checked | *"This is from the old drawing. Nobody's confirmed it."* | Phase 05 §7.1 |
| Two disagree | *"Two of us disagreed on Tuesday. Too close together to be change."* | Phase 05 §7.1 |
| Searched, not found | *"Searched it in October. Didn't find it."* | Phase 05 §7.1 |
| Confirmed absent | *"confirmed not present"* | Phase 10 §4.5 |
| Recently observed | *"Checked this morning."* | Phase 05 §7.1 |
| Aging | *"Last looked at nine days ago; drainage changes in about a week."* | Phase 05 §7.1 |
| Returned ground — assumption | *"never checked here at the time"* | Phase 10 §4.5 |
| Returned ground — unresolved absence | *"looked, no answer"* | Phase 10 §4.5 |

### 5.2 Scanning-register phrases

Phase 08 §2.1 permits a shortened form in list contexts. Those used must satisfy §2.1.1's T-A/T-B/T-C and be **composed from condition data**: *"never checked" · "two disagree" · "looked, no answer" · "checked this morning."*

### 5.3 The D3 zone-count parameter — a labeled hypothesis, not a fact

> **No zone count is attested anywhere in the project.** Verified across all seventeen artifacts: the only figures are illustrative — *"3 zones"* in a Phase 08 example, *"twelve zones"* in a Phase 10 hypothetical.

**Attested scale:** an 18-hole championship course, a 10-hole par-3 course on 35 acres, multiple subdivisions, forest buffer, lake frontage.

**Test parameter `[DH]`:** wireframe D3 at **no fewer than 28 zones** — a floor derived from 28 holes before subdivisions, drainage, and shoreline are counted.

**This is a test parameter, never a property fact.** No wireframe, annotation, or finding may state *"Whitetail has N zones."* **If the layout fails at the floor, it fails at every count above it** — which is what makes a lower bound the honest test.

---

## §6 — Spatial invariants

Carried from Phase 11 §5 as settled. **These are not re-derived here; they are the rules the wireframes must satisfy.**

### 6.1 A11 — alignment is ranking

> **A column of reason phrases becomes a comparison axis.** Aligned things compare, regardless of whether they are ordered.

**Requirement:** reason phrases sit **inline with their subject** — on the line beneath it — **never in a parallel column.**

**D3 must test this hardest**, because per-zone data invites a table, and **a table is a column by construction.**

**Test for failure:** grid alignment · repeated x-coordinates · card structure · table structure · horizontal grouping. **A11 fails if a person can visually compare reasons as if they were values on a dimension.**

### 6.2 A12 — indivisible ground/outcome unit

> **Outcome and decision grounds cannot become independently weightable blocks.**

**Requirement:** *what happened* and *what was known at the time* occupy **one indivisible unit** — not two adjacent lines.

**Test for failure:** attempt to emphasize the outcome without emphasizing the grounds. **If the separation makes that possible, it is an A12 failure**, whether or not any styling has been applied yet.

### 6.3 Peer ordering — the conclusion is settled

Phase 11 §5.2 established: **no neutral vertical order exists.** Chronological implies recency equals authority — which Phase 04 §4.C denies within the decay window. Reverse implies the same inverted. By role brushes I-12. Random is unstable.

**The Contest wireframe must test all four arrangements — chronological, reverse chronological, equal-position, grouped — to *document which authority signal each produces*.** It must **not** search for a neutral one; §5.2 established there is none.

> **The explanation carries what the layout cannot.** *"Too close together to be change"* is load-bearing structure and must render at **the same visual weight as the observations themselves**, not as a caption beneath them.

### 6.4 No-scroll and reflow

| Condition | Requirement |
|---|---|
| **Default zoom, bound viewport** | All PRESENT material fits without scrolling |
| **Elevated zoom** | Decision-critical material **leads the reflow order** |
| **Never** | Overflow resolved by hiding decision-critical grounds |

**Bound viewports (Phase 11 §4.1):** S1, S2, S4 and D2 → **phone**. D3 → **desk-class**.

### 6.5 Absence phrases never truncate

*"Searched it in October. Didn't find it."* and *"confirmed not present"* are **epistemically opposite.** Any truncation, ellipsis, or wrap that makes them read alike is an **A9 failure.**

---

## §7 — Accessibility requirements

**Tested at wireframe stage, before any visual styling.** Accessibility here is architectural: it verifies that epistemic distinctions survive when visual language is removed.

### 7.1 The tests

| Test | Method | Fails if |
|---|---|---|
| **Keyboard order** | Tab through every interactive element | Order deviates from envelope order |
| **Semantic reading order** | Linearize the wireframe | Decision-critical material follows the choice controls |
| **Focus movement** | Trace focus across disclosure | Focus jumps or is lost on reveal |
| **Screen-reader grouping** | Read the four answers · read a contest block | The four answers do not read as one group; contested observations read as primary/secondary |
| **Peer observation distinction** | Linearize a contest | Either observation acquires precedence in the reading |
| **Decision-ground visibility** | Linearize `LAST TIME` | The weakest ground reads after the choice controls, or reads as metadata |
| **Zoom / reflow** | Elevated zoom | Decision-critical material no longer leads |
| **Content order** | Compare visual order to DOM order | They diverge |
| **Target size** | Measure the four answers | Any answer is harder to hit than another **(A-C: an answer that is harder to hit is not a peer)** |
| **Non-color communication** | **Remove all color. Reduce weight. Linearize.** | **Any epistemic distinction is lost** |

### 7.2 The standing requirement

> **The wireframe must remain semantically understandable with color removed, visual weight flattened, content linearized, and the screen zoomed substantially.**

**Phase 11 §7.1 established this passes by construction** — confidence is a generated reason phrase, never a color or token. **The wireframe stage verifies that remains true once elements occupy space**, which is not guaranteed: a phrase can survive grayscale and still lose its meaning to position.

---

## §8 — Adversarial review protocol

### 8.1 Separation of authorship from falsification

> **The wireframes are not reviewed by the process that drew them.**

Per the brief, **the adversarial review is performed by a separate reviewer that did not author the wireframes.**

**The reviewer receives:**

| Given | Why |
|---|---|
| The completed annotated wireframes | The artifact under test |
| The A1–A12 test definitions | The tests to run |
| The seventeen invariants (Phase 11 §2) | What must not be violated |
| The canonical phrase tables | To check content authenticity |
| The bound viewports and envelopes | To check no-scroll and reflow |

**The reviewer does not receive:** any reasoning about why the wireframes satisfy the tests, any account of design intent, or any prior assessment of compliance.

> **Withholding the defense is what makes the review adversarial.** A reviewer handed the argument will grade the argument. **The wireframe must survive someone who was only told what to attack.**

### 8.2 Sequence — strictly ordered

```
   1  wireframes drawn and annotated       ← no compliance claims made
   2  reviewer engaged                     ← receives artifact + tests only
   3  A1–A12 run                           ← findings returned
   4  findings triaged                     ← §10
   5  corrections applied OR escalation    ← never both silently
   6  re-review if corrections were made
```

**Step 1 makes no self-assessment.** The authoring step may state what a wireframe *does*; it may not state that a test *passes*.

### 8.3 Record format — required for every test

| Field | Requirement |
|---|---|
| **PASS / FAIL** | Binary. **No "mostly," no "acceptable"** |
| **Exact location** | Which wireframe, which element |
| **Observed failure mechanism** | *How* the layout produces the effect — not that it does |
| **Violated principle** | The specific invariant or tripwire |
| **Evidence** | What was observed. **Not "it looks like"** |
| **Correction** | The proposed spatial change, if any |
| **Scope** | Within visual-design authority, or **requires architecture escalation** |

> **Do not record PASS because something looks reasonable.** A test passes when its failure mechanism was actively sought and not found.

### 8.4 The reviewer's disposition

The reviewer behaves as someone **trying to break the architecture through layout.** The question is never *"is this acceptable?"* It is: **"what would I have to believe, looking at this, for the contract to be violated — and can I get there?"**

---

## §9 — Hardest-case scenarios

**Every one must be represented in the wireframes and tested in review.** These are the cases where the architecture is most likely to fail spatially.

### Scenario A — Successful outcome from weak grounds
**Surface:** `LAST TIME` · **Tests:** A6, A12

A decision made on *"never checked here at the time"* produced a successful result.

> **Could the interface make this look like validated reasoning?**

**Content required:** the outcome, and the returned ground, as one unit. **The outcome is naturally more salient** — that is the pressure being tested.

### Scenario B — Conflicting observations
**Surface:** Contest · **Tests:** A2, A11

Two observations disagree within the decay window.

> **Could the interface make one look more authoritative?**

**Content required:** both observations, real text, plus *"Too close together to be change."* **Test all four arrangements** (§6.3).

### Scenario C — Searched but not found
**Surface:** Place, and D3's per-zone readiness · **Tests:** A9

An item is not found at its described location.

> **Could the interface make this visually equivalent to confirmed absence?**

**Content required:** *"Searched it in October. Didn't find it."* and *"confirmed not present"* **rendered adjacently at the narrowest bound width.** Adjacency is the test — separated, they are trivially distinguishable.

### Scenario D — D3 information pressure
**Surface:** D3 · **Tests:** A1, A8, A11 + no-scroll + reflow

A realistic number of zones must be represented — **no fewer than 28 `[DH]`** (§5.3).

> **Does the layout force epistemically important information out of the decision envelope?**

**This is the scenario Phase 11 predicted would fail unnarrowed.** The wireframe must show either that it fits, or that the weakly-grounded-zones narrowing makes it fit. **A narrowing applied without being shown to be necessary is not a result.**

### Scenario E — Attention without task semantics
**Surface:** Attention · **Tests:** A3, A4, A5

Multiple conditions require attention simultaneously.

> **Does the interface create a backlog, count, assignment, or completion interpretation despite none existing in the model?**

**Test the emergent forms specifically:** a large number reads as a count even with no badge · a grouped section reads as a backlog · a checkbox implies completion · an avatar implies assignment · an "X" implies dismissal. **None of these exist in the model; all of them can arrive through layout.**

---

## §10 — Failure handling

### 10.1 Diagnose the cause before proposing a fix

Every failure is classified into exactly one of seven:

| # | Cause | Typical correction |
|---|---|---|
| 1 | **Spatial arrangement** | Reposition |
| 2 | **Hierarchy** | Re-weight the order of presentation |
| 3 | **Density** | Accept more vertical space |
| 4 | **Content grouping** | Merge or separate units |
| 5 | **Responsive behavior** | Change the reflow order |
| 6 | **Disclosure** | Re-tier per the disclosure test |
| 7 | **Genuine architectural conflict** | **Escalate — see 10.3** |

### 10.2 The default response

> **Fix the wireframe. Not the architecture.**

Causes 1–6 are wireframe problems with wireframe solutions. **The architecture is not adjusted to make a layout work.**

**Explicitly forbidden as a fix:** shortening a reason phrase to fit · hiding decision-critical grounds · adding a resolve control to make a contest look complete · adding a count to make attention feel bounded · separating outcome from grounds to reduce density.

### 10.3 Escalation — only on demonstrated contradiction

Escalate **only** when the wireframe demonstrates that an established invariant **cannot be represented without contradiction** — not when representing it is merely difficult.

**On escalation:**

1. **Stop.**
2. Identify the exact conflict — which invariant, which spatial requirement, why they cannot coexist.
3. **Do not silently amend an earlier phase.**
4. Produce the conflict as a finding for authorization, following the Phase 10 precedent: **document, specify, do not apply.**

---

## §11 — Visual-design entry criteria

**All fourteen required. None tradeable.**

| # | Criterion |
|---|---|
| **1** | All four surfaces represented |
| **2** | The hardest cases (§9 A–E) survive |
| **3** | **A1–A12 all pass**, independently reviewed |
| **4** | **D3 survives at ≥28 zones `[DH]`** |
| **5** | No-scroll passes at default zoom, at each bound viewport |
| **6** | Reflow preserves priority at elevated zoom |
| **7** | Accessibility semantics intact (§7) |
| **8** | Real reason phrases intact — no truncation, no compression into categories |
| **9** | The weakest returned ground remains visible |
| **10** | Peer observations remain peers |
| **11** | The absence distinction remains visible |
| **12** | Attention remains stateless |
| **13** | No forbidden affordance appears |
| **14** | No fifth surface, no twelfth object |

> **Do not proceed to visual styling because the wireframes look clean.** The criterion is: **does the spatial representation preserve the epistemic contract?**

### 11.1 The three permitted outcomes

| | Condition |
|---|---|
| **A — Visual design unblocked** | **Only if the adversarial review passes.** All fourteen criteria met |
| **B — Wireframe revision required** | Failures are spatial and correctable without architecture change. **Revise and re-review** |
| **C — Architecture escalation required** | **Only** if the wireframes reveal a genuine contradiction in the established architecture |

**Do not manufacture another specification phase if wireframe revision is sufficient.** B is a return to step 1 of §8.2, not a new document.

---

## §12 — Explicit non-changes

Frozen, and outside visual-design authority.

| | Status |
|---|---|
| **All seventeen prior artifacts** | Frozen. Verified byte-unchanged |
| **The seventeen invariants** (Phase 11 §2) | Binding. A wireframe requiring one to change is an escalation, not a design decision |
| **The four surfaces** | No fifth. No merging |
| **The eleven objects** | No twelfth |
| **The twelve tripwires** (Phase 09) | Carried forward, including `currently FAILS` annotations |
| **Band vocabulary** | Internal only. **Never an interface string, never a visual equivalent** |
| **Absent affordances** | No resolve · no count · no dismiss · no assign · no complete · no decision creation · no name on an observation |
| **The disclosure test** | Governs every hide/show decision. **Density is never a justification** |
| **Confidence semantics · contest semantics · attention semantics · decision semantics · completion semantics · observation attribution · evidence preservation** | **Answered upstream. Not reopened by this phase or any phase after it** |

---

## §13 — What happens next

| Step | Output |
|---|---|
| **1** | Annotated wireframes: **D3 → Contest → `LAST TIME` → Attention**, then S1 Place and S2 Capture |
| **2** | Independent adversarial review, A1–A12 (§8) |
| **3** | Findings triaged (§10) → outcome A, B, or C (§11.1) |

**No further planning artifact.** The next thing produced is wireframes.

---

*Wireframe validation plan complete. All seventeen prior artifacts unmodified. No visual system, no components, no fifth surface, no new object. Zone count is a labeled test parameter, never a property claim.*
