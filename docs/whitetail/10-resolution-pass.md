# 10 — Resolution Pass: E1 · TW-5 · TW-6

## Whitetail Club & Shore Lodge — Stewardship Intelligence System

**Governed by:** [`00-project-governance.md`](00-project-governance.md) — binding.
**Status:** **DOCUMENT ONLY. Nothing is applied.** All fifteen prior artifacts remain byte-unchanged, verified at completion.
**Two amendments are specified below as exact before/after text.** They are proposals awaiting authorization, not edits.

> **Why nothing is applied here:** an unfreeze the analyst grants themselves is not a freeze. This document proves the two amendments are minimal and necessary; authorizing them is a separate act.

---

## §1 — Resolution objective

Phase 09 left three blockers between the architecture and implementation. This pass resolves them **analytically**, with the minimum possible change, and then answers honestly whether visual design is unblocked.

### The invariant this pass protects

> **The product doesn't make better decisions by telling people what to believe. It makes better decisions by preventing the system from forgetting why something was believed.**

Phase 09 demonstrated the failure that makes this necessary:

> **A correct outcome can make incorrect reasoning look correct unless the system preserves the grounds.**

### What is in scope

| Blocker | Problem | Kind |
|---|---|---|
| **E1** | The absence distinction is not machine-readable | Frozen-constraint inconsistency |
| **TW-5** | Returned rationale does not carry its grounds | Interaction defect |
| **TW-6** | Compression can erase epistemically consequential reasons | Missing falsifiable test |

**Not in scope, and not touched:** E4/I7 · contest-detection silence · Phase 03 A1 · any redesign · any visual decision · any new object · any new artifact.

---

## §2 — E1: machine-readable absence distinction

### 2.1 The finding — this is smaller than Phase 09 assumed

Phase 09 concluded E1 requires a machine-readable distinction, and recommended against resolving it unilaterally. **Investigating the exact text changes the character of the fix entirely.**

`absent-at-described-location` appears **twice in Phase 04's own body**:

```
line 144  §4.A walkthrough:
          | **TASK outcome** | Closed, `outcome = absent-at-described-location`. …

line 226  §4.1 summary table — Phase 04's own five-outcome roll-up:
          | **A** not found | `absent-at-described-location` | Yes — search history | **No** …

line 484  §11 #6 — the change-list row:
          `OBSERVATION.outcome ∈ {confirmed, inconclusive, contradicted, absent}`
```

> **§11 #6 under-lists the body twice over — including Phase 04's own summary table.**
>
> **E1 is not a design gap requiring a new value. It is a transcription omission in a summary row that already contradicts the section it summarizes.**

This matters for scope: the amendment does not *decide* anything. It makes a change-list row match the analysis it was summarizing.

### 2.2 What exact distinction must become machine-readable

| | `absent-at-described-location` | `absent` |
|---|---|---|
| **Means** | Searched the described area; did not find it | Confirmed not present |
| **Epistemic content** | *"We may have searched the wrong place"* | *"There is definitively nothing here"* |
| **Confidence behaviour** | **Contests** the location condition → `UNRESOLVED` | **Supersedes** → high confidence |
| **Established in** | Phase 04 §4.A | Phase 04 §4.D-ii |

**One binary distinction, on one attribute, of one object.**

### 2.3 Where it belongs

**`OBSERVATION.outcome`** — where Phase 04 §11 #6 already placed the attribute. Not on `CONDITION` (derived, cannot carry testimony). Not on `TASK` (transient; the distinction must outlive it).

### 2.4 Why it must be stored rather than derived

Three derivation paths tested, all fail:

| Candidate | Fails because |
|---|---|
| Presence of search-extent data | Optional — Phase 06 A.6 classes it *"needs training"*. Absence of extent data means nothing |
| Provenance class | **Both are `OBSERVED`.** No discriminating power |
| Observer assertion at capture | That assertion **is** the thing needing storage. Circular |

### 2.5 The minimum amendment

Two candidate shapes were compared:

