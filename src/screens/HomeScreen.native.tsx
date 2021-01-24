import React, { useEffect, useMemo } from "react";
import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setLocation, setLocationError } from "../redux/location/actions";
import {
  AppState,
  HomeScreenNavigationProp,
  HomeScreenRouteProp,
} from "../types";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { LocationObject } from "expo-location";
import { SprocketView } from "../components/main/SprocketView";

type Props = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

export function HomeScreen({ route, navigation }: Props) {
  // const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useSelector<AppState, LocationObject>(
    (store) => store.location
  );

  useEffect(() => {
    (async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      console.log(status)
      if (status !== "granted") {
        dispatch(setLocationError());
      }
    })();

    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 1000, // at min 5 sec between measurements
        distanceInterval: 3, // at min 10 meters between measurements
      },
      locationCallback
    );    // let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
    // dispatch(setLocation(location));
  }, []);

  const locationCallback = (location: LocationObject) => {
    // var date = new Date(location.timestamp);
    // console.log(date.toString() + "  " + JSON.stringify(location.coords));
    dispatch(setLocation(location));
  };

  Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.BestForNavigation,
      timeInterval: 1000, // at min 5 sec between measurements
      distanceInterval: 3, // at min 10 meters between measurements
    },
    locationCallback
  );

  // const convertToKMH = (speed: number | null): number => {
  //   return speed ? speed * 3.6 : 0;
  // };

  return (
    <ScrollView style={styles.container}>
      <SprocketView />
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          initialRegion={{
            longitude: 7,
            latitude: 50.8,
            longitudeDelta: 0.0922,
            latitudeDelta: 0.0922,
          }}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0922,
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
