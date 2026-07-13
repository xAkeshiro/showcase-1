'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useNav } from './V2LayoutProvider';

const links = [
  { label: 'WORK', href: '/v2/work' },
  { label: 'ABOUT', href: '/v2/about' },
  { label: 'CONTACT', href: '/v2/contact' },
];

export function Nav() {
  const pathname = usePathname();
  const { navigate } = useNav();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#050505]/70 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/v2"
          onClick={(e) => navigate('/v2', e)}
          className="flex items-center gap-3 group"
          data-cursor="pointer"
        >
          <div className="relative w-8 h-8 border border-white/15 flex items-center justify-center group-hover:border-[#00f] transition-colors duration-300">
            <motion.div
              className="absolute inset-0 border border-white/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            />
            <span className="text-[13px] text-white leading-none">★</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xs text-white tracking-[0.25em] leading-none">
              KUROSEI
            </span>
            <span className="font-body-jp text-[8px] text-white/30 tracking-widest mt-1">
              黒星スタジオ
            </span>
          </div>
        </a>

        {/* Nav links — clicks pass the event so the transition knows its origin */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/v2' && pathname.startsWith(link.href));
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => navigate(link.href, e)}
                className={`relative font-mono text-[10px] tracking-[0.2em] transition-colors duration-300 py-1 ${
                  isActive ? 'text-white' : 'text-white/40 hover:text-white'
                }`}
                data-cursor="pointer"
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-[2px] left-0 right-0 h-[1px] bg-[#00f]"
                    transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Status + exit */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f] animate-pulse" />
            <span className="font-mono text-[9px] text-white/30 tracking-wider">
              AVAILABLE Q3
            </span>
          </div>
          <Link
            href="/"
            className="font-mono text-[9px] text-white/25 hover:text-white/60 tracking-wider transition-colors"
            data-cursor="pointer"
          >
            ← MAIN SITE
          </Link>
        </div>
      </div>
    </nav>
  );
}
