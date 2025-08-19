import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useRef, useEffect, useCallback } from 'react';
import styles from '@/styles/model-viewer/three-scene.module.css';
import Water1 from './shaders/water1_shader';
import type { ModelPart, PartTypeID } from '@/types/model-types';

interface LoadedModel {
  model: THREE.Group;
  part: ModelPart;
  isVisible: boolean;
}

interface CachedModel {
  [partId: string]: THREE.Group;
}

interface ThreeSceneProps {
  selectedParts: ModelPart[];
  className?: string;
  onLoadStateChange?: (isLoading: boolean) => void;
  onLoadStateError?: (error: string) => void;
  isDemo?: boolean;
}

export default function ThreeScene({ selectedParts, className, onLoadStateChange, onLoadStateError, isDemo }: ThreeSceneProps) {

  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const clockRef = useRef(new THREE.Clock());
  const gltfLoaderRef = useRef<GLTFLoader | null>(null);
  const cachedModelRef = useRef<CachedModel>({});
  const loadedModelsRef = useRef<Map<PartTypeID, LoadedModel>>(new Map());
  const loadingPromisesRef = useRef<Map<string, Promise<THREE.Group>>>(new Map());



  const initLoader = useCallback(() => {
    const loadManager = new THREE.LoadingManager();

    loadManager.onStart = (url, loadedItems, totalItems) => {
      console.log(`Start Loading: ${url} - ${loadedItems} of ${totalItems}`);
      onLoadStateChange?.(true);
    }
  
    loadManager.onLoad = () => {
      console.log(`All Items loaded succesfully.`);
      onLoadStateChange?.(false);
    }
  
    loadManager.onError = (url) => {
      if (!isDemo) {
        console.error(`Error loading item: ${url}`);
        onLoadStateError?.(`Error loading item: ${url}`);
      }
      onLoadStateChange?.(false);
    }

    gltfLoaderRef.current = new GLTFLoader(loadManager);
  }, [onLoadStateChange, onLoadStateError]);


  const loadPart = useCallback(async (part: ModelPart): Promise<THREE.Group> => {
    if (cachedModelRef.current[part.id]) {
      return cachedModelRef.current[part.id].clone();
    }

    if (loadingPromisesRef.current.has(part.id)) {
      return loadingPromisesRef.current.get(part.id)!;
    }

    const loadPromise = new Promise<THREE.Group>((resolve, reject) => {
      gltfLoaderRef.current!.load(part.modelUrl, (gltf) => {

          const model = gltf.scene;
          model.name = part.id;
          cachedModelRef.current[part.id] = model.clone(); 
          loadingPromisesRef.current.delete(part.id);
          resolve(model);

        },
        undefined, (error) => {

          loadingPromisesRef.current.delete(part.id);
          reject(error);

        }
      );
    });

    loadingPromisesRef.current.set(part.id, loadPromise);
    return loadPromise;
  }, []);


  const removePart = useCallback((partType: PartTypeID) => {
    const loadedModel = loadedModelsRef.current.get(partType);
    if (loadedModel && sceneRef.current) {

      sceneRef.current.remove(loadedModel.model);
      loadedModelsRef.current.delete(partType);
      console.log(`Removed part: ${partType}`);
    }
  }, []);
  

  const createFallbackModel = useCallback((part: ModelPart): THREE.Group => {
    const group = new THREE.Group();
    group.name = `fb-${part.id}`;
    
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0xffffff, 
    });

    const mesh = new THREE.Mesh(geometry, material);  
    group.add(mesh);
    return group;
  }, []);


  const addPart = useCallback(async (part: ModelPart) => {
    if (!sceneRef.current) return;

    try {
      const model = await loadPart(part);
      const loadedModel: LoadedModel = { 
        model, 
        part, 
        isVisible: 
        true 
      };

      sceneRef.current.add(model);
      loadedModelsRef.current.set(part.partType, loadedModel);

    } catch (error) {
      if (!isDemo) console.error(`Failed to add: ${part.name}`, error);

      // When load fails, use fallback
      const fallbackModel = createFallbackModel(part);
      const loadedModel: LoadedModel = {
        model: fallbackModel,
        part,
        isVisible: true
      };

      sceneRef.current.add(fallbackModel);
      loadedModelsRef.current.set(part.partType, loadedModel);
      console.log(`Added fallback model for: ${part.name}`);
    }
  }, [loadPart, createFallbackModel]);


  const updateScene = useCallback(async () => {
    if (!sceneRef.current) return;

    const currentPartTypes = new Set(loadedModelsRef.current.keys());
    const newPartTypes = new Set(selectedParts.map(part => part.partType));

    for (const partType of currentPartTypes) {
      if (!newPartTypes.has(partType)) {
        removePart(partType);
      }
    }

    for (const part of selectedParts) {
      const currentModel = loadedModelsRef.current.get(part.partType);
      
      if (!currentModel || currentModel.part.id !== part.id) {
        if (currentModel) {
          removePart(part.partType);
        }
        await addPart(part);
      }
    }
  }, [selectedParts, removePart, addPart]);


  const handleResize = useCallback(() => {
    if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
    
    const { clientWidth, clientHeight } = containerRef.current;
    cameraRef.current.aspect = clientWidth / clientHeight;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(clientWidth, clientHeight);

  }, []);


  useEffect(() => {

    initLoader();

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
    controlsRef.current = controls;
    

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    ambientLight.position.set(0, 5, 0);
    scene.add(ambientLight);
    

    // Water Setup
    const water = new Water1({ resolution: {x: 256, y: 256}}, 10, 10)
    scene.add(water);
    

    // Test
    // const plane = new THREE.Mesh(
    // new THREE.PlaneGeometry(2, 2), 
    // new THREE.MeshStandardMaterial({ color: 0x00aaff, side: THREE.DoubleSide })
    // );
    // plane.rotation.x = -Math.PI / 2;
    // scene.add(plane);


    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }


    // Anim Setup
    function animate() {
      if (!clockRef.current || !rendererRef.current || !controlsRef.current) return;

      const elapsedTime = clockRef.current.getElapsedTime();
      water.update(elapsedTime);
      controlsRef.current.update();
      rendererRef.current.render(scene, camera);
      requestAnimationFrame(animate);
    }
    
    
    animate();
    

    // Cleanup
    return () => {
      resizeObserver.disconnect();

      loadedModelsRef.current.clear();
      loadingPromisesRef.current.clear();

      Object.values(cachedModelRef.current).forEach(model => {
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry?.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach(material => material.dispose());
            } else {
              child.material?.dispose();
            }
          }
        });
      });
      cachedModelRef.current = {};

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [initLoader, handleResize]);


  useEffect(() => {
    updateScene();
  }, [initLoader, updateScene])


  return <div ref={containerRef} className={className}></div>;
};