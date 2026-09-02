// Static content + section map for the Whitetail Club & Shore Lodge case study.
//
// SOURCE GOVERNANCE — read before editing.
// Every claim on this page derives from the frozen project artifacts in
// docs/whitetail/ (00-project-governance.md and the numbered phase artifacts).
// Those artifacts are the source of record and must NOT be edited to suit this page.
//
// Four rules carried from that governance into this file:
//   1. No property facts beyond what the research attests.
//   2. No individual names — role titles only.
//   3. The 28-zone D3 figure is a [DH] test parameter, never a property fact.
//      The [DH] marker is mandatory at every occurrence.
//   4. Nothing here may imply commission, deployment, adoption, or field validation.
//   5. Operating-domain grounding is tiered. Turf agronomy, irrigation conditions,
//      drainage, crew coordination, the winterization sequence, and snow storage are
//      attested [SRC] and may be described. Equipment enters only as crew capacity.
//      Snow clearing as scheduled labor, pathway/trail networks, exterior lighting, and
//      member property maintenance are NOT attested anywhere in docs/whitetail/ — the
//      trail network was removed as untraceable and TRAIL was dropped as an entity type.
//      Those four appear on this page only as a stated scope boundary, never as claims.
//      Do not print the diversion/acreage caps (a legal limit is not a measurement) or
//      fleet lease terms (commercially sensitive — structural insight, not numbers).
//   6. No test in this project was ever run against an operating condition. Every
//      measured result is structural — pixels, DOM structure, tap counts. Operating
//      conditions appear in exactly two forms: as the content the measured wireframes
//      rendered (quoted verbatim from docs/whitetail/wireframes/*.html), and as the
//      Phase 06 pressure-case analysis, which is labelled [OPERATIONAL HYPOTHESIS] and
//      carries no measurement. Never promote either into a claimed operational result.
//      There are no outcome metrics anywhere in this project — no water saved, no time
//      saved, no incidents avoided. Do not invent one.

export const CONTENT_BOUNDS = 'container mx-auto px-6 md:px-8';

export type SectionNavItem = { id: string; label: string };

// Per-tab in-page scrollspy arrays, one per route under the tab architecture
// (app/projects/whitetail-club/{, architecture, stress-testing,
// resulting-surfaces}/page.tsx). Split from the single 13-item flat array
// this page used before the tab restructure — same ids, same labels, same
// order, just partitioned by tab. `wt-thesis` is intentionally omitted from
// every array: the thesis section still renders on the Overview tab in its
// same position, but at 22 words it doesn't carry its own scrollspy anchor.
// Order within each array must match that tab's document order — the rail
// is a scrollspy, so a mismatch makes the active indicator travel backwards
// during a forward scroll.
export const overviewSections: SectionNavItem[] = [
  { id: 'wt-hero', label: 'Overview' },
  { id: 'wt-context', label: 'Context' },
  { id: 'wt-insufficient', label: 'Why not' },
  { id: 'wt-boundary', label: 'Boundary' },
];

export const architectureSections: SectionNavItem[] = [
  { id: 'wt-system', label: 'Systems' },
  { id: 'wt-epistemic', label: 'Intelligence' },
  { id: 'wt-interaction', label: 'Experience' },
];

export const stressTestingSections: SectionNavItem[] = [
  { id: 'wt-wireframes', label: 'Pressure' },
  { id: 'wt-review', label: 'Review' },
  { id: 'wt-asymmetry', label: 'Asymmetry' },
];

export const resultingSurfacesSections: SectionNavItem[] = [
  { id: 'wt-surfaces', label: 'Surfaces' },
  { id: 'wt-practice', label: 'Practice' },
];

/** Independent-practice disclaimer. Carried verbatim; do not soften. */
export const INDEPENDENT_DISCLAIMER =
  'Independent research and systems-design exploration. No client relationship; ' +
  'the property did not commission, review, or adopt this work. Interventions are conceptual.';

