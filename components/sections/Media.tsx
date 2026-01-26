'use client';

import { motion } from 'framer-motion';
import { CornerFrame } from '@/components/ui/CornerFrame';
import { SectionNumber } from '@/components/ui/SectionNumber';
import { VideoPlaceholder } from '@/components/ui/VideoPlaceholder';
import { FadeInUp, ScaleIn } from '@/components/ui/ScrollAnimations';
import { Play, Image as ImageIcon, Music } from 'lucide-react';

const mediaCategories = [
  {
    id: 'video',
    icon: Play,
    titleEn: 'VIDEO',
    titleJp: 'ムービー',
    description: 'Promotional videos, trailers, and animated shorts',
    videoPrompt: 'Preview montage: Quick cuts of PV trailers, anime scenes, and promotional content. High-energy editing with dramatic moments. Cinematic quality.',
  },
  {
    id: 'gallery',
    icon: ImageIcon,
    titleEn: 'GALLERY',
    titleJp: 'ギャラリー',
    description: 'Official artwork, illustrations, and screenshots',
    videoPrompt: 'Art showcase: Slow Ken Burns effect on official illustrations. Character art, event CGs, and promotional images. Elegant transitions.',
  },
  {
    id: 'music',
    icon: Music,
    titleEn: 'MONSTER SIREN',
    titleJp: 'サントラ',
    description: 'Original soundtracks and music records',
    videoPrompt: 'Audio visualizer: Abstract waveforms and frequency bars. Monster Siren Records aesthetic. Pulsing to imaginary music rhythm. Dark with accent lighting.',
  },
];

export function Media() {
  return (
    <section id="media" className="relative bg-black py-24 overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.02 }}
        viewport={{ once: true }}
        style={{
          backgroundImage: `
            linear-gradient(to right, #fff 1px, transparent 1px),
            linear-gradient(to bottom, #fff 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <FadeInUp className="text-center mb-16">
          <span className="font-mono text-[10px] text-[#444] tracking-wider block mb-2">
            EXPLORE MEDIA
          </span>
          <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] text-white tracking-[0.15em]">
            MEDIA
          </h2>
          <p className="font-body-jp text-sm text-[#666] mt-2">
            泰拉万象
          </p>
          <motion.div
            className="w-12 h-[1px] bg-white/20 mx-auto mt-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
        </FadeInUp>

        {/* Featured Media Video */}
        <FadeInUp delay={0.2} className="mb-16">
          <VideoPlaceholder
            prompt="Epic trailer compilation: Best moments from all Arknights PVs. Operator reveals, story climaxes, animation highlights. Fast-paced editing with music sync. Cinematic black bars."
            aspectRatio="video"
            theme="dark"
            label="FEATURED TRAILER"
            className="w-full"
          />
        </FadeInUp>

        {/* Media Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mediaCategories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="group relative bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#333] transition-all cursor-pointer overflow-hidden"
              >
                {/* Video Placeholder */}
                <VideoPlaceholder
                  prompt={cat.videoPrompt}
                  aspectRatio="video"
                  theme="dark"
                  label={cat.titleEn}
                  showPlayIcon={false}
                  className="w-full"
                />

                {/* Content overlay */}
                <div className="p-6 border-t border-[#1a1a1a]">
                  {/* Icon and Title */}
                  <div className="flex items-center gap-4 mb-3">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="p-2 border border-[#222] group-hover:border-[#444] transition-colors"
                    >
                      <Icon
                        size={20}
                        strokeWidth={1.5}
                        className="text-[#555] group-hover:text-white transition-colors"
                      />
                    </motion.div>
                    <div>
                      <h3 className="font-display text-sm text-white tracking-[0.15em]">
                        {cat.titleEn}
                      </h3>
                      <p className="font-body-jp text-xs text-[#666]">
                        {cat.titleJp}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-body text-xs text-[#555] leading-relaxed mb-4">
                    {cat.description}
                  </p>

                  {/* Link */}
                  <motion.span
                    className="inline-flex items-center gap-2 font-mono text-[10px] text-[#444] group-hover:text-white tracking-wider transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    EXPLORE
                    <span>→</span>
                  </motion.span>
                </div>

                {/* Corner frame */}
                <CornerFrame />
              </motion.div>
            );
          })}
        </div>

        {/* Music Player Preview */}
        <FadeInUp delay={0.4} className="mt-16">
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-12 h-12 bg-[#111] border border-[#222] flex items-center justify-center"
                >
                  <Music size={20} className="text-[#444]" />
                </motion.div>
                <div>
                  <span className="font-mono text-[10px] text-[#444] tracking-wider block">
                    NOW PLAYING
                  </span>
                  <span className="font-display text-sm text-white tracking-wider">
                    ALIVE / MONSTER SIREN RECORDS
                  </span>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="font-mono text-[10px] text-[#444]">02:34</span>
                <div className="w-32 h-[2px] bg-[#222] overflow-hidden">
                  <motion.div
                    className="h-full bg-white/50"
                    animate={{ width: ['0%', '60%'] }}
                    transition={{ duration: 20, repeat: Infinity }}
                  />
                </div>
                <span className="font-mono text-[10px] text-[#444]">04:12</span>
              </div>
            </div>

            {/* Waveform visualization placeholder */}
            <div className="flex items-end justify-center gap-[2px] h-8">
              {Array.from({ length: 40 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-[#333]"
                  animate={{
                    height: [
                      `${Math.random() * 50 + 10}%`,
                      `${Math.random() * 80 + 20}%`,
                      `${Math.random() * 50 + 10}%`,
                    ],
                  }}
                  transition={{
                    duration: 0.5 + Math.random() * 0.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                />
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>

      {/* Section Number */}
      <div className="absolute bottom-6 right-6">
        <SectionNumber current={4} total={5} />
      </div>
    </section>
  );
}
