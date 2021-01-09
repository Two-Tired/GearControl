import { ClearSettingsActions, SetSettingsAction } from "../types";

export enum SETTINGS_ACTION_TYPES {
  SET_SETTINGS = "SETTINGS/SET_SETTINGS",
  CLEAR_SETTINGS = "SETTINGS/CLEAR_SETTINGS",
}

export const setSettings = (
  frontSprocketNumber: number,
  rearSprocketNumber: number,
  frontSprockets: number[],
  rearSprockets: number[],
  favoriteCadence: number
): SetSettingsAction => ({
  type: SETTINGS_ACTION_TYPES.SET_SETTINGS,
  settingData: {
    frontSprocketNumber,
    rearSprocketNumber,
    frontSprockets,
    rearSprockets,
    favoriteCadence,
  },
});

export const clearSettings = (): ClearSettingsActions => ({
  type: SETTINGS_ACTION_TYPES.CLEAR_SETTINGS,
});
