// ─────────────────────────────────────────────────────────────────────────────
// Systems Explorer — content for the Adaptive Stewardship OS narrative.
//
// Authoritative source: `rock-creek-os-foundation.md`. That document sets a
// hierarchy this file exists to encode and protect:
//
//   ONE SYSTEM     Rock Creek Adaptive Stewardship OS
//   ONE PROBLEM    Predictive Hydrological Activity Orchestration  (primary)
//   TWO SUPPORTING Fire-Resilient Defensible Space Design          (environmental)
//                  Invisible Logistics Mobility System             (operational)
//
// The supporting systems are NOT peers of the primary problem and must never
// be rendered as such. Each carries a `whyNotSeparate` field precisely because
// the failure mode this page is guarding against is reading as three small
// case studies instead of one systems-design exploration.
//
// EVIDENCE DISCIPLINE. Every factual claim below traces to a source in the
// foundation doc §13, carried on the `evidence` field. Earlier revisions of
// this page stated modeled figures with engineering precision and no method
// ("+340% thermal load", "U-values 2–3× benchmark", "moisture risk reduced by
// modeled 60%") — the exact liability `rock-creek-os--portfolio-audit.md`
// flagged, and the same class of claim the foundation doc §5.3 stripped when
// it removed an unsourced pool volume. Do not reintroduce a number here that
// no source in §13 supports. Directional language is the correct fallback.
// ─────────────────────────────────────────────────────────────────────────────

/** Evidence tier, per foundation doc §1/§12. Rendered as a visible badge. */
export type EvidenceTier = 'documented' | 'inferred' | 'proposed';

export const evidenceTierLabels: Record<EvidenceTier, { label: string; note: string }> = {
  documented: { label: 'Documented', note: 'Established by a cited source' },
  inferred: { label: 'Inferred', note: 'Reasoned from cited evidence, not directly sourced' },
  proposed: { label: 'Proposed', note: 'This speculative design exploration' },
};

export type ChainStep = {
  id: string;
  label: string;
  body: string;
  detail?: string;
  tier: EvidenceTier;
};

// ── Hero / premise ──────────────────────────────────────────────────────────

export const explorerHero = {
  eyebrow: 'Systems Explorer',
  title: 'One landscape, many conditions, one adaptive system',
  deck: 'How can the Ranch adapt to a changing landscape without making that complexity visible to the guest?',
  premise:
    'Luxury guests expect a flawless stay, but natural landscapes are always changing. Balancing environmental conditions with unwavering guest expectations is the core challenge.',
  disclosure:
    'Independent research and systems-design exploration; no client relationship; interventions are conceptual.',
};

