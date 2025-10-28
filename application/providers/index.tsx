import React, { useCallback, useState, useEffect, useMemo } from 'react';

import {
  useFonts,
  NotoSans_400Regular,
  NotoSans_500Medium,
  NotoSans_600SemiBold,
} from '@expo-google-fonts/noto-sans';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import * as RN from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider, useTheme, ThemeType } from '@/context/ThemeContext';
import { useSessionStore } from '@/entities/session/model/session.store';
import { setupInterceptors } from '@/shared/api/axiosSetup';
import ErrorBoundary from '@/shared/ui/ErrorBoundary';

import { RootNavigator } from '../navigation/RootNavigator';
import '@/shared/config/i18n'; // Initialize i18n

SplashScreen.preventAutoHideAsync();

const AppProviders = () => {
  const navigationRef = useNavigationContainerRef();
  const [queryClient] = useState(() => new QueryClient());
  const [fontsLoaded, fontError] = useFonts({
    NotoSans_400Regular,
    NotoSans_500Medium,
    NotoSans_600SemiBold,
  });

  const { init, logout } = useSessionStore();
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  useEffect(() => {
    init(navigationRef);
    setupInterceptors(logout);
  }, [init, logout, navigationRef]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <RN.View style={styles.container} onLayout={onLayoutRootView}>
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <NavigationContainer ref={navigationRef}>
                <RootNavigator />
              </NavigationContainer>
            </ThemeProvider>
          </QueryClientProvider>
        </ErrorBoundary>
      </RN.View>
    </SafeAreaProvider>
  );
};
const getStyles = (theme: ThemeType) =>
  RN.StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
  });

export default AppProviders;
