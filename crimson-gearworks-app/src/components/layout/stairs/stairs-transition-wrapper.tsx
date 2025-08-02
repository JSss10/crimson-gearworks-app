'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import StairsTransitionLayout from '@/components/layout/stairs/stairs-transition-layout';
import { ReactNode } from 'react';

export default function StairsTransitionWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <StairsTransitionLayout key={pathname}>
        {children}
      </StairsTransitionLayout>
    </AnimatePresence>
  );
}
