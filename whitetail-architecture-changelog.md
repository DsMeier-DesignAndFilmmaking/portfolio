# Whitetail Architecture Page — Change Log & Revised Markdown

> Scope: `/projects/whitetail-club/architecture` only (tab 2 of 4).
> Source of record: `docs/whitetail/` — frozen, not edited.
> Status: implemented and verified.
> Date: 2026-08-29

---

## Part 1 — Change Log

### Summary

| File | Change | Lines |
|---|---|---|
| `app/projects/whitetail-club/architecture/page.tsx` | Modified — framing prose, section labels, two component insertions | +54 / −22 |
| `app/projects/whitetail-club/content.ts` | Modified — new exports, governance rule, three scrollspy labels | +97 / −3 |
| `app/projects/whitetail-club/components/SystemsStack.tsx` | **New** — `SystemsStack` + `BoundaryStrip` | +76 |

**Facts preserved — attested.** The only deletions in `content.ts` are three scrollspy label
strings. `loopNodes`, `loopAnnotations`, `confidenceBands`, `answerValueMap`, `evidenceBoundary`,
`reviewFindings`, `contextPoints`, `insufficientRows`, `practicePoints`, `HERO`, `THESIS`,
`GUARDRAIL`, and `INDEPENDENT_DISCLAIMER` are byte-identical.

**Hierarchy preserved.** Section numbering (`03/04/05`), section ids (`wt-system`, `wt-epistemic`,
`wt-interaction`), and document order are unchanged. The site's continuous `01…11` sequence across
all four tabs still holds. Inbound anchors and the scrollspy contract survive.

**Scope held.** No other tab was touched. `content.ts` is shared across all four tabs, but the only
edits to it are additive exports plus the three Architecture-tab labels.

---

### Section 03 — `System Architecture` → `Stewardship Architecture`

**C-01 · Eyebrow renamed.** `03 // System Architecture` → `03 // Stewardship Architecture`.
*Why:* "System Architecture" names a document type. "Stewardship Architecture" names what the
system is for.

**C-02 · Heading replaced.**
> **Before:** "One loop, and three annotations that carry it."
> **After:** "Five systems share one landscape, one crew, and one season."

*Why:* the old heading described the diagram beneath it. The new one states the operating condition
that makes the diagram necessary.

**C-03 · Standfirst replaced — the largest single reduction in abstract language.**
> **Before:** "A place becomes a condition, a condition informs a decision, a decision issues work,
> the work produces an observation — and the observation returns as the context on the next decision
> at that place."
>
> **After (¶1):** "A property like this is not one operation. Turf agronomy, crew sequencing,
> irrigation and drainage, the field encounter itself, and the memory that has to outlast the season
> are five different kinds of judgment — and they all resolve on the same ground, inside the same
> four-to-five-month window."
>
> **After (¶2):** "What connects them is not a dashboard. It is a single record of place: a condition
> is observed, a decision is made and its reasoning kept, work is issued, and what the crew found
> comes back as the context on the next decision at that same place. Strip the reasoning out and
> this is a work-order system."

*Why:* the original was a closed grammatical loop with no operational referent — a diagram caption
promoted to a thesis. The replacement establishes the plurality first, which is what makes a single
shared record non-trivial. The loop's logic is **retained in full** in ¶2; it now arrives as the
answer to a stated problem rather than as an opening assertion.

**C-04 · `SystemsStack` inserted above `LoopDiagram`.** Five records introducing Experience,
Stewardship, Operations, Infrastructure, and Intelligence Systems. `LoopDiagram` is unchanged and
now sits beneath them, wrapped in `mt-8 md:mt-10`.
*Why:* the five systems are the page's new spine; the loop is what carries them.

**C-05 · Figure 01 caption — opening clause reframed.**
> **Before:** "The loop above is only an argument until something records into it."
> **After:** "The loop above is only an argument until a crew member records into it, gloves on,
> between jobs."

*Why:* "something records into it" is agentless. All four factual claims in the caption — identical
answer weight, no default, no separate submit control, built as working code — are **unchanged**.

**C-06 · `BoundaryStrip` added after the figure.** New block: *"What this architecture does not
cover"* — four operating domains named as deliberately absent, each with its reason.
*Why:* this is the single largest credibility gain on the page. A reader from a resort grounds
operation will look for snow clearing and lighting; previously they found nothing, not even a
refusal. Stating the boundary is the case study's own "refusal is a design act" argument applied to
itself.

