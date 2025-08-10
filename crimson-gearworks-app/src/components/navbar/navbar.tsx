'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/navbar.module.css'

export default function Navbar() {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)
  const closeTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setIsSubMenuOpen(true)
  }

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setIsSubMenuOpen(false)
    }, 150)
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image
          src="/logo/logo.png"
          alt="Crimson Gearworks Logo"
          width={300}
          height={300}
          priority
        />
      </div>

      <nav className={styles.navbar}>
        <ul className={styles.navLinks}>
          <li className={styles.listItem}>
            <Link href="/game-info" className={styles.listButton}>
              GAME INFO
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/3d-viewer" className={styles.listButton}>
              3D VIEWER
            </Link>
          </li>
          <li
            className={`${styles.listItem} ${styles.subMenuWrapper}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className={styles.listButton}>Community</button>
            {isSubMenuOpen && (
              <div className={styles.subNavbar}>
                <ul className={styles.subNavLinks}>
                  <li>
                    <Link href="/community/events" className={styles.subNavLink}>Events</Link>
                  </li>
                  <li>
                    <Link href="/community/leaderboard" className={styles.subNavLink}>Leaderboard</Link>
                  </li>
                  <li>
                    <Link href="/community/game-updates" className={styles.subNavLink}>Game Updates</Link>
                  </li>
                  <li>
                    <Link href="/community/parts-shop" className={`${styles.subNavLink} ${styles.active}`}>Parts Shop</Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li className={styles.listItem}>
            <Link href="/about-us" className={styles.listButton}>
              ABOUT US
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/contact" className={styles.listButton}>
              CONTACT
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.ctaButton}>
        <a
          href="https://store.steampowered.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.ctaButtonText}>Play now on Steam</span>
          <span className={styles.ctaButtonArrowContainer}>
            <Image
              src="/logo/steam-logo.svg"
              alt="Steam Logo"
              width={24}
              height={24}
            />
          </span>
        </a>
      </div>
    </header>
  )
}