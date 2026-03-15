'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  // 1. Reset everything whenever the URL changes
  useEffect(() => {
    setIsScrolled(false);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  // 2. Simple Scroll Listener (Only for Home Page)
  useEffect(() => {
    if (pathname !== '/') return;

    const handleScroll = () => {
      // Toggle "tint" only after scrolling 50px
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // 3. Determine Styles based on Route
  const isProjectPage = pathname?.includes('/projects/');
  
  // Show "Design Work" only on /projects/previous/ and /projects/travel-and-ai/ (and subpaths)
  const showDesignWork = pathname?.startsWith('/projects/previous') || pathname?.startsWith('/projects/travel-and-ai');
  
  // Clean logic: If home and not scrolled, background is 100% transparent
  const navBg = !isScrolled && pathname === '/' 
    ? 'bg-transparent' 
    : 'bg-white/90 backdrop-blur-md shadow-sm';

  const textColor = isScrolled || isProjectPage ? 'text-black' : 'text-black';

  return (
    <motion.nav 
      id="site-navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${navBg}`}
    >
      <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo + Design Work (flex items-center) */}
        <div className="flex items-center gap-0">
          <Link href="/" className="relative h-9 w-32 flex-shrink-0">
            <Image 
              src={`${basePath}/images/signature-25.png`}
              alt="Logo" 
              fill 
              className="object-contain"
            />
          </Link>
          {showDesignWork && (
            <>
              <div className="hidden md:block w-px h-5 bg-slate-300 flex-shrink-0 mx-3" aria-hidden="true" />
              <span className={`hidden md:inline text-sm font-medium transition-colors duration-300 ${textColor}`}>
                Work
              </span>
            </>
          )}
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8">
          {['About', 'Work', 'Travelogue', 'Contact'].map((item) => (
            <Link 
              key={item}
              href={item === 'Work' ? '/#black-section' : `/#${item.toLowerCase()}`}
              className={`text-sm font-medium ${textColor} hover:text-blue-500 transition-colors`}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
