import { CalculatorFormData, InvestmentScenario } from '../types';

export const getMockCalculationData = (formData: CalculatorFormData): InvestmentScenario[] => {
  const { initialInvestment, contributionYears } = formData;

  const startYear = new Date().getFullYear();

  const growthRates = {
    conservative: 0.06,
    expected: 0.08,
    optimistic: 0.12,
  };

  const scenarios: InvestmentScenario[] = [];

  for (let i = 0; i <= contributionYears; i++) {
    const year = startYear + i;
    const conservative = Math.round(initialInvestment * Math.pow(1 + growthRates.conservative, i));
    const expected = Math.round(initialInvestment * Math.pow(1 + growthRates.expected, i));
    const optimistic = Math.round(initialInvestment * Math.pow(1 + growthRates.optimistic, i));
    scenarios.push({
      year,
      optimistic: conservative,
      conservative: expected,
      expected: optimistic,
    });
  }

  return scenarios;
};
