import React from "react";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SettingScreen } from "./src/screens/SettingScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { Button } from "react-native";
import { RootStackParamList } from "./src/types";

const RootStack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Home">
          <RootStack.Screen
            name="Home"
            component={HomeScreen}
          ></RootStack.Screen>
          <RootStack.Screen
            name="Preferences"
            component={SettingScreen}
          ></RootStack.Screen>
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
