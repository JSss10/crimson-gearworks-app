"use client";

import { useEffect } from "react";
import Hero from "@/components/home/hero";

export default function HomePage() {
  useEffect(() => {
    let rafId = 0;
    let lenis: { raf: (t: number) => void; destroy?: () => void } | null = null;
    let isMounted = true;

    (async () => {
      const { default: Lenis } = await import("lenis");
      if (!isMounted) return;

      lenis = new Lenis();

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    })();

    return () => {
      isMounted = false;
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy?.();
      lenis = null;
    };
  }, []);

  return (
    <main>
      <Hero />
    </main>
  );
}