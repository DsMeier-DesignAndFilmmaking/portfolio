import { DiagramShell } from './primitives';

const operationalFoundations = [
  ['Live Readiness', 'What is available and ready now', 'Capacity · access · equipment'],
  ['Human Knowledge', 'What local staff and guides know', 'Judgment · reassurance · nuance'],
  ['Stewardship Constraints', 'What responsible participation allows', 'Safety · land · animals · place'],
];

const disruptionFlow = [
  'Conditions change',
  'Operations confirm viability',
  'Staff validate the alternative',
  'Guidance reaches the guest',
];

export default function OperationsServiceBlueprint() {
  return (
    <DiagramShell
      eyebrow="Operational Source of Truth"
      title="Credible guidance begins behind the interface."
      description="The guest-facing recommendation must reflect readiness, local judgment, and stewardship constraints."
      className="bg-neutral-50/60"
    >
      <figure aria-labelledby="operations-service-blueprint-summary">
        <p id="operations-service-blueprint-summary" className="sr-only">
          Live readiness, human knowledge, and stewardship constraints form the operational source
          of truth behind credible guest guidance.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {operationalFoundations.map(([title, description, examples]) => (
            <article key={title} className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h3 className="font-tiempos text-2xl font-bold text-neutral-950">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{description}</p>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
                {examples}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 md:p-6">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
            When a plan changes
          </p>
          <div className="mt-4 grid gap-2 md:grid-cols-[repeat(4,minmax(0,1fr))]">
            {disruptionFlow.map((step, index) => (
              <div key={step} className="relative min-w-0">
                <p className="rounded-xl bg-neutral-50 px-4 py-3 text-center text-sm font-semibold leading-snug text-neutral-800">
                  {step}
                </p>
                {index < disruptionFlow.length - 1 && (
                  <span
                    className="flex h-5 items-center justify-center text-neutral-300 md:absolute md:-right-2 md:top-1/2 md:z-10 md:h-auto md:-translate-y-1/2"
                    aria-hidden="true"
                  >
                    <span className="md:hidden">↓</span>
                    <span className="hidden md:inline">→</span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <figcaption className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center text-base font-semibold text-neutral-900">
          The system should never recommend what operations cannot fulfill.
        </figcaption>
      </figure>
    </DiagramShell>
  );
}
