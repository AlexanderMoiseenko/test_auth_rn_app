import React, { memo } from 'react';

import { useTranslation } from 'react-i18next';

import Button from '@/shared/ui/Button';
import ErrorMessage from '@/shared/ui/ErrorMessage';
import Input from '@/shared/ui/Input';

interface LoginFormProps {
  username: string;
  password: string;
  usernameError?: string;
  passwordError?: string;
  loginError?: string;
  isLoggingIn: boolean;
  disabled: boolean;
  handleUsernameChange: (text: string) => void;
  handlePasswordChange: (text: string) => void;
  handleLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = memo(function LoginForm({
  username,
  password,
  usernameError,
  passwordError,
  loginError,
  isLoggingIn,
  disabled,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
}) {
  const { t } = useTranslation();

  return (
    <>
      <Input
        error={usernameError}
        placeholder={t('common.username')}
        value={username}
        onChangeText={handleUsernameChange}
      />
      <Input
        error={passwordError}
        placeholder={t('common.password')}
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
      />

      {loginError && <ErrorMessage message={t('loginScreen.userNotFound')} />}

      <Button
        disabled={disabled}
        loading={isLoggingIn}
        title={t('common.login')}
        onPress={handleLogin}
      />
    </>
  );
});

export default LoginForm;
