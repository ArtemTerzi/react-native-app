import { useEffect, useState } from 'react';
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import db from '../../firebase/config';
import { getAuthState } from '../../redux/selectors/selectors';

import { AntDesign } from '@expo/vector-icons';
import Comment from '../../components/Comment';
import { sortItemsByPostTime } from '../../services';

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const { postId, photo } = route.params;
  const { login, userId, avatar } = getAuthState();

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    await db
      .firestore()
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .onSnapshot(data => {
        const comments = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setAllComments(sortItemsByPostTime(comments));
      });
  };

  const createComment = async () => {
    const postTime = new Date().toUTCString();

    await db
      .firestore()
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .add({ comment, postTime, login, userId, avatar });

    setComment('');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainContent}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: photo }} style={styles.image} />
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ marginTop: 32 }}
            data={allComments}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Comment item={item} />}
          />
        </View>
        <View style={styles.commentInputWrapper}>
          <View>
            <TextInput
              value={comment}
              onChangeText={setComment}
              placeholder="Comment..."
            />
          </View>
          <TouchableOpacity
            onPress={createComment}
            style={{
              position: 'absolute',
              right: 8,
              height: 34,
              width: 34,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FF6C00',
              borderRadius: 50,
            }}
          >
            <AntDesign name="arrowup" size={20} color="white" />
          </TouchableOpacity>
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
  mainContent: {
    flex: 1,
    marginHorizontal: 16,
  },
  imageWrapper: {
    marginTop: 32,
    overflow: 'hidden',
  },
  image: {
    height: 240,
    width: '100%',
    borderRadius: 8,
  },
  commentInputWrapper: {
    justifyContent: 'center',
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 50,
    paddingStart: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
});

export default CommentsScreen;
