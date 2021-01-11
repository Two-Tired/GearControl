import React from "react";
import { View, StyleSheet } from "react-native";
import { Subheading, Divider, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { HomeScreenNavigationProp, HomeScreenRouteProp, SettingsState, AppState } from "../types";

type Props = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

export function HomeScreen({ route, navigation }: Props) {
  const settings = useSelector<AppState, SettingsState>(store => store.settings)

  return (
    <View style={styles.container}>
      
      <Subheading>Front Sprockets</Subheading>
      {
        settings.frontSprockets.map((value, index) => {
          return <Text>{"Sprocket " + (index + 1) + ": " + value}</Text>
        })
      }
      <Subheading>Rear Sprockets</Subheading>
      {
        settings.rearSprockets.map((value, index) => {
          return <Text>{"Sprocket " + (index + 1) + ": " + value}</Text>
        })
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
