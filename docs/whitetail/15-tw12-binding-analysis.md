# 15 — TW-12 Binding Analysis

## Whitetail Club & Shore Lodge — Stewardship Intelligence System

**Governed by:** [`00-project-governance.md`](00-project-governance.md) — binding. **All twenty prior artifacts frozen and unmodified.**
**Nature of this phase:** consequence analysis only. **No binding is selected. No amendment is authored. No UI, visual design, architecture, or wireframe is changed.**
**Task:** determine what follows from each possible answer to the Phase 14 question — **not** to answer it.

> **Success condition:** leave the smallest possible remaining authorization surface while remaining completely neutral regarding the answer.

---

## 1 — Inputs

### 1.1 The exact question, restated from Phase 14 §4

> **Does TW-12's phrase "each of the four outcomes" bind at the ANSWER layer or the OUTCOME-VALUE layer?**

### 1.2 The clause under interpretation

TW-12, verbatim ([`09-epistemic-failure-path.md`](09-epistemic-failure-path.md) §9, frozen):

> | **TW-12** | Capture cost is symmetric | Count the actions required to record each of **the four outcomes.** **Any asymmetry favouring `confirmed` is a regression** | U2 erosion by interaction cost |

### 1.3 The two candidate referents

| Layer | Members | Measured tap cost |
|---|---|---|
| **ANSWER** | 4 — *Found it · Found the place, couldn't tell · Found something different · Not there* | 1 tap each, uniformly |
| **OUTCOME-VALUE** | 5 — `confirmed` · `inconclusive` · `contradicted` · `absent` · `absent-at-described-location` | 3 values at 1 tap; 2 values at 2 taps |

### 1.4 Frozen inputs, treated as fixed and not reopened

I-15 (four peer answers) · TW-6 (absence states remain distinct) · the five-value enum (Phase 04 §11 row 6, v1.1) · the four-answer interaction model · Phase 08 §4.3 · Phase 13's measurement · Phase 14's reduction · the eleven objects · all six wireframe files.

### 1.5 One verified fact that constrains both analyses

**No artifact binds TW-12's scope.** Every occurrence of "TW-12" across all twenty artifacts was located and read: each is either the tripwire itself, a citation of it, Phase 13's finding, or Phase 14's analysis. **None states what its test method takes as its subject.** The question is therefore genuinely open rather than merely unnoticed.

---

## 2 — Binding A: the ANSWER layer

*Under this binding, "the four outcomes" denotes the four peer answers.*

### 2.1 Does TW-12 pass as currently written?

**Yes, on the measurement Phase 13 already took.** Four answers exist; each commits in exactly one tap. Counting "the actions required to record each of the four outcomes" yields `1, 1, 1, 1`. No asymmetry exists within the measured domain, so the failure clause — *"any asymmetry favouring `confirmed`"* — has nothing to fire on.

**The test also remains executable unchanged in future.** Its subject (four answers) exists, is enumerable, and its cardinality matches the stated count.

### 2.2 Does any artifact become inconsistent?

**No inconsistency was found.** The four artifacts that use the phrase were located and read in full:

| Artifact | Usage | Layer |
|---|---|---|
| **Phase 06 §A.1** | *"the four outcomes must be presented as equally legitimate answers… one of four ways to **answer** it"* | **Answer** — stated explicitly |
| **Phase 07 §S2 Constraints** | *"The four outcomes must be presented as equally legitimate **answers** (Phase 06 A.1)"* | **Answer** |
| **Phase 07 §5.x** | *"**The four outcomes carry equal weight.** If `absent` is harder to record than `confirmed`…"* | **Answer** |
| **Phase 08 §8.2** | *"**The four capture outcomes** — making one require disclosure would break their **peer status** (§4.3)"* | **Answer** |

Separately, the artifacts that reference **five** use the value/scenario sense and remain internally coherent under this binding: Phase 04 (*"all five outcomes"*, *"five-outcome summary table"*) and Phase 05 (*"The five outcomes proven in Phase 04 §4"*).

**Under Binding A the vocabulary is polysemous but self-consistent:** *"four outcomes"* denotes answers wherever it appears; *"five outcomes"* denotes values wherever it appears. No artifact contradicts another.

### 2.3 Does any wording elsewhere become stale?

**No wording becomes stale.** Nothing needs to change for any existing sentence to remain true.

