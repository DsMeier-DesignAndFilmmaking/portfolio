import { ArrowDown, Compass, Footprints, Leaf, Waves } from 'lucide-react';
import { projectMetadata } from '../content';
import { contentBounds, Tag } from './shared';

const experienceLayers = [
  { label: 'Landscape', Icon: Compass, value: 'Elevation + horizon' },
  { label: 'Movement', Icon: Footprints, value: 'Gradual ascent' },
  { label: 'Senses', Icon: Waves, value: 'Wind + distance' },
  { label: 'Service', Icon: Leaf, value: 'Optional guidance' },
];

export default function HeroLandscape() {
  return (
    <section
      id="intention-hero"
      aria-labelledby="intention-title"
      tabIndex={-1}
      className={`${contentBounds} mt-[100px] scroll-mt-20 pb-16 md:pb-24`}
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-[3px] w-12 bg-emerald-800" aria-hidden="true" />
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-neutral-600">
              {projectMetadata.classification}
            </p>
          </div>
          <h1 id="intention-title" className="font-tiempos text-4xl font-bold leading-tight text-neutral-950 md:text-6xl md:leading-tight">
            Designing Experiences
            <span className="mt-3 block italic text-stone-500">Around Human Intent.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-700 md:text-xl">
            {projectMetadata.summary}
          </p>
          <p className="mt-7 max-w-xl border-l-2 border-emerald-800 pl-4 text-sm font-medium leading-relaxed text-neutral-700">
            {projectMetadata.thesis}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            <Tag>{projectMetadata.practice}</Tag>
            <Tag>{projectMetadata.status}</Tag>
            <Tag>{projectMetadata.maturity}</Tag>
          </div>
        </div>

        <figure className="overflow-hidden rounded-[2rem] border border-stone-200 bg-[#eee9dc] shadow-sm" aria-describedby="intention-landscape-summary">
          <p id="intention-landscape-summary" className="sr-only">
            A layered landscape sequence transforms a guest intention into spatial,
            sensory, social, and service conditions across an environmental journey.
          </p>
          <div className="relative min-h-[460px] overflow-hidden p-5 sm:p-7" aria-hidden="true">
            <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_center,transparent_0,transparent_24px,#58715f_25px,transparent_26px)] [background-size:72px_48px]" />
            <div className="absolute inset-x-[-15%] bottom-[-7rem] h-72 rotate-[-6deg] rounded-[50%] bg-[#71866b]" />
            <div className="absolute inset-x-[-8%] bottom-[-10rem] h-60 rotate-[5deg] rounded-[50%] bg-[#435d4d]" />
            <div className="relative z-10">
              <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-emerald-950/70">
                Transformation sequence
              </p>
              <div className="mt-5 rounded-2xl border border-stone-900/10 bg-white/90 p-4 shadow-sm">
                <p className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-stone-600">Self-described intention</p>
                <p className="mt-2 font-tiempos text-xl font-bold text-neutral-950">“I need perspective.”</p>
              </div>
              <div className="flex justify-center py-3"><ArrowDown className="h-4 w-4 text-emerald-900/50" /></div>
              <div className="grid grid-cols-2 gap-3">
                {experienceLayers.map(({ label, Icon, value }) => {
                  return (
                    <div key={label} className="rounded-2xl border border-white/50 bg-white/80 p-3 shadow-sm">
                      <Icon className="h-4 w-4 text-emerald-800" aria-hidden="true" />
                      <p className="mt-3 font-mono text-[9px] font-black uppercase tracking-[0.13em] text-stone-700">{label}</p>
                      <p className="mt-1 text-xs font-bold text-neutral-900">{value}</p>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-center py-3"><ArrowDown className="h-4 w-4 text-amber-900/50" /></div>
              <div className="rounded-2xl border border-amber-300 bg-amber-50/95 p-4 shadow-sm">
                <p className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-amber-900">Desired transformation</p>
                <p className="mt-2 font-tiempos text-xl font-bold text-neutral-950">Narrowed → expansive</p>
              </div>
            </div>
          </div>
          <figcaption className="border-t border-stone-200 bg-white/85 p-5 text-sm leading-relaxed text-neutral-600 md:p-6">
            The project treats landscape, hospitality, and sensory composition as materials
            for supporting a desired change—not as inventory to be filtered.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
