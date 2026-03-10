'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Globe, Sparkles, Target } from 'lucide-react';
import { MetaballCanvas } from './components/MetaballCanvas';
import { useNav } from './components/V2LayoutProvider';
import { VideoPlaceholder } from '@/components/ui/VideoPlaceholder';

// ─── Data ────────────────────────────────────────────

const roles = ['DESIGN', 'DEVELOP', 'MOTION', 'CREATE'];

const projects = [
  {
    id: 1, number: '01', title: 'NOVA', subtitle: 'RETAIL',
    category: 'E-COMMERCE', year: '2026', color: '#6432ff',
    videoPrompt: 'E-commerce website scroll',
  },
  {
    id: 2, number: '02', title: 'APEX', subtitle: 'STUDIOS',
    category: 'BRAND IDENTITY', year: '2026', color: '#3264ff',
    videoPrompt: 'Brand reveal animation',
  },
  {
    id: 3, number: '03', title: 'HORIZON', subtitle: 'TECH',
    category: 'WEB + MOTION', year: '2025', color: '#ff5050',
    videoPrompt: 'Tech startup website',
  },
  {
    id: 4, number: '04', title: 'STELLAR', subtitle: 'AUDIO',
    category: 'CAMPAIGN', year: '2025', color: '#50b478',
    videoPrompt: 'Product launch campaign',
  },
];

const initiatives = [
  {
    icon: Globe, title: 'GLOBAL REACH', titleJp: 'グローバル',
    description: 'Working with clients worldwide, from Tokyo to New York.',
  },
  {
    icon: Sparkles, title: 'CRAFT FIRST', titleJp: 'クラフト',
    description: 'Every pixel, every interaction, every detail matters.',
  },
  {
    icon: Target, title: 'RESULTS DRIVEN', titleJp: '結果重視',
    description: 'Design that performs, not just impresses.',
  },
];

// ─── Page Component ──────────────────────────────────

