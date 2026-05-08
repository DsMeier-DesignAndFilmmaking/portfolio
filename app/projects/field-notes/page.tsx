'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, Variants, AnimatePresence, easeOut } from "framer-motion";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  BookOpen,
  Network,
  Shield,
  Zap,
  Users,
  BarChart3,
  MapPin,
  Search,
  BrainCircuit,
  CloudRain,
  Fingerprint
} from 'lucide-react';
import { FieldNotesSystemDiagram } from './components/FieldNotesSystemDiagram';
import { PageNavIndicator } from '../../../components/PageNavIndicator';
import TravelOSExperience from '@/src/components/TravelOSExperience';

const FN_SECTIONS = [
  { id: 'fn-hero' ,      label: 'Overview'  },
  { id: 'fn-system',   label: 'System'    },
  { id: 'fn-archive',  label: 'Archive'   },
  { id: 'fn-logic',    label: 'Logic'     },
  { id: 'fn-community',label: 'Community' },
  { id: 'fn-trust',    label: 'Trust'     },
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
  const linkClass = (isActive: boolean) => `text-[11pt] transition-colors duration-500 ${isNavbarWhite ? (isActive ? 'text-blue-500' : 'text-black') : (isActive ? 'text-blue-500' : 'text-gray-700')}`;

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
            <button onClick={toggleMobileMenu} className={`lg:hidden pl-4 py-2 flex items-center justify-end transition-colors duration-500 ${isNavbarWhite ? 'text-black' : 'text-gray-700'}`}>
              <div className="w-6 h-5 relative flex flex-col justify-between items-center">
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
            <div className="hidden lg:block px-6 py-4">
              <nav className="flex items-center space-x-8">
                <div className="relative">
                  <Link href="/projects/field-notes" className={linkClass(pathname.startsWith('/projects/field-notes'))}>Travel Field Notes</Link>
                  {pathname.startsWith('/projects/field-notes') && <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-blue-400 rounded-full"></span>}
                </div>
                <div className="relative">
                  <Link href="/projects/travel-and-ai" className={linkClass(pathname.startsWith('/projects/travel-and-ai'))}>Intelligent Systems (HADE)</Link>
                  {pathname.startsWith('/projects/travel-and-ai') && <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-blue-400 rounded-full"></span>}
                </div>
                <div className="relative">
                  <Link href="/projects/digital-executor" className={linkClass(pathname.startsWith('/projects/digital-executor'))}>Digital Executor</Link>
                  {pathname.startsWith('/projects/digital-executor') && <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-blue-400 rounded-full"></span>}
                </div>
                <div className="relative">
                  <Link href="/projects/previous" className={linkClass(pathname.startsWith('/projects/previous'))}>Client Work</Link>
                  {pathname.startsWith('/projects/previous') && <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-blue-400 rounded-full"></span>}
                </div>
              </nav>
            </div>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {isMobileMenuOpen && (
            <motion.div key="mobile-menu" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="lg:hidden absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-sm rounded-lg mx-6 border border-white/10">
              <nav className="flex flex-col p-4 px-6 space-y-4">
                <Link href="/projects/field-notes" onClick={() => setIsMobileMenuOpen(false)} className="text-[11pt] text-gray-300 transition-colors">Travel Field Notes</Link>
                <Link href="/projects/travel-and-ai" onClick={() => setIsMobileMenuOpen(false)} className="text-[11pt] text-gray-300 transition-colors">Intelligent Systems (HADE)</Link>
                <Link href="/projects/previous" onClick={() => setIsMobileMenuOpen(false)} className="text-[11pt] text-gray-300 transition-colors">Client Work</Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

{/* HERO SECTION */}
<motion.section
  id="fn-hero"
  className={`${contentBounds} mt-[100px] pb-16 md:pb-24 flex flex-col space-y-6`}
  initial="hidden"
  animate="show"
  variants={sectionVariants}
>
  <div className="max-w-2xl flex flex-col space-y-6">
    <div className="flex items-center space-x-3">
      <div className="w-12 h-[3px] bg-[#FFDD00]" />
      <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-500 font-bold">Situational Framework</p>
    </div>

    <h1 className="text-3xl md:text-5xl font-bold leading-tight md:leading-snug font-tiempos">
      <span className="block text-gray-900">
        Captured Context.<span className="block italic text-gray-500">Suggested Moves.</span>
      </span>
      <span className="block mt-6 text-gray-700 text-xl md:text-2xl font-medium leading-relaxed max-w-xl lg:max-w-2xl font-tiempos">
       Currently developing and field-testing Field Notes, a system that captures real-world travel signals and turns them into reusable decision playbooks, powering both a standalone product and the broader <span className="whitespace-nowrap">HADE ecosystem.</span>
      </span>
    </h1>

    <div>
      {/*<button
        type="button"
        onClick={() => setIsEcosystemLogicOpen(true)}
        className="inline-flex items-center rounded-full border border-neutral-300 bg-white/70 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-neutral-800 transition hover:border-neutral-800 hover:bg-neutral-900 hover:text-white"
      >
        [ EXPLORE THE ECOSYSTEM LOGIC ]
      </button>*/}
    </div>
  </div>
</motion.section>

      {/* SYSTEM DIAGRAM */}
      <div id="fn-system">
        <FieldNotesSystemDiagram />
      </div>

      {/* 01. THE KNOWLEDGE LAYER */}
      <section id="fn-archive" className="py-20 md:py-32 bg-white relative z-10">
        <div className={contentBounds}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={sectionVariants}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#FFDD00] flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-black" />
                  </div>
                  <span className="text-[11px] md:text-[10px] uppercase tracking-[0.3em] font-black text-neutral-400">Layer 01 // The Archive</span>
                </div>
                <header className="mb-10">
                  <h2
                    className="text-3xl md:text-5xl font-bold leading-tight md:leading-snug font-tiempos"
                  >
                    <span className="block text-gray-900 max-w-xl lg:max-w-2xl text-balance">
                      The Editorial Handshake
                    </span>
                    <span
                      className="block mt-6 text-gray-700 text-xl md:text-2xl font-medium leading-relaxed max-w-xl lg:max-w-2xl text-balance font-tiempos"
                    >
                      I am engineering an automated pipeline that synthesizes industry travel reports, my 10+ years of global travel experience, and real time telemetry into adaptive situational playbooks.
                    </span>
                  </h2>
                </header>

                <div 
                  className="max-w-xl lg:max-w-2xl text-base md:text-lg text-neutral-500 leading-relaxed font-light text-balance"
                  style={{ fontFamily: "'Roboto', sans-serif" }}
                >
                  <p>
                    In this current phase, HADE uses agentic logic to generate playbooks from high integrity data APIs and environmental signals. While the core engine is powered by AI synthesis, the roadmap is focused on a hybrid intelligence model where these digital strategies are eventually calibrated and verified by direct human expertise.
                  </p>
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-6 relative mt-8 lg:mt-0">
              <div className="relative p-6 md:p-10 bg-white rounded-[2rem] md:rounded-[3rem] border border-neutral-100 overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Network className="w-64 h-64 text-black" />
                </div>
                <div className="relative z-10">
                  <div className="bg-white p-6 md:p-8 rounded-2xl mb-8 border-l-8 border-[#FFDD00] border-t border-r border-b border-neutral-100">
                    <p className="text-[9px] uppercase tracking-widest text-neutral-400 font-black mb-3">Source: Lisbon Field Note // #042</p>
                    <p className="font-serif italic text-lg md:text-xl text-neutral-800 leading-relaxed">
                      “When the Tagus mist rolls in, the Miradouro crowds vanish. Head to the hidden arcade behind the Chiado ruins...”
                    </p>
                  </div>
                  <div className="flex justify-center my-6">
                    <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-px h-12 md:h-16 bg-gradient-to-b from-[#FFDD00] to-transparent" />
                  </div>
                  <div className="bg-neutral-900 text-white p-6 md:p-8 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                      <p className="text-[10px] uppercase font-black tracking-widest text-blue-400">HADE Synthesis Active</p>
                    </div>
                    <p className="text-sm font-medium opacity-90 leading-relaxed">
                      Environmental Match Found: High Humidity + Sunset + Low Social Friction. 
                      Activating <span className="text-amber-400">"Mist Strategy"</span> for immediate presentation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02. SYSTEM DECONSTRUCTION */}
      <section id="fn-logic" className="bg-white py-20 md:py-32 relative z-10">
        <div className={contentBounds}>
          <header className="mb-12 md:mb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#FFDD00] flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-black" />
              </div>  
              <span className="text-[11px] md:text-[10px] uppercase tracking-[0.3em] font-black text-neutral-400" style={{ fontFamily: "'Roboto', sans-serif" }}>
                Layer 02 // Logic Handshake
              </span>
            </div>

            <h2
              className="text-3xl md:text-5xl font-bold leading-tight md:leading-snug font-tiempos"
            >
              <span className="block text-gray-900 max-w-xl lg:max-w-2xl text-balance">
                How the Engine Activates Knowledge
              </span>
              <span className="block mt-4 text-gray-700 text-lg md:text-2xl font-medium leading-relaxed max-w-xl lg:max-w-2xl text-balance">
                Deconstructing the flow from environmental telemetry to a verified strategic move.
              </span>
            </h2>
          </header>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
  <div className="lg:col-span-7 space-y-12 relative">
  <div className="absolute left-3 top-10 bottom-10 w-[1px] bg-neutral-200 hidden md:block z-0" aria-hidden="true" />

{/* Step 1 */}
<div className="space-y-6">
  {/* Header Row: Vertically Aligned */}
  <div className="flex items-center gap-4 md:gap-6 relative z-10">
    <div className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-[10px] font-bold relative z-10">
      1
    </div>
    <h3 className="font-black text-sm uppercase tracking-widest text-neutral-800">
      Observation (The Signal)
    </h3>
  </div>

  {/* Content Row: Indented to match text alignment */}
  <div className="md:pl-12 pl-10">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-6 rounded-2xl border border-neutral-100">
      {[
        { l: 'Location', v: 'Chiado, Lisbon', i: <MapPin className="w-3 h-3"/> },
        { l: 'Weather', v: 'Heavy Rain (85%)', i: <CloudRain className="w-3 h-3"/> },
        { l: 'User State', v: 'Walking Exploration', i: <Zap className="w-3 h-3"/> },
        { l: 'Energy', v: 'Moderate (3h Active)', i: <BarChart3 className="w-3 h-3"/> }
      ].map(s => (
        <div key={s.l}>
          <p className="text-[9px] text-neutral-400 uppercase font-black mb-1 flex items-center gap-1">
            {s.i}{s.l}
          </p>
          <p className="text-sm font-bold text-neutral-800">{s.v}</p>
        </div>
      ))}
    </div>
  </div>
</div>

{/* Step 2 */}
<div className="space-y-6">
  {/* Header Row: Vertically Aligned */}
  <div className="flex items-center gap-4 md:gap-6">
    <div className="flex-shrink-0 w-6 h-6 bg-[#FFDD00] text-black rounded-full flex items-center justify-center text-[10px] font-bold relative z-10">
      2
    </div>
    <h3 className="font-black text-sm uppercase tracking-widest text-neutral-800">
      Retrieval (The Archive)
    </h3>
  </div>

  {/* Content Row: Indented */}
  <div className="md:pl-12 pl-10">
    <div className="bg-white border-l-8 border-[#FFDD00] p-6 md:p-8 rounded-r-2xl border-t border-r border-b border-neutral-100">
      <div className="flex items-center gap-2 mb-4 text-[#A38D00]">
        <Search className="w-4 h-4" />
        <p className="text-[10px] font-black uppercase tracking-widest">Matched: LIS_042_STRAT</p>
      </div>
      <p className="text-neutral-900 italic font-serif text-lg md:text-xl leading-relaxed">
        &ldquo;Chiado&apos;s hills become slick and cafes overflow during sudden rain. Local movement shifts to the covered 18th-century arcades and gallery corridors.&rdquo;
      </p>
    </div>
  </div>
</div>

{/* Step 3 */}
<div className="space-y-6">
  {/* Header Row: Vertically Aligned */}
  <div className="flex items-center gap-4 md:gap-6">
    <div className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-[10px] font-bold relative z-10">
      3
    </div>
    <h3 className="font-black text-sm uppercase tracking-widest text-neutral-800">
      Synthesis (Agentic Logic)
    </h3>
  </div>

  {/* Content Row: Indented */}
  <div className="md:pl-12 pl-10">
    <div className="space-y-4">
      {[
        { l: "Predictive Validity", d: "Checks L1 telemetry to confirm rain will persist for 60+ minutes." },
        { l: "Trust Calibration", d: "Detects signal freshness—verified local checked in 45m ago." },
        { l: "Heuristic Filter", d: "Rejects 'Nearby Cafe' due to high-occupancy probability." }
      ].map((item, i) => (
        <div key={i} className="flex gap-4 items-center bg-white p-4 rounded-xl border border-neutral-100">
          <Shield className="w-4 h-4 text-[#FFDD00] flex-shrink-0" />
          <p className="text-sm text-neutral-600 leading-snug">
            <span className="font-black text-neutral-900 uppercase text-[11px] tracking-wide mr-2">
              {item.l}:
            </span> 
            {item.d}
          </p>
        </div>
      ))}
    </div>
  </div>
</div>

</div>

 <div className="lg:col-span-5 lg:sticky lg:top-32 flex justify-center mt-10 lg:mt-0">
  <div className="relative w-full max-w-[280px] md:max-w-[340px] 
                  aspect-[9/14] md:aspect-[9/19]   /* shorter on mobile */
                  bg-neutral-900 
                  rounded-[2.5rem] md:rounded-[3.5rem] 
                  border-[6px] md:border-[10px] 
                  border-neutral-800 
                  overflow-hidden 
                  scale-[0.92] md:scale-100        /* subtle shrink on mobile */
  ">
    
    {/* Screen */}
    <div className="h-full w-full bg-white 
                    p-4 md:p-8 
                    pt-8 md:pt-14   /* reduce top dead space */
    ">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-5 md:mb-10">
        <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-blue-500 animate-pulse" />
        <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-black text-neutral-400">
          HADE Live View
        </span>
      </div>
      
      {/* Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        className="bg-white 
                   rounded-[1.5rem] md:rounded-[2.5rem] 
                   p-4 md:p-8 
                   border border-neutral-100"
      >
        <p className="font-serif italic text-xl md:text-3xl mb-3 md:mb-4 text-neutral-900">
          It&apos;s crowded there.
        </p>

        <p className="text-[12px] md:text-[14px] text-neutral-600 leading-relaxed mb-5 md:mb-10">
          Take the <span className="text-black font-bold underline decoration-[#FFDD00] underline-offset-4 decoration-2">Bertrand Loop</span> to stay in motion. Carlos verified flow is great and seating is open.
        </p>

        <button
        className="w-full py-3 md:py-5 
        bg-[#FFDD00] 
        rounded-lg md:rounded-2xl 
        text-[10px] md:text-[11px] 
        font-black uppercase tracking-[0.2em] text-black
        cursor-default pointer-events-none"
      >
        Accept Strategy
      </button>

        <p className="text-center text-[10px] md:text-[9px] text-neutral-400 mt-4 md:mt-6 uppercase tracking-widest font-bold">
          Not the move?
        </p>
      </motion.div>
    </div>
  </div>
</div>
          </div>
        </div>
      </section>

      {/* 03. THE COMMUNITY SIGNAL */}
      <section id="fn-community" className="bg-white py-20 md:py-32 relative z-10">
        <div className={contentBounds}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-neutral-900" />
                <span className="text-[11px] md:text-[10px] uppercase tracking-[0.3em] font-black text-neutral-400">Layer 03 // Scaling Expertise</span>
              </div>
              <header className="mb-10">
                <h2
                  className="text-3xl md:text-5xl font-bold leading-tight md:leading-snug font-tiempos"
                >
                  <span className="block text-gray-900 max-w-xl lg:max-w-2xl text-balance">
                    The Community Signal
                  </span>
                  <span className="block mt-6 text-gray-700 text-lg md:text-2xl font-medium leading-relaxed max-w-xl lg:max-w-2xl text-balance">
                    The "Editorial Handshake" helps HADE turn traveler insights into polished situational moves that keep the knowledge base growing in real time.
                  </span>
                </h2>
              </header>
             
              <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 border-t border-neutral-100 pt-8 md:pt-12">
                <div>
                  <h4 className="font-black text-[11px] uppercase tracking-widest text-neutral-900 mb-3">Signal Ingestion</h4>
                  <p className="text-sm text-neutral-500 leading-relaxed font-light">Raw user intent captured via geofenced triggers and biometric validation.</p>
                </div>
                <div>
                  <h4 className="font-black text-[11px] uppercase tracking-widest text-neutral-900 mb-3">Agentic Refinement</h4>
                  <p className="text-sm text-neutral-500 leading-relaxed font-light">AI synthesizes the "Move" to match the authoritative Field Note framework.</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 mt-8 lg:mt-0">
              <div className="bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[3.5rem] border border-neutral-100 relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 opacity-5">
                   <BrainCircuit className="w-64 h-64 text-black" />
                </div>
                <div className="flex flex-col gap-8 md:gap-10 relative z-10">
                  <div className="bg-white p-6 md:p-8 rounded-2xl border border-neutral-100 transform -rotate-1 md:-rotate-2">
                    <p className="text-[9px] uppercase font-black text-neutral-400 mb-3">Input: Raw Traveler Note</p>
                    <p className="text-base font-medium italic text-neutral-800 leading-snug">"The back room at Cafe A Brasileira is always empty during rain. Good wifi."</p>
                  </div>
                  <div className="flex justify-center"><div className="w-px h-8 md:h-12 bg-neutral-200 border-dashed border-l" /></div>
                  <div className="bg-white p-6 md:p-8 rounded-2xl border-l-8 border-[#FFDD00] transform rotate-1 border-t border-r border-b border-neutral-100">
                    <p className="text-[9px] uppercase font-black text-[#A38D00] mb-3">Output: Synthesized Note</p>
                    <p className="text-lg font-serif italic text-neutral-900 leading-relaxed">
                      "When the rain hits Chiado, bypass the storefronts. The rear gallery at A Brasileira offers a quiet retreat for deep work."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04. TRUST & SAFETY SUBSTRATE */}
      <section id="fn-trust" className="bg-neutral-950 py-20 md:py-32 text-white overflow-hidden relative z-10">
        <div className={`${contentBounds} relative z-10`}>

          {/* Header */}
          <motion.header
            className="mb-12 md:mb-20"
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={sectionVariants}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-[#FFDD00] flex items-center justify-center">
                <Shield className="w-5 h-5 text-black" />
              </div>
              <span className="text-[11px] md:text-[10px] uppercase tracking-[0.3em] font-black text-neutral-500" style={{ fontFamily: "'Roboto', sans-serif" }}>
                Layer 04 // Integrity Architecture
              </span>
            </div>

            <h2
              className="text-3xl md:text-5xl font-bold leading-tight md:leading-snug font-tiempos"
            >
              <span className="block text-[#FFDD00] max-w-xl lg:max-w-3xl text-balance italic mb-4">
                Trust is an engineering constraint, not a feature.
              </span>
              <span className="block text-neutral-400 text-xl md:text-2xl font-medium leading-relaxed max-w-xl lg:max-w-2xl">
                Every rule in the integrity layer exists because a specific failure mode was identified. These constraints shaped the architecture — they were not added afterward.
              </span>
            </h2>
          </motion.header>

          {/* Constraint Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-20"
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {[
              {
                constraint: "Signal Freshness Budget",
                rule: "Notes degrade after 3 hours",
                detail: "Field Notes contribute to synthesis only within a 3-hour credibility window. Notes older than 24 hours are archived and excluded unless re-verified by a second contributor in the same zone.",
                tradeoff: "Tradeoff: Reduced recall volume in slow-update areas. Accepted to prevent stale data from triggering confident recommendations.",
                Icon: Zap,
                badge: "Latency-Adjacent",
              },
              {
                constraint: "Interaction Pacing Governor",
                rule: "≥20 min gap between surfaces",
                detail: "The Dopamine Governor enforces a minimum 20-minute cooldown between suggestions surfaced to any individual session. A suggestion surfaced too frequently becomes noise — and noise erodes trust faster than silence.",
                tradeoff: "Tradeoff: Missed opportunity windows in fast-changing environments. Accepted to protect long-term engagement integrity.",
                Icon: BrainCircuit,
                badge: "Pacing Constraint",
              },
              {
                constraint: "Local-First GPS Policy",
                rule: "No raw coordinates transmitted",
                detail: "Location is resolved to a named zone (e.g. 'Chiado') on-device before any server communication. Raw GPS coordinates are never stored or transmitted. This was a founding architectural constraint, not a retroactive privacy patch.",
                tradeoff: "Tradeoff: Zone-level precision reduces hyper-local accuracy. Accepted as a non-negotiable privacy boundary.",
                Icon: Fingerprint,
                badge: "Privacy Boundary",
              },
              {
                constraint: "Contributor Geofence Gate",
                rule: "500m radius check-in required",
                detail: "Check-ins must be recorded within 500m of the referenced location to count toward a Field Note's credibility score. Notes submitted outside this radius enter a 48-hour cross-verification queue and cannot trigger synthesis until resolved.",
                tradeoff: "Tradeoff: Increased contributor friction at the point of submission. Accepted to ensure the knowledge base reflects direct, firsthand observation.",
                Icon: MapPin,
                badge: "Source Integrity",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeItem}
                className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 md:p-8 flex flex-col gap-5"
              >
                {/* Card header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FFDD00] flex items-center justify-center flex-shrink-0">
                      <item.Icon className="w-4 h-4 text-black" />
                    </div>
                    <span
                      className="text-[9px] font-black uppercase tracking-widest text-neutral-500"
                      style={{ fontFamily: "'Roboto', sans-serif" }}
                    >
                      {item.constraint}
                    </span>
                  </div>
                  <span
                    className="text-[8px] font-black uppercase tracking-wider text-[#FFDD00] bg-[#FFDD00]/10 border border-[#FFDD00]/20 px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0"
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                  >
                    {item.badge}
                  </span>
                </div>

                {/* Rule + detail */}
                <div>
                  <p
                    className="text-base md:text-lg font-bold text-white mb-3 font-tiempos"
                  >
                    {item.rule}
                  </p>
                  <p
                    className="text-sm text-neutral-400 leading-relaxed"
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                  >
                    {item.detail}
                  </p>
                </div>

                {/* Tradeoff callout */}
                <div className="border-t border-white/[0.08] pt-4">
                  <p
                    className="text-[10px] text-neutral-600 leading-relaxed font-mono"
                  >
                    {item.tradeoff}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Closing rationale */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={sectionVariants}
            className="border-l border-white/10 pl-6 md:pl-8 max-w-2xl"
          >
            <p
              className="text-[10px] uppercase tracking-[0.3em] font-black text-neutral-300 mb-4"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              Design Rationale
            </p>
            <p
              className="text-base md:text-lg text-neutral-400 leading-relaxed font-light"
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              Each constraint above represents a deliberate tradeoff. The system does less in certain conditions to do one thing reliably: surface suggestions a traveler can act on without second-guessing the source.
            </p>
          </motion.div>

        </div>
      </section>

      {/* 05. SITUATIONS GRID */}
      <section className="bg-white py-20 md:py-32 relative z-10">
        <div className={contentBounds}>
        <div className="max-w-2xl mb-12 md:mb-20">
          <p className="text-[11px] md:text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-6 font-black">
            The Framework
          </p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight font-tiempos">
            Travelers think in situations, not&nbsp;lists.
          </h2>
        </div>
          <motion.div
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
  variants={staggerContainer}
  initial="hidden"
  whileInView="show"
>
  {situationItems.map((item) => (
    <motion.div
      key={item}
      variants={fadeItem}
      className="group bg-white border border-neutral-200 p-6 md:p-8 rounded-2xl"
    >
      {/* Updated yellow block */}
      <div className="w-4 h-4 md:w-5 md:h-5 bg-[#FFDD00] mb-6 rounded-sm" />

      {/* Text */}
      <p className="text-base font-black text-neutral-800 leading-snug">{item}</p>
    </motion.div>
  ))}
</motion.div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-32 relative z-10">
  <div className={contentBounds}>
    <div className="max-w-3xl mb-12 md:mb-20 text-left">
      <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 mb-6 font-black text-left">
        The Field Notes
      </p>
      <h2 className="text-3xl md:text-5xl font-bold leading-tight text-left font-tiempos text-neutral-900">
        Real-world example moments
      </h2>
    </div>
    
    {/* Grid Adjusted: 1 col on mobile, 2 cols on MacBook/Tablet, 3 only on XL Desktop */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
      {fieldNoteExamples.map((note) => (
        <FieldNoteCard key={note.situation} {...note} />
      ))}
    </div>
  </div>
</section>

      {/* FINAL CTA */}
      <section className="bg-black py-24 md:py-40 relative z-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image 
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/grain.png`} 
            alt="" 
            fill 
            className="object-cover" 
          />
        </div>
        
        <div className={`${contentBounds} text-center relative z-10`}>
          <h2
            className="text-4xl md:text-6xl text-white mb-6 tracking-tighter font-serif italic text-balance font-tiempos"
          >
            The city is shifting. Ready to move?
          </h2>
          
          <p
            className="text-neutral-400 text-lg md:text-xl mb-12 md:mb-16 max-w-2xl mx-auto leading-relaxed font-tiempos"
          >
            You can check out the field notes or explore the engine that generates situational strategy in{" "}
            <span className="whitespace-nowrap">real time.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <Link 
              href="/projects/travel-and-ai" 
              className="group w-full sm:w-auto bg-transparent border-2 border-white/20 text-white px-10 md:px-12 py-5 md:py-6 font-black uppercase tracking-[0.2em] text-[10px] md:text-xs transition-all"

            >
              Explore HADE Engine
            </Link>

            <Link 
              href="https://downloadable-travel-packs.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group w-full sm:w-auto bg-[#FFDD00] text-black px-10 md:px-12 py-5 md:py-6 font-black uppercase tracking-[0.2em] text-[10px] md:text-xs transition-all"
            >
              Access Field Notes
            </Link>
          </div>

          <p className="mt-12 text-[10px] uppercase tracking-[0.4em] text-neutral-600 font-black">
            Phase 01 Active Deployment
          </p>
        </div>
      </section>

      <TravelOSExperience isOpen={isEcosystemLogicOpen} onClose={() => setIsEcosystemLogicOpen(false)} />
    </main>
  );
}
