import React, { useCallback, useState, useEffect } from 'react';

import {
  useFonts,
  NotoSans_400Regular,
  NotoSans_500Medium,
  NotoSans_600SemiBold,
} from '@expo-google-fonts/noto-sans';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from '@/context/AuthContext';
import { setupInterceptors } from '@/shared/api/axiosSetup';
import ErrorBoundary from '@/shared/ui/ErrorBoundary';

import { RootNavigator } from '../navigation/RootNavigator';

import '@/shared/config/i18n'; // Initialize i18n

SplashScreen.preventAutoHideAsync();

const viewStyle = {
  flex: 1,
} as const;

const AppProviders = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [fontsLoaded, fontError] = useFonts({
    NotoSans_400Regular,
    NotoSans_500Medium,
    NotoSans_600SemiBold,
  });

  useEffect(() => {
    setupInterceptors();
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
      <View style={viewStyle} onLayout={onLayoutRootView}>
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <NavigationContainer>
                <RootNavigator />
              </NavigationContainer>
            </AuthProvider>
          </QueryClientProvider>
        </ErrorBoundary>
      </View>
    </SafeAreaProvider>
  );
};

export default AppProviders;
