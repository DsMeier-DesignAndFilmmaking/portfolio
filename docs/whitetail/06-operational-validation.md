# 06 — Operational Validation & Behavioral Viability

## Whitetail Club & Shore Lodge — Stewardship Intelligence System · Phase 06

**Question this phase answers:** the architecture passed, the proof passed, the experience model passed. **Would real people actually produce the evidence the system requires in order to function?**
**Governed by:** [`00-project-governance.md`](00-project-governance.md) — binding.
**Inputs, read-only:** [`research-to-design-handoff-v3.md`](research-to-design-handoff-v3.md) + [`source-register.md`](source-register.md) *(the research foundation — there is no `01-research-foundation.md`)* · [`01-system-model.md`](01-system-model.md) · [`02-information-architecture.md`](02-information-architecture.md) · [`03-phase04-evaluation-and-plan.md`](03-phase04-evaluation-and-plan.md) · [`04-architectural-proof.md`](04-architectural-proof.md) · [`05-decision-experience-model.md`](05-decision-experience-model.md).

### Label discipline

Per the brief, every substantive claim carries one of three labels:

| Label | Meaning |
|---|---|
| **`[PROVEN]`** | Demonstrated in a prior phase against its own stated criteria |
| **`[ARCHITECTURAL]`** | Follows necessarily from the model; not a behavioral claim |
| **`[OPERATIONAL HYPOTHESIS]`** | A claim about how people would behave. **Unvalidated.** No field data exists and governance §3 forbids gathering it |

> **This document is dominated by the third label, and that is the honest distribution.** Every question Phase 06 asks is behavioral, and no prior phase produced behavioral evidence. A version of this document written mostly in `[PROVEN]` would be misrepresenting what can be known from here.

---

## 0 — The core validation question

> **Can the system maintain its defining property — *a stewardship system that improves through verified uncertainty* — when used by seasonal crews, supervisors, and future staff under normal operational pressure?**

The defining property has a single load-bearing dependency, identified in Phase 05 §14 as **U2**:

> **People must record what they did not find.**

Everything distinctive collapses without it. Failed searches stop becoming inheritable knowledge; `UNRESOLVED` degrades into `ASSUMED` in practice while the record still claims otherwise; and the §12 *Inherited Search* — the case study's centerpiece — never occurs. **The architecture would stand and the concept would be hollow.**

This phase evaluates whether that behavior is realistic.

---

## A — Failed search recording

### A.1 The mechanism already exists

`[PROVEN]` Phase 04 change #6 made `OBSERVATION.outcome ∈ {confirmed, inconclusive, contradicted, absent}` a **required attribute**. Phase 05 §6.2 established that a failed search is recorded as testimony with `OBSERVED` provenance and a negative finding.

`[ARCHITECTURAL]` The operational consequence is significant and often missed: **a verification task cannot be closed without stating what happened.** There is no "done" that omits an outcome, and *absent* is one of four options carrying equal structural weight — not an error path, not a null, not an exception.

> **The single most important operational requirement in this phase follows from that, and it costs nothing to implement:** the four outcomes must be **presented as equally legitimate answers**. The moment "not found" reads as failing to complete the task rather than as one of four ways to answer it, recording collapses. `[OPERATIONAL HYPOTHESIS]`

This is a framing requirement, not a feature. **No new object, no new capability.**

### A.2 Incentives to record

| Incentive | Strength | Label |
|---|---|---|
| **Closure** — the task cannot be closed otherwise; recording is the exit | **Strong** | `[ARCHITECTURAL]` |
| **Proof of work** — twenty minutes spent finding nothing is otherwise invisible; the record is the only evidence the effort happened | **Strong** | `[OPERATIONAL HYPOTHESIS]` |
| **Reciprocity** — you benefit because others recorded theirs | **Strong, but delayed** — see A.4 | `[OPERATIONAL HYPOTHESIS]` |
| **Avoiding a repeat trip** — recording means you won't be sent again for the same thing | Moderate | `[OPERATIONAL HYPOTHESIS]` |

**Proof-of-work is the underrated one.** A crew member who searches for twenty minutes and finds nothing has, under current practice, nothing to show for the time. The record converts unproductive-looking effort into a documented result. `[OPERATIONAL HYPOTHESIS]`

