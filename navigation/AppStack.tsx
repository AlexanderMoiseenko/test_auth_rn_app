import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '@/screens/ProfileScreen';
import { AppStackParamList } from '@/types';

const Stack = createStackNavigator<AppStackParamList>();

export const AppStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
);
