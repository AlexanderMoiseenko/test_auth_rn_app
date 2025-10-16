import React, { useCallback, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Button from '@/shared/ui/Button';
import { colors, theme, ScreenNames } from '@/shared/config';

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
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.m,
  },
});

export default memo(HomeScreen);
