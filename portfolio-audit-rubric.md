# Portfolio Audit Rubric — Independent Systems Design Projects

**Benchmark:** `Environmental Systems Design OS` (defines the 9–10 anchor).
**Companion to:** [Independent Practice Studio Playbook](independent-practice-studio-playbook.md).
**Mandate:** Every independent systems-design project is scored against these 13 categories **before publishing**. This is the standard review gate, not an optional pass.

---

## How to Score

| Band | Meaning |
|---|---|
| **9–10** | Matches the benchmark. Exemplary; ship it. |
| **7–8** | Solid; minor, isolated gaps. Publishable. |
| **4–6** | Functional but inconsistent. **Fix before publishing.** |
| **1–3** | Fails the standard. Do not publish. |

**Publish gate (all must be true):**
1. **Every category ≥ 7.**
2. All **Required** modules present (Hero, Definition, Mechanism + diagram, Output, Evidence Boundary, CTA, Footer).
3. **Accessibility ≥ 8** (hard floor — a11y is never traded away).
4. Total **≥ 100 / 130**.

Record scores in the [scorecard](#scorecard) at the bottom.

---

## 1 — Narrative Clarity
**Purpose:** The reader understands what the project *is* and why it matters within the first screen, and the story builds in the order their questions form.

**Evaluation criteria**
- Hero states the claim in one breath + a "not X, but Y" reframe.
- Sections follow the 8-beat arc (Claim → Definition → Mechanism → Evidence → Output → Governance → Honesty → Invitation).
- Each section answers the next question the reader would ask.
- One idea per section; no section argues two things.

**Common failure modes:** burying the thesis below the fold; jumping to evidence before defining the model; sections that re-explain prior sections; a hero that describes process instead of the claim.

**Recommended improvements:** lead with the one-line claim + reframe; insert a Definition beat before any data; cut or merge redundant sections; rewrite the hero deck as a single declarative line.

**Benchmark:** 10 — `Score: __/10`

---

## 2 — Visual Hierarchy
**Purpose:** The eye always knows what is most important and how each element relates to the next.

**Evaluation criteria**
- Radius ladder honored (hero/diagram `2rem` > cards `2xl` > chips `xl`).
- Number-first card anatomy (mono numeral → serif title → sans body).
- One accent color; all other color is semantic.
- Consistent shadow/border treatment; hover-lift only on navigable cards.

**Common failure modes:** every element same weight; multiple competing accent colors; decorative color with no meaning; hero diagram styled like a normal card.

**Recommended improvements:** apply the radius ladder; collapse to one accent; map all color to the semantic palette; enlarge and elevate the single hero object.

**Benchmark:** 10 — `Score: __/10`

---

## 3 — Information Architecture
**Purpose:** The page is chunked into discrete, navigable, predictable rooms.

**Evaluation criteria**
- Numbered sections (`0N //`) with matching one-word dot-nav labels.
- One repeating section header (`SectionKicker`) — no bespoke headers.
- Background cadence (white ↔ surface; dark for authority) chunks the page.
- Correct heading order (single `h1` → `h2` → `h3`).

**Common failure modes:** unnumbered or inconsistently-headed sections; bespoke headers per section; flat single-background page with no chunking; skipped heading levels.

**Recommended improvements:** number everything and wire the dot nav; replace custom headers with `SectionKicker`; introduce the alternating cadence; fix the heading tree.

**Benchmark:** 10 — `Score: __/10`

---

## 4 — Systems Thinking Communication
**Purpose:** Complex systems ideas land without overwhelming a non-expert reader.

**Evaluation criteria**
- A single transformation spine (`A → B → C`) named early and reused throughout.
- The spine shown at increasing resolution (glance → sentence → system → populated).
- Fixed vocabulary with fixed colors (system-layer taxonomy).
- One new term at a time, each with a concrete definition.

**Common failure modes:** jargon stacks; introducing five concepts at once; a different mental model in every section; abstractions with no concrete anchor.

**Recommended improvements:** define one spine and repeat it; stage the reveal across four zoom levels; adopt the layer palette as shared vocabulary; anchor each term with a proper noun/number.

**Benchmark:** 10 — `Score: __/10`

---

## 5 — Diagram Quality
**Purpose:** The central diagram makes the mechanism instantly legible and approachable.

**Evaluation criteria**
- Exactly one hero mechanism diagram at beat 3 (`02 //`).
- Nodes are labeled cards with *real* content; flow arrows are explicit.
- Stages color-coded for progression.
- Diagram restated as one plain sentence directly beneath it.
- Degrades to stacked nodes + arrow breadcrumb on mobile.

**Common failure modes:** abstract blobs/icons with no labels; no directional flow; lorem/placeholder nodes; no plain-language restatement; diagram unreadable on mobile.

**Recommended improvements:** convert shapes to labeled cards; add arrows + stage colors; fill with real content; add the canonical-path restatement strip; build the mobile stack.

**Benchmark:** 9 — `Score: __/10`

---

## 6 — Copy Readability
**Purpose:** Copy is scannable, confident, and never the bottleneck.

**Evaluation criteria**
- Section titles are declarative sentences ending in a period.
- Intros ≤3 sentences / ≤60 words; card bodies ≤40 words.
- Line measure ≤ `max-w-2xl` (body) / `max-w-3xl` (headlines).
- Present tense, third person, zero marketing adjectives; three-voice type respected.

**Common failure modes:** label-style titles; multi-paragraph intros; full-width text lines; hedging or hype; mixing serif/sans/mono roles.

**Recommended improvements:** rewrite titles as assertions; cut intros to ≤3 sentences; constrain measure; strip adjectives; assign each line to its correct type voice.

**Benchmark:** 10 — `Score: __/10`

---

## 7 — Section Pacing
**Purpose:** The page breathes — consistent rhythm, no dense or empty stretches.

**Evaluation criteria**
- Uniform `py-16 md:py-28` section rhythm.
- ~1 paragraph : 1 visual per section.
- Density gradient: light cards early, dense tables late.
- No two heavy diagrams/tables stacked adjacently.

**Common failure modes:** inconsistent vertical spacing; wall-of-text sections; two registries back-to-back; front-loaded density that exhausts the reader.

**Recommended improvements:** normalize the rhythm token; convert prose to structured visuals; reorder for a density gradient; separate heavy modules with a lighter one.

**Benchmark:** 10 — `Score: __/10`

---

## 8 — Research Communication
**Purpose:** Research reads as credible, labeled evidence — not anecdote.

**Evaluation criteria**
- Claims carry confidence labels (validated / research-supported / hypothesis).
- Studied entities use relevance meters + layer tags.
- Curated, not exhaustive — links to the working source for the full registry.
- Empty states explain what would be there and link onward.

**Common failure modes:** unlabeled assertions; raw data dumps; no provenance; blank/empty sections with no explanation.

**Recommended improvements:** add confidence badges; tag and rate entities; curate to the portfolio-ready slice + link out; write explanatory empty states.

**Benchmark:** 10 — `Score: __/10`

---

## 9 — Framework Presentation
**Purpose:** The project's framework is presented with authority and traceability.

**Evaluation criteria**
- Framework shown as named, numbered cards (`NN /` + title + ≤2-sentence body).
- Governing framework on the dark authority band.
- Provenance shown before application; framework precedes its outputs.
- Framework is traceable to evidence, not asserted.

**Common failure modes:** framework buried in prose; no visual distinction for "the rules"; applications listed before the model is defined; framework with no evidentiary lineage.

**Recommended improvements:** convert to numbered principle cards; move to the dark band; reorder provenance → framework → applications; add the evidence trace.

**Benchmark:** 10 — `Score: __/10`

---

## 10 — Mobile UX
**Purpose:** The full narrative works on a phone, not just the desktop.

**Evaluation criteria**
- All grids collapse to one column; hero rail stacks under the lede.
- Diagram becomes stacked nodes + arrow breadcrumb.
- Tables reflow to label/value rows (desktop header hidden).
- Type steps down (`text-4xl` hero); tap targets ≥44px; no horizontal scroll.

**Common failure modes:** clipped diagrams; tables overflowing the viewport; oversized hero type; sub-44px controls; `overflow-x` bleed.

**Recommended improvements:** enforce single-column stacks; build the mobile diagram + table variants; step type down; audit tap targets; add `overflow-x-hidden`.

**Benchmark:** 9 — `Score: __/10`

---

## 11 — Accessibility *(hard floor ≥ 8)*
**Purpose:** The page is usable by everyone and passes a baseline a11y review.

**Evaluation criteria**
- Skip link; correct heading order; `aria-hidden` on decorative marks.
- `focus-visible` rings on all interactives; never `outline-none` alone.
- Reduced motion honored (`motion-reduce`, `MotionConfig`).
- Color never the sole signal; meaningful link text; image `alt`; contrast floors met.

**Common failure modes:** no skip link; decorative icons read by screen readers; invisible focus; motion ignored; color-only status; "click here" links.

**Recommended improvements:** add skip link + ARIA; restore focus rings; honor reduced motion; pair color with text/icon; rewrite link text; add alt.

**Benchmark:** 9 — `Score: __/10`

---

## 12 — Progressive Disclosure
**Purpose:** Complexity is revealed in widening steps; the reader is never ahead of their understanding.

**Evaluation criteria**
- Four-step reveal: glance → sentence → system → populated.
- Summary before detail in every module (intro precedes grid/table).
- Curated-with-link rather than full dump; secondary table columns hidden on mobile.
- Density increases down the page, not up front.

**Common failure modes:** dense registry before the model is taught; no summary before detail; everything shown at once; mobile tables exposing all columns.

**Recommended improvements:** stage the spine across four zooms; add module intros; curate + link; hide secondary columns on small screens.

**Benchmark:** 10 — `Score: __/10`

---

## 13 — Portfolio Differentiation
**Purpose:** The project is unmistakably part of the practice system, yet its content/diagrams/research are distinctly its own.

**Evaluation criteria**
- Shares the standard scaffold (header, dot nav, `SectionKicker`, token system, cadence).
- Unique accent within the shared palette logic; project-specific diagram and evidence.
- Connects back to siblings via the cross-project footer.
- Recognizably "the practice" at a glance, not a one-off template clone *or* a stylistic outlier.

**Common failure modes:** visually disconnected from the rest of the portfolio; OR an identical clone with swapped text and no unique content; missing cross-project links.

**Recommended improvements:** adopt the shared scaffold + tokens; invest in a project-specific mechanism diagram and real evidence; wire the cross-project footer; choose a distinct-but-systemic accent.

**Benchmark:** 10 — `Score: __/10`

---

## Scorecard

| # | Category | Weight | Benchmark | This project |
|---|---|---|---|---|
| 1 | Narrative clarity | ×1 | 10 | __/10 |
| 2 | Visual hierarchy | ×1 | 10 | __/10 |
| 3 | Information architecture | ×1 | 10 | __/10 |
| 4 | Systems thinking communication | ×1 | 10 | __/10 |
| 5 | Diagram quality | ×1 | 9 | __/10 |
| 6 | Copy readability | ×1 | 10 | __/10 |
| 7 | Section pacing | ×1 | 10 | __/10 |
| 8 | Research communication | ×1 | 10 | __/10 |
| 9 | Framework presentation | ×1 | 10 | __/10 |
| 10 | Mobile UX | ×1 | 9 | __/10 |
| 11 | Accessibility *(floor 8)* | ×1 | 9 | __/10 |
| 12 | Progressive disclosure | ×1 | 10 | __/10 |
| 13 | Portfolio differentiation | ×1 | 10 | __/10 |
| | **Total** | | **128 / 130** | **___ / 130** |

**Verdict:** ☐ Ship (≥100, all ≥7, a11y ≥8) ☐ Revise ☐ Do not publish

**Reviewer:** ____________  **Date:** ____________  **Project:** ____________
