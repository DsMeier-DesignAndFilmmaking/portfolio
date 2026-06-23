import Link from 'next/link';
import { ArrowDown, Database, GitBranch, Layers3 } from 'lucide-react';
import { osModules } from '../content';

const contentBounds = 'container mx-auto px-6 md:px-8';

export default function NotionOSArchitecture() {
  return (
    <section
      id="research-operations-os"
      aria-labelledby="research-operations-os-title"
      className="scroll-mt-20 bg-[#f3f1e8] py-16 md:py-24"
    >
      <div className={contentBounds}>
        <header className="mb-10 max-w-3xl md:mb-14">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.28em] text-emerald-700">
            10 // Research &amp; Operations OS
          </p>
          <h2 id="research-operations-os-title" className="mt-4 font-tiempos text-3xl font-bold leading-tight text-neutral-950 md:text-5xl">
            A scalable backbone connects field evidence to operational learning.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-600 md:text-lg">
            The conceptual OS keeps signals, states, thresholds, responses, evidence, and
            prototype work traceable. It describes an information architecture—not a live
            Notion integration.
          </p>
        </header>

        <figure aria-describedby="os-architecture-summary">
          <p id="os-architecture-summary" className="sr-only">
            Eight connected modules organize field signals, guest states, environmental
            conditions, route nodes, risk thresholds, operator responses, design evidence,
            and the prototype backlog.
          </p>

          <div className="rounded-[1.75rem] border border-stone-200 bg-white p-4 md:p-7">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr]">
              <div className="space-y-4">
                <LayerLabel icon={Database} label="Observe and structure" />
                <div className="grid gap-3 sm:grid-cols-2">
                  {osModules.slice(0, 4).map((module) => (
                    <ModuleCard key={module.name} module={module} tone="emerald" />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center py-2 lg:px-2" aria-hidden="true">
                <ArrowDown className="h-5 w-5 text-stone-300 lg:hidden" />
                <GitBranch className="hidden h-6 w-6 text-stone-300 lg:block" />
              </div>

              <div className="space-y-4">
                <LayerLabel icon={Layers3} label="Interpret and improve" />
                <div className="grid gap-3 sm:grid-cols-2">
                  {osModules.slice(4).map((module) => (
                    <ModuleCard key={module.name} module={module} tone="amber" />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-emerald-900/10 bg-emerald-950 p-5 text-white md:p-6">
              <div className="grid gap-4 md:grid-cols-[auto_1fr] md:items-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-300/10 text-emerald-300">
                  <GitBranch className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-emerald-300">
                    Learning loop
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-200">
                    Field outcomes update evidence, thresholds, route-node design, and the
                    next prototype hypothesis while preserving the history of why a rule changed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <figcaption className="mt-5 text-sm leading-relaxed text-neutral-600">
            The architecture can begin as a research workspace and mature toward governed
            operational infrastructure only as field evidence warrants it.{' '}
            <Link
              href="/projects/environmental-systems-design-os"
              className="text-emerald-700 underline underline-offset-2 transition-colors hover:text-emerald-600"
            >
              Signal matrix and risk thresholds developed in the Environmental Systems Design OS →
            </Link>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function LayerLabel({
  icon: Icon,
  label,
}: {
  icon: typeof Database;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-4 w-4 text-emerald-700" aria-hidden="true" />
      <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-neutral-600">{label}</p>
    </div>
  );
}

function ModuleCard({
  module,
  tone,
}: {
  module: (typeof osModules)[number];
  tone: 'emerald' | 'amber';
}) {
  return (
    <article className={`rounded-2xl border p-4 ${
      tone === 'emerald'
        ? 'border-emerald-100 bg-emerald-50/60'
        : 'border-amber-100 bg-amber-50/60'
    }`}>
      <h3 className="text-sm font-black text-neutral-900">{module.name}</h3>
      <p className="mt-2 text-xs leading-relaxed text-neutral-600">{module.role}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {module.records.map((record) => (
          <span key={record} className="rounded-full border border-white bg-white/85 px-2 py-1 text-[10px] font-bold text-neutral-700">
            {record}
          </span>
        ))}
      </div>
    </article>
  );
}