/** The variables that move underneath a fixed promise. Sets up §02–§04. */
export const premiseConditions = [
  { id: 'water-temp', label: 'Water temperature', tone: 'ecological' as const },
  { id: 'streamflow', label: 'Streamflow', tone: 'ecological' as const },
  { id: 'fire', label: 'Fire conditions', tone: 'landscape' as const },
  { id: 'access', label: 'Access & trails', tone: 'landscape' as const },
  { id: 'seasonal', label: 'Seasonal availability', tone: 'ecological' as const },
  { id: 'resources', label: 'Resource constraints', tone: 'operations' as const },
];
// ── 02 · Primary problem ────────────────────────────────────────────────────
export const primaryChallenge = {
  id: 'primary-challenge',
  number: '02',
  kicker: 'Primary Problem',
  title: 'Predictive Stream & Activity Sensing',
  intro:
    "Rock Creek is the soul of the property, not an optional amenity. When thermal closures hit with a few days' notice, the ranch loses its main attraction, not just an afternoon activity.",
  designQuestion:
    'What would it take to know a closure is coming before it arrives, and to have somewhere worth sending guests instead?',
  /** The causal chain the brief specifies: conditions → constraint → uncertainty → alternatives → adaptation. */
  chain: [
    {
      id: 'changing-conditions',
      label: 'Changing river conditions',
      body: 'Rock Creek water temperatures regularly reach the 70°F stress threshold for trout. The marquee salmonfly hatch has shifted 2–3 weeks earlier than historical norms.',
      detail:
        'Source: Low Flows, Hot Trout — National Wildlife Federation. Western Montana is projected to lose 5–30% of trout habitat over the next century.',
      tier: 'documented' as const,
    },
    {
      id: 'activity-constraint',
      label: 'Activity constraint',
      body: 'Crossing that threshold triggers "Hoot Owl" restrictions — mandatory 2:00 PM fishing closures intended to protect fish already under thermal stress.',
      detail:
        'These are regulatory, not discretionary. The property cannot negotiate them, absorb them, or trade them off against guest expectations.',
      tier: 'documented' as const,
    },
    {
      id: 'operational-uncertainty',
      label: 'Operational uncertainty',
      body: 'A closure that lands with days — sometimes hours — of warning arrives after guides are scheduled, equipment is staged, and itineraries are confirmed.',
      detail:
        'Inferred from the documented closure mechanism above. The constraint is timing, not knowledge: the trigger is known, the arrival is not.',
      tier: 'inferred' as const,
    },
    {
      id: 'alternative-experiences',
      label: 'Need for alternatives',
      body: "Something has to absorb an afternoon that was sold as fishing... at a standard that still meets the property's service expectations, for guests who chose this place for the water.",
      detail:
        'Forbes Travel Guide operates against 800 objective standards. A substitute activity is measured against the same bar as the one it replaced.',
      tier: 'inferred' as const,
    },
    {
      id: 'guest-adaptation',
      label: 'Guest experience adaptation',
      body: 'The pivot either reads as a curated alternative the property clearly intended, or as an apology for something that broke. The difference is almost entirely lead time.',
      detail:
        'Proposed: an orchestration layer that forecasts closure triggers days ahead, so alternatives are staged before the closure is announced rather than improvised after.',
      tier: 'proposed' as const,
    },
  ] satisfies ChainStep[],
  outcome:
    "The design opportunity is not a better fishing report. It is decoupling the guest's afternoon from a variable the property does not control — early enough that the alternative is ready before the guest knows it was needed.",
};

// ── 03 & 04 · Supporting systems ────────────────────────────────────────────

export type SupportingSystem = {
  id: string;
  number: string;
  kicker: string;
  title: string;
  role: string;
  body: string;
  /** The line that stops this reading as a standalone case study. Required. */
  whyNotSeparate: string;
  affects: Array<{ label: string; note: string }>;
  evidence: string;
  tier: EvidenceTier;
};
export const supportingSystems: SupportingSystem[] = [
  {
    id: 'supporting-fire',
    number: '03',
    kicker: 'Supporting System · Environmental',
    title: 'Fire-Resilient Space Design',
    body: 'Severe fires sterilize soil and choke the creek with sediment, making fire conditions the second critical signal the system must sense and interpret.',
    whyNotSeparate:
      'Fire impacts long-term stream viability, while smoke and closures immediately choke off high-country backup plans.',
    affects: [
      { label: 'Landscape', note: 'Forest structure and fuel load' },
      { label: 'Watershed', note: 'Post-fire erosion and sediment runoff' },
      { label: 'Access', note: 'Trail closures during active fire or smoke' },
      { label: 'Safety', note: 'Air quality limits for guest activities' },
      { label: 'Guest perception', note: 'Visible smoke triggers perceived risk' },
    ],
    evidence: 'Sources: Overseeing the Forest for the Trees — Montana Forest Consultants; Granite County CWPP.',
    tier: 'documented',
  },
  {
    id: 'supporting-logistics',
    number: '04',
    kicker: 'Supporting System · Operational',
    title: 'Silent Mobility System',
    body: 'Quiet is a core amenity across 10 square miles, meaning every activity shift brings a physical movement problem. Invisible logistics is the bridge between an operational decision and what the guest actually experiences.',
    whyNotSeparate:
      'Logistics turns environmental insight into real-world execution. Without it, even an advance decision degrades into an on-the-ground scramble.',
    affects: [
      { label: 'Activities change', note: 'Redirecting guests across 10 square miles' },
      { label: 'Guests move differently', note: 'Updated routes, distances, and timing' },
      { label: 'Staff response changes', note: 'Guides and coverage re-balanced' },
      { label: 'Resources relocate', note: 'Equipment staged at new activity hubs' },
      { label: 'Mobility patterns shift', note: 'Shuttle and bike flows re-sequenced quietly' },
    ],
    evidence: 'Property scale and low-vehicle intent are public; coordination model is proposed.',
    tier: 'proposed',
  },
];

