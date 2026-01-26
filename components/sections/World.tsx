'use client';

import { CornerFrame } from '@/components/ui/CornerFrame';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SectionNumber } from '@/components/ui/SectionNumber';

const worldItems = [
  {
    id: 'originiums',
    titleEn: 'ORIGINIUMS',
    titleJp: '源石',
    description: 'The source of catastrophes and the infection',
    color: '#2a3a4a',
  },
  {
    id: 'infected',
    titleEn: 'INFECTED',
    titleJp: '感染者',
    description: 'Those touched by Oripathy',
    color: '#3a2a3a',
  },
  {
    id: 'rhodes-island',
    titleEn: 'RHODES ISLAND',
    titleJp: 'ロドス・アイランド',
    description: 'A pharmaceutical company fighting against the catastrophe',
    color: '#1a2a3a',
  },
];

export function World() {
  return (
    <section id="world" className="relative bg-black py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <SectionHeader
            titleEn="WORLD"
            titleJp="設定"
            label="ABOUT TERRA"
          />
        </div>

        {/* World Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {worldItems.map((item) => (
            <a
              key={item.id}
              href={`/world/${item.id}`}
              className="group relative aspect-[4/3] overflow-hidden"
            >
              {/* Background */}
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${item.color} 0%, #000 100%)`
                }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-lg text-white tracking-[0.15em]">
                  {item.titleEn}
                </h3>
                <p className="font-body-jp text-sm text-[#888] mt-1">
                  {item.titleJp}
                </p>
              </div>

              {/* Hover indicator */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[10px] text-white tracking-wider">
                VIEW MORE →
              </div>

              {/* Corner frame */}
              <CornerFrame />
            </a>
          ))}
        </div>
      </div>

      {/* Section Number */}
      <div className="absolute bottom-6 right-6">
        <SectionNumber current={3} total={5} />
      </div>
    </section>
  );
}
