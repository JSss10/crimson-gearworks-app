'use client';

import React from 'react';
import styles from '@/styles/leaderboard/competitor.module.css';

interface ModalType {
  active: boolean;
  index: number;
}

interface CompetitorProps {
  index: number;
  title: string;
  location: string;
  setModal: (modal: ModalType) => void;
}

export default function Competitor({ index, title, location, setModal }: CompetitorProps) {
  return (
    <div
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
      className={styles.competitor}
    >
      <div className={styles.info}>
        <h2>{title}</h2>
        <p>{location}</p>
      </div>
      <div className={styles.rank}>#{index + 1}</div>
    </div>
  );
}
