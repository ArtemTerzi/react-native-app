import { TouchableOpacity, Text, Image, View, StyleSheet } from 'react-native';

import { Feather } from '@expo/vector-icons';

const Post = ({ item, onCommentPress, onLocationPress }) => {
  const { location, photo, place, name, id } = item;

  return (
    <View>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: photo }} style={styles.image} />
      </View>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.postInfoWrapper}>
        <View style={styles.postInfo}>
          <TouchableOpacity onPress={() => onCommentPress({ id, photo })}>
            <Feather
              name="message-circle"
              size={24}
              color="#BDBDBD"
              style={styles.icon}
            />
            <Text style={styles.commentQuantity}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onLocationPress(location)}
            style={styles.place}
          >
            <Feather
              name="map-pin"
              size={24}
              color="#BDBDBD"
              style={styles.icon}
            />
            <Text style={styles.placeName}>{place}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    marginTop: 32,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    height: 240,
    width: '100%',
  },
  name: { marginTop: 8, color: '#212121', fontSize: 16 },
  postInfoWrapper: { marginTop: 8 },
  postInfo: { width: '100%', height: 26 },
  icon: { position: 'absolute' },
  commentQuantity: { color: '#BDBDBD', fontSize: 16, paddingStart: 30 },
  place: { position: 'absolute', right: 0 },
  placeName: {
    color: '#212121',
    fontSize: 16,
    textDecorationLine: 'underline',
    paddingStart: 28,
  },
});

export default Post;
