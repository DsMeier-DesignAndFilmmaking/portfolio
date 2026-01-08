'use client'

/**
 * PageTransition
 * - Handles route transitions with proper cleanup
 * - Prevents black screen on navigation
 * - Ensures content is visible during transitions
 */

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname()
  const prevPathnameRef = useRef<string | null>(null)
  const isInitialMountRef = useRef(true)

  // ✅ Mounting guard: Prevent hydration crashes
  useEffect(() => {
    setMounted(true);
  }, []);

  // Log route changes for debugging
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isInitialMountRef.current) {
        isInitialMountRef.current = false
        console.log('[PageTransition] initial mount', { pathname })
      } else if (prevPathnameRef.current !== pathname) {
        console.log('[PageTransition] route changed', { 
          from: prevPathnameRef.current, 
          to: pathname 
        })
      }
    }
    prevPathnameRef.current = pathname
  }, [pathname])

  // ✅ Mounting guard: Return null until mounted (AFTER all hooks)
  if (!mounted) {
    return null;
  }

  // ✅ FIX: Use "sync" mode instead of "wait" to prevent black screen
  // "wait" mode can cause content to disappear during transitions
  // "sync" mode keeps both pages visible during transition
  return (
    <AnimatePresence mode="sync" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 0.2, // Reduced from 0.25 for faster transitions
          ease: 'easeInOut' 
        }}
        // ✅ CRITICAL: Ensure content is always visible
        style={{ 
          minHeight: '100vh',
          position: 'relative',
          // Prevent black screen by ensuring background is set
          backgroundColor: 'transparent'
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
