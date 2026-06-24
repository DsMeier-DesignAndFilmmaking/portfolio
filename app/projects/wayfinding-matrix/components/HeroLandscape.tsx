import { Compass, MapPin, Mountain, Route, Wind } from 'lucide-react';
import { projectMetadata } from '../content';
import ProjectBreadcrumb from '@/components/ProjectBreadcrumb';

const contentBounds = 'container mx-auto px-6 md:px-8';

export default function HeroLandscape() {
  return (
    <section
      id="wayfinding-hero"
      className={`${contentBounds} mt-[100px] scroll-mt-20 pb-16 md:pb-24`}
      aria-labelledby="wayfinding-title"
      tabIndex={-1}
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-[3px] w-12 bg-emerald-700" aria-hidden="true" />
            <ProjectBreadcrumb projectId="wayfinding-matrix" />
          </div>

          <h1
            id="wayfinding-title"
            className="font-tiempos text-4xl font-bold leading-tight text-gray-950 md:text-6xl md:leading-tight"
          >
            {projectMetadata.title}.
            <span className="mt-4 block italic text-gray-500">
              {projectMetadata.subtitle}
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-600 md:text-xl">
            {projectMetadata.summary}
          </p>

          <p className="mt-7 max-w-xl border-l-2 border-emerald-700 pl-4 text-sm font-medium leading-relaxed text-neutral-700">
            A conceptual environmental operating system for calm guidance, guest
            autonomy, and accountable field response.
          </p>

          <div className="mt-7 flex flex-wrap gap-2" aria-label="Project classification">
            {[projectMetadata.practice, projectMetadata.status, projectMetadata.maturity].map((item) => (
              <span
                key={item}
                className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-neutral-600"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          <figure
            className="overflow-hidden rounded-[2rem] border border-emerald-950/10 bg-[#edf0e5] shadow-sm shadow-emerald-950/10"
            aria-describedby="wayfinding-landscape-summary"
          >
            <p id="wayfinding-landscape-summary" className="sr-only">
              A topographic route network connects a guest, changing weather, trail
              junctions, recovery points, and an operator station. The route changes from
              open to caution as exposure and guest effort increase.
            </p>

            <div className="relative min-h-[430px] overflow-hidden p-5 sm:hidden" aria-hidden="true">
              <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_center,transparent_0,transparent_22px,#446452_23px,transparent_24px)] [background-size:62px_42px]" />
              <div className="absolute inset-x-[-15%] bottom-[-3rem] h-64 rotate-[-7deg] rounded-[50%] bg-[#6f8666]" />
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-emerald-950/65">
                    Live route intelligence
                  </p>
                  <Wind className="h-4 w-4 text-emerald-900/60" />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  {[
                    ['Guest', 'Steady'],
                    ['Weather', 'Changing'],
                    ['Route', 'Exposed'],
                    ['Daylight', '2h 10m'],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl border border-emerald-950/10 bg-white/85 p-3 shadow-sm">
                      <p className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-neutral-600">
                        {label}
                      </p>
                      <p className="mt-1 text-xs font-bold text-emerald-950">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="relative mx-auto my-7 h-28 w-[86%]">
                  <div className="absolute left-2 right-2 top-1/2 h-1 -translate-y-1/2 rotate-[-8deg] rounded-full bg-emerald-950/35" />
                  {[
                    ['left-0 top-16', Compass],
                    ['left-[38%] top-9', MapPin],
                    ['right-0 top-0', Mountain],
                  ].map(([position, Icon], index) => {
                    const NodeIcon = Icon as typeof Compass;
                    return (
                      <div
                        key={index}
                        className={`absolute ${position} flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-emerald-800 text-white shadow-md`}
                      >
                        <NodeIcon className="h-4 w-4" />
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-2xl border border-amber-300 bg-amber-50/95 p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Route className="h-5 w-5 text-amber-800" />
                    <div>
                      <p className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-amber-800">
                        Guidance state // Prepare
                      </p>
                      <p className="mt-1 text-sm font-semibold text-neutral-800">
                        Recovery node ahead before exposed terrain.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <svg viewBox="0 0 760 620" className="hidden h-auto w-full sm:block" aria-hidden="true">
              <defs>
                <linearGradient id="wm-sky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#dce9df" />
                  <stop offset="100%" stopColor="#f5eedc" />
                </linearGradient>
                <linearGradient id="wm-land" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#a8b595" />
                  <stop offset="100%" stopColor="#526b58" />
                </linearGradient>
              </defs>
              <rect width="760" height="620" fill="url(#wm-sky)" />
              <circle cx="627" cy="105" r="45" fill="#edca79" opacity=".72" />
              <path d="M0 300C130 217 220 227 318 292c92 61 176-17 267-67 77-42 132-20 175 19v376H0Z" fill="#bdc7a7" />
              <path d="M0 389c128-83 226-72 331-9 101 60 210-10 294-57 60-34 105-20 135 7v290H0Z" fill="url(#wm-land)" />

              <g fill="none" stroke="#244b3b" opacity=".22">
                <path d="M22 355c125-72 225-58 322 2 100 62 218-6 386-80" />
                <path d="M15 382c128-67 225-50 321 8 102 62 225 3 405-76" />
                <path d="M8 412c134-61 229-43 324 14 108 65 237 13 419-69" />
                <path d="M2 445c139-57 238-35 333 21 112 66 242 22 424-63" />
                <path d="M-4 481c146-52 247-28 343 27 116 66 246 28 428-57" />
              </g>

              <path d="M92 498C168 443 205 389 277 367s125 17 174-31c45-44 68-111 139-137" fill="none" stroke="#f8f2db" strokeWidth="17" strokeLinecap="round" />
              <path d="M92 498C168 443 205 389 277 367s125 17 174-31c45-44 68-111 139-137" fill="none" stroke="#365f49" strokeWidth="3" strokeLinecap="round" strokeDasharray="7 8" />
              <path d="M277 367c-20-60 1-106 49-141" fill="none" stroke="#f8f2db" strokeWidth="13" strokeLinecap="round" />
              <path d="M277 367c-20-60 1-106 49-141" fill="none" stroke="#9a7628" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 7" />

              {[
                [92, 498, 'ENTRY', '#1f6b50'],
                [277, 367, 'DECISION NODE', '#9a7628'],
                [326, 226, 'RECOVERY', '#336f84'],
                [451, 336, 'RIDGE', '#9a7628'],
                [590, 199, 'RETURN', '#1f6b50'],
              ].map(([x, y, label, color]) => (
                <g key={String(label)}>
                  <circle cx={Number(x)} cy={Number(y)} r="12" fill="#fffdf6" stroke={String(color)} strokeWidth="4" />
                  <text x={Number(x)} y={Number(y) - 23} textAnchor="middle" fontSize="11" fontWeight="800" letterSpacing="1.4" fill="#244438">
                    {label}
                  </text>
                </g>
              ))}

              <g transform="translate(470 440)">
                <rect width="230" height="112" rx="20" fill="#fffdf6" stroke="#9a7628" strokeWidth="2" />
                <text x="22" y="31" fontSize="10" fontWeight="800" letterSpacing="1.6" fill="#8a691e">GUIDANCE STATE</text>
                <text x="22" y="59" fontSize="22" fontWeight="800" fill="#262626">Prepare</text>
                <text x="22" y="82" fontSize="12" fill="#595959">Exposed segment ahead.</text>
                <text x="22" y="99" fontSize="12" fill="#595959">Recovery route remains open.</text>
              </g>

              <g transform="translate(48 62)">
                <rect width="225" height="114" rx="20" fill="#ffffff" fillOpacity=".82" stroke="#244b3b" strokeOpacity=".16" />
                <text x="20" y="29" fontSize="10" fontWeight="800" letterSpacing="1.5" fill="#4d6659">LANDSCAPE STATE</text>
                <text x="20" y="55" fontSize="13" fontWeight="700" fill="#263b31">Guest effort: rising</text>
                <text x="20" y="77" fontSize="13" fontWeight="700" fill="#263b31">Weather: changing</text>
                <text x="20" y="99" fontSize="13" fontWeight="700" fill="#263b31">Daylight: 2h 10m</text>
              </g>
            </svg>

            <figcaption className="border-t border-emerald-950/10 bg-white/80 p-5 text-sm leading-relaxed text-neutral-600 md:p-6">
              The landscape becomes a quiet guidance surface: sensing remains in the
              background, while only the next meaningful choice moves into attention.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
