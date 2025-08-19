"use client";

import styles from "@/styles/contact/index.module.css";
import { FaInstagram as Instagram, FaDiscord as Discord, FaSteam as Steam, FaArrowRight, FaChevronDown } from "react-icons/fa6";

export default function ContactPage() {
  return (
    <section className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.titleLine}>
            <span className={styles.orange}>Let's</span>
            <span className={styles.white}>get</span>
          </h1>
          <h1 className={styles.titleLineTwo}>
            <span>In touch</span>
          </h1>
        </div>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.grid}>
          <div className={styles.formCol}>
            <div className={styles.tabs} role="tablist" aria-label="Kontakt-Anliegen">
              <button className={`${styles.tab} ${styles.tabActive}`} role="tab" aria-selected>
                Say Hello
              </button>
              <button className={styles.tab} role="tab" aria-selected={false}>
                Need Help?
              </button>
              <button className={styles.tab} role="tab" aria-selected={false}>
                Something Else
              </button>
            </div>

            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <label className={styles.field}>
                <input className={styles.input} placeholder="Name" />
              </label>

              <label className={styles.field}>
                <input className={styles.input} type="email" placeholder="E-Mail" />
              </label>

              <label className={`${styles.field} ${styles.fieldFull}`}>
                <div className={styles.selectWrap}>
                  <select className={`${styles.input} ${styles.select}`} defaultValue="" aria-label="Subject">
                    <option value="" disabled>
                      Subject
                    </option>
                    <option>Say Hello</option>
                    <option>Need Help</option>
                    <option>Something Else</option>
                  </select>
                  <span aria-hidden className={styles.chevron}><FaChevronDown size={10} /></span>
                </div>
              </label>

              <label className={`${styles.field} ${styles.fieldFull}`}>
                <textarea
                  className={`${styles.input} ${styles.textarea}`}
                  placeholder="Message"
                  rows={6}
                  style={{ resize: "none" }}
                />
              </label>

              <div className={styles.ctaRow}>
                <button type="button" className={styles.ctaButton}>
                  <span className={styles.ctaIcon} aria-hidden>
                    <FaArrowRight size={16} />
                  </span>
                  <span>LET’S CHAT</span>
                </button>
              </div>
            </form>
          </div>

          <aside className={styles.infoCol}>
            <div className={styles.infoBlock}>
              <div>
                <div className={styles.infoLabel}>Phone</div>
                <div className={styles.infoValue}>+ (41) 079 732 18 49</div>
              </div>
              <a
                href="https://discord.gg/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconBtn}
                aria-label="Discord"
              >
                <Discord size={34} />
              </a>
            </div>

            <div className={styles.infoBlock}>
              <div>
                <div className={styles.infoLabel}>E-Mail</div>
                <div className={styles.infoValue}>hello@crimsongearworks.com</div>
              </div>
              <a
                href="https://www.instagram.com/crimonsgearworks/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconBtn}
                aria-label="Instagram"
              >
                <Instagram size={34} />
              </a>
            </div>

            <div className={styles.infoBlock}>
              <div>
                <div className={styles.infoLabel}>Studio</div>
                <div className={styles.infoValue}>
                  Buckhauserstrasse 24
                  <br />
                  8048 Zurich
                </div>
              </div>
              <a
                href="https://store.steampowered.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconBtn}
                aria-label="Steam"
              >
                <Steam size={34} />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}