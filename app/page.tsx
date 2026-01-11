// ✅ PURE SERVER COMPONENT - No 'use client', no hooks, no client component imports
import Link from 'next/link';
import Image from 'next/image';
import DesignWork from '@/components/DesignWork';
import HomePageBodyReset from '@/components/HomePageBodyReset';
import AnimatedHomePageContent from '@/components/AnimatedHomePageContent';
import HomepageSideNav from '@/components/HomepageSideNav';
// ✅ REMOVED - ErrorBoundary (client component with 'use client')
// import ErrorBoundary from '@/components/ErrorBoundary';

// ✅ COMMENTED OUT - All animated/client components
// const HomePageWebGL = dynamic(() => import('@/components/HomePageWebGL'), {
//   ssr: false,
// });

// const AnimatedHeading = dynamic(() => import('@/components/AnimatedHeading'), {
//   ssr: false,
// });

// const ProjectsSection = dynamic(() => import('@/components/ProjectsSection'), {
//   ssr: false,
// });

// const VideoProjectsSection = dynamic(() => import('@/components/VideoProjectsSection'), {
//   ssr: false,
// });

// const PhotographyGridSection = dynamic(() => import('@/components/PhotographyGridSection'), {
//   ssr: false,
// });

// const FadeInSection = dynamic(() => import('@/components/FadeInSection'), {
//   ssr: false,
// });

// const AITravelScene = () => (
//   <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
//     <div className="text-center" style={{ maxWidth: '576px', margin: '0 auto' }}>
//       <div className="text-6xl mb-4">🌍</div>
//       <h3 className="text-xl font-bold text-gray-800 mb-2">AI Travel Scene</h3>
//       <p className="text-gray-600" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>3D visualization coming soon</p>
//     </div>
//   </div>
// );

