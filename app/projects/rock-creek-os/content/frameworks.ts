// ─────────────────────────────────────────────────────────────────────────────
// Infrastructure Sovereignty OS — systems-mapping framework data.
//
// All four frameworks are pure data. The diagram components derive every
// visual (degree counts, hub detection, cascade breadth) from these arrays
// rather than restating them, so a change here changes the diagram's findings.
//
// Spec: rock-creek-os--page-ia-spec.md
// ─────────────────────────────────────────────────────────────────────────────

/** The practice's fixed semantic layer palette (studio playbook §5). */
export type SystemTone = 'experience' | 'operations' | 'infrastructure' | 'ecological' | 'landscape';

// ── Framework 01 · Environmental Experience Ecosystem ────────────────────────

export type EcosystemDomain = 'human' | 'engineered' | 'living';

export type EcosystemActor = {
  id: string;
  name: string;
  domain: EcosystemDomain;
  tone: SystemTone;
  role: string;
};

/** Verb types for a directed relationship between two actors. */
export type RelationType = 'depends' | 'constrains' | 'pressures' | 'sustains';

/** How much a change in `from` actually moves `to`. 1 = weak, 3 = strong. */
export type InfluenceStrength = 1 | 2 | 3;

export type EcosystemRelation = {
  from: string;
  to: string;
  type: RelationType;
  strength: InfluenceStrength;
  note: string;
};

export const strengthLabels: Record<InfluenceStrength, string> = {
  1: 'Weak',
  2: 'Moderate',
  3: 'Strong',
};

export const ecosystemDomains: Record<EcosystemDomain, { label: string; description: string }> = {
  human: {
    label: 'Human systems',
    description: 'The systems that hold intent, judgment, and the ability to say “not today.”',
  },
  engineered: {
    label: 'Engineered systems',
    description: 'Owned, maintained, and failure-prone. No utility backstop behind any of them.',
  },
  living: {
    label: 'Living systems',
    description: 'The systems that were here first and set the permanent boundary conditions.',
  },
};

export const ecosystemActors: EcosystemActor[] = [
  {
    id: 'guests',
    name: 'Guests',
    domain: 'human',
    tone: 'experience',
    role: 'The demand signal. Sets peak load on every other system in the same weeks each year.',
  },
  {
    id: 'staff',
    name: 'Staff',
    domain: 'human',
    tone: 'operations',
    role: 'The property’s real sensing layer. Notices failures before any instrument does.',
  },
  {
    id: 'operations',
    name: 'Operations',
    domain: 'human',
    tone: 'operations',
    role: 'Converts intent into schedule. The only system that can decline a request.',
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    domain: 'engineered',
    tone: 'infrastructure',
    role: 'Generation, treatment, transport, envelope. Invisible while it works.',
  },
  {
    id: 'energy',
    name: 'Energy',
    domain: 'engineered',
    tone: 'infrastructure',
    role: 'The root utility. Every other engineered system sits downstream of it.',
  },
  {
    id: 'water',
    name: 'Water',
    domain: 'engineered',
    tone: 'ecological',
    role: 'Supply and habitat are the same water. The property drinks from its own amenity.',
  },
  {
    id: 'landscape',
    name: 'Landscape',
    domain: 'living',
    tone: 'landscape',
    role: 'Terrain, corridors, viewsheds, seasonality. Decides what is possible at all.',
  },
  {
    id: 'wildlife',
    name: 'Wildlife',
    domain: 'living',
    tone: 'ecological',
    role: 'Presence is the amenity and the constraint. Movement ignores the booking calendar.',
  },
  {
    id: 'stewardship',
    name: 'Stewardship',
    domain: 'human',
    tone: 'ecological',
    role: 'Reads land condition and sets the ceilings operations may not exceed. The only actor whose authority comes from evidence rather than the calendar.',
  },
];

export const relationLabels: Record<RelationType, { label: string; gloss: string }> = {
  depends: { label: 'Depends on', gloss: 'cannot function without' },
  constrains: { label: 'Constrains', gloss: 'sets a ceiling on' },
  pressures: { label: 'Pressures', gloss: 'loads or degrades' },
  sustains: { label: 'Sustains', gloss: 'maintains or improves' },
};

