# Research Practice — Strategic Positioning Audit

**Page audited:** `/projects/research-practice` (`app/projects/research-practice/`)
**Scope:** Strategic positioning only. No visual/UI recommendations.
**Date:** 2026-06-24

---

## Executive Summary

**Verdict: The page currently communicates "I have interesting projects" — organized with the *ambition* of a practice, but not yet the *substance* of one.**

The page has genuine practice-grade scaffolding: a named methodology (Research → Frameworks → Concepts → Builds), a real positioning thesis ("Most design starts with a brief. This one starts earlier."), and a typed taxonomy enforced in the data model. That is more structure than 90% of designer portfolios have. It is reaching for "practice."

But what a cold visitor actually *absorbs* is a thoughtfully-arranged collection of **speculative, imaginatively-named concepts** — and that lands on the "interesting projects" side of the binary. The page never establishes the four things a practice requires to be read as a practice: **a principal with authority, a defined audience, a value claim, and a point of view about why it exists.** It tells the reader the projects are connected, but never shows the connection. And it subordinates the entire research effort to client work ("the research layer that makes the client work not a guess"), which frames it as *R&D for a contractor* rather than *an operation with standalone value.*

The practice is roughly **60% of the way to "practice."** The scaffolding is built. The substance — authority, audience, value, vision, proof, differentiation — is mostly missing. The good news: the missing pieces are copy/positioning, not architecture. The pipeline already built is the right spine to hang them on.

---

## Strengths (what is already pulling toward "practice")

1. **The pipeline is a real methodology, not a layout.** Research → Frameworks → Concepts → Builds implies a *repeatable system that produces things*, which is the single most practice-like signal on the page. Most portfolios have no method; this one does, and it's typed into the data model (`IndependentResearchType`).
2. **The hero thesis stakes a position.** "Most design starts with a brief. This one starts earlier." is a claim about *how the work happens* and an implicit critique of brief-driven design. That's positioning, not description.
3. **A consistent, intentional taxonomy.** "Research OS," "Framework," "Concept," "Experimental Build" is a controlled vocabulary applied uniformly. It signals deliberateness.
4. **A clear, unusual domain center of gravity.** The work clusters tightly around outdoor hospitality, ecotourism, recreation, land stewardship, and AI decision-support. That is a *differentiated niche* — rare and valuable, if claimed.
5. **One explicit link to commercial value.** "...makes the client work not a guess" is the only line that connects research to a payoff. The instinct is right (even if, as below, the framing caps the ambition).

---

## Weaknesses (what is pulling toward "interesting projects")

1. **No principal. A practice has an operator; this page has none.** It opens with a disembodied "I study…" — no name, no authority, no credentials, no founder presence anywhere on the page. Standalone (e.g., if someone lands here from search), it never establishes *who* runs this or *why they're qualified to*. A practice without a visible practitioner reads as a project hub.
2. **No defined audience.** The page never says who it's for. Operators? Employers? Collaborators? The only audience signal — "client work" — frames research as *support for* a separate business, not as something anyone is invited to engage. A practice knows who it serves; this doesn't say.
3. **No value claim — only an internal-coherence claim.** The promise on the page is that *the projects connect to each other* ("every project connects to the one before and after it"). That's a statement about portfolio tidiness, not about what *changes for someone else* because this practice exists. What does a partner get? Unstated.
4. **The inventory reads as speculative, not operating.** The stage distribution is **1 Research OS, 1 Framework, 4 Concepts, 3 Experimental Builds** — heavily weighted to concepts and "experimental." Several summaries are overtly futuristic ("multi-agent AI land stewardship platform," "translates abstract psychological states into spatial Blueprints," "semantic discovery engine for luxury ecotourism"), and one is explicitly labeled "a concept, not a shipped product." A practice is evidenced by *method + proven body of work*; this currently reads as *a lab of imaginative ideas.* This is the **single biggest driver** of the "interesting projects" perception.
5. **Invented jargon signals idea-branding, not discipline.** "Hushpitality," "Whycations," "Zero-Search Discovery," "Psychological Blueprints," "Predictive Agentic Modeling." Coined terms with no backing read as *someone naming their cool concepts* — the hallmark of the "interesting projects" register — rather than the plain, confident vocabulary of an operator who's done the work.
6. **The pipeline's central claim is told, not shown.** The copy asserts "Observations become frameworks. Frameworks get stress-tested as concepts. Concepts that survive become builds." But the cards sit in siloed accordions with **no visible lineage** — no thread showing *which* observation produced the one framework, which framework produced which concept, which concept "survived" into which build. The funnel (1→1→4→3) doesn't visibly flow. The strongest asset is undercut by the absence of connective tissue.
7. **Research is subordinated to client work.** "This is the research layer that makes the client work *not a guess*" positions the entire practice as R&D *in service of* the real business. That is the "interesting side projects that make me a better contractor" frame — the "interesting projects" pole, almost verbatim.
8. **No vision / no future.** A practice points somewhere — it's building toward a thesis it's trying to prove. The page is static: here are four stages, here are the projects. Nothing about where this is going or what it's trying to become.
9. **No differentiation / no moat.** Nothing says why this practice vs. a UX team, an agency, or a landscape firm. Notably, the existing strategy doc (`portfolio-homepage-strategy.md`) contains a sharp differentiator ("a resort's wayfinding problem, a recreation app's onboarding friction, and the operational staffing system that connects them — as a single system") — and **none of it made it onto the page.**
10. **The practice has no settled name.** The route is `/research-practice`, the component is `ResearchPracticePage`, the homepage card and this page's `<h1>` say "**Systems Design Practice**," and the homepage hero calls the founder a "Multidisciplinary Designer." Four labels, no anchor. An entity that can't name itself consistently reads as personal projects, not an operation.

