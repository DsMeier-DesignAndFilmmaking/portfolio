import type { Metadata } from 'next';
import { getProjects } from '@/lib/notion-os';
import { loadCurrentObservation } from '@/lib/environmental/loadObservation';
import { loadObservationHistory } from '@/lib/environmental/signals/loadHistory';
import { assembleSystemState } from '@/lib/environmental/signals/systemState';
import { StewardshipConsole } from './components';
import { LOOP_RECORDS } from './content/decisions';

export const metadata: Metadata = {
  title: 'Stewardship Console — Case Study: The Ranch at Rock Creek | Dan Meier',
  description:
    'A conceptual decision-support console for the Adaptive Stewardship OS: environmental conditions become an interpretation, a recommended response for staff to decide, a logistics coordination, and a preserved guest experience. Independent systems-design research — modeled values, not Ranch measurements.',
};

/**
 * STAGE 4 — the dashboard's single data-assembly point.
 *
 *   REAL WORLD → OBSERVATION → SIGNAL ENGINE → SYSTEM STATE → DASHBOARD
 *
 * Everything the console renders is read off ONE `RockCreekSystemState`
 * object, assembled here and nowhere else. No component downstream
 * reconstructs state from raw observations or history — see
 * `lib/environmental/signals/systemState.ts` for why that matters.
 *
 * This runs once, at BUILD time (`output: 'export'` has no runtime — see
 * Stage 1 architecture doc §6, Stage 1 D1). "Live" therefore means: as fresh
 * as the last deploy, which is triggered by the 3-hourly scheduled ingestion
 * job committing a new observation (`.github/workflows/environmental-ingest.yml`).
 * There is no client-side fetch, no polling against an API, and no server to
 * poll — that decision was made explicitly in Stage 1 and is not reopened
 * here. What Stage 4 adds is: (a) a client-side relative-time display so
 * "Updated X ago" stays honest while a visitor's tab stays open, and (b) a
 * soft reload on tab refocus after a long hidden period, so a visitor returns
 * to whatever the CDN is currently serving rather than a frozen snapshot from
 * whenever they first loaded the page. Neither makes a network request beyond
 * a normal page load.
 */
export default async function DashboardPage() {
  const [projects, observation, history] = await Promise.all([
    getProjects(),
    loadCurrentObservation(),
    loadObservationHistory(),
  ]);
  const rockCreek = projects.find((project) => project.name === 'Rock Creek OS');
  const notionSource = rockCreek ? { name: rockCreek.name, maturityStage: rockCreek.maturityStage } : null;

  const systemState = assembleSystemState(history, observation, LOOP_RECORDS, notionSource);

  // Build-time observability (Stage 4 §13) — visible in the Vercel build log,
  // not shipped to the client. Answers: when was this regenerated, did the
  // observation load, what did the engine conclude, did anything change.
  const transitionCount = systemState.loops.reduce((n, l) => n + l.transitions.length, 0);
  console.log(
    `[rock-creek-dashboard] regenerated ${systemState.generatedAt} · ` +
      `observation=${systemState.observation ? systemState.observation.observedAt : 'none'} · ` +
      `freshness=${systemState.freshness} · overall=${systemState.overallState} · ` +
      `dataGaps=${systemState.hasDataGaps} · transitions=${transitionCount}`,
  );
  if (transitionCount > 0) {
    for (const loop of systemState.loops) {
      for (const t of loop.transitions) {
        console.log(`[rock-creek-dashboard]   transition ${t.ruleId}: ${t.from} → ${t.to}`);
      }
    }
  }

  return <StewardshipConsole systemState={systemState} />;
}
