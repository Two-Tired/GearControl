import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Types for Navigation
export type RootStackParamList = {
  Home: undefined,
  Preferences: undefined,
}

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type PreferencesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Preferences'>;

export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
export type PreferencesScreenRouteProp = RouteProp<RootStackParamList, 'Preferences'>;

// Type for Settings
export type SettingsState = {
  frontSprocketNumber: number;
  rearSprocketNumber: number;
  frontSprockets: number[];
  rearSprockets: number[];
  favoriteCadence: number;
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

// General App State Type
export type AppState = {
  settings: SettingsState;
};
