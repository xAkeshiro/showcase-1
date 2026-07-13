'use client';

import { ArrowUpRight } from 'lucide-react';
import { MetaballCanvas } from '../components/MetaballCanvas';
import { Marquee } from '../components/Marquee';
import { TransitionLink } from '../components/TransitionLink';
import { FadeUp, RevealText, SectionLabel } from '../components/Reveal';
import { Footer } from '../components/Footer';

const principles = [
  {
    n: '01',
    title: 'MOTION FIRST',
    jp: '動きから',
    desc: 'We design in motion before we design in stills. If it can’t hold attention moving, it won’t hold attention at all.',
  },
  {
    n: '02',
    title: 'SHOW, DON’T CLAIM',
    jp: '証明',
    desc: 'Live data over stock renders. Real measurements over adjectives. Every claim on screen should be able to defend itself.',
  },
  {
    n: '03',
    title: 'CRAFT AT SPEED',
    jp: '速さと質',
    desc: 'Small senior teams, custom tooling, no hand-offs. The people who imagine the work are the people who ship it.',
  },
  {
    n: '04',
    title: 'PERFORMANCE IS DESIGN',
    jp: '性能',
    desc: 'A beautiful site that loads slowly is a broken site. 60fps and sub-second paints are design requirements, not engineering favors.',
  },
];

const team = [
  { name: 'REI NAKAMURA', role: 'Founder / Creative Director', jp: '中村レイ' },
  { name: 'SORA TANAKA', role: 'Design Lead', jp: '田中ソラ' },
  { name: 'KENJI WATANABE', role: 'Technical Director', jp: '渡辺ケンジ' },
  { name: 'YUKI MORI', role: 'Motion Lead', jp: '森ユキ' },
];

const awards = [
  { name: 'AWWWARDS — SITE OF THE DAY', count: '12×' },
  { name: 'FWA — FAVOURITE WEBSITE AWARD', count: '06×' },
  { name: 'CSS DESIGN AWARDS — WOTD', count: '08×' },
  { name: 'WEBBY AWARDS — NOMINEE', count: '03×' },
  { name: 'D&AD — SHORTLIST', count: '02×' },
];

const locations = [
  { city: 'TOKYO', jp: '東京', role: 'Headquarters — Shibuya' },
  { city: 'NEW YORK', jp: 'ニューヨーク', role: 'Satellite studio' },
  { city: 'LONDON', jp: 'ロンドン', role: 'Production partner' },
];

const stats = [
  { value: '2018', label: 'FOUNDED' },
  { value: '14', label: 'PEOPLE WORLDWIDE' },
  { value: '50+', label: 'PROJECTS SHIPPED' },
  { value: '24', label: 'INTERNATIONAL AWARDS' },
];

