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
