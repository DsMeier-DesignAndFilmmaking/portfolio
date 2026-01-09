// ✅ STATIC SIDE NAVIGATION - No 'use client', no hooks, no JS behavior
// Pure JSX component for homepage section navigation

export default function HomepageSideNav() {
  return (
    <>
      {/* Desktop Navigation - Left Side, positioned closer to content */}
      <nav 
        className="hidden lg:flex fixed top-1/2 -translate-y-1/2 flex-col gap-4 z-40"
        style={{ left: 'calc((100% - 896px) / 2 - 80px)' }}
        aria-label="Page sections navigation"
      >
        <a 
          href="#hero" 
          className="group flex items-center gap-2"
          aria-label="Go to Intro section"
        >
          <span className="w-2 h-2 rounded-full bg-neutral-400 group-hover:bg-neutral-800 transition-colors duration-200" />
          <span className="text-xs text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Intro
          </span>
        </a>
        
        <a 
          href="#about" 
          className="group flex items-center gap-2"
          aria-label="Go to About section"
        >
          <span className="w-2 h-2 rounded-full bg-neutral-400 group-hover:bg-neutral-800 transition-colors duration-200" />
          <span className="text-xs text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            About
          </span>
        </a>
        
        <a 
          href="#work" 
          className="group flex items-center gap-2"
          aria-label="Go to Work section"
        >
          <span className="w-2 h-2 rounded-full bg-neutral-400 group-hover:bg-neutral-800 transition-colors duration-200" />
          <span className="text-xs text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Work
          </span>
        </a>
        
        <a 
          href="#travelogue" 
          className="group flex items-center gap-2"
          aria-label="Go to Travel section"
        >
          <span className="w-2 h-2 rounded-full bg-neutral-400 group-hover:bg-neutral-800 transition-colors duration-200" />
          <span className="text-xs text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Travel
          </span>
        </a>
        
        <a 
          href="#contact" 
          className="group flex items-center gap-2"
          aria-label="Go to Contact section"
        >
          <span className="w-2 h-2 rounded-full bg-neutral-400 group-hover:bg-neutral-800 transition-colors duration-200" />
          <span className="text-xs text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Contact
          </span>
        </a>
      </nav>

      {/* Mobile Navigation - Floating Top Nav (matches project pages design) */}
      <nav 
        className="lg:hidden fixed top-20 left-0 right-0 z-40 px-6"
        aria-label="Page sections navigation"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200/50">
          <ul className="flex justify-center space-x-2" role="list">
            <li role="listitem">
              <a
                href="#hero"
                className="group relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                aria-label="Go to Intro section"
              >
                <span className="text-xs font-medium" aria-hidden="true">1</span>
              </a>
            </li>
            <li role="listitem">
              <a
                href="#about"
                className="group relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                aria-label="Go to About section"
              >
                <span className="text-xs font-medium" aria-hidden="true">2</span>
              </a>
            </li>
            <li role="listitem">
              <a
                href="#work"
                className="group relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                aria-label="Go to Work section"
              >
                <span className="text-xs font-medium" aria-hidden="true">3</span>
              </a>
            </li>
            <li role="listitem">
              <a
                href="#travelogue"
                className="group relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                aria-label="Go to Travel section"
              >
                <span className="text-xs font-medium" aria-hidden="true">4</span>
              </a>
            </li>
            <li role="listitem">
              <a
                href="#contact"
                className="group relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                aria-label="Go to Contact section"
              >
                <span className="text-xs font-medium" aria-hidden="true">5</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
