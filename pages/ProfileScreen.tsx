import { memo } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Text, StyleSheet, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/context/AuthContext';
import { getUserProfile } from '@/entities/user/model/api';
import LogoutButton from '@/features/logout/ui/LogoutButton';
import { colors, theme } from '@/shared/config';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';

const ProfileScreen = () => {
  const { t } = useTranslation();
  const { logoutAndNavigateToLogin } = useAuth();
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
      <View style={styles.container}>
        <Text>{t('common.error')}: </Text>
        {error && <Text>{error.message}</Text>}
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          testID='button-back'
          onPress={logoutAndNavigateToLogin}
          style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.5 }]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name='chevron-back-outline'
            size={theme.iconSize.m}
            color={colors.black}
          />
        </Pressable>
        <Text style={styles.welcomeText}>
          {t('profileScreen.welcome', {
            firstName: profile?.firstName,
            lastName: profile?.lastName,
          })}
        </Text>
      </View>
      <LogoutButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    zIndex: 1,
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: theme.spacing.m,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: theme.spacing.m,
    width: '100%',
  },
  welcomeText: {
    fontFamily: theme.fontFamily.semiBold,
    fontSize: theme.fontSize.m,
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
  },
});

export default memo(ProfileScreen);
