import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

const PostsScreen = () => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        console.log('I press it');
      }}
    >
      <View style={styles.mainContainer}>
        <Text style={styles.underFormText}>PostsScreen</Text>
      </View>
    </TouchableWithoutFeedback>
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

export default PostsScreen;
