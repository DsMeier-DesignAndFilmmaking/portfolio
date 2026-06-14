import type { ConfidenceLevel, DiagramTone } from './primitives';

export type ArchitectureLayer = {
  id: string;
  label: string;
  title: string;
  description: string;
  tone: DiagramTone;
  signals: string[];
};

export type SignalGroup = {
  id: string;
  label: string;
  description: string;
  tone: DiagramTone;
  signals: string[];
};

export type RanchSignalGroup = {
  id: string;
  title: string;
  description: string;
  tone: DiagramTone;
  confidenceImpact: string;
  signals: string[];
};

export type RanchArchitectureItem = {
  id: string;
  title: string;
  description: string;
  tone: DiagramTone;
  badges?: string[];
};

export type ActivityConfidenceDimension = {
  id: string;
  activity: string;
  confidenceLevel: ConfidenceLevel;
  guestQuestion: string;
  confidenceSignals: string[];
  guidanceResponse: string;
};

export type ActivityConfidenceMatrixItem = {
  id: string;
  activity: string;
  skillLevel: string;
  intensity: string;
  weatherSensitivity: string;
  socialDemand: string;
  recoveryFlexibility: string;
  primaryUncertainty: string;
  supportNeed: string;
};

export type GuestConfidenceBreakdown = {
  id: string;
  title: string;
  trigger: string;
  reducer: string;
  restoration: string;
  tone: DiagramTone;
};

export type TraceStepData = {
  id: string;
  title: string;
  description: string;
  meta?: string;
  tone: DiagramTone;
};

export type WeatherScenarioStep = {
  id: string;
  title: string;
  description: string;
  confidenceState: string;
  signals: string[];
  systemResponse: string;
  tone: DiagramTone;
};

export type RecoveryPathStep = {
  id: string;
  title: string;
  description: string;
  confidenceImpact: string;
  systemResponse: string;
  tone: DiagramTone;
};

export type RecoveryAlternativePath = {
  id: string;
  original: string;
  alternative: string;
  preservedIntent: string;
  humanHandoff: string;
};

export type GuidanceLayer = {
  id: string;
  title: string;
  description: string;
  tone: DiagramTone;
  inputs: string[];
  outputs: string[];
};

export type GuidanceArchitectureFlowItem = {
  id: string;
  title: string;
  description: string;
  tone: DiagramTone;
};

export type GuidanceCategory = {
  id: string;
  title: string;
  purpose: string;
  confidenceImpact: string;
  example: string;
};

export type GuidanceAgencyRule = {
  id: string;
  rule: string;
  description: string;
};

export type BlueprintLaneData = {
  id: string;
  title: string;
  description: string;
  tone: DiagramTone;
  moments: Array<{
    id: string;
    title: string;
    description: string;
    meta?: string;
  }>;
};

export type OperationsBlueprintStage = {
  id: string;
  stage: string;
  title: string;
  description: string;
  type: string;
  confidenceImpact?: string;
};

export type OperationsBlueprintLane = {
  id: string;
  lane: string;
  title: string;
  description: string;
  type: string;
  tone: DiagramTone;
  confidenceImpact?: string;
};

export type OperationsBlueprintMoment = {
  id: string;
  stage: string;
  lane: string;
  title: string;
  description: string;
  type: string;
  confidenceImpact?: string;
};

export type ApplicationsMatrixItem = {
  id: string;
  environment: string;
  guestUncertainty: string;
  operationalComplexity: string;
  environmentalVariability: string;
  stewardshipSensitivity: string;
  recoveryImportance: string;
  confidenceOpportunity: string;
};

export type ApplicationData = {
  id: string;
  environment: string;
  uncertainty: string;
  confidenceBreakdown: string;
  mechanism: string;
  action: string;
  tone: DiagramTone;
  signals: string[];
};

export const architectureLayers: ArchitectureLayer[] = [
  {
    id: 'guest-intent',
    label: 'Guest Layer',
    title: 'Guest Intent & Comfort',
    description: 'Captures stated goals, uncertainty, skill comfort, party needs, and appetite for participation.',
    tone: 'ranch',
    signals: ['Goal', 'skill comfort', 'party makeup', 'hesitation'],
  },
  {
    id: 'ranch-context',
    label: 'Place Layer',
    title: 'Ranch Context',
    description: 'Interprets terrain, weather, activity windows, animal handling needs, and operational constraints.',
    tone: 'signal',
    signals: ['Weather', 'terrain', 'capacity', 'staff availability'],
  },
  {
    id: 'confidence-assessment',
    label: 'Assessment Layer',
    title: 'Confidence Assessment',
    description: 'Compares guest readiness with live ranch conditions to identify the right level of guidance.',
    tone: 'confidence',
    signals: ['Readiness', 'risk', 'timing fit', 'fallback clarity'],
  },
  {
    id: 'guided-action',
    label: 'Guidance Layer',
    title: 'Guided Participation',
    description: 'Frames activity options, etiquette, preparation, and recovery paths without forcing a decision.',
    tone: 'stewardship',
    signals: ['Next best step', 'why it fits', 'preparation', 'backup option'],
  },
];

export const signalGroups: SignalGroup[] = [
  {
    id: 'guest-signals',
    label: 'Guest Signals',
    description: 'Signals that describe readiness, preference, uncertainty, and social context.',
    tone: 'ranch',
    signals: ['Experience level', 'energy', 'group mix', 'comfort notes'],
  },
  {
    id: 'environment-signals',
    label: 'Environment Signals',
    description: 'Live place conditions that change activity fit throughout the day.',
    tone: 'signal',
    signals: ['Weather shift', 'trail state', 'daylight', 'temperature'],
  },
  {
    id: 'operations-signals',
    label: 'Operations Signals',
    description: 'Service realities that affect availability, staffing, safety, and recovery timing.',
    tone: 'operations',
    signals: ['Guide availability', 'horse readiness', 'transport', 'capacity'],
  },
  {
    id: 'confidence-signals',
    label: 'Confidence Signals',
    description: 'Indicators that a guest needs clarity, reassurance, alternatives, or a smaller first step.',
    tone: 'confidence',
    signals: ['Hesitation', 'question volume', 'risk sensitivity', 'fallback need'],
  },
];

