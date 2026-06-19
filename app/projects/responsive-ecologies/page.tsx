import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  Activity,
  ArrowDown,
  ArrowRight,
  Flame,
  GitBranch,
  Map,
  Mountain,
  Network,
  Route,
  ShieldCheck,
  Sprout,
  Trees,
  Waves,
  Wrench,
} from 'lucide-react';
import { PageNavIndicator } from '@/components/PageNavIndicator';
import ResponsiveEcologiesProjectHeader from './ProjectHeader';
import {
  artifactOrigins,
  decisionDomains,
  decisionHierarchy,
  decisionProblems,
  projectMetadata,
  sectionNavigation,
  stewardshipPrinciples,
  systemLoop,
  type ArtifactOrigin,
  type DecisionDomain,
  type DecisionProblem,
  type SystemLoopStep,
} from './content';

const contentBounds = 'container mx-auto px-6 md:px-8';

const artifactToneClasses: Record<ArtifactOrigin['tone'], string> = {
  cyan: 'border-cyan-200 bg-cyan-50/60 text-cyan-800',
  emerald: 'border-emerald-200 bg-emerald-50/60 text-emerald-800',
  stone: 'border-stone-200 bg-stone-50 text-stone-700',
};

const loopToneClasses: Record<SystemLoopStep['tone'], string> = {
  sky: 'border-sky-200 bg-sky-50 text-sky-800',
  teal: 'border-teal-200 bg-teal-50 text-teal-800',
  amber: 'border-amber-200 bg-amber-50 text-amber-800',
  emerald: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  violet: 'border-violet-200 bg-violet-50 text-violet-800',
};

const problemIcons = {
  signals: Activity,
  coordination: Network,
  authority: ShieldCheck,
} satisfies Record<DecisionProblem['icon'], typeof Activity>;

const domainIcons = {
  terrain: Mountain,
  water: Waves,
  habitat: Trees,
  fire: Flame,
  access: Route,
  operations: Wrench,
} satisfies Record<DecisionDomain['icon'], typeof Mountain>;

function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  dark = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  dark?: boolean;
}) {
  return (
    <header className="mb-10 max-w-3xl md:mb-14">
      <p
        className={`font-mono text-[10px] font-black uppercase tracking-[0.28em] ${
          dark ? 'text-emerald-300' : 'text-emerald-700'
        }`}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-4 font-tiempos text-3xl font-bold leading-tight md:text-5xl ${
          dark ? 'text-white' : 'text-neutral-950'
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-5 text-base leading-relaxed md:text-lg ${
          dark ? 'text-neutral-300' : 'text-neutral-600'
        }`}
      >
        {intro}
      </p>
    </header>
  );
}

function ConceptTag({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] ${
        dark
          ? 'border-white/15 bg-white/[0.06] text-neutral-300'
          : 'border-neutral-200 bg-white text-neutral-600'
      }`}
    >
      {children}
    </span>
  );
}

