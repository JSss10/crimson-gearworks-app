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

    const setupModel = () => {
      const model = modelRef.current;
      const modelSize = modelSizeRef.current;
      if (!model || !modelSize) return;

      const isMobile = window.innerWidth < 1000;
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());

      model.position.set(
        isMobile ? center.x + modelSize.x * 1 : -center.x - modelSize.x * 0.4,
        -center.y + modelSize.y * 0.085,
        -center.z
      );

      model.rotation.z = isMobile ? 0 : THREE.MathUtils.degToRad(-25);

      const cameraDistance = isMobile ? 2 : 1.25;
      camera.position.set(0, 0, Math.max(modelSize.x, modelSize.y, modelSize.z) * cameraDistance);
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
        modelSizeRef.current = box.getSize(new THREE.Vector3());
        modelRef.current = model;
        scene.add(model);
        setupModel();
      },
      undefined,
      (err) => {
        console.error("Failed to load GLB /models/Spark_Chest.glb", err);
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
        gsap.to(scope.querySelectorAll('.' + styles.divider), { scaleX: `${scaleX}%`, ...animOptions });

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
    };
  }, []);

  return (
    <div ref={containerRef}>
      <section className={`${styles.section} ${styles.intro}`}>
        <h1 className={styles.h1}>GRND doesn&apos;t shake. It performs.</h1>
      </section>

      <section className={`${styles.section} ${styles.productOverview}`} data-el="product-overview">
        <div className={styles.header1} data-el="header1">
          <h1 className={styles.headerTitle} data-el="header1-title">Product Overview</h1>
        </div>
        <div className={styles.header2} data-el="header2">
          <h1 className={styles.headerTitle}>Product Overview</h1>
        </div>

        <div className={styles.circularMask} data-el="circular-mask" />

        <div className={styles.tooltips}>
          <div className={styles.tooltip}>
            <div className={styles.icon} data-el="tt1-icon">
            </div>
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
            <div className={styles.icon} data-el="tt2-icon">
            </div>
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

      <section className={`${styles.section} ${styles.outro}`}>
        <h1 className={styles.h1}>Don&apos;t just train — GRND</h1>
      </section>
    </div>
  );
}
