'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingScreenV3 } from '@/components/variants/v3/LoadingScreen';
import { V3Hero } from '@/components/variants/v3/Hero';
import { VariantNavigation } from '@/components/variants/v2/Navigation';
import { VariantIntro } from '@/components/variants/v2/Intro';
import { VariantWork } from '@/components/variants/v2/Work';
import { VariantAbout } from '@/components/variants/v2/About';
import { VariantContact } from '@/components/variants/v2/Contact';

export default function V3Page() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreenV3 onComplete={handleLoadComplete} minimumLoadTime={3000} />
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
          <V3Hero />
          <VariantIntro />
          <VariantWork />
          <VariantAbout />
          <VariantContact />
        </main>
      </motion.div>
    </div>
  );
}
