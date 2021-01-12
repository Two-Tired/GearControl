import { combineReducers, createStore } from "redux";
import { settings } from "./settings/reducer";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "react-native";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    settings,
  })
);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
