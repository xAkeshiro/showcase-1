'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CornerFrame } from '@/components/ui/CornerFrame';
import { SectionNumber } from '@/components/ui/SectionNumber';
import { VideoPlaceholder } from '@/components/ui/VideoPlaceholder';
import { FadeInUp, FadeInLeft, FadeInRight } from '@/components/ui/ScrollAnimations';

const characters = [
  {
    id: 1,
    codename: "KAL'TSIT",
    nameJp: '凯尔希',
    class: 'MEDIC',
    faction: 'RHODES ISLAND',
    voiceActor: '日笠阳子',
    description: 'One of the highest administrators of Rhodes Island, Kal\'tsit has access to a lot of information that others may not. Despite her somewhat cold demeanor, she truly cares for the well-being of all operators.',
    color: '#1a4a5a',
    videoPrompt: 'Character showcase: Kal\'tsit in battle stance with Mon3tr emerging from shadows. Medical originium particles floating. Cool teal/cyan lighting. Subtle breathing animation.',
  },
  {
    id: 2,
    codename: 'AMIYA',
    nameJp: '阿米娅',
    class: 'CASTER',
    faction: 'RHODES ISLAND',
    voiceActor: '黒沢ともよ',
    description: 'The public leader of Rhodes Island. Amiya has shouldered many heavy responsibilities despite her young age, and leads the organization with unwavering determination.',
    color: '#3a2a5a',
    videoPrompt: 'Character showcase: Amiya with arts charging, chimera form energy wisps. Purple/violet magical aura. Determined expression. Subtle hair and cloak movement.',
  },
  {
    id: 3,
    codename: 'DOCTOR',
    nameJp: 'ドクター',
    class: 'UNKNOWN',
    faction: 'RHODES ISLAND',
    voiceActor: '—',
    description: 'The tactical advisor of Rhodes Island. Having lost their memories, the Doctor now works alongside Amiya and the other operators to fight against catastrophes and the infection.',
    color: '#2a2a3a',
    videoPrompt: 'Character showcase: Doctor silhouette with tactical holographic displays. Data streams and command interface elements. Mysterious, shadowy atmosphere.',
  },
  {
    id: 4,
    codename: 'W',
    nameJp: 'W',
    class: 'SNIPER',
    faction: 'BABEL / RHODES ISLAND',
    voiceActor: '長谷川明子',
    description: 'A Sarkaz mercenary with a complicated past. Known for her explosive personality and even more explosive weaponry. Her true motivations remain unclear.',
    color: '#4a2a2a',
    videoPrompt: 'Character showcase: W with explosives and detonator, mischievous grin. Fire and ember particles. Red/orange explosive lighting. Dynamic pose with weapons.',
  },
];

export function Characters() {
  const [activeChar, setActiveChar] = useState(0);

  return (
    <section id="characters" className="relative min-h-screen bg-black py-24 overflow-hidden">
      {/* Animated background grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.02 }}
        viewport={{ once: true }}
        style={{
          backgroundImage: `
            linear-gradient(to right, #fff 1px, transparent 1px),
            linear-gradient(to bottom, #fff 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      {/* Section Header */}
      <FadeInUp className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex items-center gap-4 mb-4">
          <motion.span
            className="font-mono text-[10px] text-[#444] tracking-wider"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            RHODES ISLAND ://
          </motion.span>
          <div className="flex-1 h-[1px] bg-[#222]" />
        </div>

        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[10px] text-[#444] tracking-wider">
            PROFILE
          </span>
          <AnimatePresence mode="wait">
            <motion.h2
              key={characters[activeChar].codename}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="font-display text-[clamp(1.75rem,4vw,3rem)] text-white tracking-[0.15em]"
            >
              {characters[activeChar].codename}
            </motion.h2>
          </AnimatePresence>
        </div>
      </FadeInUp>

      {/* Character Display */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Character Art / Video Placeholder */}
          <FadeInLeft className="relative aspect-[3/4] max-w-md mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChar}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-full"
              >
                <VideoPlaceholder
                  prompt={characters[activeChar].videoPrompt}
                  aspectRatio="portrait"
                  theme="dark"
                  label="OPERATOR SHOWCASE"
                  className="w-full h-full"
                />

                {/* Colored overlay for visual interest */}
                <div
                  className="absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${characters[activeChar].color} 0%, transparent 100%)`
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Character name overlay */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="font-display text-xl text-white tracking-wider">
                {characters[activeChar].codename}
              </p>
              <p className="font-body-jp text-sm text-[#888]">
                {characters[activeChar].nameJp}
              </p>
            </motion.div>
          </FadeInLeft>

          {/* Character Info */}
          <FadeInRight className="space-y-8">
            {/* Faction badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <div className="flex items-center gap-2 px-4 py-2 border border-[#222] bg-[#0a0a0a]">
                <motion.div
                  className="w-2 h-2 bg-white"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="font-mono text-[10px] text-[#888] tracking-[0.2em]">
                  {characters[activeChar].faction}
                </span>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {/* Class */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <span className="font-mono text-[10px] text-[#444] tracking-wider block mb-2">
                  CLASS
                </span>
                <span className="font-display text-sm text-white tracking-wider">
                  {characters[activeChar].class}
                </span>
              </motion.div>

              {/* Voice Actor */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <span className="font-mono text-[10px] text-[#444] tracking-wider block mb-2">
                  CHARACTER VOICE
                </span>
                <span className="font-body-jp text-sm text-[#888]">
                  {characters[activeChar].voiceActor}
                </span>
              </motion.div>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <span className="font-mono text-[10px] text-[#444] tracking-wider block mb-3">
                PROFILE
              </span>
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeChar}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-body text-sm text-[#888] leading-relaxed"
                >
                  {characters[activeChar].description}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* View More link */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="inline-flex items-center gap-3 font-mono text-[10px] text-[#666] hover:text-white tracking-wider transition-colors group"
            >
              <span>VIEW FULL PROFILE</span>
              <motion.span
                className="text-lg"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </FadeInRight>
        </div>

        {/* Character Selector */}
        <FadeInUp delay={0.4} className="mt-20">
          <div className="flex flex-col items-center">
            <span className="font-mono text-[10px] text-[#444] tracking-wider mb-4">
              SELECT OPERATOR
            </span>
            <div className="flex justify-center gap-3">
              {characters.map((char, index) => (
                <motion.button
                  key={char.id}
                  onClick={() => setActiveChar(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    'relative w-20 h-20 overflow-hidden transition-all duration-300',
                    'border flex flex-col items-center justify-center gap-1',
                    index === activeChar
                      ? 'border-white bg-white/5'
                      : 'border-[#222] opacity-50 hover:opacity-100 hover:border-[#444]'
                  )}
                >
                  <span className="font-display text-xl text-white/70">
                    {char.codename.charAt(0)}
                  </span>
                  <span className="font-mono text-[8px] text-[#666] tracking-wider">
                    {char.class}
                  </span>
                  {index === activeChar && (
                    <motion.div
                      layoutId="activeCharIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-white"
                    />
                  )}
                  <CornerFrame />
                </motion.button>
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>

      {/* Section Number */}
      <div className="absolute bottom-6 right-6">
        <SectionNumber current={2} total={5} />
      </div>
    </section>
  );
}
