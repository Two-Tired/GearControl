import { combineReducers, createStore } from "redux";
import { AppState } from "./types";
import { settings } from "./settings/reducer";

const store = createStore<AppState, any, any, any>(
  combineReducers({
    settings,
  })
);

export default store;
