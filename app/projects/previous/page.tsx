'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter, usePathname } from 'next/navigation';
import { allProjects } from '../../../utils/projectUtils';
import ProjectPracticeNavDropdown, { PROJECT_NAV_MOBILE_MENU_ID } from '../../../components/ProjectPracticeNavDropdown';
import { useState, useEffect } from 'react';

export default function PreviousProjectsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  // Initialize as false to match server render (server doesn't know scroll position)
  const [atTop, setAtTop] = useState(false);

  // Set mounted state on client only
  useEffect(() => {
    setIsMounted(true);
    // Initialize scroll state on mount
    if (typeof window !== 'undefined') {
      setAtTop(window.scrollY === 0);
    }
  }, []);

  useEffect(() => {
    // Ensure DOM exists and skip on server-side
    if (typeof window === 'undefined' || !isMounted) return;

    const handleScroll = () => {
      // Close mobile menu on scroll
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
      // Track if at top
      setAtTop(window.scrollY === 0);
      // Handle navbar hide/show on mobile based on scroll direction
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobileMenuOpen, isMounted]);

  // Set body background to black and add route-aware body class
  useEffect(() => {
    // Ensure DOM exists and skip on server-side
    if (typeof window === 'undefined' || typeof document === 'undefined' || !isMounted) return;
    
    document.body.style.backgroundColor = 'black';
    document.documentElement.style.backgroundColor = 'black';
    
    // Add route-aware body class for CSS targeting
    const isPreviousProject = pathname?.startsWith('/projects/previous') ?? false;
    if (isPreviousProject) {
      document.body.classList.add('no-mobile-nav-offset');
    }
    
    return () => {
      // ✅ Guard DOM manipulation during cleanup
      // RouteChangeCleanup will also reset overflow, but we clean up our specific styles
      if (typeof document !== 'undefined' && document.body) {
        document.body.style.backgroundColor = '';
        document.documentElement.style.backgroundColor = '';
        document.body.style.overflow = ''; // ✅ Additional safety - reset overflow
        document.body.classList.remove('no-mobile-nav-offset');
      }
    };
  }, [pathname, isMounted]);

  // Mobile-only hero fix on /projects/previous/ - positions hero directly below navbar
  useEffect(() => {
    // Ensure DOM exists and skip on server-side
    if (typeof window === 'undefined' || typeof document === 'undefined' || !isMounted) return;

    const handleMobileHeroFix = () => {
      if (pathname === '/projects/previous' && window.innerWidth <= 768) {
        const navbar = document.querySelector('nav');
        const hero = document.querySelector('.hero-section');

        if (navbar && hero) {
          // Get actual navbar height
          const navbarHeight = navbar.getBoundingClientRect().height;

          // Remove any top spacing on hero
          (hero as HTMLElement).style.marginTop = '0px';
          (hero as HTMLElement).style.paddingTop = '0px';
          (hero as HTMLElement).style.position = 'relative';
          (hero as HTMLElement).style.top = '0px';
          (hero as HTMLElement).style.transform = 'none';

          // Ensure hero sits directly below navbar using negative margin
          (hero as HTMLElement).style.marginTop = `-${navbarHeight}px`;

          // Remove extra body padding if navbar is fixed/sticky
          const bodyStyle = window.getComputedStyle(document.body);
          if (parseInt(bodyStyle.paddingTop) > 0) {
            document.body.style.paddingTop = '0px';
          }
        }
      }
    };

    // Run on mount and resize
    handleMobileHeroFix();
    window.addEventListener('resize', handleMobileHeroFix);

    return () => {
      // Cleanup
      const hero = document.querySelector('.hero-section');
      if (hero) {
        (hero as HTMLElement).style.marginTop = '';
        (hero as HTMLElement).style.paddingTop = '';
        (hero as HTMLElement).style.position = '';
        (hero as HTMLElement).style.top = '';
        (hero as HTMLElement).style.transform = '';
      }
      // ✅ Guard DOM manipulation during cleanup
      // RouteChangeCleanup will also reset overflow, but we clean up our specific styles
      if (typeof document !== 'undefined' && document.body) {
        const hero = document.querySelector('.hero-section');
        if (hero) {
          (hero as HTMLElement).style.marginTop = '';
          (hero as HTMLElement).style.paddingTop = '';
          (hero as HTMLElement).style.top = '';
          (hero as HTMLElement).style.transform = '';
        }
        document.body.style.paddingTop = '';
        document.body.style.overflow = ''; // ✅ Additional safety - reset overflow
      }
      window.removeEventListener('resize', handleMobileHeroFix);
    };
  }, [pathname, isMounted]);

  const handleBackHome = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <main className="min-h-screen bg-black" style={{ marginTop: 0, paddingTop: 0 }}>
      {/* Navigation */}
      {/* Navigation */}
<motion.nav 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.4 }}
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-black/95 backdrop-blur-md border-b border-white/10 ${
    atTop ? 'translate-y-0' : scrollDirection === 'down' ? 'lg:translate-y-0 -translate-y-full' : 'translate-y-0'
  }`}
>
  <div className="max-w-7xl mx-auto px-6 relative z-20">
    <div className="flex justify-between items-center">
      
      {/* Signature & Label Group */}
      <div className="flex items-center">
        <button
          onClick={handleBackHome}
          className="hover:opacity-80 transition-opacity p-0 m-0 w-fit h-fit flex items-center py-4"
          aria-label="Return to home page"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/signature-25.png`}
            alt="Dan Meier"
            width={150}
            height={37}
            priority
            /* Invert ensures the black logo file renders as white */
            className="h-9 w-auto invert brightness-0"
          />
        </button>
        
        <div className="flex items-center flex-shrink-0 ml-3">
          <div className="w-px h-5 bg-white/20 flex-shrink-0" aria-hidden="true" />
          <span className="ml-3 text-xs md:text-sm font-medium text-white/90 whitespace-nowrap">
            Work
          </span>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        data-project-nav-trigger
        aria-haspopup="menu"
        aria-expanded={isMobileMenuOpen}
        aria-controls={PROJECT_NAV_MOBILE_MENU_ID}
        className="lg:hidden pl-4 py-2 flex items-center justify-end text-white/80 hover:text-white"
        aria-label="Toggle mobile menu"
      >
        <div className="w-6 h-5 relative flex flex-col justify-between items-center">
          <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
      </button>

      <ProjectPracticeNavDropdown
        pathname={pathname}
        tone="dark"
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
    </div>
  </div>
