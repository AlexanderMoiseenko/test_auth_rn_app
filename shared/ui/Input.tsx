import React, { useState, memo, useCallback } from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';

import { colors, theme } from '@/shared/config';

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  testID?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  error,
  autoCapitalize = 'none',
  testID,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== '';

  // Using a shared value for animation, which can be updated from the UI thread.
  const progress = useSharedValue(isFocused || hasValue ? 1 : 0);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    // Animate progress to 1 (focused state)
    progress.value = withTiming(1, { duration: 150 });
  }, [progress]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    // Animate progress to 0 (blurred state) if there is no value
    if (!hasValue) {
      progress.value = withTiming(0, { duration: 150 });
    }
  }, [hasValue, progress]);

  const handleClear = useCallback(() => onChangeText(''), [onChangeText]);

  // useAnimatedStyle runs on the UI thread, ensuring smooth animations.
  const labelStyle = useAnimatedStyle(() => {
    const top = withTiming(isFocused || hasValue ? -1 : theme.spacing.s, {
      duration: 150,
    });
    const fontSize = withTiming(isFocused || hasValue ? 11 : theme.fontSize.s, {
      duration: 150,
    });
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [
        error ? colors.redDark : colors.gray,
        error ? colors.redDark : colors.primary,
      ]
    );

    return {
      position: 'absolute' as const,
      left: theme.spacing.s,
      top,
      fontSize,
      color,
      backgroundColor: 'transparent',
      paddingHorizontal: theme.spacing.xxs,
    };
  });

  return (
    <View style={styles.container}>
      <View
        testID='input-container'
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          !!error && styles.inputError,
          hasValue && !error && styles.inputSuccess,
        ]}
      >
        <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>
        <TextInput
          testID={testID}
          autoCapitalize={autoCapitalize}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {value.length > 0 && (
          <TouchableOpacity testID='clear-button' onPress={handleClear} style={styles.iconWrapper}>
            <MaterialCommunityIcons
              name='close-circle'
              style={styles.icon}
              size={theme.iconSize.s}
              color={colors.gray}
            />
          </TouchableOpacity>
        )}
      </View>
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.xs,
    marginTop: theme.spacing.s,
    width: '100%',
  },
  errorText: {
    alignSelf: 'flex-start',
    color: colors.error,
    marginTop: theme.spacing.xxs,
  },
  icon: {
    color: colors.gray,
    opacity: 0.5,
  },
  iconWrapper: {
    marginBottom: theme.spacing.xs,
    paddingHorizontal: theme.spacing.xs,
  },
  input: {
    flex: 1,
    padding: theme.spacing.m,
    paddingBottom: theme.spacing.s,
    paddingTop: theme.spacing.xxs,
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.grayLight,
    borderRadius: theme.borderRadius.s,
    borderWidth: theme.borderWidth.s,
    flexDirection: 'row',
    paddingTop: theme.spacing.s,
    width: '100%',
  },
  inputError: {
    borderColor: colors.redDark,
  },
  inputFocused: {
    borderColor: colors.primary,
  },
  inputSuccess: {
    borderColor: colors.primary,
  },
});

export default memo(Input);
