# Portfolio Narrative Architecture Audit

Date: 2026-06-27
Scope: Entire portfolio as the public-facing website of an Independent Systems Design Practice
Lens: Narrative coherence, business objective, Practice OS contribution, redundancy, category role, and recommended next navigation

## Executive Summary

The portfolio already contains the ingredients of a serious independent systems design practice: origin story, research infrastructure, frameworks, environmental concepts, experimental builds, field observations, and professional validation. The strategic issue is not lack of material. The issue is narrative sequencing.

The site currently reads like a high-end multidisciplinary portfolio with a systems practice inside it. It should read like a systems design practice with portfolio evidence underneath it.

The strongest public narrative path should become:

```text
Vision -> Practice Method -> Framework -> Concepts -> Experimental Builds -> Professional Validation -> Services / Contact
```

Current overall narrative coherence score: **3.4 / 5**

## Core Diagnosis

The portfolio is strategically rich but publicly under-integrated. Individual pages often explain themselves well, especially the independent research and concept pages. The homepage, metadata, footer, and cross-linking system do not yet make the full story obvious enough for a new visitor.

The core narrative problem:

> The work is organized as pages, but not yet as a visitor journey.

The core opportunity:

> Make every page answer: where did this come from, what does it prove, and where should the visitor go next?

## 1. Narrative Map

| Page / Surface | Current Role | Business Objective | Practice OS Contribution | Recommended Category | Natural Next Page |
|---|---|---|---|---|---|
| Homepage | Personal and practice front door | Explain who Dan is and why systems design matters | Establishes origin, lens, and two work tracks | Vision | `/projects/research-practice` |
| About / Lens Behind the Work | Origin story | Build credibility through landscape architecture, urban design, digital systems, and field observation | Explains why the practice sees physical and digital systems together | Vision / Career | Research Practice |
| Homepage Work Section | Practice split | Route visitors into self-directed research or professional validation | Introduces two public bodies of work | Strategy / Navigation | Research Practice first, Client Work second |
| Homepage Travelogue | Field observation proof | Show that travel is research, not decoration | Establishes global observation base | Field Studies | `/projects/field-notes` or Environmental Systems Design OS |
| `/projects/research-practice` | Practice hub | Explain pipeline from observation to framework to concept/build | Public front door to Practice OS | Vision / Strategy | Environmental Systems Design OS |
| `/projects/environmental-systems-design-os` | Method engine | Prove the practice has research infrastructure and evidence governance | Shows observation -> evidence -> artifact -> framework | Research / Resource | Architecture of Confidence |
| `/projects/architecture-of-confidence` | Flagship framework | Show transferable methodology for uncertainty, trust, and recovery | Public framework library anchor | Framework | Applied concepts |
| `/projects/wayfinding-matrix` | Applied concept | Apply ambient guidance and confidence logic to outdoor landscapes | Conceptualizes field navigation and operations | Concept | Architecture of Confidence or Responsive Ecologies |
| `/projects/intention-engine` | Applied concept | Show semantic and environmental experience design | Extends practice into hospitality, meaning, and service recovery | Concept / Product Seed | Adaptive Ranch |
| `/projects/adaptive-ranch-experience-companion` | Applied hospitality concept | Connect guest experience, operations, stewardship, and recovery | Bridges hospitality and environmental systems | Concept / Service Seed | Responsive Ecologies |
| `/projects/responsive-ecologies` | Flagship synthesis | Show highest-order environmental systems concept | Synthesizes OS, Architecture of Confidence, and Adaptive Ranch | Concept / Product Seed | Environmental Systems Design OS |
| `/projects/travel-and-ai` / HADE | Experimental build | Prove adaptive decision-support logic | Shows productized decision engine | Product / Build | Field Notes or Architecture of Confidence |
| `/projects/field-notes` | Field capture layer | Turn observation into reusable decision playbooks | Converts field evidence into product/research corpus | Research / Product | HADE |
| `/projects/digital-executor` | Recovery automation concept | Show service recovery and agentic execution | Applies confidence/recovery logic to travel disruption | Product / Service Seed | Architecture of Confidence |
| `/projects/previous` | Professional validation hub | Prove real-world implementation credibility | Validates systems thinking under client constraints | Validation / Career | Strong client pages or Research Practice |
| `/projects/purdue` | Enterprise IA proof | Show audit, migration, stakeholder alignment, and validation | Professional proof of research -> implementation loop | Validation / Service | Environmental Systems Design OS |
| Professional client pages | Execution proof | Demonstrate implementation across sectors | Validate frameworks and methods in real organizations | Validation | Related framework/concept |
| `/mockups/trust-verification-report` | Collateral/mockup | Potential future resource artifact | Could support trust/evidence resource library | Resource / Internal | Hide or contextualize |
| `/sandbox/systems-module` | Internal preview | Component testing | Supports case-study architecture internally | Internal | No public next step |
| `/favicon-generator` | Utility | None for public narrative | Does not support Practice OS | Internal | Remove from public story |
| `/projects/timbertech/details` | Legacy detail page | Shows TimberTech visuals | Duplicates canonical TimberTech page | Validation Duplicate | Merge / retire |

