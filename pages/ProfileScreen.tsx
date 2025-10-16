import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { getUserProfile } from '@/entities/user/model/api';
import LogoutButton from '@/features/logout/ui/LogoutButton';
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
  if (isError)
    return (
      <Text>
        {t('common.error')}: {error.message}
      </Text>
    );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>
        {t('profileScreen.welcome', {
          firstName: profile?.firstName,
          lastName: profile?.lastName,
        })}
      </Text>
      <LogoutButton />
    </SafeAreaView>
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
