// Statically-rendered services route. Composes sections; all copy lives in ./content.
// Uses the shared practice nav (PracticeNav) so the header matches the practice/project
// pages; the global footer still comes from the root layout (ConditionalFooter).
import Link from 'next/link';
import { ArrowRight, Check, X } from 'lucide-react';
import PracticeNav from '@/components/PracticeNav';
import {
  hero,
  engagements,
  process,
  fit,
  closer,
} from './content';

const contentBounds = 'container mx-auto px-6 md:px-8';

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={`font-mono text-[10px] font-black uppercase tracking-[0.3em] ${
        dark ? 'text-amber-300' : 'text-amber-700'
      }`}
    >
      {children}
    </p>
  );
}

export default function ServicesPage() {
  return (
    <div className="services-root min-h-screen overflow-x-hidden bg-white text-neutral-900 selection:bg-amber-200/50">
      <a
        href="#services-hero"
        className="sr-only fixed left-4 top-4 z-[140] rounded-md bg-white px-4 py-3 text-sm font-semibold text-neutral-950 shadow-lg focus:not-sr-only focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
      >
        Skip to services content
      </a>

      <PracticeNav />

      {/* HERO — Claim */}
      <section
        id="services-hero"
        aria-labelledby="services-hero-title"
        className="mt-[100px] border-b border-neutral-100 pb-16 md:pb-24"
      >
        <div className={contentBounds}>
          <div className="max-w-3xl">
            <Eyebrow>{hero.kicker}</Eyebrow>
            <h1 className="mt-4 font-tiempos text-4xl font-bold leading-[1.05] text-neutral-950 md:text-6xl">
              {hero.title}
            </h1>
            <p className="mt-5 font-tiempos text-xl italic text-neutral-500 md:text-2xl">
              {hero.deck}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
              {hero.lede}
            </p>
            <a
              href={hero.ctaHref}
              className="mt-9 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-neutral-950 px-6 py-3 font-semibold text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2"
            >
              {hero.ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* 01 — Definition: the three engagements */}
      <section
        id="engagements"
        aria-labelledby="engagements-title"
        className="py-16 md:py-28"
      >
        <div className={contentBounds}>
          <header className="mb-10 max-w-3xl md:mb-14">
            <Eyebrow>01 // The Engagements</Eyebrow>
            <h2
              id="engagements-title"
              className="mt-4 font-tiempos text-3xl font-bold leading-tight text-neutral-950 md:text-5xl"
            >
              Three ways the practice resolves a systems problem.
            </h2>
          </header>

          <div className="grid gap-6 md:grid-cols-3">
            {engagements.map((e) => (
              <article
                key={e.no}
                className="flex flex-col rounded-2xl border border-neutral-200 p-6 shadow-sm md:p-8"
              >
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-amber-700">
                  {e.no}
                </span>
                <h3 className="mt-3 font-tiempos text-2xl font-bold leading-tight text-neutral-950">
                  {e.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {e.body}
                </p>
                <dl className="mt-6 space-y-4 border-t border-neutral-100 pt-5 text-sm">
                  <div>
                    <dt className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">
                      When you need it
                    </dt>
                    <dd className="mt-1 leading-relaxed text-neutral-600">
                      {e.whenYouNeedIt}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">
                      You get
                    </dt>
                    <dd className="mt-1 leading-relaxed text-neutral-600">
                      {e.youGet}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — Mechanism: how an engagement runs */}
      <section
        id="process"
        aria-labelledby="process-title"
        className="border-y border-neutral-100 bg-neutral-50 py-16 md:py-28"
      >
        <div className={contentBounds}>
          <header className="mb-10 max-w-3xl md:mb-14">
            <Eyebrow>02 // How An Engagement Runs</Eyebrow>
            <h2
              id="process-title"
              className="mt-4 font-tiempos text-3xl font-bold leading-tight text-neutral-950 md:text-5xl"
            >
              Scope, read, frame, hand off.
            </h2>
          </header>

          <ol className="grid gap-6 md:grid-cols-4">
            {process.map((step) => (
              <li
                key={step.no}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <p className="font-mono text-sm font-black text-amber-700">
                  {step.no}
                </p>
                <h3 className="mt-3 font-tiempos text-xl font-bold leading-tight text-neutral-950">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 03 — Evidence: the record behind the offer */}
      <section
        id="proof"
        aria-labelledby="proof-title"
        className="py-16 md:py-28"
      >
        <div className={contentBounds}>
          <div className="max-w-3xl">
            <Eyebrow>03 // The Record</Eyebrow>
            <h2
              id="proof-title"
              className="mt-4 font-tiempos text-3xl font-bold leading-tight text-neutral-950 md:text-5xl"
            >
              The method is not theoretical.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              The frameworks come from a self-directed research practice, and the
              implementation record comes from a decade of shipped enterprise work.
              Both are on this site.
            </p>
          </div>
          <div className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
            <Link
              href="/projects/research-practice"
              className="group rounded-2xl border border-neutral-200 p-6 transition-colors hover:border-amber-300 hover:bg-amber-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2"
            >
              <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-amber-700">
                Where the frameworks come from
              </p>
              <span className="mt-3 flex items-center justify-between gap-3 font-tiempos text-xl font-bold text-neutral-950">
                Systems Design Practice
                <ArrowRight className="h-5 w-5 shrink-0 text-amber-700 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
              </span>
            </Link>
            <Link
              href="/projects/previous"
              className="group rounded-2xl border border-neutral-200 p-6 transition-colors hover:border-amber-300 hover:bg-amber-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2"
            >
              <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-amber-700">
                Where they are validated
              </p>
              <span className="mt-3 flex items-center justify-between gap-3 font-tiempos text-xl font-bold text-neutral-950">
              Shipped Projects & Client Work
                <ArrowRight className="h-5 w-5 shrink-0 text-amber-700 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 04 — Honesty: fit boundary */}
      <section
        id="fit"
        aria-labelledby="fit-title"
        className="border-y border-neutral-100 bg-neutral-50 py-16 md:py-28"
      >
        <div className={contentBounds}>
          <header className="mb-10 max-w-3xl md:mb-14">
            <Eyebrow>04 // Fit</Eyebrow>
            <h2
              id="fit-title"
              className="mt-4 font-tiempos text-3xl font-bold leading-tight text-neutral-950 md:text-5xl"
            >
              A good fit, and a not-yet.
            </h2>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 md:p-8">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">
                Good fit
              </p>
              <ul className="mt-5 space-y-3">
                {fit.good.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-neutral-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
                Not yet a fit
              </p>
              <ul className="mt-5 space-y-3">
                {fit.notYet.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-neutral-600">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — Invitation: CTA */}
      <section
        id="start"
        aria-labelledby="start-title"
        className="bg-neutral-950 py-16 text-neutral-100 md:py-28"
      >
        <div className={contentBounds}>
          <div className="max-w-3xl">
            <Eyebrow dark>05 // Start Here</Eyebrow>
            <h2
              id="start-title"
              className="mt-4 font-tiempos text-3xl font-bold leading-[1.05] text-white md:text-5xl"
            >
              {closer.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400">
              {closer.body}
            </p>
            <a
              href={closer.ctaHref}
              className="mt-9 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-amber-400 px-6 py-3 font-semibold text-neutral-950 transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
              {closer.ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
