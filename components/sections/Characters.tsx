'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CornerFrame } from '@/components/ui/CornerFrame';
import { SectionNumber } from '@/components/ui/SectionNumber';
import { VideoPlaceholder } from '@/components/ui/VideoPlaceholder';
import { FadeInUp, FadeInLeft, FadeInRight } from '@/components/ui/ScrollAnimations';

const projects = [
  {
    id: 1,
    name: 'NOVA RETAIL',
    nameJp: 'ノヴァ・リテール',
    type: 'WEB DEVELOPMENT',
    category: 'E-COMMERCE',
    year: '2026',
    description: 'Complete redesign and development of a premium e-commerce platform. Built with Next.js, featuring dynamic product filtering, seamless checkout flow, and integrated CMS for content management.',
    videoPrompt: 'Project showcase: E-commerce website scroll-through. Product pages, cart animations, checkout flow. Clean UI with smooth transitions. Desktop and mobile views.',
    tech: ['NEXT.JS', 'TAILWIND', 'SHOPIFY'],
  },
  {
    id: 2,
    name: 'APEX STUDIOS',
    nameJp: 'エーペックス・スタジオ',
    type: 'MOTION DESIGN',
    category: 'BRAND ANIMATION',
    year: '2026',
    description: 'Comprehensive motion identity system for a creative agency. Logo animations, loading sequences, social media templates, and motion guidelines documentation.',
    videoPrompt: 'Motion reel: Logo reveal animation, kinetic typography, loading animations, social media motion templates. Slick, modern, dynamic energy.',
    tech: ['AFTER EFFECTS', 'CINEMA 4D', 'LOTTIE'],
  },
  {
    id: 3,
    name: 'HORIZON TECH',
    nameJp: 'ホライズン・テック',
    type: 'BRAND + WEB',
    category: 'FULL IDENTITY',
    year: '2026',
    description: 'Complete brand identity and web presence for a tech startup. Logo design, color system, typography, business collateral, and a fully responsive marketing website.',
    videoPrompt: 'Brand reveal: Logo construction animation, color palette reveal, typography showcase, stationery mockups, website walkthrough. Premium brand presentation.',
    tech: ['FIGMA', 'REACT', 'FRAMER MOTION'],
  },
  {
    id: 4,
    name: 'STELLAR AUDIO',
    nameJp: 'ステラ・オーディオ',
    type: 'CAMPAIGN',
    category: 'PRODUCT LAUNCH',
    year: '2025',
    description: 'Product launch campaign for premium audio equipment. Hero video production, social media assets, landing page design, and promotional motion graphics.',
    videoPrompt: 'Product video: Sleek audio equipment reveal, macro shots, lifestyle scenes, feature highlights with motion graphics overlays. Cinematic quality.',
    tech: ['PREMIERE PRO', 'AFTER EFFECTS', 'WEBFLOW'],
  },
];

export function Characters() {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <section id="projects" className="relative min-h-screen bg-black py-24 overflow-hidden">
      {/* Animated background grid */}
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
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      {/* Section Header */}
      <FadeInUp className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex items-center gap-4 mb-4">
          <motion.span
            className="font-mono text-[10px] text-[#444] tracking-wider"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            KUROSEI ://
          </motion.span>
          <div className="flex-1 h-[1px] bg-[#222]" />
        </div>

        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[10px] text-[#444] tracking-wider">
            CASE STUDY
          </span>
          <AnimatePresence mode="wait">
            <motion.h2
              key={projects[activeProject].name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="font-display text-[clamp(1.75rem,4vw,3rem)] text-white tracking-[0.15em]"
            >
              {projects[activeProject].name}
            </motion.h2>
          </AnimatePresence>
        </div>
      </FadeInUp>

      {/* Project Display */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Project Video Placeholder */}
          <FadeInLeft className="relative aspect-[4/3] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-full"
              >
                <VideoPlaceholder
                  prompt={projects[activeProject].videoPrompt}
                  aspectRatio="video"
                  theme="dark"
                  label="PROJECT PREVIEW"
                  className="w-full h-full"
                />
              </motion.div>
            </AnimatePresence>

            {/* Project name overlay */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="font-display text-xl text-white tracking-wider">
                {projects[activeProject].name}
              </p>
              <p className="font-body-jp text-sm text-[#888]">
                {projects[activeProject].nameJp}
              </p>
            </motion.div>
          </FadeInLeft>

          {/* Project Info */}
          <FadeInRight className="space-y-8">
            {/* Type badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <div className="flex items-center gap-2 px-4 py-2 border border-[#222] bg-[#0a0a0a]">
                <motion.div
                  className="w-2 h-2 bg-white"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="font-mono text-[10px] text-[#888] tracking-[0.2em]">
                  {projects[activeProject].type}
                </span>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {/* Category */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <span className="font-mono text-[10px] text-[#444] tracking-wider block mb-2">
                  CATEGORY
                </span>
                <span className="font-display text-sm text-white tracking-wider">
                  {projects[activeProject].category}
                </span>
              </motion.div>

              {/* Year */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <span className="font-mono text-[10px] text-[#444] tracking-wider block mb-2">
                  YEAR
                </span>
                <span className="font-display text-sm text-[#888]">
                  {projects[activeProject].year}
                </span>
              </motion.div>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <span className="font-mono text-[10px] text-[#444] tracking-wider block mb-3">
                OVERVIEW
              </span>
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeProject}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-body text-sm text-[#888] leading-relaxed"
                >
                  {projects[activeProject].description}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <span className="font-mono text-[10px] text-[#444] tracking-wider block mb-3">
                TECH / TOOLS
              </span>
              <div className="flex flex-wrap gap-2">
                {projects[activeProject].tech.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[9px] text-[#666] px-2 py-1 border border-[#222]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* View Case Study link */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="inline-flex items-center gap-3 font-mono text-[10px] text-[#666] hover:text-white tracking-wider transition-colors group"
            >
              <span>VIEW CASE STUDY</span>
              <motion.span
                className="text-lg"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </FadeInRight>
        </div>

        {/* Project Selector */}
        <FadeInUp delay={0.4} className="mt-20">
          <div className="flex flex-col items-center">
            <span className="font-mono text-[10px] text-[#444] tracking-wider mb-4">
              SELECT PROJECT
            </span>
            <div className="flex justify-center gap-3 flex-wrap">
              {projects.map((project, index) => (
                <motion.button
                  key={project.id}
                  onClick={() => setActiveProject(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    'relative px-4 py-3 overflow-hidden transition-all duration-300',
                    'border flex flex-col items-center gap-1',
                    index === activeProject
                      ? 'border-white bg-white/5'
                      : 'border-[#222] opacity-50 hover:opacity-100 hover:border-[#444]'
                  )}
                >
                  <span className="font-display text-xs text-white/70 tracking-wider">
                    {project.name}
                  </span>
                  <span className="font-mono text-[8px] text-[#666] tracking-wider">
                    {project.type}
                  </span>
                  {index === activeProject && (
                    <motion.div
                      layoutId="activeProjectIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-white"
                    />
                  )}
                  <CornerFrame />
                </motion.button>
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>

      {/* Section Number */}
      <div className="absolute bottom-6 right-6">
        <SectionNumber current={2} total={5} />
      </div>
    </section>
  );
}