export const HERO = {
  eyebrowLeft: 'Independent Case Study',
  eyebrowRight: 'Concept — Not Deployed',
  title: 'Whitetail Club & Shore Lodge',
  subtitle: 'Stewardship Intelligence System',
  standfirst:
    'A structural design exploration for a mountain property whose hardest operating problem is not maintenance. ' +
    'It is that the landscape has no persistent, addressable record of its own state, history, and reasoning — ' +
    'so what the crew learns each season leaves with them.',
} as const;

export const THESIS =
  'True stewardship isn’t about changing beliefs; ' +
  'it’s about preventing the system from forgetting why those beliefs matter.';

export const GUARDRAIL =
  'Visual design is an implementation of the epistemic contract, not a new opportunity to interpret it.';

/** 01 // Context */
export const contextPoints = [
  {
    label: 'A property that is several properties',
    body:
      'A championship golf course, a second short course, residential subdivisions, forest buffer, and lake ' +
      'frontage — managed as one operation under one grounds hierarchy.',
  },
  {
    label: 'A workforce that turns over by design',
    body:
      'Seasonal crews arrive, learn a large and unfamiliar landscape, and leave. The knowledge of where things ' +
      'are and how each place behaves is held individually and lost on departure.',
  },
  {
    label: 'Decisions bounded by hours, not quarters',
    body:
      'A frost delay decided before dawn. A fungicide window measured in hours. An irrigation shutdown past ' +
      'which mainlines crack. Several of the highest-stakes calls cannot be revisited.',
  },
];

/** 02 // Why conventional operational interfaces were insufficient */
export const insufficientRows = [
  {
    conventional: 'Work-order / CMMS',
    fails:
      'Tracks tasks, not places. Work closes and nothing accumulates — the landscape stays exactly as illegible ' +
      'as it was.',
  },
  {
    conventional: 'GIS',
    fails:
      'Answers “what is the spatial relationship between these features.” The field question is “what do I need ' +
      'to know about where I am standing.”',
  },
  {
    conventional: 'Operational dashboard',
    fails:
      'Answers “how are things.” Nobody needed that. They needed “what needs a person, and how sure are we.”',
  },
  {
    conventional: 'Sensor / telemetry platform',
    fails:
      'Would have required infrastructure the research does not establish. Designing around it would have made ' +
      'the concept unbuildable and the case study dishonest.',
  },
];

/** 03 // Stewardship architecture — the five systems the landscape actually runs on.
 *  Grounding is tiered per rule 5 in the header. Every operating detail below is
 *  attested [SRC] in docs/whitetail/; nothing here asserts technology, telemetry,
 *  or automated control, and no individual is modeled. */
export const stewardshipSystems = [
  {
    name: 'Experience Systems',
    domain: 'The field encounter',
    body:
      'What a person meets while standing on the place, in the minutes they have before the next job. ' +
      'Designed for a gloved hand, flat morning light, and a crew that is bilingual by requirement — so ' +
      'the surface answers “what is here and what has already been tried,” and asks one question back.',
    holds: 'Place · Capture',
  },
  {
    name: 'Stewardship Systems',
    domain: 'Turf, forest buffer, shoreline',
    body:
      'The agronomic judgment that has to be right the first time. A fall snow-mold application has roughly ' +
      'forty-eight hours; erosion compounds while mowing does not. These calls are made on handheld ' +
      'readings and a walk, which is why every condition carries how it came to be known.',
    holds: 'Condition · Observation',
  },
  {
    name: 'Operations Systems',
    domain: 'Crew hours, turnover, equipment availability',
    body:
      'Golf, parks, and janitorial work under one grounds hierarchy across a compressed four-to-five-month ' +
      'window. More necessary work than available crew-hours is the normal state of a shoulder season, and ' +
      'a leased fleet under contractual usage ceilings with a mechanic absorbed by reactive repair sets the ' +
      'real ceiling on what a day can hold.',
    holds: 'Decision · Task — capacity only; no individual is modeled',
  },
  {
    name: 'Infrastructure Systems',
    domain: 'Irrigation, drainage, snow storage, winterization',
    body:
      'The continuous physical systems underneath the landscape. Irrigation blowout has a point past which ' +
      'mainlines crack. Spring runoff moves through historic ditches whose paths are poorly documented and ' +
      'past buried utilities with incomplete as-builts, and it is cleared of ice and debris by hand. Snow ' +
      'storage and emergency access are designated before the ground closes.',
    holds: 'Place, by regime — no sensors, no telemetry, no network model',
  },
  {
    name: 'Intelligence Systems',
    domain: 'What the operation knows, and how well',
    body:
      'The layer that survives the season. Seasonal turnover resets the undocumented knowledge of this ' +
      'landscape to zero on a schedule, and the reasoning behind a decision is the artifact that does not ' +
      'exist in this operation today. Every other system above deposits into this one or reads from it.',
    holds: 'Knowledge record · Decision reasoning',
  },
] as const;

