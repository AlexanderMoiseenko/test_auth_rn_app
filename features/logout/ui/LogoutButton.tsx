import React, { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { useAuth } from '@/context/AuthContext';
import Button, { BUTTON_VARIATIONS } from '@/shared/ui/Button';

const LogoutButton = memo(function LogoutButton() {
  const { logout } = useAuth();
  const { t } = useTranslation();

  return (
    <Button
      testID='button-logout'
      title={t('common.logout')}
      variant={BUTTON_VARIATIONS.secondary}
      onPress={logout}
    />
  );
});

export default LogoutButton;
