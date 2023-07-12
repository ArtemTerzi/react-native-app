import { useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from '../router';
import { useDispatch } from 'react-redux';

import { getAuthState } from '../redux/selectors/selectors';
import { authStateChanged } from '../redux/auth/authOperations';

const Main = () => {
  const { stateChange } = getAuthState();

  const dispatch = useDispatch();
  const routing = useRoute(stateChange);

  useEffect(() => {
    dispatch(authStateChanged());
  }, []);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
