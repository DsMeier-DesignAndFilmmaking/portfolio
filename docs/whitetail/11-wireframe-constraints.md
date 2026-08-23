# 11 — Wireframe Constraint Model

## Whitetail Club & Shore Lodge — Stewardship Intelligence System

**Governed by:** [`00-project-governance.md`](00-project-governance.md) — binding. **All sixteen prior artifacts frozen and unmodified.**
**Stage:** architecture → **wireframe constraints** → adversarial review → visual system. **This document stops at the first arrow.**
**Scope:** no styling, no palette, no typography, no iconography, no motion, no components, no brand.

> ### Governing principle
> **Visual design is an implementation of the epistemic contract, not a new opportunity to interpret it.**

**Verified against the artifacts, not recalled.** Current amended state confirmed before writing: Phase 04 §11 row 6 carries five outcome values including `absent-at-described-location` (v1.1 note, line 10) · Phase 08 §5.1 carries the weakest-ground line at uniform 54-column alignment and §2.1.1 carries the compression tests (v1.1 note, line 11) · Phase 09's twelve tripwires and their annotations are intact.

---

## §1 — Visual design entry conditions

### 1.1 Unblocked

| | |
|---|---|
| **Wireframe constraint definition** | **GO** — this document |
| **Wireframe production** | **GO on completion of this document** |
| **Adversarial wireframe review** | **GO once wireframes exist** — §6's tests are defined here, run there |
| **Visual language** | **BLOCKED until §9's handoff criteria pass** |

### 1.2 Still NO-GO, and deliberately separate

