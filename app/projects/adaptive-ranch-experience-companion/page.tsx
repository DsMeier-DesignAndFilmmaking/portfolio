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
import ProjectBreadcrumb from '@/components/ProjectBreadcrumb';
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
  { id: 'architecture', label: 'Architecture' },
  { id: 'scenario', label: 'Scenario' },
  { id: 'signals', label: 'Signals' },
  { id: 'confidence', label: 'Confidence' },
  { id: 'recovery', label: 'Recovery' },
  { id: 'operations', label: 'Operations' },
  { id: 'applications', label: 'Applications' },
  { id: 'evidence', label: 'Evidence' },
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
    label: 'Outdoor hospitality',
    body: 'Patterns from resorts, lodges, ranches, parks, retreats, guided experiences, guest orientation, and service recovery.',
  },
  {
    label: 'Environmental uncertainty',
    body: 'Signals from weather, terrain, access, route state, stewardship thresholds, and changing place conditions.',
  },
  {
    label: 'Guest confidence',
    body: 'Confidence breakdown modeling, decision support, recovery paths, and the moments when human confirmation matters.',
  },
  {
    label: 'Operational systems',
    body: 'Capacity, staffing, equipment readiness, local staff knowledge, handoffs, and the invisible work behind credible guidance.',
  },
];

