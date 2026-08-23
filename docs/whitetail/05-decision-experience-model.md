# 05 — Decision Experience Model

## Whitetail Club & Shore Lodge — Stewardship Intelligence System · Phase 05

**Question this phase answers:** given the proven architecture, **what information must appear, when, for whom, and why**, so people can make better stewardship decisions?
**Governed by:** [`00-project-governance.md`](00-project-governance.md) — binding.
**Built on:** the **post-§11 corrected architecture** from [`04-architectural-proof.md`](04-architectural-proof.md). Prior phases are read-only and unmodified.
**Evidence tags** per governance §4. No claim here is `[VF]`.

**This is not interface design.** No screens, no navigation, no components, no features. Every element in this document exists because a decision requires it — and §5 removes more than it adds.

---

## 1 — Purpose

### 1.1 Goal

Translate a proven architecture into a **coherent human decision experience**: for each stewardship decision, establish what a person must know, what they may leave unknown, what uncertainty obliges them to resolve first, and what the system must never pretend to know.

### 1.2 Why this follows architectural proof

Phase 04 established that the defining loop traverses — including all five verification-failure modes — on a spatial record requiring no prior digitization. **That is a claim about structure, not about people.** An architecture can be internally sound and still produce an experience nobody can act on: information arriving after the moment it was needed, confidence expressed in terms nobody can interpret, or a system that technically records uncertainty while practically hiding it.

Doing this before the proof would have meant designing an experience over a loop that could not record its own output — Phase 04 §3.1 showed the loop did **not** traverse on Phase 03 as written. **The order matters: prove the mechanism, then design the encounter with it.**

### 1.3 Why decisions rather than interfaces

Interfaces are downstream of decisions and cannot be derived from an architecture directly. An object model says what *can* be known; it does not say what *must* be present when a person commits to something irreversible at dawn with a window closing.

Designing from decisions produces the one thing this project most needs: **grounds for removal.** Every element must name the decision it serves. Anything that cannot is cut — including things that are true, well-sourced, and interesting. Designing from screens produces the opposite pressure, because a screen can always hold one more thing.

### 1.4 Standing rule — no hidden behavior

> **Every system behavior described in this document is one of exactly two things: rendering state that already exists, or surfacing a gap for a person to act on. The system never acts.**