| Shape | Cost |
|---|---|
| **(a) One additional enum member** | +1 value on an existing attribute |
| (b) A qualifier attribute on `absent` | +1 field, **+1 nullability rule**, **+1 conditional-validity rule** (*"present only when outcome = absent"*) |

**(a) is strictly smaller.** And because the value already exists in Phase 04's body, (a) introduces no new vocabulary at all.

> ### PROPOSED AMENDMENT 1
>
> **File:** `04-architectural-proof.md` · **§11 row 6** · **line 484**
>
> **BEFORE**
> ```
> | **6** | **`OBSERVATION.outcome ∈ {confirmed, inconclusive, contradicted, absent}`.** | Attribute | Gap 1 |
> ```
>
> **AFTER**
> ```
> | **6** | **`OBSERVATION.outcome ∈ {confirmed, inconclusive, contradicted, absent, absent-at-described-location}`.** | Attribute | Gap 1 |
> ```
>
> **Rationale:** §4.A (line 144) and §4.1's summary table (line 226) both already use this value. The §11 row under-lists them. **This is a transcription correction, not a design decision.**

**No renaming.** `absent-at-described-location` is verbose, and renaming it would be improving the data model — outside this pass's scope.

### 2.6 The four-peer-outcomes principle survives — Phase 08 already anticipated this

A five-value enum does **not** break Phase 08's four peer answers, and Phase 08 §4.3 already specified the mapping:

```
  INTERACTION (Phase 08 §4.3)              STORAGE (post-amendment)
  ───────────────────────────              ────────────────────────
  ( ) Found it                        →    confirmed
  ( ) Found the place — couldn't tell →    inconclusive
  ( ) Found something different       →    contradicted
  ( ) Not there                       →    ┐
        ↓ follow-up binary                 │
        ( ) I confirmed it isn't there →   absent
        ( ) I couldn't find it         →   absent-at-described-location
```

> **Four peer answers is an interaction property. Five outcome values is a storage property. The follow-up binary is the mapping — and Phase 08 wrote it before knowing where the second value would live.**

### 2.7 Does it introduce a new conceptual object?

**No.** An enum member on an existing attribute of an existing object. **The eleven-object claim from Phase 07 is unaffected**, and Phase 07's falsification result stands.

---

## §3 — Affected phase verification

Traced through all eight checkpoints required by the brief.

| Checkpoint | Change? | Detail |
|---|---|---|
| **Observation semantics** | **None** | Both remain immutable testimony, `OBSERVED` provenance, role-attributed |
| **Confidence derivation** | **None to the rule** | Phase 04 §6.2 already specified contest-vs-supersede. It could not be *applied* without the distinction. **The amendment supplies an input, not a rule** |
| **Contest behaviour** | **None** | §4.A already specified that not-found contests the location condition |
| **Attention derivation** | **None to the rule** | One state can resurface, one cannot — already implied by the resulting band |
| **Decision evidence** | **None** | `evidence_basis` records bands. The bands are now correct rather than arbitrary |
| **Decision recognition** | **None** | Confirmed-absent means D3 need not verify that zone; not-found means it must. Already implied |
| **Historical interpretation** | **Improves** | *"Searched three times, never found"* and *"confirmed absent three times"* become distinguishable. **Improvement by correction is not a principle change** |
| **Future observations** | **None** | Phase 04 §4.A's *"the next task is not identical"* already held |

### 3.1 Conclusion

> **The amendment is REPRESENTATIONAL, not CONCEPTUAL.**
>
> Every downstream behaviour was already correctly specified in Phase 04's body. The amendment gives derivation the input those specifications assumed it had.

**This framing is load-bearing.** It is what prevents the enum correction from being read as license to reopen settled architecture. **No principle changes. No phase other than 04 is affected by E1.**

---

## §4 — TW-5: returned grounds

### 4.1 The defect

Phase 08 §5.1 renders:

```
│  LAST TIME                                           │
│  "2 Nov — delayed 45 min. Estimate held."            │
```

**What was decided, and what happened. Not what was known.**

