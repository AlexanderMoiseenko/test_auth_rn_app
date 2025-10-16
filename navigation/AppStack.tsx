import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '@/screens/ProfileScreen';
import { AppStackParamList } from '@/types';
import { ScreenNames } from '@/constants';

const Stack = createStackNavigator<AppStackParamList>();

export const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={ScreenNames.Profile} component={ProfileScreen} />
  </Stack.Navigator>
);
