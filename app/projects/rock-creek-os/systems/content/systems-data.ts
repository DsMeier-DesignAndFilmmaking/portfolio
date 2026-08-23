// ─────────────────────────────────────────────────────────────────────────────
// Systems Atlas — content for the Adaptive Stewardship OS mechanism.
//
// Authoritative source: `rock-creek-os-foundation.md`. Where `/explorer`
// content answers WHAT the problem is and WHY hydrology is primary, this file
// answers HOW the proposed system would actually work — the architecture,
// not the argument. Read alongside `explorer/content/explorer-data.ts` rather
// than in place of it; several structures here (the five layers, the
// hydrology lifecycle) go one level deeper than anything Explorer states.
//
// EVIDENCE DISCIPLINE, restated because this file is the one most at risk of
// implying an existing capability: every layer of the system architecture
// below — Stewardship Intelligence above all — is `proposed`. No sensor, API,
// database, dashboard, AI system, staffing policy, or operational workflow
// described here is asserted to exist at The Ranch at Rock Creek today. Where
// a fact IS documented (stream-temperature thresholds, forest condition), it
// carries `documented` and traces to foundation doc §13.
//
// HUMAN-IN-THE-LOOP is a structural requirement, not a caveat. The primary
// lifecycle's cross-stage flows (below) include one explicitly named "Human
// Judgment" flow, given equal visual weight to the signal and learning flows
// — the system is written throughout as coordinating a decision staff make,
// never as making the decision itself.
// ─────────────────────────────────────────────────────────────────────────────

import type { EvidenceTier } from './evidence';

export type ArchitectureLayer = {
  id: string;
  number: string;
  name: string;
  role: string;
  summary: string;
  items: string[];
  itemsLabel: string;
  dependsOn: string | null;
  nonClaim?: string;
  tier: EvidenceTier;
};

// ── Hero framing ─────────────────────────────────────────────────────────

export const systemsHero = {
  eyebrow: 'System Architecture',
  title: 'The Systems Atlas',
  deck: 'How the Adaptive Stewardship OS would actually work.',
  bridge:
    'The Systems Explorer defined the challenge. This page opens the mechanics, the architecture, the lifecycle of a signal, and where human decisions remain essential.',
};

// ── Atlas 01 · The five-layer architecture ──────────────────────────────

export const architectureLayers: ArchitectureLayer[] = [
  {
    id: 'environment',
    number: '01',
    name: 'Environment',
    role: 'The dynamic physical landscape — the input layer',
    
    items: [
      'Stream temperature',
      'Streamflow',
      'Weather',
      'Fire conditions',
      'Landscape conditions',
      'Seasonal constraints',
      'Activity and access conditions',
    ],
    itemsLabel: 'Signals this layer produces',
    dependsOn: null,
    tier: 'documented',
  },
  {
    id: 'stewardship-intelligence',
    number: '02',
    name: 'Stewardship Intelligence',
    role: 'Interprets environmental signals — the proposed coordination layer',
    
    items: [
      'What is changing?',
      'Why does it matter?',
      'What areas or activities are affected?',
      'What thresholds have been reached?',
      'What stewardship considerations are involved?',
    ],
    itemsLabel: 'What this layer would ask',
    dependsOn: 'Environment',
    nonClaim:
      'No evidence in this research indicates The Ranch at Rock Creek operates an interpretation layer like this today. It is the central proposed component of this design exploration.',
    tier: 'proposed',
  },
  {
    id: 'operational-decisions',
    number: '03',
    name: 'Operational Decisions',
    role: 'Environmental intelligence becomes actionable — a human decision',
    
    items: [
      'Modify activities',
      'Restrict access',
      'Redirect guests',
      'Activate alternatives',
      'Adjust staffing',
      'Reallocate resources',
      'Change mobility patterns',
      'Protect sensitive areas',
    ],
    itemsLabel: 'Decisions available at this layer',
    dependsOn: 'Stewardship Intelligence',
    nonClaim:
      'The system is designed to support human decision-making, not to exercise autonomous control. See the human-judgment flow in the primary lifecycle below.',
    tier: 'proposed',
  },
  {
    id: 'staff-logistics',
    number: '04',
    name: 'Staff & Logistics',
    role: 'Decisions propagate into physical operations',
    
    items: [
      'Staff assignments',
      'Equipment movement',
      'Guest transportation',
      'Activity setup',
      'Resource delivery',
      'Route changes',
      'Quiet infrastructure',
    ],
    itemsLabel: 'What propagates at this layer',
    dependsOn: 'Operational Decisions',
    tier: 'proposed',
  },
  {
    id: 'guest-experience',
    number: '05',
    name: 'Guest Experience',
    role: 'The output — not a dashboard, a resilient stay',
    
    items: [
      'Different activities',
      'Different routes',
      'Different timing',
      'Alternative experiences',
      'Different environmental interpretation, held invisible',
    ],
    itemsLabel: 'What the guest may experience',
    dependsOn: 'Staff & Logistics',
    tier: 'proposed',
  },
];

