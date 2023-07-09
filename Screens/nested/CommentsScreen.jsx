import { Image, View, StyleSheet } from 'react-native';

const CommentsScreen = ({ route }) => {
  const photo = route.params.photo;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainContent}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: photo }} style={styles.image} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  mainContent: { flex: 1, marginHorizontal: 16 },
  imageWrapper: {
    marginTop: 32,
    overflow: 'hidden',
  },
  image: {
    height: 240,
    width: '100%',
    backgroundColor: 'tomato',
    borderRadius: 8,
  },
});

export default CommentsScreen;