## 2. Missing Narrative Connections

### Missing Visitor Journey

The public story should move visitors through a deliberate sequence:

```text
Homepage
  -> Research Practice
  -> Environmental Systems Design OS
  -> Architecture of Confidence
  -> Applied Concepts
  -> Experimental Builds
  -> Professional Validation
  -> Contact / Services
```

The pages exist, but this pathway is not yet consistently surfaced.

### Missing Practice Identity Consistency

The homepage still uses "Multidisciplinary Designer" while the research hub uses "Systems Design Practice." The root metadata still says "Digital Designer & Developer." These labels are not wrong, but they create a blurred identity.

Recommended public identity:

> Dan Meier — Systems Design Practice

Supporting language:

> Designing systems and experiences for people moving through complex digital, environmental, and operational contexts.

### Missing Business Bridge

The site has research, concepts, and validation, but no clear service bridge. A visitor can admire the work, but they are not clearly shown how to engage the practice.

Needed bridge:

- What problems the practice helps with.
- What kinds of audits, frameworks, or concept systems are available.
- Which proof pages validate those offers.
- How to start a conversation.

### Missing Validation Links

Client work currently validates the practice implicitly. It should validate specific frameworks and methods explicitly.

Examples:

- Purdue validates audit -> restructure -> re-audit.
- TimberTech validates design-system rationalization.
- McDonald's validates decision logic, personalization boundaries, and user testing.
- AdviseStream validates funnel and state-system improvement.
- Sphere validates enterprise product systems and data-model thinking.

## 3. Redundant Stories

| Redundancy | Issue | Recommendation |
|---|---|---|
| Homepage Travelogue vs Field Notes | Both present global travel as field research. | Keep homepage as teaser; make Field Notes the operational research/product page. |
| Research Practice vs Environmental Systems Design OS | Both explain practice structure. | Position Research Practice as public front door; OS as evidence/method engine. |
| HADE vs Field Notes | Both describe adaptive travel intelligence. | Field Notes = input/corpus layer; HADE = decision engine. |
| Adaptive Ranch vs Responsive Ecologies | Both involve outdoor hospitality/stewardship systems. | Adaptive Ranch = hospitality and operations; Responsive Ecologies = broader stewardship synthesis. |
| Digital Executor vs Architecture of Confidence | Both address recovery and confidence. | Digital Executor = applied recovery product; Architecture of Confidence = underlying framework. |
| TimberTech details vs TimberTech case study | Legacy details duplicate canonical project. | Merge useful evidence into canonical client page and retire detail page from public navigation. |
| Utility/mockup routes | Do not support narrative unless framed. | Hide, noindex, or convert into resource collateral only if useful. |

## 4. Recommended Cross-Links

### Homepage

- Primary route: `/projects/research-practice`
- Secondary route: `/projects/previous`
- Field observation route: `/projects/field-notes`

### Research Practice Hub

- Next: `/projects/environmental-systems-design-os`
- Then: `/projects/architecture-of-confidence`
- Then: concept cluster: Wayfinding, Intention, Adaptive Ranch, Responsive Ecologies.

### Environmental Systems Design OS

Already has strong internal cross-links. Keep and strengthen:

- Architecture of Confidence as framework origin.
- Adaptive Ranch as applied system.
- Responsive Ecologies as flagship synthesis.
- Wayfinding Matrix as system concept.

### Architecture of Confidence

Recommended outbound links:

- Environmental Systems Design OS as source.
- Wayfinding Matrix as landscape/wayfinding application.
- Adaptive Ranch as hospitality/operations application.
- HADE as adaptive decision-support application.
- Digital Executor as recovery automation application.
- McDonald's Kiosk as professional validation of decision logic.

### Field Notes

Recommended outbound links:

- HADE as decision engine.
- Environmental Systems Design OS as evidence infrastructure.
- Homepage Travelogue as field-observation surface.

### HADE

Recommended outbound links:

- Field Notes as corpus/input layer.
- Architecture of Confidence as decision-confidence framework.
- Digital Executor as service-recovery extension.

