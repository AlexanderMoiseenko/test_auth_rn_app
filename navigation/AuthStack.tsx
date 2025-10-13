import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@/screens/HomeScreen';
import LoginScreen from '@/screens/LoginScreen';
import { AuthStackParamList } from '@/types';

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);
