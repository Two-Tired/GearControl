import React from "react";
import { Appbar, Menu } from 'react-native-paper';
import { HomeScreenNavigationProp, HomeScreenRouteProp } from "../types";

// type Props = {
//     navigation: HomeScreenNavigationProp;
//     previous: HomeScreenRouteProp;
// };

export function CustomNavigationBar({ navigation, previous }) {
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

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
                    }>
                    <Menu.Item onPress={() => { navigation.navigate("Preferences"); setVisible(false); }} title="Preferences" />
                    <Menu.Item onPress={() => { console.log('Option 2 was pressed'); setVisible(false); }} title="Option 2" />
                    <Menu.Item onPress={() => { console.log('Option 3 was pressed'); setVisible(false); }} title="Option Disabled" disabled />
                </Menu>
            ) : null}
        </Appbar.Header>
    );
}