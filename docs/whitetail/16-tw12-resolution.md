# 16 — TW-12 Resolution

## Whitetail Club & Shore Lodge — Stewardship Intelligence System

**Governed by:** [`00-project-governance.md`](00-project-governance.md) — binding. **All twenty-one prior artifacts frozen and unmodified.**
**Nature of this phase:** resolution and verification. **Not an architectural-design phase.**
**Scope:** closes the TW-12 scope escalation. **Nothing else.**

> **This closure is not permission** to reopen architecture, redesign Capture, modify wireframes, or begin visual design.

---

## 1 — Record of authorization

### 1.1 The authorized binding

> ### TW-12 binds to the ANSWER layer.

The phrase *"each of the four outcomes"* in TW-12 ([`09-epistemic-failure-path.md`](09-epistemic-failure-path.md) §9) denotes **the four peer capture answers.**

### 1.2 The test subject, defined

TW-12's test subject is exactly these four:

| # | Peer capture answer |
|---|---|
| 1 | **Found it** |
| 2 | **Found the place — couldn't tell** |
| 3 | **Found something different** |
| 4 | **Not there** |

**TW-12's test subject is not the five stored outcome values.** `confirmed`, `inconclusive`, `contradicted`, `absent`, and `absent-at-described-location` remain the enum's members under Phase 04 §11 row 6 (v1.1) — **unchanged, unreinterpreted, and outside TW-12's bound domain.**

### 1.3 Provenance of this authorization

This is an explicit authorization of the **Phase 15 Decision 1** result, selecting **Binding A** from the two mapped in [`15-tw12-binding-analysis.md`](15-tw12-binding-analysis.md) §2 and §3. Per Phase 15 §5.2, Binding A is the **one-act terminal branch: zero mandatory amendments, zero artifact changes, zero wireframe changes.**

**Decision 2 does not arise.** Phase 15 §3.4 established that the secondary determination — whether after-branch asymmetry constitutes *"favouring `confirmed`"* — **has no referent under the answer-layer binding.** It is not deferred; it does not exist on this branch.

---

## 2 — TW-12 verified against the live implementation

### 2.1 Method

The test was **executed**, not asserted. `wireframes/06-capture.html` was served over HTTP and driven programmatically. Each of the four answers was tested from a **fresh page load** so no test contaminated another.

> **The implementation was not altered to make the test pass.** All seven wireframe files were checksummed before and after; all seven are byte-identical (§8.2). Clicks mutate in-memory DOM state only.

### 2.2 Measured results

| # | Peer answer | Taps to select | Handler fired | Follow-up shown |
|---|---|---|---|---|
| 1 | Found it | **1** | Yes | No |
| 2 | Found the place — couldn't tell | **1** | Yes | No |
| 3 | Found something different | **1** | Yes | No |
| 4 | Not there | **1** | Yes | Yes |

### 2.3 The three required verifications

**(a) Each of the four peer answers requires one tap to select — VERIFIED.**
All four measured at exactly **1 tap**. Uniform.

**(b) No peer answer is cheaper or more expensive — VERIFIED.**
The measured cost across TW-12's bound domain is `1, 1, 1, 1`. **Zero variance.** No answer is reachable in fewer taps than any other; none requires more.

**(c) No asymmetry favouring `confirmed` exists within the bound domain — VERIFIED.**
With uniform cost across all four members, no member is advantaged. The failure clause — *"any asymmetry favouring `confirmed`"* — has nothing to fire on.

### 2.4 One measurement recorded in full, for completeness

Selecting *"Not there"* costs one tap and commits **the answer**; the observation commits after the follow-up, at two taps total. Both figures are recorded here so the record is complete:

| Path | Taps to select the **answer** | Taps to commit the **observation** |
|---|---|---|
| Found it | 1 | 1 |
| Found the place — couldn't tell | 1 | 1 |
| Found something different | 1 | 1 |
| Not there → I confirmed it isn't there | 1 | 2 |
| Not there → I couldn't find it | 1 | 2 |

