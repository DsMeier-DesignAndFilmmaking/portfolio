'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode, useEffect, useState, useRef } from 'react';

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  distance?: number;
  triggerOnce?: boolean;
  threshold?: number;
  rootMargin?: string;
}

export default function FadeInSection({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 30,
  triggerOnce = true,
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px'
}: FadeInSectionProps) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // ✅ Mounting guard: Prevent hydration crashes
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce) {
              setHasAnimated(true);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    // Check if element is already in viewport on mount (for anchor navigation)
    const checkViewport = () => {
      if (!elementRef.current) return;
      const rect = elementRef.current.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isInViewport) {
        setIsVisible(true);
        if (triggerOnce) {
          setHasAnimated(true);
        }
      }
    };
    
    checkViewport();
    
    const timeouts = [
      setTimeout(checkViewport, 100),
      setTimeout(checkViewport, 300),
      setTimeout(checkViewport, 600),
      setTimeout(checkViewport, 1000)
    ];
    
    observer.observe(element);

    const handleScrollComplete = () => {
      checkViewport();
    };

    window.addEventListener('scrollComplete', handleScrollComplete);

    return () => {
      timeouts.forEach(clearTimeout);
      observer.disconnect();
      window.removeEventListener('scrollComplete', handleScrollComplete);
    };
  }, [threshold, rootMargin, triggerOnce]);

  // ✅ Refactored getVariants to be strictly typed for production build
  const getVariants = (): Variants => {
    const ease = [0.16, 1, 0.3, 1] as const;

    // 1. Define the base fade states
    const baseVariants = {
      hidden: { 
        opacity: 0, 
        transition: { duration, delay, ease } 
      },
      visible: { 
        opacity: 1, 
        transition: { duration, delay, ease } 
      }
    };

    // 2. Apply directional offsets
    switch (direction) {
      case 'up':
        return {
          hidden: { ...baseVariants.hidden, y: distance },
          visible: { ...baseVariants.visible, y: 0 }
        };
      case 'down':
        return {
          hidden: { ...baseVariants.hidden, y: -distance },
          visible: { ...baseVariants.visible, y: 0 }
        };
      case 'left':
        return {
          hidden: { ...baseVariants.hidden, x: distance },
          visible: { ...baseVariants.visible, x: 0 }
        };
      case 'right':
        return {
          hidden: { ...baseVariants.hidden, x: -distance },
          visible: { ...baseVariants.visible, x: 0 }
        };
      case 'fade':
      default:
        return baseVariants;
    }
  };

  if (!mounted) {
    return null;
  }

  const shouldAnimate = triggerOnce ? (isVisible || hasAnimated) : isVisible;

  return (
    <div style={{ 
      minHeight: (direction === 'up' || direction === 'down') ? '1px' : 'auto',
      minWidth: (direction === 'left' || direction === 'right') ? '1px' : 'auto'
    }}>
      <motion.div
        ref={elementRef}
        className={className}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        variants={getVariants()}
        style={{
          willChange: 'transform, opacity'
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}