---

### Section 04 — `Epistemic Architecture` → `Intelligence Systems`

**C-07 · Eyebrow renamed.** `04 // Epistemic Architecture` → `04 // Intelligence Systems`.
*Why:* the only section title on the site using a philosophy term.

**C-08 · Heading unchanged.** "Confidence appears as a reason, never as a score." Already
operational; it stays.

**C-09 · Standfirst restructured — abstract claim demoted, not deleted.**
> **Before:** "A number invites comparison and hides its derivation. A sentence does neither. Render
> a band name as a chip and it becomes a score by social convention — people start saying 'it's an
> amber one,' and the ranking returns through language even with no number present."
>
> **After (¶1, new):** "A superintendent holding a forty-eight-hour fungicide window before dawn does
> not need a number attached to the moisture reading. They need to know who last stood there, when,
> and whether anything since then disagrees. That is a sentence, not a score."
>
> **After (¶2, retained):** "A number hides its derivation and invites comparison across places that
> were never measured the same way. Render a band name as a chip and it becomes a score by social
> convention — people start saying 'it's an amber one,' and the ranking returns through language
> with no number present."

*Why:* the original claim is true and well-written, but it arrived before any reader knew who was
holding the number or why it mattered. A named operating moment now precedes it. The abstract
argument is preserved in full, one paragraph later, where it is earned.

**C-10 · Table closer — one grounding clause added.**
> **Before:** "Lists sort by time-to-close — a real magnitude — never by confidence…"
> **After:** "Lists sort by time-to-close — a real magnitude, and the one an irrigation blowout or a
> closing spray window actually runs on — never by confidence…"

*Why:* "a real magnitude" was asserted without an instance.

**Confidence table: untouched.** All five rows, both columns, verbatim.

---

### Section 05 — `Interaction Architecture` → `Experience Systems`

**C-11 · Eyebrow renamed.** `05 // Interaction Architecture` → `05 // Experience Systems`.

**C-12 · Heading unchanged.** "Four surfaces, and the answers that had to stay peers."

**C-13 · Standfirst expanded — principle now follows the artifact.**
> **Before:** "Place, Capture, Decision, Attention. The field question is 'what did you find?' —
> never 'did you complete this?' A completion question makes absence a sub-case of failure; a
> finding question makes it one of four answers."
>
> **After (¶1):** "Place, Capture, Decision, Attention. Four surfaces, no fifth, because a crew
> member standing at a valve box in flat light is running one errand, not navigating a product."
>
> **After (¶2):** "The field question is 'what did you find?' — never 'did you complete this?' A
> valve that isn't where the old drawing puts it, an inlet nobody can locate under spring debris: a
> completion question files all of it under failure. A finding question makes it one of four answers
> — and absence is the answer this landscape most needs recorded."

*Why:* the four-surface list was a bare enumeration and the completion/finding principle was stated
without the artifact it is about. Both now carry a field case. The distinction itself is unchanged.

**Layer map: untouched.** Four peer answers, five stored values, branch on row four.

---

### Shared file — `content.ts`

**C-14 · `stewardshipSystems` added** — five records, each `{ name, domain, body, holds }`. Every
operating detail is attested `[SRC]` in `docs/whitetail/`. Two `holds` lines carry an explicit
negation — `no individual is modeled` (Operations) and `no sensors, no telemetry, no network model`
(Infrastructure) — stated where a reader is most likely to assume otherwise.

**C-15 · `architectureBoundary` added** — four refusals with reasons.

**C-16 · Governance rule 5 added** to the file header comment, recording which operating domains are
attested, which are boundary-only, and which figures must never be printed. *Why:* prevents a future
editor from reintroducing lighting, trail, or member-property claims.

**C-17 · `architectureSections` relabelled** — `System / Epistemic / Answers` →
`Systems / Intelligence / Experience`. Ids and order unchanged, so the scrollspy still tracks
document order. **These three strings are the only deletions in the file.**

---

### New component — `SystemsStack.tsx`

**C-18 · `SystemsStack`** — the five systems as a semantic `<ol>`, two-up on desktop with the fifth
spanning full width, stacking to one column on mobile.

