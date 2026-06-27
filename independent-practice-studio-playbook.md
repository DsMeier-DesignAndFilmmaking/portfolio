# Independent Systems Design Practice — Studio Playbook

**Status:** Studio standard · **Benchmark:** `Environmental Systems Design OS`
**Applies to:** Responsive Ecologies · Wayfinding Matrix · Adaptive Outdoor Hospitality Companion · The Intention Engine · all future independent systems-design projects.

> This playbook standardizes the **experience** of every independent practice page while leaving each project's **content, diagrams, and research** unique. When in doubt, build the page that parses, paces, and reads like the benchmark. Standardize the container; vary the cargo.

**How to use it:** Build to Parts 1–15. Before publishing, pass the [Portfolio Audit Rubric](portfolio-audit-rubric.md). Tokens in Appendix A are exact and copy-pasteable; do not invent new ones per project.

---

## 1 — Standard Page Architecture

Every page is a **single-scroll, statically-rendered narrative**. One `<main>`, one accent color, one continuous story.

**Fixed scaffold (identical on every project):**
- **Skip link** first in the DOM → jumps to `#<project>-hero`.
- **Sticky project header** — signature mark (home link) + practice-nav dropdown. Hides on scroll-down, reveals on scroll-up, always visible at top.
- **`PageNavIndicator`** — right-rail dot nav on desktop, driven by a `sectionNavigation` array of `{ id, label }`. Labels are **single words** ("Overview, Method, Flow, Studied…").
- **Canvas** — `min-h-screen overflow-x-hidden bg-white text-neutral-900`, plus `selection:bg-<accent>-200/50`.

**Content spine** — an ordered series of full-width `<section>` bands. Each band:
- has a stable `id` (matches the dot nav),
- runs the vertical rhythm `py-16 md:py-28`,
- wraps content in `container mx-auto px-6 md:px-8`,
- opens with the **one** shared section header (`SectionKicker`).

**Engineering pattern (this codebase):** keep `page.tsx` thin (~120–170 lines) — it only composes. Put project-specific pieces in a local `./components` folder and all copy in a local `./content.ts`. Separate *static* content from any *live* data fetch. Reuse shared primitives (tags, badges, meters) rather than re-styling.

**Macro shape, top to bottom:**
`Establishing zone (white)` → `Alternating body (white ↔ surface)` → `Authority band (dark)` → `Denouement (surface → white)` → `Cross-project footer (dark)`.

---

## 2 — Standard Section Hierarchy

The page follows an **8-beat narrative arc**, realized as a hero, ten numbered sections, and a footer. Each section serves exactly one beat and one idea.

