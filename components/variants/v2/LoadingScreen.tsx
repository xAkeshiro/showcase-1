'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenV2Props {
  onComplete: () => void;
  minimumLoadTime?: number;
}

export function LoadingScreenV2({ onComplete, minimumLoadTime = 2500 }: LoadingScreenV2Props) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'complete' | 'exit'>('loading');

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / minimumLoadTime) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
        setPhase('complete');
        setTimeout(() => {
          setPhase('exit');
          setTimeout(onComplete, 1000);
        }, 1400);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [minimumLoadTime, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
          exit={{
            x: '-100%',
          }}
          transition={{
            duration: 0.9,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {/* Reveal edge */}
          <motion.div
            className="absolute right-0 top-0 bottom-0 w-[2px] bg-white/20"
            initial={{ scaleY: 0 }}
            exit={{ scaleY: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Background grid */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.03 }}
              transition={{ duration: 1 }}
              style={{
                backgroundImage: `
                  linear-gradient(to right, #fff 1px, transparent 1px),
                  linear-gradient(to bottom, #fff 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
              }}
            />
          </div>

          {/* Scanning line */}
          <motion.div
            className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ top: '0%' }}
            animate={{ top: '100%' }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          />

          {/* Corner decorations */}
          <div className="absolute top-8 left-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="w-2 h-2 bg-white" />
              <span className="font-mono text-[10px] text-[#444] tracking-[0.3em]">
                INITIALIZING
              </span>
            </motion.div>
          </div>

          <div className="absolute top-8 right-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-mono text-[10px] text-[#333] tracking-wider"
            >
              KUROSEI STUDIO
            </motion.div>
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="mb-12"
            >
              <div className="relative w-24 h-24">
                {/* Outer rotating ring */}
                <motion.div
                  className="absolute inset-0 border border-[#333]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                {/* Inner rotating square */}
                <motion.div
                  className="absolute inset-4 border border-[#444] rotate-45"
                  animate={{ rotate: [45, 405] }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                />
                {/* Star center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-2xl"
                  >
                    ★
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Title - letter by letter reveal */}
            <div className="mb-8">
              <h1 className="font-display text-3xl md:text-4xl text-white tracking-[0.3em] overflow-hidden">
                {'KUROSEI'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.07, duration: 0.4 }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>
            </div>

            {/* Subtitle */}
            <motion.p
              className="font-body-jp text-sm text-[#555] tracking-wider mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              黒星 — Creative Studio
            </motion.p>

            {/* Progress bar */}
            <motion.div
              className="w-72"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="h-[1px] bg-[#222] overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-white/50 to-white"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>
              <div className="flex justify-between mt-3">
                <span className="font-mono text-[9px] text-[#444] tracking-wider">
                  {phase === 'complete' ? 'READY' : 'LOADING'}
                </span>
                <span className="font-mono text-[9px] text-[#666] tabular-nums">
                  {Math.round(progress)}%
                </span>
              </div>
            </motion.div>
          </div>

          {/* Bottom decoration */}
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="w-8 h-[1px] bg-[#333]" />
            <span className="font-mono text-[9px] text-[#333] tracking-[0.3em]">
              {phase === 'complete' ? 'ENTERING' : 'PLEASE WAIT'}
            </span>
            <div className="w-8 h-[1px] bg-[#333]" />
          </motion.div>

          {/* Bottom left tagline */}
          <motion.div
            className="absolute bottom-8 left-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <span className="font-mono text-[9px] text-[#333] tracking-wider">
              DESIGN + DEVELOPMENT + MOTION
            </span>
          </motion.div>

          {/* Swipe indicator */}
          {phase === 'complete' && (
            <motion.div
              className="absolute right-8 top-1/2 -translate-y-1/2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ x: [-5, 5, -5] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="flex items-center gap-2"
              >
                <span className="font-mono text-[9px] text-[#444] tracking-wider">
                  SWIPE
                </span>
                <span className="text-[#444]">→</span>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
