'use client';
import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

export default function AnimatedHeading({ text }: { text: string }) {
  // ✅ ALL HOOKS MUST BE CALLED FIRST - React Rules of Hooks
  const [mounted, setMounted] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // ✅ Mounting guard: Prevent hydration crashes
  useEffect(() => {
    setMounted(true);
  }, []);

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

  // ✅ Mounting guard: Return null until mounted (AFTER all hooks)
  if (!mounted) {
    return null;
  }

  return <h1 ref={headingRef} className="text-5xl font-bold text-white">{text}</h1>;
}