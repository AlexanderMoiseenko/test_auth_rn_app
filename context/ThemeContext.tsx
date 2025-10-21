import React, { createContext, useContext, useState } from 'react';

import { useColorScheme } from 'react-native';

export const baseTheme = {
  spacing: {
    xxs: 4,
    xs: 10,
    s: 15,
    m: 20,
    l: 40,
    xl: 50,
  },
  fontSize: {
    xs: 12,
    s: 16,
    m: 20,
    l: 24,
  },
  borderRadius: {
    s: 10,
    m: 25,
  },
  borderWidth: {
    s: 1,
  },
  iconSize: {
    l: 32,
    m: 28,
    s: 24,
    xs: 16,
    xxs: 12,
  },
  fontFamily: {
    regular: 'NotoSans_400Regular',
    medium: 'NotoSans_500Medium',
    semiBold: 'NotoSans_600SemiBold',
  },
};

export const lightTheme = {
  ...baseTheme,
  colors: {
    primary: '#4A90E2',
    background: '#F5F8FA',
    white: '#fff',
    error: '#FF3336',
    red: '#FF3336',
    black: '#000',
    redDark: '#FF3336',
    gray: '#879399',
    grayLight: '#D8E2E6',
    text: '#000',
    card: '#FFFFFF',
    border: '#D8E2E6',
  },
};

export const darkTheme = {
  ...baseTheme,
  colors: {
    ...lightTheme.colors, // we don't have dark theme yet
    background: '#1E1E1E',
  },
};

export type ThemeType = typeof lightTheme;

type ThemeContextType = {
  theme: ThemeType;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => console.warn('ThemeProvider is not rendered!'),
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme(); // check system theme
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  const theme = isDark ? darkTheme : lightTheme;
  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
