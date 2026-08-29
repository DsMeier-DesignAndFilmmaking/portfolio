# Whitetail Stress Testing Page — Change Log & Revised Markdown

> Scope: `/projects/whitetail-club/stress-testing` only (tab 3 of 4).
> Source of record: `docs/whitetail/` — frozen, not edited.
> Status: implemented and verified.
> Date: 2026-08-29

---

## Part 1 — Change Log

### The finding that governed the rewrite

**No test in this project was ever run against an operating condition.** Every measured result is
structural — pixels, DOM nodes, tap counts. There are no outcome metrics anywhere in the corpus: no
water saved, no time saved, no incidents avoided.

The eight requested conditions are nonetheless legitimately present, in exactly two forms, and the
rewrite uses only those:

1. **As the content the measured wireframes actually rendered** — verified verbatim against
   `docs/whitetail/wireframes/*.html`.
2. **As the Phase 06 pressure-case analysis** — a real artifact, labelled `[OPERATIONAL HYPOTHESIS]`,
   never before surfaced publicly.

The page therefore now states its own limit out loud: *the pressure is operational, and every
measurement is structural.* That sentence is the spine of the revision.

### Summary

| File | Change | Lines |
|---|---|---|
| `app/projects/whitetail-club/stress-testing/page.tsx` | Modified — framing prose, section label, three component insertions | +47 / −14 |
| `app/projects/whitetail-club/content.ts` | Modified — three new exports, governance rule 6, one scrollspy label | +117 / −1 |
| `app/projects/whitetail-club/components/StressLoad.tsx` | **New** — `PressureCases` + `ScenarioLoad` + `ResilienceBoundary` | +135 |

**Facts preserved.** The only deletion is one scrollspy label (`Wireframes` → `Pressure`).
`reviewFindings` — all five findings and all fifteen Found / Corrected / Re-verified fields — is
byte-identical, as are `GUARDRAIL` and every figure, caption, and measured number.

**Hierarchy preserved.** Section numbering `06/07/08` and ids `wt-wireframes`, `wt-review`,
`wt-asymmetry` unchanged. Document order unchanged. The two-tier finding hierarchy inside 07 and the
guardrail block's back-reference to "both corrected findings above" remain bound to the same two
cards.

**Scope held.** No other tab touched.

---

### Section 06 — `Wireframe Stress Testing` → `Operational Stress Testing`

**S-01 · Eyebrow renamed.** `06 // Wireframe Stress Testing` → `06 // Operational Stress Testing`.
*Why:* the old label named the artifact. The new one names the thing being tested for.

**S-02 · Heading replaced.**
> **Before:** "Draw the hardest case first, at real density, with real content."
> **After:** "Load the hardest hour first, and measure what breaks."

*Why:* "hardest case" is a testing abstraction. "Hardest hour" is an operating one, and it sets up
the standfirst that defines it.

**S-03 · Standfirst — new opening paragraph.**
> **New ¶1:** "The hardest hour is not a busy one. It is a winterization commit with a blowout
> closing inside the day and a spray window closing behind it, made on zones that have not all been
> walked — where the cost of being wrong is a cracked mainline or a season of turf, and the decision
> cannot be revisited."
>
> **¶2 (retained, extended):** "The wireframes were built as a measurement instrument, not a
> presentation: real HTML at real pixel widths, loaded with real operating decisions rather than
> placeholder text. The riskiest surface was drawn first. What follows is honest about its own
> limits — the pressure is operational, and every measurement is structural."

*Why:* the original never said what "hardest" meant. ¶1 names it in operating terms; ¶2 keeps the
measurement-instrument claim verbatim and adds the honesty clause the whole page depends on.
"with real reason phrases" → "with real operating decisions" is the one substitution.

**S-04 · `PressureCases` block added — the largest single addition.** Five pressures, each with its
temptation and its damage rating, transcribed from `06-operational-validation.md` §F.1. Explicitly
labelled **"Reasoning, not measurement"** with a lead-in stating that nothing in the block was
measured or observed.
*Why:* covers four of the eight requested conditions — weather event, staffing shortage,
guest-visible impact, and (via the temptation column) knowledge loss — from a real corpus artifact.
Three of the five are rated **Fatal** in the source, and those ratings are carried verbatim. Because
everything else on this page is a measurement, the label is not decoration: a reader is entitled to
know which is which.

**S-05 · `[DH]` 28-zone callout — unchanged.** Kept exactly, in place.

