import React, { memo } from 'react';

import LoginForm from '@/features/auth_by_username/ui/LoginForm';

import { useAuthForm } from '../model/useAuthForm';

const AuthProcess = () => {
  const {
    username,
    password,
    usernameError,
    passwordError,
    handleUsernameChange,
    handlePasswordChange,
    handleLogin,
    isLoggingIn,
    loginError,
    disabled,
  } = useAuthForm();

  return (
    <LoginForm
      username={username}
      password={password}
      usernameError={usernameError}
      passwordError={passwordError}
      handleUsernameChange={handleUsernameChange}
      handlePasswordChange={handlePasswordChange}
      handleLogin={handleLogin}
      isLoggingIn={isLoggingIn}
      loginError={loginError}
      disabled={disabled}
    />
  );
};

export default memo(AuthProcess);