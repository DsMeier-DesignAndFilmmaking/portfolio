export type TopLevelProjectNavItem = {
  label: string;
  href?: string;
  group: 'Systems Design' | 'Ideas & Concepts' | 'Professional Practice';
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
    label: 'Systems Design',
    items: [
      {
        label: 'Environmental Systems Design OS',
        href: ENVIRONMENTAL_SYSTEMS_DESIGN_OS_URL,
        group: 'Systems Design',
        external: true,
      },
      {
        label: 'Architecture of Confidence',
        href: '/projects/architecture-of-confidence',
        group: 'Systems Design',
      },
      {
        label: 'Adaptive Ranch Companion',
        href: '/projects/adaptive-ranch-experience-companion',
        group: 'Systems Design',
      },
      {
        label: 'Human Adaptive Decision Engine',
        href: '/projects/travel-and-ai',
        group: 'Systems Design',
      },
      {
        label: 'Travel Field Notes',
        href: '/projects/field-notes',
        group: 'Systems Design',
      },
      {
        label: 'Digital Executor',
        href: '/projects/digital-executor',
        group: 'Systems Design',
      },
    ],
  },
  {
    label: 'Ideas & Concepts',
    items: [
      {
        label: 'Responsive Ecologies',
        href: '/projects/responsive-ecologies',
        group: 'Ideas & Concepts',
      },
      {
        label: 'The Wayfinding Matrix',
        href: '/projects/wayfinding-matrix',
        group: 'Ideas & Concepts',
      },
      {
        label: 'The Intention Engine',
        href: '/projects/intention-engine',
        group: 'Ideas & Concepts',
      },
    ],
  },
  {
    label: 'Professional Practice',
    items: [
      {
        label: 'Selected Client Work',
        href: '/projects/previous',
        group: 'Professional Practice',
      },
    ],
  },
];

export const topLevelProjectNavItems: TopLevelProjectNavItem[] = topLevelProjectNavGroups.flatMap((group) => group.items);
