import { useRef } from 'react';
import { UseFormTrigger } from 'react-hook-form';
import { CalculatorFormData } from '../../types';
import { CALCULATOR_CONSTANTS } from '../constants';

export const useFocusFirstInvalidField = (
  watchedValues: CalculatorFormData,
  trigger: UseFormTrigger<CalculatorFormData>
) => {
  const ageFieldRef = useRef<HTMLInputElement>(null);
  const genderFieldRef = useRef<HTMLDivElement>(null);
  const investmentFieldRef = useRef<HTMLInputElement>(null);

  const focusFirstInvalidField = () => {
    if (
      !watchedValues.currentAge ||
      typeof watchedValues.currentAge === 'string' ||
      watchedValues.currentAge < CALCULATOR_CONSTANTS.VALIDATION.MIN_AGE ||
      watchedValues.currentAge > CALCULATOR_CONSTANTS.VALIDATION.MAX_AGE
    ) {
      ageFieldRef.current?.focus();
      return;
    }

    if (!watchedValues.gender) {
      const dropdownButton = genderFieldRef.current?.querySelector('button');
      if (dropdownButton) {
        dropdownButton.focus();
      }
      return;
    }

    if (
      !watchedValues.initialInvestment ||
      typeof watchedValues.initialInvestment === 'string' ||
      watchedValues.initialInvestment < CALCULATOR_CONSTANTS.VALIDATION.MIN_INVESTMENT
    ) {
      investmentFieldRef.current?.focus();
      return;
    }

    if (watchedValues.contributionYears < CALCULATOR_CONSTANTS.VALIDATION.MIN_CONTRIBUTION_YEARS) {
      trigger('contributionYears');
      return;
    }
  };

  return {
    focusFirstInvalidField,
    refs: {
      ageFieldRef,
      genderFieldRef,
      investmentFieldRef,
    },
  };
};