export const ranchSignalGroups: RanchSignalGroup[] = [
  {
    id: 'guest',
    title: 'Guest',
    description: 'Signals that reveal readiness, intent, comfort, and confidence gaps.',
    tone: 'ranch',
    confidenceImpact: 'Clarifies what kind of guidance the guest can act on.',
    signals: ['Intent', 'skill comfort', 'group needs', 'energy level', 'hesitation'],
  },
  {
    id: 'environment',
    title: 'Environment',
    description: 'Live place conditions that change activity fit and guest trust.',
    tone: 'signal',
    confidenceImpact: 'Explains why an activity may feel different now than when selected.',
    signals: ['Weather', 'trail state', 'daylight', 'terrain', 'animal conditions'],
  },
  {
    id: 'operations',
    title: 'Operations',
    description: 'Service realities that determine what can be promised and recovered.',
    tone: 'operations',
    confidenceImpact: 'Keeps guest-facing guidance aligned with actual availability.',
    signals: ['Guide capacity', 'equipment', 'transport', 'activity timing', 'meal windows'],
  },
  {
    id: 'stewardship',
    title: 'Stewardship',
    description: 'Land, animal, safety, and etiquette constraints that shape responsible participation.',
    tone: 'stewardship',
    confidenceImpact: 'Turns responsibility into clear guest action instead of anxiety.',
    signals: ['Land care', 'animal welfare', 'trail etiquette', 'safety thresholds', 'local practice'],
  },
  {
    id: 'staff-knowledge',
    title: 'Staff Knowledge',
    description: 'Human judgment that validates local nuance the system should not flatten.',
    tone: 'confidence',
    confidenceImpact: 'Adds trust when context needs lived ranch expertise.',
    signals: ['Guide judgment', 'guest notes', 'route wisdom', 'seasonal patterns', 'service handoffs'],
  },
];

export const ranchArchitectureInputs: RanchArchitectureItem[] = [
  {
    id: 'guest-signals',
    title: 'Guest Signals',
    description: 'Intent, comfort, experience level, energy, party needs, and moments of hesitation.',
    tone: 'ranch',
    badges: ['Intent', 'comfort', 'readiness'],
  },
  {
    id: 'environmental-signals',
    title: 'Environmental Signals',
    description: 'Weather, terrain, daylight, animal conditions, trail state, and seasonal constraints.',
    tone: 'signal',
    badges: ['Weather', 'terrain', 'daylight'],
  },
  {
    id: 'operational-signals',
    title: 'Operational Signals',
    description: 'Guide availability, capacity, equipment, transport, meal timing, and service handoffs.',
    tone: 'operations',
    badges: ['Capacity', 'staffing', 'handoffs'],
  },
  {
    id: 'stewardship-signals',
    title: 'Stewardship Signals',
    description: 'Land ethics, animal respect, local practice, guest etiquette, and conservation cues.',
    tone: 'stewardship',
    badges: ['Etiquette', 'land', 'animals'],
  },
];

export const ranchArchitectureFlow: RanchArchitectureItem[] = [
  {
    id: 'context-interpretation',
    title: 'Context Interpretation',
    description: 'Translate live ranch signals into a clear picture of what matters for this guest now.',
    tone: 'signal',
    badges: ['Sensemaking'],
  },
  {
    id: 'confidence-assessment',
    title: 'Confidence Assessment',
    description: 'Evaluate clarity, skill fit, risk, timing, social comfort, and fallback visibility.',
    tone: 'confidence',
    badges: ['Confidence state'],
  },
  {
    id: 'decision-logic',
    title: 'Decision Logic',
    description: 'Decide whether to clarify, narrow options, validate, preserve choice, or prepare recovery.',
    tone: 'neutral',
    badges: ['Next best move'],
  },
  {
    id: 'guidance-layer',
    title: 'Guidance Layer',
    description: 'Frame the activity, preparation, tradeoffs, and fallback in language the guest can act on.',
    tone: 'stewardship',
    badges: ['Guest-facing'],
  },
  {
    id: 'human-action',
    title: 'Human Action',
    description: 'Guest joins, delays, adapts, asks for support, or chooses another experience with agency.',
    tone: 'ranch',
    badges: ['Choice preserved'],
  },
];

export const ranchRecoveryLoop: RanchArchitectureItem[] = [
  {
    id: 'recovery-layer',
    title: 'Recovery Layer',
    description: 'When confidence drops, identify the owner, explain the shift, and offer a credible alternative.',
    tone: 'recovery',
    badges: ['Fallback', 'ownership'],
  },
  {
    id: 'learning-loop',
    title: 'Learning Loop',
    description: 'Return hesitation, reroutes, weather shifts, and recovery outcomes to future guidance logic.',
    tone: 'confidence',
    badges: ['Pattern learning', 'future fit'],
  },
];

export const activityConfidenceDimensions: ActivityConfidenceDimension[] = [
  {
    id: 'trail-ride',
    activity: 'Morning Trail Ride',
    confidenceLevel: 'high',
    guestQuestion: 'Can I do this if I have limited riding experience?',
    confidenceSignals: ['Beginner route', 'clear weather', 'guide available'],
    guidanceResponse: 'Frame the ride as a supported first-step activity with preparation notes and guide reassurance.',
  },
  {
    id: 'fly-fishing',
    activity: 'Fly Fishing Clinic',
    confidenceLevel: 'medium',
    guestQuestion: 'Will this be worth it if the weather changes?',
    confidenceSignals: ['Cloud cover', 'river access', 'gear timing'],
    guidanceResponse: 'Present the best weather window and explain the indoor fallback if conditions shift.',
  },
  {
    id: 'cattle-workshop',
    activity: 'Cattle Work Demonstration',
    confidenceLevel: 'recovery',
    guestQuestion: 'What happens if the main activity is cancelled?',
    confidenceSignals: ['Animal safety', 'staff redirect', 'alternate slot'],
    guidanceResponse: 'Move the guest into a recovery path with an equivalent ranch-learning experience.',
  },
];

export const activityConfidenceMatrix: ActivityConfidenceMatrixItem[] = [
  {
    id: 'horseback-riding',
    activity: 'Horseback Riding',
    skillLevel: 'Novice to guided',
    intensity: 'Medium',
    weatherSensitivity: 'High',
    socialDemand: 'Medium',
    recoveryFlexibility: 'Medium',
    primaryUncertainty: 'Ability and animal comfort',
    supportNeed: 'Guide validation and clear prep',
  },
  {
    id: 'fly-fishing',
    activity: 'Fly Fishing',
    skillLevel: 'Beginner friendly',
    intensity: 'Low',
    weatherSensitivity: 'High',
    socialDemand: 'Low',
    recoveryFlexibility: 'High',
    primaryUncertainty: 'Weather window and technique',
    supportNeed: 'Timing advice and equipment setup',
  },
  {
    id: 'guided-hike',
    activity: 'Guided Hike',
    skillLevel: 'Route dependent',
    intensity: 'Medium to high',
    weatherSensitivity: 'High',
    socialDemand: 'Medium',
    recoveryFlexibility: 'Medium',
    primaryUncertainty: 'Distance, terrain, and pace',
    supportNeed: 'Route fit and fallback timing',
  },
  {
    id: 'archery',
    activity: 'Archery',
    skillLevel: 'Beginner friendly',
    intensity: 'Low',
    weatherSensitivity: 'Medium',
    socialDemand: 'Low',
    recoveryFlexibility: 'High',
    primaryUncertainty: 'First-time confidence',
    supportNeed: 'Low-pressure instruction',
  },
  {
    id: 'wildlife-tour',
    activity: 'Wildlife Tour',
    skillLevel: 'Low barrier',
    intensity: 'Low to medium',
    weatherSensitivity: 'Medium',
    socialDemand: 'Medium',
    recoveryFlexibility: 'Medium',
    primaryUncertainty: 'Sightings and patience',
    supportNeed: 'Expectation framing',
  },
  {
    id: 'ranch-workshop',
    activity: 'Ranch Workshop',
    skillLevel: 'Beginner friendly',
    intensity: 'Low',
    weatherSensitivity: 'Low',
    socialDemand: 'Medium',
    recoveryFlexibility: 'High',
    primaryUncertainty: 'Etiquette and participation role',
    supportNeed: 'Human context and stewardship cues',
  },
  {
    id: 'campfire-gathering',
    activity: 'Campfire Gathering',
    skillLevel: 'Low barrier',
    intensity: 'Low',
    weatherSensitivity: 'Medium',
    socialDemand: 'High',
    recoveryFlexibility: 'High',
    primaryUncertainty: 'Social comfort',
    supportNeed: 'Choice-preserving invitation',
  },
];

