'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useNav } from './V2LayoutProvider';

const navLinks = [
  { label: 'WORK', href: '/v2/work' },
  { label: 'ABOUT', href: '/v2/about' },
  { label: 'CONTACT', href: '/v2/contact' },
];

export function Nav() {
  const pathname = usePathname();
  const { navigate } = useNav();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/60 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo - navigates to /v2 home */}
        <a
          href="/v2"
          onClick={(e) => navigate('/v2', e)}
          className="flex items-center gap-3 group"
          data-cursor="pointer"
        >
          <div className="relative w-8 h-8 border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors">
            <motion.div
              className="absolute inset-0 border border-white/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <span className="text-sm text-white">★</span>
          </div>
          <span className="font-display text-xs text-white tracking-[0.2em] group-hover:tracking-[0.25em] transition-all">
            KUROSEI
          </span>
        </a>

        {/* Main nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => navigate(link.href, e)}
                className={`relative font-mono text-[10px] tracking-wider transition-colors ${
                  isActive ? 'text-white' : 'text-white/40 hover:text-white'
                }`}
                data-cursor="pointer"
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[1px] bg-white"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Back to main site - regular link, no transition */}
        <a
          href="/"
          className="font-mono text-[9px] text-white/30 hover:text-white/60 tracking-wider transition-colors"
          data-cursor="pointer"
        >
          ← MAIN SITE
        </a>
      </div>
    </nav>
  );
}
