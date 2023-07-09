import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';

import PostsScreen from '../main/PostsScreen';
import CreatePostsScreen from '../main/CreatePostsScreen';
import ProfileScreen from '../main/ProfileScreen';

import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MainStack = createBottomTabNavigator();

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <MainStack.Navigator
      initialRouteName="Posts"
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          switch (route.name) {
            case 'Posts':
              return (
                <Feather name="grid" size={24} color="rgba(33, 33, 33, 0.8)" />
              );
            case 'Profile':
              return (
                <Feather name="user" size={24} color="rgba(33, 33, 33, 0.8)" />
              );
            case 'CreatePosts':
              return (
                <View style={styles.iconWrapper}>
                  <Ionicons name="add" size={24} color="white" />
                </View>
              );
            default:
              return;
          }
        },
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopColor: 'rgba(0, 0, 0, 0.30)',
          borderTopWidth: 1,
          height: 60,
        },
        unmountOnBlur: false,
      })}
    >
      <MainStack.Screen
        name="Posts"
        component={PostsScreen}
        options={{ headerShown: false }}
      />

      <MainStack.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          title: 'Create a publication',
          headerStyle: {
            borderBottomColor: 'rgba(0, 0, 0, 0.30)',
            borderBottomWidth: 1,
          },
          headerTintStyle: {
            fontSize: 17,
            fontWeight: 500,
            lineHeight: 22,
            paddingLeft: 48,
            paddingRight: 48,
            paddingTop: 11,
            paddingBottom: 11,
          },
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Feather
              onPress={() => navigation.navigate('Publications')}
              name="arrow-left"
              size={24}
              color="rgba(33, 33, 33, 0.8)"
              style={{ marginLeft: 16 }}
            />
          ),
        }}
      />
      <MainStack.Screen name="Profile" component={ProfileScreen} />
    </MainStack.Navigator>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    width: 70,
    height: 40,
    backgroundColor: '#FF6C00',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
