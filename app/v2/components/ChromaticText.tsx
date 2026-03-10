'use client';

import { useRef, useState, useEffect } from 'react';

interface ChromaticTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span';
}

export function ChromaticText({ text, className = '', as: Tag = 'h2' }: ChromaticTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={`chromatic-text ${isVisible ? 'chromatic-active' : ''} ${className}`}
      data-text={text}
    >
      {text}
    </Tag>
  );
}
