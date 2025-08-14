"use client";
import Image from "next/image";
import styles from "@/styles/parts-shop/partsShop.module.css";
import type { Part } from "@/types/categories";

interface Props { part: Part }

export default function PartCard({ part }: Props) {
  return (
    <article className={styles.card} tabIndex={0} aria-labelledby={`title-${part.id}`}>
      <header className={styles.cardHeader}>
        <h3 className={styles.sku}>{part.sku}</h3>
        <h3 className={styles.title} id={`title-${part.id}`}>{part.name}</h3>
      </header>
      <div className={styles.cardImgWrap}>
        {part.image ? (
          <Image
            src={part.image}
            alt={`${part.name} image`}
            fill
            className={styles.cardImg}
            sizes="(max-width: 600px) 100vw, 33vw"
            priority={false}
          />
        ) : (
          <div className={styles.placeholder} aria-hidden>
            <span className={styles.placeholderText}>{part.name.split(" ")[0]}</span>
          </div>
        )}
      </div>
    </article>
  );
}
