"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import styles from "@/styles/products/spark-chest.module.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { Settings } from "lucide-react";

export default function SparkChest() {
  const variants = useMemo(
    () => [
      { label: "Orange", src: "/images/parts-shop/BMGF-XS01_Spark_Chest.png" },
      { label: "Gray", src: "/images/parts-shop/BMGF-XS01_Spark_Chest.png" },
      { label: "Black", src: "/images/parts-shop/BMGF-XS01_Spark_Chest.png" },
    ],
    []
  );
  const [selected, setSelected] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const modelContainerRef = useRef<HTMLDivElement | null>(null);

  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const modelRef = useRef<THREE.Object3D | null>(null);
  const modelSizeRef = useRef<THREE.Vector3 | null>(null);
  const currentRotationRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  const pivotRef = useRef<THREE.Group | null>(null);
  const SCALE_START = 0.8;
  const SCALE_SMALL = 0.4;
  const SCALE_END = 0.6;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const scope = containerRef.current;
    if (!scope) return;

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

    scene.add(new THREE.AmbientLight(0xffffff, 1.0));

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.0);
    mainLight.position.set(1, 2, 3);
    mainLight.castShadow = true;
    mainLight.shadow.bias = -0.001;
    mainLight.shadow.mapSize.set(1024, 1024);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-2, 0, -2);
    scene.add(fillLight);

    const pivot = new THREE.Group();
    pivotRef.current = pivot;
    scene.add(pivot);
    pivot.scale.setScalar(SCALE_START);

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

    const renderLoop = () => {
      rafRef.current = requestAnimationFrame(renderLoop);
      renderer.render(scene, camera);
    };
    renderLoop();

    const onResize = () => {
      if (!rendererRef.current || !cameraRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      setupModel();
    };
    window.addEventListener("resize", onResize);

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

        if (modelRef.current && progress > 0.05) {
          const rotationProgress = (progress - 0.05) / 0.95;
          const targetRotation = Math.PI * 3 * 4 * rotationProgress;
          const diff = targetRotation - currentRotationRef.current;
          if (Math.abs(diff) > 0.001) {
            modelRef.current.rotateOnAxis(new THREE.Vector3(0, 1, 0), diff);
            currentRotationRef.current = targetRotation;
          }
        }

        const pivot = pivotRef.current;
        if (pivot) {
          const shrinkInStart = 0.60;
          const shrinkInEnd = 0.65;
          const staySmallEnd = 0.85;
          const growBackEnd = 0.95;

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
        <div className={styles.titleRow}>
          <h1 className={styles.title}>
            <span>BMGF-XS01</span> Spark Chest
          </h1>
        </div>

        <div className={styles.heroGrid}>
          <aside className={styles.infoPanel}>

            <details className={styles.accordion} open>
              <summary>Product Information</summary>
              <div className={styles.accordionBody}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
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

          <div className={styles.modelFrame}>
            <div className={styles.frameCorner} />
            <div className={styles.frameCorner} />
            <div className={styles.frameCorner} />
            <div className={styles.frameCorner} />

            <img
              src={variants[selected].src}
              alt={`Spark Chest – ${variants[selected].label}`}
              className={styles.modelImage}
            />
          </div>

          <aside className={styles.purchaseCard} aria-label="Purchase options">
            <div className={styles.priceRow}>
              <span className={styles.currency}>CHF</span>
              <span className={styles.price}>12.00</span>
            </div>

            <div className={styles.optionBlock}>
              <span className={styles.optionLabel}>Color:</span>
              <span className={styles.optionValue}>{variants[selected].label}</span>
            </div>

            <div
              className={styles.thumbs}
              role="radiogroup"
              aria-label="Choose color"
            >
              {variants.map((v, i) => (
                <button
                  key={v.label}
                  type="button"
                  role="radio"
                  aria-checked={selected === i}
                  aria-label={v.label}
                  className={`${styles.thumb} ${selected === i ? styles.thumbActive : ""}`}
                  onClick={() => setSelected(i)}
                >
                  <img src={v.src} alt={v.label} />
                </button>
              ))}
            </div>

            <div className={styles.ctaRow}>
              <button className={styles.cta}>Add to Cart</button>
              <button className={styles.settingsBtn}>
                <Settings size={26} />
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
              <h2 className={styles.h2} data-el="tt1-title">BMGF-XS01</h2>
            </div>
            <div className={styles.description}>
              <p className={styles.p} data-el="tt1-desc">
                The Bipedal Maya Gundam Frame is a first generation mech from CxD Corp. XS01 is the first Experimental Shooter type of this series. Its chest piece has two points of articulation and is equipped with a nuclear reactor to power the XS01.
              </p>
            </div>
          </div>

          <div className={styles.tooltip}>
            <div className={styles.icon} data-el="tt2-icon" />
            <div className={styles.divider} />
            <div className="title">
              <h2 className={styles.h2} data-el="tt2-title">Spark</h2>
            </div>
            <div className={styles.description}>
              <p className={styles.p} data-el="tt2-desc">
                The XS01 Unit is a Shooter type with various long and medium ranged weaponry. Its main feature is the Wing Unit. To increase mobility, the XS01 is capable of activating the WoL system. Said system allows the nuclear reactor to overload its output, which causes it to burst all of the energy at once, creating wings made out of many Sparks.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.modelContainer} ref={modelContainerRef} />
      </section>
    </div>
  );
}
