"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/parts-shop/parts-shop.module.css";
import type { Part } from "@/types/shop-categories";

interface Props { part: Part; featured?: boolean; wide?: boolean; imageOnly?: boolean; }

export default function PartCard({ part, featured, wide, imageOnly }: Props) {
  const classes = [
    styles.card,
    featured ? styles.featured : "",
    wide ? styles.wide : "",
    imageOnly ? styles.imageOnly : "",
  ].join(" ");

  const content = imageOnly ? (
    <div className={styles.fullImgWrap}>
      <Image src={part.image || ""} alt="" fill className={styles.fullImg} />
    </div>
  ) : (
    <>
      {featured && (
        <>
          <span className={styles.cornerTL} />
          <span className={styles.cornerTR} />
          <span className={styles.cornerBL} />
        </>
      )}
      <header className={styles.cardHeader}>
        <h3 className={styles.sku}>{part.sku}</h3>
        <h3 className={styles.title} id={`title-${part.id}`}>{part.name}</h3>
      </header>
      <div className={styles.cardImgWrap}>
        {featured && <span className={styles.imgFrame} aria-hidden />}
        {part.image ? (
          <Image src={part.image} alt={`${part.name} image`} fill className={styles.cardImg} />
        ) : (
          <div className={styles.placeholder} aria-hidden>
            <span className={styles.placeholderText}>{part.name.split(" ")[0]}</span>
          </div>
        )}
      </div>
      {featured && (
        <div className={styles.ctaDock} aria-hidden>
          <button type="button" className={styles.ctaBtn} aria-label="Open details">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 17 L17 7 M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </>
  );

  return (
    <article className={classes}>
      {content}
      {part.href && (
        <Link
          href={part.href}
          className={styles.stretchedLink}
          aria-label={`Open ${part.name}`}
        />
      )}
    </article>
  );
}
