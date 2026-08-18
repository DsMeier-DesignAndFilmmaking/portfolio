import { cn, toneStyles } from '../../components/diagram-primitives';
import { extensibilityColumns, extensibilityCopy } from '../content/systems-data';
import { AtlasSectionHeader, EvidenceNote } from './systems-primitives';

// ─────────────────────────────────────────────────────────────────────────────
// Atlas 03 · Wildfire as extensibility proof — two parallel five-stage
// columns, same slots, different signal.
//
// Evolved from the previous Atlas's `RusticReliabilityGap`, which ran a
// current-state/future-state chain side by side to make a before/after
// argument. The shape transfers well to a different argument: not "before vs
// after" but "primary vs supporting, same architecture." Two columns at `lg`
// and up; stacked below it, in the same order, so the parallel still reads as
// a comparison rather than becoming two unrelated lists.
// ─────────────────────────────────────────────────────────────────────────────

export function WildfireExtensibility() {
  return (
    <section
      id={extensibilityCopy.id}
      aria-labelledby={`${extensibilityCopy.id}-title`}
      className="scroll-mt-24 bg-white py-16 md:py-28"
    >
      <div className="container mx-auto px-6 md:px-8">
        <AtlasSectionHeader
          kicker={extensibilityCopy.kicker}
          number={extensibilityCopy.number}
          title={extensibilityCopy.title}
          intro={extensibilityCopy.intro}
        />
        <h3 id={`${extensibilityCopy.id}-title`} className="sr-only">
          {extensibilityCopy.title}
        </h3>

        <div className="grid gap-4 lg:grid-cols-2">
          {extensibilityColumns.map((column) => {
            const tone = toneStyles[column.tone];
            return (
              <div key={column.id} className={cn('rounded-2xl border p-4 md:p-6', tone.card)}>
                <p
                  className={cn(
                    'inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]',
                    tone.chip,
                  )}
                >
                  {column.label}
                </p>

                <ol className="mt-5 space-y-2">
                  {column.stages.map((item, index) => (
                    <li key={item.stage}>
                      <div className="rounded-xl border border-neutral-200 bg-white p-4">
                        <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-neutral-400">
                          Stage {String(index + 1).padStart(2, '0')} · {item.stage}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-neutral-700">{item.body}</p>
                      </div>
                      {index < column.stages.length - 1 && (
                        <div className="flex justify-center py-1" aria-hidden="true">
                          <span className={cn('text-xs', tone.text)}>↓</span>
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-neutral-900 bg-neutral-950 p-5 md:p-6">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-rockcreek-300">
            Why this matters
          </p>
          <p className="mt-3 text-sm leading-relaxed text-neutral-300 md:text-base">{extensibilityCopy.synthesis}</p>
        </div>

        <EvidenceNote>{extensibilityCopy.evidence}</EvidenceNote>
      </div>
    </section>
  );
}
