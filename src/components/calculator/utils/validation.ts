import { CalculatorFormData } from '../types';
import { CALCULATOR_CONSTANTS, CALCULATOR_TEXTS } from './constants';

const { VALIDATION } = CALCULATOR_CONSTANTS;
const { ERRORS } = CALCULATOR_TEXTS;

export const validationRules = {
  currentAge: {
    required: ERRORS.ageRequired,
    validate: (value: string | number) => {
      const stringValue = value?.toString() || '';
      if (!stringValue) return true;
      if (!/^\d+$/.test(stringValue)) return ERRORS.ageFormat;
      return true;
    },
    min: { value: VALIDATION.MIN_AGE, message: ERRORS.ageMin },
    max: { value: VALIDATION.MAX_AGE, message: ERRORS.ageMax },
  },

  gender: {
    required: ERRORS.genderRequired,
  },

  initialInvestment: {
    required: ERRORS.investmentRequired,
    validate: (value: string | number) => {
      const stringValue = value?.toString() || '';
      if (!stringValue) return true;
      if (!/^\d+$/.test(stringValue)) return ERRORS.investmentFormat;
      return true;
    },
    min: { value: VALIDATION.MIN_INVESTMENT, message: ERRORS.investmentMin },
  },

  contributionYears: {
    min: { value: VALIDATION.MIN_CONTRIBUTION_YEARS, message: ERRORS.contributionYearsRequired },
  },
} as const;

export const fieldHandlers = {
  age: (value: string, onChange: (val: string | number) => void) => {
    if (value === '') {
      onChange('');
      return;
    }
    if (!/^\d+$/.test(value)) {
      onChange(value);
      return;
    }
    const numValue = parseInt(value);
    if (numValue <= VALIDATION.MAX_AGE) {
      onChange(numValue);
    }
  },

  investment: (value: string, onChange: (val: string | number) => void) => {
    if (value === '') {
      onChange('');
      return;
    }
    if (!/^\d+$/.test(value)) {
      onChange(value);
      return;
    }
    onChange(parseInt(value));
  },
} as const;

export const isSubmitDisabled = (values: CalculatorFormData): boolean => {
  const { gender, currentAge, initialInvestment, contributionYears } = values;

  return (
    !gender ||
    !currentAge ||
    typeof currentAge === 'string' ||
    currentAge < VALIDATION.MIN_AGE ||
    currentAge > VALIDATION.MAX_AGE ||
    !initialInvestment ||
    typeof initialInvestment === 'string' ||
    initialInvestment < VALIDATION.MIN_INVESTMENT ||
    contributionYears < VALIDATION.MIN_CONTRIBUTION_YEARS
  );
};
