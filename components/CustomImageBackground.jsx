import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import image from '../assets/bg.png';

const { width, height } = Dimensions.get('window');

const CustomImageBackground = ({ children, onPressOutside }) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableWithoutFeedback onPress={onPressOutside}>
        <View>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ImageBackground
              source={image}
              resizeMode="cover"
              style={styles.image}
            >
              <View style={styles.formWrapper}>{children}</View>
            </ImageBackground>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </View>
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
  },
});

export default CustomImageBackground;
