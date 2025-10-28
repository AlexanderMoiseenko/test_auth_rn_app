import React, { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { useSessionStore } from '@/entities/session/model/session.store';
import Button, { BUTTON_VARIATIONS } from '@/shared/ui/Button';

const LogoutButton = memo(function LogoutButton() {
  const { logout } = useSessionStore();
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
