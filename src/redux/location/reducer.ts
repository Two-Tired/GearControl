import AsyncStorage from "@react-native-community/async-storage";
import { SetLocationAction, LocationAction } from "../../types";
import { LocationObject } from "expo-location"
import { LOCATION_ACTION_TYPES } from "./actions";

export const initialState: LocationObject = {
  coords: {
    latitude: 50,
    longitude: 7,
    altitude: 50,
    accuracy: 0,
    altitudeAccuracy: 0,
    heading: 0,
    speed: 0,
  },
  timestamp: 0
};

export const errorState: LocationObject = {
  coords: {
    latitude: 0,
    longitude: 0,
    altitude: 0,
    accuracy: 0,
    altitudeAccuracy: 0,
    heading: 0,
    speed: 0,
  },
  timestamp: 0
};

export const location = (
  state: LocationObject = { ...initialState},
  action: LocationAction
) => {
  switch (action.type) {
    case LOCATION_ACTION_TYPES.SET_LOCATION:
      const { locationData } = <SetLocationAction>action;

      return { ...locationData };
    case LOCATION_ACTION_TYPES.LOCATION_ERROR:
      return { ...errorState};
    default:
      return state;
  }
};