> **The left column is TW-12's bound domain under the authorized binding. It is uniform.** The right column measures the answer-to-value mapping, which §3 verifies separately and which TW-12 does not measure.

**A supporting observation, measured rather than reasoned:** immediately after *"Not there"* is selected, the other three answers are disabled — `confirmedStillReachable: false`. **`confirmed` is not merely more expensive at that point; it is unreachable.** Recorded because it is the empirical form of what Phase 14 §3.2 argued textually.

### 2.5 Result

> ### TW-12 PASSES as written, on its authorized subject, verified against the live implementation.

---

## 3 — Five-value mapping verified separately

**This is a mapping verification. It is not a fifth-answer proposal, and it proposes nothing.**

### 3.1 Method

Handler wiring was read directly from the live DOM — each control's dispatch label extracted from its bound handler rather than inferred from its visible text.

### 3.2 Verified mapping

| Peer answer | Dispatch label | Stored value |
|---|---|---|
| Found it | `found` | **`confirmed`** |
| Found the place — couldn't tell | `inconclusive` | **`inconclusive`** |
| Found something different | `different` | **`contradicted`** |
| Not there → *I confirmed it isn't there* | `absent` | **`absent`** |
| Not there → *I couldn't find it* | `unresolved` | **`absent-at-described-location`** |

**Both absence branches were driven to completion.** Each terminates in a committed, immutable observation; all controls disable; the confirmation renders role and time only — *"Recorded by a groundskeeper, just now"* — with **no personal name present** (verified by pattern match, satisfying Phase 07 C8).

### 3.3 Verification result

**The four answers map correctly onto the five stored values.** Four answers, one of which branches through the authorized follow-up into two epistemically opposite values. **This is the mapping Phase 10 §2.6 specified, unchanged.**

### 3.4 What this section does not do

**It does not propose a fifth answer.** I-15 stands: four peer answers.
**It does not alter the enum.** Five values stand under Phase 04 §11 row 6 (v1.1).
**It does not reinterpret the follow-up.** It remains the layer mapping Phase 10 §2.6 named.

---

## 4 — Phase 13's escalation: resolved here, not rewritten there

### 4.1 The resolution

> **The TW-12 capture-cost escalation raised in [`13-wireframe-review-findings.md`](13-wireframe-review-findings.md) §4 is RESOLVED under the authorized ANSWER-layer binding.**
>
> TW-12's bound domain is the four peer answers. Measured cost is uniform across all four (§2). **No violation exists within the test's authorized subject.**

### 4.2 What Phase 13 recorded, and why it stays exactly as written

Phase 13 measured a real two-tap outcome-**value** path and escalated it rather than resolving it unilaterally. **That was correct process, and the measurement was accurate.** It remains accurate: two of the five stored values do require two taps to reach, exactly as Phase 13 reported.

**What the authorization settled is not whether Phase 13 measured correctly — it did — but which layer TW-12 measures.**

### 4.3 Phase 13 is not altered

| | |
|---|---|
| **Phase 13's finding** | **Unaltered.** The historical record continues to show that Phase 13 identified and escalated the measured two-tap outcome-value path |
| **Phase 13's outcome determination** | **Unaltered.** It reads B-for-five-findings, C-for-the-escalation, and continues to |
| **Phase 13's five applied corrections** | **Unaffected** — independent of TW-12 |
| **Annotation of any kind added to Phase 13** | **None.** No "resolved" marker, no "passes" annotation, no cross-reference inserted |

> **The resolution lives in this artifact. Phase 13 remains the record of the escalation as it stood.** Converting a historical finding into a pass annotation would destroy the evidence that the escalation happened — the same reasoning that kept Phase 09's `currently FAILS` annotations intact through Phase 10.

---

## 5 — Amendment requirement assessment

**Tested rather than assumed.**

