export type ProjectMetadata = {
  id: string;
  title: string;
  subtitle: string;
  classification: string;
  practice: string;
  status: string;
  maturity: string;
  summary: string;
  thesis: string;
  audiences: string[];
  evidenceBoundary: {
    supported: string[];
    notClaimed: string[];
  };
};

export type ArtifactOrigin = {
  id: string;
  project: string;
  projectHref?: string;
  contribution: string;
  artifacts: string[];
  evolution: string;
  tone: 'cyan' | 'emerald' | 'stone';
};

export type DecisionProblem = {
  id: string;
  label: string;
  title: string;
  description: string;
  consequence: string;
  icon: 'signals' | 'coordination' | 'authority';
};

export type DecisionLevel = {
  id: string;
  level: string;
  horizon: string;
  question: string;
  decisions: string[];
  authority: string;
};

export type StewardshipPrinciple = {
  id: string;
  number: string;
  title: string;
  description: string;
  implication: string;
};

export type SystemLoopStep = {
  id: string;
  label: string;
  title: string;
  description: string;
  output: string;
  tone: 'sky' | 'teal' | 'amber' | 'emerald' | 'violet';
};

export type DecisionDomain = {
  id: string;
  name: string;
  objective: string;
  signals: string[];
  decisions: string[];
  steward: string;
  icon: 'terrain' | 'water' | 'habitat' | 'fire' | 'access' | 'operations';
};

export type ConfidenceDimension = {
  id: string;
  name: string;
  weight: number;
  question: string;
  evidence: string;
};

export type ConfidenceBand = {
  id: 'low' | 'medium' | 'high';
  label: string;
  range: string;
  response: string;
  authority: string;
};

export type RecoveryStep = {
  id: string;
  number: string;
  title: string;
  description: string;
  owner: string;
};

export type RecoveryTrigger = {
  id: string;
  trigger: string;
  systemResponse: string;
};

export type EvidenceLineageRecord = {
  id: string;
  claim: string;
  evidenceType: string;
  source: string;
  confidence: 'medium' | 'high';
  maturity: string;
  supports: string[];
  limitation: string;
  traceabilityReference: string;
};

export type RelatedProject = {
  id: string;
  title: string;
  description: string;
  href: string;
  relationship: string;
};

export const projectMetadata: ProjectMetadata = {
  id: 'responsive-ecologies',
  title: 'Responsive Ecologies',
  subtitle: 'Adaptive stewardship systems for living landscapes.',
  classification: 'Flagship synthesis project',
  practice: 'Environmental Systems Design',
  status: 'Concept architecture',
  maturity: 'Modeled, not deployed',
  summary:
    'A multi-agent environmental intelligence concept that turns field signals into traceable, authority-aware stewardship decisions.',
  thesis:
    'Responsive landscapes require coordinated interpretation, not more dashboards.',
  audiences: [
    'Land stewards',
    'Field teams',
    'Hospitality operators',
    'Ecologists',
    'Guides and guests',
  ],
  evidenceBoundary: {
    supported: [
      'System architecture',
      'Cross-project artifact synthesis',
      'Decision and authority modeling',
      'Scenario-ready content structure',
    ],
    notClaimed: [
      'Live deployment',
      'Autonomous field control',
      'Measured ecological outcomes',
      'Production sensor integration',
    ],
  },
};

