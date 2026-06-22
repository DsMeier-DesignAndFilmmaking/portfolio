import { DiagramShell } from './primitives';

const scenarioSteps = [
  {
    title: 'Original Intent',
    description: 'The guest plans a guided riding\u00a0experience.',
    takeaway: 'Spend meaningful time outdoors with family.',
  },
  {
    title: 'Conditions Change',
    description: 'Weather shifts and trail conditions become uncertain.',
    takeaway: 'The original activity may no longer fit.',
  },
  {
    title: 'Interpret Together',
    description: 'Environmental signals, guest confidence, and staff knowledge are evaluated together.',
    takeaway: 'Preserve intent, not the itinerary.',
  },
  {
    title: 'Confident Recovery',
    description: 'A better-fit alternative is surfaced and validated by staff.',
    takeaway: 'The guest adapts without feeling downgraded.',
  },
];

export default function WeatherScenarioWalkthrough() {
  return (
    <DiagramShell
      eyebrow="Representative Example"
      title="A horseback ride changes. The guest’s intent does not."
      description="The companion protects what the family hoped to experience, even when the original plan no longer fits."
      className="bg-neutral-50/60"
    >
      <figure aria-labelledby="weather-scenario-walkthrough-summary">
        <p id="weather-scenario-walkthrough-summary" className="sr-only">
          A four-step horseback riding scenario showing how the companion preserves guest confidence when weather conditions change.
        </p>

        <div className="grid gap-3 lg:grid-cols-[repeat(4,minmax(0,1fr))] lg:gap-0">
          {scenarioSteps.map((step, index) => (
            <div key={step.title} className="relative min-w-0">
              <article className="h-full rounded-2xl border border-neutral-200 bg-white p-5 lg:mx-2 lg:p-6">
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-4 font-tiempos text-2xl font-bold leading-tight text-neutral-950">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {step.description}
                </p>
                <p className="mt-5 border-l-2 border-emerald-500 pl-3 text-sm font-semibold leading-relaxed text-neutral-900">
                  {step.takeaway}
                </p>
              </article>

              {index < scenarioSteps.length - 1 && (
                <div
                  className="flex h-7 items-center justify-center text-neutral-300 lg:absolute lg:-right-2 lg:top-1/2 lg:z-10 lg:h-auto lg:-translate-y-1/2"
                  aria-hidden="true"
                >
                  <span className="text-xl leading-none lg:-rotate-90">↓</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <figcaption className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 md:p-6">
          <div className="grid gap-2 md:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] md:items-center">
            <p className="font-tiempos text-xl font-bold leading-tight text-neutral-950">
              Most systems replace the activity.
            </p>
            <p className="text-sm leading-relaxed text-neutral-700 md:text-base">
              This system preserves the guest’s underlying intent and helps them adapt with confidence.
            </p>
          </div>
        </figcaption>
      </figure>
    </DiagramShell>
  );
}
