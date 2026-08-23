# 08 — Interaction Architecture

## Whitetail Club & Shore Lodge — Stewardship Intelligence System · Phase 08

**Governed by:** [`00-project-governance.md`](00-project-governance.md) — binding. Prior phases frozen and unmodified.
**Scope:** interaction architecture at wireframe level — **what appears, in what order, what is withheld, how state moves.** No colors, no typography, no visual system, no component library.
**Surfaces:** the four established in [`07-product-specification.md`](07-product-specification.md) §7. **None added.**

Structural blocks below convey hierarchy and order. They are not layouts — position implies sequence and precedence, nothing else.

> ### Amendment note — v1.1 · authorized 2026-08-21
>
> Two amendments applied, resolving **TW-5** and **TW-6** from [`09-epistemic-failure-path.md`](09-epistemic-failure-path.md), specified in [`10-resolution-pass.md`](10-resolution-pass.md) §4 and §6.
>
> **§5.1 — `LAST TIME` now carries the weakest ground the decision rested on.** Without it, a decision made on assumed grounds whose outcome happened to be good returned as *validated judgment*, and a guess hardened into institutional knowledge across cycles. `evidence_basis` existed in the model to prevent exactly this and was not rendered on return — the safeguard was architecturally present and interactionally absent.
>
> **§2.1.1 added — compression integrity tests.** §2.1 permitted scanning phrases without defining where compression becomes a category. Three falsifiable tests plus a code-reviewable mechanical guard now draw that line.
>
> **Deliberately not changed.** §11.1's description of the *"frozen four-value enum"* — a record of analysis at a point in time, in an **Open items** section. It is **superseded by `10-resolution-pass.md`, not edited**, the same rule applied to Phase 09's tripwire annotations so they keep failing any future build that reintroduces the defect.
>
> **No new surface, no new object, no visual decision.** The four surfaces and eleven objects are unchanged.

---

## §1 — Purpose

Phase 07 established *what the product must contain*. This phase establishes *how a person encounters it*.

The distinction matters because **every architectural commitment in Phase 07 §3 can be satisfied by a data model and still destroyed by an interface.** Provenance can be stored faithfully and rendered as a sortable chip. Contested observations can both persist in the record and appear under a "resolve" control. A two-step dispatch can exist in the API and be collapsed into one tap. In each case the architecture passes its own tests and the thesis is gone.

**Interaction architecture is where those commitments are either enforced or quietly lost.**

---

## §2 — Inherited constraints as interaction rules

Phase 07's eight commitments, restated as things the interface must do or refuse to do.

| Commitment | Interaction rule |
|---|---|
| **C1** provenance preserved | Every condition displays **how it is known** wherever it is displayed at all |
| **C2** uncertainty visible | A condition is **never rendered without its confidence reason.** No "clean" variant exists |
| **C3** contested preserved | Both observations shown, neither elevated. **No control resolves a contest** (§5.4) |
| **C4** failed verification preserved | Absence is one of four peer answers to a single question (§4.3) |
| **C5** human approval of dispatch | Surfacing and sending are **two distinct actions, always** (§6.4) |
| **C6** confidence explainable | Rendered as a **reason**, never a token, number, or rank (§2.1) |
| **C7** knowledge inheritable | Prior rationale appears **by default** at equivalent decisions (§5.2) |
| **C8** identity outside the record | The interface **never renders an individual.** Role and date only (§2.2) |

### 2.1 The confidence rendering rule

Phase 05 §7.1 gave each band a plain sentence. The interaction consequence is stronger than it first appears:

> **Render a band name as a discrete token and it becomes a score by social convention.** People begin saying *"it's an amber one"* — comparison-by-rank returns through language even with no number present. The vocabulary hardens into a scale, and the scale is what Phase 04 §6.1 replaced.

**Therefore:**

| Context | Confidence appears as | Example |
|---|---|---|
| **Scanning a list** (multiple places at once) | A short **phrase** stating the reason | `never checked` · `checked Oct` · `two disagree` · `looked, no answer` |
| **At a decision** (one condition in focus) | The **full sentence** | *"Taken from the old drawing; nobody has confirmed it."* |
| **Anywhere** | **Never** a number, percentage, rank, star, meter, or badge | — |

**And the hard one:** **confidence is never a sort key.** Sorting a list by confidence converts five explanations into an ordered scale, which is the same failure by another route. **Lists sort by time-to-close** — a real magnitude with a real unit.

