import React, { memo, useMemo } from 'react';

import * as RN from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { ThemeType, useTheme } from '@/context/ThemeContext';
import AuthProcess from '@/processes/auth/ui/AuthProcess';

const scrollResetCoords = { x: 0, y: 0 };

const LoginScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      resetScrollToCoords={scrollResetCoords}
      keyboardShouldPersistTaps='handled'
      enableOnAndroid={true}
      enableAutomaticScroll={RN.Platform.OS === 'ios'}
      contentInsetAdjustmentBehavior='automatic'
      extraScrollHeight={20}
    >
      <AuthProcess />
    </KeyboardAwareScrollView>
  );
};

const getStyles = (theme: ThemeType) =>
  RN.StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
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