/** 03 // The stated scope boundary. Four operating domains a reader of a resort
 *  grounds operation will expect, and which this architecture deliberately does not
 *  cover. Each line is a refusal with a reason — none may be softened into a claim. */
export const architectureBoundary = [
  {
    domain: 'Snow clearing as scheduled labor',
    reason:
      'Snow storage is modeled as a place and winterization as a window, because both are attested. Plow ' +
      'routes, clearing crews, and priority orders are not, so they are not designed.',
  },
  {
    domain: 'Pathway and trail networks',
    reason:
      'Paths and roads exist here only as located segments. A recreational trail network appeared in an ' +
      'earlier draft of this work and was removed as untraceable to any source — designing around one ' +
      'would have made the case study dishonest.',
  },
  {
    domain: 'Exterior lighting',
    reason:
      'Absent from the research at every tier. Adding it would be invention, and invention is the specific ' +
      'failure this project was built to resist.',
  },
  {
    domain: 'Member property maintenance',
    reason:
      'Residential landscape sits inside the same operation, but homeowner-facing service carries a ' +
      'different duty of care and a different product. Out of scope by decision, not by oversight.',
  },
] as const;

/** 04 // System architecture — the defining loop */
export const loopNodes = [
  { id: 'place', label: 'Place', note: 'located' },
  { id: 'condition', label: 'Condition', note: 'and how it is known' },
  { id: 'decision', label: 'Decision', note: 'and why it was made' },
  { id: 'action', label: 'Action', note: 'what was done' },
  { id: 'observation', label: 'Observation', note: 'what was found' },
] as const;

export const loopAnnotations = [
  {
    on: 'Place',
    text: '“Located” is the root requirement. Anything that cannot be addressed cannot carry a history.',
  },
  {
    on: 'Condition',
    text: '“How it is known” is the provenance. Without it, an assumption and a measurement look identical.',
  },
  {
    on: 'Decision',
    text: '“Why it was made” is the artifact that does not exist in this operation today — and the one that lets judgment compound.',
  },
];

/** 05 // Epistemic architecture — confidence as reason, never as score */
export const confidenceBands = [
  { meaning: 'Someone saw or measured this recently, and nothing disagrees', reads: 'Checked this morning.' },
  {
    meaning: 'Checked, but long enough ago that it may have moved on',
    reads: 'Last looked at nine days ago; drainage changes in about a week.',
  },
  { meaning: 'Nobody has ever checked. It came from a record', reads: 'This is from the old drawing. Nobody’s confirmed it.' },
  {
    meaning: 'Two people saw different things, close enough in time that both can’t be right',
    reads: 'Two of us disagreed on Tuesday. Too close together to be change.',
  },
  { meaning: 'We tried to settle this and could not', reads: 'Searched it in October. Didn’t find it.' },
];

/** 06 // The four/five distinction */
export const answerValueMap = [
  { answer: 'Found it', value: 'confirmed' },
  { answer: 'Found the place — couldn’t tell', value: 'inconclusive' },
  { answer: 'Found something different', value: 'contradicted' },
  { answer: 'Not there', value: 'absent  ·  absent-at-described-location', branches: true },
];

/** 06 // Operating pressure the design has to survive.
 *  Transcribed from docs/whitetail/06-operational-validation.md §F.1. That document is
 *  labelled [OPERATIONAL HYPOTHESIS] throughout and contains NO measurements — it is
 *  reasoning about how people behave under pressure, not evidence about how they did.
 *  The `damage` ratings are the source document's own words. Do not soften them, and do
 *  not present any of this as a tested or observed result. */
