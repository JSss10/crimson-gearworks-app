'use client';

import Intro from "@/components/intro";
import { useEffect } from "react";
import Lenis from 'lenis';
import Test from "@/components/text";

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
      <Test />
    </main>
  );
}