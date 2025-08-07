import React from 'react';
import styles from '@/styles/content.module.css';

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
          <button className={styles.button}>Email Us</button>
          <span>+44 (0)1274 905411</span>
        </div>
        <p className={styles.smallText}>
          Site by Crimson Studio | © 2025 Crimson Gearworks. All Rights Reserved.
        </p>
      </div>
      <Nav />
    </div>
  );
}

const Section2 = () => {
  return (
    <div className={styles.section2}>
      <h1 className={styles.heading}>CRIMSON<br />GEARWORKS</h1>
    </div>
  );
}

const Nav = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.column}>
        <h3 className={styles.headingSmall}>Content</h3>
        <p>Game Info</p>
        <p>3D Model Viewer</p>
        <p>Community</p>
        <p>Contact</p>
      </div>
      <div className={styles.column}>
        <h3 className={styles.headingSmall}>Studio</h3>
        <p>Our Story</p>
        <p>About Us</p>
        <p>Careers</p>
        <p>News</p>
      </div>
      <div className={styles.column}>
        <h3 className={styles.headingSmall}>Legal</h3>
        <p>Imprint</p>
        <p>Privacy Policy</p>
        <p>T&C's</p>
        <p>Cookies</p>
      </div>
      <div className={styles.column}>
        <h3 className={styles.headingSmall}>Connect</h3>
        <p>Instagram</p>
        <p>Twitter</p>
        <p>TikTok</p>
        <p>Discord</p>
      </div>
    </div>
  );
}