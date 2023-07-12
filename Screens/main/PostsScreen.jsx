import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';

import DefaultScreenPosts from '../nested/DefaultScreenPosts';
import CommentsScreen from '../nested/CommentsScreen';
import MapScreen from '../nested/MapScreen';

const NestedScreen = createStackNavigator();

import { Feather } from '@expo/vector-icons';
import { authSignOut } from '../../redux/auth/authOperations';

const PostsScreen = () => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOut());
  };

  return (
    <NestedScreen.Navigator initialRouteName="DefaultScreen">
      <NestedScreen.Screen
        name="Publications"
        component={DefaultScreenPosts}
        options={{
          headerRight: () => (
            <Feather
              onPress={signOut}
              name="log-out"
              size={24}
              color="#BDBDBD"
              style={{ marginRight: 16 }}
            />
          ),
          headerLeft: false,
          headerTitleAlign: 'center',
          headerStyle: {
            borderBottomColor: 'rgba(0, 0, 0, 0.30)',
            borderBottomWidth: 1,
          },
        }}
      />
      <NestedScreen.Screen
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
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{ headerTitleAlign: 'center' }}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
