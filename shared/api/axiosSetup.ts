import apiClient from './client';
import authService from '@/services/authService';

export const setupInterceptors = () => {
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        authService.logout();
      }
      return Promise.reject(error);
    }
  );
};
