'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CornerFrame } from '@/components/ui/CornerFrame';
import { SectionNumber } from '@/components/ui/SectionNumber';

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
  },
];

export function Characters() {
  const [activeChar, setActiveChar] = useState(0);

  return (
    <section id="characters" className="relative min-h-screen bg-black py-24">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-[10px] text-[#444] tracking-wider">
            RHODES ISLAND ://
          </span>
          <div className="flex-1 h-[1px] bg-[#222]" />
        </div>

        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[10px] text-[#444] tracking-wider">
            PROFILE
          </span>
          <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] text-white tracking-[0.15em]">
            {characters[activeChar].codename}
          </h2>
        </div>
      </div>

      {/* Character Display */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Character Art Placeholder */}
          <div className="relative aspect-[3/4] max-w-md mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChar}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-full"
              >
                {/* Character silhouette placeholder */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${characters[activeChar].color} 0%, #000 100%)`
                  }}
                >
                  <div className="text-center">
                    <span className="font-display text-[120px] text-white/10">
                      {characters[activeChar].codename.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Corner frame */}
                <CornerFrame />
              </motion.div>
            </AnimatePresence>

            {/* Character name overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
              <p className="font-display text-lg text-white tracking-wider">
                {characters[activeChar].codename}
              </p>
              <p className="font-body-jp text-sm text-[#888]">
                {characters[activeChar].nameJp}
              </p>
            </div>
          </div>

          {/* Character Info */}
          <div className="space-y-8">
            {/* Faction badge */}
            <div className="inline-block">
              <div className="flex items-center gap-2 px-3 py-1.5 border border-[#222]">
                <div className="w-1.5 h-1.5 bg-white" />
                <span className="font-mono text-[10px] text-[#888] tracking-[0.2em]">
                  {characters[activeChar].faction}
                </span>
              </div>
            </div>

            {/* Class */}
            <div>
              <span className="font-mono text-[10px] text-[#444] tracking-wider block mb-1">
                CLASS
              </span>
              <span className="font-display text-sm text-white tracking-wider">
                {characters[activeChar].class}
              </span>
            </div>

            {/* Voice Actor */}
            <div>
              <span className="font-mono text-[10px] text-[#444] tracking-wider block mb-1">
                CHARACTER VOICE
              </span>
              <span className="font-body-jp text-sm text-[#888]">
                {characters[activeChar].voiceActor}
              </span>
            </div>

            {/* Description */}
            <div>
              <p className="font-body text-sm text-[#888] leading-relaxed">
                {characters[activeChar].description}
              </p>
            </div>

            {/* View More link */}
            <a
              href="#"
              className="inline-flex items-center gap-2 font-mono text-[10px] text-[#666] hover:text-white tracking-wider transition-colors"
            >
              VIEW MORE
              <span className="text-lg">→</span>
            </a>
          </div>
        </div>

        {/* Character Selector */}
        <div className="flex justify-center gap-2 mt-16">
          {characters.map((char, index) => (
            <button
              key={char.id}
              onClick={() => setActiveChar(index)}
              className={cn(
                'relative w-16 h-16 overflow-hidden transition-all duration-300',
                'border flex items-center justify-center',
                index === activeChar
                  ? 'border-white'
                  : 'border-[#222] opacity-50 hover:opacity-100'
              )}
              style={{
                background: `linear-gradient(135deg, ${char.color} 0%, #000 100%)`
              }}
            >
              <span className="font-display text-lg text-white/50">
                {char.codename.charAt(0)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Section Number */}
      <div className="absolute bottom-6 right-6">
        <SectionNumber current={2} total={5} />
      </div>
    </section>
  );
}
