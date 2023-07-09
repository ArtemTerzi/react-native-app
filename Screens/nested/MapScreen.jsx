import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ route }) => {
  const location = route.params?.location
    ? route.params.location
    : { longitude: 30.523844, latitude: 50.450047 };

  return (
    <View style={styles.mainContainer}>
      <MapView
        style={{ flex: 1 }}
        region={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showUserLocation={true}
      >
        <Marker coordinate={location} title="Travel photo" />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  underFormText: {
    textAlign: 'center',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
  },
});

export default MapScreen;
