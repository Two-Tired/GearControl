import { View, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Sprocket from "./Sprocket";
import { Text } from "react-native-paper";
import { AppState, SETTINGS_SPROCKET_TYPE } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { LocationObject } from "expo-location";
import { setLocation, setLocationError } from "../../redux/location/actions";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export function SprocketView({}) {
  const location = useSelector<AppState, LocationObject>(
    (store) => store.location
  );

  const convertToKMH = useCallback((speed: number | null): number => {
    return speed ? speed * 3.6 : 0;
  }, [location.coords.speed]);

  return (
    <View style={styles.gearContainer}>
      <Sprocket sprocketType={SETTINGS_SPROCKET_TYPE.FRONT} />
      <View style={styles.horizontalSpaceSpeed}>
        <Text style={[styles.speed]}>
          {convertToKMH(location.coords.speed).toFixed(1)}
        </Text>
        <Text style={[styles.speedUnit]}>km/h</Text>
      </View>
      <Sprocket sprocketType={SETTINGS_SPROCKET_TYPE.REAR} />
    </View>
  );
}

const styles = StyleSheet.create({
  gearContainer: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 10,
  },
  speedUnit: {
    fontSize: 15,
    color: "#007aff",
  },
  speed: {
    fontSize: 30,
    color: "#007aff",
  },
  horizontalSpaceSpeed: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
});
