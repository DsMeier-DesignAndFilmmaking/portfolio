import { ArrowRight } from 'lucide-react';
import { projectMetadata } from '../content';
import { ConceptTag, contentBounds } from './shared';

export default function HeroLandscape() {
  return (
    <section
      id="responsive-ecologies-hero"
      className={`${contentBounds} mt-[100px] pb-16 md:pb-24`}
      aria-labelledby="responsive-ecologies-title"
      tabIndex={-1}
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-[3px] w-12 bg-emerald-700" aria-hidden="true" />
            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-neutral-500">
              {projectMetadata.classification}
            </p>
          </div>

          <h1
            id="responsive-ecologies-title"
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
            Emerging from the Environmental Systems Design OS as its first flagship
            synthesis project.
          </p>

          <div className="mt-7 flex flex-wrap gap-2" aria-label="Project classification">
            <ConceptTag>{projectMetadata.practice}</ConceptTag>
            <ConceptTag>{projectMetadata.status}</ConceptTag>
            <ConceptTag>{projectMetadata.maturity}</ConceptTag>
          </div>
        </div>

        <div className="lg:col-span-6">
          <figure
            className="isolate-clip rounded-[2rem] border border-emerald-950/10 bg-[#edf1e8] shadow-sm shadow-emerald-950/10"
            aria-labelledby="responsive-landscape-summary"
          >
            <p id="responsive-landscape-summary" className="sr-only">
              Environmental signals from weather, terrain, water, habitat, and human use
              move through interpretation and an explicit human authority gate before
              coordinated stewardship action. Outcomes return as learning.
            </p>

            <div className="relative min-h-[430px] overflow-hidden bg-[#edf1e8] p-5 sm:hidden" aria-hidden="true">
              <div className="absolute inset-x-0 bottom-0 h-44 rounded-t-[55%] bg-[#8da286]" />
              <div className="absolute inset-x-[-12%] bottom-[-3rem] h-40 rotate-[-4deg] rounded-[50%] bg-[#536d59]" />
              <div className="relative z-10">
                <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-emerald-900/65">
                  Living landscape signals
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {['Weather', 'Terrain', 'Water', 'Habitat'].map((signal) => (
                    <div
                      key={signal}
                      className="rounded-xl border border-emerald-950/10 bg-white/85 px-3 py-2.5 text-xs font-bold text-emerald-950 shadow-sm backdrop-blur-sm"
                    >
                      {signal}
                    </div>
                  ))}
                </div>

                <div className="mx-auto my-3 h-5 w-px bg-emerald-900/30" />

                <div className="rounded-2xl border border-emerald-900/15 bg-white/95 p-4 shadow-sm">
                  <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-emerald-800">
                    Interpret
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-neutral-800">
                    Establish what changed and why it matters.
                  </p>
                </div>

                <div className="mx-auto my-3 h-5 w-px bg-amber-800/30" />

                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                  <div className="rounded-2xl border border-amber-300 bg-amber-50 p-3">
                    <p className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-amber-800">
                      Authority
                    </p>
                    <p className="mt-1 text-xs font-semibold leading-snug text-neutral-800">
                      Human judgment
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-emerald-950/45" />
                  <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-3">
                    <p className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-emerald-800">
                      Steward
                    </p>
                    <p className="mt-1 text-xs font-semibold leading-snug text-neutral-800">
                      Act and learn
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <svg
              viewBox="0 0 720 620"
              aria-hidden="true"
              className="hidden h-auto w-full sm:block"
            >
              <defs>
                <linearGradient id="re-sky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#dce9e3" />
                  <stop offset="100%" stopColor="#f5f2e8" />
                </linearGradient>
                <linearGradient id="re-land" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#90a98d" />
                  <stop offset="100%" stopColor="#506b58" />
                </linearGradient>
              </defs>

              <rect width="720" height="620" fill="url(#re-sky)" />
              <circle cx="590" cy="110" r="48" fill="#f4d59a" opacity="0.75" />
              <path
                d="M0 286 C125 215 205 230 302 282 C382 324 449 287 525 238 C602 188 665 199 720 237 V620 H0Z"
                fill="#bdc9ac"
              />
              <path
                d="M0 360 C110 281 213 286 305 346 C397 406 489 334 575 287 C641 251 688 266 720 294 V620 H0Z"
                fill="url(#re-land)"
              />
              <path
                d="M-20 492 C117 426 228 447 337 496 C444 544 568 487 745 421"
                fill="none"
                stroke="#dbe9ea"
                strokeWidth="34"
                strokeLinecap="round"
                opacity="0.92"
              />
              <path
                d="M-20 492 C117 426 228 447 337 496 C444 544 568 487 745 421"
                fill="none"
                stroke="#759aa0"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.65"
              />

              <g fill="none" stroke="#173e32" strokeLinecap="round" opacity="0.28">
                <path d="M46 393 C169 322 256 346 340 390 C435 441 536 354 678 318" />
                <path d="M35 414 C164 348 250 370 333 412 C429 461 548 377 690 342" />
                <path d="M28 438 C158 381 241 395 322 434 C421 482 550 405 702 369" />
              </g>

              <g>
                {[
                  [100, 212, 'WEATHER'],
                  [202, 389, 'TERRAIN'],
                  [370, 480, 'WATER'],
                  [528, 307, 'HABITAT'],
                  [628, 405, 'USE'],
                ].map(([x, y, label]) => (
                  <g key={label}>
                    <circle cx={x} cy={y} r="9" fill="#f8faf7" stroke="#1f6b50" strokeWidth="3" />
                    <text
                      x={x}
                      y={Number(y) - 18}
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="700"
                      letterSpacing="1.6"
                      fill="#234438"
                    >
                      {label}
                    </text>
                  </g>
                ))}
              </g>

              <g fill="none" stroke="#1f6b50" strokeWidth="2" strokeDasharray="5 7" opacity="0.65">
                <path d="M100 222 C142 265 194 270 282 281" />
                <path d="M202 379 C230 341 250 310 282 291" />
                <path d="M370 470 C351 397 334 333 307 300" />
                <path d="M528 297 C454 278 386 276 322 284" />
                <path d="M628 395 C528 344 420 307 322 291" />
              </g>

              <g>
                <rect x="262" y="254" width="102" height="62" rx="18" fill="#f8faf7" stroke="#1f6b50" strokeWidth="2" />
                <text x="313" y="279" textAnchor="middle" fontSize="12" fontWeight="700" letterSpacing="1.4" fill="#1f6b50">
                  INTERPRET
                </text>
                <text x="313" y="299" textAnchor="middle" fontSize="12" fill="#4b635a">
                  establish meaning
                </text>
              </g>

              <path d="M364 285 H432" stroke="#7a6633" strokeWidth="2.5" />
              <path d="M422 278 L433 285 L422 292" fill="none" stroke="#7a6633" strokeWidth="2.5" />

              <g>
                <rect x="433" y="246" width="118" height="78" rx="18" fill="#fff8e6" stroke="#9a7628" strokeWidth="2" />
                <text x="492" y="273" textAnchor="middle" fontSize="12" fontWeight="700" letterSpacing="1.4" fill="#7a5c1d">
                  AUTHORITY
                </text>
                <text x="492" y="294" textAnchor="middle" fontSize="12" fill="#675b3d">
                  human judgment
                </text>
                <text x="492" y="310" textAnchor="middle" fontSize="12" fill="#675b3d">
                  remains visible
                </text>
              </g>

              <path d="M551 285 H606" stroke="#1f6b50" strokeWidth="2.5" />
              <path d="M596 278 L607 285 L596 292" fill="none" stroke="#1f6b50" strokeWidth="2.5" />

              <g>
                <circle cx="640" cy="285" r="34" fill="#dcebdc" stroke="#1f6b50" strokeWidth="2" />
                <text x="640" y="282" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="1.1" fill="#1f6b50">
                  STEWARD
                </text>
                <text x="640" y="299" textAnchor="middle" fontSize="11" fill="#435c51">
                  act + learn
                </text>
              </g>

              <path
                d="M640 321 C628 377 543 397 479 372 C414 347 365 330 311 316"
                fill="none"
                stroke="#6a4f89"
                strokeWidth="2"
                strokeDasharray="6 7"
              />
              <text x="500" y="397" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="1.4" fill="#6a4f89">
                OBSERVE + RECOVER + LEARN
              </text>
            </svg>
            <figcaption className="border-t border-emerald-950/10 bg-white/80 p-5 text-sm leading-relaxed text-neutral-600 md:p-6">
              Environmental intelligence becomes useful only when signals are interpreted,
              authority is explicit, and the effects of action return to the stewardship loop.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
