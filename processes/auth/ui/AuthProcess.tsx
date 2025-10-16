import React, { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { loginUser, LoginCredentials } from '@/entities/user/model/api';
import LoginForm from '@/features/auth_by_username/ui/LoginForm';

const AuthProcess = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      auth.login(data.accessToken);
    },
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleUsernameChange = (text: string) => {
    setUsername(text);
    if (text) setUsernameError('');
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (text) setPasswordError('');
  };

  const handleLogin = useCallback(() => {
    let isValid = true;
    if (!username) {
      setUsernameError(t('loginScreen.validation.usernameRequired'));
      isValid = false;
    }
    if (!password) {
      setPasswordError(t('loginScreen.validation.passwordRequired'));
      isValid = false;
    }

    if (isValid) {
      mutation.mutate({ username, password });
    }
  }, [username, password, mutation]);

  const disabledButtonState = useMemo(
    () => !username && !password,
    [username, password]
  );

  return (
    <LoginForm
      username={username}
      password={password}
      usernameError={usernameError}
      passwordError={passwordError}
      handleUsernameChange={handleUsernameChange}
      handlePasswordChange={handlePasswordChange}
      handleLogin={handleLogin}
      isLoggingIn={mutation.isPending}
      loginError={mutation.error?.message}
      disabled={disabledButtonState}
    />
  );
};

export default memo(AuthProcess);
