import { DiagramShell } from './primitives';

const confidenceLoop = [
  ['Signals', 'Notice what changed'],
  ['Interpretation', 'Read context together'],
  ['Confidence', 'Find the uncertainty'],
  ['Guidance', 'Explain the best-fit paths'],
  ['Validation', 'Bring in human judgment'],
  ['Recovery', 'Preserve the guest’s intent'],
  ['Learning', 'Improve the next response'],
];

export default function RanchSystemArchitecture() {
  return (
    <DiagramShell
      eyebrow="Confidence Loop"
      title={'Changing context becomes confidence\u2011preserving\u00a0guidance.'}
      description="One operating model connects environmental signals, guest confidence, human judgment, recovery, and learning."
      className="bg-neutral-50/60"
    >
      <figure aria-labelledby="ranch-system-architecture-summary">
        <p id="ranch-system-architecture-summary" className="sr-only">
          The Confidence Loop moves from signals through interpretation, confidence, guidance,
          validation, recovery, and learning.
        </p>

        <div className="grid gap-3 xl:grid-cols-[repeat(7,minmax(0,1fr))] xl:gap-2">
          {confidenceLoop.map(([title, description], index) => (
            <div key={title} className="relative min-w-0">
              <article className="h-full rounded-2xl border border-neutral-200 bg-white p-4 text-center">
                <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-emerald-700">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 text-sm font-bold leading-snug text-neutral-950">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-500">{description}</p>
              </article>
              {index < confidenceLoop.length - 1 && (
                <span
                  className="flex h-6 items-center justify-center text-neutral-300 xl:absolute xl:-right-2 xl:top-1/2 xl:z-10 xl:h-auto xl:-translate-y-1/2"
                  aria-hidden="true"
                >
                  <span className="xl:hidden">↓</span>
                  <span className="hidden xl:inline">→</span>
                </span>
              )}
            </div>
          ))}
        </div>

        <figcaption className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center text-base font-semibold text-neutral-900">
          The system interprets before it recommends.
        </figcaption>
      </figure>
    </DiagramShell>
  );
}
