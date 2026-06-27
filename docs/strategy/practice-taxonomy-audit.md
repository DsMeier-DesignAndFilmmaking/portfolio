# Independent Systems Design Practice Taxonomy Audit

## Purpose

This audit reviews the current portfolio ecosystem as the foundation for a public-facing Independent Systems Design Practice. It does not evaluate visual design. It focuses on the taxonomy needed to eventually power navigation, homepage grouping, consulting pages, project filters, downloadable resources, and internal practice governance.

The current ecosystem already has the beginnings of a strong Practice OS. The project registry separates independent research practice from client work, and several projects already include early governance fields such as `osCategory`, `practiceTrack`, `projectType`, `maturity`, `evidenceLevel`, and `visibility`.

The next step is to turn this into a consistent taxonomy that separates four different jobs:

- Public navigation
- Practice strategy
- Evidence governance
- Consulting and product packaging

## Current Diagnosis

The portfolio is already organized around two major bodies of work:

| Body of Work | Current Role | Strategic Meaning |
|---|---|---|
| Systems Design Practice | Self-directed research, frameworks, concepts, and experimental builds | The future-facing practice engine |
| Verified Enterprise Delivery | Client and professional work across industries | Proof that the practice can ship real work |

This is a strong narrative foundation. The main weakness is that the metadata is doing too many things at once. A single project record currently supports routing, navigation, page grouping, career proof, Practice OS mapping, and future consulting/product signals.

The recommended fix is not to replace the current registry. It is to add a cleaner taxonomy layer that can be used progressively.

## Recommended Taxonomy Schema

Use this as the long-term canonical project metadata shape.

| Field | Purpose | Recommended Values |
|---|---|---|
| `canonicalRoute` | Defines the single source route for the asset | `/projects/...` |
| `publicVisibility` | Controls publishing and indexing decisions | `public`, `hidden`, `draft`, `deprecated`, `internal-only` |
| `practiceAreaPrimary` | Main strategic grouping | Environmental Systems, Outdoor Hospitality, Decision Systems, Service Operations, AI Product Systems, Enterprise Validation, Research Infrastructure |
| `practiceAreasSecondary` | Cross-domain relevance | Array of practice areas |
| `projectType` | Defines the asset role | Research OS, Framework, Concept Architecture, Applied System Concept, Experimental Build, Case Study, Resource, Offering |
| `stage` | Development maturity | Exploratory, Research-Backed Hypothesis, Concept Architecture, Prototype, Shipped Case Study, Operational |
| `evidenceLevel` | Proof maturity | Conceptual, Field-Informed, Prototype Evidence, Shipped Client Evidence, Operational Validation |
| `methods` | How the work was made | Field observation, systems mapping, information architecture, service blueprinting, prototyping, evidence synthesis, product strategy |
| `outputs` | What the page contains | Framework, diagram, prototype, report, case study, audit, roadmap, model |
| `consultingRelevance` | Business development signal | Flagship, Strong, Moderate, Background |
| `productPotential` | Productization signal | High, Medium, Low |
| `resourcePotential` | Download/report/template potential | High, Medium, Low |
| `supportsOSCategories` | Practice OS mapping | Vision, Strategy, Research Program, Framework Library, Field Studies, Concepts, Consulting, Products, Marketing, Business Development, Career Strategy, Roadmap, Resources |
| `nextRecommendedRoute` | Narrative sequencing | Route visitors should naturally visit next |
| `audience` | Primary viewer intent | Clients, employers, collaborators, researchers, buyers |
| `evidenceSummary` | Plain-language proof explanation | Short note explaining what kind of evidence supports the page |
| `clientProofRole` | How client work validates the current practice | Delivery proof, domain proof, IA proof, service proof, product proof |

## Recommended Type Groups

### Practice Areas

| Practice Area | Description |
|---|---|
| Environmental Systems | Stewardship, landscape complexity, ecological signals, land operations |
| Outdoor Hospitality | Guest guidance, recovery, ranch/lodge/resort operations, visitor confidence |
| Decision Systems | Confidence, uncertainty, timing, action support, recovery loops |
| Service Operations | Handoffs, failure recovery, coordination, operational friction |
| AI Product Systems | Adaptive interfaces, agentic reasoning, trust layers, contextual intelligence |
| Enterprise Validation | Shipped client work that proves professional delivery |
| Research Infrastructure | The OS, evidence pipeline, field notes, pattern libraries |
| Destination Development | Place-based experiences, wayfinding, spatial sequencing, hospitality strategy |