`evidence_basis` exists in the model (Phase 04 §3 ⑩, Phase 07 C7) precisely to prevent outcome bias. **It is not rendered on return.** The safeguard is architecturally present and interactionally absent.

### 4.2 What must return

**The minimum to break outcome bias:** the reader must be able to distinguish *"this worked and we knew what we were doing"* from *"this worked and we were guessing."*

> **Requirement: `LAST TIME` must carry the weakest ground the decision rested on, in the same reason-language used for live conditions.**

### 4.3 Why the weakest ground, and only that

| Option | Verdict |
|---|---|
| All grounds for all inputs | **Rejected** — multiplies with decision complexity; fails §5's no-scroll test |
| The *decisive* ground | **Rejected** — "decisive" requires a judgement the system cannot make |
| **The weakest ground** | **Adopted** — it determines whether the whole decision was a guess, and is computable from `evidence_basis` without interpretation |

### 4.4 What cannot be omitted

| Element | Status | Why |
|---|---|---|
| **The weakest ground, as a reason-phrase** | **PRESENT — cannot be omitted** | Without it, a successful outcome reads as validated reasoning |
| Whether verification was offered and declined | **Disclosed** | Valuable, but **not minimum** — see 4.6 |
| The full `evidence_basis` across all inputs | **Disclosed** | Reachable in one action |
| The outcome itself | **PRESENT** — already specified | Unchanged from Phase 08 |

### 4.5 It needs no new taxonomy

The returned ground uses **the same reason-phrases as live conditions** (Phase 08 §2.1). It therefore inherits the five-way distinction automatically:

| Prior grounds were | Returned phrase reads |
|---|---|
| Observed fact | *"checked that morning"* |
| Assumption | *"never checked here at the time"* |
| Contested observation | *"two observers disagreed"* |
| Unresolved absence | *"looked, no answer"* |
| Confirmed absence | *"confirmed not present"* |

> **TW-5's content requirement and TW-6's compression rule are the same mechanism.** The returned ground is a compressed reason-phrase, governed by §6's tests. **That is why one line suffices** — it is not a new display type, it is an existing one pointed backwards in time.

### 4.6 Minimality test

Does the weakest-ground line alone break the chain?

```
   decision on ASSUMED grounds → outcome good → rationale returns
                                                      │
                              ┌───────────────────────┘
                              ▼
   "Estimate held."  +  "Decided on: never checked here at the time."
                              │
                              ▼
   ★ A reader cannot construe validation from this pairing ★
```

**Yes.** *"Verification offered and declined"* would strengthen it but is not required, because the weakest-ground line already makes the guess visible. **Minimum means minimum.**

> ### PROPOSED AMENDMENT 2a
>
> **File:** `08-interaction-architecture.md` · **§5.1** · **line 276**
>
> **BEFORE**
> ```
> │  LAST TIME                                           │  ← prior rationale
> │  "2 Nov — delayed 45 min. Estimate held."            │     by default (C7)
> ```
>
> **AFTER**
> ```
> │  LAST TIME                                           │  ← prior rationale
> │  "2 Nov — delayed 45 min. Estimate held."            │     by default (C7)
> │  Decided on: thaw lag never checked here at the time.│  ← weakest ground
> │                                                      │     (TW-5) — PRESENT
> ```
>
> **Rationale:** TW-5. Without the grounds adjacent to the outcome, a guess that worked reads as validated judgment, and Phase 09's strongest corruption chain runs unbroken.

---

## §5 — No-scroll compatibility test

### 5.1 Apply the disclosure test first

Phase 08 §8.4: **would revealing this change the decision?**

> **Yes — that is the entire purpose of TW-5.** A reader who sees the grounds may decline to follow a rationale they would otherwise have followed.

**Therefore the weakest-ground line is PRESENT material and cannot be hidden to save space.** Phase 08 §8.4 forecloses solving this by disclosure, and the brief forecloses solving it by removal.

### 5.2 Does it fit?

**One line, and it does not scale.**

```
   one DECISION  →  one weakest ground  →  one line
```

