import React, { memo, useMemo } from 'react';

import { LinearGradient } from 'expo-linear-gradient';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { colors, theme } from '@/shared/config';

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
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled,
  loading,
  variant = BUTTON_VARIATIONS.primary,
  buttonStyle,
}) => {
  const buttonContent = useMemo(
    () => (
      <>
        {loading ? (
          <ActivityIndicator color={colors.white} />
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
    [loading, title, variant]
  );

  const gradientStart = useMemo(() => {
    return {
      x: 0,
      y: 0,
    };
  }, []);

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      style={[
        styles.button,
        disabled || loading ? styles.disabled : {},
        buttonStyle || {},
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    color: colors.white,
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderRadius: theme.borderRadius.m,
    borderWidth: theme.borderWidth.s,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.xs,
  },
  secondaryButtonText: {
    color: colors.black,
  },
});

export default memo(Button);
