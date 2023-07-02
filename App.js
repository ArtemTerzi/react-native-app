import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import RegistrationScreen from './Screens/RegistrationScreen';
import { useFonts } from 'expo-font';
import LoginScreen from './Screens/LoginScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require('./assets/fonts/Roboto-Black.ttf'),
    RobotoBold: require('./assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* <RegistrationScreen></RegistrationScreen> */}
      <LoginScreen></LoginScreen>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto',
  },
});