export const guestConfidenceBreakdowns: GuestConfidenceBreakdown[] = [
  {
    id: 'arrival',
    title: 'Arrival',
    trigger: 'Guest reaches the property with incomplete orientation to place, pace, and expectations.',
    reducer: 'Unclear first steps make the ranch feel larger and less legible than it is.',
    restoration: 'Clarify Context',
    tone: 'ranch',
  },
  {
    id: 'activity-selection',
    title: 'Activity Selection',
    trigger: 'Guest sees many activities but cannot tell which one fits this stay moment.',
    reducer: 'Choice overload turns opportunity into hesitation.',
    restoration: 'Reduce Options',
    tone: 'confidence',
  },
  {
    id: 'skill-confidence',
    title: 'Skill Confidence',
    trigger: 'Guest worries they are not experienced enough to participate comfortably.',
    reducer: 'Perceived ability gap raises the cost of joining.',
    restoration: 'Human Validation',
    tone: 'stewardship',
  },
  {
    id: 'environmental-confidence',
    title: 'Environmental Confidence',
    trigger: 'Weather, terrain, animals, distance, or daylight changes the risk picture.',
    reducer: 'Live conditions feel hard to interpret without local knowledge.',
    restoration: 'Clarify Context',
    tone: 'signal',
  },
  {
    id: 'social-confidence',
    title: 'Social Confidence',
    trigger: 'Guest is unsure about etiquette, group dynamics, or how visible their inexperience will be.',
    reducer: 'Social uncertainty makes participation feel exposed.',
    restoration: 'Preserve Choice',
    tone: 'ranch',
  },
  {
    id: 'timing-logistics',
    title: 'Timing & Logistics',
    trigger: 'Activity timing, prep needs, transport, meals, or handoffs are hard to sequence.',
    reducer: 'Coordination burden competes with enjoyment.',
    restoration: 'Reduce Options',
    tone: 'operations',
  },
  {
    id: 'stewardship',
    title: 'Stewardship',
    trigger: 'Guest wants to participate respectfully but lacks cues about land, animals, and local practice.',
    reducer: 'Fear of doing the wrong thing suppresses curiosity.',
    restoration: 'Human Validation',
    tone: 'stewardship',
  },
  {
    id: 'recovery',
    title: 'Recovery',
    trigger: 'Plans change after the guest has already committed attention, time, or emotion.',
    reducer: 'Trust drops when the next good option is not immediately visible.',
    restoration: 'Recovery Path',
    tone: 'recovery',
  },
];

export const scenarioTraceSteps: TraceStepData[] = [
  {
    id: 'plan',
    title: 'Guest plans an outdoor activity',
    description: 'The guest chooses a horseback ride based on interest, stay timing, and beginner-friendly framing.',
    meta: 'Morning',
    tone: 'ranch',
  },
  {
    id: 'weather-shift',
    title: 'Weather shifts the confidence picture',
    description: 'Incoming wind and rain reduce comfort and increase the need for preparation or alternatives.',
    meta: 'Signal Change',
    tone: 'signal',
  },
  {
    id: 'reassess',
    title: 'System reassesses fit',
    description: 'Guest readiness, weather, guide availability, and alternate activity quality are evaluated together.',
    meta: 'Assessment',
    tone: 'confidence',
  },
  {
    id: 'guided-choice',
    title: 'Guest receives a clear choice',
    description: 'The companion explains whether to continue, delay, or switch without making the decision for the guest.',
    meta: 'Guidance',
    tone: 'stewardship',
  },
];

export const weatherScenarioSteps: WeatherScenarioStep[] = [
  {
    id: 'original-plan',
    title: 'Original Plan',
    description: 'Guest booked a guided horseback ride as the anchor outdoor activity for the day.',
    confidenceState: 'Stable commitment',
    signals: ['Ride booked', 'family interested', 'moderate riding comfort'],
    systemResponse: 'Preserve the original intent and watch for context changes that affect readiness.',
    tone: 'ranch',
  },
  {
    id: 'weather-signal',
    title: 'Weather Signal',
    description: 'Weather shifts and trail conditions become less certain before the ride window.',
    confidenceState: 'Attention required',
    signals: ['Wind picking up', 'trail condition unknown', 'timing pressure'],
    systemResponse: 'Elevate weather and trail signals without cancelling the plan prematurely.',
    tone: 'signal',
  },
  {
    id: 'confidence-drop',
    title: 'Confidence Drop',
    description: 'The guest has moderate riding confidence, while family preferences become mixed.',
    confidenceState: 'Confidence reduced',
    signals: ['Mixed comfort', 'family split', 'ability concern'],
    systemResponse: 'Recognize that the issue is confidence fit, not simply activity availability.',
    tone: 'recovery',
  },
  {
    id: 'context-interpretation',
    title: 'Context Interpretation',
    description: 'The system compares weather, trail risk, skill comfort, party needs, and schedule constraints.',
    confidenceState: 'Context clarified',
    signals: ['Weather window', 'skill fit', 'party needs'],
    systemResponse: 'Separate the guest goal from the specific activity so alternatives can preserve intent.',
    tone: 'confidence',
  },
  {
    id: 'decision-logic',
    title: 'Decision Logic',
    description: 'The system decides whether to continue, delay, narrow the route, or offer a better-fit alternative.',
    confidenceState: 'Choice narrowed',
    signals: ['Route options', 'guide availability', 'fallback quality'],
    systemResponse: 'Surface a small set of viable paths rather than forcing a single recommendation.',
    tone: 'operations',
  },
  {
    id: 'human-validation',
    title: 'Human Validation',
    description: 'Staff validates current trail conditions and confirms which alternatives still feel ranch-authentic.',
    confidenceState: 'Trust reinforced',
    signals: ['Staff judgment', 'guide knowledge', 'guest questions'],
    systemResponse: 'Use human judgment to make the alternative feel grounded, not automated.',
    tone: 'stewardship',
  },
  {
    id: 'recovery-path',
    title: 'Recovery Path',
    description: 'The guest receives a safer or better-fit alternative that keeps the spirit of the original plan.',
    confidenceState: 'Recovery active',
    signals: ['Alternative available', 'original intent preserved', 'lower risk'],
    systemResponse: 'Offer the path, explain why it fits, and keep the original ride available if conditions improve.',
    tone: 'recovery',
  },
  {
    id: 'confident-outcome',
    title: 'Confident Outcome',
    description: 'The guest adapts without feeling downgraded, maintaining trust in both staff and the companion.',
    confidenceState: 'Confidence restored',
    signals: ['Guest opts in', 'family aligned', 'trust maintained'],
    systemResponse: 'Capture the recovery outcome so future activity guidance improves.',
    tone: 'confidence',
  },
];

