'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingScreenV2 } from '@/components/variants/v2/LoadingScreen';
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
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreenV2 onComplete={handleLoadComplete} minimumLoadTime={2500} />
        )}
      </AnimatePresence>

      {/* Content reveals from the right as loader swipes left */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={isLoading ? { opacity: 0, x: 50 } : { opacity: 1, x: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        <VariantNavigation />
        <main>
          <VariantHero />
          <VariantWork />
          <VariantAbout />
          <VariantContact />
        </main>
      </motion.div>
    </>
  );
}
