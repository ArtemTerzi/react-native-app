import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import db from '../../firebase/config';
import { getAuthState } from '../../redux/selectors/selectors';

const ProfileScreen = () => {
  const { userId } = getAuthState();

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    await db
      .firestore()
      .collection('posts')
      .where('userId', '==', userId)
      .onSnapshot(data =>
        console.log(data.docs.map(doc => ({ ...doc.data() })))
      );
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.underFormText}>ProfileScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  underFormText: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
  },
});

export default ProfileScreen;
