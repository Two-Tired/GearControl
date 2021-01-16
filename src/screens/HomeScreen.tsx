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
} from "../types";

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { LocationObject } from "expo-location";

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

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const resetSettings = () => dispatch(clearSettings());

  useEffect(() => {(async () => {
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

  let testSpeeds = [1,2,3,4,5,6,7,8];



  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.riesig}>{JSON.stringify(location.coords.speed?.toFixed(2))}</Text>
      </View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Geschwindigkeit</DataTable.Title>
          <DataTable.Title>Benötigte Übersetzung</DataTable.Title>
          <DataTable.Title>Bestmögliche Übersetzung</DataTable.Title>
          <DataTable.Title>Kettenblatt</DataTable.Title>
          <DataTable.Title>Ritzel</DataTable.Title>
        </DataTable.Header>
        {testSpeeds.map((speed, index) => {
          return (
            <DataTable.Row key={index}>
              <DataTable.Cell key={index}>{speed}</DataTable.Cell>
              <DataTable.Cell key={index}>{60000 * speed/(settings.tireCircumference*settings.favoriteCadence)}</DataTable.Cell>
              <DataTable.Cell key={index}></DataTable.Cell>
              <DataTable.Cell key={index}></DataTable.Cell>
              <DataTable.Cell key={index}></DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
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
      <View>
        <Text>{new Date(location.timestamp).toString() + "  " + JSON.stringify(location.coords)}</Text>
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
});
