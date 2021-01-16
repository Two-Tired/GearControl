import { ClearSettingsActions as ClearSettingsAction, SetNumberAction, SetSettingsAction, SetSprocketAction, SETTINGS_NUMBER_TYPE, SETTINGS_SPROCKET_TYPE } from "../../types";
import { settings } from "./reducer";

export enum SETTINGS_ACTION_TYPE {
  SET_SETTINGS = "SETTINGS/SET_SETTINGS",
  CLEAR_SETTINGS = "SETTINGS/CLEAR_SETTINGS",
  SET_SPROCKETS = "SETTINGS/SET_SPROCKETS",
  SET_NUMBER = "SETTINGS/NUMBER",
}

export const setSettings = (
  frontSprockets: number[],
  rearSprockets: number[],
  favoriteCadence: number,
  tireCircumference: number,
): SetSettingsAction => ({
  type: SETTINGS_ACTION_TYPE.SET_SETTINGS,
  settingData: {
    frontSprockets,
    rearSprockets,
    favoriteCadence,
    tireCircumference,
  },
});

export const clearSettings = (): ClearSettingsAction => ({
  type: SETTINGS_ACTION_TYPE.CLEAR_SETTINGS,
});

export const setSprockets = (sprockets: number[], sprocketType: SETTINGS_SPROCKET_TYPE): SetSprocketAction => ({
  type: SETTINGS_ACTION_TYPE.SET_SPROCKETS,
  sprocketType: sprocketType,
  sprockets: sprockets,
})

export const setNumber = (value: number, numberType: SETTINGS_NUMBER_TYPE): SetNumberAction => ({
  type: SETTINGS_ACTION_TYPE.SET_NUMBER,
  numberType: numberType,
  value: value,
})
