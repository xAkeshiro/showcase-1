'use client';

import { CornerFrame } from '@/components/ui/CornerFrame';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SectionNumber } from '@/components/ui/SectionNumber';
import { Play, Image as ImageIcon, Music } from 'lucide-react';

const mediaCategories = [
  {
    id: 'video',
    icon: Play,
    titleEn: 'VIDEO',
    titleJp: 'ムービー',
    description: 'Promotional videos and trailers',
  },
  {
    id: 'gallery',
    icon: ImageIcon,
    titleEn: 'GALLERY',
    titleJp: 'ギャラリー',
    description: 'Artwork and screenshots',
  },
  {
    id: 'music',
    icon: Music,
    titleEn: 'MONSTER SIREN',
    titleJp: 'サントラ',
    description: 'Original soundtracks',
  },
];

export function Media() {
  return (
    <section id="media" className="relative bg-black py-24 border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <SectionHeader
            titleEn="MEDIA"
            titleJp="泰拉万象"
            label="ABOUT TERRA"
          />
        </div>

        {/* Media Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mediaCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <a
                key={cat.id}
                href={`/media/${cat.id}`}
                className="group relative bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#333] transition-colors p-8 text-center"
              >
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <Icon
                    size={48}
                    strokeWidth={1}
                    className="text-[#333] group-hover:text-white transition-colors"
                  />
                </div>

                {/* Title */}
                <h3 className="font-display text-sm text-white tracking-[0.15em]">
                  {cat.titleEn}
                </h3>
                <p className="font-body-jp text-xs text-[#666] mt-1">
                  {cat.titleJp}
                </p>

                {/* Description */}
                <p className="font-body text-xs text-[#444] mt-4">
                  {cat.description}
                </p>

                {/* Corner frame */}
                <CornerFrame />
              </a>
            );
          })}
        </div>
      </div>

      {/* Section Number */}
      <div className="absolute bottom-6 right-6">
        <SectionNumber current={4} total={5} />
      </div>
    </section>
  );
}
