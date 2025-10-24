import React, { memo, useMemo } from 'react';

import { LinearGradient } from 'expo-linear-gradient';
import * as RN from 'react-native';
import {
  Pressable,
  Text,
  ActivityIndicator,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '@/context/ThemeContext';
import { ThemeType } from '@/context/ThemeContext';

export const BUTTON_VARIATIONS = {
  primary: 'primary',
  secondary: 'secondary',
} as const;

const LINEAR_GRADIENT_COLORS = ['#51c7fe', '#338bff'] as const;

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  variant?: (typeof BUTTON_VARIATIONS)[keyof typeof BUTTON_VARIATIONS];
  testID?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled,
  loading,
  variant = BUTTON_VARIATIONS.primary,
  buttonStyle,
  testID,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const buttonContent = useMemo(
    () => (
      <>
        {loading ? (
          <ActivityIndicator color={theme.colors.white} />
        ) : (
          <Text
            style={[
              styles.buttonText,
              variant === BUTTON_VARIATIONS.primary
                ? styles.primaryButtonText
                : styles.secondaryButtonText,
            ]}
          >
            {title}
          </Text>
        )}
      </>
    ),
    [loading, title, variant, theme, styles]
  );

  const gradientStart = useMemo(() => {
    return {
      x: 0,
      y: 0,
    };
  }, []);

  return (
    <Pressable
      testID={testID}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        (disabled || loading || pressed) && styles.disabled,
        buttonStyle,
      ]}
      onPress={onPress}
    >
      {variant === BUTTON_VARIATIONS.primary ? (
        <LinearGradient
          colors={LINEAR_GRADIENT_COLORS}
          start={gradientStart}
          style={styles.gradient}
        >
          {buttonContent}
        </LinearGradient>
      ) : (
        <View style={styles.secondaryButton}>{buttonContent}</View>
      )}
    </Pressable>
  );
};

const getStyles = (theme: ThemeType) =>
  RN.StyleSheet.create({
    button: {
      borderRadius: theme.borderRadius.m,
      marginTop: theme.spacing.xs,
      overflow: 'hidden',
      width: '100%',
    },
    buttonText: {
      fontFamily: theme.fontFamily.medium,
      fontSize: theme.fontSize.s,
    },
    disabled: {
      opacity: 0.5,
    },
    gradient: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.l,
      paddingVertical: theme.spacing.xs,
    },
    primaryButtonText: {
      color: theme.colors.white,
    },
    secondaryButton: {
      alignItems: 'center',
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.white,
      borderRadius: theme.borderRadius.m,
      borderWidth: theme.borderWidth.s,
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.l,
      paddingVertical: theme.spacing.xs,
    },
    secondaryButtonText: {
      color: theme.colors.black,
    },
  });

export default memo(Button);
