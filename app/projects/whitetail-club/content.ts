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

export const CONTENT_BOUNDS = 'container mx-auto px-6 md:px-8';

export type SectionNavItem = { id: string; label: string };

export const sectionNavigation: SectionNavItem[] = [
  // Order must match document order — the rail is a scrollspy, so a mismatch
  // makes the active indicator travel backwards during a forward scroll.
  { id: 'wt-hero', label: 'Overview' },
  { id: 'wt-thesis', label: 'Thesis' },
  { id: 'wt-context', label: 'Context' },
  { id: 'wt-insufficient', label: 'Why not' },
  { id: 'wt-system', label: 'System' },
  { id: 'wt-epistemic', label: 'Epistemic' },
  { id: 'wt-interaction', label: 'Answers' },
  { id: 'wt-wireframes', label: 'Wireframes' },
  { id: 'wt-review', label: 'Review' },
  { id: 'wt-asymmetry', label: 'Asymmetry' },
  { id: 'wt-surfaces', label: 'Surfaces' },
  { id: 'wt-boundary', label: 'Boundary' },
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
  'Better stewardship doesn’t come from telling people what to believe. ' +
  'It comes from preventing the system from forgetting why something was believed.';

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
