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

// Optional hub/index link surfaced at the top of a track's group in the Work
// dropdown. Practice already has a top-level "Practice" nav item, so only the
// client-work track needs its hub (/projects/previous) exposed here.
const TRACK_GROUPS = [
  { label: 'Systems Design Practice', track: 'independent-research-practice' as const, hub: null },
  {
    label: 'Professional / Client Work',
    track: 'client-work' as const,
    hub: { label: 'All Client Work', href: '/projects/previous' },
  },
] as const;

export const topLevelProjectNavGroups: TopLevelProjectNavGroup[] = TRACK_GROUPS.map(
  ({ label, track, hub }) => ({
    label,
    items: [
      ...(hub ? [{ label: hub.label, href: hub.href }] : []),
      ...PROJECTS.filter((p) => p.track === track).map((p) => ({
        label: p.navTitle ?? p.title,
        href: p.href,
        ...(p.navStatus ? { status: p.navStatus } : {}),
      })),
    ],
  }),
);

export const topLevelProjectNavItems: TopLevelProjectNavItem[] = topLevelProjectNavGroups.flatMap(
  (group) => group.items,
);

// Curated, flagship-led set surfaced in the site footer. The ids are hand-picked
// (curation), but every label and href is derived from the canonical PROJECTS
// data, so the footer can never drift from — or silently omit — a real project.
// Order below is the display order (flagship first).
const FOOTER_FEATURED_IDS = [
  'environmental-systems-design-os', // Research OS — canonical flagship
  'architecture-of-confidence',
  'responsive-ecologies', // Flagship Synthesis
  'travel-and-ai', // HADE
  'digital-executor',
  'field-notes',
] as const;

export const footerFeaturedProjectItems: { label: string; href: string }[] =
  FOOTER_FEATURED_IDS.map((id) => {
    const project = PROJECTS.find((p) => p.id === id);
    if (!project) {
      throw new Error(`footerFeaturedProjectItems: unknown project id "${id}"`);
    }
    return { label: project.navTitle ?? project.title, href: project.href };
  });
