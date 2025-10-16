import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import ErrorMessage from '@/shared/ui/ErrorMessage';

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

const LoginForm: React.FC<LoginFormProps> = memo(
  ({
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
  }) => {
    const { t } = useTranslation();

    return (
      <>
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

        {loginError && <ErrorMessage message={t('loginScreen.userNotFound')} />}

        <Button
          title={t('common.login')}
          onPress={handleLogin}
          loading={isLoggingIn}
          disabled={disabled}
        />
      </>
    );
  }
);

export default LoginForm;
