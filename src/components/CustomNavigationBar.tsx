import React from "react";
import { Appbar, Menu } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { HomeScreenNavigationProp, HomeScreenRouteProp } from "../types";

type Props = {
    navigation: HomeScreenNavigationProp;
    previous: HomeScreenRouteProp;
};

export function CustomNavigationBar({ navigation, previous }: Props) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const { t } = useTranslation();

  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="Two-Tired" />
      {!previous ? (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="menu" color="white" onPress={openMenu} />
          }
        >
          <Menu.Item
            onPress={() => {
              navigation.navigate("Preferences");
              setVisible(false);
            }}
            title={t("preferences")}
          />
        </Menu>
      ) : null}
    </Appbar.Header>
  );
}
