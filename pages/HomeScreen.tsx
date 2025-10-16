import React, { useCallback, memo } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';

import { colors, theme, ScreenNames } from '@/shared/config';
import Button from '@/shared/ui/Button';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleGoToLogin = useCallback(() => {
    navigation.navigate(ScreenNames.Login);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Button title={t('homeScreen.goToLogin')} onPress={handleGoToLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.m,
  },
});

export default memo(HomeScreen);