export const pressureCases = [
  {
    pressure: 'A closing window',
    temptation: 'Skip verification and proceed on an assumption',
    damage: 'None — this is a supported path',
    fatal: false,
  },
  {
    pressure: 'Guest-visible impact',
    temptation: 'Mark a condition confirmed to avoid explaining thin grounds',
    damage: 'Fatal',
    fatal: true,
  },
  {
    pressure: 'Staffing shortage',
    temptation: 'Skip observations; batch them from recall at the end of the day',
    damage: 'Degrading',
    fatal: false,
  },
  {
    pressure: 'Weather event',
    temptation: 'Copy forward last cycle’s readiness rather than re-checking',
    damage: 'Fatal',
    fatal: true,
  },
  {
    pressure: 'Leadership scrutiny',
    temptation: 'Falsify the evidence basis so a decision looks better-grounded than it was',
    damage: 'Fatal',
    fatal: true,
  },
] as const;

/** 06 // What each surface was loaded with before it was measured.
 *  `condition` strings are quoted VERBATIM from docs/whitetail/wireframes/*.html — they
 *  are the content the tested artifact rendered, not property facts. The hour and minute
 *  figures inside them are illustrative test content; no such interval is established
 *  anywhere in the research. `measured` names the structural property that was actually
 *  measured on that surface — the only kind of measurement this project produced. */
export const scenarioLoad = [
  {
    surface: 'Decision — winterization sequencing',
    condition: 'Irrigation blowout: point of no return in ~18 hours · Snow mold application window closes in ~40 hours',
    measured: 'Vertical overflow at 28 zones [DH], and the horizontal start point of every reason phrase.',
  },
  {
    surface: 'Contested condition — drainage',
    condition: 'Drainage state — two disagree · one account reads clear, the other standing water',
    measured: 'Whether vertical order made the later observation read as the true one, across four arrangements.',
  },
  {
    surface: 'Returned grounds — frost delay',
    condition: 'Frost delay — open or hold · frost present · measured 06:04, uncontested · Play scheduled in 38 minutes.',
    measured: 'Whether the outcome could be visually separated from the grounds it rested on.',
  },
  {
    surface: 'Attention — what needs a person',
    condition: 'Blowout window closes in ~36 hours · Snow mold window opens in ~4 days',
    measured: 'Whether a stateless list had re-grown a count, a completion state, or an inbox rhythm.',
  },
  {
    surface: 'Place — absence adjacency',
    condition: 'drainage readiness · never checked — irrigation valve (north) · looked, no answer — drainage line (east) · confirmed not present',
    measured: 'Whether three different kinds of not-knowing survived side by side without truncation, down to 320px.',
  },
  {
    surface: 'Capture — the write path',
    condition: 'The one functional surface. Four answers, clicked through for real rather than drawn.',
    measured: 'The number of taps each answer costs to commit.',
  },
] as const;

/** 08 // What was never stress-tested. Each line is a stated limit, not a claim.
 *  None may be softened, and none may be converted into an outcome. */
export const resilienceBoundary = [
  {
    gap: 'Equipment downtime',
    reason:
      'A leased fleet and a reactive repair load are real constraints on what a day can hold, but equipment ' +
      'lifecycle is a different domain with its own logic. It enters this model only as crew capacity, and no ' +
      'surface was ever loaded with a breakdown.',
  },
  {
    gap: 'A real crew, in a real season',
    reason:
      'Every measurement here was taken against rendered HTML, not against people. No crew has used any of ' +
      'this, in any weather, on any day.',
  },
  {
    gap: 'Whether absence gets recorded at all',
    reason:
      'The whole concept rests on people recording what they did not find. Whether they would is untested, is ' +
      'named in the research as the largest open risk, and is exactly what the asymmetry below threatens.',
  },
  {
    gap: 'Guest-facing service',
    reason:
      'Guest-visible pressure is modeled as a force acting on the crew, because that is what the research ' +
      'supports. Nothing here serves a guest, and no guest-facing surface was designed or tested.',
  },
] as const;

