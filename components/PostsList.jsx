import { FlatList } from 'react-native-gesture-handler';
import Post from './Post';

const PostsList = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Post item={item} />}
    />
  );
};

export default PostsList;
