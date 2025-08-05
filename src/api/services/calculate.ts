import { apiClient } from '../config';
import type { CalculateRequest, CalculateResponse } from '../types';

export const getCalculationData = async (data: CalculateRequest): Promise<CalculateResponse> => {
  const response = await apiClient.post<CalculateResponse>('v1/calculate', data);

  if (response.status === 200) {
    if (!response.data.results || !Array.isArray(response.data.results)) {
      throw new Error('Invalid response structure: missing results array');
    }

    if (response.data.results.length === 0) {
      throw new Error('Server returned empty results');
    }

    return response.data;
  }

  throw new Error(`Unexpected response status: ${response.status} ${response.statusText}`);
};
