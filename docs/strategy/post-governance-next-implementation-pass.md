# Post-Governance Portfolio: Next Implementation Pass

## Purpose

This audit identifies the highest-impact next implementation pass after route-governance cleanup. The goal is to move the site from a polished portfolio into a clearer public-facing Independent Systems Design Practice.

This is not a visual redesign brief. It is a strategic implementation guide for making the existing project ecosystem easier to understand, hire, cite, and navigate.

## Current Diagnosis

The route-governance cleanup made the site structurally quieter. Deprecated utility routes are now handled through robots policy and Vercel redirects, while canonical project routes remain active.

The next bottleneck is not routing. It is conversion architecture.

The site already contains the pieces of a serious practice:

- A homepage with a spatial/digital systems origin story
- A Research Practice hub
- An Environmental Systems Design OS
- A Services route
- A strong framework layer
- A professional work archive
- Several proof-heavy case studies
- Experimental builds and concept systems

The highest-impact next pass should connect those pieces into one clear path:

**Homepage -> Practice -> Services -> Frameworks -> Proof -> Contact**

The site should feel less like a portfolio archive and more like a practice system where every page has a role.

## Top 10 Next Improvements

| Rank | Improvement | Business / Practice Impact | Affected Files / Routes |
|---:|---|---|---|
| 1 | Add a clear "Work With Me" pathway from homepage, Research Practice, project pages, and footer | Very high | `app/page.tsx`, `app/projects/research-practice/page.tsx`, `components/StaticFooter.tsx`, `/services/` |
| 2 | Reframe `/projects/research-practice/` as the public front door of the practice, not only a project pipeline | Very high | `app/projects/research-practice/page.tsx`, `app/projects/research-practice/PipelineSection.tsx` |
| 3 | Fix homepage positioning and grammar so the first screen says "practice" with confidence | Very high | `app/page.tsx` |
| 4 | Add a Framework / Capability Library section powered by existing projects | High | `/projects/research-practice/`, `/projects/environmental-systems-design-os/`, `data/projects.ts` |
| 5 | Create one flagship downloadable resource: "Confidence Audit Field Guide" or "Architecture of Confidence Scorecard" | High | New `/resources/...` route or PDF in `public/documents`, linked from `/services/`, `/projects/architecture-of-confidence/`, `/projects/research-practice/` |
| 6 | Turn Previous Professional Work into a validation layer for the practice, not a separate archive | High | `app/projects/previous/page.tsx`, `data/projects.ts` |
| 7 | Identify and feature the top 5 proof case studies with "what this proves" labels | High | TimberTech, Intel, McDonald's Kiosk, Healthcare, Purdue or Nodalytics |
| 8 | Update project navigation labels from portfolio language to practice language | Medium-high | `utils/projectNavigation.ts`, `components/ProjectPracticeNavDropdown.tsx` |
| 9 | Add "related capability" cross-links on major project pages | Medium-high | Architecture of Confidence, Responsive Ecologies, Adaptive Ranch, HADE, TimberTech |
| 10 | Add evidence/offer metadata to the registry after copy architecture is stable | Medium | `data/projects.ts` |

## What Should Be Implemented First

The first implementation pass should build a single conversion spine:

1. Homepage hero and Work section clearly name the practice.
2. Homepage links to both `/projects/research-practice/` and `/services/`.
3. Research Practice hub explains the method, framework library, proof, services, and next steps.
4. Services page becomes reachable from nav, footer, homepage, and key project pages.
5. Previous Professional Work becomes "Professional Validation," with the strongest proof cases highlighted.

This is the highest-leverage sequence because it turns existing assets into a coherent business narrative without requiring new speculative project pages.

## Top 5 Case Studies To Elevate

| Case Study | Why It Matters | Practice Proof Role |
|---|---|---|
| TimberTech | Strongest proof of information architecture, design systems, content systems, and commerce complexity | Systems architecture and content-system validation |
| Intel | Strongest sustainability, research, and enterprise systems proof | Research and enterprise validation |
| McDonald's Kiosk | Strong service interaction, testing, and operational UX evidence | Service operations and decision-flow validation |
| Healthcare | High-stakes information and service-design proof | Service design and complex-access validation |
| Purdue or Nodalytics | Purdue validates institutional web/IA credibility; Nodalytics validates product/platform thinking | Institutional systems proof or product-system proof |

## Work With Me Opportunities

The `/services/` route already exists and is strategically useful. The issue is that it is not yet connected strongly enough across the site.

Recommended next placements:

| Placement | Recommended CTA |
|---|---|
| Homepage hero | "Work With Me" or "Explore the Practice" |
| Homepage Work section | Add a secondary CTA to `/services/` |
| Research Practice hub | Add a "How this becomes client work" section |
| Project footer or anchor component | "This method is available as a systems audit" |
| Static footer | Add "Services" / "Work With Me" to Quick Links |
| Architecture of Confidence | Link directly to a Confidence Audit offer |
| TimberTech and Intel | Link to relevant service proof: systems audit, structural design strategy |

## Framework / Capability Library Opportunity

The site already contains enough material for an initial framework library. It should be small and curated, not a large directory.

Recommended first library:

| Capability | Source Asset | Use |
|---|---|---|
| Architecture of Confidence | `/projects/architecture-of-confidence/` | Signature framework |
| Environmental Systems Design OS | `/projects/environmental-systems-design-os/` | Research infrastructure |
| Responsive Ecologies | `/projects/responsive-ecologies/` | Flagship environmental systems concept |
| Adaptive Outdoor Hospitality Companion | `/projects/adaptive-ranch-experience-companion/` | Hospitality/stewardship application |
| Trust Framework for AI Travel | `/projects/travel-and-ai/projects/trust-framework-ai-travel/` | Trust and verification capability |
| Wayfinding Matrix | `/projects/wayfinding-matrix/` | Environmental decision-support concept |

The first implementation does not need filters. It needs a simple section on `/projects/research-practice/` that names the capabilities and links to the canonical pages.

## Flagship Downloadable Resource

Build one resource first:

**The Confidence Audit Scorecard: A Field Guide for Designing Better Decisions in Complex Systems**

Potential uses:

- Lead magnet
- Consulting pre-read
- Proposal attachment
- Speaking handout
- Public proof of method
- Bridge between Architecture of Confidence and Services

Recommended sections:

1. What confidence means in complex systems
2. Five failure modes: unclear signals, hidden authority, brittle logic, missing recovery, untraceable evidence
3. Scorecard dimensions
4. How to run a lightweight confidence audit
5. What to do with the findings
6. Where the framework came from
7. CTA: systems audit / scoping call

Best initial format:

- Start as Markdown in `docs/resources/`
- Then turn into a PDF or static `/resources/confidence-audit-scorecard/` page
- Link from `/services/`, `/projects/research-practice/`, and `/projects/architecture-of-confidence/`

## Copy And UX Risks

| Risk | Why It Matters | Recommended Fix |
|---|---|---|
| Homepage hero has a grammar issue: `I’m Dan Meier,</strong>.` | First-screen polish issue | Remove the extra comma/period pattern |
| "Welcome" appears as a weak first signal | Does not communicate practice positioning | Replace with "Independent Systems Design Practice" or a stronger category label |
| "I am a spatial and digital systems designer..." is interesting but not yet hireable | It describes identity more than value | Add one sentence about what the practice helps clients understand or resolve |
| "brutal, unpredictable realities" may feel too dramatic | Could undercut premium consulting tone | Use calmer phrasing: "variable, high-context realities" or "conditions that change in the field" |
| Services page exists but is under-connected | Visitors may never reach the hireable offer | Add CTAs across homepage, footer, research hub, and key case studies |
| Previous Work still reads as an archive | Weakens the practice narrative | Reframe as "Professional Validation" or "Enterprise Delivery Record" |
| "Experimental Builds" may undersell mature prototypes | Could sound hobbyist | Consider "System Prototypes" or "Applied Builds" |
| Too many strong assets compete for flagship status | Visitors may not know what to remember | Lead with Architecture of Confidence + Environmental Systems Design OS + Responsive Ecologies |

## What Should Be Deferred

Do not build these yet:

- Complex filtering UI
- Large resource library
- Paid product store
- Newsletter system
- More speculative project pages
- Full CMS/taxonomy refactor
- Additional redirects or route restructuring
- Advanced project-search interface
- New visual design system

Those should wait until the practice spine and Work With Me path are clear.

## Recommended 2-Week Execution Plan

### Week 1: Practice Spine

| Day | Work |
|---:|---|
| 1 | Rewrite homepage hero and Work intro around "Independent Systems Design Practice." Fix grammar and add one clear services CTA. |
| 2 | Add visible `/services/` links to homepage, footer, and practice-adjacent sections. |
| 3 | Reframe `/projects/research-practice/` into: thesis, method, framework library, proof, services, next steps. |
| 4 | Add a compact Framework / Capability Library section using existing project assets. |
| 5 | Reframe `/projects/previous/` intro as "Professional Validation" or "Verified Enterprise Delivery." |

### Week 2: Proof And Conversion

| Day | Work |
|---:|---|
| 6 | Add "What this proves" labels to the top 5 case studies. |
| 7 | Add cross-links from TimberTech, Intel, McDonald's, Healthcare, and Purdue/Nodalytics to relevant frameworks/services. |
| 8 | Draft the Confidence Audit Scorecard as Markdown or static page content. |
| 9 | Add resource CTA placements on Research Practice, Services, and Architecture of Confidence. |
| 10 | Build, QA links, test mobile readability, and review the narrative flow: homepage -> practice -> service -> proof. |

## Recommended First Implementation Pass

The next implementation pass should be:

**"Build the practice spine."**

Scope:

- Homepage copy cleanup
- `/services/` CTA integration
- Research Practice hub reframing
- Framework / Capability Library section
- Previous Work validation framing
- Top 5 proof labels

Avoid adding new routes unless required for the downloadable resource.

## Final Recommendation

The next implementation pass should not make the site bigger. It should make the existing system point in one direction.

The portfolio already has strong raw material. The biggest opportunity is to turn the existing projects into a practice architecture:

- The homepage names the practice.
- The Research Practice hub explains the method.
- The Framework Library gives visitors something to remember.
- The Services page makes the practice hireable.
- Previous Work proves delivery.
- One downloadable resource gives the practice a portable artifact.

This is the shortest path from "impressive portfolio" to "independent systems design practice."
