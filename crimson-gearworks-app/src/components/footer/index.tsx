import React from "react";
import Content from "./content";
import styles from "@/styles/footer/index.module.css";

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.fixedContent}>
        <Content />
      </div>
    </div>
  );
}