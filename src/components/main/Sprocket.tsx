import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import Svg, { SvgProps, Path, Text } from "react-native-svg";
import { sprocketPathDs, boundingBoxes } from "./sprocketPathDs";
import { Dimensions } from "react-native";
import { scaleNumber } from "../../helper/Transmissions";
import { AppState, SETTINGS_SPROCKET_TYPE } from "../../types";
import { useSelector } from "react-redux";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

type Props = {
  gear: number;
  sprocketType: SETTINGS_SPROCKET_TYPE;
  svgProps?: SvgProps;
};

function Sprocket({ gear, sprocketType, svgProps }: Props) {
  const { colors } = useTheme();
  const [dimensions, _] = useState({ window, screen });

  const sprockets =
    sprocketType === SETTINGS_SPROCKET_TYPE.FRONT
      ? useSelector<AppState, number[]>(
          (store) => store.settings.frontSprockets
        )
      : useSelector<AppState, number[]>(
          (store) => store.settings.rearSprockets.reverse()
        );

  const sprocketColors = [
    "#003f76",
    "#004e92",
    "#005dae",
    "#006cca",
    "#007be6",
    "#0389ff",
    "#1f96ff",
    "#3ba4ff",
    "#57b1ff",
    "#73beff",
    "#8fcbff",
    "#abd8ff",
    "#c7e5ff",
    "#e3f2ff",
    "#ffffff",
  ];
  const highlightColor = "#d00000";

  const viewBox = (): string => {
    return (
      boundingBoxes[sprockets[0]].x +
      " " +
      boundingBoxes[sprockets[0]].y +
      " " +
      boundingBoxes[sprockets[0]].width +
      " " +
      boundingBoxes[sprockets[0]].height
    );
  };

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="40%"
      height={dimensions.window.width * 0.4}
      viewBox={viewBox()}
      {...svgProps}
    >
      {sprockets.map((value, index) => {
        return (
          <Path
            key={index}
            d={sprocketPathDs[value]}
            // d={sprocketPathDs[40]}
            fillRule="evenodd"
            fill={
              index + 1 == gear
                ? highlightColor
                : sprocketColors[
                    Math.ceil(scaleNumber(sprockets.length, 15, index))
                  ]
            }
            strokeWidth={0.4}
            strokeLinejoin="round"
            // stroke="#000"
            strokeMiterlimit={10}
          />
        );
      })}
      <Text
        x={-boundingBoxes[sprockets[0]].width / 9}
        y={boundingBoxes[sprockets[0]].width / 9}
        id="rearSprocket"
        fill={colors.primary}
        fontSize={boundingBoxes[sprockets[0]].width / 3}
        fontWeight="bold"
      >
        {gear}
      </Text>
    </Svg>
  );
}

export default Sprocket;
