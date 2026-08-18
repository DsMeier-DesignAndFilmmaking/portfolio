import { cn } from '../../components/diagram-primitives';
import { supportingSystems, type SupportingSystem } from '../content/explorer-data';
import { EvidenceTierBadge } from './PrimaryChallenge';

// ─────────────────────────────────────────────────────────────────────────────
// The two supporting systems, rendered at a deliberately lower visual weight
// than the primary problem: smaller heading scale, no design-question pull
// quote, no interactive chain, and a muted section background. That asymmetry
// is the argument — a reader scrolling past should feel the hierarchy before
// they read a word of it.
//
// Every card carries a `whyNotSeparate` block, styled as the most prominent
// thing after the title. It is the single highest-value sentence in each
// section, because the failure mode this page guards against is a reader
// filing wildfire and logistics away as two more small case studies.
//
// Deliberately NOT a client component. Nothing here is interactive, so it ships
// zero JavaScript — which matters on a page that already carries two client
// islands (the primary chain and the overlay diagram).
// ─────────────────────────────────────────────────────────────────────────────

function SupportingSystemSection({ system }: { system: SupportingSystem }) {
  return (
    <section
      id={system.id}
      aria-labelledby={`${system.id}-title`}
      className="scroll-mt-24 border-t border-neutral-200 bg-neutral-50 py-14 md:py-20"
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <header className="lg:col-span-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-neutral-300 bg-white px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.16em] text-neutral-600">
                {system.kicker}
              </span>
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.28em] text-neutral-400">
                {system.number}
              </span>
            </div>

            <h2
              id={`${system.id}-title`}
              className="mt-5 font-tiempos text-2xl font-bold leading-tight text-neutral-950 md:text-3xl"
            >
              {system.title}
            </h2>
            <p className="mt-3 text-sm font-semibold text-neutral-500">{system.role}</p>
            <p className="mt-5 text-base leading-relaxed text-neutral-600">{system.body}</p>

            <div className="mt-6 flex items-center gap-3">
              <EvidenceTierBadge tier={system.tier} />
              <p className="text-xs leading-relaxed text-neutral-500">{system.evidence}</p>
            </div>
          </header>

          <div className="lg:col-span-7">
            {/* The load-bearing block: why this is not its own case study. */}
            <div className="rounded-2xl border-l-4 border-neutral-900 bg-white p-5 md:p-6">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
                Why this is not a separate project
              </p>
              <p className="mt-3 text-base leading-relaxed text-neutral-800">{system.whyNotSeparate}</p>
            </div>

            <p className="mt-8 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
              What it touches
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {system.affects.map((item) => (
                <li key={item.label} className="rounded-xl border border-neutral-200 bg-white px-4 py-3">
                  <span className="block text-sm font-bold text-neutral-900">{item.label}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-neutral-600">{item.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SupportingSystems({ className = '' }: { className?: string }) {
  return (
    <div className={cn(className)}>
      {supportingSystems.map((system) => (
        <SupportingSystemSection key={system.id} system={system} />
      ))}
    </div>
  );
}
