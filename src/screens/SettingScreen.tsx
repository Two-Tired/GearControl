import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Settings } from "../containers/settings";

export function SettingScreen() {
  return (
    <View style={styles.container}>
      <Settings></Settings>
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
