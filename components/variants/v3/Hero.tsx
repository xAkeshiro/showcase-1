'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

const roles = ['DESIGN', 'DEVELOP', 'MOTION', 'CREATE'];

export function V3Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const [currentRole, setCurrentRole] = useState(0);
  const [isHoveringIcon, setIsHoveringIcon] = useState(false);

  // Mouse position for magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const iconX = useSpring(mouseX, springConfig);
  const iconY = useSpring(mouseY, springConfig);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Magnetic effect handler
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!iconRef.current || !isHoveringIcon) return;
    const rect = iconRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;
    mouseX.set(deltaX);
    mouseY.set(deltaY);
  };

  const handleMouseLeave = () => {
    setIsHoveringIcon(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen bg-white flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Background grid - refined */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e8e8e8 1px, transparent 1px),
            linear-gradient(to bottom, #e8e8e8 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Large Background Text - with blur */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <motion.span
          className="font-display text-[22vw] text-[#f0f0f0] tracking-[0.1em] select-none"
          style={{ filter: 'blur(1px)' }}
        >
          黒星
        </motion.span>
      </motion.div>

      {/* Horizontal scanning line - enhanced */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.08) 50%, transparent 100%)',
        }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
      />

      {/* Grid Lines - subtle */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-[#e5e5e5]" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#e5e5e5]" />
        <div className="absolute left-3/4 top-0 bottom-0 w-[1px] bg-[#e5e5e5]" />
        <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-[#e5e5e5]" />
        <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-[#e5e5e5]" />
      </div>

      {/* Split Layout Container */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full h-full min-h-screen flex items-center"
      >
        {/* Left Side - Content */}
        <div className="flex-1 pl-12 md:pl-20 lg:pl-32 pr-8">
          {/* Rotating Role - enhanced animation */}
          <div className="h-6 mb-6 overflow-hidden">
            <motion.div
              key={currentRole}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            >
              <span className="font-mono text-xs text-[#999] tracking-[0.5em]">
                WE {roles[currentRole]}
              </span>
            </motion.div>
          </div>

          {/* Main Title - staggered letters */}
          <div className="space-y-2 mb-6">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="font-display text-[clamp(3rem,10vw,8rem)] text-black tracking-[0.05em] leading-[0.9]"
              >
                {'KURO'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.06, duration: 0.5 }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="font-display text-[clamp(3rem,10vw,8rem)] tracking-[0.05em] leading-[0.9]"
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '1.5px rgba(0,0,0,0.2)',
                }}
              >
                {'SEI'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.06, duration: 0.5 }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>
            </div>
          </div>

          {/* Japanese Subtitle - with line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[1px] bg-[#ccc]" />
            <span className="font-body-jp text-sm text-[#888] tracking-wider">
              黒星 — Black Star
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="font-body text-sm text-[#777] max-w-md leading-relaxed mb-12"
          >
            A creative studio crafting digital experiences through design,
            development, and motion. Based in Tokyo, working globally.
          </motion.p>

          {/* Scroll Indicator - refined */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex items-center gap-6"
          >
            <span className="font-mono text-[9px] text-[#aaa] tracking-widest">
              SCROLL TO EXPLORE
            </span>
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-12 h-[1px] bg-gradient-to-r from-[#ccc] to-transparent"
            />
          </motion.div>
        </div>

        {/* Right Side - Icon with magnetic effect */}
        <div className="flex-1 flex items-center justify-center pr-12 md:pr-20 lg:pr-32">
          <motion.div
            ref={iconRef}
            style={{ x: iconX, y: iconY }}
            onMouseEnter={() => setIsHoveringIcon(true)}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="relative w-[clamp(12rem,28vw,22rem)] h-[clamp(12rem,28vw,22rem)] cursor-pointer"
          >
            {/* Hover glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              animate={{
                boxShadow: isHoveringIcon
                  ? '0 0 80px rgba(0,0,0,0.08)'
                  : '0 0 40px rgba(0,0,0,0.03)',
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Outermost ring */}
            <motion.div
              className="absolute inset-0 border border-black/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
            />

            {/* Outer rotating ring */}
            <motion.div
              className="absolute inset-[10%] border border-black/20"
              initial={{ rotate: 15 }}
              animate={{ rotate: 375 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            />

            {/* Middle rotating square */}
            <motion.div
              className="absolute inset-[22%] border border-black/25"
              initial={{ rotate: 45 }}
              animate={{ rotate: [45, 405] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            />

            {/* Inner rotating square */}
            <motion.div
              className="absolute inset-[35%] border border-black/15"
              initial={{ rotate: -30 }}
              animate={{ rotate: [-30, -390] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            />

            {/* Star center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 1, duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                whileHover={{ scale: 1.1 }}
                className="text-[clamp(2.5rem,6vw,5rem)] text-black select-none block"
              >
                ★
              </motion.span>
            </div>

            {/* Orbital dots */}
            {[0, 120, 240].map((angle, i) => (
              <motion.div
                key={angle}
                className="absolute w-1.5 h-1.5 bg-black/20 rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                }}
                animate={{
                  x: [
                    Math.cos((angle * Math.PI) / 180) * 90,
                    Math.cos(((angle + 360) * Math.PI) / 180) * 90,
                  ],
                  y: [
                    Math.sin((angle * Math.PI) / 180) * 90,
                    Math.sin(((angle + 360) * Math.PI) / 180) * 90,
                  ],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Corner Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-8"
      >
        <span className="font-mono text-[9px] text-[#aaa] tracking-wider">
          DESIGN + DEVELOPMENT + MOTION
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 right-8"
      >
        <span className="font-mono text-[9px] text-[#aaa] tracking-wider">
          // 01 / HERO
        </span>
      </motion.div>

      {/* Side accent lines */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-40"
        style={{ background: 'linear-gradient(180deg, transparent 0%, #ddd 50%, transparent 100%)' }}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      />
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-40"
        style={{ background: 'linear-gradient(180deg, transparent 0%, #ddd 50%, transparent 100%)' }}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      />

      {/* Corner brackets */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute top-8 left-8"
      >
        <div className="w-6 h-6 border-t border-l border-[#ddd]" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute top-8 right-8"
      >
        <div className="w-6 h-6 border-t border-r border-[#ddd]" />
      </motion.div>
    </section>
  );
}
