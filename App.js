import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const markers = [
  {
    latitude: 45.2593189,
    longitude: 19.8314653,
    title: "marker1",
    description: "ovo je marker 1",
  },
  {
    latitude: 45.2463189,
    longitude: 19.8364653,
    title: "marker2",
    description: "ovo je marker 2",
  },
  {
    latitude: 45.2513189,
    longitude: 19.8254653,
    title: "marker3",
    description: "ovo je marker 3",
  },
  {
    latitude: 45.2525189,
    longitude: 19.8449653,
    title: "marker4",
    description: "ovo je marker 4",
  },
];

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getLastKnownPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
      });
      console.log(location);
      setLocation(location);
    })();
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 45.2553189,
          longitude: 19.8344653,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{ height: "50%", width: "100%" }}
        minZoomLevel={14}
      >
        <Marker
          coordinate={{ latitude: 45.2553189, longitude: 19.8344653 }}
          title={"My Location"}
        />
        {markers.map((marker, idx) => (
          <Marker
            key={idx}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
            pinColor="green"
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