**S-06 · `ScenarioLoad` block added.** Six surfaces, each with the operating decision it was loaded
with quoted **verbatim from the wireframe files**, paired with the structural property that was
actually measured on it. Wrapped in the same amber **"Test content — not property facts"** treatment
the `[DH]` box uses, with an explicit note that the intervals are illustrative and no such window is
established in the research.
*Why:* this is the honest bridge. It shows the surfaces carrying irrigation, drainage, snow, and
frost decisions — while the `Measured` line under each one keeps saying overflow, ordering,
separability, truncation, taps. Operational subject, structural measurement, stated side by side.

**S-07 · Figures 02 and 03 — unchanged.** `+539px`, `exactly 0px`, both captions, both alt texts.

---

### Section 07 — Independent Adversarial Review

**S-08 · Eyebrow and heading unchanged.** "Hand the work to someone whose job is to break it."

**S-09 · Standfirst — second paragraph added.**
> **New ¶2:** "What the review looked for is not ugliness. It is a layout that quietly reinstates a
> ranking, a backlog, or a winner — because a surface that ranks zones by confidence during a closing
> window will send a crew to the wrong one, and it will look tidy doing it."

*Why:* the section reported that alignment had become a ranking without ever saying what a ranking
costs in the field. ¶1 is untouched.

**S-10 · All five findings, Figure 04, and the guardrail block — unchanged.** Including every
measured re-verification: `0.00px`, `0 of 40`, zero chevron glyphs, all three keyboard-operable.

---

### Section 08 — The Finding That Stopped The Work

**S-11 · Eyebrow and heading unchanged.** "A conflict no static artifact could have shown."

**S-12 · Standfirst — clause added and a paragraph appended.**
> **¶1 (extended):** "…a measurement that five static wireframes had no way to reveal — **and the
> thing it threatens is the one the whole concept rests on.**"
>
> **New ¶2:** "A crew turns over every season. What survives is whatever got written down, and the
> hardest thing to get written down is an absence: the valve that wasn't there, the search that came
> back empty. Make that the expensive answer and the operation quietly stops accumulating the one
> record it cannot reconstruct later."

*Why:* covers the eighth condition — knowledge loss — and converts the tap-count finding from an
interaction curiosity into the operational risk it actually is. The three cards below already say
"the interface teaches people what it values"; ¶2 deliberately avoids echoing that line.

**S-13 · Three cards and the amber status block — unchanged.**

**S-14 · `ResilienceBoundary` added at the close.** Four things never put under load: equipment
downtime; a real crew in a real season; whether absence gets recorded at all; guest-facing service.
*Why:* equipment downtime is the one requested condition absent from every test document — it is
`[SRC]`-attested but out of product scope, entering the model only as crew capacity. Naming it as an
untested gap is honest; inventing a test for it would not be. The block also carries the corpus's
largest open risk in plain words.

---

### Shared file and component

**S-15 · Governance rule 6 added** to the `content.ts` header: no test was run against an operating
condition; operating conditions exist only as measured-wireframe content or as labelled analysis;
there are no outcome metrics and none may be invented.

**S-16 · `stressTestingSections` relabelled** — `Wireframes` → `Pressure`. `Review` and `Asymmetry`
unchanged; ids and order unchanged. **The only deletion in the file.**

**S-17 · `StressLoad.tsx`** — three exports reusing the existing card idiom from `SystemsStack` and
`LoopDiagram`: same radii, borders, mono eyebrows, `font-tiempos`, amber accent. Fatal rows are
marked by weight, not by a new color. The pressure table scrolls inside its own
`overflow-x-auto` container, following the confidence-table pattern. **No new design tokens** —
visual design remains unauthorized under Phase 12/13.

### Every number on the page, and where it comes from

| Figure | Provenance |
|---|---|
| `+539px`, `exactly 0px`, `0.00px`, `0 of 40` | Existing measured results — unchanged |
| `28 zones [DH]` | Established test parameter, already labelled on the page |
| `~18 hours`, `~40 hours`, `~36 hours`, `~4 days`, `06:04`, `38 minutes` | Verbatim strings from `docs/whitetail/wireframes/*.html`, shown inside the "test content" frame |
| `320px` | Documented reflow test condition |

**Zero invented metrics.** Verified by extracting every digit-bearing rendered string added to the
page and tracing each to the corpus.

---

## Part 2 — Revised Markdown

---

# Stress Testing

*Whitetail Club & Shore Lodge — Stewardship Intelligence System. Section 3 of 4.*

## 06 // Operational Stress Testing

### Load the hardest hour first, and measure what breaks.

