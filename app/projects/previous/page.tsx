'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter, usePathname } from 'next/navigation';
import { allProjects } from '../../../utils/projectUtils';
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
      <motion.nav 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 bg-black transition-transform duration-300 ${
          atTop ? 'translate-y-0' : scrollDirection === 'down' ? 'lg:translate-y-0 -translate-y-full' : 'translate-y-0'
        }`}
        style={{ minHeight: '80px' }}
      >
        {/* CONTAINER STRATEGY: 
          'w-full' for fluid movement
          'mx-auto' to center it
          'px-6' for mobile gutter
          'max-w-[1440px]' to match your body's max width 
      */}
      
        <div className="container mx-auto px-6 relative z-20">
          <div className="flex justify-between items-center">
      {/* Back Home Button Wrapper */}
    <div className="flex items-center">
      <button
        onClick={handleBackHome}
        /* w-fit ensures the hit-area is only as wide as the signature */
        className="hover:opacity-80 transition-opacity p-0 m-0 w-fit h-fit flex items-center py-4"
        aria-label="Return to home page"
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/signature-25.png`}
          alt="Daniel Meier"
          width={150}
          height={37}
          priority
          /* brightness-0 + invert makes the black logo white for the black bg */
          className="h-9 w-auto transition-all duration-500 block brightness-0 invert"
        />
      </button>
    </div>

            {/* Mobile Menu Button */}
            {/* Ensure your Mobile/Desktop nav parts also use 'text-white' instead of the variable */}
    <button
      onClick={toggleMobileMenu}
      className="lg:hidden p-2 flex items-center justify-end text-white"
      aria-label="Toggle mobile menu"
    >
      <div className="w-6 h-5 relative flex flex-col justify-between items-center">
        <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
        <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </div>
    </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:block rounded-lg px-6 py-4">
              <nav className="flex items-center space-x-8">
                <Link 
                  href="/projects/travel-and-ai" 
                  className="text-[11pt] text-white hover:text-blue-400 transition-colors duration-200"
                  style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
                >
                  Travel & AI
                </Link>
                <Link 
                  href="/projects/previous" 
                  className="text-[11pt] text-white hover:text-blue-400 transition-colors duration-200"
                  style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
                >
                  Client Work
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence mode="wait">
          {isMobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-sm rounded-lg shadow-lg mx-6 border border-white/10"
            >
              <nav className="flex flex-col p-4 px-6 space-y-4">
                <Link 
                  href="/projects/travel-and-ai" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[11pt] text-gray-300 hover:text-white transition-colors"
                  style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
                >
                  Travel & AI
                </Link>
                <Link 
                  href="/projects/previous" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[11pt] text-gray-300 hover:text-white transition-colors"
                  style={{ fontFamily: "'Roboto', Helvetica, sans-serif" }}
                >
                  Client Work
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
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
              <span className="text-gray-400">UX / UI / Web / Product Design</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: "'tiempos-headline-regular', serif" }}>
              <span className="text-white">
                Client Work
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white leading-relaxed" style={{ fontFamily: "'Roboto', Helvetica, sans-serif", fontSize: '1.1rem' }}>
               A collection of digital design work spanning contract, freelance, and full-time roles across a range of industries.
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