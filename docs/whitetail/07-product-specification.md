# 07 — Product Specification

## Whitetail Club & Shore Lodge — Stewardship Intelligence System · Phase 07

**Governed by:** [`00-project-governance.md`](00-project-governance.md) — binding. Prior phases frozen and unmodified.
**Nature of this phase:** a **specification exercise**. Not UI design, not feature brainstorming. The goal is the *minimum* product that expresses the architecture faithfully.

---

## §1 — Purpose

### 1.1 What this phase does

Determine whether the validated architecture can become software **without introducing behaviors that undermine the properties that made it pass.**

Six phases established a system whose distinguishing quality is that it declines to fake confidence. Software is where that quality is most easily lost — not through malice, but through ordinary good engineering instincts. A confidence score is easier to render than five explainable bands. Auto-creating a task is easier than a two-step surface-then-approve. Merging two disagreeing observations into one value is easier than keeping both. **Each of those is a defensible engineering choice that silently destroys the thesis.**

### 1.2 The architectural question under test

> **Can the defining loop — `OBSERVATION → CONDITION → CONFIDENCE → DECISION → VERIFICATION → OBSERVATION` — be implemented in software without introducing behaviors that undermine provenance, uncertainty, verification, or knowledge inheritance?**

### 1.3 The falsification mandate

