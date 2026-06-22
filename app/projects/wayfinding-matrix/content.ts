export type ProjectMetadata = {
  title: string;
  subtitle: string;
  classification: string;
  practice: string;
  status: string;
  maturity: string;
  summary: string;
  thesis: string;
  audiences: string[];
};

export type FramingCard = {
  title: string;
  description: string;
  implication: string;
};

export type SystemStage = {
  id: string;
  label: string;
  title: string;
  description: string;
  output: string;
  tone: 'guest' | 'risk' | 'environment' | 'guidance' | 'ambient' | 'operator';
};

export type JourneyMoment = {
  moment: string;
  guestNeed: string;
  systemRole: string;
  ambientResponse: string;
};

export type SignalMatrixRow = {
  guestState: string;
  environmentalState: string;
  riskAssessment: string;
  guidanceState: string;
  ambientSignal: string;
  operatorAwareness: string;
};

export type AmbientSignal = {
  mode: string;
  purpose: string;
  examples: string[];
  boundary: string;
};

export type OperationsCapability = {
  title: string;
  description: string;
  decisions: string[];
};

export type OsModule = {
  name: string;
  role: string;
  records: string[];
};

export type RoadmapPhase = {
  phase: string;
  title: string;
  objective: string;
  outputs: string[];
  validationGate: string;
};

export type EvidenceBoundary = {
  label: string;
  supported: string[];
  notClaimed: string[];
};

export type FutureValidationArea = {
  title: string;
  question: string;
  proof: string;
};

export const sectionNavigation = [
  { id: 'wayfinding-hero', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'system-model', label: 'System' },
  { id: 'guest-journey', label: 'Experience' },
  { id: 'signal-matrix', label: 'Signals' },
  { id: 'operations-layer', label: 'Operations' },
  { id: 'prototype-roadmap', label: 'Future' },
] as const;

export const projectMetadata: ProjectMetadata = {
  title: 'The Wayfinding Matrix',
  subtitle: 'Ambient guidance for landscapes where attention belongs outside the screen.',
  classification: 'Exploratory systems concept',
  practice: 'Environmental Systems Design',
  status: 'Concept architecture',
  maturity: 'Research and prototype framing',
  summary:
    'A non-screen navigation framework that connects guest endurance, environmental conditions, route intelligence, and operator awareness across remote recreational landscapes.',
  thesis:
    'Off-grid spontaneity becomes safer when the environment can offer timely, low-friction guidance without demanding continuous attention.',
  audiences: [
    'Adventure park operators',
    'Wilderness reserve teams',
    'Outdoor hospitality groups',
    'Guides and rangers',
    'Independent guests',
  ],
};

export const projectFrame = [
  {
    title: 'Designed for variable\u00a0landscapes',
    description:
      'Weather, terrain, route capacity, daylight, and guest readiness can shift faster than a fixed itinerary can respond.',
    implication:
      'The framework treats place as a changing operational condition rather than a static map.',
  },
  {
    title: 'Ambient before\u00a0app-centric',
    description:
      'Guidance can move through trail markers, wearables, lighting, sound, staff handoffs, or physical thresholds.',
    implication:
      'A screen may support preparation and recovery, but it is not the primary field interface.',
  },
  {
    title: 'Autonomy with visible\u00a0safeguards',
    description:
      'Guests retain choice while the system clarifies risk, recovery paths, and moments requiring operator attention.',
    implication:
      'The goal is supported spontaneity—not invisible control or automated permission.',
  },
] satisfies FramingCard[];

export const problemCards = [
  {
    title: 'Maps describe routes, not readiness.',
    description:
      'A trail can remain technically open while becoming a poor fit for a tired guest, a narrowing weather window, or a delayed return.',
    implication: 'Route availability is not the same as route suitability.',
  },
  {
    title: 'Critical signals remain\u00a0fragmented.',
    description:
      'Guest pace, elevation gain, storm movement, surface condition, daylight, and staff observations often live in separate systems.',
    implication: 'No shared layer interprets how conditions combine.',
  },
  {
    title: 'Safety guidance can arrive too loudly or too late.',
    description:
      'Constant alerts erode trust and attention, while emergency-only communication misses earlier opportunities to redirect.',
    implication: 'The system needs graded signals inside the decision window.',
  },
] satisfies FramingCard[];

