import { useState, memo, useCallback, useMemo } from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as RN from 'react-native';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';

import { ThemeType, useTheme } from '@/context/ThemeContext';

import { useAnimatedInput } from './hooks/useAnimatedInput';

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  testID?: string;
  onBlur?: () => void;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  error,
  autoCapitalize = 'none',
  testID,
  onBlur,
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== '';

  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const { labelStyle } = useAnimatedInput({ isFocused, hasValue, error });

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => {
    setIsFocused(false);
    if (onBlur) onBlur();
  }, [onBlur]);
  const handleClear = useCallback(() => onChangeText(''), [onChangeText]);

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
          <TouchableOpacity
            testID='clear-button'
            onPress={handleClear}
            style={styles.iconWrapper}
          >
            <MaterialCommunityIcons
              name='close-circle'
              style={styles.icon}
              size={theme.iconSize.s}
              color={theme.colors.gray}
            />
          </TouchableOpacity>
        )}
      </View>
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const getStyles = (theme: ThemeType) =>
  RN.StyleSheet.create({
    container: {
      marginBottom: theme.spacing.xs,
      marginTop: theme.spacing.s,
      width: '100%',
    },
    errorText: {
      alignSelf: 'flex-start',
      color: theme.colors.error,
      marginTop: theme.spacing.xxs,
    },
    icon: {
      color: theme.colors.gray,
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
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.grayLight,
      borderRadius: theme.borderRadius.s,
      borderWidth: theme.borderWidth.s,
      flexDirection: 'row',
      paddingTop: theme.spacing.s,
      width: '100%',
    },
    inputError: {
      borderColor: theme.colors.redDark,
    },
    inputFocused: {
      borderColor: theme.colors.primary,
    },
    inputSuccess: {
      borderColor: theme.colors.primary,
    },
  });

export default memo(Input);
