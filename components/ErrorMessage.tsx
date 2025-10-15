import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, theme } from '@/constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <View style={styles.errorContainer}>
      <MaterialCommunityIcons
        style={styles.icon}
        name='alert-circle-outline'
        size={theme.iconSize.s}
        color={colors.white}
      />
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
    flexDirection: 'row',
  },
  errorText: {
    color: colors.white,
  },
  icon: {
    marginRight: theme.spacing.xxs,
  },
});

export default memo(ErrorMessage);