export const artifactOrigins: ArtifactOrigin[] = [
  {
    id: 'architecture-of-confidence',
    project: 'The Architecture of Confidence',
    projectHref: '/projects/architecture-of-confidence',
    contribution:
      'A decision-support framework for interpreting context, communicating confidence, preserving human agency, and designing recovery.',
    artifacts: [
      'Confidence assessment model',
      'Context interpretation loop',
      'Recovery architecture',
    ],
    evolution:
      'Human confidence patterns become decision-quality and authority patterns for environmental stewardship.',
    tone: 'cyan',
  },
  {
    id: 'adaptive-ranch',
    project: 'Adaptive Ranch Experience Companion',
    projectHref: '/projects/adaptive-ranch-experience-companion',
    contribution:
      'A place-based service system connecting environmental conditions, operational capacity, stewardship constraints, and human handoffs.',
    artifacts: [
      'Environmental signal map',
      'Operations service blueprint',
      'Recovery path diagram',
    ],
    evolution:
      'A hospitality-specific system expands into a cross-domain model for landscape operations and ecological care.',
    tone: 'emerald',
  },
  {
    id: 'environmental-research',
    project: 'Environmental Systems Design research',
    contribution:
      'The research and traceability layer that structures environmental observations, system artifacts, decision models, and evidence limits.',
    artifacts: [
      'Environmental signal taxonomy',
      'System Artifacts registry',
      'Evidence confidence labels',
    ],
    evolution:
      'Research records become a versioned substrate for a coherent flagship system rather than isolated concept material.',
    tone: 'stone',
  },
];

export const decisionProblems: DecisionProblem[] = [
  {
    id: 'fragmented-signals',
    label: 'Signal fragmentation',
    title: 'Environmental observations arrive without shared meaning.',
    description:
      'Weather, soil, hydrology, habitat, guest use, and field reports may all be visible while remaining disconnected from the decision that must be made.',
    consequence:
      'Teams either overreact to one signal or wait until deterioration becomes operationally obvious.',
    icon: 'signals',
  },
  {
    id: 'coordination-gap',
    label: 'Coordination gap',
    title: 'Stewardship work crosses roles that operate on different time horizons.',
    description:
      'Ecologists, field crews, guides, operators, and landowners interpret the same landscape through different responsibilities and constraints.',
    consequence:
      'A locally reasonable action can create downstream ecological, operational, or guest-experience costs.',
    icon: 'coordination',
  },
  {
    id: 'authority-ambiguity',
    label: 'Authority ambiguity',
    title: 'A recommendation is not the same as permission to act.',
    description:
      'Adaptive systems can identify risk, rank options, and prepare work, but consequential landscape decisions still require accountable human authority.',
    consequence:
      'Without explicit authority boundaries, automation becomes either unsafe or too timid to be useful.',
    icon: 'authority',
  },
];

export const decisionHierarchy: DecisionLevel[] = [
  {
    id: 'strategic',
    level: 'Strategic',
    horizon: 'Seasonal to multi-year',
    question: 'What ecological conditions and stewardship outcomes are we protecting?',
    decisions: [
      'Set habitat and resilience priorities',
      'Define acceptable use thresholds',
      'Allocate long-term restoration capacity',
    ],
    authority: 'Landowner, ecological lead, stewardship director',
  },
  {
    id: 'tactical',
    level: 'Tactical',
    horizon: 'Weekly to seasonal',
    question: 'How should resources and access adapt to current landscape conditions?',
    decisions: [
      'Sequence maintenance and restoration',
      'Adjust guiding corridors',
      'Prepare closure or recovery plans',
    ],
    authority: 'Stewardship lead with operational review',
  },
  {
    id: 'operational',
    level: 'Operational',
    horizon: 'Daily to event-driven',
    question: 'What should teams prepare, communicate, or inspect now?',
    decisions: [
      'Prioritize field inspections',
      'Stage crews and equipment',
      'Update staff guidance',
    ],
    authority: 'Operations lead and field coordinator',
  },
  {
    id: 'field',
    level: 'Field',
    horizon: 'In the moment',
    question: 'What action is safe, appropriate, and reversible here?',
    decisions: [
      'Pause or redirect activity',
      'Record observed conditions',
      'Escalate uncertainty',
    ],
    authority: 'Qualified field staff within defined protocols',
  },
];

