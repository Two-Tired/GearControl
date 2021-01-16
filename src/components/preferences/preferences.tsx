import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import {
  TextInput,
  Button,
  FAB,
  Divider,
  Subheading,
} from "react-native-paper";
import { AppState, SettingsState } from "../../types";
import { useSelector, useDispatch } from "react-redux";
import { clearSettings, setSettings } from "../../redux/settings/actions";
import { useTranslation } from "react-i18next";

export function Preferences() {
  const settings = useSelector<AppState, SettingsState>(
    (store) => store.settings
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const frontInputs = settings.frontSprockets;
  const rearInputs = settings.rearSprockets;
  // const frontNumberInput = settings.frontSprocketNumber;
  // const rearNumberInput = settings.rearSprocketNumber;
  const favoriteCadence = settings.favoriteCadence;
  const tireCircumference = settings.tireCircumference;

  const saveSettings = useCallback(
    (frontInputs, rearInputs, favoriteCadence, tireCircumference) =>
      dispatch(
        setSettings(
          frontInputs,
          rearInputs,
          favoriteCadence,
          tireCircumference,
        )
      ),
    [dispatch]
  );
  const resetSettings = () => dispatch(clearSettings());

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Subheading style={styles.category}>{t("frontSprockets")}</Subheading>
        <View style={styles.horizontal}>
          {frontInputs.map((value, index) => {
            return (
              <TextInput
                key={index}
                mode="flat"
                label={t("frontSprocket", { number: index + 1 })}
                value={value.toString()}
                onChangeText={(text) => {
                  frontInputs[index] = parseInt(text);
                  saveSettings(frontInputs, rearInputs, favoriteCadence, tireCircumference);
                }}
              />
            );
          })}
        </View>
        <View style={styles.horizontal}>
          <FAB
            icon="plus"
            small
            onPress={() => {
              frontInputs.push(0);
              saveSettings(frontInputs, rearInputs, favoriteCadence, tireCircumference);
            }}
          />
          <FAB
            icon="minus"
            small
            onPress={() => {
              frontInputs.pop();
              saveSettings(frontInputs, rearInputs, favoriteCadence, tireCircumference);
            }}
          />
        </View>
        <Divider />
        <Subheading style={styles.category}>{t("rearSprockets")}</Subheading>
        <View style={styles.horizontal}>
          {rearInputs.map((value, index) => {
            return (
              <TextInput
                key={index}
                mode="flat"
                label={t("rearSprocket", { number: index + 1 })}
                value={value.toString()}
                onChangeText={(text) => {
                  rearInputs[index] = parseInt(text);
                  saveSettings(frontInputs, rearInputs, favoriteCadence, tireCircumference);
                }}
              />
            );
          })}
        </View>
        <View style={styles.horizontal}>
          <FAB
            icon="plus"
            small
            onPress={() => {
              rearInputs.push(0);
              saveSettings(frontInputs, rearInputs, favoriteCadence, tireCircumference);
            }}
          />
          <FAB
            icon="minus"
            small
            onPress={() => {
              rearInputs.pop();
              saveSettings(frontInputs, rearInputs, favoriteCadence, tireCircumference);
            }}
          />
        </View>
        <Divider />
        <View style={styles.horizontal}>
          <TextInput
            mode="flat"
            label={t("favoriteCadence")}
            value={favoriteCadence.toString()}
            onChangeText={(text) =>
              saveSettings(frontInputs, rearInputs, parseInt(text), tireCircumference)
            }
          />
          <TextInput
            mode="flat"
            // label={t("tireCircumference")}
            label = "test"
            value={tireCircumference.toString()}
            onChangeText={(text) =>
              saveSettings(frontInputs, rearInputs, favoriteCadence, parseFloat(text))
            }
          />
        </View>
      </View>
      <View style={styles.bottom}>
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
    </View>
  );
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
    flexWrap: "wrap",
    margin: 20,
  },
  button: {
    width: "40%",
  },
  category: {
    alignSelf: "center",
  },
});
