import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import db from '../../firebase/config';
import { getAuthState } from '../../redux/selectors/selectors';
import CustomImageBackground from '../../components/CustomImageBackground';

const ProfileScreen = () => {
  const { userId, login } = getAuthState();

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
    <CustomImageBackground>
      <View style={styles.mainContent}>
        <Text style={styles.userLogin}>{login}</Text>
      </View>
    </CustomImageBackground>
  );
};

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userLogin: {
    textAlign: 'center',
    fontFamily: 'RobotoBold',
    fontSize: 30,
    color: '#212121',
    marginTop: 92,
  },
});

export default ProfileScreen;
