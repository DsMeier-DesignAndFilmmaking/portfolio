'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, Variants, AnimatePresence, easeOut } from "framer-motion";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

// --- Constants & Variants ---
const NAT_GEO_YELLOW = "#FFDD00"; 
const contentBounds = "max-w-7xl mx-auto px-6";

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
  'Arriving late in a new city', 'Hungry but overwhelmed with options', 'Rainy exploration day',
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

// --- Components ---

function FieldNoteCard({ situation, problem, insight, moves, why }: any) {
  return (
    <div className="group border border-neutral-200 rounded-xl p-6 bg-white hover:border-[#FFDD00] transition-all duration-300 shadow-sm hover:shadow-md">
      <div className="space-y-5">
        {[
          { label: 'Situation', val: situation, bold: true },
          { label: 'Problem', val: problem },
          { label: 'Local Insight', val: insight },
          { label: 'Suggested Moves', val: moves },
          { label: 'Why This Works', val: why },
        ].map((item) => (
          <div key={item.label}>
            <p className="text-[9px] uppercase tracking-[0.25em] text-neutral-400 mb-1.5 font-bold flex items-center">
              <span className="w-1.5 h-1.5 bg-[#FFDD00] mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              {item.label}
            </p>
            <p className={`${item.bold ? 'text-neutral-900 font-semibold text-base' : 'text-neutral-600 text-sm'} leading-relaxed`}>
              {item.val}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

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
      
      {/* Navigation - PRESERVED LOGIC */}
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
        <div className="max-w-7xl mx-auto px-6 relative z-20">
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
                <Link href="/projects/field-notes" className={linkClass(pathname === '/projects/field-notes')}>Travel Field Notes</Link>
                <Link href="/projects/travel-and-ai" className={linkClass(pathname === '/projects/travel-and-ai')}>Intelligent Systems (HADE)</Link>
                <Link href="/projects/previous" className={linkClass(pathname === '/projects/previous')}>Client Work</Link>
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
          <h1 className="text-6xl md:text-8xl font-semibold tracking-tighter text-neutral-900 leading-[0.95] mb-8">
            Field Notes<span className="text-[#FFDD00]">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-500 font-light max-w-2xl leading-relaxed">
            A system for capturing real-world travel situations and converting them into reusable local decision playbooks.
          </p>
        </div>
      </motion.section>

  {/* PROBLEM SECTION - KEPT Scenario Archive // 01 */}
  <motion.section 
        className="border-t border-neutral-100 bg-neutral-50/50" 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true }} 
        variants={sectionVariants}
      >
        <div className={`${contentBounds} py-24`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7">
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-8 leading-tight">
              Most travel recommendations are missing{"\u00A0"}
              <span className="underline decoration-[#FFDD00] decoration-4 underline-offset-8">
                the moment.
              </span>
            </h2>
            <div className="space-y-6 text-neutral-600 text-lg leading-relaxed">
              <p>
                Today’s suggestions are buried in generic lists that assume your environment 
                is{"\u00A0"}constant.
              </p>
              <p>
                Travelers need a decisive strategy for the specific situation they are in, 
                rather than a catalog of places they might never{"\u00A0"}reach.
              </p>
            </div>
          </div>
            <div className="lg:col-span-5">
              <div className="relative p-10 bg-white border border-neutral-200 shadow-xl rounded-sm">
                <div className="absolute top-0 left-0 w-[6px] h-full bg-[#FFDD00]" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#000000] mb-4 font-black">
                  Scenario Archive // 01
                </p>
                <p className="text-neutral-800 text-xl italic font-serif leading-relaxed">
                  “It&apos;s raining in Lisbon at 3pm and every cafe is{"\u00A0"}packed.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SYSTEM DESIGN: THE HANDSHAKE */}
<section className="border-t border-neutral-100 bg-white">
  <div className={`${contentBounds} py-24`}>
    <div className="max-w-3xl mb-16">
      <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-4 font-bold">System Design</p>
      <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-6">Expertise at Scale</h2>
      <p className="text-neutral-600 leading-relaxed text-lg">
        Field Notes act as the system’s strategic brain. When the Spontaneity Engine (HADE) senses a shift in your environment like a sudden Lisbon downpour, it instantly maps your location to a specific travel playbook. This allows the system to translate deep local expertise into a single decisive move for that exact moment.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="p-10 border border-neutral-100 rounded-2xl bg-[#F9F7F2]">
        <h3 className="font-bold text-xl mb-4">The Strategy Layer</h3>
        <p className="text-neutral-500 text-base leading-relaxed mb-8">
          The Field Note is the authoritative source of truth. It contains local logic a machine cannot invent—storytelling and editorial expertise that builds foundational trust.
        </p>
        <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-900 border-t pt-4">Knowledge Base</div>
      </div>
      <div className="p-10 border border-neutral-100 rounded-2xl bg-white shadow-sm">
        <h3 className="font-bold text-xl mb-4">The Delivery Layer</h3>
        <p className="text-neutral-500 text-base leading-relaxed mb-8">
          HADE acts as the real-time processor. It filters long-form strategy through live signals like time and weather to output a high-fidelity Decision Card.
        </p>
        <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#00000] border-t pt-4">Execution Engine</div>
      </div>
    </div>
  </div>
</section>

{/* NON-TECH SYSTEM ARCHITECTURE: THE PIPELINE */}
<section className="border-t border-neutral-100 bg-[#F9F7F2] py-24">
  <div className={contentBounds}>
    <div className="max-w-3xl mb-16">
      <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-4 font-bold">The Simple Version</p>
      <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-6">How it actually works</h2>
      <p className="text-neutral-600 leading-relaxed text-lg italic font-serif">
        "Think of it as a conversation between the city and an expert."
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      {/* Left Side: Process */}
      <div className="lg:col-span-5 space-y-12">
        <div className="relative">
          <div className="mb-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center font-bold text-sm">1</div>
            <h4 className="font-bold uppercase tracking-widest text-xs">HADE Listens</h4>
          </div>
          <p className="text-sm text-neutral-500 leading-relaxed pl-14">
            The engine monitors the world like a sensor. It notices it’s 3:00 PM, your battery is low, and a storm is rolling in.
          </p>
        </div>

        <div className="relative">
          <div className="mb-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center font-bold text-sm">2</div>
            <h4 className="font-bold uppercase tracking-widest text-xs">The Expert Speaks</h4>
          </div>
          <p className="text-sm text-neutral-500 leading-relaxed pl-14">
            It scans the Field Notes library to find a strategy specifically for rainy days in your exact neighborhood.
          </p>
        </div>

        <div className="relative">
          <div className="mb-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#FFDD00] flex items-center justify-center font-bold text-sm text-black">3</div>
            <h4 className="font-bold uppercase tracking-widest text-xs">You Act</h4>
          </div>
          <p className="text-sm text-neutral-500 leading-relaxed pl-14">
            The system turns expert strategy into a clear button. No lists or scrolling—just the best move for right now.
          </p>
        </div>
      </div>

      {/* Right Side: Visual UI Result */}
      <div className="lg:col-span-7 bg-white rounded-[3rem] p-8 md:p-12 border border-neutral-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:flex flex-col gap-4">
             <div className="p-4 bg-neutral-50 rounded-xl border border-black/5 text-center">
                <span className="text-[9px] uppercase font-black text-blue-500 block mb-1">Live Signal</span>
                <span className="text-xs font-medium text-neutral-900">3:15 PM • Rain</span>
             </div>
             <div className="flex justify-center">
                <div className="w-px h-6 bg-neutral-200 border-dashed border-l" />
             </div>
             <div className="p-4 bg-neutral-50 rounded-xl border border-black/5 text-center">
                <span className="text-[9px] uppercase font-black text-neutral-400 block mb-1">Field Note</span>
                <span className="text-xs font-medium italic font-serif text-neutral-900">"Rainfall Loop"</span>
             </div>
             <div className="flex justify-center">
                <div className="w-px h-6 bg-neutral-200 border-dashed border-l" />
             </div>
             <div className="p-4 bg-black rounded-xl shadow-lg text-center">
                <span className="text-[10px] uppercase font-black text-[#FFDD00] block mb-1">Result</span>
                <span className="text-xs font-medium text-white">Generate Move</span>
             </div>
          </div>

          {/* Device Mockup */}
          <div className="relative mx-auto w-full max-w-[240px] aspect-[9/18.5] bg-white rounded-[2.5rem] shadow-2xl border-[6px] border-neutral-900 overflow-hidden">
             <div className="p-6 pt-12">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse mb-6" />
                <p className="font-serif italic text-xl mb-4 leading-tight text-neutral-900">Chiado is a wet mess.</p>
                <div className="h-px bg-neutral-100 w-full mb-6" />
                <p className="text-[11px] text-neutral-500 leading-relaxed mb-8">
                  Skip the cafes. Use the <span className="text-black font-bold">Bertrand Loop</span> to stay dry and keep exploring.
                </p>
                <button className="w-full py-4 bg-[#FFDD00] text-black text-[10px] font-black uppercase tracking-widest rounded-full">
                  Let's Go
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* SITUATIONS GRID */}
      <section className="border-t border-neutral-100 bg-white">
        <div className={`${contentBounds} py-24`}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-4 font-bold">Framework</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900">Experienced travelers think in situations, not lists.</h2>
            </div>
          </div>
          <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4" variants={staggerContainer} initial="hidden" whileInView="show">
            {situationItems.map((item) => (
              <motion.div key={item} variants={fadeItem} className="group bg-white border border-neutral-200 p-6 hover:border-black transition-all cursor-default shadow-sm hover:shadow-none">
                <div className="w-4 h-4 border-2 border-[#FFDD00] mb-4 group-hover:bg-[#FFDD00] transition-colors" />
                <p className="text-sm font-bold text-neutral-800 leading-snug">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* EXAMPLES SECTION */}
      <section className="border-t border-neutral-100 bg-white">
        <div className={`${contentBounds} py-24`}>
          <div className="max-w-3xl mb-16">
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-4 font-bold">Log Examples</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900">Three real-world moments.</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {fieldNoteExamples.map((note) => (
              <FieldNoteCard key={note.situation} {...note} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-black py-32 relative overflow-hidden">
        <div className={`${contentBounds} text-center relative z-10`}>
          <h2 className="text-4xl md:text-6xl font-semibold text-white mb-8 tracking-tighter">Explore the Prototype</h2>
          <Link href="https://downloadable-travel-packs.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#FFDD00] text-black px-12 py-5 font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]">
            Open Field Notes
          </Link>
        </div>
      </section>
    </main>
  );
}