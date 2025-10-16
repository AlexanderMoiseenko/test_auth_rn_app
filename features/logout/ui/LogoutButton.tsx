import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import Button, { BUTTON_VARIATIONS } from '@/shared/ui/Button';

const LogoutButton = memo(() => {
  const { logout } = useAuth();
  const { t } = useTranslation();

  return (
    <Button
      title={t('common.logout')}
      onPress={logout}
      variant={BUTTON_VARIATIONS.secondary}
    />
  );
});

export default LogoutButton;