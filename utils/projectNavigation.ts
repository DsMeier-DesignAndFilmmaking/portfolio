export type TopLevelProjectNavItem = {
  label: string;
  href?: string;
  group: 'Research & Frameworks' | 'Applied Systems' | 'Field Practice';
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
    label: 'Research & Frameworks',
    items: [
      {
        label: 'Environmental Systems Design OS',
        href: '/projects/environmental-systems-design-os',
        group: 'Research & Frameworks',
      },
      {
        label: 'Architecture of Confidence',
        href: '/projects/architecture-of-confidence',
        group: 'Research & Frameworks',
      },
      {
        label: 'The Wayfinding Matrix',
        href: '/projects/wayfinding-matrix',
        group: 'Research & Frameworks',
      },
      {
        label: 'The Intention Engine',
        href: '/projects/intention-engine',
        group: 'Research & Frameworks',
      },
    ],
  },
  {
    label: 'Applied Systems',
    items: [
      {
        label: 'Responsive Ecologies',
        href: '/projects/responsive-ecologies',
        group: 'Applied Systems',
        status: 'Flagship Synthesis',
      },
      {
        label: 'Adaptive Outdoor Hospitality Companion',
        href: '/projects/adaptive-ranch-experience-companion',
        group: 'Applied Systems',
      },
      {
        label: 'Human Adaptive Decision Engine',
        href: '/projects/travel-and-ai',
        group: 'Applied Systems',
      },
      {
        label: 'Digital Executor',
        href: '/projects/digital-executor',
        group: 'Applied Systems',
      },
    ],
  },
  {
    label: 'Field Practice',
    items: [
      {
        label: 'Travel Field Notes',
        href: '/projects/field-notes',
        group: 'Field Practice',
      },
      {
        label: 'Selected Client Work',
        href: '/projects/previous',
        group: 'Field Practice',
      },
    ],
  },
];

export const topLevelProjectNavItems: TopLevelProjectNavItem[] = topLevelProjectNavGroups.flatMap((group) => group.items);
