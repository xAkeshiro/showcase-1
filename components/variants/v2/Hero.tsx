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
      className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #eee 1px, transparent 1px),
            linear-gradient(to bottom, #eee 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Large Background Text */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <span className="font-display text-[20vw] text-[#f5f5f5] tracking-[0.1em] select-none">
          黒星
        </span>
      </motion.div>

      {/* Horizontal scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />

      {/* Grid Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-[#eee]" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#eee]" />
        <div className="absolute left-3/4 top-0 bottom-0 w-[1px] bg-[#eee]" />
        <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-[#eee]" />
        <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-[#eee]" />
      </div>

      {/* Main Content */}
      <motion.div style={{ opacity }} className="relative z-10 text-center px-6">
        {/* Rotating Role */}
        <motion.div
          key={currentRole}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-6"
        >
          <span className="font-mono text-xs text-[#999] tracking-[0.5em]">
            WE {roles[currentRole]}
          </span>
        </motion.div>

        {/* Main Title */}
        <div className="space-y-2 mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display text-[clamp(3rem,12vw,10rem)] text-black tracking-[0.05em] leading-[0.9]"
          >
            KURO
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-display text-[clamp(3rem,12vw,10rem)] text-transparent tracking-[0.05em] leading-[0.9]"
            style={{ WebkitTextStroke: '1px rgba(0,0,0,0.25)' }}
          >
            SEI
          </motion.h1>
        </div>

        {/* Japanese Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="font-body-jp text-sm text-[#888] tracking-wider mb-8"
        >
          黒星 — Black Star
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="font-body text-sm text-[#777] max-w-md mx-auto leading-relaxed mb-12"
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
          <span className="font-mono text-[9px] text-[#aaa] tracking-widest">
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-[1px] h-12 bg-gradient-to-b from-[#ccc] to-transparent"
          />
        </motion.div>
      </motion.div>

      {/* Bottom Corner Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-8"
      >
        <span className="font-mono text-[9px] text-[#aaa] tracking-wider">
          DESIGN + DEVELOPMENT + MOTION
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 right-8"
      >
        <span className="font-mono text-[9px] text-[#aaa] tracking-wider">
          // 01 / HERO
        </span>
      </motion.div>

      {/* Side lines */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-[#ddd] to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-[#ddd] to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />
    </section>
  );
}