### Project Types

| Project Type | Description |
|---|---|
| Research OS | Internal or public operating environment for research and synthesis |
| Framework | Reusable conceptual model or method |
| Concept Architecture | Structured speculative system design |
| Applied System Concept | Domain-specific application of a framework |
| Experimental Build | Prototype or working product surface |
| Case Study | Shipped or professional work evidence |
| Resource | Downloadable/report/template/library asset |
| Offering | Future consulting service or productized service |

### Stage

| Stage | Meaning |
|---|---|
| Exploratory | Early idea with limited evidence |
| Research-Backed Hypothesis | Concept grounded in research or observation |
| Concept Architecture | Coherent system model with structure and scenarios |
| Prototype | Interactive or technical build exists |
| Shipped Case Study | Delivered client or professional work |
| Operational | Mature enough to use as a repeatable practice asset |

### Evidence Level

| Evidence Level | Meaning |
|---|---|
| Conceptual | Primarily strategic or speculative |
| Field-Informed | Supported by field observations, pattern analysis, or domain research |
| Prototype Evidence | Demonstrated through an interactive or technical build |
| Shipped Client Evidence | Validated through professional delivery |
| Operational Validation | Used repeatedly with measurable outcomes |

## Project-by-Project Classification

| Project | Practice Area | Project Type | Stage | Evidence Level | Consulting Relevance | Product Potential | Canonical Route |
|---|---|---|---|---|---|---|---|
| Research Practice Hub | Research Infrastructure | Practice Hub | Developing | Field-Informed | Flagship | Medium | `/projects/research-practice` |
| Environmental Systems Design OS | Research Infrastructure / Environmental Systems | Research OS | Concept Architecture | Field-Informed | Flagship | High | `/projects/environmental-systems-design-os` |
| Architecture of Confidence | Decision Systems / Service Operations | Framework | Strong Framework | Field-Informed | Flagship | High | `/projects/architecture-of-confidence` |
| Responsive Ecologies | Environmental Systems / Stewardship | Applied System Concept | Concept Architecture | Field-Informed | Flagship | High | `/projects/responsive-ecologies` |
| Adaptive Outdoor Hospitality Companion | Outdoor Hospitality / Service Operations | Applied System Concept | Concept Architecture | Field-Informed | Strong | High | `/projects/adaptive-ranch-experience-companion` |
| Wayfinding Matrix | Outdoor Hospitality / Decision Systems | Concept Architecture | Research-Backed Hypothesis | Conceptual to Field-Informed | Strong | Medium | `/projects/wayfinding-matrix` |
| Intention Engine | Destination Experience / Service Design | Concept Architecture | Research-Backed Hypothesis | Conceptual | Strong | Medium | `/projects/intention-engine` |
| HADE | AI Product Systems / Decision Support | Experimental Build | Prototype | Prototype Evidence | Strong | High | `/projects/travel-and-ai` |
| Field Notes | Field Studies / Research Infrastructure | Experimental Build | Prototype | Prototype Evidence | Moderate | High | `/projects/field-notes` |
| Digital Executor | Service Operations | Experimental Build | Exploratory | Conceptual | Moderate | Medium | `/projects/digital-executor` |
| Purdue | Enterprise Validation | Case Study | Shipped Case Study | Shipped Client Evidence | Background | Low | `/projects/purdue` |
| TimberTech | Enterprise Validation / Commerce IA | Case Study | Shipped Case Study | Shipped Client Evidence | Strong | Low | `/projects/previous/timbertech` |
| Healthcare | Service Design / Healthcare Access | Case Study | Shipped Case Study | Shipped Client Evidence | Moderate | Low | `/projects/previous/healthcare` |
| McDonald's Kiosk | Commerce / Service Operations | Case Study | Shipped Case Study | Shipped Client Evidence | Moderate | Low | `/projects/previous/mcdonalds-kiosk` |
| Intel | Enterprise / Sustainability Systems | Case Study | Shipped Case Study | Shipped Client Evidence | Strong | Medium | `/projects/previous/intel` |
| Nodalytics | Emerging Tech / Product Systems | Case Study | Shipped Case Study | Shipped Client Evidence | Moderate | Medium | `/projects/previous/nodalytics` |
| Newdea | Enterprise / Impact Systems | Case Study | Shipped Case Study | Shipped Client Evidence | Moderate | Low | `/projects/previous/newdea` |
| DoubleGood | Commerce / Fundraising Systems | Case Study | Shipped Case Study | Shipped Client Evidence | Moderate | Low | `/projects/previous/doublegood` |
| AdviseStream | Enterprise / Reporting Systems | Case Study | Shipped Case Study | Shipped Client Evidence | Moderate | Low | `/projects/previous/advisestream` |
| Sphere Software | Emerging Tech / Product Systems | Case Study | Shipped Case Study | Shipped Client Evidence | Background | Low | `/projects/previous/sphere-software` |
| Havas Agency | Enterprise / Experience Design | Case Study | Shipped Case Study | Shipped Client Evidence | Background | Low | `/projects/previous/havas-agency` |
| Rich Products | Enterprise / IA | Case Study | Shipped Case Study | Shipped Client Evidence | Background | Low | `/projects/previous/rich-products` |

