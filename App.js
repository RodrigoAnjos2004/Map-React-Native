import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        region={
          !location
            ? {
                latitude: 74,
                longitude: 18,
                latitudeDelta: 0.005,
        longitudeDelta: 0.005,
              }
            : {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.005,
        longitudeDelta: 0.005,
              }
        }
        style={styles.map}>
        <Marker
          coordinate={
            !location
              ? {
                  latitude: 74,
                  longitude: 18,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }
              : {
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.932,
                  longitudeDelta: 0.0421,
                }
          }
        />
        <Marker
          coordinate={{
            latitude: 19.23,
            longitude: 72.8567,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '90%',
    height: '80%',
  },
});