export const recoveryPathSteps: RecoveryPathStep[] = [
  {
    id: 'disruption',
    title: 'Disruption',
    description: 'A plan is interrupted by weather, closure, guide reassignment, skill mismatch, family preference conflict, or equipment readiness.',
    confidenceImpact: 'Attention shifts from anticipation to uncertainty.',
    systemResponse: 'Name the disruption and separate the guest goal from the disrupted plan.',
    tone: 'signal',
  },
  {
    id: 'confidence-drop',
    title: 'Confidence Drop',
    description: 'The guest loses clarity about what is still safe, available, respectful, or worth doing.',
    confidenceImpact: 'Trust weakens when the next good option is not visible.',
    systemResponse: 'Detect the confidence gap before proposing an alternative.',
    tone: 'recovery',
  },
  {
    id: 'intent-preservation',
    title: 'Intent Preservation',
    description: 'The system identifies what the guest wanted from the plan: movement, animals, learning, family time, quiet, or novelty.',
    confidenceImpact: 'The change feels less like a loss when the original intent is still honored.',
    systemResponse: 'Preserve the goal before narrowing replacement options.',
    tone: 'confidence',
  },
  {
    id: 'recovery-decision',
    title: 'Recovery Decision',
    description: 'The system compares viable alternatives against safety, stewardship, timing, capacity, and guest confidence.',
    confidenceImpact: 'Options become easier to evaluate because the field is intentionally narrowed.',
    systemResponse: 'Reduce options to a small set of credible paths.',
    tone: 'operations',
  },
  {
    id: 'human-handoff',
    title: 'Human Handoff',
    description: 'Staff or guide judgment validates what changed and why the alternative is appropriate.',
    confidenceImpact: 'Human validation turns a system suggestion into a trusted service moment.',
    systemResponse: 'Route the handoff to the staff role that owns the recovery promise.',
    tone: 'stewardship',
  },
  {
    id: 'alternative-path',
    title: 'Alternative Path',
    description: 'The guest receives a replacement experience that protects the core intent of the original plan.',
    confidenceImpact: 'Confidence returns when the alternative feels purposeful rather than leftover.',
    systemResponse: 'Explain what changed, why the alternative fits, and what choice remains open.',
    tone: 'ranch',
  },
  {
    id: 'confidence-restoration',
    title: 'Confidence Restoration',
    description: 'The guest adapts without feeling downgraded, unsafe, or forced into the system response.',
    confidenceImpact: 'Trust is restored because safety, choice, and intent are visible.',
    systemResponse: 'Confirm the plan, clarify expectations, and preserve the guest’s agency.',
    tone: 'confidence',
  },
  {
    id: 'learning-signal',
    title: 'Learning Signal',
    description: 'The disruption and recovery outcome become reusable signals for future guidance.',
    confidenceImpact: 'Future recommendations improve because breakdown and recovery patterns are captured.',
    systemResponse: 'Feed the recovery result back into activity-fit, weather, and support logic.',
    tone: 'stewardship',
  },
];

export const recoveryAlternativePaths: RecoveryAlternativePath[] = [
  {
    id: 'covered-horsemanship',
    original: 'Trail ride',
    alternative: 'Covered horsemanship session',
    preservedIntent: 'Time with horses',
    humanHandoff: 'Guide explains animal care, weather impact, and safe handling.',
  },
  {
    id: 'fly-tying',
    original: 'Fly fishing',
    alternative: 'Fly-tying lesson',
    preservedIntent: 'River craft and technique',
    humanHandoff: 'Instructor connects the lesson to tomorrow’s better fishing window.',
  },
  {
    id: 'covered-fireside',
    original: 'Outdoor dinner',
    alternative: 'Covered fireside gathering',
    preservedIntent: 'Shared evening ritual',
    humanHandoff: 'Host reframes the move as comfort, safety, and atmosphere preservation.',
  },
  {
    id: 'split-activity',
    original: 'Group ride',
    alternative: 'Split activity path',
    preservedIntent: 'Family participation',
    humanHandoff: 'Guest services coordinates parallel options and reunion timing.',
  },
  {
    id: 'naturalist-talk',
    original: 'Guided hike',
    alternative: 'Lodge-based naturalist talk',
    preservedIntent: 'Landscape learning',
    humanHandoff: 'Naturalist translates trail context indoors without losing place connection.',
  },
];

export const guidanceLayers: GuidanceLayer[] = [
  {
    id: 'sense',
    title: 'Sense',
    description: 'Gather guest, place, activity, and operations signals.',
    tone: 'signal',
    inputs: ['Guest goal', 'weather', 'activity capacity'],
    outputs: ['Current context', 'constraint set'],
  },
  {
    id: 'interpret',
    title: 'Interpret',
    description: 'Translate raw signals into activity fit and confidence risks.',
    tone: 'confidence',
    inputs: ['Skill match', 'timing', 'risk'],
    outputs: ['Confidence level', 'attention points'],
  },
  {
    id: 'guide',
    title: 'Guide',
    description: 'Explain the next best action, preparation need, or recovery path.',
    tone: 'stewardship',
    inputs: ['Confidence level', 'fallbacks', 'staff knowledge'],
    outputs: ['Guest-facing framing', 'operations cue'],
  },
];