The hardest hour is not a busy one. It is a winterization commit with a blowout closing inside the
day and a spray window closing behind it, made on zones that have not all been walked — where the
cost of being wrong is a cracked mainline or a season of turf, and the decision cannot be revisited.

The wireframes were built as a measurement instrument, not a presentation: real HTML at real pixel
widths, loaded with real operating decisions rather than placeholder text. The riskiest surface was
drawn first. What follows is honest about its own limits — the pressure is operational, and every
measurement is structural.

#### Reasoning, not measurement

Before any surface was drawn, the failure modes were mapped against the pressures a grounds
operation actually runs under. Nothing in this block was measured or observed — it is analysis of
how the system could be bent, and three of the five bends are rated as fatal to it.

| Pressure | The temptation | Damage |
|---|---|---|
| A closing window | Skip verification and proceed on an assumption | None — this is a supported path |
| Guest-visible impact | Mark a condition confirmed to avoid explaining thin grounds | **Fatal** |
| Staffing shortage | Skip observations; batch them from recall at the end of the day | Degrading |
| Weather event | Copy forward last cycle's readiness rather than re-checking | **Fatal** |
| Leadership scrutiny | Falsify the evidence basis so a decision looks better-grounded than it was | **Fatal** |

#### Test parameter — not a property fact *(preserved)*

The sequencing surface was stress-tested at **28 zones [DH]**. This is a labeled design hypothesis
used as a test floor, derived from the attested course scale. It is **not** a claim about how many
zones the property has — no zone count is established anywhere in the research.

#### Test content — not property facts

Each surface was loaded with a real operating decision written out in full, rather than with
placeholder text. The quoted lines below are what the tested artifacts actually rendered. The
intervals inside them are illustrative — no such window is established anywhere in the research —
and what was measured is never the operation. It is always the structure.

**Decision — winterization sequencing**
> "Irrigation blowout: point of no return in ~18 hours · Snow mold application window closes in ~40
> hours"
>
> *Measured:* Vertical overflow at 28 zones [DH], and the horizontal start point of every reason
> phrase.

**Contested condition — drainage**
> "Drainage state — two disagree · one account reads clear, the other standing water"
>
> *Measured:* Whether vertical order made the later observation read as the true one, across four
> arrangements.

**Returned grounds — frost delay**
> "Frost delay — open or hold · frost present · measured 06:04, uncontested · Play scheduled in 38
> minutes."
>
> *Measured:* Whether the outcome could be visually separated from the grounds it rested on.

**Attention — what needs a person**
> "Blowout window closes in ~36 hours · Snow mold window opens in ~4 days"
>
> *Measured:* Whether a stateless list had re-grown a count, a completion state, or an inbox rhythm.

**Place — absence adjacency**
> "drainage readiness · never checked — irrigation valve (north) · looked, no answer — drainage line
> (east) · confirmed not present"
>
> *Measured:* Whether three different kinds of not-knowing survived side by side without truncation,
> down to 320px.

**Capture — the write path**
> "The one functional surface. Four answers, clicked through for real rather than drawn."
>
> *Measured:* The number of taps each answer costs to commit.

### Figure 02 — Sequencing surface, unnarrowed, 28 zones [DH] *(preserved)*

Every zone itemized regardless of how well it is known. Measured overflow: **+539px** past the frame
— the commit controls are unreachable without scrolling. The discomfort is the finding, and it was
left in rather than tidied away.

### Figure 03 — Same decision, narrowed to weakly-grounded zones *(preserved)*

Only the zones a person actually has to look at before committing. Measured overflow: **exactly
0px**. The narrowing was not a stylistic preference — the unnarrowed frame proves it was necessary,
and the architecture had independently predicted it.

---

## 07 // Independent Adversarial Review

### Hand the work to someone whose job is to break it.

The wireframes were reviewed by a process that did not build them and was deliberately not given the
reasoning behind them — only the artifacts and the tests. A reviewer handed the defense will grade
the defense.

What the review looked for is not ugliness. It is a layout that quietly reinstates a ranking, a
backlog, or a winner — because a surface that ranks zones by confidence during a closing window will
send a crew to the wrong one, and it will look tidy doing it.

#### *(preserved — all five findings, all fifteen fields, verbatim)*

**Test A11 — Alignment had quietly become a ranking**
*Found:* Every one of the 28 test-parameter zone rows [DH] started its reason text at the same
x-coordinate — measured spread 0.00px. A column of aligned short phrases is a scale, whether or not
anything is sorted.
*Corrected:* Rows restructured so the label and its reason occupy separate lines.
*Re-verified:* 0 of 40 label/reason pairs share a line after the fix — re-measured, not assumed.

