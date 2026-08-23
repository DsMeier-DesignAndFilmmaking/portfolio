# 14 — Capture Asymmetry Analysis

## Whitetail Club & Shore Lodge — Stewardship Intelligence System

**Governed by:** [`00-project-governance.md`](00-project-governance.md) — binding. **All nineteen prior artifacts frozen and unmodified.**
**Nature of this phase:** analysis only. **No amendment, no recommendation, no selection, no visual design, no new object.**
**Question:** is the Phase 13 escalation **(A)** a genuine contradiction between frozen commitments, **(B)** a tolerable asymmetry already implied by the architecture, or **(C)** a measurement artifact caused by the wording or scope of TW-12?

> **Success condition for this document:** reduce the authorization question to the smallest possible decision **without resolving it.**

---

## 1 — Restatement of the conflict

### 1.1 What Phase 13 measured

Live click-through of `wireframes/06-capture.html` produced:

| Path | Taps to commit | Resulting stored value |
|---|---|---|
| Found it | **1** | `confirmed` |
| Found the place — couldn't tell | **1** | `inconclusive` |
| Found something different | **1** | `contradicted` |
| Not there → *I confirmed it isn't there* | **2** | `absent` |
| Not there → *I couldn't find it* | **2** | `absent-at-described-location` |

### 1.2 The claimed violation

**TW-12**, verbatim ([`09-epistemic-failure-path.md`](09-epistemic-failure-path.md) §9):

> | **TW-12** | Capture cost is symmetric | Count the actions required to record each of **the four outcomes.** **Any asymmetry favouring `confirmed` is a regression** | U2 erosion by interaction cost |

Three taps of context matter and are recorded here because the rest of the analysis turns on them:

1. TW-12's test method counts **"the four outcomes."**
2. TW-12's failure clause is not *"any asymmetry"* — it is **"any asymmetry favouring `confirmed`."**
3. TW-12's stated purpose is **"U2 erosion by interaction cost"** — not symmetry as an end in itself.

### 1.3 Why Phase 13 called it an escalation rather than a defect

Phase 13 found no spatial correction available, because the two conceivable repairs each break a different frozen commitment:

| Repair | Breaks |
|---|---|
| Add a fifth top-level answer | **I-15** — *"The four finding answers are peers"* |
| Collapse the two absence values into one tap | **TW-6** / Phase 04 v1.1 — the exact collapse the amendment was authorized to undo |

### 1.4 The arithmetic underneath

Stated plainly, because it is the fact the whole question rests on:

> **Five outcome values cannot be reached through four single-tap answer slots.**

This is pigeonhole, not design. Holding I-15 (exactly four answers) and the post-v1.1 five-value enum simultaneously makes *some* additional act mathematically unavoidable for at least one value. **The asymmetry is therefore not something the wireframe introduced. It is entailed by two commitments that were already frozen before any wireframe existed.**

What is *not* settled by that arithmetic — and what this document exists to isolate — is whether TW-12 was ever asserting a claim about that layer at all.

---

## 2 — Trace through the governing artifacts

Chronological, because the sequence turns out to be load-bearing.

### 2.1 Phase 06 §A.5 — the origin of the symmetry concern

> *"…**it must be no harder than recording a success.** If confirming takes one action and reporting absence takes **three**, the asymmetry will teach people what the system actually values, regardless of what the training says."*

Two readings are available in this one sentence, and it does not adjudicate between them:

- **Strict:** *"no harder than"* — any n > 1 is harder. Two taps violate.
- **Purposive:** the harm named is *teaching people what the system values.* "Three" is offered as the illustrative magnitude at which that teaching occurs.

**A.5 does not say two is acceptable. It also does not say two is not.** It is tagged `[OPERATIONAL HYPOTHESIS]`, not `[ARCHITECTURAL]`.

### 2.2 Phase 08 §4.3 — four peer answers, and the follow-up, specified together

§4.3 specifies the four peer answers **and**, immediately below, the follow-up binary on *"Not there"* only. It quotes A.5's *one-versus-three* sentence as its justification for peerage.

**The two-tap path is not an artifact of implementation. Phase 08 authored it, in the same section, at the same time as the peerage requirement it is now said to violate.** §4.3 closes by saying the follow-up flags an open item *"rather than resolving it architecturally."*

### 2.3 Phase 08 §8.2 — the project's own usage of the disputed phrase

This is the single most directly relevant piece of text found, and it was not cited in Phase 13:

> | **The four capture outcomes** | Making one require disclosure would break **their peer status** *(§4.3)* |

