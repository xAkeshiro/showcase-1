'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VariantNavigation } from '@/components/variants/v2/Navigation';
import { Code, Palette, Film, Compass, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: Code,
    num: '01',
    title: 'WEB DEVELOPMENT',
    titleJp: 'ウェブ開発',
    tagline: 'Built for performance, designed for scale.',
    description: 'We craft fast, accessible, and scalable web applications using modern frameworks and best practices. Every line of code is written with purpose.',
    capabilities: [
      'Next.js & React Applications',
      'Full-Stack Development',
      'API Design & Integration',
      'CMS & E-commerce Solutions',
      'Performance Optimization',
      'Cloud Infrastructure',
    ],
    tools: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Vercel'],
  },
  {
    icon: Palette,
    num: '02',
    title: 'BRAND IDENTITY',
    titleJp: 'ブランド',
    tagline: 'Your brand, distilled to its essence.',
    description: 'From strategy to visual identity, we build brands that resonate. We dig deep to understand what makes you unique and translate that into a cohesive visual language.',
    capabilities: [
      'Brand Strategy & Positioning',
      'Logo & Visual Identity',
      'Typography Systems',
      'Color Palettes',
      'Brand Guidelines',
      'Print & Collateral Design',
    ],
    tools: ['Figma', 'Illustrator', 'InDesign', 'After Effects'],
  },
  {
    icon: Film,
    num: '03',
    title: 'MOTION DESIGN',
    titleJp: 'モーション',
    tagline: 'Movement that tells a story.',
    description: 'Motion adds dimension to digital experiences. We create animations, transitions, and interactive elements that guide users and bring interfaces to life.',
    capabilities: [
      'UI/UX Animation',
      'Micro-interactions',
      'Scroll-based Animations',
      '3D & WebGL Experiences',
      'Video Production',
      'Lottie Animations',
    ],
    tools: ['Framer Motion', 'GSAP', 'Three.js', 'After Effects', 'Blender'],
  },
  {
    icon: Compass,
    num: '04',
    title: 'CREATIVE DIRECTION',
    titleJp: '方向性',
    tagline: 'Vision aligned with execution.',
    description: 'We provide the strategic creative oversight that ties every element together. From concept to delivery, we ensure your digital presence tells a cohesive story.',
    capabilities: [
      'Creative Strategy',
      'Art Direction',
      'UX Research & Audits',
      'Design System Architecture',
      'Content Strategy',
      'Campaign Direction',
    ],
    tools: ['Figma', 'Miro', 'Notion', 'Analytics Platforms'],
  },
];

