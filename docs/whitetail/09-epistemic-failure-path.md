# 09 — Epistemic Failure Path Analysis

## Whitetail Club & Shore Lodge — Stewardship Intelligence System · Phase 09 planning

**Governed by:** [`00-project-governance.md`](00-project-governance.md) — binding. **Phases 01–08 frozen and unmodified.**
**The question:** *where can this system accidentally turn an uncertain observation into an apparently certain fact?*
**Method:** failure path first. The happy path does not appear in this document.
**Constraint:** [`04-architectural-proof.md`](04-architectural-proof.md)'s enum is **investigated, not repaired.**

---

## §1 — Phase 08 exit assessment

### What Phase 08 established

Four interaction surfaces — Place, Capture, Decision, Attention — specified at wireframe level, with no fifth required. Its central finding: **the interface's job is mostly refusal.** Seven of ten anti-patterns are absent affordances rather than wrong ones.

**Established and now binding:** confidence rendered as a reason, never a score, rank, badge, or sort key · internal band vocabulary stays internal · completion is not separate from answering *"what did you find?"* · four finding outcomes remain peers · contests have no resolve affordance · Attention is derived with no state, no badge, no dismissal · decisions are recognized, not created · the no-scroll rule and the disclosure test are falsifiable at wireframe stage.

### What Phase 08 left open

