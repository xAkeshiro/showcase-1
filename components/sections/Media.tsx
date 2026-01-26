'use client';

import { motion } from 'framer-motion';
import { CornerFrame } from '@/components/ui/CornerFrame';
import { SectionNumber } from '@/components/ui/SectionNumber';
import { VideoPlaceholder } from '@/components/ui/VideoPlaceholder';
import { FadeInUp, StaggerChildren } from '@/components/ui/ScrollAnimations';
import { Play, Folder, Calendar, ExternalLink } from 'lucide-react';

const archiveYears = ['2026', '2025', '2024', '2023'];

const archiveItems = [
  {
    id: 1,
    year: '2026',
    category: 'WEB',
    title: 'Nova Retail Platform',
    client: 'NOVA RETAIL',
  },
  {
    id: 2,
    year: '2026',
    category: 'MOTION',
    title: 'Brand Animation System',
    client: 'APEX STUDIOS',
  },
  {
    id: 3,
    year: '2026',
    category: 'BRAND',
    title: 'Complete Visual Identity',
    client: 'HORIZON TECH',
  },
  {
    id: 4,
    year: '2025',
    category: 'CAMPAIGN',
    title: 'Product Launch Video',
    client: 'STELLAR AUDIO',
  },
  {
    id: 5,
    year: '2025',
    category: 'WEB',
    title: 'Portfolio Platform',
    client: 'CREATIVE COLLECTIVE',
  },
  {
    id: 6,
    year: '2025',
    category: 'MOTION',
    title: 'Social Media Package',
    client: 'URBAN STYLE',
  },
  {
    id: 7,
    year: '2024',
    category: 'BRAND',
    title: 'Restaurant Rebrand',
    client: 'SUSHI MASTER',
  },
  {
    id: 8,
    year: '2024',
    category: 'WEB',
    title: 'Agency Website',
    client: 'DESIGNLAB',
  },
];

const showreelHighlights = [
  {
    id: 'reel-2026',
    year: '2026',
    title: 'ANNUAL SHOWREEL',
    titleJp: '年間ショーリール',
    videoPrompt: 'Studio showreel 2026: Fast-paced montage of web projects, brand reveals, motion graphics, and development work. Clean cuts, modern typography, professional studio vibe. Ends with KUROSEI logo.',
  },
  {
    id: 'motion-reel',
    year: '2026',
    title: 'MOTION REEL',
    titleJp: 'モーションリール',
    videoPrompt: 'Motion design compilation: Logo animations, kinetic typography, UI transitions, loading animations, and social media motion. Rhythmic editing synced to music.',
  },
  {
    id: 'web-reel',
    year: '2026',
    title: 'WEB REEL',
    titleJp: 'ウェブリール',
    videoPrompt: 'Web development showcase: Website scroll-throughs, interaction demonstrations, responsive design transitions, code visualization. Clean, technical aesthetic.',
  },
];

export function Media() {
  return (
    <section id="archive" className="relative bg-black py-24 overflow-hidden">
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

      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <FadeInUp className="text-center mb-16">
          <span className="font-mono text-[10px] text-[#444] tracking-wider block mb-2">
            PAST WORK
          </span>
          <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] text-white tracking-[0.15em]">
            ARCHIVE
          </h2>
          <p className="font-body-jp text-sm text-[#666] mt-2">
            アーカイブ
          </p>
          <motion.div
            className="w-12 h-[1px] bg-white/20 mx-auto mt-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
        </FadeInUp>

        {/* Showreels Section */}
        <FadeInUp delay={0.2} className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <Play size={16} className="text-[#555]" />
            <span className="font-display text-xs text-white tracking-[0.15em]">
              SHOWREELS
            </span>
            <div className="flex-1 h-[1px] bg-[#222]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {showreelHighlights.map((reel, index) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative overflow-hidden"
              >
                <VideoPlaceholder
                  prompt={reel.videoPrompt}
                  aspectRatio="video"
                  theme="dark"
                  label={reel.title}
                  className="w-full"
                />

                {/* Info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <span className="font-mono text-[9px] text-[#555] tracking-wider block mb-1">
                    {reel.year}
                  </span>
                  <h3 className="font-display text-sm text-white tracking-wider">
                    {reel.title}
                  </h3>
                  <p className="font-body-jp text-[10px] text-[#666]">
                    {reel.titleJp}
                  </p>
                </div>

                <CornerFrame />
              </motion.div>
            ))}
          </div>
        </FadeInUp>

        {/* Archive List */}
        <FadeInUp delay={0.3}>
          <div className="flex items-center gap-4 mb-8">
            <Folder size={16} className="text-[#555]" />
            <span className="font-display text-xs text-white tracking-[0.15em]">
              PROJECT ARCHIVE
            </span>
            <div className="flex-1 h-[1px] bg-[#222]" />
          </div>

          {/* Year filters */}
          <div className="flex gap-4 mb-8">
            {archiveYears.map((year) => (
              <button
                key={year}
                className="font-mono text-[10px] text-[#555] hover:text-white tracking-wider transition-colors flex items-center gap-2"
              >
                <Calendar size={12} />
                {year}
              </button>
            ))}
          </div>

          {/* Archive Grid */}
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {archiveItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#333] p-4 transition-all cursor-pointer"
              >
                {/* Year badge */}
                <span className="font-mono text-[9px] text-[#444] tracking-wider block mb-2">
                  {item.year}
                </span>

                {/* Category */}
                <span className="font-mono text-[8px] text-[#666] px-2 py-0.5 bg-[#111] border border-[#222] inline-block mb-3">
                  {item.category}
                </span>

                {/* Title */}
                <h4 className="font-body text-sm text-[#888] group-hover:text-white transition-colors mb-1">
                  {item.title}
                </h4>

                {/* Client */}
                <p className="font-mono text-[9px] text-[#444] tracking-wider">
                  {item.client}
                </p>

                {/* Hover arrow */}
                <motion.div
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ x: 3 }}
                >
                  <ExternalLink size={14} className="text-[#555]" />
                </motion.div>

                <CornerFrame />
              </motion.div>
            ))}
          </StaggerChildren>

          {/* View All */}
          <div className="text-center mt-10">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="font-mono text-[10px] text-[#555] hover:text-white tracking-wider transition-colors border border-[#222] hover:border-[#444] px-6 py-2"
            >
              VIEW FULL ARCHIVE →
            </motion.button>
          </div>
        </FadeInUp>

        {/* Stats Bar */}
        <FadeInUp delay={0.4} className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-b border-[#1a1a1a]">
            {[
              { value: '50+', label: 'PROJECTS', labelJp: 'プロジェクト' },
              { value: '30+', label: 'CLIENTS', labelJp: 'クライアント' },
              { value: '4', label: 'YEARS', labelJp: '年間' },
              { value: '3', label: 'AWARDS', labelJp: '受賞' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <span className="font-display text-2xl md:text-3xl text-white tracking-wider block">
                  {stat.value}
                </span>
                <span className="font-mono text-[10px] text-[#555] tracking-wider block mt-1">
                  {stat.label}
                </span>
                <span className="font-body-jp text-[9px] text-[#333]">
                  {stat.labelJp}
                </span>
              </motion.div>
            ))}
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
