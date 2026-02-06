'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenV3Props {
  onComplete: () => void;
  minimumLoadTime?: number;
}

export function LoadingScreenV3({ onComplete, minimumLoadTime = 3000 }: LoadingScreenV3Props) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'complete' | 'exit'>('loading');

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      // Eased progress for smoother feel
      const rawProgress = Math.min((elapsed / minimumLoadTime) * 100, 100);
      const easedProgress = Math.pow(rawProgress / 100, 0.7) * 100;
      setProgress(easedProgress);

      if (rawProgress >= 100) {
        clearInterval(interval);
        setPhase('complete');
        setTimeout(() => {
          setPhase('exit');
          setTimeout(onComplete, 1000);
        }, 800);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [minimumLoadTime, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black overflow-hidden"
          exit={{ x: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Gradient ambient light */}
          <motion.div
            className="absolute top-0 right-0 w-[60%] h-[60%] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ delay: 0.5, duration: 2 }}
            style={{
              background: 'radial-gradient(ellipse at top right, rgba(255,255,255,0.1) 0%, transparent 70%)',
            }}
          />

          {/* Background grid - subtle */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.02 }}
            transition={{ duration: 1.5 }}
            style={{
              backgroundImage: `
                linear-gradient(to right, #fff 1px, transparent 1px),
                linear-gradient(to bottom, #fff 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }}
          />

          {/* Large background kanji */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.03, scale: 1 }}
            transition={{ delay: 0.3, duration: 1.5 }}
          >
            <span className="font-display text-[30vw] text-white tracking-[0.1em] select-none">
              黒星
            </span>
          </motion.div>

          {/* Horizontal scanning line */}
          <motion.div
            className="absolute left-0 right-0 h-[1px] pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
              boxShadow: '0 0 20px rgba(255,255,255,0.3)',
            }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          {/* Split layout container - mirrors hero */}
          <div className="relative z-10 w-full h-full flex items-center">
            {/* Left Side - Typography */}
            <div className="flex-1 pl-12 md:pl-20 lg:pl-32 pr-8">
              {/* Status indicator */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-center gap-3 mb-8"
              >
                <motion.div
                  className="w-2 h-2 bg-white"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="font-mono text-[10px] text-[#555] tracking-[0.3em]">
                  {phase === 'complete' ? 'READY' : 'INITIALIZING'}
                </span>
              </motion.div>

              {/* Main Title - KURO */}
              <div className="space-y-2 mb-6">
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="font-display text-[clamp(3rem,10vw,8rem)] text-white tracking-[0.05em] leading-[0.9]"
                  >
                    {'KURO'.split('').map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.h1>
                </div>
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="font-display text-[clamp(3rem,10vw,8rem)] text-transparent tracking-[0.05em] leading-[0.9]"
                    style={{ WebkitTextStroke: '1px rgba(255,255,255,0.25)' }}
                  >
                    {'SEI'.split('').map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 + i * 0.08, duration: 0.4 }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.h1>
                </div>
              </div>

              {/* Japanese subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="font-body-jp text-sm text-[#444] tracking-wider mb-12"
              >
                黒星 — Creative Studio
              </motion.p>

              {/* Progress bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="max-w-xs"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-mono text-[9px] text-[#444] tracking-[0.2em]">
                    LOADING EXPERIENCE
                  </span>
                  <span className="font-mono text-[9px] text-[#666] tabular-nums">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="h-[1px] bg-[#222] overflow-hidden">
                  <motion.div
                    className="h-full"
                    style={{
                      background: 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.8) 100%)',
                      boxShadow: '0 0 10px rgba(255,255,255,0.5)',
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Right Side - Icon */}
            <div className="flex-1 flex items-center justify-center pr-12 md:pr-20 lg:pr-32">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="relative w-[clamp(12rem,28vw,22rem)] h-[clamp(12rem,28vw,22rem)]"
              >
                {/* Glow effect behind icon */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      '0 0 60px rgba(255,255,255,0.05)',
                      '0 0 80px rgba(255,255,255,0.1)',
                      '0 0 60px rgba(255,255,255,0.05)',
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Outermost ring - very slow */}
                <motion.div
                  className="absolute inset-0 border border-white/10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                />

                {/* Outer rotating ring */}
                <motion.div
                  className="absolute inset-[10%] border border-white/20"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                />

                {/* Middle rotating square */}
                <motion.div
                  className="absolute inset-[22%] border border-white/30"
                  initial={{ rotate: 45 }}
                  animate={{ rotate: [45, 405] }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                />

                {/* Inner rotating square - opposite direction */}
                <motion.div
                  className="absolute inset-[35%] border border-white/20"
                  initial={{ rotate: -30 }}
                  animate={{ rotate: [-30, -390] }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                />

                {/* Star center with glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.8, duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                    className="relative"
                  >
                    <motion.span
                      className="text-[clamp(2.5rem,6vw,5rem)] text-white select-none block"
                      animate={{
                        textShadow: [
                          '0 0 20px rgba(255,255,255,0.3)',
                          '0 0 40px rgba(255,255,255,0.5)',
                          '0 0 20px rgba(255,255,255,0.3)',
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ★
                    </motion.span>
                  </motion.div>
                </div>

                {/* Orbital dots */}
                {[0, 90, 180, 270].map((angle, i) => (
                  <motion.div
                    key={angle}
                    className="absolute w-1 h-1 bg-white/40 rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                    }}
                    animate={{
                      x: [
                        Math.cos((angle * Math.PI) / 180) * 80,
                        Math.cos(((angle + 360) * Math.PI) / 180) * 80,
                      ],
                      y: [
                        Math.sin((angle * Math.PI) / 180) * 80,
                        Math.sin(((angle + 360) * Math.PI) / 180) * 80,
                      ],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </div>

          {/* Bottom info bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="absolute bottom-0 left-0 right-0 border-t border-[#1a1a1a] px-12 md:px-20 lg:px-32 py-6 flex justify-between items-center"
          >
            <span className="font-mono text-[9px] text-[#333] tracking-wider">
              DESIGN + DEVELOPMENT + MOTION
            </span>
            <motion.span
              className="font-mono text-[9px] text-[#333] tracking-wider"
              animate={{ opacity: phase === 'complete' ? [1, 0.5, 1] : 1 }}
              transition={{ duration: 0.8, repeat: phase === 'complete' ? Infinity : 0 }}
            >
              {phase === 'complete' ? '► ENTER' : '// LOADING'}
            </motion.span>
            <span className="font-mono text-[9px] text-[#333] tracking-wider">
              V3.0 — 2025
            </span>
          </motion.div>

          {/* Corner accents */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute top-8 right-8 w-8 h-8 border-t border-r border-[#222]"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute top-8 left-8 w-8 h-8 border-t border-l border-[#222]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
