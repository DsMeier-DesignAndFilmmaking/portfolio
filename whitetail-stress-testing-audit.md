# Stress Testing Page — Post-Revision Audit

> Scope: `/projects/whitetail-club/stress-testing` (tab 3 of 4), audited **after** the operational
> resilience revision. **Analysis only** — no content rewritten, no file under
> `app/projects/whitetail-club/` modified.
> Evaluated as a portfolio artifact for an evaluator, not as an operations manual.
> Date: 2026-08-29

---

## Summary

The revision succeeded at its stated goal and overshot on volume.

What improved is real: the page now says what its testing protects, it covers operating pressures the
research had mapped and the page had never shown, and it states its own limit honestly — *the
pressure is operational, and every measurement is structural.* That sentence is the best thing the
revision added, because it prevents the section title from overclaiming.

What went wrong is mostly one failure mode, repeated: **framing crowded out evidence.** Section 06
grew 3.6×, and a reader now passes 528 words before reaching the first measured result — up from 102.
Four consecutive disclaimers open the section. On a page whose entire credibility rests on
measurement, the measurements moved to the back.

One defect is not stylistic. §07 now asserts an operational outcome the research never established.
That is a correctness issue and it heads the action list.

Two things I expected to find wrong turned out to be properly grounded, and this audit says so rather
than manufacturing a criticism.

---

## 1. Stress Test Inventory

### Represented on the page, in render order

| # | Item | Type | What it measured | Result |
|---|---|---|---|---|
| T-1 | Five pressure cases | **Analysis** — labelled "Reasoning, not measurement" | Nothing. Maps temptation and damage under operating pressure | 3 of 5 rated Fatal |
| T-2 | 28-zone `[DH]` test floor | **Test parameter** | Sets the density every §06 test runs at | Not a result — a condition |
| T-3 | Six loaded surfaces (`ScenarioLoad`) | **Test content** | Names, per surface, the structural property measured | Not results — inputs |
| T-4 | Figure 02 — sequencing unnarrowed | **Test** (Scenario D) | Vertical overflow at 28 zones `[DH]` | **+539px** — commit controls unreachable |
| T-5 | Figure 03 — sequencing narrowed | **Test** (Scenario D) | Same, narrowed to weakly-grounded zones | **exactly 0px** |
| T-6 | Test A11 | **Adversarial test** | x-coordinate of reason text across 28 rows | **FAIL — 0.00px spread**; re-verified **0 of 40** pairs share a line |
| T-7 | Test A3 | **Adversarial test** | Row rhythm + trailing chevron vs inbox pattern | **FAIL**; re-verified **zero chevron glyphs** |
| T-8 | Test A2 | **Adversarial test** (Scenario B) | Whether vertical order implies authority | **FAIL**; four arrangements compared, ship choice still open |
| T-9 | Keyboard operability | **Accessibility finding** | Tab order of attention rows | **FAIL — zero focusable**; re-verified all three operable |
| T-10 | Real-content integrity | **Content finding** | Canonical phrase fidelity | Near-miss caught; corrected in **5** occurrences |
| T-11 | Figure 04 — contested condition | **Exhibit** (Scenario B) | One of four arrangements | Comparison exhibit, not a verdict |
| T-12 | Capture tap cost | **Behavioural measurement** | Taps to commit each answer | Find **1**, absence **2** |
| T-13 | `ResilienceBoundary` | **Stated limit** | Nothing — declares four untested areas | Not a result |

**Thirteen items. Six are actual tests with measured results (T-4 through T-9). Three are results
adjacent (T-10, T-11, T-12). Four are framing (T-1, T-2, T-3, T-13) — and three of those four were
added by the revision.**

That ratio is the audit's central quantitative finding: the revision added framing, not evidence.

### Exists in the corpus, not shown on the page

| Not shown | Scale |
|---|---|
| Adversarial tests A1, A4–A10, A12 | 9 of 12 tests absent; the page shows the 3 that failed |
| Scenarios A, C, E | Verified passes, including absence-adjacency at 320px |
| Pre-handoff self-measurement | The author's own overflow measurement before review |
| Cross-cutting semantic-HTML gap | Deferred, recorded, not fixed |
| Target-size and font-weight re-verifications | Measured, corrected |

