import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, theme } from '@/constants';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: colors.errorBackground,
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.s,
    marginBottom: theme.spacing.xs,
    width: '100%',
    alignItems: 'center',
  },
  errorText: {
    color: colors.white,
  },
});

export default memo(ErrorMessage);
