'use client';

import { motion } from 'framer-motion';
import { CornerFrame } from '@/components/ui/CornerFrame';
import { SectionNumber } from '@/components/ui/SectionNumber';
import { VideoPlaceholder } from '@/components/ui/VideoPlaceholder';
import { FadeInUp, FadeInLeft, FadeInRight, ScaleIn } from '@/components/ui/ScrollAnimations';

const worldItems = [
  {
    id: 'originiums',
    titleEn: 'ORIGINIUMS',
    titleJp: '源石',
    description: 'The crystallized source of catastrophes and Oripathy infection. Both a curse and a source of immense power.',
    videoPrompt: 'Abstract loop: Glowing originium crystals growing/pulsing. Ethereal particles emanating. Dark purple/cyan bioluminescent glow. Ominous yet beautiful.',
  },
  {
    id: 'infected',
    titleEn: 'THE INFECTED',
    titleJp: '感染者',
    description: 'Those touched by Oripathy face discrimination and death, yet possess extraordinary Arts capabilities.',
    videoPrompt: 'Emotional loop: Silhouettes of infected individuals with originium crystallization. Hands reaching toward light. Melancholic but hopeful atmosphere.',
  },
  {
    id: 'rhodes-island',
    titleEn: 'RHODES ISLAND',
    titleJp: 'ロドス・アイランド',
    description: 'A mobile pharmaceutical company and PMC, fighting for a future where the infected are not forsaken.',
    videoPrompt: 'Epic loop: Rhodes Island landship traversing through barren landscape. Massive mobile city with dramatic scale. Dawn lighting, dust particles, industrial atmosphere.',
  },
  {
    id: 'catastrophe',
    titleEn: 'CATASTROPHE',
    titleJp: '天災',
    description: 'Unpredictable natural disasters that ravage the land, leaving originiums in their wake.',
    videoPrompt: 'Dramatic loop: Storm clouds with originium lightning. Cities evacuating via mobile platforms. Apocalyptic yet awe-inspiring nature\'s fury.',
  },
];

export function World() {
  return (
    <section id="world" className="relative bg-white py-24 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <FadeInUp className="text-center mb-16">
          <span className="font-mono text-[10px] text-[#999] tracking-wider block mb-2">
            ABOUT TERRA
          </span>
          <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] text-black tracking-[0.15em]">
            WORLD
          </h2>
          <p className="font-body-jp text-sm text-[#666] mt-2">
            設定
          </p>
          <motion.div
            className="w-12 h-[1px] bg-black/20 mx-auto mt-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
        </FadeInUp>

        {/* Featured World Video */}
        <FadeInUp delay={0.2} className="mb-16">
          <VideoPlaceholder
            prompt="Cinematic world overview: Sweeping aerial shots of Terra. Mobile cities, catastrophe zones, diverse nations (Ursus, Victoria, Laterano, etc.). Map-style transitions with location labels. Epic orchestral mood."
            aspectRatio="ultrawide"
            theme="light"
            label="WORLD OF TERRA"
            className="w-full"
          />
        </FadeInUp>

        {/* World Grid - 2x2 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {worldItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden cursor-pointer bg-[#fafafa] border border-[#eee] hover:border-[#ccc] transition-colors"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {/* Video Placeholder */}
                <div className="relative aspect-square sm:aspect-auto">
                  <VideoPlaceholder
                    prompt={item.videoPrompt}
                    aspectRatio="square"
                    theme="light"
                    label={item.titleEn}
                    showPlayIcon={false}
                    className="w-full h-full"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-center">
                  <span className="font-mono text-[9px] text-[#999] tracking-wider mb-2">
                    // LORE
                  </span>
                  <h3 className="font-display text-lg text-black tracking-[0.1em] mb-1">
                    {item.titleEn}
                  </h3>
                  <p className="font-body-jp text-xs text-[#888] mb-4">
                    {item.titleJp}
                  </p>
                  <p className="font-body text-xs text-[#666] leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <motion.span
                    className="inline-flex items-center gap-2 font-mono text-[10px] text-[#999] group-hover:text-black tracking-wider transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    EXPLORE
                    <span>→</span>
                  </motion.span>
                </div>
              </div>

              {/* Corner frame */}
              <CornerFrame theme="light" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <FadeInUp delay={0.4} className="text-center mt-16">
          <p className="font-body text-sm text-[#888] mb-6">
            Discover the rich lore and complex world of Terra
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 border border-black text-black font-display text-xs tracking-[0.2em] hover:bg-black hover:text-white transition-colors"
          >
            EXPLORE WORLD SETTINGS
          </motion.button>
        </FadeInUp>
      </div>

      {/* Section Number */}
      <div className="absolute bottom-6 right-6">
        <SectionNumber current={3} total={5} theme="light" />
      </div>
    </section>
  );
}
