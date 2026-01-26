'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
  minimumLoadTime?: number;
}

export function LoadingScreen({ onComplete, minimumLoadTime = 2500 }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'complete' | 'exit'>('loading');

  useEffect(() => {
    // Simulate loading progress
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
          setTimeout(onComplete, 800);
        }, 400);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [minimumLoadTime, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Background grid animation */}
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

          {/* Scanning line effect */}
          <motion.div
            className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ top: '0%' }}
            animate={{ top: '100%' }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />

          {/* Corner decorations */}
          <div className="absolute top-8 left-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="w-2 h-2 bg-white" />
              <span className="font-mono text-[10px] text-[#444] tracking-[0.3em]">
                SYSTEM INITIALIZING
              </span>
            </motion.div>
          </div>

          <div className="absolute top-8 right-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-mono text-[10px] text-[#333] tracking-wider"
            >
              RHODES ISLAND
            </motion.div>
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo/Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="mb-12"
            >
              <div className="relative w-20 h-20">
                {/* Outer ring */}
                <motion.div
                  className="absolute inset-0 border border-[#333]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                {/* Inner square */}
                <motion.div
                  className="absolute inset-3 border border-[#444]"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                />
                {/* Center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="font-display text-xl text-white tracking-[0.2em]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    AK
                  </motion.span>
                </div>
              </div>
            </motion.div>

            {/* Title reveal */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <motion.h1
                className="font-display text-2xl md:text-3xl text-white tracking-[0.3em] overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {'ARKNIGHTS'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.05, duration: 0.4 }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>
              <motion.p
                className="font-body-jp text-sm text-[#666] mt-2 tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                明日方舟
              </motion.p>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="w-64"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="flex justify-between mb-2">
                <span className="font-mono text-[10px] text-[#666] tracking-[0.2em]">
                  {phase === 'complete' ? 'COMPLETE' : 'LOADING'}
                </span>
                <span className="font-mono text-[10px] text-white tabular-nums">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-[2px] bg-[#222] overflow-hidden">
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-mono text-[9px] text-[#333] tracking-wider">
                  SYS.BOOT
                </span>
                <span className="font-mono text-[9px] text-[#333] tracking-wider">
                  v2.0.26
                </span>
              </div>
            </motion.div>

            {/* Status messages */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <motion.p
                className="font-mono text-[9px] text-[#444] tracking-wider"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {phase === 'complete' ? 'ENTERING SYSTEM...' : 'ESTABLISHING CONNECTION...'}
              </motion.p>
            </motion.div>
          </div>

          {/* Bottom decorations */}
          <div className="absolute bottom-8 left-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="font-mono text-[9px] text-[#333] tracking-wider"
            >
              HTTPS://ARKNIGHTS.GLOBAL/
            </motion.div>
          </div>

          <div className="absolute bottom-8 right-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="font-mono text-[9px] text-[#333] tracking-wider"
            >
              // 00 / INIT
            </motion.div>
          </div>

          {/* Side lines */}
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-[#333] to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-[#333] to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