Independent of zone count, condition count, and decision complexity. A D3 decision spanning twelve zones still rested on one weakest ground.

### 5.3 It does not worsen the T4 pressure

Phase 09's T4 tension is about **per-zone condition reasons in the current-conditions block** — material that *does* multiply with zone count. `LAST TIME` is a different block describing a different thing: **one prior decision, not N current conditions.**

| Block | Scales with | TW-5 effect |
|---|---|---|
| `WHAT WE KNOW` — current conditions | **Zone count** — the T4 pressure | None |
| `LAST TIME` — prior decision | **Nothing** — always one decision | +1 line |

**Verdict: no conflict.** TW-5 and the no-scroll rule coexist. **The T4 per-zone pressure is real and remains — it belongs to TW-6**, and §6's generated-phrase requirement is what governs whether it can be met.

---

## §6 — TW-6: compression integrity test

### 6.1 Locating the line

The degradation ladder Phase 09 identified:

```
  1  "Two observations disagree about whether the valve
      was inspected after repair."        ← full grounds
  2  "Two disagree."                      ← PERMITTED (Phase 08 §2.1)
  3  "Contested."                         ← FORBIDDEN
  4  "Amber"                              ← FORBIDDEN
```

Phase 08 §2.1 **already permits step 2** — scanning phrases are established. So the test must locate the boundary between **2 and 3**, which is where the architecture has never drawn a line.

**What actually distinguishes them:**

> **Step 2 describes what happened. Step 3 names a category from a closed vocabulary.**

*"Two disagree"* is a statement about the world. *"Contested"* is a term of art requiring the taxonomy to interpret. **The vocabulary is the failure**, not the brevity.

### 6.2 The three tests

Each is falsifiable by a named method. None requires judgement about clarity.

#### T-A — Self-explanation

> **Method:** show the phrase to a person who has never used the system. Ask: *"what does this tell you about this place?"*
> **Fails if:** they cannot answer without first being taught a vocabulary.

| Phrase | Result |
|---|---|
| *"two disagree"* | **PASS** — self-explaining |
| *"never checked"* | **PASS** |
| *"looked, no answer"* | **PASS** |
| *"Contested"* | **FAIL** — a term of art |
| *"Assumed"* · *"Unresolved"* · *"Amber"* | **FAIL** |

#### T-B — Non-ordering

> **Method:** present any two confidence phrases and ask *"which is worse?"*
> **Fails if:** respondents produce a consistent order.

**Scope note:** this applies **only to confidence phrases.** Time-to-close phrases *should* order — *"closes in 2 hours"* vs *"closes in 2 days"* is a real magnitude with a real unit, and Phase 08 §2.1 makes it the legitimate sort key.

#### T-C — Referent preservation

> **Method:** ask what the phrase points at.
> **Fails if:** it names a class of conditions rather than a specific state at a specific place.

*"Two disagree"* points at **these two observations, here**. *"Contested"* points at a **category** that could apply anywhere. **The loss of referent is the loss of epistemics** — a category tells you what kind of uncertainty it is, not what is actually unknown.

### 6.3 The mechanical guard — the strongest test

The three above are behavioural and need people. **This one is checkable in code review, on any build, by one person.**

> ### **No interface string may be produced by a lookup keyed on band.**
>
> If the code does `PHRASES[band]` — a map, a switch, a dictionary, a constant table — **that is a taxonomy with a display layer, and it will harden into one.**
>
> **The phrase must be composed from the condition's own data:** the count of disagreeing observations, the date of the last check, the extent and date of the failed search.

This is exactly why *"two disagree"* is safe and *"Contested"* is not — **one is generated from facts, the other is retrieved from a table.** A generated phrase cannot drift into a taxonomy, because there is no table to drift into.

**This extends Phase 09 TW-1** from *string matching* to *construction path*. TW-1 catches the band name appearing in output; this catches the band name **determining** output.

### 6.4 The questions answered

