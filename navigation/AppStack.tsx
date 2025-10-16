import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '@/pages/ProfileScreen';
import { AppStackParamList } from '@/types';
import { ScreenNames } from '@/shared/config';

const Stack = createStackNavigator<AppStackParamList>();

export const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={ScreenNames.Profile} component={ProfileScreen} />
  </Stack.Navigator>
);
