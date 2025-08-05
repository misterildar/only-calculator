import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://49.12.128.167:7001/api/',
  timeout: 10000,
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
