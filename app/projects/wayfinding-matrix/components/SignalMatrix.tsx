import { ArrowDown } from 'lucide-react';
import { signalMatrixRows, systemStages, type SystemStage } from '../content';

const contentBounds = 'container mx-auto px-6 md:px-8';

const toneClasses: Record<SystemStage['tone'], string> = {
  guest: 'border-sky-200 bg-sky-50 text-sky-800',
  environment: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  risk: 'border-amber-200 bg-amber-50 text-amber-800',
  guidance: 'border-violet-200 bg-violet-50 text-violet-800',
  ambient: 'border-teal-200 bg-teal-50 text-teal-800',
  operator: 'border-stone-300 bg-stone-100 text-stone-800',
};

export function SystemModel() {
  const guest = systemStages[0];
  const environment = systemStages[1];
  const downstream = systemStages.slice(2);

  return (
    <section id="system-model" aria-labelledby="system-model-title" className="scroll-mt-20 bg-white py-16 md:py-24">
      <div className={contentBounds}>
        <SectionHeading
          id="system-model-title"
          eyebrow="05 // System Model"
          title="Guest and environmental states meet inside an inspectable risk layer."
          intro="The architecture keeps sensing, interpretation, guidance, expression, and human oversight distinct so each layer can be tested and governed independently."
        />

        <figure className="rounded-[1.75rem] border border-neutral-200 bg-neutral-50 p-4 md:p-7" aria-describedby="system-model-summary">
          <p id="system-model-summary" className="sr-only">
            Guest State and Environmental State both feed a Risk Assessment Layer. The
            result moves through Guidance State and Ambient Signals to Operator Awareness.
          </p>

          <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
            {[guest, environment].map((stage, index) => (
              <article key={stage.id} className={`rounded-2xl border p-5 ${toneClasses[stage.tone]} ${index === 1 ? 'md:col-start-3' : ''}`}>
                <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em]">{stage.label}</p>
                <h3 className="mt-3 font-tiempos text-2xl font-bold text-neutral-950">{stage.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{stage.description}</p>
                <p className="mt-4 border-t border-current/15 pt-3 text-[10px] font-bold uppercase tracking-[0.12em]">{stage.output}</p>
              </article>
            ))}
            <div className="hidden items-center justify-center md:col-start-2 md:row-start-1 md:flex" aria-hidden="true">
              <span className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-neutral-400">Context</span>
            </div>
          </div>

          <div className="flex justify-center py-3" aria-hidden="true">
            <ArrowDown className="h-5 w-5 text-neutral-300" />
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {downstream.map((stage, index) => (
              <article key={stage.id} className={`rounded-2xl border p-5 ${toneClasses[stage.tone]}`}>
                <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em]">
                  {String(index + 1).padStart(2, '0')} / {stage.label}
                </p>
                <h3 className="mt-3 font-tiempos text-xl font-bold text-neutral-950">{stage.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{stage.description}</p>
                <p className="mt-4 border-t border-current/15 pt-3 text-[10px] font-bold uppercase tracking-[0.12em]">{stage.output}</p>
              </article>
            ))}
          </div>

          <figcaption className="mt-5 text-sm leading-relaxed text-neutral-500">
            Each transition creates an evidence and governance boundary—not an invisible
            pipeline from biometric input to automated instruction.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default function SignalMatrix() {
  return (
    <section id="signal-matrix" aria-labelledby="signal-matrix-title" className="scroll-mt-20 bg-[#f3f1e8] py-16 md:py-24">
      <div className={contentBounds}>
        <SectionHeading
          id="signal-matrix-title"
          eyebrow="07 // Signature Artifact"
          title="Signal Matrix"
          intro="The matrix models how changing human and environmental conditions become graded guidance and proportionate operator awareness. It is a systems framework, not a product screen."
        />

        <figure aria-describedby="signal-matrix-summary">
          <p id="signal-matrix-summary" className="sr-only">
            Five scenarios show relationships between Guest State, Environmental State,
            Risk Assessment, Guidance State, Ambient Signals, and Operator Awareness.
          </p>

          <div className="space-y-4 xl:hidden">
            {signalMatrixRows.map((row, index) => (
              <article key={row.guidanceState} className="rounded-[1.5rem] border border-stone-200 bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-neutral-600">
                    Matrix state {String(index + 1).padStart(2, '0')}
                  </p>
                  <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-violet-800">
                    {row.guidanceState}
                  </span>
                </div>
                <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                  {[
                    ['Guest state', row.guestState],
                    ['Environmental state', row.environmentalState],
                    ['Risk assessment', row.riskAssessment],
                    ['Ambient signal', row.ambientSignal],
                    ['Operator awareness', row.operatorAwareness],
                  ].map(([term, description]) => (
                    <div key={term} className="border-t border-stone-100 pt-3">
                      <dt className="font-mono text-[9px] font-black uppercase tracking-[0.14em] text-neutral-600">{term}</dt>
                      <dd className="mt-1.5 text-sm font-semibold leading-relaxed text-neutral-800">{description}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>

          <div className="hidden overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white xl:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1080px] border-collapse text-left">
                <thead className="bg-emerald-950 text-white">
                  <tr>
                    {['Guest State', 'Environmental State', 'Risk Assessment Layer', 'Guidance State', 'Ambient Signals', 'Operator Awareness'].map((heading) => (
                      <th key={heading} scope="col" className="border-r border-white/10 px-4 py-4 font-mono text-[9px] font-black uppercase tracking-[0.16em] last:border-r-0">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {signalMatrixRows.map((row) => (
                    <tr key={row.guidanceState} className="border-t border-stone-200 align-top first:border-t-0">
                      <td className="border-r border-stone-100 px-4 py-5 text-sm leading-relaxed text-neutral-700">{row.guestState}</td>
                      <td className="border-r border-stone-100 bg-emerald-50/50 px-4 py-5 text-sm leading-relaxed text-neutral-700">{row.environmentalState}</td>
                      <td className="border-r border-stone-100 bg-amber-50/60 px-4 py-5 text-sm font-semibold leading-relaxed text-neutral-800">{row.riskAssessment}</td>
                      <td className="border-r border-stone-100 bg-violet-50/60 px-4 py-5 text-sm font-black text-violet-900">{row.guidanceState}</td>
                      <td className="border-r border-stone-100 bg-teal-50/50 px-4 py-5 text-sm leading-relaxed text-neutral-700">{row.ambientSignal}</td>
                      <td className="px-4 py-5 text-sm leading-relaxed text-neutral-700">{row.operatorAwareness}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <figcaption className="mt-5 max-w-4xl text-sm leading-relaxed text-neutral-600">
            The matrix is intentionally scenario-based: no single signal determines a
            response, and greater consequence requires greater confidence and human
            accountability.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <header className="mb-10 max-w-3xl md:mb-14">
      <p className="font-mono text-[10px] font-black uppercase tracking-[0.28em] text-emerald-700">{eyebrow}</p>
      <h2 id={id} className="mt-4 font-tiempos text-3xl font-bold leading-tight text-neutral-950 md:text-5xl">{title}</h2>
      <p className="mt-5 text-base leading-relaxed text-neutral-600 md:text-lg">{intro}</p>
    </header>
  );
}
