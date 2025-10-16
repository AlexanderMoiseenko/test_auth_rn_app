import React, { memo, useMemo } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import Input from '@/components/Input';
import Button from '@/components/Button';
import ErrorMessage from '@/components/ErrorMessage';
import { colors, theme } from '@/constants';
import { useLoginForm } from '@/hooks/useLoginForm';

const LoginScreen = () => {
  const { t } = useTranslation();
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
        placeholder={t('common.username')}
        value={username}
        onChangeText={handleUsernameChange}
        error={usernameError}
      />
      <Input
        placeholder={t('common.password')}
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
        error={passwordError}
      />

      {mutation.isError && (
        <ErrorMessage message={t('loginScreen.userNotFound')} />
      )}

      <Button
        title={t('common.login')}
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
  button: {
    marginTop: theme.spacing.m,
  },
});

export default memo(LoginScreen);
