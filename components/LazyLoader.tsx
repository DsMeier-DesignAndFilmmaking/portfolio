"use client";

import { useState, useEffect, useRef, ReactNode, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { prefersReducedMotion } from "@/utils/accessibility";
import { CardSkeleton, ChartSkeleton } from "./dashboard/LoadingSkeleton";

interface LazyLoaderProps {
  children: ReactNode;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  className?: string;
  placeholder?: ReactNode;
}

export function LazyLoader({
  children,
  fallback,
  threshold = 0.1,
  rootMargin = "50px",
  delay = 0,
  className = "",
  placeholder,
}: LazyLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const ref = useRef(null);
  const timeoutRef = useRef<number | null>(null);

  const inView = useInView(ref, {
    once: true,
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
      
      if (delay > 0) {
        timeoutRef.current = window.setTimeout(() => {
          setShouldRender(true);
        }, delay);
      } else {
        setShouldRender(true);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [inView, delay]);

  useEffect(() => {
    if (shouldRender) {
      setIsLoaded(true);
    }
  }, [shouldRender]);

  const defaultFallback = placeholder || (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );

  const shouldAnimate = !prefersReducedMotion();

  return (
    <div ref={ref} className={className}>
      <AnimatePresence mode="wait">
        {!isLoaded ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {fallback || defaultFallback}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Suspense fallback={fallback || defaultFallback}>
              {children}
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Specialized lazy loaders for different component types
export function LazyChart({
  children,
  delay = 100,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <LazyLoader
      delay={delay}
      className={className}
      fallback={<ChartSkeleton />}
      threshold={0.2}
    >
      {children}
    </LazyLoader>
  );
}

export function LazyCard({
  children,
  delay = 50,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <LazyLoader
      delay={delay}
      className={className}
      fallback={<CardSkeleton />}
      threshold={0.1}
    >
      {children}
    </LazyLoader>
  );
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  delay = 0,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  delay?: number;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (priority) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
    );
  }

  return (
    <LazyLoader
      delay={delay}
      fallback={
        <div 
          className={`bg-gray-200 dark:bg-gray-700 animate-pulse rounded ${className}`}
          style={{ width, height }}
          aria-label={`Loading ${alt}`}
        />
      }
    >
      {imageError ? (
        <div 
          className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 ${className}`}
          style={{ width, height }}
        >
          <span className="text-xs">Failed to load</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          loading="lazy"
        />
      )}
    </LazyLoader>
  );
}

// Virtual scrolling component for large lists
interface VirtualScrollProps {
  items: any[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: any, index: number) => ReactNode;
  className?: string;
  overscan?: number;
}

export function VirtualScroll({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  className = "",
  overscan = 5,
}: VirtualScrollProps) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight),
    items.length - 1
  );

  const startIndex = Math.max(0, visibleStart - overscan);
  const endIndex = Math.min(items.length - 1, visibleEnd + overscan);

  const visibleItems = items.slice(startIndex, endIndex + 1);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              style={{ height: itemHeight }}
            >
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Intersection observer hook for performance monitoring
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, options, hasIntersected]);

  return { isIntersecting, hasIntersected };
}
