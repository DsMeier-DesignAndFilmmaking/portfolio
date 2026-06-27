// Reusable conversion anchor for the foot of every major project page.
// Mount it directly above the project's cross-project footer.
// Routes the spine's step 6 (audits / logic framing / structural strategy)
// to a real, shippable destination: the /services page.
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const ENGAGEMENTS = [
  {
    no: '01 /',
    title: 'Systems Audit',
    body: 'Where the current system loses information, agency, or recovery.',
  },
  {
    no: '02 /',
    title: 'Adaptive Logic Framing',
    body: 'How AI and rules should behave when conditions change.',
  },
  {
    no: '03 /',
    title: 'Structural Design Strategy',
    body: 'The component and decision architecture a team builds against.',
  },
] as const;

export default function PracticeAnchor() {
  return (
    <section
      aria-labelledby="practice-anchor-title"
      className="bg-neutral-950 py-16 text-neutral-100 md:py-24"
    >
      <div className="container mx-auto max-w-3xl px-6 md:px-8">
        <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-amber-300">
          From this case → the practice
        </p>
        <h2
          id="practice-anchor-title"
          className="mt-4 font-tiempos text-3xl font-bold leading-[1.05] md:text-5xl"
        >
          This is one case from a working method, not a one-off.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 md:text-lg">
          The same practice — read the context, structure the evidence, build the
          framework — is what resolves operational friction where digital logic
          meets the physical and operational world. It runs as three engagements:
        </p>

        <ul className="mt-8 grid gap-3 md:grid-cols-3">
          {ENGAGEMENTS.map((e) => (
            <li
              key={e.no}
              className="rounded-xl border border-neutral-800 px-4 py-3"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300">
                {e.no}
              </span>
              <span className="mt-1 block font-tiempos text-lg">{e.title}</span>
              <span className="mt-1 block text-sm text-neutral-400">{e.body}</span>
            </li>
          ))}
        </ul>

        <Link
          href="/services"
          className="mt-10 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-amber-400 px-6 py-3 font-semibold text-neutral-950 transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
        >
          Scope an engagement
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
