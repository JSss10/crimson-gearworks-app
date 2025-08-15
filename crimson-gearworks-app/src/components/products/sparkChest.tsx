"use client";

import { useEffect, useRef } from "react";
import styles from "@/styles/products/sparkChest.module.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

export default function SparkChest() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const modelContainerRef = useRef<HTMLDivElement | null>(null);

  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const modelRef = useRef<THREE.Object3D | null>(null);
  const modelSizeRef = useRef<THREE.Vector3 | null>(null);
  const currentRotationRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  // Pivot-Group & Scale-Ziele
  const pivotRef = useRef<THREE.Group | null>(null);
  const SCALE_START = 0.8; // Anfang
  const SCALE_SMALL = 0.4; // während Tooltips
  const SCALE_END = 0.6; // final nach Tooltips

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const scope = containerRef.current;
    if (!scope) return;

    // --- Text Prep ---
    const wrapChars = (el: Element | null) => {
      if (!el) return;
      const chars = [...(el.textContent || "")];
      el.innerHTML = chars
        .map((ch) => `<span class="char"><span>${ch === " " ? "&nbsp;" : ch}</span></span>`)
        .join("");
    };

    const wrapLines = (els: Element[]) => {
      els.forEach((el) => {
        el.innerHTML = `<span class="line"><span>${el.textContent || ""}</span></span>`;
      });
    };

    const lenis = new Lenis();
    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onLenisScroll);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const header1Title = scope.querySelector<HTMLElement>('[data-el="header1-title"]');
    wrapChars(header1Title);

    const tt1Title = scope.querySelector<HTMLElement>('[data-el="tt1-title"]');
    const tt1Desc = scope.querySelector<HTMLElement>('[data-el="tt1-desc"]');
    const tt2Title = scope.querySelector<HTMLElement>('[data-el="tt2-title"]');
    const tt2Desc = scope.querySelector<HTMLElement>('[data-el="tt2-desc"]');
    wrapLines([tt1Title!, tt1Desc!, tt2Title!, tt2Desc!].filter(Boolean) as Element[]);

    const animOptions = { duration: 1, ease: "power3.out", stagger: 0.025 } as const;

    // --- THREE Grundsetup ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;

    if (modelContainerRef.current) {
      modelContainerRef.current.appendChild(renderer.domElement);
    }

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.0);
    mainLight.position.set(1, 2, 3);
    mainLight.castShadow = true;
    mainLight.shadow.bias = -0.001;
    mainLight.shadow.mapSize.set(1024, 1024);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-2, 0, -2);
    scene.add(fillLight);

    // Pivot-Gruppe am Ursprung
    const pivot = new THREE.Group();
    pivotRef.current = pivot;
    scene.add(pivot);
    pivot.scale.setScalar(SCALE_START); // Start bei 0.8

    // --- Kamera/Model Setup ---
    const setupModel = () => {
      const modelSize = modelSizeRef.current;
      if (!modelSize || !cameraRef.current) return;

      const isMobile = window.innerWidth < 1000;
      const cameraDistance = isMobile ? 2 : 1.25;
      camera.position.set(
        0,
        0,
        Math.max(modelSize.x, modelSize.y, modelSize.z) * cameraDistance
      );
      camera.lookAt(0, 0, 0);
    };

    // --- GLTF Laden ---
    const loader = new GLTFLoader();
    loader.load(
      "/models/spark-chest.glb",
      (gltf) => {
        const model = gltf.scene;

        model.traverse((node: any) => {
          if (node.isMesh && node.material) {
            node.material.metalness = 0.05;
            node.material.roughness = 0.9;
          }
        });

        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // Modell lokal auf Ursprung zentrieren → Skalierung bleibt mittig
        model.position.sub(center);
        model.rotation.set(0, 0, 0);

        modelRef.current = model;
        modelSizeRef.current = size;

        pivot.add(model);
        setupModel();
      },
      undefined,
      (err) => {
        console.error("Failed to load GLB /models/spark-chest.glb", err);
      }
    );

    // --- Render Loop ---
    const renderLoop = () => {
      rafRef.current = requestAnimationFrame(renderLoop);
      renderer.render(scene, camera);
    };
    renderLoop();

    // --- Resize ---
    const onResize = () => {
      if (!rendererRef.current || !cameraRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      setupModel();
    };
    window.addEventListener("resize", onResize);

    // --- ScrollTrigger / Animationen ---
    const productOverview = scope.querySelector('[data-el="product-overview"]')!;
    const header1 = scope.querySelector('[data-el="header1"]')!;
    const header2 = scope.querySelector('[data-el="header2"]')!;
    const circularMask = scope.querySelector('[data-el="circular-mask"]')! as HTMLElement;

    ScrollTrigger.create({
      trigger: productOverview,
      start: "75% bottom",
      onEnter: () =>
        gsap.to('[data-el="header1-title"] .char > span', {
          y: "0%",
          duration: 1,
          ease: "power3.out",
          stagger: 0.025,
        }),
      onLeaveBack: () =>
        gsap.to('[data-el="header1-title"] .char > span', {
          y: "100%",
          duration: 1,
          ease: "power3.out",
          stagger: 0.025,
        }),
    });

    const tooltipSelectors = [
      {
        trigger: 0.65,
        elements: [
          '[data-el="tt1-icon"] svg',
          '[data-el="tt1-title"] .line > span',
          '[data-el="tt1-desc"] .line > span',
        ],
      },
      {
        trigger: 0.85,
        elements: [
          '[data-el="tt2-icon"] svg',
          '[data-el="tt2-title"] .line > span',
          '[data-el="tt2-desc"] .line > span',
        ],
      },
    ];

    ScrollTrigger.create({
      trigger: productOverview,
      start: "top top",
      end: `+=${window.innerHeight * 10}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: ({ progress }) => {
        const headerProgress = Math.max(0, Math.min(1, (progress - 0.05) / 0.03));
        gsap.to(header1, {
          xPercent: progress < 0.05 ? 0 : progress > 0.35 ? -100 : -100 * headerProgress,
        });

        const maskSize = progress < 0.2 ? 0 : progress > 0.3 ? 100 : 100 * ((progress - 0.2) / 0.1);
        gsap.to(circularMask, { clipPath: `circle(${maskSize}% at 50% 50%)` });

        const header2Progress = (progress - 0.15) / 0.35;
        const header2XPercent = progress < 0.15 ? 100 : progress > 0.5 ? -200 : 100 - 300 * header2Progress;
        gsap.to(header2, { xPercent: header2XPercent });

        const scaleX = progress < 0.45 ? 0 : progress > 0.65 ? 100 : 100 * ((progress - 0.45) / 0.2);
        gsap.to(scope.querySelectorAll("." + styles.divider), { scaleX: `${scaleX}%`, ...animOptions });

        tooltipSelectors.forEach(({ trigger, elements }) => {
          gsap.to(elements, { y: progress > trigger ? "0%" : "125%", ...animOptions });
        });

        // Rotation beibehalten
        if (modelRef.current && progress > 0.05) {
          const rotationProgress = (progress - 0.05) / 0.95;
          const targetRotation = Math.PI * 3 * 4 * rotationProgress;
          const diff = targetRotation - currentRotationRef.current;
          if (Math.abs(diff) > 0.001) {
            modelRef.current.rotateOnAxis(new THREE.Vector3(0, 1, 0), diff);
            currentRotationRef.current = targetRotation;
          }
        }

        // --- SCALE-LOGIK ---
        // Ziel: 0.8 → (bei Tooltips) 0.4 → danach 0.6
        // Fenster (anpassbar): weich schrumpfen 0.60–0.65, klein bleiben 0.65–0.85,
        // weich wachsen 0.85–0.95 auf 0.6, danach 0.6 halten
        const pivot = pivotRef.current;
        if (pivot) {
          const shrinkInStart = 0.60; // Start Schrumpfen
          const shrinkInEnd = 0.65; // Ende Schrumpfen (0.4 erreicht)
          const staySmallEnd = 0.85; // Bis hier klein bleiben (Texte sichtbar)
          const growBackEnd = 0.95; // Bis hier auf 0.6 hochblenden

          let s = SCALE_START;
          if (progress < shrinkInStart) {
            s = SCALE_START;
          } else if (progress < shrinkInEnd) {
            s = gsap.utils.mapRange(shrinkInStart, shrinkInEnd, SCALE_START, SCALE_SMALL, progress);
          } else if (progress < staySmallEnd) {
            s = SCALE_SMALL;
          } else if (progress < growBackEnd) {
            s = gsap.utils.mapRange(staySmallEnd, growBackEnd, SCALE_SMALL, SCALE_END, progress);
          } else {
            s = SCALE_END;
          }
          pivot.scale.setScalar(s);
        }
      },
    });

    // --- Cleanup ---
    return () => {
      try {
        ScrollTrigger.getAll().forEach((st) => st.kill());
        lenis.off("scroll", onLenisScroll);
        gsap.ticker.remove((time) => lenis.raf(time * 1000));
        lenis.destroy();
      } catch { }

      window.removeEventListener("resize", onResize);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      if (sceneRef.current) {
        sceneRef.current.traverse((obj) => {
          const mesh = obj as THREE.Mesh;
          if (mesh.geometry) mesh.geometry.dispose();
          const material = (mesh as any).material as THREE.Material | THREE.Material[] | undefined;
          if (material) {
            const disposeMat = (m: THREE.Material) => {
              if ((m as any).map) (m as any).map.dispose();
              m.dispose();
            };
            Array.isArray(material) ? material.forEach(disposeMat) : disposeMat(material);
          }
        });
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss?.();
        rendererRef.current.domElement?.remove();
      }
      modelRef.current = null;
      modelSizeRef.current = null;
      pivotRef.current = null;
    };
  }, []);

  return (
    <div ref={containerRef}>
      <section className={`${styles.section} ${styles.hero}`}>
        {/* Headline-Zeile */}
        <div className={styles.titleRow}>
          <h1 className={styles.title}>
            <span>BMGF-XS01</span> Spark Chest
          </h1>
        </div>

        {/* 3-Spalten-Layout */}
        <div className={styles.heroGrid}>
          {/* Left: Need to know */}
          <aside className={styles.infoPanel}>

            <details className={styles.accordion} open>
              <summary>Product Information</summary>
              <div className={styles.accordionBody}>
                High-density shell, modular mounts, replaceable plates.
              </div>
            </details>

            <details className={styles.accordion}>
              <summary>Shipping & Returns</summary>
              <div className={styles.accordionBody}>
                Worldwide shipping, 30-day returns policy.
              </div>
            </details>

            <details className={styles.accordion}>
              <summary>Payment & Delivery</summary>
              <div className={styles.accordionBody}>
                Cards, TWINT, Apple Pay. Delivery 2–5 business days.
              </div>
            </details>
          </aside>

          {/* Center: Model + Frame Corners */}
          <div className={styles.modelFrame}>
            <div className={styles.frameCorner} />
            <div className={styles.frameCorner} />
            <div className={styles.frameCorner} />
            <div className={styles.frameCorner} />

            <img
              src="/images/parts-shop/BMGF-XS01_Spark_Chest.png"
              alt="Spark Chest"
              className={styles.modelImage}
            />
          </div>

          {/* Right: Purchase Card */}
          <aside className={styles.purchaseCard} aria-label="Purchase options">
            <div className={styles.priceRow}>
              <span className={styles.currency}>CHF</span>
              <span className={styles.price}>12.00</span>
            </div>

            <div className={styles.optionBlock}>
              <span className={styles.optionLabel}>Color:</span>
              <span className={styles.optionValue}>Orange</span>
            </div>

            <div className={styles.thumbs}>
              <button className={`${styles.thumb} ${styles.thumbActive}`}>
                <img src="/images/parts-shop/BMGF-XS01_Spark_Chest.png" alt="Orange" />
              </button>
              <button className={styles.thumb}>
                <img src="/images/parts-shop/BMGF-XS01_Spark_Chest.png" alt="Gray" />
              </button>
              <button className={styles.thumb}>
                <img src="/images/parts-shop/BMGF-XS01_Spark_Chest.png" alt="Black" />
              </button>
            </div>

            <div className={styles.ctaRow}>
              <button className={styles.cta}>Add to Cart</button>
              <button className={styles.settingsBtn}>
                <span className={styles.settingsDot}></span>
                <span className={styles.settingsDot}></span>
                <span className={styles.settingsDot}></span>
              </button>
            </div>
          </aside>
        </div>
      </section>

      <section className={`${styles.section} ${styles.productOverview}`} data-el="product-overview">
        <div className={styles.header1} data-el="header1">
          <h1 className={styles.headerTitle} data-el="header1-title">Build your own mecha</h1>
        </div>
        <div className={styles.header2} data-el="header2">
          <h1 className={styles.headerTitle}>Product Overview</h1>
        </div>

        <div className={styles.circularMask} data-el="circular-mask" />

        <div className={styles.tooltips}>
          <div className={styles.tooltip}>
            <div className={styles.icon} data-el="tt1-icon" />
            <div className={styles.divider} />
            <div className="title">
              <h2 className={styles.h2} data-el="tt1-title">Flash</h2>
            </div>
            <div className={styles.description}>
              <p className={styles.p} data-el="tt1-desc">
                Flash is a brand of compact, rechargeable, and portable battery packs. It is used in a variety of devices, including cameras, phones, and electric vehicles.
              </p>
            </div>
          </div>

          <div className={styles.tooltip}>
            <div className={styles.icon} data-el="tt2-icon" />
            <div className={styles.divider} />
            <div className="title">
              <h2 className={styles.h2} data-el="tt2-title">Connectivity</h2>
            </div>
            <div className={styles.description}>
              <p className={styles.p} data-el="tt2-desc">
                Seamless wireless pairing for quick sync with your devices and sensors during every workout.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.modelContainer} ref={modelContainerRef} />
      </section>
    </div>
  );
}