## HADE Subproject Taxonomy

HADE should remain one top-level project in the main registry, but its nested routes should have their own subproject taxonomy. These should not be flattened into the main project registry unless they become independent public assets.

| HADE Surface | Type | Evidence Level | Role |
|---|---|---|---|
| Spontaneous Travel Companion | Product Surface | Prototype Evidence | Core demo and narrative entry |
| Trust Framework for AI Travel | Framework / Product Layer | Prototype Evidence | Trust, provenance, verification authority |
| Context-Aware Detours | Logic Module | Prototype Evidence | Environmental decision logic |
| Social Proximity Alerts | Logic Module | Prototype Evidence | Relational opportunity matching |
| Privacy-Preserving Social Graph | Logic Module | Prototype Evidence | Trust and privacy infrastructure |
| Semantic Travel Stories | Logic Module | Prototype Evidence | Narrative translation layer |

Recommended implementation pattern:

- Keep `travel-and-ai` in the main `PROJECTS` registry.
- Add a separate `HADE_PROJECTS` or `subProjects` metadata layer.
- Preserve the 10 dynamic nested HADE routes.
- Use the subproject taxonomy to power internal HADE navigation, not global site navigation.

## Missing Metadata

| Missing Field | Why It Matters |
|---|---|
| `practiceAreaPrimary` | Needed for homepage grouping, filters, consulting pages, and narrative consistency |
| `practiceAreasSecondary` | Captures cross-domain value without duplicating projects |
| `methods` | Makes the practice feel rigorous rather than purely conceptual |
| `outputs` | Lets pages become frameworks, reports, templates, audits, or products |
| `consultingRelevance` | Enables future service pages and business development pathways |
| `productPotential` | Helps decide what becomes a tool, template, report, or product |
| `resourcePotential` | Supports downloadable assets and publishing strategy |
| `nextRecommendedRoute` | Turns isolated projects into a guided practice narrative |
| `clientProofRole` | Lets old client work validate current systems claims |
| `evidenceSummary` | Makes evidence level understandable to visitors |
| `audience` | Distinguishes employers, clients, collaborators, and buyers |

## How the Taxonomy Supports the Practice Narrative

The taxonomy should make the site communicate one coherent story:

1. Dan studies complex real-world systems.
2. Those observations become frameworks.
3. Frameworks become applied concepts and prototypes.
4. Client work proves delivery capability.
5. The practice can become consulting, research publishing, workshops, and products.

The homepage and research-practice page already imply this. The taxonomy makes it operational.

## Recommended Public Navigation Groupings

Future navigation should not be organized only around "projects." Suggested public groupings:

| Group | Includes |
|---|---|
| Practice | Research Practice, Environmental Systems Design OS |
| Frameworks | Architecture of Confidence, Wayfinding Matrix, Trust Framework |
| Systems Concepts | Responsive Ecologies, Adaptive Outdoor Hospitality, Intention Engine |
| Prototypes | HADE, Field Notes, Digital Executor |
| Validation | Client Work, Purdue, TimberTech, Intel, Healthcare |
| Resources | Future reports, templates, methods, diagrams |

## Consulting and Product Potential