export const ecosystemRelations: EcosystemRelation[] = [
  { from: 'guests', to: 'water', type: 'pressures', strength: 2, note: 'Peak occupancy draws hardest in the weeks the creek runs lowest.' },
  { from: 'guests', to: 'wildlife', type: 'pressures', strength: 2, note: 'Presence on corridors displaces movement during calving and rut.' },
  { from: 'guests', to: 'operations', type: 'depends', strength: 3, note: 'Every promise a guest is holding was scheduled by someone.' },
  { from: 'guests', to: 'landscape', type: 'depends', strength: 2, note: 'The view is the product; siting is the delivery mechanism.' },
  { from: 'staff', to: 'guests', type: 'sustains', strength: 3, note: 'Anticipatory service lives in staff heads before any system records it.' },
  { from: 'staff', to: 'infrastructure', type: 'depends', strength: 2, note: 'Road, radio, and power decide whether staff can reach a problem.' },
  { from: 'staff', to: 'wildlife', type: 'sustains', strength: 1, note: 'Guides route around what they see. The observation never reaches a database.' },
  { from: 'staff', to: 'operations', type: 'depends', strength: 3, note: 'Shift design decides whether local knowledge is present at the right hour.' },
  { from: 'operations', to: 'guests', type: 'constrains', strength: 3, note: 'Shift capacity, not intent, sets what can be promised today.' },
  { from: 'operations', to: 'energy', type: 'depends', strength: 3, note: 'Kitchen, laundry, wells, and shops share one generation budget.' },
  { from: 'operations', to: 'infrastructure', type: 'sustains', strength: 2, note: 'Maintenance backlog is the difference between an asset and a liability.' },
  { from: 'infrastructure', to: 'energy', type: 'depends', strength: 3, note: 'Pumping, treatment, and connectivity are all electrical loads.' },
  { from: 'infrastructure', to: 'landscape', type: 'pressures', strength: 2, note: 'Every buried line, culvert, and road cut is a permanent landscape edit.' },
  { from: 'infrastructure', to: 'guests', type: 'sustains', strength: 3, note: 'Bandwidth, heat, and hot water are now part of the stay, not the back of house.' },
  { from: 'energy', to: 'operations', type: 'constrains', strength: 3, note: 'Generation headroom caps how many systems may run at once.' },
  { from: 'energy', to: 'infrastructure', type: 'depends', strength: 2, note: 'Generation and storage need shelter, access, and fuel logistics of their own.' },
  { from: 'water', to: 'wildlife', type: 'sustains', strength: 3, note: 'The fishery and the riparian corridor are the same resource the property drinks from.' },
  { from: 'water', to: 'operations', type: 'constrains', strength: 2, note: 'Flow and thermal thresholds close reaches regardless of the booking calendar.' },
  { from: 'water', to: 'landscape', type: 'depends', strength: 2, note: 'Snowpack retention and riparian condition are what make flow predictable.' },
  { from: 'landscape', to: 'infrastructure', type: 'constrains', strength: 3, note: 'Terrain and corridors decide what can be built, buried, and plowed.' },
  { from: 'landscape', to: 'water', type: 'sustains', strength: 2, note: 'Intact uplands are the property’s largest and cheapest water asset.' },
  { from: 'landscape', to: 'operations', type: 'constrains', strength: 2, note: 'Seasonal access windows decide what the calendar can even offer.' },
  { from: 'wildlife', to: 'operations', type: 'constrains', strength: 2, note: 'Corridor and seasonal closures remove inventory from the schedule.' },
  { from: 'wildlife', to: 'guests', type: 'sustains', strength: 2, note: 'Sightings are the amenity nobody can schedule.' },
  { from: 'stewardship', to: 'operations', type: 'constrains', strength: 3, note: 'Closures and rotations set what operations may schedule — not the reverse.' },
  { from: 'stewardship', to: 'landscape', type: 'depends', strength: 2, note: 'Ceilings are set from long-horizon land condition, not one season’s bookings.' },
  { from: 'stewardship', to: 'water', type: 'depends', strength: 2, note: 'Flow and thermal thresholds originate here, not on the reservation calendar.' },
  { from: 'stewardship', to: 'wildlife', type: 'depends', strength: 2, note: 'Corridor and seasonal rules are set from presence and movement data.' },
  { from: 'stewardship', to: 'guests', type: 'sustains', strength: 2, note: 'A narrated closure reads as exclusivity. An unexplained one reads as a broken promise.' },
];

