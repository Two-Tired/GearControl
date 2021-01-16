import React from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { DataTable, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { clearSettings } from "../redux/settings/actions";
import {
  HomeScreenNavigationProp,
  HomeScreenRouteProp,
  SettingsState,
  AppState,
} from "../types";
// import { MapView } from 'react-native-maps';

type Props = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

export function HomeScreen({ route, navigation }: Props) {
  const settings = useSelector<AppState, SettingsState>(
    (store) => store.settings
  );
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const resetSettings = () => dispatch(clearSettings());

  return (
    <View style={styles.container}>
      {/* <Subheading>Front Sprockets</Subheading> 
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
      } */}
      {/* <MapView style={styles.map} /> */}
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Front \ Rear</DataTable.Title>
          {settings.rearSprockets.map((value, index) => {
            return <DataTable.Title key={index} numeric>{value}</DataTable.Title>;
          })}
        </DataTable.Header>
        {settings.frontSprockets.map((value, index) => {
          return (
            <DataTable.Row key={index}>
              <DataTable.Cell key={index}>{value}</DataTable.Cell>
              {settings.rearSprockets.map((rearValue, index) => {
                return (
                  <DataTable.Cell key={index} numeric>
                    {(value / rearValue).toFixed(2)}
                  </DataTable.Cell>
                );
              })}
            </DataTable.Row>
          );
        })}
      </DataTable>
      <View style={styles.horizontal}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: 300,
    height: 200,
  },
  horizontal: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 20,
  },
  button: {
    width: "40%",
  },
});
