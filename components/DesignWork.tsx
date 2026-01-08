// ✅ STATIC DESIGN WORK SECTION - No 'use client', no hooks, no JS behavior
import Link from 'next/link';

export default function DesignWork() {
  return (
    <section id="work" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-base font-normal text-gray-500 mb-4 font-sans uppercase tracking-wider">
            Work and Projects
          </h2>
          <p className="text-xl text-[#2F2A3B] max-w-2xl font-sans" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
            A curated collection of work and projects showcasing UX, UI, Web, Graphic and Product Design.
          </p>
        </div>

        {/* Work Grid */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-16 md:gap-12 lg:gap-8">
          
          {/* Product Explorations Block */}
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-500 mb-6 font-sans uppercase tracking-wider">
              Product Explorations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
              {/* Travel & AI Card */}
              <Link
                href="/projects/travel-and-ai"
                className="group block rounded-lg border border-gray-200 bg-white p-6 hover:border-gray-300 transition-colors"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Travel & AI
                </h3>
                <p className="mb-4 text-gray-600" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1rem' }}>
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
            <h3 className="text-sm font-medium text-gray-500 mb-6 font-sans uppercase tracking-wider">
              Selected Client Work
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
              {/* The Archive Card */}
              <Link
                href="/projects/previous"
                className="group block rounded-lg border border-gray-200 bg-white p-6 hover:border-gray-300 transition-colors"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  The Archive
                </h3>
                <p className="mb-4 text-gray-600" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1rem' }}>
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
    </section>
  );
}