---

## Positioning Gaps (current → required)

| Dimension | Currently communicates | A practice requires |
|---|---|---|
| **Practice positioning** | A connected set of research projects | A named operation with a method, a domain, and a reason to exist |
| **Founder positioning** | Absent on the page (voice only, no principal) | A visible principal with authority and a through-line |
| **Brand narrative** | "My projects connect to each other" | "Here is the problem in the world I exist to work on" |
| **Value proposition** | Internal coherence; de-risks *my* client work | A concrete payoff for *someone else* |
| **Strategic differentiation** | None stated | The integrative, whole-system moat, named |
| **Industry fit** | Implied by project summaries | Declared as the practice's chosen domain |
| **Competitive positioning** | None | Explicit contrast vs. UX teams / agencies / landscape firms |
| **Future vision** | None (static stage list) | A thesis the practice is building toward |
| **Target audiences** | Undefined (only "client work") | Named: who this is for and what they should do |
| **Naming** | 4 inconsistent labels | One settled practice name |

---

## Recommended Positioning

Move the subject of the page from **the projects** to **the practice and its principal**, and reposition research from *support function* to *engine*:

> **From:** "Here is a connected pipeline of research projects, which happens to make my client work better."
>
> **To:** "I run an independent systems design practice that researches how people decide, navigate, and recover in complex physical-digital environments — and converts that research into frameworks, concepts, and working tools for the operators building those environments."

Four non-negotiable shifts:

1. **Name the practice and the principal** at the top — the page must answer "whose practice, and why them?" before the pipeline.
2. **Declare the domain and audience** — outdoor hospitality, recreation, public lands, destination/ecotourism operators. Owning a narrow, unusual niche is a *strength*; burying it in project copy wastes it.
3. **Reframe research as the engine, not the support** — it produces compounding knowledge that is itself the offer, not a confidence-booster for contract work.
4. **Show the lineage** — make at least one observation → framework → concept → build chain explicit, so "everything connects" is demonstrated, not asserted.

And **resolve the name.** Pick one — "Systems Design Practice" is the strongest of the four already in use — and apply it everywhere (route, nav, hero, metadata).

---

## Revised Practice Narrative *(the spine — replaces the two hero paragraphs)*

> **Most design begins with a brief — a problem already named, scoped, and waiting to be solved.** The problems that matter most in physical-digital environments aren't named yet. They're hidden in how people actually move, decide, and recover when the weather turns, the signage fails, or the plan breaks.
>
> **This is an independent systems design practice built to work on exactly those moments.** I run a continuous research loop: observe real environments, extract the patterns underneath the surface variation, build them into frameworks, pressure-test them as concepts, and ship the ones that survive as working tools. What accumulates isn't a portfolio of projects — it's a body of knowledge about how wayfinding, hospitality, stewardship, and decision-support systems succeed or fail in the field.
>
> **I work with the operators building those environments** — outdoor hospitality, recreation, public lands, and destination developers — who need more than a deliverable. They need someone who can see the whole system at once: the trail, the app, and the staffing model behind both.

---

## Revised Mission

> To understand how people navigate, decide, and recover in complex physical-digital environments — and to design systems that stay humane and legible when conditions change. The practice treats research, frameworks, concepts, and working tools not as separate outputs but as one continuous method for turning field observation into systems that hold up in the real world.

*One-line version for nav/metadata:* "An independent systems design practice turning field research into frameworks, concepts, and working tools for human-environment systems."

---

## Revised Value Proposition

> Most designers can improve the screen in front of them. I design the system behind it. Because this practice researches how environments, operations, and interfaces actually behave *together* — across dozens of real settings and a connected pipeline of frameworks and prototypes — the work isn't a guess dressed up as a deliverable. It's grounded in patterns already validated before the engagement starts. You get decisions that are de-risked early, and a partner who treats your wayfinding, your product, and your operations as one problem instead of three.

---

## Revised Founder Story *(to appear on the page — establishes the principal)*

> **I'm Dan Meier.** I started in landscape architecture and urban design, where you learn to read an environment — circulation, orientation, how conditions shape behavior — before you change it. Over fifteen years that lens moved from physical space into digital systems: information architecture, service design, enterprise products. Forty-one countries of deliberate field observation taught me the same lesson everywhere — experiences don't fail in design reviews, they fail in the real world, at the seam between the physical and the operational.
>
> This practice is where I work on that seam on purpose. Not on behalf of a single client, but as ongoing research into how human-environment systems actually behave — and how AI can help people decide and recover inside them. Everything below is that research, in motion.

---

## Competitive Differentiation Statement

> Most practitioners own one layer — the interface, the service, or the physical space. I work across all three as a single system. I can hold a resort's wayfinding problem, a recreation app's onboarding friction, and the operational staffing model that ties them together as **one** problem, not three projects. That integrative view — physical environment, digital product, and operations, researched as a unit and grounded in a landscape-architecture-to-digital-systems through-line almost no one else has — is what this practice offers that a UX team, a brand agency, or a landscape firm individually cannot.

---

## Bottom Line

The architecture is right and the pipeline is a genuine asset — don't rebuild it. The gap is entirely in positioning copy: install a principal, name an audience, promise a value, show the lineage, and stop subordinating the research to the client work. Do that and the same page flips from "interesting projects" to "an operating practice."