**One item becomes resolved rather than stale:** Phase 13's escalation. Phase 13 recorded the finding and explicitly declined to resolve it (*"Identified above; not resolved"*), so a resolution of "no violation at this layer" **completes** Phase 13's process rather than contradicting it. Phase 13's five applied corrections are unaffected — they were independent of TW-12.

### 2.4 Does any future implementation ambiguity remain?

**Yes — one, and it is durable.**

The attribute in the data model is literally named `OBSERVATION.outcome` and has **five** members. An implementer reading TW-12's *"count the actions required to record each of the four outcomes"* and then inspecting the model finds a field called `outcome` with five values, not four.

> **Under Binding A, the tripwire's subject and the model's field share a name but not a referent.** The test would need external knowledge of the binding to execute as intended. Nothing in the frozen text supplies that knowledge.

**This ambiguity persists under Binding A whether or not it is ever acted on.** It is a residual risk of re-derivation — a future reviewer could reach Phase 13's reading again and re-escalate. **Recording it is not a recommendation to remove it.**

### 2.5 What Binding A leaves open

The **substantive** question raised in Phase 14 §3.1 — whether learned, cross-session cost asymmetry erodes U2 — **is not answered by this binding.** It is placed **outside TW-12's reach.** The behavioural risk, if real, would remain live and unmonitored by this particular tripwire.

**Whether that constitutes a gap depends on the substantive question, which no phase has evidenced and governance §3 forbids researching now.** Under Binding A it becomes an unmeasured hypothesis rather than a test failure. **This document does not evaluate whether that is acceptable.**

---

## 3 — Binding B: the OUTCOME-VALUE layer

*Under this binding, "the four outcomes" denotes the enum values.*

### 3.1 Does TW-12's subject still exist as written?

**No — not as a set of four.** The enum holds **five** values post-v1.1. A phrase denoting "the four outcomes" at the value layer refers to a set with a cardinality the domain no longer has.

**Two sub-readings are available, and they diverge:**

| Sub-reading | Consequence |
|---|---|
| *"the four outcomes"* is a **stale count** — the intent is *all* outcome values | Subject exists (five values); the number is simply wrong |
| *"the four outcomes"* is a **closed enumeration** — precisely those four that existed at authorship | Subject as written excludes `absent-at-described-location`, the value the amendment added |

**The second sub-reading produces an unusual result worth stating precisely:** the newest value would fall outside the test's scope, meaning the test would not measure the very path Phase 13 flagged. **This document does not select between the sub-readings; it records that Binding B does not fully resolve without also settling this.**

### 3.2 Does the test remain executable?

**Yes, under the stale-count sub-reading.** Counting actions per value is mechanically possible and was performed by Phase 13: `confirmed` 1, `inconclusive` 1, `contradicted` 1, `absent` 2, `absent-at-described-location` 2.

**Ambiguous under the closed-enumeration sub-reading**, where the fifth value's status is undefined.

### 3.3 Does the current interaction pass or fail?

**Not determinable from TW-12's text alone.** The measurement is settled; the verdict is not. The failure clause reads *"any asymmetry favouring `confirmed`"* — not *"any asymmetry"* — and whether the measured asymmetry meets that description is contested:

| Reading | Verdict on current interaction |
|---|---|
| Asymmetry in tap count is itself asymmetry favouring `confirmed` (it is cheapest) | **FAIL** |
| Favouring requires an available bias toward `confirmed` at the point cost is charged; once *Not there* is selected `confirmed` is unreachable, and both absence values cost identically | **PASS** |

> **Binding B therefore does not by itself determine compliance.** It determines only that the test's domain includes the values.

### 3.4 Does any secondary determination become necessary?

**Yes — exactly one, and only under this binding:**

> **Does an asymmetry charged after the answer branch, borne equally by both absence values, where `confirmed` is unreachable, constitute "asymmetry favouring `confirmed`"?**

Two further observations about its scope:

- It concerns **TW-12's failure clause only.** It does not touch I-15, TW-6, the enum, or the wireframe.
- **It has no referent under Binding A**, where no asymmetry exists inside the test's domain. This conditionality is load-bearing for [§6](#6--irreducibility-test).

### 3.5 Reconciliation surface under Binding B

Under Binding B, TW-12 would use *"four outcomes"* at the value layer while **four other artifacts use the identical phrase at the answer layer** (§2.2), one of which — Phase 06 §A.1 — **defines** it as *"one of four ways to answer it."*

