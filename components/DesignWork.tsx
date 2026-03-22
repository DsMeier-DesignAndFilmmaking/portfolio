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
          </div>

          {/* Agentic Discovery Stack Diagram */}
          <div className="max-w-[576px] mx-auto bg-gray-50/50 border border-gray-100 rounded-2xl py-12 px-8 mb-12">
            <div className="text-center mb-8">
              {/* Active Project Ribbon/Tag */}
              <div className="flex justify-center mb-6">
                <div className="
                  inline-flex items-center gap-2.5 
                  px-3 py-1.5 
                  rounded-full 
                  bg-blue-50/50 border border-blue-100/50
                  backdrop-blur-sm
                  shadow-[0_2px_10px_-3px_rgba(59,130,246,0.1)]
                ">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  <span className="
                    text-[9px] font-bold text-blue-600/90 
                    uppercase tracking-[0.15em] 
                    leading-none 
                    -mr-[0.15em]
                  ">
                    Current Passion Project & Build
                  </span>
                </div>
              </div>
              <h2
                className="text-3xl md:text-3xl font-bold tracking-tight text-gray-900"
                style={{ fontFamily: "'tiempos-headline-regular', serif" }}
              >
                Agentic Discovery Stack
              </h2>
              <p 
                className="text-base sm:text-lg text-gray-500 mt-2 leading-relaxed"
                style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
              >
                Bridging situational field notes with agentic orchestration, HADE is a Holistic Adaptive Decision Engine that transforms environmental context and trusted signals into confident travel actions.
              </p>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
              <div className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col justify-between group">
                <div>
                  <p className="text-[12px] uppercase tracking-[0.22em] text-gray-400 font-semibold mb-2">Substrate</p>
                  <p className="text-base sm:text-lg text-gray-900 font-semibold">
                    Field Notes Intelligence
                  </p>
                </div>
                <Link href="/projects/field-notes/" className="mt-4 text-[12px] font-bold uppercase tracking-widest text-blue-500 hover:text-blue-700 transition-colors flex items-center">
                  Explore Layer <span className="ml-1">→</span>
                </Link>
              </div>
              <div className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <p className="text-[12px] uppercase tracking-[0.22em] text-gray-400 font-semibold mb-2">Validation</p>
                  <p className="text-base sm:text-lg text-gray-900 font-semibold">
                  Trust &amp; Authenticity
                </p>
                </div>
                <span className="mt-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">Signal Processing</span>
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

           {/* Spontaneity Engine - Neutral Obsidian Palette */}
            <div className="relative overflow-hidden rounded-2xl p-6 text-white bg-slate-950 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] group border border-slate-800">
              {/* Subtle Ambient Glow instead of Blue Pulse */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/5 opacity-50" />
              
              <div className="relative flex flex-col h-full">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                      The Brain
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
                      Spontaneity Engine
                    </h3>
                  </div>
                  <Link href="/projects/travel-and-ai" className="p-2.5 bg-slate-800 hover:bg-blue-600 rounded-xl transition-all duration-300 group/arrow">
                    <svg className="w-5 h-5 text-slate-300 group-hover/arrow:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>

                <div className="flex flex-wrap gap-2 mt-5" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                  <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] uppercase tracking-wider text-slate-300">
                    Context Engine
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] uppercase tracking-wider text-slate-300">
                    Decision Modules
                  </span>
                </div>

                {/* Link Font-Size Increased to text-sm (14px) and tracking tightened for legibility */}
                <Link 
                  href="/projects/travel-and-ai" 
                  className="mt-8 text-sm font-bold uppercase tracking-[0.1em] text-blue-400 hover:text-blue-300 transition-colors flex items-center group/link"
                >
                  View Agentic Architecture Case Study
                  <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>

            {/* Connector */}
            <div className="flex justify-center my-6">
              <span className="block w-px h-10 bg-gradient-to-b from-gray-300 to-blue-400" />
            </div>

            {/* Output */}
            <div className="w-full md:w-3/4 mx-auto bg-white border border-gray-100 rounded-xl p-6 text-center" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
              <p className="text-[11px] uppercase tracking-[0.22em] text-gray-400 font-semibold mb-2">Interface Layer (The Glass)</p>
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

            {/* Other 50/50 Card could go here */}
          </div>

          {/* Client Work & Previous Projects Card - Styled to match Spontaneity Engine */}
<div className="max-w-[576px] mx-auto mt-8">
  <div className="relative overflow-hidden rounded-2xl p-6 text-white bg-slate-950 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] group border border-slate-800">
    {/* Subtle Ambient Glow overlay to match the Brain block */}
    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/5 opacity-50" />
    
    <div className="relative flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
            Partnerships
          </p>
          <h3 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
            Client Work
          </h3>
        </div>
        
        {/* Icon container updated to match the top-right button style */}
        <div className="p-2.5 bg-slate-800 border border-slate-700 rounded-xl">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      </div>

      <p className="text-sm text-slate-300 mb-8 font-roboto leading-relaxed">
        10+ years of digital design work spanning contract, freelance, and full-time roles across a range of industries.
      </p>

      {/* Link logic updated for high-contrast visibility on dark backgrounds */}
<div className="mt-auto">
  <Link 
    href="/projects/previous" 
    className="text-[13px] font-bold uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors flex items-center group/link"
  >
    View Archive 
    <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">→</span>
  </Link>
</div>
    </div>
  </div>
</div>
        </div>
      </div>
    </section>
  );
}