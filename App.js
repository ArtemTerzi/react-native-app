import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import { store } from './redux/store';

import Main from './components/Main';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require('./assets/fonts/Roboto-Black.ttf'),
    RobotoBold: require('./assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
