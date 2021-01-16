import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
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

  const locationCallback = (location) => {
    var date = new Date(location.timestamp);
    console.log(date.toString() + "  " + JSON.stringify(location.coords));
    dispatch(setLocation(location));
  }

  Location.watchPositionAsync({
    accuracy: Location.Accuracy.Lowest,
    timeInterval: 5000, // at min 5 sec between measurements
    distanceInterval: 10, // at min 10 meters between measurements
  }, locationCallback);

  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Front \ Rear</DataTable.Title>
          {settings.rearSprockets.map((value, index) => {
            return <DataTable.Title key={index} numeric>{value}</DataTable.Title>;
          })}
        </DataTable.Header>
        {settings.frontSprockets.map((value, index) => {
          return (
            <DataTable.Row key={index}>
              <DataTable.Cell key={index}>{value}</DataTable.Cell>
              {settings.rearSprockets.map((rearValue, index) => {
                return (
                  <DataTable.Cell key={index} numeric>
                    {(value / rearValue).toFixed(2)}
                  </DataTable.Cell>
                );
              })}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
});
