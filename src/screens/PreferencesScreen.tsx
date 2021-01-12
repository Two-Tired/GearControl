import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Preferences } from "../components/preferences/preferences";

export function PreferencesScreen() {
  return (
    <View style={styles.container}>
      <Preferences></Preferences>
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
