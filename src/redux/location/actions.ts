import { SetLocationAction, SetLocationError } from "../../types";
import { LocationObject } from "expo-location"

export enum LOCATION_ACTION_TYPES {
  SET_LOCATION = "LOCATION/SET_LOCATION",
  LOCATION_ERROR = "LOCATION/SET_ERROR"
}

export const setLocation = (
  location: LocationObject,
): SetLocationAction => ({
  type: LOCATION_ACTION_TYPES.SET_LOCATION,
  locationData: location,
  // mapRegion: {
  //   longitude: location.coords.longitude,
  //   latitude: location.coords.latitude,
  //   longitudeDelta: 0.0992,
  //   latitudeDelta: 0.0992,
  // }
});

export const setLocationError = (): SetLocationError => ({
  type: LOCATION_ACTION_TYPES.LOCATION_ERROR
});