export const stewardshipPrinciples: StewardshipPrinciple[] = [
  {
    id: 'interpret-before-acting',
    number: '01',
    title: 'Interpret before acting.',
    description:
      'A signal only becomes useful when its source, freshness, quality, and relationship to other conditions are understood.',
    implication:
      'The system explains why a condition matters before it recommends a response.',
  },
  {
    id: 'authority-visible',
    number: '02',
    title: 'Keep authority visible.',
    description:
      'Agents may observe, rank, recommend, and prepare. Human stewards retain authority over consequential actions.',
    implication:
      'Every recommendation names the approving role and the conditions that require escalation.',
  },
  {
    id: 'care-across-horizons',
    number: '03',
    title: 'Design care across time horizons.',
    description:
      'Immediate access and service needs must be weighed against seasonal resilience and long-term ecological health.',
    implication:
      'Short-term operational value cannot silently override stewardship objectives.',
  },
  {
    id: 'recovery-is-core',
    number: '04',
    title: 'Treat recovery as core infrastructure.',
    description:
      'Conditions change, evidence weakens, and plans fail. The system must help teams regain orientation without hiding uncertainty.',
    implication:
      'Fallbacks, inspection paths, and learning records are designed before disruption.',
  },
];

export const systemLoop: SystemLoopStep[] = [
  {
    id: 'sense',
    label: '01 / Sense',
    title: 'Observe the landscape',
    description:
      'Combine field reports, environmental telemetry, operational conditions, and patterns of use.',
    output: 'Typed, time-aware signals',
    tone: 'sky',
  },
  {
    id: 'interpret',
    label: '02 / Interpret',
    title: 'Establish meaning',
    description:
      'Assess freshness, quality, agreement, ecological context, and the decision window.',
    output: 'Decision-ready context',
    tone: 'teal',
  },
  {
    id: 'model',
    label: '03 / Model',
    title: 'Compare stewardship paths',
    description:
      'Use decision models and system artifacts to identify tradeoffs, thresholds, and reversible options.',
    output: 'Ranked response paths',
    tone: 'amber',
  },
  {
    id: 'authorize',
    label: '04 / Authorize',
    title: 'Route accountable judgment',
    description:
      'Match the recommendation to the human role permitted to approve, reject, revise, or escalate it.',
    output: 'Authorized action',
    tone: 'violet',
  },
  {
    id: 'steward',
    label: '05 / Steward',
    title: 'Act, observe, and learn',
    description:
      'Coordinate field action, communicate the decision, monitor effects, and return evidence to the system.',
    output: 'Landscape response and learning',
    tone: 'emerald',
  },
];

export const decisionDomains: DecisionDomain[] = [
  {
    id: 'terrain',
    name: 'Terrain resilience',
    objective:
      'Maintain safe access while reducing erosion, compaction, and avoidable maintenance debt.',
    signals: ['Soil moisture', 'Slope condition', 'Trail load'],
    decisions: ['Inspect', 'Repair', 'Restrict', 'Reroute'],
    steward: 'Land stewardship + field operations',
    icon: 'terrain',
  },
  {
    id: 'hydrology',
    name: 'Water systems',
    objective:
      'Protect drainage, riparian conditions, and water-sensitive access during changing weather.',
    signals: ['Precipitation', 'Flow level', 'Drainage performance'],
    decisions: ['Monitor', 'Protect', 'Delay work', 'Escalate'],
    steward: 'Ecological lead + maintenance',
    icon: 'water',
  },
  {
    id: 'habitat',
    name: 'Habitat protection',
    objective:
      'Adapt human movement and operations around sensitive species, corridors, and seasonal cycles.',
    signals: ['Wildlife observations', 'Seasonality', 'Disturbance intensity'],
    decisions: ['Buffer', 'Redirect', 'Limit access', 'Restore'],
    steward: 'Ecology + guiding leadership',
    icon: 'habitat',
  },
  {
    id: 'fire',
    name: 'Fire and fuel conditions',
    objective:
      'Connect fuel, weather, access, and response readiness without overstating predictive certainty.',
    signals: ['Fuel load', 'Wind', 'Humidity', 'Response capacity'],
    decisions: ['Inspect', 'Prepare', 'Restrict', 'Escalate'],
    steward: 'Safety lead + land management',
    icon: 'fire',
  },
  {
    id: 'access',
    name: 'Guest and guide access',
    objective:
      'Preserve meaningful outdoor experience while respecting ecological and operational constraints.',
    signals: ['Demand', 'Route condition', 'Group readiness', 'Guide knowledge'],
    decisions: ['Open', 'Redirect', 'Interpret', 'Recover'],
    steward: 'Guides + guest operations',
    icon: 'access',
  },
  {
    id: 'operations',
    name: 'Stewardship operations',
    objective:
      'Align crews, equipment, schedules, and communication with the most important landscape needs.',
    signals: ['Capacity', 'Equipment readiness', 'Skill availability'],
    decisions: ['Prioritize', 'Schedule', 'Dispatch', 'Handoff'],
    steward: 'Operations + field coordination',
    icon: 'operations',
  },
];

