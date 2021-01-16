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
export type PreferencesScreenRouteProp = RouteProp<RootStackParamList,"Preferences">;

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

export enum SETTINGS_SPROCKET_TYPE {
  FRONT = "SPROCKET/FRONT",
  REAR = "SPROCKET/REAR",
}

export type SetSprocketAction = {
  type: string;
  sprocketType: SETTINGS_SPROCKET_TYPE,
  sprockets: number[];
}

export enum SETTINGS_NUMBER_TYPE {
  CADENCE = "NUMBER/CADENCE",
  CIRCUMFERENCE = "NUMBER/CIRCUMFERENCE",
}

export type SetNumberAction = {
  type: string;
  numberType: SETTINGS_NUMBER_TYPE;
  value: number;
}

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

// transmissions types
export type TransmissionState = {
  frontSprocket: number;
  rearSprocket: number;
  transmission: number;
  validity: number;
}

// transmissions actions
export type TransmissionsAction = SetTransmissionsAction;

export type SetTransmissionsAction = {
  type: string;
  sprocketData: SproketCounts;
}

export type SproketCounts = {
  sprocketsFront: number[];
  sprocketsRear: number[];
}

// General App State Type
export type AppState = {
  settings: SettingsState;
  location: LocationObject;
  transmissions: TransmissionState[];
};
