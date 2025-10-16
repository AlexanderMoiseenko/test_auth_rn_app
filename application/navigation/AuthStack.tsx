import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '@/pages/HomeScreen';
import LoginScreen from '@/pages/LoginScreen';
import { ScreenNames } from '@/shared/config';
import { AuthStackParamList } from '@/types';

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={ScreenNames.Home} component={HomeScreen} />
    <Stack.Screen name={ScreenNames.Login} component={LoginScreen} />
  </Stack.Navigator>
);