| # | Question | Answer |
|---|---|---|
| 1 | What may safely be shortened? | Any grounds statement, **provided the shortened form passes T-A, T-B, T-C and is generated rather than looked up** |
| 2 | What must never be compressed away? | **The referent** — what specifically is unknown, at what place. Compression may drop words; it may never drop the subject |
| 3 | When is a scanning phrase sufficient? | Only where **no decision is committed on that surface** |
| 4 | When must full grounds be present? | In any decision envelope, per the disclosure test |
| 5 | Can a phrase stand alone? | **Yes — in scanning contexts only**, and only if the full grounds are one action away |
| 6 | What makes a phrase unsafe? | It requires vocabulary (T-A), it orders (T-B), or it names a class (T-C) |
| 7 | How is internal vocabulary prevented from surfacing? | TW-1 greps strings; **§6.3 blocks the construction path** |
| 8 | How is score reconstruction prevented? | T-B detects it behaviourally; **§6.3 prevents the mechanism** — an unordered generated set has nothing to rank |

> ### PROPOSED AMENDMENT 2b
>
> **File:** `08-interaction-architecture.md` · **§2.1**, appended after the two-register table
>
> **ADD:**
> ```
> ### 2.1.1 Compression integrity (TW-6)
>
> A compressed phrase is safe only if it passes all three:
>
> T-A Self-explanation  — understandable without learning a vocabulary
> T-B Non-ordering      — no consensus "which is worse" ordering emerges
>                         (confidence phrases only; time-to-close may order)
> T-C Referent preserved — points at a specific state at a specific place,
>                          not at a class of conditions
>
> MECHANICAL GUARD: no interface string may be produced by a lookup
> keyed on band. `PHRASES[band]` is a taxonomy with a display layer.
> Phrases are composed from the condition's own data.
>
> A phrase may stand alone only where no decision is committed on
> that surface.
> ```
>
> **Rationale:** TW-6. Phase 08 §2.1 permitted scanning phrases without defining where compression becomes a category. These tests draw that line and make it falsifiable.

---

## §7 — Combined failure-path replay

The three resolutions tested as one system, then each chain replayed.

### 7.1 The end-to-end scenario

| # | Step | What happens post-resolution |
|---|---|---|
| 1 | Observation made | Crew searches for a valve at a described location |
| 2 | Absence involved | Did not find it |
| 3 | **Which absence?** | Capture's fourth answer + follow-up binary → **`absent-at-described-location`** *(E1)* |
| 4 | Confidence derived | Observation **contests** the location condition → `UNRESOLVED`. **Correct, because derivation now has the input** *(E1)* |
| 5 | Decision recognized | D3 window opens; Attention surfaces the gap |
| 6 | Decided on imperfect grounds | Window closing; verification declined; committed on unresolved location |
| 7 | Outcome successful | Blowout succeeds anyway |
| 8 | Surfaced later in `LAST TIME` | *"2 Nov — sequenced zone 4 last. Worked."* **+ "Decided on: valve location — looked, no answer."** *(TW-5)* |
| 9 | User scans returned context | Phrase is generated from the failed-search record, self-explaining, non-ordered, referent-preserving *(TW-6)* |
| 10 | Grounds are compressed | *"looked, no answer"* passes T-A, T-B, T-C and is composed from data, not looked up |
| 11 | User decides whether to follow again | **They can see the prior success rested on something nobody had resolved** |

### 7.2 The question

> **Could a reasonable user now mistake a successful outcome for evidence that the original reasoning was correct?**

**No.** Three independent reasons, each sufficient:

1. **The grounds are adjacent to the outcome.** *"Worked"* and *"looked, no answer"* occupy the same block. Reading one without the other requires ignoring a present line.
2. **The grounds say what was unknown, not how uncertain it was.** *"Looked, no answer"* names the actual gap — a specific valve nobody located — rather than a confidence level that could be mentally discounted.
3. **The phrase cannot be rank-normalized.** With no ordered vocabulary, there is no *"it was only slightly uncertain"* reading available.

### 7.3 Chain-by-chain replay

**Chain 1 — guess becomes institutional knowledge**

