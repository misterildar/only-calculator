'use client';

import { Title } from '@/ui';
import { useCalculatorSubmit } from './hooks';
import { CalculatorForm } from './calculator-form';
import { CalculatorContent } from './calculator-content';

import styles from './Calculator.module.scss';

export const Calculator = () => {
  const { isLoading, error, serverChartData, handleSubmit } = useCalculatorSubmit();

  return (
    <section id='calculator' className={styles.section}>
      <Title text='calculate' className={styles.title} />
      <div className={styles.separator}>
        <CalculatorForm onSubmit={handleSubmit} />
        <div className={styles.container}>
          <CalculatorContent
            isLoading={isLoading}
            serverChartData={serverChartData}
            error={error}
          />
        </div>
      </div>
    </section>
  );
};
