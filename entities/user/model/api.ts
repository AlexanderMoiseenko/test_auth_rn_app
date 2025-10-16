import apiClient from '@/shared/api/client';

import { AuthResponse, User, LoginCredentials } from './types';

export const loginUser = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/login', credentials);
  return response.data;
};

export const getUserProfile = async (): Promise<User> => {
  const response = await apiClient.get('/auth/me');
  return response.data;
};
