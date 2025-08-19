import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import type { ModelPart } from '@/types/model-types';
import styles from './ThreeScene.module.css';
import Water1 from '@/components/model-viewer/shaders/water1_shader'



interface ModelComponentProps {
  modelPart: ModelPart;
  isSelected?: boolean;
  onClick?: () => void;
}

// function ModelComponent({ modelPart, isSelected, onClick }: ModelComponentProps) {
//   const [hovered, setHovered] = useState(false);
//   const meshRef = useRef<THREE.Mesh>(null);

//   try {
//     const { scene } = useGLTF(modelPart.modelUrl);
//     const sceneClone = scene.clone();

//     return (
//       <primitive
//         ref={meshRef}
//         object={sceneClone}
//         onClick={onClick}
//         onPointerOver={() => setHovered(true)}
//         onPointerOut={() => setHovered(false)}
//         scale={isSelected ? 1.1 : hovered ? 1.05 : 1}
//       />
//     );
//   } catch (e) {
//     return (
//       <mesh
//         ref={meshRef}
//         position={[0, 0, 0]}
//         onClick={onClick}
//         onPointerOver={() => setHovered(true)}
//         onPointerOut={() => setHovered(false)}
//         scale={isSelected ? 1.1 : hovered ? 1.05 : 1}
//       >
//         <boxGeometry args={[0.5, 0.5, 0.5]} />
//         <meshStandardMaterial color={isSelected ? '#ff8c00' : hovered ? '#00ff37ff' : '#00e1ffff'} wireframe />
//       </mesh>
//     );
//   }
// }

function PlaceholderModel() {
  return (
    <mesh>
      <boxGeometry args={[2, 3, 1]} />
      <meshStandardMaterial color="#ff6b35" wireframe />
    </mesh>
  );
}

interface ThreeSceneProps {
  selectedParts: ModelPart[];
  selectedPart?: ModelPart | null;
  onPartClick?: (part: ModelPart) => void;
  className?: string;
}

export default function ThreeScene({ selectedParts, selectedPart, onPartClick, className }: ThreeSceneProps) {

  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const clockRef = useRef(new THREE.Clock());

  useEffect(() => {

    // Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;


    // Camera Setup
    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 3;
    const camPos = new THREE.Vector3(-0.7, 0.7, 0);
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.copy(camPos);
    camera.lookAt(0, 1, 0);
    cameraRef.current = camera;


    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(devicePixelRatio);
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.5;
    rendererRef.current = renderer;

    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }


    // Controls Setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.dampingFactor = 0.1;
    controls.maxZoom = 1;
    controls.maxDistance = 1;
    controls.maxPolarAngle = (Math.PI / 2) + 0.27;
    controls.target.set(0, 0.3, 0);
    controls.update();
    controlsRef.current = controls;


    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    ambientLight.position.set(0, 5, 0);
    scene.add(ambientLight);


    // Water Setup
    const water = new Water1({ resolution: { x: 256, y: 256 } })
    scene.add(water);


    // Test
    // const plane = new THREE.Mesh(
    // new THREE.PlaneGeometry(2, 2),
    // new THREE.MeshStandardMaterial({ color: 0x00aaff, side: THREE.DoubleSide })
    // );
    // plane.rotation.x = -Math.PI / 2;
    // scene.add(plane);


    // Anim Setup
    function animate() {
      const elapsedTime = clockRef.current.getElapsedTime();
      water.update(elapsedTime);
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();


    // Window Resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);


    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return <div ref={containerRef} className={className}></div>;
};