export const architectureCopy = {
  id: 'system-architecture',
  number: '01',
  kicker: 'The System Architecture',
  title: 'Five layers, one direction of coordination',
  intro:
    'Each layer depends entirely on what the layer below it can sense and interpret. Select a layer to explore its details.',
  footerNote: 'Signal flows down · Feedback and constraint run back up',
};

// ── Atlas 02 · Primary system deep dive — hydrology lifecycle ───────────

export type LifecycleStage = {
  id: string;
  number: string;
  label: string;
  summary: string;
  inputs: string[];
  output: string;
  humanRole?: string;
  tier: EvidenceTier;
};

export const hydrologyLifecycle: LifecycleStage[] = [
  {
    id: 'sense',
    number: '01',
    label: 'Sense',
    summary: 'Environmental conditions change.',
    inputs: ['Stream temperature reading', 'Streamflow (CFS)'],
    output: 'A reading crosses, or approaches, the 70°F trout-stress threshold.',
    tier: 'documented',
  },
  {
    id: 'interpret',
    number: '02',
    label: 'Interpret',
    summary: 'The system identifies what the reading implies.',
    inputs: ['Threshold crossing', 'Upcoming guest itineraries booked against the affected activity'],
    output:
      'This reading is consistent with a "Hoot Owl" closure trigger; a defined set of near-term fishing bookings would be affected.',
    tier: 'proposed',
  },
  {
    id: 'decide',
    number: '03',
    label: 'Decide',
    summary: 'Staff evaluate the appropriate response.',
    inputs: ['System interpretation', 'Guide and equipment availability', 'Guest preferences on file'],
    output: 'An Ambassador confirms which alternative experience to activate, and for which guests.',
    humanRole:
      'The system surfaces the interpretation and the option set. It does not choose. A person weighs context the system cannot hold — who is on property, what they came for, how the day is already shaped.',
    tier: 'proposed',
  },
  {
    id: 'adapt',
    number: '04',
    label: 'Adapt',
    summary: 'Operations and the experience change.',
    inputs: ['Confirmed decision'],
    output: 'Logistics repositions guides and equipment; the alternative itinerary is activated ahead of the guest arriving at it.',
    tier: 'proposed',
  },
  {
    id: 'learn',
    number: '05',
    label: 'Learn',
    summary: 'The outcome feeds back into future decisions.',
    inputs: ['How closely the forecast matched the actual closure', 'How the substitute experience was received'],
    output: 'The threshold model and the alternative-activity set both get a data point for next time.',
    tier: 'proposed',
  },
];

export type LifecycleFlow = {
  id: string;
  name: string;
  direction: 'down' | 'human' | 'return';
  path: string;
  note: string;
  status: 'documented' | 'proposed' | 'human';
};

