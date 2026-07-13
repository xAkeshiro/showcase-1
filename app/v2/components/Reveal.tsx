'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

const EASE = [0.76, 0, 0.24, 1] as const;

// Masked line reveal — text slides up from behind a clip.
export function RevealText({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: '110%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// Simple fade-up for blocks.
export function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// Section eyebrow: mono label + rule + optional index.
export function SectionLabel({
  label,
  index,
  className = '',
}: {
  label: string;
  index?: string;
  className?: string;
}) {
  return (
    <FadeUp className={`flex items-center gap-4 ${className}`}>
      <span className="w-8 h-[1px] bg-[#00f]" />
      <span className="font-mono text-[10px] text-white/40 tracking-[0.3em]">{label}</span>
      {index && (
        <span className="font-mono text-[10px] text-white/20 tracking-wider ml-auto">
          {index}
        </span>
      )}
    </FadeUp>
  );
}
