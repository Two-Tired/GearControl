import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View, StyleSheet } from "react-native";
import { DataTable, Button, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { clearSettings } from "../redux/settings/actions";
import { setLocation, setLocationError } from "../redux/location/actions";
import {
  HomeScreenNavigationProp,
  HomeScreenRouteProp,
  SettingsState,
  AppState,
  TransmissionState,
} from "../types";

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { LocationObject } from "expo-location";
import { setTransmissions } from "../redux/transmissions/actions";
import BigSprocket from "../components/main/bigSprocket";
import SmallSprocket from "../components/main/smallSprocket";

type Props = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

export function HomeScreen({ route, navigation }: Props) {
  
  const settings = useSelector<AppState, SettingsState>(
    (store) => store.settings
  );
  const location = useSelector<AppState, LocationObject>(
    (store) => store.location
  );
  const transmissions = useSelector<AppState, TransmissionState[]>(
    (store) => store.transmissions
  );

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const resetSettings = () => dispatch(clearSettings());

  useEffect(() => {
    (async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        dispatch(setLocationError());
      }
    })();

    // let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
    // dispatch(setLocation(location));
  }, []);

  const locationCallback = (location: LocationObject) => {
    // var date = new Date(location.timestamp);
    // console.log(date.toString() + "  " + JSON.stringify(location.coords));
    dispatch(setLocation(location));
  }

  Location.watchPositionAsync({
    accuracy: Location.Accuracy.Lowest,
    timeInterval: 5000, // at min 5 sec between measurements
    distanceInterval: 10, // at min 10 meters between measurements
  }, locationCallback);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.horizontal}>
        <BigSprocket />
        <View style={styles.horizontalSpace}/>
        <SmallSprocket />
      </View>
      <View>
        <Text style={styles.riesig}>{location.coords.speed?.toFixed(2)}</Text>
        <Text>{new Date(location.timestamp).toString() + "  " + JSON.stringify(location.coords)}</Text>
      </View>
      <View style={styles.horizontal}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  map: {
    width: 300,
    height: 200,
  },
  horizontal: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 20,
  },
  button: {
    width: "40%",
  },
  riesig: {
    fontSize: 100,
  },
  horizontalSpace: {
    width: 100,
  }
});