/** Undirected degree per actor, derived from `ecosystemRelations`. */
export function getEcosystemDegrees(): Record<string, number> {
  const degrees: Record<string, number> = Object.fromEntries(
    ecosystemActors.map((actor) => [actor.id, 0]),
  );
  for (const relation of ecosystemRelations) {
    if (relation.from in degrees) degrees[relation.from] += 1;
    if (relation.to in degrees) degrees[relation.to] += 1;
  }
  return degrees;
}

/** Actors adjacent to every other actor — the system's true integration points. */
export function getUniversalConnectors(): EcosystemActor[] {
  return ecosystemActors.filter((actor) => {
    const neighbours = new Set<string>();
    for (const relation of ecosystemRelations) {
      if (relation.from === actor.id) neighbours.add(relation.to);
      if (relation.to === actor.id) neighbours.add(relation.from);
    }
    return neighbours.size === ecosystemActors.length - 1;
  });
}

/** Actor pairs with an edge running in both directions — the ecosystem's closed feedback loops. */
export function getFeedbackPairs(): Array<{ a: EcosystemActor; b: EcosystemActor; relations: EcosystemRelation[] }> {
  const pairs: Array<{ a: EcosystemActor; b: EcosystemActor; relations: EcosystemRelation[] }> = [];
  const seen = new Set<string>();

  for (const actor of ecosystemActors) {
    for (const other of ecosystemActors) {
      if (actor.id === other.id) continue;
      const key = [actor.id, other.id].sort().join('|');
      if (seen.has(key)) continue;

      const forward = ecosystemRelations.filter((r) => r.from === actor.id && r.to === other.id);
      const backward = ecosystemRelations.filter((r) => r.from === other.id && r.to === actor.id);
      if (forward.length > 0 && backward.length > 0) {
        seen.add(key);
        pairs.push({ a: actor, b: other, relations: [...forward, ...backward] });
      }
    }
  }

  return pairs;
}

/** Relations that actively degrade their target — the ecosystem's named failure points. */
export function getFailurePoints(): EcosystemRelation[] {
  return ecosystemRelations.filter((r) => r.type === 'pressures');
}

export const ecosystemFinding =
  'Operations is the only node adjacent to all eight others. It is not the most important system — it is the one every other system has to route through, which makes it the property’s highest-leverage point of intervention and its most likely bottleneck. Everything is connected; not everything is connected equally, which is what the strength ratings are for.';

// ── Framework 02 · Decision Architecture Map ─────────────────────────────────

export type DecisionTier = {
  id: string;
  tier: string;
  tone: SystemTone;
  horizon: string;
  owner: string;
  inputs: string[];
  dataSources: string[];
  decision: string;
  outputs: string[];
  failurePoint: { label: string; body: string };
  missingInformation: string;
};

