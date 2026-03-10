'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Globe, Sparkles, Target, ArrowRight } from 'lucide-react';

import { ShaderLoader } from './components/ShaderLoader';
import { MetaballCanvas } from './components/MetaballCanvas';
import { ChromaticOverlay } from './components/ChromaticOverlay';
import { CustomCursor } from './components/CustomCursor';
import { ProjectCard } from './components/ProjectCard';

// ─── Data ────────────────────────────────────────────

const roles = ['DESIGN', 'DEVELOP', 'MOTION', 'CREATE'];

const projects = [
  {
    id: 1, number: '01', title: 'NOVA', subtitle: 'RETAIL',
    category: 'E-COMMERCE', year: '2026', color: 'rgba(100,50,150,0.3)',
    videoPrompt: 'E-commerce website scroll: Dark theme, product cards with hover effects, smooth transitions.',
  },
  {
    id: 2, number: '02', title: 'APEX', subtitle: 'STUDIOS',
    category: 'BRAND IDENTITY', year: '2026', color: 'rgba(50,100,200,0.3)',
    videoPrompt: 'Brand reveal: Logo animation morphing through stages, color palette reveal, typography showcase.',
  },
  {
    id: 3, number: '03', title: 'HORIZON', subtitle: 'TECH',
    category: 'WEB + MOTION', year: '2025', color: 'rgba(200,80,80,0.3)',
    videoPrompt: 'Tech startup website: 3D elements, data visualizations, interactive graphs, particle effects.',
  },
  {
    id: 4, number: '04', title: 'STELLAR', subtitle: 'AUDIO',
    category: 'CAMPAIGN', year: '2025', color: 'rgba(80,180,120,0.3)',
    videoPrompt: 'Product launch: Audio equipment reveal with dynamic lighting, soundwave visualizations.',
  },
];

const initiatives = [
  {
    icon: Globe, title: 'GLOBAL REACH', titleJp: 'グローバル',
    description: 'Working with clients worldwide, from Tokyo to New York.',
    expandedContent: 'Our distributed team operates across time zones, ensuring seamless collaboration with clients in Asia, Europe, and the Americas.',
    stats: ['12+ Countries', '50+ Projects', '24/7 Availability'],
  },
  {
    icon: Sparkles, title: 'CRAFT FIRST', titleJp: 'クラフト',
    description: 'Every pixel, every interaction, every detail matters.',
    expandedContent: 'We obsess over the details that others overlook. From micro-interactions to typography choices, we believe excellence lives in the margins.',
    stats: ['Pixel Perfect', 'Motion Design', 'Typography'],
  },
  {
    icon: Target, title: 'RESULTS DRIVEN', titleJp: '結果重視',
    description: 'Design that performs, not just impresses.',
    expandedContent: 'Beautiful design means nothing without results. We measure success through conversions, engagement, and real business impact.',
    stats: ['+40% Avg Conversion', 'Data Informed', 'ROI Focused'],
  },
];

const processSteps = [
  { number: '01', title: 'DISCOVER', titleJp: '発見', description: 'We dive deep into your brand, audience, and goals to define the strategic foundation.' },
  { number: '02', title: 'DESIGN', titleJp: 'デザイン', description: 'Translating strategy into visual systems, interactions, and experiences.' },
  { number: '03', title: 'DEVELOP', titleJp: '開発', description: 'Building with cutting-edge technology, focusing on performance and accessibility.' },
  { number: '04', title: 'DELIVER', titleJp: '納品', description: 'Launch, optimize, and iterate based on real-world performance data.' },
];

const socialLinks = [
  { name: 'TWITTER', href: '#' },
  { name: 'INSTAGRAM', href: '#' },
  { name: 'DRIBBBLE', href: '#' },
  { name: 'LINKEDIN', href: '#' },
];

// ─── Component ───────────────────────────────────────

