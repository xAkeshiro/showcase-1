'use client';

import { motion } from 'framer-motion';
import { VariantNavigation } from '@/components/variants/v2/Navigation';
import Link from 'next/link';

const team = [
  {
    name: 'REN TAKAHASHI',
    nameJp: '高橋 蓮',
    role: 'FOUNDER & CREATIVE DIRECTOR',
    bio: 'A decade of experience in digital design and creative leadership. Previously at leading agencies in Tokyo and New York.',
  },
  {
    name: 'YUKI CHEN',
    nameJp: '陳 ユキ',
    role: 'LEAD DEVELOPER',
    bio: 'Full-stack engineer passionate about performance and elegant architecture. Open-source contributor and speaker.',
  },
  {
    name: 'MIKA SANTOS',
    nameJp: 'サントス ミカ',
    role: 'MOTION DESIGNER',
    bio: 'Specializes in UI animation and interactive experiences. Background in film and visual effects.',
  },
  {
    name: 'KAI WOLF',
    nameJp: 'ウルフ カイ',
    role: 'BRAND STRATEGIST',
    bio: 'Bridges the gap between business goals and creative execution. Expert in brand positioning and market research.',
  },
];

const values = [
  {
    title: 'CRAFT',
    titleJp: '技',
    description: 'Excellence is in the details. We treat every project as an opportunity to push the boundaries of what digital can be.',
  },
  {
    title: 'HONESTY',
    titleJp: '誠',
    description: 'We tell you what you need to hear, not what you want to hear. Honest communication builds trust and better outcomes.',
  },
  {
    title: 'PURPOSE',
    titleJp: '志',
    description: 'Every design decision serves a purpose. We never add complexity without clear value to the end user.',
  },
  {
    title: 'GROWTH',
    titleJp: '成長',
    description: 'We stay curious and keep evolving. Our best work is always ahead of us, and we invest in learning every day.',
  },
];

const milestones = [
  { year: '2021', event: 'Studio founded in Tokyo', eventJp: 'スタジオ設立' },
  { year: '2022', event: 'First international client', eventJp: '海外初クライアント' },
  { year: '2023', event: 'Team expanded to 8 members', eventJp: 'チーム拡大' },
  { year: '2024', event: '50+ projects completed', eventJp: '50プロジェクト達成' },
  { year: '2025', event: 'New York satellite office', eventJp: 'NY支社開設' },
];

export default function AboutPage() {
  return (
    <div className="bg-black min-h-screen">
      <VariantNavigation />
      <main>
        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-end pb-20 pt-32 bg-black overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #fff 1px, transparent 1px),
                linear-gradient(to bottom, #fff 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
          <motion.div
            className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />

          <div className="max-w-7xl mx-auto px-6 w-full relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="font-mono text-[10px] text-[#444] tracking-[0.3em] block mb-4"
                >
                  ABOUT US
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="font-display text-[clamp(2rem,6vw,5rem)] text-white tracking-[0.05em] leading-[0.9]"
                >
                  THE
                  <br />
                  <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
                    STUDIO
                  </span>
                </motion.h1>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-col justify-end"
              >
                <p className="font-body text-sm text-[#666] leading-relaxed mb-6">
                  KUROSEI (黒星, &quot;Black Star&quot;) was founded in 2021 with a simple belief:
                  digital experiences should be as thoughtful as they are beautiful.
                </p>
                <p className="font-body text-sm text-[#555] leading-relaxed">
                  Based in Tokyo with a global reach, we are a team of designers, developers,
                  and strategists who obsess over the intersection of form and function.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <span className="font-mono text-[10px] text-[#999] tracking-[0.3em] block mb-4">
                OUR VALUES
              </span>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] text-black tracking-[0.05em]">
                WHAT DRIVES US
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative border border-[#eee] p-6 group hover:border-[#ccc] transition-colors"
                >
                  <span className="font-body-jp text-3xl text-[#f0f0f0] block mb-4">
                    {value.titleJp}
                  </span>
                  <h3 className="font-display text-sm text-black tracking-[0.15em] mb-3">
                    {value.title}
                  </h3>
                  <p className="font-body text-xs text-[#777] leading-relaxed">
                    {value.description}
                  </p>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#eee] group-hover:border-[#ccc] transition-colors" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#eee] group-hover:border-[#ccc] transition-colors" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-black py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <span className="font-mono text-[10px] text-[#444] tracking-[0.3em] block mb-4">
                THE TEAM
              </span>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] text-white tracking-[0.05em]">
                PEOPLE BEHIND THE PIXELS
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group border border-[#1a1a1a] hover:border-[#333] p-8 transition-all"
                >
                  <div className="flex gap-6">
                    {/* Avatar placeholder */}
                    <div className="w-20 h-20 bg-[#111] border border-[#222] flex-shrink-0 flex items-center justify-center">
                      <span className="font-body-jp text-lg text-[#222]">
                        {member.nameJp.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-sm text-white tracking-[0.1em] mb-1">
                        {member.name}
                      </h3>
                      <span className="font-body-jp text-[10px] text-[#444] block mb-1">
                        {member.nameJp}
                      </span>
                      <span className="font-mono text-[9px] text-[#555] tracking-wider block mb-3">
                        {member.role}
                      </span>
                      <p className="font-body text-xs text-[#666] leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <span className="font-mono text-[10px] text-[#999] tracking-[0.3em] block mb-4">
                OUR JOURNEY
              </span>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] text-black tracking-[0.05em]">
                MILESTONES
              </h2>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-[#eee]" />

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={`relative flex flex-col md:flex-row items-start gap-8 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-16 md:pl-0`}>
                      <span className="font-display text-3xl text-[#eee] block mb-2">
                        {milestone.year}
                      </span>
                      <h3 className="font-display text-sm text-black tracking-[0.1em] mb-1">
                        {milestone.event}
                      </h3>
                      <span className="font-body-jp text-xs text-[#bbb]">
                        {milestone.eventJp}
                      </span>
                    </div>
                    {/* Dot */}
                    <div className="absolute left-8 md:left-1/2 top-2 w-3 h-3 bg-black -translate-x-1/2" />
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-black py-20 border-t border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-body-jp text-sm text-[#444] mb-4"
            >
              一緒に作りましょう
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl text-white tracking-[0.1em] mb-8"
            >
              WANT TO JOIN US?
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-6"
            >
              <Link
                href="/v2#contact"
                className="font-mono text-[10px] text-black bg-white px-8 py-3 tracking-wider hover:bg-[#eee] transition-colors"
              >
                GET IN TOUCH
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
