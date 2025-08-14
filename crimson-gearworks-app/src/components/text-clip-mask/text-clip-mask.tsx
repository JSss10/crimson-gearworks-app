'use client';

import { useRef, useEffect } from 'react';
import styles from '@/styles/mask.module.css';

export default function TextClipMask() {
  const container = useRef<HTMLDivElement | null>(null);
  const stickyMask = useRef<HTMLDivElement | null>(null);

  // Tunables: sichtbare Höhe und Scroll-Distanz (in vh)
  const STICKY_VH = 60; // reduziert die sichtbare Höhe (zuvor 100)
  const SCROLL_VH = 60; // wie viel gescrollt werden muss, um die Maske voll zu vergrößern

  const initialMaskSize = 0.8; // 80%
  const targetMaskSize = 30;   // +3000%
  const easing = 0.15;

  const easedProgressRef = useRef(0);
  const startYRef = useRef(0);
  const scrollDistPxRef = useRef(0);

  useEffect(() => {
    const recalc = () => {
      if (!container.current) return;
      const rect = container.current.getBoundingClientRect();
      const pageTop = window.scrollY + rect.top;
      // Start der Animation: sobald der Container die Viewport-Oberkante erreicht
      startYRef.current = pageTop;
      // Dauer der Animation rein virtuell über SCROLL_VH, unabhängig von Containerhöhe
      scrollDistPxRef.current = (SCROLL_VH / 100) * window.innerHeight;
    };

    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

    let rafId = 0;
    const animate = () => {
      const start = startYRef.current;
      const dist = scrollDistPxRef.current || 1;
      const raw = clamp01((window.scrollY - start) / dist);

      // sanftes Nachziehen
      easedProgressRef.current += (raw - easedProgressRef.current) * easing;

      const size = (initialMaskSize + targetMaskSize * easedProgressRef.current) * 100 + '%';

      if (stickyMask.current) {
        (stickyMask.current.style as any).webkitMaskSize = size;
        (stickyMask.current.style as any).maskSize = size;
      }

      rafId = requestAnimationFrame(animate);
    };

    recalc();
    window.addEventListener('resize', recalc, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', recalc);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section>
      <div
        ref={container}
        className={styles.container}
        style={
          {
            ['--sticky-h' as any]: `${STICKY_VH}vh`,
            ['--scroll-dist' as any]: `${SCROLL_VH}vh`,
          } as React.CSSProperties
        }
      >
        <div ref={stickyMask} className={styles.stickyMask}>
          <video autoPlay muted loop playsInline>
            <source src="/medias/nature.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
