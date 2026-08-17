'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, Variants, easeOut } from "framer-motion";
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  Network,
  Zap,
  BarChart3,
  ShieldCheck,
  CreditCard,
  Activity,
  Cpu,
  Fingerprint
} from 'lucide-react';
import { PageNavIndicator } from '../../../components/PageNavIndicator';
import TravelOSExperience from '@/src/components/TravelOSExperience';
import ProjectPracticeNavDropdown, { PROJECT_NAV_MOBILE_MENU_ID } from '@/components/ProjectPracticeNavDropdown';
import ProjectBreadcrumb from '@/components/ProjectBreadcrumb';
import HeroDraftingPlate from '@/components/HeroDraftingPlate';
import { HERO_PLATES } from '@/data/heroPlates';

const FN_SECTIONS = [
  { id: 'fn-hero', label: 'Overview' },
  { id: 'fn-archive', label: 'Recovery' },
  { id: 'fn-logic', label: 'Architecture' },
];

const NAT_GEO_YELLOW = "#FFDD00"; 
const contentBounds = "container mx-auto px-6 md:px-8";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const fadeItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
};

const situationItems = [
  'Arriving late in a new city', 'Hungry but overwhelmed', 'Rainy exploration day',
  'Only two hours to explore', 'Need a quiet place to work', 'Tourist areas overcrowded',
  'Jet lag early morning', 'Phone battery dying',
];

const fieldNoteExamples = [
  {
    situation: 'Jet lag early morning',
    problem: 'Wide awake at 5:30am with limited transit and few open places.',
    insight: 'Bakery districts open early and offer quiet seating before rush hour.',
    moves: 'Walk to a nearby bakery cluster, grab a window seat, and map the morning.',
    why: 'You reset your rhythm while easing into the city before it fills up.',
  },
  {
    situation: 'Hungry but overwhelmed',
    problem: 'Too many ratings and lists, no clarity on what fits the moment.',
    insight: 'Local markets narrow choice and signal what is actually fresh now.',
    moves: 'Head to a market hall, pick one stall with a line, and commit.',
    why: 'The environment filters options so you can act quickly and confidently.',
  },
  {
    situation: 'Rainy exploration day',
    problem: 'Plans collapse when the weather flips and streets are slick.',
    insight: 'Covered galleries and arcades create dry walkable loops.',
    moves: 'Move between indoor arcades, museums, and cafe corridors.',
    why: 'You stay in motion while keeping energy and curiosity intact.',
  },
];

// --- Sub-Components ---

function SafetyBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFDD00] rounded-full mb-6">
      <Fingerprint className="w-3 h-3 text-black" />
      <span className="text-[9px] font-black uppercase tracking-wider text-black">Identity Verified Substrate</span>
    </div>
  );
}

