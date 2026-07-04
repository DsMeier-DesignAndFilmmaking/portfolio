# Project Hero Design System Specification

Planning document for a reusable project hero architecture across the portfolio.

Purpose: create a scalable hero system where every project feels related, premium, calm, and intentional while still allowing project-specific personality.

This document is implementation-ready as a design systems specification, but it does not include code.

## 1. Design Philosophy

The project hero is an invitation, not the full case study.

The first viewport should establish:

1. What the project is.
2. Why it matters.
3. Why it is worth continuing.

The hero should not prove the entire system, teach the full framework, show every artifact, or explain the architecture. Deeper evidence belongs in the first body section and beyond.

### Core Principles

- **Calm before complexity:** The hero orients. The page proves.
- **One primary read:** The project title must be the clearest element.
- **One secondary read:** Use either a supporting sentence or a visual as the second read, not multiple competing elements.
- **Evidence by restraint:** Premium credibility comes from editing, not volume.
- **Shared structure, flexible tone:** Every hero should feel part of one portfolio system, but visual treatment can adapt to project type.
- **System depth below the fold:** Diagrams, logic receipts, proof paths, metrics, and detailed captions should usually begin after the hero.

## 2. Information Hierarchy

Every hero should follow the same information hierarchy, with optional slots depending on project maturity and type.

### Required

1. **Breadcrumb or eyebrow**  
   Small context marker. Examples: project category, practice area, client work, research framework.

2. **Project title**  
   The dominant first-read element.

3. **Positioning sentence**  
   One concise sentence explaining what the project helps clarify, decide, experience, or prove.

### Optional

4. **Status or evidence boundary**  
   One line only. Use when status prevents misunderstanding, such as "Concept, not deployed product."

5. **Primary action**  
   One CTA only when there is a meaningful action, such as viewing a live demo.

6. **Hero visual**  
   One visual type selected by project category.

### Avoid In The Hero

- Tag clusters.
- Multiple badges.
- Full Challenge/Solution/Core Pillars sections.
- Scenario metadata.
- Figcaptions.
- Dense architecture diagrams.
- Debug labels.
- Multiple CTAs.
- Long technical paragraphs.
- Detailed proof metrics.

## 3. Grid

The hero system should support several layouts but derive from one grid logic.

### Base Container

- Use a consistent maximum content width across project pages.
- Maintain equal left and right page margins across the hero and first body section.
- Align the hero content to the same horizontal rhythm as section content below.

### Desktop Grid

Use a 12-column grid.

Recommended patterns:

- **Text-only / centered editorial:** 8-column content width centered.
- **Editorial with visual right:** 6 columns text, 6 columns visual.
- **Research publication:** 7 to 8 columns text, optional 4 to 5 columns quiet preview.
- **Editorial with visual below:** 7 to 8 columns text, full-width visual below the opening.
- **Large full-width visual:** full-bleed or viewport-width image with constrained text overlay.

### Mobile Grid

- Collapse to one column.
- Text always appears before visual unless the project is a client proof page with a full-width image background.
- Avoid side-by-side visual/text relationships on mobile.
- Preserve clear title-first hierarchy.

## 4. Typography

Typography should create editorial confidence through scale, contrast, and restraint.

### Eyebrow / Breadcrumb

- Small.
- Low visual weight.
- Letter spacing acceptable but should not become visually louder than the subtitle.
- Use sparingly; avoid multiple adjacent labels.

### Title

- Largest text in the hero.
- Should be readable within two to three lines on desktop.
- Should avoid long technical subtitles inside the same heading block.
- If a title is long, separate the project name from the descriptive phrase.

### Supporting Sentence

- One sentence.
- Ideal length: 18 to 28 words.
- Should not repeat the title.
- Should not include more than one specialized technical term.

### Status / Evidence Boundary

- One line.
- Plain language.
- Lower visual weight than supporting copy.

### CTA

- One primary action max.
- Text should be direct, not decorative.
- Avoid bracketed CTA styling if it adds visual noise.

## 5. Spacing

Spacing should make the hero feel calm before the page becomes detailed.

### Vertical Rhythm

Recommended order:

1. Eyebrow.
2. Moderate gap.
3. Title.
4. Slightly larger gap.
5. Supporting sentence.
6. Optional status or CTA.
7. Optional visual.

### Spacing Rules

- Use more spacing between conceptual layers than between related labels.
- Do not place badges, tags, and CTAs in the same vertical cluster.
- Do not stack multiple bordered components directly under the headline.
- Let the next section be visible or implied when possible.

### Density Limit

The first viewport should contain no more than:

- One eyebrow.
- One title.
- One supporting sentence.
- One optional status line.
- One optional CTA.
- One visual.

## 6. Hero Visual Rules

Visuals should be presentation visuals, not documentation visuals.

### Visual Types By Project Category

