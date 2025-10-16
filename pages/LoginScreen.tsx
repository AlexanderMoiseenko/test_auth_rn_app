import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, theme } from '@/shared/config';
import { LoginForm } from '@/features/auth_by_username';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
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
