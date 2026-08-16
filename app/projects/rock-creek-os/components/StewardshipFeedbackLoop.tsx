import { ArrowDown, RotateCw, Target } from 'lucide-react';
import {
  loopEdges,
  loopExampleNote,
  loopFinding,
  loopLeveragePoint,
  loopModes,
  loopNodes,
} from '../content/frameworks';
import {
  FrameworkShell,
  MetaChip,
  ModeledNote,
  PolarityBadge,
  cn,
  toneStyles,
} from './diagram-primitives';

// ─────────────────────────────────────────────────────────────────────────────
// Atlas 05 · Stewardship Feedback Loop
//
// A closed four-node cycle. The same four edges are shown running in both
// polarities, because the design claim is not that the loop exists — it is
// that the loop's direction is a choice the budget makes. Every node and
// edge carries an illustrative measurable example, clearly labeled modeled
// rather than measured (loopExampleNote), to keep the honesty boundary this
// practice holds everywhere else.
// ─────────────────────────────────────────────────────────────────────────────

const nodeById = (id: string) => loopNodes.find((n) => n.id === id);

export default function StewardshipFeedbackLoop() {
  return (
    <FrameworkShell
      id="rcos-stewardship-loop"
      eyebrow="Atlas 05"
      title="Stewardship Feedback Loop"
      description="Land health, guest experience, revenue stability, and stewardship investment form one closed cycle. It always runs. The only open question is which direction."
      summary={`A closed feedback loop of four nodes: land health, guest experience, revenue stability, and stewardship investment. Land health drives guest experience; guest confidence stabilizes revenue; stable revenue funds stewardship investment; and that investment compounds back into land health. The same four edges can run in reverse as a degrading cycle. Each node and edge carries an illustrative measurable example. ${loopFinding} ${loopLeveragePoint}`}
      caption={loopFinding}
    >
      {/* The cycle */}
      <section className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 md:p-6">
        <header className="mb-5 flex items-center gap-3">
          <RotateCw className="h-4 w-4 text-rockcreek-700" aria-hidden="true" />
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-rockcreek-700">
            The cycle · four nodes, four edges, closed
          </p>
        </header>

        <ol className="space-y-2">
          {loopEdges.map((edge, index) => {
            const from = nodeById(edge.from);
            const to = nodeById(edge.to);
            if (!from || !to) return null;

            const fromTone = toneStyles[from.tone];
            const isLast = index === loopEdges.length - 1;

            return (
              <li key={`${edge.from}-${edge.to}`}>
                <div className="grid gap-3 rounded-2xl border border-neutral-200 bg-white p-4 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:p-5">
                  {/* Source node */}
                  <div className={cn('rounded-xl border p-4', fromTone.card)}>
                    <div className="flex items-center gap-2">
                      <span className={cn('h-2 w-2 rounded-full', fromTone.dot)} aria-hidden="true" />
                      <h4 className="font-tiempos text-lg font-bold leading-tight text-neutral-950">
                        {from.name}
                      </h4>
                    </div>
                    <p className="mt-3 text-[11px] leading-relaxed text-neutral-600">{from.measure}</p>
                    <p className="mt-3 border-t border-current/10 pt-2">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-500">
                        Responds in {from.respondsIn}
                      </span>
                    </p>
                    <p className="mt-2 flex gap-1.5 text-[11px] leading-relaxed text-neutral-500">
                      <span className="font-mono font-bold uppercase tracking-[0.1em] text-neutral-400">Ex.</span>
                      <span>{from.example}</span>
                    </p>
                  </div>

                  {/* Edge */}
                  <div className="flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                        Edge {String(index + 1).padStart(2, '0')}
                      </span>
                      <PolarityBadge polarity={edge.polarity} />
                      <MetaChip>Delay · {edge.delay}</MetaChip>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-700">{edge.mechanism}</p>
                    <p className="mt-3 flex gap-1.5 rounded-lg bg-neutral-50 px-3 py-2 text-xs leading-relaxed text-neutral-600">
                      <span className="font-mono font-bold uppercase tracking-[0.1em] text-neutral-400">Ex.</span>
                      <span>{edge.example}</span>
                    </p>
                    <p className="mt-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-500">
                      → {to.name}
                    </p>
                  </div>
                </div>

                {!isLast && (
                  <div className="flex justify-center py-1.5" aria-hidden="true">
                    <ArrowDown className="h-4 w-4 text-neutral-300" />
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <p className="mt-4 rounded-xl border border-rockcreek-200 bg-rockcreek-50 px-4 py-3 text-center text-sm font-semibold text-neutral-900">
          Edge 04 returns to {loopNodes[0].name}. The loop is closed — nothing exits the system.
        </p>
      </section>

      {/* Both polarities */}
      <section className="mt-6 grid gap-3 md:grid-cols-2">
        {loopModes.map((mode) => {
          const isVirtuous = mode.polarity === 'reinforcing';

          return (
            <article
              key={mode.id}
              className={cn(
                'rounded-2xl border p-5 md:p-6',
                isVirtuous ? 'border-emerald-200 bg-emerald-50/50' : 'border-rose-200 bg-rose-50/50',
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <h4 className="font-tiempos text-xl font-bold leading-tight text-neutral-950">
                  {mode.label}
                </h4>
                <PolarityBadge polarity={mode.polarity} />
              </div>

              <p className="mt-4 text-sm leading-relaxed text-neutral-700">{mode.summary}</p>

              <p className="mt-4 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-900">
                {mode.signal}
              </p>
            </article>
          );
        })}
      </section>

      {/* Leverage point */}
      <section className="mt-3 rounded-2xl border border-rockcreek-200 bg-rockcreek-50/60 p-5 md:p-6">
        <div className="flex items-start gap-3">
          <Target className="mt-0.5 h-5 w-5 shrink-0 text-rockcreek-700" aria-hidden="true" />
          <div>
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-rockcreek-700">
              Leverage point
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-700">{loopLeveragePoint}</p>
          </div>
        </div>
      </section>

      <ModeledNote>{loopExampleNote}</ModeledNote>
    </FrameworkShell>
  );
}