const futureDirections = [
  'Places — validate signal groups across resorts, lodges, ranches, parks, retreats, and guided operations.',
  'People — test the model with operators, guides, guest-services teams, land stewards, and visitors.',
  'Conditions — prototype guidance for weather shifts, access changes, stewardship cues, and recovery.',
  'Operations — test ownership, source-of-truth requirements, and cross-context adaptability before interface design.',
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
              <ProjectBreadcrumb projectId="adaptive-ranch-experience-companion" />
            </div>
            <h1 className="font-tiempos text-4xl font-bold leading-tight text-gray-950 md:text-6xl md:leading-tight">
              Adaptive Outdoor Hospitality Companion.
              <span className="mt-4 block italic text-gray-500">
                A confidence-centered operating model for outdoor hospitality.
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-600 md:text-xl">
              A reusable service-system concept for interpreting changing conditions, guest needs, operational realities, and stewardship responsibilities before guidance is surfaced.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6 md:p-8">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-emerald-700">
                Concept Status
              </p>
              <h2 className="mt-4 font-tiempos text-2xl font-bold leading-tight text-neutral-950">
                A systems concept, not a deployed hospitality product.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                The ranch use case is the originating exploration for a broader outdoor hospitality operating model.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <ConceptBadge>Concept</ConceptBadge>
                <ConceptBadge>Service System</ConceptBadge>
                <ConceptBadge>Origin: Ranch Use Case</ConceptBadge>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <CaseStudySection
        id="problem"
        eyebrow="01 // The Decision Problem"
        title="Outdoor guests do not just need options. They need confidence when conditions change."
        intro="Outdoor hospitality decisions depend on changing conditions, not static activity menus."
      >
        <div className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6 md:p-8">
          <div className="grid gap-3 text-center md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center">
            {[
              ['Guest Intent', 'What the guest hopes to experience'],
              ['Live Conditions', 'What the place allows right now'],
              ['Operational Capacity', 'What the team can credibly deliver'],
            ].map(([label, description], index) => (
              <div key={label} className="contents">
                <article className="rounded-2xl border border-neutral-200 bg-white p-5">
                  <h3 className="font-tiempos text-2xl font-bold text-neutral-950">{label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{description}</p>
                </article>
                {index < 2 && (
                  <span className="text-2xl font-light text-emerald-600" aria-hidden="true">
                    ×
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-base font-semibold text-neutral-900 md:text-lg">
            A good option can become a poor fit when any one of these changes.
          </p>
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="architecture"
        eyebrow="02 // Companion System"
        title="A signal-to-guidance architecture for dynamic outdoor experiences."
        intro="The companion turns changing context into confidence-preserving guidance."
        tone="muted"
      >
        <RanchSystemArchitecture />
      </CaseStudySection>

      <CaseStudySection
        id="scenario"
        eyebrow="03 // Scenario Walkthrough"
        title="The system becomes tangible when the original plan stops fitting."
        intro="A family books a guided horseback ride. Before the activity begins, weather conditions change. Instead of focusing on the activity itself, the companion focuses on the guest’s underlying intent."
      >
        <WeatherScenarioWalkthrough />
      </CaseStudySection>

      <CaseStudySection
        id="signals"
        eyebrow="04 // Signal Ecosystem"
        title="Trustworthy guidance depends on more than weather data."
        intro="Guest, place, operational, stewardship, and human context must be interpreted together."
        tone="muted"
      >
        <RanchSignalMap />
      </CaseStudySection>

      <CaseStudySection
        id="confidence"
        eyebrow="05 // Confidence Breakdown"
        title="Guest confidence breaks down at predictable decision points."
        intro="Four moments expose where support matters most."
        tone="muted"
      >
        <GuestConfidenceBreakdownModel />
      </CaseStudySection>

      <CaseStudySection
        id="recovery"
        eyebrow="06 // Experience Recovery"
        title="Recovery begins by preserving intent, not merely replacing an activity."
        intro="The goal is continuity of meaning, not continuity of itinerary."
      >
        <RecoveryPathDiagram />
      </CaseStudySection>

      <CaseStudySection
        id="operations"
        eyebrow="07 // Operational Service System"
        title="The companion is only credible when operations can fulfill its guidance."
        intro="Guidance must reflect what staff and operations can actually deliver."
      >
        <OperationsServiceBlueprint />
      </CaseStudySection>

      <CaseStudySection
        id="applications"
        eyebrow="08 // Hospitality Applications"
        title="One confidence framework can adapt across outdoor hospitality environments."
        intro="The same decision pattern appears across different place-based settings."
        tone="muted"
      >
        <ApplicationsMatrixVisual />
      </CaseStudySection>

      <CaseStudySection
        id="evidence"
        eyebrow="09 // Evidence & Boundaries"
        title="The concept establishes a reusable system thesis—not validated outcomes."
        intro="The model is grounded in research and operational reasoning, but has not been tested live."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['Established', 'A reusable system architecture, confidence model, and service-design\u00a0thesis.'],
            ['Informed By', 'Hospitality audits, environmental research, scenario modeling, and operational assumptions.'],
            ['Not Yet Validated', 'Live guest, staff, operational, and stewardship outcomes.'],
          ].map(([label, body]) => (
            <article key={label} className="rounded-2xl border border-neutral-200 bg-white p-6">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-emerald-700">
                {label}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600">{body}</p>
            </article>
          ))}
        </div>
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-neutral-500">
          This is a systems-design concept, not a deployed product or a claim of measured outcomes.
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Signal taxonomy and confidence models sourced from the{' '}
          <a
            href="/projects/environmental-systems-design-os"
            className="text-emerald-700 underline underline-offset-2 transition-colors hover:text-emerald-600"
          >
            Environmental Systems Design OS →
          </a>
        </p>
      </CaseStudySection>

      <CaseStudySection
        id="future"
        eyebrow="10 // Validation Roadmap"
        title="The next step is testing the system across real places, roles, and conditions."
        intro="Validate the model before designing the product."
        tone="dark"
      >
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ['Places', 'Does the framework transfer?'],
            ['People', 'Is the guidance useful?'],
            ['Conditions', 'Does it respond appropriately?'],
            ['Operations', 'Can teams fulfill it?'],
          ].map(([label, question]) => (
            <article key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-emerald-300">
                {label}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-neutral-300">{question}</p>
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
                An outdoor hospitality companion should not begin as an app. It should begin as a service system that understands changing conditions, guest intent, operational reality, stewardship responsibility, and the human moments where confidence is restored.
              </p>
            </div>
          </div>
        </div>
      </CaseStudySection>
    </main>
  );
}