> **This is a statement of reconciliation cost, not an argument for a binding.** A binding may legitimately be adopted despite higher reconciliation cost if the substantive reading warrants it. **What the trace establishes is only the magnitude, which §4 quantifies.**

---

## 4 — Amendment impact matrix

**No amendment text appears here.** Only counts, targets, obligation level, and character.

### 4.1 Binding A

| | |
|---|---|
| **Mandatory amendments** | **0** |
| **Artifacts requiring amendment** | **None** |
| **Optional amendments** | **1** — a clarifying note fixing TW-12's referent, to prevent the §2.4 re-derivation risk |
| **Character if taken** | **Wording only.** Records an interpretation already consistent with four existing usages; alters no rule, no test outcome, no behaviour |
| **Architecture altered?** | **No** |

### 4.2 Binding B

| | |
|---|---|
| **Mandatory amendments** | **1**, or **2** if the closed-enumeration sub-reading is adopted (§3.1) |
| **Artifacts requiring amendment** | **`09-epistemic-failure-path.md`** — TW-12's stated count no longer matches its domain. Under the closed-enumeration sub-reading, its membership also requires settling |
| **Additional, conditional on §3.4** | If the secondary determination finds violation: further amendment reaching **I-15**, **TW-6**, or **TW-12 itself** — count not determinable in advance |
| **Character** | The count fix is **wording only.** Anything following a violation finding would be **architectural** |
| **Architecture altered?** | **Not by the binding itself.** Only by a downstream violation finding |
| **Reconciliation exposure** | **4 artifacts** carry the phrase at the other layer (§3.5). Whether reconciling them is mandatory or optional depends on whether polysemy across artifacts is tolerable — **itself undetermined** |

### 4.3 What both bindings share

| | |
|---|---|
| **Wireframes** | **0 changes** under either binding, unless a violation finding follows Binding B |
| **New objects** | **0** under either binding |
| **Eleven-object claim** | **Untouched** under either binding |
| **Phase 13's five applied corrections** | **Unaffected** — independent of TW-12 |
| **Visual-design authorization** | **Not granted by either binding.** Entry criterion 3 in `12-wireframe-validation-plan.md` §11 requires A1–A12 to pass under independent review; a binding determination is a precondition, not a substitute |

---

## 5 — Minimal future authorization paths

### 5.1 The decision tree

```
DECISION 1 — TW-12 binding
│
├─ Binding A: ANSWER layer
│   └─ TERMINAL
│       · TW-12 passes as written
│       · 0 mandatory amendments
│       · 0 artifact changes · 0 wireframe changes
│       · Phase 13's escalation closes as resolved
│       · Residual: §2.4 re-derivation risk; §2.5 substantive question
│         placed outside TW-12's reach, unmeasured
│       ▸ TOTAL AUTHORIZATION ACTS: 1
│
└─ Binding B: OUTCOME-VALUE layer
    │   (+ possible sub-determination, §3.1, if closed-enumeration is read)
    │
    └─ DECISION 2 — does after-branch asymmetry
       constitute "favouring confirmed"?
       │
       ├─ NO
       │   └─ TERMINAL
       │       · Current interaction passes
       │       · 1 mandatory wording amendment (count)
       │       · 0 architectural change · 0 wireframe changes
       │       ▸ TOTAL AUTHORIZATION ACTS: 2
       │
       └─ YES
           └─ DECISION 3 — which commitment yields?
               (I-15 · TW-6 · TW-12 itself)
               · Architectural. Scope not determinable in advance
               ▸ TOTAL AUTHORIZATION ACTS: 3+
```

### 5.2 Minimum acts by path

| Path | Acts | Mandatory amendments | Architectural change |
|---|---|---|---|
| **A** | **1** | 0 | No |
| **B → no violation** | **2** | 1 (wording) | No |
| **B → violation** | **3+** | ≥2 | **Yes** |

### 5.3 Two properties of the tree

**Only one branch reaches architecture.** Two of three terminal states require no architectural change; the third is reachable only through two prior determinations. **The escalation Phase 13 raised sits behind two gates, not one.**

**Decision 2 exists only under Binding B.** It is not a parallel question deferred for convenience — under Binding A it has no subject (§3.4). This asymmetry is what §6 tests.

---

## 6 — Irreducibility test

**Attempted reduction of the authorization question below Phase 14's boundary. Four routes tested.**