export const confidenceDimensions: ConfidenceDimension[] = [
  {
    id: 'freshness',
    name: 'Signal freshness',
    weight: 20,
    question: 'Is the observation current enough for this decision window?',
    evidence: 'Timestamp, expected update cadence, and stale-state threshold',
  },
  {
    id: 'source-quality',
    name: 'Source quality',
    weight: 20,
    question: 'How reliable and spatially representative is the source?',
    evidence: 'Source type, calibration status, field validation, and known limitations',
  },
  {
    id: 'cross-signal-agreement',
    name: 'Cross-signal agreement',
    weight: 25,
    question: 'Do independent observations describe the same environmental change?',
    evidence: 'Telemetry, field reports, weather context, and operational observations',
  },
  {
    id: 'evidence-strength',
    name: 'Evidence strength',
    weight: 20,
    question: 'How strongly does research support the proposed relationship?',
    evidence: 'Research record, artifact lineage, assumptions, and validation status',
  },
  {
    id: 'authority-readiness',
    name: 'Authority readiness',
    weight: 15,
    question: 'Is an accountable human available to review the recommendation?',
    evidence: 'Named role, escalation path, operational readiness, and decision ownership',
  },
];

export const confidenceBands: ConfidenceBand[] = [
  {
    id: 'low',
    label: 'Low confidence',
    range: '0–49',
    response: 'Continue observing, request inspection, or escalate uncertainty.',
    authority: 'No consequential action is prepared.',
  },
  {
    id: 'medium',
    label: 'Qualified confidence',
    range: '50–74',
    response: 'Recommend with caveats and identify the missing evidence.',
    authority: 'Human review is required before preparation.',
  },
  {
    id: 'high',
    label: 'Action-ready confidence',
    range: '75–100',
    response: 'Prepare a reversible response path for accountable approval.',
    authority: 'The system still does not authorize itself.',
  },
];

export const confidenceSuppressionRules = [
  'A critical environmental signal is stale or unavailable.',
  'Independent sources conflict without a field explanation.',
  'The proposed action is difficult to reverse.',
  'The accountable human owner is unavailable.',
];

export const recoverySteps: RecoveryStep[] = [
  {
    id: 'detect',
    number: '01',
    title: 'Detect the break',
    description:
      'Identify the changed condition, failed assumption, rejected recommendation, or unavailable authority.',
    owner: 'Monitoring and field observation',
  },
  {
    id: 'stabilize',
    number: '02',
    title: 'Stabilize the decision',
    description:
      'Pause irreversible action, preserve safety, and keep the current landscape state visible.',
    owner: 'Field lead and operational protocol',
  },
  {
    id: 'reframe',
    number: '03',
    title: 'Reframe the options',
    description:
      'Reduce the response set to reversible alternatives that preserve the original stewardship intent.',
    owner: 'Decision support and stewardship lead',
  },
  {
    id: 'authorize-recovery',
    number: '04',
    title: 'Route recovery authority',
    description:
      'Send the revised path to the role accountable for approving, modifying, or rejecting it.',
    owner: 'Named human authority',
  },
  {
    id: 'learn',
    number: '05',
    title: 'Record what changed',
    description:
      'Return the outcome, field explanation, and confidence change to the evidence and artifact record.',
    owner: 'Stewardship learning loop',
  },
];

