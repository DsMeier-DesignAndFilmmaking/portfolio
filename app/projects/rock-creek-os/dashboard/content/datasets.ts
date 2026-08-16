// ─────────────────────────────────────────────────────────────────────────────
// Environmental Experience OS — mock telemetry datasets.
//
// All values are modeled for prototype demonstration. Relationships between
// metrics are explicit so visualization components can render system graphs
// rather than isolated KPI cards.
// ─────────────────────────────────────────────────────────────────────────────

export type MetricStatus = 'nominal' | 'elevated' | 'critical' | 'optimal';
export type TrendDirection = 'up' | 'down' | 'stable';

export type MetricNode = {
  id: string;
  label: string;
  value: number;
  unit: string;
  displayValue: string;
  status: MetricStatus;
  trend: TrendDirection;
  trendDelta: string;
  sparkline: number[];
  description: string;
};

export type SystemEdge = {
  from: string;
  to: string;
  strength: number; // 0–1, visual weight
  label: string;
};

export type ModuleDataset = {
  id: string;
  title: string;
  subtitle: string;
  metrics: MetricNode[];
  edges: SystemEdge[];
  synthesis: string;
};

export type TwinLayer = 'experience' | 'infrastructure';

export type TwinNode = {
  id: string;
  label: string;
  category: string;
  status: MetricStatus;
  load: number; // 0–100
  x: number; // 0–100 percent position
  y: number;
};

export type TwinLayerData = {
  label: string;
  description: string;
  nodes: TwinNode[];
  connections: Array<{ from: string; to: string; type: 'primary' | 'secondary' }>;
};

// ── Resource Autonomy ─────────────────────────────────────────────────────────

export const resourceAutonomy: ModuleDataset = {
  id: 'resource-autonomy',
  title: 'Resource Autonomy',
  subtitle: 'Cross-system resilience under isolation',
  synthesis:
    'Energy and water systems reinforce each other — solar surplus buffers pump load, while greywater recovery reduces thermal demand on treatment.',
  metrics: [
    {
      id: 'energy-resilience',
      label: 'Energy Resilience',
      value: 87,
      unit: '%',
      displayValue: '87%',
      status: 'optimal',
      trend: 'up',
      trendDelta: '+4.2%',
      sparkline: [72, 74, 76, 78, 79, 81, 83, 85, 86, 87],
      description: 'Days of autonomous operation at current load',
    },
    {
      id: 'water-independence',
      label: 'Water Independence',
      value: 94,
      unit: '%',
      displayValue: '94%',
      status: 'optimal',
      trend: 'stable',
      trendDelta: '+0.3%',
      sparkline: [91, 92, 92, 93, 93, 94, 94, 94, 94, 94],
      description: 'On-property sourcing vs. total demand',
    },
    {
      id: 'connectivity-redundancy',
      label: 'Connectivity Redundancy',
      value: 76,
      unit: '%',
      displayValue: '76%',
      status: 'elevated',
      trend: 'up',
      trendDelta: '+8.1%',
      sparkline: [58, 61, 63, 66, 68, 70, 72, 74, 75, 76],
      description: 'Active path diversity across mesh + satellite',
    },
    {
      id: 'supply-chain-autonomy',
      label: 'Supply Chain Autonomy',
      value: 68,
      unit: '%',
      displayValue: '68%',
      status: 'elevated',
      trend: 'up',
      trendDelta: '+2.7%',
      sparkline: [58, 59, 61, 62, 63, 64, 65, 66, 67, 68],
      description: 'Critical provisions sourced within 200km',
    },
  ],
  edges: [
    { from: 'energy-resilience', to: 'water-independence', strength: 0.85, label: 'powers' },
    { from: 'water-independence', to: 'energy-resilience', strength: 0.6, label: 'cools' },
    { from: 'energy-resilience', to: 'connectivity-redundancy', strength: 0.75, label: 'sustains' },
    { from: 'connectivity-redundancy', to: 'supply-chain-autonomy', strength: 0.55, label: 'coordinates' },
    { from: 'supply-chain-autonomy', to: 'energy-resilience', strength: 0.4, label: 'feeds' },
  ],
};

// ── Human Experience ──────────────────────────────────────────────────────────

