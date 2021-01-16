import { ClearSettingsActions, SetSettingsAction } from "../../types";

export enum SETTINGS_ACTION_TYPES {
  SET_SETTINGS = "SETTINGS/SET_SETTINGS",
  CLEAR_SETTINGS = "SETTINGS/CLEAR_SETTINGS",
}

export const setSettings = (
  frontSprockets: number[],
  rearSprockets: number[],
  favoriteCadence: number,
  tireCircumference: number,
): SetSettingsAction => ({
  type: SETTINGS_ACTION_TYPES.SET_SETTINGS,
  settingData: {
    frontSprockets,
    rearSprockets,
    favoriteCadence,
    tireCircumference,
  },
});

export const clearSettings = (): ClearSettingsActions => ({
  type: SETTINGS_ACTION_TYPES.CLEAR_SETTINGS,
});
