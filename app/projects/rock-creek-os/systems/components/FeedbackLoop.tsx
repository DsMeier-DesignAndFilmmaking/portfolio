import { ArrowDown, RotateCw, Target } from 'lucide-react';
import { cn } from '../../components/diagram-primitives';
import { feedbackCopy, feedbackEdges, feedbackNodes } from '../content/systems-data';
import { AtlasSectionHeader } from './systems-primitives';

// ─────────────────────────────────────────────────────────────────────────────
// Atlas 05 · Feedback & Learning — a closed four-node cycle: Decision →
// Action → Observed Outcome → New Information → back to Decision.
//
// Evolved from the previous Atlas's `StewardshipFeedbackLoop`, kept nearly
// structurally identical (closed cycle, one card per edge, a named leverage
// point) because that component's shape already argued exactly what this
// section needs: a loop is not proven by drawing an arrow back to the start,
// it's proven by showing what breaks if the return edge is skipped. The
// previous version showed both a reinforcing and a degrading direction; this
// version keeps the reinforcing cycle but replaces the second mode with a
// single sharper point — the loop only degrades if outcome capture is
// skipped, and that failure mode is a discipline, not a mechanism.
// ─────────────────────────────────────────────────────────────────────────────

const nodeById = (id: string) => feedbackNodes.find((n) => n.id === id);

export function FeedbackLoop() {
  return (
    <section
      id={feedbackCopy.id}
      aria-labelledby={`${feedbackCopy.id}-title`}
      className="scroll-mt-24 bg-white py-16 md:py-28"
    >
      <div className="container mx-auto px-6 md:px-8">
        <AtlasSectionHeader
          kicker={feedbackCopy.kicker}
          number={feedbackCopy.number}
          title={feedbackCopy.title}
          intro={feedbackCopy.intro}
        />
        <h3 id={`${feedbackCopy.id}-title`} className="sr-only">
          {feedbackCopy.title}
        </h3>

        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 md:p-6">
          <header className="mb-5 flex items-center gap-3">
            <RotateCw className="h-4 w-4 text-rockcreek-700" aria-hidden="true" />
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-rockcreek-700">
              The cycle · four nodes, closed
            </p>
          </header>

          <ol className="space-y-2">
            {feedbackEdges.map((edge, index) => {
              const from = nodeById(edge.from);
              const to = nodeById(edge.to);
              if (!from || !to) return null;
              const isLast = index === feedbackEdges.length - 1;

              return (
                <li key={`${edge.from}-${edge.to}`}>
                  <div className="grid gap-3 rounded-2xl border border-neutral-200 bg-white p-4 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:p-5">
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
                      <h4 className="font-tiempos text-lg font-bold leading-tight text-neutral-950">
                        {from.name}
                      </h4>
                      <p className="mt-3 text-[11px] leading-relaxed text-neutral-600">{from.measure}</p>
                    </div>

                    <div className="flex flex-col justify-center">
                      <span className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                        Edge {String(index + 1).padStart(2, '0')}
                      </span>
                      <p className="mt-3 text-sm leading-relaxed text-neutral-700">{edge.mechanism}</p>
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
            The last edge returns to {feedbackNodes[0].name}. Nothing exits the system.
          </p>
        </div>

        {/* What breaks if the loop opens */}
        <section className="mt-6 rounded-2xl border border-rose-200 bg-rose-50/50 p-5 md:p-6">
          <h4 className="font-tiempos text-xl font-bold leading-tight text-neutral-950">
            If outcome capture is skipped
          </h4>
          <p className="mt-4 text-sm leading-relaxed text-neutral-700">{feedbackCopy.degradingNote}</p>
        </section>

        {/* Leverage point */}
        <section className={cn('mt-3 rounded-2xl border border-rockcreek-200 bg-rockcreek-50/60 p-5 md:p-6')}>
          <div className="flex items-start gap-3">
            <Target className="mt-0.5 h-5 w-5 shrink-0 text-rockcreek-700" aria-hidden="true" />
            <div>
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-rockcreek-700">
                Leverage point
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-700">{feedbackCopy.leveragePoint}</p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
