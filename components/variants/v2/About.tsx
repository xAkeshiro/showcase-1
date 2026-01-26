'use client';

import { motion } from 'framer-motion';
import { VideoPlaceholder } from '@/components/ui/VideoPlaceholder';

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

export function VariantAbout() {
  return (
    <section id="about" className="relative bg-black">
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
            className="text-center mb-16"
          >
            <span className="font-mono text-[10px] text-[#444] tracking-wider">
              HOW WE WORK
            </span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'DISCOVER', desc: 'Understanding your vision and goals' },
              { num: '02', title: 'DESIGN', desc: 'Crafting the visual direction' },
              { num: '03', title: 'DEVELOP', desc: 'Building with precision' },
              { num: '04', title: 'DELIVER', desc: 'Launching and refining' },
            ].map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <span className="font-display text-4xl text-[#1a1a1a] block mb-4">
                  {step.num}
                </span>
                <h3 className="font-display text-sm text-white tracking-wider mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-xs text-[#555]">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
