import { ImageBackground } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';

import avatar from '../assets/defaultAvatar.png';
import { getAuthState } from '../redux/selectors/selectors';

const Comment = ({ item }) => {
  const currentUser = getAuthState();

  return (
    <View>
      <View
        style={[
          styles.commentContainer,
          {
            flexDirection:
              currentUser.userId === item.userId ? 'row' : 'row-reverse',
          },
        ]}
      >
        <View
          style={[
            styles.commentWrapper,
            {
              ...(currentUser.userId === item.userId
                ? { borderTopLeftRadius: 6 }
                : { borderTopRightRadius: 6 }),
            },
          ]}
        >
          <Text style={styles.commentText}>{item.comment}</Text>
          <View
            style={{
              alignItems:
                currentUser.userId === item.userId ? 'flex-start' : 'flex-end',
            }}
          >
            <Text style={styles.commentPostTime}>{item.postTime}</Text>
          </View>
        </View>
        <ImageBackground
          source={item.avatar ? { uri: item.avatar } : avatar}
          style={{
            height: 28,
            width: 28,
            borderRadius: 50,
            overflow: 'hidden',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  commentWrapper: {
    flex: 1,
    padding: 16,
    marginBottom: 24,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  commentText: {
    color: '#212121',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  commentPostTime: {
    color: '#BDBDBD',
  },
});

export default Comment;
