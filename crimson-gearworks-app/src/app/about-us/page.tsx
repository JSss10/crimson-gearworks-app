import React from 'react';
import Image from 'next/image';
import styles from '@/styles/about-us/index.module.css';
import Team from '@/components/features/team-reveal';
import PolaroidScene from '@/components/features/polaroid-scene';

export default function AboutUsPage() {
  return (
    <>
      <section className={styles.container}>
        <div className={styles.mediaWrap} aria-hidden="true">
          <div className={styles.mediaInner}>
            <Image
              src="/images/about-us/team.png"
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
              <span className={styles.orange}>Who</span>
              <span className={styles.white}>we are</span>
            </h1>
            <h1 className={styles.titleLineTwo}>
              <span>The team</span>
            </h1>
          </div>
        </div>
      </section>
      <Team />
      <PolaroidScene title="Our spirit" imagesCount={12} imagePathTemplate="/images/about-us/insight{n}.png" />
    </>
  );
}