### 6.1 Route 1 — ask the secondary question first

**If Decision 2 could be asked before Decision 1, a "NO" might moot the binding entirely.**

**Fails.** Decision 2 asks whether an asymmetry *among outcome values* constitutes the prohibited harm. **Under Binding A no such asymmetry lies within TW-12's domain** — all four measured members cost one tap. The question has no referent unless the value layer is already in scope.

> **Asking Decision 2 first would silently presuppose Binding B.** That is not a reduction; it is deciding Decision 1 without saying so. **Decision 1 is logically prior and cannot be bypassed.**

### 6.2 Route 2 — subdivide the binding question

**Fails.** The question is binary over two exhaustive, mutually exclusive referents. A binary determination has no proper parts. The only adjacent question — the §3.1 sub-reading — **arises after** Binding B is adopted and does not subdivide the binding itself.

### 6.3 Route 3 — dissolve it by locating an existing binding

**Fails on evidence.** All twenty artifacts were searched (§1.5); none states TW-12's subject. Four artifacts *use* the phrase at the answer layer (§2.2), and Phase 06 §A.1 defines it there.

> **Usage is evidence, not a binding.** Converting a consistent pattern of usage into a governing determination **is itself the authorization act in question.** The route dissolves nothing — it relocates the same act.

### 6.4 Route 4 — replace both with one omnibus question

*"Is TW-12 currently satisfied?"* would be **one** act instead of one-or-two.

**Fewer acts, larger surface.** It decides the binding and the failure-clause reading **together, without separating them**, and produces no reusable binding for future executions of the test. A later reviewer inherits the verdict without the reasoning and must re-derive both.

> **"Fewest authorization acts" and "smallest authorization surface" are different metrics.** The success condition names the second. Phase 14's decomposition costs at most one additional act and yields two independently reversible determinations, each deciding exactly one thing.

### 6.5 Result

> ### Phase 14 reached the smallest decision boundary. It is irreducible.
>
> **Because:** the question is binary and has no proper parts (6.2) · no artifact binds it, so the act cannot be relocated (6.3) · the only candidate for reordering presupposes its answer (6.1) · and the only smaller-by-count alternative enlarges the surface it decides (6.4).

**What this phase adds is not a smaller question but a mapped consequence space:** which branches terminate, which reach architecture, how many acts each costs, and what each leaves unresolved.

---

## 7 — Compliance statement

| Requirement | Status | Verification |
|---|---|---|
| **No recommendation** | **Met** | Neither binding is endorsed. §3.5 explicitly records that reconciliation cost is *not* an argument for a binding. Evidence favouring either reading is reported as consequence, never as conclusion |
| **No amendment** | **Met** | Twenty prior artifacts byte-identical at completion. No amendment text authored anywhere; §4 gives counts and character only |
| **No architecture change** | **Met** | I-15, TW-6, the five-value enum, the four-answer model, and Phase 08 §4.3 are cited as fixed inputs (§1.4) and are not reinterpreted |
| **No visual-design activity** | **Met** | No layout, styling, component, or interface decision appears. Visual design remains unauthorized under both bindings (§4.3) |
| **No new object** | **Met** | The eleven-object claim is untouched. *Answer* and *outcome-value* are analytical layers of existing structure, not domain objects |
| **No reopening of settled decisions** | **Met** | Phase 13's measurement, Phase 14's reduction, and every frozen commitment are treated as inputs. Phase 08 §11.1's staleness is *observed* (per Phase 14 §2.8) but not edited |
| **No UI changes** | **Met** | All six wireframe files unchanged; `06-capture.html`'s structure is exactly as Phase 13 left it |
| **Capture unmodified** | **Met** | Verified unchanged |

### 7.1 The remaining authorization surface

> **One binary determination:** does TW-12's *"each of the four outcomes"* bind at the **answer** layer or the **outcome-value** layer?
>
> **Under the first:** one act, no amendments, no changes, and the escalation closes — leaving one durable ambiguity (§2.4) and one question placed outside the tripwire's reach (§2.5).
>
> **Under the second:** at least two acts and one wording amendment; architecture is reached only if a further determination finds violation.
>
> **Neither is selected here.**

---

*Consequence analysis complete. Twenty prior artifacts verified byte-unchanged. No binding selected, no amendment authored, no architecture altered, no visual design produced, no new object introduced, no settled decision reopened. The authorization surface is mapped and left intact.*
