import { useTheme } from "@react-navigation/native";
import React, { useCallback, useMemo, useState } from "react";
import Svg, { SvgProps, Path, Text } from "react-native-svg";
import { sprocketPathDs, boundingBoxes } from "./sprocketPathDs";
import { Dimensions } from "react-native";
import {
  createTransmissionTable,
  getGears,
  scaleNumber,
} from "../../helper/Transmissions";
import {
  AppState,
  BestGearCombination,
  SettingsState,
  SETTINGS_SPROCKET_TYPE,
} from "../../types";
import { useSelector } from "react-redux";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

type Props = {
  sprocketType: SETTINGS_SPROCKET_TYPE;
  svgProps?: SvgProps;
};

function Sprocket({ sprocketType, svgProps }: Props) {
  const { colors } = useTheme();
  const [dimensions, _] = useState({ window, screen });
  const settings = useSelector<AppState, SettingsState>(
    (store) => store.settings
  );
  const speed = useSelector<AppState, number | null>(
    (store) => store.location.coords.speed
  );

  const sprockets = useMemo((): number[] => {
    return sprocketType === SETTINGS_SPROCKET_TYPE.FRONT
      ? [...settings.frontSprockets]
      : [...settings.rearSprockets].reverse();
  }, [settings.frontSprockets, settings.rearSprockets]);

  const transmissions = useMemo(() => {
    return [
      ...createTransmissionTable(
        settings.frontSprockets,
        settings.rearSprockets
      ),
    ];
  }, [settings.frontSprockets, settings.rearSprockets]);

  const gearCombination: BestGearCombination = useMemo(() => {
    return getGears(
      speed,
      transmissions,
      settings.tireCircumference,
      settings.favoriteCadence
    );
  }, [speed, settings.tireCircumference, settings.favoriteCadence]);

  const gear = useMemo((): number => {
    return sprocketType === SETTINGS_SPROCKET_TYPE.FRONT
      ? gearCombination.frontSprocketKey
      : gearCombination.rearSprocketKey;
  }, [gearCombination]);

  const sprocketColors = [
    "#323232",
    "#404040",
    "#4f4f4f",
    "#5e5e5e",
    "#6c6c6c",
    "#7b7b7b",
    "#8a8a8a",
    "#989898",
    "#a7a7a7",
    "#b6b6b6",
    "#c4c4c4",
    "#d3d3d3",
    "#e2e2e2",
    "#f0f0f0",
    "#ffffff",
  ];
  const highlightColor = "#d00000";

  const viewBox = useMemo((): string => {
    return (
      boundingBoxes[sprockets[0]].x +
      " " +
      boundingBoxes[sprockets[0]].y +
      " " +
      boundingBoxes[sprockets[0]].width +
      " " +
      boundingBoxes[sprockets[0]].height
    );
  }, [sprockets]);

  const strokeWidth = useMemo((): number => {
    return boundingBoxes[sprockets[0]].width / 50;
  }, [sprockets]);

  const highlight = useCallback(
    (index: number): string => {
      return sprocketType === SETTINGS_SPROCKET_TYPE.FRONT
        ? sprockets.length - index == gear
          ? colors.primary
          : ""
        : index + 1 == gear
        ? colors.primary
        : "";
    },
    [gear]
  );

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="40%"
      height={dimensions.window.width * 0.4}
      viewBox={viewBox}
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
              sprocketColors[
                Math.ceil(scaleNumber(sprockets.length - 1, 14, index))
              ]
            }
            stroke={highlight(index)}
            strokeWidth={strokeWidth}
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