Band names (`CONFIRMED`, `AGING`, `ASSUMED`, `CONTESTED`, `UNRESOLVED`) remain **internal vocabulary** — used in this document, in the data model, and in conversation between designers. They are not interface strings.

### 2.1.1 Compression integrity *(TW-6 — added v1.1)*

§2.1 permits a scanning phrase but does not say where compression becomes a category. The ladder it must stop:

```
1  "Two observations disagree about whether the valve was
    inspected after repair."          ← full grounds
2  "Two disagree."                    ← PERMITTED
3  "Contested."                       ← FORBIDDEN
4  "Amber"                            ← FORBIDDEN
```

**Step 2 describes what happened. Step 3 names a category from a closed vocabulary.** The vocabulary is the failure, not the brevity.

**A compressed phrase is safe only if it passes all three:**

| Test | Method | Fails if |
|---|---|---|
| **T-A Self-explanation** | Show it to someone who has never used the system: *"what does this tell you about this place?"* | They cannot answer without being taught a vocabulary |
| **T-B Non-ordering** | Present any two confidence phrases: *"which is worse?"* | A consensus order emerges. *(Confidence phrases only — time-to-close **may** order; it is a real magnitude)* |
| **T-C Referent preservation** | Ask what the phrase points at | It names a class of conditions rather than a specific state at a specific place |

> **Mechanical guard — checkable in code review.**
>
> **No interface string may be produced by a lookup keyed on band.** If the code does `PHRASES[band]` — map, switch, dictionary, or constant table — **that is a taxonomy with a display layer and it will harden into one.**
>
> **The phrase must be composed from the condition's own data:** the count of disagreeing observations, the date of the last check, the extent and date of the failed search.
>
> This is why *"two disagree"* is safe and *"Contested"* is not — one is generated from facts, the other retrieved from a table. **A generated phrase cannot drift into a taxonomy, because there is no table to drift into.** Extends TW-1 from string-matching to construction-path.

**Standing-alone rule:** a phrase may stand alone **only where no decision is committed on that surface.** In a decision envelope the full reason is PRESENT, per the disclosure test (§8.4).

### 2.2 The identity rendering rule

`[C8]` Every observation, decision, and action displays **role and date. Never a person.**

```
Recorded by a groundskeeper · 14 Oct
Decided by the supervising role · 2 Nov
```

**Not** *"Recorded by [name]"*. This is where Phase 07's newest commitment becomes checkable: the moment an interface renders an individual, the record has become capable of measuring one.

---

## §3 — Surface 1: PLACE

### Screen

The primary surface. Everything resolves here (Phase 03 §14.3).

### Intent

> Answer *"what is here, what is known about it, how well, and what has already been tried"* — for a person who may be standing on it.

**Serves:** D6 primarily · the front half of D1, D2, D4, D5 · all navigation.

### Information hierarchy

```
┌──────────────────────────────────────────────────────┐
│  PLACE NAME                          [ what it is ]  │  ← identity
├──────────────────────────────────────────────────────┤
│  WHAT IS NORMAL HERE                                 │  ← one sentence
│  "North edge stresses ~3 days before the rest."      │     KNOWLEDGE
├──────────────────────────────────────────────────────┤
│  ALREADY TRIED HERE                     ⚠ if present │  ← present, not
│  "Searched 14 Oct, north side ~4m off path,          │     on request
│   ~20 min. Not found."                               │
├──────────────────────────────────────────────────────┤
│  CONDITIONS                                          │
│    drainage readiness   · never checked              │  ← reason, not
│    location             · looked, no answer          │     token
├──────────────────────────────────────────────────────┤
│  [ record what I found ]                             │  ← always reachable
├──────────────────────────────────────────────────────┤
│  ▸ recent observations                               │  ← disclosed
│  ▸ what this place contains                          │
│  ▸ history                                           │
└──────────────────────────────────────────────────────┘
```

**First:** identity · what is normal here · **what has already been tried.**
**Second:** current conditions with reasons · capture entry.
**Disclosed:** observation history · contained places · full timeline.
**Absent entirely:** other places · aggregates · anything from Phase 05 §5.5's exclusion list.

> **"Already tried" sits above conditions on purpose.** Phase 05 §6.6 requires it be *present, not available on request* — it is the only mechanism preventing repeated fruitless work. Placing it below conditions, or behind disclosure, defeats it. **When nothing has been tried, the region is absent rather than empty** — an empty "nothing tried yet" region trains people to stop looking at it.

