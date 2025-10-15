import React, {
  useState,
  memo,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, theme } from '@/constants';

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  error,
  autoCapitalize = 'none',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;
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
      position: 'absolute',
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
          !!error ? colors.error : colors.gray,
          !!error ? colors.error : colors.primary,
        ],
      }),
      backgroundColor: 'transparent',
      paddingHorizontal: theme.spacing.xxs,
    };
  }, [animatedValue, error]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          !!error && styles.inputError,
          hasValue && !error && styles.inputSuccess,
        ]}
      >
        <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>
        <TextInput
          autoCapitalize={autoCapitalize}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.iconWrapper}>
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
    width: '100%',
    marginBottom: theme.spacing.xs,
    marginTop: theme.spacing.s,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: theme.borderRadius.s,
    borderWidth: theme.borderWidth.s,
    borderColor: colors.border,
    paddingTop: theme.spacing.s,
  },
  input: {
    flex: 1,
    padding: theme.spacing.m,
    paddingTop: theme.spacing.xxs,
    paddingBottom: theme.spacing.s,
  },
  iconWrapper: {
    paddingHorizontal: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  icon: {
    color: colors.gray,
    opacity: 0.5,
  },
  inputFocused: {
    borderColor: colors.primary,
  },
  inputError: {
    borderColor: colors.error,
  },
  inputSuccess: {
    borderColor: colors.blue,
  },
  errorText: {
    color: colors.error,
    alignSelf: 'flex-start',
    marginTop: theme.spacing.xxs,
  },
});

export default memo(Input);
