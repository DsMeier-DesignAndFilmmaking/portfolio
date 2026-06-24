# Portfolio Homepage — Claude Code Implementation Prompts
## Content-Only Changes: No layout, styling, routing, images, or project cards

> **How to use:** Run these prompts in order in Claude Code. Each is self-contained. Paste the full prompt including the constraints block at the top. After each change, verify in the browser before moving to the next.
>
> **Note on prior work:** Some audit findings have already been partially addressed — the hero bio opening now correctly leads with "a systems designer," the About sub-label already reads "A practice built across environments," and the Work headline already reads "A practice built to understand systems before improving them." These prompts pick up from the current state of the files.

---

## Prompt 1 — Hero: Add a Practice Title Kicker

**File:** `app/page.tsx`
**What:** Add a small practice-title line directly above the H1 in the hero section. No new elements, no layout changes — just a text node sitting inside the existing `homepage-copy-column homepage-section-header homepage-title-only` div, above the `<h1>`.

---

```
In app/page.tsx, find the hero title block. It is a div with className "homepage-copy-column homepage-section-header homepage-title-only relative z-10" that contains an <h1> starting with "Designing Experiences Across".

Add a single line of text ABOVE the <h1>, inside that same div, using a <p> tag. Do not add any new wrapper divs, do not change any classNames, and do not alter the h1 or any of its children in any way.

The new <p> tag should use this exact className and style — copy them precisely, do not invent new ones:
  className="font-mono text-[11px] font-semibold uppercase leading-snug tracking-[0.22em] text-stone-500 mb-4"

The text content of the <p> should be:
  Experience Systems Designer

Do not change anything else in the file. No layout, no styling, no routing, no images.
```

---

## Prompt 2 — Hero: Strengthen the Second Bio Paragraph

**File:** `app/page.tsx`
**What:** The second sentence of the hero bio (the paragraph starting "My journey started in landscape architecture...") contains "grit of manual labor" which is off-brand, and ends with generic language about "scale and adaptability." Replace only the text content of this paragraph. Keep the `<a>` tag and its href, className, and attributes exactly as-is.

---

```
In app/page.tsx, find the hero bio paragraph. It is inside the div with className "homepage-copy-column space-y-6 md:space-y-8 mb-0". The paragraph starts with <strong>I'm Dan Meier.</strong> and contains two sentences after the <strong> tag and a <br/><br/>.

The second sentence (after the line breaks) currently reads:
  "My journey started in landscape architecture and urban design (read my{' '}<a ...>Master's Thesis</a>), shaped by the grit of manual labor and travel to 41 countries. No matter what I'm building, my focus is always the same: designing for scale and adaptability, instead of fixed systems or static plans."

Replace ONLY the text around the <a> tag. Keep the <a> tag and all its attributes (href, target, rel, className) exactly unchanged.

The new text should read:
  "My practice began in landscape architecture and urban design — where place, movement, ecology, and human behavior are a single system, not separate disciplines (read my{' '}<a ...>Master's Thesis</a>). That environmental lens has shaped everything since: a 15-year trajectory across physical environments, digital systems, and the increasingly blurred space between them."

Do not change any classNames, styles, layout, images, or any other content in the file.
```

---

## Prompt 3 — Hero: Replace the "Currently Exploring AI" Line

**File:** `app/page.tsx`
**What:** The italic blockquote paragraph currently anchors the hero to an AI/tech trend rather than the environmental and experiential systems direction. Replace only its text content. Keep the `<p>` tag, all classNames, and all inline styles exactly as-is.

---

```
In app/page.tsx, find the italic paragraph in the hero section. It has className "italic text-gray-800 leading-relaxed tracking-normal text-left font-normal" and contains the text:
  "Currently exploring how AI can augment human decision-making in dynamic environments, from digital products to physical places."

Replace only the text content of that paragraph with:
  "My current focus is the intersection of environmental experience and operational systems — how outdoor hospitality, recreation, and destination environments can be understood and improved as connected systems of people, place, service, and information."

Do not change the <p> tag, its className, its inline styles, or anything else in the file.
```

---

## Prompt 4 — About: Rewrite the Practice Narrative Paragraph

**File:** `app/page.tsx`
**What:** The About section paragraph (passed into `preventWidow()`) starts with "As I mentioned" — which is redundant since the hero already introduced the background — and ends with generic systems language. It should explain *why* the combination of physical and digital environment experience produces something distinctively valuable.

