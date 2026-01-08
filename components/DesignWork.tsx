// ✅ STATIC DESIGN WORK SECTION - No 'use client', no hooks, no JS behavior
import Link from 'next/link';

export default function DesignWork() {
  return (
    <section id="work" className="bg-white" style={{ paddingTop: 'clamp(5rem, 10vh, 10rem)', paddingBottom: 'clamp(5rem, 10vh, 10rem)' }} aria-label="Design Work">
      <div className="max-w-4xl mx-auto px-6">
        <div className="w-full">
          {/* Heading */}
          <div className="section-header-spacing">
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
          <div className="section-header-spacing max-w-2xl">
            <p className="text-xl text-gray-700 leading-relaxed mb-6" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
              My approach is rooted in systems thinking. I focus on how people, interfaces, environments, and technology interact as part of a larger whole, designing products and experiences that support real behavior, adapt to context, and hold up beyond idealized user flows.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
              Alongside client work, I explore and build AI-driven product concepts centered on discovery, spontaneity, and experience-based use cases, with a particular interest in location-aware and travel-adjacent contexts.
            </p>
          </div>
        
        {/* Section Header */}
        <div className="section-header-spacing">
          <h2 className="text-base font-normal text-gray-400 mb-4 font-sans uppercase tracking-wider">
            Work and Projects
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl font-sans" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
            A curated collection of work and projects showcasing UX, UI, Web, Graphic and Product Design.
          </p>
        </div>

        {/* Work Grid */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-20 md:gap-16 lg:gap-12">
          
          {/* Product Explorations Block */}
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-400 mb-6 font-sans uppercase tracking-wider">
              Product Explorations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
              {/* Travel & AI Card */}
              <Link
                href="/projects/travel-and-ai"
                className="group block rounded-lg border border-gray-300 bg-white p-6 hover:border-gray-400 transition-colors h-[220px] flex flex-col"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Travel & AI
                </h3>
                <p className="mb-4 text-gray-600 flex-grow" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1rem' }}>
                  Using AI and systems thinking to solve real-world travel challenges through design and hands-on experimentation.
                </p>
                <div className="flex items-center font-medium text-gray-900 hover:text-gray-600 transition-colors">
                  <span>View Case Studies</span>
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>

          {/* Selected Client Work Block */}
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-400 mb-6 font-sans uppercase tracking-wider">
              Selected Client Work
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
              {/* The Archive Card */}
              <Link
                href="/projects/previous"
                className="group block rounded-lg border border-gray-300 bg-white p-6 hover:border-gray-400 transition-colors h-[220px] flex flex-col"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  The Archive
                </h3>
                <p className="mb-4 text-gray-600 flex-grow" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1rem' }}>
                  A collection of projects highlighting expertise in UX, UI, web and product design.
                </p>
                <div className="flex items-center font-medium text-gray-900 hover:text-gray-600 transition-colors">
                  <span>View Projects</span>
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>

        </div>
        </div>
      </div>
    </section>
  );
}
