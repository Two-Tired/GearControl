import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, View, StyleSheet, Dimensions, Platform } from "react-native";
import { Avatar, Caption, Title, Subheading, Paragraph, Divider } from "react-native-paper";

export function ImpressumScreen() {

    const { t } = useTranslation();

    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.verticalSpace} />
            <View style={styles.container}>
                <Title style={styles.container}>{t("appName")}</Title>
                <Subheading style={styles.center}>{t("appDescription")}</Subheading>
            </View>
            <View style={styles.verticalSpace} />
            <Divider />
            <View style={styles.verticalSpace} />
            <View style={styles.container}>
                <Title style={styles.container}>{t("team")}</Title>
                <Paragraph style={styles.center}>{t("teamDescription")}</Paragraph>
            </View>
            <View style={styles.horizontal}>
                <View style={styles.container} >
                    <Avatar.Image size={96} source={require('../assets/leo.png')} />
                    <Caption>Leonardt Mandtler</Caption>
                </View>
                <View style={styles.container}>
                    <Avatar.Image size={96} source={require('../assets/axel.png')} />
                    <Caption>Axel Forsch</Caption>
                </View>
            </View>
            <Divider />
            <View style={styles.container}>
                <Paragraph style={styles.center}>{t("quote")}</Paragraph>
                <Paragraph >- Michael Gressmann -</Paragraph>
            </View>
            <Divider />
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    center: {
        textAlign: "center",
    },
    horizontal: {
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        margin: 20,
    },
    button: {
        width: "40%",
    },
    avatar: {
        width: 100,
    },
    verticalSpace: {
        height: 20,
    },
    map: {
        width: Dimensions.get('window').width,
        height: 300,
    },
    caption: {
        margin: 10,
    },
});
