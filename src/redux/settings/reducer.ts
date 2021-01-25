import AsyncStorage from "@react-native-community/async-storage";
import { AppState, SetNumberAction, SetSettingsAction, SetSprocketAction, SettingsAction, SettingsState, SETTINGS_NUMBER_TYPE, SETTINGS_SPROCKET_TYPE, TransmissionState } from "../../types";
import { SETTINGS_ACTION_TYPE } from "./actions";

export const initialState: SettingsState = {
  frontSprockets: [48,36,26],
  rearSprockets: [13,15,18,21,24,28,32],
  favoriteCadence: 70, // revolutions per minute
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
          break;
        case SETTINGS_SPROCKET_TYPE.REAR:
          state.rearSprockets = [...sprockets];
          break;
      }
      return {...state};
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




