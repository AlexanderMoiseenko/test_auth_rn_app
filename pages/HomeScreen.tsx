import React, { useCallback, memo, useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import * as RN from 'react-native';

import { useTheme, ThemeType } from '@/context/ThemeContext';
import { useSessionStore } from '@/entities/session/model/session.store';
import { ScreenNames } from '@/shared/config';
import Button from '@/shared/ui/Button';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { isLoggingOut } = useSessionStore();

  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const handleGoToLogin = useCallback(() => {
    navigation.navigate(ScreenNames.Login);
  }, [navigation]);

  if (isLoggingOut) {
    return <RN.View style={styles.emptyContainer} />;
  }

  return (
    <RN.View style={styles.container}>
      <Button title={t('homeScreen.goToLogin')} onPress={handleGoToLogin} />
    </RN.View>
  );
};

const getStyles = (theme: ThemeType) =>
  RN.StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: theme.spacing.m,
    },
    emptyContainer: {
      backgroundColor: theme.colors.background,
      flex: 1,
      justifyContent: 'center',
    },
  });

export default memo(HomeScreen);
