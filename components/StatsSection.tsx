'use client';

import { useEffect, useRef } from 'react';
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
        const timeline = anime.timeline({
          easing: 'easeOutExpo',
          duration: 2000
        });

        // Add number counting animation
        timeline.add({
          targets: valueRef.current,
          innerHTML: [0, targetValue],
          round: 1,
          duration: 2000,
          easing: 'easeOutExpo'
        });

        // Add plus sign after counting
        if (hasPlus) {
          timeline.add({
            targets: valueRef.current,
            innerHTML: targetValue + '+',
            duration: 0
          });
        }

        // Animate progress bar
        if (progressRef.current) {
          anime({
            targets: progressRef.current,
            width: ['0%', '100%'],
            duration: 2000,
            easing: 'easeOutExpo'
          });
        }
      }
    }
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
}

export default function StatsSection({ className = '' }: StatsSectionProps) {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!statsRef.current) return;

    const stats = statsRef.current.querySelectorAll('.stat-value');
    const progressBars = statsRef.current.querySelectorAll('.progress-bar');

    stats.forEach((stat) => {
      const value = stat.getAttribute('data-value');
      if (!value) return;

      const currentValue = { value: 0 };
      
      anime({
        targets: currentValue,
        value: parseInt(value),
        duration: 2000,
        easing: 'easeOutExpo',
        round: 1,
        update: function() {
          stat.textContent = currentValue.value.toLocaleString() + (stat.getAttribute('data-suffix') || '');
        }
      });
    });

    progressBars.forEach((bar) => {
      anime({
        targets: bar,
        width: '100%',
        duration: 2000,
        easing: 'easeOutExpo',
        delay: 200
      });
    });
  }, []);

  return (
    <div className={`py-24 ${className}`} style={{ backgroundColor: '#1A1A1A' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Stats Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 order-2 lg:order-1">  
            {/* Industries Served */}
            <div className="stat-card bg-white backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Industries Served</h3>
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-3">8</div>
              <div className="h-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full overflow-hidden">
                <div className="progress-bar h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>

            {/* Projects Completed */}
            <div className="stat-card bg-white backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Projects Completed</h3>
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-3">50+</div>
              <div className="h-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full overflow-hidden">
                <div className="progress-bar h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>

            {/* URLs Impacted */}
            <div className="stat-card bg-white backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">URLs Impacted</h3>
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-3">10,000+</div>
              <div className="h-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full overflow-hidden">
                <div className="progress-bar h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
          </div>

          {/* Text Block */}
          <div className="lg:col-span-2 flex flex-col justify-center order-1 lg:order-2">
            <p className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">DESIGN CAREER</p>
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">11+ Years</span>
              <span className="text-white"> Turning Pixels into Impact</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
} 