import { useState } from 'react';
import { getCalculationData } from '@/api';
import type { CalculateRequest, CalculateResponse } from '@/api';
import { CalculatorFormData } from '../types';

export const useCalculatorSubmit = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [serverResponse, setServerResponse] = useState<CalculateResponse | null>(null);

  const handleSubmit = async (data: CalculatorFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const apiData: CalculateRequest = {
        age: Number(data.currentAge),
        gender: data.gender as 'male' | 'female',
        investment_years: data.contributionYears,
        investment_amount: data.initialInvestment,
        target_age: 120,
      };
      const response = await getCalculationData(apiData);
      setServerResponse(response);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Calculation failed';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    serverResponse,
    handleSubmit,
  };
};