### 5.1 Does the authorization require changing any frozen artifact?

Each candidate was checked against the authorized binding:

| Artifact | Requires amendment? | Reason |
|---|---|---|
| **TW-12** (`09-epistemic-failure-path.md`) | **No** | Its text is accurate under the authorized binding. Its subject exists (four answers), its stated count matches (four), and the test passes as written |
| **I-15** (`11-wireframe-constraints.md`) | **No** | *"The four finding answers are peers"* — verified true (§2.3) |
| **TW-6** | **No** | The two absence values remain distinct and reach opposite confidence movements (§3.2). Untouched |
| **Phase 04 §11 row 6** (five-value enum) | **No** | Outside TW-12's bound domain; unchanged |
| **Phase 08 §4.3** | **No** | Four peer answers plus follow-up — verified as implemented (§2, §3) |
| **Phase 10 §2.6** | **No** | Its layer mapping is precisely what the binding affirms |
| **Phase 13** | **No** | §4.3 — deliberately unaltered |
| **Phase 14, Phase 15** | **No** | Analyses of an open question, now answered elsewhere. Their reasoning stands as recorded |
| **The six wireframes** | **No** | Verified byte-identical (§8.2) |

### 5.2 Result

> ### No amendment required.

This is the outcome Phase 15 §4.1 projected for Binding A: **zero mandatory amendments.**

### 5.3 One optional item, reported and NOT applied

Phase 15 §2.4 identified a durable ambiguity that the authorization does **not** eliminate:

> The data-model field is literally named `OBSERVATION.outcome` and holds **five** members. An implementer reading TW-12's *"count the actions required to record each of the four outcomes"* and then inspecting the model finds a field named `outcome` with five values, not four. **Under the authorized binding, the tripwire's subject and the model's field share a name but not a referent.**

Phase 15 §4.1 classified a clarifying note as **optional, wording-only, non-architectural.**

> **STOP — reported, not applied.**
>
> **This is a proposed amendment requiring separate authorization.** It is not applied here, and no wording for it is drafted. **The residual risk is that a future reviewer re-derives Phase 13's reading and re-escalates.** That risk is now documented; whether to spend an amendment closing it is a separate decision.

**No silent improvement of wording was made anywhere.**

---

## 6 — Downstream gates re-run

| Gate | Status | Verification |
|---|---|---|
| **I-15** — four peer answers | **HOLDS** | Four answers, uniform 1-tap cost, none primary or default (§2.2). Unchanged and unreinterpreted |
| **TW-6** — absence states remain distinct | **HOLDS** | Both absence values reachable and distinct; `absent` vs `absent-at-described-location` preserved through the follow-up (§3.2). The v1.1 amendment is untouched |
| **TW-12** — capture cost symmetric | **PASSES** | Verified live: `1, 1, 1, 1` across the bound domain (§2.3) |
| **Phase 08 §4.3** — interaction model | **HOLDS** | Four peer answers plus one follow-up on *"Not there"* only — implemented exactly as specified |
| **Phase 10 §2.6** — layer mapping | **HOLDS, and is affirmed** | *"Four peer answers is an interaction property. Five outcome values is a storage property."* The authorized binding is this distinction applied to TW-12 |
| **Phase 13 escalation** | **RESOLVED** — here, not there | §4 |
| **Phase 14 decision boundary** | **REACHED AND CROSSED** | Its single binary question is answered by authorization |
| **Phase 15 consequence map** | **CONFIRMED ACCURATE** | Binding A projected: 1 act, 0 mandatory amendments, 0 artifact changes, 0 wireframe changes, escalation closes. **All four confirmed** (§5.2, §8) |

### 6.1 Architectural principle changes

> **None.**

No principle in any phase changed. The authorization determined **which of two existing referents a frozen phrase names** — it added nothing, removed nothing, and reinterpreted no rule. The eleven objects, four surfaces, seventeen invariants, and twelve tripwires are all exactly as they were.

