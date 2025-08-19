"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"
import * as THREE from "three"
import styles from "@/styles/events/index.module.css"

export default function EventsPage() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const w = window.innerWidth
    const h = window.innerHeight

    const isSm = w < 640
    const isMd = w >= 640 && w < 1024

    const params = {
      cameraFov: isSm ? 78 : isMd ? 72 : 70,
      radius: isSm ? 5.5 : isMd ? 6.25 : 7,
      cylinderHeight: isSm ? 36 : isMd ? 42 : 45,
      segments: 30,
      numVerticalSections: isSm ? 7 : isMd ? 10 : 12,
      blocksPerSection: isSm ? 4 : isMd ? 5 : 6,
      verticalSpacing: isSm ? 4.25 : isMd ? 4.75 : 5,
      tileW: isSm ? 3.25 : isMd ? 4 : 4.75,
      tileH: isSm ? 2.1 : isMd ? 2.4 : 2.75,
      baseRotationSpeed: isSm ? 0.0012 : 0.0015,
      dprCap: isSm ? 1.5 : 2,
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      params.cameraFov,
      w / h,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    rendererRef.current = renderer

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, params.dprCap))
    renderer.setSize(w, h)
    renderer.setClearColor(0x000000, 0)

    renderer.domElement.style.position = "fixed"
    renderer.domElement.style.top = "0"
    renderer.domElement.style.left = "0"
    renderer.domElement.style.width = "100%"
    renderer.domElement.style.height = "100%"
    renderer.domElement.style.zIndex = "-1"
    renderer.domElement.style.pointerEvents = "none"

    containerRef.current.appendChild(renderer.domElement)

    camera.position.z = 12

    const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    scene.add(ambientLight)

    const galleryGroup = new THREE.Group()
    scene.add(galleryGroup)

    const { radius, cylinderHeight: cylH, segments } = params

    const cylinderGeometry = new THREE.CylinderGeometry(radius, radius, cylH, segments, 1, true)
    const cylinderMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    })
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial)
    galleryGroup.add(cylinder)

    const textureLoader = new THREE.TextureLoader()
    const blocks: THREE.Group[] = []
    const loadedTextures: THREE.Texture[] = []

    function getRandomImage() {
      return Math.floor(Math.random() * 50) + 1
    }

    function loadImageTexture(imageNumber: number): Promise<THREE.Texture> {
      return new Promise((resolve) => {
        textureLoader.load(`/images/events/img${imageNumber}.jpg`, (loadedTexture) => {
          loadedTexture.generateMipmaps = true
          loadedTexture.minFilter = THREE.LinearMipmapLinearFilter
          loadedTexture.magFilter = THREE.LinearFilter
          loadedTexture.anisotropy = renderer.capabilities.getMaxAnisotropy()
          loadedTextures.push(loadedTexture)
          resolve(loadedTexture)
        })
      })
    }

    function createCurvedPlane(width: number, height: number, r: number, seg: number) {
      const geometry = new THREE.BufferGeometry()
      const vertices: number[] = []
      const indices: number[] = []
      const uvs: number[] = []

      const segmentsX = seg * 4
      const segmentsY = Math.max(1, Math.floor(height * 12))
      const theta = width / r

      for (let y = 0; y <= segmentsY; y++) {
        const yPos = (y / segmentsY - 0.5) * height
        for (let x = 0; x <= segmentsX; x++) {
          const xAngle = (x / segmentsX - 0.5) * theta
          const xPos = Math.sin(xAngle) * r
          const zPos = Math.cos(xAngle) * r
          vertices.push(xPos, yPos, zPos)
          uvs.push((x / segmentsX) * 0.8 + 0.1, y / segmentsY)
        }
      }

      for (let y = 0; y < segmentsY; y++) {
        for (let x = 0; x < segmentsX; x++) {
          const a = x + (segmentsX + 1) * y
          const b = x + (segmentsX + 1) * (y + 1)
          const c = x + 1 + (segmentsX + 1) * (y + 1)
          const d = x + 1 + (segmentsX + 1) * y
          indices.push(a, b, d, b, c, d)
        }
      }

      geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3))
      geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2))
      geometry.setIndex(indices)
      geometry.computeVertexNormals()

      return geometry
    }

    const numVeritcalSections = params.numVerticalSections
    const blocksPerSection = params.blocksPerSection
    const verticalSpacing = params.verticalSpacing
    const totalBlockHeight = numVeritcalSections * verticalSpacing
    const heightBuffer = (cylH - totalBlockHeight) / 2
    const startY = -cylH / 2 + heightBuffer + verticalSpacing
    const sectionAngle = (Math.PI * 2) / blocksPerSection
    const maxRandomAngle = sectionAngle * 0.2

    async function createBlock(baseY: number, yOffset: number, _sectionIndex: number, blockIndex: number) {
      const blockGeometry = createCurvedPlane(params.tileW, params.tileH, radius, 20)
      const imageNumber = getRandomImage()
      const texture = await loadImageTexture(imageNumber)

      const blockMaterial = new THREE.MeshPhysicalMaterial({
        map: texture,
        side: THREE.DoubleSide,
        toneMapped: false,
        roughness: 0,
        metalness: 0,
        transmission: 0,
        clearcoat: 0,
      })

      const block = new THREE.Mesh(blockGeometry, blockMaterial)
      block.position.y = baseY + yOffset

      const blockContainer = new THREE.Group()
      const baseAngle = sectionAngle * blockIndex
      const randomAngleOffset = (Math.random() * 2 - 1) * maxRandomAngle
      blockContainer.rotation.y = baseAngle + randomAngleOffset
      blockContainer.add(block)
      return blockContainer
    }

    async function initializeBlocks() {
      for (let section = 0; section < numVeritcalSections; section++) {
        const baseY = startY + section * verticalSpacing
        for (let i = 0; i < blocksPerSection; i++) {
          const yOffset = Math.random() * 0.2 - 0.1
          const blockContainer = await createBlock(baseY, yOffset, section, i)
          blocks.push(blockContainer)
          galleryGroup.add(blockContainer)
        }
      }
    }

    const lenis = new Lenis({ autoRaf: true })
    let currentScroll = 0
    let rotationSpeed = 0
    const baseRotationSpeed = params.baseRotationSpeed
    const maxRotationSpeed = 0.05

    let totalScroll = document.documentElement.scrollHeight - window.innerHeight

    lenis.on("scroll", (e: any) => {
      currentScroll = window.pageYOffset
      rotationSpeed = Math.max(Math.min(e.velocity * 0.005, maxRotationSpeed), -maxRotationSpeed)
    })

    let rafId = 0
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const scrollFraction = totalScroll > 0 ? currentScroll / totalScroll : 0
      camera.position.y = -(scrollFraction * cylH - cylH / 2)
      galleryGroup.rotation.y += baseRotationSpeed + rotationSpeed
      rotationSpeed *= 0.9
      renderer.render(scene, camera)
    }

    initializeBlocks()
    animate()

    function handleResize() {
      const width = window.innerWidth
      const heightV = window.innerHeight
      camera.aspect = width / heightV
      camera.updateProjectionMatrix()
      renderer.setSize(width, heightV)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, params.dprCap))
      totalScroll = document.documentElement.scrollHeight - window.innerHeight
    }

    window.addEventListener("resize", handleResize, { passive: true })

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(rafId)
      renderer.dispose()
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh
        if (mesh.geometry) mesh.geometry.dispose()
        if (mesh.material) {
          const m = mesh.material as THREE.Material | THREE.Material[]
          if (Array.isArray(m)) m.forEach((mm) => mm.dispose())
          else m.dispose()
        }
      })
      loadedTextures.forEach((t) => t.dispose())
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.titleLine}>
            <span className={styles.orange}>MEET.</span>
            <span className={styles.white}>GREET.</span>
          </h1>
          <h1 className={styles.titleLineTwo}>
            <span>& REPEAT</span>
          </h1>
        </div>
      </div>

      <div ref={containerRef} className={styles.canvasContainer} />
    </>
  )
}