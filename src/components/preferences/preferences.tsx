import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import {
  TextInput,
  Button,
  FAB,
  Divider,
  Subheading,
  Headline,
} from "react-native-paper";
import {
  AppState,
  SettingsState,
  SETTINGS_NUMBER_TYPE,
  SETTINGS_SPROCKET_TYPE,
} from "../../types";
import { useSelector, useDispatch } from "react-redux";
import {
  clearSettings,
  setNumber,
  setSettings,
  setSprockets,
} from "../../redux/settings/actions";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { setTransmissions } from "../../redux/transmissions/actions";
import { useTheme } from "@react-navigation/native";

export function Preferences() {
  const settings = useSelector<AppState, SettingsState>(
    (store) => store.settings
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { colors } = useTheme();

  const frontInputs = settings.frontSprockets;
  const rearInputs = settings.rearSprockets;
  // const frontNumberInput = settings.frontSprocketNumber;
  // const rearNumberInput = settings.rearSprocketNumber;
  const favoriteCadence = settings.favoriteCadence;
  const tireCircumference = settings.tireCircumference;

  const saveSettings = useCallback(
    (frontInputs, rearInputs, favoriteCadence, tireCircumference) =>
      dispatch(
        setSettings(frontInputs, rearInputs, favoriteCadence, tireCircumference)
      ),
    [dispatch]
  );
  const saveSprockets = useCallback(
    (sprockets, sprocketType) => {
      dispatch(setSprockets(sprockets, sprocketType));
      dispatch(
        setTransmissions(settings.frontSprockets, settings.rearSprockets)
      );
    },
    [dispatch]
  );
  const saveNumber = useCallback(
    (value, numberType) => dispatch(setNumber(value, numberType)),
    [dispatch]
  );
  const resetSettings = useCallback(() => {
    dispatch(clearSettings());
    dispatch(setTransmissions(settings.frontSprockets, settings.rearSprockets));
  }, [dispatch]);

  const tryParseInt = (input: string): number => {
    const value = parseInt(input);
    return Number.isNaN(value) ? 0 : value;
  };
  const tryParseFloat = (input: string): number => {
    const value = parseFloat(input);
    return Number.isNaN(value) ? 0 : value;
  };

  return (
    <ScrollView style={styles.container}>
      <Headline style={styles.headline}>{t("bikeSpecific")}</Headline>
      <View style={styles.container}>
        <TextInput
          mode="flat"
          label={t("tireCircumference")}
          value={tireCircumference.toString()}
          onChangeText={(text) =>
            saveNumber(tryParseFloat(text), SETTINGS_NUMBER_TYPE.CIRCUMFERENCE)
          }
          style={styles.inputGeneral}
        />
        <Divider />
        <Subheading style={styles.category}>{t("frontSprockets")}</Subheading>
        <View style={styles.sprocketContainer}>
          <View style={[styles.sprocketList]}>
            {frontInputs.map((value, index) => {
              return (
                <TextInput
                  key={index}
                  mode="flat"
                  label={t("frontSprocket", { number: index + 1 })}
                  value={value.toString()}
                  onChangeText={(text) => {
                    frontInputs[index] = tryParseInt(text);
                    saveSprockets(frontInputs, SETTINGS_SPROCKET_TYPE.FRONT);
                  }}
                  style={styles.inputSprockets}
                />
              );
            })}
          </View>
          <View style={styles.sprocketButtons}>
            <FAB
              icon="plus"
              small
              onPress={() => {
                frontInputs.push(0);
                saveSprockets(frontInputs, SETTINGS_SPROCKET_TYPE.FRONT);
              }}
            />
            <FAB
              icon="minus"
              small
              onPress={() => {
                frontInputs.pop();
                saveSprockets(frontInputs, SETTINGS_SPROCKET_TYPE.FRONT);
              }}
            />
          </View>
        </View>
        <Divider />
        <Subheading style={styles.category}>{t("rearSprockets")}</Subheading>
        <View style={styles.sprocketContainer}>
          <View style={[styles.sprocketList]}>
            {rearInputs.map((value, index) => {
              return (
                <TextInput
                  key={index}
                  mode="flat"
                  label={t("rearSprocket", { number: index + 1 })}
                  value={value.toString()}
                  onChangeText={(text) => {
                    rearInputs[index] = tryParseInt(text);
                    saveSprockets(rearInputs, SETTINGS_SPROCKET_TYPE.REAR);
                  }}
                  style={styles.inputSprockets}
                />
              );
            })}
          </View>
          <View style={styles.sprocketButtons}>
            <FAB
              icon="plus"
              small
              onPress={() => {
                rearInputs.push(0);
                saveSprockets(rearInputs, SETTINGS_SPROCKET_TYPE.REAR);
              }}
            />
            <FAB
              icon="minus"
              small
              onPress={() => {
                rearInputs.pop();
                saveSprockets(rearInputs, SETTINGS_SPROCKET_TYPE.REAR);
              }}
            />
          </View>
        </View>
        <Divider />
        <Headline style={styles.headline}>{t("userSpecific")}</Headline>
        <View style={[styles.horizontalContainer]}>
          <TextInput
            mode="flat"
            label={t("favoriteCadence")}
            value={favoriteCadence.toString()}
            onChangeText={(text) =>
              saveNumber(tryParseInt(text), SETTINGS_NUMBER_TYPE.CADENCE)
            }
            style={styles.inputGeneral}
          />
        </View>
        <View style={[styles.horizontalContainer]}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  horizontalContainer: {
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  inputSprockets: {
    width: "25%",
    // marginBottom: 5,
    // marginRight: 5,
  },
  inputGeneral: {
    width: "100%",
    margin: 5,
  },
  button: {
    width: "80%",
  },
  category: {
    alignSelf: "center",
  },
  headline: {
    alignSelf: "flex-start",
    margin: 5,
  },
  sprocketContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
  },
  sprocketList: {
    flex: 0.85,
    margin: 5,
    marginRight: 0,
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sprocketButtons: {
    flex: 0.15,
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 5,
  },
});