function HeroLandscape() {
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

function ProjectFrame() {
  return (
    <section
      id="project-frame"
      aria-labelledby="project-frame-title"
      className="bg-neutral-950 py-16 text-white md:py-24"
    >
      <div className={contentBounds}>
        <SectionHeading
          id="project-frame-title"
          eyebrow="01 // Project Frame"
          title="A system for coordinated stewardship, not autonomous control."
          intro={projectMetadata.thesis}
          dark
        />

        <div className="grid gap-5 lg:grid-cols-12">
          <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 md:p-8 lg:col-span-5">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-emerald-300">
              Practice position
            </p>
            <h3 className="mt-4 font-tiempos text-2xl font-bold leading-tight text-white md:text-3xl">
              The OS becomes an operating design method.
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-neutral-300">
              Responsive Ecologies connects research, signals, decision models, system
              artifacts, authority, and recovery. Earlier confidence and hospitality
              systems become a framework for accountable care across living landscapes.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {projectMetadata.audiences.map((audience) => (
                <ConceptTag key={audience} dark>
                  {audience}
                </ConceptTag>
              ))}
            </div>
          </article>

          <div className="grid gap-5 md:grid-cols-2 lg:col-span-7">
            <article className="rounded-[1.5rem] border border-emerald-300/20 bg-emerald-300/10 p-6">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">
                Current evidence supports
              </p>
              <ul className="mt-5 space-y-3">
                {projectMetadata.evidenceBoundary.supported.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-neutral-200">
                    <Sprout className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-[1.5rem] border border-amber-300/20 bg-amber-300/[0.07] p-6">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-amber-300">
                This phase does not claim
              </p>
              <ul className="mt-5 space-y-3">
                {projectMetadata.evidenceBoundary.notClaimed.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-neutral-200">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArtifactOrigins() {
  return (
    <section
      id="artifact-origins"
      aria-labelledby="artifact-origins-title"
      className="bg-[#f5f3ec] py-16 md:py-24"
    >
      <div className={contentBounds}>
        <SectionHeading
          id="artifact-origins-title"
          eyebrow="02 // Artifact Origins"
          title="Responsive Ecologies evolves existing systems instead of starting from zero."
          intro="The project synthesizes proven patterns and inventoried artifacts from two public case studies with the research and traceability structure of the Environmental Systems Design OS."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {artifactOrigins.map((origin) => (
            <article
              key={origin.id}
              className="flex h-full flex-col rounded-[1.5rem] border border-stone-200 bg-white p-6 md:p-7"
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-1 h-3 w-3 shrink-0 rounded-full border ${artifactToneClasses[origin.tone]}`}
                  aria-hidden="true"
                />
                <div>
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-stone-500">
                    Source system
                  </p>
                  <h3 className="mt-2 font-tiempos text-2xl font-bold leading-tight text-neutral-950">
                    {origin.project}
                  </h3>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-neutral-600">
                {origin.contribution}
              </p>

              <div className="mt-6 border-t border-stone-200 pt-5">
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-stone-500">
                  Inherited artifacts
                </p>
                <ul className="mt-3 space-y-2">
                  {origin.artifacts.map((artifact) => (
                    <li key={artifact} className="flex gap-2 text-sm text-neutral-700">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700" aria-hidden="true" />
                      <span>{artifact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`mt-6 rounded-xl border p-4 text-sm leading-relaxed ${artifactToneClasses[origin.tone]}`}>
                <span className="font-bold">Evolution: </span>
                {origin.evolution}
              </div>

              {origin.projectHref && (
                <Link
                  href={origin.projectHref}
                  className="mt-6 inline-flex min-h-[44px] items-center gap-2 self-start text-sm font-semibold text-emerald-800 transition-colors hover:text-emerald-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-4"
                >
                  Explore source project
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-4 rounded-[1.5rem] border border-emerald-900/10 bg-emerald-950 p-6 text-white md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center md:p-8">
          <div>
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">
              Research
            </p>
            <p className="mt-2 text-sm text-neutral-300">Observations and evidence limits</p>
          </div>
          <ArrowRight className="hidden h-5 w-5 text-emerald-300 md:block" aria-hidden="true" />
          <div>
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">
              System artifacts
            </p>
            <p className="mt-2 text-sm text-neutral-300">Reusable models and decision structures</p>
          </div>
          <ArrowRight className="hidden h-5 w-5 text-emerald-300 md:block" aria-hidden="true" />
          <div>
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">
              Responsive Ecologies
            </p>
            <p className="mt-2 text-sm text-neutral-300">A coherent stewardship system</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DecisionProblemSection() {
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

function DecisionHierarchy() {
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

function StewardshipPrinciples() {
  return (
    <section
      id="stewardship-principles"
      aria-labelledby="stewardship-principles-title"
      className="bg-emerald-950 py-16 text-white md:py-24"
    >
      <div className={contentBounds}>
        <SectionHeading
          id="stewardship-principles-title"
          eyebrow="05 // Stewardship Principles"
          title="The system is designed around care, accountability, and graceful uncertainty."
          intro="These principles govern how environmental intelligence becomes guidance and how guidance becomes action."
          dark
        />

        <div className="grid gap-5 md:grid-cols-2">
          {stewardshipPrinciples.map((principle) => (
            <article
              key={principle.id}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 md:p-8"
            >
              <p className="font-mono text-xl font-bold text-emerald-300">
                {principle.number}
              </p>
              <h3 className="mt-5 font-tiempos text-2xl font-bold leading-tight text-white">
                {principle.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-neutral-300">
                {principle.description}
              </p>
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-emerald-300">
                  System implication
                </p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-200">
                  {principle.implication}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SystemLoop() {
  return (
    <section
      id="system-loop"
      aria-labelledby="system-loop-title"
      className="bg-white py-16 md:py-24"
    >
      <div className={contentBounds}>
        <SectionHeading
          id="system-loop-title"
          eyebrow="06 // System Loop"
          title="Signals move through interpretation and authority before they become action."
          intro="The core loop separates sensing, modeling, authorization, and stewardship so that no single agent or data source is mistaken for the whole decision."
        />

        <figure
          className="rounded-[1.75rem] border border-neutral-200 bg-neutral-50 p-4 md:p-7"
          aria-describedby="system-loop-summary"
        >
          <p id="system-loop-summary" className="sr-only">
            The Responsive Ecologies system loop senses environmental and operational
            conditions, interprets their meaning, models response paths, routes a decision
            to accountable human authority, and supports stewardship action. Observed
            outcomes return to the loop as evidence and learning.
          </p>

          <div className="space-y-3 md:hidden">
            {systemLoop.map((step, index) => (
              <div key={step.id}>
                <article className={`rounded-2xl border p-5 ${loopToneClasses[step.tone]}`}>
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em]">
                    {step.label}
                  </p>
                  <h3 className="mt-3 font-tiempos text-xl font-bold leading-tight text-neutral-950">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {step.description}
                  </p>
                  <p className="mt-4 border-t border-current/15 pt-3 text-xs font-bold uppercase tracking-[0.1em]">
                    Output: {step.output}
                  </p>
                </article>
                {index < systemLoop.length - 1 && (
                  <div className="flex justify-center py-2" aria-hidden="true">
                    <ArrowDown className="h-5 w-5 text-neutral-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden gap-3 md:grid md:grid-cols-2 xl:grid-cols-5">
            {systemLoop.map((step) => (
              <article
                key={step.id}
                className={`rounded-2xl border p-5 ${
                  step.id === 'steward' ? 'md:col-span-2 xl:col-span-1' : ''
                } ${loopToneClasses[step.tone]}`}
              >
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em]">
                  {step.label}
                </p>
                <h3 className="mt-4 font-tiempos text-xl font-bold leading-tight text-neutral-950">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {step.description}
                </p>
                <p className="mt-5 border-t border-current/15 pt-3 text-[10px] font-bold uppercase tracking-[0.1em]">
                  {step.output}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-3 rounded-2xl border border-violet-200 bg-violet-50 p-5 md:grid-cols-[auto_1fr] md:items-center">
            <GitBranch className="h-5 w-5 text-violet-700" aria-hidden="true" />
            <div>
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-violet-700">
                Recovery and learning loop
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                Changed conditions, weak evidence, rejected recommendations, and field
                outcomes return to interpretation. The system can revise its path without
                hiding why the original decision changed.
              </p>
            </div>
          </div>

          <figcaption className="mt-5 text-sm leading-relaxed text-neutral-500">
            Sequence, ownership, and recovery remain visible without requiring animation
            or interaction.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function DomainAtlas() {
  return (
    <section
      id="domain-atlas"
      aria-labelledby="domain-atlas-title"
      className="bg-[#f5f3ec] py-16 md:py-24"
    >
      <div className={contentBounds}>
        <SectionHeading
          id="domain-atlas-title"
          eyebrow="07 // Domain Atlas"
          title="One landscape contains several interdependent decision domains."
          intro="Responsive Ecologies organizes the system around stewardship objectives, not software features. Each domain names the signals, decisions, and human stewards needed to care for a living place."
        />

        <div className="mb-7 flex flex-wrap gap-2" aria-label="Atlas legend">
          <ConceptTag>Signals describe conditions</ConceptTag>
          <ConceptTag>Decisions define responses</ConceptTag>
          <ConceptTag>Stewards retain authority</ConceptTag>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {decisionDomains.map((domain) => {
            const Icon = domainIcons[domain.icon];
            return (
              <article
                key={domain.id}
                className="rounded-[1.5rem] border border-stone-200 bg-white p-6 md:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-800">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-[9px] font-black uppercase tracking-[0.16em] text-stone-500">
                    Decision domain
                  </span>
                </div>

                <h3 className="mt-6 font-tiempos text-2xl font-bold leading-tight text-neutral-950">
                  {domain.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                  {domain.objective}
                </p>

                <div className="mt-6">
                  <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-sky-700">
                    Signals
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {domain.signals.map((signal) => (
                      <span
                        key={signal}
                        className="rounded-full border border-sky-100 bg-sky-50 px-2.5 py-1 text-[10px] font-bold text-sky-800"
                      >
                        {signal}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-amber-700">
                    Decisions
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {domain.decisions.map((decision) => (
                      <span
                        key={decision}
                        className="rounded-full border border-amber-100 bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-800"
                      >
                        {decision}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-stone-200 pt-5">
                  <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-emerald-700">
                    Stewardship owner
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-neutral-800">
                    {domain.steward}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <aside className="mt-8 rounded-[1.5rem] border border-emerald-900/10 bg-white p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-start">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-950 text-emerald-200">
              <Map className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">
                Current system boundary
              </p>
              <h3 className="mt-3 font-tiempos text-2xl font-bold leading-tight text-neutral-950">
                The atlas establishes the shared decision landscape.
              </h3>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-neutral-600">
                This view focuses on the objectives, signals, decisions, and accountable
                stewards that must align before deeper scenario modeling can be credible.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default function ResponsiveEcologiesPage() {
  return (
    <div className="responsive-ecologies-root min-h-screen overflow-x-hidden bg-white text-neutral-900 selection:bg-emerald-200/50">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .responsive-ecologies-root,
          .responsive-ecologies-root * {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
      <a
        href="#responsive-ecologies-hero"
        className="sr-only fixed left-4 top-4 z-[140] rounded-md bg-white px-4 py-3 text-sm font-semibold text-neutral-950 shadow-lg focus:not-sr-only focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
      >
        Skip to Responsive Ecologies content
      </a>
      <PageNavIndicator sections={[...sectionNavigation]} showDotsOnDesktop />
      <ResponsiveEcologiesProjectHeader />
      <HeroLandscape />
      <ProjectFrame />
      <ArtifactOrigins />
      <DecisionProblemSection />
      <DecisionHierarchy />
      <StewardshipPrinciples />
      <SystemLoop />
      <DomainAtlas />
    </div>
  );
}
