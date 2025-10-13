import { useAuth } from '@/context/AuthContext';
import { AppStack } from '@/navigation/AppStack';
import { AuthStack } from '@/navigation/AuthStack';
import LoadingSpinner from '@/components/LoadingSpinner';

export const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? <AppStack /> : <AuthStack />;
};
