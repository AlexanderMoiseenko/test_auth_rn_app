import {
  NavigationContainerRefWithCurrent,
  StackActions,
} from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

import { setupInterceptors } from '@/shared/api/axiosSetup';
import { setAuthToken, clearAuthToken } from '@/shared/api/client';
import { ScreenNames } from '@/shared/config';

interface SessionState {
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isLoggingOut: boolean;
  navigationRef: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList> | null;
  init: (
    navigationRef: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>
  ) => Promise<void>;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  toggleLoggingOut: () => void;
  logoutAndNavigateToLogin: () => Promise<void>;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  accessToken: null,
  isLoading: true,
  isAuthenticated: false,
  isLoggingOut: false,
  navigationRef: null,

  init: async (navigationRef) => {
    set({ navigationRef });
    const token = await SecureStore.getItemAsync('userToken');
    if (token) {
      set({ accessToken: token, isAuthenticated: true });
      setAuthToken(token);
    }
    set({ isLoading: false });
    // Setup interceptors after the store is initialized and logout is available
    setupInterceptors(async () => {
      await get().logoutAndNavigateToLogin();
    });
  },

  login: async (token) => {
    set({ accessToken: token, isAuthenticated: true });
    setAuthToken(token);
    await SecureStore.setItemAsync('userToken', token);
  },
  toggleLoggingOut: () => set({ isLoggingOut: !get().isLoggingOut }),
  logout: async () => {
    set({ accessToken: null, isAuthenticated: false });
    clearAuthToken();
    await SecureStore.deleteItemAsync('userToken');
  },

  logoutAndNavigateToLogin: async () => {
    set({ isLoggingOut: true });
    await get().logout();
    const navigationRef = get().navigationRef;
    if (navigationRef?.current) {
      navigationRef.current.dispatch(StackActions.replace(ScreenNames.Login));
    }
    set({ isLoggingOut: false });
  },
}));