export const lifecycleFlows: LifecycleFlow[] = [
  {
    id: 'signal-flow',
    name: 'Signal Flow',
    direction: 'down',
    path: 'Sense → Interpret',
    note: 'The straightforward half of the lifecycle — a reading becomes an implication. The mechanism, not the meaning.',
    status: 'documented',
  },
  {
    id: 'human-judgment-flow',
    name: 'Human Judgment',
    direction: 'human',
    path: 'Interpret → Decide → Adapt',
    note: 'The load-bearing flow. Staff evaluate the interpretation and choose the response — the system coordinates the choice, it does not make it. Remove this flow and the architecture describes automation, not stewardship.',
    status: 'human',
  },
  {
    id: 'learning-flow',
    name: 'Learning Flow',
    direction: 'return',
    path: 'Adapt → Learn → back to Sense',
    note: 'Closes the lifecycle. Without this return path the system senses and decides once and never improves — see the Feedback section below for the same principle at the scale of a season rather than a single event.',
    status: 'proposed',
  },
];

export const primaryLifecycleCopy = {
  id: 'primary-lifecycle',
  number: '02',
  kicker: 'Primary System · Deep Dive',
  title: 'Predictive Stream & Activity Sensing',
  intro:
    'This is the most detailed treatment of any system on this page, deliberately: hydrology is the primary problem, and its mechanism is where the architecture has to prove itself first.',
};

// ── Atlas 03 · Wildfire extensibility ────────────────────────────────────

export type ExtensibilityColumn = {
  id: string;
  label: string;
  tone: 'ecological' | 'landscape';
  stages: Array<{ stage: string; body: string }>;
};

export const extensibilityColumns: ExtensibilityColumn[] = [
  {
    id: 'hydrology',
    label: 'Hydrology · Primary',
    tone: 'ecological',
    stages: [
      { stage: 'Sense', body: 'Stream temperature, streamflow' },
      { stage: 'Interpret', body: 'Hoot Owl threshold logic' },
      { stage: 'Decide', body: 'Staff evaluate fishing alternatives' },
      { stage: 'Adapt', body: 'Logistics repositions to water-adjacent alternatives' },
      { stage: 'Learn', body: 'Forecast accuracy, guest response to the substitute' },
    ],
  },
  {
    id: 'wildfire',
    label: 'Wildfire · Supporting',
    tone: 'landscape',
    stages: [
      { stage: 'Sense', body: 'Fuel moisture, smoke, fire conditions' },
      { stage: 'Interpret', body: 'Access and air-quality threshold logic' },
      { stage: 'Decide', body: 'Staff evaluate trail closures, evacuation readiness' },
      { stage: 'Adapt', body: 'Logistics reroutes away from affected zones, protects sensitive infrastructure' },
      { stage: 'Learn', body: 'Response effectiveness feeds seasonal defensible-space planning' },
    ],
  },
];

export const extensibilityCopy = {
  id: 'extensibility',
  number: '03',
  kicker: 'Supporting System · Environmental',
  title: 'Wildfire proves the architecture, it doesn\'t repeat it',
  intro:
    'Wildfire runs through the same five stages, proving the intelligence layer handles multiple environmental domains.',
  synthesis:
    'Both columns share a single architecture, driven by different signals running through the same five slots.',
  evidence:
    'A century of fire suppression has left the surrounding forest over-stocked and fire-prone; roughly 6,600 acres are managed toward a biodiversity mosaic. Sources: Montana Forest Consultants; Granite County CWPP.',
  tier: 'documented' as EvidenceTier,
};

// ── Atlas 04 · Logistics response layer ──────────────────────────────────

