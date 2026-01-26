'use client';

import { motion } from 'framer-motion';
import { CornerFrame } from '@/components/ui/CornerFrame';
import { Mail, MapPin, ArrowUpRight } from 'lucide-react';

const footerLinks = [
  {
    title: 'NAVIGATE',
    titleJp: 'ナビゲート',
    links: [
      { label: 'Home', href: '#hero' },
      { label: 'Work', href: '#work' },
      { label: 'Projects', href: '#projects' },
      { label: 'Services', href: '#services' },
      { label: 'Archive', href: '#archive' },
    ],
  },
  {
    title: 'SERVICES',
    titleJp: 'サービス',
    links: [
      { label: 'Web Development', href: '#services' },
      { label: 'Brand Identity', href: '#services' },
      { label: 'Motion Design', href: '#services' },
      { label: 'Creative Direction', href: '#services' },
    ],
  },
  {
    title: 'CONNECT',
    titleJp: 'コネクト',
    links: [
      { label: 'Twitter / X', href: '#' },
      { label: 'Instagram', href: '#' },
      { label: 'Dribbble', href: '#' },
      { label: 'LinkedIn', href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer id="contact" className="relative bg-black border-t border-[#1a1a1a]">
      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Left - CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-[10px] text-[#444] tracking-wider block mb-4">
              LET&apos;S WORK TOGETHER
            </span>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-white tracking-[0.1em] leading-tight mb-6">
              START A<br />PROJECT
            </h2>
            <p className="font-body-jp text-sm text-[#555] mb-8">
              プロジェクトを始めましょう
            </p>
            <p className="font-body text-sm text-[#666] max-w-md mb-8 leading-relaxed">
              Have a project in mind? We&apos;d love to hear about it.
              Get in touch and let&apos;s create something extraordinary together.
            </p>

            <motion.a
              href="mailto:hello@kurosei.studio"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-display text-xs tracking-[0.2em] hover:bg-[#f0f0f0] transition-colors group"
            >
              GET IN TOUCH
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Right - Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:pl-16"
          >
            <div className="space-y-8">
              {/* Email */}
              <div className="group">
                <div className="flex items-center gap-3 mb-2">
                  <Mail size={14} className="text-[#444]" />
                  <span className="font-mono text-[10px] text-[#444] tracking-wider">
                    EMAIL
                  </span>
                </div>
                <a
                  href="mailto:hello@kurosei.studio"
                  className="font-display text-lg text-[#888] hover:text-white tracking-wider transition-colors"
                >
                  hello@kurosei.studio
                </a>
              </div>

              {/* Location */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <MapPin size={14} className="text-[#444]" />
                  <span className="font-mono text-[10px] text-[#444] tracking-wider">
                    LOCATION
                  </span>
                </div>
                <p className="font-display text-lg text-[#888] tracking-wider">
                  WORLDWIDE / REMOTE
                </p>
                <p className="font-body-jp text-sm text-[#444] mt-1">
                  世界中・リモート
                </p>
              </div>

              {/* Availability */}
              <div className="pt-4 border-t border-[#1a1a1a]">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-2 h-2 bg-green-500 rounded-full"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="font-mono text-[10px] text-[#666] tracking-wider">
                    AVAILABLE FOR NEW PROJECTS
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-12 border-t border-[#1a1a1a]">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 border border-[#333] flex items-center justify-center">
                <span className="text-lg">★</span>
              </div>
              <div>
                <p className="font-display text-xs text-white tracking-[0.15em]">
                  KUROSEI
                </p>
                <p className="font-body-jp text-[10px] text-[#555]">
                  黒星
                </p>
              </div>
            </div>
            <p className="font-body text-xs text-[#444] max-w-xs leading-relaxed">
              Creative studio specializing in web development, brand identity, and motion design.
            </p>
          </motion.div>

          {/* Link Columns */}
          {footerLinks.map((col, colIndex) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (colIndex + 1), duration: 0.5 }}
            >
              <h4 className="font-display text-[10px] text-[#555] tracking-[0.2em] mb-1">
                {col.title}
              </h4>
              <p className="font-body-jp text-[9px] text-[#333] mb-4">
                {col.titleJp}
              </p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-body text-xs text-[#666] hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <p className="font-mono text-[10px] text-[#333] tracking-wider">
              © 2026 KUROSEI STUDIO
            </p>
            <span className="hidden md:inline font-mono text-[10px] text-[#222]">
              /
            </span>
            <p className="hidden md:inline font-body-jp text-[10px] text-[#333]">
              黒星スタジオ
            </p>
          </div>

          <div className="flex items-center gap-6">
            <span className="font-mono text-[9px] text-[#333] tracking-wider">
              DESIGN. DEVELOP. MOTION.
            </span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 flex items-center justify-center"
            >
              <span className="text-[10px] text-[#333]">★</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Corner Frame */}
      <CornerFrame className="m-4" />
    </footer>
  );
}
