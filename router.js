import { createStackNavigator } from '@react-navigation/stack';

import RegistrationScreen from './Screens/auth/RegistrationScreen';
import LoginScreen from './Screens/auth/LoginScreen';
import HomeScreen from './Screens/HomeScreen';

const AuthStack = createStackNavigator();

export const useRoute = () => {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};
