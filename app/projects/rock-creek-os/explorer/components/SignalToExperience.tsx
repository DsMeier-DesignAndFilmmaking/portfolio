import { cn, toneStyles } from '../../components/diagram-primitives';
import { signalToExperience } from '../content/explorer-data';

// ─────────────────────────────────────────────────────────────────────────────
// Sense → Interpret → Adapt → Experience, on the dark canvas.
//
// The dark band is doing structural work, not decoration: this page runs long,
// and the inversion marks the pivot from "here is the problem" to "here is how
// a system would answer it." It also gives the design principle — the page's
// actual thesis — a surface nothing else competes with.
//
// Four stages laid out as a 4-column grid at lg, stacked below. Stacked is the
// honest mobile reading anyway: the stages are sequential, and a column is what
// sequence looks like on a phone. Connector chevrons are horizontal at lg and
// vertical below, so the direction of flow survives the re-layout.
//
// Static by design — no client JavaScript.
// ─────────────────────────────────────────────────────────────────────────────

export function SignalToExperience() {
  const { stages } = signalToExperience;

  return (
    <section
      id={signalToExperience.id}
      aria-labelledby={`${signalToExperience.id}-title`}
      className="scroll-mt-24 bg-neutral-950 py-16 md:py-28"
    >
      <div className="container mx-auto px-6 md:px-8">
        <header className="mb-12 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.28em] text-rockcreek-300">
              {signalToExperience.kicker}
            </span>
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.28em] text-neutral-600">
              {signalToExperience.number}
            </span>
          </div>
          <h2
            id={`${signalToExperience.id}-title`}
            className="mt-5 font-tiempos text-3xl font-bold leading-tight text-white md:text-5xl md:leading-tight"
          >
            {signalToExperience.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-neutral-400 md:text-lg">
            {signalToExperience.intro}
          </p>
        </header>

        <ol className="grid gap-4 lg:grid-cols-4 lg:gap-3" aria-label="Adaptive system stages">
          {stages.map((stage, index) => {
            const tone = toneStyles[stage.tone];
            return (
              <li key={stage.id} className="relative flex flex-col">
                <div className="flex h-full flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-900 p-5 md:p-6">
                  <div>
                    <span className="flex items-center gap-2">
                      <span className={cn('h-2 w-2 shrink-0 rounded-full', tone.dot)} aria-hidden="true" />
                      <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
                        {stage.number}
                      </span>
                    </span>
                    <h3 className="mt-3 font-tiempos text-2xl font-bold leading-tight text-white">
                      {stage.label}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-400">{stage.summary}</p>
                  </div>

                  {/* Render items safely if present in data model */}
                  {stage.items && stage.items.length > 0 && (
                    <ul className="mt-4 space-y-1.5 border-t border-neutral-800 pt-4">
                      {stage.items.map((item) => (
                        <li key={item} className="text-xs leading-relaxed text-neutral-500">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Flow direction: down between stacked cards, right at lg. */}
                {index < stages.length - 1 && (
                  <span
                    className="flex justify-center py-2 text-neutral-700 lg:absolute lg:-right-2.5 lg:top-1/2 lg:z-10 lg:py-0"
                    aria-hidden="true"
                  >
                    <span className="lg:hidden">▼</span>
                    <span className="hidden lg:inline">▶</span>
                  </span>
                )}
              </li>
            );
          })}
        </ol>

        {/* The thesis. */}
        {/* `rockcreek` tops out at 900 in tailwind.config.js — no 950 step. */}
        <div className="mt-12 rounded-[2rem] border border-rockcreek-800 bg-rockcreek-900/30 p-6 md:p-10">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-rockcreek-300">
            Core design principle
          </p>
          <p className="mt-4 font-tiempos text-2xl font-bold leading-tight text-white md:text-4xl md:leading-tight">
            {signalToExperience.principle}
          </p>
          {signalToExperience.principleNote && (
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-neutral-400 md:text-base">
              {signalToExperience.principleNote}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}