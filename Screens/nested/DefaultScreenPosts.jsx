import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Post from '../../components/Post';

import db from '../../firebase/config';
import MiniUserProfile from '../../components/MiniUserProfile';

const DefaultScreenPosts = () => {
  const [posts, setPosts] = useState([]);

  const navigation = useNavigation();

  const getAllPost = async () => {
    db.firestore()
      .collection('posts')
      .onSnapshot(data =>
        setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      );
  };

  useEffect(() => {
    getAllPost();
  }, []);

  const onCommentPress = ({ id, photo }) =>
    navigation.navigate('Comments', { postId: id, photo });

  const onLocationPress = location => navigation.navigate('Map', { location });

  const onLikePress = id => {};

  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainContent}>
        <MiniUserProfile />
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Post
              item={item}
              onCommentPress={onCommentPress}
              onLocationPress={onLocationPress}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  mainContent: { flex: 1, marginHorizontal: 16 },
  underFormText: {
    textAlign: 'center',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
  },
});

export default DefaultScreenPosts;
