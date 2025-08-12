import React from 'react';
import Image from 'next/image';
import styles from '@/styles/gameInfo.module.css';

export default function GameInfoPage() {
  return (
    <section className={styles.container}>
      <div className={styles.mediaWrap} aria-hidden="true">
        <div className={styles.mediaInner}>
          <Image
            src="/images/events/img1.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.media} />
        </div>
        <div className={styles.overlay} />
      </div>

      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.titleLine}>
            <span className={styles.orange}>Game</span>
            <span className={styles.white}>name</span>
          </h1>
          <h1 className={styles.titleLineTwo}>
            <span>The game</span>
          </h1>
        </div>
      </div>
    </section>
  );
}