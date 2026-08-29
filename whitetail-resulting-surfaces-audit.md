# Whitetail Resulting Surfaces — Surface Audit

> Scope: `/projects/whitetail-club/resulting-surfaces` (tab 4 of 4). **Analysis only.**
> No content was rewritten and no file under `app/projects/whitetail-club/` was modified.
> Source of record: `docs/whitetail/` — frozen, not edited.
> Date: 2026-08-29

---

## Summary

The page is doing something harder than it looks, and doing most of it well. Its three artifacts are
the *quiet* half of the system — the surfaces defined by what they refuse to offer — and the captions
defend those refusals precisely. That is the original intent and this audit preserves it.

The gap is not argument quality. It is that **the page argues epistemics to a reader who has not been
told who uses these screens, or to decide what.** The project has a complete, attested three-role
model with decision authority, constraints, and tenure. None of it reaches this tab. The result is
that a reader meets "clearing is a task-manager verb" without ever meeting the superintendent for
whom clearing would be the wrong verb.

Three findings are structural rather than editorial, and two of them may be deliberate:

- The tab is named **The Resulting Surfaces** and shows **two of the project's four canonical
  surfaces**. Capture and Decision are on other tabs.
- Section numbering runs **09 → 11**. Section 10 renders on the Overview tab.
- **No artifact on this tab is a visualization.** Every system diagram lives on Architecture.

**One artifact should not be touched at all** — Figure 07. It is already the most operationally
concrete thing on the page.

---

## 1. Surface Inventory

Eight entries: seven the page renders, one it does not.

| # | Entry | What it is | Origin | Page owns it? |
|---|---|---|---|---|
| I-1 | **§09 framing kicker** | "What the system looks like when it refuses to overstate." Standfirst discloses wireframe stage, no visual system, visual design not authorized. | `resulting-surfaces/page.tsx` | Yes |
| I-2 | **Figure 05 — Place** | `place-surface.png`. What is normal here; what has already been tried, including a failed search; current conditions each with a plain-language reason. | Wireframe 05 | Yes |
| I-3 | **Figure 06 — Attention** | `attention.png`. Three items that need a person, each stating why. No count, assignment, dismissal, or completion. | Wireframe 04 | Yes |
| I-4 | **Figure 07 — Returned decision context** | `lasttime-block.png`. One indivisible block: *"2 Nov — delayed 45 min. Estimate held. Decided on: thaw lag never checked here at the time."* | Wireframe 03 (TW-5) | Yes |
| I-5 | **§11 What This Demonstrates** | Three practice points: *Refusal is a design act* · *Build the thing that can fail* · *Stopping is part of the work.* Rendered 2-up then one full-width. | `practicePoints` in `content.ts` | Copy shared; layout owned |
| I-6 | **`PracticeAnchor`** | Commercial conversion module. Three engagements routing to `/services`. | `components/PracticeAnchor.tsx` | **No — shared across projects** |
| I-7 | **`CrossProjectFooter`** | Cross-navigation to Rock Creek, Research OS, All projects. | `components/StaticSections.tsx` | **No — shared within case study** |
| I-8 | **§10 Evidence Boundary** | Established vs Not claimed, plus the independent disclaimer. | `EvidenceBoundarySection`, id `wt-boundary` | **Absent — renders on Overview** |

**Excluded by scope:** `PageNavIndicator`, `ProjectHeader`, and `WhitetailExperienceNav` render on
this tab but are identical navigation chrome on all four. They are neither artifact nor surface, and
none is specific to this page.

### Two inventory accuracy notes

The file's own docblock describes the tab as holding *"the three surviving wireframe surfaces."*
Both halves of that phrase are imprecise:

- **Figure 07 is not a surface.** It is a component — the returned-grounds block that appears *inside*
  the Decision envelope. Place and Attention are surfaces; LAST TIME is a unit within one.
- **"Surviving" implies attrition that did not occur.** Capture and Decision were not cut. Capture is
  Figure 01 on Architecture; Decision is Figures 02–03 on Stress Testing.

Neither affects a reader — the docblock is internal — but both would mislead the next editor.

---

## 2. Classification Matrix

Categories: **OI** Operational Interface · **SI** Strategic Interface · **KI** Knowledge Interface ·
**StI** Stewardship Interface · **VA** Visualization Artifact.

Audience uses the project's three-role model (`01-system-model.md` §6 — role titles only).

