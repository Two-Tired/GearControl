import React from "react";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PreferencesScreen } from "./src/screens/PreferencesScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { RootStackParamList } from "./src/types";
import { Provider as PaperProvider } from "react-native-paper";
import { CustomNavigationBar } from "./src/components/CustomNavigationBar";
import "./src/localization";

const RootStack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <RootStack.Navigator
            initialRouteName="Home"
            screenOptions={{
              header: (props) => <CustomNavigationBar {...props} />,
            }}
          >
            <RootStack.Screen
              name="Home"
              component={HomeScreen}
            ></RootStack.Screen>
            <RootStack.Screen
              name="Preferences"
              component={PreferencesScreen}
            ></RootStack.Screen>
          </RootStack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
