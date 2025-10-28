import React, { memo } from 'react';

import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { LoginSchema } from '@/features/auth_by_username/model/schema';
import Button from '@/shared/ui/Button';
import ErrorMessage from '@/shared/ui/ErrorMessage';
import ControlledInput from '@/shared/ui/form/ControlledInput';

interface LoginFormProps {
  control: Control<LoginSchema>;
  onSubmit: () => void;
  isLoading: boolean;
  disabled?: boolean;
  rootError?: string;
}

const LoginForm: React.FC<LoginFormProps> = memo(function LoginForm({
  control,
  onSubmit,
  isLoading,
  disabled,
  rootError,
}) {
  const { t } = useTranslation();

  return (
    <>
      <ControlledInput<LoginSchema>
        testID="input-username"
        control={control}
        name="username"
        placeholder={t('common.username')}
      />
      <ControlledInput<LoginSchema>
        testID="input-password"
        control={control}
        name="password"
        placeholder={t('common.password')}
        secureTextEntry
      />

      {!!rootError && <ErrorMessage message={rootError} />}

      <Button
        testID="button-login"
        disabled={disabled}
        loading={isLoading}
        title={t('common.login')}
        onPress={onSubmit}
      />
    </>
  );
});

export default LoginForm;
