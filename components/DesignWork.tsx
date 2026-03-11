// ✅ STATIC DESIGN WORK SECTION - No 'use client', no hooks, no JS behavior
import Link from 'next/link';

export default function DesignWork() {
  return (
    <section id="work" className="bg-white relative pb-[96px] md:pb-[140px]" aria-label="Design Work">
  <div className="max-w-4xl mx-auto px-6 relative">
    <div className="w-full">
      {/* Heading */}
      <div className="mb-12" style={{ maxWidth: '576px', margin: '0 auto' }}>
        <h1 
          className="hero-title font-sf-pro-display font-bold leading-[1.1] tracking-tight text-left" 
          style={{ 
            fontSize: 'clamp(2.125rem, 4.5vw, 3.75rem)', 
            whiteSpace: 'normal',
            fontFamily: "'tiempos-headline-regular', serif",
            marginBottom: 'calc(1.32 * 1.5rem)'
          }}
        >
          <span className="bg-gradient-to-r from-black via-gray-700 to-gray-500 bg-clip-text text-transparent animate-gradient-shift bg-[length:300%_auto] font-bold">Design Work</span>
        </h1>
      </div>

      {/* Description Paragraphs */}
      <div className="mb-12" style={{ maxWidth: '576px', margin: '0 auto' }}>
        <p className="text-xl text-gray-700 leading-relaxed mb-6" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
          My approach is rooted in systems thinking. I focus on how people, interfaces, environments, and technology interact as part of a larger whole, designing products that adapt to real-world context.
        </p>
        <p className="text-xl text-gray-700 leading-relaxed mb-6" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
          This work represents an evolution from static situational data to agentic systems—moving from "field notes" for humans to "decision engines" for autonomous travel agents.
        </p>
      </div>

      {/* Agentic Discovery Stack Diagram */}
      <div className="max-w-[576px] mx-auto bg-gray-50/50 border border-gray-100 rounded-2xl py-12 px-8 mb-12">
        <div className="text-center mb-8">
          {/* Active Project Label */}
          <div className="flex justify-center items-center gap-2 mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">
              Current Passion Project & Build
            </span>
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900"
            style={{ fontFamily: "'tiempos-headline-regular', serif" }}
          >
            Agentic Discovery Stack
          </h2>
          <p className="text-sm text-gray-500 mt-2" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
          Bridging situational field notes with agentic orchestration, HADE is a hyperlocal decision engine that transforms environmental context and trusted signals into confident travel actions.
          </p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
          <div className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col justify-between group">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-gray-400 font-semibold mb-2">Substrate</p>
              <p className="text-gray-900 font-semibold">Field Notes Intelligence</p>
            </div>
            <Link href="https://downloadable-travel-packs.vercel.app/" target="_blank" className="mt-4 text-[9px] font-bold uppercase tracking-widest text-blue-500 hover:text-blue-700 transition-colors flex items-center">
              Explore Layer <span className="ml-1">→</span>
            </Link>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-gray-400 font-semibold mb-2">Validation</p>
              <p className="text-gray-900 font-semibold">Trust &amp; Authenticity</p>
            </div>
            <span className="mt-4 text-[9px] font-bold uppercase tracking-widest text-gray-300">Signal Processing</span>
          </div>
        </div>

        {/* Connectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 mb-4">
          <div className="flex justify-center">
            <span className="block w-px h-10 bg-gradient-to-b from-gray-300 to-blue-400" />
          </div>
          <div className="flex justify-center">
            <span className="block w-px h-10 bg-gradient-to-b from-gray-300 to-blue-400" />
          </div>
        </div>

        {/* Spontaneity Engine */}
        <div className="relative overflow-hidden rounded-2xl p-6 text-white bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] shadow-[0_18px_30px_-18px_rgba(37,99,235,0.7)] group">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 opacity-30 animate-pulse" />
          <div className="relative flex flex-col h-full">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-blue-100 mb-2" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                  The Brain
                </p>
                <h3 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                  Spontaneity Engine
                </h3>
              </div>
              <Link href="/projects/travel-and-ai" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 mt-4" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
              <span className="px-3 py-1 rounded-full bg-white/15 text-xs uppercase tracking-wider">Context Engine</span>
              <span className="px-3 py-1 rounded-full bg-white/15 text-xs uppercase tracking-wider">Decision Modules</span>
            </div>
            <Link href="/projects/travel-and-ai" className="mt-6 text-[10px] font-bold uppercase tracking-[0.15em] text-blue-100/80 hover:text-white transition-colors underline decoration-blue-100/30 underline-offset-4">
              View Agentic Architecture Case Study
            </Link>
          </div>
        </div>

        {/* Connector */}
        <div className="flex justify-center my-6">
          <span className="block w-px h-10 bg-gradient-to-b from-gray-300 to-blue-400" />
        </div>

        {/* Output */}
        <div className="w-full md:w-3/4 mx-auto bg-white border border-gray-100 rounded-xl p-6 text-center" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
          <p className="text-[10px] uppercase tracking-[0.22em] text-gray-400 font-semibold mb-2">Interface Layer (The Glass)</p>
          <p className="text-gray-900 font-semibold">Confident Real-World Decisions</p>
        </div>

        {/* Formula */}
        <div className="text-center mt-8 text-sm text-gray-500" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
          Knowledge + Context + Trust = Spontaneity
        </div>
      </div>
    
      {/* Work Grid */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4" 
        style={{ maxWidth: '576px', margin: '48px auto 0 auto' }}
      >
        {/* Existing Block 1, 2, and 3 cards remain here... */}
      </div>
    </div>
  </div>
</section>
  );
}
