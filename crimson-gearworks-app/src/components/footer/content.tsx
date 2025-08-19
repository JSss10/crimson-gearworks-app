import React from "react";
import Link from "next/link";
import styles from "@/styles/footer/content.module.css";

const SOCIALS = {
  instagram: "https://www.instagram.com/crimonsgearworks/",
  twitter: "https://twitter.com/",
  tiktok: "https://tiktok.com/",
  discord: "https://discord.gg/",
};

export default function Content() {
  return (
    <div className={styles.container}>
      <Section1 />
      <Section2 />
    </div>
  );
}

const Section1 = () => {
  return (
    <div className={styles.section1}>
      <div className={styles.contact}>
        <h2 className={styles.contactHeading}>
          See how we can help you.<br />Get in touch today.
        </h2>
        <div className={styles.contactRow}>
          <a className={styles.button} href="mailto:hello@crimsongearworks.com">Email Us</a>
          <a className={styles.link} href="tel:+441274905411">+44 (0)1274 905411</a>
        </div>
        <p className={styles.smallText}>
          Site by Crimson Gearworks | © 2025 Crimson Gearworks. All Rights Reserved.
        </p>
      </div>
      <Nav />
    </div>
  );
};

const Section2 = () => {
  return (
    <div className={styles.section2}>
      <h1 className={styles.heading}>CRIMSON<br />GEARWORKS</h1>
    </div>
  );
};

const Nav = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.column}>
        <h3 className={styles.headingSmall}>Content</h3>
        <p><Link href="/game-info" className={styles.link}>Game Info</Link></p>
        <p><Link href="/3d-viewer" className={styles.link}>3D Model Viewer</Link></p>
        <p><Link href="/community" className={styles.link}>Community</Link></p>
        <p><Link href="/contact" className={styles.link}>Contact</Link></p>
      </div>
      <div className={styles.column}>
        <h3 className={styles.headingSmall}>Studio</h3>
        <p><Link href="/about-us" className={styles.link}>About Us</Link></p>
        <p className={styles.link}>Careers</p>
        <p className={styles.link}>News</p>
      </div>
      <div className={styles.column}>
        <h3 className={styles.headingSmall}>Legal</h3>
        <p className={styles.link}>Imprint</p>
        <p className={styles.link}>Privacy Policy</p>
        <p className={styles.link}>T&amp;C's</p>
      </div>
      <div className={styles.column}>
        <h3 className={styles.headingSmall}>Connect</h3>
        <p><a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" className={styles.link}>Instagram</a></p>
        <p><a href={SOCIALS.twitter} target="_blank" rel="noopener noreferrer" className={styles.link}>Twitter</a></p>
        <p><a href={SOCIALS.tiktok} target="_blank" rel="noopener noreferrer" className={styles.link}>TikTok</a></p>
        <p><a href={SOCIALS.discord} target="_blank" rel="noopener noreferrer" className={styles.link}>Discord</a></p>
      </div>
    </div>
  );
};