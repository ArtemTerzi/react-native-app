import { createStackNavigator } from '@react-navigation/stack';

import RegistrationScreen from './Screens/auth/RegistrationScreen';
import LoginScreen from './Screens/auth/LoginScreen';
import HomeScreen from './Screens/auth/HomeScreen';
import CommentsScreen from './Screens/nested/CommentsScreen';
import MapScreen from './Screens/nested/MapScreen';

const MainStack = createStackNavigator();

export const useRoute = isAuth => {
  if (!isAuth) {
    return (
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    );
  }
  return (
    <MainStack.Navigator initialRouteName="Login">
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerTitleAlign: 'center',
          headerStyle: {
            borderBottomColor: 'rgba(0, 0, 0, 0.30)',
            borderBottomWidth: 1,
          },
        }}
      />
      <MainStack.Screen
        name="Map"
        component={MapScreen}
        options={{ headerTitleAlign: 'center' }}
      />
    </MainStack.Navigator>
  );
};
