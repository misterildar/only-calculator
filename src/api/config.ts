import axios from 'axios';

const getBaseURL = () => {
  // На продакшене используем прокси для избежания Mixed Content
  if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
    return '/api/proxy';
  }
  // Локально используем прямое подключение
  return process.env.NEXT_PUBLIC_API_URL || 'http://49.12.128.167:7001/api/';
};

export const apiClient = axios.create({
  baseURL: getBaseURL(),
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 422) {
      console.warn('Validation error:', error.response.data);
    }
    return Promise.reject(error);
  }
);
