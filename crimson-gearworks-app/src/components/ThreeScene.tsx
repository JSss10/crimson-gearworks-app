import { Mesh } from 'three';
import { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Center, useGLTF } from '@react-three/drei';
import type { ModelPart } from './Types';
import styles from './ThreeScene.module.css';

interface ModelComponentProps {
  modelPart: ModelPart;
  isSelected?: boolean;
  onClick?: () => void;
}

function ModelComponent({ modelPart, isSelected, onClick }: ModelComponentProps) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<Mesh>(null);

  try {
    const { scene } = useGLTF(modelPart.modelUrl);
    const sceneClone = scene.clone();

    return (
      <primitive
        ref={meshRef}
        object={sceneClone}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={isSelected ? 1.1 : hovered ? 1.05 : 1}
      />
    );
  } catch (e) {
    return (
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={isSelected ? 1.1 : hovered ? 1.05 : 1}
      >
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={isSelected ? '#ff8c00' : hovered ? '#00ff37ff' : '#00e1ffff'} wireframe />
      </mesh>
    );
  }
}

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
  return (
    <div className={[styles.fullSize, className].filter(Boolean).join(' ')}>
      <Canvas camera={{ position: [5, 2, 5], fov: 55 }} style={{ background: '#1f1e1cff' }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />

        <Suspense fallback={<PlaceholderModel />}>
          <Center>
            {selectedParts.length > 0 ? (
              selectedParts.map((part) => (
                <ModelComponent
                  key={part.id}
                  modelPart={part}
                  isSelected={selectedPart?.id === part.id}
                  onClick={() => onPartClick?.(part)}
                />
              ))
            ) : (
              <PlaceholderModel />
            )}
          </Center>
          <Environment preset="night" />
        </Suspense>

        <OrbitControls enablePan enableZoom enableRotate maxPolarAngle={Math.PI} minPolarAngle={0} />
      </Canvas>
    </div>
  );
}