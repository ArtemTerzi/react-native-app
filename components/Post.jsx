import { TouchableOpacity, Text, Image, View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import db from '../firebase/config';

import { Feather } from '@expo/vector-icons';
import { getAuthState } from '../redux/selectors/selectors';
import { useNavigation } from '@react-navigation/native';

const Post = ({ item }) => {
  const { location, photo, place, name, id, likes } = item;
  const [commentQuantity, setCommentQuantity] = useState(0);
  const [isLikeMine, setIsLikeMine] = useState(false);

  const navigation = useNavigation();
  const { userId } = getAuthState();

  useEffect(() => {
    getCommentsQuantity();
  }, []);

  useEffect(() => {
    setIsLikeMine(likes.includes(userId));
  }, [likes, isLikeMine]);

  const getCommentsQuantity = async () => {
    await db
      .firestore()
      .collection('posts')
      .doc(id)
      .collection('comments')
      .onSnapshot(data => setCommentQuantity(data.docs.length));
  };

  const handleLike = async () => {
    const postRef = await db.firestore().collection('posts').doc(id);
    try {
      if (!isLikeMine) {
        await postRef.update({ likes: [...likes, userId] });
      } else {
        await postRef.update({ likes: likes.filter(user => user !== userId) });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const onCommentPress = ({ id, photo }) =>
    navigation.navigate('Comments', { postId: id, photo });

  const onLocationPress = location => navigation.navigate('Map', { location });

  return (
    <View>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: photo }} style={styles.image} />
      </View>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.postInfoWrapper}>
        <View style={styles.postInfo}>
          <View style={styles.statsBar}>
            <TouchableOpacity
              onPress={() => onCommentPress({ id, photo })}
              style={styles.statIconWrapper}
            >
              <Feather
                name="message-circle"
                size={24}
                color={commentQuantity ? '#FF6C00' : '#BDBDBD'}
                style={styles.icon}
              />
              <Text style={styles.commentQuantity}>{commentQuantity}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleLike}
              style={styles.statIconWrapper}
            >
              <Feather
                name="thumbs-up"
                size={24}
                color={isLikeMine ? '#FF6C00' : '#BDBDBD'}
                style={styles.icon}
              />
              <Text style={styles.commentQuantity}>{likes.length}</Text>
            </TouchableOpacity>
          </View>
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
  statsBar: { flexDirection: 'row', gap: 24 },
  statIconWrapper: { justifyContent: 'center' },
});

export default Post;
