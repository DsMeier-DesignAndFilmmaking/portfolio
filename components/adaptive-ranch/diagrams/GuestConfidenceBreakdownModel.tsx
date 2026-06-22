import { DiagramShell } from './primitives';

const confidenceMoments = [
  ['Choosing', 'Which option fits me?', 'Narrow the field to viable choices.'],
  ['Preparing', 'Am I ready for this?', 'Clarify effort, timing, and support.'],
  ['Participating', 'Do these conditions still feel right?', 'Interpret change with local context.'],
  ['Adapting', 'What happens if the plan changes?', 'Offer a credible path that preserves intent.'],
];

export default function GuestConfidenceBreakdownModel() {
  return (
    <DiagramShell
      eyebrow="Confidence Moments"
      title="Confidence weakens at four predictable moments."
      description="Each moment reveals a different guest question—and a different way to restore clarity."
      className="bg-neutral-50/60"
    >
      <figure aria-labelledby="guest-confidence-breakdown-summary">
        <p id="guest-confidence-breakdown-summary" className="sr-only">
          Confidence can weaken while choosing, preparing, participating, or adapting. Each moment
          has a corresponding confidence-restoring response.
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {confidenceMoments.map(([moment, question, response], index) => (
            <article key={moment} className="rounded-2xl border border-neutral-200 bg-white p-5">
              <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-emerald-700">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-3 font-tiempos text-2xl font-bold text-neutral-950">{moment}</h3>
              <p className="mt-4 text-sm font-semibold leading-relaxed text-neutral-900">
                “{question}”
              </p>
              <p className="mt-4 border-l-2 border-emerald-500 pl-3 text-sm leading-relaxed text-neutral-600">
                {response}
              </p>
            </article>
          ))}
        </div>

        <figcaption className="mt-5 text-center text-base font-semibold text-neutral-900">
          Confidence support should match the moment of uncertainty.
        </figcaption>
      </figure>
    </DiagramShell>
  );
}
