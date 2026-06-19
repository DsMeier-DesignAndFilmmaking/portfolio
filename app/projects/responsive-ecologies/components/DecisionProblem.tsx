import { Activity, Network, ShieldCheck } from 'lucide-react';
import { decisionProblems, type DecisionProblem } from '../content';
import { SectionHeading, contentBounds } from './shared';

const problemIcons = {
  signals: Activity,
  coordination: Network,
  authority: ShieldCheck,
} satisfies Record<DecisionProblem['icon'], typeof Activity>;

export default function DecisionProblemSection() {
  return (
    <section
      id="decision-problem"
      aria-labelledby="decision-problem-title"
      className="bg-white py-16 md:py-24"
    >
      <div className={contentBounds}>
        <SectionHeading
          id="decision-problem-title"
          eyebrow="03 // Decision Problem"
          title="More environmental data does not automatically create better stewardship."
          intro="The design problem is the gap between observing a changing landscape and making a coordinated, evidence-aware decision with clear ownership."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {decisionProblems.map((problem) => {
            const Icon = problemIcons[problem.icon];
            return (
              <article
                key={problem.id}
                className="rounded-[1.5rem] border border-neutral-200 bg-white p-6 md:p-7"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-800">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="mt-7 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">
                  {problem.label}
                </p>
                <h3 className="mt-3 font-tiempos text-2xl font-bold leading-tight text-neutral-950">
                  {problem.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                  {problem.description}
                </p>
                <div className="mt-6 border-l-2 border-amber-400 pl-4">
                  <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-amber-700">
                    Failure mode
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                    {problem.consequence}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
