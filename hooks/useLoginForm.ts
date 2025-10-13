import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/api/auth';
import { useAuth } from '@/context/AuthContext';

export const useLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login } = useAuth();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data.accessToken);
    },
  });

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
    setUsername,
    password,
    setPassword,
    usernameError,
    passwordError,
    handleLogin,
    mutation,
  };
};
