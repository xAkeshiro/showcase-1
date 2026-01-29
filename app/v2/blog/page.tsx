'use client';

import { motion } from 'framer-motion';
import { VariantNavigation } from '@/components/variants/v2/Navigation';
import { ArrowUpRight } from 'lucide-react';

const featuredPost = {
  id: 'design-systems-at-scale',
  title: 'BUILDING DESIGN SYSTEMS THAT ACTUALLY SCALE',
  titleJp: 'デザインシステム',
  category: 'ENGINEERING',
  date: 'JAN 2025',
  readTime: '8 MIN READ',
  excerpt: 'After building design systems for dozens of clients, we have learned what works and what does not. Here is our approach to creating systems that grow with your product.',
  author: 'REN TAKAHASHI',
};

const posts = [
  {
    id: 'motion-in-ui',
    title: 'THE CASE FOR MOTION IN UI DESIGN',
    titleJp: 'モーションUI',
    category: 'DESIGN',
    date: 'DEC 2024',
    readTime: '6 MIN READ',
    excerpt: 'Motion is not decoration — it is communication. How intentional animation improves usability and brand perception.',
    author: 'MIKA SANTOS',
  },
  {
    id: 'nextjs-performance',
    title: 'NEXT.JS PERFORMANCE: BEYOND THE BASICS',
    titleJp: 'パフォーマンス',
    category: 'ENGINEERING',
    date: 'NOV 2024',
    readTime: '12 MIN READ',
    excerpt: 'Advanced techniques for optimizing Next.js applications, from streaming SSR to edge functions and beyond.',
    author: 'YUKI CHEN',
  },
  {
    id: 'brand-voice',
    title: 'FINDING YOUR BRAND VOICE IN A NOISY WORLD',
    titleJp: 'ブランドボイス',
    category: 'STRATEGY',
    date: 'OCT 2024',
    readTime: '5 MIN READ',
    excerpt: 'In a sea of sameness, authentic brand voice is your strongest differentiator. A framework for finding yours.',
    author: 'KAI WOLF',
  },
  {
    id: 'creative-process',
    title: 'OUR CREATIVE PROCESS: FROM CHAOS TO CLARITY',
    titleJp: 'クリエイティブ',
    category: 'STUDIO',
    date: 'SEP 2024',
    readTime: '7 MIN READ',
    excerpt: 'A behind-the-scenes look at how we move from initial concept to final delivery, and why we embrace the messy middle.',
    author: 'REN TAKAHASHI',
  },
  {
    id: 'typography-web',
    title: 'TYPOGRAPHY ON THE WEB: A MODERN GUIDE',
    titleJp: 'タイポグラフィ',
    category: 'DESIGN',
    date: 'AUG 2024',
    readTime: '9 MIN READ',
    excerpt: 'Variable fonts, fluid sizing, and advanced CSS techniques that make web typography as refined as print.',
    author: 'MIKA SANTOS',
  },
  {
    id: 'client-collaboration',
    title: 'THE ART OF CLIENT COLLABORATION',
    titleJp: 'コラボレーション',
    category: 'STUDIO',
    date: 'JUL 2024',
    readTime: '4 MIN READ',
    excerpt: 'How we structure client relationships to produce the best work. Feedback loops, communication cadence, and trust.',
    author: 'KAI WOLF',
  },
];

const categories = ['ALL', 'DESIGN', 'ENGINEERING', 'STRATEGY', 'STUDIO'];

