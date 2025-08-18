import React from "react";
import styles from "@/styles/home/hero.module.css";

export default function Hero() {
  return (
    <section className={styles.container} aria-label="Hero">
      <div className={styles.videoWrap} aria-hidden="true">
        <video
          className={styles.video}
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          // poster="/medias/nature.jpg"
          tabIndex={-1}
        >
          <source src="/medias/nature.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>A third-person action</p>
        <h1 className={styles.wordmark} aria-label="GAME">
          <span aria-hidden>G</span>
          <span aria-hidden>A</span>
          <span aria-hidden>M</span>
          <span aria-hidden>E</span>
          <span className={styles.srOnly}>GAME</span>
        </h1>
        <p className={styles.tagline}>
          experience
          <br />
          mecha vs monster combat
        </p>
      </div>
    </section>
  );
}