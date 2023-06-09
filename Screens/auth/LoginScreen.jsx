import {
  TextInput,
  Text,
  View,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import CustomButton from '../../components/CustomButton';
import CustomImageBackground from '../../components/CustomImageBackground';
import { authStyles } from './authStyles';

import { authSignIn } from '../../redux/auth/authOperations';

const initialState = {
  email: '',
  password: '',
};

const LoginScreen = () => {
  const [focusedField, setFocusedField] = useState('');
  const [isHidden, setIsHidden] = useState(true);
  const [state, setState] = useState(initialState);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleFocus = name => {
    setFocusedField(name);
  };

  const handleSubmit = () => {
    setFocusedField('');
    dispatch(authSignIn(state));
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
      <Text style={authStyles.titleText}>Sign In</Text>
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
        <CustomButton title="Sign In" onPress={handleSubmit} />
        <View style={authStyles.underFormTextWrapper}>
          <Text
            style={{
              ...authStyles.underFormText,
              marginBottom: focusedField ? 32 : 111,
            }}
          >
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
            <Text style={authStyles.underFormText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomImageBackground>
  );
};

export default LoginScreen;
