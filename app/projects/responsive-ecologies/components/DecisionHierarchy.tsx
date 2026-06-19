import { GitBranch } from 'lucide-react';
import { decisionHierarchy } from '../content';
import { SectionHeading, contentBounds } from './shared';

export default function DecisionHierarchy() {
  return (
    <section
      id="decision-hierarchy"
      aria-labelledby="decision-hierarchy-title"
      className="bg-neutral-50 py-16 md:py-24"
    >
      <div className={contentBounds}>
        <SectionHeading
          id="decision-hierarchy-title"
          eyebrow="04 // Decision Hierarchy"
          title="Stewardship decisions operate at different scales of time, consequence, and authority."
          intro="The system keeps these levels connected without flattening them into one optimization problem. Each level asks a different question and belongs to a named human role."
        />

        <figure aria-describedby="decision-hierarchy-summary">
          <p id="decision-hierarchy-summary" className="sr-only">
            Four decision levels move from long-term strategy through tactical and
            operational planning to in-the-moment field decisions. Each level lists its
            time horizon, decisions, and accountable authority.
          </p>

          <div className="space-y-4">
            {decisionHierarchy.map((level, index) => (
              <article
                key={level.id}
                className="grid gap-5 rounded-[1.5rem] border border-neutral-200 bg-white p-5 md:grid-cols-[9rem_minmax(0,1.1fr)_minmax(0,1fr)] md:items-start md:p-7"
              >
                <div>
                  <p className="font-mono text-2xl font-bold text-emerald-700">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-3 font-tiempos text-2xl font-bold text-neutral-950">
                    {level.level}
                  </h3>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                    {level.horizon}
                  </p>
                </div>

                <div>
                  <p className="font-tiempos text-xl font-bold leading-snug text-neutral-900">
                    {level.question}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {level.decisions.map((decision) => (
                      <li key={decision} className="flex gap-2 text-sm leading-relaxed text-neutral-600">
                        <GitBranch className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
                        <span>{decision}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-amber-700">
                    Accountable authority
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-neutral-800">
                    {level.authority}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <figcaption className="mt-6 text-sm leading-relaxed text-neutral-500">
            Information may move across every level. Permission does not. The system can
            support judgment without silently inheriting human authority.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
