'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useNav } from '../components/V2LayoutProvider';
import { MetaballCanvas } from '../components/MetaballCanvas';

const socialLinks = [
  { name: 'TWITTER', href: '#' },
  { name: 'INSTAGRAM', href: '#' },
  { name: 'DRIBBBLE', href: '#' },
  { name: 'LINKEDIN', href: '#' },
];

export default function V2ContactPage() {
  const { navigate } = useNav();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Full-screen metaball background */}
      <div className="fixed inset-0">
        <MetaballCanvas
          blobColor="#1a1a1a"
          bgColor="#0a0a0a"
          opacity={1}
        />
      </div>

      {/* Scrolling ticker */}
      <div className="fixed top-16 left-0 right-0 overflow-hidden py-3 bg-white/[0.02] backdrop-blur-sm border-y border-white/5 z-20">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex gap-12 whitespace-nowrap"
        >
          {Array(10).fill('ACCEPTING NEW PROJECTS').map((text, i) => (
            <span key={i} className="font-mono text-[10px] text-white/30 tracking-widest">
              {text} ★
            </span>
          ))}
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen pt-32 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <motion.a
            href="/v2"
            onClick={(e) => navigate('/v2', e)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 font-mono text-[10px] text-white/30 hover:text-white tracking-wider transition-colors mb-16 group"
            data-cursor="pointer"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            BACK
          </motion.a>

          {/* Main layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left - Title & Info */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Large emoji */}
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="text-[8rem] md:text-[12rem] leading-none mb-8"
              >
                👋
              </motion.div>

              <span className="font-mono text-[10px] text-white/20 tracking-wider block mb-4">
                GET IN TOUCH
              </span>
              <h1
                className="font-display text-[clamp(2.5rem,7vw,5rem)] text-white tracking-[0.02em] leading-[0.9] mb-8 chromatic-text"
                data-text="SAY HELLO"
              >
                SAY
                <br />
                <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.2)' }}>
                  HELLO
                </span>
              </h1>

              <p className="font-body text-sm text-white/30 leading-relaxed mb-12 max-w-md">
                Have a project in mind? We&apos;d love to hear about it.
                Drop us a line and let&apos;s create something amazing together.
              </p>

              {/* Contact info */}
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-[9px] text-white/20 tracking-wider block mb-2">EMAIL</span>
                  <a
                    href="mailto:hello@kurosei.studio"
                    className="font-display text-lg text-white tracking-wider hover:text-white/70 transition-colors"
                    data-cursor="pointer"
                  >
                    hello@kurosei.studio
                  </a>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-white/20 tracking-wider block mb-2">LOCATION</span>
                  <p className="font-display text-lg text-white tracking-wider">TOKYO / WORLDWIDE</p>
                </div>
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name */}
                <div className="group">
                  <label className="font-mono text-[9px] text-white/30 tracking-wider block mb-3">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-white/10 py-3 font-body text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div className="group">
                  <label className="font-mono text-[9px] text-white/30 tracking-wider block mb-3">
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-white/10 py-3 font-body text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-colors"
                    placeholder="john@company.com"
                  />
                </div>

                {/* Company */}
                <div className="group">
                  <label className="font-mono text-[9px] text-white/30 tracking-wider block mb-3">
                    COMPANY
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-transparent border-b border-white/10 py-3 font-body text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-colors"
                    placeholder="Company Inc."
                  />
                </div>

                {/* Message */}
                <div className="group">
                  <label className="font-mono text-[9px] text-white/30 tracking-wider block mb-3">
                    MESSAGE *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border-b border-white/10 py-3 font-body text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-white text-black font-display text-sm tracking-[0.2em] hover:bg-white/90 transition-colors group mt-12"
                  data-cursor="pointer"
                >
                  SAY HI
                  <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-32 py-12 border-t border-white/5"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center">
                  <span className="text-lg text-white">★</span>
                </div>
                <div>
                  <span className="font-display text-sm text-white tracking-[0.15em] block">KUROSEI</span>
                  <span className="font-body-jp text-[10px] text-white/20">黒星スタジオ</span>
                </div>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-8">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="font-mono text-[9px] text-white/20 hover:text-white/50 tracking-wider transition-colors"
                    data-cursor="pointer"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Copyright */}
              <span className="font-mono text-[9px] text-white/15 tracking-wider">© 2026 KUROSEI</span>
            </div>
          </motion.footer>
        </div>
      </div>
    </div>
  );
}
