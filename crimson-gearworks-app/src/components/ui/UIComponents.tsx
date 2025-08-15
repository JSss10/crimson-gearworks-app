import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { useState, useRef, useContext, createContext } from 'react';
import type { ModelPart } from '../Types';
import styles from './UIComponents.module.css';

interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  displayItems: ModelPart[];
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  onItemSelect?: (item: ModelPart) => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export const Dropdown = ({ children, displayItems, onItemSelect }: { children: React.ReactNode; displayItems: ModelPart[]; onItemSelect?: (item: ModelPart) => void; }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, displayItems, dropdownRef, onItemSelect }}>
      <div className={styles.fullWidth} ref={dropdownRef}>{children}</div>
    </DropdownContext.Provider>
  );
};

export const ToggleButton = ({ title }: { title: string }) => {
  const context = useContext(DropdownContext);

  return (
    <button
      onClick={() => context?.setIsOpen(!context?.isOpen)}
      className={styles.toggleBtn}
    >
      <span>{title}</span>
      {context?.isOpen ? <FiChevronUp className={styles.iconSm} /> : <FiChevronDown className={styles.iconSm} />}
    </button>
  );
};

export const DropdownContent = () => {
  const context = useContext(DropdownContext);

  return (
    context?.isOpen && (
      <div className={styles.dropdownPanel}>
        <ul>
          {context.displayItems.map((item) => (
            <li key={item.id} className={styles.dropdownItem}>
              <button
                onClick={() => context.onItemSelect?.(item)}
                className={styles.dropdownItemBtn}
              >
                <div className={styles.dropdownItemTitle}>{item.name}</div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};