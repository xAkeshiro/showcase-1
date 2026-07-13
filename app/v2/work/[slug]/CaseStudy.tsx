'use client';

import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { TransitionLink } from '../../components/TransitionLink';
import { FadeUp, RevealText, SectionLabel } from '../../components/Reveal';
import { Footer } from '../../components/Footer';
import { MetaballCanvas } from '../../components/MetaballCanvas';
import { VideoPlaceholder } from '@/components/ui/VideoPlaceholder';
import { getProject, getNextProject } from '../../lib/projects';

export function CaseStudy({ slug }: { slug: string }) {
  const project = getProject(slug)!;
  const next = getNextProject(slug);

  return (
    <div className="bg-[#050505] min-h-screen">
      {/* ═══ HERO ═══ */}
      <header className="relative pt-32 pb-14 overflow-hidden">
        <div className="v2-grid" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
          <FadeUp>
            <TransitionLink
              href="/v2/work"
              className="inline-flex items-center gap-2 font-mono text-[10px] text-white/30 hover:text-white tracking-[0.2em] transition-colors mb-14 group"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform text-[#00f]" />
              ALL WORKS
            </TransitionLink>
          </FadeUp>

          <FadeUp delay={0.05} className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] text-[#3333ff] tracking-[0.25em]">
              {project.category}
            </span>
            <span className="w-8 h-[1px] bg-white/15" />
            <span className="font-mono text-[10px] text-white/30 tracking-[0.25em]">
              {project.year}
            </span>
            <span className="w-8 h-[1px] bg-white/15" />
            <span className="font-mono text-[10px] text-white/30 tracking-[0.25em]">
              {project.sector.toUpperCase()}
            </span>
          </FadeUp>

          <h1 className="font-display text-[clamp(3rem,11vw,9rem)] text-white tracking-[0.02em] leading-[0.85] mb-6">
            <RevealText>{project.title}</RevealText>
            <RevealText delay={0.12}>
              <span className="v2-outline">{project.subtitle}</span>
            </RevealText>
          </h1>

          <FadeUp delay={0.3}>
            <p className="font-body text-base md:text-lg text-white/50 max-w-2xl leading-relaxed">
              {project.tagline}
            </p>
          </FadeUp>

          {/* Meta grid */}
          <FadeUp delay={0.4} className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-white/8">
            <div>
              <span className="font-mono text-[9px] text-white/25 tracking-[0.25em] block mb-2">CLIENT</span>
              <span className="font-display text-sm text-white/80 tracking-wider">{project.client}</span>
            </div>
            <div>
              <span className="font-mono text-[9px] text-white/25 tracking-[0.25em] block mb-2">YEAR</span>
              <span className="font-display text-sm text-white/80 tracking-wider">{project.year}</span>
            </div>
            <div>
              <span className="font-mono text-[9px] text-white/25 tracking-[0.25em] block mb-2">SECTOR</span>
              <span className="font-display text-sm text-white/80 tracking-wider">{project.sector}</span>
            </div>
            <div>
              <span className="font-mono text-[9px] text-white/25 tracking-[0.25em] block mb-2">SERVICES</span>
              <div className="flex flex-col gap-1">
                {project.services.map((s) => (
                  <span key={s} className="font-body text-xs text-white/50">{s}</span>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </header>

      {/* ═══ COVER ═══ */}
      <FadeUp className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="border border-white/8 overflow-hidden">
          <VideoPlaceholder
            prompt={project.cover.prompt}
            aspectRatio="ultrawide"
            theme="dark"
            label={`${project.title} — COVER`}
          />
        </div>
      </FadeUp>

      {/* ═══ OVERVIEW ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-28">
        <SectionLabel label="OVERVIEW" index="// 01" className="mb-14" />

        <FadeUp>
          <p className="font-display text-[clamp(1.2rem,2.6vw,2rem)] text-white/85 leading-[1.4] tracking-wide max-w-4xl mb-24">
            {project.description}
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20">
          <FadeUp>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[10px] text-[#3333ff] tracking-[0.25em]">THE CHALLENGE</span>
              <span className="font-body-jp text-[10px] text-white/20">課題</span>
            </div>
            <p className="font-body text-sm text-white/45 leading-[1.9]">{project.challenge}</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[10px] text-[#3333ff] tracking-[0.25em]">THE APPROACH</span>
              <span className="font-body-jp text-[10px] text-white/20">手法</span>
            </div>
            <p className="font-body text-sm text-white/45 leading-[1.9]">{project.approach}</p>
          </FadeUp>
        </div>
      </section>

      {/* ═══ MEDIA ═══ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-28">
        <SectionLabel label="SELECTED FRAMES" index="// 02" className="mb-14" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.media.map((m, i) => (
            <FadeUp
              key={i}
              delay={i * 0.08}
              className={m.aspect === 'video' || m.aspect === 'ultrawide' ? 'md:col-span-2' : ''}
            >
              <div className="border border-white/8 overflow-hidden hover:border-[#00f]/30 transition-colors duration-500">
                <VideoPlaceholder
                  prompt={m.prompt}
                  aspectRatio={m.aspect}
                  theme="dark"
                  label={`${project.title} — ${String(i + 1).padStart(2, '0')}`}
                />
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ═══ RESULTS ═══ */}
      <section className="relative border-t border-white/5 overflow-hidden">
        <MetaballCanvas opacity={0.5} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 py-28">
          <SectionLabel label="RESULTS" index="// 03" className="mb-14" />

          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-white/10">
            {project.metrics.map((metric, i) => (
              <FadeUp key={metric.label} delay={i * 0.1}>
                <div className="border-r border-b border-white/10 py-16 px-8 text-center hover:bg-white/[0.02] transition-colors duration-300">
                  <span className="font-display text-[clamp(2.4rem,5vw,4rem)] text-[#3333ff] block mb-4 tabular-nums leading-none">
                    {metric.value}
                  </span>
                  <span className="font-mono text-[9px] text-white/35 tracking-[0.25em]">
                    {metric.label}
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.2}>
            <p className="font-body text-sm text-white/45 leading-[1.9] max-w-2xl mt-16">
              {project.outcome}
            </p>
          </FadeUp>

          {project.quote && (
            <FadeUp delay={0.3} className="mt-20 max-w-3xl">
              <span className="font-display text-5xl text-[#00f] leading-none block mb-6">&ldquo;</span>
              <blockquote className="font-display text-[clamp(1.1rem,2.4vw,1.8rem)] text-white/80 leading-[1.5] tracking-wide mb-8">
                {project.quote.text}
              </blockquote>
              <div className="flex items-center gap-4">
                <span className="w-10 h-[1px] bg-[#00f]" />
                <div>
                  <span className="font-display text-xs text-white tracking-[0.15em] block">
                    {project.quote.author.toUpperCase()}
                  </span>
                  <span className="font-mono text-[9px] text-white/30 tracking-wider">
                    {project.quote.role}
                  </span>
                </div>
              </div>
            </FadeUp>
          )}
        </div>
      </section>

      {/* ═══ NEXT PROJECT ═══ */}
      <TransitionLink
        href={`/v2/work/${next.slug}`}
        className="group block relative border-t border-white/5 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#00f] opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32 relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] text-white/30 tracking-[0.3em]">NEXT PROJECT</span>
            <span className="font-body-jp text-[10px] text-white/20">次のプロジェクト</span>
          </div>
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(2.5rem,9vw,7.5rem)] leading-[0.9] tracking-[0.02em] v2-outline group-hover:text-white transition-colors duration-700">
              {next.title}
              <span className="text-[clamp(1.2rem,4vw,3rem)] text-white/20 ml-4">{next.subtitle}</span>
            </h2>
            <ArrowUpRight
              size={44}
              className="shrink-0 text-white/20 group-hover:text-[#00f] group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-500 mb-2"
            />
          </div>
          <span className="font-mono text-[9px] text-white/25 tracking-[0.25em] block mt-6">
            {next.category} — {next.year}
          </span>
        </div>
      </TransitionLink>

      <Footer />
    </div>
  );
}
