import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import PracticeNav from '@/components/PracticeNav';
import ServiceContactForm from '@/components/ServiceContactForm';

export const metadata: Metadata = {
  title: 'Start a Scoping Call | Dan Meier',
  description:
    'Share a project inquiry for environmental systems design, experiential strategy, service design, or digital product systems work.',
};

const contentBounds = 'max-w-4xl mx-auto px-6';

export default function ScopingCallPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-neutral-900 selection:bg-amber-200/50">
      <a
        href="#scoping-call-form"
        className="sr-only fixed left-4 top-4 z-[140] rounded-md bg-white px-4 py-3 text-sm font-semibold text-neutral-950 shadow-lg focus:not-sr-only focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
      >
        Skip to scoping call form
      </a>

      <PracticeNav />

      <main>
        <section
          id="scoping-call-form"
          aria-labelledby="scoping-call-title"
          className="mt-[100px] py-16 md:py-28"
        >
          <div className={contentBounds}>
            <Link
              href="/services"
              className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 transition-colors hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Back to Services
            </Link>

            <div className="rounded-2xl border border-neutral-100 bg-neutral-50 px-8 py-10 md:px-12 md:py-14">
              <div className="mx-auto max-w-2xl">
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-amber-700">
                  00 // Contact Form
                </p>
                <h1
                  id="scoping-call-title"
                  className="mt-4 font-tiempos text-3xl font-bold leading-tight text-neutral-950 md:text-5xl"
                >
                  Get in Touch
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-neutral-600">
                  Share what you are trying to understand, improve, or build. I'll review the context
                  and follow up with next steps.
                </p>
                <ServiceContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
