'use client';

import { ReactNode } from 'react';
import { V2LayoutProvider } from './components/V2LayoutProvider';
import { Nav } from './components/Nav';
import { CustomCursor } from './components/CustomCursor';
import { PageTransition } from './components/PageTransition';

export function V2LayoutClient({ children }: { children: ReactNode }) {
  return (
    <V2LayoutProvider>
      <div className="v2-root min-h-screen text-white">
        <Nav />
        <CustomCursor />
        <PageTransition />
        <main>{children}</main>
      </div>
    </V2LayoutProvider>
  );
}
