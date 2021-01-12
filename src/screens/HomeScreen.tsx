import React from "react";
import { View, StyleSheet } from "react-native";
import { Subheading, Divider, Text, DataTable } from "react-native-paper";
import { useSelector } from "react-redux";
import { HomeScreenNavigationProp, HomeScreenRouteProp, SettingsState, AppState } from "../types";
import { RasterTiles } from "../components/map/RasterTiles";

type Props = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

export function HomeScreen({ route, navigation }: Props) {
  const settings = useSelector<AppState, SettingsState>(store => store.settings)

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
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Front \ Rear</DataTable.Title>
          {
            settings.rearSprockets.map((value, index) => {
              return <DataTable.Title numeric>{value}</DataTable.Title>
            })
          }
        </DataTable.Header>
        {
          settings.frontSprockets.map((value, index) => {
            return <DataTable.Row>
              <DataTable.Cell >{value}</DataTable.Cell>
              {
                settings.rearSprockets.map((rearValue, rearIndex) => {
                  return <DataTable.Cell numeric>{(value / rearValue).toFixed(2)}</DataTable.Cell>
                })
              }
            </DataTable.Row>
          })
        }
      </DataTable>

      {/* <RasterTiles /> */}

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
});
