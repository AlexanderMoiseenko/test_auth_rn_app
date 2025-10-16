import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '@/pages/ProfileScreen';
import { ScreenNames } from '@/shared/config';
import { AppStackParamList } from '@/types';

const Stack = createStackNavigator<AppStackParamList>();

export const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={ScreenNames.Profile} component={ProfileScreen} />
  </Stack.Navigator>
);