function FieldNoteCard({ situation, problem, insight, moves, why }: any) {
  return (
    <div className="border border-neutral-200 rounded-2xl p-6 md:p-8 bg-white transition-all duration-300">
      <div className="space-y-6 text-left">
        {[
          { label: 'Situation', val: situation, bold: true },
          { label: 'Problem', val: problem, highlight: true },
          { label: 'Local Insight', val: insight, highlight: true },
          { label: 'Suggested Moves', val: moves, highlight: true },
          { label: 'Why This Works', val: why, highlight: true },
        ].map((item) => (
          <div key={item.label} className="text-left">
            <p className="text-[9px] uppercase tracking-[0.25em] text-neutral-400 mb-2 font-black flex items-center justify-start">
              <span className={`w-1.5 h-1.5 bg-[#FFDD00] mr-2 transition-opacity hidden md:block ${item.highlight ? 'opacity-100' : 'opacity-0'}`} />
              {item.label}
            </p>
            <p className={`${item.bold ? 'text-neutral-900 font-bold text-lg' : item.highlight ? 'text-neutral-900 font-serif italic text-base' : 'text-neutral-600 text-sm'} leading-relaxed text-left`}>
              {item.val}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Main Page Component ---

export default function FieldNotesProjectPage() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [atTop, setAtTop] = useState(true);
  const [isNavbarWhite, setIsNavbarWhite] = useState(false);
  const [isEcosystemLogicOpen, setIsEcosystemLogicOpen] = useState(false);

  const lastScrollYRef = useRef(0);
  const isMobileMenuOpenRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsNavbarWhite(scrollPosition > 100);
      setAtTop(scrollPosition < 10);
      if (isMobileMenuOpenRef.current) setIsMobileMenuOpen(false);

      const currentScrollY = window.scrollY;
      const previousScrollY = lastScrollYRef.current;
      if (currentScrollY > previousScrollY) setScrollDirection('down');
      else if (currentScrollY < previousScrollY) setScrollDirection('up');
      lastScrollYRef.current = currentScrollY;
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackHome = () => router.push('/');
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <main className="min-h-screen bg-white text-neutral-900 selection:bg-[#FFDD00]/30 overflow-x-hidden">

      {/* Progress bar + section dot nav */}
      <PageNavIndicator sections={FN_SECTIONS} />

      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isNavbarWhite ? 'bg-white border-b border-neutral-100' : 'bg-transparent'
        } ${
          atTop ? 'translate-y-0' : scrollDirection === 'down' ? 'lg:translate-y-0 -translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="container mx-auto px-6 relative z-20">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button onClick={handleBackHome} className="p-0 m-0 w-fit h-fit flex items-center py-4">
                <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/signature-25.png`} alt="Dan Meier" width={150} height={37} priority className="h-9 w-auto brightness-0" />
              </button>
              <div className="flex items-center flex-shrink-0 ml-3">
                <div className="w-px h-5 bg-slate-300 flex-shrink-0" />
                <span className={`ml-3 text-xs md:text-sm font-medium transition-colors duration-500 whitespace-nowrap ${isNavbarWhite ? 'text-black' : 'text-gray-700'}`}>Work</span>
              </div>
            </div>
            <button
              onClick={toggleMobileMenu}
              data-project-nav-trigger
              aria-haspopup="menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls={PROJECT_NAV_MOBILE_MENU_ID}
              aria-label="Toggle mobile menu"
              className={`lg:hidden pl-4 py-2 flex items-center justify-end transition-colors duration-500 ${isNavbarWhite ? 'text-black' : 'text-gray-700'}`}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between items-center">
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
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

{/* HERO SECTION */}
<motion.section
  id="fn-hero"
  className={`${contentBounds} relative mt-[100px] pb-16 md:pb-24 flex flex-col space-y-6`}
  initial="hidden"
  animate="show"
  variants={sectionVariants}
>
  <HeroDraftingPlate plate={HERO_PLATES['digital-executor']!} />
  <div className="relative z-10 max-w-2xl flex flex-col space-y-6">
    <div className="flex items-center space-x-3">
      <div className="w-12 h-[3px] bg-[#0EA5E9]" /> {/* Blue accent for high-tech/finance */}
      <ProjectBreadcrumb projectId="digital-executor" />
    </div>

    <h1 className="text-3xl md:text-5xl font-bold leading-tight md:leading-snug font-tiempos">
      <span className="block text-gray-900">
        Digital Executor.<span className="block italic text-gray-500">Autonomous Recovery.</span>
      </span>
      <span className="block mt-6 text-gray-700 text-xl md:text-2xl font-medium leading-relaxed max-w-xl lg:max-w-2xl font-tiempos">
        Engineering a "Recovery-as-a-Service" agent that holds fiduciary power to secure hotel rooms and transport the moment a flight cancellation signal is detected.
      </span>
    </h1>
  </div>
</motion.section>

{/* 01. THE KNOWLEDGE LAYER (Strategic Intent) */}
<section id="fn-archive" className="py-20 md:py-32 bg-white relative z-10">
  <div className={contentBounds}>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      <div className="lg:col-span-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={sectionVariants}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-[11px] md:text-[10px] uppercase tracking-[0.3em] font-black text-neutral-400">Layer 01 // Agentic Commerce</span>
          </div>
          <header className="mb-10">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight md:leading-snug font-tiempos">
              <span className="block text-gray-900 max-w-xl lg:max-w-2xl text-balance">
                Winning the Scarcity Race
              </span>
              <span className="block mt-6 text-gray-700 text-xl md:text-2xl font-medium leading-relaxed max-w-xl lg:max-w-2xl text-balance font-tiempos">
                When a flight is cancelled at 11 PM, human-led recovery fails due to latency. We are building a system that bridges Sabre GDS data with Skyfire’s autonomous payment rails.
              </span>
            </h2>
          </header>

          <div className="max-w-xl lg:max-w-2xl text-base md:text-lg text-neutral-500 leading-relaxed font-light text-balance font-sans">
            <p>
              By the time a traveler receives a notification, the 5 closest hotels are already booked. This agent functions as a fiduciary executor, using n8n orchestration to execute transactions in milliseconds—moving the user from "stranded" to "settled" before they even exit the aircraft.
            </p>
          </div>
        </motion.div>
      </div>
      <div className="lg:col-span-6 relative mt-8 lg:mt-0">
        <div className="relative p-6 md:p-10 bg-slate-50 rounded-[2rem] md:rounded-[3rem] border border-neutral-100 overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Network className="w-64 h-64 text-black" />
          </div>
          <div className="relative z-10">
            <div className="bg-white p-6 md:p-8 rounded-2xl mb-8 border-l-8 border-sky-500 border-t border-r border-b border-neutral-100">
              <p className="text-[9px] uppercase tracking-widest text-neutral-400 font-black mb-3">Signal: Sabre GDS Webhook</p>
              <p className="font-serif italic text-lg md:text-xl text-neutral-800 leading-relaxed">
                “Flight UA242 (EWR-LIS) Status: CANCELLED. 284 passengers displaced. Local hotel inventory: CRITICAL.”
              </p>
            </div>
            <div className="flex justify-center my-6">
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-px h-12 md:h-16 bg-gradient-to-b from-sky-500 to-transparent" />
            </div>
            <div className="bg-neutral-900 text-white p-6 md:p-8 rounded-2xl border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[10px] uppercase font-black tracking-widest text-emerald-400">Skyfire Wallet Auth Active</p>
              </div>
              <p className="text-sm font-medium opacity-90 leading-relaxed font-mono">
                [AUTO-RECOVERY]: Authorization $350.00 confirmed. Booking Hyatt Regency Lisbon. Transport: Uber Black dispatched to Gate A12.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* 02. SYSTEM DECONSTRUCTION (The Tech Stack) */}
<section id="fn-logic" className="bg-white py-20 md:py-32 relative z-10">
  <div className={contentBounds}>
    <header className="mb-12 md:mb-20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center">
          <Cpu className="w-5 h-5 text-white" />
        </div>  
        <span className="text-[11px] md:text-[10px] uppercase tracking-[0.3em] font-black text-neutral-400 font-sans">
          Layer 02 // Execution Stack
        </span>
      </div>

      <h2 className="text-3xl md:text-5xl font-bold leading-tight md:leading-snug font-tiempos">
        <span className="block text-gray-900 max-w-xl lg:max-w-2xl text-balance">
          Architecture of a Digital Executor
        </span>
        <span className="block mt-4 text-gray-700 text-lg md:text-2xl font-medium leading-relaxed max-w-xl lg:max-w-2xl text-balance">
          Connecting real-time GDS signals to autonomous financial settlement.
        </span>
      </h2>
    </header>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      <div className="lg:col-span-7 space-y-12 relative">
        <div className="absolute left-3 top-10 bottom-10 w-[1px] bg-neutral-200 hidden md:block z-0" aria-hidden="true" />

        {/* Step 1: Data */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 md:gap-6 relative z-10">
            <div className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-[10px] font-bold">1</div>
            <h3 className="font-black text-sm uppercase tracking-widest text-neutral-800">Intelligence (Sabre + n8n)</h3>
          </div>
          <div className="md:pl-12 pl-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-6 rounded-2xl border border-neutral-100">
              {[
                { l: 'GDS Integration', v: 'Sabre Travel AI', i: <Activity className="w-3 h-3"/> },
                { l: 'Logic Engine', v: 'n8n Orchestration', i: <Network className="w-3 h-3"/> },
                { l: 'Signal Type', v: 'Webhook / Real-time', i: <Zap className="w-3 h-3"/> },
                { l: 'Decision Matrix', v: 'Scarcity-First Policy', i: <BarChart3 className="w-3 h-3"/> }
              ].map(s => (
                <div key={s.l}>
                  <p className="text-[9px] text-neutral-400 uppercase font-black mb-1 flex items-center gap-1">{s.i}{s.l}</p>
                  <p className="text-sm font-bold text-neutral-800">{s.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 2: Payment */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex-shrink-0 w-6 h-6 bg-sky-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold relative z-10">2</div>
            <h3 className="font-black text-sm uppercase tracking-widest text-neutral-800">Settlement (Skyfire)</h3>
          </div>
          <div className="md:pl-12 pl-10">
            <div className="bg-white border-l-8 border-sky-500 p-6 md:p-8 rounded-r-2xl border-t border-r border-b border-neutral-100">
              <div className="flex items-center gap-2 mb-4 text-sky-600">
                <CreditCard className="w-4 h-4" />
                <p className="text-[10px] font-black uppercase tracking-widest">Fiduciary Authority Active</p>
              </div>
              <p className="text-neutral-900 italic font-serif text-lg md:text-xl leading-relaxed">
                "The agent holds pre-authorized funds. It doesn't ask for permission to book; it acts on the user's predefined 'Recovery Persona' to secure inventory before it's gone."
              </p>
            </div>
          </div>
        </div>

        {/* Step 3: Notification */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-[10px] font-bold relative z-10">3</div>
            <h3 className="font-black text-sm uppercase tracking-widest text-neutral-800">Closing the Loop (Twilio)</h3>
          </div>
          <div className="md:pl-12 pl-10">
            <div className="space-y-4">
              {[
                { l: "Immediate SMS", d: "User notified of the 'Recovery Action' while still taxiing to the gate." },
                { l: "Digital Voucher", d: "Hotel and ride-share credentials delivered via secure link." },
                { l: "Expense Sync", d: "Transaction data automatically pushed to user's expense management system." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-center bg-white p-4 rounded-xl border border-neutral-100">
                  <ShieldCheck className="w-4 h-4 text-sky-500 flex-shrink-0" />
                  <p className="text-sm text-neutral-600 leading-snug">
                    <span className="font-black text-neutral-900 uppercase text-[11px] tracking-wide mr-2">{item.l}:</span> 
                    {item.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PHONE MOCKUP (Updated for Recovery) */}
      <div className="lg:col-span-5 lg:sticky lg:top-32 flex justify-center mt-10 lg:mt-0">
        <div className="relative w-full max-w-[280px] md:max-w-[340px] aspect-[9/19] bg-neutral-900 rounded-[2.5rem] md:rounded-[3.5rem] border-[6px] md:border-[10px] border-neutral-800 overflow-hidden scale-[0.92] md:scale-100">
          <div className="h-full w-full bg-white p-4 md:p-8 pt-8 md:pt-14">
            <div className="flex items-center gap-2 mb-5 md:mb-10">
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-black text-neutral-400">Executor Status: ACTIVE</span>
            </div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-8 border border-neutral-100 shadow-xl">
              <p className="font-serif italic text-xl md:text-3xl mb-3 md:mb-4 text-neutral-900 leading-tight">
                Your flight was cancelled.
              </p>
              <p className="text-[12px] md:text-[14px] text-neutral-600 leading-relaxed mb-5 md:mb-10">
                I've secured the <span className="text-black font-bold underline decoration-sky-500 underline-offset-4 decoration-2">last room</span> at the Sheraton and a car is waiting at Door 4.
              </p>
              <button className="w-full py-3 md:py-5 bg-black rounded-lg md:rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-white">
                View Reservation
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      <TravelOSExperience isOpen={isEcosystemLogicOpen} onClose={() => setIsEcosystemLogicOpen(false)} />
    </main>
  );
}
