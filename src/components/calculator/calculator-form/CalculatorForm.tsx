import { useForm } from 'react-hook-form';

import { isSubmitDisabled } from '../utils/validation';
import { CALCULATOR_CONSTANTS, CALCULATOR_TEXTS } from '../utils/constants';
import { useFocusFirstInvalidField } from '../utils/hooks/useFocusFirstInvalidField';
import {
  AgeField,
  GenderField,
  InvestmentField,
  DisclaimerField,
  ContributionYearsField,
} from '../form-fields';
import { Button } from '@/ui';

import { CalculatorFormProps, CalculatorFormData } from '../types';
import styles from './CalculatorForm.module.scss';

export const CalculatorForm = ({ onSubmit }: CalculatorFormProps) => {
  const {
    watch,
    trigger,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CalculatorFormData>({
    defaultValues: CALCULATOR_CONSTANTS.DEFAULT_VALUES,
    mode: 'all',
  });

  const watchedValues = watch();

  const { focusFirstInvalidField, refs } = useFocusFirstInvalidField(watchedValues, trigger);

  const { ageFieldRef, genderFieldRef, investmentFieldRef } = refs;

  const handleButtonClick = (e: React.MouseEvent) => {
    if (isSubmitDisabled(watchedValues)) {
      e.preventDefault();
      focusFirstInvalidField();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <AgeField control={control} errors={errors} ref={ageFieldRef} />
      <GenderField control={control} errors={errors} ref={genderFieldRef} />
      <InvestmentField control={control} errors={errors} ref={investmentFieldRef} />
      <ContributionYearsField control={control} watchedValues={watchedValues} errors={errors} />
      <DisclaimerField />
      <Button
        type='submit'
        variant='calculator'
        onClick={handleButtonClick}
        text={CALCULATOR_TEXTS.BUTTON.submit}
      />
    </form>
  );
};
