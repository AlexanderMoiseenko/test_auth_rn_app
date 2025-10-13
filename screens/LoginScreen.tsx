import React, { memo } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Input from '@/components/Input';
import Button from '@/components/Button';
import ErrorMessage from '@/components/ErrorMessage';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';
import { useLoginForm } from '@/hooks/useLoginForm';

const LoginScreen = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    usernameError,
    passwordError,
    handleLogin,
    mutation,
  } = useLoginForm();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Input
        placeholder='Username'
        value={username}
        onChangeText={setUsername}
        error={usernameError}
      />
      <Input
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        toggleSecureEntry
        error={passwordError}
      />

      {mutation.isError && <ErrorMessage message={"User emil doesn't exist"} />}

      <Button
        title='Login'
        onPress={handleLogin}
        loading={mutation.isPending}
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
