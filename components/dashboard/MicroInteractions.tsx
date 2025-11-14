"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, ReactNode } from "react";
import { prefersReducedMotion, getAnimationDuration } from "@/utils/accessibility";

interface MicroInteractionProps {
  children: ReactNode;
  type?: 'fadeIn' | 'slideUp' | 'slideIn' | 'scale' | 'stagger';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

export default function MicroInteraction({
  children,
  type = 'fadeIn',
  delay = 0,
  duration,
  className = "",
  threshold = 0.1,
  triggerOnce = true,
}: MicroInteractionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: triggerOnce });
  const controls = useAnimation();
  const shouldAnimate = !prefersReducedMotion();

  const animationDuration = duration || getAnimationDuration(300);

  const animations = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slideUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    slideIn: {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
    },
    stagger: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
  };

  useEffect(() => {
    if (isInView && shouldAnimate) {
      controls.start("visible");
    }
  }, [isInView, controls, shouldAnimate]);

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animations[type]}
      transition={{
        duration: animationDuration / 1000,
        delay: delay / 1000,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Specialized interaction components
export function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <MicroInteraction type="fadeIn" delay={delay} className={className}>
      {children}
    </MicroInteraction>
  );
}

export function SlideUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <MicroInteraction type="slideUp" delay={delay} className={className}>
      {children}
    </MicroInteraction>
  );
}

export function ScaleIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <MicroInteraction type="scale" delay={delay} className={className}>
      {children}
    </MicroInteraction>
  );
}

// Staggered container for multiple items
interface StaggerContainerProps {
  children: ReactNode[];
  staggerDelay?: number;
  className?: string;
}

export function StaggerContainer({ children, staggerDelay = 100, className = "" }: StaggerContainerProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <MicroInteraction
          key={index}
          type="slideUp"
          delay={index * staggerDelay}
        >
          {child}
        </MicroInteraction>
      ))}
    </div>
  );
}

// Hover interaction component
interface HoverInteractionProps {
  children: ReactNode;
  scale?: number;
  className?: string;
  whileHover?: any;
  whileTap?: any;
}

export function HoverInteraction({
  children,
  scale = 1.02,
  className = "",
  whileHover,
  whileTap,
}: HoverInteractionProps) {
  const shouldAnimate = !prefersReducedMotion();

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      whileHover={whileHover || { scale, transition: { duration: 0.2 } }}
      whileTap={whileTap || { scale: 0.98, transition: { duration: 0.1 } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Pulse animation for loading states
interface PulseProps {
  children: ReactNode;
  duration?: number;
  className?: string;
}

export function Pulse({ children, duration = 1, className = "" }: PulseProps) {
  const shouldAnimate = !prefersReducedMotion();

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Shake animation for errors
interface ShakeProps {
  children: ReactNode;
  trigger?: boolean;
  className?: string;
}

export function Shake({ children, trigger = false, className = "" }: ShakeProps) {
  const shouldAnimate = !prefersReducedMotion();

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      animate={trigger ? { x: [-10, 10, -10, 10, 0] } : {}}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
