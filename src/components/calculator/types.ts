import { Control, FieldErrors, FieldValues, Path } from 'react-hook-form';

export interface CalculatorFormData {
  currentAge: number | '';
  gender: 'male' | 'female' | '';
  initialInvestment: number;
  contributionYears: number;
}

export interface CalculatorFormProps {
  onSubmit: (data: CalculatorFormData) => void;
}

export interface FormFieldsProps {
  control: Control<CalculatorFormData>;
  errors: FieldErrors<CalculatorFormData>;
  watchedValues: CalculatorFormData;
}

type Option = { readonly label: string; readonly value: string };

export type DropdownProps<T extends FieldValues = FieldValues> = {
  control: Control<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
  label: string;
  options: readonly Option[];
  rules?: object;
  placeholder?: string;
};

import type { CalculateResponse } from '@/api';

export interface CalculatorContentProps {
  isLoading: boolean;
  serverResponse: CalculateResponse | null;
  error?: string | null;
}

export interface InvestmentScenario {
  year: number;
  optimistic: number;
  conservative: number;
  expected: number;
}

export interface InvestmentChartProps {
  data: InvestmentScenario[];
}

export interface ServerCalculationRequest {
  age: number;
  gender: 'male' | 'female';
  investment_years: number;
  investment_amount: number;
  target_age: number;
}

export interface ServerResultItem {
  year: number;
  age: number;
  payment: number;
  cumulative_payment: number;
  survivors_count: number;
  fund_size: number;
}

export interface ServerSummary {
  total_investment: number;
  total_payments: number;
  max_payment: number;
  years_with_payments: number;
  final_fund_size: number;
}

export interface ServerCalculationResponse {
  request: ServerCalculationRequest;
  results: ServerResultItem[];
  summary: ServerSummary;
}

export interface SingleInvestmentChartProps {
  data: ServerResultItem[];
}
