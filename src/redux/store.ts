import { combineReducers, createStore } from "redux";
import { settings } from "./settings/reducer";
import { location } from "./location/reducer";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-community/async-storage';

// https://blog.reactnativecoach.com/the-definitive-guide-to-redux-persist-84738167975
// is this the way?

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ['location'],
};

const locationPersistConfig = {
  key: 'location',
  storage: AsyncStorage,
  blacklist: ['location'],
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    settings : settings,
    location : persistReducer(locationPersistConfig, location),
  })
);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