| Order | Section (eyebrow) | Beat | Required? |
|---|---|---|---|
| — | **Hero** — claim + glance model | Claim | **Required** |
| `01 //` | What it is | Definition | **Required** |
| `02 //` | Architecture / How it works | Mechanism | **Required** |
| `03 //` | Studied systems / inputs | Evidence | Recommended |
| `04 //` | Registry (typed inventory) | Evidence | Optional* |
| `05 //` | Patterns / what was learned | Evidence | Recommended |
| `06 //` | Pipeline / what it produced | Output | **Required** |
| `07 //` | Traceability (claim → asset) | Output | Optional* |
| `08 //` | Operating principles (**dark**) | Governance | Recommended |
| `09 //` | Evidence boundary (is / isn't) | Honesty | **Required** |
| `10 //` | Explore / CTA | Invitation | **Required** |
| — | Cross-project footer (**dark**) | Invitation | **Required** |

\* *Include a table only when the project genuinely has a typed inventory. Never pad a registry to look rigorous.*

**Rules:**
- **One `<h1>`** (hero) for the whole page. Section titles are `<h2>`; card titles `<h3>`.
- **Number every section `0N //`** and mirror it in the dot nav.
- **Each section = one idea.** If a section makes two arguments, split it.
- **Minimum viable page** = Hero + Definition + Mechanism + one Evidence + Output + Evidence Boundary + CTA (7 bands).

---

## 3 — Recommended Content Modules

**Card taxonomy — six reusable types. Do not invent a seventh without cause.**

| Card | Anatomy | Use for |
|---|---|---|
| **Numbered callout** | mono `0N` → serif title → sans body | 3-up concept breakdowns |
| **Entity card** | serif name → type tag → layer tags → relevance meter | orgs, patterns, projects |
| **Registry row** | mono headers → serif name → badge cells | typed inventories |
| **Principle card** (dark) | `NN /` → serif title → muted body | governance/frameworks |
| **Diagram node** | accent dot → `Layer 0N` → name → item list | flow/architecture |
| **Nav card** | relationship eyebrow → serif title → arrow | cross-links, CTAs |

**Section module library** — *size = recommended count; status = whether the standard expects it.*

| Module | Purpose | Size | Status |
|---|---|---|---|
| Hero (badges → H1 → italic deck → lede → glance rail) | claim + glance model | 1 + 4-step rail | **Required** |
| Definition | the idea in its own vocabulary | **3 callouts** | **Required** |
| Mechanism diagram + restatement | how it works | 4 nodes + 1 sentence | **Required** |
| Evidence base | proof the inputs are real | 3–6 entity cards | Recommended |
| Registry (table) | typed internal output | 5–8 rows | Optional |
| Patterns library | what was learned | **6 cards** | Recommended |
| Output / pipeline | what it shipped + links | 2–4 linked cards | **Required** |
| Traceability (table) | claim → asset lineage | 4–8 rows | Optional |
| Principles (dark) | credibility | **6 cards** | Recommended |
| Evidence boundary | honesty / trust | 2 cols × 4–5 | **Required** |
| Explore CTA | next action | 1 panel | **Required** |
| Cross-project footer (dark) | portfolio connective tissue | 4 cards | **Required** |

---

## 4 — Copywriting Guidelines

**The eyebrow formula:** `0N // Noun Phrase` — zero-padded number, double-slash, Title-Case noun phrase. Machine-coded, sequential, never a verb.

**Section titles are declarative sentences that end in a period.** They *assert*; they don't *label*.
- ✅ "The OS maintains a registry of reusable system artifacts."
- ✅ "What the OS has produced."
- ❌ "Our Artifacts" · ❌ "System Registry"

**Define by negation.** Use "not X / but Y" to pre-empt the reader's likely misreading.
- "Not a project. The engine behind the projects."
- "typed, evidenced design components — **not** one-off illustrations."

**Em-dash appositive** is the house move for making an abstraction concrete: *"A scenario is not a narrative example — it is a repeatable test."*

| Rule | Standard |
|---|---|
| Section intro length | **1–3 sentences, ≤60 words.** Never more. |
| Card body length | ≤40 words |
| Line measure | headlines ≤ `max-w-3xl`; body/intro ≤ `max-w-2xl` |
| Tense / person | present tense, third person ("The system…") |
| Voice | confident, declarative, **zero** marketing adjectives or hedging |
| Concreteness | anchor every abstraction with a proper noun or number |

**Three-voice typography (mandatory):** serif (`font-tiempos`) = names & ideas · sans = explanation · mono = data, labels, numbers. Write each line to fit the voice it sits in.

---

## 5 — Visual Communication Guidelines

- **Radius = importance.** Hero objects / diagrams / CTA panels `rounded-[2rem]`; standard cards `rounded-2xl`; inner chips `rounded-xl`.
- **Number-first cards.** Mono numeral (accent) → serif title → sans body, top to bottom, every time.
- **Tables for registries, cards for entities.** Dense scannable data → mono-header tables; richer items → cards with tags + meters.
- **One accent color per page.** Every other color must be **semantic**, never decorative.
- **Fixed semantic palette:** Human = rose · Spatial = sky · Operational = amber · Digital = violet · Ecological = emerald. Confidence: validated/high = emerald, research/medium = amber, hypothesis/low = rose, unknown = neutral.
- **Motion means navigation.** Reserve the `hover:-translate-y-1` + shadow lift for cards that actually link somewhere.
- **Two-column compare** for trade-offs / boundaries: emerald + ✓ vs. neutral + ✗.
- **Background cadence:** white ↔ `neutral-50` through the body; `neutral-950` reserved for authority bands (principles, footer).

---

## 6 — Diagram Placement Rules

1. **Exactly one hero mechanism diagram per page**, placed at **beat 3 (Mechanism / `02 //`)** — after the Definition, before the Evidence. It is the page's single most important visual object.
2. **Nodes are labeled cards, not abstract shapes.** Fill them with the project's *real* content (actual artifacts, real stages), never lorem or icons alone.
3. **Flow is always explicit:** left→right on desktop with directional arrows; stacked nodes + an arrow breadcrumb on mobile.
4. **Always restate the diagram as one plain sentence** immediately below it (the dark "canonical path" strip). Visual + sentence = no reader left behind.
5. **Color-code stages** to show progression (e.g., neutral → sky → amber → emerald).
6. **Secondary diagrams** (inside Framework/Research) are allowed but must follow the same *node + one-sentence restatement* rule, and must be visually lighter than the hero diagram.
7. **Never stack two heavy diagrams adjacently.** Separate them with a copy or card module so the reader can breathe.

---

## 7 — Framework Presentation Rules

- **Present frameworks as named, numbered components/principles** — a grid of cards, each `NN /` + serif title + ≤2-sentence body.
- **Put the governing framework on the dark band** (`neutral-950`). Dark signals authority and separates "the rules" from "the evidence." The canonical pattern is **6 numbered principle cards on dark**.
- **Provenance before application.** Show where the framework *came from* (which research/patterns produced it) before showing what it *powers*. Frameworks must be traceable to evidence — never asserted from nowhere.
- **Frameworks precede their applications** in reading order. Define the model, then list what it generated (linked output cards).
- **One framework per page gets the spotlight.** Supporting models are presented as cards or table rows, not as competing hero objects.

---

## 8 — Research Presentation Guidelines

- **Research appears as labeled evidence, not anecdote.** Every claim carries a **confidence label** (validated / research-supported / hypothesis) and, where typed, an **artifact type** and **maturity**.
- **Studied entities** → entity cards with a **relevance meter** and **system-layer tags**.
- **Curated, not exhaustive.** Show only the portfolio-ready slice; link to the working source ("Full registry in the working OS") for the rest. The page is a *selected public translation*, not a data dump.
- **Empty states explain, never blank.** If a section has no data yet, say what *would* live there and link onward.
- **An explicit Evidence Boundary is required** — two columns: **Established** (✓) and **Not claimed** (✗). Under-claim on purpose; bounded claims read as rigor and are the page's core trust mechanism.

---

## 9 — Mobile UX Guidelines

- **Single column.** All multi-column grids collapse to one column; the hero side-rail stacks beneath the lede.
- **Diagram → vertical.** Nodes stack with an `Inputs → … → Outputs` arrow breadcrumb; horizontal connectors hide.
- **Tables → stacked rows.** Hide the `lg:grid` header row; each row reflows to label/value pairs.
- **Header behavior:** hide on scroll-down, reveal on scroll-up; collapse to a hamburger; the dot nav reduces to dots.
- **Type steps down:** hero `text-4xl` (not `6xl`), titles `text-3xl`. Keep `max-w-*` so copy never runs edge-to-edge.
- **Rhythm tightens:** `py-16` on mobile (from `md:py-28`). Gutters stay `px-6`.
- **Tap targets ≥ 44px.** All nav controls and links meet the minimum.

---

## 10 — Accessibility Guidelines

Non-negotiable. Every project ships with all of these:

- **Skip link** as the first focusable element → main content.
- **Heading order:** one `<h1>`, sections `<h2>`, cards `<h3>`. No skipped levels.
- **Color is never the only signal.** Pair every semantic color with text or an icon (✓/✗ with labels, confidence badges carry their word, meters carry "N/5").
- **`aria-hidden`** on all decorative icons, dots, arrows, and connectors.
- **`focus-visible:ring-<accent>`** on every interactive element; visible focus, never `outline-none` alone.
- **Reduced motion honored:** `motion-reduce:*` utilities and `MotionConfig reducedMotion="user"`; reduced-motion CSS guard on the root.
- **Meaningful link text** ("View project", not "click here"); `aria-label` on icon-only controls; `alt` on every image.
- **Contrast floors:** body `text-neutral-600` on white, `text-neutral-400` on dark — do not go lighter for body copy.

---

## 11 — Progressive Disclosure Strategy

The page reveals complexity in four widening steps so the reader is never ahead of their understanding:

1. **Glance** — hero side-rail shows the spine as 4 chips (`A → B → C → D`).
2. **Sentence** — Definition expands each step into one line (3 callouts).
3. **System** — Mechanism explodes the spine into a labeled diagram.
4. **Populated** — Evidence/Output sections fill the same structure with real data.

Supporting tactics: **summary before detail** in every module (intro precedes the grid); **density gradient** (light cards early, dense tables late); **curated-with-link-to-full** instead of dumping; **secondary table columns hidden on mobile**. Teach the model once; re-encounter it everywhere.

---

## 12 — Recommended Page-Length Strategy

- **Target:** Hero + ~10 numbered sections + footer (~12 bands); roughly **8–12 screens** of scroll.
- **Ceiling:** ~12 content sections. If you need more, you're probably packing two projects — split or cut.
- **Floor:** 7 bands (the minimum-viable set in Part 2).
- **Word budget:** intros ≤60 words; card bodies ≤40 words; total body copy stays modest — visuals carry the load.
- **One idea per section, one section per beat.** Length comes from *evidence breadth*, not from longer prose.

---

## 13 — Rules for Balancing Copy and Visuals

- **Ratio: ~1 short paragraph : 1 structured visual** per section (≈30% copy / 70% structured visual by area).
- **Copy sets up; the visual delivers.** Copy stops immediately after the `SectionKicker` intro.
- **Never narrate what the visual already shows.** If the diagram says it, the paragraph doesn't repeat it.
- **Every abstract claim earns a concrete visual within the same section** — no orphan abstractions.
- **If a section is all copy, it's a draft.** Convert the payload into cards, a table, or a diagram.

---

## 14 — Introducing Systems Thinking Without Overwhelming

- **Name the spine as a simple transformation chain** (`A → B → C`) and reuse it as the page's through-line at every zoom level.
- **One new term at a time,** each in its own card, each with a single em-dash definition.
- **Use a fixed vocabulary with fixed colors** (the system-layer palette) so the reader learns the language once.
- **Show, then label** — the visual first, the terminology second.
- **Bound the claims.** The Evidence Boundary tells readers what they *don't* have to accept, which lowers defensive load.
- **Numbered sections are scaffolding** — they tell the reader how big the system is and where they are inside it.
- **Anchor every abstraction** with a concrete proper noun or number. No jargon stacks.

---

## 15 — Reusable Wireframe (Preferred Page Flow)

```
┌─────────────────────────────────────────────────────────────┐
│  ▣ signature              Work ▾                   (sticky)  │  Project header
├─────────────────────────────────────────────────────────────┤
│  ◆ breadcrumb                                            •   │
│  [Category] [● Active]                                   •   │  HERO — Claim
│  H1  Project Name                                        •   │  (white)
│  — italic one-line deck —                                •   │      • = dot nav
│  Lede (≤ max-w-2xl) ................   ┌───────────┐     •   │
│                                        │ 01 ▸ glance│         │   side rail =
│                                        │ 02 ▸ model │         │   glance model
│                                        │ 03 ▸  ...  │         │
│                                        └───────────┘         │
├─────────────────────────────────────────────────────────────┤
│  ⬤ 01 // WHAT IT IS                              (white)     │  DEFINITION
│  H2 declarative title.   intro ≤3 sentences                 │
│  ┌────────┐  ┌────────┐  ┌────────┐                          │  3 callouts
│  │01 A→B  │  │02 B→C  │  │03 C→D  │                          │
│  └────────┘  └────────┘  └────────┘                          │
├─────────────────────────────────────────────────────────────┤
│  ⬤ 02 // ARCHITECTURE                          (surface)     │  MECHANISM
│  H2 title.  intro.                                          │  full-width
│  ┌─────┐ → ┌─────┐ → ┌─────┐ → ┌─────┐                       │  diagram
│  │Input│   │Synth│   │Artif│   │Outpt│                       │
│  └─────┘   └─────┘   └─────┘   └─────┘                       │
│  ▓▓ canonical path restated in ONE sentence ▓▓ (dark strip) │
├─────────────────────────────────────────────────────────────┤
│  ⬤ 03 // STUDIED SYSTEMS         (white)   entity cards 2–3up│  EVIDENCE
├─────────────────────────────────────────────────────────────┤
│  ⬤ 04 // REGISTRY               (surface)  table            │  EVIDENCE
├─────────────────────────────────────────────────────────────┤
│  ⬤ 05 // PATTERNS                (white)   6 cards          │  EVIDENCE
├─────────────────────────────────────────────────────────────┤
│  ⬤ 06 // PIPELINE / OUTPUT      (surface)  linked cards     │  OUTPUT
├─────────────────────────────────────────────────────────────┤
│  ⬤ 07 // TRACEABILITY            (white)   table            │  OUTPUT
├═════════════════════════════════════════════════════════════┤
│  ⬤ 08 // OPERATING PRINCIPLES    (DARK)    6 numbered cards  │  GOVERNANCE
├─────────────────────────────────────────────────────────────┤
│  ⬤ 09 // EVIDENCE BOUNDARY      (surface)  ✓ Established | ✗ │  HONESTY
├─────────────────────────────────────────────────────────────┤
│  ⬤ 10 // EXPLORE                 (white)   centered CTA panel│  INVITATION
├═════════════════════════════════════════════════════════════┤
│  CROSS-PROJECT FOOTER            (DARK)    4 nav cards       │  INVITATION
└─────────────────────────────────────────────────────────────┘
```

---

## Appendix A — Token Reference (exact)

| Token | Value |
|---|---|
| Content bounds | `container mx-auto px-6 md:px-8` |
| Section rhythm | `py-16 md:py-28` (dark footer may use `md:py-24`) |
| Header → body gap | `mb-10 md:mb-14` (header `max-w-3xl`) |
| Card | `rounded-2xl p-6 md:p-8`, `border border-neutral-200`, `shadow-sm` |
| Hero / diagram / CTA | `rounded-[2rem]` |
| Inner chip | `rounded-xl px-3 py-2.5` |
| H1 | `font-tiempos text-4xl md:text-6xl font-bold leading-tight` |
| Hero deck | `font-tiempos text-xl md:text-2xl italic text-gray-500` |
| Hero lede | `text-lg md:text-xl leading-relaxed text-neutral-600 max-w-2xl` |
| H2 | `font-tiempos text-3xl md:text-5xl font-bold leading-[1.05]` |
| Section intro | `text-base md:text-lg leading-relaxed text-neutral-600 max-w-2xl` |
| H3 (card) | `font-tiempos text-xl/2xl font-bold leading-tight` |
| Card body | `text-sm leading-relaxed text-neutral-600` |
| Eyebrow | `text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400` |
| Mono label | `font-mono text-[9px]/[10px] font-black uppercase tracking-[0.2em]` |
| Canvas | `bg-white text-neutral-900` + `selection:bg-<accent>-200/50` |
| Background cadence | white ↔ `neutral-50`; authority = `neutral-950`; hairline `border-t border-neutral-100` |
| Accent | one per project (benchmark: amber `500/600/700`, `300` on dark) |

## Appendix B — Page Scaffold (this codebase)

```
app/projects/<slug>/
  page.tsx            // thin: composes sections, fetches any live data
  layout.tsx          // metadata
  content.ts          // ALL copy + sectionNavigation[] + typed content arrays
  ProjectHeader.tsx   // sticky header (signature + practice nav)
  components/
    SectionKicker.tsx // the ONE shared section header
    primitives.tsx    // Tag, LayerTags, RelevanceMeter, ConfidenceBadge, Placeholder
    <Mechanism>Diagram.tsx
    LiveSections.tsx / StaticSections.tsx
```

## Appendix C — Pre-Publish Gate

Do not publish until the project passes the [Portfolio Audit Rubric](portfolio-audit-rubric.md):
**every category ≥ 7/10**, all **Required** modules present, and the **Accessibility** checklist fully green.
