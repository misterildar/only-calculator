import React, { useState, useRef } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { SelectArrow } from '@/ui';
import { useClickOutside } from '@/hooks';

import { DropdownProps } from '../types';
import styles from './FormFields.module.scss';

export const Dropdown = <T extends FieldValues = FieldValues>({
  control,
  errors,
  name,
  label,
  options,
  rules,
  placeholder = 'Select an option',
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside<HTMLDivElement>({
    ref: dropdownRef,
    isOpen,
    onClose: () => setIsOpen(false),
  });

  return (
    <div className={styles.field} ref={dropdownRef}>
      <label className={styles.label}>
        {label} <span className={styles.required}>*</span>
      </label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          const selectedOption = options.find((option) => option.value === field.value);

          return (
            <div className={styles.dropdownContainer}>
              <button
                type='button'
                className={`${styles.input} ${errors[name] ? styles.inputError : ''} ${styles.dropdownTrigger}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-haspopup='listbox'
              >
                <span
                  className={selectedOption?.value ? styles.selectedText : styles.placeholderText}
                >
                  {selectedOption?.label || placeholder}
                </span>
                <SelectArrow isOpen={isOpen} />
              </button>

              {isOpen && (
                <div className={styles.dropdownMenu} role='listbox'>
                  {options.map(({ value, label: optLabel }) => (
                    <button
                      key={value}
                      type='button'
                      className={`${styles.dropdownOption} ${field.value === value ? styles.selected : ''}`}
                      onClick={() => {
                        field.onChange(value);
                        setIsOpen(false);
                      }}
                      role='option'
                      aria-selected={field.value === value}
                    >
                      {optLabel}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        }}
      />
      {errors[name]?.message && (
        <span className={styles.inputError}>{String(errors[name]?.message)}</span>
      )}
    </div>
  );
};

Dropdown.displayName = 'Dropdown';
