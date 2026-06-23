export type TopLevelProjectNavItem = {
  label: string;
  href?: string;
  group: 'Research' | 'Frameworks' | 'Concepts' | 'Builds & Implementation';
  external?: boolean;
  status?: string;
  disabled?: boolean;
};

export type TopLevelProjectNavGroup = {
  label: TopLevelProjectNavItem['group'];
  items: TopLevelProjectNavItem[];
};

export const ENVIRONMENTAL_SYSTEMS_DESIGN_OS_URL =
  'https://app.notion.com/p/Environmental-Systems-Design-OS-37defa67177f80fcb70dc324c03e2e7d?source=copy_link';

export const topLevelProjectNavGroups: TopLevelProjectNavGroup[] = [
  {
    label: 'Research',
    items: [
      {
        label: 'Environmental Systems Design OS',
        href: '/projects/environmental-systems-design-os',
        group: 'Research',
      },
    ],
  },
  {
    label: 'Frameworks',
    items: [
      {
        label: 'Architecture of Confidence',
        href: '/projects/architecture-of-confidence',
        group: 'Frameworks',
      },
    ],
  },
  {
    label: 'Concepts',
    items: [
      {
        label: 'The Wayfinding Matrix',
        href: '/projects/wayfinding-matrix',
        group: 'Concepts',
      },
      {
        label: 'The Intention Engine',
        href: '/projects/intention-engine',
        group: 'Concepts',
      },
      {
        label: 'Responsive Ecologies',
        href: '/projects/responsive-ecologies',
        group: 'Concepts',
        status: 'Flagship Synthesis',
      },
      {
        label: 'Adaptive Outdoor Hospitality Companion',
        href: '/projects/adaptive-ranch-experience-companion',
        group: 'Concepts',
      },
    ],
  },
  {
    label: 'Builds & Implementation',
    items: [
      { label: 'Human Adaptive Decision Engine (HADE)', href: '/projects/travel-and-ai', group: 'Builds & Implementation' },
      { label: 'Digital Executor', href: '/projects/digital-executor', group: 'Builds & Implementation' },
      { label: 'Field Notes', href: '/projects/field-notes', group: 'Builds & Implementation' },
      { label: 'Selected Client Work', href: '/projects/previous', group: 'Builds & Implementation' },
    ],
  },
];

export const topLevelProjectNavItems: TopLevelProjectNavItem[] = topLevelProjectNavGroups.flatMap((group) => group.items);
