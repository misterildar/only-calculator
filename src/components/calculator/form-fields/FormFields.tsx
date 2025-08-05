import { Controller } from 'react-hook-form';
import { forwardRef } from 'react';

import { Dropdown } from './DropDown';
import { FormFieldsProps, CalculatorFormData } from '../types';
import { CALCULATOR_CONSTANTS, CALCULATOR_TEXTS } from '../utils/constants';
import { validationRules, fieldHandlers } from '../utils/validation';

import styles from './FormFields.module.scss';

export const AgeField = forwardRef<HTMLInputElement, Pick<FormFieldsProps, 'control' | 'errors'>>(
  ({ control, errors }, ref) => (
    <div className={styles.field}>
      <label className={styles.label}>
        {CALCULATOR_TEXTS.LABELS.currentAge} <span className={styles.required}>*</span>
      </label>
      <Controller
        name='currentAge'
        control={control}
        rules={validationRules.currentAge}
        render={({ field }) => (
          <input
            ref={ref}
            type='text'
            className={`${styles.input} ${errors.currentAge ? styles.inputError : ''}`}
            placeholder={CALCULATOR_TEXTS.PLACEHOLDERS.age}
            value={field.value ? field.value.toString() : ''}
            onChange={(e) => fieldHandlers.age(e.target.value, field.onChange)}
          />
        )}
      />
      {errors.currentAge && <span className={styles.error}>{errors.currentAge.message}</span>}
    </div>
  )
);

AgeField.displayName = 'AgeField';

export const GenderField = forwardRef<HTMLDivElement, Pick<FormFieldsProps, 'control' | 'errors'>>(
  ({ control, errors }, ref) => (
    <div ref={ref}>
      <Dropdown<CalculatorFormData>
        control={control}
        errors={errors}
        name='gender'
        label={CALCULATOR_TEXTS.LABELS.gender}
        options={CALCULATOR_CONSTANTS.GENDER_OPTIONS}
        rules={validationRules.gender}
        placeholder='Choose your gender'
      />
    </div>
  )
);

GenderField.displayName = 'GenderField';

export const InvestmentField = forwardRef<
  HTMLInputElement,
  Pick<FormFieldsProps, 'control' | 'errors'>
>(({ control, errors }, ref) => (
  <div className={styles.field}>
    <label className={styles.label}>{CALCULATOR_TEXTS.LABELS.initialInvestment}</label>
    <Controller
      name='initialInvestment'
      control={control}
      rules={validationRules.initialInvestment}
      render={({ field }) => (
        <input
          ref={ref}
          type='text'
          placeholder={CALCULATOR_TEXTS.PLACEHOLDERS.investment}
          className={`${styles.input} ${errors.initialInvestment ? styles.inputError : ''}`}
          value={field.value ? field.value.toString() : ''}
          onChange={(e) => fieldHandlers.investment(e.target.value, field.onChange)}
        />
      )}
    />
    {errors.initialInvestment && (
      <span className={styles.error}>{errors.initialInvestment.message}</span>
    )}
  </div>
));

InvestmentField.displayName = 'InvestmentField';

export const ContributionYearsField = ({
  control,
  watchedValues,
  errors,
}: Pick<FormFieldsProps, 'control' | 'watchedValues' | 'errors'>) => (
  <div className={styles.field}>
    <div className={styles.sliderHeader}>
      <span className={styles.sliderLabel}>
        {CALCULATOR_TEXTS.LABELS.contributionYears} <span className={styles.required}>*</span>
      </span>
      <span className={styles.sliderLabel}>
        {watchedValues.contributionYears || ''}
        {CALCULATOR_TEXTS.HINTS.yearsLabel}
      </span>
    </div>
    <div className={styles.sliderContainer}>
      <Controller
        name='contributionYears'
        control={control}
        rules={validationRules.contributionYears}
        render={({ field }) => (
          <input
            {...field}
            type='range'
            min={CALCULATOR_CONSTANTS.SLIDER.MIN}
            max={CALCULATOR_CONSTANTS.SLIDER.MAX}
            step={CALCULATOR_CONSTANTS.SLIDER.STEP}
            className={styles.slider}
            onChange={(e) => field.onChange(parseInt(e.target.value))}
          />
        )}
      />
      <div className={styles.sliderLabels}>
        {CALCULATOR_CONSTANTS.SLIDER.LABELS.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
    {errors.contributionYears && (
      <span className={styles.error}>{errors.contributionYears.message}</span>
    )}
  </div>
);

ContributionYearsField.displayName = 'ContributionYearsField';

export const DisclaimerField = () => (
  <div className={styles.disclaimer}>
    <strong>Disclaimer:</strong> {CALCULATOR_TEXTS.DISCLAIMER}
  </div>
);
