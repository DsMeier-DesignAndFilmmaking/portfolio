/**
 * Build-time loader for the observation history that the signal engine
 * evaluates over. Same contract as `loadObservation.ts`: absent file is a
 * legitimate first-run state; a corrupt file is a code defect.
 *
 * Malformed INDIVIDUAL lines are skipped rather than fatal — an append-only log
 * can be truncated mid-write by an interrupted job, and one bad tail line must
 * not take down a build. A file that parses to zero usable observations while
 * containing content IS fatal, because that means the format has drifted.
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { EnvironmentalObservation } from '../types.ts';

const HISTORY_PATH = path.join(process.cwd(), 'data', 'environmental', 'history.ndjson');

function isObservation(v: unknown): v is EnvironmentalObservation {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return typeof o.observedAt === 'string' && typeof o.air === 'object' && o.air !== null;
}

export async function loadObservationHistory(): Promise<EnvironmentalObservation[]> {
  let raw: string;
  try {
    raw = await readFile(HISTORY_PATH, 'utf8');
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return [];
    throw err;
  }

  const lines = raw.split('\n').filter((l) => l.trim().length > 0);
  if (lines.length === 0) return [];

  const observations: EnvironmentalObservation[] = [];
  for (const line of lines) {
    try {
      const parsed: unknown = JSON.parse(line);
      if (isObservation(parsed)) observations.push(parsed);
    } catch {
      // skip a torn line; see header
    }
  }

  if (observations.length === 0) {
    throw new Error(
      'data/environmental/history.ndjson has content but yielded zero valid observations — ' +
        'the format has drifted. Failing the build rather than evaluating signals against nothing.',
    );
  }

  return observations;
}
