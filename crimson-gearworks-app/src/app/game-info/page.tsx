import React from 'react';
import Image from 'next/image';
import styles from '@/styles/game-info/index.module.css';
import Character from '@/components/features/character-text-scroll';
import TextClipMask from '@/components/features/text-clip-mask';
import HoverGallery from '@/components/features/hover-gallery';
import type { GameShowcaseItem } from '@/components/features/game-showcase';

const paragraph = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."

const items: GameShowcaseItem[] = [
  { title1: 'Lorem ipsum', title2: 'Lorem', src: 'img1.jpg' },
  { title1: 'Lorem ipsum', title2: 'Lorem', src: 'img1.jpg' },
  { title1: 'Lorem ipsum', title2: 'Lorem', src: 'img1.jpg' },
  { title1: 'Lorem ipsum', title2: 'Lorem', src: 'img1.jpg' },
  { title1: 'Lorem ipsum', title2: 'Lorem', src: 'img1.jpg' },
];

export default function GameInfoPage() {
  return (
    <>
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
      <Character paragraph={paragraph} />
      <TextClipMask />
      <HoverGallery items={items} />
    </>
  );
}