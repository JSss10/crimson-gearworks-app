'use client';

import { useRef, useEffect } from 'react';
import styles from '@/styles/mask.module.css';

export default function TextClipMask() {
  const container = useRef<HTMLDivElement | null>(null);
  const stickyMask = useRef<HTMLDivElement | null>(null);

  const initialMaskSize = 0.8;
  const targetMaskSize = 30;
  const easing = 0.15;
  let easedScrollProgress = 0;

  useEffect(() => {
    const animate = () => {
      const progress = getScrollProgress();
      const maskSizeProgress = targetMaskSize * progress;

      if (stickyMask.current) {
        stickyMask.current.style.webkitMaskSize =
          (initialMaskSize + maskSizeProgress) * 100 + '%';
      }

      requestAnimationFrame(animate);
    };

    const getScrollProgress = () => {
      if (!container.current || !stickyMask.current) return 0;

      const scrollProgress =
        stickyMask.current.offsetTop /
        (container.current.getBoundingClientRect().height - window.innerHeight);

      const delta = scrollProgress - easedScrollProgress;
      easedScrollProgress += delta * easing;

      return easedScrollProgress;
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <main className={styles.main}>
      <div ref={container} className={styles.container}>
        <div ref={stickyMask} className={styles.stickyMask}>
          <video autoPlay muted loop>
            <source src="/medias/nature.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </main>
  );
}