export const opportunityCards = [
  {
    title: 'Read context, not identity.',
    description:
      'Use only the minimum guest-state signals needed to understand current capability, exposure, and recovery options.',
    implication: 'Personalization remains situational and purpose-limited.',
  },
  {
    title: 'Translate conditions into choices.',
    description:
      'Combine route and environmental intelligence into a small set of legible guidance states.',
    implication: 'Complex sensing resolves into calm, actionable options.',
  },
  {
    title: 'Keep operators in the loop.',
    description:
      'Surface aggregate pressure, emerging risk, and escalation needs without turning every guest into a tracked dot.',
    implication: 'Awareness supports stewardship while respecting autonomy.',
  },
] satisfies FramingCard[];

export const systemStages = [
  {
    id: 'guest-state',
    label: 'Human context',
    title: 'Guest State',
    description: 'Pace, exertion, confidence, party profile, progress, and available recovery.',
    output: 'Current capability',
    tone: 'guest',
  },
  {
    id: 'environmental-state',
    label: 'Landscape context',
    title: 'Environmental State',
    description: 'Weather, daylight, terrain, route status, exposure, and local field reports.',
    output: 'Current conditions',
    tone: 'environment',
  },
  {
    id: 'risk-assessment',
    label: 'Interpretation layer',
    title: 'Risk Assessment',
    description: 'Evaluates the relationship between capability, route demand, and changing conditions.',
    output: 'Risk band + confidence',
    tone: 'risk',
  },
  {
    id: 'guidance-state',
    label: 'Decision layer',
    title: 'Guidance State',
    description: 'Selects continue, prepare, reroute, recover, or escalate as the appropriate posture.',
    output: 'Recommended posture',
    tone: 'guidance',
  },
  {
    id: 'ambient-signals',
    label: 'Field expression',
    title: 'Ambient Signals',
    description: 'Expresses guidance through low-attention, place-appropriate physical or wearable cues.',
    output: 'Guest-facing cue',
    tone: 'ambient',
  },
  {
    id: 'operator-awareness',
    label: 'Human oversight',
    title: 'Operator Awareness',
    description: 'Shows pressure, exceptions, confidence gaps, and situations requiring accountable response.',
    output: 'Operational awareness',
    tone: 'operator',
  },
] satisfies SystemStage[];

export const guestJourney = [
  {
    moment: 'Prepare',
    guestNeed: 'Understand route character without overplanning the day.',
    systemRole: 'Frames effort, exposure, exit points, and likely condition changes.',
    ambientResponse: 'A simple readiness check and route-state marker.',
  },
  {
    moment: 'Enter',
    guestNeed: 'Know that the selected route still fits the current moment.',
    systemRole: 'Compares party context with the live route and weather window.',
    ambientResponse: 'A calm proceed, prepare, or choose-an-alternative cue.',
  },
  {
    moment: 'Explore',
    guestNeed: 'Stay immersed while retaining confidence at meaningful forks.',
    systemRole: 'Monitors thresholds and suppresses low-value interruptions.',
    ambientResponse: 'Sparse confirmation at nodes where uncertainty increases.',
  },
  {
    moment: 'Adapt',
    guestNeed: 'Change plans without feeling that the experience has failed.',
    systemRole: 'Offers viable recovery or reroute paths before urgency spikes.',
    ambientResponse: 'A visible alternative with effort and return implications.',
  },
  {
    moment: 'Return',
    guestNeed: 'Complete the experience and reorient to services or transport.',
    systemRole: 'Confirms exit progress and closes unresolved operational exceptions.',
    ambientResponse: 'Arrival confirmation and optional reflection prompt.',
  },
] satisfies JourneyMoment[];

