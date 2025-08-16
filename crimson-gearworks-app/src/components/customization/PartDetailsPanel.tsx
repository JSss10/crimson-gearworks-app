import CustomizationGroup from './customizationGroup';
import { IoClose } from 'react-icons/io5';
import { useState } from 'react';
import type { CustomizationOption, ModelPart } from '../Types';
import styles from './partDetailsPanel.module.css';

interface PartDetailsPanelProps {
  selectedPart: ModelPart | null;
  onWindowClose: () => void;
  isOpen: boolean;
  onRemovePart?: (partId: string) => void;
}

export default function PartDetailsPanel({ selectedPart, onWindowClose: onClose, isOpen, onRemovePart }: PartDetailsPanelProps) {
  const [selectedColor, setSelectedColor] = useState<string>('default');
  const [selectedTexture, setSelectedTexture] = useState<string>('none');
  const [selectedSticker, setSelectedSticker] = useState<string>('none');

  if (!isOpen || !selectedPart) {
    return null;
  }

  const colorOptions: CustomizationOption[] | undefined = selectedPart.customizationOptions?.filter(
    (option) => option.customizationType === 'color'
  );

  const textureOptions: CustomizationOption[] | undefined = selectedPart.customizationOptions?.filter(
    (option) => option.customizationType === 'texture'
  );

  const stickerOptions: CustomizationOption[] | undefined = selectedPart.customizationOptions?.filter(
    (option) => option.customizationType === 'sticker'
  );

  return (
    <div
      className={styles.panel}
      style={{
        backgroundColor: 'rgb(47, 46, 45)',
        width: 'clamp(260px, 25vw, 400px)',
        flexShrink: 0,
      }}
    >
      <div className={styles.panelHeader}>
        <h1 className={styles.panelTitle}>CUSTOMIZE</h1>
        <button onClick={onClose} className={styles.closeBtn}>
          <IoClose className={styles.closeIcon} />
        </button>
      </div>

      <div className={styles.spaceY6}>
        <div className={styles.infoCard}>
          <h3 className={styles.orangeText}>{selectedPart?.name || 'No part selected'}</h3>
          <p className={styles.orangeSubtext}>{selectedPart?.partType || 'Select a part to customize'}</p>
        </div>

        <CustomizationGroup
          title="Color Theme"
          options={colorOptions ?? []}
          selectedOption={selectedColor}
          onOptionSelect={setSelectedColor}
        />

        <CustomizationGroup
          title="Surface Texture"
          options={textureOptions ?? []}
          selectedOption={selectedTexture}
          onOptionSelect={setSelectedTexture}
        />

        <CustomizationGroup
          title="Stickers & Decals"
          options={stickerOptions ?? []}
          selectedOption={selectedSticker}
          onOptionSelect={setSelectedSticker}
        />
      </div>
    </div>
  );
}