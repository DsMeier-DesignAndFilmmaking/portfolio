/**
 * The Ranch at Rock Creek — geographic configuration for environmental data
 * ingestion. Single source, not scattered through components.
 *
 * Precision is DELIBERATE: two decimal places (~1 km) is enough to select the
 * correct weather grid cell and not enough to locate anything on the
 * property. Never render `latitude`/`longitude` in the UI — render
 * `label` only. See docs/strategy/rock-creek-environmental-data-architecture.md
 * §4.
 */
export const ROCK_CREEK_LOCATION = {
  label: 'Rock Creek, Montana',
  latitude: 46.33,
  longitude: -113.29,
  timezone: 'America/Denver',
} as const;