export const signalMatrixRows = [
  {
    guestState: 'Steady pace, stable effort',
    environmentalState: 'Route open, weather window holding',
    riskAssessment: 'Low exposure / high confidence',
    guidanceState: 'Continue',
    ambientSignal: 'Quiet route confirmation',
    operatorAwareness: 'Aggregate flow only',
  },
  {
    guestState: 'Pace falling, effort rising',
    environmentalState: 'Long exposed segment ahead',
    riskAssessment: 'Moderate fatigue risk',
    guidanceState: 'Prepare',
    ambientSignal: 'Upcoming recovery-node cue',
    operatorAwareness: 'Monitor route pressure',
  },
  {
    guestState: 'Party progress behind plan',
    environmentalState: 'Storm window narrowing',
    riskAssessment: 'Compounding return risk',
    guidanceState: 'Reroute',
    ambientSignal: 'Alternative route node',
    operatorAwareness: 'Exception visible',
  },
  {
    guestState: 'High exertion or stopped movement',
    environmentalState: 'Safe shelter nearby',
    riskAssessment: 'Recovery needed',
    guidanceState: 'Recover',
    ambientSignal: 'Shelter and assistance cue',
    operatorAwareness: 'Readiness check queued',
  },
  {
    guestState: 'Possible distress signal',
    environmentalState: 'Remote or deteriorating conditions',
    riskAssessment: 'High consequence / uncertain state',
    guidanceState: 'Escalate',
    ambientSignal: 'Explicit assistance pathway',
    operatorAwareness: 'Human response required',
  },
] satisfies SignalMatrixRow[];

export const ambientSignals = [
  {
    mode: 'Route nodes',
    purpose: 'Make consequential forks and recovery choices legible in place.',
    examples: ['Color-state markers', 'Directional thresholds', 'Distance-to-recovery cues'],
    boundary: 'No dense instruction where a glance must be enough.',
  },
  {
    mode: 'Wearable cues',
    purpose: 'Offer private, low-attention guidance when a physical marker is unavailable.',
    examples: ['Haptic pattern', 'Minimal light state', 'Acknowledgement gesture'],
    boundary: 'No continuous biometric display or attention capture.',
  },
  {
    mode: 'Environmental cues',
    purpose: 'Use the landscape and built environment as part of the guidance system.',
    examples: ['Shelter beacon', 'Trail-edge lighting', 'Audible return cue'],
    boundary: 'Signals must remain place-sensitive and ecologically appropriate.',
  },
  {
    mode: 'Human handoffs',
    purpose: 'Move uncertain or consequential situations to accountable people.',
    examples: ['Ranger check-in', 'Guide intercept', 'Operations response'],
    boundary: 'Automation prepares context; people retain consequential judgment.',
  },
] satisfies AmbientSignal[];

export const operationsCapabilities = [
  {
    title: 'Landscape pressure',
    description: 'Understand route demand relative to current capacity and conditions.',
    decisions: ['Redistribute arrivals', 'Adjust route states', 'Stage field presence'],
  },
  {
    title: 'Exception awareness',
    description: 'Prioritize meaningful deviations without displaying a surveillance map.',
    decisions: ['Request a check-in', 'Prepare assistance', 'Escalate human response'],
  },
  {
    title: 'Field learning',
    description: 'Compare guidance decisions with observed outcomes and operator reports.',
    decisions: ['Tune thresholds', 'Improve node placement', 'Record evidence gaps'],
  },
] satisfies OperationsCapability[];

