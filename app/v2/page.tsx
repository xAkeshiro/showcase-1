'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { MetaballCanvas } from './components/MetaballCanvas';
import { Preloader } from './components/Preloader';
import { Marquee } from './components/Marquee';
import { TransitionLink } from './components/TransitionLink';
import { FadeUp, RevealText, SectionLabel } from './components/Reveal';
import { Footer } from './components/Footer';
import { featuredProjects, type Project } from './lib/projects';

const EASE = [0.76, 0, 0.24, 1] as const;
const roles = ['DESIGN', 'DEVELOP', 'MOTION', 'CREATE'];

const capabilities = [
  {
    n: '01',
    title: 'DIGITAL EXPERIENCES',
    jp: 'デジタル体験',
    desc: 'Websites, platforms, and products engineered to feel effortless — headless builds, WebGL, and interfaces that ship at 60fps.',
  },
  {
    n: '02',
    title: 'BRAND IDENTITY',
    jp: 'ブランド',
    desc: 'Identities designed in motion first. Strategy, visual systems, and parametric logo tools that survive every surface a brand touches.',
  },
  {
    n: '03',
    title: 'MOTION & FILM',
    jp: 'モーション',
    desc: 'From product films to therapeutic UI animation systems — motion languages built on intention, delivered as production-ready libraries.',
  },
  {
    n: '04',
    title: 'CREATIVE TECHNOLOGY',
    jp: '技術開発',
    desc: 'Audio-reactive engines, real-time data visualization, AI-assisted pipelines. Custom tools when off-the-shelf can’t say it.',
  },
];

const clients = [
  'NOVA RETAIL', 'APEX STUDIOS', 'HORIZON', 'STELLAR AUDIO',
  'ZENITH', 'PULSE HEALTH', 'VERTEX', 'FLUX CREATIVE',
];

const stats = [
  { value: '50+', label: 'PROJECTS SHIPPED' },
  { value: '24', label: 'INTERNATIONAL AWARDS' },
  { value: '12', label: 'COUNTRIES SERVED' },
  { value: '08', label: 'YEARS OF PRACTICE' },
];

