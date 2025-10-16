import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { getUserProfile } from '@/entities/user/model/api';
import { LogoutButton } from '@/features/logout';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { colors, theme } from '@/shared/config';

const ProfileScreen = () => {
  const { t } = useTranslation();
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
        {t('profileScreen.welcome', {
          firstName: profile?.firstName,
          lastName: profile?.lastName,
        })}
      </Text>
      <LogoutButton />
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