const engagementModels = [
  {
    title: 'PROJECT BASED',
    titleJp: 'プロジェクト',
    description: 'Fixed scope and timeline for well-defined projects. Ideal for launches, redesigns, and campaigns.',
    best: 'Websites, campaigns, brand launches',
  },
  {
    title: 'RETAINER',
    titleJp: 'リテイナー',
    description: 'Ongoing partnership with dedicated hours each month. Perfect for continuous iteration and growth.',
    best: 'Growing brands, ongoing product development',
  },
  {
    title: 'EMBEDDED TEAM',
    titleJp: 'チーム',
    description: 'Our team integrates with yours for large-scale initiatives. Full collaboration, shared velocity.',
    best: 'Enterprise projects, product teams',
  },
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <VariantNavigation />
      <main>
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-end pb-20 pt-32 bg-white overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #eee 1px, transparent 1px),
                linear-gradient(to bottom, #eee 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
          <motion.div
            className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none"
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />

          <div className="max-w-7xl mx-auto px-6 w-full relative">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-mono text-[10px] text-[#999] tracking-[0.3em] block mb-4"
            >
              WHAT WE DO
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display text-[clamp(2rem,6vw,5rem)] text-black tracking-[0.05em] leading-[0.9] mb-4"
            >
              OUR
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(0,0,0,0.25)' }}>
                SERVICES
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-body text-sm text-[#777] max-w-lg"
            >
              End-to-end creative and development services for brands that want to stand out in the digital space.
            </motion.p>
          </div>
        </section>

        {/* Services Detail */}
        <section className="bg-black py-24">
          <div className="max-w-7xl mx-auto px-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isActive = activeService === index;
              return (
                <motion.div
                  key={service.num}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`border-b border-[#1a1a1a] py-16 transition-all duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-60'
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left - Number & Icon */}
                    <div className="lg:col-span-2">
                      <span className={`font-display text-5xl block mb-4 transition-colors duration-500 ${
                        isActive ? 'text-white/20' : 'text-[#1a1a1a]'
                      }`}>
                        {service.num}
                      </span>
                      <div className={`w-12 h-12 border flex items-center justify-center transition-all duration-500 ${
                        isActive ? 'border-[#444]' : 'border-[#222]'
                      }`}>
                        <Icon size={20} strokeWidth={1} className={`transition-colors duration-500 ${
                          isActive ? 'text-white' : 'text-[#555]'
                        }`} />
                      </div>
                    </div>

                    {/* Middle - Info */}
                    <div className="lg:col-span-5">
                      <h2 className="font-display text-xl text-white tracking-[0.1em] mb-1">
                        {service.title}
                      </h2>
                      <span className="font-body-jp text-xs text-[#444] block mb-4">
                        {service.titleJp}
                      </span>
                      <p className="font-body text-xs text-[#888] italic mb-4">
                        {service.tagline}
                      </p>
                      <p className="font-body text-sm text-[#555] leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Right - Capabilities */}
                    <div className="lg:col-span-5">
                      <span className="font-mono text-[9px] text-[#444] tracking-wider block mb-4">
                        CAPABILITIES
                      </span>
                      <div className="space-y-2 mb-6">
                        {service.capabilities.map((cap) => (
                          <div key={cap} className="flex items-center gap-3">
                            <div className="w-1 h-1 bg-[#333]" />
                            <span className="font-body text-xs text-[#666]">{cap}</span>
                          </div>
                        ))}
                      </div>
                      <span className="font-mono text-[9px] text-[#444] tracking-wider block mb-3">
                        TOOLS
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {service.tools.map((tool) => (
                          <span key={tool} className="font-mono text-[9px] text-[#444] bg-[#111] border border-[#1a1a1a] px-2 py-1 tracking-wider">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Engagement Models */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <span className="font-mono text-[10px] text-[#999] tracking-[0.3em] block mb-4">
                HOW WE ENGAGE
              </span>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] text-black tracking-[0.05em]">
                ENGAGEMENT MODELS
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {engagementModels.map((model, index) => (
                <motion.div
                  key={model.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative border border-[#eee] hover:border-[#ccc] p-8 transition-all group"
                >
                  <h3 className="font-display text-sm text-black tracking-[0.15em] mb-1">
                    {model.title}
                  </h3>
                  <span className="font-body-jp text-[10px] text-[#bbb] block mb-4">
                    {model.titleJp}
                  </span>
                  <p className="font-body text-xs text-[#777] leading-relaxed mb-4">
                    {model.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-[#999] tracking-wider">BEST FOR:</span>
                    <span className="font-body text-[10px] text-[#666]">{model.best}</span>
                  </div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#eee] group-hover:border-[#ccc] group-hover:w-6 group-hover:h-6 transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#eee] group-hover:border-[#ccc] group-hover:w-6 group-hover:h-6 transition-all duration-300" />
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
              一緒に働きましょう
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl text-white tracking-[0.1em] mb-4"
            >
              READY TO START?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-body text-sm text-[#555] mb-8 max-w-md mx-auto"
            >
              Tell us about your project and we will get back to you within 24 hours.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/v2#contact"
                className="inline-flex items-center gap-2 font-mono text-[10px] text-black bg-white px-8 py-3 tracking-wider hover:bg-[#eee] transition-colors"
              >
                CONTACT US <ArrowRight size={12} />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
