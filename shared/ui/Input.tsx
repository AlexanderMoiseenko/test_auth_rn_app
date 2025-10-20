import React, { useState, memo, useCallback, useEffect, useMemo } from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';

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
  const [animatedValue] = useState(new Animated.Value(value ? 1 : 0));
  const hasValue = value !== '';

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isFocused || hasValue ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isFocused, hasValue, animatedValue]);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);
  const handleClear = useCallback(() => onChangeText(''), [onChangeText]);

  const labelStyle = useMemo(() => {
    return {
      position: 'absolute' as const,
      left: theme.spacing.s,
      top: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.spacing.s, -1],
      }),
      fontSize: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.fontSize.s, 11],
      }),
      color: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [
          error ? colors.redDark : colors.gray,
          error ? colors.redDark : colors.primary,
        ],
      }),
      backgroundColor: 'transparent',
      paddingHorizontal: theme.spacing.xxs,
    };
  }, [animatedValue, error]);

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
