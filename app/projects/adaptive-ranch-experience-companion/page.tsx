'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { motion, type Variants, easeOut } from 'framer-motion';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  AlertTriangle,
  Compass,
  Mountain,
  RefreshCw,
  Sprout,
} from 'lucide-react';
import { PageNavIndicator } from '@/components/PageNavIndicator';
import ProjectPracticeNavDropdown, {
  PROJECT_NAV_MOBILE_MENU_ID,
} from '@/components/ProjectPracticeNavDropdown';
import ActivityConfidenceMatrix from '@/components/adaptive-ranch/diagrams/ActivityConfidenceMatrix';
import ApplicationsMatrixVisual from '@/components/adaptive-ranch/diagrams/ApplicationsMatrixVisual';
import GuestConfidenceBreakdownModel from '@/components/adaptive-ranch/diagrams/GuestConfidenceBreakdownModel';
import GuidanceArchitectureDiagram from '@/components/adaptive-ranch/diagrams/GuidanceArchitectureDiagram';
import OperationsServiceBlueprint from '@/components/adaptive-ranch/diagrams/OperationsServiceBlueprint';
import RanchSignalMap from '@/components/adaptive-ranch/diagrams/RanchSignalMap';
import RanchSystemArchitecture from '@/components/adaptive-ranch/diagrams/RanchSystemArchitecture';
import RecoveryPathDiagram from '@/components/adaptive-ranch/diagrams/RecoveryPathDiagram';
import WeatherScenarioWalkthrough from '@/components/adaptive-ranch/diagrams/WeatherScenarioWalkthrough';

const ADAPTIVE_RANCH_SECTIONS = [
  { id: 'hero', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'architecture', label: 'System' },
  { id: 'scenario', label: 'Scenario' },
  { id: 'recovery', label: 'Recovery' },
  { id: 'operations', label: 'Operations' },
  { id: 'future', label: 'Future' },
];

const contentBounds = 'container mx-auto px-6 md:px-8';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const problemFrames = [
  {
    title: 'Activity choice is interpreted, not selected.',
    body: 'Guests need to understand which activity fits skill, weather, group dynamics, and the phase of the stay.',
    Icon: Compass,
  },
  {
    title: 'Outdoor conditions change the promise.',
    body: 'Weather, terrain, daylight, animals, and stewardship constraints can shift what a good experience means.',
    Icon: Mountain,
  },
  {
    title: 'Recovery is part of hospitality.',
    body: 'When a plan changes, the system must preserve intent, explain context, and hand off to people at the right moment.',
    Icon: RefreshCw,
  },
];

const researchInputs = [
  {
    label: 'Hospitality audits',
    body: 'Patterns from destination hospitality, activity choice, guest orientation, service recovery, and operational handoffs.',
  },
  {
    label: 'Environmental systems research',
    body: 'Signals from weather, terrain, route state, stewardship thresholds, and place-based decision support.',
  },
  {
    label: 'Service-design methods',
    body: 'Blueprinting, confidence breakdown modeling, recovery paths, and human validation moments.',
  },
  {
    label: 'Operational modeling',
    body: 'Capacity, staffing, equipment readiness, guide knowledge, and the invisible work behind guest-facing guidance.',
  },
];

const futureDirections = [
  'Validate signal groups with ranch operators, guides, and guest-facing staff.',
  'Prototype guidance language for activity choice, weather shifts, stewardship cues, and recovery.',
  'Test recovery paths against real operational constraints before designing any interface.',
  'Define measurement criteria for guest confidence, staff usefulness, and stewardship quality.',
];