Stated once, held throughout. Where the text says *"the system surfaces"* it means makes visible — never dispatches, decides, resolves, or initiates. This is governance §5 (G2) expressed as an experience constraint, and it is checked mechanically at [§15](#15--verdict).

---

## 2 — Architectural inputs

Inherited only. No redesign, no additions.

### 2.1 Objects in play

| Object | What the experience uses it for |
|---|---|
| **PLACE** | The address everything hangs on. Recursive; `kind` is stable identity, geometry is point/line/area. Location is itself a condition. |
| **CONDITION** | Derived, revisable interpretation of a place's state. Carries provenance and a confidence band. |
| **OBSERVATION** | Immutable testimony. Carries provenance class, role attribution, time, and an `outcome`. **Never edited — only superseded.** |
| **TASK** | Transient assigned work. `purpose ∈ {ACT, VERIFY}`; targets a condition when verifying. |
| **DECISION** | A recorded human choice with rationale and an `evidence_basis` snapshot of what was known at the time. |
| **KNOWLEDGE** | Durable place-attached insight accumulated from observations and outcomes. |

Also inherited and load-bearing: **`ACTION`** (what was actually done), **`WINDOW`** (bounded period that closes), **`EVENT`** (environmental occurrence), **`SEASON CYCLE`**, **`ROLE`**.

### 2.2 Confidence bands

Five, from Phase 04 §6.1. Each carries its own plain-language reason; there is no score and no formula.

`CONFIRMED` · `AGING` · `ASSUMED` · `CONTESTED` · `UNRESOLVED`

### 2.3 Provenance classes

`MEASURED` · `OBSERVED` · `REPORTED` · `INFERRED` · `HYPOTHESIZED`

Provenance sets a **ceiling**; recency moves a condition within it. An assumption is not made true by being recent.

### 2.4 Verification

`TASK.purpose = VERIFY`, targeting a condition, producing an observation directly. `OBSERVATION.outcome ∈ {confirmed, inconclusive, contradicted, absent}`. **The only upward path for confidence** — time never improves it, only looking does.

### 2.5 What is inherited as *not* an object

`CONTEXT` is composed at decision time. `CONFIDENCE` is computed on read. **Neither is stored, and this phase does not make them so.** Decision envelopes ([§8](#8--decision-envelope-model)) are specifications of which existing objects must be present — the same kind of thing as context, and equally not an object.

---

## 3 — Actor model

Three roles, inherited from Phase 02 §6 and Phase 03 §12. **Role descriptions only** (governance §6). No organizational structure is asserted beyond what the corpus attests `[SRC]`.

### 3.1 Field crew member *(seasonal)*

| | |
|---|---|
| **Responsibilities** | Execute assigned work. Observe and record what is found — including finding nothing. |
| **Decisions made** | **D6** — is what I am looking at normal for this place? Proceed, handle, or escalate. |
| **Information required** | Where the thing is, in describable terms. What it is. **What is normal here** — one sentence. What they were sent to settle, if verifying. |
| **Information produced** | Observations: the system's entire supply of ground truth. Confirmations, contradictions, inconclusive results, and absences. |

**The asymmetry that shapes their experience:** this role **writes far more than it reads**, and both must cost almost nothing. Reading is one sentence; writing is the completion gesture of work already being done.

### 3.2 Supervising role *(superintendent / grounds director)*

| | |
|---|---|
| **Responsibilities** | Decide, sequence, dispatch. Hold the operational picture across places and windows. |
| **Decisions made** | **D1, D2, D4, D7** outright; **D3, D5** with leadership. Plus the dispatch-approval point (§4.3). |
| **Information required** | Current conditions **with confidence bands**; what changed; which windows are closing and what missing them costs; what happened last time at this place. |
| **Information produced** | Decisions with rationale; verification requests; task assignments; overrides. |

**The primary consumer of confidence.** Provenance exists in the experience chiefly for this role at this moment.

### 3.3 Leadership role *(operations / stewardship leadership)*

| | |
|---|---|
| **Responsibilities** | Seasonal strategy, resource policy, long-term condition stewardship. |
| **Decisions made** | Participates in **D3, D5**. Otherwise sets the frame within which the other decisions occur. |
| **Information required** | Patterns across cycles. Whether knowledge is accumulating or leaking. |
| **Information produced** | Policy and priority — the context other decisions are made inside. |

> **This role must not drive the experience.** Designing the encounter around the aggregate view is the standard way systems like this fail the people in the field. Leadership reads the slow loop; it does not set the terms of the fast one.

---

## 4 — Decision inventory

The seven decisions established in Phase 02 §7. **No decisions are added, and none is invented here.**

### 4.1 Master decision table

| | Decision | Owner | Trigger | Acceptable uncertainty | Irreversible consequence | Expected output |
|---|---|---|---|---|---|---|
| **D1** | How much to water, and where | Supervising | Heat stretch; visible stress; cycle due | **Moderate** — a wrong call is correctable next cycle | None material; cumulative only | Application decision + rationale; observation of response |
| **D2** | Frost delay: open or hold | Supervising | Pre-dawn assessment on a cold morning | **Low** — minutes to decide, cost either way | **Yes** — traffic on frozen blades damages turf; the moment does not return | Open / delay / partial + rationale; actual clear time observed |
| **D3** | Winterization sequencing | Supervising + Leadership | Soil temperature trend; forecast first snowpack | **Very low** — two windows closing at once | **Yes** — mistimed blowout cracks mainlines; missed application risks loss under snowpack | Committed sequence + rationale; real durations captured |
| **D4** | Drainage intervention during runoff | Supervising | Thaw; reports of standing water or blockage | **Moderate** | **Partial** — flooding and erosion compound | Clear / monitor / re-route + rationale; confirmed feature locations |
| **D5** | Shoreline intervention | Supervising + Leadership | Observed erosion, vegetation loss, use damage | **High** — cumulative, slow | **Partial** — erosion does not reverse | Stabilize / replant / restrict / monitor; fixed-reference photo series |
| **D6** | Is this normal for this place? | **Field crew** | Encountering something unexpected while working | **Moderate** — escalation is cheap | None — escalation is always available | Proceed / handle / escalate; observation captured |
| **D7** | What gets deferred | Supervising | Work exceeds available crew-hours | **Moderate** | **Partial** — deferral compounds for some work types | Sequence + explicit deferrals; deferral outcomes recorded |

**Gate D satisfied on inheritance:** every decision has a named owner. Four sit with the supervising role, two are shared with leadership, one belongs to the field.

### 4.2 What the inventory reveals about the experience

**Three decisions are irreversible or partly so (D2, D3, D4/D5).** These are the only ones where verification-before-action is warranted. The other four tolerate being wrong, and the experience should not burden them with the same rigor — **applying maximum ceremony to every decision is how a system becomes something people route around.**

**Six of seven need history more than they need current readings.** The highest-value input is nearly always *what this place did before*, not *what it is doing now*.

**Only one belongs to the field role.** That is an accurate reflection of current authority, and D6 is the deliberate crack in it.

### 4.3 One named decision point, not an eighth decision

The **dispatch-approval moment** (Phase 04 §3 ④): the supervising role sees a confidence gap on a pending irreversible decision and decides whether to send someone to look before committing.

It has an owner, real consequences, and a recorded outcome — but it is a decision point **inside D2, D3, D4, and D5**, not a standalone decision. Modeling it separately would inflate the inventory and imply verification is a workflow of its own rather than a step within deciding. **Named here so Gate D covers it; not promoted.**

---

## 5 — Information demand analysis

**This section removes.** For each decision: what must be visible, what may stay hidden, what actively distracts, and what is dangerous to omit.

The removal test: **if a piece of information cannot change the outcome of this decision, it does not belong at this decision.** Being true, well-sourced, or interesting is not sufficient.

### 5.1 D2 — Frost delay *(the tightest envelope in the model)*

| | |
|---|---|
| **Must be visible** | Current frost condition + its band · **this surface's historical thaw lag** · time remaining before scheduled play |
| **May stay hidden** | Comparable past mornings · adjacent surface states · the observation history beneath the condition — all reachable, none present |
| **Actively distracting** | Property-wide status · other zones · trend charts · any aggregate · seasonal planning · resource context |
| **Dangerous to omit** | **The confidence band.** A frost reading twenty minutes old and one from an hour ago support different calls, and the difference is invisible without it |

> **Everything about this property except three facts is excluded from this decision.** The water right, certification obligations, fire-season status, fleet availability, other domains — all real, all irrelevant at 06:00 with a decision measured in minutes. **A decision made under time pressure cannot afford a browse.**

### 5.2 D3 — Winterization sequencing

| | |
|---|---|
| **Must be visible** | Which windows are open, which close first, and **what missing each costs** · per-zone readiness **with bands** · which zones rest on assumed readiness |
| **May stay hidden** | Last cycle's full sequence · override history · individual observations — reachable on demand |
| **Actively distracting** | Anything implying the system will sequence on its own · unrelated domains · analysis not tied to a closing window |
| **Dangerous to omit** | **Which zones are `ASSUMED` or `UNRESOLVED`.** Committing an irreversible sequence while unaware that three zones rest on an unverified imported record is the specific failure this system exists to prevent |

### 5.3 D6 — Is this normal here? *(the hardest constraint)*

| | |
|---|---|
| **Must be visible** | **One sentence: what this place normally does.** |
| **May stay hidden** | Everything else |
| **Actively distracting** | Trends · comparisons · analysis · condition history · anything requiring reading |
| **Dangerous to omit** | Whether this has been flagged before — **if others already reported it, escalating again is wasted work** |

> **The constraint is severe and non-negotiable `[DH]`:** a person standing outdoors, gloved, mid-task, low attention. If place-attached knowledge cannot be delivered in one sentence, **D6 fails and authority stays centralized** — and with it the dispatch bottleneck the whole system was built to loosen.

### 5.4 D1, D4, D5, D7 — envelope summary

| | Must be visible | Dangerous to omit |
|---|---|---|
| **D1** | Current stress condition + band; days since last application; this surface's known behavior | Whether the reading is measured or inferred — it changes whether to act or look |
| **D4** | Blockage condition; **location confidence for the feature**; upstream snow-storage placement | **That buried utilities near this feature may be recorded at low location confidence** — this is a safety omission, not an information one |
| **D5** | Current extent; the fixed-reference series; obligations bounding the response | The prior images. Without comparison, cumulative change is invisible |
| **D7** | Cross-place readiness; closing windows; what deferral cost last time | Irreversibility differences between work types — erosion compounds, mowing does not |

### 5.5 What is excluded from every decision

Named explicitly, because each was attested in research and each fails the removal test at the decision moment:

| Excluded | Why |
|---|---|
| Irrigation right and acreage cap `[SRC]` | Bounds D1 as context; **never the subject of a decision surface.** Governance §1 |
| Certification obligations `[SRC]` | Documentation duty; changes no modeled decision |
| Fleet leasing terms and ceilings `[SRC]` | Enters D7 as crew capacity only — never as data |
| Parcel and subdivision geometry `[SRC]` | No decision requires it |
| Records discrepancies `[SRC]` | Changes no decision; governance G7 additionally bars framing it as violation |
| Any individual's work rate | **Not modeled at all.** Governance §6, enforced structurally |

**Gate C satisfied:** every element surviving §5 traces to a decision in §4. Everything above is excluded by name rather than by silence, so re-adding it requires an argument.

---

## 6 — The verification experience

The five outcomes proven in Phase 04 §4, expressed as human encounter. **No interface is described** — only what a person is presented with, what they then know, what remains unknown, and what they can still do.

### 6.0 The moment before

A pending irreversible decision rests on a condition banded `ASSUMED`, `CONTESTED`, or `UNRESOLVED`.

**The person is presented with:** the gap, stated plainly — *"three zones rest on readiness taken from an imported record; none has been checked in the field."*
**They know:** which specific places are weakly grounded, and why.
**They do not know:** whether the record is right.
**They can:** send someone to look, decide without looking, or decide something else. **The system offers; it does not send.** Whichever they choose is recorded, and if they proceed unverified the decision's `evidence_basis` permanently shows the grounds were thin.

### 6.1 Success — the thing is where it was described

| | |
|---|---|
| **Presented with** | What they were sent to settle, and the describable location — *"north side, roughly four metres off the cart path."* |
| **They know** | Why they are here and what would count as an answer |
| **Do not know** | Whether the description is accurate |
| **Can do** | Confirm, and record what they found |

**After:** the condition moves to `CONFIRMED`. If the position differed, the location record is corrected permanently. The pending decision proceeds on firmer ground.
**Permanent gain:** a verified condition, and — where position differed — a corrected spatial record.

### 6.2 Cannot find it

| | |
|---|---|
| **Presented with** | The described location; how the description was arrived at; **whether anyone has searched here before, and what they found** |
| **They know** | Where to search and how much confidence the description deserves |
| **Do not know** | Whether the thing exists elsewhere, exists but is buried beyond finding, or does not exist |
| **Can do** | **Record the failed search as a finding** — where they looked, how long, what they did not find |

**After:** the location condition becomes `UNRESOLVED`. The pending decision cannot rest on it and must proceed on another basis or escalate.
**Permanent gain:** *"Searched on [date], in this area, not found."* **The next person inherits a search they did not perform.**

> **This is the state the whole design turns on.** A person who spends twenty minutes finding nothing has produced real knowledge — and the experience must make that feel like a result, not a failure. If recording a fruitless search is harder than recording a successful one, people will stop recording them, and the system's most valuable output disappears silently.

### 6.3 Found the place, condition unresolved

| | |
|---|---|
| **Presented with** | The target condition and what would settle it |
| **They know** | The place is confirmed; the question is not answerable by looking |
| **Do not know** | The condition itself — and now they know that looking is not the method |
| **Can do** | Record location confirmed **and** target inconclusive — two results from one visit |

**After:** location `CONFIRMED`; target `UNRESOLVED`. Escalation, if any, must be **a different method or expertise** — never a repeat of the same visit.
**Permanent gain:** a confirmed location, plus a durable fact about **method efficacy** — *visual inspection cannot answer this here.* No other outcome produces that.

### 6.4 Contradictory evidence

| | |
|---|---|
| **Presented with** | What the record currently holds, and when it was last observed |
| **They know** | They are seeing something different |
| **Do not know** | Whether the place changed or someone was wrong |
| **Can do** | Record what they see; mark it as contradicting the prior observation where the disagreement is not explained by elapsed time |

**After:** if the prior observation is older than the condition type's decay window, the new one supersedes — this is change over time, not conflict. If within it, the condition becomes `CONTESTED` and confidence is suppressed.
**Permanent gain:** a corrected condition, or a recorded disagreement — *two observers disagreed within one window* is itself a fact about this place.

> **What the person must never be asked to do:** reconcile the two into one value. See [§7.3](#73-the-behavior-no-band-may-ever-encourage).

### 6.5 Confirmed absent

| | |
|---|---|
| **Presented with** | The description, and the search history if any |
| **They know** | The thing is not there |
| **Do not know** | Usually nothing further — the question is closed |
| **Can do** | Record absence as a positive finding |

**After:** the location condition is superseded with high confidence and a value of *confirmed absent*. **The place persists** — a removed or non-existent feature is still an answer to *what is under here.*
**Permanent gain:** **every future search for a thing that is not there is prevented.** The one failure mode that yields *high* confidence.

### 6.6 What the five share

Every outcome ends with something permanently better and **none produces a reason to repeat the same visit.** The experience consequence is a single requirement:

> **A person arriving at a place must be able to see what has already been tried there.** Without that, failed searches are invisible, crews repeat each other's fruitless work, and `UNRESOLVED` degrades into `ASSUMED` in practice even while the record says otherwise.

**Gate E satisfied.**

---

## 7 — Confidence communication model

**The test:** could someone explain the confidence state without referencing a formula? **There is no formula to reference** — the bands are the model.

### 7.1 What each band means to a person

| Band | Plain meaning | Sounds like |
|---|---|---|
| **CONFIRMED** | Someone saw or measured this recently, and nothing disagrees | *"Checked this morning."* |
| **AGING** | This was checked, but long enough ago that it may have moved on | *"Last looked at nine days ago; drainage changes in about a week."* |
| **ASSUMED** | Nobody has ever checked. It came from a record | *"This is from the old drawing. Nobody's confirmed it."* |
| **CONTESTED** | Two people saw different things, close enough in time that both can't be right | *"Two of us disagreed on Tuesday. Too close together to be change."* |
| **UNRESOLVED** | We tried to settle this and could not | *"Searched it in October. Didn't find it."* |

**None requires a number, a scale, or an explanation of how it was derived.** Each is a sentence a supervising role would say out loud.

### 7.2 What each band should encourage

| Band | Encourages | Decisions may proceed? |
|---|---|---|
| **CONFIRMED** | Act | Yes, including irreversible |
| **AGING** | Proceed with awareness; **consider a look if the decision is irreversible** | Yes; verification optional |
| **ASSUMED** | **Surface the gap before irreversible action** | Reversible yes; irreversible only after a deliberate choice to proceed unverified |
| **CONTESTED** | **A third look** — the one situation where re-visiting is exactly right | Reversible yes; irreversible should wait if the window allows |
| **UNRESOLVED** | **Escalate differently, or decide without.** Never repeat the same attempt | Yes — with the thinness of grounds recorded |

### 7.3 The behavior no band may ever encourage

| Band | Must never encourage | Why |
|---|---|---|
| **CONFIRMED** | Treating it as permanent | Everything ages. Confidence today is not confidence next week |
| **AGING** | Reading it as wrong | Aging means unverified, not false. It was true once |
| **ASSUMED** | Reading it as false | **An assumption may be perfectly correct.** `ASSUMED` means unchecked, not doubtful |
| **CONTESTED** | **Averaging the two observations** | Both are true testimony. **Averaging destroys both and fabricates a reading nobody made** — the system would be inventing an observation, which is the one thing it exists not to do |
| **UNRESOLVED** | Reading it as "no information" | It is expensive information. Someone spent time establishing it. Treating it as a blank re-dispatches them |
| **All** | Reading a band as permission or prohibition | **Bands inform; people decide.** A band never blocks a decision |

> **The averaging prohibition is the sharpest of these.** It follows directly from the observation/condition split: observations are immutable testimony, and a system that silently reconciles two conflicting testimonies into a tidy middle value has destroyed both and manufactured a third that no one witnessed. **`CONTESTED` must remain visibly unresolved until someone looks again.**

### 7.4 What confidence never does

Confidence **never blocks a decision.** If a window is closing and no verification is possible, the person decides anyway, and the record permanently shows the grounds were thin.

> A system that refuses to proceed under uncertainty would be making the decision — which governance §5 (G2) forbids, and which would be worse practice besides. **The honest posture is: here is exactly how much you know; the call is yours; what you knew will be remembered.**

---

## 8 — Decision envelope model

The envelope is the minimum that must be present before action. It operationalizes *"go look."*

**An envelope is not an object.** It is a specification of which existing objects must be present at a decision — the same category of thing as context, and equally not stored.

### 8.1 The general form

```
MUST BE KNOWN          — absent this, the decision cannot responsibly be made
MAY BE UNCERTAIN       — a band below CONFIRMED is tolerable here
TRIGGERS VERIFICATION  — this combination obliges resolving before acting
```

### 8.2 Envelopes

| | Must be known | May be uncertain | Triggers verification |
|---|---|---|---|
| **D1** watering | Current stress condition; days since last application | Exact moisture value; adjacent surfaces | *(none — reversible; verification optional)* |
| **D2** frost | Frost condition **`CONFIRMED`**, minutes old; time to play | This surface's thaw lag may be `AGING` | **A frost condition older than its decay window.** But the window is minutes long — if a look is impossible in time, the person decides on what exists |
| **D3** winterization | Which windows are closing and their cost; per-zone readiness **with bands** | Exact durations; last cycle's full detail | **Any zone banded `ASSUMED` or `UNRESOLVED` in an irreversible sequence.** The clearest verification trigger in the model |
| **D4** drainage | Blockage condition; **location confidence for features in the work area** | Exact obstruction extent | **A feature at `ASSUMED` or `UNRESOLVED` location where work involves excavation.** A safety trigger, not an information one |
| **D5** shoreline | Current extent; the prior fixed-reference series | Precise measurement; causation | *(rarely — cumulative and slow)* |
| **D6** normal-here | **What this place normally does**, one sentence | Nearly everything else | *(none — escalation is the cheap resolution)* |
| **D7** deferral | Cross-place readiness; closing windows; irreversibility by work type | Precise capacity; exact durations | **Only where a deferral decision rests on `ASSUMED` readiness in an irreversible category** |

### 8.3 What the envelopes reveal

**Verification triggers on a combination, never on a band alone.** `ASSUMED` on a reversible decision is fine — most conditions are assumed most of the time, and the system would be unusable if every assumption demanded a trip. **It is `ASSUMED` × irreversible that obliges a look.**

**D4's trigger is different in kind.** Every other trigger protects the decision; D4's protects the person doing the work. A buried feature at unverified location where excavation is planned is a safety condition, and it is the one place the experience should press hardest.

**D2 shows the limit of the mechanism honestly.** Its window is minutes; there may be no time to verify. The envelope does not pretend otherwise — **when verification is impossible, the person decides on what exists and the record shows what that was.**

---

## 9 — Knowledge retrieval experience

**The test:** does knowledge help a decision, or merely create more reading?

### 9.1 Retrieval timing

> **Knowledge is retrieved at the decision, never browsed.**

Nobody reads institutional memory speculatively. It earns its place by arriving unbidden at the moment it bears on a choice — *"this surface historically thaws forty minutes behind the others"* appearing while a frost call is being made, not filed where someone could look it up if they thought to.

**The consequence is a hard standard:** knowledge that cannot be retrieved at a decision moment is decoration. If it cannot be attached to a place and matched to a decision type, it will not be read, and the slow loop has failed to pay the fast one back.

### 9.2 Relevance

Two filters, both inherited:

| Filter | Effect |
|---|---|
| **Place-anchored** | Only knowledge attached to this place, or to a place containing it |
| **Decision-type matched** | Only knowledge bearing on *this kind* of call. Thaw-lag knowledge appears at D2, not at D5 |

Without the second filter the first is insufficient — a well-observed place accumulates enough knowledge to bury the relevant item.

### 9.3 Provenance and rationale visibility

| | When visible | Why |
|---|---|---|
| **Knowledge provenance** | On request, not by default | *"Derived from nine observations across two cycles"* matters when a person is deciding whether to trust an unfamiliar claim — but shown always, it becomes noise |
| **Decision rationale** | **At the equivalent decision, by default** | *"Last October we sequenced this zone last because the drainage was uncertain"* is the single most valuable thing the slow loop returns. **This is the artifact that does not exist today** |

> **Rationale is the highest-value retrieval in the system.** Every decision in §4 is already being made; what is never available is why it was made last time. Surfacing prior reasoning at the equivalent decision is how the organization stops re-deriving the same judgment every season with a new crew.

### 9.4 The D6 constraint

D6 requires knowledge in **one sentence, to a person outdoors, gloved, mid-task**. This is the hardest retrieval problem in the model and the one most likely to fail in practice `[DH]`.

If it cannot be met, the consequence is specific and serious: **D6 fails, field authority does not shift, and the dispatch bottleneck persists.** Everything else in the system would still function — which makes this a quiet failure rather than an obvious one, and worth testing early.

### 9.5 Verdict on the test

**Knowledge helps, but only under the constraints above.** Retrieved at the decision, filtered twice, with rationale by default and provenance on request, it changes outcomes. Presented as a browsable body of accumulated material, it becomes reading nobody does — and the slow loop's entire return path fails silently.

---

## 10 — Escalation experience

Built on `OBSERVATION prompts TASK` (Phase 04 §7.2). **Escalation is a relationship traversal, not a workflow layer** — no new object, no separate queue, no parallel state machine.

### 10.1 The four movements

| Movement | What it is | What must survive it |
|---|---|---|
| **Escalation** | A finding exceeds the finder's authority or method — D6's *escalate*, or a verification that came back inconclusive | The observation, its provenance, and **what was already attempted** |
| **Delegation** | A supervising role asks someone else to look or act | The target condition and why it matters now |
| **Reassignment** | The same work moves to a different person | Everything above, plus **who already tried and what they found** |
| **Unresolved carry-forward** | A condition stays `UNRESOLVED` across a window or a season | The full attempt history — this is what makes the *next* encounter different |

### 10.2 The three preservation requirements

**Context must survive.** An escalated finding arrives with the place, the condition it bears on, and the decision it was blocking. An escalation that arrives as an isolated report forces the recipient to reconstruct why it matters — and reconstruction is exactly the cost this system exists to remove.

**Provenance must survive.** *Who saw it, in what role, when, and how it was known* travels with the escalation. A finding that arrives stripped of provenance cannot be weighed, and the recipient's only options are to accept it uncritically or go look themselves — which discards the work already done.

**Repeated work must be visibly prevented.** The requirement from §6.6, restated as an escalation rule:

> **Any person receiving escalated or reassigned work must be presented with what has already been tried.** Not available on request — present. This is the single mechanism preventing three people from searching the same ground for the same absent thing across one season.

### 10.3 What escalation must never become

| Never | Why |
|---|---|
| A ticket queue with its own lifecycle | `TASK` is transient by design. An escalation that acquires status, priority, and resolution states has become the work-order system governance §17 rejects |
| Attribution of failure to a person | An inconclusive result is a fact about a **method or a record**, never about the person who reported it. Governance §5 (G8) and §6 |
| Automatic routing | The system surfaces that something needs a decision-maker. **A person decides who and when.** §1.4 |

---

## 11 — Failure-state experience

**The test:** does the experience remain useful when certainty never arrives?

### 11.1 The four failure conditions

| Condition | What the person faces |
|---|---|
| **Information incomplete** | Most conditions `ASSUMED`; the record thin because the system is new or the place rarely visited |
| **Confidence low** | Bands sit at `AGING` or `ASSUMED` across the places a decision touches |
| **Observations conflict** | `CONTESTED` — two accounts, neither dismissible |
| **Verification repeatedly fails** | `UNRESOLVED` persisting across attempts, windows, and seasons |

### 11.2 The answer

**Yes — but only because what the system is *for* shifts.**

Under good information it tells you the state of a place. Under permanent uncertainty it does something different and, in this landscape, more valuable:

> **It tells you precisely what is unknown, how it came to be unknown, and what has already been tried to resolve it.**

A person deciding under irreducible uncertainty is better served by an exact map of their ignorance than by a confident-looking estimate. **The estimate would be fabrication** — governance G3 — and it would remove the one thing that makes the situation tractable: knowing exactly where the holes are.

### 11.3 What remains useful when nothing resolves

| Still works | Because |
|---|---|
| **Knowing which specific places are weak** | Three named `ASSUMED` zones is actionable. *"Readiness is uncertain"* is not |
| **Knowing what was already attempted** | Prevents repetition and narrows the next attempt |
| **Knowing why it is uncertain** | *Never checked* and *checked and inconclusive* call for different responses |
| **Recording that a decision was made on thin grounds** | Makes the retrospective possible; makes the pattern visible if it recurs |
| **Accumulating failed attempts** | **A place with four failed searches is telling you something** — about the record, the method, or the thing's existence |

### 11.4 The honest limit

The system does not make a decision under uncertainty a good decision. **It makes it an informed one, and it makes the next one better.**

If certainty never arrives, the supervising role still decides on thin grounds — and the system's contribution is that the thinness was visible at the time, is permanent in the record, and narrows what the next person has to do. **That is a real contribution and a bounded one, and overstating it would be the project's weakest available position.**

---

## 12 — The defining experience

### 12.1 Choosing it

Phase 04 identified §4.A — the failed search — as the most persuasive moment the product has. Pushed one step further, something stronger appears.

The failed search is compelling. **But the failure only becomes remarkable when someone else arrives.**

> ### The Inherited Search

### 12.2 The experience

**Trigger.** Winterization approaches, a full year after the first attempt. The window is opening. A different person now holds the supervising role; the crew member who searched last October finished their season and left.

**Information presented.** Working through zone readiness before committing the sequence, the supervising role reaches one zone and is presented with:

> *Drainage readiness — **UNRESOLVED**.
> Taken from the old drawing; never confirmed.
> Searched 14 October last year, north side, about four metres off the cart path, roughly twenty minutes. Not found.*

**The decision point.** They now know four things they had no way to know:

1. This zone is not merely unchecked — **it has been checked, and the check failed.**
2. Precisely where someone already looked, and for how long.
3. The drawing is unreliable **here specifically**, not in general.
4. Sending someone to repeat that search would waste the trip.

**Verification.** If they send someone, the task is necessarily different — a wider radius, older records, a different method. **The system cannot produce the same task twice**, because the first attempt is part of the record the second one starts from.

**Outcome.** Either the thing is found — resolving a question that has been open for a year — or the search fails again, and the zone now carries two failed attempts, which is itself strong evidence about the record's reliability. **Either way the sequence is committed with the grounds visible**, and if they proceed unverified, that is permanently recorded as a deliberate choice rather than an oversight.

**Permanent learning.** A second attempt joins the first. The zone accumulates a search history no individual holds. **Nobody working the property today performed the first search. It is still doing work.**

### 12.3 Why this is the defining experience

> **A person is handed a failed search they never performed, by a colleague they never met, about a place neither of them fully understands — and it changes what they do.**

No individual could pass that along. The person who searched is gone; a verbal handover would not have survived the season; and under the ordinary way these properties operate the knowledge simply evaporates and the next crew searches the same ground.

**It exists only because failure was treated as testimony.** A system recording only successful verifications would have nothing here — the zone would read `ASSUMED`, indistinguishable from never having been checked, and the search would repeat annually until someone happened to remember.

### 12.4 The loop, traced

**Gate G — visible end to end:**

```
PLACE        the zone, and the valve at a described location
   ↓
CONDITION    drainage readiness; location taken from the drawing
   ↓
CONFIDENCE   UNRESOLVED — attempted, unsettled, with attempt history
   ↓
DECISION     commit the sequence, or look again differently
   ↓
TASK         if looking: necessarily a different search
   ↓
OBSERVATION  found, or a second failure — both testimony
   ↓
CONDITION    resolved, or now carrying two failed attempts
   ↓
KNOWLEDGE    this drawing is unreliable here — permanent, inheritable
```

### 12.5 What it demonstrates about the thesis

**A stewardship system declining to fake confidence.** Asked what to do, it does not estimate, average, or default. It says what it knows, how it came to know it, what was already tried, and leaves the decision where it belongs.

And the more specific claim, which is the one worth building the case study around:

> **The system's most valuable output is a record of what it failed to learn.**

---

## 13 — Experience principles

Eight, each traced to a specific prior finding. None generic.

### E1 — Show uncertainty by name, not by omission
`ASSUMED`, `CONTESTED`, and `UNRESOLVED` are stated in the terms a person would use. A condition presented without its band implies confidence the system does not have. *(§7.1; Phase 04 §6)*

### E2 — Never reconcile conflicting testimony
Two observations disagreeing within the decay window stay visibly unresolved until someone looks again. **Averaging destroys both and fabricates a third nobody made.** *(§7.3; Phase 03 §4.1)*

### E3 — A failed attempt is a result, and must be as easy to record as a success
If recording a fruitless search costs more than recording a find, people stop — and the system's most valuable output disappears without anyone noticing. *(§6.2, §12)*

### E4 — Show what was already tried, before anyone tries again
Present, not available on request. This is the only mechanism preventing repeated fruitless work across a season and across people. *(§6.6, §10.2)*

### E5 — Verification is obliged by a combination, never by a band alone
`ASSUMED` × irreversible obliges a look. `ASSUMED` alone does not — most conditions are assumed most of the time, and a system demanding a trip for each would be routed around. *(§8.3)*

### E6 — Return the reasoning, not just the outcome
At an equivalent decision, prior rationale surfaces by default. **It is the artifact the organization does not currently have**, and the reason the slow loop is worth running. *(§9.3)*

### E7 — Confidence informs; it never permits or forbids
No band blocks a decision. When a window is closing and no verification is possible, the person decides and the thinness is recorded. A system that refused would be deciding. *(§7.4; governance §5 G2)*

### E8 — Match ceremony to reversibility
Three of seven decisions are irreversible; those warrant verification pressure. The other four do not. **Applying maximum rigor to every decision is how a system becomes something people work around.** *(§4.2, §8.3)*

---

## 14 — Remaining unknowns

Only items requiring field validation, operational testing, or real deployment. **No solved architectural question is reopened.**

| # | Unknown | Requires | Consequence if wrong |
|---|---|---|---|
| **U1** | **Can place-attached knowledge reach a gloved hand in one sentence?** `[DH]` | Operational testing with a designed artifact | **D6 fails; field authority does not shift; the dispatch bottleneck persists.** A quiet failure — everything else keeps working |
| **U2** | **Will crews record failed searches?** `[DH]` | Field validation | **E3 and the §12 defining experience both collapse.** The highest-consequence unknown in the phase |
| **U3** | Are the decay windows right? | Operational data across cycles | Wrong verification timing — mistimed, not broken |
| **U4** | Does surfacing a confidence gap read as help or as nagging? `[DH]` | Operational testing | Gap-surfacing gets ignored; verification never happens |
| **U5** | Can a supervising role absorb per-zone bands at D3 scale? `[DH]` | Operational testing | The envelope is too wide and needs narrowing |
| **U6** | Do people read `ASSUMED` as *false* despite §7.3? `[DH]` | Field validation | Over-verification; wasted trips; the system becomes expensive to obey |
| **U7** | Is the capture-time budget achievable in field conditions? `[DH]` | Operational testing | Phase 02 R1 — the highest-probability failure in the whole project |

**U2 is the one to test first.** Everything distinctive in this phase — E3, E4, §6.2, §12 — assumes people will record finding nothing. **If they will not, the architecture still stands but the experience's defining property does not exist in practice.**

---

## 15 — Verdict

### Gate assessment

| Gate | Result | Basis |
|---|---|---|
| **A** — No new domain objects | **PASS** | The experience is a **projection over the eleven inherited objects**. Envelopes (§8) are specifications of which existing objects must be present — the same category as context, and equally not stored. Escalation (§10) is a traversal of `OBSERVATION prompts TASK`. Nothing was added |
| **B** — No hidden automation | **PASS** | §1.4's standing rule held throughout. Every system behavior is rendering existing state or surfacing a gap. **The system offers; a person sends** (§6.0). Confidence never blocks a decision (§7.4). Escalation is never auto-routed (§10.3) |
| **C** — Every element supports a decision | **PASS** | §5 is a removal exercise. Excluded material is named rather than silently dropped (§5.5), so re-adding it requires an argument |
| **D** — Every decision has an owner | **PASS** | All seven owned (§4.1). The dispatch-approval point is owned and located inside D2–D5 rather than promoted to an eighth decision (§4.3) |
| **E** — Verification failure remains productive | **PASS** | All five outcomes end with permanent gain and none produces a reason to repeat the same visit (§6.6). §12 shows a failure still working a year later |
| **F** — Understandable without interface design | **PASS** | Written as encounter throughout — what a person is presented with, knows, does not know, and can still do. No screens, components, or navigation appear |
| **G** — Defining loop visible | **PASS** | Traced end to end in §12.4 |

**Seven gates. Seven passes. The tripwire did not fire** — no new object, no new architectural layer, no autonomous behavior, no interface assumption was required at any point.

---

# PASS

## The proven architecture supports a coherent human decision experience without introducing new objects, hidden automation, or interface assumptions.

The experience is a **projection over the existing model**, not an addition to it. Seven decisions, each owned. Five confidence bands, each explainable in a sentence a supervising role would actually say. Five verification outcomes, each ending in permanent gain. Information envelopes that remove far more than they admit — including the best-sourced material in the entire project, excluded by name.

**What this phase found that the architecture did not already contain:**

**The defining experience is not the failure — it is the inheritance.** A person handed a failed search they never performed, by a colleague they never met, changing what they do a year later. That is institutional memory doing work no individual memory can do, and it exists only because failure was treated as testimony rather than as an absence of data.

**Conflicting testimony must never be reconciled.** The prohibition on averaging a `CONTESTED` condition falls directly out of the observation/condition split and has real teeth: a system that quietly resolves two disagreeing accounts into a tidy middle value has destroyed both and manufactured a third nobody witnessed — the precise thing the project exists not to do.

**Usefulness under permanent uncertainty comes from mapping the unknown, not estimating it.** When certainty never arrives, the system's contribution shifts from stating conditions to stating exactly what is unknown, how it came to be unknown, and what has already been tried. That is a real contribution and a bounded one.

**What this phase cannot establish.** Every remaining unknown in §14 requires field validation the governance stop-rule correctly withholds. **U2 is the one that matters:** whether crews will record finding nothing. The architecture stands either way — but if they will not, the experience's defining property does not exist in practice, and no amount of design resolves that from a document.

---

*Phase 05 complete. Prior phases unmodified. No interface, code, schema, or market research produced — by design. Next: interaction modeling, beginning with U2 and the §12 inherited-search encounter.*
