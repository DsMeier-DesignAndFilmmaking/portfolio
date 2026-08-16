import Link from 'next/link';
import { PROJECTS } from '@/data/projects';

const TRACK_HUB: Record<string, { label: string; href: string }> = {
  'independent-research-practice': {
    label: 'Systems Design Practice',
    href: '/projects/research-practice',
  },
  'client-work': {
    label: 'Client Work',
    href: '/projects/previous',
  },
};

export type BreadcrumbCrumb = {
  label: string;
  /** Omit on the final crumb — the current page is never a link. */
  href?: string;
};

/**
 * Breadcrumb for project pages.
 *
 * Two shapes:
 *
 * 1. **Project root** (no `trail`) — `Hub / Type`. This is the established
 *    pattern across every other project page and is unchanged.
 *
 * 2. **Nested experience** (`trail` supplied) — `Hub / Project / …trail`.
 *    The project title is inserted as a link, which is the crumb that was
 *    previously missing: without it a visitor on a nested route could only
 *    navigate up by jumping past the project entirely to the track hub.
 *
 * Rendered as `nav > ol > li` with `aria-current="page"` on the final crumb so
 * assistive tech announces it as breadcrumb navigation. The list items are
 * `display: inline`, so the visual output — including wrapping — is identical
 * to the paragraph this previously rendered.
 *
 * Visual hierarchy: ancestor crumbs are styled to read as clickable (darker,
 * heavier, hover/focus underline); the current page is deliberately lighter
 * and non-interactive so it recedes rather than competing with the H1 that
 * follows it. Tracking (0.16em) is scaled down from the site's 0.24em
 * eyebrow-label standard (see the hero status pills) since a breadcrumb runs
 * longer than a two-word badge and needs to stay scannable.
 */
export default function ProjectBreadcrumb({
  projectId,
  onDark = false,
  trail,
  nameProject = false,
  terminalIsCurrent = true,
}: {
  projectId: string;
  onDark?: boolean;
  trail?: BreadcrumbCrumb[];
  /**
   * On a project *root* page, end the trail with the project's own name
   * (`Hub / Rock Creek OS`) instead of its type (`Hub / Concept`).
   *
   * Opt-in and default-off: every existing call site renders byte-identically.
   * Used by multi-section projects where the root is one section among
   * siblings, so the breadcrumb has to state which project you are in before
   * the section nav beneath it states which part of it you are reading.
   */
  nameProject?: boolean;
  /**
   * Whether the final crumb is the page you're actually on (default: yes —
   * every prior call site keeps rendering byte-identically). Set `false` when
   * a sibling nav below the breadcrumb (e.g. a section tab rail) already
   * carries `aria-current`/active-state for the real current page — the
   * project crumb then becomes a plain link back to the project root instead
   * of a second, competing "current page" marker.
   */
  terminalIsCurrent?: boolean;
}) {
  const project = PROJECTS.find((p) => p.id === projectId);
  if (!project) return null;
  const hub = TRACK_HUB[project.track];

  const isNested = Boolean(trail?.length);

  const crumbs: BreadcrumbCrumb[] = isNested
    ? [
        { label: hub.label, href: hub.href },
        { label: project.navTitle ?? project.title, href: project.canonicalHref ?? project.href },
        ...(trail as BreadcrumbCrumb[]),
      ]
    : [
        { label: hub.label, href: hub.href },
        nameProject
          ? {
              label: project.navTitle ?? project.title,
              href: terminalIsCurrent ? undefined : (project.canonicalHref ?? project.href),
            }
          : { label: project.type },
      ];

  // Ancestor links read darker/heavier ("clickable"); the current crumb is
  // lighter/lighter-weight so it recedes instead of competing with the H1.
  // Both ends of the range hold >=4.5:1 contrast against their surface.
  const linkClass = `inline-block -my-1 py-1 font-semibold underline decoration-transparent underline-offset-4 transition-colors duration-150 focus:outline-none ${
    onDark
      ? 'text-neutral-300 hover:text-white hover:decoration-white/40 focus-visible:text-white focus-visible:decoration-white/40'
      : 'text-neutral-600 hover:text-neutral-900 hover:decoration-neutral-900/30 focus-visible:text-neutral-900 focus-visible:decoration-neutral-900/30'
  }`;

  const currentClass = `font-medium ${onDark ? 'text-neutral-400' : 'text-neutral-500'}`;

  const separatorClass = onDark ? 'text-white/25' : 'text-neutral-300';

  return (
    <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.16em]">
      {/* Nested trails lay out as wrapping flex items so a line break lands
          between crumbs instead of mid-label. Inline flow is kept for the
          two-crumb root breadcrumb so every other project page is untouched.
          Note: JSX strips the whitespace between <li> elements, so inline
          items offer no break opportunity — flex is what creates one. */}
      <ol className={isNested ? 'flex flex-wrap items-center' : 'm-0 list-none p-0'}>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          // A full three-crumb trail still outweighs the H1 on a phone.
          // Below `sm` the track-hub crumb collapses to screen-reader-only, so
          // the visible trail is the parent link plus the current page — the
          // two crumbs that actually carry the up-navigation. `sr-only` is
          // absolutely positioned, so it leaves flex flow without leaving the
          // accessibility tree; the hub is still announced and still reachable
          // sighted-side via the header's Work menu.
          const collapseOnMobile = isNested && index === 0;

          return (
            <li
              key={`${crumb.label}-${index}`}
              // Deliberately no `whitespace-nowrap`: a crumb still needs to be
              // able to wrap internally on very narrow viewports rather than
              // overflow (and be clipped by the page's `overflow-x-hidden`).
              className={
                collapseOnMobile
                  ? 'sr-only sm:not-sr-only sm:flex sm:items-center'
                  : isNested
                    ? undefined
                    : 'inline'
              }
            >
              {index > 0 && (
                <span
                  className={`mx-2 select-none font-normal ${separatorClass} ${
                    // The separator preceding the first visible crumb would
                    // otherwise dangle at the start of the mobile trail.
                    isNested && index === 1 ? 'hidden sm:inline' : ''
                  }`}
                  aria-hidden="true"
                >
                  /
                </span>
              )}
              {crumb.href && !(isLast && terminalIsCurrent) ? (
                <Link href={crumb.href} className={linkClass}>
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className={currentClass}
                  aria-current={isLast && terminalIsCurrent ? 'page' : undefined}
                >
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
