import { createStackNavigator } from '@react-navigation/stack';

import DefaultScreenPosts from '../nested/DefaultScreenPosts';
import CommentsScreen from '../nested/CommentsScreen';
import MapScreen from '../nested/MapScreen';
import LogOutBtn from '../../components/LogOutBtn';

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator initialRouteName="DefaultScreen">
      <NestedScreen.Screen
        name="Publications"
        component={DefaultScreenPosts}
        options={{
          headerRight: () => <LogOutBtn />,
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
