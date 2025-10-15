import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import authService from '@/services/authService';
import { useAuth } from '@/context/AuthContext';
import { AuthResponse } from '@/types';

export const useLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login } = useAuth();

  const mutation = useMutation<
    AuthResponse,
    Error,
    { username: string; password: string }
  >({
    mutationFn: authService.login,
    onSuccess: (data) => {
      login(data.accessToken);
    },
  });

  const handleUsernameChange = useCallback((text: string) => {
    setUsername(text);
    if (usernameError) {
      setUsernameError('');
    }
  }, [usernameError, setUsername, setUsernameError]);

  const handlePasswordChange = useCallback((text: string) => {
    setPassword(text);
    if (passwordError) {
      setPasswordError('');
    }
  }, [passwordError, setPassword, setPasswordError]);

  const handleLogin = useCallback(() => {
    let valid = true;
    if (!username) {
      setUsernameError('Username is required');
      valid = false;
    } else {
      setUsernameError('');
    }
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      mutation.mutate({ username, password });
    }
  }, [username, password, mutation]);

  return {
    username,
    handleUsernameChange,
    password,
    handlePasswordChange,
    usernameError,
    passwordError,
    handleLogin,
    mutation,
  };
};