export const guidanceArchitectureFlow: GuidanceArchitectureFlowItem[] = [
  {
    id: 'signal',
    title: 'Signal',
    description: 'Guest, place, operations, weather, activity, and stewardship signals enter the system.',
    tone: 'signal',
  },
  {
    id: 'interpretation',
    title: 'Interpretation',
    description: 'The system decides which signals matter now and which can stay quiet.',
    tone: 'confidence',
  },
  {
    id: 'confidence-assessment',
    title: 'Confidence Assessment',
    description: 'Confidence state is evaluated across clarity, skill fit, timing, social comfort, and fallback visibility.',
    tone: 'confidence',
  },
  {
    id: 'guidance-strategy',
    title: 'Guidance Strategy',
    description: 'The system chooses whether to clarify, confirm, recommend, delay, reframe, or escalate to human support.',
    tone: 'stewardship',
  },
  {
    id: 'guest-decision',
    title: 'Guest Decision',
    description: 'The guest keeps authority to join, wait, adapt, ask for help, or choose another path.',
    tone: 'ranch',
  },
  {
    id: 'outcome',
    title: 'Outcome',
    description: 'The selected action is completed, deferred, recovered, or handed to staff.',
    tone: 'operations',
  },
  {
    id: 'learning',
    title: 'Learning',
    description: 'Signals from the result improve future confidence assessment and guidance choices.',
    tone: 'recovery',
  },
];

export const guidanceCategories: GuidanceCategory[] = [
  {
    id: 'orientation',
    title: 'Orientation',
    purpose: 'Help guests understand place, timing, and what matters first.',
    confidenceImpact: 'Reduces arrival ambiguity.',
    example: 'Start with the barn, then guest services can point you toward today’s activity board.',
  },
  {
    id: 'activity',
    title: 'Activity',
    purpose: 'Match activity choices to skill, interest, energy, and group needs.',
    confidenceImpact: 'Reduces choice overload.',
    example: 'Two good fits today: beginner ride or archery. The ride needs more weather confidence.',
  },
  {
    id: 'environmental',
    title: 'Environmental',
    purpose: 'Translate weather, terrain, daylight, animal, and trail conditions.',
    confidenceImpact: 'Clarifies changing risk.',
    example: 'Wind is rising near the ridge, so the lower pasture route is the calmer option.',
  },
  {
    id: 'stewardship',
    title: 'Stewardship',
    purpose: 'Explain respectful participation with land, animals, staff, and local practice.',
    confidenceImpact: 'Reduces etiquette anxiety.',
    example: 'The guide will show how to approach the horses before you enter the corral.',
  },
  {
    id: 'recovery',
    title: 'Recovery',
    purpose: 'Offer a credible fallback when plans change or confidence drops.',
    confidenceImpact: 'Restores trust after disruption.',
    example: 'If the trail closes, the covered horsemanship session preserves time with the horses.',
  },
  {
    id: 'social',
    title: 'Social',
    purpose: 'Support participation without forcing guests into uncomfortable group dynamics.',
    confidenceImpact: 'Preserves choice and belonging.',
    example: 'You can join the campfire for the first half hour and step away before stories begin.',
  },
];

export const guidanceAgencyRules: GuidanceAgencyRule[] = [
  {
    id: 'explain-context',
    rule: 'Explain context',
    description: 'Show what changed, why it matters, and which signals shaped the guidance.',
  },
  {
    id: 'preserve-choice',
    rule: 'Preserve choice',
    description: 'Frame options so the guest can decide rather than comply.',
  },
  {
    id: 'show-tradeoffs',
    rule: 'Show tradeoffs',
    description: 'Make timing, effort, risk, comfort, and experience quality visible.',
  },
  {
    id: 'human-validation',
    rule: 'Surface human validation',
    description: 'Use staff or guide judgment where lived context matters more than automation.',
  },
  {
    id: 'offer-fallback',
    rule: 'Offer fallback',
    description: 'Keep recovery paths visible before confidence collapses.',
  },
  {
    id: 'avoid-over-directing',
    rule: 'Avoid over-directing',
    description: 'Suppress unnecessary instructions when the guest already has enough clarity to act.',
  },
];

export const blueprintLanes: BlueprintLaneData[] = [
  {
    id: 'guest',
    title: 'Guest Experience',
    description: 'What the guest is trying to understand, choose, and recover from.',
    tone: 'ranch',
    moments: [
      {
        id: 'browse',
        title: 'Browse activities',
        description: 'Guest compares options without knowing which fits their ability or day.',
        meta: 'Discover',
      },
      {
        id: 'decide',
        title: 'Commit or hesitate',
        description: 'Guest needs enough clarity to join, delay, or choose an alternative.',
        meta: 'Choose',
      },
      {
        id: 'recover',
        title: 'Regain orientation',
        description: 'Guest receives a fallback when plans change or confidence drops.',
        meta: 'Recover',
      },
    ],
  },
  {
    id: 'system',
    title: 'Companion System',
    description: 'How the companion interprets signals and translates them into guidance.',
    tone: 'confidence',
    moments: [
      {
        id: 'match',
        title: 'Match fit',
        description: 'Compares guest readiness with live activity and ranch conditions.',
        meta: 'Assess',
      },
      {
        id: 'explain',
        title: 'Explain confidence',
        description: 'Surfaces why an option fits and what the guest should know.',
        meta: 'Clarify',
      },
      {
        id: 'reroute',
        title: 'Reroute calmly',
        description: 'Offers a credible alternative with operational awareness.',
        meta: 'Redirect',
      },
    ],
  },
  {
    id: 'operations',
    title: 'Ranch Operations',
    description: 'Staff and service actions that make guest confidence possible.',
    tone: 'operations',
    moments: [
      {
        id: 'prepare',
        title: 'Prepare capacity',
        description: 'Staff, guides, animals, equipment, and transport are aligned.',
        meta: 'Ready',
      },
      {
        id: 'support',
        title: 'Support choice',
        description: 'Guide team validates readiness and answers practical questions.',
        meta: 'Support',
      },
      {
        id: 'service-recovery',
        title: 'Own recovery',
        description: 'Operations coordinates the alternative and closes the trust gap.',
        meta: 'Own',
      },
    ],
  },
];

