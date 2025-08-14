'use client';

import { useEffect, useMemo, useRef } from 'react';
import styles from '@/styles/timelineScroller.module.css';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';

export default function TimelineScroller() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<Draggable[] | null>(null);

  const markers = useMemo(() => Array.from({ length: 50 }, (_, i) => i), []);

  useEffect(() => {
    if (!timelineRef.current || !scrollerRef.current || !containerRef.current || !wrapperRef.current) return;

    gsap.registerPlugin(Draggable);

    const wrapper = wrapperRef.current;
    const timeline = timelineRef.current;
    const scroller = scrollerRef.current;
    const container = containerRef.current;

    const compute = () => {
      const viewportW = wrapper.clientWidth;
      const timelineWidth = timeline.offsetWidth;
      const scrollerWidth = scroller.offsetWidth;
      const gap = parseFloat(getComputedStyle(document.body).fontSize || '16');
      const minX = gap;
      const maxX = Math.max(gap, timelineWidth - scrollerWidth - gap);
      const maxDragX = Math.max(1, timelineWidth - scrollerWidth - 2 * gap);
      const maxContainerShift = Math.max(0, container.scrollWidth - viewportW);
      return { gap, minX, maxX, maxDragX, maxContainerShift };
    };

    let state = compute();

    const updateContainerByScrollerX = (x: number) => {
      const progress = (x - state.gap) / state.maxDragX;
      const clamped = isFinite(progress) ? Math.min(1, Math.max(0, progress)) : 0;
      const containerX = -state.maxContainerShift * clamped;
      gsap.to(container, { x: containerX, duration: 1, ease: 'power3.out' });
    };

    dragRef.current?.forEach(d => d.kill());
    dragRef.current = Draggable.create(scroller, {
      type: 'x',
      bounds: { minX: state.minX, maxX: state.maxX },
      onDrag() {
        updateContainerByScrollerX(this.x);
      },
    });

    const handleResize = () => {
      const prevX = dragRef.current?.[0]?.x ?? state.minX;
      state = compute();
      const nextX = Math.min(state.maxX, Math.max(state.minX, prevX));
      dragRef.current?.[0]?.applyBounds({ minX: state.minX, maxX: state.maxX });
      gsap.set(scroller, { x: nextX });
      updateContainerByScrollerX(nextX);
    };

    window.addEventListener('resize', handleResize);
    gsap.set(scroller, { x: state.minX });
    updateContainerByScrollerX(state.minX);

    return () => {
      window.removeEventListener('resize', handleResize);
      dragRef.current?.forEach(d => d.kill());
      dragRef.current = null;
      gsap.set(container, { clearProps: 'x' });
      gsap.set(scroller, { clearProps: 'x' });
    };
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div ref={containerRef} className={styles.container}>
        <section id="section-1" className={styles.section}>
          <div className={styles['img-1']}>
            <img src="/images/events/img1.jpg" alt="Bild 1" />
          </div>
          <div className={styles['img-2']}>
            <img src="/images/events/img1.jpg" alt="Bild 2" />
          </div>
          <div className={styles['img-3']}>
            <img src="/images/events/img1.jpg" alt="Bild 3" />
          </div>
        </section>

        <section id="section-2" className={styles.section}>
          <div className={styles['img-4']}>
            <img src="/images/events/img1.jpg" alt="Bild 4" />
          </div>
          <div className={styles['img-5']}>
            <img src="/images/events/img1.jpg" alt="Bild 5" />
          </div>
          <div className={styles['img-6']}>
            <img src="/images/events/img1.jpg" alt="Bild 6" />
          </div>
        </section>

        <section id="section-3" className={styles.section}>
          <div className={styles['img-7']}>
            <img src="/images/events/img1.jpg" alt="Bild 4" />
          </div>
          <div className={styles['img-8']}>
            <img src="/images/events/img1.jpg" alt="Bild 5" />
          </div>
          <div className={styles['img-9']}>
            <img src="/images/events/img1.jpg" alt="Bild 6" />
          </div>
        </section>
      </div>

      <div ref={timelineRef} className={styles.timeline}>
        {markers.map(i => (
          <div key={i} className={styles.marker} />
        ))}
        <div ref={scrollerRef} className={styles.scroller}>
          <p>
            [<span>Drag</span>]
          </p>
        </div>
      </div>
    </div>
  );
}