| # | Entry | Purpose | Audience | Primary | Secondary |
|---|---|---|---|---|---|
| I-1 | §09 framing | Disclose the stage of the work before showing any of it | Reader / evaluator | **StI** | — |
| I-2 | Place | Answer "what is here, what is known, how well, and what has already been tried" for someone standing on it | **Seasonal Groundskeeper** — field posture, decides D6 only, tenure weeks to months | **OI** | **KI** |
| I-3 | Attention | Answer "what needs a person right now" — never "how are things" | **Superintendent / Grounds Director** — management posture, serves D3 and D7 only | **OI** | — |
| I-4 | LAST TIME block | Keep an outcome and the grounds it rested on inseparable across seasons | Superintendent / Grounds Director; inherited by successors | **KI** | **StI** |
| I-5 | §11 practice points | Establish transferable method beyond one property | Prospective client, peer, evaluator | **SI** | — |
| I-6 | `PracticeAnchor` | Convert a convinced reader into a scoping conversation | Prospective client | **SI** | — |
| I-7 | `CrossProjectFooter` | Route to sibling work | Reader / evaluator | **SI** | — |
| I-8 | §10 Evidence Boundary *(absent)* | State what was established and what is not claimed | Reader / evaluator | **StI** | — |

### What the matrix shows

**The tab has exactly one operational pair and it is the right one.** Place and Attention are the two
roots of the navigation model — field posture and management posture, "two roots, one spine." Showing
these two together is a defensible editorial choice, not an accident of what was available.

**Stewardship appears only as stewardship of the reader, never of the landscape.** I-1 and I-8 both
steward *claims* — what may be said, what may not. No artifact on this tab stewards turf, water, or
forest. That work is real and it is on the Architecture tab, under Stewardship Systems. Worth naming
so the absence reads as division of labor rather than omission.

**Strategic outweighs operational by count.** Three of seven rendered entries (I-5, I-6, I-7) address
a prospective client. Two address an operator. In a terminal tab that is normal and probably correct —
this is where a case study converts — but it means the operational material carries less of the page
than its title implies.

**No entry is a Visualization Artifact.** Every diagram in the case study — `LoopDiagram`, `LayerMap`,
`SystemsStack` — is on Architecture. This tab is screenshots and prose. Nothing pictures how Place,
Attention, and the returned block relate to one another or to the loop they close.

---

## 3. Narrative Gaps

Ranked by consequence.

### G-1 · The tab shows half the system it is named for

Four canonical surfaces are defined, with the constraint "no fifth, no merging." The tab called
*The Resulting Surfaces* presents two of them. A reader arriving here — including one who jumped
straight to tab 4 from the nav, which the tab strip invites — sees Place and Attention and has no
signal that Capture and Decision exist, let alone that they are two tabs back.

The cost is specific: **Capture is described in the research as the highest-stakes interaction in the
product**, and the one finding that stopped the work came from it. On this tab it is invisible.

### G-2 · Section numbering runs 09 → 11

Section 10 renders on Overview, between 02 and 03. The case for this being deliberate is real and
strong: the Evidence Boundary is the project's trust module, and putting the limits before the claims
matches the posture of the entire case study. The case against is that the site otherwise runs one
continuous 01–11 sequence, and a reader who has followed it through three tabs meets a gap here with
no explanation.

**Intent unconfirmed.** This is flagged, not diagnosed.

### G-3 · No surface states its user, its decision, or its action

This is the largest editorial gap and the one most within reach.

Every caption argues correctly and abstractly. Figure 06 explains that *"a count implies a target of
zero, a target implies items you can clear, and clearing is a task-manager verb."* That is a good
argument. It is also an argument about interface semantics, delivered to a reader who has not been
told that this screen belongs to a Grounds Director allocating limited, inexperienced crew across a
large landscape under closing windows — which is precisely why "clear the list" is the wrong verb.

The project has the grounding. Three roles, seven decisions, stated constraints, stated tenure. None
of it appears on this tab.

### G-4 · The design asymmetry — the reason all three artifacts exist — never appears

The system model states it directly: *the people with the most current information about the landscape
have the least authority and the shortest tenure; the person with authority and memory is not in the
field and cannot scale across the property.*

Place exists because of the first half. Attention exists because of the second. The LAST TIME block
exists because tenure runs out. **All three artifacts are answers to one sentence that the page never
says.** Figure 05's caption comes closest — "the only thing preventing a second crew from repeating a
search that already failed" — and stops short of naming why a second crew is unavoidable.

### G-5 · Nothing relates the surfaces to each other

