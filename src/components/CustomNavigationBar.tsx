import React from "react";
import { Appbar, Menu } from "react-native-paper";
import { useTranslation } from "react-i18next";
import {
  HomeScreenNavigationProp,
  HomeScreenRouteProp,
  SCREEN,
} from "../types";
import { useRoute } from "@react-navigation/native";

type Props = {
  navigation: HomeScreenNavigationProp;
  previous: HomeScreenRouteProp;
};

export function CustomNavigationBar({ navigation, previous }: Props) {
  const { t } = useTranslation();
  const { key, name } = useRoute();

  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  let title = "";

  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content
        title={name === SCREEN.IMPRESSUM ? t("impressum") : t("appName")}
      />
      {/* {!previous ? ( */}
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Appbar.Action icon="menu" color="white" onPress={openMenu} />}
      >
        <Menu.Item
          onPress={() => {
            navigation.navigate("Preferences");
            setVisible(false);
          }}
          title={t("preferences")}
        />
        <Menu.Item
          onPress={() => {
            navigation.navigate("GearTable");
            setVisible(false);
          }}
          title={t("gearTable")}
        />
        <Menu.Item
          onPress={() => {
            navigation.navigate("Impressum");
            setVisible(false);
          }}
          title={t("impressum")}
        />
      </Menu>
      {/* ) : null} */}
    </Appbar.Header>
  );
}
