import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/api/auth';
import { useAuth } from '@/context/AuthContext';
import Button, { BUTTON_VARIATIONS } from '@/components/Button';
import LoadingSpinner from '@/components/LoadingSpinner';
import { colors, theme } from '@/constants';

const ProfileScreen = () => {
  const { logout } = useAuth();
  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: getUserProfile,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Hi, {profile?.firstName} {profile?.lastName}!
      </Text>
      <Button
        title='Logout'
        onPress={logout}
        variant={BUTTON_VARIATIONS.secondary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.m,
  },
  welcomeText: {
    fontSize: theme.fontSize.l,
    fontFamily: theme.fontFamily.semiBold,
    marginBottom: theme.spacing.xl,
  },
});

export default memo(ProfileScreen);
