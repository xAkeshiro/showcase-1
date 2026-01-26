'use client';

import { motion } from 'framer-motion';
import { CornerFrame } from '@/components/ui/CornerFrame';
import { SectionNumber } from '@/components/ui/SectionNumber';
import { VideoPlaceholder } from '@/components/ui/VideoPlaceholder';
import { FadeInUp } from '@/components/ui/ScrollAnimations';
import { Code, Palette, Play, Sparkles } from 'lucide-react';

const services = [
  {
    id: 'web',
    icon: Code,
    titleEn: 'WEB DEVELOPMENT',
    titleJp: 'ウェブ開発',
    description: 'Custom websites and web applications built with modern frameworks. From landing pages to complex platforms.',
    features: ['Next.js / React', 'E-commerce', 'CMS Integration', 'Performance Optimization'],
    videoPrompt: 'Code visualization: Terminal with code being typed, website being built in real-time, browser preview updating. Matrix-style code rain transitions.',
  },
  {
    id: 'brand',
    icon: Palette,
    titleEn: 'BRAND IDENTITY',
    titleJp: 'ブランドアイデンティティ',
    description: 'Complete visual identity systems that define your brand. Logo design, color systems, and comprehensive guidelines.',
    features: ['Logo Design', 'Visual Systems', 'Brand Guidelines', 'Collateral Design'],
    videoPrompt: 'Brand reveal: Logo sketches morphing into final design, color palette animation, typography showcase, mockup presentations.',
  },
  {
    id: 'motion',
    icon: Play,
    titleEn: 'MOTION DESIGN',
    titleJp: 'モーションデザイン',
    description: 'Dynamic animations that bring your brand to life. From UI animations to full promotional videos.',
    features: ['Logo Animation', 'UI/UX Motion', 'Promotional Videos', 'Social Content'],
    videoPrompt: 'Motion showcase: Kinetic typography, logo animations, UI transitions, abstract motion graphics. Energetic, rhythmic editing.',
  },
  {
    id: 'creative',
    icon: Sparkles,
    titleEn: 'CREATIVE DIRECTION',
    titleJp: 'クリエイティブディレクション',
    description: 'Strategic creative oversight for cohesive brand experiences. Concept development to final execution.',
    features: ['Concept Development', 'Art Direction', 'Campaign Strategy', 'Visual Storytelling'],
    videoPrompt: 'Behind the scenes: Mood boards, sketches, brainstorming visuals, project evolution from concept to completion. Documentary style.',
  },
];

export function World() {
  return (
    <section id="services" className="relative bg-white py-24 overflow-hidden">
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
            WHAT WE DO
          </span>
          <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] text-black tracking-[0.15em]">
            SERVICES
          </h2>
          <p className="font-body-jp text-sm text-[#666] mt-2">
            サービス
          </p>
          <motion.div
            className="w-12 h-[1px] bg-black/20 mx-auto mt-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
        </FadeInUp>

        {/* Featured Process Video */}
        <FadeInUp delay={0.2} className="mb-16">
          <VideoPlaceholder
            prompt="Studio process reel: Split-screen of design and code work. Figma designs, VS Code, After Effects timeline. Fast-paced, showing the creative process from concept to launch."
            aspectRatio="ultrawide"
            theme="light"
            label="OUR PROCESS"
            className="w-full"
          />
        </FadeInUp>

        {/* Services Grid - 2x2 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative overflow-hidden bg-[#fafafa] border border-[#eee] hover:border-[#ccc] transition-colors"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {/* Video Placeholder */}
                  <div className="relative aspect-square sm:aspect-auto">
                    <VideoPlaceholder
                      prompt={service.videoPrompt}
                      aspectRatio="square"
                      theme="light"
                      label={service.titleEn}
                      showPlayIcon={false}
                      className="w-full h-full"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 border border-[#ddd]">
                        <Icon size={18} strokeWidth={1.5} className="text-[#666]" />
                      </div>
                      <div>
                        <h3 className="font-display text-sm text-black tracking-[0.1em]">
                          {service.titleEn}
                        </h3>
                        <p className="font-body-jp text-[10px] text-[#888]">
                          {service.titleJp}
                        </p>
                      </div>
                    </div>

                    <p className="font-body text-xs text-[#666] leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="font-mono text-[8px] text-[#888] px-2 py-0.5 bg-[#f0f0f0]"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <motion.span
                      className="inline-flex items-center gap-2 font-mono text-[10px] text-[#999] group-hover:text-black tracking-wider transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      LEARN MORE
                      <span>→</span>
                    </motion.span>
                  </div>
                </div>

                {/* Corner frame */}
                <CornerFrame theme="light" />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <FadeInUp delay={0.4} className="text-center mt-16">
          <p className="font-body text-sm text-[#888] mb-6">
            Have a project in mind? Let&apos;s create something extraordinary together.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 border border-black text-black font-display text-xs tracking-[0.2em] hover:bg-black hover:text-white transition-colors"
          >
            START A PROJECT
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
