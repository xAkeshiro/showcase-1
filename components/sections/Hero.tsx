'use client';

import { motion } from 'framer-motion';
import { CornerFrame } from '@/components/ui/CornerFrame';
import { MinimalButton } from '@/components/ui/MinimalButton';
import { URLDisplay } from '@/components/ui/URLDisplay';
import { SectionNumber } from '@/components/ui/SectionNumber';
import { VideoPlaceholder } from '@/components/ui/VideoPlaceholder';
import { TextReveal } from '@/components/ui/ScrollAnimations';

export function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Video Placeholder */}
      <div className="absolute inset-0">
        <VideoPlaceholder
          prompt="Cinematic loop: Slow pan across Rhodes Island landship at dawn/dusk. Atmospheric fog, distant city lights, subtle particle effects (dust/originium). Moody, mysterious atmosphere with dramatic lighting."
          aspectRatio="video"
          theme="dark"
          label="HERO BACKGROUND"
          className="w-full h-full"
          showPlayIcon={false}
        />

        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />
      </div>

      {/* Animated grid overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ delay: 0.5, duration: 1 }}
        style={{
          backgroundImage: `
            linear-gradient(to right, #fff 1px, transparent 1px),
            linear-gradient(to bottom, #fff 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Scanning line effect */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        {/* Pre-title decoration */}
        <motion.div
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#444]" />
          <span className="font-mono text-[10px] text-[#555] tracking-[0.4em]">
            RHODES ISLAND PHARMACEUTICAL
          </span>
          <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#444]" />
        </motion.div>

        {/* Main Title with letter animation */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white tracking-[0.2em]">
            <TextReveal text="ARKNIGHTS" delay={0.6} letterDelay={0.05} />
          </h1>

          {/* Japanese Subtitle */}
          <motion.p
            className="font-body-jp text-xl md:text-2xl text-[#666] mt-4 tracking-wider"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            明日方舟
          </motion.p>
        </motion.div>

        {/* Tagline */}
        <motion.div
          className="mt-8 text-center max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <p className="font-body text-sm md:text-base text-[#888] tracking-wide leading-relaxed">
            In a world ravaged by a deadly infection, join Rhodes Island in the fight for survival.
          </p>
          <p className="font-body-jp text-xs text-[#555] mt-2">
            感染症が猛威を振るう世界で、ロドスと共に生存のために戦え。
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <MinimalButton variant="primary" className="min-w-[160px]">
            EXPLORE
          </MinimalButton>
          <MinimalButton variant="secondary" className="min-w-[160px]">
            WATCH PV
          </MinimalButton>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <motion.div
            className="flex flex-col items-center gap-3"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <span className="font-mono text-[9px] text-[#444] tracking-[0.4em]">
              SCROLL
            </span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-[#444] to-transparent" />
          </motion.div>
        </motion.div>
      </div>

      {/* Side decorations */}
      <motion.div
        className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-[#333] to-transparent" />
        <span className="font-mono text-[9px] text-[#333] tracking-wider [writing-mode:vertical-lr]">
          TERRA
        </span>
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-[#333] to-transparent" />
      </motion.div>

      <motion.div
        className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-[#333] to-transparent" />
        <span className="font-mono text-[9px] text-[#333] tracking-wider [writing-mode:vertical-lr]">
          2026
        </span>
        <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-[#333] to-transparent" />
      </motion.div>

      {/* Corner Frame */}
      <CornerFrame className="m-4" />

      {/* Bottom URL decoration */}
      <motion.div
        className="absolute bottom-6 left-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        <URLDisplay />
      </motion.div>

      {/* Section indicator */}
      <motion.div
        className="absolute bottom-6 right-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        <SectionNumber current={0} total={5} />
      </motion.div>
    </section>
  );
}
