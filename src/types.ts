import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LocationObject } from "expo-location"

// Types for Navigation
export type RootStackParamList = {
  Home: undefined;
  Preferences: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;
export type PreferencesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Preferences"
>;

export type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;
export type PreferencesScreenRouteProp = RouteProp<
  RootStackParamList,
  "Preferences"
>;

// Type for Settings
export type SettingsState = {
  frontSprockets: number[];
  rearSprockets: number[];
  favoriteCadence: number;
  tireCircumference: number;
};

// Types for Actions
export type SetSettingsAction = {
  type: string;
  settingData: SettingsState;
};

export type ClearSettingsActions = {
  type: string;
};

export type SettingsAction = SetSettingsAction | ClearSettingsActions;

// location
export type SetLocationAction = {
  type: string;
  locationData: LocationObject;
};

export type SetLocationError = {
  type: string;
};

export type LocationAction = SetLocationAction;

// General App State Type
export type AppState = {
  settings: SettingsState;
  location: LocationObject;
};
