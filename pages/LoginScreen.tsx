import React, { memo } from 'react';

import { StyleSheet, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AuthProcess from '@/processes/auth/ui/AuthProcess';
import { colors, theme } from '@/shared/config';

const scrollResetCoords = { x: 0, y: 0 };

const LoginScreen = () => {
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      resetScrollToCoords={scrollResetCoords}
      keyboardShouldPersistTaps='handled'
      enableOnAndroid={true}
      enableAutomaticScroll={Platform.OS === 'ios'}
      extraScrollHeight={20}
    >
      <AuthProcess />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    marginTop: -50, // push the form up a bit
    paddingHorizontal: theme.spacing.m,
  },
});

export default memo(LoginScreen);
