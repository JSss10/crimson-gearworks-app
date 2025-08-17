import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
//import { OrbitControls, Environment, Center, useGLTF } from '@react-three/drei';
import type { ModelPart } from './Types';
import styles from './ThreeScene.module.css';
import Water1 from './shaders/water1_shader'



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
    const scene = new THREE.Scene();
    
    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 20;
    const camPos = new THREE.Vector3(0.5, 0.25, -1);
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    const clock = new THREE.Clock();
    
    camera.position.set(camPos.x, camPos.y, camPos.z);
    camera.lookAt(0, 0, 0);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(devicePixelRatio);
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.5;

    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = true;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    ambientLight.position.set(0, 5, 0);
    scene.add(ambientLight);
    
    const water = new Water1({ resolution: {x: 256, y: 256}})
    scene.add(water);
    
    
    rendererRef.current = renderer;
    cameraRef.current = camera;
    sceneRef.current = scene;
    controlsRef.current = controls;

    function animate() {
      const elapsedTime = clock.getElapsedTime();
      water.update(elapsedTime);
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();

    return () => {
      window.removeEventListener("resize", () => { /*...*/ });
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return <div ref={containerRef} className={className}></div>;
};