import React, { memo, useMemo } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, theme } from '@/constants';

export const BUTTON_VARIATIONS = {
  primary: 'primary',
  secondary: 'secondary',
} as const;

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
  ...props
}) => {
  const buttonContent = useMemo(
    () => (
      <>
        {loading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={[styles.buttonText, styles[`${variant}ButtonText`]]}>
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
      style={[
        styles.button,
        disabled || loading ? styles.disabled : {},
        props?.buttonStyle || {},
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {variant === BUTTON_VARIATIONS.primary ? (
        <LinearGradient
          start={gradientStart}
          colors={['#51c7fe', '#338bff']}
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
    width: '100%',
    marginTop: theme.spacing.xs,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.l,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.l,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: theme.borderWidth.s,
    borderColor: colors.border,
    borderRadius: theme.borderRadius.m,
  },
  buttonText: {
    fontSize: theme.fontSize.s,
    fontFamily: theme.fontFamily.semiBold,
  },
  primaryButtonText: {
    color: colors.white,
  },
  secondaryButtonText: {
    color: colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default memo(Button);
