'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { formatArknightsDate } from '@/lib/utils';
import { SectionNumber } from '@/components/ui/SectionNumber';
import { CornerFrame } from '@/components/ui/CornerFrame';
import { VideoPlaceholder } from '@/components/ui/VideoPlaceholder';
import { FadeInUp, FadeInLeft, FadeInRight, StaggerChildren } from '@/components/ui/ScrollAnimations';

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
    <section id="news" className="relative py-24 bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <FadeInUp className="flex items-center justify-between mb-12">
          <div>
            <span className="font-mono text-[10px] text-[#999] tracking-wider block mb-2">
              BREAKING NEWS
            </span>
            <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] text-black tracking-[0.15em]">
              INFORMATION
            </h2>
            <p className="font-body-jp text-sm text-[#666] mt-1">
              お知らせ
            </p>
          </div>

          <button className="font-mono text-[10px] text-[#999] hover:text-black tracking-wider transition-colors flex items-center gap-2">
            READ MORE
            <span>→</span>
          </button>
        </FadeInUp>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Video Area */}
          <FadeInLeft className="lg:col-span-1">
            <div className="relative">
              <VideoPlaceholder
                prompt="News highlight reel: Quick cuts of recent in-game events, new operators, and updates. Dynamic motion graphics with Arknights UI elements. Text overlays with dates and event names."
                aspectRatio="portrait"
                theme="light"
                label="NEWS HIGHLIGHT"
                className="w-full"
              />
            </div>
          </FadeInLeft>

          {/* News List */}
          <FadeInRight className="lg:col-span-2">
            {/* Category Tabs */}
            <div className="flex gap-8 mb-6 border-b border-[#e0e0e0]">
              {newsCategories.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={cn(
                    'pb-3 font-body-jp text-sm tracking-wider transition-colors relative',
                    i === activeTab ? 'text-black' : 'text-[#999] hover:text-[#666]'
                  )}
                >
                  {tab}
                  {i === activeTab && (
                    <motion.div
                      layoutId="activeNewsTab"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* News List */}
            <StaggerChildren className="space-y-0">
              {newsItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex items-start gap-4 py-5 border-b border-[#eee] hover:bg-[#fafafa] transition-colors -mx-4 px-4 cursor-pointer"
                >
                  {/* Thumbnail Placeholder */}
                  <div className="relative w-24 h-16 flex-shrink-0 overflow-hidden bg-[#f5f5f5] border border-[#e0e0e0]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-mono text-[9px] text-[#bbb]">{item.categoryEn}</span>
                    </div>
                    <CornerFrame theme="light" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Category & Date */}
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="font-body-jp text-[11px] text-[#666] px-2 py-0.5 bg-[#f0f0f0]">
                        {item.category}
                      </span>
                      <span className="font-mono text-[10px] text-[#999] tracking-wider">
                        {formatArknightsDate(item.date)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-body text-sm text-[#333] group-hover:text-black transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-[#ccc] group-hover:text-black transition-colors">
                    →
                  </div>
                </motion.div>
              ))}
            </StaggerChildren>
          </FadeInRight>
        </div>
      </div>

      {/* Section Number */}
      <div className="absolute bottom-6 right-6">
        <SectionNumber current={1} total={5} theme="light" />
      </div>
    </section>
  );
}
