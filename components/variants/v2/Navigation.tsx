'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { label: 'WORK', href: '/v2/work' },
  { label: 'SERVICES', href: '/v2/services' },
  { label: 'ABOUT', href: '/v2/about' },
  { label: 'LAB', href: '/v2/lab' },
  { label: 'JOURNAL', href: '/v2/blog' },
];

export function VariantNavigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Delay nav appearance by 2.5 seconds after page loads
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1]
            }}
            className="fixed top-0 left-0 right-0 z-50 overflow-hidden"
          >
            {/* White base layer */}
            <div className="absolute inset-0 bg-white border-b border-[#eee]" />

            {/* Black overlay that slides in on scroll */}
            <motion.div
              className="absolute inset-0 bg-black border-b border-[#222]"
              initial={{ x: '100%' }}
              animate={{ x: isScrolled ? 0 : '100%' }}
              transition={{
                duration: 0.6,
                ease: [0.76, 0, 0.24, 1]
              }}
            />

            <div className="relative max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Contact Link */}
                <a
                  href="#contact"
                  className={`flex items-center gap-2 transition-colors duration-300 ${
                    isScrolled ? 'text-[#666] hover:text-white' : 'text-[#888] hover:text-black'
                  }`}
                >
                  <span className="font-mono text-[10px] tracking-wider">GET IN TOUCH</span>
                </a>

                {/* Logo */}
                <Link href="#hero" className="absolute left-1/2 -translate-x-1/2">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className={`w-8 h-8 border flex items-center justify-center transition-colors duration-300 ${
                      isScrolled ? 'border-[#333]' : 'border-[#ccc]'
                    }`}>
                      <span className={`text-sm transition-colors duration-300 ${
                        isScrolled ? 'text-white' : 'text-black'
                      }`}>★</span>
                    </div>
                    <div className="flex flex-col">
                      <span className={`font-display text-sm tracking-[0.3em] transition-colors duration-300 ${
                        isScrolled ? 'text-white' : 'text-black'
                      }`}>
                        KUROSEI
                      </span>
                      <span className={`font-mono text-[8px] tracking-widest transition-colors duration-300 ${
                        isScrolled ? 'text-[#555]' : 'text-[#999]'
                      }`}>
                        CREATIVE STUDIO
                      </span>
                    </div>
                  </motion.div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`font-mono text-[10px] tracking-wider transition-colors duration-300 ${
                        isScrolled ? 'text-[#666] hover:text-white' : 'text-[#888] hover:text-black'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2"
                >
                  {isMenuOpen ? (
                    <X size={20} className={isScrolled ? 'text-white' : 'text-black'} />
                  ) : (
                    <Menu size={20} className={isScrolled ? 'text-white' : 'text-black'} />
                  )}
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-display text-2xl text-white tracking-[0.2em]"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