export const logisticsChain: Array<{ id: string; label: string; body: string }> = [
  {
    id: 'environmental-change',
    label: 'Environmental Change',
    body: 'A closure, restriction, or access change is confirmed at the Operational Decisions layer.',
  },
  {
    id: 'activity-change',
    label: 'Activity Change',
    body: 'The affected activity is swapped for an alternative already identified as available.',
  },
  {
    id: 'guest-movement',
    label: 'Guest Movement Change',
    body: 'Guests are redirected to a different node on the property — a different distance, a different timing window.',
  },
  {
    id: 'staff-response',
    label: 'Staff Response',
    body: 'Guides and Ambassadors are reassigned; coverage is rebalanced across the day.',
  },
  {
    id: 'resource-movement',
    label: 'Equipment & Resource Movement',
    body: 'Gear is staged at the new location ahead of guest arrival — the step that determines whether the pivot feels planned or improvised.',
  },
];
export const logisticsCopy = {
  id: 'logistics-response',
  number: '04',
  kicker: 'Supporting System · Operational',
  title: 'Logistics as the response layer',
  intro:
    'Decisions become real only through physical movement, integrating logistics directly into the five-layer model.',
  principleLabel: 'Design principle · Quiet infrastructure',
  principle:
    'Quiet infrastructure is not the absence of complexity; it is complexity that arrives pre-positioned before the guest ever notices.',
};

// ── Atlas 05 · Feedback & learning ────────────────────────────────────────

export type FeedbackNode = { id: string; name: string; measure: string };
export type FeedbackEdge = {
  from: string;
  to: string;
  mechanism: string;
  polarity: 'reinforcing' | 'degrading';
};

export const feedbackNodes: FeedbackNode[] = [
  { id: 'decision', name: 'Decision', measure: 'The response staff chose at a given threshold crossing' },
  { id: 'action', name: 'Action', measure: 'What logistics and staff actually executed' },
  { id: 'outcome', name: 'Observed Outcome', measure: 'How accurate the forecast was; how the substitute experience landed' },
  { id: 'information', name: 'New Information', measure: 'An updated data point for the threshold model and the alternative-activity set' },
];

export const feedbackEdges: FeedbackEdge[] = [
  { from: 'decision', to: 'action', mechanism: 'A confirmed decision is executed by staff and logistics.', polarity: 'reinforcing' },
  { from: 'action', to: 'outcome', mechanism: 'The execution produces a result — a forecast that held or missed, a guest reaction.', polarity: 'reinforcing' },
  { from: 'outcome', to: 'information', mechanism: 'The result is captured rather than discarded once the day ends.', polarity: 'reinforcing' },
  { from: 'information', to: 'decision', mechanism: 'The next threshold crossing is interpreted against an improved model.', polarity: 'reinforcing' },
];

export const feedbackCopy = {
  id: 'feedback-loop',
  number: '05',
  kicker: 'Feedback & Learning',
  title: 'A loop, not a pipeline',
  intro:
    'Every section above reads left to right: signal in, response out. That is only half the architecture. The lifecycle\'s final stage — Learn — is this loop, shown at the scale of a season rather than a single event.',
  degradingNote:
    'The reinforcing direction above depends on one condition: that outcome data is actually captured. Skip that step and the loop breaks open — the system would keep sensing and deciding, but never improve. That is automation repeating itself, not an adaptive system.',
  leveragePoint:
    'The leverage point is not a better sensor or a faster interpretation layer. It is the discipline of capturing what happened after the decision — the only part of this architecture that has nothing to do with technology.',
};

// ── Future design — mapped to the architecture, not repeated from Explorer ─

export type FutureArtifact = {
  id: string;
  label: string;
  note: string;
  layerIds: string[];
};