export const osModules = [
  { name: 'Field Signals', role: 'Capture observations from place.', records: ['Source', 'Time', 'Location', 'Confidence'] },
  { name: 'Guest States', role: 'Model situational capability.', records: ['Effort band', 'Progress', 'Party context', 'Recovery'] },
  { name: 'Environmental Conditions', role: 'Describe changing exposure.', records: ['Weather', 'Terrain', 'Daylight', 'Route status'] },
  { name: 'Route Nodes', role: 'Define decision and recovery points.', records: ['Node type', 'Choices', 'Demand', 'Fallback'] },
  { name: 'Risk Thresholds', role: 'Make interpretation rules inspectable.', records: ['Trigger', 'Confidence', 'Severity', 'Expiry'] },
  { name: 'Operator Responses', role: 'Connect exceptions to accountable action.', records: ['Owner', 'Protocol', 'Status', 'Outcome'] },
  { name: 'Design Evidence', role: 'Keep assumptions and support visible.', records: ['Claim', 'Source', 'Maturity', 'Limitation'] },
  { name: 'Prototype Backlog', role: 'Sequence testable system increments.', records: ['Hypothesis', 'Prototype', 'Measure', 'Decision'] },
] satisfies OsModule[];

export const roadmap = [
  {
    phase: '01',
    title: 'Landscape model',
    objective: 'Map a bounded route system, its critical nodes, and its changing conditions.',
    outputs: ['Route-node inventory', 'Condition taxonomy', 'Recovery-path map'],
    validationGate: 'Operators recognize the model as operationally true.',
  },
  {
    phase: '02',
    title: 'Guidance states',
    objective: 'Test whether a small set of states can communicate changing suitability.',
    outputs: ['Threshold rules', 'Physical signal prototypes', 'Comprehension study'],
    validationGate: 'Guests understand cues without additional explanation.',
  },
  {
    phase: '03',
    title: 'Field simulation',
    objective: 'Run changing weather, fatigue, reroute, and recovery scenarios in context.',
    outputs: ['Scenario scripts', 'Operator console prototype', 'Response observations'],
    validationGate: 'The system supports adaptation without adding avoidable anxiety.',
  },
  {
    phase: '04',
    title: 'Bounded pilot',
    objective: 'Deploy a minimal system on one route with explicit human oversight.',
    outputs: ['Pilot protocol', 'Safety review', 'Evidence and incident log'],
    validationGate: 'Operational and guest outcomes justify a broader trial.',
  },
] satisfies RoadmapPhase[];

export const evidenceBoundaries: EvidenceBoundary[] = [
  {
    label: 'This concept currently supports',
    supported: [
      'A coherent system and service architecture',
      'A vocabulary for guest, environment, guidance, and operator states',
      'A prototype roadmap grounded in human oversight',
      'A research structure for future field evidence',
    ],
    notClaimed: [],
  },
  {
    label: 'This concept does not yet claim',
    supported: [],
    notClaimed: [
      'Validated biometric inference',
      'Reliable emergency detection',
      'Measured safety or ecological outcomes',
      'Production sensor, wearable, or communications infrastructure',
    ],
  },
];

export const futureValidation = [
  {
    title: 'Wearables Integration',
    question: 'Which signals can be collected and expressed with minimum intrusion?',
    proof: 'Consent model, signal reliability study, and low-attention cue testing.',
  },
  {
    title: 'Environmental Sensor Networks',
    question: 'Which live conditions materially improve a route decision?',
    proof: 'Sensor relevance audit, failure-mode testing, and field calibration.',
  },
  {
    title: 'Emergency Escalation Logic',
    question: 'When should uncertainty become accountable human intervention?',
    proof: 'Protocol review, tabletop exercises, and false-positive analysis.',
  },
  {
    title: 'Guest Autonomy\u00a0Research',
    question: 'When does ambient guidance feel supportive rather than controlling?',
    proof: 'Field interviews, behavioral observation, and opt-out studies.',
  },
  {
    title: 'Field Simulation\u00a0Testing',
    question: 'Does the whole system remain understandable as conditions compound?',
    proof: 'Scenario trials across weather, fatigue, route, and staffing variables.',
  },
] satisfies FutureValidationArea[];
