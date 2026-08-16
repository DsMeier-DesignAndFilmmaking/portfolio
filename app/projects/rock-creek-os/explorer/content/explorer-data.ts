// ─────────────────────────────────────────────────────────────────────────────
// Systems Explorer — content for four interactive challenge modules.
//
// All interventions are conceptual design hypotheses from an independent
// research project. Language is deliberately non-assertive throughout.
// ─────────────────────────────────────────────────────────────────────────────

export type ExplorerStep = {
  id: string;
  label: string;
  body: string;
  detail?: string;
};

export type TradeoffState = {
  id: string;
  label: string;
  metrics: Array<{ label: string; value: string; tone: 'positive' | 'negative' | 'neutral' }>;
  summary: string;
};

export type InterventionConcept = {
  id: string;
  label: string;
  description: string;
};

// ── Explorer 01 · Rustic Reliability Gap ────────────────────────────────────

export const explorer01 = {
  id: 'rustic-reliability-gap',
  number: '01',
  title: 'The Rustic-Reliability Gap',
  tension: { top: 'Heritage Authenticity', bottom: 'Modern Performance' },
  designQuestion:
    'How can invisible infrastructure improve performance while preserving visible cultural identity?',
  intro:
    'Heritage structures carry the property’s identity — but they were built for a climate, occupancy pattern, and reliability expectation that no longer applies. The intervention should not appear to solve authenticity by destroying it.',
  steps: [
    {
      id: 'heritage-envelope',
      label: 'Heritage Envelope',
      body: 'Timber lodges, river-stone foundations, and hand-hewn details that guests read as “authentic Montana.”',
      detail: 'The visible layer is the product. Any change here is a brand decision, not an engineering one.',
    },
    {
      id: 'thermal-moisture-risk',
      label: 'Thermal / Moisture Risk',
      body: 'Single-pane glazing, minimal insulation, and seasonal envelope stress accumulate as hidden performance debt.',
      detail: 'Modeled: envelope U-values 2–3× above current hospitality benchmarks for the climate zone.',
    },
    {
      id: 'infrastructure-intervention',
      label: 'Infrastructure Intervention',
      body: 'Proposed: concealed mechanical systems, envelope upgrades behind existing finishes, and localized generation.',
      detail: 'Design hypothesis — intervention occurs where guests do not look, not where they do.',
    },
    {
      id: 'performance-reliability',
      label: 'Performance Reliability',
      body: 'Projected: thermal stability within ±2°C regardless of exterior swing; moisture risk reduced by modeled 60%.',
      detail: 'Conceptual projection based on comparable retrofit case studies, not measured on-site data.',
    },
    {
      id: 'experience-preservation',
      label: 'Experience Preservation',
      body: 'The lodge reads the same. The stay feels more reliable. Authenticity is sustained, not simulated.',
      detail: 'The design question resolves when performance becomes invisible and identity remains visible.',
    },
  ] satisfies ExplorerStep[],
  outcome:
    'Proposed outcome: heritage identity preserved at the surface, with infrastructure sovereignty operating beneath it — so reliability no longer depends on staff absorption.',
};

// ── Explorer 02 · Glazing Paradox ───────────────────────────────────────────

export const explorer02 = {
  id: 'glazing-paradox',
  number: '02',
  title: 'The Glazing Paradox',
  tension: { top: 'Expansive Views', bottom: 'Thermal Performance' },
  intro:
    'Floor-to-ceiling glazing is the signature of a mountain lodge experience — and the primary source of thermal load. This is a tradeoff, not a problem with an obvious winner.',
  stateA: {
    id: 'state-a',
    label: 'State A · View Priority',
    metrics: [
      { label: 'Glazing Ratio', value: '72%', tone: 'positive' as const },
      { label: 'View Quality', value: 'Exceptional', tone: 'positive' as const },
      { label: 'Thermal Load', value: '+340%', tone: 'negative' as const },
      { label: 'Peak Demand', value: 'Critical weeks', tone: 'negative' as const },
    ],
    summary: 'Maximum view exposure. Maximum envelope vulnerability during peak occupancy.',
  },
  stateB: {
    id: 'state-b',
    label: 'State B · Envelope Priority',
    metrics: [
      { label: 'Glazing Ratio', value: '38%', tone: 'negative' as const },
      { label: 'View Quality', value: 'Reduced', tone: 'negative' as const },
      { label: 'Thermal Stability', value: '±1.5°C', tone: 'positive' as const },
      { label: 'Peak Demand', value: 'Manageable', tone: 'positive' as const },
    ],
    summary: 'Improved thermal performance at the cost of the view experience the property was designed around.',
  },
  proposedResponse: {
    label: 'Proposed Systems-Design Response',
    elements: [
      { id: 'view', label: 'View', description: 'Preserve sightlines to ridgeline and river corridor' },
      { id: 'envelope', label: 'Envelope', description: 'High-performance glazing at critical apertures only' },
      { id: 'passive', label: 'Passive Performance', description: 'Thermal mass, orientation, and seasonal shading' },
      { id: 'experience', label: 'Guest Experience', description: 'Framed views that feel intentional, not compromised' },
    ],
    synthesis:
      'Tradeoff modeling suggests neither extreme is viable. The design hypothesis integrates view preservation with selective envelope performance — not by adding glass, but by making the glass that exists work harder.',
  },
};

