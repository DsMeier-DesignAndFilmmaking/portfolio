export type ProjectMetadata = {
  title: string;
  subtitle: string;
  classification: string;
  practice: string;
  status: string;
  maturity: string;
  summary: string;
  thesis: string;
};

export type TranslationStage = {
  label: string;
  description: string;
  example: string;
  tone: 'clay' | 'moss' | 'water' | 'dawn' | 'ink' | 'lichen';
};

export type BlueprintDimension = {
  dimension: string;
  value: string;
  designQuestion: string;
};

export type EnvironmentalAffordance = {
  affordance: string;
  experienceSupport: string;
  designUse: string;
};

export type IntentionState = {
  name: string;
  startingLanguage: string;
  desiredShift: string;
  spatialRhythm: string;
  sensoryProfile: string;
  socialPermeability: string;
  agencyLevel: string;
  thresholdMoment: string;
  recoveryOption: string;
};

export type JourneyStage = {
  stage: string;
  guestNeed: string;
  environmentalRole: string;
  serviceRole: string;
};

export type ValidationArea = {
  title: string;
  question: string;
};

export const sectionNavigation = [
  { id: 'intention-hero', label: 'Overview' },
  { id: 'discovery-problem', label: 'Problem' },
  { id: 'meaning-translation', label: 'Translation' },
  { id: 'transformation-blueprint', label: 'Blueprint' },
  { id: 'guest-journey', label: 'Experience' },
  { id: 'evidence-ethics', label: 'Future' },
] as const;

export const projectMetadata: ProjectMetadata = {
  title: 'The Intention Engine',
  subtitle: 'Designing environmental experiences around what a person is seeking.',
  classification: 'Exploratory systems concept',
  practice: 'Environmental Experience Design',
  status: 'Concept architecture',
  maturity: 'Research and blueprint framing',
  summary:
    'A semantic discovery and service-recovery framework that translates self-described intentions into environmental conditions, spatial blueprints, sensory compositions, and coherent guest journeys.',
  thesis:
    'Most travel systems begin with where someone wants to go. The Intention Engine begins with what someone is trying to recover, clarify, experience, or become.',
};

export const discoveryMismatch = [
  { human: 'I feel burned out.', system: 'Destination' },
  { human: 'I need perspective.', system: 'Budget' },
  { human: 'I am moving through a transition.', system: 'Duration' },
  { human: 'I want something genuinely different.', system: 'Activity type' },
];

export const translationStages: TranslationStage[] = [
  {
    label: 'Self-described intention',
    description: 'Language offered directly by the guest, without hidden diagnosis.',
    example: '“I need distance from constant demands.”',
    tone: 'clay',
  },
  {
    label: 'Desired shift',
    description: 'The change the experience should make possible.',
    example: 'Compression → spaciousness',
    tone: 'dawn',
  },
  {
    label: 'Experience qualities',
    description: 'The emotional and temporal character of the journey.',
    example: 'Unhurried, low-choice, restorative',
    tone: 'lichen',
  },
  {
    label: 'Environmental conditions',
    description: 'Landscape affordances capable of supporting that shift.',
    example: 'Canopy, water movement, protected views',
    tone: 'moss',
  },
  {
    label: 'Service requirements',
    description: 'Hospitality conditions needed to preserve the intended experience.',
    example: 'Quiet arrival, optional guidance, flexible pacing',
    tone: 'water',
  },
  {
    label: 'Blueprint output',
    description: 'A traceable experience composition from anticipation through departure.',
    example: 'Restoration blueprint v1',
    tone: 'ink',
  },
];

