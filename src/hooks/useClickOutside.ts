import { useEffect, RefObject } from 'react';

interface UseClickOutsideProps<T extends HTMLElement = HTMLElement> {
  ref: RefObject<T | null>;
  isOpen: boolean;
  onClose: () => void;
}

export const useClickOutside = <T extends HTMLElement = HTMLElement>({
  ref,
  isOpen,
  onClose,
}: UseClickOutsideProps<T>) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [ref, isOpen, onClose]);
};
