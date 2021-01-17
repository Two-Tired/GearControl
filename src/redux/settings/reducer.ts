import AsyncStorage from "@react-native-community/async-storage";
import { AppState, SetNumberAction, SetSettingsAction, SetSprocketAction, SettingsAction, SettingsState, SETTINGS_NUMBER_TYPE, SETTINGS_SPROCKET_TYPE } from "../../types";
import { SETTINGS_ACTION_TYPE } from "./actions";

export const initialState: SettingsState = {
  frontSprockets: [52,39,30],
  rearSprockets: [13,14,15,16,17,18,19,21,23,25],
  favoriteCadence: 100, // revolutions per minute
  tireCircumference: 2150, // mm
};

const clearAsyncStorage = async() => {
  AsyncStorage.clear();
}

export const settings = (
  state: SettingsState = JSON.parse(JSON.stringify(initialState)),
  action: SettingsAction,
) => {
  switch (action.type) {
    case SETTINGS_ACTION_TYPE.SET_SETTINGS:
      const { settingData } = <SetSettingsAction>action;
      return { ...settingData };
    case SETTINGS_ACTION_TYPE.CLEAR_SETTINGS:
      clearAsyncStorage();
      return JSON.parse(JSON.stringify(initialState));
    case SETTINGS_ACTION_TYPE.SET_SPROCKETS:
      const {sprocketType, sprockets} = <SetSprocketAction>action;  
      switch(sprocketType) {
        case SETTINGS_SPROCKET_TYPE.FRONT:
          state.frontSprockets = [...sprockets];
          return {...state};
        case SETTINGS_SPROCKET_TYPE.REAR:
          state.rearSprockets = [...sprockets];
          return {...state};
      }
    case SETTINGS_ACTION_TYPE.SET_NUMBER:
      const{numberType, value} = <SetNumberAction>action;
      switch (numberType) {
        case SETTINGS_NUMBER_TYPE.CADENCE:
          state.favoriteCadence = value;
          return {...state};
        case SETTINGS_NUMBER_TYPE.CIRCUMFERENCE:
          state.tireCircumference = value;
          return {...state};
      }
    default:
      return state;
  }
};
