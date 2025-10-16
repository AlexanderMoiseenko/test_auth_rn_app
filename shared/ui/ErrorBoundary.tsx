import React, { Component, ErrorInfo, ReactNode } from 'react';

import { withTranslation, WithTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';

import { colors, theme } from '@/shared/config';

interface Props extends WithTranslation {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    const { t } = this.props;
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{t('errorBoundary.title')}</Text>
          <Text style={styles.subtitle}>{t('errorBoundary.subtitle')}</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
  },
  subtitle: {
    color: colors.gray,
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.fontSize.s,
  },
  title: {
    fontFamily: theme.fontFamily.semiBold,
    fontSize: theme.fontSize.m,
    marginBottom: theme.spacing.xs,
  },
});

export default withTranslation()(ErrorBoundary);
