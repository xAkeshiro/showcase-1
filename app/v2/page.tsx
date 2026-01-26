'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from '@/components/LoadingScreen';
import { VariantNavigation } from '@/components/variants/v2/Navigation';
import { VariantHero } from '@/components/variants/v2/Hero';
import { VariantWork } from '@/components/variants/v2/Work';
import { VariantAbout } from '@/components/variants/v2/About';
import { VariantContact } from '@/components/variants/v2/Contact';

export default function VariantPage() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={handleLoadComplete} minimumLoadTime={2500} />
        )}
      </AnimatePresence>

      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        <VariantNavigation />
        <main>
          <VariantHero />
          <VariantWork />
          <VariantAbout />
          <VariantContact />
        </main>
      </div>
    </>
  );
}
