'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import anime from 'animejs';

const StatCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon,
  delay 
}: { 
  title: string; 
  value: string; 
  description: string; 
  icon: React.ElementType;
  delay: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  const valueRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<anime.AnimeTimelineInstance | null>(null);
  const progressAnimationRef = useRef<anime.AnimeInstance | null>(null);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
      
      // Animate the value counter
      if (valueRef.current) {
        const targetValue = parseInt(value.replace('+', ''));
        const hasPlus = value.includes('+');
        
        // Reset initial value
        valueRef.current.innerHTML = '0';
        
        // Create timeline for smoother animation
        timelineRef.current = anime.timeline({
          easing: 'easeOutExpo',
          duration: 2000
        });

        // Add number counting animation
        timelineRef.current.add({
          targets: valueRef.current,
          innerHTML: [0, targetValue],
          round: 1,
          duration: 2000,
          easing: 'easeOutExpo'
        });

        // Add plus sign after counting
        if (hasPlus) {
          timelineRef.current.add({
            targets: valueRef.current,
            innerHTML: targetValue + '+',
            duration: 0
          });
        }

        // Animate progress bar
        if (progressRef.current) {
          progressAnimationRef.current = anime({
            targets: progressRef.current,
            width: ['0%', '100%'],
            duration: 2000,
            easing: 'easeOutExpo'
          });
        }
      }
    }

    // Cleanup: pause and remove animations on unmount
    return () => {
      if (timelineRef.current) {
        timelineRef.current.pause();
        timelineRef.current = null;
      }
      if (progressAnimationRef.current) {
        progressAnimationRef.current.pause();
        progressAnimationRef.current = null;
      }
    };
  }, [isInView, controls, value]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.5,
            delay: delay
          }
        }
      }}
      className="bg-white rounded-2xl p-8 transition-shadow duration-300"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-blue-50 rounded-xl">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="relative">
        <div ref={valueRef} className="text-4xl font-bold text-gray-900 mb-2">11+</div>
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div 
            ref={progressRef}
            className="h-full bg-blue-600 rounded-full"
            style={{ width: '0%' }}
          />
        </div>
      </div>
      <p className="text-gray-600 mt-4">{description}</p>
    </motion.div>
  );
};

interface StatsSectionProps {
  className?: string;
  containerClassName?: string;
  hideThirdBlock?: boolean;
  variant?: 'design' | 'travel';
}

export default function StatsSection({ className = '', containerClassName = '', hideThirdBlock = false, variant = 'design' }: StatsSectionProps) {
  // ✅ ALL HOOKS MUST BE CALLED FIRST - React Rules of Hooks
  const [mounted, setMounted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef<anime.AnimeInstance[]>([]);

  // ✅ Mounting guard: Prevent hydration crashes
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Mounting guard: Return null until mounted (AFTER all hooks)
  if (!mounted) {
    return null;
  }

  useEffect(() => {
    // Guard DOM mutation - ensure ref exists and is mounted
    if (!statsRef.current || !statsRef.current.parentNode) return;

    const stats = statsRef.current.querySelectorAll('.stat-value');
    const progressBars = statsRef.current.querySelectorAll('.progress-bar');

    stats.forEach((stat) => {
      const value = stat.getAttribute('data-value');
      if (!value) return;

      const currentValue = { value: 0 };
      
      const animation = anime({
        targets: currentValue,
        value: parseInt(value),
        duration: 2000,
        easing: 'easeOutExpo',
        round: 1,
        update: function() {
          stat.textContent = currentValue.value.toLocaleString() + (stat.getAttribute('data-suffix') || '');
        }
      });
      animationsRef.current.push(animation);
    });

    progressBars.forEach((bar) => {
      const animation = anime({
        targets: bar,
        width: '100%',
        duration: 2000,
        easing: 'easeOutExpo',
        delay: 200
      });
      animationsRef.current.push(animation);
    });

    // Cleanup: pause and remove all animations on unmount
    return () => {
      animationsRef.current.forEach((animation) => {
        if (animation) {
          animation.pause();
        }
      });
      animationsRef.current = [];
    };
  }, []);

  return (
    <div id="design" className={`py-24 ${className}`} style={{ backgroundColor: variant === 'travel' ? '#000000' : '#1A1A1A' }}>
      <div className={containerClassName || 'max-w-7xl mx-auto'}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Stats Cards */}
          <div className={`lg:col-span-3 hidden md:grid grid-cols-1 sm:grid-cols-2 ${hideThirdBlock ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-4 order-2 lg:order-1`}>  
            {/* First Stat Block */}
            <div className="stat-card bg-white backdrop-blur-sm rounded-xl p-5 flex flex-col h-full">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                {variant === 'travel' ? 'Countries visited' : 'Industries Served'}
              </h3>
              <div className="flex-1 flex flex-col justify-end">
                <div className="text-2xl font-bold mb-3" style={{ color: 'rgb(37 99 235)' }}>
                  {variant === 'travel' ? '41' : '8'}
                </div>
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="progress-bar h-full rounded-full" style={{ width: '100%', background: 'rgb(37 99 235)' }} />
                </div>
              </div>
            </div>

            {/* Second Stat Block */}
            <div className="stat-card bg-white backdrop-blur-sm rounded-xl p-5 flex flex-col h-full">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                {variant === 'travel' ? 'Cities Visited' : 'Projects Completed'}
              </h3>
              <div className="flex-1 flex flex-col justify-end">
                <div className="text-2xl font-bold mb-3" style={{ color: 'rgb(37 99 235)' }}>
                  {variant === 'travel' ? '72' : '50+'}
                </div>
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="progress-bar h-full rounded-full" style={{ width: '100%', background: 'rgb(37 99 235)' }} />
                </div>
              </div>
            </div>

            {/* Third Stat Block - Only shown for design variant */}
            {!hideThirdBlock && variant === 'design' && (
              <div className="stat-card bg-white backdrop-blur-sm rounded-xl p-5 flex flex-col h-full">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">URLs Impacted</h3>
                <div className="flex-1 flex flex-col justify-end">
                  <div className="text-2xl font-bold mb-3" style={{ color: 'rgb(37 99 235)' }}>10,000+</div>
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="progress-bar h-full rounded-full" style={{ width: '100%', background: 'rgb(37 99 235)' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Text Block */}
          <div className="lg:col-span-2 flex flex-col justify-center order-1 lg:order-2">
            <p className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">
              {variant === 'travel' ? 'GLOBAL TRAVELS' : 'DESIGN CAREER'}
            </p>
            <h2 className="text-4xl font-bold mb-4">
              {variant === 'travel' ? (
                <span className="text-white">I currently reside in Denver, but consider planet earth my home.</span>
              ) : (
                <>
                  <span style={{ color: 'rgb(37 99 235)' }}>11+ Years</span>
                  <span className="text-white"> Turning Pixels into Impact</span>
                </>
              )}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
} 