export const decisionTiers: DecisionTier[] = [
  {
    id: 'guest',
    tier: 'Guest Decisions',
    tone: 'experience',
    horizon: 'Minutes to hours',
    owner: 'The guest, and whoever in the party is actually deciding',
    inputs: ['Published options', 'Weather as experienced', 'Staff recommendation', 'Party consensus'],
    dataSources: ['Printed or app activity menu', 'What can be seen and felt outdoors', 'A conversation at the desk or on the trail'],
    decision: 'What to do with today.',
    outputs: ['Activity booking', 'Location and timing', 'A held expectation of what “good” means'],
    failurePoint: {
      label: 'Stale premise',
      body: 'The guest decides on information the property has already superseded. Nothing closes the loop between a changed condition and an expectation already formed.',
    },
    missingInformation: 'Whether the option they are choosing is still inside today’s stewardship and infrastructure ceilings.',
  },
  {
    id: 'staff',
    tier: 'Staff Decisions',
    tone: 'operations',
    horizon: 'Hours to a shift',
    owner: 'Guides, front desk, housekeeping, maintenance',
    inputs: ['Direct observation', 'Radio traffic', 'Guest mood and capability', 'Equipment state'],
    dataSources: ['Eyes on the ground', 'Handheld radio', 'Shift handoff notes, when they exist'],
    decision: 'Whether the plan still fits — and what to substitute if it does not.',
    outputs: ['Route and pacing changes', 'Escalations', 'Local knowledge that stays undocumented'],
    failurePoint: {
      label: 'Evaporating evidence',
      body: 'The property’s best sensing layer writes nothing down. Staff observation dies at end of shift and is re-learned from scratch every season.',
    },
    missingInformation: 'A place to log what they just saw that anyone else — including next season’s staff — can find later.',
  },
  {
    id: 'operational',
    tier: 'Operational Decisions',
    tone: 'infrastructure',
    horizon: 'Days to a season',
    owner: 'Ranch manager and department heads',
    inputs: ['Occupancy forecast', 'Infrastructure headroom', 'Staffing and equipment readiness', 'Work-order backlog'],
    dataSources: ['Booking system', 'Generator and well gauges, checked manually', 'Staff schedule spreadsheet', 'Paper or ad-hoc work orders'],
    decision: 'What the property commits to delivering.',
    outputs: ['Schedule and staffing plan', 'Maintenance sequencing', 'Posture changes'],
    failurePoint: {
      label: 'Unpriceable headroom',
      body: 'Infrastructure capacity is reported in engineering units nobody in hospitality can price. Commitments get made against headroom that is not there.',
    },
    missingInformation: 'Infrastructure headroom expressed in a unit hospitality leadership can actually schedule against — guest-days, not kilowatt-hours.',
  },
  {
    id: 'stewardship',
    tier: 'Stewardship Decisions',
    tone: 'ecological',
    horizon: 'Seasons to decades',
    owner: 'Land manager, fishery lead, external agencies',
    inputs: ['Stream temperature and flow', 'Fuel moisture', 'Wildlife presence', 'Range and riparian condition'],
    dataSources: ['Field measurement and site visits', 'Agency and permit data', 'Seasonal review meetings'],
    decision: 'The ceilings that nothing above may exceed.',
    outputs: ['Closures and rotations', 'Access restrictions', 'Long-horizon land commitments'],
    failurePoint: {
      label: 'Late veto',
      body: 'Ceilings arrive as refusals rather than as early constraints, so stewardship reads as obstruction instead of as a design input.',
    },
    missingInformation: 'A standing channel to operations that runs faster than the annual review — so a ceiling can move before it has to be enforced.',
  },
];

export type DecisionFlow = {
  id: string;
  name: string;
  direction: 'down' | 'up' | 'return';
  path: string;
  latency: string;
  health: 'intact' | 'slow' | 'broken';
  note: string;
};

export const decisionFlows: DecisionFlow[] = [
  {
    id: 'authority',
    name: 'Authority',
    direction: 'down',
    path: 'Stewardship → Operational → Staff → Guest',
    latency: 'Seasonal',
    health: 'intact',
    note: 'Ceilings become schedules become guidance become experience. This direction works — it is simply slow.',
  },
  {
    id: 'constraint',
    name: 'Constraint',
    direction: 'up',
    path: 'Guest → Staff → Operational → Stewardship',
    latency: 'A season, when it should be a shift',
    health: 'broken',
    note: 'What staff observe at 10am should be able to move a ceiling by dinner. Today it moves one at the annual review, if at all.',
  },
  {
    id: 'demand',
    name: 'Demand pressure',
    direction: 'return',
    path: 'Guest → Operational → Stewardship',
    latency: 'Immediate',
    health: 'slow',
    note: 'The only loop that runs at full speed runs the wrong way: booking demand reaches the ceiling faster than evidence does.',
  },
];

export const decisionFinding =
  'Every failure point on this map is a latency mismatch, not a knowledge gap. The property already knows what it needs to know — three of the four tiers simply decide faster than the tier above them can update its constraints.';

// ── Framework 04 · Infrastructure Sovereignty Model — the five-layer OS stack ─
//
// This is the primary, interactive artifact for the Atlas: five operating
// layers, each with its own responsibilities, dependencies, metrics, and
// outcomes. Authority runs down the stack (Experience → Landscape); every
// layer beneath can veto the one above it. Rendered as a click-to-expand
// stack — see components/SovereigntyLayerStack.tsx.
//
// The physical dependency model below (Framework 04a) is kept as supporting
// evidence for this stack, not a competing hero object — it answers "what
// breaks together," where the stack answers "who is responsible for what."

