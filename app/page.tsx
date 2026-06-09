// ✅ PURE SERVER COMPONENT - No 'use client', no hooks, no client component imports
import Link from 'next/link';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import DesignWork from '@/components/DesignWork';
import HomePageBodyReset from '@/components/HomePageBodyReset';
import AnimatedHomePageContent from '@/components/AnimatedHomePageContent';
import HomepageSideNav from '@/components/HomepageSideNav';
import SketchReveal from '@/components/SketchReveal';
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

function preventWidow(text) {
  const words = text.trim().split(" ");
  if (words.length < 2) return text;
  return [...words.slice(0, -2), words.slice(-2).join("\u00A0")].join(" ");
}

function ExperienceConceptDiagram() {
  return (
    <div className="relative" aria-labelledby="experience-diagram-title">
      <div
        className="relative overflow-hidden bg-[#fbf8f1] px-4 py-6 md:px-6 md:py-8"
        style={{
          backgroundImage:
            'radial-gradient(circle at 24% 18%, rgba(68,64,60,0.055) 0 0.7px, transparent 0.9px), linear-gradient(rgba(120,113,108,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(120,113,108,0.035) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/75 via-transparent to-amber-100/20" aria-hidden="true" />
        <h2 id="experience-diagram-title" className="sr-only">
          Designing Experiences Across People, Places and Systems
        </h2>

        <SketchReveal className="experience-sketch">
              <svg
                className="relative z-10 hidden h-auto w-full overflow-visible text-gray-950 md:block"
                viewBox="0 0 760 520"
                role="img"
                aria-labelledby="experience-sketch-title experience-sketch-desc"
              >
                <title id="experience-sketch-title">Hand-drawn concept sketch: Experiences at the intersection of people, places, and systems</title>
                <desc id="experience-sketch-desc">
                  A landscape architecture parti diagram showing Experiences as the central concept, connected to People, Places, and Systems, with Field Notes: 41 Countries as a travel annotation.
                </desc>

                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <path className="experience-sketch-line experience-sketch-line-field" d="M89 83 C180 31 313 48 408 98 C534 164 665 167 714 282 C760 389 657 486 513 492 C358 498 264 453 166 468 C71 482 22 415 48 314 C69 232 22 139 89 83Z" strokeWidth="0.45" opacity="0.22" />
                  <path className="experience-sketch-dashed" d="M116 108 C220 62 338 73 434 130 C553 201 645 203 684 298 C719 384 627 456 499 462 C371 468 285 424 178 438 C96 449 59 392 78 312 C97 230 55 151 116 108Z" strokeWidth="0.38" strokeDasharray="6 10" style={{ '--sketch-opacity': 0.18 } as CSSProperties} />
                  <path className="experience-sketch-dashed" d="M80 280 C151 244 245 241 329 270 C420 302 511 290 620 239" strokeWidth="0.36" strokeDasharray="3 9" style={{ '--sketch-opacity': 0.2 } as CSSProperties} />

                  <path className="experience-sketch-line experience-sketch-line-connector" d="M322 190 C348 212 363 226 374 240" strokeWidth="1.15" opacity="0.65" />
                  <path className="experience-sketch-line experience-sketch-line-connector" d="M324 185 C350 208 365 225 379 238" strokeWidth="0.42" opacity="0.34" />
                  <path className="experience-sketch-line experience-sketch-line-connector" d="M271 372 C311 332 340 302 366 282" strokeWidth="1.15" opacity="0.65" />
                  <path className="experience-sketch-line experience-sketch-line-connector" d="M266 368 C306 337 337 306 361 281" strokeWidth="0.44" opacity="0.32" />
                  <path className="experience-sketch-line experience-sketch-line-connector" d="M544 221 C506 234 478 247 444 263" strokeWidth="1.15" opacity="0.65" />
                  <path className="experience-sketch-line experience-sketch-line-connector" d="M548 226 C508 237 481 249 446 268" strokeWidth="0.42" opacity="0.3" />
                  <path className="experience-sketch-dashed" d="M238 290 C309 253 409 217 546 305" strokeWidth="0.72" strokeDasharray="5 8" style={{ '--sketch-opacity': 0.28 } as CSSProperties} />
                  <path className="experience-sketch-dashed experience-sketch-dashed-travel" d="M170 419 C255 353 355 330 526 386" stroke="rgb(180 83 9)" strokeWidth="0.82" strokeDasharray="4 7" style={{ '--sketch-opacity': 0.55 } as CSSProperties} />

                  <path className="experience-sketch-line experience-sketch-node" d="M213 126 C243 91 306 96 332 131 C363 173 327 231 267 225 C214 220 177 166 213 126Z" strokeWidth="1.08" opacity="0.62" />
                  <path className="experience-sketch-line experience-sketch-node" d="M218 120 C252 99 306 105 330 139 C357 179 318 226 264 218 C211 210 185 151 218 120Z" strokeWidth="0.55" opacity="0.3" />

                  <path className="experience-sketch-line experience-sketch-node" d="M141 347 C174 308 239 313 268 354 C300 399 258 456 198 449 C142 442 103 389 141 347Z" strokeWidth="1.02" opacity="0.6" />
                  <path className="experience-sketch-line experience-sketch-node" d="M151 340 C186 313 244 327 266 365 C291 410 249 451 197 443 C144 434 119 373 151 340Z" strokeWidth="0.5" opacity="0.3" />

                  <path className="experience-sketch-line experience-sketch-node" d="M544 146 C581 113 646 129 663 176 C681 226 633 278 579 262 C526 246 502 185 544 146Z" strokeWidth="1.08" opacity="0.62" />
                  <path className="experience-sketch-line experience-sketch-node" d="M552 139 C590 119 648 139 660 183 C674 231 627 267 580 255 C532 243 512 177 552 139Z" strokeWidth="0.55" opacity="0.3" />

                  <path className="experience-sketch-line experience-sketch-node experience-sketch-node-central" d="M359 230 C383 201 431 208 449 238 C473 278 434 327 385 314 C337 301 325 264 359 230Z" strokeWidth="1.45" opacity="0.72" />
                  <path className="experience-sketch-line experience-sketch-node experience-sketch-node-central" d="M352 235 C382 196 438 213 452 245 C467 281 431 321 388 310 C348 299 329 267 352 235Z" strokeWidth="0.8" opacity="0.38" />
                  <path className="experience-sketch-line experience-sketch-node experience-sketch-node-central" d="M365 226 C398 211 434 226 444 255 C455 289 420 315 385 304 C349 293 339 247 365 226Z" strokeWidth="0.55" opacity="0.3" />

                  <g className="experience-sketch-ticks" opacity="0.6">
                    <path d="M337 228 l-13 -9" strokeWidth="0.72" />
                    <path d="M338 231 l-12 -5" strokeWidth="0.36" />
                    <path d="M456 241 l17 -7" strokeWidth="0.62" />
                    <path d="M456 245 l15 -3" strokeWidth="0.34" />
                    <path d="M334 302 l-15 11" strokeWidth="0.58" />
                    <path d="M210 114 l-13 -12" strokeWidth="0.55" />
                    <path d="M650 168 l18 -8" strokeWidth="0.55" />
                    <path d="M142 371 l-18 2" strokeWidth="0.55" />
                  </g>

                  <g className="experience-sketch-hatching" opacity="0.42">
                    <path d="M260 92 l-9 19" strokeWidth="0.32" />
                    <path d="M275 91 l-11 23" strokeWidth="0.3" />
                    <path d="M290 95 l-10 21" strokeWidth="0.28" />
                    <path d="M178 342 l-15 22" strokeWidth="0.32" />
                    <path d="M194 337 l-16 26" strokeWidth="0.3" />
                    <path d="M211 339 l-16 25" strokeWidth="0.28" />
                    <path d="M598 130 l-16 24" strokeWidth="0.32" />
                    <path d="M615 135 l-16 27" strokeWidth="0.3" />
                    <path d="M632 144 l-13 23" strokeWidth="0.28" />
                    <path d="M384 220 l-19 30" strokeWidth="0.35" />
                    <path d="M404 216 l-25 43" strokeWidth="0.32" />
                    <path d="M425 225 l-28 48" strokeWidth="0.3" />
                  </g>

                  <g className="experience-sketch-markers" opacity="0.55">
                    <path d="M197 103 c2 -2 5 -2 7 0 c-1 2 -5 3 -7 0Z" strokeWidth="0.34" />
                    <path d="M536 221 c2 -2 5 -1 6 1 c-2 2 -5 2 -6 -1Z" strokeWidth="0.34" />
                    <path d="M170 419 c2 -2 5 -1 6 1 c-2 2 -5 2 -6 -1Z" stroke="rgb(180 83 9)" strokeWidth="0.34" />
                  </g>
                </g>

                <g className="experience-sketch-main-labels" fill="currentColor">
                <text x="398" y="255" textAnchor="middle" fontSize="18" fontWeight="700" letterSpacing="1.2" transform="rotate(-1 398 255)">
                  EXPERIENCES
                </text>
                <text x="198" y="104" fontSize="16" fontWeight="700" letterSpacing="1" transform="rotate(-3 198 104)">
                  PEOPLE
                </text>
                <text x="119" y="333" fontSize="16" fontWeight="700" letterSpacing="1" transform="rotate(2 119 333)">
                  PLACES
                </text>
                <text x="556" y="132" fontSize="16" fontWeight="700" letterSpacing="1" transform="rotate(2 556 132)">
                  SYSTEMS
                </text>
              </g>

              <g className="experience-sketch-annotations" fill="currentColor">
                <text x="398" y="280" textAnchor="middle" fontSize="13" fontWeight="400" opacity="0.68" transform="rotate(-1 398 280)">
                  products / services / destinations / journeys
                </text>
                <text x="198" y="128" fontSize="12.5" fontWeight="400" opacity="0.72" transform="rotate(-3 198 128)">
                  human behavior
                </text>
                <text x="198" y="146" fontSize="12.5" fontWeight="400" opacity="0.72" transform="rotate(-3 198 146)">
                  decision making
                </text>
                <text x="198" y="164" fontSize="12.5" fontWeight="400" opacity="0.72" transform="rotate(-3 198 164)">
                  journeys
                </text>
                <text x="119" y="358" fontSize="12.5" fontWeight="400" opacity="0.72" transform="rotate(2 119 358)">
                  landscape architecture
                </text>
                <text x="119" y="376" fontSize="12.5" fontWeight="400" opacity="0.72" transform="rotate(2 119 376)">
                  outdoor environments
                </text>
                <text x="119" y="394" fontSize="12.5" fontWeight="400" opacity="0.72" transform="rotate(2 119 394)">
                  hospitality
                </text>
                <text x="556" y="157" fontSize="12.5" fontWeight="400" opacity="0.72" transform="rotate(2 556 157)">
                  UX/UI + product design
                </text>
                <text x="556" y="175" fontSize="12.5" fontWeight="400" opacity="0.72" transform="rotate(2 556 175)">
                  operations
                </text>
                <text x="556" y="193" fontSize="12.5" fontWeight="400" opacity="0.72" transform="rotate(2 556 193)">
                  AI systems
                </text>
              </g>

              <g className="experience-sketch-note" fill="currentColor">
                <text x="501" y="407" fontSize="14" fontWeight="700" letterSpacing="0.8" fill="rgb(146 64 14)" transform="rotate(-2 501 407)">
                  FIELD NOTES: 41 COUNTRIES
                </text>
                <text x="501" y="428" fontSize="12.5" fontWeight="400" opacity="0.72" transform="rotate(-2 501 428)">
                  observing how people navigate unfamiliar
                </text>
                <text x="501" y="446" fontSize="12.5" fontWeight="400" opacity="0.72" transform="rotate(-2 501 446)">
                  places, cultures, systems, and decisions
                </text>
              </g>
              </svg>

              <svg
                className="relative z-10 h-auto w-full overflow-visible text-gray-950 md:hidden"
                viewBox="0 0 360 620"
                role="img"
                aria-labelledby="experience-sketch-mobile-title experience-sketch-mobile-desc"
              >
                <title id="experience-sketch-mobile-title">Hand-drawn concept sketch for mobile</title>
                <desc id="experience-sketch-mobile-desc">
                  Experiences sits at the center of people, places, and systems, with Field Notes: 41 Countries as a travel annotation.
                </desc>

                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <path className="experience-sketch-line experience-sketch-line-field" d="M42 35 C112 7 226 24 294 92 C356 154 341 270 286 335 C230 401 126 390 68 338 C8 284 -17 171 42 35Z" strokeWidth="0.56" opacity="0.2" />
                  <path className="experience-sketch-dashed" d="M66 72 C133 44 234 62 286 126 C337 189 313 279 260 325 C207 371 121 363 76 314 C24 257 9 136 66 72Z" strokeWidth="0.44" strokeDasharray="5 8" style={{ '--sketch-opacity': 0.18 } as CSSProperties} />
                  <path className="experience-sketch-line experience-sketch-line-connector" d="M131 152 C151 190 163 219 173 255" strokeWidth="1.1" opacity="0.62" />
                  <path className="experience-sketch-line experience-sketch-line-connector" d="M116 433 C135 390 153 355 175 326" strokeWidth="1.1" opacity="0.62" />
                  <path className="experience-sketch-line experience-sketch-line-connector" d="M257 204 C229 222 209 240 188 262" strokeWidth="1.1" opacity="0.62" />
                  <path className="experience-sketch-dashed experience-sketch-dashed-travel" d="M70 526 C124 476 198 455 293 487" stroke="rgb(180 83 9)" strokeWidth="0.78" strokeDasharray="4 7" style={{ '--sketch-opacity': 0.52 } as CSSProperties} />

                  <path className="experience-sketch-line experience-sketch-node" d="M83 94 C108 66 158 75 174 111 C190 150 153 187 112 178 C73 169 57 124 83 94Z" strokeWidth="1.02" opacity="0.62" />
                  <path className="experience-sketch-line experience-sketch-node" d="M88 91 C118 73 160 83 172 116 C185 151 150 181 112 173 C76 165 63 116 88 91Z" strokeWidth="0.52" opacity="0.3" />
                  <path className="experience-sketch-line experience-sketch-node" d="M58 395 C86 366 137 375 152 411 C168 449 130 488 88 477 C49 467 31 424 58 395Z" strokeWidth="1.02" opacity="0.62" />
                  <path className="experience-sketch-line experience-sketch-node" d="M61 391 C92 372 136 384 150 416 C164 451 127 482 88 472 C52 463 37 417 61 391Z" strokeWidth="0.52" opacity="0.3" />
                  <path className="experience-sketch-line experience-sketch-node" d="M236 132 C265 105 315 119 328 156 C342 198 302 234 261 222 C222 210 205 161 236 132Z" strokeWidth="1.02" opacity="0.62" />
                  <path className="experience-sketch-line experience-sketch-node" d="M241 128 C269 112 315 127 325 161 C336 198 300 229 262 217 C227 206 211 158 241 128Z" strokeWidth="0.52" opacity="0.3" />
                  <path className="experience-sketch-line experience-sketch-node experience-sketch-node-central" d="M137 257 C169 224 224 234 242 273 C262 316 219 362 169 349 C124 337 104 293 137 257Z" strokeWidth="1.28" opacity="0.72" />
                  <path className="experience-sketch-line experience-sketch-node experience-sketch-node-central" d="M141 253 C173 230 222 239 239 277 C256 315 217 354 171 344 C129 334 111 287 141 253Z" strokeWidth="0.62" opacity="0.34" />

                  <g className="experience-sketch-hatching" opacity="0.4">
                    <path d="M112 78 l-10 18" strokeWidth="0.32" />
                    <path d="M128 78 l-12 21" strokeWidth="0.3" />
                    <path d="M87 398 l-14 24" strokeWidth="0.32" />
                    <path d="M104 397 l-15 26" strokeWidth="0.3" />
                    <path d="M268 131 l-14 23" strokeWidth="0.32" />
                    <path d="M286 138 l-14 24" strokeWidth="0.3" />
                    <path d="M169 248 l-22 38" strokeWidth="0.34" />
                    <path d="M192 248 l-25 45" strokeWidth="0.31" />
                    <path d="M214 260 l-25 44" strokeWidth="0.29" />
                  </g>

                  <g className="experience-sketch-markers" opacity="0.55">
                    <path d="M82 88 c2 -2 5 -2 7 0 c-2 2 -5 3 -7 0Z" strokeWidth="0.34" />
                    <path d="M251 204 c2 -2 5 -1 7 1 c-2 2 -6 2 -7 -1Z" strokeWidth="0.34" />
                    <path d="M70 526 c2 -2 5 -1 6 1 c-2 2 -5 2 -6 -1Z" stroke="rgb(180 83 9)" strokeWidth="0.34" />
                  </g>
                </g>

                <g className="experience-sketch-main-labels" fill="currentColor">
                  <text x="188" y="288" textAnchor="middle" fontSize="16" fontWeight="700" letterSpacing="1" transform="rotate(-1 188 288)">EXPERIENCES</text>
                  <text x="81" y="89" fontSize="15" fontWeight="700" letterSpacing="0.8" transform="rotate(-4 81 89)">PEOPLE</text>
                  <text x="54" y="393" fontSize="15" fontWeight="700" letterSpacing="0.8" transform="rotate(2 54 393)">PLACES</text>
                  <text x="236" y="129" fontSize="15" fontWeight="700" letterSpacing="0.8" transform="rotate(3 236 129)">SYSTEMS</text>
                </g>

                <g className="experience-sketch-annotations" fill="currentColor">
                  <text x="188" y="312" textAnchor="middle" fontSize="12" fontWeight="400" opacity="0.72">products / services / journeys</text>
                  <text x="81" y="113" fontSize="12" fontWeight="400" opacity="0.72" transform="rotate(-4 81 113)">human behavior</text>
                  <text x="81" y="130" fontSize="12" fontWeight="400" opacity="0.72" transform="rotate(-4 81 130)">decision-making</text>
                  <text x="54" y="417" fontSize="12" fontWeight="400" opacity="0.72" transform="rotate(2 54 417)">landscape architecture</text>
                  <text x="54" y="434" fontSize="12" fontWeight="400" opacity="0.72" transform="rotate(2 54 434)">travel / hospitality</text>
                  <text x="236" y="153" fontSize="12" fontWeight="400" opacity="0.72" transform="rotate(3 236 153)">product design</text>
                  <text x="236" y="170" fontSize="12" fontWeight="400" opacity="0.72" transform="rotate(3 236 170)">AI + operations</text>
                </g>

                <g className="experience-sketch-note" fill="currentColor">
                  <text x="78" y="536" fontSize="13" fontWeight="700" letterSpacing="0.7" fill="rgb(146 64 14)" transform="rotate(-2 78 536)">FIELD NOTES: 41 COUNTRIES</text>
                  <text x="78" y="557" fontSize="12" fontWeight="400" opacity="0.72" transform="rotate(-2 78 557)">real-world context across</text>
                  <text x="78" y="574" fontSize="12" fontWeight="400" opacity="0.72" transform="rotate(-2 78 574)">places, systems, and decisions</text>
                </g>
              </svg>
            </SketchReveal>
          </div>
    </div>
  );
}

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
        <div className="homepage-root relative w-full text-[#2F2A3B] overflow-x-hidden scroll-optimized">
        
        {/* Unified Hero & Introduction Section */}
<section id="hero" className="homepage-section homepage-hero-section intro-section bg-white relative z-[1] overflow-hidden" aria-label="Introduction">
{/* Field-study texture layer - Hard breakout of any parent margins */}
<div 
  className="pointer-events-none absolute top-0 z-0 hidden select-none lg:block" 
  style={{ 
    width: '100vw', 
    left: '50%', 
    right: '50%', 
    marginLeft: '-50vw', 
    marginRight: '-50vw' 
  }}
  aria-hidden="true"
>
  {/* Gradient overlay to protect text legibility */}
  <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-white/10 to-white"></div>
  
  <div 
    className="w-full opacity-10 mix-blend-multiply relative"
    style={{ aspectRatio: '1408 / 768' }}
  >
    <Image
      src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/field-study-sketch.png`}
      alt=""
      fill
      priority
      className="w-full h-full object-fill"
      sizes="100vw"
    />
  </div>
</div>

  {/* Hero Content - Cleanly stacked content column */}
  <div className="relative z-10 flex flex-col justify-center pt-24 md:pt-32">
    <div className="homepage-container py-0">
      <div className="w-full text-left">
        
{/* Title Block - Clean Editorial Layout (Zero Gradients = Zero Banding) */}
<div className="homepage-copy-column homepage-section-header homepage-title-only relative z-10">
  <h1 
    className="hero-title font-sf-pro-display font-black leading-[1.15] tracking-normal text-left text-[#151B18]" 
    style={{ 
      fontSize: 'clamp(1.75rem, 4.5vw, 3.75rem)', 
      whiteSpace: 'normal',
      fontFamily: "'tiempos-headline-regular', serif",
      marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
    }}
  >
    Designing Experiences Across{' '}
    <span 
      className="text-black inline-block underline decoration-[#8AA399] decoration-[3px] md:decoration-[4px] underline-offset-[6px] md:underline-offset-[8px]"
      style={{
        textDecorationSkipInk: 'none'
      }}
    >
      People, Places, &amp; Systems
    </span>
  </h1>
</div>

        {/* Narrative Copy Stack */}
        <div className="homepage-copy-column space-y-6 md:space-y-8 mb-0">
          <p className="text-gray-900 leading-relaxed tracking-normal text-left" 
            style={{ 
              fontFamily: "'Roboto', Helvetica, sans-serif", 
              fontSize: 'clamp(1.1rem, 1.05rem + 0.25vw, 1.2rem)' 
            }}
          >
            <strong>I’m Dan Meier.</strong> For 15+ years, I’ve worked with teams to design digital products, human experiences, and systems architecture. My design and build process started in landscape architecture and urban design, shaped by the grit of manual labor and travel to 41 countries. No matter what I’m building, my focus is always the same: designing for scale and adaptability, instead of fixed systems or static plans.
          </p>
          
          <p 
            className="italic text-gray-800 leading-relaxed tracking-normal text-left font-normal"
            style={{ 
              fontFamily: "'Roboto', Helvetica, sans-serif", 
              fontSize: 'clamp(1.1rem, 1.05rem + 0.25vw, 1.2rem)',
              borderLeft: '2px solid #E5E7EB',
              paddingLeft: '1rem' 
            }}
          >
            Currently building AI-enabled systems that connect real-world context, decision support, and human-centered experience&nbsp;design.
          </p>
          
          {/* Dedicated Signature Frame - Tightened top spacing */}
          <div className="pt-2 md:pt-4 block visual-signature-wrapper">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/signature-25.png`}
              alt="Dan Meier signature"
              width={208}
              height={70}
              className="w-auto"
              style={{ 
                height: '40px', 
                maxWidth: '311px',
                display: 'block'
              }}
            />
          </div>
        </div>

      </div>
    </div>
  </div>
  
  {/* Hero Image Container - Tightened gap with clean bottom margin */}
  <div className="homepage-container mt-12 md:mt-16 mb-16 md:mb-24 relative z-10">
    <div className="homepage-copy-column">
      <div 
        className="w-full relative rounded-lg shadow-lg overflow-hidden" 
        style={{ 
          background: '#f0f0f0',
          aspectRatio: '1920 / 1080'
        }}
      >
        <Image 
          id="me_heroImage-1_1.1.1"
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/me_heroImage-1_1.1.1.webp`}
          alt="Dan Meier"
          width={1920}
          height={1080}
          priority
          sizes="(max-width: 768px) 100vw, 576px"
          className="w-full h-auto block rounded-lg transition-all duration-300"
        />
      </div>
    </div>
  </div>
</section>


        {/* Stable anchor target for About section - zero height, positioned before content */}
        <div className="anchor-offset" aria-hidden="true"></div>
        
        {/* About Me Section */}
        <section id="about" className="homepage-section bg-white relative" aria-label="The Lens Behind the Work">
        <div className="homepage-container relative">
  <div className="w-full">
    {/* Heading */}
    <div className="homepage-copy-column homepage-section-header homepage-title-only section-header-spacing">
      <h1 
        className="hero-title font-sf-pro-display font-bold leading-[1.05] tracking-tight w-full text-left md:leading-[1.1]" 
        style={{ 
          fontSize: 'var(--title-size, clamp(1.75rem, 5vw, 2.25rem))', 
          fontFamily: "'tiempos-headline-regular', serif",
          marginBottom: 'calc(1.32 * 1.5rem)' 
        }}
      >
        <span className="bg-gradient-to-r from-black via-gray-700 to-gray-500 bg-clip-text text-transparent animate-gradient-shift bg-[length:300%_auto] font-bold [font-size:clamp(1.75rem,5vw,2.25rem)] md:[font-size:clamp(2.5rem,4.5vw,3.75rem)]">
          The Lens Behind{"\u00a0"}the{"\u00a0"}Work
        </span>
      </h1>
    </div>

              {/* Single Column Layout: Images and Text Stacked Vertically */}
              <div className="homepage-copy-column homepage-media-stack">
                {/* First Image */}
                {/* ✅ REMOVED - Suspense and motion.div (animations) */}
                <div className="w-full">
                  <div 
                    className="w-full relative rounded-lg shadow-lg overflow-hidden"
                    style={{
                      background: '#f0f0f0' /* Skeleton state background */,
                      aspectRatio: '2129 / 1383' /* Match actual image dimensions (2129x1383) */
                    }}
                  >
                    <Image 
                      id="me_heroImage-1_1.1.1-about"
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/me-arches-wine.jpg`}
                      alt="Dan Meier"
                      width={2129}
                      height={1383}
                      className="w-full h-auto rounded-lg"
                      sizes="(max-width: 768px) 100vw, 576px"
                      loading="lazy"
                    />
                  </div>
                </div>

               {/* Second Image (Portrait) */}