export default function V2Home() {
  const [ready, setReady] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);

  // Cursor-following work preview
  const [hovered, setHovered] = useState<Project | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const onWorksMouseMove = useCallback((e: React.MouseEvent) => {
    const el = previewRef.current;
    if (el) {
      el.style.transform = `translate3d(${e.clientX + 24}px, ${e.clientY - 110}px, 0)`;
    }
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCurrentRole((p) => (p + 1) % roles.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-[#050505]">
      <Preloader onComplete={() => setReady(true)} />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <MetaballCanvas />
        <div className="v2-grid" />
        <div className="v2-grain" />

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-display text-[26vw] text-white/[0.02] tracking-[0.08em] select-none leading-none">
            黒星
          </span>
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center pt-24 pb-16">
          {/* Left — type */}
          <div>
            {/* Rotating role */}
            <div className="h-5 mb-8 overflow-hidden">
              <motion.div
                key={currentRole}
                initial={{ y: 18, opacity: 0 }}
                animate={ready ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <span className="font-mono text-[11px] text-white/35 tracking-[0.5em]">
                  WE {roles[currentRole]}
                </span>
              </motion.div>
            </div>

            {/* Wordmark */}
            <div className="mb-10">
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '110%' }}
                  animate={ready ? { y: 0 } : {}}
                  transition={{ duration: 1, ease: EASE, delay: 0.05 }}
                  className="font-display text-[clamp(4rem,13vw,11rem)] text-white tracking-[0.02em] leading-[0.85]"
                >
                  KURO
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '110%' }}
                  animate={ready ? { y: 0 } : {}}
                  transition={{ duration: 1, ease: EASE, delay: 0.18 }}
                  className="font-display text-[clamp(4rem,13vw,11rem)] tracking-[0.02em] leading-[0.85] v2-outline"
                >
                  SEI<span className="text-[#00f]" style={{ WebkitTextStroke: '0' }}>.</span>
                </motion.h1>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex items-center gap-4 mb-7"
            >
              <span className="w-14 h-[1px] bg-[#00f]" />
              <span className="font-body-jp text-sm text-white/35 tracking-wider">
                黒星 — Black Star
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.85, duration: 0.7, ease: EASE }}
              className="font-body text-sm text-white/40 max-w-md leading-relaxed mb-12"
            >
              An independent studio crafting digital experiences through design,
              development, and motion. Based in Tokyo, working worldwide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : {}}
              transition={{ delay: 1.1 }}
              className="flex items-center gap-5"
            >
              <span className="font-mono text-[9px] text-white/25 tracking-[0.3em]">
                SCROLL TO EXPLORE
              </span>
              <motion.span
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="block w-14 h-[1px] bg-gradient-to-r from-[#00f] to-transparent"
              />
            </motion.div>
          </div>

          {/* Right — emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={ready ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 1.1, ease: EASE }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-[clamp(14rem,26vw,22rem)] h-[clamp(14rem,26vw,22rem)]">
              <div className="absolute inset-[-25%] rounded-full bg-[#00f]/[0.04] blur-3xl" />
              <motion.div
                className="absolute inset-0 border border-white/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-[11%] border border-white/15"
                initial={{ rotate: 15 }}
                animate={{ rotate: 375 }}
                transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-[23%] border border-white/20"
                initial={{ rotate: 45 }}
                animate={{ rotate: 405 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-[36%] border border-[#00f]/25"
                initial={{ rotate: -30 }}
                animate={{ rotate: -390 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[clamp(2.6rem,6vw,4.5rem)] text-white select-none">★</span>
              </div>
              {/* Orbitals */}
              {[0, 120, 240].map((angle, i) => (
                <motion.span
                  key={angle}
                  className="absolute w-1.5 h-1.5 bg-[#00f] rounded-full"
                  style={{ top: '50%', left: '50%' }}
                  animate={{
                    x: [Math.cos((angle * Math.PI) / 180) * 105, Math.cos(((angle + 360) * Math.PI) / 180) * 105],
                    y: [Math.sin((angle * Math.PI) / 180) * 105, Math.sin(((angle + 360) * Math.PI) / 180) * 105],
                  }}
                  transition={{ duration: 16, repeat: Infinity, ease: 'linear', delay: i * 0.25 }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Corner labels */}
        <div className="absolute bottom-7 left-6 md:left-10 z-10">
          <span className="font-mono text-[9px] text-white/25 tracking-wider">
            DESIGN + DEVELOPMENT + MOTION
          </span>
        </div>
        <div className="absolute bottom-7 right-6 md:right-10 z-10">
          <span className="font-mono text-[9px] text-white/25 tracking-wider">{'// 01 — HERO'}</span>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="border-y border-white/5 py-5 bg-[#050505]">
        <Marquee duration={26}>
          {['DESIGN', 'DEVELOPMENT', 'MOTION', 'BRAND', '黒星スタジオ'].map((word) => (
            <span key={word} className="flex items-center">
              <span className="font-display text-2xl md:text-3xl text-white/15 tracking-[0.15em] px-8">
                {word}
              </span>
              <span className="text-[#00f] text-sm">★</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* ═══ SELECTED WORKS ═══ */}
      <section className="relative py-28 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionLabel label="SELECTED WORKS" index="// 02" className="mb-10" />

          <div className="flex items-end justify-between mb-16">
            <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] text-white tracking-[0.02em] leading-none">
              <RevealText>WORKS</RevealText>
            </h2>
            <FadeUp delay={0.2}>
              <TransitionLink
                href="/v2/work"
                className="hidden md:flex items-center gap-2 font-mono text-[10px] text-white/40 hover:text-white tracking-[0.2em] transition-colors group"
              >
                ALL PROJECTS
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform text-[#00f]" />
              </TransitionLink>
            </FadeUp>
          </div>

          {/* Rows with cursor-following preview */}
          <div onMouseMove={onWorksMouseMove} onMouseLeave={() => setHovered(null)}>
            {featuredProjects.map((project, i) => (
              <FadeUp key={project.slug} delay={i * 0.06}>
                <TransitionLink
                  href={`/v2/work/${project.slug}`}
                  onMouseEnter={() => setHovered(project)}
                  onMouseLeave={() => setHovered(null)}
                  className="group grid grid-cols-[auto_1fr_auto] md:grid-cols-[80px_1fr_auto_60px] items-center gap-6 py-9 border-t border-white/8 last:border-b hover:bg-white/[0.015] transition-colors duration-300 px-2 md:px-4"
                >
                  <span className="font-mono text-[10px] text-white/25 tracking-wider group-hover:text-[#00f] transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex items-baseline gap-4 min-w-0">
                    <h3 className="font-display text-[clamp(1.6rem,4.5vw,3.4rem)] text-white/85 group-hover:text-white tracking-[0.03em] leading-none transition-all duration-500 group-hover:translate-x-3 whitespace-nowrap">
                      {project.title}
                    </h3>
                    <span className="font-display text-sm md:text-lg text-white/25 tracking-[0.1em] hidden sm:block">
                      {project.subtitle}
                    </span>
                  </div>
                  <div className="hidden md:flex flex-col items-end gap-1">
                    <span className="font-mono text-[9px] text-white/35 tracking-wider">
                      {project.category}
                    </span>
                    <span className="font-mono text-[9px] text-white/20 tracking-wider">
                      {project.year}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-white/20 group-hover:text-[#00f] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all justify-self-end"
                  />
                </TransitionLink>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Floating preview card — follows cursor, desktop only */}
        <div
          ref={previewRef}
          className="fixed top-0 left-0 z-40 pointer-events-none hidden lg:block"
          style={{ transform: 'translate3d(-500px, -500px, 0)' }}
        >
          <div
            className="w-[300px] aspect-video border border-white/10 bg-[#0a0a0a] overflow-hidden relative transition-all duration-300"
            style={{
              opacity: hovered ? 1 : 0,
              scale: hovered ? '1' : '0.9',
            }}
          >
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
            <div className="absolute inset-0 bg-[#00f]/10" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <span className="font-display text-2xl text-white tracking-[0.15em]">
                {hovered?.title}
              </span>
              <span className="font-mono text-[9px] text-white/50 tracking-[0.25em]">
                {hovered?.category} — {hovered?.year}
              </span>
              <span className="font-mono text-[8px] text-[#3333ff] tracking-[0.2em] mt-2">
                VIEW CASE STUDY →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CAPABILITIES ═══ */}
      <section className="relative py-28 md:py-36 border-t border-white/5 overflow-hidden">
        <MetaballCanvas opacity={0.55} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionLabel label="WHAT WE DO" index="// 03" className="mb-10" />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 mb-20">
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-white tracking-[0.02em] leading-[1.05]">
              <RevealText>FULL-STACK</RevealText>
              <RevealText delay={0.1}>
                <span className="v2-outline">CREATIVITY</span>
              </RevealText>
            </h2>
            <FadeUp delay={0.2} className="flex flex-col justify-end">
              <p className="font-body text-sm text-white/40 leading-relaxed max-w-lg">
                Strategy through shipping. We keep design, engineering, and motion under
                one roof so nothing gets lost in translation — the people who imagine it
                are the people who build it.
              </p>
            </FadeUp>
          </div>

          <div>
            {capabilities.map((cap, i) => (
              <FadeUp key={cap.n} delay={i * 0.05}>
                <div className="group grid grid-cols-1 md:grid-cols-[60px_1fr_1.2fr] gap-4 md:gap-10 py-8 border-t border-white/8 last:border-b hover:bg-white/[0.015] transition-colors duration-300 px-2 md:px-4 items-baseline">
                  <span className="font-mono text-[10px] text-white/25 group-hover:text-[#00f] transition-colors tracking-wider">
                    {cap.n}
                  </span>
                  <div className="flex items-baseline gap-4">
                    <h3 className="font-display text-lg md:text-2xl text-white/80 group-hover:text-white tracking-[0.08em] transition-colors">
                      {cap.title}
                    </h3>
                    <span className="font-body-jp text-[10px] text-white/25 hidden md:block">
                      {cap.jp}
                    </span>
                  </div>
                  <p className="font-body text-xs md:text-sm text-white/30 group-hover:text-white/50 leading-relaxed transition-colors">
                    {cap.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <FadeUp
                key={stat.label}
                delay={i * 0.08}
                className={`py-14 px-6 text-center border-white/5 ${i > 0 ? 'border-l' : ''} ${i > 1 ? 'max-lg:border-t max-lg:border-l-0' : ''} ${i === 3 ? 'max-lg:border-l' : ''}`}
              >
                <span className="font-display text-4xl md:text-5xl text-white block mb-3 tabular-nums">
                  {stat.value}
                </span>
                <span className="font-mono text-[9px] text-white/30 tracking-[0.25em]">
                  {stat.label}
                </span>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CLIENTS ═══ */}
      <section className="py-28 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionLabel label="SELECTED CLIENTS" index="// 04" className="mb-14" />
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-white/8">
            {clients.map((client) => (
              <div
                key={client}
                className="group aspect-[2/1] md:aspect-[5/2] border-r border-b border-white/8 flex items-center justify-center hover:bg-white/[0.02] transition-colors duration-300"
              >
                <span className="font-display text-[11px] md:text-sm text-white/30 group-hover:text-white tracking-[0.25em] transition-colors duration-300 text-center px-2">
                  {client}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative py-32 md:py-44 border-t border-white/5 overflow-hidden">
        <MetaballCanvas opacity={0.75} />
        <div className="v2-grain" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 text-center">
          <FadeUp>
            <span className="font-mono text-[10px] text-white/30 tracking-[0.3em] block mb-8">
              HAVE A PROJECT IN MIND?
            </span>
          </FadeUp>
          <h2 className="font-display text-[clamp(3rem,11vw,9.5rem)] text-white tracking-[0.02em] leading-[0.9] mb-12">
            <RevealText>
              <span className="v2-ghost" data-text="REACH">REACH</span>
            </RevealText>
            <RevealText delay={0.12}>
              <span className="v2-outline">OUT</span>
              <span className="text-[#00f]">.</span>
            </RevealText>
          </h2>
          <FadeUp delay={0.3}>
            <TransitionLink
              href="/v2/contact"
              className="inline-flex items-center gap-3 px-12 py-5 bg-white text-black font-display text-sm tracking-[0.25em] hover:bg-[#00f] hover:text-white transition-colors duration-300 group"
            >
              LET&apos;S TALK
              <ArrowUpRight
                size={17}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </TransitionLink>
          </FadeUp>
          <FadeUp delay={0.4}>
            <span className="font-body-jp text-[11px] text-white/20 tracking-[0.3em] block mt-10">
              一緒に作りましょう
            </span>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