// ── Explorer 03 · Fishery Friction ──────────────────────────────────────────

export const explorer03 = {
  id: 'fishery-friction',
  number: '03',
  title: 'The Fishery Friction',
  intro:
    'Water demand, watershed health, and guest experience share a single riparian corridor. Pressure at any node propagates through the system — the fishery is not a separate concern from infrastructure.',
  chain: [
    { id: 'water-demand', label: 'Water Demand', body: 'Peak-season irrigation, lodge supply, and activity infrastructure draw from the same watershed.' },
    { id: 'watershed-pressure', label: 'Watershed Pressure', body: 'Reduced flow and elevated temperature stress downstream habitat during the weeks demand is highest.' },
    { id: 'riparian-health', label: 'Riparian Health', body: 'Bank stability, shade cover, and sediment load determine whether the corridor can buffer demand spikes.' },
    { id: 'fish-habitat', label: 'Fish Habitat', body: 'Cold-water species require sustained flow and thermal refuge — both degrade under concurrent peak demand.' },
    { id: 'guest-experience', label: 'Guest Experience', body: 'The fishery is part of what the stay was sold on. Its condition is the product, not its setting.' },
  ] satisfies ExplorerStep[],
  interventions: [
    { id: 'closed-loop', label: 'Closed-Loop Water Systems', description: 'Recirculating lodge supply decoupled from riparian draw during peak weeks.' },
    { id: 'fish-screens', label: 'Fish Screens', description: 'Intake protection that prevents entrainment without reducing operational flow.' },
    { id: 'wastewater-reuse', label: 'Wastewater Reuse', description: 'Greywater routed to irrigation buffer zones, not directly to stream corridor.' },
    { id: 'beaver-retention', label: 'Beaver-Inspired Water Retention', description: 'Conceptual: naturalistic retention structures that slow release and extend cold-water periods.' },
    { id: 'riparian-restoration', label: 'Riparian Restoration', description: 'Shade planting and bank stabilization to reduce thermal loading on downstream habitat.' },
  ] satisfies InterventionConcept[],
  disclaimer:
    'These are design concepts within an independent research project. They are not presented as implemented systems or measured ecological outcomes.',
};

// ── Explorer 04 · Privacy vs. Service ───────────────────────────────────────

export type ServiceLayer = 'guest' | 'staff' | 'infrastructure';

export const explorer04 = {
  id: 'privacy-vs-service',
  number: '04',
  title: 'Privacy vs. Service',
  designQuestion:
    'How can operational complexity become invisible without making service feel impersonal?',
  intro:
    'Service quality and guest privacy are often modeled as opposing forces. A systems view reveals they share a spatial problem: staff movement, back-of-house logistics, and service events all cross the same territory guests experience as sanctuary.',
  layers: [
    {
      id: 'guest' as const,
      label: 'Guest Layer',
      description: 'Movement paths, recovery zones, and experience spaces',
      elements: ['Main lodge circulation', 'River cabin approach', 'Recovery terrace', 'Trail access points'],
      color: 'rose',
    },
    {
      id: 'staff' as const,
      label: 'Staff Layer',
      description: 'Service routes that should not cross guest experience zones',
      elements: ['Back-of-house corridor', 'Service staging node', 'Discreet delivery path', 'Night-prep route'],
      color: 'amber',
    },
    {
      id: 'infrastructure' as const,
      label: 'Infrastructure Layer',
      description: 'Systems that enable invisible service without visible intervention',
      elements: ['Utility spine (concealed)', 'Smart occupancy sensing', 'Pre-positioned supply nodes', 'Acoustic buffer zones'],
      color: 'violet',
    },
  ],
  serviceEvents: [
    { id: 'turn-down', label: 'Turn-Down Service', guestVisible: false, staffPath: 'Back-of-house → discreet entry' },
    { id: 'dining-prep', label: 'Dining Preparation', guestVisible: false, staffPath: 'Kitchen → field kitchen (separate approach)' },
    { id: 'maintenance', label: 'Room Maintenance', guestVisible: false, staffPath: 'Utility spine → occupied-window scheduling' },
    { id: 'concierge', label: 'Concierge Delivery', guestVisible: true, staffPath: 'Main lodge → guest space (intentional, brief)' },
  ],
  outcome:
    'Proposed outcome: service events occur on dedicated spatial layers. Guest zones remain sovereign. Staff complexity is routed, not hidden through improvisation.',
};

export const explorerHero = {
  title: 'Systems Explorer',
  deck: 'Explore the environmental, infrastructure, operational, and experience tensions that shaped Case Study: The Ranch at Rock Creek.',
  principle:
    'Complex environmental problems are rarely isolated problems. They are system relationships.',
  disclosure:
    'Independent research and systems-design exploration. No client relationship. Interventions are conceptual — not presented as implemented systems or measured outcomes.',
};

export const explorerSections = [
  { id: 'explorer-01', label: 'Reliability Gap' },
  { id: 'explorer-02', label: 'Glazing Paradox' },
  { id: 'explorer-03', label: 'Fishery Friction' },
  { id: 'explorer-04', label: 'Privacy vs. Service' },
];
