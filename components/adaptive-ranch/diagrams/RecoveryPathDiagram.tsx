import { DiagramShell } from './primitives';

const recoverySteps = [
  ['Preserve Intent', 'Identify what the guest hoped to experience.'],
  ['Explain Change', 'Make the reason for the disruption clear.'],
  ['Validate Alternative', 'Use staff judgment to confirm the better-fit path.'],
  ['Restore Agency', 'Let the guest adapt without feeling downgraded.'],
];

export default function RecoveryPathDiagram() {
  return (
    <DiagramShell
      eyebrow="Recovery Principle"
      title="Recovery protects intent, trust, and agency."
      description="A useful recovery path is short enough to understand and credible enough to choose."
      className="bg-neutral-50/60"
    >
      <figure aria-labelledby="recovery-path-diagram-summary">
        <p id="recovery-path-diagram-summary" className="sr-only">
          Recovery preserves intent, explains the change, validates an alternative, and restores
          guest agency.
        </p>

        <div className="grid gap-3 md:grid-cols-4 md:gap-2">
          {recoverySteps.map(([title, description], index) => (
            <div key={title} className="relative min-w-0">
              <article className="h-full rounded-2xl border border-neutral-200 bg-white p-5">
                <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-emerald-700">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 font-tiempos text-xl font-bold text-neutral-950">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{description}</p>
              </article>
              {index < recoverySteps.length - 1 && (
                <span
                  className="flex h-6 items-center justify-center text-neutral-300 md:absolute md:-right-2 md:top-1/2 md:z-10 md:h-auto md:-translate-y-1/2"
                  aria-hidden="true"
                >
                  <span className="md:hidden">↓</span>
                  <span className="hidden md:inline">→</span>
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 md:p-6">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
            Example
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-400">Original</p>
              <p className="mt-2 font-tiempos text-2xl font-bold text-neutral-950">Trail Ride</p>
            </div>
            <span className="text-2xl text-emerald-600" aria-hidden="true">
              <span className="md:hidden">↓</span>
              <span className="hidden md:inline">→</span>
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-400">
                Better-fit alternative
              </p>
              <p className="mt-2 font-tiempos text-2xl font-bold text-neutral-950">
                Covered Horsemanship Experience
              </p>
            </div>
          </div>
          <p className="mt-5 border-l-2 border-emerald-500 pl-3 text-sm font-semibold text-neutral-900">
            Preserved intent: meaningful time with horses.
          </p>
        </div>

        <figcaption className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center text-base font-semibold text-neutral-900">
          A credible alternative should feel intentional, not leftover.
        </figcaption>
      </figure>
    </DiagramShell>
  );
}