---

```
In app/page.tsx, find the paragraph inside the "Design Journey Section" div. It is wrapped in {preventWidow(`...`)} and currently reads:
  "As I mentioned, my design foundation began in urban design and landscape architecture, where I learned to think about movement, context, circulation, constraints, and how people experience space. That training became the lens I brought into UX and product design: understanding complex systems, then fostering the fluid choreography where human behavior and environmental context naturally co-adapt."

Replace only the string inside preventWidow() with:
  "Landscape architecture trained me to read environments before designing them — to understand how people orient themselves in space, how circulation patterns form, how environmental conditions shape behavior before a single decision is made. That way of seeing carried directly into a decade of digital systems work: information architecture, service design, enterprise products, and complex operational experiences. The two disciplines are not a before-and-after. They are the same practice applied at different scales."

Do not change the preventWidow() function call, the wrapping <p> tag, its classNames, its inline styles, or anything else in the file.
```

---

## Prompt 5 — About: Add a Context Frame Around the Concept Sketch

**File:** `app/page.tsx`
**What:** The `<ExperienceConceptDiagram />` component currently appears with no framing text before it. Add a single sentence immediately before the component (inside the existing `w-full my-8 md:my-10` div) to explain what the diagram is and why it exists. No new wrappers, no layout changes.

---

```
In app/page.tsx, find the "Experience Concept Sketch" div. It currently reads:
  {/* Experience Concept Sketch */}
  <div className="w-full my-8 md:my-10">
    <ExperienceConceptDiagram />
  </div>

Add a single <p> tag INSIDE that div, immediately BEFORE the <ExperienceConceptDiagram /> component. Use this exact className and style — copy them precisely:
  className="text-sm text-stone-500 italic mb-4 leading-relaxed"
  style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}

The text content should be:
  "This diagram is the organizing logic of my practice — not a Venn diagram of interests, but a map of where systems actually intersect in the real world."

Do not change the wrapping div, its classNames, the ExperienceConceptDiagram component, or anything else in the file.
```

---

## Prompt 6 — About: Strengthen the Travel Observation Paragraph

**File:** `app/page.tsx`
**What:** The travel paragraph in the About section currently reads as personal travel anecdote. It needs one specific claim about *what* moving through 41 countries taught you to observe professionally — not just that it "informed" your work.

---

```
In app/page.tsx, find the paragraph in the "Travel Discovery Section" div. It currently reads:
  "Travel deepened that lens. Moving through <span className="text-amber-600 font-semibold">40+ countries </span> has shaped how I observe place, behavior, friction, wayfinding, hospitality, and decision-making in unfamiliar environments. Those experiences continue to inform how I design for people moving through real-world complexity."

Replace only the text nodes around the <span> tag. Keep the <span> tag and all its attributes exactly as-is.

The new text should read:
  "Field observation across <span ...>41 countries</span> has sharpened a specific skill: reading how environments communicate — or fail to — before a visitor knows what they need. How wayfinding breaks under pressure. Where hospitality systems succeed or fail at the seam between the physical and the operational. Those observations are not travel stories. They are primary research into how real-world experience systems work."

Important: Keep the span tag's className "text-amber-600 font-semibold" exactly as it is. Only change the surrounding text content. Do not touch any classNames, styles, layout, or other content in the file.
```

---

## Prompt 7 — Work Section: Update the Subtitle Paragraph

**File:** `components/DesignWork.tsx`
**What:** The subtitle below the Work section headline currently reads "Selected work exploring how people navigate complexity across products, services, and environments." This is functional but doesn't explain the *logic* of how the work is organized. Replace the text only.

---

```
In components/DesignWork.tsx, find the paragraph immediately after the <h1 id="work-title"> element. It has className "text-xl text-gray-700 leading-relaxed" and currently reads:
  "Selected work exploring how people navigate complexity across products, services, and environments."

Replace only the text content of that paragraph with:
  "Organized by type of thinking — research that reveals how systems work, frameworks that make that thinking transferable, concepts that apply it to real environments, and builds that prove it can ship."

Do not change the <p> tag, its className, its inline style, or anything else in the file.
```

---

## Prompt 8 — Work Section: Add Purpose Statements Under Each Category Header

