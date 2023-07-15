import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';

import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

import CustomButton from '../../components/CustomButton';

import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import db from '../../firebase/config';
import uuid from 'react-native-uuid';
import { getAuthState } from '../../redux/selectors/selectors';

const CreatePostsScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [location, setLocation] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);

  const navigation = useNavigation();

  const { userId, login } = getAuthState();

  useEffect(() => {
    (async () => {
      let { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === 'granted');
    })();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  useEffect(() => {
    if (photo && name && place) setIsDisabled(false);
    else setIsDisabled(true);
  }, [photo, name, place, location]);

  const takePhoto = async () => {
    if (camera) {
      const { uri } = await camera.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);

      const location = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setPhoto(uri);
    }
  };

  const sendPhoto = async () => {
    await uploadPostToServer();
    navigation.navigate('Posts');
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const postId = uuid.v4();

    await db.storage().ref(`postsImages/${postId}`).put(file);

    const processedPhoto = await db
      .storage()
      .ref(`postsImages/`)
      .child(postId)
      .getDownloadURL();

    return processedPhoto;
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    const postTime = new Date().toUTCString();
    const likes = [];

    await db
      .firestore()
      .collection('posts')
      .add({ photo, name, place, location, userId, login, postTime, likes });
  };

  const loadPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.componentWrapper}>
        <View>
          <Camera style={styles.camera} ref={setCamera} type={CameraType.back}>
            {photo && (
              <View style={styles.imageWrapper}>
                <Image
                  source={{ uri: photo }}
                  style={{ width: '100%', height: '100%' }}
                />
              </View>
            )}
            <TouchableOpacity onPress={takePhoto} style={styles.photoBtn}>
              <MaterialIcons name="camera-alt" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </Camera>
        </View>
        <View>
          <TouchableOpacity onPress={loadPhoto}>
            <Text style={styles.underCameraText}>
              {photo ? 'Edit photo' : 'Upload a photo'}
            </Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Name..."
            style={styles.nameInput}
            onChangeText={text => setName(text)}
            value={name}
          />
          <View>
            <Feather
              name="map-pin"
              size={24}
              color="#BDBDBD"
              style={styles.locationIcon}
            />
            <TextInput
              placeholder="Location..."
              style={styles.locationInput}
              onChangeText={text => setPlace(text)}
              value={place}
            />
          </View>
          <CustomButton
            style={[
              styles.sendBtn,
              {
                backgroundColor: isDisabled ? '#F6F6F6' : '#FF6C00',
              },
            ]}
            textStyle={{ color: isDisabled ? '#BDBDBD' : 'white' }}
            title="Publish"
            onPress={sendPhoto}
            disabled={isDisabled}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  componentWrapper: {
    marginHorizontal: 16,
  },
  camera: {
    width: 343,
    height: 240,
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderColor: 'white',
    borderWidth: 1,
  },
  photoBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.30)',
    borderRadius: 50,
  },
  underCameraText: {
    color: '#BDBDBD',
    fontSize: 16,
    fontWeight: '400',
  },
  nameInput: {
    height: 50,
    width: '100%',
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
    marginTop: 32,
  },
  locationIcon: {
    position: 'absolute',
    left: 0,
    top: 29,
  },
  locationInput: {
    height: 50,
    width: '100%',
    marginTop: 16,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
    paddingStart: 28,
  },
  sendBtn: {
    marginTop: 32,
  },
  resetBtn: {
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 40,
    borderRadius: 50,
  },
});

export default CreatePostsScreen;
