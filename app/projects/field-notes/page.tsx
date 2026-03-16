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
  ArrowRight, 
  Cpu, 
  MapPin, 
  Search, 
  BrainCircuit,
  CloudRain,
  Fingerprint
} from 'lucide-react';

// --- Constants & Variants ---
const NAT_GEO_YELLOW = "#FFDD00"; 
const contentBounds = "container mx-auto px-6";

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
    <div className="group border border-neutral-200 rounded-2xl p-8 bg-white hover:border-[#FFDD00] transition-all duration-300 shadow-sm hover:shadow-xl">
      <div className="space-y-6">
        {[
          { label: 'Situation', val: situation, bold: true },
          { label: 'Problem', val: problem },
          { label: 'Local Insight', val: insight, highlight: true },
          { label: 'Suggested Moves', val: moves },
          { label: 'Why This Works', val: why },
        ].map((item) => (
          <div key={item.label}>
            <p className="text-[9px] uppercase tracking-[0.25em] text-neutral-400 mb-2 font-black flex items-center">
              <span className={`w-1.5 h-1.5 bg-[#FFDD00] mr-2 ${item.highlight ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`} />
              {item.label}
            </p>
            <p className={`${item.bold ? 'text-neutral-900 font-bold text-lg' : item.highlight ? 'text-neutral-900 font-serif italic text-base' : 'text-neutral-600 text-sm'} leading-relaxed`}>
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
  const [lastScrollY, setLastScrollY] = useState(0);
  const [atTop, setAtTop] = useState(true);
  const [isNavbarWhite, setIsNavbarWhite] = useState(false);

  const lastScrollYRef = useRef(0);
  const isMobileMenuOpenRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      try {
        const scrollPosition = window.scrollY;
        setIsNavbarWhite(scrollPosition > 100);
        setAtTop(scrollPosition < 10);
        if (isMobileMenuOpenRef.current) setIsMobileMenuOpen(false);
        const currentScrollY = window.scrollY;
        const previousScrollY = lastScrollYRef.current;
        if (currentScrollY > previousScrollY) setScrollDirection('down');
        else if (currentScrollY < previousScrollY) setScrollDirection('up');
        lastScrollYRef.current = currentScrollY;
        setLastScrollY(currentScrollY);
      } catch (error) { console.debug('Scroll error:', error); }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackHome = () => router.push('/');
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const linkClass = (isActive: boolean) => `text-[11pt] transition-colors duration-500 ${isNavbarWhite ? (isActive ? 'text-blue-500' : 'text-black hover:text-blue-400') : (isActive ? 'text-blue-500' : 'text-gray-700 hover:text-blue-400')}`;

  return (
    <main className="min-h-screen bg-white text-neutral-900 selection:bg-[#FFDD00]/30">
      
      {/* Navigation - Logic Untouched */}
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
              <button onClick={handleBackHome} className="hover:opacity-80 transition-opacity p-0 m-0 w-fit h-fit flex items-center py-4">
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
                  <Link href="/projects/previous" className={linkClass(pathname.startsWith('/projects/previous'))}>Client Work</Link>
                  {pathname.startsWith('/projects/previous') && <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-blue-400 rounded-full"></span>}
                </div>
              </nav>
            </div>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {isMobileMenuOpen && (
            <motion.div key="mobile-menu" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="lg:hidden absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-sm rounded-lg shadow-lg mx-6 border border-white/10">
              <nav className="flex flex-col p-4 px-6 space-y-4">
                <Link href="/projects/field-notes" onClick={() => setIsMobileMenuOpen(false)} className="text-[11pt] text-gray-300 hover:text-white transition-colors">Travel Field Notes</Link>
                <Link href="/projects/travel-and-ai" onClick={() => setIsMobileMenuOpen(false)} className="text-[11pt] text-gray-300 hover:text-white transition-colors">Intelligent Systems (HADE)</Link>
                <Link href="/projects/previous" onClick={() => setIsMobileMenuOpen(false)} className="text-[11pt] text-gray-300 hover:text-white transition-colors">Client Work</Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* HERO SECTION */}
      <motion.section className={`${contentBounds} pt-48 pb-24`} initial="hidden" animate="show" variants={sectionVariants}>
        <div className="max-w-4xl">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-[3px] bg-[#FFDD00]" />
            <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-500 font-bold">Situational Framework</p>
          </div>
           {/* Headline */}
    <h1 
        className="text-3xl md:text-5xl font-bold leading-snug" 
        style={{ fontFamily: "'tiempos-headline-regular', serif" }}
      >
        {/* Primary */}
        <span className="block text-gray-900">
        Captured Context.<span className="block italic text-gray-500">Suggested Moves.</span>
        </span>

      {/* Sub-primary */}
      <span 
        className="block mt-4 text-gray-700 text-xl md:text-2xl font-medium leading-relaxed max-w-xl lg:max-w-2xl"
        style={{ fontFamily: "'tiempos-headline-regular', serif" }}
      >
        I am currently field testing a system that captures real world travel telemetry and converts it into reusable decision playbooks for complex urban{" "}
        <span className="whitespace-nowrap">environments.</span>
      </span>
    </h1> 
      </div>
      </motion.section>

      {/* 01. THE KNOWLEDGE LAYER */}
      <section className="py-24 bg-white">
        <div className={contentBounds}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6">
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={sectionVariants}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#FFDD00] flex items-center justify-center shadow-sm">
                    <BookOpen className="w-5 h-5 text-black" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-black text-neutral-400">Layer 01 // The Archive</span>
                </div>
                {/* Headline */}
{/* 01. THE EDITORIAL HANDSHAKE */}
<header className="mb-20">
  <h1 
    className="text-3xl md:text-5xl font-bold leading-snug" 
    style={{ fontFamily: "'tiempos-headline-regular', serif" }}
  >
    {/* Primary */}
    <span 
      className="block text-gray-900 max-w-xl lg:max-w-2xl text-balance"
      style={{ fontFamily: "'tiempos-headline-regular', serif" }}
    >
      The Editorial Handshake
    </span>

    {/* Sub-primary */}
    <span 
  className="block mt-4 text-gray-700 text-xl md:text-2xl font-medium leading-relaxed max-w-xl lg:max-w-2xl text-balance"
  style={{ fontFamily: "'tiempos-headline-regular', serif" }}
>
      <p>
        I am engineering an automated pipeline that synthesizes industry travel reports, my 10+ global travel experience and real time telemetry into adaptive situational playbooks.
      </p>
    </span>
  </h1> 
</header>

{/* Supporting Detail Block */}
<div 
  className="max-w-xl lg:max-w-2xl text-lg text-neutral-500 leading-relaxed font-light text-balance"
  style={{ fontFamily: "'Roboto', sans-serif" }}
>
  <p>
    In this current phase, HADE uses agentic logic to generate playbooks from high integrity data APIs and environmental signals. While the core engine is powered by AI synthesis, the roadmap is focused on a hybrid intelligence model where these digital strategies are eventually calibrated and verified by direct human expertise.
  </p>
</div>
                
              </motion.div>
            </div>
            <div className="lg:col-span-6 relative">
              <div className="relative p-10 bg-[#F9F7F2] rounded-[3rem] border border-black/5 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Network className="w-64 h-64 text-black" />
                </div>
                <div className="relative z-10">
                  <div className="bg-white p-8 rounded-2xl shadow-md mb-8 border-l-8 border-[#FFDD00]">
                    <p className="text-[9px] uppercase tracking-widest text-neutral-400 font-black mb-3">Source: Lisbon Field Note // #042</p>
                    <p className="font-serif italic text-xl text-neutral-800 leading-relaxed">
                      “When the Tagus mist rolls in, the Miradouro crowds vanish. Head to the hidden arcade behind the Chiado ruins...”
                    </p>
                  </div>
                  <div className="flex justify-center my-6">
                    <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-px h-16 bg-gradient-to-b from-[#FFDD00] to-transparent" />
                  </div>
                  <div className="bg-neutral-900 text-white p-8 rounded-2xl shadow-lg border border-white/10">
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

      {/* 02. SYSTEM DECONSTRUCTION (NEW COMPLIANT STYLE) */}
      <section className="border-t border-neutral-100 bg-[#F9F7F2] py-24">
        <div className={contentBounds}>
        <header className="mb-20">
  <div className="flex items-center gap-3 mb-6">
    <div className="w-10 h-10 rounded-full bg-[#FFDD00] flex items-center justify-center shadow-sm">
      <BookOpen className="w-5 h-5 text-black" />
    </div>  
    <span className="text-[10px] uppercase tracking-[0.3em] font-black text-neutral-400" style={{ fontFamily: "'Roboto', sans-serif" }}>
      Layer 02 // Logic Handshake
    </span>
  </div>

  <h1 
    className="text-3xl md:text-5xl font-bold leading-snug" 
    style={{ fontFamily: "'tiempos-headline-regular', serif" }}
  >
{/* Primary */}
<span 
  className="block text-gray-900 max-w-xl lg:max-w-2xl text-balance"
  style={{ fontFamily: "'tiempos-headline-regular', serif" }}
>
  How the Engine Activates Knowledge
</span>

    {/* Sub-primary (Option 1 flow) */}
    <span 
  className="block mt-3 text-gray-700 text-lg md:text-2xl font-medium leading-snug max-w-xl lg:max-w-2xl text-balance"
  style={{ fontFamily: "'tiempos-headline-regular', serif" }}
>
  Deconstructing the flow from environmental telemetry to a verified strategic move.
</span>
  </h1> 
</header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7 space-y-12 relative">
               {/* Vertical Trace Line */}
              <div className="absolute left-3 top-10 bottom-10 w-[1px] bg-neutral-200 hidden md:block" aria-hidden="true" />

              {/* 01 Observation */}
              <div className="relative md:pl-12">
                <div className="absolute left-0 top-1.5 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-[10px] font-bold z-10">1</div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-widest text-neutral-800 mb-6">Observation (The Signal)</h3>
                  <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
                    {[
                      { l: 'Location', v: 'Chiado, Lisbon', i: <MapPin className="w-3 h-3"/> },
                      { l: 'Weather', v: 'Heavy Rain (85%)', i: <CloudRain className="w-3 h-3"/> },
                      { l: 'User State', v: 'Walking Exploration', i: <Zap className="w-3 h-3"/> },
                      { l: 'Energy', v: 'Moderate (3h Active)', i: <BarChart3 className="w-3 h-3"/> }
                    ].map(s => (
                      <div key={s.l}>
                        <p className="text-[9px] text-neutral-400 uppercase font-black mb-1 flex items-center gap-1">{s.i}{s.l}</p>
                        <p className="text-sm font-bold text-neutral-800">{s.v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 02 Retrieval */}
              <div className="relative md:pl-12">
                <div className="absolute left-0 top-1.5 w-6 h-6 bg-[#FFDD00] text-black rounded-full flex items-center justify-center text-[10px] font-bold z-10 shadow-sm">2</div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-widest text-neutral-800 mb-6">Retrieval (The Archive)</h3>
                  <div className="bg-white border-l-8 border-[#FFDD00] p-8 rounded-r-2xl shadow-xl">
                    <div className="flex items-center gap-2 mb-4 text-[#A38D00]">
                      <Search className="w-4 h-4" />
                      <p className="text-[10px] font-black uppercase tracking-widest">Matched: LIS_042_STRAT</p>
                    </div>
                    <p className="text-neutral-900 italic font-serif text-xl leading-relaxed">
                      &ldquo;Chiado&apos;s hills become slick and cafes overflow during sudden rain. Local movement shifts to the covered 18th-century arcades and gallery corridors.&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* 03 Synthesis */}
              <div className="relative md:pl-12">
                <div className="absolute left-0 top-1.5 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-[10px] font-bold z-10">3</div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-widest text-neutral-800 mb-6">Synthesis (Agentic Logic)</h3>
                  <div className="space-y-4">
                    {[
                      { l: "Predictive Validity", d: "Checks L1 telemetry to confirm rain will persist for 60+ minutes." },
                      { l: "Trust Calibration", d: "Detects signal freshness—verified local checked in 45m ago." },
                      { l: "Heuristic Filter", d: "Rejects 'Nearby Cafe' due to high-occupancy probability." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 items-center bg-white/50 p-4 rounded-xl border border-black/5">
                        <Shield className="w-4 h-4 text-[#FFDD00] flex-shrink-0" />
                        <p className="text-sm text-neutral-600 leading-snug"><span className="font-black text-neutral-900 uppercase text-[11px] tracking-wide mr-2">{item.l}:</span> {item.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* PHONE PROTOTYPE PREVIEW */}
            <div className="lg:col-span-5 sticky top-32 flex justify-center">
              <div className="relative w-full max-w-[340px] aspect-[9/19] bg-neutral-900 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[10px] border-neutral-800 overflow-hidden">
                {/* Screen Content */}
                <div className="h-full w-full bg-white p-8 pt-14">
                  <div className="flex items-center gap-2 mb-10">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest font-black text-neutral-400">HADE Live View</span>
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    className="bg-[#F9F7F2] rounded-[2.5rem] p-8 shadow-2xl border border-black/5"
                  >
                    <p className="font-serif italic text-3xl mb-4 text-neutral-900">It&apos;s pouring.</p>
                    <p className="text-[14px] text-neutral-600 leading-relaxed mb-10">
                      Take the <span className="text-black font-bold underline decoration-[#FFDD00] underline-offset-4 decoration-2">Bertrand Loop</span> to stay in motion. Carlos verified seating is open.
                    </p>
                    <button className="w-full py-5 bg-[#FFDD00] rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-black shadow-lg hover:scale-105 transition-transform">
                      Accept Strategy
                    </button>
                    <p className="text-center text-[9px] text-neutral-400 mt-6 uppercase tracking-widest font-bold">Not the move?</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. THE COMMUNITY SIGNAL */}
      <section className="border-t border-neutral-100 bg-white py-24">
        <div className={contentBounds}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-neutral-900" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-neutral-400">Layer 03 // Scaling Expertise</span>
              </div>
              <header className="mb-20">
              <h1 
                className="text-3xl md:text-5xl font-bold leading-snug" 
                style={{ fontFamily: "'tiempos-headline-regular', serif" }}
              >
            {/* Primary */}
            <span 
              className="block text-gray-900 max-w-xl lg:max-w-2xl text-balance"
              style={{ fontFamily: "'tiempos-headline-regular', serif" }}
            >
            The Community Signal
            </span>
                {/* Sub-primary (Option 1 flow) */}
                <span 
              className="block mt-3 text-gray-700 text-lg md:text-2xl font-medium leading-snug max-w-xl lg:max-w-2xl text-balance"
              style={{ fontFamily: "'tiempos-headline-regular', serif" }}
                >
                <p>
                The "Editorial Handshake" helps HADE turn traveler insights into polished situational moves that keep the knowledge base growing in real time.                </p>
                </span>
                </h1> 
              </header>
             
              <div className="mt-12 grid grid-cols-2 gap-12 border-t border-neutral-100 pt-12">
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
            <div className="lg:col-span-6">
              <div className="bg-[#F9F7F2] p-12 rounded-[3.5rem] border border-black/5 relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 opacity-5">
                   <BrainCircuit className="w-64 h-64 text-black" />
                </div>
                <div className="flex flex-col gap-10 relative z-10">
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 transform -rotate-2">
                    <p className="text-[9px] uppercase font-black text-neutral-400 mb-3">Input: Raw Traveler Note</p>
                    <p className="text-base font-medium italic text-neutral-800 leading-snug">"The back room at Cafe A Brasileira is always empty during rain. Good wifi."</p>
                  </div>
                  <div className="flex justify-center"><div className="w-px h-12 bg-neutral-200 border-dashed border-l" /></div>
                  <div className="bg-white p-8 rounded-2xl shadow-xl border-l-8 border-[#FFDD00] transform rotate-1">
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
<section className="border-t border-neutral-100 bg-neutral-950 py-32 text-white overflow-hidden relative">
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
    <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#FFDD00]/5 blur-[120px] rounded-full" />
  </div>

  <div className={`${contentBounds} relative z-10`}>
    <header className="mb-20">
      <div className="flex items-center gap-3 mb-8 opacity-50">
        <Shield className="w-4 h-4 text-[#FFDD00]" />
        <span className="text-[10px] uppercase tracking-[0.3em] font-black text-neutral-500" style={{ fontFamily: "'Roboto', sans-serif" }}>
          Integrity Layer
        </span>
      </div>

      <h1 
        className="text-3xl md:text-5xl font-bold leading-snug" 
        style={{ fontFamily: "'tiempos-headline-regular', serif" }}
      >
        <span 
              className="block text-[#FFDD00] max-w-xl lg:max-w-2xl text-balance"
              style={{ fontFamily: "'tiempos-headline-regular', serif" }}
            >
            I am prioritizing human safety over high volume.
            </span>
        <span 
          className="block mt-4 text-neutral-400 text-xl md:text-2xl font-medium leading-relaxed max-w-xl lg:max-w-2xl"
          style={{ fontFamily: "'tiempos-headline-regular', serif" }}
        >
          I am architecting the safety systems that allow you to follow automated logic with total{" "}
          <span className="whitespace-nowrap">confidence.</span>
        </span>
      </h1> 
    </header>

    <div 
      className="max-w-xl lg:max-w-2xl text-lg text-neutral-500 leading-relaxed font-light border-l border-white/10 pl-8"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <p>
        Spontaneity only works when you can trust the signal. By verifying contributors and using geofenced data, I ensure the engine stays reliable so you can explore without the risk of unverified{" "}
        <span className="whitespace-nowrap">sources.</span>
      </p>
    </div>
  </div>
</section>

      {/* 05. SITUATIONS GRID */}
      <section className="border-t border-neutral-100 bg-white py-24">
        <div className={contentBounds}>
          <div className="max-w-2xl mb-20">
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-6 font-black">The Framework</p>
            <header className="mb-20">
              <h1 
                className="text-3xl md:text-5xl font-bold leading-snug" 
                style={{ fontFamily: "'tiempos-headline-regular', serif" }}
              >
            {/* Primary */}
            <span 
              className="block text-gray-900 max-w-xl lg:max-w-2xl text-balance"
              style={{ fontFamily: "'tiempos-headline-regular', serif" }}
            >
            Travelers think in situations, not lists.
            </span>
                </h1> 
              </header>
          </div>
          <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-6" variants={staggerContainer} initial="hidden" whileInView="show">
            {situationItems.map((item) => (
              <motion.div key={item} variants={fadeItem} className="group bg-white border border-neutral-200 p-8 rounded-2xl hover:border-black hover:shadow-2xl transition-all">
                <div className="w-5 h-5 border-2 border-[#FFDD00] mb-6 group-hover:bg-[#FFDD00] transition-colors" />
                <p className="text-base font-black text-neutral-800 leading-snug">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 06. LOG EXAMPLES */}
      <section className="border-t border-neutral-100 bg-white py-24">
        <div className={contentBounds}>
          <div className="max-w-3xl mb-20">
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-6 font-black">The Field Notes</p>
            <header className="mb-20">
              <h1 
                className="text-3xl md:text-5xl font-bold leading-snug" 
                style={{ fontFamily: "'tiempos-headline-regular', serif" }}
              >
            {/* Primary */}
            <span 
              className="block text-gray-900 max-w-xl lg:max-w-2xl text-balance"
              style={{ fontFamily: "'tiempos-headline-regular', serif" }}
            >
            Real-world example moments
            </span>
                </h1> 
            </header>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {fieldNoteExamples.map((note) => (
              <FieldNoteCard key={note.situation} {...note} />
            ))}
          </div>
        </div>
      </section>

   {/* 07. PRODUCT IMPACT */}
<section className="border-t border-neutral-100 bg-[#F9F7F2] py-32">
  <div className={contentBounds}>
    <header className="mb-20">
      <h2 
        className="text-3xl md:text-5xl font-bold leading-snug" 
        style={{ fontFamily: "'tiempos-headline-regular', serif" }}
      >
        {/* Primary */}
        <span className="block text-gray-900 max-w-xl lg:max-w-2xl text-balance">
          System Objectives
        </span>

        {/* Sub-primary (Option 1 flow) */}
        <span 
          className="block mt-3 text-gray-700 text-lg md:text-2xl font-medium leading-snug max-w-xl lg:max-w-2xl text-balance"
          style={{ fontFamily: "'tiempos-headline-regular', serif" }}
        >
          Defining the core benchmarks for the discovery experience.
        </span>
      </h2> 
    </header>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
      <div className="max-w-xs text-balance">
        <p className="text-4xl font-black text-neutral-900 mb-4 font-serif italic" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
          Velocity
        </p>
        <p className="text-[11px] uppercase font-black text-neutral-400 tracking-[0.2em] mb-6 flex items-center gap-2" style={{ fontFamily: "'Roboto', sans-serif" }}>
          <Zap className="w-3.5 h-3.5 text-[#FFDD00]" /> Decision Logic
        </p>
        <p className="text-base text-neutral-500 leading-relaxed font-light" style={{ fontFamily: "'Roboto', sans-serif" }}>
          I am reducing the time from problem sensed to action taken by bypassing traditional search paralysis.
        </p>
      </div>

      <div className="max-w-xs text-balance">
        <p className="text-4xl font-black text-neutral-900 mb-4 font-serif italic" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
          Distribution
        </p>
        <p className="text-[11px] uppercase font-black text-neutral-400 tracking-[0.2em] mb-6 flex items-center gap-2" style={{ fontFamily: "'Roboto', sans-serif" }}>
          <Users className="w-3.5 h-3.5 text-[#FFDD00]" /> Urban Flow
        </p>
        <p className="text-base text-neutral-500 leading-relaxed font-light" style={{ fontFamily: "'Roboto', sans-serif" }}>
          I am shifting foot traffic away from tourist density clusters toward underutilized community gems.
        </p>
      </div>

      <div className="max-w-xs text-balance">
        <p className="text-4xl font-black text-neutral-900 mb-4 font-serif italic" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
          Equity
        </p>
        <p className="text-[11px] uppercase font-black text-neutral-400 tracking-[0.2em] mb-6 flex items-center gap-2" style={{ fontFamily: "'Roboto', sans-serif" }}>
          <BarChart3 className="w-3.5 h-3.5 text-[#FFDD00]" /> Social Capital
        </p>
        <p className="text-base text-neutral-500 leading-relaxed font-light" style={{ fontFamily: "'Roboto', sans-serif" }}>
          I am converting travel history into trust assets that unlock exclusive community access and expertise.
        </p>
      </div>
    </div>
  </div>
</section>

      {/* FINAL CTA */}
<section className="bg-black py-40 relative overflow-hidden">
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
      className="text-4xl md:text-6xl text-white mb-6 tracking-tighter font-serif italic text-balance" 
      style={{ fontFamily: "'tiempos-headline-regular', serif" }}
    >
      The city is shifting. Ready to move?
    </h2>
    
    <p 
      className="text-neutral-400 text-lg md:text-xl mb-16 max-w-2xl mx-auto leading-relaxed"
      style={{ fontFamily: "'tiempos-headline-regular', serif" }}
    >
      You can check out the field notes or explore the engine that generates situational strategy in{" "}
      <span className="whitespace-nowrap">real time.</span>
    </p>

    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
      {/* PATH A: THE ENGINE */}
      <Link 
        href="/projects/hade-system" 
        className="group w-full md:w-auto bg-[#FFDD00] text-black px-12 py-6 font-black uppercase tracking-[0.2em] text-xs transition-all shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:-translate-y-1"
      >
        Explore HADE Engine
      </Link>

      {/* PATH B: THE CONTENT */}
      <Link 
        href="https://downloadable-travel-packs.vercel.app/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="group w-full md:w-auto bg-transparent border-2 border-white/20 text-white px-12 py-6 font-black uppercase tracking-[0.2em] text-xs transition-all hover:bg-white hover:text-black hover:border-white"
      >
        Access Field Notes
      </Link>
    </div>

    <p className="mt-12 text-[10px] uppercase tracking-[0.4em] text-neutral-600 font-black">
      Phase 01 Active Deployment
    </p>
  </div>
</section>
      

    </main>
  );
}