| Project Type | Recommended Visual |
| --- | --- |
| Research system | Architecture preview or no hero visual |
| Framework | Simplified diagram or research-publication preview |
| Place-based concept | Photography or illustration |
| Experience concept | Photography, illustration, or abstract visualization |
| Complex system concept | Abstract visualization in hero, full diagram below |
| Product surface | Device mockup or clean UI surface |
| Client case study | Full-width image, product artifact, or device mockup |
| Early-stage concept | No hero visual or quiet abstract cue |

### Visual Must

- Support the headline in one glance.
- Have one focal point.
- Be understandable without reading multiple labels.
- Feel like an invitation into the work.
- Avoid duplicating the first major diagram below the fold.

### Visual Must Not

- Explain the full system.
- Require interaction before comprehension.
- Include too many annotations.
- Contain multiple status chips, labels, or debug-like text.
- Compete with the project title.
- Carry the entire thesis.

## 7. Mobile Behavior

Mobile heroes should be simpler than desktop heroes, not just narrower.

### Mobile Rules

- Text appears first.
- Title should resolve quickly without awkward wrapping.
- Supporting copy should stay short.
- Hide or delay dense visuals.
- Replace complex visuals with simplified previews.
- Move tags, metadata, captions, and secondary CTAs below the hero.
- Keep tap targets accessible when CTAs are present.

### Mobile Visual Handling

| Visual Type | Mobile Behavior |
| --- | --- |
| Photography | Full-width below text or background only for client proof pages |
| Device mockup | Show one state only; avoid tiny UI text |
| Architecture preview | Simplify or move below fold |
| Diagram | Prefer below fold |
| Abstract visualization | Keep if lightweight |
| No visual | Preserve text-first hero |

## 8. Desktop Behavior

Desktop may support more expressive hero layouts, but hierarchy must remain strict.

### Desktop Rules

- Title remains the dominant first read.
- Right-side visuals should be optically lighter than the title block unless the page is a client-proof visual hero.
- Large visuals must not introduce more than one conceptual read.
- Text and visual should align to a clear baseline or centerline.
- Avoid simultaneous headline, diagram, tags, figcaption, and CTA clusters.

### Desktop Layout Families

1. **Research Publication**
   - Text-led.
   - Optional quiet preview.
   - Best for frameworks and research systems.

2. **Editorial With Visual Below**
   - Text first.
   - Visual proof begins below the opening.
   - Best for complex system concepts.

3. **Magazine-Inspired**
   - Strong atmosphere.
   - Image or illustration can be expressive.
   - Best for place-based or experiential projects.

4. **Large Full-Width Visual**
   - Best for client proof and visual artifacts.
   - Text overlay should be concise.

5. **Editorial Left / Visual Right**
   - Best for product surfaces and simple artifact pairings.
   - Use only when visual is clean.

6. **Centered Editorial**
   - Best for early-stage, text-led, or high-restraint concepts.

## 9. Accessibility

The hero system should be accessible by default.

### Content Accessibility

- The h1 should contain the project title only or the title plus a short subtitle when necessary.
- Long paragraphs should not be inside the h1.
- Avoid relying on visual labels to explain the project.
- Use plain language for status and evidence boundaries.

### Visual Accessibility

- Decorative visuals should have empty alt treatment.
- Informational visuals should have concise alt text.
- Complex diagrams should be summarized below the fold, not forced into alt text alone.
- Text embedded in images should not be required for comprehension.

### Interaction Accessibility

- Hero visuals should not require interaction to understand the project.
- CTAs should be keyboard accessible and visually distinct.
- Motion should be reduced or disabled for users with reduced-motion preferences.
- Animated hero elements should not carry essential meaning.

### Contrast

- Text over images requires strong contrast treatment.
- Avoid placing thin, small, uppercase labels over visually complex backgrounds.
- Status and metadata text must remain readable, even if visually subordinate.

## 10. Responsive Behavior

Responsive behavior should preserve meaning, not just rearrange columns.

### Breakpoint Logic

At each breakpoint, verify:

- Title is still the dominant read.
- Supporting sentence remains readable.
- Visual does not become cramped or illegible.
- Optional metadata does not wrap awkwardly.
- Next section starts naturally after the hero.

### Content Priority By Screen Size

| Priority | Desktop | Tablet | Mobile |
| --- | --- | --- | --- |
| Title | Always visible | Always visible | Always visible |
| Supporting sentence | Always visible | Always visible | Always visible |
| Eyebrow | Visible | Visible | Visible if short |
| Status line | Optional | Optional | Move below if wrapping |
| CTA | Optional | Optional | One CTA only |
| Visual | Optional | Simplified | Simplified or delayed |
| Tags/metadata | Below fold | Below fold | Below fold |

## 11. Reusable React Component Structure

No code is included here, but the hero system should be structured as a reusable component with predictable slots.

### Proposed Component Concept

`ProjectHero`

Primary purpose: render a consistent hero shell with selectable layout variants and controlled slots.

### Core Props / Inputs

