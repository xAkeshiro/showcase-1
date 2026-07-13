'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { MetaballCanvas } from '../components/MetaballCanvas';
import { Marquee } from '../components/Marquee';
import { FadeUp, RevealText, SectionLabel } from '../components/Reveal';
import { Footer } from '../components/Footer';

const EASE = [0.76, 0, 0.24, 1] as const;

const budgets = ['< $25K', '$25K – $75K', '$75K – $150K', '$150K+'];

const faqs = [
  {
    q: 'WHAT DOES A TYPICAL ENGAGEMENT LOOK LIKE?',
    a: 'Most projects run 8–16 weeks: two weeks of strategy and definition, then design and build in weekly interleaved sprints. You see moving work by week three, not a deck.',
  },
  {
    q: 'DO YOU WORK WITH IN-HOUSE TEAMS?',
    a: 'Constantly. We ship design systems, motion libraries, and tooling your team runs without us — several clients’ designers use our deliverables daily.',
  },
  {
    q: 'WHERE ARE YOU BASED?',
    a: 'Headquartered in Shibuya, Tokyo, with people in New York and London. We overlap with every major time zone and run projects fully remote.',
  },
];

export default function V2ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', budget: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const field =
    'w-full bg-transparent border-b border-white/10 py-3.5 font-body text-sm text-white placeholder:text-white/20 focus:border-[#00f] focus:outline-none transition-colors duration-300';

  return (
    <div className="bg-[#050505] min-h-screen relative">
      {/* Fixed metaball backdrop */}
      <div className="fixed inset-0 pointer-events-none">
        <MetaballCanvas opacity={0.65} />
      </div>

      {/* Ticker */}
      <div className="relative z-10 mt-16 border-y border-white/5 py-3 bg-[#050505]/60 backdrop-blur-sm">
        <Marquee duration={22}>
          {Array(6)
            .fill('ACCEPTING NEW PROJECTS — Q3 2026')
            .map((text, i) => (
              <span key={i} className="flex items-center">
                <span className="font-mono text-[10px] text-white/30 tracking-[0.3em] px-6">{text}</span>
                <span className="text-[#00f] text-[10px]">★</span>
              </span>
            ))}
        </Marquee>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pt-20 pb-28">
        <SectionLabel label="GET IN TOUCH" index="お問い合わせ" className="mb-10" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <h1 className="font-display text-[clamp(3rem,9vw,7.5rem)] text-white tracking-[0.02em] leading-[0.85] mb-10">
              <RevealText>SAY</RevealText>
              <RevealText delay={0.1}>
                <span className="v2-outline">HELLO</span>
                <span className="text-[#00f]">.</span>
              </RevealText>
            </h1>

            <FadeUp delay={0.25}>
              <p className="font-body text-sm text-white/40 leading-[1.9] max-w-md mb-14">
                Tell us what you&apos;re building. We take on a small number of projects
                each quarter so every engagement gets senior attention from first
                call to final deploy.
              </p>
            </FadeUp>

            <FadeUp delay={0.35} className="space-y-8">
              <div>
                <span className="font-mono text-[9px] text-white/25 tracking-[0.25em] block mb-2">EMAIL</span>
                <a
                  href="mailto:hello@kurosei.studio"
                  className="v2-link font-display text-lg text-white tracking-wider w-fit block"
                  data-cursor="pointer"
                >
                  HELLO@KUROSEI.STUDIO
                </a>
              </div>
              <div>
                <span className="font-mono text-[9px] text-white/25 tracking-[0.25em] block mb-2">STUDIO</span>
                <p className="font-display text-sm text-white/60 tracking-wider">SHIBUYA, TOKYO — 東京</p>
              </div>
              <div>
                <span className="font-mono text-[9px] text-white/25 tracking-[0.25em] block mb-2">RESPONSE TIME</span>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f] animate-pulse" />
                  <span className="font-body text-sm text-white/50">Within 48 hours, always a human</span>
                </div>
              </div>
            </FadeUp>

            {/* FAQ */}
            <FadeUp delay={0.45} className="mt-16">
              <span className="font-mono text-[9px] text-white/25 tracking-[0.25em] block mb-6">COMMON QUESTIONS</span>
              <div>
                {faqs.map((faq, i) => (
                  <div key={i} className="border-t border-white/8 last:border-b">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between py-5 text-left group"
                      data-cursor="pointer"
                    >
                      <span className="font-display text-[11px] md:text-xs text-white/60 group-hover:text-white tracking-[0.12em] transition-colors pr-4">
                        {faq.q}
                      </span>
                      <span
                        className={`font-mono text-sm shrink-0 transition-all duration-300 ${openFaq === i ? 'text-[#00f] rotate-45' : 'text-white/30'}`}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-500 ease-out ${openFaq === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                    >
                      <div className="overflow-hidden">
                        <p className="font-body text-xs text-white/35 leading-[1.8] pb-6 pr-8">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Right — form */}
          <FadeUp delay={0.2}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="border border-white/10 p-12 text-center flex flex-col items-center justify-center min-h-[480px]"
                >
                  <div className="w-16 h-16 border border-[#00f] flex items-center justify-center mb-8">
                    <Check size={24} className="text-[#00f]" />
                  </div>
                  <h2 className="font-display text-2xl text-white tracking-[0.1em] mb-4">MESSAGE SENT</h2>
                  <p className="font-body text-sm text-white/40 leading-relaxed max-w-xs mb-2">
                    Thanks — we&apos;ll get back to you within 48 hours.
                  </p>
                  <span className="font-body-jp text-[11px] text-white/25 tracking-widest">
                    ありがとうございました
                  </span>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="space-y-9"
                >
                  <div>
                    <label className="font-mono text-[9px] text-white/30 tracking-[0.25em] block mb-2">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={field}
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
                    <div>
                      <label className="font-mono text-[9px] text-white/30 tracking-[0.25em] block mb-2">
                        EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={field}
                        placeholder="jane@company.com"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] text-white/30 tracking-[0.25em] block mb-2">
                        COMPANY
                      </label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className={field}
                        placeholder="Company Inc."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[9px] text-white/30 tracking-[0.25em] block mb-4">
                      PROJECT BUDGET
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {budgets.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setForm({ ...form, budget: b })}
                          className={`font-mono text-[10px] tracking-[0.15em] px-4 py-2.5 border transition-all duration-300 ${
                            form.budget === b
                              ? 'bg-[#00f] border-[#00f] text-white'
                              : 'border-white/10 text-white/40 hover:border-[#00f]/60 hover:text-white/70'
                          }`}
                          data-cursor="pointer"
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[9px] text-white/30 tracking-[0.25em] block mb-2">
                      ABOUT THE PROJECT *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${field} resize-none`}
                      placeholder="What are you building, and when does it need to exist?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-white text-black font-display text-sm tracking-[0.25em] hover:bg-[#00f] hover:text-white transition-colors duration-300 group"
                    data-cursor="pointer"
                  >
                    SEND MESSAGE
                    <ArrowUpRight
                      size={17}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </FadeUp>
        </div>
      </div>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
