import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ route }) => {
  const location = route.params?.location
    ? route.params.location
    : { longitude: 30.523844, latitude: 50.450047 };

  return (
    <View style={{ flex: 1 }}>
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

export default MapScreen;