### Digital Executor

Recommended outbound links:

- Architecture of Confidence.
- HADE.
- Professional validation examples: AdviseStream, McDonald's, Healthcare.

### Responsive Ecologies

Recommended outbound links:

- Environmental Systems Design OS.
- Architecture of Confidence.
- Adaptive Ranch.
- Wayfinding Matrix.

### Client Work Hub

Recommended outbound links:

- Research Practice: "See the independent systems practice this work validates."
- Environmental Systems Design OS: "See the method behind the audits and frameworks."

### Client Project Cross-Links

| Client Project | Recommended Link | Narrative Reason |
|---|---|---|
| Purdue | Environmental Systems Design OS | Audit, evidence, restructure, validation loop. |
| TimberTech | Future design-system rationalization framework | Design-system cleanup as repeatable service. |
| Healthcare | Architecture of Confidence | Branching, compliance, error recovery, high-stakes clarity. |
| McDonald's Kiosk | Architecture of Confidence / HADE | State-machine logic, personalization boundaries, user testing. |
| Intel | Research Practice | Concept pipeline and research-to-roadmap signal. |
| Nodalytics | Concept/product development | Pitch prototype and information hierarchy. |
| Newdea | Concept/product development | Multi-stakeholder role flows and screen architecture. |
| DoubleGood | IA/product taxonomy service | Catalog and filter logic. |
| AdviseStream | Digital Executor / Architecture of Confidence | Funnel recovery and cross-device persistence. |
| Sphere Software | Digital Executor / service systems | Enterprise product, data flow, and operational state. |
| Havas Agency | Implementation evidence | Flow charts, functional specs, campaign systems. |
| Rich Products | Wayfinding / IA framework | Product taxonomy and route-to-purchase pathing. |

## 5. Homepage Narrative Improvements

The homepage should become less "portfolio of a talented multidisciplinary person" and more "front door to an independent systems design practice."

### Keep

- Landscape architecture origin.
- People / places / systems thesis.
- Field observation across 40+ countries.
- Two-track work section.
- Client work as credibility.
- Personal voice and photographic evidence.

### Clarify

- Use one public practice identity consistently.
- Name the practice above the fold.
- Explain the visitor path into the work.
- Reframe Travelogue as Field Studies or field observation, not merely travel media.
- Connect professional work to validation rather than presenting it as a separate portfolio identity.

### Recommended Homepage Narrative Arc

1. **Hero / Vision**
   - Who this is.
   - What the practice studies.
   - Why systems design is the lens.

2. **Origin / Lens**
   - Landscape architecture and urban design as training in systems.
   - Digital product and service work as implementation discipline.
   - Field observation as research method.

3. **Practice Path**
   - Research Practice.
   - Environmental Systems Design OS.
   - Frameworks.
   - Concepts.
   - Experimental builds.
   - Professional validation.

4. **Field Studies**
   - Travel as environmental observation.
   - Link to Field Notes.

5. **Professional Validation**
   - Client work as proof under real constraints.

6. **Contact / Services Bridge**
   - Audits, frameworks, concept development, implementation validation.

### Homepage Copy Direction

The homepage does not need a full redesign. It needs sharper narrative hierarchy:

- Replace "Multidisciplinary Designer" with a practice identity.
- Avoid making "travel" feel like a separate creative portfolio.
- Route visitors to Research Practice before individual projects.
- Add one short "what this practice can help with" bridge near contact.

## 6. Practice Narrative Score

Overall narrative coherence: **3.4 / 5**

| Dimension | Score | Notes |
|---|---:|---|
| Vision clarity | 3 | Strong underlying thesis, but naming is inconsistent. |
| Practice method | 4 | OS, framework, evidence path, and pipeline are strong. |
| Project categorization | 4 | Research, framework, concept, and build categories already exist. |
| Cross-page continuity | 2.5 | Pages are individually strong but do not consistently hand off to each other. |
| Business conversion path | 2 | No clear services or consulting path yet. |
| Evidence / validation | 4 | Strong assets, especially OS and client work. |
| Redundancy control | 3 | Some duplicate stories and legacy routes remain. |

### Narrative Strengths

- Strong origin story from landscape architecture and urban design.
- Distinct independent research practice.
- Clear OS/method page.
- Strong flagship framework.
- Strong environmental systems concept cluster.
- Professional work validates implementation capacity.
- Field observation is a credible differentiator.

### Narrative Weaknesses