---

## 7 — New project state

| Question | Answer |
|---|---|
| **Is TW-12 resolved?** | **Yes.** Bound to the answer layer, verified passing against the live implementation |
| **Is the Capture asymmetry escalation resolved?** | **Yes.** Phase 13's escalation is closed under the authorized binding (§4). Phase 13's record is unaltered |
| **Are any architectural commitments changed?** | **No.** Zero. §6.1 |
| **Are any wireframe changes required?** | **No.** All seven files byte-identical; none required alteration to pass (§8.2) |
| **Is visual design now authorized by this resolution alone?** | **NO.** |

### 7.1 Why visual design is not authorized

**This resolution closes one gate. It does not open another.**

`12-wireframe-validation-plan.md` §11 sets **fourteen** entry criteria for visual design, all required and none tradeable. This resolution bears on **criterion 3** (*A1–A12 all pass, independently reviewed*) by removing the TW-12 obstruction from it. **The other thirteen are untouched by this document**, and criterion 3 itself still depends on the independent review status of the remaining tests.

Phase 13's determination — *"Not A. Visual design is not unblocked by this document"* — was made on the escalation. **That escalation is now closed, but closure of one blocker is not satisfaction of fourteen criteria.**

> **Visual design remains governed by the Phase 12/13 entry criteria and is not authorized by this resolution.**

---

## 8 — Verification integrity

All checks executed after the resolution was written.

### 8.1 Prior `.md` artifacts

| | |
|---|---|
| **Files checked** | **21** — every `.md` artifact in `docs/whitetail/` prior to this one |
| **Byte-identical** | **21 of 21** |
| **Amendments applied** | **0** — consistent with §5.2's *no amendment required* |

### 8.2 Wireframes

| | |
|---|---|
| **Files checked** | **7** — all six wireframes plus `index.html` |
| **Byte-identical** | **7 of 7**, verified before and after live testing |
| **`06-capture.html`** | **Unchanged.** Driven live in §2 and §3; clicks mutate in-memory DOM only |
| **Altered to pass a test** | **No.** The checksum match is the proof |

### 8.3 Object count

**Eleven. Unchanged.** No new object appeared, was proposed, or was implied. *Answer layer* and *outcome-value layer* are analytical descriptions of existing structure, as established in Phase 10 §2.6 — not domain objects.

### 8.4 Phase 09 regression detectors

**None rewritten.** All twelve tripwires are byte-identical, including TW-5's and TW-6's `currently FAILS` annotations. **TW-12's text is unchanged** — its *scope* was bound by authorization; its *wording* was not touched.

### 8.5 Historical findings

**None rewritten.** Phase 13's escalation, Phase 14's analysis, and Phase 15's consequence map are all byte-identical. **No "resolved" or "passes" annotation was inserted into any historical artifact.** The resolution exists only in this document.

### 8.6 Compliance summary

| Requirement | Status |
|---|---|
| Architecture frozen | **Met** — zero principle changes |
| I-15 unmodified | **Met** |
| TW-6 unmodified | **Met** |
| Five-value enum unmodified | **Met** |
| Four-answer model unmodified | **Met** |
| Capture unmodified | **Met** — byte-identical |
| Wireframes unmodified | **Met** — 7 of 7 byte-identical |
| No new object | **Met** — eleven |
| No visual design | **Met** — none produced; not authorized (§7.1) |
| No new taxonomy | **Met** — no vocabulary, tier, or classification created |
| Phase 09 not rewritten | **Met** |
| Phase 13 / 14 not retroactively rewritten | **Met** |
| No findings converted to "passes" annotations | **Met** |

---

*TW-12 scope escalation closed. Twenty-one prior artifacts and seven wireframe files verified byte-identical. No amendment required; one optional clarification reported and deliberately not applied, pending separate authorization. No architecture changed, no object added, no visual design authorized.*
