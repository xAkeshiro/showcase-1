'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { formatArknightsDate } from '@/lib/utils';
import { SectionNumber } from '@/components/ui/SectionNumber';

const newsCategories = ['最新', '公告', '活動', '新聞'];

const newsItems = [
  {
    id: 1,
    category: '公告',
    categoryEn: 'NOTICE',
    date: new Date('2026-01-24'),
    title: 'Version 2.5 Maintenance Notice',
    titleJp: 'バージョン2.5メンテナンスのお知らせ',
  },
  {
    id: 2,
    category: '活動',
    categoryEn: 'EVENT',
    date: new Date('2026-01-22'),
    title: 'New Side Story Event: Twilight of Wolumonde',
    titleJp: 'サイドストーリー「ウォルモンドの薄暮」開催',
  },
  {
    id: 3,
    category: '新聞',
    categoryEn: 'NEWS',
    date: new Date('2026-01-20'),
    title: 'New Operator Announcement: Logos',
    titleJp: '新オペレーター「ロゴス」実装決定',
  },
  {
    id: 4,
    category: '公告',
    categoryEn: 'NOTICE',
    date: new Date('2026-01-18'),
    title: 'Rhodes Island Supplies: Limited-Time Packs',
    titleJp: 'ロドス島補給：期間限定パック販売',
  },
  {
    id: 5,
    category: '活動',
    categoryEn: 'EVENT',
    date: new Date('2026-01-15'),
    title: 'Integrated Strategies #5 Now Available',
    titleJp: '統合戦略#5「荒れ野の荒涼」開放',
  },
];

export function News() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="news" className="relative py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="font-mono text-[10px] text-[#444] tracking-wider block mb-2">
              BREAKING NEWS
            </span>
            <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] text-white tracking-[0.15em]">
              INFORMATION
            </h2>
          </div>

          <a
            href="/news"
            className="font-mono text-[10px] text-[#666] hover:text-white tracking-wider transition-colors flex items-center gap-2"
          >
            READ MORE
            <span>→</span>
          </a>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-8 mb-8 border-b border-[#222]">
          {newsCategories.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={cn(
                'pb-3 font-body-jp text-sm tracking-wider transition-colors relative',
                i === activeTab ? 'text-white' : 'text-[#666] hover:text-[#888]'
              )}
            >
              {tab}
              {i === activeTab && (
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white" />
              )}
            </button>
          ))}
        </div>

        {/* News List */}
        <div className="space-y-0">
          {newsItems.map((item) => (
            <a
              key={item.id}
              href={`/news/${item.id}`}
              className="group flex items-start gap-6 py-6 border-b border-[#1a1a1a] hover:bg-[#0a0a0a] transition-colors -mx-4 px-4"
            >
              {/* Thumbnail Placeholder */}
              <div className="relative w-32 h-20 flex-shrink-0 overflow-hidden bg-[#111] border border-[#222]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-[10px] text-[#333]">{item.categoryEn}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Category & Date */}
                <div className="flex items-center gap-4 mb-2">
                  <span className="font-body-jp text-xs text-[#888]">
                    {item.category}
                  </span>
                  <span className="font-mono text-[10px] text-[#444] tracking-wider">
                    {formatArknightsDate(item.date)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-body text-sm text-[#ccc] group-hover:text-white transition-colors line-clamp-2">
                  {item.title}
                </h3>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-[#333] group-hover:text-white transition-colors">
                →
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Section Number */}
      <div className="absolute bottom-6 right-6">
        <SectionNumber current={1} total={5} />
      </div>
    </section>
  );
}