The architecture claims **eleven objects are sufficient**. Phase 07 must attempt to falsify that claim, and **any new object type required returns BLOCK**. The attempt is documented in [§14](#14--verdict) rather than assumed away — a specification phase that did not genuinely try to break the model would be worthless as a check on it.

---

## §2 — Inputs

**Note on naming:** there is no `01-research-foundation.md`. The research foundation is [`research-to-design-handoff-v3.md`](research-to-design-handoff-v3.md) + [`source-register.md`](source-register.md).

| Phase | Artifact | Conclusion relevant to product definition |
|---|---|---|
| Research | handoff v3.1 + source register | Evidence boundary; `[U:*]` claims may not be stated as fact; eight untraceable claims removed |
| **02** System model | [`01-system-model.md`](01-system-model.md) | Root problem is **non-addressability**. Two coupled loops (fast/slow); **the coupling is the product**. Seven decisions D1–D7 |
| **03** Information architecture | [`02-information-architecture.md`](02-information-architecture.md) | **Eleven objects.** Recursive `PLACE`. `CONTEXT` and `CONFIDENCE` computed, never stored. Six capabilities. Four surfaces implied |
| **03b** Phase 04 evaluation | [`03-phase04-evaluation-and-plan.md`](03-phase04-evaluation-and-plan.md) | Gate criteria; spatial floor is **describability, not coordinates** |
| **04** Architectural proof | [`04-architectural-proof.md`](04-architectural-proof.md) | **PASS** conditional on §11's twelve changes. Location is a condition type. `TASK produces OBSERVATION` directly. Five confidence bands. `{ACT, VERIFY}`. **Failure is the richer half** |
| **05** Decision experience | [`05-decision-experience-model.md`](05-decision-experience-model.md) | **PASS.** Envelopes; never average contested; verification obliged by `ASSUMED × irreversible`; defining experience = **The Inherited Search** |
| **06** Operational validation | [`06-operational-validation.md`](06-operational-validation.md) | **CONDITIONAL PASS.** Rationale capture *is* knowledge authoring. False verification unpreventable architecturally. Trust steps at Year 2 |

**Applied throughout:** the post-§11 corrected architecture, not Phase 03 as originally written.

---

## §3 — Architectural commitments

Seven commitments that cannot be violated. Each is a property some later engineering decision will be tempted to trade away.

### C1 — Provenance is preserved on every condition
**Source:** Phase 03 §5 · Phase 04 §11 (#1)
**Why:** How a thing is known determines what a person should do about it. A measured reading, a glance, and an inference from an old drawing support different actions.
**Violation consequence:** Confidence becomes unexplainable, Phase 04 Gate D fails retroactively, and the system's signature property is gone.

### C2 — Uncertainty is visible, never inferred away
**Source:** Phase 05 §7 · Phase 04 §6
**Why:** The organization's root problem is being unable to distinguish what it knows from what it assumes. A system reproducing that confusion has automated the disease.
**Violation consequence:** The product becomes a confident-looking record of unknown reliability — **strictly worse than no system**, because people would act on it.

### C3 — Contested evidence is preserved, never merged
**Source:** Phase 05 E2 · Phase 03 §4.3 · Phase 04 §4.C
**Why:** Two observations disagreeing within the decay window are both true testimony.
**Violation consequence:** Averaging destroys two real observations and **fabricates a third that nobody made** — the precise thing the system exists not to do.

### C4 — Failed verification is preserved as testimony
**Source:** Phase 04 §4.A · Phase 05 §6.2 · Phase 06 A
**Why:** *"Searched and did not find"* is the only path by which a place accumulates knowledge no individual holds.
**Violation consequence:** `UNRESOLVED` collapses into `ASSUMED`; crews repeat each other's fruitless searches; **the Inherited Search never occurs and the case study's centerpiece is fiction.**

### C5 — Dispatch requires human approval
**Source:** Phase 04 §3 ③–④ · Phase 05 §1.4 · governance §5 (G2)
**Why:** The system surfaces a gap; a person decides whether to send someone. These are two steps and must remain two.
**Violation consequence:** The system begins allocating labour. It becomes an autonomous manager, which governance §5 forbids and which no evidence supports.

### C6 — Confidence is explainable without a formula
**Source:** Phase 04 §6 · Phase 05 §7.1
**Why:** Five bands, each carrying its own plain-language reason. Every input is a checkable fact.
**Violation consequence:** A numeric score invites false precision and cannot be explained without exposing its derivation — **the exact failure Phase 04 replaced.**

### C7 — Knowledge is inheritable and place-anchored
**Source:** Phase 02 §8.3 · Phase 05 §9 · Phase 06 D.3
**Why:** Knowledge attaches to ground so it survives the person. Rationale captured at a decision *is* the knowledge record.
**Violation consequence:** Knowledge becomes a document nobody opens; the slow loop goes write-only; the system degrades to a work-order tool with good metadata.

### C8 — Identity stays outside the domain record
**Source:** Phase 03 §3.3 (`PERSON` deliberately unmodeled) · §12.1 · governance §6
**Why:** **New in Phase 07** — no prior phase confronted authentication, because none was specifying software. `ROLE` attributes an observation; identity authenticates a session. **The two are never joined in the stored record.**
**Violation consequence:** `PERSON` re-enters through the back door and surveillance becomes structurally possible for the first time since Phase 03. **A competent engineer will join these on day one unless told not to** — it is the obvious implementation.

---

## §4 — Product boundaries

### 4.1 What the product must do

| Must | Source |
|---|---|
| Make every place addressable at describable resolution | Phase 04 Gate A |
| Record observations as immutable testimony with an outcome | Phase 04 §11 (#6) |
| Derive conditions and compute confidence bands on read | Phase 03 §2.2 |
| Surface confidence gaps on pending irreversible decisions | Phase 05 §8.3 |
| Let a person issue a verification task and record its result — including absence | Phase 04 §6 |
| Capture rationale at the moment of decision | Phase 05 E6 |
| Return prior rationale at equivalent decisions | Phase 05 §9.3 |
| Show what has already been tried at a place | Phase 05 §6.6 |

### 4.2 The six candidates, tested

| Capability | Inside MVP? | Reasoning |
|---|---|---|
| **Autonomous decision making** | **OUTSIDE — permanently** | Violates C5 and governance §5 (G2). Every loop closes through a human. Not a scope decision; a design commitment |
| **Autonomous dispatch** | **OUTSIDE — permanently** | Phase 04 §3 made surface-then-approve two explicit steps. Collapsing them is the single most likely violation, because auto-creating the task looks like a helpful convenience |
| **Optimization engines** | **OUTSIDE** | Optimizing implies an objective function over values the system does not have. Deferral cost is recorded (D7), never modeled |
| **Prediction systems** | **OUTSIDE — `[SC]`** | Requires data that does not exist. Governance G4. The model accommodates future telemetry without depending on it |
| **Recommendation systems** | **OUTSIDE — with a bright line, see 4.3** | The system surfaces state and may order it by an explicit rule. It does not rank by relevance or learn preferences |
| **AI-generated conclusions** | **OUTSIDE — permanently** | A generated conclusion has no provenance class. It is not `MEASURED`, `OBSERVED`, `REPORTED`, or honestly `INFERRED` — it is unattributable, and C1 has no slot for it |

### 4.3 The bright line around "proposal"

Phase 03 §15 and Phase 04 §3 both describe the system *proposing* a D3 sequence. That phrasing is one careless step from a recommendation engine, so the line is drawn here:

> **The system may order by an explicit, inspectable rule.** *Windows closing soonest first, using last cycle's recorded durations.* A person can read the rule, check its inputs, and disagree with it.
>
> **The system may never rank by a learned, weighted, or opaque model** — including anything a person cannot restate in a sentence.

**Why this matters more than it looks:** Phase 04 Gate D required confidence be explainable without exposing a formula. A ranked proposal derived from an opaque model fails that standard by the back door — the *confidence* stays explainable while the *ordering* does not, and a person cannot meaningfully approve a sequence they cannot reason about.

### 4.4 Explicitly rejected product shapes

Inherited from Phase 03 §17 and unchanged: generic work orders · HR/productivity monitoring · fleet management · GIS administration · compliance tracking · general status overview · guest-facing anything · alerting engine *(deferred)*.

---

## §5 — User roles

Derived only from prior phases. **Role descriptions, never individuals** (governance §6). No role is added.

### 5.1 Field crew member *(seasonal)*

| | |
|---|---|
| **Responsibilities** | Execute assigned work. Record observations — including finding nothing |
| **Information needed** | Where the thing is, describably. What it is. **What is normal here — one sentence.** What they were sent to settle. **What has already been tried here** |
| **Decisions made** | **D6** — proceed, handle, or escalate |
| **Writes** | Observations with outcomes. The system's entire supply of ground truth |

### 5.2 Supervising role *(superintendent / grounds director)*

| | |
|---|---|
| **Responsibilities** | Decide, sequence, dispatch. Approve verification |
| **Information needed** | Conditions **with bands**; closing windows and their cost; which inputs are weakly grounded; prior rationale at equivalent decisions |
| **Decisions made** | **D1, D2, D4, D7** outright; **D3, D5** with leadership; plus the dispatch-approval point |
| **Writes** | Decisions with rationale. Verification requests. Assignments |

### 5.3 Leadership role

| | |
|---|---|
| **Responsibilities** | Seasonal strategy and resource policy |
| **Information needed** | Patterns across cycles |
| **Decisions made** | Participates in D3, D5 |

**Not required by the MVP** (Phase 06 D.4 — two roles suffice). Retained in the model because D3 and D5 name it; **must not drive the product's design** (Phase 05 §3.3).

### 5.4 Roles rejected

| Rejected | Why |
|---|---|
| **Administrator / curator** | Phase 06 D.3 — a curator would constitute continuous expert administration, an automatic BLOCK. Rationale capture *is* knowledge authoring |
| **Analyst** | No decision in D1–D7 requires one. Would import the dashboard drift §4.4 rejects |
| **Guest / member** | Outside scope entirely |
| **Individual (as tracked entity)** | C8. Identity authenticates; it is never stored as a domain participant |

---

## §6 — Core workflows

Six lifecycles. **Every object and relationship named below already exists in the eleven-object model.**

### 6.1 Observation capture

| | |
|---|---|
| **Trigger** | A person is at a place and has something to record — spontaneously (D6) or as the result of assigned work |
| **Objects** | `PLACE` · `OBSERVATION` · `ROLE` · optionally `TASK` |
| **Relationships** | `PLACE is described by OBSERVATION` · `ROLE attributes OBSERVATION` · `TASK produces OBSERVATION` *(when task-driven)* |
| **Required outputs** | An immutable observation carrying place, time, role, provenance class, `outcome`, and payload (note / photo / reading) |
| **Constraints** | Capture is the **completion gesture**, not a subsequent step (Phase 05 E3). Recording absence must cost no more than recording a find (Phase 06 A.5) |

**Spontaneous capture requires no task.** The direct `PLACE → OBSERVATION` edge exists precisely so D6 works without dispatch.

### 6.2 Decision support

| | |
|---|---|
| **Trigger** | A person begins a decision — a window opening, a condition changing, a scheduled call |
| **Objects** | `DECISION` · `CONDITION` · `PLACE` · `WINDOW` · `KNOWLEDGE` · `EVENT` |
| **Relationships** | `CONDITION informs DECISION` · `WINDOW bounds DECISION` · `KNOWLEDGE returns as context on DECISION` |
| **Computed** | **Context** (composed at decision time) · **Confidence** (computed on read) — neither stored |
| **Required outputs** | The decision's **envelope**: only what changes the outcome. A committed decision carrying **rationale** and an **evidence basis** |
| **Constraints** | Relevance over completeness (Phase 05 §11.1). Rationale is not optional — optional rationale is uncaptured rationale (Phase 03 §3.3) |

### 6.3 Verification request

| | |
|---|---|
| **Trigger** | A pending decision is **irreversible** and an input condition is banded `ASSUMED`, `CONTESTED`, or `UNRESOLVED` |
| **Objects** | `CONDITION` · `DECISION` · `TASK` · `PLACE` · `ROLE` |
| **Relationships** | `DECISION issues TASK` · `TASK targets CONDITION` · `TASK is the site of PLACE` |
| **Required outputs** | **Step 1:** the gap surfaced — *which* places, *why* weakly grounded. **Step 2:** on human approval, a task with `purpose = VERIFY` carrying the describable location and what would count as an answer |
| **Constraints** | **C5 — two steps, never one.** The trigger is a *combination*, never a band alone (Phase 05 §8.3). `ASSUMED` on a reversible decision obliges nothing |

### 6.4 Failed verification

**The workflow that matters most.** Phase 06 G.5 made it the actual 30-day validation criterion.

| | |
|---|---|
| **Trigger** | A verify task completes without settling its target |
| **Objects** | `TASK` · `OBSERVATION` · `CONDITION` · `PLACE` |
| **Relationships** | `TASK produces OBSERVATION` · `OBSERVATION verifies CONDITION` · `OBSERVATION prompts TASK` *(escalation, 0..1)* |
| **Required outputs** | An observation with `outcome ∈ {absent, inconclusive}`, `OBSERVED` provenance, and — where recorded — search extent and duration. Target condition → `UNRESOLVED` |
| **Constraints** | The four outcomes must be **presented as equally legitimate answers** (Phase 06 A.1). A task cannot close without stating what happened |

**Three sub-cases, distinct results:**

| Sub-case | Location condition | Target condition | Escalation |
|---|---|---|---|
| **Not found** | `CONTESTED` → `UNRESOLVED` | Unchanged, still `ASSUMED` | Different scope — wider radius, older records |
| **Found, inconclusive** | `CONFIRMED` — permanent gain | `UNRESOLVED` | **Different method**, never a repeat look |
| **Confirmed absent** | Superseded, high confidence | Resolved by absence | Usually none — the question is closed |

**What must persist:** *searched on this date, in this area, for this long, and did not find it.* **This is the entire basis of the Inherited Search** (§6.6).

### 6.5 Successful verification

| | |
|---|---|
| **Trigger** | A verify task settles its target |
| **Objects** | `TASK` · `OBSERVATION` · `CONDITION` *(two of them)* · `PLACE` |
| **Relationships** | `TASK produces OBSERVATION` · `OBSERVATION verifies CONDITION` |
| **Required outputs** | Target condition re-derived to `CONFIRMED`. **Where position differed, the location condition is superseded and the spatial record is permanently corrected** |
| **Constraints** | Prior condition values move to history, never deleted. The observations beneath a superseded condition remain valid |

**Two conditions can move from one visit.** Location and target are separate conditions on the same place — a consequence of Phase 04's unification of location as a condition type.

### 6.6 Knowledge inheritance

**The defining workflow.**

| | |
|---|---|
| **Trigger** | A person reaches a decision at a place where prior observations, decisions, or failed searches exist |
| **Objects** | `KNOWLEDGE` · `PLACE` · `DECISION` · `OBSERVATION` · `TASK` |
| **Relationships** | `OBSERVATION accumulates into KNOWLEDGE` · `KNOWLEDGE returns as context on DECISION` · `PLACE accumulates KNOWLEDGE` |
| **Required outputs** | At the decision: prior rationale from the equivalent decision, **by default**. At the place: what has already been tried, **present rather than on request** |
| **Constraints** | Two filters — **place-anchored** and **decision-type matched**. Retrieved at the decision, never browsed (Phase 05 §9.1). For D6, **one sentence** |

**Authoring has no separate step.** Rationale stated at a decision *is* the knowledge record (Phase 06 D.3). Failed searches accumulate as observations without any authoring act at all.

---

## §7 — Minimum surfaces

**Four.** Each traces to named decisions; none is a layout.

> **Why four is the floor:** the loop has exactly four stages requiring a human surface — *understand a place*, *record what was found*, *decide*, and *notice that a decision is needed*. **Removing any surface removes a loop stage.**

### S1 — Place

| | |
|---|---|
| **Purpose** | Answer *"what is here, what is known about it, how well, and what has already been tried"* |
| **Serves** | **D6** primarily; the front half of **D1, D2, D4, D5**; all navigation |
| **Inputs** | A place identifier — reached directly, from a task, or from an attention item |
| **Outputs** | Orientation; entry to capture |
| **Objects exposed** | `PLACE` *(+ contained places)* · current `CONDITION`s with bands · recent `OBSERVATION`s · `KNOWLEDGE` · **prior verification attempts** |

**Every other surface resolves into this one** (Phase 03 §14.3). Tasks are an entry route, not a fifth surface.

### S2 — Capture

| | |
|---|---|
| **Purpose** | Record an observation in seconds |
| **Serves** | **D6**; the observation half of every other decision; **all verification outcomes** |
| **Inputs** | Place *(already known)* · optional task context *(already known)* |
| **Outputs** | One immutable `OBSERVATION` |
| **Objects exposed** | `OBSERVATION` · `outcome` · provenance class · payload |

**The four outcomes carry equal weight.** If `absent` is harder to record than `confirmed`, the asymmetry teaches people what the system values regardless of training (Phase 06 A.5).

### S3 — Decision

| | |
|---|---|
| **Purpose** | Present the envelope and capture the choice with its reasoning |
| **Serves** | **D1, D2, D3, D5, D7** |
| **Inputs** | A decision in progress |
| **Outputs** | A committed `DECISION` with rationale and evidence basis; optionally a verification request |
| **Objects exposed** | `CONDITION`s with bands · open `WINDOW`s · prior rationale · **computed context** |

**Must support withholding.** The envelope is narrower than the record (Phase 05 §11.5).

### S4 — Attention

| | |
|---|---|
| **Purpose** | Answer *"what needs a person right now"* |
| **Serves** | **D3, D7** — the only cross-place decisions |
| **Inputs** | None — this is an entry point |
| **Outputs** | Routes into S3 or S1 |
| **Objects exposed** | Closing `WINDOW`s · changed `CONDITION`s · **weakly-grounded inputs on pending irreversible decisions** · contested observations |

> **Scoped to D3 and D7 only.** This is **not** a status overview. It answers *"what needs me"*, never *"how are things"* — the distinction Phase 03 §14.4 drew and the one that keeps this from becoming the dashboard governance §1 forbids.

### 7.1 Surfaces rejected

| Rejected | Why |
|---|---|
| **Task list** | Resolves into S1 (Phase 03 §14.1). A task without a place is not a valid task |
| **Knowledge browser** | Knowledge is retrieved at decisions, never browsed (Phase 05 §9.1). A browser is the artifact nobody opens |
| **Property overview / dashboard** | §4.4. Would answer *"how are things"* |
| **Admin / configuration** | No curator role exists (§5.4). Taxonomy is configuration, not a product surface |
| **Reports** | No decision in D1–D7 requires one |

---

## §8 — Information hierarchy

### 8.1 Visible first

| Surface | First |
|---|---|
| **S1 Place** | What this place is · **what is normal here, one sentence** · **what has already been tried** |
| **S2 Capture** | The four outcomes, equally weighted |
| **S3 Decision** | Conditions **with bands** · what is closing and its cost · prior rationale |
| **S4 Attention** | What is closing soonest · what is weakly grounded on an irreversible decision |

### 8.2 Deliberately hidden

Reachable, not present: full observation history · knowledge provenance *(on request — Phase 05 §9.3)* · other places · other domains · cross-cycle comparison · everything excluded by Phase 05 §5.5.

> **Hiding is a design act here, not an omission.** A decision made in minutes cannot afford a browse (Phase 05 §5.1).

### 8.3 Never merged — the five tests

| Never merge | Because | Source |
|---|---|---|
| **Contested observations into one value** | Averaging destroys two true testimonies and **fabricates a third nobody made** | C3 · Phase 05 E2 |
| **Confidence into the condition value** | *"Dry"* and *"dry, assumed from a drawing"* support different actions. Merging hides the difference **invisibly** | C1, C2 |
| **Failed searches into "unknown"** | *Never checked* and *checked, not found* call for different next steps. Merging re-dispatches someone | C4 · Phase 04 §6.1 |
| **Assumptions into confirmations** | An assumption may be correct — but it has never been checked, and only verification changes that | C2 · Phase 05 §7.3 |
| **Rationale into outcome** | *Why we chose* and *what happened* are different facts. Merged, a good decision with a bad outcome becomes indistinguishable from a bad decision | C7 · Phase 06 F.2 |

**The fifth is the one with organizational consequences.** If rationale and outcome are shown as one thing, the record reads as a verdict on the decision-maker — and Phase 06 F.2 showed that punitive reading is precisely what drives falsification.

---

## §9 — MVP cut test

**Assume the budget is halved.** What survives, what goes, and does the loop still traverse?

### 9.1 Removable

| Cut | Impact | Safe? |
|---|---|---|
| **Five of seven decisions** — keep **D4** (recurs within a season) and one irreversible decision | Narrows demonstration; loop unaffected | **Yes** |
| **The second domain** | Shore Lodge depth was already thin (Phase 06) | **Yes** |
| **Cross-cycle comparison** | Slow loop still deposits and returns; only multi-year analysis lost | **Yes** |
| **`EVENT`-keyed retrieval** | *"Last time conditions looked like this"* degrades to *"last time here"* | **Yes — with regret** |
| **`SEASON CYCLE` grouping** | Windows still function individually | **Yes** |
| **Leadership role** | Two roles suffice (Phase 06 D.4) | **Yes** |
| **Knowledge provenance display** | On-request detail; the record still carries it | **Yes** |
| **S4 breadth** — reduce to closing windows + weak grounds only | Still surfaces what needs a person | **Yes** |

### 9.2 Not removable

| Cannot cut | Why |
|---|---|
| **Any of the four surfaces** | Each is a loop stage (§7). Cutting one severs the loop |
| **`OBSERVATION.outcome`** | Without it a failed search cannot be recorded — C4 dies, and with it the defining property |
| **Confidence bands** | Without them, uncertainty is invisible — C2 dies. **Five bands cost no more than two** |
| **Rationale capture** | Without it the slow loop goes write-only — C7 dies. It is also the cheapest thing in the system |
| **Location as a condition** | Phase 04 §4.0 — failed searches have nowhere to go without it |
| **Two-step dispatch** | C5. Collapsing it saves nothing and violates a commitment |
| **`CONTESTED`** | See 9.3 |

### 9.3 CONTESTED is not a feature

The sharpest finding of the cut test:

> **`CONTESTED` cannot be "cut" because it is not something the product does. It is what is true when two observations disagree within the decay window.**

The only ways to "not implement" it are to **discard the second observation** or to **merge the two** — and both are forbidden absolutely (C3). A budget cut cannot remove a fact; it can only cause the product to lie about it. **Keeping contested state is cheaper than either alternative**, since both alternatives require code to actively destroy information.

### 9.4 Where the 50% actually comes from

**Not from surfaces — from scope within them.** One decision instead of seven. One domain instead of two. One condition type instead of six. A handful of places instead of a property.

```
PLACE ──▶ CONDITION ──▶ CONFIDENCE ──▶ DECISION ──▶ TASK ──▶ OBSERVATION ──▶ CONDITION
  S1          S1/S3          S3           S3        S1/S2        S2            (derived)
```

**The loop traverses on the cut MVP.** Every stage retains a surface; every object in the path survives. The demonstration is narrower and the mechanism is intact.

---

## §10 — Anti-patterns

Each is attractive first. **The attraction is the risk** — nobody adopts these believing they are wrong.

### A1 — A numeric confidence score
**Attractive because:** sortable, filterable, compact, and looks rigorous. A single number is easier to render than five bands with reasons.
**Wrong because:** invites false precision, cannot be explained without exposing its derivation, and fails Phase 04 Gate D. **The bands *are* the model** — there is no formula underneath to summarize.

### A2 — Automated task creation
**Attractive because:** the system already knows a gap exists. Making the person click "approve" looks like pointless friction.
**Wrong because:** violates C5. The two steps are the boundary between *surfacing* and *managing labour*. **The friction is the product** — an approval that costs nothing is the only thing keeping a stewardship system from becoming an autonomous dispatcher.

### A3 — Evidence averaging
**Attractive because:** conflicting data looks like a bug. Resolving it to one value produces a clean record.
**Wrong because:** violates C3. It destroys two true observations and fabricates a third nobody made. **The disagreement is information** — usually that something changed, or that the place is more varied than the model assumes.

### A4 — Hidden uncertainty
**Attractive because:** showing bands everywhere is visually noisy; hiding them for "clean UI" seems like good design.
**Wrong because:** violates C2. A condition shown without its band **implies confidence the system does not have.** The correct answer is selective visibility (Phase 05 §5), not concealment — surfaced where it changes the action.

### A5 — Dashboard inflation
**Attractive because:** the data is already there; a property-wide overview seems like obvious added value, and leadership will ask for it.
**Wrong because:** answers *"how are things"* rather than *"what needs me"*. Only D3 and D7 are cross-place, and S4 is scoped to exactly those. **A general overview is the drift governance §1 forbids**, and it arrives disguised as a small enhancement.

### A6 — AI-generated reasoning
**Attractive because:** the system holds observations, patterns, and outcomes. Summarizing them into a suggested rationale looks like the natural next step.
**Wrong because:** a generated conclusion has **no provenance class**. It is not measured, observed, reported, or honestly inferred — it is unattributable, and C1 has no slot for it. It would also destroy C7: **rationale is valuable precisely because a person formed it.** A generated rationale is a record of nobody's judgment.

### A7 — Merging role and identity
**Attractive because:** you already have the authenticated user; attributing an observation to them is one line of code and enables useful things.
**Wrong because:** violates C8. It readmits `PERSON`, and productivity measurement becomes possible for the first time since Phase 03 — where it was excluded **structurally** rather than by policy. **This is the most likely violation in the entire specification**, because it is the default implementation.

---

## §11 — Product principles

Ten. Each traces to a prior phase.

| # | Principle | Traces to |
|---|---|---|
| **P1** | **Everything has an address, or it is not in the system.** | Phase 02 §2.3 · Phase 03 §4.3 |
| **P2** | **A condition is never shown without how it is known.** | Phase 03 §5 · C1 |
| **P3** | **Capture is the completion gesture, never a separate task.** | Phase 02 §8.3 · Phase 05 E3 |
| **P4** | **Record the reasoning, not just the choice.** | Phase 02 §7.1 · Phase 05 E6 |
| **P5** | **Show what is closing before showing what is happening.** | Phase 02 §5.2 · Phase 05 §5.2 |
| **P6** | **When confidence is low and the choice is irreversible, ask for eyes — not for a decision.** | Phase 03 §6.4 · Phase 05 E5 |
| **P7** | **A failed attempt is a result, and must be as easy to record as a success.** | Phase 04 §4.A · Phase 05 E3 · Phase 06 A.5 |
| **P8** | **Show what was already tried, before anyone tries again.** | Phase 05 §6.6 · Phase 06 A.4 |
| **P9** | **Never reconcile conflicting testimony.** | Phase 05 E2 · C3 |
| **P10** | **The record attributes roles; it never identifies people.** | Phase 03 §12.1 · governance §6 · C8 |

---

## §12 — Safe to design

| Now designable | Because |
|---|---|
| **S2 Capture, including the four-outcome selection** | Fully specified. The hardest and highest-value interaction in the product (Phase 06 A.5) |
| **S1 Place, including prior-attempt display** | §7, §8.1. Carries the Inherited Search |
| **S3 Decision envelopes for D2 and D3** | Phase 05 §11 specifies both completely |
| **The confidence bands as language** | Phase 05 §7.1 gives each its own sentence |
| **The two-step dispatch moment** | Phase 04 §3 ③–④ · C5 |
| **S4 Attention, scoped to D3/D7** | §7, with the scope boundary stated |
| **The failure path** | **Design it first.** Phase 04 called it the most design-ready thing in the system, and Phase 06 G.5 made it the validation criterion |

---

## §13 — Must remain unresolved

Inherited from Phase 06 and **not resolved here**. No new unknowns added.

| # | Question | Requires |
|---|---|---|
| **U2** | Will crews record failed searches? | **First deployment.** The 30-day criterion is *one failed search recorded* |
| **U1** | Can place knowledge reach a gloved hand in one sentence? | Operational testing with a designed artifact |
| **U7** | Is the capture-time budget achievable in field conditions? | Operational testing — Phase 02 R1 |
| **U6** | Will people read `ASSUMED` as *false*? | Field validation |
| **U4** | Does gap-surfacing read as help or as nagging? | Operational testing |
| **U3** | Are the decay windows calibrated correctly? | Operational data across cycles |
| **A1** | How is a knowledge record superseded when a pattern proves wrong? | **Resolve before Year 3** (Phase 06 B.3) |
| **Org** | Will leadership use `evidence_basis` to explain rather than blame? | **A deployment precondition, not a design question** (Phase 06 F.2) |

---

## §14 — Verdict

### The falsification attempt

The architecture claims eleven objects suffice. Ten pressure points were constructed where a specification would most plausibly need a twelfth.

| # | Pressure point | Resolution | New object? |
|---|---|---|---|
| 1 | User accounts / authentication | Identity outside the domain; only `ROLE` crosses in | **No** — but C8 must be stated |
| 2 | Photos | Payload of `OBSERVATION` | No — attribute |
| 3 | **`evidence_basis` "snapshot"** | **A reference set, not a copy** — recoverable because observations are immutable and condition history is retained | **No** |
| 4 | "What has already been tried" | Derived query over verify tasks and their observations | No — computed |
| 5 | Attention queue | Derived from the decision model (Phase 03 §14.4) | No — computed |
| 6 | D3 sequence ordering | `TASK.order` | No — attribute |
| 7 | Condition types / decay profiles | Configuration, not domain | No |
| 8 | Offline sync queue | Infrastructure; not in MVP | No |
| 9 | Notifications | Already rejected (Phase 03 §3.3) | No — deferred |
| 10 | Decision pending vs. committed | State on `DECISION` | No — attribute |

**Ten attempts. Zero new object types. The tripwire did not fire.**

**Point 3 is the strongest result.** `evidence_basis` is described in three prior phases as a *snapshot* — the word implies a stored copy, which would be a twelfth object. It is not one. It is a set of references to conditions and their supporting observations, and it works **only because observations were made immutable and condition history retained** — decisions taken in Phase 03 for entirely different reasons. **A model that survives a test it was not designed for is sound rather than merely untested.**

---

# PASS

## A software product can be specified that faithfully preserves the architecture's defining properties.

Eleven objects hold under specification pressure. Four surfaces express the complete loop. Six workflows map to existing objects and relationships with no additions. The loop traverses on a 50%-cut MVP, and the cut comes out of scope within surfaces rather than out of surfaces themselves.

**One commitment is new to this phase.** C8 — identity stays outside the domain record — was never needed before, because no prior phase specified software. It is the most likely violation in the whole specification, because joining the authenticated user to the observation is the default implementation and takes one line. **Left unstated, surveillance becomes structurally possible for the first time since Phase 03 excluded it by design.**

**What this verdict does not do.** It does not overturn Phase 06's CONDITIONAL PASS. Those are different questions at different gates: Phase 06 asked whether people would *behave* as required and correctly made that conditional on deployment evidence. Phase 07 asks whether a product can be *specified* that preserves the properties. **A faithful specification of a system whose adoption is unproven is exactly what this project should have at this point** — and claiming more would fail the standard the specification itself sets.

**The specification's real test is not architectural.** Every anti-pattern in §10 is a reasonable engineering instinct: a score is more sortable than bands, auto-dispatch removes friction, averaging cleans conflicting data, joining user to observation is one line. **None of them arrives labelled as a violation.** The commitments in §3 exist because the architecture will not defend itself during implementation — and the phase after this one is where that defence is either held or quietly lost.

---

*Phase 07 complete. Prior phases unmodified. No new object types, no UI design, no implementation.*
