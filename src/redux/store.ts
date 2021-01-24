import { combineReducers, createStore } from "redux";
import { settings } from "./settings/reducer";
import { location } from "./location/reducer";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ['location'],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    settings,
    location,
  })
);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