One question, carried forward: Phase 04 froze `outcome` at four values while §4 distinguishes two epistemically opposite absence states. Investigated in [§6](#6--open-enum-investigation).

### What this phase adds

Phase 08 asked *how does a person encounter this?* **This phase asks how the encounter goes wrong** — and finds that the sharpest corruption path runs through Phase 08's own wireframe, on the mechanism the project is proudest of.

---

## §2 — The failure path

```
  reality
     │  T1  capture
     ▼
  OBSERVATION
     │  T2  derivation
     ▼
  CONDITION ── confidence computed
     │  T3  surfacing
     ▼
  ATTENTION (derived)
     │  T4  envelope
     ▼
  DECISION ── rationale + evidence basis
     │  T5  commitment
     ▼
  OUTCOME
     │  T6  accumulation
     ▼
  KNOWLEDGE ──▶ returns as context on a future DECISION
     │
     └──▶ shapes the next OBSERVATION
```

**Epistemic corruption is cumulative and directional.** Uncertainty lost at T1 cannot be recovered at T4. Every transition is a place where an honest *"we don't know"* can become an unmarked assertion — and once unmarked, nothing downstream can tell it was ever uncertain.

> **The system's defining property is not that it knows things. It is that it knows how it knows them.** Every failure below is a loss of that second-order knowledge while the first-order claim survives intact — which is worse than losing both, because the surviving claim looks fine.

---

## §3 — Failure modes by transition

Each transition analysed on six axes. **Human failure** = how a person shortcuts, misreads, or over-trusts. **System failure** = how the interface, model, or derived logic manufactures certainty without intending to.

### T1 — reality → OBSERVATION *(capture)*

| Axis | Failure |
|---|---|
| **Information lost** | Search extent, duration, method, and conditions of looking. **The *how* of the looking, which is what makes a failed search reusable** |
| **False simplification** | Four peer outcomes compress rich field reality. *"Found the place — couldn't tell"* loses **why** it couldn't be told, which is the method-efficacy knowledge Phase 05 §6.3 called uniquely valuable |
| **UX affordance risk** | A default-selected outcome · a "quick confirm" shortcut · autofill from last visit · any path where confirming is fewer actions than reporting absence |
| **Machine-readable collapse** | **The absence collapse** — [§6](#6--open-enum-investigation) |
| **Human behaviour** | End-of-day recall recorded as direct observation. Timestamp and provenance both silently wrong, and **nothing detects it** (Phase 06 C.2) |
| **Future-feature risk** | Capture templates · "same as last time" · voice transcription that normalises hedged speech into flat assertions |

**System failure specific to T1:** if capture ever *derives* provenance from context rather than from what the person did — inferring `MEASURED` because a meter was paired, say — the class becomes an assumption about the person rather than a record of the act.

### T2 — OBSERVATION → CONDITION *(derivation)*

| Axis | Failure |
|---|---|
| **Information lost** | Supporting observations become invisible behind a derived value. The minority observation loses salience even when retained |
| **False simplification** | *"Most recent + highest provenance wins"* is a rule, not a truth. A single dominant observation can mask genuine variability at a place |
| **UX affordance risk** | Rendering the condition value prominently with its evidence behind disclosure → **the derived interpretation acquires more authority than the testimony beneath it** |
| **Machine-readable collapse** | **Contest detection.** Phase 04 §6.2 makes detection hybrid, *explicit by default* — a person marks the contradiction. **If they don't, the contest is silently missed** and a genuinely conflicted condition renders as confidently current |
| **Human behaviour** | Reading a condition as a fact rather than an interpretation — the exact confusion the system exists to remove |
| **Future-feature risk** | "Smart" reconciliation · ML-derived conditions · anything that resolves conflict without a human looking again |

> **T2 is where the observation/condition split earns its keep — or fails silently.** The split makes provenance representable. It does not make anyone look at it.

### T3 — CONDITION → ATTENTION *(surfacing)*

| Axis | Failure |
|---|---|
| **Information lost** | **Why** an item needs a person. *"3 zones need checking"* without the reason converts an epistemic gap into a chore |
| **False simplification** | Attention items are binary — present or absent — while conditions are five-banded. **The banding does not survive the transition**, so `ASSUMED` and `UNRESOLVED` can surface identically |
| **UX affordance risk** | **A count badge (I4)** · sorting · severity icons · priority · anything implying a queue |
| **Machine-readable collapse** | If attention items are ever **materialized** rather than derived, they acquire identity and state — and a derived view becomes a backlog |
| **Human behaviour** | Treating Attention as a to-do list; working down it; wanting to clear it |
| **Future-feature risk** | Notifications · digests · a priority score · "urgent" flags |

### T4 — ATTENTION → DECISION *(envelope)*

| Axis | Failure |
|---|---|
| **Information lost** | The confidence *reason*, under compression pressure |
| **False simplification** | *"3 zones unchecked"* instead of naming which and why |
| **UX affordance risk** | Summary rows · aggregate counts inside the envelope · a "details" affordance that decision-critical material hides behind |
| **Machine-readable collapse** | — |
| **Human behaviour** | Deciding from the summary without opening anything |
| **Future-feature risk** | A ranked or recommended sequence |

> **A tension neither Phase 05 nor Phase 08 noticed.** The **no-scroll rule** (Phase 08 §5.3) and the requirement that **every condition carries its reason** (Phase 08 §8.2) pull against each other under D3's per-zone load. Something has to give — **and what gives will be the reasons, because values are shorter than explanations.** Compression is where epistemics get dropped. See [§9 TW-9](#9--tripwires).

### T5 — DECISION → OUTCOME *(commitment)* — **the sharpest transition**

| Axis | Failure |
|---|---|
| **Information lost** | **The grounds.** Once committed, a decision made on `ASSUMED` and one made on `CONFIRMED` look identical unless `evidence_basis` is *rendered* |
| **False simplification** | A committed decision reads as authoritative **because it was committed** |
| **UX affordance risk** | **Verified in Phase 08 §5.1** — the `LAST TIME` block renders *"2 Nov — delayed 45 min. Estimate held."* **What was decided and what happened. Not what was known.** |
| **Machine-readable collapse** | — |
| **Human behaviour** | Precedent-following: *"we did X last time"* without checking that last time was a guess |
| **Future-feature risk** | Decision history lists · outcome-weighted ranking of past decisions |

**The full corruption chain:**

```
   decision made on ASSUMED grounds
        │
        ▼
   outcome happens to be good  ──────┐
        │                            │  post hoc ergo propter hoc
        ▼                            │
   rationale returns by default at  ◀┘
   the next equivalent decision (C7)
        │
        ▼
   reads as validated judgment — the grounds are not shown
        │
        ▼
   followed again · outcome again good
        │
        ▼
   accumulates into a KNOWLEDGE record
        │
        ▼
   ★ a guess has become institutional knowledge ★
```

> **This is the most dangerous path in the system, and it runs through the mechanism the project is proudest of.** `evidence_basis` exists precisely to prevent it. Phase 08's wireframe does not render it on return.
>
> **The safeguard is architecturally present and interactionally absent** — exactly the failure Phase 08 §1 warned about: *a commitment satisfied by the data model and destroyed by the interface.*

### T6 — OUTCOME → future OBSERVATION *(accumulation)*

| Axis | Failure |
|---|---|
| **Information lost** | Whether the outcome validated the reasoning or merely coincided with it |
| **False simplification** | *"Estimate held"* → the estimate was good. **Luck and judgment are indistinguishable in the record** |
| **UX affordance risk** | Knowledge records rendered without the count and provenance of observations beneath them |
| **Machine-readable collapse** | — |
| **Human behaviour** | Anchoring: prior knowledge shapes what the next observer looks for and reports |
| **Future-feature risk** | **Outcome-weighted knowledge ranking — learning from luck.** Also Phase 03 **A1**: no supersession mechanism, so a stale record is inherited with the authority of a true one (Phase 06 B.3) |

---

## §4 — Existing safeguards

Mapped to established phases only. **Where nothing protects a failure point, the row says so.** No safeguard is invented to complete the table.

| Failure | Safeguard | Source | Adequate? |
|---|---|---|---|
| Absence harder to record than presence | Four peer outcomes; answering *is* completing | Phase 08 §4.3 · Phase 06 A.1 | **Yes** |
| Confidence becoming a score | Reason not token; never a sort key | Phase 08 §2.1 · Phase 04 §6.1 | **Yes** |
| Internal vocabulary leaking to users | Band names are internal only | Phase 08 §2.1 | **Yes** |
| Contest resolved by picking a winner | **No resolve affordance exists** | Phase 08 §5.4 · Phase 05 E2 | **Yes** |
| Contest resolved by averaging | Prohibited absolutely; observations immutable | Phase 05 E2 · Phase 03 §4.1 | **Yes** |
| Attention becoming a backlog | Derived, no state, no badge, no dismiss, no assignment | Phase 08 §6.2 | **Yes** |
| User inventing a decision occasion | Decisions recognized, not created; two entry points | Phase 08 §9.1 | **Yes** |
| Decision-critical material hidden | Disclosure test — *if revealing it changes the decision, it was misfiled* | Phase 08 §8.4 | **Yes** |
| Envelope too wide to absorb | No-scroll rule as a falsifiable test | Phase 08 §5.3 | **Yes** |
| Autonomous dispatch | Surface and send are two actions | Phase 08 §6.4 · Phase 07 C5 | **Yes** |
| Identity creating authority | Role and date only | Phase 08 §2.2 · Phase 07 C8 | **Yes** |
| Condition presented without provenance | Never rendered without its reason | Phase 07 C1/C2 · Phase 08 §8.2 | **Yes** |
| Observation edited after the fact | Immutable; `COMMITTED` terminal | Phase 08 §4 · Phase 03 §4.1 | **Yes** |
| **Rationale returning without its grounds (T5)** | **`evidence_basis` exists in the model** | Phase 04 §3 ⑩ · Phase 07 C7 | **NO — not rendered on return** (Phase 08 §5.1) |
| **Contest missed when marking is skipped (T2)** | Hybrid detection, explicit by default | Phase 04 §6.2 | **PARTIAL — silent when skipped** |
| **End-of-day recall as direct observation (T1)** | Named as a degrading shortcut | Phase 06 C.2 | **NO — explicitly unsolved** |
| **Search extent not recorded (T1)** | Optional note; *"needs training"* | Phase 06 A.6 · Phase 08 §4.3 | **PARTIAL — training-dependent only** |
| **No-scroll vs. always-present reasons (T4)** | — | — | **NO — tension unrecognised until now** |
| **Stale knowledge inherited with authority (T6)** | — | Phase 03 **A1** open; Phase 06 B.3 | **NO — open since Phase 03** |
| False verification | Photo raises cost; contest may expose later | Phase 06 C.4 | **NO — management problem, permanently** |

### 4.1 What the mapping shows

**Thirteen of twenty failure points are fully covered**, and the coverage is structural rather than procedural — absent affordances, immutability, derived views. Those will not erode under pressure the way a policy would.

**Seven are not.** Two are already-known and accepted (false verification, end-of-day recall — both named by Phase 06 as management problems). Two are open architectural questions (A1 supersession, the enum). **Three are new to this analysis**, and one of them — rationale-without-grounds — is the most consequential finding in this document.

> **The pattern in the gaps is worth naming.** Every fully-covered failure is one the architecture prevents by *removing an affordance*. Every uncovered failure is one that requires *adding* something — rendering the grounds, marking a contradiction, recording search extent. **The architecture is strong at refusing and weak at requiring**, which is consistent with its design and is exactly where the remaining risk sits.

---

## §5 — Adversarial feature tests

Three anticipated "improvements", each traced as a failure chain rather than dismissed by principle.

### 5.1 — I2: Sort by confidence

**The request:** *"Let me sort so the uncertain things come first. Obviously useful."*

**The failure chain:**

```
1. Sorting requires a TOTAL ORDER over the five bands.
        │
        ▼
2. Phase 03 §5.2 explicitly denies one:
   "Not a quality ranking. A three-week-old measurement may be
    worth less than this morning's observation."
        │
        ▼
3. So the sort must INVENT an order the model rejects.
        │
        ▼
4. The invented order becomes the shared mental model.
   People reason in it; it outlives the code.
        │
        ▼
5. "Worst first" becomes a workflow — work down the list.
        │
        ▼
6. UNRESOLVED sorts adjacent to ASSUMED.
        │
        ▼
7. ★ The distinction between "never checked" and "checked,
     couldn't find" collapses — the exact distinction Phase 06
     identified as U2's entire payoff ★
        │
        ▼
8. Terminal state: confidence is a priority score.
   Five reasons collapse to one axis.
```

**Damage:** steps 6–7 are the specific loss. A person sorting "worst first" is told that a place someone spent twenty minutes searching is equivalent to a place nobody has ever visited. **The inherited search becomes invisible at exactly the moment it would have prevented a repeat trip.**

**Why the principle alone is insufficient:** the request is *reasonable*. Sorting by uncertainty sounds like exactly what an epistemically careful system should support. **The damage is not that it violates a rule — it is that it requires fabricating an ordering the architecture explicitly denies exists.**

**Substitute that serves the real need:** sort by **time-to-close** (Phase 08 §2.1). A person asking to "see the uncertain first" usually means *"show me what needs attention soonest"*, which is a real magnitude with a real unit.

### 5.2 — I4: Attention count badge

**The request:** *"Just a number so I know there's something to look at."*

**The failure chain:**

```
1. A count implies a target. The target is zero.
        │
        ▼
2. A target implies items can be removed by user action.
        │
        ▼
3. But attention items are DERIVED. They leave only when the
   world changes — a window closes, a condition is verified.
        │
        ▼
4. Users discover they cannot clear the count. This reads as
   a bug, not as a design property.
        │
        ▼
5. Demand for "dismiss" — the reasonable fix to an apparent bug.
        │
        ▼
6. Dismiss requires per-item, per-user STATE.
        │
        ▼
7. Attention is no longer derived. It is stored.
        │
        ▼
8. Stored items acquire read/unread, snooze, assignment,
   completion — each individually reasonable.
        │
        ▼
9. ★ Terminal state: a backlog. Phase 08 §6.2's four omissions
     fall as a SET ★
```

**The transformation is real, not rhetorical.** At step 7 the object changes category: a derived projection becomes a persisted collection. Everything after step 7 follows from that single change, and none of it can be prevented by policy once the state exists.

> **The badge is the load-bearing omission.** Without it, the other three absences feel natural — there is nothing to clear, so no completion, assignment, or dismissal is missed. **With it, all three feel like bugs**, and they will be filed as such.

**Verdict:** the badge does not merely violate a principle. **It is the single change that converts derived attention into a work queue**, and it does so through a chain where every individual step is a defensible response to the previous one.

### 5.3 — I7: Name on an observation

**Tested on evidence, not preference**, per the brief. This one does not resolve cleanly.

**The case FOR is real and documented.** `01-system-planning.md:473` states:

> *"**PERSON is minimally modeled.** Attribution serves knowledge provenance (**'who saw this, so I can ask them'**) and expertise routing — never productivity measurement."*

Phase 03 §3.3 removed it (*"`PERSON` deliberately unmodeled. Only `ROLE` exists"*). Phase 07 C8 sealed it (identity outside the domain boundary). **The traceability need Phase 01 documented was never explicitly retired — it was superseded silently.** Nobody wrote down that *"who saw this, so I can ask them"* was being abandoned; it simply stopped appearing.

**The case AGAINST, by what it damages:**

| Damage | Mechanism | Attacks |
|---|---|---|
| **Contest becomes hierarchy** | A contest between a long-tenured observer and a first-week seasonal is no longer two peer testimonies. **Phase 08 §5.4's peer rendering becomes fiction** — the names do the ranking the interface refuses to do | **C3** |
| **Absence becomes personally costly** | Recording *"I couldn't find it"* under your own name is harder than recording it anonymously. **Directly attacks U2** — the assumption everything distinctive rests on | **U2** |
| **Observer credibility becomes an informal score** | People learn whose observations to trust. **Confidence-by-person** — the exact abstraction the system refuses, arriving through social convention rather than through the interface | C6 |
| **Surveillance becomes possible** | Identity in the record enables measurement | **C8** |

**Assessment.** The case against is stronger, and specifically because it attacks **C3 and U2 — the two most load-bearing properties in the system.** The contest damage is the decisive one: peer rendering is not a visual choice but a claim that two testimonies are epistemically equal, and a name silently falsifies it.

**But the Phase 01 need is real and remains unserved.** *"Who saw this, so I can ask them"* is a genuine operational requirement, and no phase has addressed it since removing the mechanism.

> **Conclusion: I7 remains an open evidence question, leaning strongly against.** What is *not* established is whether the traceability need can be met without persistent attribution in the record — for example by routing a question without displaying or storing a name. **That is a design proposal, and this document does not make it.** What this document establishes is that rejecting I7 leaves a documented need unmet, and that fact should be recorded rather than forgotten a second time.

---

## §6 — Open enum investigation

**Phase 04 is not modified.** This section traces the distinction and returns one of the three permitted conclusions.

### 6.1 The two states

| | §4.A — *cannot find* | §4.D-ii — *confirmed absent* |
|---|---|---|
| Outcome used | `absent-at-described-location` | `absent` |
| Condition result | **`UNRESOLVED`** | **Superseded, high confidence** |
| Epistemic content | *"We may have searched the wrong place"* | *"There is definitively nothing here"* |
| Confidence movement | **Suppressed** | **Raised** |

**Phase 04 §11 #6 freezes:** `outcome ∈ {confirmed, inconclusive, contradicted, absent}` — **four values.**

### 6.2 Trace through the ten contexts

| Context | Does the distinction matter? | Why |
|---|---|---|
| **Observation storage** | **Yes** | Distinction is lost at write if unrepresented |
| **Confidence reasoning** | **DECISIVE** | The two produce **opposite** confidence movements from one value. Derivation cannot choose correctly |
| **Derived attention** | **Yes** | *Couldn't find* should be able to resurface. *Confirmed absent* must never resurface |
| **Decision evidence** | **Yes** | `evidence_basis` would record materially different grounds |
| **Decision recognition** | **Yes** | A confirmed-absent feature means D3 need not verify that zone. A not-found one means it must |
| **Historical / audit** | **Yes** | *"Searched three times, never found"* and *"confirmed absent three times"* are opposite stories |
| **Future observations** | **Yes** | Phase 04 §4.A requires the next task be non-identical; scope differs by state |
| **Aggregation** | **Yes** | Counting `absent` would mix *we don't know* with *we know it isn't there* |
| **Filtering / search** | **Yes** | *"Show me unresolved places"* cannot be answered |
| **Future system interpretation** | **Yes** | An unlabelled collapse is precisely what a later system would misread as settled |

### 6.3 Conclusion

> # A — Must be machine-readable

**The confidence function settles it.** Phase 04 §6.2 establishes that confidence rises only via a new observation of equal or higher provenance, and that contest suppresses it. §4.A and §4.D-ii demand **opposite** movements — one contests, one supersedes — from what is currently **one enum value**.

If the distinction lives only in an observation's note text, derivation cannot read it, and **the band will be wrong for one of the two cases every time.**

> **The frozen four-value enum cannot express the frozen confidence model.** This is an internal contradiction inside Phase 04 — not a Phase 08 problem and not an interaction-layer problem.

**Conclusion B is unavailable**, because interaction-layer-only representation leaves the confidence function unable to compute. **Conclusion C is unavailable**, because the evidence is not insufficient — it is dispositive.

### 6.4 What this document does *not* do

**It does not repair Phase 04.** The fix requires unfreezing §11 #6, which is an architectural decision belonging to whoever owns the freeze. Two shapes exist — a fifth outcome value, or a qualifier attribute on `absent` — and **choosing between them is not this document's call.**

**Neither shape requires a new object type.** Both are enum or attribute changes to `OBSERVATION`, so the eleven-object claim is unaffected either way.

---

## §7 — Next-phase recommendation

### 7.1 What the analysis demonstrates

Three things need addressing, and **they are different kinds of thing** — which matters, because treating them all as documents would be the conventional-process error the brief warns against.

| # | Finding | Kind of thing |
|---|---|---|
| **1** | Rationale returns without its grounds (T5) | **An interaction defect in a frozen artifact** |
| **2** | The absence distinction must be machine-readable (§6) | **An architectural decision requiring an unfreeze** |
| **3** | I7's traceability need remains unserved (§5.3) | **An open question to record, not resolve** |

### 7.2 The recommendation

> **One artifact — this one. Then a decision gate. Not a document cascade.**

**This document is the artifact.** It contains the failure path, the safeguard map, the adversarial tests, and the enum conclusion. Nothing further needs writing to make those available.

**What comes next is a decision, not a deliverable.** Finding 2 requires the user to choose: unfreeze Phase 04 §11 #6 and add the distinction, or accept that confidence will be wrong for one of the two absence cases. **A decision is not an artifact**, and proposing a further specification to house it would create an object because convention expects one — which [§10](#10--explicit-non-changes) forbids.

**Finding 1 is a defect in a frozen artifact**, and the project's established practice is to *document, don't patch* — as Phase 04 did with the two Phase 03 defects and Phase 08 did with the enum. It is recorded here as **TW-5** and in the exit criteria, to be corrected when Phase 08 is next opened, not by amending it now.

### 7.3 What should NOT happen next

| Not this | Why |
|---|---|
| An "epistemic integrity model" document | Would restate this document under a new name |
| A data-model clarification artifact | The change is one enum or one attribute. It needs a decision, not a specification |
| A wireframe-constraints document | Phase 08 §5.3 and §8.4 already state the two constraints as falsifiable tests |
| An interaction-validation phase | Validation requires users. Governance §3's stop-rule forbids the research; Phase 06 already sequenced this to first deployment |
| Visual design | **Blocked by the exit criteria in [§11](#11--exit-criteria)**, not by preference |

---

## §8 — Proposed artifact

> **None beyond this document.**

Stated explicitly because the brief asks for it. The analysis produced one thing that needed writing — the failure path and its conclusions — and that is what this document is. **Everything else it produced is a decision, a defect record, or an open question**, none of which is improved by being given its own file.

**The next work is decision-making, not authoring.**

---

## §9 — Tripwires

Concrete and falsifiable. Each is testable against a named artifact or a code property. **None is a principle.**

| # | Tripwire | Test | Detects |
|---|---|---|---|
| **TW-1** | Internal band vocabulary must not appear in user-facing strings | Grep all interface strings for `ASSUMED`, `CONTESTED`, `UNRESOLVED`, `AGING`, `CONFIRMED`. **Any hit is a regression** | Confidence becoming a taxonomy |
| **TW-2** | No sort or filter accepts a confidence field | Assert no sort comparator, ORDER BY, or filter predicate references a confidence or band field. **Any hit is a regression** | I2 — confidence becoming sortable |
| **TW-3** | Attention has no persisted state | Assert no table, record, or per-user state backs attention items; assert no `dismissed`, `read`, `snoozed`, `assigned`, or `completed` field exists on them | I4 — attention becoming a backlog |
| **TW-4** | No control resolves a contest | Assert no action accepts a contested condition and returns a single winning observation. **Search the interaction spec and the build for `resolve`, `accept`, `reject`, `mark correct` on a contested condition** | Contests acquiring resolution controls |
| **TW-5** | Returned rationale carries its grounds | Assert that any surface rendering prior rationale also renders the `evidence_basis` bands that decision rested on. **Currently FAILS against Phase 08 §5.1** | **T5 — a guess hardening into knowledge** |
| **TW-6** | Absence states remain distinct | Assert `absent-at-described-location` and `absent` resolve to different confidence movements. **Currently FAILS — one enum value, two required behaviours (§6)** | The absence collapse |
| **TW-7** | No individual identity in the record | Assert no domain record stores a user identifier; assert every attribution renders a role and a date only | I7 / C8 — attribution becoming authority |
| **TW-8** | Completion is not separable from answering | Assert no action closes a verify task without an `outcome`; assert no separate "complete" action exists | Completion becoming a state |
| **TW-9** | Decision-critical material is not scrollable or hidden | For each decision surface, assert the must-know set renders without scroll at the target viewport, **and** walk each disclosed region asking whether revealing it could change the choice. **Any yes is PRESENT material misfiled** | The disclosure test + the no-scroll/reason tension (T4) |
| **TW-10** | Decisions are not user-created | Assert no route, action, or menu creates a decision without an originating window, condition change, or place context | Decisions becoming user-created objects |
| **TW-11** | The object count is eleven | Enumerate domain types in any schema or model definition. **Twelve is a regression requiring an explicit unfreeze** | A fifth conceptual object |
| **TW-12** | Capture cost is symmetric | Count the actions required to record each of the four outcomes. **Any asymmetry favouring `confirmed` is a regression** | U2 erosion by interaction cost |

**TW-5 and TW-6 fail today.** They are written as tripwires rather than as findings because they must remain testable against future artifacts — a tripwire that only describes a past defect stops catching the regression when someone reintroduces it.

---

## §10 — Explicit non-changes

| Must remain untouched | Status |
|---|---|
| **Phases 01–08, all artifacts** | Frozen. Verified byte-unchanged at completion |
| **Phase 04 §11 #6 — the outcome enum** | **Investigated, not repaired.** §6 returns a conclusion; the fix requires an unfreeze this document does not perform |
| **The eleven domain objects** | Neither enum fix shape adds one |
| **Internal epistemic vocabulary** | Stays internal. This document uses band names; the interface does not |
| **The four surfaces** | No fifth proposed |
| **Absent affordances** | The absence of resolve, badge, dismiss, assignment, and decision-creation is architecture, not omission |
| **Phase 08's wireframes** | Defect recorded as TW-5; **not amended here** |
| **Governance §3 stop-rule** | No research proposed. Every open item is a deployment or decision question |

---

## §11 — Exit criteria

**What must be true before the project proceeds toward implementation or visual design.**

### Blocking — must be resolved

| # | Criterion | Why blocking |
|---|---|---|
| **E1** | **The absence-distinction decision is made** — Phase 04 §11 #6 unfrozen and amended, or the limitation explicitly accepted and recorded | §6 conclusion A. Confidence is computably wrong for one of two cases until this is settled. **Building on it propagates the defect into every derived value** |
| **E2** | **TW-5 is satisfied** — returned rationale renders its grounds | T5 is the sharpest corruption path in the system and it runs through C7. **Shipping without it means guesses harden into knowledge by design** |
| **E3** | **TW-1, 2, 3, 4, 7, 8, 10, 11, 12 pass** against whatever artifact exists | These encode the properties eight phases established. A failure is a regression, not a preference |

### Non-blocking — must be recorded, not solved

| # | Item | Disposition |
|---|---|---|
| **E4** | I7's unserved traceability need | Recorded in §5.3. **Must not be silently superseded a second time** |
| **E5** | Contest detection is silent when marking is skipped | Known partial safeguard (Phase 04 §6.2). Deployment observation |
| **E6** | End-of-day recall; false verification | Accepted management problems (Phase 06 C.2, C.4) |
| **E7** | Phase 03 **A1** — knowledge supersession | Resolve before Year 3 (Phase 06 B.3) |
| **E8** | Phase 06's three conditions and Phase 07 §13's field-validation set | Unchanged. Deployment gates, not design gates |

### The standing test

> **Before any new affordance is added, ask: what epistemic condition could this make invisible?**
>
> Every anti-pattern in this document and in Phase 08 §10 arrived as a reasonable improvement. **None announced itself.** The safeguards that held were structural — absent affordances, immutability, derived views. The gaps that opened were all places where the architecture *requires* something to be added rather than *refuses* to allow it.
>
> **Treat every proposed affordance as a possible epistemic failure mechanism until shown otherwise.** That posture, not any individual rule, is what the eight prior phases actually bought.

---

*Phase 09 planning complete. Phases 01–08 unmodified. Phase 04's enum investigated, not repaired. No new artifact proposed, no new object introduced, no visual or implementation decision made.*