```
  ASSUMED decision → successful outcome → rationale returns
                                              │
                                    ✂ BROKEN HERE (TW-5)
                                              │
                          grounds return WITH the rationale
                                              ↓
                    "appears validated" is no longer available
                                              ↓
                   not repeated on false authority → no KNOWLEDGE record
```

**Chain 2 — searched-not-found treated as confirmed-absent**

```
  searched, not found → [ stored as `absent` ]  ✂ BROKEN AT STORAGE (E1)
                                              │
                    stored as `absent-at-described-location`
                                              ↓
                     derivation CONTESTS rather than supersedes
                                              ↓
                    confidence suppressed → UNRESOLVED, correctly
```

**Chain 3 — grounds compress into a rank**

```
  full grounds → "two disagree" → "Contested"  ✂ BROKEN HERE (TW-6 T-A)
                                       │
                         also blocked mechanically: no PHRASES[band]
                                       ↓
                    step 4 ("Amber") is unreachable — nothing to order
```

**All three break, at three distinct points, by three independent mechanisms.** No single mechanism carries two chains, so no single regression reopens more than one.

---

## §8 — Amendment boundary

**Default: UNCHANGED.** An amendment appears only where the resolution demonstrably requires it.

| Artifact | Status | Reason |
|---|---|---|
| `research-to-design-handoff-v3.md` | **UNCHANGED** | Evidence boundary untouched |
| `source-register.md` | **UNCHANGED** | No source claim affected |
| `00-project-governance.md` | **UNCHANGED** | No governance rule affected |
| `01-system-planning.md` | **UNCHANGED** | Superseded planning artifact |
| `01-system-model.md` | **UNCHANGED** | No principle changes (§3) |
| `02-evidence-and-framing-resolution.md` | **UNCHANGED** | Unrelated |
| `02-information-architecture.md` | **UNCHANGED** | Confidence rule unchanged — **only now computable** |
| `03-phase04-evaluation-and-plan.md` | **UNCHANGED** | Gate criteria unaffected |
| **`04-architectural-proof.md`** | **AMENDED** | **§11 row 6, line 484.** Enum corrected to match §4.A (line 144) and §4.1 (line 226) |
| `05-decision-experience-model.md` | **UNCHANGED** | Envelope and band model unaffected |
| `06-operational-validation.md` | **UNCHANGED** | Behavioural conclusions unaffected |
| `07-product-specification.md` | **UNCHANGED** | **Eleven objects preserved.** Falsification result stands |
| **`08-interaction-architecture.md`** | **AMENDED** | **§5.1 line 276** (weakest-ground line) and **§2.1** (compression tests) |
| **`09-epistemic-failure-path.md`** | **UNCHANGED** | See 8.1 |
| `property-framing-analysis.md` | **UNCHANGED** | Unrelated |

### 8.1 Why Phase 09 is not amended

TW-5 and TW-6 carry *"Currently FAILS"* annotations. Once the amendments land, those become stale.

**They are superseded by this document, not edited.** Three reasons:

1. **Document-don't-patch is established practice** — Phase 04 handled two Phase 03 defects this way; Phase 08 handled the enum this way; Phase 09 handled TW-5/TW-6 this way.
2. **A tripwire must stay testable against future artifacts.** Rewriting *"currently FAILS"* to *"passes"* would convert a permanent regression detector into a historical status note. **TW-5 and TW-6 must keep failing any build that reintroduces the defect.**
3. Phase 09 is a record of analysis at a point in time. Its accuracy *as a record* does not depend on the defects remaining open.

### 8.2 What must not change under any circumstances

| | |
|---|---|
| **The eleven objects** | Neither amendment adds one |
| **Four peer answers at capture** | Preserved — §2.6 |
| **No confidence score, rank, band-as-label, or sort** | Reinforced by §6, not relaxed |
| **No contest-resolution control** | Untouched |
| **Attention derived and stateless** | Untouched |
| **Decisions recognized, not created** | Untouched |
| **Identity outside the domain record** | Untouched — **E4/I7 not reopened** |
| **Internal band vocabulary stays internal** | Strengthened by §6.3 |

