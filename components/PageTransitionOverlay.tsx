'use client';

import { motion } from 'framer-motion';

export default function PageTransitionOverlay() {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      style={{ originY: 0 }}
      className="fixed inset-0 bg-black z-50"
    />
  );
} 