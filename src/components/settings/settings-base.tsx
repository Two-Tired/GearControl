import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
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
  onSettingsClear: () => void;
}

export default class SettingsBase extends React.Component<Props, {}> {
  render() {
    const { settings, onSettingsSave, onSettingsClear } = this.props;
    const frontInputs = settings.frontSprockets;
    const rearInputs = settings.rearSprockets;
    // const frontNumberInput = settings.frontSprocketNumber;
    // const rearNumberInput = settings.rearSprocketNumber;
    const favoriteCadence = settings.favoriteCadence;

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.horizontal}>
          <Button
            icon="plus"
            mode="contained"
            onPress={() => {
              frontInputs.push(0);
              onSettingsSave(
                frontInputs.length,
                rearInputs.length,
                frontInputs,
                rearInputs,
                favoriteCadence
              );
            }}
          >
            Add front sprocket
          </Button>
          <Button
            icon="minus"
            mode="contained"
            onPress={() => {
              frontInputs.pop();
              onSettingsSave(
                frontInputs.length,
                rearInputs.length,
                frontInputs,
                rearInputs,
                favoriteCadence
              );
            }}
          >
            Remove front sprocket
          </Button>
          </View>
          <View style={styles.horizontal}>
          {frontInputs.map((value, index) => {
            return (              
                <TextInput
                  mode="flat"
                  label={"Sprocket  " + (index + 1)}
                  value={value.toString()}
                  onChangeText={(text) => {
                    frontInputs[index] = parseInt(text);
                    onSettingsSave(
                      frontInputs.length,
                      rearInputs.length,
                      frontInputs,
                      rearInputs,
                      favoriteCadence
                    );
                  }}
                />
            );
          })}
          </View>
          <View style={styles.horizontal}>
          <Button
            icon="plus"
            mode="contained"
            onPress={() => {
              rearInputs.push(0);
              onSettingsSave(
                frontInputs.length,
                rearInputs.length,
                frontInputs,
                rearInputs,
                favoriteCadence
              );
            }}
          >
            Add rear sprocket
          </Button>
          <Button
            icon="minus"
            mode="contained"
            onPress={() => {
              rearInputs.pop();
              onSettingsSave(
                frontInputs.length,
                rearInputs.length,
                frontInputs,
                rearInputs,
                favoriteCadence
              );
            }}
          >
            Remove rear sprocket
          </Button>
          </View>
          <View style={styles.horizontal}>
          {rearInputs.map((value, index) => {
            return (              
                <TextInput
                  mode="flat"
                  label={"Sprocket  " + (index + 1)}
                  value={value.toString()}
                  onChangeText={(text) => {
                    rearInputs[index] = parseInt(text);
                    onSettingsSave(
                      frontInputs.length,
                      rearInputs.length,
                      frontInputs, 
                      rearInputs,
                      favoriteCadence
                    );
                  }}
                />
            );
          })}
          </View>
          <TextInput
            mode="flat"
            label="Favorite Cadence"
            value={favoriteCadence.toString()}
            onChangeText={(text) =>
              onSettingsSave(
                frontInputs.length,
                rearInputs.length,
                frontInputs,
                rearInputs,
                parseInt(text)
              )
            }
          />
        </View>
        <View style={styles.bottom}>
          <View style={styles.horizontal}>
            <Button style={styles.button} onPress={() => {onSettingsSave(frontInputs.length, rearInputs.length, frontInputs, rearInputs, favoriteCadence)}} mode="outlined">
              Clear
            </Button>
            <Button style={styles.button} onPress={() => {onSettingsClear()}} mode="contained">
              Save
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bottom: {
    // flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36,
  },
  horizontal: {
    justifyContent: "center",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    width: "40%",
  },
});
