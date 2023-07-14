import {
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';

const userAvatars = ({ source }) => {
  return (
    <View>
      <ImageBackground
        source={state.avatar ? { uri: state.avatar } : null}
        style={styles.avatar}
        imageStyle={{ borderRadius: 16 }}
      >
        <TouchableOpacity style={styles.avatarBtn} onPress={uploadAvatar}>
          {state.avatar ? (
            <AntDesign
              name="closecircleo"
              color="#BDBDBD"
              size={25}
              onPress={deleteAvatar}
            />
          ) : (
            <AntDesign name="pluscircleo" color="#FF6C00" size={25} />
          )}
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    position: 'absolute',
    top: -60,
    right: '50%',
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    elevation: 3,
    transform: [{ translateX: 60 }],
  },
  avatarBtn: {
    position: 'absolute',
    right: -10,
    bottom: 20,
    backgroundColor: 'white',
    borderRadius: 50,
  },
});

export default userAvatars;
