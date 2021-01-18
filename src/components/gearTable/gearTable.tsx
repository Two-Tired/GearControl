import React, { useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import { AppState, BestGearCombination, SettingsState } from "../../types";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { DataTable } from "react-native-paper";
import { createTransmissionTable, getGears } from "../../helper/Transmissions";

export function GearTable() {
  const settings = useSelector<AppState, SettingsState>(
    (store) => store.settings
  );

  const { t } = useTranslation();

  const transmissions = useMemo(() => {
    return [
      ...createTransmissionTable(
        settings.frontSprockets,
        settings.rearSprockets
      ),
    ];
  }, [settings.frontSprockets, settings.rearSprockets]);

  function createTestTable(testSpeeds: number[]) {
    if (transmissions.length == 0) return [];
    let table: BestGearCombination[] = [];
    testSpeeds.map((speed, index) => {
      let currRow = { ...getGears(speed, transmissions, settings.tireCircumference, settings.favoriteCadence) };

      table.push(currRow);
    });
    return table;
  }

  const speedTable = Array.from(Array(10).keys()).map((_, index) => {
    return ((1 + index) * 10) / 9;
  });

  let testTable = createTestTable(speedTable);

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
                {row.frontSprocket + "[" + row.frontSprocketKey + "]"}
              </DataTable.Cell>
              <DataTable.Cell key={index + 4}>
                {row.rearSprocket + "[" + row.rearSprocketKey + "]"}
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