- `projectId`
- `variant`
- `eyebrow`
- `title`
- `subtitle`
- `summary`
- `statusNote`
- `primaryAction`
- `visual`
- `visualType`
- `tone`
- `breadcrumb`
- `background`
- `metadata`

### Recommended Variants

- `research-publication`
- `editorial-left-visual-right`
- `editorial-visual-below`
- `centered-editorial`
- `full-width-visual`
- `magazine`

### Component Responsibilities

- Enforce title-first hierarchy.
- Render only approved above-the-fold slots.
- Keep metadata out of the hero unless explicitly allowed.
- Provide consistent spacing and responsive behavior.
- Apply accessible heading and landmark structure.
- Handle visual placement by variant.

### Component Should Not Do

- Render arbitrary dense children above the fold.
- Allow unlimited badges or tags.
- Allow multiple CTAs by default.
- Render full diagrams without a deliberate variant override.

## 12. Project-Specific Slots

Each project may express personality through controlled slots.

### Allowed Personality Slots

- Accent color.
- Visual type.
- Background tone.
- One status/evidence line.
- One project-specific visual.
- One CTA.
- One optional atmospheric cue.

### Not Allowed As Default Hero Slots

- Full tag lists.
- Multi-column metadata.
- Full architecture diagrams.
- Long captions.
- Challenge/Solution/Core Pillars.
- Scenario metadata.
- Multiple proof cards.

### Project Type Mapping

| Project Group | Recommended Variant | Visual Slot |
| --- | --- | --- |
| Environmental Systems Design OS | Research publication | Architecture preview or none |
| Architecture of Confidence | Research publication | Simplified diagram |
| Wayfinding Matrix | Magazine | Illustration |
| Intention Engine | Magazine | Photography |
| Responsive Ecologies | Editorial visual below | Abstract visualization or architecture preview |
| Adaptive Outdoor Hospitality Companion | Editorial left / visual right | Simplified diagram |
| HADE | Editorial visual below | Abstract visualization |
| Field Notes | Centered editorial | None or delayed artifact |
| Digital Executor | Centered editorial | None |
| Archived client work | Full-width visual | Photography or device mockup |
| Travel + AI product surfaces | Editorial left / visual right | Device mockup |
| Travel + AI logic pages | Research publication or editorial visual below | Architecture preview or simplified diagram |

## 13. Shared Components

The hero system should use shared primitives so the portfolio feels coherent.

### Shared Hero Primitives

- `HeroShell`
- `HeroEyebrow`
- `HeroTitle`
- `HeroSummary`
- `HeroStatusNote`
- `HeroAction`
- `HeroVisualFrame`
- `HeroImage`
- `HeroDeviceMockup`
- `HeroDiagramPreview`
- `HeroAbstractVisual`
- `HeroScrollCue`

### Shared Supporting Components

Move these below the hero:

- `ProjectMetadata`
- `ProjectTags`
- `EvidenceBoundary`
- `ChallengeSolution`
- `CorePillars`
- `ScenarioMetadata`
- `SystemDiagram`
- `VisualCaption`
- `MetricsStrip`

### Shared Content Rules

- `HeroSummary` should reject or flag overly long text during content review.
- `HeroStatusNote` should be one line.
- `HeroAction` should support one primary CTA.
- `HeroVisualFrame` should be able to hide or simplify on mobile.

## 14. Future Extensibility

The hero system should support future projects without requiring custom hero architecture each time.

### Extensible Dimensions

- New visual types.
- New project categories.
- New evidence maturity states.
- New CTA types.
- Featured project treatments.
- Publication-style research pages.
- Client-proof case studies.
- Product-surface prototypes.

### Governance Rules

Before creating a custom hero, ask:

1. Does an existing variant support this project?
2. Is the custom need visual, structural, or content-related?
3. Can the difference be handled through a slot?
4. Does the custom treatment improve seven-second comprehension?
5. Does it preserve the title-first hierarchy?

### Content Review Checklist

Before publishing a project hero:

- Can a hiring manager answer "what is this?" in seven seconds?
- Is the project title the dominant read?
- Is the supporting copy one sentence?
- Is the hero visual understandable without reading labels?
- Are tags and metadata below the fold?
- Is there only one CTA?
- Does the hero feel calmer than the body sections?
- Does the next section carry the proof?

## Recommended Portfolio-Wide Hero System

Use one reusable hero system with six variants:

1. Research publication.
2. Editorial left / visual right.
3. Editorial with visual below.
4. Centered editorial.
5. Full-width visual.
6. Magazine-inspired.

Do not force one layout across all projects. Instead, standardize the decision logic, spacing, typography, slot behavior, and visual rules.

This creates portfolio consistency without flattening project personality.

## Final Specification Summary

The reusable hero system should create a consistent editorial contract:

- The title introduces the project.
- One sentence explains the value.
- One restrained visual supports the idea.
- Proof moves below the fold.

When the hero does less, the work feels stronger.