<div className="w-full">
  <div 
    className="w-full relative rounded-lg shadow-lg overflow-hidden"
    style={{
      background: '#f0f0f0' /* Maintains the placeholder color while loading */
    }}
  >
    <Image 
      id="me_heroImage-1_1.1.1-about-2"
      src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/portrait-4shots_2.jpg`}
      alt="Dan Meier"
      width={576} // The intrinsic width of the file
      height={768} // The intrinsic height of the file
      className="w-full h-auto block rounded-lg" // h-auto is key for auto-fitting
      sizes="(max-width: 768px) 100vw, 576px"
      loading="lazy"
    />
  </div>
</div>

                {/* Design Journey Section */}
                <div className="w-full mt-8 md:mt-10">
                  <div className="homepage-stack">
                    {/* Design Journey Path Marker */}
                    <div className="flex items-center gap-3 opacity-60">
                      <div className="w-8 h-px bg-stone-300"></div>
                      <div className="w-1.5 h-1.5 bg-stone-400 rounded-full"></div>
                      <div className="text-sm font-medium text-stone-500">From Place to Product</div>
                    </div>
                    
                    <p className="text-xl md:text-2xl leading-relaxed text-gray-700"
                      style={{
                        fontFamily: "'Roboto', Helvetica, sans-serif",
                        fontSize: 'clamp(1.1rem, 1.18rem - 0.5vw, 1.18rem)'
                      }}>
                      {preventWidow(`My design foundation began in urban design and landscape architecture, where I learned to think about movement, context, circulation, constraints, and how people experience space. That training became the lens I brought into UX and product design: understanding complex systems, then shaping clearer paths through them.`)}
                    </p>
                  </div>
                </div>

                {/* Experience Concept Sketch */}
                <div className="w-full my-8 md:my-10">
                  <ExperienceConceptDiagram />
                </div>

                {/* Travel Discovery Section */}
                <div className="w-full">
                  <div className="homepage-stack">
                    {/* Travel Discovery Divider */}
                    <div className="flex items-center justify-center py-2 md:py-4">
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
                    <p
                    className="text-xl md:text-2xl leading-relaxed text-gray-700"
                    style={{
                      fontFamily: "'Roboto', Helvetica, sans-serif",
                      fontSize: 'clamp(1.1rem, 1.18rem - 0.5vw, 1.18rem)'
                    }}
                  >
                    Travel deepened that lens. Moving through <span className="text-amber-600 font-semibold">40+ countries </span> has shaped how I observe place, behavior, friction, wayfinding, hospitality, and decision-making in unfamiliar environments. Those experiences continue to inform how I design for people moving through real-world&nbsp;complexity.
                  </p>
                    <p className="text-sm text-gray-900 italic" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
                      *All visuals captured through my lens, no AI-generated photos or video.
                    </p>
                  </div>
                </div>

                <div className="w-full">
                <div 
                  className="w-full relative rounded-lg shadow-lg overflow-hidden"
                  style={{
                    background: '#f0f0f0', 
                    /* We remove the hardcoded aspectRatio style here */
                  }}
                >
                  <Image 
                    id="me_heroImage-1_1.1.1-about-3"
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/portrait-4shots_1.jpg`}
                    alt="Dan Meier"
                    // Providing these tells Next.js the intrinsic ratio
                    width={576} 
                    height={768}
                    // h-auto ensures the height adjusts based on the width of the container
                    className="w-full h-auto block rounded-lg"
                    sizes="(max-width: 768px) 100vw, 576px"
                    priority={true} // Optional: use if this is "above the fold"
                  />
                </div>
              </div>

                {/* Fourth Image (Portrait) */}
