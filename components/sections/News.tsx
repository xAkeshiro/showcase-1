'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { formatArknightsDate } from '@/lib/utils';
import { SectionNumber } from '@/components/ui/SectionNumber';
import { CornerFrame } from '@/components/ui/CornerFrame';
import { VideoPlaceholder } from '@/components/ui/VideoPlaceholder';
import { FadeInUp, FadeInLeft, FadeInRight, StaggerChildren } from '@/components/ui/ScrollAnimations';

const workCategories = ['ALL', 'WEB', 'MOTION', 'BRAND'];

const workItems = [
  {
    id: 1,
    category: 'WEB',
    categoryJp: 'ウェブ',
    date: new Date('2026-01-24'),
    title: 'E-Commerce Platform Redesign',
    client: 'NOVA RETAIL',
    description: 'Complete UX overhaul and frontend development',
  },
  {
    id: 2,
    category: 'MOTION',
    categoryJp: 'モーション',
    date: new Date('2026-01-18'),
    title: 'Brand Identity Animation System',
    client: 'APEX STUDIOS',
    description: 'Logo animations and motion guidelines',
  },
  {
    id: 3,
    category: 'BRAND',
    categoryJp: 'ブランド',
    date: new Date('2026-01-12'),
    title: 'Visual Identity & Web Presence',
    client: 'HORIZON TECH',
    description: 'Full brand system and website',
  },
  {
    id: 4,
    category: 'WEB',
    categoryJp: 'ウェブ',
    date: new Date('2026-01-05'),
    title: 'Interactive Portfolio Platform',
    client: 'PERSONAL PROJECT',
    description: 'Experimental web experience',
  },
  {
    id: 5,
    category: 'MOTION',
    categoryJp: 'モーション',
    date: new Date('2025-12-20'),
    title: 'Product Launch Campaign',
    client: 'STELLAR AUDIO',
    description: 'Promotional video and social assets',
  },
];

export function News() {
  const [activeTab, setActiveTab] = useState(0);

  const filteredWork = activeTab === 0
    ? workItems
    : workItems.filter(item => item.category === workCategories[activeTab]);

  return (
    <section id="work" className="relative py-24 bg-white overflow-hidden">
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
              LATEST PROJECTS
            </span>
            <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] text-black tracking-[0.15em]">
              RECENT WORK
            </h2>
            <p className="font-body-jp text-sm text-[#666] mt-1">
              最近の作品
            </p>
          </div>

          <button className="font-mono text-[10px] text-[#999] hover:text-black tracking-wider transition-colors flex items-center gap-2">
            VIEW ALL
            <span>→</span>
          </button>
        </FadeInUp>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Video Area */}
          <FadeInLeft className="lg:col-span-1">
            <div className="relative">
              <VideoPlaceholder
                prompt="Work highlight reel: Quick showcase of recent projects. Website scrolls, motion graphics clips, brand reveals. Sleek transitions with project titles appearing. Premium studio quality."
                aspectRatio="portrait"
                theme="light"
                label="2026 SHOWREEL"
                className="w-full"
              />
            </div>
          </FadeInLeft>

          {/* Work List */}
          <FadeInRight className="lg:col-span-2">
            {/* Category Tabs */}
            <div className="flex gap-8 mb-6 border-b border-[#e0e0e0]">
              {workCategories.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={cn(
                    'pb-3 font-display text-xs tracking-wider transition-colors relative',
                    i === activeTab ? 'text-black' : 'text-[#999] hover:text-[#666]'
                  )}
                >
                  {tab}
                  {i === activeTab && (
                    <motion.div
                      layoutId="activeWorkTab"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Work List */}
            <StaggerChildren className="space-y-0">
              {filteredWork.map((item, index) => (
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
                      <span className="font-mono text-[9px] text-[#bbb]">{item.category}</span>
                    </div>
                    <CornerFrame theme="light" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Category & Date */}
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="font-mono text-[10px] text-[#666] px-2 py-0.5 bg-[#f0f0f0]">
                        {item.category}
                      </span>
                      <span className="font-mono text-[10px] text-[#999] tracking-wider">
                        {formatArknightsDate(item.date)}
                      </span>
                    </div>

                    {/* Title & Client */}
                    <h3 className="font-body text-sm text-[#333] group-hover:text-black transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-mono text-[10px] text-[#999] mt-0.5">
                      {item.client}
                    </p>
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