export const transformationBlueprint: BlueprintDimension[] = [
  { dimension: 'Intention', value: 'Recover perspective', designQuestion: 'What is the guest asking the experience to make possible?' },
  { dimension: 'Desired Shift', value: 'Narrowed → expansive', designQuestion: 'What meaningful change should the journey support?' },
  { dimension: 'Environmental Conditions', value: 'Elevation, horizon, weather visibility', designQuestion: 'Which landscape conditions can carry that change?' },
  { dimension: 'Spatial Conditions', value: 'Gradual ascent, pause points, long view', designQuestion: 'How should movement and enclosure change over time?' },
  { dimension: 'Sensory Conditions', value: 'Cool air, distant sound, low visual clutter', designQuestion: 'What should become perceptually present or absent?' },
  { dimension: 'Social Conditions', value: 'Optional companionship, protected solitude', designQuestion: 'How permeable should the experience be to other people?' },
  { dimension: 'Threshold Moments', value: 'Emergence from canopy to open ridge', designQuestion: 'Where should the intended shift become tangible?' },
  { dimension: 'Integration', value: 'Guided meaning-making without forced disclosure', designQuestion: 'How does the guest recognize and retain the experience?' },
  { dimension: 'Departure', value: 'Slow return, portable reflection cue', designQuestion: 'How should the transformation travel beyond the site?' },
];

export const environmentalAffordances: EnvironmentalAffordance[] = [
  { affordance: 'Elevated views', experienceSupport: 'Perspective', designUse: 'Reveal scale after a period of enclosure or ascent.' },
  { affordance: 'Water movement', experienceSupport: 'Reflection', designUse: 'Create repetition, temporal softness, and a stable attentional anchor.' },
  { affordance: 'Dense canopy', experienceSupport: 'Restoration', designUse: 'Reduce visual range, heat, and decision pressure.' },
  { affordance: 'Open horizons', experienceSupport: 'Expansion', designUse: 'Support distance, possibility, and a changed sense of proportion.' },
  { affordance: 'Meandering paths', experienceSupport: 'Curiosity', designUse: 'Allow discovery without requiring a single optimal route.' },
  { affordance: 'Firelight gathering', experienceSupport: 'Belonging', designUse: 'Create a bounded social center with flexible participation.' },
];

export const intentionStates: IntentionState[] = [
  {
    name: 'Burnout',
    startingLanguage: '“I need everything to stop asking something of me.”',
    desiredShift: 'Compression → restoration',
    spatialRhythm: 'Few decisions, protected pauses, short transitions',
    sensoryProfile: 'Soft light, water, warmth, low acoustic complexity',
    socialPermeability: 'Low; contact remains optional',
    agencyLevel: 'Gentle defaults with easy opt-out',
    thresholdMoment: 'First sustained period without instruction',
    recoveryOption: 'Reduce duration or intensity without framing it as failure',
  },
  {
    name: 'Transition',
    startingLanguage: '“Something is ending, but the next thing is not clear.”',
    desiredShift: 'Ambiguity → orientation',
    spatialRhythm: 'Thresholds, crossings, widening views',
    sensoryProfile: 'Changing texture, directional light, elemental contrast',
    socialPermeability: 'Selective; witness or guide available',
    agencyLevel: 'Structured sequence with personal interpretation',
    thresholdMoment: 'A visible crossing or ritualized pause',
    recoveryOption: 'Offer a quieter parallel path that preserves symbolism',
  },
  {
    name: 'Curiosity',
    startingLanguage: '“I want to encounter something I would not have chosen.”',
    desiredShift: 'Familiarity → discovery',
    spatialRhythm: 'Branches, partial views, variable pace',
    sensoryProfile: 'Material contrast, local sound, changing scale',
    socialPermeability: 'Medium; chance encounters can add value',
    agencyLevel: 'High; multiple valid paths',
    thresholdMoment: 'Unexpected reveal or knowledge handoff',
    recoveryOption: 'Replace a closed path with another form of surprise',
  },
  {
    name: 'Reflection',
    startingLanguage: '“I need enough quiet to hear what I think.”',
    desiredShift: 'Noise → coherence',
    spatialRhythm: 'Repetition, long dwell, simple return path',
    sensoryProfile: 'Wind, shadow, tactile material, restrained sound',
    socialPermeability: 'Very low; presence without demand',
    agencyLevel: 'Self-paced with discreet support',
    thresholdMoment: 'A place that invites staying rather than moving on',
    recoveryOption: 'Preserve solitude and temporal spaciousness indoors',
  },
];

