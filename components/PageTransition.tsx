'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const prevPathnameRef = useRef<string | null>(null)

  // Log route changes for verification (not initial mount)
  useEffect(() => {
    if (typeof window !== 'undefined' && prevPathnameRef.current !== null) {
      console.log('[PageTransition] route changed', { from: prevPathnameRef.current, to: pathname })
    }
    prevPathnameRef.current = pathname
  }, [pathname])

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