function SectionKicker({
  eyebrow,
  title,
  children,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="mb-10 max-w-3xl">
      <p
        className={`font-mono text-[10px] font-black uppercase tracking-[0.28em] ${
          dark ? 'text-emerald-300' : 'text-emerald-700'
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-4 font-tiempos text-3xl font-bold leading-tight md:text-5xl ${
          dark ? 'text-white' : 'text-neutral-950'
        }`}
      >
        {title}
      </h2>
      <div
        className={`mt-5 text-base leading-relaxed md:text-lg ${
          dark ? 'text-neutral-300' : 'text-neutral-600'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function CaseStudySection({
  id,
  eyebrow,
  title,
  intro,
  children,
  tone = 'white',
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
  tone?: 'white' | 'muted' | 'dark';
}) {
  const isDark = tone === 'dark';

  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${
        isDark ? 'bg-neutral-950 text-white' : tone === 'muted' ? 'bg-neutral-50' : 'bg-white'
      }`}
    >
      <div className={contentBounds}>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <SectionKicker eyebrow={eyebrow} title={title} dark={isDark}>
            <p>{intro}</p>
          </SectionKicker>
          {children}
        </motion.div>
      </div>
    </section>
  );
}

function ConceptBadge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-neutral-600">
      {children}
    </span>
  );
}