**Phase 08 uses the phrase "the four capture outcomes" to mean the four peer answers.** It cites §4.3 — the *answers* section — and reasons about *peer status*, an answer-layer property. In this project's own vocabulary, at least once, *"the four … outcomes"* denotes **answers, not stored enum values.**

### 2.4 Phase 09 §6 and §9 — TW-12 is written against a four-value enum

Phase 09 §6.1 states the enum as it then stood:

> **Phase 04 §11 #6 freezes:** `outcome ∈ {confirmed, inconclusive, contradicted, absent}` — **four values.**

TW-12 was authored in the same document, at that moment. **At the time of writing, "the four outcomes" was simultaneously true of the four answers, the four enum values, and Phase 04 §4's four scenarios.** The phrase could not have distinguished between the layers, because the layers had not yet diverged.

Phase 09 §6.3 then concluded the enum must gain a fifth value — and §6.4 explicitly declined to apply it.

### 2.5 Phase 04 §4.1 — "four scenarios," five values, in one table

Phase 04's own summary is headed **"What the four scenarios establish"** and enumerates **five** rows, closing:

> **All five produce permanent knowledge.**

**A four/five discrepancy in the word "outcome" pre-exists the amendment and lives inside Phase 04 itself** — four *scenarios* (A, B, C, D), five *outcome values* (D splits into D-i and D-ii). TW-12's "four" is consistent with the scenario count and with the pre-amendment enum count; it is inconsistent with the post-amendment enum count.

### 2.6 Phase 10 §2.6 — the layer distinction, stated explicitly

> **Four peer answers is an interaction property. Five outcome values is a storage property. The follow-up binary is the mapping — and Phase 08 wrote it before knowing where the second value would live.**

**Phase 10 asserts the layer separation directly and treats the follow-up binary as the mapping between layers** — not as a fifth answer, and not as a defect.

### 2.7 Phase 04 v1.1 — what the amendment did and did not change

> *"**This is a transcription correction, not a design decision** — no principle in any phase changes, and the amendment is representational rather than conceptual."*

**The amendment claims to change no principle.** If that claim holds, it cannot have created a new violation of TW-12 — because a representational correction cannot manufacture a substantive conflict. If it did create one, the claim was too strong. **This document does not decide which.**

### 2.8 Phase 08 §11.1 — an open item that has since been half-closed

§11.1 asked one question and named one unresolved half:

> **What remains open:** whether that distinction needs **machine-readable representation**… or whether it lives in the observation's content.

**Phase 09 §6.3 answered it: A — must be machine-readable. The v1.1 amendment applied that answer.**

The consequence is structural and is the most important trace in this section:

> **Post-amendment, the follow-up binary is no longer an interaction convenience. It is the act by which a person supplies a value the confidence function now requires** — the two absence values drive *opposite* confidence movements (contest vs. supersede), and nothing else in the model can determine which one applies.

**Phase 08 §11.1's status is therefore stale in a specific way:** the question it left open has been answered, but §11.1 has not been re-read in light of that answer. Phase 13 cited §11.1 as evidence the area was "deliberately left open." It was — but the part left open was *representation*, and representation is now settled. **What remains open is only whether the settled representation's capture cost is compliant.**

### 2.9 Phase 13 — where the finding became measurable

Phase 13 is the first artifact to have *executed* the interaction rather than specified it. Its own framing is precise and worth preserving: this *"surfaces only because WF-06 is genuinely functional rather than a static mockup."*

---

## 3 — Analysis of each candidate interpretation

Each is stated at its strongest, with the evidence that supports it and the evidence that cuts against it. **No verdict is offered.**

### 3.1 Interpretation A — a genuine contradiction between frozen commitments

**The strongest form of A** is not the arithmetic one. Arithmetic alone gets rebutted by the layer distinction (§2.6). A's strongest form is **behavioral and prospective:**

> TW-12's purpose is **U2 erosion by interaction cost.** U2 is about whether crews will record failed searches *over time.* A person who performs this interaction repeatedly **learns** that absence costs more than success. That learned expectation biases the *first* tap on future occasions — at the answer layer, where I-15 lives. **The layer distinction does not dissolve the harm; it relocates where the harm is paid.**

Under this reading, the conflict is real and unavoidable: I-15 caps answers at four, the enum requires five values, the surplus cost lands on absence, and absence is precisely the behavior U2 exists to protect.

**Supporting:** TW-12's purpose column names U2 explicitly · Phase 06 A.5's *"teach people what the system actually values"* is a claim about learned expectation, not momentary friction · A.5's strict reading (*"no harder than"*) admits no tolerance.