export default function V2AboutPage() {
  return (
    <div className="bg-[#050505] min-h-screen">
      {/* ═══ HERO ═══ */}
      <header className="relative pt-36 pb-24 overflow-hidden">
        <div className="v2-grid" />
        <div className="v2-grain" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
          <span className="font-display text-[30vw] text-white/[0.015] leading-none select-none">私</span>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionLabel label="ABOUT THE STUDIO" index="EST. 2018" className="mb-10" />

          <h1 className="font-display text-[clamp(2.6rem,8.5vw,7.5rem)] text-white tracking-[0.02em] leading-[0.9] mb-12">
            <RevealText>DIGITAL</RevealText>
            <RevealText delay={0.1}>
              <span className="v2-ghost" data-text="PRODUCTION">PRODUCTION</span>
            </RevealText>
            <RevealText delay={0.2}>
              <span className="v2-outline">STUDIO</span>
              <span className="text-[#00f]">.</span>
            </RevealText>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
            <FadeUp delay={0.3}>
              <p className="font-body text-sm text-white/45 leading-[1.9]">
                KUROSEI is an independent studio founded in Tokyo in 2018. We work at
                the intersection of design, engineering, and motion — building digital
                experiences for brands that refuse to look like everyone else.
              </p>
            </FadeUp>
            <FadeUp delay={0.4}>
              <p className="font-body text-sm text-white/45 leading-[1.9]">
                Fourteen people across three time zones. No account managers, no
                hand-offs, no decks that die in a drive. Just senior practitioners who
                take work from first sketch to final deploy.
              </p>
            </FadeUp>
          </div>
        </div>
      </header>

      {/* ═══ STATS ═══ */}
      <section className="border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <FadeUp
                key={stat.label}
                delay={i * 0.08}
                className={`py-12 px-6 text-center border-white/5 ${i > 0 ? 'border-l' : ''} ${i > 1 ? 'max-lg:border-t max-lg:border-l-0' : ''} ${i === 3 ? 'max-lg:border-l' : ''}`}
              >
                <span className="font-display text-3xl md:text-4xl text-white block mb-3 tabular-nums">
                  {stat.value}
                </span>
                <span className="font-mono text-[9px] text-white/30 tracking-[0.25em]">{stat.label}</span>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PHILOSOPHY ═══ */}
      <section className="relative py-32 overflow-hidden">
        <MetaballCanvas opacity={0.55} />
        <div className="relative z-10 max-w-[1000px] mx-auto px-6 md:px-10 text-center">
          <FadeUp>
            <span className="font-display text-6xl text-[#00f] leading-none block mb-8">&ldquo;</span>
            <blockquote className="font-display text-[clamp(1.4rem,3.4vw,2.6rem)] text-white/85 leading-[1.45] tracking-wide">
              A black star absorbs everything around it — noise, trend, decoration —
              and gives back only what matters.
            </blockquote>
            <div className="flex items-center justify-center gap-4 mt-10">
              <span className="w-10 h-[1px] bg-white/15" />
              <span className="font-body-jp text-xs text-white/30 tracking-[0.3em]">黒星の哲学</span>
              <span className="w-10 h-[1px] bg-white/15" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══ PRINCIPLES ═══ */}
      <section className="py-28 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionLabel label="HOW WE WORK" index="// 02" className="mb-14" />
          <div>
            {principles.map((p, i) => (
              <FadeUp key={p.n} delay={i * 0.05}>
                <div className="group grid grid-cols-1 md:grid-cols-[60px_1fr_1.2fr] gap-4 md:gap-10 py-8 border-t border-white/8 last:border-b hover:bg-white/[0.015] transition-colors duration-300 px-2 md:px-4 items-baseline">
                  <span className="font-mono text-[10px] text-white/25 group-hover:text-[#00f] transition-colors tracking-wider">
                    {p.n}
                  </span>
                  <div className="flex items-baseline gap-4">
                    <h3 className="font-display text-lg md:text-2xl text-white/80 group-hover:text-white tracking-[0.08em] transition-colors">
                      {p.title}
                    </h3>
                    <span className="font-body-jp text-[10px] text-white/25 hidden md:block">{p.jp}</span>
                  </div>
                  <p className="font-body text-xs md:text-sm text-white/30 group-hover:text-white/50 leading-relaxed transition-colors">
                    {p.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TEAM ═══ */}
      <section className="py-28 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionLabel label="THE TEAM" index="// 03" className="mb-14" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/8">
            {team.map((member) => (
              <div
                key={member.name}
                className="group border-r border-b border-white/8 p-8 hover:bg-white/[0.02] transition-colors duration-300"
              >
                <div className="aspect-square border border-white/8 mb-6 flex items-center justify-center relative overflow-hidden group-hover:border-[#00f]/30 transition-colors">
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                  <span className="text-3xl text-white/15 group-hover:text-[#00f]/60 transition-colors duration-500">★</span>
                </div>
                <h3 className="font-display text-sm text-white tracking-[0.12em] mb-1">{member.name}</h3>
                <span className="font-body-jp text-[10px] text-white/25 block mb-2">{member.jp}</span>
                <span className="font-mono text-[9px] text-white/35 tracking-wider">{member.role}</span>
              </div>
            ))}
          </div>
          <FadeUp delay={0.2}>
            <p className="font-mono text-[10px] text-white/25 tracking-[0.2em] mt-8 text-center">
              + 10 SENIOR COLLABORATORS ACROSS TOKYO, NEW YORK, AND LONDON
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══ AWARDS + LOCATIONS ═══ */}
      <section className="py-28 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <SectionLabel label="RECOGNITION" className="mb-12" />
            <div>
              {awards.map((award, i) => (
                <FadeUp key={award.name} delay={i * 0.05}>
                  <div className="group flex items-center justify-between py-5 border-t border-white/8 last:border-b hover:bg-white/[0.015] transition-colors px-2">
                    <span className="font-display text-xs md:text-sm text-white/60 group-hover:text-white tracking-[0.12em] transition-colors">
                      {award.name}
                    </span>
                    <span className="font-mono text-xs text-[#3333ff] tabular-nums">{award.count}</span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          <div>
            <SectionLabel label="LOCATIONS" className="mb-12" />
            <div className="space-y-10">
              {locations.map((loc, i) => (
                <FadeUp key={loc.city} delay={i * 0.08}>
                  <div className="group">
                    <div className="flex items-baseline gap-4 mb-2">
                      <h3 className="font-display text-2xl md:text-3xl text-white/80 group-hover:text-white tracking-[0.08em] transition-all duration-500 group-hover:tracking-[0.14em]">
                        {loc.city}
                      </h3>
                      <span className="font-body-jp text-xs text-white/25">{loc.jp}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-[1px] bg-[#00f]" />
                      <span className="font-mono text-[9px] text-white/35 tracking-wider">{loc.role}</span>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MANIFESTO MARQUEE ═══ */}
      <div className="border-y border-white/5 py-5">
        <Marquee duration={32}>
          {['NO TEMPLATES', 'NO HAND-OFFS', 'NO NOISE', '黒星スタジオ', 'ONLY WHAT MATTERS'].map((word) => (
            <span key={word} className="flex items-center">
              <span className="font-display text-xl md:text-2xl text-white/15 tracking-[0.2em] px-8">
                {word}
              </span>
              <span className="text-[#00f] text-xs">★</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* ═══ CTA ═══ */}
      <section className="py-28 text-center">
        <FadeUp>
          <span className="font-mono text-[10px] text-white/30 tracking-[0.3em] block mb-8">
            WORK WITH US
          </span>
          <TransitionLink
            href="/v2/contact"
            className="inline-flex items-center gap-3 px-12 py-5 border border-white/15 text-white font-display text-sm tracking-[0.25em] hover:bg-[#00f] hover:border-[#00f] transition-colors duration-300 group"
          >
            START A PROJECT
            <ArrowUpRight size={17} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </TransitionLink>
        </FadeUp>
      </section>

      <Footer />
    </div>
  );
}