export const humanExperience: ModuleDataset = {
  id: 'human-experience',
  title: 'Human Experience',
  subtitle: 'Environmental performance → guest outcomes',
  synthesis:
    'Acoustic sovereignty and circadian alignment drive recovery coefficient — when infrastructure noise drops below 32dB, sleep quality rises within 48 hours.',
  metrics: [
    {
      id: 'recovery-coefficient',
      label: 'Recovery Coefficient',
      value: 0.82,
      unit: '',
      displayValue: '0.82',
      status: 'optimal',
      trend: 'up',
      trendDelta: '+0.06',
      sparkline: [0.68, 0.7, 0.72, 0.74, 0.76, 0.78, 0.79, 0.8, 0.81, 0.82],
      description: 'Composite rest-to-activity recovery index',
    },
    {
      id: 'sleep-quality',
      label: 'Sleep Quality',
      value: 88,
      unit: '%',
      displayValue: '88%',
      status: 'optimal',
      trend: 'up',
      trendDelta: '+5%',
      sparkline: [76, 78, 79, 80, 82, 84, 85, 86, 87, 88],
      description: 'Deep-sleep ratio across occupied units',
    },
    {
      id: 'hrv',
      label: 'HRV',
      value: 62,
      unit: 'ms',
      displayValue: '62ms',
      status: 'nominal',
      trend: 'stable',
      trendDelta: '+1ms',
      sparkline: [58, 59, 60, 60, 61, 61, 62, 62, 62, 62],
      description: 'Population median heart-rate variability',
    },
    {
      id: 'acoustic-sovereignty',
      label: 'Acoustic Sovereignty',
      value: 91,
      unit: '%',
      displayValue: '91%',
      status: 'optimal',
      trend: 'up',
      trendDelta: '+3%',
      sparkline: [82, 84, 85, 86, 87, 88, 89, 90, 90, 91],
      description: 'Guest zones below 35dB ambient threshold',
    },
    {
      id: 'circadian-alignment',
      label: 'Circadian Alignment',
      value: 79,
      unit: '%',
      displayValue: '79%',
      status: 'nominal',
      trend: 'up',
      trendDelta: '+2%',
      sparkline: [70, 71, 73, 74, 75, 76, 77, 78, 78, 79],
      description: 'Light exposure matched to solar cycle',
    },
  ],
  edges: [
    { from: 'acoustic-sovereignty', to: 'sleep-quality', strength: 0.9, label: 'enables' },
    { from: 'circadian-alignment', to: 'sleep-quality', strength: 0.8, label: 'aligns' },
    { from: 'sleep-quality', to: 'hrv', strength: 0.75, label: 'elevates' },
    { from: 'sleep-quality', to: 'recovery-coefficient', strength: 0.85, label: 'drives' },
    { from: 'hrv', to: 'recovery-coefficient', strength: 0.7, label: 'signals' },
    { from: 'acoustic-sovereignty', to: 'circadian-alignment', strength: 0.5, label: 'protects' },
  ],
};

// ── Stewardship ───────────────────────────────────────────────────────────────

