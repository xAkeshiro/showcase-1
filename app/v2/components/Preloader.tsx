'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Counter preloader with the KUROSEI letter reveal and the swipe-left exit.
// Plays once per session (sessionStorage), so in-site navigation never
// re-triggers it.

const EASE = [0.76, 0, 0.24, 1] as const;
const STORAGE_KEY = 'kurosei-v2-visited';

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [active, setActive] = useState<boolean | null>(null);
  const [progress, setProgress] = useState(0);

  // Keep the callback in a ref so an unstable prop can never restart the
  // counter mid-animation.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let raf = 0;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const visited = sessionStorage.getItem(STORAGE_KEY);
    const duration = 2200;
    let start = 0;

    const tick = () => {
      const t = Math.min((performance.now() - start) / duration, 1);
      // ease-out so the counter decelerates into 100
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timeout = setTimeout(() => {
          sessionStorage.setItem(STORAGE_KEY, '1');
          setActive(false);
        }, 350);
      }
    };

    raf = requestAnimationFrame(() => {
      if (visited) {
        setActive(false);
        onCompleteRef.current?.();
        return;
      }
      setActive(true);
      start = performance.now();
      raf = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(raf);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={() => onCompleteRef.current?.()}>
      {active && (
        <motion.div
          className="fixed inset-0 z-[9500] bg-[#050505] flex items-center justify-center overflow-hidden"
          exit={{ x: '-100%' }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="v2-grain" />

          {/* Giant background counter */}
          <span className="absolute bottom-6 right-8 font-display text-[clamp(5rem,18vw,14rem)] leading-none text-white/[0.04] select-none tabular-nums">
            {String(progress).padStart(3, '0')}
          </span>

          <div className="relative flex flex-col items-center">
            {/* Emblem */}
            <motion.div
              className="relative w-20 h-20 mb-10"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <motion.div
                className="absolute inset-0 border border-white/15"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-[18%] border border-white/20"
                initial={{ rotate: 45 }}
                animate={{ rotate: 405 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl text-white">★</span>
              </div>
            </motion.div>

            {/* KUROSEI letters */}
            <div className="flex overflow-hidden mb-8">
              {'KUROSEI'.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.7, ease: EASE }}
                  className="font-display text-2xl text-white tracking-[0.35em]"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Progress line */}
            <div className="w-56 h-[1px] bg-white/10 overflow-hidden mb-4">
              <div
                className="h-full bg-[#00f]"
                style={{ width: `${progress}%`, transition: 'width 80ms linear' }}
              />
            </div>

            <div className="flex items-center justify-between w-56">
              <span className="font-mono text-[9px] text-white/25 tracking-widest">
                黒星スタジオ
              </span>
              <span className="font-mono text-[9px] text-white/40 tracking-widest tabular-nums">
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
