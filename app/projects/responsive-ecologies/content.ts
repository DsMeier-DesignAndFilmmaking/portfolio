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

export const sectionNavigation = [
  { id: 'responsive-ecologies-hero', label: 'Overview' },
  { id: 'project-frame', label: 'Frame' },
  { id: 'artifact-origins', label: 'Origins' },
  { id: 'decision-problem', label: 'Problem' },
  { id: 'decision-hierarchy', label: 'Decisions' },
  { id: 'stewardship-principles', label: 'Principles' },
  { id: 'system-loop', label: 'System' },
  { id: 'domain-atlas', label: 'Domains' },
] as const;
