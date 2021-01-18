import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import { AppState, SettingsState } from "../../types";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { DataTable } from "react-native-paper";
import { createTransmissionTable } from "../../helper/Transmissions";

export function GearTable() {
  const settings = useSelector<AppState, SettingsState>(
    (store) => store.settings
  );

  const { t } = useTranslation();

  const closestIndex = (num: number, arr: number[]) => {
    let curr = arr[0],
      diff = Math.abs(num - curr);
    let index = 0;
    for (let val = 0; val < arr.length; val++) {
      let newdiff = Math.abs(num - arr[val]);
      if (newdiff < diff) {
        diff = newdiff;
        curr = arr[val];
        index = val;
      }
    }
    return index;
  };

  const transmissions = useMemo(() => {
    return [...createTransmissionTable(settings.frontSprockets, settings.rearSprockets)];
  }, [settings.frontSprockets, settings.rearSprockets]);

  function createTestTable(testSpeeds: number[]) {
    if (transmissions.length == 0) return [];
    let table = [];
    testSpeeds.map((speed, index) => {
      let currRow = {};
      currRow.speed = speed;
      currRow.transmissionNeeded =
        (60000 * speed) /
        (settings.tireCircumference * settings.favoriteCadence);

      let bestIndex = closestIndex(
        currRow.transmissionNeeded,
        transmissions.map((a) => a.transmission)
      );
      currRow.transmissionBest = transmissions[bestIndex].transmission;
      currRow.sprocketFront = transmissions[bestIndex].frontSprocket;
      currRow.sprocketRear = transmissions[bestIndex].rearSprocket;
      table.push(currRow);
    });
    return table;
  }

  let testTable = createTestTable([
    10 / 9,
    20 / 9,
    30 / 9,
    40 / 9,
    50 / 9,
    60 / 9,
    70 / 9,
    80 / 9,
    90 / 9,
    100 / 9,
  ]);

  return (
    <ScrollView style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>{t("speed")}</DataTable.Title>
          <DataTable.Title>{t("transmissionTarget")}</DataTable.Title>
          <DataTable.Title>{t("transmissionBest")}</DataTable.Title>
          <DataTable.Title>{t("frontSprockets")}</DataTable.Title>
          <DataTable.Title>{t("rearSprockets")}</DataTable.Title>
          <DataTable.Title>{t("cadenceActual")}</DataTable.Title>
          <DataTable.Title>{t("cadenceDifference")}</DataTable.Title>
        </DataTable.Header>
        {testTable.map((row, index) => {
          const actualCadence =
            (row.speed / settings.tireCircumference / row.transmissionBest) *
            60000;

          return (
            <DataTable.Row key={index}>
              <DataTable.Cell key={index}>
                {(row.speed * 3.6).toFixed(2)}
              </DataTable.Cell>
              <DataTable.Cell key={index + 1}>
                {row.transmissionNeeded.toFixed(2)}
              </DataTable.Cell>
              <DataTable.Cell key={index + 2}>
                {row.transmissionBest.toFixed(2)}
              </DataTable.Cell>
              <DataTable.Cell key={index + 3}>
                {row.sprocketFront}
              </DataTable.Cell>
              <DataTable.Cell key={index + 4}>
                {row.sprocketRear}
              </DataTable.Cell>
              <DataTable.Cell key={index + 5}>
                {actualCadence.toFixed(2)}
              </DataTable.Cell>
              <DataTable.Cell key={index + 6}>
                {(settings.favoriteCadence - actualCadence).toFixed(2)}
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
