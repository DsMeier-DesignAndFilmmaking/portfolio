'use client';

import { useState, useEffect, ReactNode, Suspense, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { registerDisposalCallback } from './PageTransition';

interface SafeCanvasProps {
  /**
   * Children to render after client-side mount.
   * Typically Three.js/Canvas components that require WebGL context.
   */
  children: ReactNode;
  
  /**
   * Optional fallback to show during SSR and initial hydration.
   * If not provided, returns null during SSR/hydration.
   */
  fallback?: ReactNode;
  
  /**
   * Optional fallback for Suspense boundaries within the canvas.
   * Used for loading 3D models or other async assets.
   */
  suspenseFallback?: ReactNode;
  
  /**
   * Optional delay in milliseconds before mounting children.
   * Useful for ensuring DOM is fully stable before WebGL initialization.
   * Default: 0
   */
  mountDelay?: number;
  
  /**
   * Optional className to apply to the wrapper div.
   */
  className?: string;
  
  /**
   * Optional callback fired when component mounts on the client.
   */
  onMount?: () => void;
  
  /**
   * Optional callback fired when component unmounts.
   */
  onUnmount?: () => void;
}

/**
 * SafeCanvas - Prevents Hydration Errors and WebGL Memory Leaks
 * 
 * This component ensures that children (typically Three.js/Canvas components)
 * only mount on the client side after hydration is complete, preventing:
 * - React Hydration Errors (#418, #423)
 * - WebGL Context Loss during navigation
 * - removeChild crashes during route transitions
 * 
 * @example
 * ```tsx
 * <SafeCanvas>
 *   <ParallaxBackground modelPath="torus" />
 * </SafeCanvas>
 * ```
 * 
 * @example With fallback
 * ```tsx
 * <SafeCanvas 
 *   fallback={<div>Loading 3D scene...</div>}
 *   suspenseFallback={<div>Loading model...</div>}
 * >
 *   <DesignBuildScene />
 * </SafeCanvas>
 * ```
 */
export default function SafeCanvas({
  children,
  fallback = null,
  suspenseFallback = (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
      </div>
    </div>
  ),
  mountDelay = 50,
  className = '',
  onMount,
  onUnmount,
}: SafeCanvasProps) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const disposalCallbackRef = useRef<(() => void) | null>(null);
  const isReadyRef = useRef(false);
  const isCancelledRef = useRef(false);
  const handoffTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const readyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // GPU "Clear Zone" delay - gives the GPU time to release resources from previous page
  const GPU_HANDOFF_DELAY = 300;

  useEffect(() => {
    // Guard: Ensure we're on the client side
    if (typeof window === 'undefined') return;
    
    console.log('[SafeCanvas] mounted', { pathname });
    
    // Reset cancelled flag on mount
    isCancelledRef.current = false;

    // Register disposal callback for page transition coordination
    // This ensures Three.js cleanup happens immediately when route changes
    // Use ref to access current ready state (avoids stale closure)
    const handleDisposal = () => {
      if (isReadyRef.current) {
        isReadyRef.current = false;
        isCancelledRef.current = true;
        setIsReady(false);
        setIsMounted(false);
        
        // Call onUnmount callback immediately on route change
        if (onUnmount) {
          try {
            onUnmount();
          } catch (error) {
            if (process.env.NODE_ENV === 'development') {
              console.warn('Error in SafeCanvas onUnmount callback during disposal:', error);
            }
          }
        }
      }
    };

    // Register callback and store unregister function
    const unregister = registerDisposalCallback(handleDisposal);
    disposalCallbackRef.current = unregister;

    // STEP 1: GPU "Handoff" delay - creates a "Clear Zone" for GPU to breathe
    // This prevents WebGL context conflicts when navigating back from project pages
    handoffTimerRef.current = setTimeout(() => {
      // Check if component was unmounted during handoff delay
      if (isCancelledRef.current) return;
      
      // Now safe to set mounted - GPU has had time to release previous resources
      setIsMounted(true);
      
      // STEP 2: Additional delay before marking as "ready" for WebGL initialization
      // This staggered approach prevents multiple contexts being created simultaneously
      readyTimerRef.current = setTimeout(() => {
        // Check if component was unmounted during ready delay
        if (isCancelledRef.current) return;
        
        isReadyRef.current = true;
        setIsReady(true);
        
        // Call onMount callback if provided
        if (onMount) {
          try {
            onMount();
          } catch (error) {
            if (process.env.NODE_ENV === 'development') {
              console.warn('Error in SafeCanvas onMount callback:', error);
            }
          }
        }
      }, mountDelay);
    }, GPU_HANDOFF_DELAY);

    // Cleanup function to prevent memory leaks
    return () => {
      console.log('[SafeCanvas] unmounted', { pathname });
      
      // Mark as cancelled to prevent stale state updates
      isCancelledRef.current = true;
      
      // IMMEDIATELY set mounted to false to free up the WebGL context slot
      // This must happen first to prevent hitting browser context limit
      isReadyRef.current = false;
      setIsMounted(false);
      setIsReady(false);
      
      // Clear both timers using refs
      if (handoffTimerRef.current) {
        clearTimeout(handoffTimerRef.current);
        handoffTimerRef.current = null;
      }
      if (readyTimerRef.current) {
        clearTimeout(readyTimerRef.current);
        readyTimerRef.current = null;
      }
      
      // Unregister disposal callback
      if (disposalCallbackRef.current) {
        disposalCallbackRef.current();
        disposalCallbackRef.current = null;
      }
      
      // Call onUnmount callback if provided
      if (onUnmount) {
        try {
          onUnmount();
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.warn('Error in SafeCanvas onUnmount callback:', error);
          }
        }
      }
    };
  }, [mountDelay, onMount, onUnmount, pathname]); // Include pathname to reset on route change

  // During SSR and initial hydration, return fallback or null
  if (!isMounted || !isReady) {
    return <>{fallback}</>;
  }

  // After mount, wrap children in Suspense for async 3D assets
  return (
    <div className={className}>
      <Suspense fallback={suspenseFallback}>
        {children}
      </Suspense>
    </div>
  );
}

