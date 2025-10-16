import React, { memo, useMemo } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import ErrorMessage from '@/shared/ui/ErrorMessage';
import { useLoginForm } from '../model/useLoginForm';

const LoginForm = () => {
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
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
    width: '100%',
  },
});

export default memo(LoginForm);