- Practice identity is not yet named consistently.
- Homepage does not clearly sequence the whole story.
- Footer navigation bypasses the research/practice spine.
- Client work is not visibly tied to frameworks.
- Product/build pages sometimes feel like separate product experiments instead of outputs of the same practice.
- No public service/consulting bridge.

## 7. Prioritized Recommendations

### Immediate: 0-30 Days

1. **Unify the public identity**
   - Adopt one practice label across homepage, metadata, footer, and hubs.
   - Recommended: "Dan Meier — Systems Design Practice."

2. **Make `/projects/research-practice` the primary next step**
   - Homepage should send visitors there before individual builds.

3. **Update footer narrative links**
   - Add Research Practice.
   - Add Environmental Systems Design OS.
   - Keep Architecture of Confidence.
   - Keep Client Work as validation.

4. **Reframe Client Work**
   - Present it as "Professional Validation" or "Client Work / Validation."
   - Add a sentence that explains how it validates the independent systems practice.

5. **Add cross-links to top proof pages**
   - Purdue -> Environmental Systems Design OS.
   - McDonald's -> Architecture of Confidence / HADE.
   - TimberTech -> future design-system method.
   - AdviseStream -> Digital Executor / Architecture of Confidence.

6. **Hide or de-emphasize public utility routes**
   - `/favicon-generator`
   - `/sandbox/systems-module`
   - `/projects/timbertech/details`
   - `/mockups/trust-verification-report`, unless converted into a resource.

### Near-Term: 1-3 Months

1. **Create a Services / Consulting page**
   - Keep it lightweight.
   - Anchor it in proof, not sales theatrics.
   - Suggested offers:
     - Systems Implementation Audit.
     - Decision Logic / Funnel Audit.
     - Environmental Experience Systems Audit.
     - Concept-to-Framework Sprint.

2. **Reclassify Field Notes**
   - Publicly treat it as Field Studies / Research Product rather than only Experimental Build.

3. **Add "validated by" sections**
   - Framework pages should cite relevant professional work.
   - Client pages should link back to the frameworks they validate.

4. **Build a public Framework Library**
   - Start with Architecture of Confidence.
   - Add named framework stubs for Wayfinding Matrix, Intention Engine, and design-system/decision-logic methods.

5. **Clarify the concept trilogy**
   - Adaptive Ranch = hospitality operations.
   - Wayfinding Matrix = outdoor navigation / safety / autonomy.
   - Responsive Ecologies = stewardship synthesis.

### Mid-Term: 3-12 Months

1. **Build a Resource Library**
   - Curated reports, diagrams, evidence notes, field study formats, and downloadable PDFs.

2. **Publish field-study formats**
   - Convert Travelogue into field-study evidence, not just media.

3. **Package professional evidence**
   - Turn selected client artifacts into capability proof pages.

4. **Create a public Practice OS map**
   - Show how Vision, Research, Frameworks, Concepts, Validation, Services, and Resources fit together.

5. **Develop product roadmap pages only after validation**
   - Avoid overbuilding product surfaces before the consulting/service story is clear.

## Recommended Page Dispositions

| Surface | Keep Public | Reframe | Hide / Internal | Build Later |
|---|:--:|:--:|:--:|:--:|
| Homepage | x | x |  |  |
| Research Practice | x | x |  |  |
| Environmental Systems Design OS | x |  |  |  |
| Architecture of Confidence | x |  |  |  |
| Wayfinding Matrix | x | x |  |  |
| Intention Engine | x | x |  |  |
| Adaptive Ranch | x | x |  |  |
| Responsive Ecologies | x |  |  |  |
| Field Notes | x | x |  |  |
| HADE | x | x |  |  |
| Digital Executor | x | x |  |  |
| Professional Client Work | x | x |  |  |
| Client Detail Pages | x | x |  |  |
| Trust Verification Mockup |  | x | x | x |
| Sandbox Systems Module |  |  | x |  |
| Favicon Generator |  |  | x |  |
| TimberTech Details |  | x | x |  |

## Final Strategic Recommendation

The portfolio should evolve into a public practice narrative with one clear spine:

```text
Dan Meier — Systems Design Practice
  -> researches complex environments
  -> converts observations into evidence
  -> develops frameworks
  -> tests them through concepts and builds
  -> validates them through professional implementation
  -> offers audits, frameworks, and systems design support
```

The highest-impact improvement is not visual redesign. It is narrative routing.

Every major page should answer:

1. What layer of the practice am I looking at?
2. What does this page prove?
3. What did it build on?
4. What should I read next?
5. How could this become useful to a client, collaborator, or employer?

The current site is one good integration pass away from feeling like a coherent independent systems design practice rather than a collection of impressive but partially separate project worlds.
