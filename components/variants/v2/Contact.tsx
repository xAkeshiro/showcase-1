'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const socialLinks = [
  { name: 'TWITTER', href: '#' },
  { name: 'INSTAGRAM', href: '#' },
  { name: 'DRIBBBLE', href: '#' },
  { name: 'LINKEDIN', href: '#' },
];

export function VariantContact() {
  return (
    <section id="contact" className="relative bg-white py-32 overflow-hidden">
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Background grid - subtle */}
      <div
        className="absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #f5f5f5 1px, transparent 1px),
            linear-gradient(to bottom, #f5f5f5 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Large background character */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
        <span className="font-display text-[35vw] text-black/[0.015] leading-none select-none">
          連
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-12 py-5 bg-black text-white font-display text-sm tracking-[0.2em] hover:bg-[#111] transition-all duration-300 group"
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
          <span className="font-mono text-[9px] text-[#999] tracking-wider">
            © 2026 KUROSEI
          </span>
        </div>

        {/* Section indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-[#eee] flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <span className="font-body-jp text-[10px] text-[#ccc]">
              お問い合わせ
            </span>
            <div className="w-8 h-[1px] bg-[#ddd]" />
          </div>
          <span className="font-mono text-[9px] text-[#ccc] tracking-wider">
            // 05 / CONTACT
          </span>
        </motion.div>
      </div>
    </section>
  );
}
