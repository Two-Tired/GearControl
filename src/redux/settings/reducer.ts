import AsyncStorage from "@react-native-community/async-storage";
import { SetNumberAction, SetSettingsAction, SetSprocketAction, SettingsAction, SettingsState, SETTINGS_NUMBER_TYPE, SETTINGS_SPROCKET_TYPE } from "../../types";
import { SETTINGS_ACTION_TYPE } from "./actions";

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
  state: SettingsState = JSON.parse(JSON.stringify(initialState)),
  action: SettingsAction
) => {
  switch (action.type) {
    case SETTINGS_ACTION_TYPE.SET_SETTINGS:
      const { settingData } = <SetSettingsAction>action;
      return { ...settingData };
    case SETTINGS_ACTION_TYPE.CLEAR_SETTINGS:
      clearAsyncStorage();
      console.log(initialState);
      return JSON.parse(JSON.stringify(initialState));
    case SETTINGS_ACTION_TYPE.SET_SPROCKETS:
      console.log("saveSprockets")
      const {sprocketType, sprockets} = <SetSprocketAction>action;  
      console.log(sprocketType)
      switch(sprocketType) {
        case SETTINGS_SPROCKET_TYPE.FRONT:
          console.log(sprockets)
          state.frontSprockets = [...sprockets];
          return {...state};
        case SETTINGS_SPROCKET_TYPE.REAR:
          console.log(sprockets)
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
