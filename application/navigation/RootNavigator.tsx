import { useAuth } from '@/context/AuthContext';
import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';

export const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? <AppStack /> : <AuthStack />;
};
