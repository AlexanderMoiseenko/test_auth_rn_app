import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@/pages/HomeScreen';
import LoginScreen from '@/pages/LoginScreen';
import { AuthStackParamList } from '@/types';
import { ScreenNames } from '@/shared/config';

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={ScreenNames.Home} component={HomeScreen} />
    <Stack.Screen name={ScreenNames.Login} component={LoginScreen} />
  </Stack.Navigator>
);
