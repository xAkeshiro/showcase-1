'use client';

import { motion } from 'framer-motion';
import { VariantNavigation } from '@/components/variants/v2/Navigation';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    id: 'nexus-platform',
    title: 'NEXUS PLATFORM',
    titleJp: 'ネクサス',
    category: 'WEB DEVELOPMENT',
    year: '2025',
    description: 'A next-generation SaaS platform with real-time collaboration, built for creative teams.',
    tags: ['Next.js', 'WebSocket', 'Motion Design'],
    featured: true,
  },
  {
    id: 'akira-brand',
    title: 'AKIRA BRAND',
    titleJp: 'アキラ',
    category: 'BRAND IDENTITY',
    year: '2025',
    description: 'Complete brand overhaul for a Tokyo-based fashion label. From logo to digital presence.',
    tags: ['Branding', 'Typography', 'Print'],
    featured: true,
  },
  {
    id: 'void-interactive',
    title: 'VOID INTERACTIVE',
    titleJp: 'ボイド',
    category: 'MOTION DESIGN',
    year: '2024',
    description: 'Immersive product launch experience with 3D visuals and cinematic motion.',
    tags: ['Three.js', 'GSAP', 'WebGL'],
    featured: true,
  },
  {
    id: 'pulse-dashboard',
    title: 'PULSE DASHBOARD',
    titleJp: 'パルス',
    category: 'WEB DEVELOPMENT',
    year: '2024',
    description: 'Analytics dashboard with real-time data visualization and custom charting engine.',
    tags: ['React', 'D3.js', 'API Design'],
    featured: false,
  },
  {
    id: 'mono-studio',
    title: 'MONO STUDIO',
    titleJp: 'モノ',
    category: 'CREATIVE DIRECTION',
    year: '2024',
    description: 'Art direction and web presence for an architecture studio based in Osaka.',
    tags: ['Art Direction', 'Photography', 'Web'],
    featured: false,
  },
  {
    id: 'zenith-app',
    title: 'ZENITH APP',
    titleJp: 'ゼニス',
    category: 'WEB DEVELOPMENT',
    year: '2023',
    description: 'Mobile-first fintech application with seamless onboarding and gesture-based navigation.',
    tags: ['React Native', 'Fintech', 'UX'],
    featured: false,
  },
];

const categories = ['ALL', 'WEB DEVELOPMENT', 'BRAND IDENTITY', 'MOTION DESIGN', 'CREATIVE DIRECTION'];

export default function WorkPage() {
  return (
    <div className="bg-black min-h-screen">
      <VariantNavigation />
      <main>
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-end pb-20 pt-32 overflow-hidden">
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
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />

          <div className="max-w-7xl mx-auto px-6 w-full relative">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-mono text-[10px] text-[#444] tracking-[0.3em] block mb-4"
            >
              SELECTED WORK
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display text-[clamp(2rem,6vw,5rem)] text-white tracking-[0.05em] leading-[0.9] mb-4"
            >
              OUR
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
                PORTFOLIO
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-body text-sm text-[#555] max-w-lg"
            >
              A curated selection of projects that showcase our approach to design, development, and motion.
            </motion.p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="border-t border-b border-[#1a1a1a] bg-black">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-wrap gap-6">
              {categories.map((cat, i) => (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className={`font-mono text-[10px] tracking-wider transition-colors ${
                    i === 0 ? 'text-white' : 'text-[#444] hover:text-[#888]'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="bg-black py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="space-y-0">
              {projects.filter(p => p.featured).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group border-b border-[#1a1a1a] py-12 hover:bg-[#0a0a0a] transition-colors px-6 -mx-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-8">
                    {/* Project Image Placeholder */}
                    <div className="w-full md:w-1/3 aspect-[16/10] bg-[#111] border border-[#1a1a1a] relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-body-jp text-6xl text-[#1a1a1a] select-none">
                          {project.titleJp}
                        </span>
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className="font-mono text-[9px] text-[#333] tracking-wider">{project.category}</span>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <span className="font-mono text-[9px] text-[#333] tracking-wider">{project.year}</span>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="font-display text-2xl text-white tracking-[0.1em] mb-1 group-hover:tracking-[0.15em] transition-all">
                            {project.title}
                          </h2>
                          <span className="font-body-jp text-xs text-[#444]">{project.titleJp}</span>
                        </div>
                        <ArrowUpRight
                          size={20}
                          className="text-[#333] group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                        />
                      </div>
                      <p className="font-body text-sm text-[#555] leading-relaxed mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="font-mono text-[9px] text-[#444] bg-[#111] border border-[#1a1a1a] px-2 py-1 tracking-wider">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Other Projects Grid */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-[10px] text-[#999] tracking-[0.3em] block mb-12"
            >
              MORE PROJECTS
            </motion.span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.filter(p => !p.featured).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group border border-[#eee] hover:border-[#ccc] p-6 transition-all"
                >
                  <div className="aspect-[4/3] bg-[#f5f5f5] mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-body-jp text-4xl text-[#e5e5e5] select-none">
                        {project.titleJp}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-[9px] text-[#999] tracking-wider block mb-2">
                    {project.category} — {project.year}
                  </span>
                  <h3 className="font-display text-sm text-black tracking-[0.1em] mb-2">
                    {project.title}
                  </h3>
                  <p className="font-body text-xs text-[#777] leading-relaxed">
                    {project.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-black py-20 border-t border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-body-jp text-sm text-[#444] mb-4"
            >
              次のプロジェクト
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl text-white tracking-[0.1em] mb-8"
            >
              HAVE A PROJECT IN MIND?
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/v2#contact"
                className="inline-block font-mono text-[10px] text-black bg-white px-8 py-3 tracking-wider hover:bg-[#eee] transition-colors"
              >
                GET IN TOUCH
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
