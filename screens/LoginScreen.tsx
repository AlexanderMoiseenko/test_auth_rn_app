import React, { memo, useMemo } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Input from '@/components/Input';
import Button from '@/components/Button';
import ErrorMessage from '@/components/ErrorMessage';
import { colors, theme } from '@/constants';
import { useLoginForm } from '@/hooks/useLoginForm';

const LoginScreen = () => {
  const {
    username,
    handleUsernameChange,
    password,
    handlePasswordChange,
    usernameError,
    passwordError,
    handleLogin,
    mutation,
  } = useLoginForm();

  const disabledButtonState = useMemo(
    () => !username && !password,
    [username, password]
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Input
        placeholder='Username'
        value={username}
        onChangeText={handleUsernameChange}
        error={usernameError}
      />
      <Input
        placeholder='Password'
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
        error={passwordError}
      />

      {mutation.isError && mutation.error?.message && (
        <ErrorMessage message={mutation.error?.message} />
      )}

      <Button
        title='Login'
        onPress={handleLogin}
        loading={mutation.isPending}
        disabled={disabledButtonState}
      />
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
