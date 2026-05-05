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

          <div className="max-w-[576px] mx-auto bg-gray-100 border border-gray-200 rounded-2xl py-10 px-6 sm:py-12 sm:px-8 mb-12">
  
  {/* Header */}
  <div className="text-center mb-8">
  <div className="flex justify-center mb-6">
    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
      </span>
      <span className="text-xs font-semibold text-blue-700 uppercase tracking-[0.08em]">
        Self-Initiated Project&nbsp;&amp;&nbsp;Build (Current Focus)
      </span>
    </div>
  </div>

  <h2
    className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug"
    style={{ fontFamily: "'tiempos-headline-regular', serif" }}
  >
    Designing the Logic&nbsp;of Inevitability
  </h2>

  <p 
  className="text-base sm:text-lg text-gray-600 mt-3 leading-relaxed max-w-2xl mx-auto"
  style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
>
  Using an Agentic Discovery Stack, I transform complex environmental signals into simple, clearly presented decisions for decisive&nbsp;action.
</p>
</div>

  {/* Inputs */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-roboto">
    
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.08em] text-gray-500 font-semibold mb-2">
          Substrate
        </p>
        <p className="text-base sm:text-lg text-gray-900 font-semibold leading-snug">
          Field Notes&nbsp;Intelligence
        </p>
      </div>

      <Link 
        href="/projects/field-notes/" 
        className="mt-4 text-sm font-semibold uppercase tracking-[0.08em] text-blue-600 hover:text-blue-800 flex items-center min-h-[44px]"
      >
        Explore&nbsp;Layer →
      </Link>
    </div>

    <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.08em] text-gray-500 font-semibold mb-2">
          Validation
        </p>
        <p className="text-base sm:text-lg text-gray-900 font-semibold leading-snug">
        Trust Layer Logic
        </p>
      </div>

      <span className="mt-4 text-xs font-semibold uppercase tracking-[0.08em] text-gray-500">
      Agentic Trust Evaluation
      </span>
    </div>
  </div>

  {/* Connectors */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-5 mb-5">
    <div className="flex justify-center">
      <span className="block w-px h-10 bg-gradient-to-b from-gray-300 to-blue-400" />
    </div>
    <div className="flex justify-center">
      <span className="block w-px h-10 bg-gradient-to-b from-gray-300 to-blue-400" />
    </div>
  </div>

{/* Brain */}
<div className="relative overflow-hidden rounded-2xl p-6 text-white bg-slate-950 shadow-lg border border-slate-800">
  
  <div className="flex justify-between items-start gap-4">
    <div>
      <p className="text-xs uppercase tracking-[0.08em] text-slate-400 mb-2">
        The Brain
      </p>
      <h3 className="text-xl sm:text-2xl font-bold leading-snug">
        Adaptive Decision&nbsp;Engine
      </h3>
    </div>

    <Link 
      href="/projects/travel-and-ai" 
      className="p-3 bg-slate-800 hover:bg-blue-600 rounded-xl min-h-[44px] min-w-[44px] flex items-center justify-center"
    >
      →
    </Link>
  </div>

  <p className="mt-3 text-sm text-slate-300 leading-relaxed">
  The central intelligence layer that orchestrates real-time context into adaptive, high-confidence decisions for{" "}
  <span className="font-semibold text-white">
    autonomous&nbsp;execution
  </span>.
</p>

  <Link 
    href="/projects/travel-and-ai" 
    className="mt-5 text-sm font-semibold uppercase tracking-[0.08em] text-blue-400 hover:text-blue-300 min-h-[44px] flex items-center"
  >
    View Agentic Architecture Case&nbsp;Study →
  </Link>
</div>

  {/* Connector */}
  <div className="flex justify-center my-6">
    <span className="block w-px h-10 bg-gradient-to-b from-blue-400 to-sky-600" />
  </div>

  {/* Executor */}
  <div className="relative overflow-hidden rounded-2xl p-6 text-white bg-[#002244] border border-sky-900/50">
    
    <div className="flex justify-between items-start gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.08em] text-sky-300 font-semibold mb-2">
          Autonomous Execution
        </p>
        <h3 className="text-xl sm:text-2xl font-bold leading-snug">
          The Digital&nbsp;Executor
        </h3>
      </div>

      <Link 
        href="/projects/digital-executor" 
        className="p-3 bg-sky-900/40 hover:bg-sky-500 rounded-xl min-h-[44px] min-w-[44px]"
      >
        →
      </Link>
    </div>

    <p className="mt-3 text-md text-sky-200 leading-relaxed">
  Automatically resolves disruptions to secure high-value assets through real-time logistics and automated&nbsp;settlement.
</p>

    <Link 
      href="/projects/digital-executor" 
      className="mt-5 text-sm font-semibold uppercase tracking-[0.08em] text-white min-h-[44px] flex items-center"
    >
      Explore High-Stakes Recovery&nbsp;Logic →
    </Link>
  </div>

  {/* Output */}
  <div className="w-full md:w-3/4 mx-auto bg-white border border-gray-200 rounded-xl p-6 text-center mt-6">
    <p className="text-xs uppercase tracking-[0.08em] text-gray-500 font-semibold mb-2">
      Interface Layer (The&nbsp;Glass)
    </p>
    <p className="text-base font-semibold text-gray-900">
      Confident Real-World&nbsp;Decisions
    </p>
  </div>

  {/* Formula */}
  <div className="text-center mt-8 text-sm text-gray-600 leading-relaxed">
    Knowledge + Context + Trust =&nbsp;Spontaneity
  </div>
</div>


{/* Client Work Card */}
<div className="max-w-[576px] mx-auto mt-8">
  <div className="relative overflow-hidden rounded-2xl p-6 text-white bg-slate-950 shadow-lg border border-slate-800">
    
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-xs uppercase tracking-[0.08em] text-slate-400 mb-2">
          Partnerships
        </p>
        <h3 className="text-xl sm:text-2xl font-bold">
          Client&nbsp;Work
        </h3>
      </div>
      
      <div className="p-3 bg-slate-800 border border-slate-700 rounded-xl min-h-[44px] min-w-[44px] flex items-center justify-center">
        <span className="text-blue-400">🏢</span>
      </div>
    </div>

    <p className="text-sm text-slate-300 mb-6 leading-relaxed">
      10+ years of digital design work spanning contract, freelance, and full-time roles across a range of&nbsp;industries.
    </p>

    <Link 
      href="/projects/previous" 
      className="text-sm font-semibold uppercase tracking-[0.08em] text-blue-400 hover:text-blue-300 flex items-center min-h-[44px]"
    >
      View&nbsp;Archive →
    </Link>
  </div>
</div>
        </div>
      </div>
    </section>
  );
}