export default function HomePage() {
  // ✅ REMOVED - All hooks and runtime logic
  // const pathname = usePathname();
  // const isProjectPage = pathname?.includes('/projects/') ?? false;
  // const videoRef = useRef<HTMLIFrameElement>(null);
  // const mobileHeroRef = useRef<HTMLHeadingElement>(null);
  // const [isClientReady, setIsClientReady] = useState(false);
  
  // ✅ REMOVED - All useEffect hooks
  // useEffect(() => { ... }, [pathname]);
  // useEffect(() => { ... }, []); // Video observer
  // useEffect(() => { ... }, []); // Hero width measurement

  return (
    <>
      {/* ✅ HomePageBodyReset - Resets body styles that persist from project pages */}
      <HomePageBodyReset />
      {/* ✅ Side Navigation - Fixed left side, desktop only */}
      <HomepageSideNav />
      {/* ✅ REMOVED - ErrorBoundary wrapper (client component) */}
      {/* ✅ Animated Homepage Content - Fade-in and slide-up animation */}
      <AnimatedHomePageContent>
        <div className="relative w-full text-[#2F2A3B] overflow-x-hidden scroll-optimized">
        
        {/* Unified Hero & Introduction Section */}
        <section id="hero" className="intro-section bg-white relative z-10 pt-[96px] pb-[96px] md:pt-0 md:pb-[140px]" aria-label="Introduction">
          {/* Hero Content - Viewport-positioned with content-driven bottom spacing */}
          <div className="relative flex items-center justify-center min-h-[85vh] md:min-h-[90vh] pt-36 md:pt-0">
            <div className="max-w-4xl mx-auto px-6 w-full py-0">
              {/* ✅ REMOVED - Suspense and motion.div (animations) */}
              <div 
                  className="w-full text-left"
                >
                  <div className="mb-6 md:mb-10" style={{ maxWidth: '576px', margin: '0 auto' }}>
                    {/* Mobile Version - Simplified */}
                    <h1 
                      className="hero-title md:hidden font-sf-pro-display font-bold leading-[1.05] tracking-tight w-full text-left" 
                      style={{ fontSize: 'clamp(1.75rem, 5vw, 2.25rem)', whiteSpace: 'normal', fontFamily: "'tiempos-headline-regular', serif", marginBottom: 'calc(1.32 * 1.5rem)' }}
                    >
                      <span className="bg-gradient-to-r from-black via-gray-700 to-gray-500 bg-clip-text text-transparent font-bold">Welcome</span>
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
                      <span className="bg-gradient-to-r from-black via-gray-700 to-gray-500 bg-clip-text text-transparent font-bold">Welcome</span>
                    </h1>
                  </div>
                  <div className="space-y-6 mb-0" style={{ maxWidth: '576px', margin: '0 auto' }}>
                    <p className="font-sf-pro-text text-lg sm:text-xl md:text-xl text-gray-900 leading-relaxed tracking-[0.01em] drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)] text-left" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
                    I’m Dan Meier, a systems-minded product designer, creative technologist and world traveler. <br></br><br></br>
                    I design digital experiences shaped by a decade of product building and a global worldview informed by 41 countries. I’m driven by the challenge of creating systems that are as dynamic as the people using them, leveraging my background in technology and travel to build products that provide real value and resonate on a universal scale.
                    </p>
                    <p className="italic font-sf-pro-text text-lg sm:text-xl md:text-xl text-gray-900 leading-relaxed tracking-[0.01em] drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)] text-left font-light"
                      style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
                      Currently, I am exploring how systems design, AI, and real-world context create better human experiences.
                    </p>
                    <div className="mt-4 mb-4">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/signature-25.png`}
                        alt="Dan Meier signature"
                        width={208}
                        height={70}
                        className="h-10 w-auto"
                        style={{ maxWidth: '311px' }}
                      />
                    </div>
                  </div>
                </div>
            </div>
          </div>
          
          {/* Hero Image - Moved inside hero section */}
          <div className="max-w-4xl mx-auto px-6 mt-6 md:-mt-16 md:relative md:z-10">
            <div style={{ maxWidth: '576px', margin: '0 auto' }}>
              <div 
                className="w-full relative rounded-lg shadow-lg overflow-hidden" 
                style={{ 
                  background: '#f0f0f0' /* Skeleton state background */
                }}
              >
                <Image 
                  id="me_heroImage-1_1.1.1"
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/me_heroImage-1_1.1.1.webp`}
                  alt="Dan Meier"
                  width={576}
                  height={432}
                  priority
                  sizes="(max-width: 768px) 100vw, 576px"
                  className="w-full h-auto rounded-lg transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </section>


        {/* Stable anchor target for About section - zero height, positioned before content */}
        <div className="anchor-offset" aria-hidden="true"></div>
        
        {/* About Me Section */}
        <section id="about" className="bg-white relative pt-[96px] pb-[96px] md:pt-[140px] md:pb-[140px]" aria-label="About Me">
          <div className="max-w-4xl mx-auto px-6 relative">
            <div className="w-full">
              {/* Heading */}
              <div className="section-header-spacing" style={{ maxWidth: '576px', margin: '0 auto' }}>
                {/* Mobile Version - Simplified */}
                <h1 
                  className="hero-title md:hidden font-sf-pro-display font-bold leading-[1.05] tracking-tight w-full text-left" 
                  style={{ fontSize: 'clamp(1.75rem, 5vw, 2.25rem)', whiteSpace: 'normal', fontFamily: "'tiempos-headline-regular', serif", marginBottom: 'calc(1.32 * 1.5rem)' }}
                >
                  <span className="bg-gradient-to-r from-black via-gray-700 to-gray-500 bg-clip-text text-transparent animate-gradient-shift bg-[length:300%_auto] font-bold">About Me</span>
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
                  <span className="bg-gradient-to-r from-black via-gray-700 to-gray-500 bg-clip-text text-transparent animate-gradient-shift bg-[length:300%_auto] font-bold">About Me</span>
                </h1>
              </div>

              {/* Single Column Layout: Images and Text Stacked Vertically */}
              <div className="w-full space-y-8" style={{ maxWidth: '576px', margin: '0 auto' }}>
                {/* First Image */}
                {/* ✅ REMOVED - Suspense and motion.div (animations) */}
                <div className="w-full">
                  <div 
                    className="w-full relative rounded-lg shadow-lg overflow-hidden"
                    style={{
                      background: '#f0f0f0' /* Skeleton state background */
                    }}
                  >
                    <Image 
                      id="me_heroImage-1_1.1.1-about"
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/me-arches-wine.jpg`}
                      alt="Dan Meier"
                      width={576}
                      height={768}
                      className="w-full h-auto rounded-lg"
                      sizes="(max-width: 768px) 100vw, 576px"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Second Image (Portrait) */}
                {/* ✅ REMOVED - Suspense and motion.div (animations) */}
                <div className="w-full">
                  <div 
                    className="w-full relative rounded-lg shadow-lg overflow-hidden"
                    style={{
                      background: '#f0f0f0' /* Skeleton state background */
                    }}
                  >
                    <Image 
                      id="me_heroImage-1_1.1.1-about-2"
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/portrait-4shots_2.jpg`}
                      alt="Dan Meier"
                      width={576}
                      height={768}
                      className="w-full h-auto rounded-lg"
                      sizes="(max-width: 768px) 100vw, 576px"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Design Journey Section */}
                <div className="w-full" style={{ marginTop: '3.45rem' }}>
                  <div className="space-y-8">
                    {/* Design Journey Path Marker */}
                    <div className="flex items-center gap-3 mb-6 opacity-60">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <div className="text-sm font-medium tracking-wider text-blue-600 uppercase">Design Journey</div>
                    </div>
                    
                    <p className="text-xl md:text-2xl leading-relaxed text-gray-700" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
                      My path into design began in <span className="italic text-gray-800">urban design and landscape architecture</span>, where I was trained to think about how people interact with <span className="font-semibold text-gray-800">spaces and systems</span>. Along the way, I found myself fascinated not just by what I was creating, but by the <span className="text-blue-600 font-medium">digital tools</span> I was using to create it — and the <span className="italic text-gray-800">experiences those tools could unlock</span>. That curiosity pushed me toward <span className="font-semibold text-gray-800">UX and digital product design</span>.
                    </p>
                  </div>
                </div>

                {/* Travel Discovery Section */}
                <div className="w-full">
                  <div className="space-y-8">
                    {/* Travel Discovery Divider */}
                    <div className="flex items-center justify-center py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                        <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                        <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                        <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                        <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                        <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                      </div>
                    </div>
                    
                    <p className="text-xl md:text-2xl leading-relaxed text-gray-700" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
                      Everything shifted when I had the chance to <span className="italic text-gray-800">study abroad</span>. Experiencing new cultures and environments first-hand opened my eyes to the value of <span className="font-semibold text-gray-800">travel, connection, and perspective</span>. I've now visited over <span className="text-amber-600 font-semibold">40 countries</span>, and those experiences have shaped how I think about people and design. My work today centers on <span className="text-blue-600 font-medium">building purposeful websites and digital experiences</span> that provide real value, informed by both a <span className="italic text-gray-800">systems-thinking mindset</span> and a <span className="font-semibold text-gray-800">global outlook</span>.
                    </p>
                    <p className="text-sm text-gray-900 italic mt-4" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                      *All visuals captured through my lens, no AI generated photos or video.
                    </p>
                  </div>
                </div>

                {/* Third Image (Portrait - Duplicate) */}
                {/* ✅ REMOVED - Suspense and motion.div (animations) */}
                <div className="w-full">
                  <div 
                    className="w-full relative rounded-lg shadow-lg overflow-hidden"
                    style={{
                      background: '#f0f0f0' /* Skeleton state background */
                    }}
                  >
                    <Image 
                      id="me_heroImage-1_1.1.1-about-3"
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/portrait-4shots_1.jpg`}
                      alt="Dan Meier"
                      width={576}
                      height={768}
                      className="w-full h-auto rounded-lg"
                      sizes="(max-width: 768px) 100vw, 576px"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Fourth Image (Portrait) */}
                {/* ✅ REMOVED - Suspense and motion.div (animations) */}
                <div className="w-full">
                  <div 
                    className="w-full relative rounded-lg shadow-lg overflow-hidden"
                    style={{
                      background: '#f0f0f0' /* Skeleton state background */
                    }}
                  >
                    <Image 
                      id="me_heroImage-1_1.1.1-about-4"
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/portrait-4shots_3.jpg`}
                      alt="Dan Meier"
                      width={576}
                      height={768}
                      className="w-full h-auto rounded-lg"
                      sizes="(max-width: 768px) 100vw, 576px"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design Work Section */}
        <DesignWork />

        {/* Projects Section */}
        {/* ✅ COMMENTED OUT - ProjectsSection (client component with animations) */}
        {/* <Suspense fallback={null}>
          <ProjectsSection />
        </Suspense> */}

        {/* Video Projects Section */}
        {/* ✅ COMMENTED OUT - VideoProjectsSection (client component with animations) */}
        {/* <Suspense fallback={null}>
          <VideoProjectsSection />
        </Suspense> */}
        
        {/* Travel Photography and Stills Section */}
        <section id="travelogue" className="relative overflow-hidden pt-[96px] pb-[96px] md:pt-[140px] md:pb-[140px]" style={{ backgroundColor: '#2a2d35' }}>
          {/* Keep the old ID for backward compatibility */}
          <div id="world-travel-diaries" style={{ position: 'absolute', top: 0, left: 0, width: 1, height: 1, opacity: 0, pointerEvents: 'none' }} aria-hidden="true"></div>
          {/* World Map Background - This is the main target for scrolling */}
          <div id="world-travel-diaries-background" className="absolute inset-0 opacity-100">
            <Image 
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/textures/earth-map.webp`}
              alt="World Map Background"
              fill
              className="object-cover object-center"
              loading="lazy"
              sizes="100vw"
              // ✅ REMOVED - onError handler (not allowed in server components)
            />
          </div>
          {/* White Overlay */}
          <div className="absolute inset-0 bg-white/80"></div>
          
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            {/* ✅ REMOVED - Suspense and FadeInSection (animations) */}
            <div className="text-center section-header-spacing" style={{ maxWidth: '576px', margin: '0 auto' }}>
              <div id="world-travel-diaries-badge" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-300 text-black-800 rounded-full text-sm font-medium mb-6">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                In Development
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight" style={{ 
                fontFamily: "'tiempos-headline-regular', serif",
                color: '#000000'
              }}>
                World Travel Diaries
              </h2>
              <p className="text-xl max-w-4xl mx-auto mb-8 font-medium leading-relaxed" style={{ 
                fontFamily: "'Roboto', Helvetica, sans-serif",
                fontSize: '1.1rem',
                color: '#374151'
              }}>
                I've been lucky enough to travel to 41 countries. Documenting these experiences and encounters with a camera has been a true joy of mine.
              </p>
              <p className="text-sm max-w-4xl mx-auto mb-8 italic leading-relaxed" style={{ 
                fontFamily: "'Roboto', Helvetica, sans-serif",
                color: '#374151'
              }}>
                *All visuals captured through my lens, no AI generated photos or video.
              </p>
            </div>
            
            {/* Video Container */}
            <div className="mt-8">
              {/* Container with aspect-ratio to prevent layout shift */}
              {/* Remove minHeight - aspect-ratio handles sizing properly on all modern browsers */}
              <div 
                className="relative w-full rounded-3xl overflow-hidden"
                style={{ 
                  aspectRatio: '16 / 9'
                }}
              >
                <iframe
                  src="https://player.vimeo.com/video/1089382469?h=f20ea6cdaf&controls=0&background=0&autopause=0&loop=1&quality=720p&muted=1&playsinline=1&autoplay=1"
                  title="Travel video"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                  className="absolute inset-0 w-full h-full"
                  style={{ 
                    border: 'none'
                  }}
                />
              </div>
            </div>
            
            {/* Video Frames Grid */}
            <div className="max-w-4xl mx-auto mt-12 mb-8">
              <div className="grid grid-cols-1 gap-8">
                {[
                  { src: 'Istanbul-frames-2.jpg', alt: 'Istanbul Video Frames' },
                  { src: 'japan-frames.jpg', alt: 'Japan Video Frames' },
                  { src: 'Terratorium-stillFrames.jpg', alt: 'Terratorium Video Frames' },
                  { src: 'Teleportal-frames.jpg', alt: 'Teleportal Video Frames' },
                  { src: 'Morrocco-frames.jpg', alt: 'Morocco Video Frames' },
                  { src: 'Indonesia-frames.jpg', alt: 'Indonesia Video Frames' }
                ].map((frame, index) => (
                  <div key={index} className="relative">
                    <div className="relative w-full flex items-center justify-center">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/${frame.src}`}
                        alt={frame.alt}
                        width={1920}
                        height={1080}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 896px"
                        priority={index <= 2}
                        loading={index <= 2 ? "eager" : "lazy"}
                        style={{ 
                          width: '100%',
                          height: 'auto',
                          objectFit: 'contain',
                          display: 'block'
                        }}
                        className="shadow-lg rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* YouTube and Vimeo Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto mb-8 justify-center sm:justify-start mt-4">
              <a
                href="https://www.youtube.com/@dsmeier"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-black border border-black/30 rounded-lg font-medium hover:border-white/50 transition-all duration-200"
                style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
              >
                My YouTube
              </a>
              <a
                href="https://vimeo.com/user94578264"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-black border border-black/30 rounded-lg font-medium hover:border-white/50 transition-all duration-200"
                style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
              >
                My Vimeo
              </a>
            </div>
            
            {/* Modern Coming Soon Card */}
            {/* ✅ REMOVED - Suspense and FadeInSection (animations) */}
            <div className="relative" style={{ marginTop: '80px' }}>
              <div className="relative">
                <div className="relative rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 overflow-hidden">
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 rounded-3xl overflow-hidden"
                    style={{
                      background: '#f0f0f0' /* Skeleton state background */
                    }}
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/Morocco_girlsBike_Natgeo.webp`}
                      alt="Morocco Travel"
                      fill
                      className="object-cover object-center"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 896px"
                    />
                  </div>
                  {/* Dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/60 rounded-3xl"></div>
                  
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                      {/* Left Content */}
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div style={{ maxWidth: '576px', margin: '0 auto' }}>
                              <h3 className="text-2xl md:text-3xl font-bold text-white">
                               Travel Photo Journal
                             </h3>
                            <p className="text-gray-200 font-semibold" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>Interactive Travel Stories</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4 mb-6" style={{ maxWidth: '576px', margin: '0 auto' }}>
                          <p className="text-gray-200 text-lg leading-relaxed" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
                            A curated collection of visual narratives of my travels, blending photography, storytelling, and interactive experiences.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm">Photography</span>
                            <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm">Travel Stories</span>
                            <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm">Interactive</span>
                          </div>
                        </div>
                        

                      </div>
                      
                      {/* Right Content */}
                      <div className="flex-shrink-0">
                        <div className="bg-white rounded-2xl p-8 text-center text-black shadow-xl">
                          <div className="w-16 h-16 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                            <h4 className="text-xl font-bold mb-2">Coming Soon</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tech Stack */}
            {/* ✅ REMOVED - Suspense and FadeInSection (animations) */}
            <div className="mt-16 md:mt-20 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-100 rounded-full">
                <span className="text-gray-600 text-sm font-medium">Building with</span>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-white text-gray-800 rounded-full text-sm font-semibold shadow-sm">Sanity CMS</span>
                  <span className="text-gray-400">+</span>
                  <span className="px-3 py-1 bg-white text-gray-800 rounded-full text-sm font-semibold shadow-sm">Next.js</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Navigation Links */}
        <div className="hidden flex flex-col p-4 pl-[30px] space-y-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/projects/purdue" 
              className="block pl-[30px] py-3 text-white hover:bg-white/10 transition-colors"
            >
              Purdue University
            </Link>
            <Link 
              href="/projects/travel-and-ai" 
              className="block pl-[30px] py-3 text-white hover:bg-white/10 transition-colors"
            >
              Travel & AI
            </Link>
            <Link 
              href="/projects/previous" 
              className="block pl-[30px] py-3 text-white hover:bg-white/10 transition-colors"
            >
              Previous Projects
            </Link>
          </div>
          </div>
        </div>
      </AnimatedHomePageContent>
      {/* ✅ COMMENTED OUT - HomePageWebGL (WebGL/Three.js client component) */}
      {/* {process.env.NODE_ENV === 'development' && (
        <HomePageWebGL />
      )} */}
    </>
  );
}