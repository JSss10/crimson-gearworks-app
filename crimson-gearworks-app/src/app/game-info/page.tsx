import React from "react";
import Image from "next/image";
import styles from "@/styles/game-info/index.module.css";
import Character from "@/components/features/character-text-scroll";
import TextClipMask from "@/components/features/text-clip-mask";
import HoverGallery from "@/components/features/hover-gallery";
import type { GameShowcaseItem } from "@/components/features/game-showcase";

const paragraph = "The general artstyle we strive for is a stylized semi-realistic look for the overall visuals of the game. Main inspirations for that look are both “Granblue Fantasy: Relink” by Cygames and “Honkai: Star Rail” by miHoYo. The player’s controlled mecha is largely inspired by various bipedal mechas in media such as “Armored Core”, “Gundam” and other works of that genre. There’s also a heavy emphasis placed on the mechanical aspect being somewhat grounded in mechanical realism. The monster’s overall design is inspired by lava- and fire-themed creatures from the aforementioned game “Granblue Fantasy: Relink” and “Monster Hunter”.";

const items: GameShowcaseItem[] = [
  { title1: "The Volcanic", title2: "Plateau", src: "img1.jpg" },
  { title1: "The", title2: "Beam Rifle", src: "img1.jpg" },
  { title1: "Quickboost", title2: "Thrusters", src: "img1.jpg" },
  { title1: "The Cannon is", title2: "a ranged module", src: "img1.jpg" },
  { title1: "Single", title2: "player experience", src: "img1.jpg" },
];

export default function GameInfoPage() {
  return (
    <>
      <section className={styles.container}>
        <div className={styles.mediaWrap} aria-hidden="true">
          <div className={styles.mediaInner}>
            <Image
              src="/images/game-info/game-info-hero.png"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 100vw, 100vw"
              className={styles.media}
            />
          </div>
          <div className={styles.overlay} />
        </div>

        <div className={styles.hero}>
          <div className={styles.heroInner}>
            <h1 className={styles.titleLine}>
              <span className={styles.orange}>Project</span>
            </h1>
            <h1 className={styles.titleLineTwo}>
              <span>Assemblance</span>
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