import React, { useCallback, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '@/components/Button';
import { colors, theme, ScreenNames } from '@/constants';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleGoToLogin = useCallback(() => {
    navigation.navigate(ScreenNames.Login);
  }, []);

  return (
    <View style={styles.container}>
      <Button title='Go to Login' onPress={handleGoToLogin} />
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
