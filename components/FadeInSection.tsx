'use client';

import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

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

    const element = document.getElementById(`fade-in-section-${Math.random().toString(36).substr(2, 9)}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
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

  return (
    <motion.div
      id={`fade-in-section-${Math.random().toString(36).substr(2, 9)}`}
      className={className}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      variants={getVariants()}
      viewport={{ once: triggerOnce, amount: threshold }}
    >
      {children}
    </motion.div>
  );
}