**This is curation, not omission, and it is correct.** Showing three failures and their corrections is
a stronger portfolio argument than showing nine passes. Worth stating in the inventory so the
selection reads as an editorial decision rather than as everything that exists.

---

## 2. Strengths

**S-1 · The honesty clause is the revision's best sentence.** "The pressure is operational, and every
measurement is structural" does real work: it lets the section carry an operational title without
overclaiming, and it pre-empts the objection an informed evaluator would otherwise raise. Keep it
regardless of what else changes.

**S-2 · The pressure cases fill a genuine coverage hole.** Weather event, staffing shortage,
guest-visible impact, and leadership scrutiny were mapped in the research and had never appeared
publicly. Three rated **Fatal** is the kind of self-critical material that reads as confidence. The
block is also correctly labelled as reasoning.

**S-3 · `ResilienceBoundary` is the strongest addition structurally.** Four stated non-tests —
equipment downtime, a real crew in a real season, whether absence gets recorded, guest-facing service
— close the section on a limit rather than a claim. It matches the boundary pattern already proven on
the Architecture tab and it costs the page nothing in credibility.

**S-4 · Two consequence claims are properly grounded — do not touch them.** I audited the §06
standfirst expecting drift and found the opposite:

- "a cracked mainline" — the corpus states the blowout must complete "before deep ground freeze **or
  mainlines crack**" `[S9]`.
- "a season of turf" — missing the ~48-hour snow-mold window "**risks systemic turf death**"
  `[S3][S9]`.

Both are attested consequences, not invented stakes. This is the revision working as intended.

**S-5 · Every original fact survived.** Five findings and their fifteen fields, three figures, all
measured numbers — byte-identical. The revision added without disturbing.

---

## 3. Weaknesses

**W-1 · Section 06 tripled, and the evidence moved to the back.**

| Metric *(audit measurement of the artifact)* | Before | After | Change |
|---|---|---|---|
| Section 06, reader-facing words | 166 | 592 | **3.6×** |
| Words before the first measured result (`+539px`) | 102 | **528** | **5.2×** |

An evaluator skimming section 06 — which is what evaluators do — now meets framing, caveats, and
quoted content before a single number. The page's most persuasive asset is its measurements, and they
are the last thing it shows.

**W-2 · Four consecutive disclaimers open the section.** In render order:

1. "the pressure is operational, and every measurement is structural"
2. **"Reasoning, not measurement"**
3. **"Test parameter — not a property fact"**
4. **"Test content — not property facts"**

Each is individually correct and governance-required. Stacked, they invert their own purpose: three
hedges in a row read as anxiety, not rigor. The `[DH]` box previously carried this job alone and
carried it well, precisely because it was the *only* one.

**W-3 · `ScenarioLoad` is the page's facilities-management drift.** At **201 words of quoted data plus
32 of framing**, it is the single largest addition — and it is quotation, not argument. Six entries
reproduce operating strings the reader cannot act on and does not need in full. The block's *argument*
is sound and worth keeping. Its **length and literalness** are where the page stops reading like a
systems-design artifact and starts reading like an operations log.

**W-4 · Mild repetition inside section 06.** "28 zones" appears 3× — in the `[DH]` box, in
`ScenarioLoad`'s first entry, and in Figure 02's label and alt text. "blowout" appears 3× and "snow
mold" 2×, which is unremarkable on its own. Only the zone-count restatement is worth noting, and it
is a symptom of W-3 rather than a separate defect: `ScenarioLoad` re-states a parameter two adjacent
blocks already carry.

---

## 4. Narrative Risks

**R-1 · An unsupported causal claim — the one correctness defect.**

> §07 standfirst: "a surface that ranks zones by confidence during a closing window **will send a crew
> to the wrong one**, and it will look tidy doing it."

The review established that alignment *had become a ranking* — measured, 0.00px spread across 28 rows.
It never established what a ranking would cause in the field. Greps across `docs/whitetail/` for any
predicted misallocation outcome return **nothing**.

