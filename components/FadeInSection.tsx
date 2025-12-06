'use client';

import { motion } from 'framer-motion';
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
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    const element = elementRef.current;
    if (element) {
      // Check if element is already in viewport on mount (for anchor navigation)
      const checkViewport = () => {
        const rect = element.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInViewport) {
          setIsVisible(true);
          if (triggerOnce) {
            setHasAnimated(true);
          }
        }
      };
      
      // Check immediately for anchor navigation
      checkViewport();
      
      // Check after delays to catch delayed anchor navigation
      const timeouts = [
        setTimeout(checkViewport, 100),
        setTimeout(checkViewport, 300),
        setTimeout(checkViewport, 600),
        setTimeout(checkViewport, 1000)
      ];
      
      observer.observe(element);
      
      // Cleanup timeouts
      return () => {
        timeouts.forEach(clearTimeout);
      };
    }

    // Listen for scroll completion events
    const handleScrollComplete = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInViewport) {
          setIsVisible(true);
          if (triggerOnce) {
            setHasAnimated(true);
          }
        }
      }
    };

    // Listen for custom scroll completion event
    window.addEventListener('scrollComplete', handleScrollComplete);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      window.removeEventListener('scrollComplete', handleScrollComplete);
    };
  }, [threshold, rootMargin, triggerOnce]);

  // Animation variants based on direction
  const getVariants = () => {
    const baseVariants = {
      hidden: {
        opacity: 0,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smooth animation
        }
      },
      visible: {
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    };

    switch (direction) {
      case 'up':
        return {
          ...baseVariants,
          hidden: {
            ...baseVariants.hidden,
            y: distance
          },
          visible: {
            ...baseVariants.visible,
            y: 0
          }
        };
      case 'down':
        return {
          ...baseVariants,
          hidden: {
            ...baseVariants.hidden,
            y: -distance
          },
          visible: {
            ...baseVariants.visible,
            y: 0
          }
        };
      case 'left':
        return {
          ...baseVariants,
          hidden: {
            ...baseVariants.hidden,
            x: distance
          },
          visible: {
            ...baseVariants.visible,
            x: 0
          }
        };
      case 'right':
        return {
          ...baseVariants,
          hidden: {
            ...baseVariants.hidden,
            x: -distance
          },
          visible: {
            ...baseVariants.visible,
            x: 0
          }
        };
      case 'fade':
      default:
        return baseVariants;
    }
  };

  const shouldAnimate = triggerOnce ? (isVisible || hasAnimated) : isVisible;

  // Reserve space for animations that move content (prevent layout shift)
  // Use transform: translateY/translateX which doesn't affect layout flow
  // But ensure container has min-height to prevent collapse
  return (
    <div style={{ 
      // Reserve space for directional animations to prevent layout shift
      minHeight: direction === 'up' || direction === 'down' ? `${distance}px` : 'auto',
      minWidth: direction === 'left' || direction === 'right' ? `${distance}px` : 'auto'
    }}>
      <motion.div
        ref={elementRef}
        className={className}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        variants={getVariants()}
        viewport={{ once: triggerOnce, amount: threshold }}
        style={{
          // Ensure transform doesn't affect layout flow
          willChange: 'transform, opacity'
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
