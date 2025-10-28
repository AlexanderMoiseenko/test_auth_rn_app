import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
});

export function setAuthToken(token: string | null) {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    clearAuthToken();
  }
}

export function clearAuthToken() {
  delete apiClient.defaults.headers.common['Authorization'];
}

export default apiClient;
