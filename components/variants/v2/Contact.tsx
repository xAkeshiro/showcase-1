'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  { name: 'TWITTER', href: '#' },
  { name: 'INSTAGRAM', href: '#' },
  { name: 'DRIBBBLE', href: '#' },
  { name: 'LINKEDIN', href: '#' },
];

export function VariantContact() {
  return (
    <section id="contact" className="relative bg-white py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="font-mono text-[10px] text-[#999] tracking-wider block mb-6">
            HAVE A PROJECT IN MIND?
          </span>

          <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] text-black tracking-[0.02em] leading-none mb-8">
            LET&apos;S
            <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(0,0,0,0.3)' }}>
              CREATE
            </span>
          </h2>

          <motion.a
            href="mailto:hello@kurosei.studio"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-12 py-5 bg-black text-white font-display text-sm tracking-[0.2em] hover:bg-[#222] transition-colors group"
          >
            GET IN TOUCH
            <ArrowUpRight
              size={18}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
          </motion.a>
        </motion.div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12 border-t border-b border-[#eee]">
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="font-mono text-[9px] text-[#999] tracking-wider block mb-3">
              EMAIL
            </span>
            <a
              href="mailto:hello@kurosei.studio"
              className="font-display text-lg text-black hover:text-[#666] tracking-wider transition-colors"
            >
              hello@kurosei.studio
            </a>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="font-mono text-[9px] text-[#999] tracking-wider block mb-3">
              LOCATION
            </span>
            <p className="font-display text-lg text-black tracking-wider">
              WORLDWIDE / REMOTE
            </p>
          </motion.div>

          {/* Availability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span className="font-mono text-[9px] text-[#999] tracking-wider block mb-3">
              AVAILABILITY
            </span>
            <div className="flex items-center gap-3">
              <motion.div
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-body text-sm text-[#666]">
                Open for new projects
              </span>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 border border-[#ddd] flex items-center justify-center">
              <span className="text-lg text-black">★</span>
            </div>
            <div>
              <span className="font-display text-sm text-black tracking-[0.15em] block">
                KUROSEI
              </span>
              <span className="font-body-jp text-[10px] text-[#999]">
                黒星スタジオ
              </span>
            </div>
          </motion.div>

          {/* Social Links */}
          <div className="flex items-center gap-8">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-mono text-[9px] text-[#999] hover:text-black tracking-wider transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-6">
            <span className="font-mono text-[9px] text-[#999] tracking-wider">
              © 2026 KUROSEI
            </span>
            <Link
              href="/"
              className="font-mono text-[9px] text-[#999] hover:text-black tracking-wider transition-colors"
            >
              VIEW MAIN SITE →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
