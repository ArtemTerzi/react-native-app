import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native';
import image from '../../assets/bg.png';

const { width, height } = Dimensions.get('window');

const CustomImageBackground = ({ children }) => {
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.formWrapper}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  formWrapper: {
    position: 'absolute',
    bottom: 0,
    width: width,
    paddingLeft: 16,
    paddingRight: 16,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
    fontFamily: 'Roboto',
  },
});

export default CustomImageBackground;