### Interaction sequence

| # | Actor | Action | System response |
|---|---|---|---|
| 1 | Any role | Arrives — by proximity, from a task, or from an attention item | Renders identity, normal-here, already-tried, conditions |
| 2 | Field crew | Reads *"what is normal here"* | — |
| 3 | Field crew | **Decides D6** — proceed, handle, or escalate | — |
| 4 | Field crew | Chooses *record what I found* | Opens **Capture** (§4) with place pre-bound |
| 5 | Any role | Expands a disclosed region | Reveals in place; no navigation |

### State transitions

```
        ┌──────────────┐
        │   VIEWING    │
        └──────┬───────┘
               │ record what I found
               ▼
        ┌──────────────┐  outcome recorded   ┌──────────────┐
        │   CAPTURE    │────────────────────▶│   VIEWING    │
        └──────────────┘                     │  (updated)   │
               │ discard                     └──────────────┘
               └────────────────────────────────────▲
                                                    │
        VIEWING ──expand──▶ VIEWING+DISCLOSED ──────┘
```

**Place has no edit state.** Places are not authored in the field; conditions change through observation only. There is no path from this surface to modifying a place's identity — which is what keeps a stewardship record from becoming an asset register.

---

## §4 — Surface 2: CAPTURE

### Screen

The write path. **The highest-stakes interaction in the product** — Phase 06 identified U2 (will crews record finding nothing?) as the assumption everything distinctive rests on.

### Intent

> Record one immutable observation in seconds, with **absence as natural to record as presence.**

**Serves:** D6 · the observation half of every decision · **all five verification outcomes.**

### 4.1 Two entry states, one surface

| Entry | Bound context | Opening question |
|---|---|---|
| **Spontaneous** — from Place | Place | *"What did you see?"* |
| **Verification** — from a task | Place **+ target condition** | **"What did you find?"** |

Same surface, same cost. The verification variant carries a target; the spontaneous one does not.

### 4.2 Information hierarchy — spontaneous

```
┌──────────────────────────────────────────────────────┐
│  ‹ place name ›                                      │  ← confirms where
├──────────────────────────────────────────────────────┤
│  WHAT DID YOU SEE?                                   │
│  [ photo ]  [ note ]  [ reading ]                    │  ← three ways in
├──────────────────────────────────────────────────────┤
│  ▸ this isn't where I am                             │  ← rare, disclosed
└──────────────────────────────────────────────────────┘
```

**One question. Nothing else.** No category selection, no severity, no priority, no assignment. Phase 05 §5.3: *a person standing outdoors, gloved, mid-task.*

### 4.3 Information hierarchy — verification *(the critical one)*

```
┌──────────────────────────────────────────────────────┐
│  ‹ place name ›                                      │
│  You were asked to settle: drainage readiness        │  ← why you came
├──────────────────────────────────────────────────────┤
│  WHAT DID YOU FIND?                                  │  ← ONE question
│                                                      │
│   ( ) Found it                                       │
│   ( ) Found the place — couldn't tell                │  ← four PEER
│   ( ) Found something different                      │     answers
│   ( ) Not there                                      │
│                                                      │
├──────────────────────────────────────────────────────┤
│  [ photo ]  [ note ]                                 │
└──────────────────────────────────────────────────────┘
```

