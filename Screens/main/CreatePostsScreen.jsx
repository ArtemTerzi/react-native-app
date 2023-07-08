import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';

const CreatePostsScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.underFormText}>CreatePostsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto',
  },
  underFormText: {
    textAlign: 'center',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
  },
});

export default CreatePostsScreen;