---

## §9 — Exit criteria

### 9.1 The three blockers

| | Analytically | Procedurally |
|---|---|---|
| **E1** | **RESOLVED** — §2, minimum amendment identified and specified | **Outstanding** — Amendment 1 unauthorized |
| **TW-5** | **RESOLVED** — §4, minimum content requirement defined and specified | **Outstanding** — Amendment 2a unauthorized |
| **TW-6** | **RESOLVED** — §6, three falsifiable tests plus a mechanical guard | **Outstanding** — Amendment 2b unauthorized |

### 9.2 The eleven standing conditions

Verified against the resolutions as specified:

| Condition | Status |
|---|---|
| No new object introduced | **PASS** — §2.7 |
| No forbidden affordance introduced | **PASS** — nothing added but one line of text and three tests |
| No confidence score or rank exists | **PASS** — §6 strengthens the prohibition |
| Contest remains unresolvable by interface action | **PASS** — untouched |
| Attention remains derived and stateless | **PASS** — untouched |
| Decisions remain recognized, not created | **PASS** — untouched |
| No-scroll remains testable | **PASS** — §5, and TW-5 does not scale |
| Disclosure test remains intact | **PASS** — §5.1 applies it rather than circumventing it |
| Four peer answers preserved | **PASS** — §2.6 |
| Identity remains outside the record | **PASS** — E4/I7 not reopened |
| Internal vocabulary stays internal | **PASS** — strengthened by §6.3 |

### 9.3 The verdict

> # VISUAL DESIGN REMAINS BLOCKED
>
> — until **Amendment 1**, **Amendment 2a**, and **Amendment 2b** are authorized and applied.

**This is precision, not hedging.** All three blockers are analytically resolved; all three are procedurally outstanding, because this document applies nothing. **The gap between the two is exactly one act of authorization**, and it belongs to whoever owns the freeze.

**On authorization and application, all eleven conditions in 9.2 pass and visual design is unblocked.** No further analysis is required, and none should be performed — the remaining open questions in §10 are deployment matters, not design gates.

---

## §10 — Remaining open questions

Only genuinely unresolved items. **Nothing is reopened that this pass did not need to touch.**

| # | Item | Status | Why it is not a design gate |
|---|---|---|---|
| **E4 / I7** | The documented but unserved need — *"who saw this, so I can ask them"* (`01-system-planning.md:473`) | **Open, untouched** | This pass produced no evidence making resolution unavoidable. Recorded so it is not silently superseded a second time |
| **Contest detection** | Silent when a person does not mark the contradiction (Phase 04 §6.2) | **Open** | Deployment observation. Explicit marking remains the specified default |
| **Phase 03 A1** | Knowledge-record supersession when a pattern proves wrong | **Open** | Resolve before Year 3 (Phase 06 B.3) |
| **T4 compression pressure** | Per-zone condition reasons at D3 scale | **Now governed, not eliminated** | §6's generated-phrase requirement constrains it. **Whether generated phrases actually fit at D3 scale is the first real test of §6** |
| **U2 and the Phase 07 §13 set** | Field-validation questions | **Open** | Deployment gates, unchanged since Phase 06 |
| **Phase 06's three conditions** | U2 validation · non-punitive `evidence_basis` use · A1 by Year 3 | **Open** | Deployment preconditions, unchanged |

### 10.1 One note on T4

§6 governs compression but does not prove that a generated phrase fits inside a D3 envelope alongside twelve zones. **That is now a wireframe-stage test rather than an unrecognized risk**, and it is the first thing the compression tests will be used on.

If generated phrases cannot fit, the response is **not** to shorten them into categories — §6 forecloses that. It is to narrow the D3 envelope to the weakly-grounded zones only, which Phase 09 §3 T4 already identified as the decision-relevant subset.

---

*Resolution pass complete. **Nothing applied.** All fifteen prior artifacts verified byte-unchanged. Three amendments specified as exact before/after text, awaiting authorization. No new object, no new artifact, no visual or implementation decision made.*
