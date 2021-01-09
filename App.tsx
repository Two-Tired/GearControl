import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import { Settings } from "./src/components/settings/settings";

export default function App() {
  return (
    <Provider store={store}>
      <Settings></Settings>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  paragraph: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