<div className="w-full">
  <div 
    className="w-full relative rounded-lg shadow-lg overflow-hidden"
    style={{
      background: '#f0f0f0' /* Skeleton state remains for the initial box */
    }}
  >
    <Image 
      id="me_heroImage-1_1.1.1-about-4"
      src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/portrait-4shots_3.jpg`}
      alt="Dan Meier"
      // Provide the natural dimensions of the file to preserve ratio
      width={576} 
      height={768}
      // w-full makes it responsive; h-auto lets the file ratio define the height
      className="w-full h-auto block rounded-lg"
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
        <section id="travelogue" className="homepage-section relative overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
          {/* Keep the old ID for backward compatibility */}
          <div id="world-travel-diaries" style={{ position: 'absolute', top: 0, left: 0, width: 1, height: 1, opacity: 0, pointerEvents: 'none' }} aria-hidden="true"></div>
          {/* World Map Background - This is the main target for scrolling */}
          <div id="world-travel-diaries-background" className="absolute inset-0 opacity-100" style={{ backgroundColor: '#ffffff' }}>
          </div>
          
          <div className="homepage-container relative z-10">
            {/* ✅ REMOVED - Suspense and FadeInSection (animations) */}
            <div className="homepage-copy-column text-center homepage-section-header section-header-spacing">
              
            <h2 className="text-5xl md:text-6xl font-bold mb-5 md:mb-6 tracking-tight text-pretty" style={{
              fontFamily: "'tiempos-headline-regular', serif",
              color: '#000000'
            }}>
              Field Notes From <br></br> the World
            </h2>
              <p className="text-xl max-w-4xl mx-auto mb-6 md:mb-8 font-medium leading-relaxed" style={{
                fontFamily: "'Roboto', Helvetica, sans-serif",
                fontSize: 'clamp(1.1rem, 1.18rem - 0.5vw, 1.18rem)',
                color: '#374151'
              }}>
                Travel and adventure has been one of my strongest teachers in how people move through place, culture, uncertainty, hospitality, and environmental context. Across 41 countries, I’ve documented the moments, routes, and conditions that shape real-world experience.
              </p>
              <p className="text-sm max-w-4xl mx-auto mb-6 md:mb-8 italic leading-relaxed" style={{
                fontFamily: "'Roboto', Helvetica, sans-serif",
                color: '#374151'
              }}>
                *All visuals captured through my lens, no AI-generated photos or video.
              </p>
            </div>
            
            {/* Video Container */}
            <div>
              {/* Container with aspect-ratio to prevent layout shift */}
              {/* Remove minHeight - aspect-ratio handles sizing properly on all modern browsers */}
              <div 
                className="relative w-full rounded-3xl overflow-hidden travelogue-video-container"
                style={{ 
                  aspectRatio: '16 / 9',
                  backgroundColor: '#000000'
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
                  loading="lazy"
                />
              </div>
            </div>
            
            {/* Video Frames Grid */}
            <div className="max-w-4xl mx-auto mt-10 md:mt-12">
              <div className="grid grid-cols-1 gap-6 md:gap-8">
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
            <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto justify-center sm:justify-start mt-7 md:mt-8">
              <a
                href="https://www.youtube.com/@dsmeier"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-black border border-black/30 rounded-lg font-medium hover:border-white/50 transition-all duration-200"
                style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
              >
                YouTube
              </a>
              <a
                href="https://vimeo.com/user94578264"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-black border border-black/30 rounded-lg font-medium hover:border-white/50 transition-all duration-200"
                style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
              >
                Vimeo
              </a>
            </div>
            
            {/* Modern Coming Soon Card */}
            {/* ✅ REMOVED - Suspense and FadeInSection (animations) */}
            <div className="relative mt-14 md:mt-20">
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
                          <div className="homepage-copy-column">
                              <h3 className="text-2xl md:text-3xl font-bold text-white">
                               Travel Field Journal
                             </h3>
                            <p className="text-gray-200 font-semibold" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: 'clamp(1.1rem, 1.18rem - 0.5vw, 1.18rem)' }}>Place-Based Stories</p>
                          </div>
                        </div>
                        
                        <div className="homepage-copy-column space-y-4 mb-6">
                          <p className="text-gray-200 text-lg leading-relaxed" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: 'clamp(1.1rem, 1.18rem - 0.5vw, 1.18rem)' }}>
                            A developing collection of visual field notes connecting photography, place-based storytelling, and interactive experience design.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="border-b border-white/35 pb-0.5 text-sm font-medium text-white/85">Field Notes</span>
                            <span className="border-b border-white/35 pb-0.5 text-sm font-medium text-white/85">Place</span>
                            <span className="border-b border-white/35 pb-0.5 text-sm font-medium text-white/85">Experience</span>
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
                            <h4 className="text-xl font-bold mb-2">Developing Field Journal</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tech Stack */}
            {/* ✅ REMOVED - Suspense and FadeInSection (animations) */}
            <div className="mt-14 md:mt-20 text-center">
              <div className="inline-flex items-center gap-3 border-t border-gray-200 px-2 pt-4">
                <span className="text-gray-600 text-sm font-medium">Field journal in progress</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-800 text-sm font-semibold">Visual notes</span>
                  <span className="text-gray-400">+</span>
                  <span className="text-gray-800 text-sm font-semibold">Digital archive</span>
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
              CORE ENGINE (HADE)
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