Three figures stack vertically with no artifact showing that Place and Attention are two doors into
one spine, or that the returned block is what closes the loop the Architecture tab opened. The tab
reads as a gallery where it could read as a system resolving.

### G-6 · Docblock inaccuracies

Component described as a surface; "surviving" implying attrition that did not occur. Internal only.

---

## 4. Opportunities

Three tiers, so this can be acted on at any depth — or not at all.

### Tier 1 — Caption-level, fully non-destructive

Add one line above each existing caption naming user, decision, and action. **Every current sentence
stays exactly as written.** All content is already attested; nothing new would be claimed.

| Figure | Line to add above the existing caption |
|---|---|
| 05 Place | *Seasonal Groundskeeper, standing on the place · Decides: is this normal, or does it need attention · Acts by recording what they found* |
| 06 Attention | *Grounds Director, between desk and truck · Decides: winterization sequencing, and what gets deferred when the window is closing · Acts by sending a person* |
| 07 LAST TIME | *Whoever holds the decision next season · Decides: whether last time's outcome is evidence · Acts by re-checking, or not* |

This closes G-3 at the lowest possible cost and touches nothing that currently exists.

### Tier 2 — Structural, requires confirmation first

- **Cross-reference the other two surfaces.** A short line in §09 pointing to Capture (Figure 01) and
  Decision (Figures 02–03) would close G-1 without moving anything. A stronger version consolidates
  all four here, which is a larger edit affecting two other tabs.
- **Resolve the 09 → 11 gap.** Either restore continuity, or add a one-clause pointer noting the
  boundary was stated up front deliberately. **Confirm intent before either.**

### Tier 3 — Additive

- **One surface-relationship artifact** — a small diagram showing two doors, one spine, and the
  returned block closing the loop. Closes G-5 and gives the tab its missing Visualization Artifact.
  This is the only tier that adds a component.
- **State the asymmetry once**, in §09's standfirst or as a pull quote. Closes G-4 in one sentence and
  reframes all three figures as answers rather than exhibits.

---

## 5. Revision Strategy

### Verdicts

| # | Entry | Verdict | Reasoning |
|---|---|---|---|
| I-1 | §09 framing | **Strengthen** | Best single location for the role asymmetry (G-4) and a cross-reference to the other two surfaces (G-1). The existing disclosure sentences stay verbatim. |
| I-2 | Place | **Strengthen — Tier 1 only** | Add the user/decision line. The caption's argument about the two absence states is precise and load-bearing; do not touch it. |
| I-3 | Attention | **Strengthen — Tier 1 only** | Add the user/decision line. The count/target/clearing argument is one of the sharpest passages in the case study; leave it intact. |
| I-4 | LAST TIME | **Leave unchanged** | Already the most operationally concrete artifact on the page — a real date, a real outcome, a named weak ground. Its argument about a lucky guess hardening into institutional knowledge is exact. Adding operational framing here would dilute, not strengthen. |
| I-5 | §11 practice points | **Leave unchanged** | Strategic by design. These are practice-level claims addressed to a different reader, and the deliberate 2-then-1 rhythm resolves the page. Operationalizing them would collapse the distinction the tab depends on. |
| I-6 | `PracticeAnchor` | **Out of bounds** | Shared component; editing it changes other case studies. |
| I-7 | `CrossProjectFooter` | **Out of bounds** | Same. |
| I-8 | §10 Evidence Boundary | **Confirm intent first** | Placement may be deliberate and defensible. Do not move it on this audit's authority. |

### Sequencing

1. **Tier 1 captions** — three added lines, nothing removed. Lowest risk, closes the largest editorial
   gap, reversible in one commit.
2. **Confirm intent on G-1 and G-2.** Both may be deliberate. If G-1 is not, the cheap fix is a
   cross-reference in §09, not a migration of figures between tabs.
3. **Tier 3 only if the tab is still judged thin** after 1 and 2. A diagram is a new component and
   visual design remains unauthorized under the Phase 12/13 entry criteria, so any artifact must reuse
   the existing card idiom exactly.

### Constraints carried into any revision

- **Visual design is not authorized.** Copy and structure only; reuse existing components and tokens.
- **Preserve every existing sentence** in Figures 05–07 and in the three practice points.
- Role titles only, from the attested three-role model. No individual names.
- No invented metrics — the project has no outcome measurements of any kind.
- No band vocabulary, no diversion or acreage caps, no fleet lease terms.

### Status

**No change has been made by this document.** Every recommendation above awaits a decision.
