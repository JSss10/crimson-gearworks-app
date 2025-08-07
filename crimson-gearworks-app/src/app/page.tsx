'use client';

import Footer from "@/components/footer/footer";
import Intro from "@/components/intro";
import { useEffect } from "react";
import Lenis from 'lenis';

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <main>
      <Intro />
      <Footer />
    </main>
  );
}