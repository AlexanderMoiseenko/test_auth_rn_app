import { useCallback, useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm, FieldErrors, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useSessionStore } from '@/entities/session/model/session.store';
import { loginUser } from '@/entities/user/model/api';
import {
  loginSchema,
  type LoginSchema,
} from '@/features/auth_by_username/model/schema';

export const useAuthForm = () => {
  const { t } = useTranslation();
  const { login } = useSessionStore();

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data.accessToken);
    },
    onError: (error: AxiosError) => {
      const status = error.response?.status;
      if (status === 400 || status === 401) {
        // incorrect credentials
        setError('root', { message: t('loginScreen.userNotFound') });
      } else {
        setError('root', { message: t('loginScreen.errors.generic') });
      }
    },
  });

  const onSubmit = useCallback(
    (values: LoginSchema) => {
      return mutation.mutateAsync(values);
    },
    [mutation]
  );

  const handleUsernameChange = useCallback(
    (text: string) => {
      setValue('username', text, { shouldValidate: true, shouldDirty: true });
    },
    [setValue]
  );

  const handlePasswordChange = useCallback(
    (text: string) => {
      setValue('password', text, { shouldValidate: true, shouldDirty: true });
    },
    [setValue]
  );

  const handleLogin = useCallback(() => {
    handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit]);

  const [username, password] = useWatch({
    control,
    name: ['username', 'password'],
  });

  const disabledButtonState = useMemo(
    () => !username && !password,
    [username, password]
  );

  return {
    username: (username as string) ?? '',
    password: (password as string) ?? '',
    usernameError: errors.username?.message ?? '',
    passwordError: errors.password?.message ?? '',
    handleUsernameChange,
    handlePasswordChange,
    handleLogin,
    isLoggingIn: isSubmitting || mutation.isPending,
    loginError:
      (
        errors as FieldErrors<LoginSchema> & {
          root?: { message?: string };
        }
      ).root?.message ?? '',
    disabled: disabledButtonState,

    control,
    submit: handleSubmit(onSubmit),
  };
};