**Test A3 — Attention had quietly become an inbox**
*Found:* A uniform row rhythm plus a trailing chevron reproduced the canonical notification-list
pattern — in a surface with deliberately no count, no assignment, no completion and no dismiss.
*Corrected:* Chevron removed; the row itself is the affordance.
*Re-verified:* Zero chevron glyphs remain.

**Test A2 — Ordering implied that recency meant authority**
*Found:* Two contested observations must read as peers. Stacked chronologically, the later one reads
as current and therefore true — which the architecture explicitly denies within the decay window.
*Corrected:* Four arrangements were drawn and compared rather than one being assumed. No vertical
order is neutral; the explanation has to carry what the layout cannot.
*Re-verified:* Recorded as a comparison exhibit — which arrangement ships is deliberately still open.

**Finding — The markup did not do what its own annotation claimed**
*Found:* Attention rows were annotated as interactive but were bare non-interactive elements — zero
of them appeared in the keyboard tab order.
*Corrected:* Rows converted to real buttons.
*Re-verified:* All three now focusable and keyboard-operable.

**Finding — Real content caught what placeholder text would have hidden**
*Found:* One generated phrase read "…ages in about a week." It passes a literal check for the
forbidden internal vocabulary. It is also one synonym away from re-introducing that vocabulary
through prose.
*Corrected:* Changed to "changes" — which is the verb the project's own canonical phrasing already
used.
*Re-verified:* This is only findable with real content. Lorem ipsum cannot fail this test.

### Figure 04 — Contested condition, one of four arrangements compared *(preserved)*

Two observations disagree. Neither is elevated, and there is deliberately **no control that resolves
the disagreement** — no accept, no reject, no "mark correct." Picking a winner in the interface would
destroy one true account on no evidence. The only way out is a new observation.

### The guardrail this section exists to demonstrate *(preserved)*

> "Visual design is an implementation of the epistemic contract, not a new opportunity to interpret
> it."

Both corrected findings above are the same failure in different clothing: a layout decision quietly
re-introducing a meaning the architecture had spent phases removing. Neither was visible as a rule
violation. Both were visible as measurements.

---

## 08 // The Finding That Stopped The Work

### A conflict no static artifact could have shown.

Because the capture surface was functional, it could be clicked. Clicking it produced a measurement
that five static wireframes had no way to reveal — and the thing it threatens is the one the whole
concept rests on.

A crew turns over every season. What survives is whatever got written down, and the hardest thing to
get written down is an absence: the valve that wasn't there, the search that came back empty. Make
that the expensive answer and the operation quietly stops accumulating the one record it cannot
reconstruct later.

#### *(preserved — three cards)*

**Measured — Recording a find costs one tap. Recording an absence costs two.**
A tripwire written earlier in the project exists to catch exactly that asymmetry — because if
reporting "I didn't find it" is more expensive than reporting success, the interface teaches people
what it values, whatever the training says.

**Reduced — The conflict turned out to be one question about six words.**
Analysis found the tripwire's subject was ambiguous: it counts "the four outcomes," but the model
holds four *answers* and five stored *values*. Which layer it measures had never been stated — so the
apparent contradiction was a scope question, not a broken architecture.

**Mapped, not decided — Both answers were traced. Neither was selected.**
A further pass mapped what each reading would cost — how many decisions, how many amendments,
whether architecture would have to change at all — and proved the question could not be reduced any
further. It stopped there, deliberately.

#### Current status — unresolved *(preserved)*

The consequence analysis **did not select a reading**, and the underlying question remains open
pending an explicit decision. The measured asymmetry stands as recorded. Resolving it inside the
design work — rather than surfacing it as a decision someone else owns — would have been faster and
considerably less defensible.

### What was never stress-tested

Everything above was measured against rendered HTML. That is a real form of evidence and a narrow
one. Four things this design has to survive were not put under load at all.

**Equipment downtime** — A leased fleet and a reactive repair load are real constraints on what a day
can hold, but equipment lifecycle is a different domain with its own logic. It enters this model only
as crew capacity, and no surface was ever loaded with a breakdown.

**A real crew, in a real season** — Every measurement here was taken against rendered HTML, not
against people. No crew has used any of this, in any weather, on any day.

**Whether absence gets recorded at all** — The whole concept rests on people recording what they did
not find. Whether they would is untested, is named in the research as the largest open risk, and is
exactly what the asymmetry above threatens.

**Guest-facing service** — Guest-visible pressure is modeled as a force acting on the crew, because
that is what the research supports. Nothing here serves a guest, and no guest-facing surface was
designed or tested.