export type SovereigntyLayerId = 'experience' | 'operations' | 'infrastructure' | 'ecological' | 'landscape';

export type SovereigntyLayer = {
  id: SovereigntyLayerId;
  tone: SystemTone;
  name: string;
  owns: string;
  responsibilities: string[];
  dependsOn: SovereigntyLayerId[];
  metrics: string[];
  outcomes: string[];
  failsAs: string;
};

export const sovereigntyLayers: SovereigntyLayer[] = [
  {
    id: 'experience',
    tone: 'experience',
    name: 'Experience OS',
    owns: 'The guest’s sense that nothing here is difficult.',
    responsibilities: ['Arrival & orientation', 'Stay rhythm', 'Activity fit', 'Service recovery', 'Departure'],
    dependsOn: ['operations'],
    metrics: ['Recovery events resolved without guest-visible escalation', 'Stay-length and rebooking rate', 'Unprompted guest mentions of “ease”'],
    outcomes: ['Failures read as substitutions, not apologies', 'Constraint reads as exclusivity, not restriction'],
    failsAs: 'Promises the operation cannot fund.',
  },
  {
    id: 'operations',
    tone: 'operations',
    name: 'Operations OS',
    owns: 'Whether the promise can actually be delivered.',
    responsibilities: ['Staffing & shift design', 'Maintenance scheduling', 'Guiding & dispatch', 'Handoffs', 'Continuity choreography'],
    dependsOn: ['infrastructure', 'ecological'],
    metrics: ['Ratio of scheduled to emergency work orders', 'Shift coverage against forecast demand', 'Incidents handled by a named procedure vs. improvised'],
    outcomes: ['Undocumented heroics convert into repeatable posture procedures'],
    failsAs: 'Heroics — undocumented saves that vanish with the person who made them.',
  },
  {
    id: 'infrastructure',
    tone: 'infrastructure',
    name: 'Infrastructure OS',
    owns: 'Continuity of the invisible.',
    responsibilities: ['Generation & storage', 'Water & wastewater', 'Connectivity', 'Road & access', 'Fire suppression', 'Building envelope'],
    dependsOn: ['landscape'],
    metrics: ['Headroom on generation, water, and bandwidth', 'Days of stored autonomy per system', 'Failure and near-miss log'],
    outcomes: ['Reactive maintenance shifts toward pre-positioned response'],
    failsAs: 'A silent single point of failure.',
  },
  {
    id: 'ecological',
    tone: 'ecological',
    name: 'Ecological OS',
    owns: 'The land’s capacity to absorb use.',
    responsibilities: ['Fishery thermal & flow budget', 'Riparian condition', 'Wildlife corridors', 'Fuel load', 'Soil & grazing rotation', 'Water rights'],
    dependsOn: ['landscape'],
    metrics: ['Stream temperature and flow against threshold', 'Fuel moisture', 'Rod-days inside vs. outside the thermal budget'],
    outcomes: ['Fishery pressure decouples from peak-demand weeks'],
    failsAs: 'A compliance appendix instead of a constraint.',
  },
  {
    id: 'landscape',
    tone: 'landscape',
    name: 'Landscape OS',
    owns: 'What is possible at all.',
    responsibilities: ['Terrain & siting', 'Access corridors', 'Viewsheds', 'Seasonality', 'Dark sky', 'Long-horizon land use'],
    dependsOn: [],
    metrics: ['Capital projects with a documented Landscape OS veto', 'Seasonal access-window changes year over year'],
    outcomes: ['Siting and access decisions carry long-horizon constraints explicitly'],
    failsAs: 'Treated as scenery rather than structure.',
  },
];

export const sovereigntyLayerFinding =
  'Authority runs down the stack — from Experience to Landscape. Constraint runs back up it. A property is resilient when a layer’s refusal arrives early enough to be designed around, not apologized for.';

// ── Framework 04a · Infrastructure Dependency Model (supporting evidence) ────
//
// A physical-systems companion to the OS stack above: seven owned systems
// (not organizational layers) ranked by dependency depth, autonomy, and
// cascade breadth. Answers "what breaks together," not "who is responsible."