**C-19 · `BoundaryStrip`** — the four refusals as a `<dl>`, in the amber-bordered treatment
`LoopDiagram` already uses for its annotations.

Both reuse the existing card idiom exactly — same radii, borders, mono eyebrow, `font-tiempos` name,
amber accent. **No new design tokens.**

---

### Deliberately unchanged

| Item | Reason |
|---|---|
| Visual design | Unauthorized under the Phase 12/13 entry criteria; `16-tw12-resolution.md` §7.1 |
| Section numbering `03/04/05` | The site runs one continuous `01…11` sequence across four tabs |
| Section ids | Inbound anchors and the scrollspy contract |
| `LoopDiagram`, `LayerMap`, `Figure`, `SectionKicker` | Components untouched |
| Overview, Stress Testing, Resulting Surfaces tabs | Out of scope |

### Constraints observed

- **No role-sourced credibility.** The page names no author role, and carries no "I worked with /
  was hired by / conducted field research at" construction. Grounding is domain-level throughout:
  the operational realities of resort landscape management, not a job title. Verified by grep.
- **Attested domains only** — turf agronomy, irrigation, drainage, crew coordination, the
  winterization sequence, snow storage. Equipment enters only as crew capacity.
- **Four domains are boundary, not claim** — snow clearing as scheduled labor, pathway/trail
  networks, exterior lighting, member property maintenance.
- **Never printed** — diversion or acreage caps (a legal limit is not a measurement), fleet lease
  terms (commercially sensitive), or the five internal confidence-band names (tripwire TW-1).

---

## Part 2 — Revised Markdown

> The complete Architecture page as readable markdown. Blocks marked *preserved* are carried over
> unchanged from before the revision.

---

# Architecture

*Whitetail Club & Shore Lodge — Stewardship Intelligence System. Section 2 of 4.*

## 03 // Stewardship Architecture

### Five systems share one landscape, one crew, and one season.

A property like this is not one operation. Turf agronomy, crew sequencing, irrigation and drainage,
the field encounter itself, and the memory that has to outlast the season are five different kinds
of judgment — and they all resolve on the same ground, inside the same four-to-five-month window.

What connects them is not a dashboard. It is a single record of place: a condition is observed, a
decision is made and its reasoning kept, work is issued, and what the crew found comes back as the
context on the next decision at that same place. Strip the reasoning out and this is a work-order
system.

#### 01 · The field encounter — **Experience Systems**

What a person meets while standing on the place, in the minutes they have before the next job.
Designed for a gloved hand, flat morning light, and a crew that is bilingual by requirement — so the
surface answers "what is here and what has already been tried," and asks one question back.

`Place · Capture`

#### 02 · Turf, forest buffer, shoreline — **Stewardship Systems**

The agronomic judgment that has to be right the first time. A fall snow-mold application has roughly
forty-eight hours; erosion compounds while mowing does not. These calls are made on handheld
readings and a walk, which is why every condition carries how it came to be known.

`Condition · Observation`

#### 03 · Crew hours, turnover, equipment availability — **Operations Systems**

Golf, parks, and janitorial work under one grounds hierarchy across a compressed four-to-five-month
window. More necessary work than available crew-hours is the normal state of a shoulder season, and
a leased fleet under contractual usage ceilings with a mechanic absorbed by reactive repair sets the
real ceiling on what a day can hold.

`Decision · Task — capacity only; no individual is modeled`

#### 04 · Irrigation, drainage, snow storage, winterization — **Infrastructure Systems**

The continuous physical systems underneath the landscape. Irrigation blowout has a point past which
mainlines crack. Spring runoff moves through historic ditches whose paths are poorly documented and
past buried utilities with incomplete as-builts, and it is cleared of ice and debris by hand. Snow
storage and emergency access are designated before the ground closes.

`Place, by regime — no sensors, no telemetry, no network model`

#### 05 · What the operation knows, and how well — **Intelligence Systems**

The layer that survives the season. Seasonal turnover resets the undocumented knowledge of this
landscape to zero on a schedule, and the reasoning behind a decision is the artifact that does not
exist in this operation today. Every other system above deposits into this one or reads from it.

`Knowledge record · Decision reasoning`

> Five systems, one landscape, one record. They are not five products — they are five kinds of
> judgment that have to survive the same crew change, and the loop below is what carries them.

