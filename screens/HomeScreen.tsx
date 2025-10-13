import React, { useCallback, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '@/components/Button';
import { colors } from '@/constants/colors';
import { theme } from '@/constants/theme';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleGoToLogin = useCallback(() => {
    navigation.navigate('Login');
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
