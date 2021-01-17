import React from "react";
import { store, persistor } from "./src/redux/store";
import { Provider } from "react-redux";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PreferencesScreen } from "./src/screens/PreferencesScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { RootStackParamList, SCREEN } from "./src/types";
import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { CustomNavigationBar } from "./src/components/CustomNavigationBar";
import { PersistGate } from "redux-persist/integration/react";
import "./src/localization";
import { GearTableScreen } from "./src/screens/GearTableScreen";
import { ImpressumScreen } from "./src/screens/ImpressumScreen";

const RootStack = createStackNavigator<RootStackParamList>();

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      myOwnColor: string;
    }

    interface Theme {
      myOwnProperty: boolean;
    }
  }
}

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    accent: NavigationDefaultTheme.colors.primary,
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={CombinedDefaultTheme}>
          <NavigationContainer theme={CombinedDefaultTheme}>
            <RootStack.Navigator
              initialRouteName={SCREEN.HOME}
              screenOptions={{
                header: (props) => <CustomNavigationBar {...props} />,
              }}
            >
              <RootStack.Screen
                name={SCREEN.HOME}
                component={HomeScreen}
              ></RootStack.Screen>
              <RootStack.Screen
                name={SCREEN.PREFERENCES}
                component={PreferencesScreen}
              ></RootStack.Screen>
              <RootStack.Screen
                name={SCREEN.GEARTABLE}
                component={GearTableScreen}
              ></RootStack.Screen>
              <RootStack.Screen
                name={SCREEN.IMPRESSUM}
                component={ImpressumScreen}
              ></RootStack.Screen>
            </RootStack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
