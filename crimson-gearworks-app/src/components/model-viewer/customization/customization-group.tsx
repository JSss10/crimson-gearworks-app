import type { CustomizationOption } from '@/types/model-types';
import styles from '@/styles/model-viewer/customization/customization-group.module.css';

interface CustomizationGroupProps {
  title: string;
  options: CustomizationOption[];
  selectedOption?: string;
  onOptionSelect: (optionId: string) => void;
}

export default function CustomizationGroup({
  title,
  options,
  selectedOption,
  onOptionSelect,
}: CustomizationGroupProps) {
  return (
    <div className={styles.spaceY5}>
      <div className={styles.groupHeader}>
        <h4 className={styles.groupTitle}>{title}</h4>
      </div>
      <div className={styles.spaceY2}>
        {options.map((option) => (
          <div key={option.id} className={styles.optionRow}>
            <div className={styles.iconWrapper}>
              <div style={{ backgroundColor: option.color }}>{option.icon}</div>
            </div>
            <button
              onClick={() => onOptionSelect(option.id)}
              className={[
                styles.optionBtn,
                selectedOption === option.id
                  ? styles.optionBtnActive
                  : styles.optionBtnInactive,
              ].join(' ')}
            >
              {option.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}