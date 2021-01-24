import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import {
  AppState,
  HomeScreenNavigationProp,
  HomeScreenRouteProp,
  SettingsState,
  SETTINGS_SPROCKET_TYPE,
} from "../types";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { LocationObject } from "expo-location";
import { createTransmissionTable, getGears } from "../helper/Transmissions";
import { Text } from "react-native-paper";
import Sprocket from "../components/main/Sprocket";

type Props = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

const initialState: LocationObject = {
  coords: {
    latitude: 50,
    longitude: 7,
    altitude: 50,
    accuracy: 0,
    altitudeAccuracy: 0,
    heading: 0,
    speed: 0,
  },
  timestamp: 0,
};

export function HomeScreen({ route, navigation }: Props) {
  const [location, setLocation] = useState(initialState);

  const settings = useSelector<AppState, SettingsState>(
    (store) => store.settings
  );

  useEffect(() => {
    (async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        return;
      }

      let newLocation: LocationObject = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
      setLocation(newLocation);
    })();
  }, [location]);

  const convertToKMH = useMemo(() => {
    return location.coords.speed
      ? (location.coords.speed * 3.6).toFixed(1)
      : "0.0";
  }, [location.coords.speed]);

  const transmissions = useMemo(() => {
    return createTransmissionTable(
      settings.frontSprockets,
      settings.rearSprockets
    );
  }, [settings.frontSprockets, settings.rearSprockets]);

  const gears = getGears(
    location.coords.speed,
    transmissions,
    settings.tireCircumference,
    settings.favoriteCadence
  );

  const rearSprocketsReverse = useMemo(() => {
    return [...settings.rearSprockets].reverse();
  }, [settings.rearSprockets]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.gearContainer}>
        <Sprocket
          sprockets={settings.frontSprockets}
          gear={gears.frontSprocketKey}
          sprocketType={SETTINGS_SPROCKET_TYPE.FRONT}
        />
        <View style={styles.horizontalSpaceSpeed}>
          <Text style={[styles.speed]}>{convertToKMH}</Text>
          <Text style={[styles.speedUnit]}>km/h</Text>
        </View>
        <Sprocket
          sprockets={rearSprocketsReverse}
          gear={gears.rearSprocketKey}
          sprocketType={SETTINGS_SPROCKET_TYPE.REAR}
        />
      </View>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          initialRegion={{
            longitude: 7,
            latitude: 50.8,
            longitudeDelta: 0.01,
            latitudeDelta: 0.01,
          }}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          followsUserLocation={true}
        />
      </View>

      {/* <View style={styles.horizontal}>
        <Button
          style={styles.button}
          onPress={() => {
            resetSettings();
          }}
          mode="outlined"
        >
          {t("reset")}
        </Button>
      </View>
      <View>
        <Text style={styles.riesig}>{location.coords.speed?.toFixed(2)}</Text>
        <Text>{new Date(location.timestamp).toString() + "  " + JSON.stringify(location.coords)}</Text>
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
  },
  gearContainer: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 10,
  },
  mapContainer: {},
  button: {
    width: "40%",
  },
  speed: {
    fontSize: 30,
    color: "#007aff",
  },
  speedUnit: {
    fontSize: 15,
    color: "#007aff",
  },
  horizontalSpaceSpeed: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    height: Dimensions.get("window").height * 0.69,
    width: Dimensions.get("window").width,
  },
});