</motion.nav>

      {/* Hero Section */}
      <section 
        className="hero-section relative h-[80vh] flex items-center bg-black md:pt-0" 
        aria-label="Project Hero"
        style={{ marginTop: 0, paddingTop: 0, top: 0 }}
      >
        <div className="container mx-auto px-6 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl pt-20 md:pt-0 md:mt-[100px]"
          >
            <div className="inline-flex items-center gap-2 text-white text-sm font-medium mb-6" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>
              <span className="text-gray-400">Professional Validation / Enterprise Delivery</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
              <span className="text-white">
              Shipped Projects & Client Work
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white leading-relaxed" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
              Professional case studies that validate the practice through shipped work across commerce, healthcare, higher education, enterprise, and emerging technology.
            </p>
            
          </motion.div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="pb-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {allProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white/[0.08] rounded-lg"
              >
                <Link href={project.id === 'purdue' ? '/projects/purdue' : (project.id ? `/projects/previous/${project.id}` : '#')}>
                  <div className="relative w-full h-64 overflow-hidden rounded-t-lg">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-400" style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}>{project.year}</p>
                    <h3 className="text-sm font-normal text-white mt-1" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>{project.title}</h3>
                    {project.proofLabel && (
                      <p className="mt-3 border-t border-white/10 pt-3 text-[11px] leading-relaxed text-gray-300">
                        {project.proofLabel}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Footer Cross-Link 
      <div className="mt-24 mb-8 md:mb-10">
        <hr className="border-0 h-px bg-white/8" />
        <div className="container mx-auto px-6 mt-8 md:mt-10">
          <p className="text-sm md:text-base text-gray-400 text-center">
            Interested in exploratory systems and travel-driven products? →{' '}
            <Link 
              href="/projects/travel-and-ai" 
              className="text-gray-300 hover:text-white hover:underline transition-colors duration-200"
            >
              Travel & AI Projects
            </Link>
          </p>
        </div>
      </div> */}
    </main>
  );
} 