export type SovereigntyTier = 'substrate' | 'root' | 'primary' | 'derived';

export type SovereigntySystem = {
  id: string;
  name: string;
  tier: SovereigntyTier;
  tone: SystemTone;
  /** Modeled days of independent operation, 0–5. Illustrative, not measured. */
  autonomy: number;
  autonomyLabel: string;
  dependsOn: string[];
  singlePointOfFailure: string;
};

export const sovereigntyTiers: Record<SovereigntyTier, { label: string; description: string }> = {
  substrate: { label: 'Substrate', description: 'Depends on nothing here. Cannot be rebuilt on a capital schedule.' },
  root: { label: 'Root', description: 'Everything engineered draws on it — including the systems it draws on.' },
  primary: { label: 'Primary', description: 'Sits closest to the root. Where the property loses capability first.' },
  derived: { label: 'Derived', description: 'What the guest actually touches. Fails last, and therefore visibly.' },
};

export const sovereigntySystems: SovereigntySystem[] = [
  {
    id: 'ecology',
    name: 'Ecology',
    tier: 'substrate',
    tone: 'ecological',
    autonomy: 5,
    autonomyLabel: 'Indefinite',
    dependsOn: [],
    singlePointOfFailure: 'None — and that is the trap. It never fails suddenly, so it never competes for capital.',
  },
  {
    id: 'energy',
    name: 'Energy',
    tier: 'root',
    tone: 'infrastructure',
    autonomy: 3,
    autonomyLabel: '~Days on stored fuel',
    dependsOn: ['mobility', 'shelter'],
    singlePointOfFailure: 'Fuel resupply requires an open road.',
  },
  {
    id: 'water',
    name: 'Water',
    tier: 'primary',
    tone: 'ecological',
    autonomy: 2,
    autonomyLabel: '~Hours to a day of stored head',
    dependsOn: ['energy', 'ecology'],
    singlePointOfFailure: 'Pumping and treatment are electrical.',
  },
  {
    id: 'connectivity',
    name: 'Connectivity',
    tier: 'primary',
    tone: 'infrastructure',
    autonomy: 2,
    autonomyLabel: '~Hours on backup power',
    dependsOn: ['energy'],
    singlePointOfFailure: 'A single path off-property, with no terrestrial alternate.',
  },
  {
    id: 'mobility',
    name: 'Mobility',
    tier: 'primary',
    tone: 'landscape',
    autonomy: 1,
    autonomyLabel: 'Hours, weather-dependent',
    dependsOn: ['energy', 'ecology'],
    singlePointOfFailure: 'One private road with seasonal and fire-season failure modes.',
  },
  {
    id: 'shelter',
    name: 'Shelter',
    tier: 'derived',
    tone: 'experience',
    autonomy: 4,
    autonomyLabel: 'Days, degrading in comfort',
    dependsOn: ['energy', 'water'],
    singlePointOfFailure: 'Conditioning and hot water are downstream of both root systems.',
  },
  {
    id: 'food',
    name: 'Food',
    tier: 'derived',
    tone: 'operations',
    autonomy: 2,
    autonomyLabel: '~Days at occupancy',
    dependsOn: ['mobility', 'energy', 'water'],
    singlePointOfFailure: 'Cold chain is electrical; resupply is road-borne.',
  },
];

export const sovereigntyCascade = [
  'The road closes.',
  'Fuel resupply stops.',
  'Generation reserve draws down.',
  'Pumping and treatment stop.',
  'Conditioning, hot water, and cold chain fail.',
  'The property is no longer habitable at occupancy.',
];

export const sovereigntyFinding =
  'The root is not actually the root. Energy carries the widest cascade, but it depends on Mobility and Shelter — which depend on it. Those two mutual dependencies are the sovereignty trap: the generator cannot be refuelled without the road, and Mobility has the lowest autonomy of any system here. Sovereignty is bounded by the road, not by the generator — which makes the most valuable resilience investment the least photogenic one.';

export const sovereigntyMutualNote =
  'Mutual dependencies are cycles, not errors. Where two systems each require the other, neither can be restored first — which is exactly the condition that turns a short outage into an evacuation.';

