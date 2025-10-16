import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from 'react';

import { NavigationContainerRefWithCurrent, StackActions } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

import authService from '@/services/authService';
import { ScreenNames } from '@/shared/config';
import { AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{
  children: React.ReactNode;
  navigationRef: NavigationContainerRefWithCurrent<
    ReactNavigation.RootParamList
  >;
}> = ({ children, navigationRef }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(async () => {
    setToken(null);
    await SecureStore.deleteItemAsync('userToken');
  }, []);

  const logoutAndNavigateToLogin = useCallback(async () => {
    await logout();
    if (navigationRef.current) {
      navigationRef.current.dispatch(StackActions.replace(ScreenNames.Login));
    }
  }, [logout, navigationRef]);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await SecureStore.getItemAsync('userToken');
      if (storedToken) {
        setToken(storedToken);
      }
      setIsLoading(false);
    };
    loadToken();
    authService.registerLogout(logout);

    return () => {
      authService.unregisterLogout();
    };
  }, [logout]);

  const login = useCallback(async (newToken: string) => {
    setToken(newToken);
    await SecureStore.setItemAsync('userToken', newToken);
  }, []);

  const contextValue = useMemo(
    () => ({
      accessToken: token,
      isAuthenticated: !!token,
      isLoading,
      login,
      logout,
      logoutAndNavigateToLogin,
    }),
    [token, isLoading, login, logout, logoutAndNavigateToLogin]
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
