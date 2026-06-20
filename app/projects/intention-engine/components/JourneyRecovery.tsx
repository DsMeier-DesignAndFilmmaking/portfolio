import { ArrowDown, CloudRain, RefreshCcw } from 'lucide-react';
import { journeyStages } from '../content';
import { contentBounds, SectionHeading } from './shared';

export function GuestJourney() {
  return (
    <section id="guest-journey" aria-labelledby="guest-journey-title" className="scroll-mt-20 bg-white py-16 md:py-24">
      <div className={contentBounds}>
        <SectionHeading
          id="guest-journey-title"
          eyebrow="09 // Arrival-to-Departure Journey"
          title="The blueprint becomes a journey through environmental and service choreography."
          intro="Each stage names what the guest may need, what the environment can provide, and how hospitality should support without over-directing."
        />
        <ol className="space-y-4 xl:grid xl:grid-cols-4 xl:gap-4 xl:space-y-0">
          {journeyStages.map((stage, index) => (
            <li key={stage.stage} className="rounded-[1.4rem] border border-stone-200 bg-stone-50 p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-sm font-black text-emerald-800">{String(index + 1).padStart(2, '0')}</span>
                <span className="font-mono text-[9px] font-black uppercase tracking-[0.14em] text-stone-500">Journey stage</span>
              </div>
              <h3 className="mt-4 font-tiempos text-2xl font-bold text-neutral-950">{stage.stage}</h3>
              <dl className="mt-5 space-y-4">
                <div><dt className="font-mono text-[9px] font-black uppercase tracking-[0.13em] text-stone-600">Guest need</dt><dd className="mt-1.5 text-xs leading-relaxed text-neutral-700">{stage.guestNeed}</dd></div>
                <div><dt className="font-mono text-[9px] font-black uppercase tracking-[0.13em] text-emerald-800">Environmental role</dt><dd className="mt-1.5 text-xs leading-relaxed text-neutral-700">{stage.environmentalRole}</dd></div>
                <div><dt className="font-mono text-[9px] font-black uppercase tracking-[0.13em] text-amber-900">Service role</dt><dd className="mt-1.5 text-xs leading-relaxed text-neutral-700">{stage.serviceRole}</dd></div>
              </dl>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function ServiceRecovery() {
  const alternatives = [
    ['Scenic overlook', 'Preserves horizon, distance, and changed scale'],
    ['Guided reflection', 'Supports interpretation without requiring exposure'],
    ['Fire-circle discussion', 'Creates perspective through witnessed conversation'],
    ['Ridge drive', 'Retains elevation and reveal with lower physical demand'],
    ['Protected observation point', 'Offers weather-safe stillness and a long view'],
  ];
  return (
    <section id="service-recovery" aria-labelledby="service-recovery-title" className="scroll-mt-20 bg-emerald-950 py-16 text-white md:py-24">
      <div className={contentBounds}>
        <SectionHeading
          id="service-recovery-title"
          eyebrow="10 // Major Feature"
          title="Recover the intended transformation, not merely the canceled activity."
          intro="Traditional recovery searches for a logistical substitute. The Intention Engine returns to the blueprint and asks which other experience can preserve the meaning the guest was seeking."
          dark
        />
        <figure className="grid gap-5 lg:grid-cols-12" aria-describedby="service-recovery-summary">
          <p id="service-recovery-summary" className="sr-only">
            A guest seeking perspective loses a sunrise summit to weather. Instead of
            substituting another hike, the framework identifies several experiences capable
            of preserving perspective through different spatial, sensory, and social means.
          </p>
          <div className="space-y-3 lg:col-span-5">
            {[
              ['Guest intention', 'Recover perspective'],
              ['Original blueprint', 'Sunrise summit, exposed horizon, quiet arrival'],
              ['Disruption', 'Weather closes high-elevation access'],
              ['Invariant to preserve', 'Expansion, distance, reflection, changed proportion'],
            ].map(([label, value], index) => (
              <div key={label}>
                <article className={`rounded-2xl border p-5 ${
                  index === 2
                    ? 'border-amber-300/30 bg-amber-300/[0.08]'
                    : index === 3
                      ? 'border-emerald-300/30 bg-emerald-300/[0.09]'
                      : 'border-white/10 bg-white/[0.05]'
                }`}>
                  <div className="flex gap-3">
                    {index === 2 ? <CloudRain className="h-5 w-5 shrink-0 text-amber-200" aria-hidden="true" /> : <RefreshCcw className="h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />}
                    <div>
                      <p className="font-mono text-[10px] font-black uppercase tracking-[0.14em] text-stone-300">
                        {String(index + 1).padStart(2, '0')} / {label}
                      </p>
                      <p className="mt-2 text-sm font-semibold leading-relaxed text-white">{value}</p>
                    </div>
                  </div>
                </article>
                {index < 3 && <div className="flex justify-center py-1" aria-hidden="true"><ArrowDown className="h-4 w-4 text-white/25" /></div>}
              </div>
            ))}
          </div>
          <div className="rounded-[1.5rem] border border-amber-300/20 bg-amber-300/[0.08] p-6 lg:col-span-7 md:p-8">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-amber-200">Meaning-preserving alternatives</p>
            <h3 className="mt-4 font-tiempos text-3xl font-bold text-white">Different logistics. Same experiential intention.</h3>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {alternatives.map(([item, mechanism], index) => (
                <div key={item} className={`rounded-xl border border-white/10 bg-black/15 p-4 ${index === alternatives.length - 1 ? 'sm:col-span-2' : ''}`}>
                  <p className="font-mono text-[9px] font-black text-amber-200">{String(index + 1).padStart(2, '0')}</p>
                  <p className="mt-2 text-sm font-bold text-white">{item}</p>
                  <p className="mt-2 text-xs leading-relaxed text-stone-300">{mechanism}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 border-t border-white/10 pt-5 text-sm leading-relaxed text-stone-300">
              Recovery succeeds when the alternative still supports perspective—not when it merely occupies the same amount of time.
            </p>
          </div>
        </figure>
      </div>
    </section>
  );
}