export default function V2Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentRole, setCurrentRole] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const heroRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);

  const { scrollYProgress: workScroll } = useScroll({
    target: workRef,
    offset: ['start 0.3', 'end start'],
  });
  const workX = useTransform(workScroll, [0, 0.15, 1], ['0%', '0%', '-30%']);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Role rotation
  useState(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  });

  // Card cycling
  useState(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % initiatives.length);
    }, 4000);
    return () => clearInterval(interval);
  });

  // Step cycling
  useState(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length);
    }, 4000);
    return () => clearInterval(interval);
  });

  return (
    <div className="bg-black min-h-screen" style={{ cursor: 'none' }}>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Chromatic text styles */}
      <style jsx global>{`
        .chromatic-text {
          position: relative;
        }
        .chromatic-text::before,
        .chromatic-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.6s ease;
        }
        .chromatic-text:hover::before,
        .chromatic-active::before {
          color: rgba(255, 0, 0, 0.25);
          transform: translate(-2px, -1px);
          z-index: -1;
          opacity: 1;
        }
        .chromatic-text:hover::after,
        .chromatic-active::after {
          color: rgba(0, 255, 255, 0.25);
          transform: translate(2px, 1px);
          z-index: -1;
          opacity: 1;
        }
      `}</style>

      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <ShaderLoader onComplete={handleLoadComplete} minimumLoadTime={3000} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={isLoading ? { opacity: 0, x: 50 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* ─── Navigation ─── */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/v2" className="flex items-center gap-3">
              <div className="w-8 h-8 border border-white/20 flex items-center justify-center relative">
                <motion.div
                  className="absolute inset-0 border border-white/10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                <span className="text-sm text-white">★</span>
              </div>
              <span className="font-display text-xs text-white tracking-[0.2em]">KUROSEI</span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {['WORK', 'ABOUT', 'CONTACT'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="font-mono text-[10px] text-white/50 hover:text-white tracking-wider transition-colors"
                  data-cursor="pointer"
                >
                  {item}
                </a>
              ))}
            </div>

            <a href="/" className="font-mono text-[9px] text-white/30 hover:text-white/60 tracking-wider transition-colors">
              ← MAIN SITE
            </a>
          </div>
        </nav>

        {/* ─── HERO ─── */}
        <section
          ref={heroRef}
          id="hero"
          className="relative min-h-screen flex items-center overflow-hidden"
        >
          {/* Metaball background */}
          <MetaballCanvas opacity={0.6} />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
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
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <span className="font-display text-[22vw] text-white/[0.02] tracking-[0.1em] select-none">
              黒星
            </span>
          </motion.div>

          {/* Scanning line */}
          <motion.div
            className="absolute left-0 right-0 h-[1px] pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)' }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          />

          {/* Content */}
          <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full min-h-screen flex items-center">
            {/* Left */}
            <div className="flex-1 pl-12 md:pl-20 lg:pl-32 pr-8">
              <div className="h-6 mb-6 overflow-hidden">
                <motion.div
                  key={currentRole}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                >
                  <span className="font-mono text-xs text-white/40 tracking-[0.5em]">
                    WE {roles[currentRole]}
                  </span>
                </motion.div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="font-display text-[clamp(3rem,10vw,8rem)] text-white tracking-[0.05em] leading-[0.9] chromatic-text"
                    data-text="KURO"
                  >
                    {'KURO'.split('').map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.06, duration: 0.5 }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.h1>
                </div>
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="font-display text-[clamp(3rem,10vw,8rem)] tracking-[0.05em] leading-[0.9]"
                    style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}
                    data-text="SEI"
                  >
                    {'SEI'.split('').map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + i * 0.06, duration: 0.5 }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.h1>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="w-12 h-[1px] bg-white/20" />
                <span className="font-body-jp text-sm text-white/40 tracking-wider">
                  黒星 — Black Star
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="font-body text-sm text-white/40 max-w-md leading-relaxed mb-12"
              >
                A creative studio crafting digital experiences through design,
                development, and motion. Based in Tokyo, working globally.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="flex items-center gap-6"
              >
                <span className="font-mono text-[9px] text-white/30 tracking-widest">SCROLL TO EXPLORE</span>
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-12 h-[1px] bg-gradient-to-r from-white/20 to-transparent"
                />
              </motion.div>
            </div>

            {/* Right - Icon */}
            <div className="flex-1 flex items-center justify-center pr-12 md:pr-20 lg:pr-32">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="relative w-[clamp(12rem,28vw,22rem)] h-[clamp(12rem,28vw,22rem)]"
              >
                {/* Glow behind icon */}
                <div className="absolute inset-[-20%] rounded-full bg-white/[0.02] blur-3xl" />

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
                  animate={{ rotate: [45, 405] }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-[35%] border border-white/10"
                  initial={{ rotate: -30 }}
                  animate={{ rotate: [-30, -390] }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 1, duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                    className="text-[clamp(2.5rem,6vw,5rem)] text-white select-none"
                  >
                    ★
                  </motion.span>
                </div>

                {/* Orbital dots */}
                {[0, 120, 240].map((angle, i) => (
                  <motion.div
                    key={angle}
                    className="absolute w-1.5 h-1.5 bg-white/20 rounded-full"
                    style={{ top: '50%', left: '50%' }}
                    animate={{
                      x: [Math.cos((angle * Math.PI) / 180) * 90, Math.cos(((angle + 360) * Math.PI) / 180) * 90],
                      y: [Math.sin((angle * Math.PI) / 180) * 90, Math.sin(((angle + 360) * Math.PI) / 180) * 90],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Corner elements */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-8 left-8">
            <span className="font-mono text-[9px] text-white/30 tracking-wider">DESIGN + DEVELOPMENT + MOTION</span>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-8 right-8">
            <span className="font-mono text-[9px] text-white/30 tracking-wider">// 01 / HERO</span>
          </motion.div>
        </section>

        {/* ─── INTRO / WHO WE ARE ─── */}
        <section className="relative bg-black py-32 overflow-hidden">
          {/* Metaball background - subtle */}
          <MetaballCanvas opacity={0.3} />

          {/* Chromatic overlay */}
          <ChromaticOverlay intensity={0.15} blendMode="screen" />

          {/* Scanning line */}
          <motion.div
            className="absolute left-0 right-0 h-[1px] pointer-events-none z-10"
            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)' }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="font-mono text-[10px] text-white/20 tracking-[0.3em] block mb-4">WHO WE ARE</span>
                <h2
                  className="font-display text-[clamp(1.5rem,4vw,3rem)] text-white tracking-[0.05em] leading-tight mb-6 chromatic-text"
                  data-text="WE BUILD DIGITAL EXPERIENCES"
                >
                  WE BUILD
                  <br />
                  <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>DIGITAL</span>
                  <br />
                  EXPERIENCES
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="flex flex-col justify-center"
              >
                <p className="font-body text-sm text-white/30 leading-relaxed mb-6">
                  KUROSEI is a creative studio at the intersection of design, development,
                  and motion. We partner with forward-thinking brands to create digital
                  experiences that resonate and convert.
                </p>
                <p className="font-body text-sm text-white/25 leading-relaxed mb-8">
                  From concept to launch, we handle every aspect of your digital presence
                  with precision and purpose.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-white/10" />
                  <span className="font-body-jp text-sm text-white/20">黒星スタジオ</span>
                </div>
              </motion.div>
            </div>

            {/* Card progress indicator */}
            <div className="flex items-center justify-center gap-3 mb-12">
              {initiatives.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCard(index)}
                  className="group relative p-2"
                >
                  <div className={`w-8 h-[2px] transition-all duration-500 ${
                    activeCard === index ? 'bg-white' : 'bg-white/10 group-hover:bg-white/20'
                  }`} />
                  {activeCard === index && (
                    <motion.div layoutId="v2ActiveIndicator" className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                    </motion.div>
                  )}
                </button>
              ))}
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
                      isActive ? 'border-white/15 bg-white/[0.03]' : 'border-white/5 bg-transparent'
                    }`}
                  >
                    <div className={`w-12 h-12 border flex items-center justify-center mb-6 transition-colors duration-500 ${
                      isActive ? 'border-white/20' : 'border-white/5'
                    }`}>
                      <Icon size={20} strokeWidth={1} className={`transition-colors duration-500 ${
                        isActive ? 'text-white' : 'text-white/20'
                      }`} />
                    </div>

                    <h3 className="font-display text-sm text-white tracking-[0.15em] mb-2">{item.title}</h3>
                    <span className={`font-body-jp text-[10px] block mb-4 transition-colors duration-500 ${
                      isActive ? 'text-white/25' : 'text-white/15'
                    }`}>{item.titleJp}</span>

                    <p className="font-body text-xs text-white/30 leading-relaxed">{item.description}</p>

                    <div className={`grid transition-all duration-500 ease-out ${
                      isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}>
                      <div className="overflow-hidden">
                        <div className={`pt-6 border-t mt-6 transition-colors duration-500 ${
                          isActive ? 'border-white/10' : 'border-white/5'
                        }`}>
                          <p className="font-body text-xs text-white/35 leading-relaxed mb-4">{item.expandedContent}</p>
                          <div className="flex flex-wrap gap-2">
                            {item.stats.map((stat) => (
                              <span key={stat} className="font-mono text-[9px] text-white/25 bg-white/[0.03] px-2 py-1 tracking-wider">{stat}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`absolute top-0 right-0 border-t border-r transition-all duration-300 ${
                      isActive ? 'w-6 h-6 border-white/20' : 'w-4 h-4 border-white/5'
                    }`} />
                    <div className={`absolute bottom-0 left-0 border-b border-l transition-all duration-300 ${
                      isActive ? 'w-6 h-6 border-white/20' : 'w-4 h-4 border-white/5'
                    }`} />
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-24 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-12 md:gap-24"
            >
              {[
                { value: 'TOKYO', label: 'BASE', jp: '東京' },
                { value: 'GLOBAL', label: 'REACH', jp: '世界' },
                { value: '24/7', label: 'SUPPORT', jp: 'サポート' },
              ].map((stat) => (
                <div key={stat.label} className="text-center group">
                  <span className="font-body-jp text-[10px] text-white/10 block mb-1 group-hover:text-white/20 transition-colors">{stat.jp}</span>
                  <span className="font-display text-xl text-white tracking-wider block group-hover:tracking-[0.2em] transition-all">{stat.value}</span>
                  <span className="font-mono text-[9px] text-white/20 tracking-wider">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="absolute bottom-6 right-6 z-10">
            <span className="font-mono text-[9px] text-white/15 tracking-wider">// 02 / INTRO</span>
          </div>
        </section>

        {/* ─── WORK / PROJECTS ─── */}
        <section ref={workRef} id="work" className="relative bg-black py-32 overflow-hidden border-t border-white/5">
          {/* Chromatic overlay */}
          <ChromaticOverlay intensity={0.2} blendMode="screen" />

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
              backgroundSize: '80px 80px',
            }}
          />

          {/* Background character */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none overflow-hidden">
            <span className="font-display text-[35vw] text-white/[0.01] leading-none select-none">作</span>
          </div>

          {/* Header */}
          <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-end justify-between"
            >
              <div>
                <span className="font-mono text-[10px] text-white/25 tracking-wider block mb-2">SELECTED WORK</span>
                <h2
                  className="font-display text-[clamp(2rem,6vw,5rem)] text-white tracking-[0.05em] leading-none chromatic-text"
                  data-text="PROJECTS"
                >
                  PROJECTS
                </h2>
              </div>
              <motion.button
                whileHover={{ x: 5 }}
                className="hidden md:flex items-center gap-2 font-mono text-[10px] text-white/30 hover:text-white tracking-wider transition-colors"
              >
                VIEW ALL <ArrowRight size={14} />
              </motion.button>
            </motion.div>
          </div>

          {/* Project cards with 3D tilt */}
          <motion.div style={{ x: workX }} className="flex gap-8 px-6 pb-8 relative z-10">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>

          {/* Bottom */}
          <div className="max-w-7xl mx-auto px-6 mt-16 relative z-10">
            <div className="h-[1px] bg-white/5" />
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-3">
                <motion.div animate={{ x: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-8 h-[1px] bg-white/20" />
                <span className="font-mono text-[9px] text-white/25 tracking-wider">SCROLL TO EXPLORE</span>
              </div>
              <span className="font-mono text-[9px] text-white/15 tracking-wider">// 03 / WORK</span>
            </div>
          </div>
        </section>

        {/* ─── ABOUT ─── */}
        <section id="about" className="relative bg-black overflow-hidden border-t border-white/5">
          {/* Metaball background */}
          <MetaballCanvas opacity={0.25} />

          {/* Scanning line */}
          <motion.div
            className="absolute left-0 right-0 h-[1px] pointer-events-none z-10"
            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)' }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />

          {/* Background character */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none">
            <span className="font-display text-[40vw] text-white/[0.01] leading-none select-none">私</span>
          </div>

          {/* Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen relative z-10">
            {/* Left */}
            <div className="p-12 md:p-20 lg:p-32 flex flex-col justify-center border-r border-white/5">
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <span className="font-mono text-[10px] text-white/20 tracking-wider block mb-4">OUR APPROACH</span>
                <h2
                  className="font-display text-[clamp(1.5rem,4vw,3rem)] text-white tracking-[0.05em] leading-tight mb-8 chromatic-text"
                  data-text="PRECISION IN EVERY PIXEL"
                >
                  PRECISION
                  <br />
                  IN EVERY
                  <br />
                  <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>PIXEL</span>
                </h2>
                <p className="font-body text-sm text-white/30 leading-relaxed mb-8 max-w-md">
                  We combine strategic thinking with meticulous craftsmanship. Every project begins with
                  understanding — your brand, your audience, your goals.
                </p>

                {/* Services list */}
                <div className="space-y-3">
                  {['Web Design', 'Development', 'Brand Identity', 'Motion Design', 'Creative Direction'].map((service, i) => (
                    <motion.div
                      key={service}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="group flex items-center gap-4 py-2 border-b border-white/5 hover:border-white/10 transition-colors"
                    >
                      <span className="font-mono text-[9px] text-white/15 tracking-wider">{String(i + 1).padStart(2, '0')}</span>
                      <span className="font-display text-xs text-white/60 tracking-wider group-hover:text-white group-hover:tracking-[0.2em] transition-all">
                        {service.toUpperCase()}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right */}
            <div className="p-12 md:p-20 lg:p-32 flex flex-col justify-center">
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <span className="font-mono text-[10px] text-white/20 tracking-wider block mb-8">HOW WE WORK</span>

                {/* Process progress */}
                <div className="flex items-center gap-3 mb-12">
                  {processSteps.map((_, index) => (
                    <button key={index} onClick={() => setActiveStep(index)} className="group relative p-2">
                      <div className={`w-8 h-[2px] transition-all duration-500 ${
                        activeStep === index ? 'bg-white' : 'bg-white/10 group-hover:bg-white/20'
                      }`} />
                    </button>
                  ))}
                </div>

                {/* Process steps */}
                <div className="space-y-6">
                  {processSteps.map((step, index) => (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      animate={{ scale: activeStep === index ? 1.02 : 1, x: activeStep === index ? 8 : 0 }}
                      className={`flex gap-6 p-4 border transition-all duration-500 ${
                        activeStep === index ? 'border-white/15 bg-white/[0.03]' : 'border-white/5 bg-transparent'
                      }`}
                    >
                      <span className={`font-display text-2xl transition-colors duration-500 ${
                        activeStep === index ? 'text-white' : 'text-white/10'
                      }`}>{step.number}</span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-display text-xs text-white tracking-[0.15em]">{step.title}</h4>
                          <span className="font-body-jp text-[10px] text-white/20">{step.titleJp}</span>
                        </div>
                        <p className={`font-body text-xs leading-relaxed transition-colors duration-500 ${
                          activeStep === index ? 'text-white/40' : 'text-white/20'
                        }`}>{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Section indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <span className="font-body-jp text-[10px] text-white/10">私たちについて</span>
                  <div className="w-8 h-[1px] bg-white/5" />
                </div>
                <span className="font-mono text-[9px] text-white/10 tracking-wider">// 04 / ABOUT</span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── CONTACT ─── */}
        <section id="contact" className="relative bg-black py-32 overflow-hidden border-t border-white/5">
          {/* Metaball background */}
          <MetaballCanvas opacity={0.4} />

          {/* Background character */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
            <span className="font-display text-[35vw] text-white/[0.01] leading-none select-none">連</span>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <span className="font-mono text-[10px] text-white/20 tracking-wider block mb-6">HAVE A PROJECT IN MIND?</span>
              <h2
                className="font-display text-[clamp(2.5rem,8vw,7rem)] text-white tracking-[0.02em] leading-none mb-8 chromatic-text"
                data-text="LET'S CREATE"
              >
                LET&apos;S
                <br />
                <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>CREATE</span>
              </h2>
              <motion.a
                href="mailto:hello@kurosei.studio"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255,255,255,0.08)' }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-12 py-5 bg-white text-black font-display text-sm tracking-[0.2em] hover:bg-white/90 transition-all duration-300 group"
              >
                GET IN TOUCH
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12 border-t border-b border-white/5">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <span className="font-mono text-[9px] text-white/20 tracking-wider block mb-3">EMAIL</span>
                <a href="mailto:hello@kurosei.studio" className="font-display text-lg text-white tracking-wider hover:text-white/60 transition-colors">
                  hello@kurosei.studio
                </a>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <span className="font-mono text-[9px] text-white/20 tracking-wider block mb-3">LOCATION</span>
                <p className="font-display text-lg text-white tracking-wider">WORLDWIDE / REMOTE</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                <span className="font-mono text-[9px] text-white/20 tracking-wider block mb-3">AVAILABILITY</span>
                <div className="flex items-center gap-3">
                  <motion.div className="w-2 h-2 bg-green-500 rounded-full" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                  <span className="font-body text-sm text-white/40">Open for new projects</span>
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center">
                  <span className="text-lg text-white">★</span>
                </div>
                <div>
                  <span className="font-display text-sm text-white tracking-[0.15em] block">KUROSEI</span>
                  <span className="font-body-jp text-[10px] text-white/20">黒星スタジオ</span>
                </div>
              </div>

              <div className="flex items-center gap-8">
                {socialLinks.map((link) => (
                  <a key={link.name} href={link.href} className="font-mono text-[9px] text-white/20 hover:text-white tracking-wider transition-colors">
                    {link.name}
                  </a>
                ))}
              </div>

              <span className="font-mono text-[9px] text-white/20 tracking-wider">© 2026 KUROSEI</span>
            </div>

            {/* Section indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <span className="font-body-jp text-[10px] text-white/10">お問い合わせ</span>
                <div className="w-8 h-[1px] bg-white/5" />
              </div>
              <span className="font-mono text-[9px] text-white/10 tracking-wider">// 05 / CONTACT</span>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
