"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "@/styles/navbar/index.module.css";
import { FaSteam } from "react-icons/fa6";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = typeof window !== "undefined" ? window.matchMedia(query) : null;
    const onChange = (e: MediaQueryListEvent | MediaQueryList) => setMatches((e as MediaQueryList).matches ?? (e as MediaQueryListEvent).matches);
    if (mql) {
      setMatches(mql.matches);
      const handler = (e: MediaQueryListEvent) => onChange(e);
      mql.addEventListener?.("change", handler);
      return () => mql.removeEventListener?.("change", handler);
    }
  }, [query]);
  return matches;
}

export default function Navbar() {
  const pathname = usePathname();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const handleMouseEnter = () => {
    if (!isDesktop) return;
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setIsSubMenuOpen(true);
  };
  const handleMouseLeave = () => {
    if (!isDesktop) return;
    closeTimeout.current = setTimeout(() => setIsSubMenuOpen(false), 120);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSubMenuOpen(false);
  }, [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsSubMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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

      <button
        className={styles.menuToggle}
        aria-controls="primary-navigation"
        aria-expanded={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen((v) => !v)}
      >
        <span className={styles.srOnly}>Toggle menu</span>
        <span className={styles.burger} data-open={isMobileMenuOpen || undefined} />
      </button>

      <nav
        id="primary-navigation"
        className={styles.navbar}
        data-open={isMobileMenuOpen || undefined}
        aria-hidden={!isDesktop && !isMobileMenuOpen}
      >
        <ul className={styles.navLinks} role="list">
          <li className={styles.listItem}>
            <Link
              href="/game-info"
              className={styles.listButton}
              data-active={isActive("/game-info") || undefined}
              aria-current={isActive("/game-info") ? "page" : undefined}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              GAME INFO
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link
              href="/3d-viewer"
              className={styles.listButton}
              data-active={isActive("/3d-viewer") || undefined}
              aria-current={isActive("/3d-viewer") ? "page" : undefined}
              onClick={() => setIsMobileMenuOpen(false)}
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
              data-active={isSubMenuOpen || isActive("/community") || undefined}
              aria-expanded={isSubMenuOpen}
              aria-controls="community-submenu"
              onClick={() => {
                if (!isDesktop) setIsSubMenuOpen((v) => !v);
              }}
            >
              Community
            </button>

            {isDesktop && isSubMenuOpen && (
              <div className={styles.subNavbarDesktop}>
                <ul className={styles.subNavLinks} role="list">
                  <li>
                    <Link
                      href="/community/events"
                      className={styles.subNavLink}
                      data-active={isActive("/community/events") || undefined}
                      aria-current={isActive("/community/events") ? "page" : undefined}
                    >
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/community/leaderboard"
                      className={styles.subNavLink}
                      data-active={isActive("/community/leaderboard") || undefined}
                      aria-current={isActive("/community/leaderboard") ? "page" : undefined}
                    >
                      Leaderboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/community/game-updates"
                      className={styles.subNavLink}
                      data-active={isActive("/community/game-updates") || undefined}
                      aria-current={isActive("/community/game-updates") ? "page" : undefined}
                    >
                      Game Updates
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/community/parts-shop"
                      className={styles.subNavLink}
                      data-active={isActive("/community/parts-shop") || undefined}
                      aria-current={isActive("/community/parts-shop") ? "page" : undefined}
                    >
                      Parts Shop
                    </Link>
                  </li>
                </ul>
              </div>
            )}

            {!isDesktop && (
              <ul
                id="community-submenu"
                className={styles.subNavLinksMobile}
                data-open={isSubMenuOpen || undefined}
                role="list"
              >
                <li>
                  <Link
                    href="/community/events"
                    className={styles.subNavLink}
                    data-active={isActive("/community/events") || undefined}
                    aria-current={isActive("/community/events") ? "page" : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    href="/community/leaderboard"
                    className={styles.subNavLink}
                    data-active={isActive("/community/leaderboard") || undefined}
                    aria-current={isActive("/community/leaderboard") ? "page" : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/community/game-updates"
                    className={styles.subNavLink}
                    data-active={isActive("/community/game-updates") || undefined}
                    aria-current={isActive("/community/game-updates") ? "page" : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Game Updates
                  </Link>
                </li>
                <li>
                  <Link
                    href="/community/parts-shop"
                    className={styles.subNavLink}
                    data-active={isActive("/community/parts-shop") || undefined}
                    aria-current={isActive("/community/parts-shop") ? "page" : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Parts Shop
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className={styles.listItem}>
            <Link
              href="/about-us"
              className={styles.listButton}
              data-active={isActive("/about-us") || undefined}
              aria-current={isActive("/about-us") ? "page" : undefined}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ABOUT US
            </Link>
          </li>
          <li className={styles.listItem}>
            <Link
              href="/contact"
              className={styles.listButton}
              data-active={isActive("/contact") || undefined}
              aria-current={isActive("/contact") ? "page" : undefined}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              CONTACT
            </Link>
          </li>

          <li className={styles.ctaMobile}>
            <a
              href="https://store.steampowered.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Play now on Steam"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className={styles.ctaButtonText}>Play now on Steam</span>
              <span className={styles.ctaButtonArrowContainer}>
                <FaSteam size={24} />
              </span>
            </a>
          </li>
        </ul>
      </nav>

      <div className={styles.ctaButton}>
        <a
          href="https://store.steampowered.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Play now on Steam"
        >
          <span className={styles.ctaButtonText}>Play now on Steam</span>
          <span className={styles.ctaButtonArrowContainer}>
            <Image src="/logo/steam-logo.svg" alt="Steam Logo" width={24} height={24} />
          </span>
        </a>
      </div>
    </header>
  );
}