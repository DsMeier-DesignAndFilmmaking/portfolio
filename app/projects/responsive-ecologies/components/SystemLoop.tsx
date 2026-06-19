import { ArrowDown, GitBranch } from 'lucide-react';
import { systemLoop, type SystemLoopStep } from '../content';
import { SectionHeading, contentBounds } from './shared';

const loopToneClasses: Record<SystemLoopStep['tone'], string> = {
  sky: 'border-sky-200 bg-sky-50 text-sky-800',
  teal: 'border-teal-200 bg-teal-50 text-teal-800',
  amber: 'border-amber-200 bg-amber-50 text-amber-800',
  emerald: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  violet: 'border-violet-200 bg-violet-50 text-violet-800',
};

export default function SystemLoop() {
  return (
    <section
      id="system-loop"
      aria-labelledby="system-loop-title"
      className="bg-white py-16 md:py-24"
    >
      <div className={contentBounds}>
        <SectionHeading
          id="system-loop-title"
          eyebrow="06 // System Loop"
          title="Signals move through interpretation and authority before they become action."
          intro="The core loop separates sensing, modeling, authorization, and stewardship so that no single agent or data source is mistaken for the whole decision."
        />

        <figure
          className="rounded-[1.75rem] border border-neutral-200 bg-neutral-50 p-4 md:p-7"
          aria-describedby="system-loop-summary"
        >
          <p id="system-loop-summary" className="sr-only">
            The Responsive Ecologies system loop senses environmental and operational
            conditions, interprets their meaning, models response paths, routes a decision
            to accountable human authority, and supports stewardship action. Observed
            outcomes return to the loop as evidence and learning.
          </p>

          <div className="space-y-3 md:hidden">
            {systemLoop.map((step, index) => (
              <div key={step.id}>
                <article className={`rounded-2xl border p-5 ${loopToneClasses[step.tone]}`}>
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em]">
                    {step.label}
                  </p>
                  <h3 className="mt-3 font-tiempos text-xl font-bold leading-tight text-neutral-950">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {step.description}
                  </p>
                  <p className="mt-4 border-t border-current/15 pt-3 text-xs font-bold uppercase tracking-[0.1em]">
                    Output: {step.output}
                  </p>
                </article>
                {index < systemLoop.length - 1 && (
                  <div className="flex justify-center py-2" aria-hidden="true">
                    <ArrowDown className="h-5 w-5 text-neutral-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden gap-3 md:grid md:grid-cols-2 xl:grid-cols-5">
            {systemLoop.map((step) => (
              <article
                key={step.id}
                className={`rounded-2xl border p-5 ${
                  step.id === 'steward' ? 'md:col-span-2 xl:col-span-1' : ''
                } ${loopToneClasses[step.tone]}`}
              >
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em]">
                  {step.label}
                </p>
                <h3 className="mt-4 font-tiempos text-xl font-bold leading-tight text-neutral-950">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {step.description}
                </p>
                <p className="mt-5 border-t border-current/15 pt-3 text-[10px] font-bold uppercase tracking-[0.1em]">
                  {step.output}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-3 rounded-2xl border border-violet-200 bg-violet-50 p-5 md:grid-cols-[auto_1fr] md:items-center">
            <GitBranch className="h-5 w-5 text-violet-700" aria-hidden="true" />
            <div>
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-violet-700">
                Recovery and learning loop
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                Changed conditions, weak evidence, rejected recommendations, and field
                outcomes return to interpretation. The system can revise its path without
                hiding why the original decision changed.
              </p>
            </div>
          </div>

          <figcaption className="mt-5 text-sm leading-relaxed text-neutral-500">
            Sequence, ownership, and recovery remain visible without requiring animation
            or interaction.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
