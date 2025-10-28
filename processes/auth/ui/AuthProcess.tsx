import React, { memo } from 'react';

import LoginForm from '@/features/auth_by_username/ui/LoginForm';

import { useAuthForm } from '../model/useAuthForm';

const AuthProcess = () => {
  const { control, submit, isLoggingIn, loginError, disabled } = useAuthForm();

  return (
    <LoginForm
      control={control}
      onSubmit={submit}
      isLoading={isLoggingIn}
      rootError={loginError}
      disabled={disabled}
    />
  );
};

export default memo(AuthProcess);