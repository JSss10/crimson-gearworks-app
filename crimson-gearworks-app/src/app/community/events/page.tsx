'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import * as THREE from 'three'
import styles from '@/styles/events.module.css'

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)

    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement)
    }

    camera.position.z = 12

    const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    scene.add(ambientLight)

    const galleryGroup = new THREE.Group()
    scene.add(galleryGroup)

    const radius = 7
    const height = 45
    const segments = 30

    const cylinderGeometry = new THREE.CylinderGeometry(radius, radius, height, segments, 1, true)
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

    function getRandomImage() {
      return Math.floor(Math.random() * 50) + 1
    }

    function loadImageTexture(imageNumber: number): Promise<THREE.Texture> {
      return new Promise((resolve) => {
        const texture = textureLoader.load(`/images/events/img${imageNumber}.jpg`, (loadedTexture) => {
          loadedTexture.generateMipmaps = true
          loadedTexture.minFilter = THREE.LinearMipmapLinearFilter
          loadedTexture.magFilter = THREE.LinearFilter
          loadedTexture.anisotropy = renderer.capabilities.getMaxAnisotropy()
          resolve(loadedTexture)
        })
      })
    }

    function createCurvedPlane(width: number, height: number, radius: number, segments: number) {
      const geometry = new THREE.BufferGeometry()
      const vertices: number[] = []
      const indices: number[] = []
      const uvs: number[] = []

      const segmentsX = segments * 4
      const segmentsY = Math.floor(height * 12)
      const theta = width / radius

      for (let y = 0; y <= segmentsY; y++) {
        const yPos = (y / segmentsY - 0.5) * height
        for (let x = 0; x <= segmentsX; x++) {
          const xAngle = (x / segmentsX - 0.5) * theta
          const xPos = Math.sin(xAngle) * radius
          const zPos = Math.cos(xAngle) * radius
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

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
      geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
      geometry.setIndex(indices)
      geometry.computeVertexNormals()

      return geometry
    }

    const numVeritcalSections = 12
    const blocksPerSection = 6
    const verticalSpacing = 5
    const totalBlockHeight = numVeritcalSections * verticalSpacing
    const heightBuffer = (height - totalBlockHeight) / 2
    const startY = -height / 2 + heightBuffer + verticalSpacing
    const sectionAngle = (Math.PI * 2) / blocksPerSection
    const maxRandomAngle = sectionAngle * 0.2

    async function createBlock(baseY: number, yOffset: number, sectionIndex: number, blockIndex: number) {
      const blockGeometry = createCurvedPlane(4.75, 2.75, radius, 20)
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
    const baseRotationSpeed = 0.0015
    const maxRotationSpeed = 0.05
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight

    lenis.on('scroll', (e) => {
      currentScroll = window.pageYOffset
      rotationSpeed = e.velocity * 0.005
    })

    function animate() {
      requestAnimationFrame(animate)
      const scrollFraction = currentScroll / totalScroll
      camera.position.y = -(scrollFraction * height - height / 2)
      galleryGroup.rotation.y += baseRotationSpeed + rotationSpeed
      rotationSpeed *= 2
      renderer.render(scene, camera)
    }

    initializeBlocks()
    animate()

    function handleResize() {
      const width = window.innerWidth
      const height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return <div ref={containerRef} className={styles.canvasContainer}></div>
}