export const operationsBlueprintStages: OperationsBlueprintStage[] = [
  {
    id: 'arrival',
    stage: 'Arrival',
    title: 'Arrival',
    description: 'Guest enters the ranch and needs orientation to place, timing, and first steps.',
    type: 'orientation',
    confidenceImpact: 'Sets the baseline for trust and legibility.',
  },
  {
    id: 'activity-selection',
    stage: 'Activity Selection',
    title: 'Activity Selection',
    description: 'Guest compares activities against skill, interest, weather, and group needs.',
    type: 'choice',
    confidenceImpact: 'Reduces choice overload before commitment.',
  },
  {
    id: 'activity-preparation',
    stage: 'Activity Preparation',
    title: 'Activity Preparation',
    description: 'Guest and staff align gear, timing, safety, expectations, and readiness.',
    type: 'readiness',
    confidenceImpact: 'Turns a chosen activity into a prepared action.',
  },
  {
    id: 'guided-experience',
    stage: 'Guided Experience',
    title: 'Guided Experience',
    description: 'The activity unfolds with guide support, local context, and stewardship cues.',
    type: 'participation',
    confidenceImpact: 'Maintains confidence through human presence.',
  },
  {
    id: 'environmental-change',
    stage: 'Environmental Change',
    title: 'Environmental Change',
    description: 'Weather, trail, animal, or capacity changes shift the experience conditions.',
    type: 'disruption',
    confidenceImpact: 'Creates the moment where recovery may enter.',
  },
  {
    id: 'recovery-path',
    stage: 'Recovery Path',
    title: 'Recovery Path',
    description: 'The system and staff preserve intent while moving the guest to a better-fit path.',
    type: 'recovery',
    confidenceImpact: 'Restores agency after plans change.',
  },
  {
    id: 'outcome-learning',
    stage: 'Outcome & Learning',
    title: 'Outcome & Learning',
    description: 'The outcome is closed with the guest and returned to future guidance logic.',
    type: 'learning',
    confidenceImpact: 'Improves future confidence support.',
  },
];

export const operationsBlueprintLanes: OperationsBlueprintLane[] = [
  {
    id: 'guest',
    lane: 'Guest',
    title: 'Guest',
    description: 'The visible experience, decisions, questions, and confidence state.',
    type: 'experience',
    tone: 'ranch',
    confidenceImpact: 'Needs clarity, agency, and a trustworthy next step.',
  },
  {
    id: 'frontstage-staff',
    lane: 'Frontstage Staff',
    title: 'Frontstage Staff',
    description: 'Guides, hosts, and guest-facing staff who validate context and choices.',
    type: 'human support',
    tone: 'stewardship',
    confidenceImpact: 'Turns system guidance into trusted hospitality.',
  },
  {
    id: 'backstage-operations',
    lane: 'Backstage Operations',
    title: 'Backstage Operations',
    description: 'Capacity, equipment, schedules, animals, transport, and service coordination.',
    type: 'coordination',
    tone: 'operations',
    confidenceImpact: 'Makes the promised experience operationally real.',
  },
  {
    id: 'stewardship-layer',
    lane: 'Stewardship Layer',
    title: 'Stewardship Layer',
    description: 'Land, animal, safety, etiquette, and environmental constraints.',
    type: 'constraint',
    tone: 'signal',
    confidenceImpact: 'Keeps guest choice aligned with place responsibility.',
  },
  {
    id: 'companion-system',
    lane: 'Companion System',
    title: 'Companion System',
    description: 'Signal interpretation, confidence assessment, guidance, and recovery prompts.',
    type: 'guidance',
    tone: 'confidence',
    confidenceImpact: 'Frames choices before uncertainty becomes frustration.',
  },
  {
    id: 'recovery-layer',
    lane: 'Recovery Layer',
    title: 'Recovery Layer',
    description: 'Fallback ownership, alternative paths, handoffs, and learning signals.',
    type: 'recovery',
    tone: 'recovery',
    confidenceImpact: 'Repairs trust when the original plan no longer fits.',
  },
];

