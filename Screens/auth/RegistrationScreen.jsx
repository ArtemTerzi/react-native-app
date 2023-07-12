import {
  TextInput,
  Text,
  View,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import CustomButton from '../../components/CustomButton';
import CustomImageBackground from '../../components/CustomImageBackground';
import { authStyles } from './authStyles';

import { useDispatch } from 'react-redux';
import { authSignUp } from '../../redux/auth/authOperations';

const initialState = {
  login: '',
  email: '',
  password: '',
};

const RegistrationScreen = () => {
  const [focusedField, setFocusedField] = useState('');
  const [isHidden, setIsHidden] = useState(true);
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const handleFocus = name => {
    setFocusedField(name);
  };

  const handleSubmit = () => {
    setFocusedField('');
    dispatch(authSignUp(state));
    Keyboard.dismiss();
    setState(initialState);
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
          authStyles.textInput,
          focusedField === 'login' && authStyles.focusedInput,
        ];
      case 'email':
        return [
          authStyles.textInput,
          focusedField === 'email' && authStyles.focusedInput,
        ];
      case 'password':
        return [
          authStyles.textInput,
          authStyles.textInputLastChild,
          focusedField === 'password' && authStyles.focusedInput,
        ];
      default:
        return authStyles.textInput;
    }
  };

  return (
    <CustomImageBackground
      onPressOutside={() => {
        Keyboard.dismiss();
        setFocusedField('');
      }}
    >
      <Text style={authStyles.titleText}>Registration</Text>
      <TextInput
        style={getTextInputStyle('login')}
        placeholder="Login"
        placeholderTextColor={'#BDBDBD'}
        onFocus={() => handleFocus('login')}
        onChangeText={text => setState(prev => ({ ...prev, login: text }))}
        value={state.login}
      />
      <TextInput
        style={getTextInputStyle('email')}
        placeholder="Email adress"
        placeholderTextColor={'#BDBDBD'}
        onFocus={() => handleFocus('email')}
        onChangeText={text => setState(prev => ({ ...prev, email: text }))}
        value={state.email}
      />
      <View>
        <TextInput
          style={getTextInputStyle('password')}
          placeholder="Password"
          placeholderTextColor={'#BDBDBD'}
          secureTextEntry={isHidden ? true : false}
          onFocus={() => handleFocus('password')}
          onChangeText={text => setState(prev => ({ ...prev, password: text }))}
          value={state.password}
        />
        <CustomButton
          style={authStyles.shownButton}
          title={isHidden ? 'Show' : 'Hide'}
          textStyle={authStyles.shownButtonText}
          onPress={() => {
            setIsHidden(!isHidden);
          }}
        />
      </View>
      <View
        style={{
          display: focusedField ? 'none' : 'flex',
        }}
      >
        <CustomButton title="Sign up" onPress={handleSubmit} />
        <View style={authStyles.underFormTextWrapper}>
          <Text
            style={{
              ...authStyles.underFormText,
              marginBottom: focusedField ? 32 : 45,
            }}
          >
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                ...authStyles.underFormText,
                textDecorationLine: 'underline',
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomImageBackground>
  );
};

export default RegistrationScreen;
