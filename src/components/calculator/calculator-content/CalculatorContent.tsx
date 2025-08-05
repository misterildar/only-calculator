import { CalculatorIcon, LoadingSpinner, Button } from '@/ui';
import { SingleInvestmentChart } from '../investment-chart';
import { CALCULATOR_TEXTS } from '../utils/constants';

import { CalculatorContentProps } from '../types';
import styles from './CalculatorContent.module.scss';

export const CalculatorContent = ({
  isLoading,
  serverChartData,
  error,
}: CalculatorContentProps) => {
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

  if (serverChartData.length > 0) {
    return (
      <div className={styles.result}>
        <SingleInvestmentChart data={serverChartData} />
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