export const sovereigntyEvidenceNote =
  'Autonomy values are modeled from comparable remote-property profiles to show relative fragility. They are not measured site data and should not be read as engineering figures.';

// ── Framework 05 · Stewardship Feedback Loop ─────────────────────────────────

export type LoopNode = {
  id: string;
  name: string;
  tone: SystemTone;
  measure: string;
  respondsIn: string;
  /** Illustrative example figure. Modeled from comparable-property research, not measured on site. */
  example: string;
};

export type LoopEdge = {
  from: string;
  to: string;
  polarity: 'reinforcing' | 'degrading';
  mechanism: string;
  delay: string;
  /** Illustrative worked example of the mechanism, modeled — not measured. */
  example: string;
};

export const loopNodes: LoopNode[] = [
  {
    id: 'land-health',
    name: 'Land Health',
    tone: 'ecological',
    measure: 'Riparian condition · fishery vitality · range recovery · fuel load',
    respondsIn: 'Seasons to years',
    example: 'A completed riparian buffer planting measurably lowers peak stream temperature within 2–3 growing seasons.',
  },
  {
    id: 'guest-experience',
    name: 'Guest Experience',
    tone: 'experience',
    measure: 'Sightings · water quality · views · willingness to accept constraint',
    respondsIn: 'Days',
    example: 'Guests told why a reach is closed rate the stay as highly as guests who fished it, in comparable-property post-stay surveys.',
  },
  {
    id: 'revenue-stability',
    name: 'Revenue Stability',
    tone: 'operations',
    measure: 'Rebooking rate · recovery spend as a share of revenue · off-peak occupancy',
    respondsIn: 'Weeks',
    example: 'A narrated closure that preserves the day’s intent shows a smaller next-year rebooking dip than an unexplained one.',
  },
  {
    id: 'stewardship-investment',
    name: 'Stewardship Investment',
    tone: 'landscape',
    measure: 'Rotation completed · riparian work funded · fuel reduction acres',
    respondsIn: 'Seasons',
    example: 'Comparable properties that route 3–5% of recovery-cost savings to land work sustain rotation schedules through lean seasons.',
  },
];

export const loopEdges: LoopEdge[] = [
  {
    from: 'land-health',
    to: 'guest-experience',
    polarity: 'reinforcing',
    mechanism: 'A healthy fishery, intact corridors, and clear water are what the stay was sold on. Land condition is the product, not its setting.',
    delay: 'Immediate once present',
    example: 'A single season of improved riparian shade and cooler water is visible to guides and guests without instrumentation.',
  },
  {
    from: 'guest-experience',
    to: 'revenue-stability',
    polarity: 'reinforcing',
    mechanism: 'Confident guests accept substitution and closure, so recovery is cheap and rebooking holds. Service failures — not service volume — are what actually cost revenue.',
    delay: 'Weeks',
    example: 'Recovery-event guests who report feeling “taken care of” rebook at rates comparable to guests with no disrupted plan.',
  },
  {
    from: 'revenue-stability',
    to: 'stewardship-investment',
    polarity: 'reinforcing',
    mechanism: 'Revenue that is not consumed by emergency recovery becomes fundable headroom for rotation, riparian repair, and fuel reduction.',
    delay: 'One budget cycle',
    example: 'Every dollar of avoided emergency-recovery spend is a dollar available for the stewardship line item — a routing decision, not an ecological one.',
  },
  {
    from: 'stewardship-investment',
    to: 'land-health',
    polarity: 'reinforcing',
    mechanism: 'Funded work compounds into measurable land condition — the only edge in the loop that cannot be accelerated.',
    delay: 'Seasons to years',
    example: 'Fuel-reduction acres treated in one season lower the following season’s closure risk on the same corridor.',
  },
];

export const loopModes = [
  {
    id: 'virtuous',
    label: 'Running virtuous',
    polarity: 'reinforcing' as const,
    summary: 'Land health carries the experience, confident guests keep revenue stable, stable revenue funds stewardship, and stewardship compounds land health.',
    signal: 'Closures read to guests as exclusivity.',
  },
  {
    id: 'vicious',
    label: 'Running vicious',
    polarity: 'degrading' as const,
    summary: 'Thin land health weakens the experience, guests resist constraint, revenue destabilizes, stewardship is defunded first, and land health thins further.',
    signal: 'Closures read to guests as broken promises.',
  },
];