/** 08 // Independent adversarial review — the five corrected findings */
export const reviewFindings = [
  {
    code: 'A11',
    title: 'Alignment had quietly become a ranking',
    found:
      'Every one of the 28 test-parameter zone rows [DH] started its reason text at the same x-coordinate — ' +
      'measured spread 0.00px. ' +
      'A column of aligned short phrases is a scale, whether or not anything is sorted.',
    fixed: 'Rows restructured so the label and its reason occupy separate lines.',
    verified: '0 of 40 label/reason pairs share a line after the fix — re-measured, not assumed.',
  },
  {
    code: 'A3',
    title: 'Attention had quietly become an inbox',
    found:
      'A uniform row rhythm plus a trailing chevron reproduced the canonical notification-list pattern — in a ' +
      'surface with deliberately no count, no assignment, no completion and no dismiss.',
    fixed: 'Chevron removed; the row itself is the affordance.',
    verified: 'Zero chevron glyphs remain.',
  },
  {
    code: 'A2',
    title: 'Ordering implied that recency meant authority',
    found:
      'Two contested observations must read as peers. Stacked chronologically, the later one reads as current ' +
      'and therefore true — which the architecture explicitly denies within the decay window.',
    fixed:
      'Four arrangements were drawn and compared rather than one being assumed. No vertical order is neutral; ' +
      'the explanation has to carry what the layout cannot.',
    verified: 'Recorded as a comparison exhibit — which arrangement ships is deliberately still open.',
  },
  {
    code: '—',
    title: 'The markup did not do what its own annotation claimed',
    found:
      'Attention rows were annotated as interactive but were bare non-interactive elements — zero of them ' +
      'appeared in the keyboard tab order.',
    fixed: 'Rows converted to real buttons.',
    verified: 'All three now focusable and keyboard-operable.',
  },
  {
    code: '—',
    title: 'Real content caught what placeholder text would have hidden',
    found:
      'One generated phrase read “…ages in about a week.” It passes a literal check for the forbidden internal ' +
      'vocabulary. It is also one synonym away from re-introducing that vocabulary through prose.',
    fixed: 'Changed to “changes” — which is the verb the project’s own canonical phrasing already used.',
    verified: 'This is only findable with real content. Lorem ipsum cannot fail this test.',
  },
];

/** 10 // Evidence boundary */
export const evidenceBoundary = {
  established: [
    'A complete system architecture, information model, and interaction architecture.',
    'Six wireframes built as real, rendering HTML — one of them functional.',
    'An independent adversarial review that found real defects, five of which were corrected and re-verified by measurement.',
    'Structural verification: measured overflow, measured alignment, measured tap costs, measured keyboard order.',
  ],
  notClaimed: [
    'No client relationship. The property did not commission, review, or adopt this work.',
    'No deployment. Nothing here has been used by anyone in the field.',
    'No operational validation. Whether crews would record what they did not find is untested and is the concept’s largest open risk.',
    'No sensors, telemetry, or automated irrigation are claimed to exist at the property.',
    'No measured outcomes — no water saved, no time saved, no incidents avoided.',
  ],
};

/** 11 // What this demonstrates */
export const practicePoints = [
  {
    label: 'Refusal is a design act',
    body:
      'Most of this interface is defined by what it declines to offer: no confidence score, no control that ' +
      'resolves a disagreement, no count on the attention list, no separate “complete” button. Each absence is ' +
      'load-bearing, and each one had to survive a reviewer actively trying to reintroduce it.',
  },
  {
    label: 'Build the thing that can fail',
    body:
      'The capture surface was built as working code rather than a picture. That single decision produced the ' +
      'project’s hardest finding — a conflict invisible in every static artifact that preceded it.',
  },
  {
    label: 'Stopping is part of the work',
    body:
      'The final finding was reduced to one binary question, its consequences mapped, and then left unresolved ' +
      'pending authorization. Deciding it unilaterally would have been faster and less defensible.',
  },
];
