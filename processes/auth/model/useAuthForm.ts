import { useCallback, useMemo, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/context/AuthContext';
import { loginUser } from '@/entities/user/model/api';

export const useAuthForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      auth.login(data.accessToken);
    },
    onError: (error: AxiosError) => {
      // for invalid creds it should 401, but it's 400 here
      if (error.response && error.response.status === 400) {
        setErrorMessage(t('loginScreen.userNotFound'));
      } else {
        setErrorMessage(t('loginScreen.errors.generic'));
      }
    },
    onMutate: () => {
      setErrorMessage('');
    },
  });

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
  }, [username, password, mutation, t]);

  const disabledButtonState = useMemo(
    () => !username && !password,
    [username, password]
  );

  return {
    username,
    password,
    usernameError,
    passwordError,
    handleUsernameChange,
    handlePasswordChange,
    handleLogin,
    isLoggingIn: mutation.isPending,
    loginError: errorMessage,
    disabled: disabledButtonState,
  };
};
