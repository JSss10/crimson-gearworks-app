import React from 'react';
import styles from '@/styles/home/hero.module.css';

export default function Hero() {
  return (
    <section className={styles.container}>
      <div className={styles.videoWrap} aria-hidden>
        <video
          className={styles.video}
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
        >
          <source src="/medias/nature.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>
          A third-person action
        </p>
        <h1 className={styles.wordmark} aria-label="GAME">
          <span>G</span><span>A</span><span>M</span><span>E</span>
        </h1>
        <p className={styles.tagline}>experience<br></br>mecha vs monster combat</p>
      </div>
    </section>
  );
}