export const stewardship: ModuleDataset = {
  id: 'stewardship',
  title: 'Stewardship',
  subtitle: 'Ecological outcomes → operational performance',
  synthesis:
    'Soil organic matter gains correlate with reduced irrigation demand — every 0.5% SOM increase yields 12% water retention improvement, lowering pump cycles.',
  metrics: [
    {
      id: 'soil-organic-matter',
      label: 'Soil Organic Matter',
      value: 4.2,
      unit: '%',
      displayValue: '4.2%',
      status: 'optimal',
      trend: 'up',
      trendDelta: '+0.3%',
      sparkline: [3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.1, 4.2],
      description: 'Weighted average across managed pastures',
    },
    {
      id: 'water-retention',
      label: 'Water Retention',
      value: 78,
      unit: '%',
      displayValue: '78%',
      status: 'nominal',
      trend: 'up',
      trendDelta: '+4%',
      sparkline: [66, 68, 70, 71, 73, 74, 75, 76, 77, 78],
      description: 'Soil moisture holding capacity index',
    },
    {
      id: 'carbon-sequestration',
      label: 'Carbon Sequestration',
      value: 2.4,
      unit: 't/ha',
      displayValue: '2.4 t/ha',
      status: 'optimal',
      trend: 'up',
      trendDelta: '+0.2',
      sparkline: [1.8, 1.9, 2.0, 2.0, 2.1, 2.2, 2.2, 2.3, 2.3, 2.4],
      description: 'Annual net carbon drawdown rate',
    },
    {
      id: 'wildlife-connectivity',
      label: 'Wildlife Connectivity',
      value: 83,
      unit: '%',
      displayValue: '83%',
      status: 'optimal',
      trend: 'stable',
      trendDelta: '+1%',
      sparkline: [80, 81, 81, 82, 82, 83, 83, 83, 83, 83],
      description: 'Corridor integrity across property boundary',
    },
    {
      id: 'fishery-health',
      label: 'Fishery Health',
      value: 71,
      unit: 'idx',
      displayValue: '71',
      status: 'nominal',
      trend: 'up',
      trendDelta: '+3',
      sparkline: [62, 63, 65, 66, 67, 68, 69, 70, 70, 71],
      description: 'Composite stream ecology index',
    },
  ],
  edges: [
    { from: 'soil-organic-matter', to: 'water-retention', strength: 0.9, label: 'increases' },
    { from: 'water-retention', to: 'carbon-sequestration', strength: 0.7, label: 'supports' },
    { from: 'wildlife-connectivity', to: 'fishery-health', strength: 0.65, label: 'protects' },
    { from: 'water-retention', to: 'fishery-health', strength: 0.8, label: 'sustains' },
    { from: 'carbon-sequestration', to: 'soil-organic-matter', strength: 0.5, label: 'feeds back' },
  ],
};

// ── Operations ────────────────────────────────────────────────────────────────

export const operations: ModuleDataset = {
  id: 'operations',
  title: 'Operations',
  subtitle: 'Service systems, not staffing metrics',
  synthesis:
    'Invisible service quality rises when response velocity and privacy fidelity align — guests report higher fulfillment when interventions remain undetected.',
  metrics: [
    {
      id: 'invisible-service',
      label: 'Invisible Service',
      value: 92,
      unit: '%',
      displayValue: '92%',
      status: 'optimal',
      trend: 'up',
      trendDelta: '+3%',
      sparkline: [84, 85, 86, 87, 88, 89, 90, 91, 91, 92],
      description: 'Guest-reported unawareness of service acts',
    },
    {
      id: 'response-velocity',
      label: 'Response Velocity',
      value: 4.2,
      unit: 'min',
      displayValue: '4.2m',
      status: 'optimal',
      trend: 'down',
      trendDelta: '−0.8m',
      sparkline: [6.8, 6.2, 5.8, 5.4, 5.0, 4.8, 4.6, 4.4, 4.3, 4.2],
      description: 'Median signal-to-resolution interval',
    },
    {
      id: 'fulfillment-efficiency',
      label: 'Fulfillment Efficiency',
      value: 86,
      unit: '%',
      displayValue: '86%',
      status: 'nominal',
      trend: 'up',
      trendDelta: '+2%',
      sparkline: [78, 79, 80, 81, 82, 83, 84, 85, 85, 86],
      description: 'First-pass request completion rate',
    },
    {
      id: 'privacy-fidelity',
      label: 'Privacy Fidelity',
      value: 97,
      unit: '%',
      displayValue: '97%',
      status: 'optimal',
      trend: 'stable',
      trendDelta: '0%',
      sparkline: [96, 96, 97, 97, 97, 97, 97, 97, 97, 97],
      description: 'Zero unconsented data exposure events',
    },
  ],
  edges: [
    { from: 'response-velocity', to: 'invisible-service', strength: 0.8, label: 'enables' },
    { from: 'privacy-fidelity', to: 'invisible-service', strength: 0.85, label: 'protects' },
    { from: 'invisible-service', to: 'fulfillment-efficiency', strength: 0.75, label: 'elevates' },
    { from: 'fulfillment-efficiency', to: 'response-velocity', strength: 0.5, label: 'prioritizes' },
    { from: 'privacy-fidelity', to: 'fulfillment-efficiency', strength: 0.6, label: 'constrains' },
  ],
};

// ── Digital Twin Layers ───────────────────────────────────────────────────────

