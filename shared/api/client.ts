import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

let inMemoryToken: string | null = null;

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
});

// synchronous interceptor
apiClient.interceptors.request.use((config) => {
  if (inMemoryToken) {
    config.headers.Authorization = `Bearer ${inMemoryToken}`;
  }
  return config;
});

// functions for token management
export const setAuthToken = (token: string | null) => {
  inMemoryToken = token;
};

export const loadTokenFromStorage = async () => {
  const token = await SecureStore.getItemAsync('userToken');
  setAuthToken(token);
  return token;
};

export default apiClient;