export const recoveryTriggers: RecoveryTrigger[] = [
  {
    id: 'conditions-shift',
    trigger: 'Conditions change after a plan is prepared',
    systemResponse: 'Re-evaluate fit and surface a reversible alternative.',
  },
  {
    id: 'confidence-drops',
    trigger: 'Signal confidence falls below the required band',
    systemResponse: 'Suppress action preparation and request stronger evidence.',
  },
  {
    id: 'authority-unavailable',
    trigger: 'The accountable decision owner is unavailable',
    systemResponse: 'Hold the recommendation or route the defined escalation path.',
  },
  {
    id: 'field-contradiction',
    trigger: 'Field observation contradicts the model',
    systemResponse: 'Prioritize the observed condition and document the model mismatch.',
  },
];

export const evidenceLineage: EvidenceLineageRecord[] = [
  {
    id: 'confidence-architecture',
    claim:
      'Environmental guidance should expose confidence, uncertainty, and recovery rather than present one opaque answer.',
    evidenceType: 'Framework synthesis',
    source: 'The Architecture of Confidence',
    confidence: 'high',
    maturity: 'Established portfolio framework',
    supports: ['Confidence Model', 'Recovery Model', 'Authority routing'],
    limitation:
      'Environmental thresholds still require domain-specific validation.',
    traceabilityReference: 'Portfolio:AOC/confidence-architecture',
  },
  {
    id: 'operational-stewardship',
    claim:
      'Credible environmental guidance depends on operational capacity, staff knowledge, and explicit handoffs.',
    evidenceType: 'Service-system synthesis',
    source: 'Adaptive Ranch Experience Companion',
    confidence: 'high',
    maturity: 'Modeled service architecture',
    supports: ['Decision Hierarchy', 'Domain Atlas', 'Recovery ownership'],
    limitation:
      'The source model has not been piloted in a live ranch environment.',
    traceabilityReference: 'Portfolio:AdaptiveRanch/operations-blueprint',
  },
  {
    id: 'environmental-signals',
    claim:
      'Landscape decisions should combine environmental observations with source quality, freshness, and spatial context.',
    evidenceType: 'Environmental systems research',
    source: 'Environmental Systems Design OS',
    confidence: 'medium',
    maturity: 'Research-backed hypothesis',
    supports: ['System Loop', 'Domain Atlas', 'Confidence dimensions'],
    limitation:
      'Site-specific signals and thresholds remain assumptions until field validation.',
    traceabilityReference: 'OS:Evidence/environmental-signal-quality',
  },
  {
    id: 'human-authority',
    claim:
      'Consequential stewardship actions require visible human authority even when agents prepare recommendations.',
    evidenceType: 'Cross-project design principle',
    source: 'System Artifacts registry',
    confidence: 'high',
    maturity: 'Synthesis principle',
    supports: ['Decision Hierarchy', 'Confidence bands', 'Recovery escalation'],
    limitation:
      'Exact authority structures will vary by property, jurisdiction, and operating model.',
    traceabilityReference: 'OS:SystemArtifacts/authority-routing',
  },
];

export const nextValidationSteps = [
  'Review decision domains and authority boundaries with land stewards and field operators.',
  'Validate signal quality and confidence assumptions against one real property.',
  'Walk recovery paths through realistic weather, access, and habitat disruptions.',
  'Define which artifacts are ready for scenario prototyping and which remain research hypotheses.',
];

export const relatedProjects: RelatedProject[] = [
  {
    id: 'architecture-of-confidence',
    title: 'The Architecture of Confidence',
    description:
      'The framework for context interpretation, confidence communication, human agency, and recovery.',
    href: '/projects/architecture-of-confidence',
    relationship: 'Framework origin',
  },
  {
    id: 'adaptive-ranch',
    title: 'Adaptive Ranch Experience Companion',
    description:
      'The place-based service system connecting environmental conditions, operations, and stewardship.',
    href: '/projects/adaptive-ranch-experience-companion',
    relationship: 'Applied system origin',
  },
];

export const sectionNavigation = [
  { id: 'responsive-ecologies-hero', label: 'Overview' },
  { id: 'artifact-origins', label: 'Context' },
  { id: 'decision-problem', label: 'Problem' },
  { id: 'system-loop', label: 'System' },
  { id: 'domain-atlas', label: 'Operations' },
  { id: 'confidence-model', label: 'Evidence' },
  { id: 'project-footer', label: 'Future' },
] as const;
