import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { SettingsState } from "../../types";

interface Props {
  settings: SettingsState;
  onSettingsSave: (
    frontSprocketNumber: number,
    rearSprocketNumber: number,
    frontSprockets: number[],
    rearSprockets: number[],
    favoriteCadence: number
  ) => void;
}

export default class SettingsBase extends React.Component<Props, {}> {
  render() {
    const { settings, onSettingsSave } = this.props;
    return (
      <View style={styles.container}>
        <Text style={[styles.item, styles.baseText]}>One.</Text>
        <Text style={[styles.item, styles.baseText]}>Two.</Text>
        <Text style={[styles.item, styles.baseText]}>Favorite Cadence:</Text>
        <Text style={[styles.item, styles.baseText]}>{settings.favoriteCadence}</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  item: { width: "50%" },
  baseText: {},
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
