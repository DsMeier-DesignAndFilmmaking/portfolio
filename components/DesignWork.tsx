// ✅ STATIC DESIGN WORK SECTION - No 'use client', no hooks, no JS behavior
import Link from 'next/link';

export default function DesignWork() {
  return (
    <section id="work" className="bg-white relative pb-[96px] md:pb-[140px]" aria-label="Design Work">
      <div className="max-w-4xl mx-auto px-6 relative">
        <div className="w-full">
          {/* Heading */}
          <div className="mb-12" style={{ maxWidth: '576px', margin: '0 auto' }}>
            {/* Mobile Version - Simplified */}
            <h1 
              className="hero-title md:hidden font-sf-pro-display font-bold leading-[1.05] tracking-tight w-full text-left" 
              style={{ fontSize: 'clamp(1.75rem, 5vw, 2.25rem)', whiteSpace: 'normal', fontFamily: "'tiempos-headline-regular', serif", marginBottom: 'calc(1.32 * 1.5rem)' }}
            >
              <span className="bg-gradient-to-r from-black via-gray-700 to-gray-500 bg-clip-text text-transparent animate-gradient-shift bg-[length:300%_auto] font-bold">Design Work</span>
            </h1>
            
            {/* Desktop Version - Original */}
            <h1 
              className="hero-title hidden md:block font-sf-pro-display font-bold leading-[1.1] tracking-tight text-left" 
              style={{ 
                fontSize: 'clamp(2.5rem, 4.5vw, 3.75rem)', 
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
              My approach is rooted in systems thinking. I focus on how people, interfaces, environments, and technology interact as part of a larger whole, designing products and experiences that support real behavior, adapt to context, and hold up beyond idealized user flows.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-6" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
              Alongside client work, I explore and build AI-driven product concepts centered on discovery, spontaneity, and experience-based use cases, with a particular interest in location-aware and travel-adjacent contexts.
            </p>
          </div>
        
{/* Work Grid */}
<div 
  className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4" 
  style={{ maxWidth: '576px', margin: '48px auto 0 auto' }}
>
  
  {/* Block 1: Product Explorations */}
  <div className="flex flex-col">
    <h3 className="text-sm font-medium text-gray-400 mb-4 font-sans uppercase tracking-wider">
      Product Exploration
    </h3>
    <Link
      href="/projects/travel-and-ai"
      className="group block rounded-lg border border-gray-200 bg-white p-6 hover:border-gray-300 transition-all duration-300 shadow-md hover:shadow-lg h-[240px] flex flex-col justify-between"
    >
      <div className="flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Travel & AI</h3>
        <p className="text-gray-600 line-clamp-3" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1rem' }}>
          Using AI and systems thinking to solve real-world travel challenges through design and hands-on experimentation.
        </p>
      </div>
      <div className="flex items-center font-medium text-blue-600 hover:text-blue-700 transition-colors">
        <span>View Case Study</span>
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </Link>
  </div>

    {/* Block 2: Offline Travel Packs (Full Width) */}
    <div className="flex flex-col">
    <h3 className="text-sm font-medium text-gray-400 mb-4 font-sans uppercase tracking-wider">
      Product Exploration
    </h3>
    <Link
      href="https://local-logic-travel-packs.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg border border-gray-200 bg-white p-6 hover:border-gray-300 transition-all duration-300 shadow-md hover:shadow-lg h-[240px] flex flex-col justify-between"
    >
      <div className="flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Offline Travel Packs</h3>
        <p className="text-gray-600 line-clamp-3" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1rem' }}>
          Using AI and systems thinking to solve real-world travel challenges through design and hands-on experimentation.
        </p>
      </div>
      <div className="flex items-center font-medium text-blue-600 hover:text-blue-700 transition-colors">
        <span>View Product</span>
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </Link>
  </div>

  {/* Block 3: Selected Client Work */}
  <div className="md:col-span-2 flex flex-col">
    <h3 className="text-sm font-medium text-gray-400 mb-4 font-sans uppercase tracking-wider">
      Selected Client Work
    </h3>
    <Link
      href="/projects/previous"
      className="group block rounded-lg border border-gray-200 bg-white p-6 hover:border-gray-300 transition-all duration-300 shadow-md hover:shadow-lg h-[240px] flex flex-col justify-between"
    >
      <div className="flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-2">The Archive</h3>
        <p className="text-gray-600 line-clamp-3" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1rem' }}>
          A collection of projects highlighting expertise in UX, UI, web and product design.
        </p>
      </div>
      <div className="flex items-center font-medium text-blue-600 hover:text-blue-700 transition-colors">
        <span>View Projects</span>
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </Link>
      </div>

    </div>
        </div>
      </div>
    </section>
  );
}