export default function V2Home() {
  const [currentRole, setCurrentRole] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const { navigate } = useNav();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Role rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0a0a0a]">
      {/* ─── HERO SECTION ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Metaball background - visible liquid blobs */}
        <MetaballCanvas
          blobColor="#1a1a1a"
          bgColor="#0a0a0a"
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #fff 1px, transparent 1px),
              linear-gradient(to bottom, #fff 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Background text */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]"
        >
          <span className="font-display text-[25vw] text-white/[0.02] tracking-[0.1em] select-none">
            黒星
          </span>
        </motion.div>

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full min-h-screen flex items-center px-6 md:px-12 lg:px-20"
        >
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text content */}
            <div>
              {/* Rotating role */}
              <div className="h-6 mb-6 overflow-hidden">
                <motion.div
                  key={currentRole}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="font-mono text-xs text-white/30 tracking-[0.5em]">
                    WE {roles[currentRole]}
                  </span>
                </motion.div>
              </div>

              {/* Main title with chromatic effect */}
              <div className="space-y-2 mb-8">
                <h1
                  className="font-display text-[clamp(4rem,12vw,10rem)] text-white tracking-[0.02em] leading-[0.85] chromatic-text"
                  data-text="KURO"
                >
                  KURO
                </h1>
                <h1
                  className="font-display text-[clamp(4rem,12vw,10rem)] tracking-[0.02em] leading-[0.85]"
                  style={{ color: 'transparent', WebkitTextStroke: '2px rgba(255,255,255,0.15)' }}
                >
                  SEI
                </h1>
              </div>

              {/* Subtitle */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-[1px] bg-white/20" />
                <span className="font-body-jp text-sm text-white/30">黒星 — Black Star</span>
              </div>

              <p className="font-body text-sm text-white/35 max-w-md leading-relaxed mb-10">
                A creative studio crafting digital experiences through design,
                development, and motion. Based in Tokyo, working globally.
              </p>

              {/* Scroll indicator */}
              <div className="flex items-center gap-4">
                <span className="font-mono text-[9px] text-white/25 tracking-widest">
                  SCROLL TO EXPLORE
                </span>
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-[1px] bg-gradient-to-r from-[#00f]/50 to-transparent"
                />
              </div>
            </div>

            {/* Right - Animated icon */}
            <div className="flex items-center justify-center">
              <div className="relative w-[clamp(14rem,30vw,24rem)] h-[clamp(14rem,30vw,24rem)]">
                {/* Glow */}
                <div className="absolute inset-[-30%] bg-white/[0.02] rounded-full blur-3xl" />

                {/* Rotating rings */}
                <motion.div
                  className="absolute inset-0 border border-white/10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-[10%] border border-white/15"
                  initial={{ rotate: 15 }}
                  animate={{ rotate: 375 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-[22%] border border-white/20"
                  initial={{ rotate: 45 }}
                  animate={{ rotate: 405 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-[35%] border border-white/10"
                  initial={{ rotate: -30 }}
                  animate={{ rotate: -390 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                />

                {/* Center star */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[clamp(3rem,8vw,6rem)] text-white select-none">★</span>
                </div>

                {/* Orbital dots - blue accent */}
                {[0, 120, 240].map((angle, i) => (
                  <motion.div
                    key={angle}
                    className="absolute w-2 h-2 bg-[#00f]/50 rounded-full"
                    style={{ top: '50%', left: '50%' }}
                    animate={{
                      x: [Math.cos((angle * Math.PI) / 180) * 100, Math.cos(((angle + 360) * Math.PI) / 180) * 100],
                      y: [Math.sin((angle * Math.PI) / 180) * 100, Math.sin(((angle + 360) * Math.PI) / 180) * 100],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'linear', delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section indicator */}
        <div className="absolute bottom-8 right-8 z-10">
          <span className="font-mono text-[9px] text-white/20 tracking-wider">// 01 / HERO</span>
        </div>
      </section>

      {/* ─── ABOUT / WHO WE ARE ─── */}
      <section className="relative py-32 overflow-hidden border-t border-white/5">
        {/* Metaball background */}
        <MetaballCanvas
          blobColor="#151515"
          bgColor="#0a0a0a"
          opacity={0.8}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-mono text-[10px] text-white/20 tracking-[0.3em] block mb-4">
                WHO WE ARE
              </span>
              <h2
                className="font-display text-[clamp(2rem,5vw,4rem)] text-white tracking-[0.02em] leading-tight chromatic-text"
                data-text="WE BUILD DIGITAL"
              >
                WE BUILD
                <br />
                <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.25)' }}>
                  DIGITAL
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <p className="font-body text-sm text-white/30 leading-relaxed mb-6">
                KUROSEI is a creative studio at the intersection of design, development,
                and motion. We partner with forward-thinking brands to create digital
                experiences that resonate and convert.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-white/10" />
                <span className="font-body-jp text-sm text-white/20">黒星スタジオ</span>
              </div>
            </motion.div>
          </div>

          {/* Initiative cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initiatives.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group border border-white/5 p-8 hover:border-white/15 hover:bg-white/[0.02] transition-all duration-500"
                >
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center mb-6 group-hover:border-white/20 transition-colors">
                    <Icon size={20} strokeWidth={1} className="text-white/30 group-hover:text-white/50 transition-colors" />
                  </div>
                  <h3 className="font-display text-sm text-white tracking-[0.15em] mb-2">{item.title}</h3>
                  <span className="font-body-jp text-[10px] text-white/20 block mb-4">{item.titleJp}</span>
                  <p className="font-body text-xs text-white/25 leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-8 right-8 z-10">
          <span className="font-mono text-[9px] text-white/15 tracking-wider">// 02 / ABOUT</span>
        </div>
      </section>

      {/* ─── PROJECTS GRID ─── */}
      <section className="relative py-32 overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-16"
          >
            <div>
              <span className="font-mono text-[10px] text-white/20 tracking-wider block mb-2">SELECTED WORK</span>
              <h2
                className="font-display text-[clamp(2.5rem,7vw,6rem)] text-white tracking-[0.02em] leading-none chromatic-text"
                data-text="PROJECTS"
              >
                PROJECTS
              </h2>
            </div>
            <a
              href="/v2/work"
              onClick={(e) => navigate('/v2/work', e)}
              className="hidden md:flex items-center gap-2 font-mono text-[10px] text-white/30 hover:text-white tracking-wider transition-colors group"
              data-cursor="pointer"
            >
              VIEW ALL
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                {/* Thumbnail with hover effect */}
                <div className="relative overflow-hidden mb-6 border border-white/5 group-hover:border-white/10 transition-colors">
                  <VideoPlaceholder
                    prompt={project.videoPrompt}
                    aspectRatio="video"
                    theme="dark"
                    label={project.title}
                    className="w-full group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Color overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{ background: project.color }}
                  />

                  {/* View label */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-mono text-[10px] text-white tracking-wider px-4 py-2 border border-white/40 backdrop-blur-sm bg-black/30">
                      VIEW PROJECT
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-[9px] text-white/20">{project.category}</span>
                      <span className="w-6 h-[1px] bg-white/10" />
                      <span className="font-mono text-[9px] text-white/20">{project.year}</span>
                    </div>
                    <h3 className="font-display text-xl text-white tracking-wider">
                      {project.title}
                      <span className="text-white/30 ml-2">{project.subtitle}</span>
                    </h3>
                  </div>
                  <span className="font-display text-3xl text-white/10">{project.number}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 right-8">
          <span className="font-mono text-[9px] text-white/15 tracking-wider">// 03 / WORK</span>
        </div>
      </section>

      {/* ─── REACH OUT / CTA ─── */}
      <section className="relative py-32 overflow-hidden border-t border-white/5">
        {/* Metaball background */}
        <MetaballCanvas
          blobColor="#181818"
          bgColor="#0a0a0a"
          opacity={0.9}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="font-mono text-[10px] text-white/20 tracking-wider block mb-6">
              READY TO START?
            </span>

            <h2
              className="font-display text-[clamp(3rem,10vw,8rem)] text-white tracking-[0.02em] leading-none mb-8 chromatic-text"
              data-text="REACH OUT"
            >
              REACH
              <br />
              <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}>
                OUT
              </span>
            </h2>

            {/* Large emoji */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="text-8xl mb-12"
            >
              ✌️
            </motion.div>

            <a
              href="/v2/contact"
              onClick={(e) => navigate('/v2/contact', e)}
              className="inline-flex items-center gap-3 px-12 py-5 bg-white text-black font-display text-sm tracking-[0.2em] hover:bg-[#00f] hover:text-white transition-colors group"
              data-cursor="pointer"
            >
              LET&apos;S TALK
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        <div className="absolute bottom-8 right-8 z-10">
          <span className="font-mono text-[9px] text-white/15 tracking-wider">// 04 / CTA</span>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-white/10 flex items-center justify-center">
              <span className="text-sm text-white">★</span>
            </div>
            <div>
              <span className="font-display text-xs text-white tracking-[0.15em] block">KUROSEI</span>
              <span className="font-body-jp text-[9px] text-white/20">黒星スタジオ</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            {['TWITTER', 'INSTAGRAM', 'DRIBBBLE', 'LINKEDIN'].map((social) => (
              <a key={social} href="#" className="font-mono text-[9px] text-white/20 hover:text-white/50 tracking-wider transition-colors">
                {social}
              </a>
            ))}
          </div>

          <span className="font-mono text-[9px] text-white/15 tracking-wider">© 2026 KUROSEI</span>
        </div>
      </footer>
    </div>
  );
}
