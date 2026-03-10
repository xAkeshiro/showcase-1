'use client';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNav } from '../components/V2LayoutProvider';
import { ChromaticOverlay } from '../components/ChromaticOverlay';
import { MetaballCanvas } from '../components/MetaballCanvas';

const stats = [
  { value: '50+', label: 'PROJECTS', sublabel: 'Completed' },
  { value: '12', label: 'COUNTRIES', sublabel: 'Clients from' },
  { value: '8+', label: 'YEARS', sublabel: 'Experience' },
  { value: '24/7', label: 'SUPPORT', sublabel: 'Available' },
];

const services = [
  'WEB DESIGN',
  'DEVELOPMENT',
  'BRAND IDENTITY',
  'MOTION DESIGN',
  'CREATIVE DIRECTION',
  'UI/UX DESIGN',
];

const awards = [
  { name: 'AWWWARDS', count: '12x' },
  { name: 'CSS DESIGN AWARDS', count: '8x' },
  { name: 'FWA', count: '5x' },
  { name: 'WEBBY AWARDS', count: '3x' },
];

const locations = [
  { city: 'TOKYO', role: 'Headquarters', jp: '東京' },
  { city: 'NEW YORK', role: 'Studio', jp: 'ニューヨーク' },
  { city: 'LONDON', role: 'Partner', jp: 'ロンドン' },
];

export default function V2AboutPage() {
  const { navigate } = useNav();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Subtle chromatic overlay */}
        <ChromaticOverlay intensity={0.5} style={{ opacity: 0.1 }} />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 w-full px-6 pt-24">
          <div className="max-w-7xl mx-auto">
            {/* Back button */}
            <motion.a
              href="/v2"
              onClick={(e) => navigate('/v2', e)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 font-mono text-[10px] text-white/30 hover:text-white tracking-wider transition-colors mb-16 group"
              data-cursor="pointer"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              BACK
            </motion.a>

            {/* Title with heavy chromatic split */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="font-mono text-[10px] text-white/20 tracking-wider block mb-6">
                WHO WE ARE
              </span>
              <h1
                className="font-display text-[clamp(2.5rem,8vw,7rem)] text-white tracking-[0.02em] leading-[0.9] mb-8 chromatic-text"
                data-text="DIGITAL PRODUCTION"
              >
                DIGITAL
                <br />
                <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}>
                  PRODUCTION
                </span>
              </h1>
              <p className="font-body text-sm text-white/35 max-w-xl leading-relaxed">
                We are a creative studio specializing in digital experiences. From concept to execution,
                we craft meaningful connections between brands and their audiences through design,
                development, and motion.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <span className="font-display text-4xl md:text-5xl text-white block mb-2">{stat.value}</span>
                <span className="font-mono text-[9px] text-white/40 tracking-wider block">{stat.label}</span>
                <span className="font-body text-[10px] text-white/20">{stat.sublabel}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative py-20 border-t border-white/5">
        <MetaballCanvas blobColor="#151515" bgColor="#0a0a0a" opacity={0.5} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="font-mono text-[10px] text-white/20 tracking-wider block mb-4">WHAT WE DO</span>
            <h2
              className="font-display text-[clamp(1.5rem,4vw,3rem)] text-white tracking-[0.02em] chromatic-text"
              data-text="SERVICES"
            >
              SERVICES
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group flex items-center gap-6 py-4 border-b border-white/5 hover:border-white/15 transition-colors"
              >
                <span className="font-mono text-[9px] text-white/15 w-8">{String(index + 1).padStart(2, '0')}</span>
                <span className="font-display text-lg text-white/60 tracking-wider group-hover:text-[#00f] group-hover:tracking-[0.15em] transition-all">
                  {service}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Locations */}
      <section className="relative py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Awards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-mono text-[10px] text-white/20 tracking-wider block mb-8">RECOGNITION</span>
              <div className="space-y-4">
                {awards.map((award) => (
                  <div key={award.name} className="flex items-center justify-between py-3 border-b border-white/5">
                    <span className="font-display text-sm text-white/50 tracking-wider">{award.name}</span>
                    <span className="font-mono text-[11px] text-white/30">{award.count}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Locations */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="font-mono text-[10px] text-white/20 tracking-wider block mb-8">LOCATIONS</span>
              <div className="space-y-6">
                {locations.map((loc) => (
                  <div key={loc.city} className="group">
                    <div className="flex items-center gap-4 mb-1">
                      <span className="font-display text-xl text-white tracking-wider group-hover:tracking-[0.15em] transition-all">
                        {loc.city}
                      </span>
                      <span className="font-body-jp text-sm text-white/20">{loc.jp}</span>
                    </div>
                    <span className="font-mono text-[9px] text-white/30 tracking-wider">{loc.role}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative py-32 border-t border-white/5 overflow-hidden">
        <ChromaticOverlay intensity={0.3} style={{ opacity: 0.08 }} />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-[10px] text-white/20 tracking-wider block mb-8">OUR PHILOSOPHY</span>
            <blockquote
              className="font-display text-[clamp(1.5rem,4vw,2.5rem)] text-white leading-tight tracking-wide chromatic-text"
              data-text="We believe in the power of craft. Every pixel matters. Every interaction counts. We don't just build websites—we create experiences."
            >
              &ldquo;We believe in the power of craft. Every pixel matters. Every interaction counts.
              We don&apos;t just build websites—we create experiences.&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="w-12 h-[1px] bg-white/10" />
              <span className="font-body-jp text-sm text-white/20">黒星スタジオ</span>
              <div className="w-12 h-[1px] bg-white/10" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="font-mono text-[9px] text-white/15 tracking-wider">// ABOUT</span>
        </div>
      </footer>
    </div>
  );
}