**Cutting against:** the bias A fears operates on *answer selection*, but by the time the second tap is requested, **`confirmed` is no longer reachable** — the person has already committed to absence, and both follow-up branches remain absence. The momentary incentive to defect toward `confirmed` does not exist at the point the extra cost is charged · A depends on a learned, cross-session effect that no phase has evidenced and that governance §3's stop-rule forbids gathering.

### 3.2 Interpretation B — a tolerable asymmetry already implied

**The strongest form of B:**

> The asymmetry is **entailed** by two commitments frozen before the wireframe existed (§1.4), was **authored deliberately** in the same section that states the peerage requirement (§2.2), and is **described as the layer mapping** rather than as a defect (§2.6). TW-12's failure clause is *"any asymmetry favouring `confirmed`"* — and the extra tap does not favour `confirmed`, because `confirmed` is unreachable once *"Not there"* is chosen. The asymmetry favours nothing; it charges a cost *after* the branch, on both absence branches equally.

**Supporting:** Phase 08 authored the follow-up alongside the peerage rule and did not treat them as in tension · Phase 10 §2.6 names the follow-up as the mapping · both absence branches cost the same, so absence is not disadvantaged *relative to its sibling* · Phase 04 v1.1 claims no principle changed.

**Cutting against:** *"already implied"* is doing heavy lifting — **no artifact states that the asymmetry is acceptable.** Phase 08 §4.3 flagged the area as open rather than blessing it · A.5's strict reading is unrebutted · B is an inference from silence, and silence is what §11.1 recorded rather than resolved.

### 3.3 Interpretation C — a measurement artifact of TW-12's wording or scope

**The strongest form of C:**

> TW-12 says *"count the actions required to record each of **the four outcomes**."* **Post-amendment, there is no set of four outcome values.** There are five. Read at the enum layer, TW-12's test method refers to a set that no longer exists, and a test whose subject has ceased to exist cannot be failed at that layer.
>
> Read at the **answer** layer, TW-12's subject does exist — there are exactly four answers — and **each costs exactly one tap. The test passes.** Phase 08 §8.2 supplies direct precedent for that reading: it uses *"the four capture outcomes"* to mean the four answers and reasons about their *peer status* (§2.3).

**Supporting:** the four/five discrepancy in the word *"outcome"* pre-dates the amendment and lives inside Phase 04 §4.1 itself (§2.5) · TW-12 was written when all three candidate referents equalled four and could not have distinguished them (§2.4) · Phase 08 §8.2 is direct textual evidence of the answer-layer usage (§2.3) · Phase 04 v1.1 explicitly claims to change no principle (§2.7), which is consistent with TW-12 never having bound at the value layer.

**Cutting against:** TW-12's failure clause names **`confirmed`** — a *stored enum value*, not an answer label — which is evidence the author had the value layer in mind at least in part · calling a tripwire's wording stale is a convenient way to dispose of an inconvenient finding, and the burden should sit with that reading, not against it · C explains why the *test* may not fire but says nothing about whether the underlying U2 risk in A is real.

### 3.4 What the three interpretations share

All three agree on the facts. **None disputes the measurement.** They differ only on **what TW-12's test method takes as its subject** — and, downstream of that, whether an entailed asymmetry that charges its cost after the branch point constitutes the harm TW-12 names.

---

## 4 — The narrowest possible authorization decision

Everything above reduces to one question about one phrase.

> ### The decision
>
> **Does TW-12's phrase "each of the four outcomes" bind at the ANSWER layer or at the OUTCOME-VALUE layer?**

That is the entire authorization question. It is a scope determination about six words in one tripwire.

### 4.1 What each binding entails — mechanically, without recommendation

| If it binds at… | Then | Consequence |
|---|---|---|
| **The answer layer** | Four answers exist; each costs exactly one tap | **TW-12 passes as measured.** Phase 13's A-adjacent finding resolves as **C**. No artifact changes. No wireframe changes. Phase 13's other five corrections stand as already applied |
| **The outcome-value layer** | Five values exist; three cost one tap, two cost two | **TW-12's stated subject ("four outcomes") no longer matches its domain.** A second, strictly smaller determination becomes necessary — see 4.2 |

### 4.2 The only follow-on question, and only under the second binding

If — and only if — TW-12 binds at the value layer, exactly one further question arises:

> **Is TW-12's requirement violated by an asymmetry that charges its cost *after* the answer branch, on both absence values equally, where `confirmed` is unreachable?**

This is a question about TW-12's failure clause (*"any asymmetry favouring `confirmed`"*), not about I-15, not about the enum, and not about the wireframe.