export const compositionDimensions = [
  ['Arrival thresholds', 'Move from transaction to environmental attention gradually.'],
  ['Path structure', 'Use sequence, branching, enclosure, and reveal as narrative materials.'],
  ['Materiality', 'Let local textures communicate climate, craft, age, and ecological fit.'],
  ['Light', 'Shape orientation, exposure, intimacy, and the felt passage of time.'],
  ['Sound', 'Design what recedes as carefully as what becomes audible.'],
  ['Temperature', 'Use warmth, shade, air movement, and water as experiential transitions.'],
  ['Human contact', 'Stage welcome, guidance, witness, and withdrawal intentionally.'],
  ['Pacing', 'Protect dwell, recovery, and unprogrammed time from operational\u00a0compression.'],
];

export const journeyStages: JourneyStage[] = [
  { stage: 'Anticipation', guestNeed: 'Express intention without choosing an itinerary.', environmentalRole: 'Set truthful expectations about place and season.', serviceRole: 'Invite language, boundaries, and consent.' },
  { stage: 'Arrival', guestNeed: 'Cross out of logistics and into the experience.', environmentalRole: 'Establish material, climatic, and spatial orientation.', serviceRole: 'Reduce transaction and decision load.' },
  { stage: 'Decompression', guestNeed: 'Settle before being asked to participate.', environmentalRole: 'Offer shelter, repetition, and low stimulation.', serviceRole: 'Protect unscheduled time.' },
  { stage: 'Exploration', guestNeed: 'Move with enough freedom to discover.', environmentalRole: 'Provide meaningful variation and legible choices.', serviceRole: 'Support without over-directing.' },
  { stage: 'Threshold Moment', guestNeed: 'Encounter the intended shift in tangible form.', environmentalRole: 'Create reveal, crossing, gathering, or sustained pause.', serviceRole: 'Hold the moment without over-interpreting it.' },
  { stage: 'Integration', guestNeed: 'Connect experience to personal meaning.', environmentalRole: 'Provide a slower, reflective setting.', serviceRole: 'Offer optional facilitation.' },
  { stage: 'Departure', guestNeed: 'Leave without an abrupt return to transaction.', environmentalRole: 'Create a gradual spatial and sensory transition.', serviceRole: 'Preserve continuity and agency.' },
  { stage: 'Reflection', guestNeed: 'Carry forward what mattered.', environmentalRole: 'Remain present through memory and a portable cue.', serviceRole: 'Invite reflection without demanding feedback.' },
];

export const operatingStages = [
  ['Guest Intention', 'Self-described desired change and boundaries'],
  ['Transformation Blueprint', 'Spatial, sensory, social, and service composition'],
  ['Place Inventory', 'Environmental affordances, constraints, and cultural context'],
  ['Hospitality Operations', 'Capacity, timing, staff, access, and recovery readiness'],
  ['Guide Interpretation', 'Human judgment and place-based adaptation'],
  ['Feedback', 'Guest meaning, staff observations, and evidence limits'],
];

export const ethics = [
  ['Consent', 'Guests choose what they disclose and can revise or withdraw it.'],
  ['Explainability', 'The experience can show how stated intention influenced the blueprint.'],
  ['Data minimization', 'Retain only what is necessary to compose and support the journey.'],
  ['Cultural fit', 'Local meaning and community knowledge constrain interpretation.'],
  ['Psychological safety', 'Avoid forced disclosure, therapeutic claims, and engineered vulnerability.'],
  ['Limits of inference', 'The system interprets self-described intentions; it does not diagnose people.'],
];

export const validationAreas: ValidationArea[] = [
  { title: 'Guest language studies', question: 'Can people describe desired change without adopting system vocabulary?' },
  { title: 'Blueprint testing', question: 'Do different teams create coherent experiences from the same intention?' },
  { title: 'Cross-cultural interpretation', question: 'Which meanings and spatial assumptions fail to transfer?' },
  { title: 'Service recovery evaluation', question: 'Does meaning-preserving recovery feel equivalent rather than merely\u00a0compensatory?' },
  { title: 'Environmental fit validation', question: 'Are proposed affordances ecologically and operationally appropriate?' },
  { title: 'HADE handoff experiments', question: 'Can adaptive delivery preserve the blueprint without absorbing its role?' },
];
