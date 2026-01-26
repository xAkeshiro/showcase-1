'use client';

import { motion } from 'framer-motion';
import { MinimalButton } from '@/components/ui/MinimalButton';
import { CornerFrame } from '@/components/ui/CornerFrame';
import { URLDisplay } from '@/components/ui/URLDisplay';
import { SectionNumber } from '@/components/ui/SectionNumber';

export function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        {/* Hero background - using a gradient placeholder since we don't have actual images */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a]"
        />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 dot-grid opacity-30" />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center"
        >
          {/* Logo Mark */}
          <div className="mb-8 flex justify-center">
            <div className="w-16 h-16 border border-[#333] flex items-center justify-center">
              <span className="font-display text-2xl text-white">A</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-white tracking-[0.2em]">
            ARKNIGHTS
          </h1>

          {/* Japanese Subtitle */}
          <p className="font-display-jp text-[clamp(1.25rem,2.5vw,1.75rem)] text-[#888] mt-4 tracking-wider">
            明日方舟
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="font-body text-sm text-[#666] text-center max-w-xl mt-8 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Through the darkness, we see light. The infected shall not be forsaken.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex gap-4 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <MinimalButton variant="primary">
            EXPLORE
          </MinimalButton>
          <MinimalButton variant="secondary">
            WATCH PV
          </MinimalButton>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] text-[#444] tracking-[0.3em]">
              SCROLL
            </span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-[#444] to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* Corner Frame */}
      <CornerFrame />

      {/* Bottom URL decoration */}
      <div className="absolute bottom-6 left-6">
        <URLDisplay />
      </div>

      {/* Section indicator */}
      <div className="absolute bottom-6 right-6">
        <SectionNumber current={0} total={5} />
      </div>
    </section>
  );
}