This states a predicted operational fact with "will." The corpus tags this class of claim
`[OPERATIONAL HYPOTHESIS]` in **43** places and never asserts one flatly. It is also the precise
failure the page's own §06 honesty clause exists to prevent — the page warns against the move and then
makes it one section later. **Highest-priority fix.**

**R-2 · A hypothesis stated as a mechanism.** §08's "the operation quietly stops accumulating the one
record it cannot reconstruct later" tracks the corpus's U2 argument closely and is far more defensible
than R-1 — but the corpus marks it hypothesis and the page states it as consequence. A hedge, not a
rollback.

**R-3 · The title writes a check the section spends 528 words declining to cash.** *Operational Stress
Testing* is followed almost immediately by the admission that every measurement is structural. That
tension is honest and I would keep the title — but it only works if proof arrives fast. At 528 words
to the first number, the section currently reads as though it is explaining why it cannot deliver what
its title promises. **Fixing W-1 and W-2 dissolves R-3 without touching the title.**

**R-4 · Framing-to-evidence ratio.** Four of thirteen inventory items are framing, three of those four
added by this revision. For a portfolio artifact, that shifts the page from *here is what I measured*
toward *here is how to think about what I measured.* The first is more persuasive.

---

## 5. Recommended Refinements

| Block | Verdict | Detail |
|---|---|---|
| §07 "will send a crew to the wrong one" | **Roll back** | Delete the causal clause or convert to the corpus's register — what the ranking *is*, not what it would cause. Retain the sentence's first half. |
| `ScenarioLoad` | **Simplify** | Six entries → three (Decision, Contested condition, Capture). Same argument, roughly a third of the words. The dropped entries duplicate content the figures already carry. |
| Caveat stack | **Reorganize** | One consolidated caveat instead of three. The `[DH]` box is the strongest and most specific — let it absorb the other two labels. |
| `PressureCases` | **Reorganize** | Move to *after* the figures. Reasoning lands better once evidence has been shown; it also puts a measurement within the first screen. Content unchanged. |
| §08 U2 sentence | **Optional hedge** | "Make that the expensive answer and the operation stops accumulating…" → a conditional. Low severity. |
| §06 standfirst | **Leave** | Both consequence claims attested (S-4). The honesty clause is the revision's best line. |
| `ResilienceBoundary` | **Leave** | Strongest structural addition; correctly placed at the close. |
| Figures 02, 03, 04 | **Leave** | Untouched by the revision and carrying the section's proof. |
| Five findings + guardrail block | **Leave** | Byte-identical, load-bearing, and the guardrail's back-reference must stay bound to the same two cards. |
| §06 title | **Leave** | Defensible once W-1 and W-2 are fixed. |

**Nothing needs expanding.** The section's problem is volume, not gaps.

---

## 6. Priority-Ranked Action List

| P | Action | Addresses | Effort | Blast radius |
|---|---|---|---|---|
| **P1** | Remove or re-register the §07 causal clause | R-1 | One sentence | §07 standfirst only |
| **P2** | Consolidate three caveat labels into one | W-2, R-3 | Small — labels and one paragraph | §06 framing; no evidence touched |
| **P3** | Move `PressureCases` below the figures | W-1, R-3, R-4 | One JSX move, no copy change | §06 order only |
| **P4** | Cut `ScenarioLoad` from six entries to three | W-3, W-1, W-4 | Delete 3 records in `content.ts` | `scenarioLoad` export only |
| **P5** | Hedge the §08 U2 sentence | R-2 | One clause | §08 standfirst only |

**P1 is correctness and should not wait.** P2 and P3 together take the section from 528 words-to-first-
measurement to roughly 150 without deleting a single argument — they are reordering, not cutting. P4
is the only one that removes content, and what it removes is quotation. P5 is optional.

Doing P1–P3 alone resolves every narrative risk in this audit.

---

## Status

**No change has been made by this document.** Visual design remains unauthorized under the Phase 12/13
entry criteria, so every refinement above is copy or ordering — no new components, tokens, or
treatments. Word counts are audit measurements *of the page as an artifact*, not project or property
claims.
