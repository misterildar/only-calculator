import { CalculatorIcon, LoadingSpinner, Button } from '@/ui';
import { MultipleInvestmentCharts } from '../investment-chart/MultipleInvestmentCharts';
import { CALCULATOR_TEXTS } from '../utils/constants';

import { CalculatorContentProps } from '../types';
import styles from './CalculatorContent.module.scss';

export const CalculatorContent = ({ isLoading, serverResponse, error }: CalculatorContentProps) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className={styles.initialState}>
        <CalculatorIcon />
        <p className={styles.description} style={{ color: '#ff4444' }}>
          Error: {error}
        </p>
      </div>
    );
  }

  if (serverResponse && serverResponse.results.length > 0) {
    return (
      <div className={styles.result}>
        <MultipleInvestmentCharts data={serverResponse.results} summary={serverResponse.summary} />
        <Button variant='secondary' text='Request expert advise' className={styles.button} />
      </div>
    );
  }

  return (
    <div className={styles.initialState}>
      <CalculatorIcon />
      <p className={styles.description}>{CALCULATOR_TEXTS.ICON.iconText}</p>
    </div>
  );
};
