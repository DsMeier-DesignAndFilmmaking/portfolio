# Practice Narrative Architecture

*The system that makes the whole practice read as one continuous story — designed before any page.*

> **What this is, and is not.** Two documents already audit the current site's narrative and prescribe page-level fixes:
> - `portfolio-narrative-architecture-audit.md` — the page-by-page narrative map, cross-links, redundancies, homepage arc, and page dispositions.
> - `research-practice-architecture-review.md` — the pipeline taxonomy, the lineage graph, and the navigation model.
>
> This document is the layer beneath both: the **page-independent narrative design** — the one story, the spine, the relationship grammar, and the six movements as reusable mechanisms. The two audits are the *implementation* of what is designed here. When this doc names a project, it is illustrating a mechanism, not prescribing a cross-link; for the cross-links and dispositions, go to the audits.

This is the narrative counterpart to the founding stack: it turns `practice-manifesto.md` (why), `practice-design-principles.md` (how we decide), and `practice-research-agenda.md` (what we investigate) into a story a visitor can walk through.

---

## The one story

A practice reads as one story only if it is, underneath, one sentence. This is that sentence:

> **This practice reads complex environments, turns what it observes into frameworks, tests those frameworks in concepts and builds, proves them in the field and in real client work, and offers them as ways to make decisions clearer.**

Every surface in the practice is a chapter of that one sentence. If a page cannot be located inside it, the page does not yet belong to the story. This is the practice-scale version of the **One Memory** rule (`editorial-design-philosophy.md`): the hero of each project holds one idea; the practice as a whole holds one sentence.

---

## The spine

The story has a spine — a sequence of *meaning states*, not pages, that the practice moves a visitor through:

```
Origin & Lens → Method → Framework → Application → Proof → Invitation
    (why I         (how I    (what I    (where it   (that it   (work with
     see this)      work)     found)     applies)    holds)      me)
```

Two design rules govern the spine:

1. **One spine, many entrances.** Most visitors will not start at the beginning — they arrive from search or a link, onto any node. The architecture must let someone enter at *Proof* (a client page) or *Application* (a concept) and still find their way back to the spine. Every surface therefore carries a **"You Are Here"**: what chapter this is, what it built on, what comes next. This is the single most important mechanic in the whole system — it is what converts a set of pages into a walk.

