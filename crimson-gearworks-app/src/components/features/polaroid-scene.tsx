"use client";

import { useEffect, useRef } from "react";
import type { Engine as EngineType, Bodies as BodiesType, Body as BodyType } from "matter-js";
import { Engine, Composite, Bodies, Body } from "matter-js";
import styles from "@/styles/features/polaroid-scene.module.css";

const POLAROID_W = 200;
const POLAROID_H = 225;
const BODY_W = 100;
const BODY_H = 200;
const BOUNDARY_THICKNESS = 50;

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function hypot(a: number, b: number) {
  return Math.sqrt(a * a + b * b);
}

export type PolaroidSceneProps = {
  title?: string;
  imagesCount?: number;
  imagePathTemplate?: string;
  imageSrcs?: string[];
};

export default function PolaroidScene({
  title = "Polaroid",
  imagesCount = 12,
  imagePathTemplate = "/images/about-us/insight{n}.png",
  imageSrcs,
}: PolaroidSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<EngineType | null>(null);
  const itemsRef = useRef<Array<{ body: BodyType; el: HTMLDivElement }>>([]);
  const boundariesRef = useRef<BodyType[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastMouseRef = useRef<{ x: number; y: number }>({ x: -1, y: -1 });

  const srcs = imageSrcs && imageSrcs.length > 0
    ? imageSrcs
    : Array.from({ length: imagesCount }, (_, i) => imagePathTemplate.replace("{n}", String(i + 1)));

  useEffect(() => {
    const container = containerRef.current!;
    const engine = Engine.create();
    engine.gravity.y = 0;
    engineRef.current = engine;

    const addBoundaries = (w: number, h: number) => {
      const halfT = BOUNDARY_THICKNESS / 2;
      const bounds: BodyType[] = [
        Bodies.rectangle(w / 2, -halfT, w, BOUNDARY_THICKNESS, { isStatic: true }),
        Bodies.rectangle(w / 2, h + halfT, w, BOUNDARY_THICKNESS, { isStatic: true }),
        Bodies.rectangle(-halfT, h / 2, BOUNDARY_THICKNESS, h, { isStatic: true }),
        Bodies.rectangle(w + halfT, h / 2, BOUNDARY_THICKNESS, h, { isStatic: true }),
      ];
      Composite.add(engine.world, bounds);
      boundariesRef.current = bounds;
    };

    const removeBoundaries = () => {
      if (!engineRef.current) return;
      for (const b of boundariesRef.current) {
        Composite.remove(engineRef.current.world, b);
      }
      boundariesRef.current = [];
    };

    const getSize = () => {
      const rect = container.getBoundingClientRect();
      return { w: rect.width, h: rect.height };
    };

    const { w, h } = getSize();
    addBoundaries(w, h);

    const MARGIN = 100;
    for (let i = 0; i < srcs.length; i++) {
      const x = rand(MARGIN, w - MARGIN);
      const y = rand(MARGIN, h - MARGIN);

      const body = Bodies.rectangle(x, y, BODY_W, BODY_H, {
        frictionAir: 0.075,
        restitution: 0.25,
        density: 0.002,
        angle: Math.random() * Math.PI * 2,
      });
      Composite.add(engine.world, body);

      const el = document.createElement("div");
      el.className = styles.item;
      el.style.transform = `translate3d(${x - POLAROID_W / 2}px, ${y - POLAROID_H / 2}px, 0) rotate(${body.angle}rad)`;

      const img = document.createElement("img");
      img.src = srcs[i];
      img.alt = `Polaroid ${i + 1}`;
      el.appendChild(img);

      container.appendChild(el);
      itemsRef.current.push({ body, el });
    }

    const tick = () => {
      Engine.update(engine, 1000 / 60);
      for (const { body, el } of itemsRef.current) {
        const { x, y } = body.position;
        el.style.transform = `translate3d(${x - POLAROID_W / 2}px, ${y - POLAROID_H / 2}px, 0) rotate(${body.angle}rad)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const last = lastMouseRef.current;
      if (hypot(x - last.x, y - last.y) <= 10) return;
      lastMouseRef.current = { x, y };

      for (const { body } of itemsRef.current) {
        const dx = x - body.position.x;
        const dy = y - body.position.y;
        if (hypot(dx, dy) < 150) {
          const forceMagnitude = 3;
          Body.applyForce(
            body,
            { x: body.position.x, y: body.position.y },
            { x: rand(-forceMagnitude, forceMagnitude), y: rand(-forceMagnitude, forceMagnitude) }
          );
        }
      }
    };
    container.addEventListener("pointermove", onPointerMove, { passive: true });

    const ro = new ResizeObserver(() => {
      const { w: nw, h: nh } = getSize();
      removeBoundaries();
      addBoundaries(nw, nh);
    });
    ro.observe(container);

    return () => {
      container.removeEventListener("pointermove", onPointerMove);
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      for (const { el } of itemsRef.current) {
        if (el.parentNode === container) container.removeChild(el);
      }
      itemsRef.current = [];

      if (engineRef.current) {
        removeBoundaries();
        Composite.clear(engineRef.current.world, false, true);
        engineRef.current = null;
      }
    };
  }, [srcs.join("|")]);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.header} aria-hidden>
        <h1>{title}</h1>
      </div>
    </div>
  );
}