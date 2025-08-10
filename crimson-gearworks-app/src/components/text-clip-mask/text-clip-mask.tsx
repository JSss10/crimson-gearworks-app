// app/components/text-clip-mask/text-clip-mask.tsx
'use client';

import { useRef, useEffect } from 'react';
import styles from '@/styles/mask.module.css';

export default function TextClipMask() {
  const container = useRef<HTMLDivElement | null>(null);
  const stickyMask = useRef<HTMLDivElement | null>(null);

  const initialMaskSize = 0.8; // 80%
  const targetMaskSize = 30;   // +3000%
  const easing = 0.15;         // scroll easing
  const easedProgressRef = useRef(0);

  useEffect(() => {
    let rafId = 0;

    const animate = () => {
      const progress = getScrollProgress();
      const maskSizeProgress = targetMaskSize * progress; // 0..target
      const size = (initialMaskSize + maskSizeProgress) * 100 + '%';

      if (stickyMask.current) {
        // Safari/WebKit needs prefixed property; set both for safety
        (stickyMask.current.style as any).webkitMaskSize = size;
        (stickyMask.current.style as any).maskSize = size;
      }

      rafId = requestAnimationFrame(animate);
    };

    const getScrollProgress = () => {
      if (!container.current) return 0;

      const rect = container.current.getBoundingClientRect();
      const max = rect.height - window.innerHeight; // total scrollable distance within the section
      if (max <= 0) return 0;

      const current = Math.min(Math.max(-rect.top, 0), max); // how far we've scrolled into the section
      const raw = current / max; // 0..1

      const delta = raw - easedProgressRef.current;
      easedProgressRef.current += delta * easing; // smooth the animation

      return easedProgressRef.current;
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section>
      <div ref={container} className={styles.container}>
        <div ref={stickyMask} className={styles.stickyMask}>
          <video autoPlay muted loop playsInline>
            <source src="/medias/nature.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