**File:** `components/DesignWork.tsx`
**What:** Each of the four category sections (Research, Frameworks, Concepts, Builds & Implementation) currently has only a `<SectionEyebrow>` label with no explanation of what the category means or why it exists. Add a single `<p>` tag directly after each `<SectionEyebrow>` — inside the existing `<section>` element, before the card grid div.

Do not change the `SectionEyebrow` component, card arrays, grid divs, classNames, or anything else.

---

```
In components/DesignWork.tsx, make four separate text additions. In each case, add a <p> tag immediately after the <SectionEyebrow> line and before the <div className="grid..."> line. Use this exact className for all four — copy it precisely:
  className="mt-2 mb-6 text-sm text-stone-500 leading-relaxed max-w-xl"
  style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}

1. After <SectionEyebrow id="research-title">Research</SectionEyebrow>, add:
   "Observation, pattern identification, and systems understanding drawn from real environments and operational contexts."

2. After <SectionEyebrow id="frameworks-title">Frameworks</SectionEyebrow>, add:
   "Original models that simplify complexity, explain recurring patterns, and transfer across industries and environments."

3. After <SectionEyebrow id="concepts-title">Concepts</SectionEyebrow>, add:
   "Applied ideas for places, services, and operations — grounded in research, designed to be built."

4. After <SectionEyebrow id="builds-title">Builds & Implementation</SectionEyebrow>, add:
   "Delivered systems and professional practice work — proof that the thinking can ship."

Do not change the SectionEyebrow component, any card data, any grid divs, any classNames on existing elements, or anything else in the file.
```

---

## Prompt 9 — Travelogue: Reframe the Section Body Copy as Field Research

**File:** `app/page.tsx`
**What:** The travelogue section intro paragraph frames travel as a personal learning experience ("one of my strongest teachers"). Replace it with copy that positions the observation practice as deliberate field research.

---

```
In app/page.tsx, find the travelogue section. It is inside the section with id="travelogue". Find the paragraph with className "text-xl max-w-4xl mx-auto mb-6 md:mb-8 font-medium leading-relaxed" that currently reads:
  "Travel and adventure has been one of my strongest teachers in how people move through place, culture, uncertainty, hospitality, and environmental context. Across 41 countries, I've documented the moments, routes, and conditions that shape real-world experience."

Replace only the text content of that paragraph with:
  "Forty-one countries of deliberate field observation — not tourism, but systems research conducted in environments I don't control. How people orient themselves when signage fails. How hospitality breaks down between the front-of-house and the operational layer behind it. How informal systems emerge when designed ones fall short. All of it documented through my own lens."

Do not change the <p> tag, its className, its inline style, or anything else in the file.
```

---

## Prompt 10 — Travelogue: Remove the "Developing Field Journal" Placeholder Card

**File:** `app/page.tsx`
**What:** The "Travel Field Journal / Developing Field Journal" card currently occupies significant space with a prominent "coming soon" signal. Remove the entire card block and the footer note below it. Replace both with a single, minimal forward-reference line. No layout changes — just remove the card's inner content and replace with a short text note.

---

```
In app/page.tsx, find the travelogue section. It contains a "Modern Coming Soon Card" comment block. The entire outer structure starts with:
  {/* Modern Coming Soon Card */}
  {/* ✅ REMOVED - Suspense and FadeInSection (animations) */}
  <div className="relative mt-14 md:mt-20">

And ends after the closing </div> of that block, before the {/* Tech Stack */} comment.

Also find the "Tech Stack" div that follows:
  <div className="mt-14 md:mt-20 text-center">
    <div className="inline-flex items-center gap-3 border-t border-gray-200 px-2 pt-4">
      <span className="text-gray-600 text-sm font-medium">Field journal in progress</span>
      ...
    </div>
  </div>

Replace BOTH of these blocks (the Coming Soon Card and the Tech Stack div) with a single replacement div:

  <div className="mt-14 md:mt-20 text-center">
    <div className="inline-flex items-center gap-3 border-t border-gray-200 px-2 pt-4">
      <span className="text-gray-600 text-sm font-medium italic">A structured field journal — observations, routes, and environmental notes — is in development.</span>
    </div>
  </div>

Do not change any other content, classNames, images, video embeds, or layout in the file.
```

---

## Prompt 11 — Homepage: Add a Contact / Collaboration Section

