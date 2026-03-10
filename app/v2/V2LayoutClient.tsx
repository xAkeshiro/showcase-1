'use client';

import { ReactNode } from 'react';
import { V2LayoutProvider } from './components/V2LayoutProvider';
import { Nav } from './components/Nav';
import { CustomCursor } from './components/CustomCursor';
import { PageTransition } from './components/PageTransition';

interface V2LayoutClientProps {
  children: ReactNode;
}

export function V2LayoutClient({ children }: V2LayoutClientProps) {
  return (
    <V2LayoutProvider>
      <div style={{ cursor: 'none', minHeight: '100vh', background: '#0a0a0a' }}>
        {/* Global chromatic text styles */}
        <style jsx global>{`
          .chromatic-text {
            position: relative;
          }
          .chromatic-text::before,
          .chromatic-text::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
          }
          .chromatic-text::before {
            color: rgba(255, 0, 80, 0.35);
            transform: translate(-3px, -2px);
            z-index: -1;
          }
          .chromatic-text::after {
            color: rgba(0, 200, 255, 0.35);
            transform: translate(3px, 2px);
            z-index: -1;
          }
          .chromatic-text:hover::before {
            transform: translate(-5px, -3px);
          }
          .chromatic-text:hover::after {
            transform: translate(5px, 3px);
          }
        `}</style>

        {/* Persistent navigation */}
        <Nav />

        {/* Custom cursor */}
        <CustomCursor />

        {/* Page transition overlay */}
        <PageTransition />

        {/* Page content */}
        <main className="min-h-screen pt-16">
          {children}
        </main>
      </div>
    </V2LayoutProvider>
  );
}
