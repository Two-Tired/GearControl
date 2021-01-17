import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { GearTable } from "../components/gearTable/gearTable";

export function GearTableScreen() {
  return (
    <View style={styles.container}>
      <GearTable></GearTable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