**File:** `app/page.tsx`
**What:** There is currently no contact section on the homepage. Add one as a new `<section>` element. Insert it after the closing `</section>` tag of the travelogue section and before the hidden mobile nav `<div className="hidden flex flex-col...">`.

This is a new section. Use only Tailwind classes already present in the codebase pattern (bg-white, homepage-section, homepage-container, homepage-copy-column, text-gray-*, font styles). Do not invent new component names, do not add routing logic, do not add form handling.

---

```
In app/page.tsx, find the end of the travelogue section. It closes with </section> followed by a comment:
  {/* Mobile Navigation Links */}
  <div className="hidden flex flex-col p-4 pl-[30px] space-y-4">

Insert a new <section> element between the travelogue closing </section> and the hidden mobile nav div. Use only Tailwind utility classes consistent with the rest of the page. Here is the exact block to insert:

        {/* Contact / Collaboration Section */}
        <section id="contact" className="homepage-section bg-white relative" aria-label="Contact">
          <div className="homepage-container relative">
            <div className="homepage-copy-column">

              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 border-b border-gray-200 pb-1 text-sm font-medium text-gray-600">
                  Contact
                </span>
              </div>

              <h2
                className="font-bold leading-[1.1] tracking-tight text-left text-gray-950 mb-6"
                style={{
                  fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                  fontFamily: "'tiempos-headline-regular', serif",
                }}
              >
                Work together
              </h2>

              <p
                className="text-gray-700 leading-relaxed mb-8 max-w-2xl"
                style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: 'clamp(1.05rem, 1.05rem + 0.2vw, 1.15rem)' }}
              >
                I work with organizations navigating the complexity of human-environment systems — outdoor hospitality operators, recreation and public lands organizations, destination developers, and others building at the intersection of place, service, and experience. If your work lives at that intersection, I'd like to hear about it.
              </p>

              <a
                href="mailto:danielstevenmeier@gmail.com"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                Get in touch
              </a>

            </div>
          </div>
        </section>

Do not change any other content, classNames, routing, images, navigation logic, or layout in the file.
```

---

## Run Order and Dependencies

These prompts are independent — each targets a distinct text block in a distinct location. Run them in order for clarity, but no prompt depends on the output of another. If one fails, skip it and continue.

| # | File | Target | Risk |
|---|---|---|---|
| 1 | app/page.tsx | Hero kicker line | Low — adds new element |
| 2 | app/page.tsx | Hero bio second paragraph | Low — text replacement |
| 3 | app/page.tsx | Hero italic "AI" line | Low — text replacement |
| 4 | app/page.tsx | About narrative paragraph | Low — text replacement |
| 5 | app/page.tsx | Context frame before diagram | Low — adds new element |
| 6 | app/page.tsx | Travel paragraph in About | Low — text replacement, keep span |
| 7 | components/DesignWork.tsx | Work section subtitle | Low — text replacement |
| 8 | components/DesignWork.tsx | Category purpose statements | Low — adds 4 new elements |
| 9 | app/page.tsx | Travelogue intro paragraph | Low — text replacement |
| 10 | app/page.tsx | Removes "Developing" card + footer | Medium — removes two blocks |
| 11 | app/page.tsx | Adds contact section | Medium — adds new section |

---

## Verification Checklist (Run After All Prompts)

After completing all 11 prompts, do a final read-through of the live homepage and confirm:

- [ ] A practice title ("Experience Systems Designer") is visible before or near the H1
- [ ] The hero bio does not say "ship digital products" or reference "grit of manual labor"
- [ ] The italic hero line speaks to environmental/experiential systems, not AI augmentation
- [ ] The About narrative does not say "As I mentioned" and does not use "UX and product design" as the destination
- [ ] The concept sketch has a one-sentence context frame before it
- [ ] The travel paragraph reads as professional field observation, not personal travel
- [ ] The Work section subtitle explains the Research/Frameworks/Concepts/Builds logic
- [ ] Each of the four work categories has a one-sentence purpose statement below its header
- [ ] The travelogue body copy does not say "one of my strongest teachers"
- [ ] No "Developing Field Journal" card or "Field journal in progress" text appears
- [ ] A contact section with a mailto link is visible at the bottom of the homepage
```

---

*Prompts version: June 2026 — Tied to current state of app/page.tsx and components/DesignWork.tsx*