> **This layout is the entire U2 mitigation.**
>
> The question is **"What did you find?"** — never *"Did you complete this?"* A completion question makes absence a sub-case of failure; a finding question makes it one of four answers.
>
> The four options are **visually and structurally peer.** None is default, none is primary, none is styled as an exception. Phase 06 A.5: *if confirming takes one action and reporting absence takes three, the asymmetry teaches people what the system values regardless of what training says.*
>
> **There is no "complete" action separate from answering.** Answering *is* completing. A task cannot close without stating what happened (Phase 04 §11 #6).

**One follow-up, on "Not there" only:**

```
   ( ) I confirmed it isn't there
   ( ) I couldn't find it
```

These are epistemically opposite — see [§11.1](#111-the-absent-outcome-is-under-specified), which flags this as an open item rather than resolving it architecturally.

### Interaction sequence

| # | Actor | Action | System response |
|---|---|---|---|
| 1 | Field crew | Opens capture | Renders bound place; target if verifying |
| 2 | Field crew | Answers the one question | — |
| 3 | Field crew | *(verification, "Not there" only)* Answers the follow-up | — |
| 4 | Field crew | Optionally adds photo or note | — |
| 5 | Field crew | Submits | Observation written **immutably**; conditions re-derived; returns to Place |

**Target: under fifteen seconds, steps 1–5, one-handed** `[DH]` — Phase 02 R1's hard design gate. **If the four-peer-answer layout cannot meet it, the layout changes, not the budget.**

### State transitions

```
   ┌─────────┐  answer   ┌──────────┐  submit   ┌───────────┐
   │  OPEN   │──────────▶│ ANSWERED │──────────▶│ COMMITTED │
   └─────────┘           └────┬─────┘           └───────────┘
        │                     │ change answer         │
        │ discard             └──────▲────────────────┘
        ▼                            │            immutable —
   ┌─────────┐                       │            no edit path
   │ ABANDON │  ← nothing written    └────────────────┘
   └─────────┘
```

**`COMMITTED` is terminal.** There is deliberately no edit affordance: an observation is testimony (Phase 03 §4.1). Correction happens by making a *new* observation, which is what preserves both.

---

## §5 — Surface 3: DECISION

### Screen

Where the envelope is presented and the choice is captured with its reasoning.

### Intent

> Present **only what changes the outcome**, and capture *why* in the same motion as *what*.

**Serves:** D1, D2, D3, D5, D7.

### 5.1 Information hierarchy

```
┌──────────────────────────────────────────────────────┐
│  THE DECISION                                        │
│  "Frost delay — open or hold"                        │
├──────────────────────────────────────────────────────┤
│  CLOSING                                             │  ← urgency first
│  "Play scheduled in 38 minutes."                     │     (P5)
├──────────────────────────────────────────────────────┤
│  WHAT WE KNOW                                        │
│  frost present · measured 06:04, uncontested         │  ← reason inline
├──────────────────────────────────────────────────────┤
│  WHAT THIS PLACE HAS DONE BEFORE                     │  ← slow loop
│  "Thaws ~40 min behind the others under clear cold.  │     returning
│   From 9 observations, 2 cycles."                    │
├──────────────────────────────────────────────────────┤
│  LAST TIME                                           │  ← prior rationale
│  "2 Nov — delayed 45 min. Estimate held."            │     by default (C7)
│  Decided on: thaw lag never checked here at the time.│  ← weakest ground
│                                                      │     (TW-5) — PRESENT
├──────────────────────────────────────────────────────┤
│  [ open ]   [ delay ]   [ partial ]                  │
│  because: ______________________________             │  ← same motion
├──────────────────────────────────────────────────────┤
│  ▸ observations behind this                          │  ← disclosed
│  ▸ comparable past mornings                          │
└──────────────────────────────────────────────────────┘
```

**Order is deliberate:** what is closing → what we know → what this place does → what was decided last time → the choice. **Urgency precedes information** (Phase 05 P5: *show what is closing before showing what is happening*).

### 5.2 Rationale is not a separate step

`because:` sits **beside the choice controls, not after them.** Phase 05 E6 and Phase 03 §3.3: separating rationale from choice invites making it optional, and optional rationale is uncaptured rationale.

> Committing without a reason is possible — the system never blocks a decision (C6, Phase 05 §7.4) — but the field is present at the moment of choosing, not on a later screen. **The difference between "beside" and "after" is the difference between a captured rationale and an empty one.**

### 5.3 The no-scroll rule

> **The must-know set is complete on arrival. No scrolling.**

`[ARCHITECTURAL]` This is a **test, not a preference.** Phase 05 §11.5 required the envelope support withholding; if the must-know set doesn't fit, **the envelope is too wide and the envelope is wrong** — not the screen.

This makes Phase 05 **U5** (*can a supervising role absorb per-zone bands at D3 scale?*) checkable at wireframe stage instead of in the field. For D3 across many zones, if per-zone readiness cannot be presented without scrolling, the D3 envelope must be reduced — most likely to *only the zones that are weakly grounded*, which is the actual decision-relevant subset.

### 5.4 Contested evidence — the absent affordance

When a condition is contested:

```
┌──────────────────────────────────────────────────────┐
│  WHAT WE KNOW                                        │
│  drainage state · two disagree                       │
│                                                      │
│    a groundskeeper, Tue 14:20 — "clear"              │  ← peer
│    a groundskeeper, Tue 16:05 — "standing water"     │  ← peer
│                                                      │
│  "Too close together to be change."                  │  ← why contested
│                                                      │
│  [ ask someone to look again ]                       │  ← ONLY action
└──────────────────────────────────────────────────────┘
```

> **There is no control that resolves a contest.**
>
> No "accept this one." No "mark as resolved." No "which is correct?" **Picking a winner in the interface *is* the discarding Phase 05 E2 forbids absolutely** — it would destroy one true testimony and elevate another on no evidence.
>
> The only path out of `CONTESTED` is **a new observation.** The absence of a resolve affordance is not an omission; it is the design.

Both observations render as peers — same weight, same treatment, ordered by time only. Neither is "current" and neither is "conflicting."

### Interaction sequence

| # | Actor | Action | System response |
|---|---|---|---|
| 1 | Supervising | Arrives from Attention or from a place | Renders envelope: closing → known → history → last time |
| 2 | Supervising | Reads | — |
| 3 | Supervising | *(if an input is weakly grounded and the choice is irreversible)* Sees the gap surfaced | **Surfaces only.** Does not create a task (C5) |
| 4 | Supervising | **Either** requests verification **or** proceeds | If requested → §6.4 approval step |
| 5 | Supervising | Chooses; states reason | — |
| 6 | Supervising | Commits | `DECISION` written with rationale and evidence basis |

### State transitions

```
   ┌──────────┐
   │ PRESENTED│
   └────┬─────┘
        │
        ├── gap surfaced ──▶ ┌───────────────┐ approve ─▶ TASK issued
        │                    │ VERIFICATION  │              (§6)
        │                    │   OFFERED     │
        │                    └───────┬───────┘
        │                            │ decline / no time
        │                            ▼
        └──────────────────▶ ┌──────────────┐  commit  ┌───────────┐
                             │   CHOOSING   │─────────▶│ COMMITTED │
                             └──────────────┘          └───────────┘
                                                    evidence basis records
                                                    the bands as they stood
```

**`VERIFICATION OFFERED → declined` is a first-class path**, not an error. Phase 05 §7.4: when a window is closing and no verification is possible, the person decides and the thinness is permanently recorded.

---

## §6 — Surface 4: ATTENTION

### Screen

The management entry point.

### Intent

> Answer *"what needs a person right now"* — **never** *"how are things."*

**Serves:** D3, D7 — the only cross-place decisions, and therefore the only justification for any property-wide surface (Phase 03 §14.4).

### 6.1 Information hierarchy

```
┌──────────────────────────────────────────────────────┐
│  NEEDS YOU                                           │  ← no count
├──────────────────────────────────────────────────────┤
│  Blowout window closes in ~36 hours                  │
│  3 zones rest on readiness nobody has checked        │  ← the gap
│                                            ›         │
├──────────────────────────────────────────────────────┤
│  Two observers disagree — drainage, north zone       │
│                                            ›         │
├──────────────────────────────────────────────────────┤
│  Snow mold window opens in ~4 days                   │
│                                            ›         │
└──────────────────────────────────────────────────────┘
```

**Ordered by time-to-close.** Not by priority, not by severity, not by confidence (§2.1).

### 6.2 The three omissions that keep it from becoming a task manager

| Omitted | Why |
|---|---|
| **A count badge** | A count invites clearing-to-zero. **Inbox-zero psychology makes dismissal a goal**, and dismissal is a task-manager verb. Attention items are questions, not inbox entries |
| **A completion state** | Items are **derived, not stored** (Phase 03 §14.4). They vanish when the underlying condition changes. Nothing is "done" — there is nothing to mark |
| **Assignment** | You cannot assign from Attention. **Assignment happens through a decision** — a person decides, and the decision issues the task. Assigning from a queue would collapse C5's two steps into one |

> **A fourth, subtler omission: there is no "dismiss."** If an item could be dismissed, Attention would become a list one manages rather than a state one reads. **Items leave only when the world changes** — a window closes, a condition is verified, a decision is committed.

### 6.3 What it must never show

Anything answering *"how are things"*: totals · completion rates · trends · status by domain · anything about individuals · anything not tied to D3 or D7.

**The test:** every item must name **a decision that needs a person.** An item that describes a state without implying a decision belongs to the dashboard Phase 07 §4.4 rejects.

### 6.4 The dispatch approval moment

`[C5]` The most protected interaction in the product.

```
                              ┌───────────────────────────────┐
   Attention surfaces:        │  3 zones rest on readiness    │
   the gap is visible         │  nobody has checked.          │
                              │                               │
                              │  [ ask someone to look ]      │  ← a person
                              └───────────────────────────────┘     must act
                                            │
                                            ▼
                              ┌───────────────────────────────┐
   Only after a person        │  TASK · purpose = VERIFY      │
   acts does a task exist     │  issued to a place            │
                              └───────────────────────────────┘
```

> **Surfacing and sending are two actions, always.** The system never creates a verification task on its own — no matter how confident it is that one is warranted.
>
> **This will look like pointless friction**, because the system already knows the gap exists. Phase 07 A2: *the friction is the product.* An approval that costs one action is the entire boundary between a system that surfaces and a system that allocates labour.

### Interaction sequence

| # | Actor | Action | System response |
|---|---|---|---|
| 1 | Supervising | Opens Attention | Renders items ordered by time-to-close |
| 2 | Supervising | Reads an item | — |
| 3 | Supervising | Opens it | Routes to **Decision** (§5) or **Place** (§3) |
| 4 | Supervising | Acts there | Item disappears when the underlying state changes |

**No step in which the person acts *on* an attention item.** Every action happens at the surface the item routes to.

### State transitions

**Attention has no state.** It is a derived view (Phase 03 §14.4). Items appear when their condition is true and vanish when it is not.

```
   condition true  ──▶  item present
   condition false ──▶  item absent

   No: read/unread · open/closed · assigned · snoozed · dismissed · done
```

> **This is the strongest structural defence against task-manager drift.** A view with no state cannot accumulate a backlog, cannot be triaged, and cannot be cleared — because there is nothing in it to clear.

---

## §7 — The ten questions, answered

Direct answers, cross-referenced to the specifications above.

| # | Question | Answer |
|---|---|---|
| **1** | **What appears first?** | **Place:** what is normal here, then what has already been tried. **Decision:** what is closing. **Attention:** what closes soonest. **Capture:** the one question. *(§3, §5.1, §6.1, §4.2)* |
| **2** | **What appears second?** | Current conditions **with their reasons** — everywhere they appear at all. Never a condition without how it is known *(C1, C2)* |
| **3** | **What is intentionally hidden?** | Other places · aggregates · totals · trends · individuals · everything on Phase 05 §5.5's exclusion list. **Hiding is a design act, not an omission** — a decision made in minutes cannot afford a browse |
| **4** | **What is progressively disclosed?** | Observation history · contained places · comparable past events · knowledge provenance. **Never** confidence, prior attempts, or rationale — those are always present *(§8)* |
| **5** | **How does a failed search get recorded?** | **One question — "What did you find?" — with four peer answers**, one of which is *Not there*. Answering **is** completing; there is no separate complete action. *(§4.3 — the entire U2 mitigation)* |
| **6** | **How does contested evidence appear?** | Both observations as **peers**, ordered by time, with the reason they conflict. **The only control is "ask someone to look again."** No resolve, no accept, no pick-one *(§5.4)* |
| **7** | **How does a decision envelope behave?** | Urgency → known → what this place does → last time → choice-with-reason. **Complete on arrival, no scroll.** If it doesn't fit, the envelope is wrong *(§5.1, §5.3)* |
| **8** | **How does a supervisor move through D1–D7?** | Decisions are **recognized, not created** — entered from Attention or from a place. No decision menu, no wizard *(§9)* |
| **9** | **How does Attention avoid becoming a task manager?** | By omitting four affordances: **count badge · completion state · assignment · dismiss.** A derived view with no state cannot accumulate a backlog *(§6.2)* |
| **10** | **How does confidence appear without becoming a score?** | As a **reason** — a phrase when scanning, a sentence at a decision. Never a token, number, or rank. **And never a sort key** *(§2.1)* |

---

## §8 — Progressive disclosure model

One rule set across all four surfaces. **Inconsistent disclosure is what makes withheld information feel merely hidden rather than deliberately excluded.**

### 8.1 The three tiers

| Tier | Rule | Contents |
|---|---|---|
| **PRESENT** | Visible on arrival, no action, no scroll | The must-know set for this surface's decision |
| **DISCLOSED** | One action, reveals **in place**, no navigation | Supporting detail a person may want |
| **ABSENT** | Not reachable from this surface at all | Everything the decision excludes |

### 8.2 What can never be disclosed-rather-than-present

Four things are **always PRESENT** wherever their subject appears:

| Always present | Because |
|---|---|
| **Confidence reason** | A condition without it implies confidence the system lacks *(C2)* |
| **Prior attempts at a place** | Required *present, not on request* — the only thing preventing repeated fruitless work *(Phase 05 §6.6)* |
| **Prior rationale at an equivalent decision** | The slow loop's entire return path *(C7)* |
| **The four capture outcomes** | Making one require disclosure would break their peer status *(§4.3)* |

### 8.3 What can never be present

| Never present | Because |
|---|---|
| A person's identity | *(C8)* |
| Aggregates, totals, completion rates | Answers *"how are things"* *(Phase 07 §4.4)* |
| Anything outside the current decision's envelope | Relevance over completeness *(Phase 05 §11.1)* |

### 8.4 The disclosure test

> **Disclosing something must never change what a person would decide.** If revealing a disclosed region would change the choice, it was PRESENT material misfiled — and the envelope is wrong.

This makes disclosure decisions falsifiable rather than aesthetic: walk each disclosed region and ask whether opening it could flip the decision. If yes, promote it.

---

## §9 — Moving through D1–D7

### 9.1 Decisions are recognized, not created

> **There is no "start a decision" control and no decision menu.**

A decision begins because something in the world made it necessary — a window opened, a condition changed, a person is standing somewhere and sees something. **A menu of decisions would let a person invent an occasion**, which inverts *the system surfaces, the person decides* at the navigation layer.

### 9.2 Entry routes

| Decision | Owner | Enters from | Trigger |
|---|---|---|---|
| **D1** watering | Supervising | Place, or Attention if a condition changed | Heat stretch; visible stress; cycle due |
| **D2** frost | Supervising | **Attention** — time-bound and dawn-driven | Pre-dawn assessment |
| **D3** winterization | Supervising + Leadership | **Attention** — window opening | Soil temperature trend; forecast |
| **D4** drainage | Supervising | Place, or Attention on a crew report | Thaw; reported blockage |
| **D5** shoreline | Supervising + Leadership | **Place** — observation-driven, cumulative | Observed erosion or loss |
| **D6** normal-here | **Field crew** | **Place** — the person is already standing there | Encountering something unexpected |
| **D7** deferral | Supervising | **Attention** — capacity against closing windows | Work exceeds crew-hours |

**Two entry points only: Attention and Place.** Every decision arrives through one of them. Nothing else in the product initiates a decision.

### 9.3 The traversal shape

```
   ATTENTION ──▶ DECISION ──▶ [ verify? ] ──▶ approve ──▶ TASK ──▶ PLACE ──▶ CAPTURE
       ▲            │                                                          │
       │            └── commit ──▶ rationale recorded                          │
       └──────────────────────────────────────────────────────────────────────┘
                        conditions re-derived; item leaves Attention

   PLACE ──▶ CAPTURE                          (D6 — no decision surface at all)
   PLACE ──▶ DECISION ──▶ …                   (D1, D4, D5 — place-initiated)
```

**D6 never touches a decision surface.** The field decision happens in the person's head, informed by *what is normal here*, and its only artifact is an observation. **That is the intended shape** — putting D6 on a decision surface would make the field role's one decision heavier than the supervising role's.

---

## §10 — Interaction anti-patterns

Phase 07 §10's list, restated as **interface temptations.** Each is what a competent designer would reach for.

| # | Temptation | Why it's attractive | Why it's wrong |
|---|---|---|---|
| **I1** | **A confidence chip or badge** | Compact, scannable, consistent, filterable | Becomes a score by social convention *(§2.1)*. Violates **C6** |
| **I2** | **Sorting a list by confidence** | Obviously useful — surface the uncertain first | Converts five explanations into an ordered scale. **Sort by time-to-close instead** |
| **I3** | **A "resolve" control on contested evidence** | Conflicting data looks like a bug; users will ask for it | Picking a winner **is** the discarding **C3** forbids. Only a new observation resolves a contest *(§5.4)* |
| **I4** | **A count badge on Attention** | Universal pattern; signals there's something to do | Invites clearing-to-zero. **Dismissal is a task-manager verb** *(§6.2)* |
| **I5** | **Auto-creating the verification task** | The system already knows the gap exists; the approval looks like friction | Violates **C5**. **The friction is the product** *(§6.4)* |
| **I6** | **A decision menu or "new decision" action** | Makes the product's capability legible; standard affordance | Lets a person invent an occasion. Decisions are recognized, not created *(§9.1)* |
| **I7** | **A name on an observation** | You have the authenticated user; it's one line; it enables useful things | Violates **C8** — readmits `PERSON` and makes measurement possible *(§2.2)*. **The most likely violation in the product** |
| **I8** | **"Complete" separate from "what did you find?"** | Matches every task pattern anyone has used | Makes absence a sub-case of failure. **Destroys U2** *(§4.3)* |
| **I9** | **An empty "nothing tried yet" region** | Consistency; the region always exists | Trains people to stop looking at it. **Absent when empty** *(§3)* |
| **I10** | **A rationale field after the choice** | Cleaner flow; one thing at a time | Optional rationale is uncaptured rationale. **Beside, not after** *(§5.2)* |

> **None of these arrives labelled as a violation.** Each is what good interface practice recommends. **I2, I4, and I7 will be requested by users or engineers as improvements** — and each would remove a property the previous seven phases were built to protect.

---

## §11 — Open items

### 11.1 The `absent` outcome is under-specified

**Discovered during this phase, verified against the text, and flagged rather than patched** — consistent with how every prior phase handled a discovered defect.

Phase 04 §11 #6 freezes:

```
OBSERVATION.outcome ∈ { confirmed, inconclusive, contradicted, absent }
```

But Phase 04 §4 uses **two different absence outcomes**:

| §4.A — cannot find | §4.D-ii — confirmed absent |
|---|---|
| `outcome = absent-at-described-location` | `outcome = absent` |
| → condition becomes **`UNRESOLVED`** | → supersedes with **high confidence** |
| *"We might have searched the wrong place"* | *"There is definitively nothing here"* |

**These are epistemically opposite**, and the frozen four-value enum collapses them.

**Interaction resolution (§4.3):** the *Not there* answer asks one follow-up binary — *"I confirmed it isn't there"* / *"I couldn't find it."*

**What remains open:** whether that distinction needs **machine-readable representation** so confidence derivation can act on it, or whether it lives in the observation's content and a human reads it. **This document does not decide.** It is an enum question inside a frozen phase, and the choice belongs to whoever unfreezes it.

### 11.2 Inherited, unresolved

No new unknowns are added. Carried forward from Phase 06 §13 and Phase 07 §13:

| # | Question | Requires |
|---|---|---|
| **U2** | Will crews record failed searches? | **First deployment.** §4.3 is the mitigation; it is not proof |
| **U1** | Can *what is normal here* work in one sentence? | Operational testing — §3 assumes it can |
| **U7** | Is the sub-fifteen-second capture budget achievable? | Operational testing — §4 is designed to it, untested against it |
| **U5** | Can a supervising role absorb per-zone bands at D3 scale? | **Now partly checkable at wireframe stage** via §5.3's no-scroll rule |
| **U6** | Will people read *never checked* as *false*? | Field validation |
| **U4** | Does gap-surfacing read as help or as nagging? | Operational testing — §6.4 |
| **A1** | How is a knowledge record superseded? | Resolve before Year 3 |
| **Org** | Will leadership use the evidence basis to explain rather than blame? | Deployment precondition, not a design question |

---

## §12 — What Phase 08 establishes

**Four surfaces, fully specified at interaction level.** No fifth surface was required — the loop's four human-facing stages remain the floor and the ceiling.

**The interface's job turns out to be mostly refusal.** The specifications above are dominated not by what the surfaces do but by what they decline to offer: no resolve control, no count badge, no confidence sort, no decision menu, no name, no separate complete action, no dismiss. **Seven of the ten anti-patterns are absent affordances rather than wrong ones** — which is the natural shape for a product whose thesis is declining to fake confidence.

**Two things became checkable that were previously only assertable.** The no-scroll rule (§5.3) turns envelope width into a wireframe-stage test rather than a field discovery. The disclosure test (§8.4) makes every hide/show decision falsifiable by asking whether revealing it could change the choice.

**What is now safe to draw:** all four surfaces, both capture states, the contested presentation, the dispatch approval moment. **Draw the failure path first** — Phase 04 called it the most design-ready thing in the system, Phase 06 made it the 30-day validation criterion, and §4.3 is where U2 is won or lost.

---

*Phase 08 complete. Prior phases unmodified. No new surfaces, no new objects, no visual design system.*
