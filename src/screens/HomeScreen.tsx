import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { clearSettings } from "../redux/settings/actions";
import { setLocation, setLocationError } from "../redux/location/actions";
import {
  HomeScreenNavigationProp,
  HomeScreenRouteProp,
  SettingsState,
  AppState,
  TransmissionState,
  BestGearCombination,
} from "../types";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { LocationObject } from "expo-location";
import BigSprocket from "../components/main/bigSprocket";
import SmallSprocket from "../components/main/smallSprocket";
import { createTransmissionTable, getGears } from "../helper/Transmissions";

type Props = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

export function HomeScreen({ route, navigation }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const settings = useSelector<AppState, SettingsState>(
    (store) => store.settings
  );
  const location = useSelector<AppState, LocationObject>(
    (store) => store.location
  );

  useEffect(() => {
    (async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
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
  };

  Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.Lowest,
      timeInterval: 5000, // at min 5 sec between measurements
      distanceInterval: 10, // at min 10 meters between measurements
    },
    locationCallback
  );

  const transmissions = useMemo(() => {
    return [
      ...createTransmissionTable(
        settings.frontSprockets,
        settings.rearSprockets
      ),
    ];
  }, [settings.frontSprockets, settings.rearSprockets]);

  const convertToKMH = (speed:number):number => {
    return speed * 3.6;
  }

  const gearCombination: BestGearCombination = useMemo(() => {
    return getGears(location.coords.speed, transmissions, settings.tireCircumference, settings.favoriteCadence)
  }, [location.coords.speed, settings.tireCircumference, settings.favoriteCadence])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.gearContainer}>
        <BigSprocket gear={gearCombination.frontSprocketKey}/>
        <View style={styles.horizontalSpace}>
          <Text style={[styles.speed]}>{convertToKMH(gearCombination.speed).toFixed(1)}</Text>
          <Text style={[styles.speedUnit]}>{t("speedUnit")}</Text>
        </View>
        <SmallSprocket gear={gearCombination.rearSprocketKey}/>
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
  horizontalSpace: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    height: Dimensions.get("window").height * 0.69,
    width: Dimensions.get("window").width,
  },
});
