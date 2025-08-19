'use client';

import ThreeScene from '@/components/model-viewer/three-scene';
import PartDetailsPanel from '@/components/model-viewer/customization/part-details-panel';
import { ChangeEvent, useState, useMemo, useCallback } from 'react';
import { Dropdown, DropdownContent, Searchbar, ToggleButton } from '@/components/model-viewer/ui-components';
import { partTypeRegistry } from '@/types/model-types';
import { partRegistry } from '@/components/partRegistry';
import type { ModelPart, PartTypeID } from '@/types/model-types';
import styles from '@/styles/model-viewer/index.module.css';

export default function Index() {

  const allParts = useMemo(() => Object.values(partRegistry).flat(), []);
  const [selectedPart, setSelectedPart] = useState<ModelPart | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeParts, setActiveParts] = useState<Map<PartTypeID, ModelPart>>(new Map());
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modelError, setModelError] = useState<string | null>(null);
  
  const getDefaultParts = useCallback((): ModelPart[] => {
    const defaultParts: ModelPart[] = [];
    
    partTypeRegistry.forEach(partType => {
      const defaultPart = allParts.find(part => 
        part.partType === partType.id && part.isDefault
      );
      
      if (defaultPart) {
        defaultParts.push(defaultPart);
      }
    });
    
    return defaultParts;
  }, [allParts]);

  useState(() => {
    const defaultParts = getDefaultParts();
    const initialActiveParts = new Map<PartTypeID, ModelPart>();

    defaultParts.forEach(part => {
      initialActiveParts.set(part.partType, part);
    });

    setActiveParts(initialActiveParts);
  });

  // Converts active parts to an array for the ThreeScene
  const activePartsArr = useMemo(() => Array.from(activeParts.values()), [activeParts]);

  const filteredParts = useMemo(() => {
    if (searchText.trim() === '') {
      return allParts;
    }
    return allParts.filter(part => part.name.toLowerCase().includes(searchText.toLowerCase()));
  }, [allParts, searchText]);

  let inputHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.toLowerCase(); 
    setSearchText(input);
  }, []);

  const selectPart = useCallback((part: ModelPart) => {
    setActiveParts((prev) => {
      const newActiveParts = new Map(prev);
      newActiveParts.set(part.partType, part);
      return newActiveParts;
    });

    setSelectedPart(part);
    setIsPanelOpen(true);
    setModelError(null);
  }, []);

  const handleResetView = useCallback(() => {
    const defaultParts = getDefaultParts();
    const resetActiveParts = new Map<PartTypeID, ModelPart>();

    defaultParts.forEach(part => {
      resetActiveParts.set(part.partType, part);
    });
    
    setActiveParts(resetActiveParts);
    setSelectedPart(null);
    setIsPanelOpen(false);
    setModelError(null);
  }, [getDefaultParts]);

  const handleTogglePhotoMode = useCallback(() => {
    // Toggle UI Visibility here
  }, []);

  const handleRemovePart = useCallback((partId: string) => {
    setActiveParts(prev => {
      const newActiveParts = new Map(prev);

      for (const [partType, part] of newActiveParts) {
        if (part.id == partId) {
          newActiveParts.delete(partType);
          break;
        }
      }
      return newActiveParts;
  });

    if (selectedPart?.id == partId) {
      setSelectedPart(null);
      setIsPanelOpen(false);
    }
  }, [selectedPart?.id]);

  const handlePanelClose = useCallback(() => {
    setIsPanelOpen(false);
  }, []);

  const handleLoadingStateChange = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const handleModelError = useCallback((error: string) => {
    setModelError(error);
  }, []);

  return (
    <div className={styles.root} style={{ minWidth: '800px' }}>
      <div className={styles.sidebar}>
        <div className={styles.logoOffset}></div>

        <div className={styles.brandBlock}>
          <h1 className={styles.brandTitle}>
            CRIMSON-CONFIGURATOR <span className={styles.brandVersion}>V1.04</span>
          </h1>
          <p className={styles.brandSubtitle}>CUSTOMIZE YOUR MECHA</p>
          { isLoading && (<p className={styles.loadingText}>Loading model...</p>) }
          { modelError && (<p className={styles.errorText}>Error: {modelError}</p>) }
        </div>

        <div className={styles.searchBar}>
          <Searchbar inputHandler={inputHandler}>
          </Searchbar>
        </div>

        <div className={styles.spaceY1}>
          {partTypeRegistry.map((partType) => {
            const partsPerType = filteredParts.filter((part) => part.partType === partType.id);

            return (
              partsPerType.length > 0 && (
                <Dropdown key={partType.id} displayItems={partsPerType} onItemSelect={selectPart}>
                  <ToggleButton title={partType.name} />
                  <DropdownContent />
                </Dropdown>
              )
            );
          })}
        </div>
      </div>

      <div className={styles.stage}>
        <ThreeScene selectedParts={activePartsArr} className={styles.fullSize} onLoadStateChange={handleLoadingStateChange} onLoadStateError={handleModelError} isDemo={true}/>

        <div className={styles.bottomBarWrap}>
          <div className={styles.bottomBar}>
            <div className={styles.bottomBarRow}>
              <button onClick={handleResetView} className={styles.primaryBtn}>Reset View</button>
              <button onClick={handleTogglePhotoMode} className={styles.primaryBtn}>Photo Mode (WIP)</button>
            </div>
          </div>
        </div>
      </div>
      <PartDetailsPanel selectedPart={selectedPart} onWindowClose={handlePanelClose} isOpen={isPanelOpen} onRemovePart={handleRemovePart} />
    </div>
  );
}