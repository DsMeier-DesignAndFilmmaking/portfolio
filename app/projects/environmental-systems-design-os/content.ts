// Static content + section map for the Environmental Systems Design OS page.
// Live data (orgs, artifacts, patterns, projects, assets) comes from
// @/lib/notion-os at build time — see page.tsx.

export const CONTENT_BOUNDS = 'container mx-auto px-6 md:px-8';

export const NOTION_OS_URL =
  'https://app.notion.com/p/Environmental-Systems-Design-OS-37defa67177f80fcb70dc324c03e2e7d?source=copy_link';

export type SectionNavItem = { id: string; label: string };

export const sectionNavigation: SectionNavItem[] = [
  { id: 'osds-hero', label: 'Overview' },
  { id: 'osds-what', label: 'Method' },
  { id: 'osds-architecture', label: 'Flow' },
  { id: 'osds-organizations', label: 'Studied' },
  { id: 'osds-artifacts', label: 'Artifacts' },
  { id: 'osds-patterns', label: 'Patterns' },
  { id: 'osds-projects', label: 'Projects' },
  { id: 'osds-principles', label: 'Principles' },
  { id: 'osds-explore', label: 'Explore' },
];

export type Callout = { id: string; label: string; body: string };

export const whatTheOsIs: Callout[] = [
  {
    id: 'observation-evidence',
    label: 'Observation → Evidence',
    body: 'Environmental system audits, field observations, and destination research captured with source, confidence level, and known limitations.',
  },
  {
    id: 'evidence-artifacts',
    label: 'Evidence → Artifacts',
    body: 'Patterns extracted from audits become typed, reusable system artifacts — signal taxonomies, confidence models, authority frameworks, recovery architectures.',
  },
  {
    id: 'artifacts-frameworks',
    label: 'Artifacts → Frameworks',
    body: 'Artifacts combine into public-facing frameworks: the Architecture of Confidence, the Wayfinding Matrix, Responsive Ecologies.',
  },
];

export type ArchitectureLayer = {
  id: string;
  number: string;
  name: string;
  items: { label: string; href?: string }[];
};

export const architectureLayers: ArchitectureLayer[] = [
  {
    id: 'inputs',
    number: '01',
    name: 'Inputs',
    items: [
      { label: 'System audits (organizations, products, destinations)' },
      { label: 'Field observations (41 countries)' },
      { label: 'Research library (academic + industry)' },
      { label: 'Case studies' },
    ],
  },
  {
    id: 'synthesis',
    number: '02',
    name: 'Synthesis',
    items: [
      { label: 'Signal quality assessment' },
      { label: 'Pattern extraction' },
      { label: 'Cross-system comparison' },
      { label: 'Evidence confidence labeling' },
    ],
  },
  {
    id: 'artifacts',
    number: '03',
    name: 'Artifacts',
    items: [
      { label: 'Environmental Signal Taxonomy' },
      { label: 'Confidence Assessment Model' },
      { label: 'Authority Routing Framework' },
      { label: 'Recovery Path Architecture' },
      { label: 'Experience Patterns Library' },
    ],
  },
  {
    id: 'outputs',
    number: '04',
    name: 'Outputs',
    items: [
      { label: 'Architecture of Confidence', href: '/projects/architecture-of-confidence/' },
      { label: 'Adaptive Ranch Companion', href: '/projects/adaptive-ranch-experience-companion/' },
      { label: 'Wayfinding Matrix', href: '/projects/wayfinding-matrix/' },
      { label: 'Responsive Ecologies', href: '/projects/responsive-ecologies/' },
    ],
  },
];

export const evidencePathTrace =
  'Research or Field Note → Signal / Audit / Pattern → Opportunity / Scenario → Project → Artifact → Portfolio Asset';

export type OperatingPrinciple = { number: string; title: string; body: string };

export const operatingPrinciples: OperatingPrinciple[] = [
  {
    number: '01',
    title: 'Evidence before synthesis',
    body: 'A portfolio claim must be traceable through at least one evidence path from research or observation through to the published asset.',
  },
  {
    number: '02',
    title: 'Navigation is not data',
    body: 'Organizational views and dashboards do not create new record types. The canonical databases remain the source of truth.',
  },
  {
    number: '03',
    title: 'Internal artifacts and public assets are different',
    body: 'An artifact is an internal unit of systems work. A portfolio asset is a selected public translation of one or more artifacts.',
  },
  {
    number: '04',
    title: 'Agents must be bounded',
    body: 'A stewardship agent must have defined inputs, decisions, permitted actions, constraints, escalation conditions, and human authority.',
  },
  {
    number: '05',
    title: 'Scenarios test architecture',
    body: 'A scenario is not a narrative example. It is a repeatable test with initial conditions, signal changes, agent participation, thresholds, outcomes, recovery, and evaluation.',
  },
  {
    number: '06',
    title: 'Responsive Ecologies is a synthesis case',
    body: 'Responsive Ecologies draws from The Architecture of Confidence and Adaptive Ranch. It does not replace or rename either source project.',
  },
];

export const evidenceBoundary = {
  established: [
    'A disciplined research and observation method',
    'Reusable system artifacts with evidence lineage',
    'Traceable connections between observations and portfolio frameworks',
    'A structured environment for auditing how real systems work',
    'Typed signal definitions, stakeholder roles, and scenario structures',
  ],
  notClaimed: [
    'Live environmental sensing or field deployment',
    'Validated ecological or guest-experience outcomes',
    'A substitute for field research, pilot testing, or domain expert review',
    'Completeness — the OS evolves as new evidence is gathered',
  ],
};

export type CrossProjectCard = {
  id: string;
  title: string;
  relationship: string;
  href: string;
};

export const crossProjectCards: CrossProjectCard[] = [
  {
    id: 'architecture-of-confidence',
    title: 'Architecture of Confidence',
    relationship: 'Framework origin',
    href: '/projects/architecture-of-confidence/',
  },
  {
    id: 'adaptive-ranch',
    title: 'Adaptive Ranch Companion',
    relationship: 'Applied system',
    href: '/projects/adaptive-ranch-experience-companion/',
  },
  {
    id: 'responsive-ecologies',
    title: 'Responsive Ecologies',
    relationship: 'Flagship synthesis',
    href: '/projects/responsive-ecologies/',
  },
  {
    id: 'wayfinding-matrix',
    title: 'Wayfinding Matrix',
    relationship: 'System concept',
    href: '/projects/wayfinding-matrix/',
  },
];
