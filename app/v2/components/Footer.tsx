'use client';

import { useEffect, useState } from 'react';
import { TransitionLink } from './TransitionLink';
import { FadeUp } from './Reveal';

const navLinks = [
  { label: 'WORK', href: '/v2/work' },
  { label: 'ABOUT', href: '/v2/about' },
  { label: 'CONTACT', href: '/v2/contact' },
];

const socials = ['TWITTER', 'INSTAGRAM', 'DRIBBBLE', 'LINKEDIN'];

export function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Tokyo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      <div className="v2-grain" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-20 pb-10 relative z-10">
        {/* Giant wordmark */}
        <FadeUp>
          <TransitionLink href="/v2" className="block group">
            <h2 className="font-display text-[clamp(3.5rem,13vw,11rem)] leading-[0.85] tracking-[0.02em] v2-outline group-hover:text-white transition-colors duration-700 select-none">
              KUROSEI
            </h2>
          </TransitionLink>
        </FadeUp>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-16 pb-12 border-b border-white/5">
          <div>
            <span className="font-mono text-[9px] text-white/25 tracking-[0.25em] block mb-5">
              SITEMAP
            </span>
            <div className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <TransitionLink
                  key={l.href}
                  href={l.href}
                  className="v2-link font-display text-xs text-white/60 hover:text-white tracking-[0.15em] transition-colors w-fit"
                >
                  {l.label}
                </TransitionLink>
              ))}
            </div>
          </div>

          <div>
            <span className="font-mono text-[9px] text-white/25 tracking-[0.25em] block mb-5">
              SOCIAL
            </span>
            <div className="flex flex-col gap-3">
              {socials.map((s) => (
                <a
                  key={s}
                  href="#"
                  className="v2-link font-display text-xs text-white/60 hover:text-white tracking-[0.15em] transition-colors w-fit"
                  data-cursor="pointer"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <span className="font-mono text-[9px] text-white/25 tracking-[0.25em] block mb-5">
              CONTACT
            </span>
            <a
              href="mailto:hello@kurosei.studio"
              className="v2-link font-display text-xs text-white/60 hover:text-white tracking-[0.1em] transition-colors w-fit block"
              data-cursor="pointer"
            >
              HELLO@KUROSEI.STUDIO
            </a>
            <p className="font-body text-xs text-white/25 mt-3 leading-relaxed">
              Shibuya, Tokyo
              <br />
              Working worldwide
            </p>
          </div>

          <div>
            <span className="font-mono text-[9px] text-white/25 tracking-[0.25em] block mb-5">
              LOCAL TIME
            </span>
            <span className="font-mono text-lg text-white/70 tabular-nums tracking-wider">
              {time || '--:--:--'}
            </span>
            <span className="font-mono text-[9px] text-white/25 tracking-wider block mt-1">
              TOKYO / JST
            </span>
            <div className="flex items-center gap-2 mt-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f] animate-pulse" />
              <span className="font-mono text-[9px] text-white/30 tracking-wider">
                ACCEPTING PROJECTS
              </span>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <div className="flex items-center gap-3">
            <span className="text-xs text-white">★</span>
            <span className="font-mono text-[9px] text-white/25 tracking-wider">
              © 2026 KUROSEI — ALL RIGHTS RESERVED
            </span>
          </div>
          <span className="font-body-jp text-[10px] text-white/20 tracking-widest">
            黒星 — BLACK STAR
          </span>
          <span className="font-mono text-[9px] text-white/20 tracking-wider">
            DESIGN + DEVELOPMENT + MOTION
          </span>
        </div>
      </div>
    </footer>
  );
}
