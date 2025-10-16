import React, { memo } from 'react';

import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

import AuthProcess from '@/processes/auth/ui/AuthProcess';
import { colors, theme } from '@/shared/config';

const LoginScreen = () => {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={-100} // for iOS keyboard to decrease the distance between the keyboard and the input fields
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <AuthProcess />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.m,
  },
});

export default memo(LoginScreen);
