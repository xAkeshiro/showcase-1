'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { CornerFrame } from './CornerFrame';

interface VideoPlaceholderProps {
  prompt: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'ultrawide';
  theme?: 'dark' | 'light';
  className?: string;
  showPlayIcon?: boolean;
  label?: string;
  videoSrc?: string; // When you have actual video
}

const aspectRatioClasses = {
  video: 'aspect-video',
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  ultrawide: 'aspect-[21/9]',
};

export function VideoPlaceholder({
  prompt,
  aspectRatio = 'video',
  theme = 'dark',
  className = '',
  showPlayIcon = true,
  label = 'LOOP VIDEO',
  videoSrc,
}: VideoPlaceholderProps) {
  const isDark = theme === 'dark';

  // If actual video is provided, render it
  if (videoSrc) {
    return (
      <div className={`relative ${aspectRatioClasses[aspectRatio]} overflow-hidden ${className}`}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/webm" />
          <source src={videoSrc.replace('.webm', '.mp4')} type="video/mp4" />
        </video>
        <CornerFrame theme={theme} />
      </div>
    );
  }

  // Placeholder with prompt
  return (
    <motion.div
      className={`relative ${aspectRatioClasses[aspectRatio]} overflow-hidden ${className} ${
        isDark ? 'bg-[#0a0a0a]' : 'bg-[#f5f5f5]'
      }`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated grid background */}
      <div
        className={`absolute inset-0 ${isDark ? 'opacity-20' : 'opacity-10'}`}
        style={{
          backgroundImage: `
            linear-gradient(to right, ${isDark ? '#222' : '#ddd'} 1px, transparent 1px),
            linear-gradient(to bottom, ${isDark ? '#222' : '#ddd'} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Scanning animation */}
      <motion.div
        className={`absolute left-0 right-0 h-[1px] ${
          isDark
            ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent'
            : 'bg-gradient-to-r from-transparent via-black/20 to-transparent'
        }`}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
        {/* Play icon */}
        {showPlayIcon && (
          <motion.div
            className={`mb-4 p-4 border ${
              isDark ? 'border-[#333]' : 'border-[#ccc]'
            }`}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Play
              size={24}
              className={isDark ? 'text-[#444]' : 'text-[#999]'}
              strokeWidth={1}
            />
          </motion.div>
        )}

        {/* Label */}
        <span
          className={`font-mono text-[10px] tracking-[0.3em] mb-3 ${
            isDark ? 'text-[#444]' : 'text-[#999]'
          }`}
        >
          {label}
        </span>

        {/* Prompt */}
        <p
          className={`font-body text-xs text-center max-w-md leading-relaxed ${
            isDark ? 'text-[#666]' : 'text-[#777]'
          }`}
        >
          {prompt}
        </p>

        {/* Technical decoration */}
        <div className={`mt-4 font-mono text-[9px] ${isDark ? 'text-[#333]' : 'text-[#bbb]'}`}>
          <span className="tracking-wider">PLACEHOLDER :: AWAITING MEDIA</span>
        </div>
      </div>

      {/* Corner frame */}
      <CornerFrame theme={theme} />

      {/* Corner labels */}
      <div className={`absolute top-3 left-3 font-mono text-[8px] tracking-wider ${
        isDark ? 'text-[#333]' : 'text-[#bbb]'
      }`}>
        {aspectRatio.toUpperCase()}
      </div>
      <div className={`absolute top-3 right-3 font-mono text-[8px] tracking-wider ${
        isDark ? 'text-[#333]' : 'text-[#bbb]'
      }`}>
        LOOP
      </div>
    </motion.div>
  );
}
