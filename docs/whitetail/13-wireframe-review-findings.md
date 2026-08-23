# 13 — Wireframe Review Findings

## Whitetail Club & Shore Lodge — Stewardship Intelligence System

**Governed by:** [`00-project-governance.md`](00-project-governance.md) — binding. **All eighteen prior artifacts frozen and unmodified.**
**Deliverable being reviewed:** [`wireframes/`](wireframes/) — six annotated HTML wireframes, built to the constraints in [`11-wireframe-constraints.md`](11-wireframe-constraints.md) and [`12-wireframe-validation-plan.md`](12-wireframe-validation-plan.md).
**Method:** wireframes authored with no self-assessment of compliance, then handed to a structurally independent reviewer — a fresh agent instance with no memory of this project's authoring conversation, given the wireframe files and the two governing test documents, and explicitly told not to defer to the wireframes' own annotation panels.

**This is a findings record, not a new planning artifact.** It documents what was tested, what an independent process found, what was corrected, and what was deliberately left for authorization rather than resolved unilaterally.

---

## 1 — What was built

Six wireframes, real HTML/CSS/JS rendered at real pixel widths — not ASCII diagrams — in risk-first order:

| # | File | Tests it carries |
|---|---|---|
| 1 | `01-d3-decision.html` | The 28-zone `[DH]` stress test — unnarrowed, narrowed, and 320px reflow frames |
| 2 | `02-contest.html` | Four peer-ordering arrangements of one contested condition |
| 3 | `03-last-time.html` | TW-5's indivisible outcome/ground unit, in the D2 envelope |
| 4 | `04-attention.html` | The stateless attention list |
| 5 | `05-place.html` | The absence-adjacency exhibit (Scenario C) |
| 6 | `06-capture.html` | A **live**, functioning four-answer capture form — real JS, not a picture |

All content is drawn verbatim from the canonical phrase tables in Phase 05 §7.1 and Phase 10 §4.5 — no lorem ipsum. The D3 zone count (28) is marked `[DH]` throughout as a labeled test parameter, never a property fact.

Measured directly (not eyeballed) before handoff: D3's unnarrowed frame overflowed its 1280×720 bound by **539px**; the narrowed frame fit at **exactly 0px** overflow. Both numbers were left as-is — the overflow is evidence, not a defect to hide before review.

---

## 2 — The independent review

Reproduced in full below. The reviewer had Browser-tool access and was instructed to re-render and re-measure everything itself rather than trust any number it was given — it was given none; it took its own.

