'use client';

import { useState } from 'react';
import styles from '@/styles/leaderboard/index.module.css';
import Competitor from '@/components/leaderboard/competitor';
import Modal from '@/components/features/modal';

interface CompetitorType {
  title: string;
  location: string;
  src: string;
  color: string;
}

interface ModalType {
  active: boolean;
  index: number;
}

const competitors: CompetitorType[] = [
  { title: "Kaijura", location: "Los Angeles | USA", src: "test.png", color: "#000000" },
  { title: "Unit_04X", location: "Seoul | South Korea", src: "test.png", color: "#000000" },
  { title: "TheSeer", location: "Beijing | China", src: "test.png", color: "#000000" },
  { title: "TheSeer", location: "Beijing | China", src: "test.png", color: "#000000" },
  { title: "TheSeer", location: "Beijing | China", src: "test.png", color: "#000000" },
  { title: "TheSeer", location: "Beijing | China", src: "test.png", color: "#000000" },
  { title: "TheSeer", location: "Beijing | China", src: "test.png", color: "#000000" },
  { title: "TheSeer", location: "Beijing | China", src: "test.png", color: "#000000" },
  { title: "TheSeer", location: "Beijing | China", src: "test.png", color: "#000000" },
  { title: "Echo-9", location: "New Delhi | India", src: "test.png", color: "#000000" }
];

export default function LeaderboardPage() {
  const [modal, setModal] = useState<ModalType>({ active: false, index: 0 });

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>
        <span>LEADER</span>BOARD
      </h1>
      <div className={styles.body}>
        {competitors.map((competitor, index) => (
          <Competitor
            key={index}
            index={index}
            title={competitor.title}
            location={competitor.location}
            setModal={setModal}
          />
        ))}
      </div>
      <Modal modal={modal} competitors={competitors} />
    </div>
  );
}