import React, { useCallback, useState, useEffect } from 'react';

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
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { setupInterceptors } from '@/shared/api/axiosSetup';
import { loadTokenFromStorage } from '@/shared/api/client';
import { colors } from '@/shared/config';
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
  useEffect(() => {
    setupInterceptors();
    loadTokenFromStorage();
  }, []);
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
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <AuthProvider navigationRef={navigationRef}>
              <ThemeProvider>
                <NavigationContainer ref={navigationRef}>
                  <RootNavigator />
                </NavigationContainer>
              </ThemeProvider>
            </AuthProvider>
          </QueryClientProvider>
        </ErrorBoundary>
      </View>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
export default AppProviders;
