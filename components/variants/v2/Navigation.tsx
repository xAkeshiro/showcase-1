'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { label: 'WORK', href: '#work' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' },
];

export function VariantNavigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Delay nav appearance by 2.5 seconds after page loads
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);
    return () => clearTimeout(timer);
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
            className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-[#222]"
          >
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Contact Link */}
                <a
                  href="#contact"
                  className="flex items-center gap-2 text-[#666] hover:text-white transition-colors"
                >
                  <span className="font-mono text-[10px] tracking-wider">GET IN TOUCH</span>
                </a>

                {/* Logo */}
                <Link href="#hero" className="absolute left-1/2 -translate-x-1/2">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 border border-[#333] flex items-center justify-center">
                      <span className="text-sm text-white">★</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-display text-sm text-white tracking-[0.3em]">
                        KUROSEI
                      </span>
                      <span className="font-mono text-[8px] text-[#555] tracking-widest">
                        CREATIVE STUDIO
                      </span>
                    </div>
                  </motion.div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="font-mono text-[10px] text-[#666] hover:text-white tracking-wider transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2"
                >
                  {isMenuOpen ? (
                    <X size={20} className="text-white" />
                  ) : (
                    <Menu size={20} className="text-white" />
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
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-display text-2xl text-white tracking-[0.2em]"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
