'use client';

import { motion } from 'framer-motion';
import { VariantNavigation } from '@/components/variants/v2/Navigation';
import { ExternalLink } from 'lucide-react';

const experiments = [
  {
    id: 'particle-field',
    title: 'PARTICLE FIELD',
    titleJp: 'パーティクル',
    category: 'WEBGL',
    description: 'Interactive particle system that responds to mouse movement and audio input. Built with Three.js and custom shaders.',
    tech: ['Three.js', 'GLSL', 'Web Audio API'],
    status: 'LIVE',
  },
  {
    id: 'fluid-typography',
    title: 'FLUID TYPOGRAPHY',
    titleJp: 'フルイド',
    category: 'CSS',
    description: 'Experimental typography system that morphs between typefaces based on scroll position and viewport size.',
    tech: ['Variable Fonts', 'CSS Houdini', 'Intersection Observer'],
    status: 'LIVE',
  },
  {
    id: 'generative-grid',
    title: 'GENERATIVE GRID',
    titleJp: 'ジェネレイティブ',
    category: 'CREATIVE CODING',
    description: 'Algorithmically generated grid layouts that create unique compositions on every page load.',
    tech: ['Canvas API', 'p5.js', 'Noise Functions'],
    status: 'LIVE',
  },
  {
    id: 'cursor-trails',
    title: 'CURSOR TRAILS',
    titleJp: 'カーソル',
    category: 'INTERACTION',
    description: 'Custom cursor effects with physics-based trailing, magnetic snapping, and context-aware transformations.',
    tech: ['Framer Motion', 'Spring Physics', 'SVG'],
    status: 'WIP',
  },
  {
    id: 'scroll-cinema',
    title: 'SCROLL CINEMA',
    titleJp: 'スクロール',
    category: 'MOTION',
    description: 'Scroll-driven storytelling engine that plays video sequences frame-by-frame based on scroll position.',
    tech: ['Canvas', 'Image Sequences', 'Scroll Sync'],
    status: 'WIP',
  },
  {
    id: 'noise-landscapes',
    title: 'NOISE LANDSCAPES',
    titleJp: 'ノイズ',
    category: 'WEBGL',
    description: 'Procedurally generated 3D terrain using Perlin noise with real-time deformation and dynamic lighting.',
    tech: ['Three.js', 'Perlin Noise', 'Custom Shaders'],
    status: 'CONCEPT',
  },
];

export default function LabPage() {
  return (
    <div className="bg-black min-h-screen">
      <VariantNavigation />
      <main>
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-end pb-20 pt-32 bg-black overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #fff 1px, transparent 1px),
                linear-gradient(to bottom, #fff 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
          <motion.div
            className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          {/* Decorative floating elements */}
          <motion.div
            className="absolute top-1/3 right-20 w-32 h-32 border border-[#1a1a1a]"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute top-1/2 right-32 w-16 h-16 border border-[#111]"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />

          <div className="max-w-7xl mx-auto px-6 w-full relative">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-mono text-[10px] text-[#444] tracking-[0.3em] block mb-4"
            >
              EXPERIMENTS
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display text-[clamp(2rem,6vw,5rem)] text-white tracking-[0.05em] leading-[0.9] mb-4"
            >
              THE
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
                LAB
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-body text-sm text-[#555] max-w-lg"
            >
              A playground for creative exploration. Prototypes, experiments, and side projects
              where we push boundaries without constraints.
            </motion.p>
          </div>
        </section>

        {/* Status Legend */}
        <section className="border-t border-b border-[#1a1a1a] bg-black">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-8">
            <span className="font-mono text-[9px] text-[#333] tracking-wider">STATUS:</span>
            {['LIVE', 'WIP', 'CONCEPT'].map((status) => (
              <div key={status} className="flex items-center gap-2">
                <div className={`w-2 h-2 ${
                  status === 'LIVE' ? 'bg-green-500/50' :
                  status === 'WIP' ? 'bg-yellow-500/50' : 'bg-[#333]'
                }`} />
                <span className="font-mono text-[9px] text-[#555] tracking-wider">{status}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Experiments Grid */}
        <section className="bg-black py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {experiments.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group relative border border-[#1a1a1a] hover:border-[#333] transition-all duration-300"
                >
                  {/* Preview Area */}
                  <div className="aspect-[16/9] bg-[#0a0a0a] relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-body-jp text-5xl text-[#111] select-none group-hover:text-[#1a1a1a] transition-colors">
                        {exp.titleJp}
                      </span>
                    </div>
                    {/* Status badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 ${
                        exp.status === 'LIVE' ? 'bg-green-500/50' :
                        exp.status === 'WIP' ? 'bg-yellow-500/50' : 'bg-[#333]'
                      }`} />
                      <span className="font-mono text-[8px] text-[#555] tracking-wider">{exp.status}</span>
                    </div>
                    {/* Category */}
                    <div className="absolute top-4 left-4">
                      <span className="font-mono text-[8px] text-[#333] tracking-wider">{exp.category}</span>
                    </div>
                    {/* Hover link */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 border border-white/10">
                        <span className="font-mono text-[10px] text-white tracking-wider">VIEW EXPERIMENT</span>
                        <ExternalLink size={12} className="text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="font-display text-sm text-white tracking-[0.1em] mb-1">
                      {exp.title}
                    </h3>
                    <span className="font-body-jp text-[10px] text-[#444] block mb-3">
                      {exp.titleJp}
                    </span>
                    <p className="font-body text-xs text-[#555] leading-relaxed mb-4">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map(t => (
                        <span key={t} className="font-mono text-[8px] text-[#444] bg-[#111] border border-[#1a1a1a] px-2 py-1 tracking-wider">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#1a1a1a] group-hover:border-[#333] transition-colors" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#1a1a1a] group-hover:border-[#333] transition-colors" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Source */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-mono text-[10px] text-[#999] tracking-[0.3em] block mb-4">
                OPEN SOURCE
              </span>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] text-black tracking-[0.05em] mb-6">
                BUILT IN THE OPEN
              </h2>
              <p className="font-body text-sm text-[#777] max-w-lg mx-auto mb-8 leading-relaxed">
                Many of our experiments are open-source. We believe in sharing knowledge
                and contributing to the creative development community.
              </p>
              <div className="inline-flex items-center gap-2 font-mono text-[10px] text-[#999] border border-[#eee] px-6 py-3 tracking-wider hover:border-[#ccc] hover:text-black transition-colors cursor-pointer">
                VIEW ON GITHUB <ExternalLink size={10} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Bottom */}
        <section className="bg-black py-12 border-t border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <span className="font-mono text-[9px] text-[#333] tracking-wider">
              KUROSEI LAB — CREATIVE EXPERIMENTS
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}