export const futureArtifacts: FutureArtifact[] = [
  {
    id: 'env-intelligence-model',
    label: 'Environmental intelligence model',
    note: 'Formalizes what Layer 1 senses and Layer 2 would interpret it as.',
    layerIds: ['environment', 'stewardship-intelligence'],
  },
  {
    id: 'spatial-condition-map',
    label: 'Spatial condition map',
    note: 'Where on the property a sensed condition actually binds.',
    layerIds: ['environment', 'stewardship-intelligence'],
  },
  {
    id: 'decision-support-interface',
    label: 'Decision-support interface',
    note: 'Surfaces Layer 2\'s interpretation to the person making Layer 3\'s call.',
    layerIds: ['stewardship-intelligence', 'operational-decisions'],
  },
  {
    id: 'alert-threshold-system',
    label: 'Alert / threshold system',
    note: 'Routes a crossing to the right person before Layer 3 needs to ask for it.',
    layerIds: ['stewardship-intelligence', 'operational-decisions'],
  },
  {
    id: 'scenario-planning',
    label: 'Scenario planning tools',
    note: 'Rehearses Layer 3\'s decision menu against compound events ahead of the season.',
    layerIds: ['stewardship-intelligence', 'operational-decisions'],
  },
  {
    id: 'stewardship-dashboard',
    label: 'Stewardship dashboard',
    note: 'A shared view of Layer 3\'s decisions against Layer 1\'s conditions over time.',
    layerIds: ['operational-decisions'],
  },
  {
    id: 'adaptive-activity-planner',
    label: 'Adaptive activity planner',
    note: 'Turns Layer 3\'s decision menu into a schedulable itinerary.',
    layerIds: ['operational-decisions'],
  },
  {
    id: 'staff-operational-console',
    label: 'Staff operational console',
    note: 'Where Layer 4\'s assignments, movement, and coverage actually get coordinated.',
    layerIds: ['staff-logistics'],
  },
  {
    id: 'mobility-coordination',
    label: 'Mobility coordination',
    note: 'The routing and sequencing logic behind Layer 4\'s "quiet infrastructure."',
    layerIds: ['staff-logistics'],
  },
  {
    id: 'service-blueprint',
    label: 'Service blueprint',
    note: 'Maps every Layer 4 action against what the guest at Layer 5 does and doesn\'t perceive.',
    layerIds: ['staff-logistics', 'guest-experience'],
  },
  {
    id: 'experience-orchestration',
    label: 'Guest experience orchestration',
    note: 'The guest-facing surface of the whole architecture — Layer 5\'s actual interface, if it had one.',
    layerIds: ['guest-experience'],
  },
];

export const futureDesignCopy = {
  id: 'future-design',
  number: '06',
  kicker: 'Future Design Opportunities',
  title: 'What plugs into this architecture',
  intro:
    'The Explorer named future artifacts as directions worth exploring. Here, each one is anchored to the specific layer of the architecture it would extend — none of these exist; this is where the architecture above becomes generative rather than descriptive.',
};

// ── Evidence boundary ─────────────────────────────────────────────────────

export const systemsEvidenceBoundary = {
  title: 'What this architecture establishes, and what it does not',
  established: [
    'Documented stream-temperature thresholds and "Hoot Owl" closure triggers (National Wildlife Federation)',
    'Regional forest-condition and wildfire-risk data (Montana Forest Consultants; Granite County CWPP)',
    'The property spans roughly 10 square miles and is built to minimize unnecessary vehicle use',
  ],
  notClaimed: [
    'That Stewardship Intelligence, or any interpretation layer like it, exists at the property today',
    'Any sensor, API, database, dashboard, or AI system described in this architecture',
    'Any existing staffing workflow, operational policy, or technology infrastructure',
    'That any decision in this system is made autonomously — every decision point here is human-evaluated',
  ],
  disclosure:
    'Independent research and systems-design exploration; no client relationship; interventions are conceptual.',
};

// ── Section registry (drives PageNavIndicator) ───────────────────────────

export const systemsSections = [
  { id: 'system-architecture', label: 'Architecture' },
  { id: 'primary-lifecycle', label: 'Hydrology' },
  { id: 'extensibility', label: 'Wildfire' },
  { id: 'logistics-response', label: 'Logistics' },
  { id: 'feedback-loop', label: 'Feedback' },
  { id: 'future-design', label: 'Future Design' },
];