**Publication blockers are not design blockers.** They are recorded in [§11](#11--governance--publication-blockers) and **do not gate any work in this stage.** Conflating them would halt design for reasons that have nothing to do with whether the architecture can be represented spatially.

### 1.3 The question this stage answers

> **Can the four interaction surfaces exist as clear, accessible, no-scroll wireframe envelopes while preserving every epistemic constraint established through Phase 10?**

If yes, visual language follows. If no, this document identifies exactly where the spatial representation breaks the contract and stops there.

---

## §2 — Architectural invariants

Visual design **may decide**: hierarchy · spatial relationships · layout · density · typography · responsive behavior · accessibility · affordance placement · information grouping · disclosure mechanics · scanning behavior · visual rhythm · interaction feedback · envelope dimensions.

Visual design **may not decide** the following. Each is traced to where it was settled. **If a visual proposal requires changing one of these, it is an architecture conflict, not a design opportunity — escalate, do not resolve locally.**

| # | Invariant | Settled in |
|---|---|---|
| **I-1** | What confidence means | Phase 04 §6 · Phase 05 §7 |
| **I-2** | Confidence gets no score | Phase 04 §6.1 · Phase 08 §2.1 |
| **I-3** | Confidence gets no band, token, or badge — **band names are internal vocabulary** | Phase 08 §2.1 · TW-1 |
| **I-4** | Confidence is not sortable | Phase 08 §2.1 · TW-2 |
| **I-5** | Confidence is not filterable | TW-2 |
| **I-6** | Contests cannot be resolved by interface action | Phase 05 E2 · Phase 08 §5.4 · TW-4 |
| **I-7** | An observation cannot be accepted or rejected | Phase 03 §4.1 — observations are immutable testimony |
| **I-8** | Attention has no count | Phase 08 §6.2 |
| **I-9** | Attention cannot be dismissed | Phase 08 §6.2 |
| **I-10** | Attention cannot be assigned | Phase 08 §6.2 · TW-3 |
| **I-11** | Attention has no completion state | Phase 08 §6.5 · TW-3 |
| **I-12** | Observations receive no individual names | Phase 07 C8 · Phase 08 §2.2 · TW-7 |
| **I-13** | Decisions cannot be manually created | Phase 08 §9.1 · TW-10 |
| **I-14** | Answering **is** completing — no separate control | Phase 08 §4.3 · TW-8 |
| **I-15** | The four finding answers are peers | Phase 08 §4.3 · TW-12 |
| **I-16** | Epistemically consequential information cannot be hidden | Phase 08 §8.4 · TW-9 |
| **I-17** | A successful outcome does not validate the reasoning behind it | Phase 09 T5 · Phase 10 §4 · TW-5 |

---

## §3 — Four surface inventory

**Four surfaces. No fifth. No merging.** Definitions are Phase 08's; this section adds only the constraint attributes wireframing requires.

### S1 — PLACE

| | |
|---|---|
| **Purpose** | Orient a person to what is here and what is known about it |
| **Primary user question** | *"What is here, how well is it known, and what has already been tried?"* |
| **Required information** | Place identity · what is normal here (one sentence) · **what has already been tried** · current conditions with reasons |
| **Optional / supporting** | Observation history · contained places · full timeline |
| **Decision-critical** | *What is normal here* (D6) · **prior attempts** (prevents repeat work) · location confidence where excavation is possible (D4 safety) |
| **Allowed actions** | Open capture · expand a disclosed region · navigate to a contained place |
| **Deliberately absent** | Edit place · create place · resolve anything · any aggregate |
| **Relationships** | **Everything resolves here.** Tasks and attention items are routes in, not parallel surfaces |
| **Max envelope** | Identity + one knowledge sentence + prior attempts + conditions for **this** place only |
| **No-scroll?** | **Yes** — for the PRESENT set. Disclosed regions may extend below |

### S2 — CAPTURE

| | |
|---|---|
| **Purpose** | Record one immutable observation in seconds |
| **Primary user question** | *"What did you find?"* — never *"did you complete this?"* |
| **Required information** | Bound place · target condition **if verifying** · the four peer answers |
| **Optional / supporting** | Photo · note · reading |
| **Decision-critical** | **The four answers, at equal weight** — this is the U2 mitigation |
| **Allowed actions** | Answer · attach · submit · discard |
| **Deliberately absent** | **A separate complete action** · category · severity · priority · assignment · edit-after-commit |
| **Relationships** | Entered from S1 or from a task; returns to S1 |
| **Max envelope** | One question, four answers, two optional attachments |
| **No-scroll?** | **Yes — absolutely.** Any scroll on this surface risks answer asymmetry |

### S3 — DECISION

| | |
|---|---|
| **Purpose** | Present the envelope and capture the choice **with its reasoning** |
| **Primary user question** | *"What should I do, and what do I actually know?"* |
| **Required information** | What is closing and its cost · conditions **with reasons** · what this place has done before · **`LAST TIME` including the weakest ground** · the choice controls · the reason field |
| **Optional / supporting** | Full observation set · comparable past events · full evidence basis |
| **Decision-critical** | **All of the required set.** This surface has the narrowest tolerance in the product |
| **Allowed actions** | Request verification *(two-step)* · choose · state reason · commit · expand disclosure |
| **Deliberately absent** | **Create a decision** · resolve a contest · sort or filter by confidence · auto-sequence |
| **Relationships** | Entered from S4 or S1. Issues tasks that route to S1/S2 |
| **Max envelope** | **Per decision, not per surface** — see §4.4 |
| **No-scroll?** | **Yes for the PRESENT set, at the bound viewport** — §4.1 |

### S4 — ATTENTION

| | |
|---|---|
| **Purpose** | Surface decision moments the system has recognized |
| **Primary user question** | *"What needs a person right now?"* — never *"how are things?"* |
| **Required information** | What is closing soonest · what is weakly grounded on a pending irreversible decision · contested conditions |
| **Optional / supporting** | None. **This surface has no supporting tier by design** |
| **Decision-critical** | The reason each item needs a person — an item without its reason is a chore |
| **Allowed actions** | **Open an item.** That is the complete action set |
| **Deliberately absent** | **Count · dismiss · assign · complete · snooze · mark read · sort by anything but time-to-close** |
| **Relationships** | Pure entry point. Routes to S3 or S1; nothing routes *to* it |
| **Max envelope** | Items currently true. **No pagination — if the list is long, that is a fact about the property** |
| **No-scroll?** | **No** — this is a list of real-world states and may legitimately exceed a screen. **But it must never acquire a count** (§6 A3) |

---

## §4 — Wireframe envelopes

### 4.1 Viewport binding — closing an open parameter

**TW-9 requires decision-critical material to render *"without scroll at the target viewport."* No prior artifact defines the target viewport.** Verified by grepping all sixteen: the phrase occurs exactly once, inside TW-9 itself.

> **The project's most-cited wireframe-stage test has been untestable since Phase 08, because its measurement condition was never specified.**

**Resolution — derived from the role model, not chosen aesthetically.** The viewport binds **per surface, to the smallest device on which that decision is actually made.**

| Surface | Bound viewport | Derivation |
|---|---|---|
| **S1 Place** | **Phone, one-handed** | Field crew context is *"mobile, gloved, variable connectivity"* — `02-information-architecture.md:694` |
| **S2 Capture** | **Phone, one-handed** | Same, plus Phase 08 §4's fifteen-second one-handed budget |
| **S3 — D2 frost** | **Phone** | A pre-dawn call made walking a green or from a truck |
| **S3 — D3 winterization** | **Desk-class** | A sequencing decision; the supervising role is *"split — desk, truck, field"* and this end is deskbound |
| **S3 — D1, D4, D5, D7** | **Phone** | Field- or truck-initiated |
| **S4 Attention** | **Phone** | Entry point for a split role — **bind to the smallest** |

**Rule:** where a surface serves multiple decisions, **it binds to the smallest viewport among them.** S3 therefore binds to phone for everything except D3.

### 4.2 The predicted consequence — and it matches the architecture

Applying the binding produces exactly what Phase 08 §5.3 anticipated:

| Decision | Fits its bound viewport? |
|---|---|
| **D2 frost** — three PRESENT items | **Yes.** Comfortably |
| **D3 winterization** — per-zone readiness across many zones | **No.** Not at desk-class either, once zone count grows |

Phase 08 §5.3 already stated the correction: *"the D3 envelope must be reduced — most likely to only the zones that are weakly grounded, which is the actual decision-relevant subset."*

> **The spatial constraint and the architecture independently arrive at the same answer.** That is the strongest available evidence the envelope was specified correctly — the layout did not force a compromise; it confirmed a decision already made on epistemic grounds.

### 4.3 Content classification — the disclosure test governs

Per Phase 08 §8.4: **would revealing this change the decision?** If yes, it is PRESENT. **Classification is never made on density grounds.**

| Tier | Rule |
|---|---|
| **PRESENT** | Visible on arrival, no action, no scroll at the bound viewport |
| **DISCLOSED** | One action, reveals **in place**, no navigation |
| **SUPPORTING** | Available but never decision-changing |

### 4.4 Per-surface envelopes

#### S1 Place — phone

| Tier | Content |
|---|---|
| **PRESENT** | Place identity · **what is normal here** (one sentence) · **what has already been tried** (when it exists) · current conditions with reason phrases · entry to capture |
| **DISCLOSED** | Recent observations · contained places · timeline |
| **SUPPORTING** | Knowledge provenance · adjacent places |

**Absent-when-empty:** the *prior attempts* region **does not render an empty state.** An empty *"nothing tried yet"* block trains people to stop looking at it (Phase 08 §10 I9).

#### S2 Capture — phone, one-handed

| Tier | Content |
|---|---|
| **PRESENT** | Bound place · target condition if verifying · **all four answers** · attachment affordances |
| **DISCLOSED** | *"This isn't where I am"* correction |
| **SUPPORTING** | None |

**Hard constraint:** all four answers are PRESENT simultaneously. **None may require scroll, expansion, or a secondary step** — an answer requiring an extra action is not a peer (§6 A-C).

#### S3 Decision — phone (D2) / desk-class (D3)

| Tier | Content |
|---|---|
| **PRESENT** | What is closing + its cost · conditions with reasons · what this place has done before · **`LAST TIME` — outcome and weakest ground as one unit** · choice controls · reason field |
| **DISCLOSED** | Observations behind each condition · comparable past events · full evidence basis · whether verification was offered and declined |
| **SUPPORTING** | Cross-cycle comparison |

**D3 narrowing:** per-zone readiness is PRESENT **only for weakly-grounded zones.** Well-grounded zones are DISCLOSED as a count-free statement. *(This is the only place a quantity appears, and it describes zones, not confidence.)*

#### S4 Attention — phone

| Tier | Content |
|---|---|
| **PRESENT** | Every current item, each with **the reason it needs a person** |
| **DISCLOSED** | None |
| **SUPPORTING** | None |

**Scroll is permitted here and only here** — the list length is a fact about the property, not a design failure. **It must never be summarized into a count** (§6 A3).

### 4.5 Horizontal budget

At phone width, the binding constraint is that a **reason phrase must not truncate.** Two consequences:

1. **Reason phrases sit on their own line beneath their subject**, never in a right-hand column (§5.1).
2. **Absence phrases never truncate** — *"looked, no answer"* and *"confirmed not present"* both must render complete, because truncation collapses them (§6 A9).

---

## §5 — Epistemic spatial risks

**Where layout itself manufactures certainty**, independent of content. These are risks the prior phases could not surface, because they only exist once information occupies space.

### 5.1 Vertical alignment is a ranking affordance

> **Aligned things compare.** A reason phrase rendered in a dedicated column aligns with every other reason phrase, and a column of aligned short phrases **is** a scale — regardless of whether the phrases are ordered.

This is the spatial route to the failure Phase 08 §2.1 prohibited semantically. **The prohibition on a confidence token does not survive a confidence column.**

**Required correction:** reason phrases sit **inline with their subject**, on the line beneath it, never in a parallel column. This costs vertical space and buys the invariant.

### 5.2 No neutral vertical order exists for peer observations

Phase 08 §5.4 requires two contested observations to render as peers. **Layout alone cannot deliver this:**

| Ordering | Implies |
|---|---|
| Chronological | **Recency equals authority** — which Phase 04 §4.C explicitly denies within the decay window |
| Reverse chronological | Same, inverted |
| By role | A role hierarchy — and brushes I-12 |
| Random | Unstable across renders; worse |

**Whichever is on top reads as primary.** There is no arrangement that does not imply something.

> **Required correction: the explanation must carry what the layout cannot.** Phase 08 §5.4's line — *"Too close together to be change"* — is **load-bearing, not decorative.** It is the only thing telling a reader that position is chronology rather than rank.

**Wireframe consequence:** the contest block must render its explanation **at the same visual weight as the observations themselves**, not as a caption beneath them. A caption reads as annotation; the peer claim needs to read as structure.

### 5.3 Separable units can be independently weighted

If *"Estimate held."* and *"Decided on: never checked here at the time."* are **two blocks**, any later styling decision can emphasize one over the other — and the natural instinct emphasizes the outcome, because outcomes are what people scan for.

> **Required correction: outcome and weakest ground are one indivisible unit.** Not two lines that happen to be adjacent — one block, so that nothing can weight the outcome above its grounds without weighting both.

This is the spatial form of TW-5, and it is the difference between satisfying TW-5 in the wireframe and satisfying it in the shipped product.

### 5.4 Density is an epistemic variable

Compressing a surface to fit shortens phrases. **Phase 09 established that compression is where epistemics get dropped**, and §2.1.1 now governs *what* a phrase may become — but density pressure is what *causes* the compression.

**Wireframe consequence:** when a surface overflows, the permitted responses are, in order:

1. **Re-examine the envelope** — is something PRESENT that is actually DISCLOSED under the disclosure test?
2. **Narrow the decision scope** — D3's weakly-grounded-zones-only is the worked example.
3. **Accept more vertical space.**

**Never permitted:** shortening a reason phrase to fit. §2.1.1's tests apply to the result regardless of why it was shortened.

### 5.5 An action's position implies its status

A control placed apart from a set reads as different in kind. **On S2 this is fatal:** if *"Not there"* sits below a divider, or after the other three, or in a secondary position, it is no longer a peer answer — it is an exception.

**Required correction:** the four answers occupy **one uninterrupted group**, equal treatment, no dividers, no ordering that implies preference. **Their sequence should not imply a likelihood.**

---

## §6 — Adversarial wireframe tests

**Defined here, run against wireframes when wireframes exist** — the same pattern as Phase 09's tripwires. Each names a concrete method.

| # | Test | Method | Failure mechanism | Violated |
|---|---|---|---|---|
| **A1** | **Confidence ranking** | Render every reason phrase in the wireframe. Ask three people to arrange them *"worst to best."* **Consensus ordering = fail** | Column alignment, size, position, or order creates a scale | I-2, I-4 · TW-2 |
| **A2** | **Contest hierarchy** | Show a contest block, no styling. Ask: *"which observation does the system think is right?"* **Any confident answer = fail** | Stacking order implies authority | I-6 · TW-4 |
| **A3** | **Attention backlog** | Show S4. Ask: *"what would you do with this list?"* **Answers containing "clear," "work through," "get to zero," or "assign" = fail** | Row rhythm and chevrons read as a task queue | I-8, I-9, I-10, I-11 · TW-3 |
| **A4** | **Completion** | Show S2. Ask: *"how do you finish this?"* **Any answer naming a control other than the four answers = fail** | A submit or done affordance reads as separate completion | I-14 · TW-8 |
| **A5** | **Decision creation** | Walk the full navigation. **Any route reaching a decision without an originating window, condition change, or place = fail** | A "+" or empty-state CTA implies authorship | I-13 · TW-10 |
| **A6** | **Outcome validation** | Show `LAST TIME` with a good outcome on assumed grounds. Ask: *"was that a good call?"* **Any answer citing only the outcome = fail** | Outcome outweighs grounds when they are separable units | **I-17** · TW-5 |
| **A7** | **Compression to category** | Apply §2.1.1's T-A, T-B, T-C to every phrase in the wireframe | Density pressure shortens a phrase into a label | I-3 · TW-1 |
| **A8** | **Hidden evidence** | Open every disclosed region and ask: *"could this have changed the decision?"* **Any yes = fail** | Density-driven classification | I-16 · TW-9 |
| **A9** | **Absence collapse** | Render both absence phrases at the narrowest bound width. **Any truncation, ellipsis, or wrap that makes them read alike = fail** | Horizontal budget collapses two opposite states | TW-6 |
| **A10** | **Fifth-object drift** | Enumerate every named thing in the wireframe. **Anything not among the eleven objects, four surfaces, or a computed view = fail** | A "summary," "group," or "card" becomes a concept | TW-11 |
| **A11** | **Confidence column** | Inspect layout structure. **Any parallel column of reason phrases = fail** | §5.1 — alignment is ranking | I-2 · new |
| **A12** | **Separable grounds** | Attempt to emphasize the outcome line without emphasizing the grounds line. **If possible = fail** | §5.3 — separable units are independently weightable | **I-17** · new |

**On any failure, record:** exact location · failure mechanism · violated invariant · proposed spatial correction · **whether the correction requires architecture escalation.**

> **No wireframe may be made to pass by changing an invariant.** If a spatial correction is unavailable, that is a finding to escalate — not a licence to reopen §2.

---

## §7 — Accessibility constraints

**Architectural, not cosmetic.** These are wireframe-stage requirements, established before any visual language exists.

### 7.1 One result the architecture already earned

> **The grayscale test passes by construction.**

Because confidence is a **generated reason phrase** and never a color, token, badge, or position on a scale, epistemic meaning survives grayscale, high zoom, reduced hierarchy, and screen-reader linearization **automatically**. Nothing needed to be added.

**This is the clearest available evidence the refusals were load-bearing rather than austere.** A design that had encoded confidence as color would now be facing a retrofit; this one is accessible because it declined the affordance eight phases ago.

### 7.2 Requirements

| Requirement | Wireframe-stage test |
|---|---|
| **Hierarchy without color** | Render in grayscale. **Every epistemic distinction must survive.** Passes by construction (7.1) — verify it stays true |
| **Peer observations distinguishable but not ranked** | Screen-reader order must read both as peers. **No `primary`/`secondary` semantics, no list-position emphasis** |
| **Decision-critical grounds reachable** | The weakest ground must be in reading order **before** the choice controls |
| **Target sizes** | The four answers must be independently reachable one-handed, gloved `[DH]` |
| **Focus order** | Follows the envelope order: closing → known → history → last time → choice. **Never controls-first** |
| **Semantic grouping** | The four answers are **one group**. Outcome + grounds are **one unit** (§5.3) |
| **Content reflow** | See 7.3 |

### 7.3 No-scroll versus reflow — a genuine conflict, resolved

**WCAG reflow requires content to reflow at 320px-equivalent / 400% zoom, permitting vertical scrolling.** An absolute no-scroll rule at high zoom is **incompatible** with conformant reflow for any non-trivial content.

**This cannot be resolved by hiding grounds** — the disclosure test forbids it (I-16) and TW-5 makes the weakest ground mandatory.

> **Resolution: the no-scroll rule is scoped to a stated baseline — default zoom, at the surface's bound viewport (§4.1).**
>
> **At elevated zoom the requirement converts from *fits* to *comes first*.** Decision-critical material must never become discoverable-only; it must lead the reflow order.

**This specifies how TW-9 is measured. It does not reinterpret it** — TW-9 always said *"at the target viewport,"* and §4.1 is the first place that phrase has been given a value.

---

## §8 — The wireframe deliverable

### 8.1 What to produce next

> **Annotated wireframes for the four surfaces, at their bound viewports, against the §4 envelopes.**

**Not** a prototype. **Not** implementation specs. **Not** a visual system.

### 8.2 What each wireframe must carry

| | |
|---|---|
| **Structure only** | Boxes, text, order, grouping. No color, weight, type choice, or iconography |
| **Every PRESENT element placed** | Per §4.4, at the bound viewport |
| **Tier annotation** | Each element marked PRESENT / DISCLOSED / SUPPORTING |
| **Real content** | Actual reason phrases, not lorem. **§6 A7 and A9 cannot run against placeholder text** |
| **The hard cases** | S2 with all four answers · a contest block · `LAST TIME` with a good outcome on assumed grounds · D3 at realistic zone count |

### 8.3 Why the tests are not run in this document

**A1–A12 test layouts.** Defining constraints and the layouts satisfying them in one pass means the tests are run by their own author against their own work — which is how adversarial review becomes ceremonial.

**Constraints now. Wireframes next. Tests run against them, ideally by someone who did not draw them.**

### 8.4 Scope discipline

**One artifact.** Not a wireframe document plus a test document plus a handoff document. §6 travels with the wireframes as their acceptance criteria; §9 travels with them as their exit gate.

---

## §9 — Visual-design handoff criteria

**Visual language begins only when the wireframe layer proves the spatial representation preserves the epistemic contract.**

### 9.1 Must pass before visual design starts

| # | Criterion | Evidence |
|---|---|---|
| **H-1** | **A1–A12 all pass** against the produced wireframes | Recorded test results, not assertion |
| **H-2** | **Every PRESENT element placed** within its bound viewport at default zoom | §4.4 walked per surface |
| **H-3** | **Reflow order verified** — decision-critical material leads at elevated zoom | §7.3 |
| **H-4** | **Four surfaces, no fifth** | Enumeration |
| **H-5** | **Eleven objects, no twelfth** | A10 |
| **H-6** | **All twelve Phase 09 tripwires still pass** | Re-run against wireframes |
| **H-7** | **Any A-test failure resolved spatially**, or escalated as an architecture conflict — **never by amending an invariant** | Failure log |

### 9.2 What visual design inherits — non-negotiable

All interaction rules (Phase 08, as amended) · all epistemic rules (Phases 04–07, 10) · **all refusal constraints** — the absent affordances are architecture, not omissions · all sixteen tripwires (Phase 09's twelve plus A11, A12, and the reflow-order and phrase-truncation tests) · all information-preservation requirements.

### 9.3 What visual design may explore

Hierarchy · density · readability · accessibility beyond the §7 floor · responsive behavior · visual language · rhythm · interaction feedback · typography · color **as long as color carries no epistemic meaning** (§7.1).

### 9.4 What visual design may not reopen

**Confidence semantics · contest semantics · attention semantics · decision semantics · completion semantics · observation attribution · evidence preservation.**

> **These are answered upstream.** A visual proposal requiring any of them to change is an architecture conflict. **Escalate it; do not resolve it in the visual layer.**

---

## §10 — Non-changes

Explicitly untouched by this document and by everything downstream of it.

| | Status |
|---|---|
| **All sixteen prior artifacts** | Frozen. Verified byte-unchanged at completion |
| **The four surfaces** | No fifth. No merging |
| **The eleven objects** | No twelfth |
| **The seventeen invariants** (§2) | Binding on every subsequent stage |
| **Phase 09's twelve tripwires** | Carried forward unchanged, including the `currently FAILS` annotations — **they must keep failing any build that reintroduces the defect** |
| **Band vocabulary** | Internal only. **Never an interface string, never a visual equivalent** |
| **Absent affordances** | No resolve · no count · no dismiss · no assign · no complete · no decision creation · no name on an observation. **Each is architecture** |
| **The disclosure test** | Governs every hide/show decision. Density is never a justification |

---

## §11 — Governance / publication blockers

**Kept deliberately separate. None of these gates design work**, and treating them as blockers would halt the wrong thing for the wrong reason.

| Blocker | Affects design? |
|---|---|
| **Governance §7** — relationship provenance is PRIVATE / UNRESOLVED FOR PUBLICATION | **No.** Design proceeds; nothing in the wireframes depends on it |
| **Governance §6** — anonymization | **No** — and already satisfied structurally by I-12 |
| **Phase 06's three conditions** — U2 validation · non-punitive `evidence_basis` use · A1 before Year 3 | **No.** Deployment gates |
| **Phase 07 §13** — field-validation set (U1, U4, U5, U6, U7) | **Partially informative.** U1 and U7 are tested *by* the wireframes; they do not block producing them |
| **E4 / I7** — the unserved *"who saw this, so I can ask them"* need | **No.** Recorded, not reopened |

### 11.1 The one that touches design

**U5** — *can a supervising role absorb per-zone bands at D3 scale?* — moves from a field question to a **wireframe-stage question** under §4.2. It is now answerable by drawing D3 at realistic zone count and applying A8. **That is a gain: a deployment unknown became a design test.**

---

## §12 — Verdict on the stage question

> **Can the four interaction surfaces exist as clear, accessible, no-scroll wireframe envelopes while preserving every epistemic constraint established through Phase 10?**

**On the evidence available at constraint-definition stage: yes, with one narrowing already anticipated by the architecture itself.**

| Surface | Envelope | Assessment |
|---|---|---|
| **S1 Place** | Phone | **Fits.** One knowledge sentence, prior attempts, conditions for one place |
| **S2 Capture** | Phone, one-handed | **Fits.** One question, four answers, two attachments |
| **S3 — D2** | Phone | **Fits.** Three PRESENT items |
| **S3 — D3** | Desk-class | **Fits only when narrowed** to weakly-grounded zones — **which Phase 08 §5.3 specified before this stage existed** |
| **S4 Attention** | Phone | **Fits.** Scroll permitted; count prohibited |

**Two constraints were closed that had been open:** the target viewport now has a value derived from the role model (§4.1), and the no-scroll/reflow conflict has a resolution that preserves TW-9's intent without hiding grounds (§7.3).

**Two spatial risks were found that no prior phase could have surfaced**, because they exist only once information occupies space: **alignment is ranking** (§5.1) and **separable units are independently weightable** (§5.3). Both have required corrections and both became tests (A11, A12).

**This verdict is provisional by design.** It says the constraints are satisfiable, not that a given wireframe satisfies them. **§6 is what converts this from an expectation into a result**, and it runs against wireframes that do not yet exist.

---

*Wireframe constraint model complete. All sixteen prior artifacts unmodified. No styling, no visual system, no components, no fifth surface, no new object. Next: annotated wireframes against §4, then §6 run against them.*
