import { DiagramShell } from './primitives';

const signalGroups = [
  ['Guest', 'Intent, readiness, and comfort', 'Goals · group needs'],
  ['Environment', 'Conditions shaping experience fit', 'Weather · terrain'],
  ['Operations', 'What can be delivered now', 'Capacity · equipment'],
  ['Stewardship', 'Limits that protect place and participation', 'Safety · land care'],
  ['Staff Knowledge', 'Local judgment the system should not flatten', 'Guide insight · lived context'],
];

export default function RanchSignalMap() {
  return (
    <DiagramShell
      eyebrow="Outdoor Hospitality Signal Map"
      title="Five inputs shape current experience fit."
      description="The companion reads guest, place, operational, stewardship, and human context together."
      className="bg-neutral-50/60"
    >
      <figure aria-labelledby="ranch-signal-map-summary">
        <p id="ranch-signal-map-summary" className="sr-only">
          Guest, environment, operations, stewardship, and staff knowledge signals combine to
          determine current experience fit.
        </p>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {signalGroups.map(([title, description, examples]) => (
            <article key={title} className="rounded-2xl border border-neutral-200 bg-white p-5">
              <h3 className="font-tiempos text-xl font-bold leading-tight text-neutral-950">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{description}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
                {examples}
              </p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-5 max-w-md rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">
            Shared interpretation
          </p>
          <p className="mt-2 font-tiempos text-2xl font-bold text-neutral-950">
            Current Experience Fit
          </p>
        </div>

        <figcaption className="mt-5 text-center text-base font-semibold text-neutral-900">
          No single signal is enough to determine fit.
        </figcaption>
      </figure>
    </DiagramShell>
  );
}
