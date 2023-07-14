import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import db from '../../firebase/config';
import { getAuthState } from '../../redux/selectors/selectors';
import CustomImageBackground from '../../components/CustomImageBackground';
import PhotoHolder from '../../components/PhotoHolder';
import PostsList from '../../components/PostsList';
import LogOutBtn from '../../components/LogOutBtn';

const ProfileScreen = () => {
  const [posts, setPosts] = useState([]);
  const { userId, login, avatar } = getAuthState();

  useEffect(() => {
    getUserPostsById();
  }, []);

  const getUserPostsById = async () => {
    await db
      .firestore()
      .collection('posts')
      .where('userId', '==', userId)
      .onSnapshot(data =>
        setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      );
  };

  return (
    <CustomImageBackground>
      <View style={styles.mainContent}>
        <LogOutBtn styles={styles.logoutBtn} />
        <PhotoHolder state={{ avatar }} />
        <Text style={styles.userLogin}>{login}</Text>
        <PostsList posts={posts} />
      </View>
    </CustomImageBackground>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    height: 615,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  userLogin: {
    textAlign: 'center',
    fontFamily: 'RobotoBold',
    fontSize: 30,
    color: '#212121',
    marginTop: 92,
  },
  logoutBtn: { position: 'absolute', top: 22, right: -16 },
});

export default ProfileScreen;
