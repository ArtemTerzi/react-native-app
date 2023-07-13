import {
  TextInput,
  Text,
  View,
  Keyboard,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import CustomButton from '../../components/CustomButton';
import CustomImageBackground from '../../components/CustomImageBackground';
import { authStyles } from './authStyles';

import { useDispatch } from 'react-redux';
import { authSignUp } from '../../redux/auth/authOperations';

import { AntDesign } from '@expo/vector-icons';

const initialState = {
  login: '',
  email: '',
  password: '',
  avatar: null,
};

const RegistrationScreen = () => {
  const [focusedField, setFocusedField] = useState('');
  const [isHidden, setIsHidden] = useState(true);
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  //* The avatar will visible only on that device (because it link on file on disk)
  //TODO: Create new storage for avatars in firebase

  const uploadAvatar = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      console.log(
        'Разрешение на использование медиабиблиотеки не предоставлено'
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setState(prev => ({ ...prev, avatar: result.assets[0].uri }));
    }
  };

  const deleteAvatar = () => {
    setState(prev => ({ ...prev, avatar: '' }));
  };

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

export default RegistrationScreen;
