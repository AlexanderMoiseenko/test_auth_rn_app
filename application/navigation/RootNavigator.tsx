import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';

import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';

export const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? <AppStack /> : <AuthStack />;
};