// ── 05 · System overlay ─────────────────────────────────────────────────────

export type OverlayNode = {
  id: string;
  label: string;
  role: string;
  detail: string;
  tone: 'landscape' | 'ecological' | 'infrastructure' | 'operations' | 'experience';
  emphasis: 'primary' | 'supporting' | 'system' | 'outcome';
};

export const overlayNodes: OverlayNode[] = [
  {
    id: 'landscape',
    label: 'Dynamic Landscape',
    role: 'The condition everything else responds to',
    detail:
      'Not a backdrop. A working system with limits that move — seasonally, daily, and increasingly outside historical norms.',
    tone: 'landscape',
    emphasis: 'system',
  },
  {
    id: 'hydrology',
    label: 'Hydrology',
    role: 'Primary problem',
    detail:
      'Stream temperature and flow determine whether the property\'s central activity is legally available this afternoon. Highest consequence, shortest warning.',
    tone: 'ecological',
    emphasis: 'primary',
  },
  {
    id: 'wildfire',
    label: 'Wildfire',
    role: 'Supporting environmental system',
    detail:
      'Fuel load, smoke, and access closures. Protects the watershed the primary problem depends on — and constrains the alternatives a pivot would use.',
    tone: 'landscape',
    emphasis: 'supporting',
  },
  {
    id: 'stewardship',
    label: 'Stewardship Intelligence',
    role: 'The Adaptive Stewardship OS',
    detail:
      'The connective layer. A stream-temperature reading, a fuel-moisture reading, and a shuttle schedule do not, on their own, know about each other. This is the proposed system that would let them.',
    tone: 'infrastructure',
    emphasis: 'system',
  },
  {
    id: 'operations',
    label: 'Operational Response',
    role: 'Decisions',
    detail:
      'Which activities run, which guides are reassigned, which areas are protected, what gets staged where — and how far ahead.',
    tone: 'operations',
    emphasis: 'supporting',
  },
  {
    id: 'logistics',
    label: 'Mobility & Logistics',
    role: 'Supporting operational system',
    detail:
      'The execution layer. Moves people, equipment, and staff across 10 square miles without the movement itself becoming visible.',
    tone: 'operations',
    emphasis: 'supporting',
  },
  {
    id: 'experience',
    label: 'Guest Experience',
    role: 'Adaptive outcome',
    detail:
      'The afternoon still works. The guest never learns how much had to move for that to be true.',
    tone: 'experience',
    emphasis: 'outcome',
  },
];

export const overlayCopy = {
  id: 'system-overlay',
  number: '05',
  kicker: 'The System Overlay',
  title: 'The three challenges are one system',
  intro:
    'Separately, hydrology, wildfire, and logistics look like disconnected problems. Together, they form a single chain: environmental signals feed an intelligence layer, driving decisions executed by logistics, resolving as guest experience.',
  legend: [
    { swatch: 'bg-sky-500', label: 'Environmental input' },
    { swatch: 'bg-violet-500', label: 'Intelligence layer' },
    { swatch: 'bg-amber-500', label: 'Operational response' },
    { swatch: 'bg-rose-500', label: 'Experience outcome' },
  ],
  synthesis:
    'Remove any one link and the chain stops producing an outcome. Sensing without coordination is a weather report. Coordination without logistics is a plan nobody can execute. Logistics without sensing is a shuttle running on last week\'s assumptions.',
};

