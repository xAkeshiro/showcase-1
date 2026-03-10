'use client';

import { useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { VideoPlaceholder } from '@/components/ui/VideoPlaceholder';

interface ProjectCardProps {
  project: {
    id: number;
    number: string;
    title: string;
    subtitle: string;
    category: string;
    year: string;
    videoPrompt: string;
    color?: string;
  };
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    cardRef.current.style.transform = `
      perspective(600px)
      rotateY(${x * 12}deg)
      rotateX(${-y * 12}deg)
      scale(1.03)
    `;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)';
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative flex-shrink-0 w-[80vw] md:w-[45vw] lg:w-[35vw]"
    >
      {/* Project Number */}
      <div className="absolute -left-4 top-0 z-10">
        <span className="font-display text-[8rem] md:text-[12rem] text-black/5 leading-none select-none">
          {project.number}
        </span>
      </div>

      {/* Card with 3D tilt */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden mb-6 transition-transform duration-200 ease-out"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        <VideoPlaceholder
          prompt={project.videoPrompt}
          aspectRatio="video"
          theme="light"
          label={project.title}
          className="w-full"
        />

        {/* Color circle reveal on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ perspective: '600px' }}
        >
          <div
            className="rounded-full transition-all duration-600 ease-out"
            style={{
              width: isHovered ? '800px' : '0px',
              height: isHovered ? '800px' : '0px',
              background: project.color || 'rgba(0,0,0,0.15)',
              opacity: isHovered ? 0.25 : 0,
              transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1), height 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s',
            }}
          />
        </div>

        {/* View project label */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        >
          <span className="font-mono text-[10px] text-white tracking-wider px-4 py-2 border border-white/50 backdrop-blur-sm bg-black/20">
            VIEW PROJECT
          </span>
        </div>
      </div>

      {/* Project Info */}
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-3">
          <span className="font-mono text-[9px] text-[#999] tracking-wider">
            {project.category}
          </span>
          <span className="w-8 h-[1px] bg-[#ddd]" />
          <span className="font-mono text-[9px] text-[#999] tracking-wider">
            {project.year}
          </span>
        </div>

        <h3
          className="font-display text-2xl md:text-3xl text-black tracking-wider chromatic-text"
          data-text={`${project.title} ${project.subtitle}`}
        >
          {project.title}
          <span className="text-[#ccc] ml-2">{project.subtitle}</span>
        </h3>
      </div>
    </motion.div>
  );
}
