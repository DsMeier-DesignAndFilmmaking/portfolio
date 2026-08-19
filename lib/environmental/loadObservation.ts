/**
 * Build-time loader for the committed environmental observation snapshot.
 *
 * Runs inside an async Server Component during `next build`
 * (`output: 'export'` has no runtime, so this is read once per deploy, not
 * per request — same contract as `lib/notion-os.ts`).
 *
 * Two failure states are handled deliberately differently (Phase 7 of
 * docs/strategy/rock-creek-environmental-data-architecture.md):
 *   - FILE ABSENT   → legitimate first-run state. Returns null. The build
 *                      succeeds; the dashboard renders an explicit
 *                      "unavailable" state.
 *   - FILE CORRUPT  → a code defect (the writer or this reader is broken),
 *                      not a data state. Throws and FAILS THE BUILD, per
 *                      SSOT rule S6 — never render corrupted data as though
 *                      it were a normal empty state.
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { EnvironmentalObservation } from './types';

const CURRENT_PATH = path.join(process.cwd(), 'data', 'environmental', 'current.json');

function isValidObservation(value: unknown): value is EnvironmentalObservation {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.observedAt === 'string' &&
    typeof v.fetchedAt === 'string' &&
    v.source === 'open-meteo' &&
    typeof v.locationLabel === 'string' &&
    typeof v.air === 'object' &&
    typeof v.wind === 'object' &&
    typeof v.precipitation === 'object'
  );
}

export async function loadCurrentObservation(): Promise<EnvironmentalObservation | null> {
  let raw: string;
  try {
    raw = await readFile(CURRENT_PATH, 'utf8');
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      return null; // first-run state — not an error
    }
    throw err; // permission error, etc. — a real build problem
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    throw new Error(
      `data/environmental/current.json exists but is not valid JSON — this is a code defect, ` +
        `not a legitimate empty state, and must fail the build rather than render silently. ` +
        `Cause: ${String(err)}`,
    );
  }

  if (!isValidObservation(parsed)) {
    throw new Error(
      'data/environmental/current.json is valid JSON but missing required EnvironmentalObservation ' +
        'fields — treat as corrupt, not absent. Do not render partial environmental data.',
    );
  }

  return parsed;
}
