'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Navigation } from '@/components/sections/Navigation';
import { Hero } from '@/components/sections/Hero';
import { News } from '@/components/sections/News';
import { Characters } from '@/components/sections/Characters';
import { World } from '@/components/sections/World';
import { Media } from '@/components/sections/Media';
import { Footer } from '@/components/sections/Footer';

export function PageWrapper() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={handleLoadComplete} minimumLoadTime={3000} />
        )}
      </AnimatePresence>

      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        <Navigation />
        <main>
          <Hero />
          <News />
          <Characters />
          <World />
          <Media />
        </main>
        <Footer />
      </div>
    </>
  );
}
