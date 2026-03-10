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
        {/* Global styles */}
        <style jsx global>{`
          /* Clean chromatic text - subtle, only on hover */
          .chromatic-text {
            position: relative;
            transition: all 0.3s ease;
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
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s ease;
          }
          .chromatic-text::before {
            color: rgba(0, 0, 255, 0.15);
            z-index: -1;
          }
          .chromatic-text::after {
            color: rgba(255, 255, 255, 0.1);
            z-index: -1;
          }
          .chromatic-text:hover::before {
            opacity: 1;
            transform: translate(-2px, -1px);
          }
          .chromatic-text:hover::after {
            opacity: 1;
            transform: translate(2px, 1px);
          }

          /* Blue accent color */
          :root {
            --accent: #00f;
            --accent-dim: rgba(0, 0, 255, 0.5);
            --accent-subtle: rgba(0, 0, 255, 0.15);
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
