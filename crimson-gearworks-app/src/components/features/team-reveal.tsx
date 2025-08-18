"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import styles from "@/styles/features/team-reveal.module.css";
import Character from "@/components/features/character-text-scroll";

const paragraph = "We are a small, close-knit indie game development studio with expertise in game art, programming, web development, 3D resin printing, and audio production. At Crimson Gearworks, we believe in open, transparent collaboration with our community. We put players and their creativity first – by staying closely connected to our audience and hosting events like art submissions, we invite them to actively shape both their journey and ours."

export type TeamMember = { name: string; img: string };

const TEAM: TeamMember[] = [
  { name: "Tim", img: "/images/about-us/tim.png" },
  { name: "Kira", img: "/images/about-us/kira.png" },
  { name: "Neville", img: "/images/about-us/neville.png" },
  { name: "Noel", img: "/images/about-us/noel.png" },
  { name: "Emanuel", img: "/images/about-us/emanuel.png" },
  { name: "Jessica", img: "/images/about-us/jessica.png" },
];

function useIsDesktop(initial = false) {
  const [isDesktop, setIsDesktop] = useState(initial);
  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth > 900);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return isDesktop;
}

export default function TeamReveal() {
  const isDesktop = useIsDesktop();

  const imagesContainerRef = useRef<HTMLDivElement | null>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nameH1Refs = useRef<(HTMLHeadingElement | null)[]>([]);
  const lettersPerHeadingRef = useRef<HTMLElement[][]>([]);

  const setImgRef = (idx: number): React.RefCallback<HTMLDivElement> => (el) => {
    imgRefs.current[idx] = el;
  };
  const setNameH1Ref = (idx: number): React.RefCallback<HTMLHeadingElement> => (el) => {
    nameH1Refs.current[idx] = el;
  };

  useEffect(() => {
    let mounted = true;
    const teardowns: Array<() => void> = [];

    async function splitAll() {
      const headings = nameH1Refs.current.filter(Boolean) as HTMLHeadingElement[];
      if (!headings.length) return;

      let usedSplitText = false;
      let SplitTextCtor: any = null;
      try {
        const mod: any = await import("gsap/SplitText");
        SplitTextCtor = mod?.SplitText ?? mod?.default;
        if (SplitTextCtor) {
          gsap.registerPlugin(SplitTextCtor);
          usedSplitText = true;
        }
      } catch {
      }

      if (usedSplitText) {
        const lettersBins: HTMLElement[][] = [];
        for (const h of headings) {
          const instance = new SplitTextCtor(h, { type: "chars" });
          const chars: HTMLElement[] = instance.chars as HTMLElement[];
          chars.forEach((c) => c.classList.add(styles.letter));
          lettersBins.push(chars);
          teardowns.push(() => instance.revert());
        }
        if (!mounted) return;
        lettersPerHeadingRef.current = lettersBins;
      } else {
        const SplitType = (await import("split-type")).default;
        const lettersBins: HTMLElement[][] = [];
        for (const h of headings) {
          const instance = new SplitType(h, { types: "chars" });
          const chars = Array.from(h.querySelectorAll(".char")) as HTMLElement[];
          chars.forEach((c) => c.classList.add(styles.letter));
          lettersBins.push(chars);
          teardowns.push(() => instance.revert());
        }
        if (!mounted) return;
        lettersPerHeadingRef.current = lettersBins;
      }

      const defaultLetters = lettersPerHeadingRef.current[0] ?? [];
      gsap.set(defaultLetters, { y: "100%" });
    }

    splitAll();

    return () => {
      mounted = false;
      teardowns.forEach((fn) => {
        try {
          fn();
        } catch { }
      });
      lettersPerHeadingRef.current = [];
    };
  }, []);

  const animateImageEnter = (index: number) => {
    if (!isDesktop) return;
    const box = imgRefs.current[index];
    const letters = lettersPerHeadingRef.current[index + 1] ?? [];
    if (box) {
      gsap.to(box, { width: 140, height: 140, duration: 0.5, ease: "power4.out" });
    }
    if (letters.length) {
      gsap.to(letters, {
        y: "-100%",
        ease: "power4.out",
        duration: 0.75,
        stagger: { each: 0.025, from: "center" },
      });
    }
  };

  const animateImageLeave = (index: number) => {
    if (!isDesktop) return;
    const box = imgRefs.current[index];
    const letters = lettersPerHeadingRef.current[index + 1] ?? [];
    if (box) {
      gsap.to(box, { width: 70, height: 70, duration: 0.5, ease: "power4.out" });
    }
    if (letters.length) {
      gsap.to(letters, {
        y: "0%",
        ease: "power4.out",
        duration: 0.75,
        stagger: { each: 0.025, from: "center" },
      });
    }
  };

  const animateDefaultEnter = () => {
    if (!isDesktop) return;
    const letters = lettersPerHeadingRef.current[0] ?? [];
    if (letters.length) {
      gsap.to(letters, {
        y: "0%",
        ease: "power4.out",
        duration: 0.75,
        stagger: { each: 0.025, from: "center" },
      });
    }
  };

  const animateDefaultLeave = () => {
    if (!isDesktop) return;
    const letters = lettersPerHeadingRef.current[0] ?? [];
    if (letters.length) {
      gsap.to(letters, {
        y: "100%",
        ease: "power4.out",
        duration: 0.75,
        stagger: { each: 0.025, from: "center" },
      });
    }
  };

  const defaultName = useMemo(() => "Studio", []);

  return (
    <section className={styles.section}>
      <div
        ref={imagesContainerRef}
        className={styles.profileImages}
        onMouseEnter={animateDefaultEnter}
        onMouseLeave={animateDefaultLeave}
      >
        {TEAM.map((member, i) => (
          <div
            key={`${member.name}-${i}`}
            className={styles.img}
            ref={setImgRef(i)}
            onMouseEnter={() => animateImageEnter(i)}
            onMouseLeave={() => animateImageLeave(i)}
          >
            <img src={member.img} alt={member.name} />
          </div>
        ))}
      </div>

      <div className={styles.profileNames}>
        <div className={`${styles.name} ${styles.defaultName}`}>
          <h1 ref={setNameH1Ref(0)}>{defaultName}</h1>
        </div>
        {TEAM.map((member, i) => (
          <div key={`name-${member.name}-${i}`} className={styles.name}>
            <h1 ref={setNameH1Ref(i + 1)}>{member.name}</h1>
          </div>
        ))}
      </div>
      <Character paragraph={paragraph} />
    </section>
  );
}