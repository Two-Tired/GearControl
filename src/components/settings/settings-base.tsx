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
}

// https://stackoverflow.com/a/45407976

interface State {
  frontInputs: typeof TextInput[]
  rearInputs: typeof TextInput[]
}

export default class SettingsBase extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      frontInputs: [],
      rearInputs: []
    };
  }

  render() {
    const { settings, onSettingsSave } = this.props;

    return (
      <View style={styles.container}>
        <Button icon="plus" mode="contained" 
        onPress={
          () => {
            let frontInputs = this.state.frontInputs;
            frontInputs.push(<TextInput mode='flat' label={"Rear Sprocket " + (frontInputs.length+1)} />);
            this.setState({ frontInputs })
          }
        }>
          Add front sprocket
        </Button>
        <Button icon="minus" mode="contained"
          onPress={
          () => {
            let frontInputs = this.state.frontInputs;
            frontInputs.pop();
            this.setState({ frontInputs })
          }
        }>
          Remove front sprocket
        </Button>
        {this.state.frontInputs.map((value, index) => {
          return value
        })}
        <Button icon="plus" mode="contained" 
        onPress={
          () => {
            let rearInputs = this.state.rearInputs;
            rearInputs.push(<TextInput mode='flat' label={"Rear Sprocket " + (rearInputs.length+1)} />);
            this.setState({ rearInputs })
          }
        }>
          Add rear sprocket
        </Button>
        <Button icon="minus" mode="contained"
          onPress={
          () => {
            let rearInputs = this.state.rearInputs;
            rearInputs.pop();
            this.setState({ rearInputs })
          }
        }>
          Remove rear sprocket
        </Button>
        {this.state.rearInputs.map((value, index) => {
          return value
        })}
        <TextInput
          mode='flat'
          label="Favorite Cadence"
          value={settings.favoriteCadence}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }, 
});
