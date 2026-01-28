'use client';

import { motion } from 'framer-motion';
import { Globe, Sparkles, Target } from 'lucide-react';
import { useState, useEffect } from 'react';

const initiatives = [
  {
    icon: Globe,
    title: 'GLOBAL REACH',
    titleJp: 'グローバル',
    description: 'Working with clients worldwide, from Tokyo to New York.',
    expandedContent: 'Our distributed team operates across time zones, ensuring seamless collaboration with clients in Asia, Europe, and the Americas. We bring diverse perspectives to every project.',
    stats: ['12+ Countries', '50+ Projects', '24/7 Availability'],
  },
  {
    icon: Sparkles,
    title: 'CRAFT FIRST',
    titleJp: 'クラフト',
    description: 'Every pixel, every interaction, every detail matters.',
    expandedContent: 'We obsess over the details that others overlook. From micro-interactions to typography choices, we believe excellence lives in the margins.',
    stats: ['Pixel Perfect', 'Motion Design', 'Typography'],
  },
  {
    icon: Target,
    title: 'RESULTS DRIVEN',
    titleJp: '結果重視',
    description: 'Design that performs, not just impresses.',
    expandedContent: 'Beautiful design means nothing without results. We measure success through conversions, engagement, and real business impact for our clients.',
    stats: ['+40% Avg Conversion', 'Data Informed', 'ROI Focused'],
  },
];

export function VariantIntro() {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % initiatives.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="relative bg-black py-32 overflow-hidden">
      {/* Background grid */}
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

      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Left - Statement */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-[10px] text-[#444] tracking-[0.3em] block mb-4">
              WHO WE ARE
            </span>
            <h2 className="font-display text-[clamp(1.5rem,4vw,3rem)] text-white tracking-[0.05em] leading-tight mb-6">
              WE BUILD
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
                DIGITAL
              </span>
              <br />
              EXPERIENCES
            </h2>
          </motion.div>

          {/* Right - Description */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <p className="font-body text-sm text-[#666] leading-relaxed mb-6">
              KUROSEI is a creative studio at the intersection of design, development,
              and motion. We partner with forward-thinking brands to create digital
              experiences that resonate and convert.
            </p>
            <p className="font-body text-sm text-[#555] leading-relaxed mb-8">
              From concept to launch, we handle every aspect of your digital presence
              with precision and purpose. Our approach is simple: understand deeply,
              design thoughtfully, build meticulously.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#333]" />
              <span className="font-body-jp text-sm text-[#444]">
                黒星スタジオ
              </span>
            </div>
          </motion.div>
        </div>

        {/* Initiative cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {initiatives.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeCard === index;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                animate={{ scale: isActive ? 1.02 : 1 }}
                className={`relative border p-8 transition-all duration-500 ${
                  isActive
                    ? 'border-[#444] bg-[#0a0a0a]'
                    : 'border-[#1a1a1a] bg-transparent'
                }`}
              >
                {/* Icon */}
                <div className={`w-12 h-12 border flex items-center justify-center mb-6 transition-colors duration-500 ${
                  isActive ? 'border-[#444]' : 'border-[#222]'
                }`}>
                  <Icon size={20} strokeWidth={1} className={`transition-colors duration-500 ${
                    isActive ? 'text-white' : 'text-[#555]'
                  }`} />
                </div>

                {/* Title */}
                <h3 className="font-display text-sm text-white tracking-[0.15em] mb-2">
                  {item.title}
                </h3>
                <span className={`font-body-jp text-[10px] block mb-4 transition-colors duration-500 ${
                  isActive ? 'text-[#555]' : 'text-[#444]'
                }`}>
                  {item.titleJp}
                </span>

                {/* Description */}
                <p className="font-body text-xs text-[#555] leading-relaxed">
                  {item.description}
                </p>

                {/* Expanded content - revealed when active */}
                <div className={`grid transition-all duration-500 ease-out ${
                  isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}>
                  <div className="overflow-hidden">
                    <div className={`pt-6 border-t mt-6 transition-colors duration-500 ${
                      isActive ? 'border-[#222]' : 'border-[#1a1a1a]'
                    }`}>
                      <p className="font-body text-xs text-[#666] leading-relaxed mb-4">
                        {item.expandedContent}
                      </p>

                      {/* Stats */}
                      <div className="flex flex-wrap gap-2">
                        {item.stats.map((stat) => (
                          <span
                            key={stat}
                            className="font-mono text-[9px] text-[#444] bg-[#111] px-2 py-1 tracking-wider"
                          >
                            {stat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Corner accent */}
                <div className={`absolute top-0 right-0 border-t border-r transition-all duration-300 ${
                  isActive
                    ? 'w-6 h-6 border-[#444]'
                    : 'w-4 h-4 border-[#222]'
                }`} />
                <div className={`absolute bottom-0 left-0 border-b border-l transition-all duration-300 ${
                  isActive
                    ? 'w-6 h-6 border-[#444]'
                    : 'w-4 h-4 border-[#222]'
                }`} />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom stat line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-24 pt-8 border-t border-[#1a1a1a] flex flex-wrap justify-center gap-12 md:gap-24"
        >
          {[
            { value: 'TOKYO', label: 'BASE' },
            { value: 'GLOBAL', label: 'REACH' },
            { value: '24/7', label: 'SUPPORT' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="font-display text-lg text-white tracking-wider block">
                {stat.value}
              </span>
              <span className="font-mono text-[9px] text-[#444] tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Section number */}
      <div className="absolute bottom-6 right-6">
        <span className="font-mono text-[9px] text-[#333] tracking-wider">
          // 02 / INTRO
        </span>
      </div>
    </section>
  );
}
