import { DiagramShell } from './primitives';

const applications = [
  ['Resort', 'Choice overload', 'Narrow a large activity set to options that fit now.'],
  ['Lodge / Ranch', 'Activity fit', 'Match guest readiness with conditions and local support.'],
  [
    'Park / Conservation\u00a0Property',
    'Access and stewardship',
    'Guide visitors toward responsible, viable paths.',
  ],
  [
    'Guided Adventure\u00a0Operator',
    'Readiness and recovery',
    'Clarify challenge fit and preserve trust when plans change.',
  ],
];

export default function ApplicationsMatrixVisual() {
  return (
    <DiagramShell
      eyebrow="Hospitality Applications"
      title="One confidence framework adapts to different places."
      description="Each environment changes the dominant uncertainty—not the need for trustworthy guidance."
      className="bg-neutral-50/60"
    >
      <figure aria-labelledby="applications-matrix-summary">
        <p id="applications-matrix-summary" className="sr-only">
          The confidence framework applies to resorts, lodges and ranches, parks and conservation
          properties, and guided adventure operators.
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {applications.map(([environment, uncertainty, opportunity]) => (
            <article key={environment} className="rounded-2xl border border-neutral-200 bg-white p-5">
              <h3 className="font-tiempos text-2xl font-bold leading-tight text-neutral-950">
                {environment}
              </h3>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-neutral-400">
                Dominant uncertainty
              </p>
              <p className="mt-2 text-sm font-semibold text-neutral-900">{uncertainty}</p>
              <p className="mt-5 border-l-2 border-emerald-500 pl-3 text-sm leading-relaxed text-neutral-600">
                {opportunity}
              </p>
            </article>
          ))}
        </div>

        <figcaption className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center text-base font-semibold text-neutral-900">
          The context changes. The confidence problem remains.
        </figcaption>
      </figure>
    </DiagramShell>
  );
}
