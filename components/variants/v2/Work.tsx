'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { VideoPlaceholder } from '@/components/ui/VideoPlaceholder';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    number: '01',
    title: 'NOVA',
    subtitle: 'RETAIL',
    category: 'E-COMMERCE',
    year: '2026',
    videoPrompt: 'E-commerce website scroll: Dark theme, product cards with hover effects, smooth transitions, add to cart animations.',
  },
  {
    id: 2,
    number: '02',
    title: 'APEX',
    subtitle: 'STUDIOS',
    category: 'BRAND IDENTITY',
    year: '2026',
    videoPrompt: 'Brand reveal: Logo animation morphing through stages, color palette reveal, typography showcase, stationery mockups.',
  },
  {
    id: 3,
    number: '03',
    title: 'HORIZON',
    subtitle: 'TECH',
    category: 'WEB + MOTION',
    year: '2025',
    videoPrompt: 'Tech startup website: 3D elements, data visualizations, interactive graphs, particle effects on scroll.',
  },
  {
    id: 4,
    number: '04',
    title: 'STELLAR',
    subtitle: 'AUDIO',
    category: 'CAMPAIGN',
    year: '2025',
    videoPrompt: 'Product launch: Audio equipment reveal with dynamic lighting, soundwave visualizations, lifestyle shots.',
  },
];

export function VariantWork() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  return (
    <section
      ref={containerRef}
      id="work"
      className="relative bg-white py-32 overflow-hidden"
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Background grid - subtle */}
      <div
        className="absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #f5f5f5 1px, transparent 1px),
            linear-gradient(to bottom, #f5f5f5 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Large background character */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden">
        <span className="font-display text-[35vw] text-black/[0.015] leading-none select-none">
          作
        </span>
      </div>

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between"
        >
          <div>
            <span className="font-mono text-[10px] text-[#999] tracking-wider block mb-2">
              SELECTED WORK
            </span>
            <h2 className="font-display text-[clamp(2rem,6vw,5rem)] text-black tracking-[0.05em] leading-none">
              PROJECTS
            </h2>
          </div>
          <motion.button
            whileHover={{ x: 5 }}
            className="hidden md:flex items-center gap-2 font-mono text-[10px] text-[#666] hover:text-black tracking-wider transition-colors"
          >
            VIEW ALL
            <ArrowRight size={14} />
          </motion.button>
        </motion.div>
      </div>

      {/* Horizontal Scroll Gallery */}
      <motion.div style={{ x }} className="flex gap-8 px-6 pb-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group relative flex-shrink-0 w-[80vw] md:w-[45vw] lg:w-[35vw]"
          >
            {/* Project Number */}
            <div className="absolute -left-4 top-0 z-10">
              <span className="font-display text-[8rem] md:text-[12rem] text-black/5 leading-none select-none">
                {project.number}
              </span>
            </div>

            {/* Video/Image */}
            <div className="relative overflow-hidden mb-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <VideoPlaceholder
                  prompt={project.videoPrompt}
                  aspectRatio="video"
                  theme="light"
                  label={project.title}
                  className="w-full"
                />
              </motion.div>

              {/* Overlay on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black/20 flex items-center justify-center"
              >
                <span className="font-mono text-[10px] text-white tracking-wider px-4 py-2 border border-white/50">
                  VIEW PROJECT
                </span>
              </motion.div>
            </div>

            {/* Project Info */}
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-3">
                <span className="font-mono text-[9px] text-[#999] tracking-wider">
                  {project.category}
                </span>
                <span className="w-8 h-[1px] bg-[#ddd]" />
                <span className="font-mono text-[9px] text-[#999] tracking-wider">
                  {project.year}
                </span>
              </div>

              <h3 className="font-display text-2xl md:text-3xl text-black tracking-wider">
                {project.title}
                <span className="text-[#ccc] ml-2">{project.subtitle}</span>
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Line & Scroll hint */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="h-[1px] bg-[#eee]" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mt-6"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-8 h-[1px] bg-[#ccc]"
            />
            <span className="font-mono text-[9px] text-[#aaa] tracking-wider">
              SCROLL TO EXPLORE
            </span>
          </div>
          <span className="font-mono text-[9px] text-[#ccc] tracking-wider">
            // 03 / WORK
          </span>
        </motion.div>
      </div>
    </section>
  );
}
