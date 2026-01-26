'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const navItems = [
  { en: 'INDEX', jp: '首页', href: '#hero' },
  { en: 'INFORMATION', jp: '情報', href: '#news' },
  { en: 'OPERATOR', jp: '干员', href: '#characters' },
  { en: 'WORLD', jp: '設定', href: '#world' },
  { en: 'MEDIA', jp: 'メディア', href: '#media' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'bg-black/95 backdrop-blur-sm' : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-[#333] flex items-center justify-center">
              <span className="font-display text-xs text-white">AK</span>
            </div>
            <span className="font-display text-xs text-white tracking-[0.2em] hidden sm:block">
              ARKNIGHTS
            </span>
          </div>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <li key={item.en}>
                <a
                  href={item.href}
                  className="group flex flex-col items-center"
                >
                  <span className="font-display text-[11px] text-[#888] tracking-[0.15em] group-hover:text-white transition-colors duration-300">
                    {item.en}
                  </span>
                  <span className="font-body-jp text-[9px] text-[#444] mt-0.5">
                    {item.jp}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button className="font-mono text-[10px] text-[#666] hover:text-white tracking-wider transition-colors">
              EN / JP
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center text-white"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Bottom border */}
        {scrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#222]" />
        )}
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/98 md:hidden transition-opacity duration-300',
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item) => (
            <a
              key={item.en}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="group flex flex-col items-center"
            >
              <span className="font-display text-lg text-[#888] tracking-[0.2em] group-hover:text-white transition-colors">
                {item.en}
              </span>
              <span className="font-body-jp text-sm text-[#444] mt-1">
                {item.jp}
              </span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
