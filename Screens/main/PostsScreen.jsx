import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import DefaultScreenPosts from '../nested/DefaultScreenPosts';
import CommentsScreen from '../nested/CommentsScreen';
import MapScreen from '../nested/MapScreen';

const NestedScreen = createStackNavigator();

import { Feather } from '@expo/vector-icons';

const PostsScreen = () => {
  const navigation = useNavigation();

  return (
    <NestedScreen.Navigator initialRouteName="DefaultScreen">
      <NestedScreen.Screen
        name="Publications"
        component={DefaultScreenPosts}
        options={{
          headerRight: () => (
            <Feather
              onPress={() => navigation.navigate('Login')}
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
