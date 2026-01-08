'use client';
import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

export default function AnimatedHeading({ text }: { text: string }) {
  const [mounted, setMounted] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // ✅ Mounting guard: Prevent hydration crashes
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Mounting guard: Return null until mounted
  if (!mounted) {
    return null;
  }

  useEffect(() => {
    if (headingRef.current) {
      anime({
        targets: headingRef.current,
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo',
      });
    }
  }, []);

  return <h1 ref={headingRef} className="text-5xl font-bold text-white">{text}</h1>;
}