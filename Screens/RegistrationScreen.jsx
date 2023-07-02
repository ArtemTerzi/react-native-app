import {
  ImageBackground,
  StyleSheet,
  TextInput,
  Text,
  View,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import image from '../assets/bg.png';
import CustomButton from './components/CustomButton';
import { useEffect, useState } from 'react';

const { width, height } = Dimensions.get('window');

const initialState = {
  login: '',
  email: '',
  password: '',
};

const RegistrationScreen = () => {
  const [focusedField, setFocusedField] = useState('');
  const [state, setState] = useState(initialState);

  const handleFocus = name => {
    setFocusedField(name);
  };

  const handleSubmit = () => {
    setFocusedField('');
    console.log(state);
    setState(initialState);
    Keyboard.dismiss();
  };

  useEffect(() => {
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () =>
      setFocusedField('')
    );

    return () => {
      keyboardHideListener.remove();
    };
  }, []);

  const getTextInputStyle = fieldName => {
    switch (fieldName) {
      case 'login':
        return [
          styles.textInput,
          focusedField === 'login' && styles.focusedInput,
        ];
      case 'email':
        return [
          styles.textInput,
          focusedField === 'email' && styles.focusedInput,
        ];
      case 'password':
        return [
          styles.textInput,
          styles.textInputLastChild,
          focusedField === 'password' && styles.focusedInput,
        ];
      default:
        return styles.textInput;
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setFocusedField('');
      }}
    >
      <View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.image}
          >
            <View style={styles.formWrapper}>
              <Text style={styles.titleText}>Registration</Text>
              <TextInput
                style={getTextInputStyle('login')}
                placeholder="Login"
                placeholderTextColor={'#BDBDBD'}
                onFocus={() => handleFocus('login')}
                onChangeText={text =>
                  setState(prev => ({ ...prev, login: text }))
                }
                value={state.login}
              />
              <TextInput
                style={getTextInputStyle('email')}
                placeholder="Email adress"
                placeholderTextColor={'#BDBDBD'}
                onFocus={() => handleFocus('email')}
                onChangeText={text =>
                  setState(prev => ({ ...prev, email: text }))
                }
                value={state.email}
              />
              <TextInput
                style={getTextInputStyle('password')}
                placeholder="Password"
                placeholderTextColor={'#BDBDBD'}
                secureTextEntry={true}
                onFocus={() => handleFocus('password')}
                onChangeText={text =>
                  setState(prev => ({ ...prev, password: text }))
                }
                value={state.password}
              />
              <View
                style={{
                  display: focusedField ? 'none' : 'flex',
                }}
              >
                <CustomButton title="Sign up" onPress={handleSubmit} />
                <Text
                  style={{
                    ...styles.underFormText,
                    marginBottom: focusedField ? 32 : 45,
                  }}
                >
                  Already have an account? Sign In
                </Text>
              </View>
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
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
  titleText: {
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    letterSpacing: 0.01,
    color: '#212121',
    marginTop: 92,
    marginBottom: 32,
  },
  textInput: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    height: 50,
    paddingLeft: 16,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E8E8E8',
    marginBottom: 16,
    fontFamily: 'Roboto',
  },
  focusedInput: {
    borderColor: '#FF6C00',
    backgroundColor: '#FFFFFF',
  },
  textInputLastChild: {
    marginBottom: 43,
  },
  underFormText: {
    textAlign: 'center',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
    fontFamily: 'Roboto',
  },
});

export default RegistrationScreen;