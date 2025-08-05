export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status: number;
}

export interface CalculateRequest {
  age: number;
  gender: 'male' | 'female';
  investment_years: number;
  investment_amount: number;
  target_age?: number;
}

export interface CalculateResponse {
  request: CalculateRequest;
  results: Array<{
    year: number;
    age: number;
    payment: number;
    cumulative_payment: number;
    survivors_count: number;
    fund_size: number;
  }>;
  summary: {
    total_investment: number;
    total_payments: number;
    max_payment: number;
    years_with_payments: number;
    final_fund_size: number;
  };
}
