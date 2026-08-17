import type { PlateId } from '@/components/HeroDraftingPlate';

/**
 * Which project-detail heroes carry a drafting plate.
 *
 * This map is the implementation boundary. A project that is absent from it has
 * no plate, and there is no code path that can give it one.
 *
 * Deliberately NOT in this map:
 *   - all 12 legacy client-work heroes (app/projects/previous/*, purdue) — these
 *     already have photographic hero treatments and are out of scope
 *   - the dark canvases (rock-creek-os/dashboard, travel-and-ai/projects/[projectId])
 *   - the Rock Creek sub-routes (explorer, systems) — interior pages, not detail pages
 *   - hubs, redirect stubs and deprecated routes
 *   - wayfinding-matrix, intention-engine, responsive-ecologies — each already has an
 *     intentional bespoke hero visual in its local HeroLandscape.tsx
 *   - environmental-systems-design-os — research infrastructure and the canonical page
 *     template, not a project with a subject to draw from
 *
 * Plate assignment is oblique on purpose. The sheet is informed by the project's
 * subject but never illustrates it.
 */
export const HERO_PLATES: Partial<Record<string, PlateId>> = {
  'field-notes': 'survey-margin',
  'architecture-of-confidence': 'interval',
  'rock-creek-os': 'site-circulation',
  'adaptive-ranch-experience-companion': 'spatial-organization',
  'travel-and-ai': 'route-trace',
  'digital-executor': 'flow-terminal',
};