**Note what is not on this list.** Neither binding requires choosing between I-15 and TW-6. Phase 13 framed the escalation as a choice between two repairs; **the analysis finds no decision point at which that choice is actually presented.** The repairs only become relevant if the value-layer binding is adopted *and* the follow-on question in 4.2 is answered against the current interaction — two conditions, neither yet met.

### 4.3 Why this is the narrowest available formulation

Alternative framings were tested and each was found to be **wider** than necessary:

| Wider framing | Why it is wider |
|---|---|
| *"Should a fifth answer be added?"* | Presupposes the value-layer binding **and** a violation finding. Two unmade decisions |
| *"Should the absence values be re-collapsed?"* | Same, plus it would reverse an authorized amendment on grounds unrelated to why it was authorized |
| *"Is the asymmetry acceptable?"* | Cannot be answered without first knowing whether TW-12 measures it at all |
| *"Should TW-12 be reworded?"* | An amendment. Out of scope here, and unnecessary under the answer-layer binding |
| *"Is U2 threatened by this?"* | An empirical question governance §3 forbids researching now; Phase 06 already sequenced it to first deployment |

### 4.4 What this document deliberately does not do

**It does not answer 4.1.** The evidence assembled in §2 is not evenly balanced, and §3 records where it leans and where it cuts back — but **the binding of a tripwire's scope is an authorization act, not an analytical one.** The same discipline that produced Phase 10 (*specify exactly, apply nothing*) applies here: this document reduces the question and stops.

---

## 5 — What remains frozen

**Everything.** No artifact was amended by this analysis, and nothing in it is conditional on a future amendment.

| | Status |
|---|---|
| **All nineteen prior `.md` artifacts** | **Frozen.** Verified byte-unchanged at completion |
| **The six wireframe files** | **Unchanged by this phase.** `06-capture.html`'s four-answer structure remains exactly as Phase 13 left it |
| **I-15** — four peer answers | **Frozen.** Not reinterpreted here |
| **TW-6 / Phase 04 v1.1** — the five-value enum | **Frozen.** Not reopened |
| **TW-12** | **Frozen as written.** Its *scope* is the open question; its *text* is untouched |
| **Phase 08 §4.3** | **Frozen**, including the follow-up binary |
| **Phase 08 §11.1** | **Frozen.** §2.8 observes that half its open question has since been answered elsewhere — **that observation is not an edit** |
| **The eleven objects** | **Eleven.** No object introduced, considered, or implied |
| **Visual design** | **Still not authorized.** This phase changes nothing about that |
| **Phase 13's outcome determination** | **Unchanged** — B applied for five findings, C open for one. This document does not convert C into anything |

### 5.1 Compliance statement

**No amendments.** Nineteen prior artifacts byte-identical; this is a twentieth.
**No recommendations.** §3 presents three interpretations at strength; §4 reduces the question; neither selects.
**No new objects.** The eleven-object claim from Phase 07 is untouched.
**No visual design.** No layout, styling, or interface decision appears in this document.
**No settled architecture reopened.** I-15, TW-6, the enum, and §4.3 are all cited as fixed inputs, never as candidates for revision.

---

## 6 — Summary

**What is being measured:** taps required to commit each of five stored outcome values through four peer answers.

**What counts as a tap cost:** unresolved, and §4.2 is where it would be resolved if the value-layer binding were adopted. The candidates are *acts required to reach a stored value* versus *acts required to select an answer* — the same distinction as the binding question itself.

**Does TW-12 prohibit all asymmetry or only biasing asymmetry:** its clause says *"any asymmetry favouring `confirmed`"* — narrower than "all." Whether the measured asymmetry favours `confirmed` is contested in §3, because `confirmed` becomes unreachable before the extra cost is charged.

**Is a follow-up question equivalent to an additional answer:** Phase 10 §2.6 says no — it is *the mapping between layers.* Phase 13's measurement treats it as an additional act. **Both are true; they describe different layers.**

**Is the architecture expressing two different concepts:** **Yes, and it says so explicitly.** Phase 10 §2.6: *"Four peer answers is an interaction property. Five outcome values is a storage property."*

**Does the asymmetry occur at the answer layer or the outcome layer:** **The outcome layer.** At the answer layer, all four answers cost exactly one tap and I-15 is satisfied as written. The asymmetry appears only when the five stored values are counted.

> ### The conflict reduces to one determination
>
> **Whether TW-12's "four outcomes" names the four answers or the five values.**
>
> Under the first, the test passes and nothing changes. Under the second, one further and strictly smaller question follows. **Neither is decided here.**

---

*Analysis complete. Nineteen prior artifacts verified byte-unchanged. No amendment, no recommendation, no new object, no visual design, no settled architecture reopened. The authorization question is reduced; it is not answered.*
