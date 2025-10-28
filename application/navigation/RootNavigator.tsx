import { useSessionStore } from '@/entities/session/model/session.store';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';

import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';

export const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useSessionStore();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? <AppStack /> : <AuthStack />;
};
