import { PROJECTS } from '@/data/projects';

export type TopLevelProjectNavItem = {
  label: string;
  href?: string;
  external?: boolean;
  status?: string;
  disabled?: boolean;
};

export type TopLevelProjectNavGroup = {
  label: string;
  items: TopLevelProjectNavItem[];
};

const TRACK_GROUPS = [
  { label: 'Systems Design Practice', track: 'independent-research-practice' as const },
  { label: 'Professional / Client Work', track: 'client-work' as const },
] as const;

export const topLevelProjectNavGroups: TopLevelProjectNavGroup[] = TRACK_GROUPS.map(
  ({ label, track }) => ({
    label,
    items: PROJECTS.filter((p) => p.track === track).map((p) => ({
      label: p.navTitle ?? p.title,
      href: p.href,
      ...(p.navStatus ? { status: p.navStatus } : {}),
    })),
  }),
);

export const topLevelProjectNavItems: TopLevelProjectNavItem[] = topLevelProjectNavGroups.flatMap(
  (group) => group.items,
);