// ── 06 · Sense → Interpret → Adapt → Experience ─────────────────────────────

export const signalToExperience = {
  id: 'signal-to-experience',
  number: '06',
  kicker: 'The Flow',
  title: 'From Signal to Experience',
  intro:
    'Where the overlay maps links, this defines the loop: four stages moving continuous environmental data into an uninterrupted guest stay.',
  principle: 'Make the system adaptive without making the pivot visible.',

  stages: [
    {
      id: 'sense',
      number: '01',
      label: 'Sense',
      summary: 'Capture real-time environmental and operational inputs',
    
      tone: 'ecological' as const,
    },
    {
      id: 'interpret',
      number: '02',
      label: 'Interpret',
      summary: 'Translate raw threshold data into operational impact',
     
      tone: 'infrastructure' as const,
    },
    {
      id: 'adapt',
      number: '03',
      label: 'Adapt',
      summary: 'Orchestrate resources before constraints bind',
     
      tone: 'operations' as const,
    },
    {
      id: 'experience',
      number: '04',
      label: 'Experience',
      summary: 'Deliver an uninterrupted luxury stay',
      
      tone: 'experience' as const,
    },
  ],
};

// ── 07 · Future design opportunity ──────────────────────────────────────────

export const futureDesign = {
  id: 'future-design',
  number: '07',
  kicker: 'Future Opportunity',
  title: 'Where the design work begins',
  intro:
    'This research and system modeling defines a space to design into. The artifacts below are conceptual directions, not existing features operated by the property today.',
  artifacts: [
    { id: 'env-dashboard', label: 'Environmental intelligence dashboard', note: 'Signal aggregation across water, fire, and weather' },
    { id: 'decision-support', label: 'Staff decision-support system', note: 'Interpretation surfaced to the people making the call' },
    { id: 'orchestration', label: 'Adaptive activity orchestration', note: 'Alternatives staged against forecast constraint' },
    { id: 'routing', label: 'Guest experience routing', note: 'Itinerary adaptation the guest experiences as intent' },
    { id: 'alerts', label: 'Stewardship alerts', note: 'Threshold crossings routed to the right department' },
    { id: 'spatial-maps', label: 'Spatial decision maps', note: 'Where on the property a condition actually binds' },
    { id: 'mobility', label: 'Mobility coordination', note: 'Movement re-sequenced against a changed plan' },
    { id: 'scenarios', label: 'Scenario planning tools', note: 'Compound events modelled before the season' },
  ],
};

// ── Evidence boundary ───────────────────────────────────────────────────────

export const evidenceBoundary = {
  title: 'What this establishes, and what it does not',
  established: [
    'Documented stream-temperature thresholds and "Hoot Owl" closure triggers (National Wildlife Federation)',
    'Regional forest-condition and wildfire-risk data (Montana Forest Consultants; Granite County CWPP)',
    'Long-range hydrological and snowpack projections for western Montana',
    'Published property sustainability initiatives',
  ],
  notClaimed: [
    'That The Ranch at Rock Creek operates a unified system connecting these domains today',
    'Any measured, deployed, or validated intervention',
    'Access to non-public operating, financial, or engineering data',
    'Any sensor, software, workflow, or policy described here as an existing property capability',
  ],
  disclosure:
    'Independent research and systems-design exploration; no client relationship; interventions are conceptual.',
};

// ── Section registry (drives PageNavIndicator + in-page index) ──────────────

export const explorerSections = [
  { id: 'premise', label: 'Premise' },
  { id: 'primary-challenge', label: 'Primary' },
  { id: 'supporting-fire', label: 'Wildfire' },
  { id: 'supporting-logistics', label: 'Logistics' },
  { id: 'system-overlay', label: 'Overlay' },
  { id: 'signal-to-experience', label: 'Signal' },
  { id: 'future-design', label: 'Design' },
];
