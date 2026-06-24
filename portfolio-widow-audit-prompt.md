# Claude Code Prompt — Widow & Orphan Text Audit

**Paste this entire prompt into Claude Code.**

---

```
Audit and fix single-word line breaks (widows and orphans) across two files:
  - app/page.tsx
  - components/DesignWork.tsx

The project uses Tailwind CSS 3.4, which supports text-pretty and text-balance.

## Strategy

Use a CSS-first approach — it works at every viewport width automatically:

- text-balance  →  apply to all h1, h2, h3 elements. Distributes text evenly 
                   across lines, preventing a single short word on the last line.

- text-pretty   →  apply to all <p> elements. Prevents orphaned single words 
                   on the last line of body copy at any viewport width.

For heading elements (<h1>, <h2>, <h3>) that use a <span> as the direct text 
container (e.g. gradient text spans), apply text-balance to the SPAN, not just 
the outer heading, since the span is what controls the wrapping.

## Rules

1. Only ADD these classes to existing className strings. Do not remove, rename, 
   or reorder any existing classes. Do not change any inline styles, layout, 
   spacing, colors, or font sizes.

2. If a className is a plain string: append the class inside the existing quotes.
   Example:
     Before: className="text-xl text-gray-700 leading-relaxed"
     After:  className="text-xl text-gray-700 leading-relaxed text-pretty"

3. If a className uses template literal backticks: append inside the backtick 
   string.
   Example:
     Before: className={`text-sm font-semibold ${t.cta}`}
     After:  className={`text-sm font-semibold text-pretty ${t.cta}`}

4. Do not touch: routing, navigation, images, project card data arrays, 
   component props, import statements, or any element that is not an h1/h2/h3/p.

5. Do not apply text-balance or text-pretty to:
   - <span> tags that are NOT the direct text container of a heading
   - font-mono labels, eyebrow tags, or tags already using text-balance or 
     text-pretty
   - Any element where the text is a single word or a short label unlikely 
     to wrap

## Specific elements to fix in app/page.tsx

Work through the file top to bottom and apply the strategy to every h1, h2, 
h3, and p element. Key ones to confirm are covered:

HEADINGS — add text-balance:
- The hero <h1> "Designing Experiences Across People, Places, & Systems"
  (and its inner <span> which holds the underlined text)
- The About <h1> "The Lens Behind the Work"
  (and its inner gradient <span>)
- The Work <h1> inside DesignWork is in DesignWork.tsx — handle there
- The travelogue <h2> "Field Notes From the World" — already has text-pretty, 
  change that to text-balance (headings should use text-balance, not text-pretty)
- The contact <h2> "Work together"

PARAGRAPHS — add text-pretty:
- The hero bio <p> starting with <strong>I'm Dan Meier.</strong>
- The italic hero <p> "My current focus is the intersection of..."
- The About narrative <p> inside preventWidow() — add text-pretty to the <p> tag
- The concept sketch context frame <p> "This diagram is the organizing logic..."
- The travel observation <p> in the About section (the one with the amber <span>)
- The travel italic asterisk <p> "*All visuals captured through my lens..."
- The travelogue section intro <p> "Forty-one countries of deliberate field 
  observation..."
- The travelogue asterisk <p> "*All visuals captured through my lens..."
- The travelogue "Travel Field Journal" forward-reference note
- The contact section <p> "I work with organizations navigating the 
  complexity..."

## Specific elements to fix in components/DesignWork.tsx

HEADINGS — add text-balance:
- The Work section <h1 id="work-title"> and its inner gradient <span>

PARAGRAPHS — add text-pretty:
- The Work section subtitle <p> "Organized by type of thinking — research..."
- The four category purpose statement <p> tags under Research, Frameworks, 
  Concepts, and Builds (added in a prior session)
- Every card description <p> or text node rendered inside MethodCard, 
  SystemDesignCard, ExplorationCard, and ProfessionalPracticeCallout — 
  specifically the description prop rendered as a <p> element inside each 
  component function

## After making changes

Do a final pass of both files and confirm:
- No h1, h2, or h3 element is missing text-balance (or its inner text-holding 
  span is missing it)
- No body copy <p> element longer than ~8 words is missing text-pretty
- No existing class was removed or reordered
- The files still compile (run: npm run build or npx tsc --noEmit to check)
```
