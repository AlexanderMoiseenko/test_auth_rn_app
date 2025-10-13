import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import * as SecureStore from 'expo-secure-store';
import { AuthContextType } from '@/types';
import apiClient from '@/api/client';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await SecureStore.getItemAsync('userToken');
      if (storedToken) {
        setToken(storedToken);
      }
      setIsLoading(false);
    };
    loadToken();
  }, []);

  const login = useCallback(async (newToken: string) => {
    setToken(newToken);
    await SecureStore.setItemAsync('userToken', newToken);
  }, []);

  const logout = useCallback(async () => {
    setToken(null);
    await SecureStore.deleteItemAsync('userToken');
  }, []);

  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  const contextValue = useMemo(
    () => ({
      accessToken: token,
      isAuthenticated: !!token,
      isLoading,
      login,
      logout,
    }),
    [token, isLoading, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
