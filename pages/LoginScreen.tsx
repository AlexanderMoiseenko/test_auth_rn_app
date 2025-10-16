import React, { memo } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { colors, theme } from '@/shared/config';
import AuthProcess from '@/processes/auth/ui/AuthProcess';

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
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.m,
  },
});

export default memo(LoginScreen);