export const twinLayers: Record<TwinLayer, TwinLayerData> = {
  experience: {
    label: 'Experience Layer',
    description: 'Guest-facing spaces, activities, and recovery zones',
    nodes: [
      { id: 'main-lodge', label: 'Main Lodge', category: 'Guest Space', status: 'optimal', load: 72, x: 50, y: 28 },
      { id: 'cabins', label: 'River Cabins', category: 'Guest Space', status: 'optimal', load: 88, x: 22, y: 55 },
      { id: 'trails-north', label: 'North Ridge Trails', category: 'Trail', status: 'nominal', load: 45, x: 78, y: 35 },
      { id: 'trails-south', label: 'Meadow Loop', category: 'Trail', status: 'optimal', load: 38, x: 65, y: 68 },
      { id: 'fly-fishing', label: 'Fly Fishing', category: 'Activity', status: 'nominal', load: 62, x: 35, y: 78 },
      { id: 'recovery-spa', label: 'Recovery Zone', category: 'Recovery', status: 'optimal', load: 54, x: 82, y: 58 },
      { id: 'dining', label: 'Field Kitchen', category: 'Guest Space', status: 'optimal', load: 91, x: 48, y: 62 },
    ],
    connections: [
      { from: 'main-lodge', to: 'cabins', type: 'primary' },
      { from: 'main-lodge', to: 'dining', type: 'primary' },
      { from: 'cabins', to: 'fly-fishing', type: 'secondary' },
      { from: 'trails-north', to: 'recovery-spa', type: 'secondary' },
      { from: 'trails-south', to: 'dining', type: 'secondary' },
      { from: 'recovery-spa', to: 'cabins', type: 'primary' },
    ],
  },
  infrastructure: {
    label: 'Infrastructure Layer',
    description: 'Water, energy, connectivity, and stewardship systems',
    nodes: [
      { id: 'solar-array', label: 'Solar Array', category: 'Energy', status: 'optimal', load: 78, x: 28, y: 25 },
      { id: 'microgrid', label: 'Microgrid', category: 'Energy', status: 'optimal', load: 65, x: 50, y: 30 },
      { id: 'well-system', label: 'Well System', category: 'Water', status: 'optimal', load: 82, x: 72, y: 28 },
      { id: 'greywater', label: 'Greywater Loop', category: 'Water', status: 'nominal', load: 58, x: 68, y: 55 },
      { id: 'mesh-net', label: 'Mesh Network', category: 'Connectivity', status: 'elevated', load: 76, x: 32, y: 58 },
      { id: 'sat-uplink', label: 'Satellite Uplink', category: 'Connectivity', status: 'nominal', load: 42, x: 18, y: 42 },
      { id: 'stewardship-hub', label: 'Stewardship Hub', category: 'Stewardship', status: 'optimal', load: 71, x: 52, y: 72 },
      { id: 'pump-station', label: 'Pump Station', category: 'Water', status: 'nominal', load: 64, x: 78, y: 72 },
    ],
    connections: [
      { from: 'solar-array', to: 'microgrid', type: 'primary' },
      { from: 'microgrid', to: 'pump-station', type: 'primary' },
      { from: 'well-system', to: 'pump-station', type: 'primary' },
      { from: 'greywater', to: 'well-system', type: 'secondary' },
      { from: 'mesh-net', to: 'sat-uplink', type: 'primary' },
      { from: 'mesh-net', to: 'stewardship-hub', type: 'secondary' },
      { from: 'microgrid', to: 'mesh-net', type: 'secondary' },
      { from: 'stewardship-hub', to: 'greywater', type: 'secondary' },
    ],
  },
};

export const systemStatus = {
  overall: 'nominal' as MetricStatus,
  activeAlerts: 2,
  propertiesMonitored: 1,
  hectares: 2500,
  occupancy: 78,
  lastSync: '2026-08-15T17:42:00-06:00',
};

export const crossModuleLinks = [
  { from: 'resource-autonomy', to: 'human-experience', label: 'environment → recovery' },
  { from: 'stewardship', to: 'resource-autonomy', label: 'ecology → autonomy' },
  { from: 'operations', to: 'human-experience', label: 'service → experience' },
  { from: 'stewardship', to: 'operations', label: 'land health → service load' },
];
