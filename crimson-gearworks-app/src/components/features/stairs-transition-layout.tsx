"use client";

import { motion } from "framer-motion";
import { expand, opacity } from "@/lib/anim";
import styles from "@/styles/features/stairs-transition.module.css";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  backgroundColor?: string;
};

export default function StairsTransitionLayout({ children, backgroundColor }: Props) {
  const anim = (variants: any, custom: number | null = null) => ({
    initial: "initial",
    animate: "enter",
    exit: "exit",
    custom,
    variants,
  });

  const nbOfColumns = 5;

  return (
    <div className={styles.page} style={{ backgroundColor }}>
      <motion.div {...anim(opacity)} className={styles.transitionBackground} />
      <div className={styles.transitionContainer}>
        {Array.from({ length: nbOfColumns }, (_, i) => (
          <motion.div
            key={i}
            {...anim(expand, nbOfColumns - i)}
            className={styles.transitionColumn}
          />
        ))}
      </div>
      {children}
    </div>
  );
}