| Asset | Consulting Service Potential | Product / Resource Potential |
|---|---|---|
| Architecture of Confidence | Decision confidence audit, recovery design workshop, service trust review | Framework deck, worksheet, diagnostic |
| Environmental Systems Design OS | Research system setup, evidence architecture, practice OS consulting | Template library, operating manual, Notion system |
| Responsive Ecologies | Stewardship systems strategy, outdoor operations model, climate resilience workshop | Research report, scenario model, systems map |
| Adaptive Outdoor Hospitality Companion | Outdoor hospitality service audit, guest confidence mapping, recovery blueprint | Guest journey template, operations playbook |
| Wayfinding Matrix | Wayfinding and safety signal audit, non-screen guidance strategy | Field study format, prototype protocol |
| Intention Engine | Destination positioning, experience discovery strategy, guest intent mapping | Blueprint template, discovery framework |
| HADE | AI product strategy, trust and verification strategy, adaptive interface audit | Prototype case pack, trust framework resource |
| Field Notes | Field research tooling, observation system design | Mobile research template, field note kit |
| Digital Executor | Service recovery and handoff audit | Recovery workflow template |
| TimberTech | Commerce IA proof, content systems proof | Case proof only |
| Intel | Sustainability systems proof | Case proof, possible sustainability reporting angle |

## Metadata Implementation Plan for a Later Coding Pass

1. Keep current `PROJECTS` working fields untouched.
2. Add a nested `taxonomy` object per project rather than overloading existing top-level fields.
3. Add controlled TypeScript unions for:
   - `PracticeArea`
   - `ProjectStage`
   - `EvidenceLevel`
   - `PracticeMethod`
   - `ProjectOutput`
   - `ConsultingRelevance`
   - `ProductPotential`
   - `ResourcePotential`
4. Populate taxonomy first for independent research projects.
5. Populate client work second with conservative values.
6. Create separate HADE subproject metadata.
7. Add `nextRecommendedRoute` values after taxonomy is stable.
8. Only then update homepage grouping, filters, related-project links, or consulting pages.

## Recommended TypeScript Direction

Future implementation should look conceptually like this:

```ts
export type PracticeArea =
  | 'environmental-systems'
  | 'outdoor-hospitality'
  | 'decision-systems'
  | 'service-operations'
  | 'ai-product-systems'
  | 'enterprise-validation'
  | 'research-infrastructure'
  | 'destination-development';

export type ProjectStage =
  | 'exploratory'
  | 'research-backed-hypothesis'
  | 'concept-architecture'
  | 'prototype'
  | 'shipped-case-study'
  | 'operational';

export type ConsultingRelevance =
  | 'flagship'
  | 'strong'
  | 'moderate'
  | 'background';

export type ProductPotential = 'high' | 'medium' | 'low';

export interface ProjectTaxonomy {
  practiceAreaPrimary: PracticeArea;
  practiceAreasSecondary?: PracticeArea[];
  stage: ProjectStage;
  evidenceLevel: EvidenceLevel;
  methods?: PracticeMethod[];
  outputs?: ProjectOutput[];
  consultingRelevance?: ConsultingRelevance;
  productPotential?: ProductPotential;
  resourcePotential?: ProductPotential;
  nextRecommendedRoute?: string;
  audience?: string[];
  evidenceSummary?: string;
  clientProofRole?: string;
}
```

This should be added conservatively after the current registry remains stable.

## Strategic Priority

Build first:

- `practiceAreaPrimary`
- `projectType`
- `stage`
- `evidenceLevel`
- `methods`
- `outputs`
- `consultingRelevance`
- `productPotential`
- `resourcePotential`
- `nextRecommendedRoute`

Do not build yet:

- Complex public filters
- Downloadable resource library
- Consulting service automation
- Product store
- Deep internal CMS logic

## Final Recommendation

The practice taxonomy should become a clean internal governance layer before it powers visible UI. The current registry is already strong enough to support this next step, but the taxonomy should not immediately drive public navigation.

The strongest current asset is the combination of the Research Practice Hub, Environmental Systems Design OS, Architecture of Confidence, and Responsive Ecologies. Together, they form the beginning of a serious independent systems design practice.

The biggest gap is metadata separation. Navigation metadata, evidence metadata, consulting metadata, and product metadata are currently too close together.

Build the taxonomy layer first. Then use it to guide:

- Homepage grouping
- Practice navigation
- Consulting pages
- Related project paths
- Downloadable resources
- Future productized frameworks

The taxonomy should make the site feel less like a portfolio archive and more like a coherent practice system where every project has a role, evidence level, business use, and next step.
