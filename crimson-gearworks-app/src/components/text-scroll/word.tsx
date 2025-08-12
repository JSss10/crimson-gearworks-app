import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import React, { useRef } from "react";
import styles from "@/styles/scroll.module.css";

interface ParagraphProps {
  paragraph: string;
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

export default function Paragraph({ paragraph }: ParagraphProps) {
  const container = useRef<HTMLParagraphElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = paragraph.split(" ");

  return (
    <p ref={container} className={styles.paragraph}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

const Word = ({ children, progress, range }: WordProps) => {
  const opacity: MotionValue<number> = useTransform(progress, range, [0, 1]);

  return (
    <span className={styles.word}>
      <span className={styles.shadow}>{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};
