import {
  TextInput,
  Text,
  View,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import db from '../../firebase/config';
import uuid from 'react-native-uuid';

import { validateEmail } from '../../services';

import CustomButton from '../../components/CustomButton';
import CustomImageBackground from '../../components/CustomImageBackground';
import { authStyles } from './authStyles';

import { authSignUp } from '../../redux/auth/authOperations';
import PhotoHolder from '../../components/PhotoHolder';

const initialState = {
  login: '',
  email: '',
  password: '',
  avatar: null,
};

const RegistrationScreen = () => {
  const [focusedField, setFocusedField] = useState('');
  const [isHidden, setIsHidden] = useState(true);
  const [error, setError] = useState(null);
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  useEffect(() => {
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () =>
      setFocusedField('')
    );

    return () => {
      keyboardHideListener.remove();
    };
  }, []);

  const uploadAvatar = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      console.log('Success');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const response = await fetch(result.assets[0].uri);
      const file = await response.blob();
      const avatarId = uuid.v4();

      await db.storage().ref(`usersAvatars/${avatarId}`).put(file);

      const processedAvatar = await db
        .storage()
        .ref('usersAvatars/')
        .child(avatarId)
        .getDownloadURL();

      setState(prev => ({
        ...prev,
        avatar: processedAvatar,
      }));
    }
  };

  const deleteAvatar = () => {
    setState(prev => ({ ...prev, avatar: '' }));
  };

  const handleFocus = name => {
    setFocusedField(name);
  };

  const handleSubmit = () => {
    if (!validateEmail(state.email)) {
      setError('Please enter a valid email address');
    } else {
      setError(null);
      setFocusedField('');
      dispatch(authSignUp(state));
      Keyboard.dismiss();
      setState(initialState);
    }
  };

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
      <PhotoHolder
        uploadAvatar={uploadAvatar}
        deleteAvatar={deleteAvatar}
        state={state}
      />
      <Text style={authStyles.titleText}>Registration</Text>
      <TextInput
        style={getTextInputStyle('login')}
        placeholder="Login"
        placeholderTextColor={'#BDBDBD'}
        onFocus={() => handleFocus('login')}
        onChangeText={text => setState(prev => ({ ...prev, login: text }))}
        value={state.login}
        required
      />
      {error && (
        <Text style={styles.errorMessage}>Please enter a valid email</Text>
      )}
      <TextInput
        style={[
          getTextInputStyle('email'),
          {
            borderColor: error ? 'red' : '#E8E8E8',
            backgroundColor: error ? 'rgba(255,0,0,0.3)' : '#F6F6F6',
          },
        ]}
        placeholder="Email adress"
        placeholderTextColor={'#BDBDBD'}
        onFocus={() => handleFocus('email')}
        onChangeText={text => setState(prev => ({ ...prev, email: text }))}
        value={state.email}
        autoComplete="email"
        required
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
          autoComplete="password"
          required
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
        <CustomButton
          title="Sign up"
          onPress={handleSubmit}
          disabled={state.email && state.login && state.password ? false : true}
        />
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

const styles = StyleSheet.create({
  errorMessage: {
    color: 'white',
    backgroundColor: 'red',
    height: 25,
    borderRadius: 50,
    textAlign: 'center',
  },
});

export default RegistrationScreen;