export const loopFinding =
  'The loop’s two halves run at different speeds: revenue responds in weeks, land responds in seasons. Under financial pressure the fast half is always the one that gets managed, which is why this loop drifts vicious by default rather than by decision.';

export const loopLeveragePoint =
  'The loop only closes if revenue stability is actually routed to stewardship. That routing is a budget decision, not an ecological one — so the highest-leverage intervention in the whole model is a line item, not a landscape.';

export const loopExampleNote =
  'Node and edge examples are illustrative figures modeled from comparable remote-property research, not measurements taken on this site. They show the shape of the mechanism, not a validated result.';

// ── Framework 02 · The Rustic Reliability Gap ────────────────────────────────
//
// A before/after systems analysis: the chain a heritage-first property runs
// today, and the chain a sovereignty-first property runs instead. Both are
// causal chains, not preference statements — each link is a mechanism.

export type ChainLink = {
  id: string;
  label: string;
  body: string;
};

export const currentStateChain: ChainLink[] = [
  {
    id: 'heritage-structures',
    label: 'Heritage Structures',
    body: 'Buildings and systems sited and built for a different climate, occupancy, and expectation of reliability.',
  },
  {
    id: 'infrastructure-limitations',
    label: 'Infrastructure Limitations',
    body: 'Generation, water, and connectivity sized for the original use — not for today’s simultaneous-load, always-on guest.',
  },
  {
    id: 'operational-risk',
    label: 'Operational Risk',
    body: 'Staff absorb the gap between what infrastructure can deliver and what the schedule has promised, shift by shift.',
  },
  {
    id: 'guest-experience-risk',
    label: 'Guest Experience Risk',
    body: 'When the absorption fails, the guest experiences the failure directly — the one outcome the whole chain exists to prevent.',
  },
];

export const futureStateChain: ChainLink[] = [
  {
    id: 'infrastructure-sovereignty',
    label: 'Infrastructure Sovereignty',
    body: 'Generation, water, and connectivity sized and instrumented against actual concurrent demand, with headroom the property can see.',
  },
  {
    id: 'operational-resilience',
    label: 'Operational Resilience',
    body: 'Staff work from named posture procedures instead of improvisation — the save gets documented instead of disappearing with the person who made it.',
  },
  {
    id: 'experience-reliability',
    label: 'Experience Reliability',
    body: 'Guests receive substitution that preserves intent rather than an apology for a promise the property could not keep.',
  },
  {
    id: 'stewardship-outcomes',
    label: 'Stewardship Outcomes',
    body: 'Capacity that is not spent on emergency recovery becomes capacity the property can spend on the land instead.',
  },
];

export const reliabilityGapFinding =
  'The two chains share no steps — they are not the same chain done better. The current chain spends its capacity on absorbing failure; the future chain spends the same capacity on preventing it. The redesign is where the capacity gets spent, not what the buildings look like.';

export type ReliabilityRisk = {
  id: string;
  name: string;
  body: string;
  tone: SystemTone;
};

export const reliabilityRisks: ReliabilityRisk[] = [
  {
    id: 'structural-obsolescence',
    name: 'Structural Obsolescence',
    tone: 'infrastructure',
    body: 'Heritage structures were built to a climate and occupancy pattern that no longer applies. Every year of deferred retrofit widens the gap between what the building can do and what the stay now asks of it.',
  },
  {
    id: 'connectivity-risk',
    name: 'Connectivity Risk',
    tone: 'infrastructure',
    body: 'One path off-property carries staff coordination, guest expectation, and now remote work. A single outage removes all three at once, at the moment they are needed most.',
  },
  {
    id: 'climate-risk',
    name: 'Climate Risk',
    tone: 'ecological',
    body: 'Shifting snowpack, longer fire seasons, and thermal stress on the fishery move faster than the capital planning cycles meant to respond to them.',
  },
  {
    id: 'authenticity-paradox',
    name: 'The Authenticity Paradox',
    tone: 'experience',
    body: 'The more convincingly rustic the experience reads, the more industrial redundancy has to be concealed to sustain it — and concealed infrastructure is chronically underfunded because it is invisible exactly when it is working.',
  },
];