export const operationsBlueprintMoments: OperationsBlueprintMoment[] = [
  {
    id: 'arrival-guest',
    stage: 'arrival',
    lane: 'guest',
    title: 'Find footing',
    description: 'Guest wants to know where to go, what matters first, and how the day works.',
    type: 'objective',
    confidenceImpact: 'Initial confidence rises when the ranch feels legible.',
  },
  {
    id: 'arrival-frontstage-staff',
    stage: 'arrival',
    lane: 'frontstage-staff',
    title: 'Welcome and orient',
    description: 'Host confirms arrival needs, answers first questions, and names the next helpful stop.',
    type: 'handoff',
  },
  {
    id: 'arrival-backstage-operations',
    stage: 'arrival',
    lane: 'backstage-operations',
    title: 'Check readiness',
    description: 'Rooms, transport, activity rosters, and guide schedules are reconciled.',
    type: 'dependency',
  },
  {
    id: 'arrival-stewardship-layer',
    stage: 'arrival',
    lane: 'stewardship-layer',
    title: 'Set place cues',
    description: 'Animal areas, trail boundaries, and local etiquette are framed early.',
    type: 'constraint',
  },
  {
    id: 'arrival-companion-system',
    stage: 'arrival',
    lane: 'companion-system',
    title: 'Build context',
    description: 'Guest intent, party needs, timing, and weather signals become the starting context.',
    type: 'signal',
  },
  {
    id: 'arrival-recovery-layer',
    stage: 'arrival',
    lane: 'recovery-layer',
    title: 'Watch ambiguity',
    description: 'Arrival confusion is flagged before it becomes activity hesitation.',
    type: 'monitor',
    confidenceImpact: 'Recovery is quiet unless orientation breaks down.',
  },
  {
    id: 'activity-selection-guest',
    stage: 'activity-selection',
    lane: 'guest',
    title: 'Compare fit',
    description: 'Guest weighs horseback riding, fishing, hikes, workshops, and social activities.',
    type: 'objective',
    confidenceImpact: 'Confidence depends on knowing what fits this group now.',
  },
  {
    id: 'activity-selection-frontstage-staff',
    stage: 'activity-selection',
    lane: 'frontstage-staff',
    title: 'Validate choices',
    description: 'Staff confirms skill comfort, family preferences, and questions that need human context.',
    type: 'handoff',
  },
  {
    id: 'activity-selection-backstage-operations',
    stage: 'activity-selection',
    lane: 'backstage-operations',
    title: 'Expose availability',
    description: 'Guide capacity, equipment, horse readiness, and meal timing shape viable options.',
    type: 'dependency',
  },
  {
    id: 'activity-selection-stewardship-layer',
    stage: 'activity-selection',
    lane: 'stewardship-layer',
    title: 'Apply constraints',
    description: 'Trail load, animal welfare, weather exposure, and land care narrow the set.',
    type: 'constraint',
  },
  {
    id: 'activity-selection-companion-system',
    stage: 'activity-selection',
    lane: 'companion-system',
    title: 'Narrow options',
    description: 'The companion frames a small set of fit-based options instead of a full activity menu.',
    type: 'guidance',
  },
  {
    id: 'activity-selection-recovery-layer',
    stage: 'activity-selection',
    lane: 'recovery-layer',
    title: 'Name fallbacks',
    description: 'Fallbacks are visible before commitment, especially for weather-sensitive choices.',
    type: 'prevention',
    confidenceImpact: 'Guests commit more easily when a backup is credible.',
  },
  {
    id: 'activity-preparation-guest',
    stage: 'activity-preparation',
    lane: 'guest',
    title: 'Get ready',
    description: 'Guest needs gear, timing, physical expectations, and skill reassurance.',
    type: 'objective',
  },
  {
    id: 'activity-preparation-frontstage-staff',
    stage: 'activity-preparation',
    lane: 'frontstage-staff',
    title: 'Prepare guest',
    description: 'Guide or host explains what to bring, where to meet, and how support will work.',
    type: 'support',
  },
  {
    id: 'activity-preparation-backstage-operations',
    stage: 'activity-preparation',
    lane: 'backstage-operations',
    title: 'Stage resources',
    description: 'Equipment, transport, horses, guide assignments, and timing buffers are prepared.',
    type: 'dependency',
  },
  {
    id: 'activity-preparation-stewardship-layer',
    stage: 'activity-preparation',
    lane: 'stewardship-layer',
    title: 'Confirm safety fit',
    description: 'Conditions, animal readiness, group size, and route impact are checked.',
    type: 'constraint',
  },
  {
    id: 'activity-preparation-companion-system',
    stage: 'activity-preparation',
    lane: 'companion-system',
    title: 'Clarify expectations',
    description: 'Prep guidance reduces uncertainty about effort, clothing, timing, and etiquette.',
    type: 'guidance',
  },
  {
    id: 'activity-preparation-recovery-layer',
    stage: 'activity-preparation',
    lane: 'recovery-layer',
    title: 'Pre-stage alternatives',
    description: 'Nearby alternatives are held in reserve when readiness or conditions look unstable.',
    type: 'prevention',
  },
  {
    id: 'guided-experience-guest',
    stage: 'guided-experience',
    lane: 'guest',
    title: 'Participate with support',
    description: 'Guest joins the activity while relying on guide cues and visible safety boundaries.',
    type: 'objective',
    confidenceImpact: 'Confidence is maintained through context, pacing, and reassurance.',
  },
  {
    id: 'guided-experience-frontstage-staff',
    stage: 'guided-experience',
    lane: 'frontstage-staff',
    title: 'Guide and adjust',
    description: 'Guide reads comfort, explains local context, and adjusts pacing or support.',
    type: 'support',
  },
  {
    id: 'guided-experience-backstage-operations',
    stage: 'guided-experience',
    lane: 'backstage-operations',
    title: 'Monitor service flow',
    description: 'Operations tracks timing, transport, meal impacts, and downstream commitments.',
    type: 'dependency',
  },
  {
    id: 'guided-experience-stewardship-layer',
    stage: 'guided-experience',
    lane: 'stewardship-layer',
    title: 'Protect place',
    description: 'Guide practices reinforce trail etiquette, animal respect, and land constraints.',
    type: 'constraint',
  },
  {
    id: 'guided-experience-companion-system',
    stage: 'guided-experience',
    lane: 'companion-system',
    title: 'Stay quiet unless useful',
    description: 'The companion avoids over-directing while keeping live signals available to staff.',
    type: 'guidance',
  },
  {
    id: 'guided-experience-recovery-layer',
    stage: 'guided-experience',
    lane: 'recovery-layer',
    title: 'Monitor confidence',
    description: 'Hesitation, delay, weather signals, or comfort changes can trigger support.',
    type: 'monitor',
  },
  {
    id: 'environmental-change-guest',
    stage: 'environmental-change',
    lane: 'guest',
    title: 'Notice disruption',
    description: 'Guest senses that weather, trail, skill fit, or family comfort has shifted.',
    type: 'trigger',
    confidenceImpact: 'Confidence drops when the change is visible but the next path is not.',
  },
  {
    id: 'environmental-change-frontstage-staff',
    stage: 'environmental-change',
    lane: 'frontstage-staff',
    title: 'Assess in the field',
    description: 'Guide validates conditions and decides what needs explanation or escalation.',
    type: 'handoff',
  },
  {
    id: 'environmental-change-backstage-operations',
    stage: 'environmental-change',
    lane: 'backstage-operations',
    title: 'Update availability',
    description: 'Operations checks alternate spaces, guide coverage, transport, and timing.',
    type: 'dependency',
  },
  {
    id: 'environmental-change-stewardship-layer',
    stage: 'environmental-change',
    lane: 'stewardship-layer',
    title: 'Reapply constraints',
    description: 'Safety, animal welfare, trail impact, and weather exposure determine what remains viable.',
    type: 'constraint',
  },
  {
    id: 'environmental-change-companion-system',
    stage: 'environmental-change',
    lane: 'companion-system',
    title: 'Interpret shift',
    description: 'Signals are translated into confidence risk, viable alternatives, and staff prompts.',
    type: 'guidance',
  },
  {
    id: 'environmental-change-recovery-layer',
    stage: 'environmental-change',
    lane: 'recovery-layer',
    title: 'Activate recovery',
    description: 'The recovery layer enters when the original plan no longer supports confidence.',
    type: 'recovery',
    confidenceImpact: 'Recovery begins before the guest feels stranded.',
  },
  {
    id: 'recovery-path-guest',
    stage: 'recovery-path',
    lane: 'guest',
    title: 'Choose revised path',
    description: 'Guest sees a small set of alternatives that preserve the original intent.',
    type: 'objective',
    confidenceImpact: 'Choice returns because the change has a rationale.',
  },
  {
    id: 'recovery-path-frontstage-staff',
    stage: 'recovery-path',
    lane: 'frontstage-staff',
    title: 'Human validation',
    description: 'Guide explains the change and validates why the revised activity is a good fit.',
    type: 'handoff',
  },
  {
    id: 'recovery-path-backstage-operations',
    stage: 'recovery-path',
    lane: 'backstage-operations',
    title: 'Coordinate switch',
    description: 'Operations updates availability, timing, staffing, equipment, and guest communications.',
    type: 'dependency',
  },
  {
    id: 'recovery-path-stewardship-layer',
    stage: 'recovery-path',
    lane: 'stewardship-layer',
    title: 'Protect constraints',
    description: 'The alternative must still respect safety, animals, land, and group impact.',
    type: 'constraint',
  },
  {
    id: 'recovery-path-companion-system',
    stage: 'recovery-path',
    lane: 'companion-system',
    title: 'Surface alternatives',
    description: 'The companion presents fewer options with tradeoffs, intent preservation, and staff ownership.',
    type: 'guidance',
  },
  {
    id: 'recovery-path-recovery-layer',
    stage: 'recovery-path',
    lane: 'recovery-layer',
    title: 'Own the recovery',
    description: 'Fallback logic connects the guest, guide, operations, and stewardship constraints.',
    type: 'recovery',
    confidenceImpact: 'Trust is restored when the handoff feels coordinated.',
  },
  {
    id: 'outcome-learning-guest',
    stage: 'outcome-learning',
    lane: 'guest',
    title: 'End with clarity',
    description: 'Guest completes, adapts, or reschedules without feeling downgraded.',
    type: 'outcome',
    confidenceImpact: 'The experience closes with confidence rather than residue.',
  },
  {
    id: 'outcome-learning-frontstage-staff',
    stage: 'outcome-learning',
    lane: 'frontstage-staff',
    title: 'Close the loop',
    description: 'Staff confirms satisfaction, explains any remaining next steps, and captures feedback.',
    type: 'learning',
  },
  {
    id: 'outcome-learning-backstage-operations',
    stage: 'outcome-learning',
    lane: 'backstage-operations',
    title: 'Record pattern',
    description: 'Operations logs capacity, delay, handoff, and service recovery outcomes.',
    type: 'learning',
  },
  {
    id: 'outcome-learning-stewardship-layer',
    stage: 'outcome-learning',
    lane: 'stewardship-layer',
    title: 'Review impact',
    description: 'Stewardship outcomes inform future route, animal, timing, and weather thresholds.',
    type: 'learning',
  },
  {
    id: 'outcome-learning-companion-system',
    stage: 'outcome-learning',
    lane: 'companion-system',
    title: 'Learn fit signals',
    description: 'The system learns which guidance, alternatives, and handoffs rebuilt confidence.',
    type: 'learning',
  },
  {
    id: 'outcome-learning-recovery-layer',
    stage: 'outcome-learning',
    lane: 'recovery-layer',
    title: 'Improve playbook',
    description: 'Recovery outcomes become repeatable patterns for future disruptions.',
    type: 'learning',
    confidenceImpact: 'The next disruption starts with better recovery intelligence.',
  },
];

