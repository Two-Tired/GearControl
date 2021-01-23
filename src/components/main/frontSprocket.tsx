import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AppState, SettingsState } from "../../types";
import Svg, { SvgProps, Path, Text } from "react-native-svg";
import { sprocketPathDs } from "./sprocketPathDs";
import { Dimensions } from "react-native";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

type Props = {
    gear: number,
    svgProps?: SvgProps
}

function FrontSprocket({ gear, svgProps }: Props) {
    const { colors } = useTheme();
    const [dimensions, setDimension] = useState({ window, screen });
    const settings = useSelector<AppState, SettingsState>(
        (store) => store.settings
    );

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="30%"
            height={dimensions.window.width * 0.4}
            viewBox="0 0 327 327"
            {...svgProps}
        >
            {settings.frontSprockets.map((value, index) => {
                <Path
                    d={sprocketPathDs[value]}
                    fillRule="evenodd"
                    fill={colors.primary}
                    strokeWidth={0.4}
                    strokeLinejoin="round"
                    // stroke="#000"
                    strokeMiterlimit={10}
                />
            })}
            <Text
                x="139.94492"
                y="192.59746"
                id="rearSprocket"
                fill={colors.primary}
                fontSize="100"
                fontWeight="bold">
                {gear}
            </Text>
        </Svg>
    );
}

export default FrontSprocket;