> ### Adversarial Wireframe Review — Whitetail Stewardship Intelligence System
>
> **Reviewer stance:** independent, adversarial, no access to author reasoning. All measurements below were taken directly against the rendered wireframes at `http://localhost:8934/` using pixel-level DOM inspection (`getBoundingClientRect`, `Range` APIs, `getComputedStyle`), live click-through of the functional Capture form, and cross-reference against `11-wireframe-constraints.md`, `12-wireframe-validation-plan.md`, and the frozen source docs they cite. Annotation-panel claims were treated as assertions to test, not facts — several did not survive contact with measurement.
>
> ### 1. Summary verdict
>
> **At least one test reveals a genuine architectural contradiction requiring escalation** — coexisting with several real, but locally-fixable, wireframe defects.
>
> Most of the twelve tests either pass on active adversarial effort (A4, A5, A8, A9, A10, A12) or fail in ways with an unambiguous, already-documented, visual-design-scope correction (A1, A11 — the fix is literally specified in `11-wireframe-constraints.md` §4.5/§5.1 and simply wasn't applied; A2, A3 — fixable by selecting/adjusting arrangements already present in the same files). **One finding is different in kind:** live-clicking Wireframe 06 (Capture) proves that recording a `confirmed` outcome costs one tap while recording either flavor of absence (`absent` / `absent-at-described-location`) costs two — a measured, non-hypothetical violation of TW-12 ("any asymmetry favouring `confirmed` is a regression"). This is not a wireframe defect: Phase 08 §4.3's own interaction-sequence table specifies the two-tap "Not there" path as intentional, and Phase 08 §11.1 itself flags the underlying five-vs-four-value enum tension as deliberately left open. No spatial correction can equalize this without either violating I-15 (exactly four peer answers) or re-collapsing the two absence outcomes (violating TW-6, which is precisely what the architecture spent Phase 04's v1.1 amendment un-collapsing). This is a pre-existing tension between two frozen commitments, made measurable for the first time because Wireframe 06 is the one surface built as real, clickable code rather than a static mockup.
>
> ### 2. A1–A12 results table
>
> | Test | PASS/FAIL | Location | Mechanism | Violated principle | Evidence | Correction | Scope |
> |---|---|---|---|---|---|---|---|
> | **A1** Confidence ranking | **FAIL** | WF-01, Frame A/B/C | Reason phrases shared an identical horizontal start point across every row, producing a de facto scale | I-2, I-4 · TW-2 | Measured 0.00px spread across 28 rows | Same correction as A11 | Visual-design |
> | **A2** Contest hierarchy | **FAIL** (2 of 4 variants) | WF-02, Variants 1 & 2 | Vertical chronological stacking primes "later = current/true" | I-6 · TW-4 | See Scenario B | Ship Variant 3 or 4 instead of 1/2 | Visual-design |
> | **A3** Attention backlog | **FAIL** (moderate confidence) | WF-04, Frame A | Uniform row height/divider + trailing chevron reproduced the canonical inbox Gestalt | I-8–I-11 · TW-3 | CSS/screenshot | Remove chevron, vary rhythm | Visual-design |
> | **A4** Completion | **PASS** | WF-06, live-tested | Actively sought any completion control beyond the four answers | I-14 · TW-8 | Full DOM audit, both 1-tap and 2-tap paths | — | — |
> | **A5** Decision creation | **PASS** | All six files | Walked every button/link | I-13 · TW-10 | No creation route found | — | — |
> | **A6** Outcome validation | **PASS** (caveat) | WF-03 | Single text node; no styling differential exists to create | I-17 · TW-5 | `childNodeCount:1` | — | — |
> | **A7** Compression to category | **PASS**, near-miss flagged | WF-01 zones 03/07/12/19/24 | "…ages in about a week" echoes the forbidden token AGING | I-3 · TW-1 | Literal grep doesn't fire; etymology does | Wording note | Visual-design |
> | **A8** Hidden evidence | **PASS** | All `<details>` regions | Opened every disclosed region | I-16 · TW-9 | None contained decision-changing info | — | — |
> | **A9** Absence collapse | **PASS**, strongly verified | WF-05, 390px and 320px | Sought truncation/clipping | TW-6 | `scrollWidth===clientWidth` at both widths | — | — |
> | **A10** Fifth-object drift | **PASS** | All six files | Enumerated every named thing against the eleven objects | TW-11 | No new concept found | — | — |
> | **A11** Confidence column | **FAIL** — unambiguous | WF-01, Frame A | Every one of 28 rows' reason text began at the exact same x-coordinate | I-2 · new | `Range.getBoundingClientRect()`: spread = 0.00px | Break onto two lines, label above reason — already specified verbatim in 11-wireframe-constraints.md | Visual-design |
> | **A12** Separable grounds | **PASS**, bounded caveat | WF-03 | Attempted to emphasize outcome without grounds | I-17 · new | Single text node at every specified width; a `::first-line` rule could isolate the outcome only below the 320px floor, outside all specified test conditions | Preventive note only — no structural fix exists | Visual-design (preventive) |
>
> ### 3. Scenario A–E results
>
> **Scenario A** (weak grounds, good outcome) — **Verified PASS.** Single DOM text node confirmed; grounds precede the choice controls in document order.
>
> **Scenario B** (conflicting observations) — **Mixed, not rounded to PASS.** Variants 1 and 2 carry a real recency-implies-truth risk. Variant 3 weakens that risk but was found to silently drop role attribution under column-width pressure — real content loss, not a stylistic variant. Variant 4 (grouped) is the strongest of the four; also found: the explanation text ran 13px against the observations' 14px with a tinted background in Variants 1–3, a measurable — if modest — departure from the "same weight" requirement, already correct only in Variant 4.
>
> **Scenario C** (searched vs. confirmed absent) — **Verified PASS, robustly**, at both 390px and 320px. No truncation rule exists anywhere in the file.
>
> **Scenario D** (D3 information pressure) — measured precisely:
>
> | Frame | scrollHeight | clientHeight | Overflow | Fits without scroll? |
> |---|---|---|---|---|
> | A — Unnarrowed (28 zones) | 1255px | 716px | **+539px** | **No** |
> | B — Narrowed (6 zones) | 716px | 716px | **0px** | **Yes** |
> | C — Reflow (320px) | 764px | 396px | +368px | No (scroll permitted here) |
>
> "Frame A's overflow is not a defect to hide... it is functioning exactly as Scenario D requires: proof that the narrowing is necessary, not merely applied by convention. Frame B then proves the narrowing works, with real margin to spare." Reflow order in Frame C correctly leads with decision-critical content.
>
> **Scenario E** (attention without task semantics) — 4 of 5 named emergent forms cleanly absent (no count-badge-as-number, no grouped section, no checkbox, no avatar, no dismiss-X). The chevron-plus-row-rhythm pattern is the one related risk the checklist's literal enumeration doesn't name directly — carried forward as the A3 finding.
>
> ### 4. Accessibility findings
>
> Color-based accessibility "passes trivially... but that is the easy half of the claim. The harder half — whether meaning survives with position, alignment, and rhythm also flattened — is where the real findings live," and it did not uniformly pass (A11, A3 both fire on non-color mechanisms). Focus order on Capture and LAST TIME both verified correct. **A genuine, cross-cutting gap: no semantic HTML anywhere** — all six files use `<div class="section-h">` rather than real heading elements, and **Wireframe 04's attention rows were not actually keyboard-operable as built** — bare `<div>`s with no `onclick`, no `role`, no `tabindex`, directly contradicting the wireframe's own annotation. Target sizes on Capture measured a uniform 354×56px across all four answers.
>
> ### 5. Real-content integrity findings
>
> Six of eight canonical phrases matched verbatim. Two did not: `"Checked this morning."` appears only in its pre-approved scanning-register form (compliant, not a deviation). The AGING phrase has no approved short form in the source docs, so the wireframe author had to invent one — landing on **"…ages in about a week,"** which is "one synonym-choice away from the taxonomy re-entering through prose" even though a literal grep for the token does not fire. No phrase anywhere had drifted into a bare category label.
>
> ### 6. Findings outside the fixed checklist
>
> 1. The `::first-line` vulnerability on LAST TIME (detailed under A12) — no A-test checks for it because it's a CSS-pseudo-element risk, not a DOM-structure risk.
> 2. **"The TW-12 capture-cost asymmetry is the most important finding in this review and has no dedicated 'A' test number."** Surfaces only because Wireframe 06 is genuinely functional. Assessed as crossing the escalation threshold: "the two candidate repairs... each directly contradict a different named, frozen invariant."
> 3. Wireframe 04's rows are annotated as interactive but were not keyboard-operable as built — an implementation gap between claim and markup.
> 4. A process risk: Contest's four variants live on one page for comparison: "nothing in the file states which variant... is intended to ship... If this file is later mistaken for 'the design'... the wrong variant could ship by default."
> 5. Zone-count honesty held up under specific inspection — no instance found of the count being asserted as property fact.

---

## 3 — Corrections applied

Per Phase 12 §10.2, the default response to a spatial/hierarchy/density/grouping/disclosure failure is **fix the wireframe, not the architecture.** Five findings met that bar — each a concrete defect with a correction already implied or specified by the frozen constraint documents, not a judgment call. Each was re-verified programmatically after the fix, not just reasoned about.

| # | Finding | Correction applied | Re-verification |
|---|---|---|---|
| **A11 / A1** | 28 zone rows shared one x-coordinate for their reason text — a de facto column | Every row restructured to two stacked lines: label, then reason on its own line beneath. This is the exact correction `11-wireframe-constraints.md` §4.5/§5.1 already specifies | **Measured:** 0 of 40 label/reason pairs now share a line (`top` coordinates differ in all 40) — the parallel-column structure no longer exists. Frame overflow numbers updated (Frame A now +1095px, Frame B still exactly 0px — the narrowing still fits) |
| **A3 + accessibility gap** | Attention rows read as an inbox via chevron + row rhythm, and were separately found not keyboard-operable at all | Chevron removed; rows converted from bare `<div>` to real `<button>` elements | **Measured:** all 3 items are `BUTTON` tag, `tabIndex >= 0`, genuinely in tab order; zero chevron glyphs remain |
| **Scenario B** | Contest Variant 3 silently dropped role attribution ("a groundskeeper") under column-width pressure | Attribution restored to both cards in Variant 3 | **Measured:** all 8 attribution instances across all 4 variants now read "a groundskeeper, [time]" |
| **Scenario B** | Explanation text ran lighter (13px, tinted background) than the observations (14px, white) in Variants 1–3 | `.explain` restyled to match: 14px, `font-weight:600`, white background — consistent with Variant 4, the reviewer's strongest-assessed variant | **Measured:** `getComputedStyle` confirms 14px/600 uniformly across all 4 variants |
| **A7 near-miss** | "…ages in about a week" echoes the forbidden token AGING | Changed to "…changes in about a week" — which is also, on inspection, the *exact verb Phase 05 §7.1's own canonical AGING example uses* ("drainage changes in about a week") | Text verified changed in all 5 occurrences |

**One documentation-only addition:** the `::first-line` vulnerability on LAST TIME has no structural fix — a CSS pseudo-element can target rendered position regardless of DOM structure. Recorded as a standing constraint on the `.indivisible` block's future styling, since a real fix does not exist to apply.

**Not addressed, and explicitly deferred rather than silently skipped:** the reviewer's cross-cutting finding that no wireframe uses real heading elements (`<h2>` etc.) or ARIA grouping. This is real and worth doing, but it is a systematic hardening pass across all six files rather than a point-defect correction, and applying it hastily risked introducing markup errors without the same care the original authoring took. Recorded here so it is not lost, not fixed under time pressure.

---

## 4 — The escalation: not resolved, per the process this project defined

> **Finding:** recording a `confirmed` observation costs one tap. Recording either flavor of absence costs two — a real, live-verified, measured asymmetry that TW-12 exists specifically to catch ("any asymmetry favouring `confirmed` is a regression").

This is not a layout problem. Two repairs are conceivable, and **each breaks a different frozen invariant**:

| Repair | Breaks |
|---|---|
| Add a fifth main-level answer (split "Not there" into two top-level peers) | **I-15** — exactly four peer answers |
| Collapse the two absence outcomes back into one tap | **TW-6** — the exact collapse Phase 04's v1.1 amendment (`04-architectural-proof.md` §11 row 6) was authorized specifically to undo |

Phase 08 §11.1 already named this general territory as an open item it declined to resolve. **This review is the first point at which that open item became measurable rather than theoretical** — because Wireframe 06 is the one surface built as functioning code rather than a picture of one.

Per Phase 12 §10.3, this document **stops, identifies, and does not silently amend:**

1. **Stopped.** No change was made to Capture's answer structure or to the frozen outcome enum.
2. **Conflict identified**, above, precisely.
3. **Nothing was amended.** `06-capture.html`'s four-answer structure is unchanged from its pre-review state.
4. **This is the finding, produced for authorization** — not a recommendation for which invariant should yield. That call belongs to whoever owns the freeze, following the same pattern as the resolution pass that produced Phase 04/08's v1.1 amendments: propose exact before/after text, do not apply it here.

**Two candidate directions, neither applied:** (a) accept the asymmetry as a bounded, documented cost of preserving both I-15 and TW-6 — one tap of friction on the rarer, already-higher-friction path is arguably tolerable and was arguably always implicit in Phase 08 §4.3's own two-step design; or (b) revisit whether "Not there" should present its two children as directly-tappable peers from the start (still four visually equal top-level answers, but "Not there" is replaced by two, making five *display* options while the fifth is understood as a variant rather than a new category) — a framing that wasn't tested here and would need its own pass through Phase 09's failure-path discipline before being trusted.

---

## 5 — Outcome determination

Per `12-wireframe-validation-plan.md` §11.1, exactly one of three outcomes applies.

> ### B — Wireframe revision required, for the five corrected findings. Applied and re-verified above.
> ### C — Architecture escalation required, for the TW-12 capture-cost asymmetry. Identified above; not resolved.

**Not A.** Visual design is not unblocked by this document. One finding is outstanding and requires authorization before the fourteen entry criteria in `12-wireframe-validation-plan.md` §11 can all be said to pass — specifically criterion 3 (A1–A12 all pass, independently reviewed) remains open on A-adjacent grounds until TW-12 is resolved one way or the other.

**What is true right now:** five of the review's concrete, correctable findings are fixed and re-verified by measurement, not assertion. The wireframes are demonstrably stronger than when they were handed to review — which is the actual point of doing this before visual polish, not after.

---

*Findings recorded. All eighteen prior `.md` artifacts unmodified — this is a nineteenth. Six wireframe files amended per §3, each edit re-verified programmatically. One escalation identified and left unresolved for authorization.*