### The loop *(preserved)*

**01 Place** — located
→ **02 Condition** — and how it is known
→ **03 Decision** — and why it was made
→ **04 Action** — what was done
→ **05 Observation** — what was found

The loop closes: what an observation records becomes the context on the next decision at that place.
Three annotations carry the whole argument — strip them and this is a work-order system.

- **Place** — "Located" is the root requirement. Anything that cannot be addressed cannot carry a
  history.
- **Condition** — "How it is known" is the provenance. Without it, an assumption and a measurement
  look identical.
- **Decision** — "Why it was made" is the artifact that does not exist in this operation today — and
  the one that lets judgment compound.

### Figure 01 — Capture surface

*Capture wireframe showing one question, "What did you find?", above four equally weighted answer
buttons: Found it; Found the place — couldn't tell; Found something different; Not there.*

The loop above is only an argument until a crew member records into it, gloves on, between jobs.
This is the surface that closes it — the Observation step, drawn. All four answers carry identical
weight, and none is a default. There is no separate submit control — answering *is* completing. This
is also the surface on which the project's hardest finding later surfaced, because it was built as
working code rather than a picture.

### What this architecture does not cover

A resort grounds operation is larger than the five systems above. Four domains a reader will
reasonably expect are absent, and each is absent for a stated reason rather than an unstated one.

**Snow clearing as scheduled labor** — Snow storage is modeled as a place and winterization as a
window, because both are attested. Plow routes, clearing crews, and priority orders are not, so they
are not designed.

**Pathway and trail networks** — Paths and roads exist here only as located segments. A recreational
trail network appeared in an earlier draft of this work and was removed as untraceable to any source
— designing around one would have made the case study dishonest.

**Exterior lighting** — Absent from the research at every tier. Adding it would be invention, and
invention is the specific failure this project was built to resist.

**Member property maintenance** — Residential landscape sits inside the same operation, but
homeowner-facing service carries a different duty of care and a different product. Out of scope by
decision, not by oversight.

---

## 04 // Intelligence Systems

### Confidence appears as a reason, never as a score.

A superintendent holding a forty-eight-hour fungicide window before dawn does not need a number
attached to the moisture reading. They need to know who last stood there, when, and whether anything
since then disagrees. That is a sentence, not a score.

A number hides its derivation and invites comparison across places that were never measured the same
way. Render a band name as a chip and it becomes a score by social convention — people start saying
"it's an amber one," and the ranking returns through language with no number present.

#### *(preserved — all five rows verbatim)*

| What is true | What the interface says |
|---|---|
| Someone saw or measured this recently, and nothing disagrees | "Checked this morning." |
| Checked, but long enough ago that it may have moved on | "Last looked at nine days ago; drainage changes in about a week." |
| Nobody has ever checked. It came from a record | "This is from the old drawing. Nobody's confirmed it." |
| Two people saw different things, close enough in time that both can't be right | "Two of us disagreed on Tuesday. Too close together to be change." |
| We tried to settle this and could not | "Searched it in October. Didn't find it." |

The internal vocabulary behind these sentences never reaches the interface. Lists sort by
time-to-close — a real magnitude, and the one an irrigation blowout or a closing spray window
actually runs on — never by confidence, because sorting five explanations converts them into a
scale.

---

## 05 // Experience Systems

### Four surfaces, and the answers that had to stay peers.

Place, Capture, Decision, Attention. Four surfaces, no fifth, because a crew member standing at a
valve box in flat light is running one errand, not navigating a product.

The field question is "what did you find?" — never "did you complete this?" A valve that isn't where
the old drawing puts it, an inlet nobody can locate under spring debris: a completion question files
all of it under failure. A finding question makes it one of four answers — and absence is the answer
this landscape most needs recorded.

#### *(preserved)*

| Interaction layer — four peer answers | Storage layer — five outcome values |
|---|---|
| Found it | `confirmed` |
| Found the place — couldn't tell | `inconclusive` |
| Found something different | `contradicted` |
| Not there | ↳ `absent · absent-at-described-location` |

Four answers. Five stored values. The fourth answer branches through one follow-up question, because
"I confirmed it isn't there" and "I couldn't find it" are epistemically opposite — one raises
confidence, the other suppresses it. Collapsing them would make the confidence model uncomputable.
