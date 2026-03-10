'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNav } from '../components/V2LayoutProvider';
import { ChromaticOverlay } from '../components/ChromaticOverlay';
import { VideoPlaceholder } from '@/components/ui/VideoPlaceholder';

const categories = ['ALL', 'BRANDING', 'WEB', 'MOTION', 'CAMPAIGN'];

const allProjects = [
  { id: 1, title: 'NOVA', subtitle: 'RETAIL', category: 'WEB', year: '2026', color: '#6432ff', prompt: 'E-commerce dark theme' },
  { id: 2, title: 'APEX', subtitle: 'STUDIOS', category: 'BRANDING', year: '2026', color: '#3264ff', prompt: 'Brand identity reveal' },
  { id: 3, title: 'HORIZON', subtitle: 'TECH', category: 'WEB', year: '2025', color: '#ff5050', prompt: 'Tech startup site' },
  { id: 4, title: 'STELLAR', subtitle: 'AUDIO', category: 'CAMPAIGN', year: '2025', color: '#50b478', prompt: 'Product launch' },
  { id: 5, title: 'ZENITH', subtitle: 'FINANCE', category: 'WEB', year: '2025', color: '#f0a030', prompt: 'Financial dashboard' },
  { id: 6, title: 'PULSE', subtitle: 'HEALTH', category: 'MOTION', year: '2025', color: '#e040a0', prompt: 'Health app animations' },
  { id: 7, title: 'VERTEX', subtitle: 'GAMING', category: 'BRANDING', year: '2024', color: '#40e0d0', prompt: 'Gaming brand identity' },
  { id: 8, title: 'FLUX', subtitle: 'CREATIVE', category: 'MOTION', year: '2024', color: '#ff6b6b', prompt: 'Creative studio reel' },
];

export default function V2WorkPage() {
  const { navigate } = useNav();
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredProjects = activeCategory === 'ALL'
    ? allProjects
    : allProjects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Very subtle chromatic overlay - reduced for cleanliness */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <ChromaticOverlay intensity={0.08} style={{ opacity: 0.15 }} />
      </div>

      {/* Header */}
      <header className="relative z-10 pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Back button */}
          <motion.a
            href="/v2"
            onClick={(e) => navigate('/v2', e)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 font-mono text-[10px] text-white/30 hover:text-white tracking-wider transition-colors mb-12 group"
            data-cursor="pointer"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            BACK
          </motion.a>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="font-mono text-[10px] text-white/20 tracking-wider block mb-4">
              ALL PROJECTS
            </span>
            <h1
              className="font-display text-[clamp(3rem,10vw,8rem)] text-white tracking-[0.02em] leading-none chromatic-text"
              data-text="WORKS"
            >
              WORKS
            </h1>
          </motion.div>

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4 mt-12"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono text-[10px] tracking-wider px-4 py-2 border transition-all duration-300 ${
                  activeCategory === cat
                    ? 'text-white bg-[#00f] border-[#00f]'
                    : 'text-white/40 border-white/10 hover:border-[#00f]/50 hover:text-white/60'
                }`}
                data-cursor="pointer"
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </header>

      {/* Projects Grid */}
      <section className="relative z-10 px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="group"
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden mb-4 border border-white/5 group-hover:border-white/15 transition-colors">
                  <VideoPlaceholder
                    prompt={project.prompt}
                    aspectRatio="square"
                    theme="dark"
                    label={project.title}
                    className="w-full group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Color overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-500 mix-blend-overlay"
                    style={{ background: project.color }}
                  />

                  {/* Chromatic flash on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-cyan-500/10" />
                  </div>

                  {/* View label */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-mono text-[9px] text-white tracking-wider px-3 py-1.5 border border-white/50 backdrop-blur-sm bg-black/40">
                      VIEW
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[9px] text-white/20 block mb-1">{project.category}</span>
                    <h3 className="font-display text-lg text-white tracking-wider">
                      {project.title}
                      <span className="text-white/30 ml-1 text-sm">{project.subtitle}</span>
                    </h3>
                  </div>
                  <span className="font-mono text-[9px] text-white/15">{project.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="font-mono text-[9px] text-white/15 tracking-wider">
            {filteredProjects.length} PROJECTS
          </span>
        </div>
      </footer>
    </div>
  );
}
