'use client';

import { motion } from 'framer-motion';
import { VideoPlaceholder } from '@/components/ui/VideoPlaceholder';
import { useState, useEffect } from 'react';

const services = [
  { name: 'WEB DEVELOPMENT', nameJp: 'ウェブ開発' },
  { name: 'BRAND IDENTITY', nameJp: 'ブランド' },
  { name: 'MOTION DESIGN', nameJp: 'モーション' },
  { name: 'CREATIVE DIRECTION', nameJp: '方向性' },
];

const stats = [
  { value: '50+', label: 'Projects' },
  { value: '30+', label: 'Clients' },
  { value: '4', label: 'Years' },
];

const processSteps = [
  {
    num: '01',
    title: 'DISCOVER',
    titleJp: 'ディスカバー',
    desc: 'Understanding your vision and goals',
    detail: 'We immerse ourselves in your brand, audience, and objectives. Through research and strategic workshops, we uncover the insights that drive every decision forward.',
  },
  {
    num: '02',
    title: 'DESIGN',
    titleJp: 'デザイン',
    desc: 'Crafting the visual direction',
    detail: 'From wireframes to high-fidelity prototypes, we shape every visual element with intention. Each design choice is purposeful, balancing aesthetics with usability.',
  },
  {
    num: '03',
    title: 'DEVELOP',
    titleJp: 'デベロップ',
    desc: 'Building with precision',
    detail: 'Clean, performant code meets thoughtful architecture. We build for scale, speed, and maintainability — ensuring your product stands the test of time.',
  },
  {
    num: '04',
    title: 'DELIVER',
    titleJp: 'デリバー',
    desc: 'Launching and refining',
    detail: 'Launch is just the beginning. We ensure smooth deployment, monitor performance, and iterate based on real user data to continuously improve.',
  },
];

export function VariantAbout() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section id="about" className="relative bg-black overflow-hidden">
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #fff 1px, transparent 1px),
            linear-gradient(to bottom, #fff 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Large background character */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none">
        <span className="font-display text-[40vw] text-white/[0.015] leading-none select-none">
          私
        </span>
      </div>

      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
        }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      {/* Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left - Content */}
        <div className="flex flex-col justify-center px-6 lg:px-16 py-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-[10px] text-[#444] tracking-wider block mb-4">
              ABOUT THE STUDIO
            </span>

            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-white tracking-[0.05em] leading-tight mb-8">
              CRAFTING
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>
                DIGITAL
              </span>
              <br />
              EXPERIENCES
            </h2>

            <p className="font-body text-sm text-[#666] max-w-md leading-relaxed mb-12">
              KUROSEI is a creative studio focused on building memorable digital
              experiences. We combine strategic thinking with meticulous execution
              to deliver work that stands out.
            </p>

            {/* Services List */}
            <div className="space-y-4 mb-16">
              {services.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="group flex items-center gap-4 cursor-pointer"
                >
                  <motion.span
                    className="w-0 group-hover:w-8 h-[1px] bg-white transition-all duration-300"
                  />
                  <span className="font-display text-sm text-[#888] group-hover:text-white tracking-wider transition-colors">
                    {service.name}
                  </span>
                  <span className="font-body-jp text-[10px] text-[#444] group-hover:text-[#666] transition-colors">
                    {service.nameJp}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                >
                  <span className="font-display text-3xl text-white tracking-wider block">
                    {stat.value}
                  </span>
                  <span className="font-mono text-[9px] text-[#555] tracking-wider">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right - Visual */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-[#0a0a0a] flex items-center justify-center p-6 lg:p-16"
        >
          {/* Decorative Elements */}
          <div className="absolute top-8 right-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 border border-[#1a1a1a] rounded-full flex items-center justify-center"
            >
              <span className="font-display text-xs text-[#333] tracking-widest">
                2026
              </span>
            </motion.div>
          </div>

          {/* Main Visual */}
          <div className="w-full max-w-lg">
            <VideoPlaceholder
              prompt="Studio atmosphere: Abstract 3D shapes floating in dark space, soft lighting, professional creative environment vibe. Subtle movement, particles, depth."
              aspectRatio="square"
              theme="dark"
              label="STUDIO"
              className="w-full"
            />

            {/* Caption */}
            <div className="mt-6 flex items-center justify-between">
              <span className="font-body-jp text-sm text-[#444]">
                黒星スタジオ
              </span>
              <span className="font-mono text-[9px] text-[#333] tracking-wider">
                WORLDWIDE / REMOTE
              </span>
            </div>
          </div>

          {/* Vertical Text */}
          <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2">
            <span
              className="font-display text-xs text-[#222] tracking-[0.5em]"
              style={{ writingMode: 'vertical-rl' }}
            >
              BLACK STAR STUDIO
            </span>
          </div>
        </motion.div>
      </div>

      {/* Process Section */}
      <div className="border-t border-[#1a1a1a] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="font-mono text-[10px] text-[#444] tracking-wider">
              HOW WE WORK
            </span>
          </motion.div>

          {/* Process progress indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-12"
          >
            {processSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className="group relative p-2"
              >
                <div className={`w-8 h-[2px] transition-all duration-500 ${
                  activeStep === index ? 'bg-white' : 'bg-[#333] group-hover:bg-[#555]'
                }`} />
                {activeStep === index && (
                  <motion.div
                    layoutId="activeStepIndicator"
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-8 h-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                  </motion.div>
                )}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`relative text-center border p-6 transition-all duration-500 ${
                    isActive
                      ? 'border-[#333] bg-[#0a0a0a]'
                      : 'border-transparent bg-transparent'
                  }`}
                >
                  {/* Step number */}
                  <span className={`font-display text-4xl block mb-4 transition-colors duration-500 ${
                    isActive ? 'text-white/20' : 'text-[#1a1a1a]'
                  }`}>
                    {step.num}
                  </span>

                  {/* Title */}
                  <h3 className={`font-display text-sm tracking-wider mb-1 transition-colors duration-500 ${
                    isActive ? 'text-white' : 'text-[#666]'
                  }`}>
                    {step.title}
                  </h3>
                  <span className={`font-body-jp text-[10px] block mb-3 transition-colors duration-500 ${
                    isActive ? 'text-[#555]' : 'text-[#333]'
                  }`}>
                    {step.titleJp}
                  </span>

                  {/* Short description */}
                  <p className={`font-body text-xs mb-0 transition-colors duration-500 ${
                    isActive ? 'text-[#777]' : 'text-[#555]'
                  }`}>
                    {step.desc}
                  </p>

                  {/* Expanded detail - revealed when active */}
                  <div className={`grid transition-all duration-500 ease-out ${
                    isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}>
                    <div className="overflow-hidden">
                      <p className="font-body text-xs text-[#555] leading-relaxed pt-4 border-t border-[#222] mt-4">
                        {step.detail}
                      </p>
                    </div>
                  </div>

                  {/* Active indicator line */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-white/30"
                    animate={{ width: isActive ? '40%' : '0%' }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Bottom section indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-[#1a1a1a] flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <span className="font-body-jp text-[10px] text-[#333]">
                私たちについて
              </span>
              <div className="w-8 h-[1px] bg-[#222]" />
            </div>
            <span className="font-mono text-[9px] text-[#333] tracking-wider">
              // 04 / ABOUT
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
