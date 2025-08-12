import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import React, { useRef } from "react";
import styles from "@/styles/scroll.module.css";

interface ParagraphProps {
  paragraph: string;
}

export default function Paragraph({ paragraph }: ParagraphProps) {
  const container = useRef<HTMLParagraphElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  const opacity: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.p ref={container} className={styles.paragraph} style={{ opacity }}>
      {paragraph}
    </motion.p>
  );
}
