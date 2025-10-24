import { useEffect } from 'react';

import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  interpolate,
} from 'react-native-reanimated';

import { useTheme } from '@/context/ThemeContext';

export const useAnimatedInput = ({
  isFocused,
  hasValue,
  error,
}: {
  isFocused: boolean;
  hasValue: boolean;
  error?: string;
}) => {
  const { colors, spacing, fontSize } = useTheme().theme;
  const progress = useSharedValue(isFocused || hasValue ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(isFocused || hasValue ? 1 : 0, { duration: 150 });
  }, [isFocused, hasValue, progress]);

  const labelStyle = useAnimatedStyle(() => {
    const top = interpolate(progress.value, [0, 1], [spacing.s, -1]);
    const fSize = interpolate(progress.value, [0, 1], [fontSize.s, 11]);

    return {
      position: 'absolute' as const,
      left: spacing.s,
      top,
      fontSize: fSize,
      color: interpolateColor(
        progress.value,
        [0, 1],
        [
          error ? colors.redDark : colors.gray,
          error ? colors.redDark : colors.primary,
        ]
      ),
      backgroundColor: 'transparent',
      paddingHorizontal: spacing.xxs,
    };
  });

  return { labelStyle };
};
