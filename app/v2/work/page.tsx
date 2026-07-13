'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { TransitionLink } from '../components/TransitionLink';
import { FadeUp, RevealText, SectionLabel } from '../components/Reveal';
import { Footer } from '../components/Footer';
import { VideoPlaceholder } from '@/components/ui/VideoPlaceholder';
import { projects, categories } from '../lib/projects';

const EASE = [0.76, 0, 0.24, 1] as const;

export default function V2WorkPage() {
  const [active, setActive] = useState<(typeof categories)[number]>('ALL');

  const filtered = active === 'ALL' ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="bg-[#050505] min-h-screen">
      {/* Header */}
      <header className="relative pt-36 pb-16 overflow-hidden">
        <div className="v2-grid" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionLabel label="ALL PROJECTS" index={`${projects.length} TOTAL`} className="mb-10" />

          <h1 className="font-display text-[clamp(3.5rem,12vw,10rem)] text-white tracking-[0.02em] leading-[0.85] mb-4">
            <RevealText>WORKS</RevealText>
          </h1>
          <FadeUp delay={0.15}>
            <span className="font-body-jp text-sm text-white/25 tracking-[0.2em]">
              作品集 — Selected projects, 2024 to 2026
            </span>
          </FadeUp>

          {/* Filters */}
          <FadeUp delay={0.25} className="flex flex-wrap gap-3 mt-14">
            {categories.map((cat) => {
              const count =
                cat === 'ALL' ? projects.length : projects.filter((p) => p.category === cat).length;
              const isActive = active === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`group flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] px-5 py-2.5 border transition-all duration-300 ${
                    isActive
                      ? 'bg-[#00f] border-[#00f] text-white'
                      : 'border-white/10 text-white/40 hover:border-[#00f]/60 hover:text-white/70'
                  }`}
                  data-cursor="pointer"
                >
                  {cat}
                  <span className={isActive ? 'text-white/60' : 'text-white/20'}>{count}</span>
                </button>
              );
            })}
          </FadeUp>
        </div>
      </header>

      {/* Grid */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-32">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.04 }}
                className={i % 4 === 1 || i % 4 === 2 ? 'md:mt-16' : ''}
              >
                <TransitionLink href={`/v2/work/${project.slug}`} className="group block">
                  {/* Media */}
                  <div className="relative overflow-hidden border border-white/8 group-hover:border-[#00f]/40 transition-colors duration-500 mb-6">
                    <div className="group-hover:scale-[1.03] transition-transform duration-700 ease-out">
                      <VideoPlaceholder
                        prompt={project.cover.prompt}
                        aspectRatio="video"
                        theme="dark"
                        label={project.title}
                        showPlayIcon={false}
                      />
                    </div>
                    {/* Blue wash on hover */}
                    <div className="absolute inset-0 bg-[#00f] opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none" />
                    {/* Case study tag */}
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                      <span className="font-mono text-[9px] text-white tracking-[0.2em] px-3 py-1.5 bg-[#00f]">
                        CASE STUDY →
                      </span>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex items-start justify-between gap-4 px-1">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-[9px] text-[#3333ff] tracking-[0.2em]">
                          {project.category}
                        </span>
                        <span className="w-5 h-[1px] bg-white/15" />
                        <span className="font-mono text-[9px] text-white/25 tracking-wider">
                          {project.year}
                        </span>
                      </div>
                      <h3 className="font-display text-xl md:text-2xl text-white/85 group-hover:text-white tracking-[0.06em] transition-colors">
                        {project.title}
                        <span className="text-white/25 ml-2 text-base">{project.subtitle}</span>
                      </h3>
                      <p className="font-body text-xs text-white/30 mt-2 max-w-md leading-relaxed">
                        {project.tagline}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="shrink-0 mt-1 text-white/20 group-hover:text-[#00f] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                    />
                  </div>
                </TransitionLink>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