### A.3 Incentives against

| Disincentive | Strength | Label |
|---|---|---|
| **"Nothing to report"** — the intuition that absence isn't information | **Strong** | `[OPERATIONAL HYPOTHESIS]` |
| **Feels like admitting failure** | **Strong** — especially if framing is wrong (A.1) | `[OPERATIONAL HYPOTHESIS]` |
| **No visible near-term benefit** | **Strong in Year 1** — see A.4 | `[OPERATIONAL HYPOTHESIS]` |
| **Time pressure** in a compressed season `[SRC]` | Moderate | `[OPERATIONAL HYPOTHESIS]` |

### A.4 The real risk is cold-start, not diligence

**This reframes U2.** The strongest incentive — reciprocity — is *structurally unavailable* when the system is new.

```
Year 1   record is empty  →  recording helps nobody visibly  →  weakest incentive
                              ↑                                  ↓
                         highest abandonment risk    ←    lowest demonstrated value
```

`[OPERATIONAL HYPOTHESIS]` The question is not *"are these people diligent?"* It is **"can the record survive the period before it pays anyone back?"** That is a different problem with different remedies — it is about surviving a gap, not about motivating individuals.

**Two implications:**

1. **Year 1 must be seeded, not started empty.** Even a handful of pre-existing known-bad records give the first crews something to *inherit* rather than only contribute to. See [§G](#g--the-first-30-days).
2. **The first inheritance moment must be made visible when it happens.** The first time someone is spared a fruitless trip because a predecessor recorded a failure, that is the argument — and it will pass unnoticed unless the system makes plain *why* the trip was avoided. `[OPERATIONAL HYPOTHESIS]`

### A.5 Minimum effort

`[ARCHITECTURAL]` A failed search records as: the place *(already known — they were dispatched there)*, the outcome *(one of four)*, and optionally where and how long they looked. **The place and task context are already present; the marginal act is selecting an outcome and adding a sentence.**

`[OPERATIONAL HYPOTHESIS]` That is plausibly within the sub-15-second budget Phase 02 R1 set as a hard design gate — **and it must be no harder than recording a success.** If confirming takes one action and reporting absence takes three, the asymmetry will teach people what the system actually values, regardless of what the training says.

### A.6 What emerges, what needs training, what won't survive

| Behavior | Prognosis | Label |
|---|---|---|
| Recording a **successful** find | **Emerges naturally.** It is the completion gesture and it feels productive | `[OPERATIONAL HYPOTHESIS]` |
| Recording **where and how long** they searched | **Needs training.** The value is invisible to the person recording; it is entirely for the next person | `[OPERATIONAL HYPOTHESIS]` |
| Recording **absence at all** | **Needs training in Year 1, plausibly natural by Year 2** once inheritance has been experienced | `[OPERATIONAL HYPOTHESIS]` |
| Recording **inconclusive** results | **Hardest of all.** *"I looked and still don't know"* feels least like a result and most like incompetence | `[OPERATIONAL HYPOTHESIS]` |
| **Rich narrative descriptions** of searches | **Will not survive a season.** Anything requiring composition degrades under time pressure | `[OPERATIONAL HYPOTHESIS]` |

> **The inconclusive outcome is the fragile one**, and Phase 05 §6.3 showed it produces uniquely valuable knowledge — a durable fact about *method efficacy*. It is simultaneously the most valuable failure result and the least natural to record. **That gap is where training effort should concentrate.**

---

## B — Seasonal turnover test

Walking Years 1, 2, and 5 against the property's attested seasonal turnover `[SRC]`.

### B.1 Year 1 — the cold start

| | |
|---|---|
| **Conditions** | Empty or lightly seeded record. Original crews present. No inheritance has occurred |
| **What works** | Capture during work; verification on `ASSUMED × irreversible`; location corrections accumulate |
| **What does not** | **The defining property is invisible.** Nobody has inherited anything. The system asks for effort and returns little |
| **Risk** | **Highest abandonment risk of any year** `[OPERATIONAL HYPOTHESIS]` |

**Year 1 is a deposit-only year**, and no amount of design changes that. The value proposition in Year 1 is *"this will matter later"* — the weakest sale available. This is why §G's rollout targets a demonstrable within-30-days gain (the spatial record visibly improving) rather than the inheritance story, which cannot occur yet.

### B.2 Year 2 — the first inheritance

| | |
|---|---|
| **Conditions** | Original searchers gone `[SRC]`. Record has one cycle of observations, decisions, and failures |
| **What becomes possible** | **The §12 *Inherited Search*.** A new crew member is handed a failed search performed by someone they never met |
| **What forms here** | **Trust** — see [§E](#e--trust-formation) |
| **Risk** | If Year 1 recording was thin, Year 2 inherits thin, and the moment never lands `[OPERATIONAL HYPOTHESIS]` |

> **Year 2 is where the concept either proves itself or quietly doesn't.** Year 1 asked for faith; Year 2 either repays it in a way people notice or does not. **The system's real evaluation point is roughly fourteen months after deployment**, which is a long time to hold an organization's patience — and worth stating plainly to anyone considering this.

### B.3 Year 5 — depth, and the degradation risk

| | |
|---|---|
| **Conditions** | Multiple cycles. Original supervisors likely changed. Several crew generations |
| **What works well** | Cross-cycle comparison; mature location records; decision rationale spanning several turnovers |
| **What degrades** | **Accumulated knowledge nobody revisits** |

`[ARCHITECTURAL]` Phase 03 open question **A1** — *how is a knowledge record superseded when a pattern proves wrong?* — was left open, and Phase 04 §9 did not close it (R1–R5 do not include it). Architecturally that was tolerable.

**Operationally, at Year 5, it becomes the specific long-horizon failure mode.** A knowledge record written in Year 1 — *"this surface thaws forty minutes behind"* — may have been true of a surface that has since been renovated, re-graded, or re-planted. It is inherited **with the same authority as correct knowledge**, by people with no way to know it is stale, and no mechanism exists to retire it. `[OPERATIONAL HYPOTHESIS]`

**Why this does not block:** it is a slow, correctable degradation with a bounded blast radius, not a structural failure. Observations remain immutable and correct beneath any stale pattern; the raw record stays trustworthy even where the derived claim has aged. **But it must be named**, and A1 should be resolved before Year 3 rather than discovered in Year 5.

### B.4 Verdict on accumulation

`[OPERATIONAL HYPOTHESIS]` **Knowledge genuinely accumulates, provided Year 1 recording holds.** The mechanism is sound and the deposits are permanent. The vulnerability is not decay — it is that the *first* year is the one with the weakest incentives and the highest abandonment risk, and everything downstream depends on it.

---

## C — Bypass risk

Every place the intended loop can be circumvented, ranked by damage.

### C.1 Harmless

| Shortcut | Why it doesn't matter |
|---|---|
| Batching several observations at the end of a task, minutes later | Provenance and recency are materially unaffected at this timescale |
| Terse descriptions rather than full narrative | Terseness was expected (A.6); the outcome value carries the information |
| Skipping optional search-extent detail | Degrades the next person's efficiency; does not corrupt the record |

### C.2 Degrading

| Shortcut | Damage | Label |
|---|---|---|
| **End-of-day recall recorded as direct observation** | **Attractive and invisibly harmful.** The record claims `OBSERVED` at a timestamp hours after the actual sighting. Provenance and recency both become subtly wrong, and **nothing detects it** | `[OPERATIONAL HYPOTHESIS]` |
| **Skipping observations on routine work** | The record thins where crews actually go — the opposite of the intended pattern (P8) | `[OPERATIONAL HYPOTHESIS]` |
| **Never recording `inconclusive`** — forcing every result to confirmed or absent | Destroys the method-efficacy knowledge that only inconclusive produces (§6.3) | `[OPERATIONAL HYPOTHESIS]` |

**End-of-day recall is the most likely real-world degradation.** It is convenient, feels honest to the person doing it, and produces a record that is wrong in a way no one can see. `[OPERATIONAL HYPOTHESIS]`

### C.3 Fatal

| Shortcut | Why it destroys the concept |
|---|---|
| **Marking something verified without looking** | The system becomes **confidently wrong** — strictly worse than having no system, because a person will act on a `CONFIRMED` band that has no observation behind it |
| **Copy-forward readiness from last cycle** | Turns D3 back into a calendar exercise while presenting it as condition-driven. The exact reactive posture the project exists to replace |

### C.4 False verification cannot be prevented architecturally

**This is the hard limit of the design, and it must be stated rather than implied away.**

`[ARCHITECTURAL]` The system has **no mechanism to distinguish a genuine observation from a fabricated one.** An observation is testimony; the architecture takes testimony at face value by design, because that is what makes capture cheap enough to happen at all.

Three things raise the cost without closing the hole:

| Partial mitigation | What it does | What it doesn't |
|---|---|---|
| **Photo as part of capture** | Makes fabrication require effort comparable to the actual trip | Does not prevent it; a photo can be old or of the wrong place |
| **Contest surfacing** | A later genuine observation may contradict a fabricated one, exposing it retrospectively | Only sometimes, only later, only if someone looks again |
| **Rationale and evidence basis** | A decision made on a fabricated confirmation is traceable after an outcome | Diagnostic, not preventive |

> **Conclusion: false verification is a management problem, not a software problem.** `[ARCHITECTURAL]` It is prevented by supervision, culture, and the fact that fabricating a location observation tends to produce a discoverable error when the next person cannot find the thing where the record says it is. **The architecture makes lying detectable-in-time, not impossible.**

This is not a fixable gap, and attempting to fix it would be worse: verification-of-the-verification is infinite regress, and hardening capture to resist fabrication would make honest capture expensive enough to stop happening — trading a management risk for a certain failure of U2.

### C.5 The bypass that matters most

`[OPERATIONAL HYPOTHESIS]` Under deadline pressure the attractive shortcut is not fabrication — it is **skipping verification entirely and proceeding on `ASSUMED`**. That is not a bypass at all. **It is a legitimate, designed path** (Phase 05 §7.4), and the record shows the grounds were thin.

**A system where the honest shortcut is also a supported path is substantially more bypass-resistant than one where the only way to move fast is to lie.** That is a real structural strength and it belongs in the case study.

---

## D — Operational cost

### D.1 The four burdens

| Burden | Falls on | Magnitude | Label |
|---|---|---|---|
| **Data entry** | Field crew | **Low, and bounded by design.** Capture is the completion gesture of work already happening; place and task context are already present (A.5) | `[ARCHITECTURAL]` |
| **Verification** | Field crew (trips), supervising role (deciding to send) | **The dominant cost — and it is the trip, not the recording** | `[ARCHITECTURAL]` |
| **Supervision** | Supervising role | **Moderate.** Reviewing gaps, approving dispatch, stating rationale at decisions | `[OPERATIONAL HYPOTHESIS]` |
| **Maintenance** | **Unassigned — see D.3** | Potentially unbounded if mishandled | `[ARCHITECTURAL]` |

### D.2 The verification burden is already bounded

`[PROVEN]` Phase 05 §8.3 established that verification is obliged by a **combination** — `ASSUMED × irreversible` — never by a band alone. `ASSUMED` on a reversible decision obliges nothing.

**This is the single most important cost-control property in the design**, and it was derived for correctness rather than for economy. Most conditions are assumed most of the time; a system demanding a trip for each would impose an unpayable burden and would be abandoned within a season. `[OPERATIONAL HYPOTHESIS]`

`[ARCHITECTURAL]` The marginal cost of verification is therefore: **the number of irreversible decisions × the fraction of their inputs that are weakly grounded.** At this property that is a handful of decisions per season (D2 daily in shoulder season, D3 annually, D4 episodically), not a continuous load.

### D.3 The maintenance burden — a tripwire that had to be cleared

**Who turns nine observations into *"this surface thaws forty minutes behind the others"*?**

Phase 02 §8.3 asserted knowledge must be "a byproduct, never a task," and Phase 03 §13 defined C6 as *accumulation, comparison, and return* — **but no phase assigned the authoring step an owner.** Left unresolved, there are only two possibilities, and one of them is fatal:

| Possibility | Consequence |
|---|---|
| A curator reviews observations and writes knowledge records | **Continuous expert administration — automatic BLOCK per this phase's tripwire** |
| Records are derived automatically from observations | Automated inference presented as knowledge — would have to carry `INFERRED` provenance, and edges toward the automation governance §5 (G2) forbids |

**Resolution, derived from the existing model rather than invented:**

> ### Rationale capture *is* knowledge authoring.

`[ARCHITECTURAL]` When a supervising role makes a D2 call and states *"delaying forty minutes — this surface historically runs behind the others"*, **that rationale is the knowledge record.** It is authored by the person best positioned to author it, at the moment they are already thinking it, in the act of making a decision they were making anyway.

Phase 05 §9.3 already established that rationale is retrieved by default at equivalent decisions. This closes the loop: **rationale is written at a decision and read at the next equivalent decision. No curation step, no curator, no separate authoring activity.**

**The tripwire is cleared** — and the resolution is better than a curator would have been, because a curator would have been inferring patterns from observations they did not make, while the supervising role is recording a judgment they actually formed.

### D.4 Smallest usable version

`[ARCHITECTURAL]` Stripped to the minimum that still exhibits the defining property:

| Element | Minimum |
|---|---|
| **Places** | One domain; the places one decision touches. Describable location only `[PROVEN]` |
| **Decisions** | **One** — D3 winterization, or D4 drainage |
| **Conditions** | Location, plus the one condition type that decision needs |
| **Verification** | Only on `ASSUMED × irreversible` |
| **Knowledge** | Rationale captured at decisions. Nothing else |
| **Roles** | Two — field and supervising. Leadership not required |

**Everything else is addition.** This version still walks `PLACE → CONDITION → CONFIDENCE → DECISION → TASK → OBSERVATION → CONDITION` and still produces inheritable failed searches.

### D.5 Viability with incomplete records

`[PROVEN]` Phase 04 Gate A demonstrated the loop traversing on describable location with no coordinates. `[ARCHITECTURAL]` Phase 04 §3 ① established that legacy records enter as `REPORTED`-class pseudo-observations at `HYPOTHESIZED` provenance.

> **Incomplete records are the *starting dataset*, not a blocker.** An organization with poor as-builts is not disqualified — it is the intended user, because the gap between what the drawing claims and what is in the ground is precisely what verification resolves.

### D.6 Proportionality

`[OPERATIONAL HYPOTHESIS]` The burden is proportionate **for irreversible decisions** and would be disproportionate if applied uniformly. The design already makes that distinction structurally (Phase 05 E8), so proportionality is preserved by the architecture rather than by discipline — **which matters, because discipline erodes under pressure and structure does not.**

---

## E — Trust formation

### E.1 The question

Why would a supervising role treat `ASSUMED`, `CONTESTED`, or `UNRESOLVED` as meaningful rather than ignoring them as system noise?

**Because a band is a claim about the world**, and claims about the world get tested whether or not anyone intends to test them.

### E.2 How trust is earned

| Band | Earns trust when | Label |
|---|---|---|
| **`ASSUMED`** | An assumed condition turns out to be wrong **and it cost something** — a trip wasted, a valve not where the drawing said, a zone that could not be blown out on schedule | `[OPERATIONAL HYPOTHESIS]` |
| **`UNRESOLVED`** | It **saves a trip.** The first time someone reads *"searched October, not found"* and doesn't send anyone, the band has paid for itself visibly | `[OPERATIONAL HYPOTHESIS]` |
| **`CONTESTED`** | A third look resolves a disagreement that would otherwise have been silently averaged into a wrong middle value | `[OPERATIONAL HYPOTHESIS]` |

> **Trust forms from one salient event, not from accumulated accuracy.** `[OPERATIONAL HYPOTHESIS]` People do not audit calibration; they remember the time the system was right about something mattering. The first avoided fruitless trip is worth more to adoption than a hundred correctly-banded conditions nobody noticed.

**This makes A.4's second implication operationally critical:** when the first inheritance moment happens, the system must make plain *why* the trip was avoided. A silent save teaches nobody.

### E.3 What causes abandonment

| Cause | Mechanism | Label |
|---|---|---|
| **Over-surfacing** | Gaps flagged on reversible decisions → alarm fatigue → all bands ignored, including the ones that matter | `[OPERATIONAL HYPOTHESIS]` |
| **A wasted verification** | Sent to look at something that turns out not to have mattered → verification reads as bureaucracy | `[OPERATIONAL HYPOTHESIS]` |
| **`ASSUMED` read as `false`** | Over-verification of conditions that were fine → the system becomes expensive to obey | `[OPERATIONAL HYPOTHESIS]` (Phase 05 U6) |
| **Year 1 with no return** | Sustained deposit with no visible withdrawal (B.1) | `[OPERATIONAL HYPOTHESIS]` |

> **Over-surfacing is the most likely abandonment path**, and it makes Phase 05 §8.3's combination rule **operationally load-bearing rather than merely elegant.** Relaxing it — surfacing gaps on reversible decisions "because the information is there" — would be the single most damaging change anyone could make to this system, and it is exactly the kind of change that sounds like an improvement.

### E.4 Does trust increase over time?

`[OPERATIONAL HYPOTHESIS]` **Conditionally yes, with an asymmetric shape:**

```
   trust
     │                                    ╭─────────  Year 2+ : inheritance
     │                                 ╭──╯            moments compound
     │        ╭──── flat/declining ────╯
     │  ╭─────╯     Year 1: deposits, no returns
     └──┴────────────────────────────────────────▶ time
        ↑                            ↑
     highest abandonment risk     trust forms here
```

The curve is **flat-to-declining through Year 1** and rises only once inheritance begins. **Trust does not increase steadily; it steps.** An organization evaluating on a six-month horizon would evaluate during the trough — which is the single most important thing to tell anyone deploying this.

---

## F — Negative incentives

The pressures that could make the system reward performative certainty instead of honesty.

### F.1 The pressure cases

| Pressure | The temptation | Damage |
|---|---|---|
| **A closing window** `[SRC]` | Skip verification, proceed on `ASSUMED` | **None — this is a supported path** (C.5) |
| **Guest-visible impact** | Mark a condition confirmed to avoid explaining thin grounds | **Fatal** (C.3) |
| **Staffing shortage** `[SRC]` | Skip observations; batch from recall | Degrading (C.2) |
| **Weather event** | Copy-forward last cycle's readiness | **Fatal** (C.3) |
| **Leadership scrutiny** | Falsify the evidence basis so a decision looks better-grounded than it was | **Fatal — and see F.2** |

### F.2 The mechanism that decides which way this goes

`DECISION.evidence_basis` records what was known **at the moment of decision**. Its use determines whether the system produces honesty or theatre:

| If leadership uses it to… | Then people… | Result |
|---|---|---|
| **Explain outcomes** — *"that failed because we were working from an unverified drawing; let's verify that zone next cycle"* | Record thin grounds accurately, because doing so **protects them** | **Honesty is the safe choice** |
| **Assign blame retrospectively** — *"you proceeded on assumed readiness and it cost us"* | Ensure conditions look confirmed before deciding | **Falsification becomes the safe choice** |

> **This is the finding that most constrains the verdict.** `[ARCHITECTURAL]` The architecture is **honesty-compatible, not honesty-guaranteeing.** It makes honest recording *possible and cheap*; it cannot make honest recording *safe*. Safety is conferred by how leadership treats the record, and that lies entirely outside the software.

**The perverse risk is specific and worth naming:** a system that meticulously documents decision quality is a system that can be weaponized against the people documenting it. Under punitive use, this design would produce **worse** information than having no system at all — because it would produce confident-looking falsified records rather than acknowledged ignorance.

### F.3 What the design does get right

| Property | Effect |
|---|---|
| **Deciding on `ASSUMED` is legitimate and supported** | Removes the main reason to falsify — you do not need certainty to act |
| **Confidence never blocks a decision** (Phase 05 §7.4) | No incentive to fake a band to unblock yourself |
| **Failed searches are results, not failures** (A.1) | Removes the reason to hide a fruitless trip |
| **Roles attribute; individuals are not measured** `[PROVEN]` | Phase 03 §12.1 — productivity is **not modeled at all**, structurally, so the record cannot become a performance instrument by accident |

`[ARCHITECTURAL]` **Three of the four major falsification incentives are designed out.** The fourth — leadership use of the evidence basis — cannot be, and becomes a stated condition of this phase's verdict.

---

## G — The first 30 days

### G.1 Starting conditions

Incomplete as-builts `[SRC]` · no GIS · no historical database · skeptical staff. **This is the intended starting condition, not a degraded one** (D.5).

### G.2 What 30 days can and cannot show

> **It cannot demonstrate the defining experience.** The §12 *Inherited Search* requires a season and a staff change. Any rollout promising it in 30 days will fail to deliver and damage the concept's credibility at exactly the wrong moment.

**What 30 days *can* demonstrate:** the spatial record measurably improving — locations moving from `ASSUMED` to `CONFIRMED`, wrong positions corrected, absent things confirmed absent. **That is a real, visible, checkable gain**, and it is the honest 30-day promise.

### G.3 The minimum deployment

| | |
|---|---|
| **Scope** | One domain. One decision — **D4 drainage** preferred over D3, because D4 recurs within a season while D3 occurs annually and cannot generate volume in 30 days |
| **Seed** | **A handful of places whose records are known to be unreliable** — the ones people already suspect. Entered at `HYPOTHESIZED` from existing drawings, describable location only |
| **Roles** | Field crew + supervising role. Leadership not required |
| **Work** | Verification tasks issued on `ASSUMED` locations where crews are already going |
| **Success measure** | Count of locations whose provenance improved, **and count of failed searches recorded** |

### G.4 Why seeding with known-bad records is the right choice

`[OPERATIONAL HYPOTHESIS]` Three reasons, and the third is the one that matters:

1. **Fastest visible improvement** — these are the places most likely to yield a correction.
2. **It matches an existing belief.** Crews already suspect these records; the system agreeing with them buys credibility that a neutral start would not.
3. **It converts the cold-start problem (A.4) into a seeded start.** The first crews are not contributing to an empty record — **they are resolving a small, named backlog of things the organization already knows it does not know.** That is a materially different and better proposition than *"start documenting and it will pay off next year."*

### G.5 The 30-day success criterion

> **At least one failed search recorded, and at least one location corrected.**

`[OPERATIONAL HYPOTHESIS]` **The failed search is the more important of the two**, because it is the direct test of U2 — the assumption everything distinctive rests on. A rollout producing ten corrections and zero recorded absences has **not** validated the concept; it has validated a location-correction tool while leaving the defining property untested.

---

## Gate assessment

| Gate | Question | Result | Basis |
|---|---|---|---|
| **A** | Can failed-search knowledge realistically accumulate? | **CONDITIONAL** | The mechanism is architectural and required, not optional (A.1) `[ARCHITECTURAL]`. Whether people use it is **U2, unvalidated** `[OPERATIONAL HYPOTHESIS]`. Cold-start (A.4) is the specific risk |
| **B** | Can the system survive seasonal turnover? | **CONDITIONAL** | Accumulation is sound and deposits are permanent (B.4). Conditional on Year 1 recording holding, and on **A1 being resolved before Year 3** (B.3) |
| **C** | Can the workflow resist shortcut behavior? | **QUALIFIED** | Harmless and degrading shortcuts are tolerable. **False verification cannot be prevented architecturally** (C.4) — a management problem, permanently. Offsetting strength: the honest shortcut is a supported path (C.5) |
| **D** | Is operational burden proportionate to value? | **PASS** | Verification is bounded by `ASSUMED × irreversible` **structurally** `[PROVEN]`, not by discipline (D.2, D.6). The maintenance tripwire is cleared by rationale-as-authoring (D.3) |
| **E** | Does trust increase over time? | **CONDITIONAL** | Yes, but the curve **steps rather than climbs** — flat-to-declining through Year 1, rising only once inheritance begins (E.4). Over-surfacing is the likeliest abandonment path (E.3) |
| **F** | Can the system function with describable-only locations? | **PASS** `[PROVEN]` | Phase 04 Gate A demonstrated the full loop traversing with no coordinates. **The only gate here that passes on proof rather than hypothesis** |
| **G** | Is there a realistic day-one deployment path? | **PASS** | One domain, one decision, a seeded backlog of known-bad records, two roles, zero integrations (G.3). Incomplete records are the starting dataset (D.5) |

**Three pass. Three conditional. One qualified.**

### Tripwire check

| Condition | Status |
|---|---|
| Requires a new object | **No** — no object was introduced at any point |
| Requires mandatory GIS | **No** `[PROVEN]` — Phase 04 Gate A |
| Requires mandatory digitization | **No** — incomplete records are the starting dataset (D.5); seeding is a handful of places |
| Requires continuous expert administration | **No** — cleared by D.3. **This one was genuinely live** until rationale-as-authoring resolved it |

**No tripwire condition obtains. The verdict is not BLOCK.**

---

# VERDICT

## CONDITIONAL PASS

**The system is operationally viable, and its defining property depends on one behavior that cannot be validated from documents and two organizational conditions that lie outside the software.**

### Why not BLOCK

No tripwire condition obtains. Nothing here requires a new object, GIS, digitization, or continuous administration. The one genuine risk — an unassigned knowledge-authoring burden that would have constituted continuous expert administration — is closed by recognizing that **rationale capture is knowledge authoring** (D.3), which assigns the work to the person already doing the thinking, at the moment they are already doing it.

### Why not PASS

**PASS would assert that real people consistently record what they did not find.** No prior phase evidences that. Phase 05 named it U2 and deferred it explicitly. Governance §3 forbids gathering the data that would settle it, correctly — it is a deployment question, and no amount of further analysis substitutes for one season of use.

There is also a reason of principle. This project's entire thesis is a system that **declines to fake confidence**. A Phase 06 that returned PASS on an unvalidated behavioral assumption would be doing precisely what the system is designed not to do — converting a hypothesis into a fact because the analysis reached its end and a clean answer would be satisfying. **The verdict has to model the behavior it is evaluating.** `CONDITIONAL PASS` is not a softened `PASS`; it is the accurate band, and the conditions below are exactly what makes it precise rather than evasive.

### The three conditions

**1. U2 must be validated in the first deployment, not assumed.**
The 30-day success criterion is *at least one failed search recorded* (G.5) — not corrections, which measure a lesser thing. If crews will not record absence, the architecture stands and the concept is hollow, and it is far better to learn that in 30 days than in Year 2.

**2. Leadership must use `evidence_basis` to explain outcomes, never to assign blame.**
`[ARCHITECTURAL]` The architecture is honesty-compatible, not honesty-guaranteeing (F.2). Under punitive use it would produce **worse** information than no system at all — confident-looking falsified records instead of acknowledged ignorance. This is a precondition of deployment, not a nice-to-have, and it belongs in whatever agreement precedes a real engagement.

**3. Phase 03's A1 must be resolved before Year 3.**
Knowledge-record supersession is architecturally deferrable and operationally dated (B.3). Unresolved by Year 5 it becomes stale knowledge inherited with the authority of true knowledge, which is a quiet and expensive failure mode.

### What this phase establishes

**The design's cost structure is sound, and by construction rather than by discipline.** Verification is bounded to `ASSUMED × irreversible` because that is where it is *correct*, and the economy follows from the correctness — which means the bound will not erode the way a policy would. Deciding on thin evidence is a supported path, so the honest shortcut and the fast shortcut are the same shortcut. Individuals are not modeled, so the record cannot become a performance instrument by accident.

**The trust curve is the finding most likely to be ignored, and the one most likely to sink a deployment.** Trust does not climb steadily — it steps, and it steps in Year 2 (E.4). Year 1 is a deposit-only year with the weakest incentives and the highest abandonment risk, and any organization evaluating on a six-month horizon will evaluate during the trough. **The seeded-backlog rollout (G.4) exists specifically to shorten that trough**, by giving the first crews a small named set of things the organization already knows it does not know — resolving a backlog rather than filling a void.

**The honest limit:** this system makes turnover survivable, not solved; it makes lying detectable-in-time, not impossible; and it makes uncertainty legible, not smaller. Each of those is a real contribution, and each is bounded. Claiming more would fail the same test the verdict just applied.

---

*Phase 06 complete. Prior phases unmodified. No new objects, features, or research introduced — by design.*