export const applicationsMatrix: ApplicationsMatrixItem[] = [
  {
    id: 'guest-ranches',
    environment: 'Guest Ranches',
    guestUncertainty: 'Which activities fit my skill, group, and day?',
    operationalComplexity: 'High',
    environmentalVariability: 'High',
    stewardshipSensitivity: 'High',
    recoveryImportance: 'High',
    confidenceOpportunity: 'Translate ranch context into confident participation.',
  },
  {
    id: 'working-ranches-with-guests',
    environment: 'Working Ranches with Guests',
    guestUncertainty: 'How do I participate without disrupting real ranch work?',
    operationalComplexity: 'High',
    environmentalVariability: 'Medium',
    stewardshipSensitivity: 'Critical',
    recoveryImportance: 'Medium',
    confidenceOpportunity: 'Frame boundaries, roles, etiquette, and safe contribution.',
  },
  {
    id: 'fly-fishing-lodges',
    environment: 'Fly Fishing Lodges',
    guestUncertainty: 'Where, when, and how should I fish as conditions change?',
    operationalComplexity: 'Medium',
    environmentalVariability: 'High',
    stewardshipSensitivity: 'High',
    recoveryImportance: 'High',
    confidenceOpportunity: 'Connect weather, river conditions, guide judgment, and alternatives.',
  },
  {
    id: 'eco-lodges',
    environment: 'Eco-Lodges',
    guestUncertainty: 'How do I choose experiences that match comfort and conservation values?',
    operationalComplexity: 'Medium',
    environmentalVariability: 'High',
    stewardshipSensitivity: 'Critical',
    recoveryImportance: 'Medium',
    confidenceOpportunity: 'Make sustainability constraints feel like meaningful guidance.',
  },
  {
    id: 'outdoor-resorts',
    environment: 'Outdoor Resorts',
    guestUncertainty: 'Which outdoor options are worth choosing from a large activity set?',
    operationalComplexity: 'High',
    environmentalVariability: 'Medium',
    stewardshipSensitivity: 'Medium',
    recoveryImportance: 'High',
    confidenceOpportunity: 'Reduce choice overload and coordinate service recovery.',
  },
  {
    id: 'national-parks',
    environment: 'National Parks',
    guestUncertainty: 'What can I safely do today with changing access, crowds, and weather?',
    operationalComplexity: 'High',
    environmentalVariability: 'High',
    stewardshipSensitivity: 'Critical',
    recoveryImportance: 'High',
    confidenceOpportunity: 'Guide route choice, preparedness, crowd pressure, and fallback planning.',
  },
  {
    id: 'conservation-properties',
    environment: 'Conservation Properties',
    guestUncertainty: 'How do I visit responsibly without harming sensitive land or wildlife?',
    operationalComplexity: 'Medium',
    environmentalVariability: 'Medium',
    stewardshipSensitivity: 'Critical',
    recoveryImportance: 'Medium',
    confidenceOpportunity: 'Turn stewardship rules into clear, respectful visitor action.',
  },
  {
    id: 'adventure-hospitality',
    environment: 'Adventure Hospitality',
    guestUncertainty: 'What challenge level is right, and what happens if conditions change?',
    operationalComplexity: 'High',
    environmentalVariability: 'High',
    stewardshipSensitivity: 'High',
    recoveryImportance: 'Critical',
    confidenceOpportunity: 'Match risk, readiness, guide support, and recovery paths.',
  },
];

export const applications: ApplicationData[] = [
  {
    id: 'activity-selection',
    environment: 'Activity Selection',
    uncertainty: 'The guest has options but does not know what fits their comfort, skill, or day.',
    confidenceBreakdown: 'Choice overload appears when activities are described but not interpreted.',
    mechanism: 'Confidence-based activity framing',
    action: 'Choose an activity with clarity.',
    tone: 'confidence',
    signals: ['Skill level', 'weather', 'time window', 'guide availability'],
  },
  {
    id: 'weather-recovery',
    environment: 'Weather Recovery',
    uncertainty: 'The plan changes after the guest has already emotionally committed.',
    confidenceBreakdown: 'Trust drops when the guest cannot see a credible next step.',
    mechanism: 'Fallback path design',
    action: 'Switch without feeling downgraded.',
    tone: 'recovery',
    signals: ['Forecast', 'activity risk', 'equivalent value', 'staff handoff'],
  },
  {
    id: 'operations-alignment',
    environment: 'Operations Alignment',
    uncertainty: 'Staff need to coordinate service changes without adding guest friction.',
    confidenceBreakdown: 'Guest-facing clarity depends on invisible operational readiness.',
    mechanism: 'Service blueprint coordination',
    action: 'Support the guest promise.',
    tone: 'operations',
    signals: ['Capacity', 'handoff owner', 'equipment', 'guide timing'],
  },
  {
    id: 'stewardship-learning',
    environment: 'Stewardship Learning',
    uncertainty: 'Repeated guest hesitation reveals where the ranch experience needs better framing.',
    confidenceBreakdown: 'The system misses improvement opportunities if recovery moments are not captured.',
    mechanism: 'Learning loop from confidence drops',
    action: 'Improve future guidance.',
    tone: 'stewardship',
    signals: ['Hesitation', 'questions', 'reroutes', 'guest feedback'],
  },
];
