'use client';
import { useState, KeyboardEvent } from 'react';
import { motion, type Variants, cubicBezier } from 'framer-motion';
import styles from '@/styles/project.module.css';

export type ProjectItem = {
  title1: string;
  title2: string;
  src: string;
  alt?: string;
};

const easeBezier = cubicBezier(0.23, 1, 0.32, 1);

const anim: Variants = {
  initial: { width: 0 },
  open: { width: 'auto', transition: { duration: 0.4, ease: easeBezier } },
  closed: { width: 0 },
};

export default function Project({ project }: { project: ProjectItem }) {
  const [isActive, setIsActive] = useState(false);
  const { title1, title2, src, alt } = project;

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsActive((v) => !v);
    }
  };

  return (
    <div
      className={styles.project}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      tabIndex={0}
      role="button"
      aria-pressed={isActive}
      onKeyDown={onKey}
    >
      <p>{title1}</p>
      <motion.div
        variants={anim}
        initial="initial"
        animate={isActive ? 'open' : 'closed'}
        className={styles.imgContainer}
      >
        <img
          src={`/images/events/${src}`}
          alt={alt ?? `${title1} ${title2}`}
          loading="lazy"
        />
      </motion.div>
      <p>{title2}</p>
    </div>
  );
}