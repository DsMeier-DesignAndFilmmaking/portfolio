// Statically-rendered services route. Composes sections; all copy lives in ./content.
// Uses the shared practice nav (PracticeNav) so the header matches the practice/project
// pages; the global footer still comes from the root layout (ConditionalFooter).
import Link from 'next/link';
import { ArrowRight, Check, X } from 'lucide-react';
import PracticeNav from '@/components/PracticeNav';
import {
  hero,
  typicalProblems,
  engagements,
  bestFor,
  process,
  proof,
  fit,
  faq,
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
            <h1
              id="services-hero-title"
              className="mt-4 text-balance font-tiempos text-4xl font-bold leading-[1.05] text-neutral-950 md:text-6xl"
            >
              {hero.title}
            </h1>
            <p className="mt-5 text-pretty font-tiempos text-xl italic text-neutral-500 md:text-2xl">
              {hero.deck}
            </p>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-neutral-600">
              {hero.lede}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={hero.ctaHref}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-neutral-950 px-6 py-3 font-semibold text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2"
              >
                {hero.ctaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="#engagements"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-neutral-300 px-6 py-3 font-semibold text-neutral-900 transition-colors hover:border-neutral-900 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2"
              >
                Explore Engagements
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Typical problems — recognition band */}
      <section
        id="typical-problems"
        aria-labelledby="typical-problems-title"
        className="border-b border-neutral-100 bg-neutral-50/70 py-12 md:py-16"
      >
        <div className={contentBounds}>
          <div className="max-w-3xl">
            <h2
              id="typical-problems-title"
              className="text-balance font-tiempos text-2xl font-bold leading-tight text-neutral-950 md:text-3xl"
            >
              {typicalProblems.title}
            </h2>
            <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-neutral-600 md:text-base">
              {typicalProblems.intro}
            </p>
          </div>

          <ul className="mt-7 grid max-w-5xl gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {typicalProblems.items.map((item) => (
              <li
                key={item}
                className="text-pretty rounded-xl border border-neutral-200 bg-white/80 px-4 py-3 text-sm font-medium leading-snug text-neutral-700"
              >
                {item}
              </li>
            ))}
          </ul>
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
              className="mt-4 text-balance font-tiempos text-3xl font-bold leading-tight text-neutral-950 md:text-5xl"
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
                <h3 className="mt-3 text-balance font-tiempos text-2xl font-bold leading-tight text-neutral-950">
                  {e.title}
                </h3>
                <p className="mt-4 text-pretty text-sm leading-relaxed text-neutral-700">
                  {e.outcome}
                </p>
                <dl className="mt-5 space-y-4 border-t border-neutral-100 pt-5 text-sm">
                  <div>
                    <dt className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">
                      Best for
                    </dt>
                    <dd className="mt-2">
                      <ul className="space-y-1.5 leading-relaxed text-neutral-600">
                        {e.bestFor.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-600" aria-hidden="true" />
                            <span className="text-pretty">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">
                      Deliverables
                    </dt>
                    <dd className="mt-2">
                      <ul className="flex flex-wrap gap-2">
                        {e.deliverables.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-[11px] font-semibold text-neutral-700"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — Useful when */}
      <section
        id="best-for"
        aria-labelledby="best-for-title"
        className="border-y border-neutral-100 bg-neutral-50 py-8 md:py-10"
      >
        <div className={contentBounds}>
          <div className="grid max-w-5xl gap-5 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] md:items-center">
            <div className="max-w-2xl">
              <Eyebrow>02 // Useful When</Eyebrow>
              <h2
                id="best-for-title"
                className="mt-3 text-balance font-tiempos text-2xl font-bold leading-tight text-neutral-950 md:text-3xl"
              >
                The work is strongest across boundaries.
              </h2>
            </div>
            <ul className="grid gap-2.5 sm:grid-cols-3">
              {bestFor.map((item) => (
                <li
                  key={item}
                  className="text-pretty rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold leading-snug text-neutral-800"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 03 — Mechanism: how we work */}
      <section
        id="process"
        aria-labelledby="process-title"
        className="py-16 md:py-28"
      >
        <div className={contentBounds}>
          <header className="mb-10 max-w-3xl md:mb-14">
            <Eyebrow>03 // How We Work</Eyebrow>
            <h2
              id="process-title"
              className="mt-4 text-balance font-tiempos text-3xl font-bold leading-tight text-neutral-950 md:text-5xl"
            >
              How We Work
            </h2>
            <p className="mt-4 text-pretty font-tiempos text-xl italic text-neutral-500 md:text-2xl">
              Scope, read, frame, hand off.
            </p>
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
                <h3 className="mt-3 text-balance font-tiempos text-xl font-bold leading-tight text-neutral-950">
                  {step.title}
                </h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-neutral-600">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 04 — Evidence: the record behind the offer */}
      <section
        id="proof"
        aria-labelledby="proof-title"
        className="border-y border-neutral-100 bg-neutral-50 py-16 md:py-28"
      >
        <div className={contentBounds}>
          <div className="max-w-3xl">
            <Eyebrow>04 // Why This Practice</Eyebrow>
            <h2
              id="proof-title"
              className="mt-4 text-balance font-tiempos text-3xl font-bold leading-tight text-neutral-950 md:text-5xl"
            >
              {proof.title}
            </h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-neutral-600">
              {proof.body}
            </p>
          </div>
          <ul className="mt-8 grid max-w-4xl gap-3 md:grid-cols-2">
            {proof.points.map((point) => (
              <li
                key={point}
                className="text-pretty rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm leading-relaxed text-neutral-700"
              >
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
            {proof.links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-neutral-200 bg-white p-6 transition-colors hover:border-amber-300 hover:bg-amber-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2"
              >
                <p className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-amber-700">
                  {item.eyebrow}
                </p>
                <span className="mt-3 flex items-center justify-between gap-3 font-tiempos text-xl font-bold text-neutral-950">
                  {item.title}
                  <ArrowRight className="h-5 w-5 shrink-0 text-amber-700 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — Honesty: fit boundary */}
      <section
        id="fit"
        aria-labelledby="fit-title"
        className="py-14 md:py-20"
      >
        <div className={contentBounds}>
          <header className="mb-8 max-w-3xl md:mb-10">
            <Eyebrow>05 // Fit</Eyebrow>
            <h2
              id="fit-title"
              className="mt-4 text-balance font-tiempos text-3xl font-bold leading-tight text-neutral-950 md:text-5xl"
            >
              Is This the Right Fit?
            </h2>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-neutral-200 bg-white p-5 md:p-6">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">
                Good fit
              </p>
              <ul className="mt-5 space-y-3">
                {fit.good.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-neutral-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                    <span className="text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-white p-5 md:p-6">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
                Not yet a fit
              </p>
              <ul className="mt-5 space-y-3">
                {fit.notYet.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-neutral-600">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" aria-hidden="true" />
                    <span className="text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — FAQ */}
      <section
        id="faq"
        aria-labelledby="faq-title"
        className="border-t border-neutral-100 bg-neutral-50 py-14 md:py-20"
      >
        <div className={contentBounds}>
          <div className="max-w-3xl">
            <Eyebrow>06 // Questions</Eyebrow>
            <h2
              id="faq-title"
              className="mt-4 text-balance font-tiempos text-3xl font-bold leading-tight text-neutral-950 md:text-5xl"
            >
              {faq.title}
            </h2>
          </div>

          <div className="mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
            {faq.items.map((item) => (
              <article
                key={item.question}
                className="rounded-xl border border-neutral-200 bg-white p-5 md:p-6"
              >
                <h3 className="text-balance text-sm font-semibold leading-snug text-neutral-950">
                  {item.question}
                </h3>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-neutral-600">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — Invitation: CTA */}
      <section
        id="start"
        aria-labelledby="start-title"
        className="bg-neutral-950 py-16 text-neutral-100 md:py-28"
      >
        <div className={contentBounds}>
          <div className="max-w-3xl">
            <Eyebrow dark>07 // Start Here</Eyebrow>
            <h2
              id="start-title"
              className="mt-4 text-balance font-tiempos text-3xl font-bold leading-[1.05] text-white md:text-5xl"
            >
              {closer.title}
            </h2>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-neutral-400">
              {closer.body}
            </p>
            <Link
              href={closer.ctaHref}
              className="mt-9 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-amber-400 px-6 py-3 font-semibold text-neutral-950 transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
              {closer.ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <p className="mt-5 max-w-xl text-pretty text-sm leading-relaxed text-neutral-500">
              {closer.support}
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
