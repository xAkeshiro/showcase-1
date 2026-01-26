'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const roles = ['DESIGN', 'DEVELOP', 'MOTION', 'CREATE'];

export function VariantHero() {
  const containerRef = useRef<HTMLElement>(null);
  const [currentRole, setCurrentRole] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Large Background Text */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <span className="font-display text-[20vw] text-[#080808] tracking-[0.1em] select-none">
          黒星
        </span>
      </motion.div>

      {/* Grid Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-[#111]" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#111]" />
        <div className="absolute left-3/4 top-0 bottom-0 w-[1px] bg-[#111]" />
        <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-[#111]" />
        <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-[#111]" />
      </div>

      {/* Main Content */}
      <motion.div style={{ opacity }} className="relative z-10 text-center px-6">
        {/* Rotating Role */}
        <motion.div
          key={currentRole}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-8"
        >
          <span className="font-mono text-xs text-[#444] tracking-[0.5em]">
            WE {roles[currentRole]}
          </span>
        </motion.div>

        {/* Main Title */}
        <div className="space-y-2 mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display text-[clamp(3rem,12vw,10rem)] text-white tracking-[0.05em] leading-[0.9]"
          >
            KURO
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-display text-[clamp(3rem,12vw,10rem)] text-transparent tracking-[0.05em] leading-[0.9]"
            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}
          >
            SEI
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="font-body text-sm text-[#555] max-w-md mx-auto leading-relaxed mb-12"
        >
          A creative studio crafting digital experiences through design,
          development, and motion.
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-4"
        >
          <span className="font-mono text-[9px] text-[#333] tracking-widest">
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-[1px] h-12 bg-gradient-to-b from-[#333] to-transparent"
          />
        </motion.div>
      </motion.div>

      {/* Corner Elements */}
      <div className="absolute top-8 left-8">
        <span className="font-mono text-[9px] text-[#333] tracking-wider">
          EST. 2023
        </span>
      </div>
      <div className="absolute top-8 right-8">
        <span className="font-mono text-[9px] text-[#333] tracking-wider">
          TOKYO / WORLDWIDE
        </span>
      </div>
      <div className="absolute bottom-8 left-8">
        <span className="font-mono text-[9px] text-[#333] tracking-wider">
          CREATIVE STUDIO
        </span>
      </div>
      <div className="absolute bottom-8 right-8">
        <span className="font-mono text-[9px] text-[#333] tracking-wider">
          V.02
        </span>
      </div>
    </section>
  );
}
