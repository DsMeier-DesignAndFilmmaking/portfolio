"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface AnimatedHomePageContentProps {
  children: React.ReactNode;
}

export default function AnimatedHomePageContent({ children }: AnimatedHomePageContentProps) {
  const pathname = usePathname();
  
  return (
    <motion.main
      key={pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        ease: "easeOut"
      }}
      className="min-h-screen relative bg-white"
      style={{ opacity: 1, display: 'block' }}
    >
      {children}
    </motion.main>
  );
}
