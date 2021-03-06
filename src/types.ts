import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LocationObject } from "expo-location";

// Types for Navigation
export type RootStackParamList = {
  Home: undefined;
  Preferences: undefined;
  GearTable: undefined;
  Impressum: undefined;
};

export enum SCREEN {
  HOME = "Home",
  PREFERENCES = "Preferences",
  GEARTABLE = "GearTable",
  IMPRESSUM = "Impressum",
}

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;
export type PreferencesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Preferences"
>;
export type GearTableScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "GearTable"
>;
export type ImpressumScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Impressum"
>;

export type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;
// export type PreferencesScreenRouteProp = RouteProp<RootStackParamList,"Preferences">;

// Type for Settings
export type SettingsState = {
  frontSprockets: number[];
  rearSprockets: number[];
  favoriteCadence: number;
  tireCircumference: number;
};

// transmissions types
export type TransmissionState = {
  frontSprocket: number;
  frontSprocketKey: number;
  rearSprocket: number;
  rearSprocketKey: number;
  transmission: number;
  validity: number;
};

// Types for Actions
export type SetSettingsAction = {
  type: string;
  settingData: SettingsState;
};

export type ClearSettingsActions = {
  type: string;
};

export enum SETTINGS_SPROCKET_TYPE {
  FRONT = "SPROCKET/FRONT",
  REAR = "SPROCKET/REAR",
}

export type SetSprocketAction = {
  type: string;
  sprocketType: SETTINGS_SPROCKET_TYPE;
  sprockets: number[];
};

export enum SETTINGS_NUMBER_TYPE {
  CADENCE = "NUMBER/CADENCE",
  CIRCUMFERENCE = "NUMBER/CIRCUMFERENCE",
}

export type SetNumberAction = {
  type: string;
  numberType: SETTINGS_NUMBER_TYPE;
  value: number;
};

export type SettingsAction = SetSettingsAction | ClearSettingsActions;

// location actions
export type SetLocationAction = {
  type: string;
  locationData: LocationObject;
};

export type SetLocationError = {
  type: string;
};

export type LocationAction = SetLocationAction;

export type SproketCounts = {
  sprocketsFront: number[];
  sprocketsRear: number[];
};

// General App State Type
export type AppState = {
  settings: SettingsState;
  location: LocationObject;
};

export type MapRegion = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export type BestGearCombination = {
  speed: number,
  transmissionNeeded: number,
  transmissionBest: number,
  frontSprocket: number,
  frontSprocketKey: number,
  rearSprocket: number,
  rearSprocketKey: number,
}

export type boundingBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};