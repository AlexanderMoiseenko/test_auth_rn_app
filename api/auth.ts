import apiClient from '@/api/client';
import { AuthResponse, User } from '@/types';

export const loginUser = async (credentials: {
  username: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/login', credentials);
  return response.data;
};

export const getUserProfile = async (): Promise<User> => {
  const response = await apiClient.get('/auth/me');
  return response.data;
};