2. **Two reading speeds.** The spine must be legible as a one-line skim (the glance path) *and* as a deep immersion (drill into any chapter's artifacts). The visitor chooses altitude; the narrative never forces the long read to get the gist, and never hides the depth from the reader who wants it.

The emotional arc across the spine mirrors the per-page arc from the editorial philosophy, at practice scale:

> curiosity → orientation → credibility → conviction → possibility → contact.

---

## How visitors move

Design the movement, not the sitemap.

- **Every surface opens the next loop.** A page's job is not to conclude but to leave one clean, unanswered question that the next chapter resolves — the practice-scale version of the hero's open loop. Narrative momentum is a chain of small debts, each paid by the next page.
- **Depth is on demand, and it is the pacing.** Progressive disclosure is not a UI convenience here; it is how the story breathes. The spine is the calm; the artifacts are the density. (This is the same "calm before complexity" contract the heroes hold, applied to the whole practice.)
- **The default path is a recommendation, not a rail.** The architecture proposes a next step everywhere (the taxonomy's `nextRecommendedRoute` is the field that carries it) but never traps. A visitor who jumps sideways should still land somewhere that locates itself.
- **Client work and research are one path, not two.** The most common failure is presenting a "research portfolio" and a "client portfolio" as separate worlds. In this architecture they are the same spine at different chapters — research at *Framework/Application*, client work at *Proof*. They must link across, or the story splits in two.

---

## How projects relate — the relationship grammar

The two audits hard-code today's cross-links. This is the *grammar* underneath them, so that a project built next year joins the story without a new audit. Every project declares its edges in six relationship types:

| Relationship | Reads as | Example (illustrative only) |
|---|---|---|
| **Upstream / Downstream** | "draws on…" / "is delivered by…" | Field Notes → ESD OS → Architecture of Confidence |
| **Framework / Application** | "applies the model of…" | Architecture of Confidence → Wayfinding Matrix |
| **Source / Synthesis** | "is fused into…" | Adaptive Hospitality → Responsive Ecologies |
| **Concept / Proof** | "is validated by…" | Decision logic → McDonald's Kiosk |
| **Sibling** | "a peer application of the same framework" | Wayfinding ↔ Intention Engine |
| **Parent / Extract** | "a slice taken out of…" | Responsive Ecologies → Bounded Authority |

A project is fully "in the story" when it can name its **upstream**, its **downstream**, its **siblings**, and what **proves** it. New work becomes narrative simply by declaring these four edges. The lineage graph in `research-practice-architecture-review.md` is the current instantiation of this grammar; this table is the rule that generates it.

---

## How frameworks evolve

Frameworks are not a static library; the story shows them *maturing*. Design a visible maturation ladder every framework climbs:

```
Observed pattern → Named framework → Applied in a concept → Tested in a build/pilot → Validated by evidence → Offered as an instrument
```

Two narrative devices make evolution visible:

- **A maturity state on every framework.** The framework's page shows where it sits on the ladder, and the **Evidence Boundary** ("established / not claimed," Principle 11) moves rightward as proof accrues. A framework at *named* under-claims; a framework at *validated* has earned the claim. The honesty *is* the narrative — a visitor watches conviction being earned.
- **The same framework, seen at different maturities across the portfolio.** Architecture of Confidence appears as a mature keystone; the Signal Matrix appears as an emerging framework still embedded inside Wayfinding, waiting to be surfaced (per the architecture-review). Showing one framework at several life stages is what makes the practice feel like a living research program rather than a finished catalogue.

This answers "how frameworks evolve" as a designed lifecycle plus a display rule — not as a fixed list of frameworks.

---

## How client work validates research — the proof bridge

Client work is not a second portfolio. It is the **evidence layer** of the research story, and the architecture wires it as a two-way bridge:

- **Framework → proof:** each framework names the shipped work that demonstrates its pattern in the real world ("validated by…").
- **Proof → framework:** each client page names the framework it substantiates ("this proves…"), reframing past delivery as retroactive evidence.
- **Claim matched to proof (the honesty valve).** Client work proves "this pattern ships and holds under real constraints" — it does *not* prove the whole framework. The bridge must under-claim exactly this much (Principle 11), or it becomes the overclaim the practice's whole credibility habit is built to avoid.

The specific validation pairings already exist in both audits ("Purdue validates the audit→restructure→re-audit loop," "McDonald's validates decision logic"). The design contribution here is the *rule*: **no framework claims maturity without a named proof, and no client page sits outside the story — every one points to the research it validates.**

---

## How research generates future work — the generative loop

The spine looks linear but runs as a spiral. The mechanism:

> **Every project emits a residue — an unanswered question, a pattern that wants testing, a framework that wants a proof. That residue is the seed of the next project.**

So the architecture gives every surface a closing beat: **"what this opens."** That single element does double duty — it is the visitor's *read-next* and the practice's *build-next*, the same arrow pointing forward. The story a visitor follows and the pipeline the practice runs are literally the same line.

This is where the narrative and the research agenda fuse: the **white space** mapped per theme in `practice-research-agenda.md` is exactly the "what this opens" residue, made explicit. The narrative doesn't invent future work; it *surfaces the questions the finished work already raised* — the "work-emits-research" discipline of `research-practice-research-program.md`, told as a story.

---

## How services emerge naturally — the offer as terminus

A service should never read as a bolted-on sales page. In this architecture, **a service is a matured framework made available**, and it surfaces at the natural end of a proof chain.

- **The offer is earned, not announced.** When a visitor has walked Framework → Application → Proof, the invitation to engage ("run this as an audit / a sprint") is the obvious next step, not an interruption. The story has already made the case; the offer just names the door.
- **No offer without proof upstream (the structural guardrail).** A framework may graduate to a service *only* once client work or a pilot has validated it. This is the narrative architecture quietly enforcing the practice's red-team rule: the story is physically unable to sell what it has not yet proven. The "brain-rich, body-poor" failure is designed out — an unvalidated framework simply has no path to becoming an offer.

The live `/services` surface and the business-bridge recommendations in `portfolio-narrative-architecture-audit.md` are where this lands; the design principle is that services are *terminals of proof chains*, positioned by maturity, not a parallel marketing track.

---

## What makes it feel like one story — the continuity devices

Five cross-cutting mechanisms hold the story together regardless of which page a visitor is on:

1. **One name, one spine sentence, everywhere.** The identity must be singular (the audits flag four competing labels; resolving to one is prerequisite, not optional). The spine sentence at the top of this doc is the practice's through-line — it should be recognizable on every surface.
2. **The "You Are Here" locator on every surface** — chapter, upstream, downstream. The non-negotiable mechanic.
3. **A controlled, recurring vocabulary** — confidence, signal, recovery, authority, evidence boundary — used consistently so the *language itself* threads the chapters, but rationed (one specialized term per hero, per the UX-writing discipline) so it never curdles into jargon.
4. **The Evidence Boundary as a recurring beat.** Honesty about limits, repeated on every framework and proof, is itself a continuity device — the reader learns to trust the narrator because the narrator keeps marking the edges.
5. **Visual and editorial coherence** — handed off to `editorial-design-philosophy.md`, so every chapter *looks* authored by the same mind, not just structured by the same map.

---

## The order of operations

This is why the narrative architecture is designed *before* pages:

1. **Narrative architecture** (this document) — the one story, spine, grammar, and six loops.
2. **Taxonomy & lineage** (`research-practice-architecture-review.md`, `practice-taxonomy-audit.md`) — assign every project its chapter and its edges.
3. **Page-level narrative** (`portfolio-narrative-architecture-audit.md`) — the cross-links, "You Are Here" placements, and dispositions that implement the grammar.
4. **Pages** — built last, each one already knowing its chapter, its neighbors, its proof, and what it opens.

Designed in that order, the practice is not a set of pages that happen to link. It is one continuous story that happens to be paginated — and its final movement, by design, is the invitation to work together. That last property is what keeps this architecture on the right side of the practice's own discipline: the whole point of the story is to carry a visitor from curiosity to contact.
