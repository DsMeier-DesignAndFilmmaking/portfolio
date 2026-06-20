import { BellRing, Eye, Lightbulb, MapPin, Radio, Watch } from 'lucide-react';
import { ambientSignals } from '../content';

const contentBounds = 'container mx-auto px-6 md:px-8';
const icons = [MapPin, Watch, Lightbulb, Radio];
const guidanceStates = [
  { label: 'Quiet', Icon: Eye },
  { label: 'Confirm', Icon: MapPin },
  { label: 'Prepare', Icon: BellRing },
  { label: 'Redirect', Icon: Radio },
  { label: 'Assist', Icon: Watch },
];

export default function AmbientGuidanceDiagram() {
  return (
    <section
      id="ambient-guidance"
      aria-labelledby="ambient-guidance-title"
      className="scroll-mt-20 bg-neutral-950 py-16 text-white md:py-24"
    >
      <div className={contentBounds}>
        <header className="mb-10 max-w-3xl md:mb-14">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.28em] text-emerald-300">
            08 // Ambient Guidance
          </p>
          <h2 id="ambient-guidance-title" className="mt-4 font-tiempos text-3xl font-bold leading-tight text-white md:text-5xl">
            Guidance should rise into attention only when the landscape asks for a choice.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-neutral-300 md:text-lg">
            The field interface uses a graduated language: remain quiet, confirm progress,
            prepare for change, present a recovery path, or make assistance explicit.
          </p>
        </header>

        <figure aria-describedby="ambient-guidance-summary">
          <p id="ambient-guidance-summary" className="sr-only">
            Four guidance channels—route nodes, wearable cues, environmental cues, and
            human handoffs—express increasing levels of urgency while preserving guest
            attention and human oversight.
          </p>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {ambientSignals.map((signal, index) => {
              const Icon = icons[index];
              return (
                <article key={signal.mode} className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-300">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-[10px] font-black text-neutral-400">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-5 font-tiempos text-2xl font-bold text-white">{signal.mode}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-300">{signal.purpose}</p>
                  <ul className="mt-5 space-y-2">
                    {signal.examples.map((example) => (
                      <li key={example} className="flex gap-2 text-xs leading-relaxed text-neutral-300">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" aria-hidden="true" />
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 border-t border-white/10 pt-4 text-xs font-semibold leading-relaxed text-amber-200">
                    {signal.boundary}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-6 grid gap-3 rounded-[1.5rem] border border-emerald-300/20 bg-emerald-300/[0.08] p-5 sm:grid-cols-5 sm:items-center md:p-6">
            {guidanceStates.map(({ label, Icon }, index) => {
              return (
                <div key={label} className="flex items-center gap-3 sm:flex-col sm:text-center">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
                    index < 2
                      ? 'border-emerald-300/30 bg-emerald-300/10 text-emerald-300'
                      : index < 4
                        ? 'border-amber-300/30 bg-amber-300/10 text-amber-200'
                        : 'border-rose-300/30 bg-rose-300/10 text-rose-200'
                  }`}>
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <p className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-neutral-200">{label}</p>
                </div>
              );
            })}
          </div>

          <figcaption className="mt-5 text-sm leading-relaxed text-neutral-400">
            Urgency changes the clarity and accountability of the signal—not the amount of
            visual noise placed in the landscape.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