export default function BlogPage() {
  return (
    <div className="bg-white min-h-screen">
      <VariantNavigation />
      <main>
        {/* Hero */}
        <section className="relative min-h-[50vh] flex items-end pb-20 pt-32 bg-white overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #eee 1px, transparent 1px),
                linear-gradient(to bottom, #eee 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
          <motion.div
            className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none"
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />

          <div className="max-w-7xl mx-auto px-6 w-full relative">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-mono text-[10px] text-[#999] tracking-[0.3em] block mb-4"
            >
              THOUGHTS & INSIGHTS
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display text-[clamp(2rem,6vw,5rem)] text-black tracking-[0.05em] leading-[0.9] mb-4"
            >
              THE
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(0,0,0,0.25)' }}>
                JOURNAL
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-body text-sm text-[#777] max-w-lg"
            >
              Design thinking, engineering insights, and studio reflections from the KUROSEI team.
            </motion.p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="border-t border-b border-[#eee] bg-white">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-wrap gap-6">
              {categories.map((cat, i) => (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className={`font-mono text-[10px] tracking-wider transition-colors ${
                    i === 0 ? 'text-black' : 'text-[#bbb] hover:text-[#666]'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="bg-black py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group cursor-pointer"
            >
              <span className="font-mono text-[9px] text-[#444] tracking-wider block mb-6">
                FEATURED
              </span>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Image */}
                <div className="aspect-[16/10] bg-[#111] border border-[#1a1a1a] relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-body-jp text-6xl text-[#1a1a1a] select-none">
                      {featuredPost.titleJp}
                    </span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="font-mono text-[8px] text-[#333] tracking-wider bg-[#111] border border-[#1a1a1a] px-2 py-1">
                      {featuredPost.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-mono text-[9px] text-[#555] tracking-wider">{featuredPost.date}</span>
                    <span className="text-[#333]">·</span>
                    <span className="font-mono text-[9px] text-[#555] tracking-wider">{featuredPost.readTime}</span>
                  </div>
                  <h2 className="font-display text-2xl text-white tracking-[0.05em] mb-4 group-hover:tracking-[0.08em] transition-all">
                    {featuredPost.title}
                  </h2>
                  <p className="font-body text-sm text-[#555] leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] text-[#444] tracking-wider">
                      BY {featuredPost.author}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-[#333] group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group cursor-pointer border border-[#eee] hover:border-[#ccc] transition-all"
                >
                  {/* Image */}
                  <div className="aspect-[16/9] bg-[#f5f5f5] relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-body-jp text-3xl text-[#e5e5e5] select-none group-hover:text-[#ddd] transition-colors">
                        {post.titleJp}
                      </span>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="font-mono text-[8px] text-[#999] tracking-wider bg-white/80 px-2 py-1">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-[9px] text-[#bbb] tracking-wider">{post.date}</span>
                      <span className="text-[#ddd]">·</span>
                      <span className="font-mono text-[9px] text-[#bbb] tracking-wider">{post.readTime}</span>
                    </div>
                    <h3 className="font-display text-xs text-black tracking-[0.08em] mb-3 leading-relaxed">
                      {post.title}
                    </h3>
                    <p className="font-body text-xs text-[#888] leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-[#eee]">
                      <span className="font-mono text-[8px] text-[#bbb] tracking-wider">
                        {post.author}
                      </span>
                      <ArrowUpRight
                        size={12}
                        className="text-[#ccc] group-hover:text-black transition-colors"
                      />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-black py-20 border-t border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-body-jp text-sm text-[#444] block mb-4">
                ニュースレター
              </span>
              <h2 className="font-display text-2xl text-white tracking-[0.1em] mb-4">
                STAY IN THE LOOP
              </h2>
              <p className="font-body text-sm text-[#555] mb-8 max-w-md mx-auto">
                Monthly insights on design, development, and the creative process. No spam, unsubscribe anytime.
              </p>
              <div className="flex items-center justify-center gap-0 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-[#111] border border-[#222] text-white font-mono text-xs px-4 py-3 tracking-wider placeholder:text-[#333] focus:outline-none focus:border-[#444]"
                />
                <button className="font-mono text-[10px] text-black bg-white px-6 py-3 tracking-wider hover:bg-[#eee] transition-colors border border-white">
                  SUBSCRIBE
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
