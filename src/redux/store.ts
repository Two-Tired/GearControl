import { combineReducers, createStore } from "redux";
import { settings } from "./settings/reducer";
import { location } from "./location/reducer";
import { transmissions } from "./transmissions/reducer";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    settings,
    location,
    transmissions,
  })
);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