export default function AdaptiveRanchExperienceCompanionPage() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [atTop, setAtTop] = useState(true);
  const [isNavbarWhite, setIsNavbarWhite] = useState(false);
  const lastScrollYRef = useRef(0);
  const isMobileMenuOpenRef = useRef(false);

  useEffect(() => {
    isMobileMenuOpenRef.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsNavbarWhite(currentScrollY > 100);
      setAtTop(currentScrollY < 10);
      if (isMobileMenuOpenRef.current) setIsMobileMenuOpen(false);
      if (currentScrollY > lastScrollYRef.current) setScrollDirection('down');
      else if (currentScrollY < lastScrollYRef.current) setScrollDirection('up');
      lastScrollYRef.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-neutral-900 selection:bg-emerald-200/50">
      <PageNavIndicator sections={ADAPTIVE_RANCH_SECTIONS} showDotsOnDesktop />

      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          isNavbarWhite ? 'border-b border-neutral-100 bg-white' : 'bg-transparent'
        } ${
          atTop
            ? 'translate-y-0'
            : scrollDirection === 'down'
              ? '-translate-y-full lg:translate-y-0'
              : 'translate-y-0'
        }`}
      >
        <div className="container relative z-20 mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/')}
                className="m-0 flex h-fit w-fit items-center p-0 py-4"
                aria-label="Return to home page"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/signature-25.png`}
                  alt="Dan Meier"
                  width={150}
                  height={37}
                  priority
                  className="h-9 w-auto brightness-0"
                />
              </button>
              <div className="ml-3 flex flex-shrink-0 items-center">
                <div className="h-5 w-px flex-shrink-0 bg-slate-300" aria-hidden="true" />
                <span
                  className={`ml-3 whitespace-nowrap text-xs font-medium transition-colors duration-500 md:text-sm ${
                    isNavbarWhite ? 'text-black' : 'text-gray-700'
                  }`}
                >
                  Work
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-project-nav-trigger
              aria-haspopup="menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls={PROJECT_NAV_MOBILE_MENU_ID}
              className={`flex items-center justify-end py-2 pl-4 transition-colors duration-500 lg:hidden ${
                isNavbarWhite ? 'text-black' : 'text-gray-700'
              }`}
              aria-label="Toggle mobile menu"
            >
              <div className="relative flex h-5 w-6 flex-col items-center justify-between">
                <span
                  className={`h-0.5 w-full bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'translate-y-2 rotate-45' : ''
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
                  }`}
                />
              </div>
            </button>
            <ProjectPracticeNavDropdown
              pathname={pathname}
              isNavbarWhite={isNavbarWhite}
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          </div>
        </div>
      </motion.nav>

      <motion.section
        id="hero"
        className={`${contentBounds} mt-[100px] pb-16 md:pb-24`}
        initial="hidden"
        animate="show"
        variants={sectionVariants}
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-[3px] w-12 bg-emerald-600" aria-hidden="true" />
              <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-neutral-500">
                Systems Design Concept
              </p>
            </div>
            <h1 className="font-tiempos text-4xl font-bold leading-tight text-gray-950 md:text-6xl md:leading-tight">
              Adaptive Ranch Experience Companion.
              <span className="mt-4 block italic text-gray-500">
                Confidence-centered outdoor hospitality.
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-600 md:text-xl">
              A concept case study for interpreting ranch conditions, guest readiness, stewardship needs, operations, and recovery paths before guidance is surfaced.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6 md:p-8">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-emerald-700">
                Concept Status
              </p>
              <h2 className="mt-4 font-tiempos text-2xl font-bold leading-tight text-neutral-950">
                Not a finished product. Not a deployed ranch app.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                The work is framed as environmental systems design: how hospitality operations, staff knowledge, live conditions, and guest confidence can be modeled before any interface is built.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <ConceptBadge>Concept</ConceptBadge>
                <ConceptBadge>Service System</ConceptBadge>
                <ConceptBadge>Stewardship</ConceptBadge>
                <ConceptBadge>Recovery</ConceptBadge>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <CaseStudySection
        id="problem"
        eyebrow="01 // Problem"
        title="Ranch guests do not just need options. They need confidence in context."
        intro="Outdoor hospitality decisions sit inside changing conditions: weather, activity readiness, staff capacity, animal welfare, trail state, family dynamics, and social comfort. The companion concept treats those as system signals, not app features."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {problemFrames.map(({ title, body, Icon }) => (
            <article key={title} className="rounded-2xl border border-neutral-200 bg-white p-6">
              <Icon className="h-6 w-6 text-emerald-700" aria-hidden="true" />
              <h3 className="mt-8 font-tiempos text-2xl font-bold leading-tight text-neutral-950">
                {title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600">{body}</p>
            </article>
          ))}
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="research"
        eyebrow="02 // Research Foundation"
        title="The research frame connects hospitality, environment, service recovery, and operations."
        intro="The case study is built from a systems lens rather than an app-first product brief. Research inputs focus on where guest confidence breaks down and what operational evidence is needed to restore it."
        tone="dark"
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {researchInputs.map((item) => (
            <article key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-emerald-300">
                Research Input
              </p>
              <h3 className="mt-4 font-tiempos text-2xl font-bold leading-tight text-white">
                {item.label}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-neutral-400">{item.body}</p>
            </article>
          ))}
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="architecture"
        eyebrow="03 // System Architecture"
        title="A signal-to-guidance architecture for confidence-centered ranch hospitality."
        intro="The architecture separates sensing from interpretation, confidence assessment, guidance, human action, recovery, and learning."
        tone="muted"
      >
        <RanchSystemArchitecture />
      </CaseStudySection>

      <CaseStudySection
        id="scenario"
        eyebrow="04 // Weather-Shifted Scenario"
        title="The concept becomes tangible when a plan changes."
        intro="A weather-shifted horseback riding scenario shows how the system preserves intent, validates with staff, and offers a better-fit path without turning guidance into a command."
      >
        <WeatherScenarioWalkthrough />
      </CaseStudySection>

      <CaseStudySection
        id="signals"
        eyebrow="05 // Ranch Signal Map"
        title="The companion interprets a signal ecosystem, not a menu."
        intro="Guest comfort, environmental conditions, operations, stewardship, and staff knowledge all shape whether guidance feels trustworthy."
        tone="muted"
      >
        <RanchSignalMap />
      </CaseStudySection>

      <CaseStudySection
        id="activity"
        eyebrow="06 // Activity Confidence"
        title="Different activities require different confidence support."
        intro="The matrix compares ranch activities by skill, intensity, weather sensitivity, social demand, recovery flexibility, and support need."
      >
        <ActivityConfidenceMatrix />
      </CaseStudySection>

      <CaseStudySection
        id="confidence"
        eyebrow="07 // Confidence Breakdown"
        title="Confidence breaks down at recognizable points in the guest journey."
        intro="The model identifies where guests lose clarity and which restoration mechanisms can rebuild trust without removing choice."
        tone="muted"
      >
        <GuestConfidenceBreakdownModel />
      </CaseStudySection>

      <CaseStudySection
        id="recovery"
        eyebrow="08 // Recovery Architecture"
        title="Recovery is designed before the disruption happens."
        intro="When the original plan no longer fits, recovery should preserve the guest's intent, reduce options, route human validation, and return learning signals to the system."
      >
        <RecoveryPathDiagram />
      </CaseStudySection>

      <CaseStudySection
        id="guidance"
        eyebrow="09 // Guidance Architecture"
        title="Guidance supports agency instead of automating the guest."
        intro="The concept frames guidance as orientation, tradeoff explanation, alternative surfacing, and human escalation where lived context matters."
        tone="muted"
      >
        <GuidanceArchitectureDiagram />
      </CaseStudySection>

      <CaseStudySection
        id="operations"
        eyebrow="10 // Operations Blueprint"
        title="The system is only credible if operations can carry the promise."
        intro="The blueprint connects guest experience to frontstage staff, backstage coordination, stewardship constraints, companion guidance, and recovery ownership."
      >
        <OperationsServiceBlueprint />
      </CaseStudySection>

      <CaseStudySection
        id="applications"
        eyebrow="11 // Applications Beyond Ranches"
        title="The framework is about environmental hospitality systems, not ranches alone."
        intro="The transferability matrix shows how uncertainty, guidance, confidence, and recovery recur across lodges, parks, resorts, conservation properties, and adventure hospitality."
        tone="muted"
      >
        <ApplicationsMatrixVisual />
      </CaseStudySection>

      <CaseStudySection
        id="evidence"
        eyebrow="12 // Evidence & Limitations"
        title="The concept is intentionally honest about its evidence boundary."
        intro="The current work establishes a system model, visual architecture, and service-design thesis. It does not claim live deployment or measured ranch outcomes."
      >
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <article className="rounded-2xl border border-amber-200 bg-amber-50 p-6 md:p-8">
            <AlertTriangle className="h-6 w-6 text-amber-700" aria-hidden="true" />
            <h3 className="mt-6 font-tiempos text-2xl font-bold leading-tight text-neutral-950">
              Required limitation statement
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-neutral-700">
              This is a systems-design concept informed by hospitality audits, environmental systems research, service-design methods, and operational modeling. It has not yet been piloted within a live ranch environment.
            </p>
          </article>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ['Evidence used', 'Audits, pattern synthesis, service blueprinting, confidence modeling, and operational assumptions.'],
              ['Evidence not claimed', 'No live deployment, no ranch staff pilot, no guest outcome data, and no production integration.'],
              ['Best use now', 'A concept architecture for discussion, validation planning, and future prototype design.'],
              ['Next proof point', 'Operator interviews and scenario walkthroughs with real constraints, roles, and recovery ownership.'],
            ].map(([label, body]) => (
              <article key={label} className="rounded-2xl border border-neutral-200 bg-white p-5">
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-neutral-400">
                  {label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="future"
        eyebrow="13 // Future Direction"
        title="The next step is validation before interface design."
        intro="Future work should test the model with operators and staff, then narrow it into prototype guidance patterns only where the system evidence is strong enough."
        tone="dark"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {futureDirections.map((item, index) => (
            <article key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="font-mono text-xl font-bold text-emerald-300">
                {String(index + 1).padStart(2, '0')}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-neutral-300">{item}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-6">
          <div className="flex flex-wrap items-start gap-4">
            <Sprout className="h-6 w-6 text-emerald-300" aria-hidden="true" />
            <div>
              <h3 className="font-tiempos text-2xl font-bold leading-tight text-white">
                Concept thesis
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-300">
                A ranch companion should not start as an app. It should start as a service system that understands uncertainty, operational reality, stewardship responsibility, and the human moments where confidence is restored.
              </p>
            </div>
          </div>
        </div>
      </CaseStudySection>
    </main>
  );
}
