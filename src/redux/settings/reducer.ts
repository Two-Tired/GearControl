import { SetSettingsAction, SettingsAction, SettingsState } from "../types";
import { SETTINGS_ACTION_TYPES } from "./actions";

export const initialState: SettingsState = {
  frontSprocketNumber: 0,
  rearSprocketNumber: 0,
  frontSprockets: [],
  rearSprockets: [],
  favoriteCadence: 0,
};

export const settings = (
  state: SettingsState = initialState,
  action: SettingsAction
) => {
  switch (action.type) {
    case SETTINGS_ACTION_TYPES.SET_SETTINGS:
      const { settingData } = <SetSettingsAction>action;

      return { ...settingData };
    case SETTINGS_ACTION_TYPES.CLEAR_SETTINGS:
      return state;
    default:
      return state;
  }
};
