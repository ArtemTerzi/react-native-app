import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDYqaUeFWvfXn5k6VxYEXNNHfembKy0diI',
  authDomain: 'react-native-app-antidote.firebaseapp.com',
  projectId: 'react-native-app-antidote',
  storageBucket: 'react-native-app-antidote.appspot.com',
  messagingSenderId: '171910889787',
  appId: '1:171910889787:web:302bd2cd1b63eb28b4f71e',
  measurementId: 'G-19YW0W27XK',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
