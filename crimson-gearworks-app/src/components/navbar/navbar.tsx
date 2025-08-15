'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import styles from '@/styles/navbar.module.css'

export default function Navbar() {
  const pathname = usePathname()
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setIsSubMenuOpen(true)
  }

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setIsSubMenuOpen(false)
    }, 150)
  }

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/" aria-label="Home">
          <Image
            src="/logo/logo.png"
            alt="Crimson Gearworks Logo"
            width={300}
            height={300}
            priority
          />
        </Link>
      </div>

      <nav className={styles.navbar}>
        <ul className={styles.navLinks}>
          <li className={styles.listItem}>
            <Link
              href="/game-info"
              className={styles.listButton}
              data-active={isActive('/game-info') || undefined}
              aria-current={isActive('/game-info') ? 'page' : undefined}
            >
              GAME INFO
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link
              href="/3d-viewer"
              className={styles.listButton}
              data-active={isActive('/3d-viewer') || undefined}
              aria-current={isActive('/3d-viewer') ? 'page' : undefined}
            >
              3D VIEWER
            </Link>
          </li>
          <li
            className={`${styles.listItem} ${styles.subMenuWrapper}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={styles.listButton}
              // Behält die Linie, wenn Submenu offen ist oder Community‑Route aktiv ist
              data-active={isSubMenuOpen || isActive('/community') || undefined}
            >
              Community
            </button>
            {isSubMenuOpen && (
              <div className={styles.subNavbar}>
                <ul className={styles.subNavLinks}>
                  <li>
                    <Link
                      href="/community/events"
                      className={styles.subNavLink}
                      data-active={isActive('/community/events') || undefined}
                      aria-current={isActive('/community/events') ? 'page' : undefined}
                    >
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/community/leaderboard"
                      className={styles.subNavLink}
                      data-active={isActive('/community/leaderboard') || undefined}
                      aria-current={isActive('/community/leaderboard') ? 'page' : undefined}
                    >
                      Leaderboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/community/game-updates"
                      className={styles.subNavLink}
                      data-active={isActive('/community/game-updates') || undefined}
                      aria-current={isActive('/community/game-updates') ? 'page' : undefined}
                    >
                      Game Updates
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/community/parts-shop"
                      className={styles.subNavLink}
                      data-active={isActive('/community/parts-shop') || undefined}
                      aria-current={isActive('/community/parts-shop') ? 'page' : undefined}
                    >
                      Parts Shop
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li className={styles.listItem}>
            <Link
              href="/about-us"
              className={styles.listButton}
              data-active={isActive('/about-us') || undefined}
              aria-current={isActive('/about-us') ? 'page' : undefined}
            >
              ABOUT US
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link
              href="/contact"
              className={styles.listButton}
              data-active={isActive('/contact') || undefined}
              aria-current={isActive('/contact') ? 'page' : undefined}
            >
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