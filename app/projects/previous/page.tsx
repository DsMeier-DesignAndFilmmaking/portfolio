'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { allProjects } from '../../../utils/projectUtils';
import { useState, useEffect } from 'react';

export default function PreviousProjectsPage() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
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
  }, [lastScrollY, isMobileMenuOpen]);

  const handleBackHome = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <main className="min-h-screen bg-black">
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-50 bg-black transition-transform duration-300 ${
          atTop ? 'translate-y-0' : scrollDirection === 'down' ? 'md:translate-y-0 -translate-y-full' : 'translate-y-0'
        }`}
        style={{ minHeight: '80px' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Back Home Button */}
            <div className="py-4 flex items-center gap-4">
              <button
                onClick={handleBackHome}
                className="hover:opacity-80 transition-opacity flex items-center justify-center"
                aria-label="Return to home page"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/signature-25.png`}
                  alt="Daniel Meier"
                  width={150}
                  height={37}
                  className="h-9 w-auto brightness-0 invert"
                />
              </button>
              <div className="h-6 w-px bg-white/30"></div>
              <span className="text-white/70 text-sm font-medium">Design Work</span>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden pl-4 py-2 rounded-lg transition-colors flex items-center justify-end text-white"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between items-center">
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:block rounded-lg px-6 py-4">
              <nav className="flex items-center space-x-8">
                <Link 
                  href="/projects/travel-and-ai" 
                  className="text-[11pt] text-white hover:text-blue-400 transition-colors duration-200"
                >
                  Travel & AI
                </Link>
                <Link 
                  href="/projects/previous" 
                  className="text-[11pt] text-white hover:text-blue-400 transition-colors duration-200"
                >
                  Client Work
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-sm rounded-lg shadow-lg mx-6 border border-white/10"
            >
              <nav className="flex flex-col p-4 px-6 space-y-4">
                <Link 
                  href="/projects/travel-and-ai" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[11pt] text-gray-300 hover:text-white transition-colors"
                >
                  Travel & AI
                </Link>
                <Link 
                  href="/projects/previous" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[11pt] text-gray-300 hover:text-white transition-colors"
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
        className="relative h-[80vh] flex items-center bg-black md:pt-0" 
        aria-label="Project Hero"
        style={{ marginTop: 0, paddingTop: 0 }}
      >
        <div className="container mx-auto px-6 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl pt-20 md:pt-0 md:mt-[100px]"
          >
            <div className="inline-flex items-center gap-2 text-white text-sm font-medium mb-6">
              <span className="text-gray-400">UX / UI / Web / Product Design</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">
                Client Work
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white leading-relaxed">
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
                    <p className="text-xs text-gray-400">{project.year}</p>
                    <h3 className="text-sm font-normal text-white mt-1">{project.title}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* View More Work Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-base font-normal mb-12 text-center text-gray-400">
            View More Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Next Project Card */}
            <Link href="/projects/travel-and-ai" className="group">
              <div className="group relative w-full h-[480px] overflow-hidden rounded-xl">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/travelApp-card.jpg`}
                  alt="Travel & AI Project"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Travel & AI</h3>
                  <p className="text-gray-200 mb-4">Currently, I am building a travel application using AI tools.</p>
                  <div className="inline-flex items-center font-medium text-white hover:text-gray-300 transition-colors">
                    View Project
                  </div>
                </div>
              </div>
            </Link>

            {/* Previous Project Card */}
            <Link href="/projects/purdue" className="group">
              <div className="group relative w-full h-[480px] overflow-hidden rounded-xl">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/PU-Memorial-Mall-DJI.jpg`}
                  alt="Purdue University Project"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Purdue University</h3>
                  <p className="text-gray-200 mb-4">A comprehensive redesign of Purdue University's digital presence, focusing on enhancing user experience and modernizing their brand identity.</p>
                  <div className="inline-flex items-center font-medium text-white hover:text-gray-300 transition-colors">
                    View Project
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 