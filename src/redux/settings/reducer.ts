import AsyncStorage from "@react-native-community/async-storage";
import { SetSettingsAction, SettingsAction, SettingsState } from "../../types";
import { SETTINGS_ACTION_TYPES } from "./actions";

export const initialState: SettingsState = {
  frontSprockets: [52,39,30],
  rearSprockets: [13,14,15,16,17,18,19,21,23,25],
  favoriteCadence: 0,
  tireCircumference: 60,
};

const clearAsyncStorage = async() => {
  AsyncStorage.clear();
}

export const settings = (
  state: SettingsState = initialState,
  action: SettingsAction
) => {
  switch (action.type) {
    case SETTINGS_ACTION_TYPES.SET_SETTINGS:
      const { settingData } = <SetSettingsAction>action;

      return { ...settingData };
    case SETTINGS_ACTION_TYPES.CLEAR_SETTINGS:
      clearAsyncStorage();  
      return initialState;
    default:
      return state;
  }
};
