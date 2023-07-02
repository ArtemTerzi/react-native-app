import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CustomButton from './components/CustomButton';

const { width, height } = Dimensions.get('window');

const PostsScreen = () => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        console.log('I press it');
      }}
    >
      <View style={styles.container}>
        <View style={styles.statusBar}></View>
        <View style={styles.header}>
          <Text style={styles.title}>Publications</Text>
        </View>
        <View style={styles.main}></View>
        <View style={styles.footer}>
          <CustomButton
            style={styles.addButton}
            title="+"
            onPress={console.log('Click button')}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
  statusBar: {
    height: 44,
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 17,
    fontWeight: 500,
    lineHeight: 22,
    paddingLeft: 48,
    paddingRight: 48,
    paddingTop: 11,
    paddingBottom: 11,
  },
  header: {
    borderBottomColor: 'rgba(0, 0, 0, 0.30)',
    borderBottomWidth: 1,
    width: width,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
  },
  footer: {
    borderTopColor: 'rgba(0, 0, 0, 0.30)',
    borderTopWidth: 1,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    display: 'flex',
    width: 70,
    height: 40,
    marginTop: 9,
    padding: 0,
    justifyContent: 'center',
  },
});

export default PostsScreen;
