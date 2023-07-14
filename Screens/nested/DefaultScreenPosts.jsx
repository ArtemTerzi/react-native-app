import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import db from '../../firebase/config';
import MiniUserProfile from '../../components/MiniUserProfile';
import PostsList from '../../components/PostsList';
import { sortItemsByPostTime } from '../../services';

const DefaultScreenPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPost();
  }, []);

  const getAllPost = async () => {
    db.firestore()
      .collection('posts')
      .onSnapshot(data => {
        const posts = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setPosts(sortItemsByPostTime(posts, 'dsc'));
      });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainContent}>
        <MiniUserProfile />
        <PostsList posts={posts} />
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
