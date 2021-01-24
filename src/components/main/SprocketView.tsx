import { View, StyleSheet } from "react-native";
import React, { memo } from "react";
import Sprocket from "./Sprocket";
import { Text } from "react-native-paper";
import { SETTINGS_SPROCKET_TYPE } from "../../types";

type SprocketViewProps = {
  frontSprockets: number[];
  rearSprockets: number[];
  frontGear: number;
  rearGear: number;
  speed: string;
};

function SprocketView({
  frontSprockets,
  rearSprockets,
  frontGear,
  rearGear,
  speed,
}: SprocketViewProps) {
  return (
    <View style={styles.gearContainer}>
      <Sprocket
        sprockets={frontSprockets}
        gear={frontGear}
        sprocketType={SETTINGS_SPROCKET_TYPE.FRONT}
      />
      <View style={styles.horizontalSpaceSpeed}>
        <Text style={[styles.speed]}>{speed}</Text>
        <Text style={[styles.speedUnit]}>km/h</Text>
      </View>
      <Sprocket
        sprockets={rearSprockets}
        gear={rearGear}
        sprocketType={SETTINGS_SPROCKET_TYPE.REAR}
      />
    </View>
  );
}

// SprocketView.whyDidYouRender = true;

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

export default memo(SprocketView);
